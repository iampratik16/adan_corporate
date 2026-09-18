import { Archivo, Newsreader } from 'next/font/google';

/**
 * Two families, self-hosted through next/font so there is no render-blocking
 * request to a third party and no layout shift when they arrive.
 *
 * Newsreader carries the hero, every display size, the pull quotes and the
 * large figures. It has a true optical-size axis, so a 104px headline and a
 * 20px quotation are drawn with different contrast rather than one outline
 * scaled twice.
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
  // The optical-size axis is back, and the hero is why.
  //
  // It was dropped once, on good evidence: a two-axis variable font is 129 kB
  // against 57 kB for one axis, and dropping it moved mobile Lighthouse 91 to
  // 93. The argument for dropping it was that the difference in letterforms is
  // "only visible when the two renderings are cropped and stacked". That was
  // true when Newsreader's largest appearance was a 112px H2. The hero headline
  // is now Newsreader at 104px, and opsz is precisely the axis that stops a
  // reading face from looking like a reading face enlarged: at opsz 72 the
  // stroke contrast opens up and the serifs sharpen. On the one element a fund
  // partner looks at first, that is not a crop-and-stack difference.
  //
  // The 72 kB is part-funded by deleting Instrument Serif, which existed only
  // to solve this same problem and is now unreferenced: see below. Net cost is
  // roughly 49 kB. Measured after the change with `pnpm check:budgets`.
  //
  // No italic: it was declared, measured, and used by no component.
  axes: ['opsz'],
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

/*
 * Instrument Serif is gone.
 *
 * It was introduced as a third family for the hero headline alone, on the
 * reasoning that Newsreader is drawn for reading at text sizes and lacks the
 * character a display line wants. That reasoning was sound and the remedy was
 * expensive: a whole extra preloaded face, on the critical path of every page,
 * serving one element.
 *
 * Newsreader with its optical-size axis is the cheaper answer to the same
 * problem, because opsz is the axis that gives a reading face display contrast.
 * Two axes of one family cost less than one axis of two families, and the page
 * is now set in a single serif from the hero to the footnotes.
 */

export const fontVariables = `${newsreader.variable} ${archivo.variable}`;
