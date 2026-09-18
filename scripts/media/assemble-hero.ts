/**
 * Assemble the 60-second hero film from its eight shots.
 *
 * A script rather than hand-run commands, so the film can be rebuilt from
 * scratch whenever one shot is replaced. See docs/HERO-FILM.md section 6.
 *
 *   npx tsx scripts/media/assemble-hero.ts            # from the standard tier
 *   npx tsx scripts/media/assemble-hero.ts --draft    # from the fast drafts
 *
 * The maths: 8 shots x 8s = 64.0s, minus 7 crossfades x 0.6s = 59.8s.
 */
import { execFile } from 'node:child_process';
import { mkdir, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
import { SHOTS } from './hero-film.js';

const run = promisify(execFile);
const ROOT = path.resolve(import.meta.dirname, '../..');
const OUT = path.join(ROOT, 'public/media');
const WORK = path.join(ROOT, 'media/originals/hero-film');
const QC = path.join(ROOT, 'media/qc/hero-film-60');

/** One grade for every shot, so eight generations read as one piece. */
const GRADE = 'eq=saturation=0.90:contrast=1.06:brightness=0.004:gamma=1.02';
const XFADE = 0.6;
const SHOT_SECONDS = 8;

/** Deliverables. The 60s film is desktop-only; the loop is what phones get. */
const FILM_RUNGS = [
  { width: 1920, crf: 30, vp9: 33, cap: 10 },
  { width: 1280, crf: 32, vp9: 35, cap: 6 },
] as const;
const LOOP_RUNGS = [
  { width: 1280, crf: 32, vp9: 35, cap: 1.5 },
  { width: 1920, crf: 30, vp9: 33, cap: 3 },
] as const;

async function duration(file: string): Promise<number> {
  const { stdout } = await run('ffprobe', [
    '-v',
    'error',
    '-show_entries',
    'format=duration',
    '-of',
    'default=noprint_wrappers=1:nokey=1',
    file,
  ]);
  return Number(stdout.trim());
}

/**
 * Chain seven xfades across eight inputs.
 *
 * Each transition's offset is the running length of everything already joined,
 * minus this transition's own overlap. Getting that wrong is how a film ends up
 * a second short per cut without anyone noticing until the loop stutters.
 */
function filterGraph(count: number, width: number): string {
  const parts: string[] = [];
  for (let i = 0; i < count; i += 1) {
    parts.push(`[${i}:v]scale=${width}:-2,${GRADE},setsar=1,fps=25[v${i}]`);
  }
  let last = 'v0';
  let elapsed = SHOT_SECONDS;
  for (let i = 1; i < count; i += 1) {
    const offset = (elapsed - XFADE).toFixed(3);
    const label = i === count - 1 ? 'out' : `x${i}`;
    parts.push(
      `[${last}][v${i}]xfade=transition=fade:duration=${XFADE}:offset=${offset}[${label}]`,
    );
    last = label;
    elapsed = elapsed + SHOT_SECONDS - XFADE;
  }
  return parts.join(';');
}

async function encode(
  inputs: string[],
  rung: { width: number; crf: number; vp9: number; cap: number },
  name: string,
): Promise<void> {
  const graph = filterGraph(inputs.length, rung.width);
  const mapOut = inputs.length > 1 ? ['-map', '[out]'] : [];
  const single = inputs.length === 1 ? ['-vf', `scale=${rung.width}:-2,${GRADE}`] : [];

  const mp4 = path.join(OUT, `${name}-${rung.width}.mp4`);
  await run(
    'ffmpeg',
    [
      '-y',
      ...inputs.flatMap((f) => ['-i', f]),
      ...(inputs.length > 1 ? ['-filter_complex', graph] : single),
      ...mapOut,
      '-an',
      '-c:v',
      'libx264',
      '-profile:v',
      'high',
      '-pix_fmt',
      'yuv420p',
      '-crf',
      String(rung.crf),
      '-preset',
      'veryslow',
      '-movflags',
      '+faststart',
      mp4,
    ],
    { maxBuffer: 1 << 26 },
  );

  const webm = path.join(OUT, `${name}-${rung.width}.webm`);
  await run(
    'ffmpeg',
    [
      '-y',
      ...inputs.flatMap((f) => ['-i', f]),
      ...(inputs.length > 1 ? ['-filter_complex', graph] : single),
      ...mapOut,
      '-an',
      '-c:v',
      'libvpx-vp9',
      '-crf',
      String(rung.vp9),
      '-b:v',
      '0',
      '-row-mt',
      '1',
      '-deadline',
      'good',
      '-cpu-used',
      '2',
      webm,
    ],
    { maxBuffer: 1 << 26 },
  );

  for (const file of [mp4, webm]) {
    const mb = (await stat(file)).size / 1_000_000;
    console.log(
      `  ${path.basename(file).padEnd(30)} ${mb.toFixed(2)} MB  ` +
        `${mb <= rung.cap ? 'within' : 'OVER'} the ${rung.cap} MB cap`,
    );
  }
}

async function main(): Promise<void> {
  const tier = process.argv.includes('--draft') ? 'fast' : 'standard';
  const dir = path.join(WORK, tier);

  const inputs = SHOTS.map((s) => path.join(dir, `${s.id}.mp4`));
  const missing = inputs.filter((f) => !existsSync(f));
  if (missing.length) {
    console.error(`  Missing ${missing.length} shot(s) in the ${tier} tier:`);
    missing.forEach((f) => console.error(`    ${path.relative(ROOT, f)}`));
    console.error(
      `  Generate them first: npx tsx scripts/media/generate-hero.ts --${tier === 'fast' ? 'draft' : 'final'}`,
    );
    process.exitCode = 1;
    return;
  }

  console.log(`  Assembling from the ${tier} tier: ${inputs.length} shots`);
  await mkdir(OUT, { recursive: true });

  for (const rung of FILM_RUNGS) await encode(inputs, rung, 'hero-film');

  // Shot 1 alone is the loop tier: the 8 seconds most visitors ever see.
  console.log('  Loop (shot 1 alone)');
  for (const rung of LOOP_RUNGS) await encode([inputs[0]!], rung, 'hero-loop');

  const seconds = await duration(path.join(OUT, 'hero-film-1920.mp4'));
  const ok = seconds >= 59.5 && seconds <= 60.5;
  console.log(`\n  Duration ${seconds.toFixed(2)}s  ${ok ? 'within' : 'OUTSIDE'} 59.5 to 60.5s`);
  if (!ok) process.exitCode = 1;

  // Frames for the loop-seam check and for the text-contrast audit, which reads
  // this directory and tests the headline against every frame it finds.
  await mkdir(QC, { recursive: true });
  for (const t of [0, 8, 16, 24, 32, 40, 48, 56, Math.floor(seconds) - 1]) {
    await run('ffmpeg', [
      '-y',
      '-ss',
      String(t),
      '-i',
      path.join(OUT, 'hero-film-1920.mp4'),
      '-frames:v',
      '1',
      '-vf',
      'scale=960:-2',
      path.join(QC, `t${String(t).padStart(2, '0')}.jpg`),
    ]).catch(() => {});
  }
  console.log(`  QC frames in ${path.relative(ROOT, QC)} (${(await readdir(QC)).length} frames)`);
  console.log('  Check the seam: the last frame and t00 should be the same composition.');
}

void main();
