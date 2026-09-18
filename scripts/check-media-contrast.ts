/**
 * Contrast audit for text that sits on top of media.
 *
 * Token pairs are handled by scripts/check-contrast.ts. This covers the harder
 * case the brief calls out: copy over a photograph or a film, where the
 * background differs behind every glyph.
 *
 * Method. A bounding box is the wrong unit here: a display <h1> block spans the
 * full column, so its box includes the empty space after every short line, and
 * one bright highlight out there fails a headline that never touches it. So we
 * screenshot twice, once with the text visible and once with it hidden, and
 * diff the two. Pixels that change a lot are solid letterform interiors. The
 * background is then sampled from the hidden frame at exactly those pixels.
 *
 * The result is the true worst case behind an actual glyph.
 */
import { chromium, type Page } from '@playwright/test';
import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://localhost:3111';
const ROOT = path.resolve(import.meta.dirname, '..');
const HEIGHT = 900;

function relLuminance(r: number, g: number, b: number): number {
  const f = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

const contrast = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

/** WCAG 2.2: 3:1 for >=24px, or >=18.66px bold. 4.5:1 otherwise. */
const requirement = (size: number, weight: number) =>
  size >= 24 || (size >= 18.66 && weight >= 700) ? 3 : 4.5;

function parseColour(css: string): [number, number, number, number] {
  const m = css.match(/rgba?\(([^)]+)\)/);
  if (!m) return [255, 255, 255, 1];
  const parts = m[1]!
    .split(/[,\s/]+/)
    .filter(Boolean)
    .map(Number);
  return [parts[0] ?? 255, parts[1] ?? 255, parts[2] ?? 255, parts[3] ?? 1];
}

interface Target {
  selector: string;
  label: string;
}

/** Selectors for every piece of text on this site that sits over media. */
const TARGETS: Target[] = [
  { selector: 'section:first-of-type h1', label: 'hero H1' },
  { selector: 'section:first-of-type h1 + p', label: 'hero supporting line' },
  { selector: 'section:first-of-type a.link-underline', label: 'hero quiet link' },
  { selector: 'section:first-of-type a.btn', label: 'hero primary action' },
  { selector: 'header a[href="/transactions"]', label: 'header nav link' },
  { selector: 'header a[href="/insights"]', label: 'header utility link' },
];

const HIDE =
  'section:first-of-type h1, section:first-of-type p, section:first-of-type a, section:first-of-type button, header a, header button';

async function capture(page: Page, hidden: boolean): Promise<Buffer> {
  await page.evaluate(
    ({ selector, hide }) => {
      document.querySelectorAll(selector).forEach((el) => {
        (el as HTMLElement).style.visibility = hide ? 'hidden' : '';
      });
    },
    { selector: HIDE, hide: hidden },
  );
  await page.waitForTimeout(120);
  return page.screenshot({
    clip: { x: 0, y: 0, width: page.viewportSize()!.width, height: HEIGHT },
  });
}

async function main(): Promise<void> {
  const width = Number(process.argv[2] ?? 1440);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height: HEIGHT } });
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(700);

  const measured = await page.evaluate(
    (targets: Target[]) =>
      targets
        .map(({ selector, label }) => {
          const el = document.querySelector(selector);
          if (!el) return null;
          const r = el.getBoundingClientRect();
          const s = getComputedStyle(el);
          return {
            label,
            rect: { x: r.x, y: r.y, width: r.width, height: r.height },
            colour: s.color,
            ownBackground: s.backgroundColor,
            fontSize: parseFloat(s.fontSize),
            weight: Number(s.fontWeight) || 400,
          };
        })
        .filter((t): t is NonNullable<typeof t> => t !== null),
    TARGETS,
  );

  const withText = await capture(page, false);
  const withoutText = await capture(page, true);

  const backgrounds: Array<{ name: string; buffer: Buffer }> = [
    { name: 'poster', buffer: withoutText },
  ];
  // Each film frame is painted INTO the page rather than diffed against as a bare
  // image. The film sits under both hero scrims, so a raw frame is a composite
  // that never reaches the screen: measuring against it fails text that is in
  // fact legible. Swapping the frame into the poster <img> and re-shooting keeps
  // the scrims, the header and the page's own colour management in the result.
  // Both tiers: the 60-second film first, because the brief sets the scrim from
  // the brightest frame of the film, and the 8-second loop, which is what most
  // visitors actually see.
  for (const dir of ['media/qc/hero-film-60', 'media/qc/hero-film']) {
    const qc = path.join(ROOT, dir);
    if (!existsSync(qc)) continue;
    const tier = dir.endsWith('-60') ? 'film' : 'loop';
    for (const file of (await readdir(qc)).filter((f) => f.endsWith('.jpg'))) {
      const uri = `data:image/jpeg;base64,${(
        await sharp(path.join(qc, file)).resize(width, HEIGHT, { fit: 'cover' }).jpeg().toBuffer()
      ).toString('base64')}`;
      await page.evaluate(async (src: string) => {
        const picture = document.querySelector('section:first-of-type picture');
        picture?.querySelectorAll('source').forEach((s) => s.remove());
        document.querySelectorAll('section:first-of-type video').forEach((v) => v.remove());
        const img = picture?.querySelector('img');
        if (!img) return;
        img.removeAttribute('srcset');
        img.removeAttribute('sizes');
        img.style.backgroundImage = 'none';
        img.src = src;
        await img.decode().catch(() => {});
      }, uri);
      backgrounds.push({
        name: `${tier} ${file.replace('.jpg', '')}`,
        buffer: await capture(page, true),
      });
    }
  }

  await browser.close();

  const raw = (b: Buffer) => sharp(b).raw().toBuffer({ resolveWithObject: true });
  const shown = await raw(withText);
  const hiddenFrames = await Promise.all(
    backgrounds.map(async (b) => ({ name: b.name, ...(await raw(b.buffer)) })),
  );
  const base = hiddenFrames[0]!;

  let failures = 0;
  console.log(`\n  Text-on-media contrast at ${width}px  (glyph-mask method)`);
  console.log(`  ${'-'.repeat(78)}`);

  for (const target of measured) {
    // An element painting its own opaque surface is not text on media: what is
    // behind it never shows through. Those pairs belong to the token audit in
    // scripts/check-contrast.ts.
    const ownAlpha = parseColour(target.ownBackground)[3];
    if (ownAlpha >= 0.9) {
      console.log(`  n/a   ${target.label.padEnd(24)} sits on its own opaque surface`);
      continue;
    }
    const min = requirement(target.fontSize, target.weight);
    const x0 = Math.max(0, Math.round(target.rect.x));
    const y0 = Math.max(0, Math.round(target.rect.y));
    const x1 = Math.min(width, Math.round(target.rect.x + target.rect.width));
    const y1 = Math.min(HEIGHT, Math.round(target.rect.y + target.rect.height));
    if (x1 <= x0 || y1 <= y0) continue;

    // Solid glyph interiors: where the visible frame differs strongly from the
    // hidden one. Antialiased edges are excluded, since they are not full-colour
    // text and are not what legibility depends on.
    const mask: number[] = [];
    const ch = shown.info.channels;
    for (let y = y0; y < y1; y += 1) {
      for (let x = x0; x < x1; x += 1) {
        const i = (y * shown.info.width + x) * ch;
        const j = (y * base.info.width + x) * base.info.channels;
        const delta =
          Math.abs(shown.data[i]! - base.data[j]!) +
          Math.abs(shown.data[i + 1]! - base.data[j + 1]!) +
          Math.abs(shown.data[i + 2]! - base.data[j + 2]!);
        if (delta > 150) mask.push(i / ch);
      }
    }

    if (mask.length === 0) {
      console.log(`  SKIP  ${target.label.padEnd(24)} no glyph pixels detected`);
      continue;
    }

    // The text colour comes from the computed style, not from a sampled pixel:
    // sampling lands on antialiased edges and understates the real contrast.
    // The glyph mask decides WHICH background pixels to test; the computed
    // colour decides WHAT is being tested against them.
    const [tr, tg, tb, ta] = parseColour(target.colour);

    let worst = Infinity;
    let worstFrom = '';
    for (const frame of hiddenFrames) {
      let frameWorst = Infinity;
      for (const p of mask) {
        const k = p * frame.info.channels;
        const br = frame.data[k]!;
        const bgc = frame.data[k + 1]!;
        const bb = frame.data[k + 2]!;
        const bg = relLuminance(br, bgc, bb);
        // Translucent text composites over whatever is behind it.
        const fgLum = relLuminance(
          ta * tr + (1 - ta) * br,
          ta * tg + (1 - ta) * bgc,
          ta * tb + (1 - ta) * bb,
        );
        const ratio = contrast(fgLum, bg);
        if (ratio < frameWorst) frameWorst = ratio;
      }
      if (frameWorst < worst) {
        worst = frameWorst;
        worstFrom = frame.name;
      }
    }

    const pass = worst >= min;
    if (!pass) failures += 1;
    console.log(
      `  ${pass ? 'PASS' : 'FAIL'}  ${worst.toFixed(2).padStart(5)}:1  (min ${min})  ` +
        `${target.label.padEnd(24)} ${Math.round(target.fontSize)}px  ` +
        `${mask.length} glyph px  worst on ${worstFrom}`,
    );
  }

  console.log(`  ${'-'.repeat(78)}`);
  console.log(
    failures ? `\n  ${failures} failing element(s).\n` : `\n  All text on media passes.\n`,
  );
  process.exit(failures ? 1 : 0);
}

void main();
