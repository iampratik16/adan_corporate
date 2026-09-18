import { Archivo, Instrument_Serif, Newsreader } from 'next/font/google';

/**
 * Two families, self-hosted through next/font so there is no render-blocking
 * request to a third party and no layout shift when they arrive.
 *
 * Newsreader carries every display size, the pull quotes and the large figures.
 * It has a true optical-size axis, so a 112px H1 and a 20px quotation are drawn
 * with different contrast rather than one outline scaled twice.
 *
 * Archivo replaces the brief's Hanken Grotesk, which ships no `tnum`: its
 * feature list is ccmp dnom frac kern liga locl mark mkmk numr. This site sets
 * deal values, office clocks and transaction tables in columns, so tabular
 * figures are not optional. See docs/DECISIONS.md.
 */
export const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-newsreader',
  // No optical-size axis, and no italic.
  //
  // Both were declared and both were measured. The italic was never used by any
  // component. The opsz axis was used, but a two-axis variable font is 129 kB
  // against 57 kB for one axis, and that 72 kB sits on the critical path of
  // every page. Dropping it moved mobile Lighthouse from 91 to 93 and LCP from
  // 3.5s to 3.2s, against a difference in the letterforms that is only visible
  // when the two renderings are cropped and stacked.
  //
  // To put it back: add axes: ['opsz'] here, and re-run
  // `pnpm check:budgets` and a mobile Lighthouse run before committing.
  // Preloaded. Dropping the preload to give the LCP image more bandwidth was
  // tried and measured: first contentful paint went from 0.9s to 2.0s, CLS
  // went from 0 to 0.044 as the fallback swapped, and LCP barely moved. The
  // fonts are on the critical path because the page is typography.
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
  // No wdth axis. It was included for tight table headers and nothing uses
  // font-stretch, so it was pure payload.
  preload: true,
  fallback: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

/**
 * The hero headline only.
 *
 * Instrument Serif is a display face: higher contrast and more classical than
 * Newsreader, which is drawn for reading at text sizes. At the hero's size it
 * has the character the reference has and Newsreader does not. It carries no
 * `tnum`, so it can never be used for a figure, and it is deliberately scoped
 * to one element rather than made a third general-purpose family.
 */
export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-hero-face',
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export const fontVariables = `${newsreader.variable} ${archivo.variable} ${instrumentSerif.variable}`;
