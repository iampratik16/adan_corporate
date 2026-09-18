/**
 * Measure what each route actually sends over the wire.
 *
 * Next 16 with Turbopack does not print a First Load JS table, and the numbers
 * it used to print were uncompressed anyway. This reads `encodedBodySize` from
 * the Resource Timing API, which is the compressed byte count the browser
 * really received, which is what the budget is about.
 */
import { chromium } from '@playwright/test';
import { ROUTES } from '../tests/routes';

const BASE = process.env.BASE_URL ?? 'http://localhost:3111';
const JS_BUDGET_KB = 170;

interface Row {
  route: string;
  js: number;
  css: number;
  img: number;
  media: number;
  font: number;
  total: number;
}

async function main(): Promise<void> {
  const browser = await chromium.launch();
  const rows: Row[] = [];

  for (const route of ROUTES) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${BASE}${route}`, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    // Only first load counts: no scrolling, so lazy media stays out of it.
    await page.waitForTimeout(900);

    // No named closures inside evaluate: tsx compiles them with esbuild's
    // keepNames helper, which emits a __name() call that does not exist in the
    // browser and throws "__name is not defined".
    const measured = await page.evaluate(() => {
      const totals = { js: 0, css: 0, img: 0, media: 0, font: 0, doc: 0 };
      for (const entry of performance.getEntriesByType('resource')) {
        const e = entry as PerformanceResourceTiming;
        const bytes = e.encodedBodySize || e.transferSize || 0;
        if (/\.js(\?|$)/.test(e.name)) totals.js += bytes;
        else if (/\.css(\?|$)/.test(e.name)) totals.css += bytes;
        else if (/\.(mp4|webm)(\?|$)/.test(e.name)) totals.media += bytes;
        else if (/\.(woff2?|ttf)(\?|$)/.test(e.name)) totals.font += bytes;
        else if (/\.(avif|webp|png|jpe?g|svg)(\?|$)/.test(e.name)) totals.img += bytes;
      }
      for (const entry of performance.getEntriesByType('navigation')) {
        totals.doc += (entry as PerformanceNavigationTiming).encodedBodySize || 0;
      }
      return totals;
    });
    await page.close();

    const kb = (n: number) => Number((n / 1024).toFixed(1));
    rows.push({
      route,
      js: kb(measured.js),
      css: kb(measured.css),
      img: kb(measured.img),
      media: kb(measured.media),
      font: kb(measured.font),
      total: kb(measured.js + measured.css + measured.img + measured.font + measured.doc),
    });
  }

  await browser.close();

  console.log(`\n  Transferred on first load, compressed (kB)`);
  console.log(`  ${'-'.repeat(76)}`);
  console.log(
    `  ${'route'.padEnd(34)} ${'JS'.padStart(7)} ${'CSS'.padStart(6)} ${'fonts'.padStart(6)} ${'img'.padStart(7)} ${'total'.padStart(7)}`,
  );
  let over = 0;
  for (const row of rows) {
    const flag = row.js > JS_BUDGET_KB ? ' OVER' : '';
    if (flag) over += 1;
    console.log(
      `  ${row.route.padEnd(34)} ${String(row.js).padStart(7)} ${String(row.css).padStart(6)} ` +
        `${String(row.font).padStart(6)} ${String(row.img).padStart(7)} ${String(row.total).padStart(7)}${flag}`,
    );
  }
  console.log(`  ${'-'.repeat(76)}`);
  const worst = Math.max(...rows.map((r) => r.js));
  console.log(`\n  JS budget ${JS_BUDGET_KB} kB. Worst route: ${worst} kB.`);
  console.log(over ? `  ${over} route(s) over budget.\n` : `  All routes within budget.\n`);
  process.exit(over ? 1 : 0);
}

void main();
