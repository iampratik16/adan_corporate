/**
 * Generate every still and film for the site through Vertex AI.
 *
 * Credentials: Application Default Credentials only. Never an API key, never a
 * secret in the repo. Run `gcloud auth application-default login` if this fails.
 *
 *   pnpm media:generate                 # everything not already kept
 *   pnpm media:generate hero-still      # one shot, or several, by id
 *   pnpm media:generate --films         # films only
 *   pnpm media:generate --force hero-still
 *
 * Originals land in media/originals/ (git-ignored). process.ts grades and
 * encodes them into public/media/.
 */
import { GoogleGenAI } from '@google/genai';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { BUDGET, FILMS, HOUSE_LOOK, STILLS, type FilmShot, type StillShot } from './shots.js';

const ROOT = path.resolve(import.meta.dirname, '../..');
const ORIGINALS = path.join(ROOT, 'media/originals');
const MANIFEST = path.join(ROOT, 'scripts/media/manifest.json');

/**
 * Model IDs and where each one answers, probed 2026-09-18 against this project.
 * Google retires these often. If an ID is rejected, list the available models,
 * pick the closest current equivalent, and record the swap in docs/DECISIONS.md.
 *
 * Note the asymmetry: the image model only answers on `global`; Veo answers in
 * both but is used on us-central1, which is where the regional quota lives.
 */
const MODELS = {
  still: { id: 'gemini-3-pro-image', location: 'global' },
  film: { location: 'us-central1' },
} as const;

const PROJECT = process.env.GOOGLE_CLOUD_PROJECT ?? process.env.GCLOUD_PROJECT;

interface ManifestEntry {
  id: string;
  take: number;
  kind: 'still' | 'film';
  model: string;
  location: string;
  prompt: string;
  parameters: Record<string, unknown>;
  timestamp: string;
  file: string;
  kept: boolean;
  /** Filled in by hand after the quality-control pass. */
  rejectedBecause?: string;
}

interface Manifest {
  generatedWith: string;
  budget: typeof BUDGET;
  spent: { images: number; videos: number };
  entries: ManifestEntry[];
}

async function loadManifest(): Promise<Manifest> {
  if (!existsSync(MANIFEST)) {
    return {
      generatedWith: '@google/genai (Vertex AI, ADC)',
      budget: BUDGET,
      spent: { images: 0, videos: 0 },
      entries: [],
    };
  }
  return JSON.parse(await readFile(MANIFEST, 'utf8')) as Manifest;
}

async function saveManifest(m: Manifest): Promise<void> {
  await writeFile(MANIFEST, `${JSON.stringify(m, null, 2)}\n`);
}

function resolveProject(): string {
  if (PROJECT) return PROJECT;
  throw new Error(
    'No project. Set GOOGLE_CLOUD_PROJECT, or run: ' +
      'export GOOGLE_CLOUD_PROJECT=$(gcloud config get-value project)',
  );
}

function client(location: string): GoogleGenAI {
  return new GoogleGenAI({ vertexai: true, project: resolveProject(), location });
}

/* ---------------------------------------------------------------- stills -- */

async function generateStill(shot: StillShot, take: number, manifest: Manifest): Promise<void> {
  if (manifest.spent.images >= BUDGET.images) {
    throw new Error(`Image budget of ${BUDGET.images} generations is spent.`);
  }
  const prompt = `${shot.subject} ${shot.look ?? HOUSE_LOOK}`;
  const parameters = {
    responseModalities: ['IMAGE'],
    imageConfig: { aspectRatio: shot.aspectRatio, imageSize: '2K' },
  };

  const ai = client(MODELS.still.location);
  const response = await ai.models.generateContent({
    model: MODELS.still.id,
    contents: prompt,
    config: parameters,
  });

  const part = response.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data);
  if (!part?.inlineData?.data) {
    throw new Error(`No image returned for ${shot.id} take ${take}. Check quota and model id.`);
  }

  const file = path.join(ORIGINALS, 'stills', `${shot.id}-take${take}.png`);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, Buffer.from(part.inlineData.data, 'base64'));

  manifest.spent.images += 1;
  manifest.entries.push({
    id: shot.id,
    take,
    kind: 'still',
    model: MODELS.still.id,
    location: MODELS.still.location,
    prompt,
    parameters,
    timestamp: new Date().toISOString(),
    file: path.relative(ROOT, file),
    kept: false,
  });
  console.log(`  still  ${shot.id} take ${take} -> ${path.relative(ROOT, file)}`);
}

/* ----------------------------------------------------------------- films -- */

/**
 * Films are conditioned on the approved still so that the poster and the first
 * frame are byte-for-byte the same composition and nothing shifts when the film
 * starts. The same still is passed as the last frame too, which gives a
 * seamless loop without an ffmpeg crossfade.
 */
async function generateFilm(shot: FilmShot, manifest: Manifest): Promise<void> {
  if (manifest.spent.videos >= BUDGET.videos) {
    throw new Error(`Video budget of ${BUDGET.videos} generations is spent.`);
  }

  const still = path.join(ORIGINALS, 'stills', `${shot.fromStill}.png`);
  if (!existsSync(still)) {
    throw new Error(
      `${shot.id} needs an approved still at ${path.relative(ROOT, still)}. ` +
        `Generate and approve ${shot.fromStill} first, then copy the kept take to that name.`,
    );
  }

  const prompt = `${shot.prompt} ${HOUSE_LOOK}`;
  const imageBytes = (await readFile(still)).toString('base64');
  const parameters = {
    aspectRatio: shot.aspectRatio,
    durationSeconds: shot.durationSeconds,
    numberOfVideos: 1,
    generateAudio: false,
    personGeneration: 'allow_adult',
  };

  const ai = client(MODELS.film.location);
  let operation = await ai.models.generateVideos({
    model: shot.model,
    prompt,
    image: { imageBytes, mimeType: 'image/png' },
    // Same frame at both ends: the loop closes on itself.
    config: { ...parameters, lastFrame: { imageBytes, mimeType: 'image/png' } },
  });

  process.stdout.write(`  film   ${shot.id} `);
  while (!operation.done) {
    await new Promise((r) => setTimeout(r, 12_000));
    operation = await ai.operations.getVideosOperation({ operation });
    process.stdout.write('.');
  }
  process.stdout.write('\n');

  const video = operation.response?.generatedVideos?.[0]?.video;
  if (!video) {
    throw new Error(`No film returned for ${shot.id}: ${JSON.stringify(operation.error ?? {})}`);
  }

  const file = path.join(ORIGINALS, 'film', `${shot.id}.mp4`);
  await mkdir(path.dirname(file), { recursive: true });
  if (video.videoBytes) {
    await writeFile(file, Buffer.from(video.videoBytes, 'base64'));
  } else if (video.uri) {
    await ai.files.download({ file: video, downloadPath: file });
  }

  manifest.spent.videos += 1;
  manifest.entries.push({
    id: shot.id,
    take: 1,
    kind: 'film',
    model: shot.model,
    location: MODELS.film.location,
    prompt,
    parameters: { ...parameters, conditionedOn: `${shot.fromStill}.png`, lastFrameSame: true },
    timestamp: new Date().toISOString(),
    file: path.relative(ROOT, file),
    kept: false,
  });
  console.log(`  film   ${shot.id} -> ${path.relative(ROOT, file)}`);
}

/* ------------------------------------------------------------------ main -- */

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const force = argv.includes('--force');
  const filmsOnly = argv.includes('--films');
  const stillsOnly = argv.includes('--stills');
  const ids = argv.filter((a) => !a.startsWith('--'));

  const manifest = await loadManifest();
  const done = new Set(manifest.entries.map((e) => `${e.id}#${e.take}`));

  console.log(
    `Vertex AI  project=${resolveProject()}  ` +
      `spent: ${manifest.spent.images}/${BUDGET.images} images, ` +
      `${manifest.spent.videos}/${BUDGET.videos} films`,
  );

  if (!filmsOnly) {
    for (const shot of STILLS) {
      if (ids.length && !ids.includes(shot.id)) continue;
      for (let take = 1; take <= shot.takes; take += 1) {
        if (!force && done.has(`${shot.id}#${take}`)) continue;
        try {
          await generateStill(shot, take, manifest);
          await saveManifest(manifest);
        } catch (error) {
          console.error(`  FAIL   ${shot.id} take ${take}:`, (error as Error).message);
        }
      }
    }
  }

  if (!stillsOnly) {
    for (const shot of FILMS) {
      if (ids.length && !ids.includes(shot.id)) continue;
      if (!force && done.has(`${shot.id}#1`)) continue;
      try {
        await generateFilm(shot, manifest);
        await saveManifest(manifest);
      } catch (error) {
        console.error(`  FAIL   ${shot.id}:`, (error as Error).message);
      }
    }
  }

  await saveManifest(manifest);
  console.log('Done. Inspect every take, then run pnpm media:process.');
}

void main();
