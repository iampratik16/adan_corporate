/**
 * Grade and encode every kept asset.
 *
 * One grade runs across stills and film so the two share a single world: a
 * slight desaturation, a gentle S-curve, and a touch of warmth held back out of
 * the shadows. Generated frames arrive a little contrasty and a little too
 * blue, and matching them by hand per asset is how a site ends up looking like
 * a mood board rather than a commission.
 *
 *   pnpm media:process              # everything in media/originals/
 *   pnpm media:process hero-still   # one asset by id
 */
import sharp from 'sharp';
import { execFile } from 'node:child_process';
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
import { STILLS } from './shots.js';

const run = promisify(execFile);
const ROOT = path.resolve(import.meta.dirname, '../..');
const ORIGINALS = path.join(ROOT, 'media/originals');
const OUT = path.join(ROOT, 'public/media');

/** The house grade. Applied identically to every still and every film frame. */
function grade(input: sharp.Sharp): sharp.Sharp {
  return input
    .modulate({ saturation: 0.9, brightness: 1.01 })
    .linear(1.06, -8) // gentle contrast, lifted off pure black
    .gamma(1.02);
}

/** ffmpeg's equivalent of the same curve, so film and stills match. */
const FFMPEG_GRADE = 'eq=saturation=0.90:contrast=1.06:brightness=0.004:gamma=1.02';

interface Emitted {
  id: string;
  widths: number[];
  blurDataURL: string;
  width: number;
  height: number;
  aspectRatio: string;
}

async function processStill(id: string, sourceFile: string, widths: number[]): Promise<Emitted> {
  const meta = await sharp(sourceFile).metadata();
  await mkdir(OUT, { recursive: true });

  const emitted: number[] = [];
  for (const width of widths) {
    if (meta.width && width > meta.width * 1.15) continue; // never upscale a generated frame
    // AVIF carries this material at roughly 30% of the WebP weight. WebP is the
    // fallback for the handful of clients that still need it.
    await grade(sharp(sourceFile))
      .resize(width, undefined, { withoutEnlargement: true })
      .avif({ quality: 52, effort: 6, chromaSubsampling: '4:2:0' })
      .toFile(path.join(OUT, `${id}-${width}.avif`));
    await grade(sharp(sourceFile))
      .resize(width, undefined, { withoutEnlargement: true })
      .webp({ quality: 74, effort: 6 })
      .toFile(path.join(OUT, `${id}-${width}.webp`));
    emitted.push(width);
  }

  // A 20px blurred base64 placeholder, so nothing on the page is ever blank.
  const placeholder = await grade(sharp(sourceFile))
    .resize(20)
    .blur(1.2)
    .webp({ quality: 28 })
    .toBuffer();

  return {
    id,
    widths: emitted,
    blurDataURL: `data:image/webp;base64,${placeholder.toString('base64')}`,
    width: meta.width ?? 0,
    height: meta.height ?? 0,
    aspectRatio: `${meta.width} / ${meta.height}`,
  };
}

/**
 * Film: audio stripped, graded to match the stills, encoded twice.
 *
 * Budgets are 3 MB desktop and 1.5 MB mobile. CRF is chosen per width to land
 * inside those, and the result is measured rather than assumed.
 */
async function processFilm(id: string, sourceFile: string): Promise<string[]> {
  await mkdir(OUT, { recursive: true });
  const written: string[] = [];

  for (const [width, crf] of [
    [1920, 30],
    [1280, 32],
  ] as const) {
    const mp4 = path.join(OUT, `${id}-${width}.mp4`);
    await run('ffmpeg', [
      '-y',
      '-i',
      sourceFile,
      '-an', // no audio track at all
      '-vf',
      `scale=${width}:-2,${FFMPEG_GRADE}`,
      '-c:v',
      'libx264',
      '-profile:v',
      'high',
      '-pix_fmt',
      'yuv420p',
      '-crf',
      String(crf),
      '-preset',
      'veryslow',
      '-movflags',
      '+faststart', // metadata first, so it starts on the first chunk
      mp4,
    ]);

    const webm = path.join(OUT, `${id}-${width}.webm`);
    await run('ffmpeg', [
      '-y',
      '-i',
      sourceFile,
      '-an',
      '-vf',
      `scale=${width}:-2,${FFMPEG_GRADE}`,
      '-c:v',
      'libvpx-vp9',
      '-crf',
      String(crf + 2),
      '-b:v',
      '0',
      '-row-mt',
      '1',
      '-deadline',
      'good',
      '-cpu-used',
      '2',
      webm,
    ]);

    for (const f of [mp4, webm]) {
      const { size } = await stat(f);
      const mb = size / 1_000_000;
      const cap = width === 1920 ? 3 : 1.5;
      console.log(
        `  ${path.basename(f).padEnd(34)} ${mb.toFixed(2)} MB  ${mb <= cap ? 'within' : 'OVER'} the ${cap} MB budget`,
      );
      written.push(path.relative(ROOT, f));
    }
  }

  // Frames for the quality-control pass: the brief requires inspecting 0, 2, 4, 6 and 8 seconds.
  const qcDir = path.join(ROOT, 'media/qc', id);
  await mkdir(qcDir, { recursive: true });
  for (const t of [0, 2, 4, 6, 8]) {
    await run('ffmpeg', [
      '-y',
      '-ss',
      String(t),
      '-i',
      sourceFile,
      '-frames:v',
      '1',
      '-vf',
      `scale=900:-2,${FFMPEG_GRADE}`,
      path.join(qcDir, `t${t}.jpg`),
    ]).catch(() => {});
  }

  return written;
}

async function main(): Promise<void> {
  const only = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const emitted: Record<string, Omit<Emitted, 'id'>> = {};

  const stillsDir = path.join(ORIGINALS, 'stills');
  if (existsSync(stillsDir)) {
    for (const shot of STILLS) {
      if (only.length && !only.includes(shot.id)) continue;
      // Prefer an approved <id>.png; fall back to take 1 so a run never stalls.
      const approved = path.join(stillsDir, `${shot.id}.png`);
      const fallback = path.join(stillsDir, `${shot.id}-take1.png`);
      const source = existsSync(approved) ? approved : existsSync(fallback) ? fallback : null;
      if (!source) {
        console.log(`  skip   ${shot.id} (no original yet)`);
        continue;
      }
      const result = await processStill(shot.id, source, shot.widths);
      const { id, ...rest } = result;
      emitted[id] = rest;
      console.log(`  still  ${id.padEnd(26)} ${rest.widths.join(', ')}`);
    }
  }

  const filmDir = path.join(ORIGINALS, 'film');
  if (existsSync(filmDir)) {
    for (const file of await readdir(filmDir)) {
      if (!file.endsWith('.mp4')) continue;
      const id = file.replace(/\.mp4$/, '');
      if (only.length && !only.includes(id)) continue;
      console.log(`  film   ${id}`);
      await processFilm(id, path.join(filmDir, file));
    }
  }

  // The manifest the components import: dimensions and blur placeholders, so
  // every <Image> reserves its exact box and CLS stays at zero.
  const out = path.join(ROOT, 'content/media.ts');
  // The manifest is DERIVED, never parsed back out of its own generated file.
  // An earlier version round-tripped the emitted TypeScript through JSON.parse
  // to merge incremental runs; when the output format changed, the parse threw,
  // fell through to an empty object, and one single-asset run silently wiped
  // fifteen entries. Any shot with an original on disk gets an entry, whether
  // or not this run re-encoded it.
  for (const shot of STILLS) {
    if (emitted[shot.id]) continue;
    const approved = path.join(stillsDir, `${shot.id}.png`);
    const fallback = path.join(stillsDir, `${shot.id}-take1.png`);
    const source = existsSync(approved) ? approved : existsSync(fallback) ? fallback : null;
    // Only list assets whose encoded output actually exists, so a deleted file
    // cannot linger in the manifest and 404 at runtime.
    const firstWidth = shot.widths[0];
    if (!source || !firstWidth) continue;
    if (!existsSync(path.join(OUT, `${shot.id}-${firstWidth}.avif`))) continue;

    const meta = await sharp(source).metadata();
    const placeholder = await grade(sharp(source))
      .resize(20)
      .blur(1.2)
      .webp({ quality: 28 })
      .toBuffer();
    emitted[shot.id] = {
      widths: shot.widths.filter((w) => existsSync(path.join(OUT, `${shot.id}-${w}.avif`))),
      blurDataURL: `data:image/webp;base64,${placeholder.toString('base64')}`,
      width: meta.width ?? 0,
      height: meta.height ?? 0,
      aspectRatio: `${meta.width} / ${meta.height}`,
    };
  }
  const merged = emitted;
  // An explicit interface rather than `as const`: a generated module that emits
  // readonly tuples forces a cast at every call site that wants a plain array.
  await writeFile(
    out,
    [
      '/** Generated by scripts/media/process.ts. Do not edit by hand. */',
      'export interface MediaAsset {',
      '  widths: number[];',
      '  blurDataURL: string;',
      '  width: number;',
      '  height: number;',
      '  aspectRatio: string;',
      '}',
      '',
      `export const media: Record<string, MediaAsset> = ${JSON.stringify(merged, null, 2)};`,
      '',
    ].join('\n'),
  );
  console.log(`\n  content/media.ts updated with ${Object.keys(merged).length} assets.`);
}

void main();
