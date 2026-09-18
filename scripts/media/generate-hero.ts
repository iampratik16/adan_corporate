/**
 * Build the 60-second hero film. See docs/HERO-FILM.md.
 *
 *   npx tsx scripts/media/generate-hero.ts --stills          # the 7 anchor stills
 *   npx tsx scripts/media/generate-hero.ts --draft           # all 8 on the fast tier
 *   npx tsx scripts/media/generate-hero.ts --final 1 4 6 8   # approved shots on standard
 *
 * Shot 1's anchor is hero-key, which is the already-approved hero still: the
 * poster, the LCP element and the reference every other shot is matched to.
 * Regenerating it would only risk the one image that is known good.
 */
import { GoogleGenAI } from '@google/genai';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import {
  FILM_BUDGET,
  RATE_PER_SECOND,
  SHOTS,
  motionPrompt,
  stillPrompt,
  type FilmShot,
} from './hero-film.js';

const ROOT = path.resolve(import.meta.dirname, '../..');
const STILLS = path.join(ROOT, 'media/originals/hero-stills');
const FILM = path.join(ROOT, 'media/originals/hero-film');
const MANIFEST = path.join(ROOT, 'media/manifest.json');
const KEY_STILL = path.join(ROOT, 'media/originals/stills/hero-still.png');

const MODELS = {
  still: { id: 'gemini-3-pro-image', location: 'global' },
  fast: { id: 'veo-3.1-fast-generate-001', location: 'us-central1' },
  standard: { id: 'veo-3.1-generate-001', location: 'us-central1' },
} as const;

interface Entry {
  shot: number;
  id: string;
  kind: 'still' | 'film';
  tier?: 'fast' | 'standard';
  model: string;
  prompt: string;
  parameters: Record<string, unknown>;
  timestamp: string;
  file: string;
  seconds?: number;
  costEstimateUsd?: number;
  kept: boolean;
}

interface Manifest {
  budget: typeof FILM_BUDGET;
  spent: { stills: number; fast: number; standard: number };
  costEstimateUsd: number;
  entries: Entry[];
}

async function loadManifest(): Promise<Manifest> {
  if (!existsSync(MANIFEST)) {
    return {
      budget: FILM_BUDGET,
      spent: { stills: 0, fast: 0, standard: 0 },
      costEstimateUsd: 0,
      entries: [],
    };
  }
  return JSON.parse(await readFile(MANIFEST, 'utf8')) as Manifest;
}

async function save(m: Manifest): Promise<void> {
  await mkdir(path.dirname(MANIFEST), { recursive: true });
  await writeFile(MANIFEST, `${JSON.stringify(m, null, 2)}\n`);
}

const project = () => {
  const p = process.env.GOOGLE_CLOUD_PROJECT ?? process.env.GCLOUD_PROJECT;
  if (!p) throw new Error('Set GOOGLE_CLOUD_PROJECT.');
  return p;
};

const client = (location: string) =>
  new GoogleGenAI({ vertexai: true, project: project(), location });

/* ----------------------------------------------------------- anchor stills -- */

async function generateStill(shot: FilmShot, take: number, m: Manifest): Promise<void> {
  const prompt = stillPrompt(shot);
  const parameters = {
    responseModalities: ['IMAGE'],
    imageConfig: { aspectRatio: '16:9', imageSize: '2K' },
  };

  // Pass hero-key as a reference so the model matches the world rather than
  // inventing a new one from the words alone.
  const reference = existsSync(KEY_STILL) ? await readFile(KEY_STILL) : null;
  const contents = reference
    ? [
        {
          role: 'user',
          parts: [
            { inlineData: { mimeType: 'image/png', data: reference.toString('base64') } },
            {
              text: `Use the supplied image as the reference for the building, the light and the palette. ${prompt}`,
            },
          ],
        },
      ]
    : prompt;

  const ai = client(MODELS.still.location);
  const response = await ai.models.generateContent({
    model: MODELS.still.id,
    contents,
    config: parameters,
  });

  const part = response.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data);
  if (!part?.inlineData?.data) throw new Error(`no image for ${shot.id} take ${take}`);

  const file = path.join(STILLS, `${shot.id}-take${take}.png`);
  await mkdir(STILLS, { recursive: true });
  await writeFile(file, Buffer.from(part.inlineData.data, 'base64'));

  m.spent.stills += 1;
  m.entries.push({
    shot: shot.n,
    id: shot.id,
    kind: 'still',
    model: MODELS.still.id,
    prompt,
    parameters: { ...parameters, referencedHeroKey: Boolean(reference) },
    timestamp: new Date().toISOString(),
    file: path.relative(ROOT, file),
    kept: false,
  });
  console.log(`  still  ${shot.id} take ${take}`);
}

/* ------------------------------------------------------------------ films -- */

async function generateFilm(shot: FilmShot, tier: 'fast' | 'standard', m: Manifest): Promise<void> {
  if (m.spent[tier] >= FILM_BUDGET[tier]) {
    throw new Error(`${tier} budget of ${FILM_BUDGET[tier]} is spent. Stopping.`);
  }

  const anchor = shot.n === 1 ? KEY_STILL : path.join(STILLS, `${shot.id}.png`);
  if (!existsSync(anchor)) {
    throw new Error(`${shot.id} needs an approved anchor still at ${path.relative(ROOT, anchor)}`);
  }

  const seconds = 8;
  const prompt = motionPrompt(shot);
  const imageBytes = (await readFile(anchor)).toString('base64');

  const parameters: Record<string, unknown> = {
    aspectRatio: '16:9',
    durationSeconds: seconds,
    numberOfVideos: 1,
    generateAudio: false,
    resolution: '1080p',
    personGeneration: 'allow_adult',
  };

  // Shot 8 closes the loop in the model: its last frame is hero-key, which is
  // shot 1's first frame. That is cheaper and cleaner than forcing it in the edit.
  const config: Record<string, unknown> = { ...parameters };
  if (shot.n === 8 && existsSync(KEY_STILL)) {
    config.lastFrame = {
      imageBytes: (await readFile(KEY_STILL)).toString('base64'),
      mimeType: 'image/png',
    };
    parameters.lastFrame = 'hero-key';
  }

  const model = MODELS[tier];
  const ai = client(model.location);
  let operation = await ai.models.generateVideos({
    model: model.id,
    prompt,
    image: { imageBytes, mimeType: 'image/png' },
    config,
  });

  process.stdout.write(`  ${tier.padEnd(8)} ${shot.id} `);
  while (!operation.done) {
    await new Promise((r) => setTimeout(r, 12_000));
    operation = await ai.operations.getVideosOperation({ operation });
    process.stdout.write('.');
  }
  process.stdout.write('\n');

  const video = operation.response?.generatedVideos?.[0]?.video;
  if (!video) throw new Error(`no film for ${shot.id}: ${JSON.stringify(operation.error ?? {})}`);

  const dir = path.join(FILM, tier);
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, `${shot.id}.mp4`);
  if (video.videoBytes) await writeFile(file, Buffer.from(video.videoBytes, 'base64'));
  else if (video.uri) await ai.files.download({ file: video, downloadPath: file });

  const cost = seconds * RATE_PER_SECOND[tier];
  m.spent[tier] += 1;
  m.costEstimateUsd = Number((m.costEstimateUsd + cost).toFixed(2));
  m.entries.push({
    shot: shot.n,
    id: shot.id,
    kind: 'film',
    tier,
    model: model.id,
    prompt,
    parameters,
    timestamp: new Date().toISOString(),
    file: path.relative(ROOT, file),
    seconds,
    costEstimateUsd: Number(cost.toFixed(2)),
    kept: false,
  });
  console.log(
    `  ${tier.padEnd(8)} ${shot.id} -> ${path.relative(ROOT, file)}  ~$${cost.toFixed(2)}`,
  );
}

/* ------------------------------------------------------------------- main -- */

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const takesAt = argv.indexOf('--takes');
  const takes = takesAt === -1 ? 2 : Number(argv[takesAt + 1] ?? 2);
  // Flags that carry a value must consume it, or `--takes 2` reads as
  // "shot 2 only" and seven shots are silently skipped.
  const positional = argv.filter((a, i) => !a.startsWith('--') && i !== takesAt + 1);
  const only = positional.filter((a) => /^\d+$/.test(a)).map(Number);
  const pick = (s: FilmShot) => only.length === 0 || only.includes(s.n);
  const m = await loadManifest();

  const report = () =>
    console.log(
      `  spent: ${m.spent.stills} stills, ${m.spent.fast}/${FILM_BUDGET.fast} fast, ` +
        `${m.spent.standard}/${FILM_BUDGET.standard} standard, ~$${m.costEstimateUsd.toFixed(2)}`,
    );

  console.log(`Vertex AI  project=${project()}`);
  report();

  if (argv.includes('--stills')) {
    // Shot 1 uses hero-key, which is already approved. Do not regenerate it.
    for (const shot of SHOTS.filter((s) => s.n !== 1).filter(pick)) {
      for (let take = 1; take <= takes; take += 1) {
        if (existsSync(path.join(STILLS, `${shot.id}-take${take}.png`))) continue;
        try {
          await generateStill(shot, take, m);
          await save(m);
        } catch (error) {
          console.error(`  FAIL   ${shot.id} take ${take}:`, (error as Error).message);
        }
      }
    }
  }

  for (const tier of ['fast', 'standard'] as const) {
    const flag = tier === 'fast' ? '--draft' : '--final';
    if (!argv.includes(flag)) continue;
    for (const shot of SHOTS.filter(pick)) {
      if (existsSync(path.join(FILM, tier, `${shot.id}.mp4`))) {
        console.log(`  skip     ${shot.id} (${tier} already generated)`);
        continue;
      }
      try {
        await generateFilm(shot, tier, m);
        await save(m);
      } catch (error) {
        console.error(`  FAIL     ${shot.id} (${tier}):`, (error as Error).message);
        if ((error as Error).message.includes('budget')) break;
      }
    }
  }

  await save(m);
  report();
}

void main();
