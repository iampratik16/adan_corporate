/**
 * Process the real headshots. NO GENERATIVE MODEL TOUCHES THESE IMAGES.
 *
 * What the source actually is: every headshot on the old site is a roughly
 * 400x400 circular avatar with a thick #C00000 ring baked into the pixels, on a
 * white ground, at inconsistent scales and tones. It is not portrait
 * photography, so the brief's "consistent 4:5 crop" needs a method rather than
 * a plain resize, or the result is a grid of circles floating in boxes.
 *
 * Method:
 *   1. Find the red ring by colour and take its bounding box. That is the
 *      circle. Fall back to the bounding box of non-white content where a
 *      source has no ring.
 *   2. Crop the largest 4:5 rectangle that fits INSIDE the circle, inset past
 *      the ring, so the ring is removed entirely rather than masked.
 *   3. Greyscale, then normalise each one towards a common mean so 29 portraits
 *      from 29 different shoots sit at one tonal level.
 *
 * Output widths stop at 320. The inscribed rectangle is only about 237px wide,
 * so anything beyond that is upscaling a face and calling it a portrait. A
 * consistent portrait shoot is requested in docs/CLIENT-QUESTIONS.md.
 */
import sharp from 'sharp';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const SOURCE = path.join(ROOT, 'media/originals/people');
const OUT = path.join(ROOT, 'public/media/people');

/** Widths the source genuinely supports. */
const WIDTHS = [240, 320] as const;
const RATIO = 4 / 5;
/** Target mean luminance, so every portrait sits at one tonal level. */
const TARGET_MEAN = 138;

interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** Bounding box of the baked-in red ring, or of all non-white content. */
async function findCircle(file: string): Promise<Box | null> {
  const { data, info } = await sharp(file)
    .flatten({ background: '#ffffff' })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  let rx0 = width;
  let ry0 = height;
  let rx1 = -1;
  let ry1 = -1;
  let cx0 = width;
  let cy0 = height;
  let cx1 = -1;
  let cy1 = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * channels;
      const r = data[i]!;
      const g = data[i + 1]!;
      const b = data[i + 2]!;

      // The ring: strongly, unambiguously red.
      if (r > 110 && r > g * 1.8 && r > b * 1.8) {
        if (x < rx0) rx0 = x;
        if (y < ry0) ry0 = y;
        if (x > rx1) rx1 = x;
        if (y > ry1) ry1 = y;
      }
      // Any content at all, for sources with no ring.
      if (Math.min(r, g, b) < 238) {
        if (x < cx0) cx0 = x;
        if (y < cy0) cy0 = y;
        if (x > cx1) cx1 = x;
        if (y > cy1) cy1 = y;
      }
    }
  }

  const ringFound = rx1 > rx0 && rx1 - rx0 > width * 0.5;
  const [x0, y0, x1, y1] = ringFound ? [rx0, ry0, rx1, ry1] : [cx0, cy0, cx1, cy1];
  if (x1 <= x0 || y1 <= y0) return null;
  return { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
}

async function process(slug: string, file: string) {
  const circle = await findCircle(file);
  const meta = await sharp(file).metadata();
  if (!circle || !meta.width || !meta.height) return null;

  // Inset past the ring itself, then take the inscribed 4:5 rectangle:
  // for a circle of diameter d, w = d / sqrt(1 + (5/4)^2) = d / 1.6008.
  const diameter = Math.min(circle.width, circle.height) * 0.94;
  const cropWidth = Math.floor(diameter / Math.sqrt(1 + (1 / RATIO) ** 2));
  const cropHeight = Math.floor(cropWidth / RATIO);
  const centreX = circle.left + circle.width / 2;
  // Sit slightly above centre: faces read better with more room below the chin
  // than above the crown.
  const centreY = circle.top + circle.height / 2 - circle.height * 0.04;

  const left = Math.max(0, Math.min(meta.width - cropWidth, Math.round(centreX - cropWidth / 2)));
  const top = Math.max(0, Math.min(meta.height - cropHeight, Math.round(centreY - cropHeight / 2)));

  const cropped = sharp(file)
    .flatten({ background: '#ffffff' })
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .greyscale();

  // Match tone across the set: measure, then shift towards the common mean.
  const stats = await cropped.clone().stats();
  const mean = stats.channels[0]?.mean ?? TARGET_MEAN;
  const gain = Math.max(0.8, Math.min(1.25, TARGET_MEAN / Math.max(mean, 1)));

  const graded = () =>
    sharp(file)
      .flatten({ background: '#ffffff' })
      .extract({ left, top, width: cropWidth, height: cropHeight })
      .greyscale()
      .linear(gain, 6) // matched exposure, shadows lifted off pure black
      .modulate({ brightness: 1 });

  await mkdir(OUT, { recursive: true });
  for (const width of WIDTHS) {
    const resize = { width, height: Math.round(width / RATIO), fit: 'cover' as const };
    await graded()
      .resize(resize)
      .sharpen({ sigma: 0.6 })
      .avif({ quality: 62, effort: 6 })
      .toFile(path.join(OUT, `${slug}-${width}.avif`));
    await graded()
      .resize(resize)
      .sharpen({ sigma: 0.6 })
      .webp({ quality: 80, effort: 6 })
      .toFile(path.join(OUT, `${slug}-${width}.webp`));
  }

  const placeholder = await graded().resize(12).blur(0.8).webp({ quality: 30 }).toBuffer();

  return {
    blurDataURL: `data:image/webp;base64,${placeholder.toString('base64')}`,
    width: cropWidth,
    height: cropHeight,
    sourceMean: Math.round(mean),
    gain: Number(gain.toFixed(3)),
    /** True where the crop had to be upscaled to reach the largest width. */
    upscaled: cropWidth < WIDTHS[WIDTHS.length - 1]!,
  };
}

async function main(): Promise<void> {
  const files = await readdir(SOURCE);
  // Prefer the profile image over the listing one: it is consistently larger.
  const bySlug = new Map<string, string>();
  for (const file of files) {
    const slug = file.replace(/-(profile|listing)\.(png|webp|jpg|jpeg)$/i, '');
    const isProfile = /-profile\./i.test(file);
    if (isProfile || !bySlug.has(slug)) bySlug.set(slug, file);
  }

  const portraits: Record<string, unknown> = {};
  const upscaled: string[] = [];

  for (const [slug, file] of [...bySlug].sort()) {
    const result = await process(slug, path.join(SOURCE, file));
    if (!result) {
      console.log(`  FAIL  ${slug}`);
      continue;
    }
    const { sourceMean, gain, upscaled: up, ...record } = result;
    portraits[slug] = record;
    if (up) upscaled.push(slug);
    console.log(
      `  ${slug.padEnd(26)} crop ${result.width}x${result.height}  mean ${sourceMean} gain ${gain}`,
    );
  }

  await writeFile(
    path.join(ROOT, 'content/portraits.ts'),
    [
      '/** Generated by scripts/media/portraits.ts. Do not edit by hand. */',
      '',
      'export interface PortraitAsset {',
      '  blurDataURL: string;',
      '  width: number;',
      '  height: number;',
      '}',
      '',
      '/** Widths actually emitted. The source avatars do not support more. */',
      `export const portraitWidths = ${JSON.stringify([...WIDTHS])} as const;`,
      '',
      `export const portraits: Record<string, PortraitAsset> = ${JSON.stringify(portraits, null, 2)};`,
      '',
      '/** People with no usable photograph. They get a typographic monogram. */',
      'export const missingPortraits: string[] = [];',
      '',
    ].join('\n'),
  );

  console.log(`\n  ${Object.keys(portraits).length} portraits written to public/media/people/`);
  if (upscaled.length) {
    console.log(`  ${upscaled.length} are below the largest output width and were upscaled.`);
  }
}

void main();
