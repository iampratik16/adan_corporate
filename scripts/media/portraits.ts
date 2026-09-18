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
 *   2. Crop a SQUARE just inside the ring. Rendered with a 50% border radius,
 *      so the visible circle sits inside the ring and the square's corners,
 *      which would still carry it, are clipped.
 *   3. Normalise each one towards a common mean so portraits from as many
 *      different shoots sit at one tonal level.
 *
 * THEY USED TO BE GREYSCALE. That was the right call for a set of sources this
 * uneven: converting hid the fact that they were shot on different days, in
 * different rooms, by different people, against backgrounds ranging from a
 * studio wall to a garden. The client asked for colour.
 *
 * So the tone matching stays and the conversion goes. The exposure gain is
 * still MEASURED on a greyscale copy, because luma is what should be matched
 * across a set; it is simply applied to the colour image now. What the greyscale
 * was covering will be visible, and the answer to that is a consistent portrait
 * shoot, which is already an open question in docs/CLIENT-QUESTIONS.md.
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
/*
 * 1, not 4/5. The portraits are circles now, and that is a resolution decision
 * as much as a design one.
 *
 * The sources ARE circular avatars. Cropping the largest 4:5 rectangle that
 * fits inside one throws away most of it: that rectangle is only 0.625 of the
 * circle's diameter across, which is why 27 of 29 portraits were being upscaled.
 * A square crop displayed as a circle uses the whole diameter, so the same
 * source yields about 1.6x the width. The square's own corners fall outside the
 * circle and would show ring, but `border-radius` clips them away before anyone
 * sees them.
 */
const RATIO = 1;
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
  /*
   * 0.86 of the detected diameter.
   *
   *
   * The visible circle is the one inscribed in the square crop, so its radius
   * is half the crop side. 0.86 puts that at 0.43 of the detected diameter,
   * which clears a ring measuring roughly 4 to 6 per cent of it on these
   * sources. The square's corners still carry ring and background; the 50%
   * border radius in Portrait.tsx is what removes them.
   *
   * This was 0.94 of a 4:5 rectangle, whose four corners sit ON the circle by
   * definition and therefore landed inside the ring. Four red triangles were
   * baked into every portrait, and nobody saw them for weeks because the
   * pipeline then converted to greyscale and the ring went the same mid-grey as
   * the background. They appeared the moment colour was turned on.
   */
  const diameter = Math.min(circle.width, circle.height) * 0.86;
  const cropWidth = Math.floor(diameter);
  const cropHeight = cropWidth;
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

  // No .greyscale() here, deliberately. The gain above was measured on a
  // greyscale copy, which is the right way to match exposure across a set, and
  // is applied to the colour image.
  const graded = () =>
    sharp(file)
      .flatten({ background: '#ffffff' })
      .extract({ left, top, width: cropWidth, height: cropHeight })
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
      '/**',
      ' * Cache key for every portrait URL, stamped at the end of this run.',
      ' *',
      ' * /media is served `immutable` for a year and these filenames never change,',
      ' * so a browser that has seen one version of a portrait will not ask for',
      ' * another. Re-processing the set in colour changed every file on disk and',
      ' * nothing on screen until this existed. Appended as `?v=` by Portrait.tsx.',
      ' */',
      `export const portraitsVersion = '${Date.now().toString(36)}';`,
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
