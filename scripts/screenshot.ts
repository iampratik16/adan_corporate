/**
 * Screenshot every route at every breakpoint, for the review rounds.
 *
 *   npx tsx scripts/screenshot.ts                      # all routes, all widths
 *   npx tsx scripts/screenshot.ts / /people --width 390
 *   npx tsx scripts/screenshot.ts --full               # full-page, not just the fold
 */
import { chromium, type Browser, type ConsoleMessage } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://localhost:3111';
const OUT = path.resolve(import.meta.dirname, '../.review');

const ALL_ROUTES = [
  '/',
  '/expertise',
  '/expertise/corporate-finance',
  '/expertise/mergers-acquisitions',
  '/expertise/strategy-leadership',
  '/expertise/risk-governance',
  '/expertise/ai-digital',
  '/transactions',
  '/transactions/mandates',
  '/people',
  '/about',
  '/insights',
  '/podcast',
  '/careers',
  '/contact',
];
const ALL_WIDTHS = [390, 768, 1440, 1920];

async function shoot(browser: Browser, route: string, width: number, full: boolean) {
  const context = await browser.newContext({
    viewport: { width, height: width < 700 ? 844 : 900 },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('console', (m: ConsoleMessage) => {
    if (m.type() === 'error') errors.push(m.text());
  });

  // Not networkidle: the globe canvas and the ambient field keep a rAF loop
  // running, and lazy media trickles in, so idle may never be reached.
  await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.evaluate(() => document.fonts.ready);
  // Scroll the whole page once so lazy images and IntersectionObservers fire.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
  });
  await page
    .waitForFunction(() => Array.from(document.images).every((img) => img.complete), {
      timeout: 12_000,
    })
    .catch(() => {});
  // Let reveals settle: they fire on intersection and run up to 900ms.
  await page.evaluate(() => {
    document
      .querySelectorAll('[data-reveal]')
      .forEach((el) => el.setAttribute('data-revealed', ''));
  });
  await page.waitForTimeout(700);

  const name = `${route === '/' ? 'home' : route.slice(1).replace(/\//g, '-')}-${width}${full ? '-full' : ''}.png`;
  await page.screenshot({ path: path.join(OUT, name), fullPage: full });
  await context.close();
  return { name, errors };
}

async function main() {
  const argv = process.argv.slice(2);
  const full = argv.includes('--full');
  const widthArg = argv.indexOf('--width');
  const widths = widthArg !== -1 ? [Number(argv[widthArg + 1])] : ALL_WIDTHS;
  const routes = argv.filter((a) => a.startsWith('/'));
  const targets = routes.length ? routes : ALL_ROUTES;

  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();

  for (const route of targets) {
    for (const width of widths) {
      try {
        const { name, errors } = await shoot(browser, route, width, full);
        console.log(
          `  ${name.padEnd(36)} ${errors.length ? `${errors.length} console error(s)` : 'clean'}`,
        );
        errors.slice(0, 3).forEach((e) => console.log(`      ${e.slice(0, 130)}`));
      } catch (error) {
        console.log(`  ${route} @ ${width}  FAILED: ${(error as Error).message.split('\n')[0]}`);
      }
    }
  }
  await browser.close();
  console.log(`\n  Written to .review/`);
}

void main();
