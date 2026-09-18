# Adan Corporate

A site for an international corporate advisory firm. The full brief is `docs/BRIEF.md`;
re-read it at the start of every phase. Decisions already taken are in `docs/DECISIONS.md`.

The test for any change: would this make a fund partner more or less likely to take the meeting?
Where craft and credibility pull apart, credibility wins.

## Commands

```bash
pnpm dev                  # development
pnpm build && pnpm start  # production, port 3000
pnpm check                # typecheck, lint, format, Playwright, axe

npx tsx scripts/check-contrast.ts          # WCAG audit of the design tokens
npx tsx scripts/check-media-contrast.ts    # text-over-photography, glyph-mask method
npx tsx scripts/screenshot.ts / --width 390 --full   # review screenshots into .review/

pnpm media:generate       # Vertex AI, ADC only, never an API key
pnpm media:process        # grade, encode, write content/media.ts
```

## Design tokens

Defined once in `src/app/globals.css` under `@theme`. Tailwind generates a utility from every
one of them, so **write `text-display-1`, not `text-[var(--text-display-1)]`**. The arbitrary
form is ambiguous to Tailwind and silently compiles to a colour.

| Token                   | Use                                                                                                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ink` `#0B1D33`         | Text on light; the ground of dark bands                                                                                                                                            |
| `paper` `#F6F7F8`       | Page background                                                                                                                                                                    |
| `white`                 | Raised surfaces                                                                                                                                                                    |
| `stone-700/500/300/200` | Secondary text, meta text, rules, borders                                                                                                                                          |
| `accent` `#C00000`      | The logo's red. Thin rules, active states, small marks. Under 3% of a screen. **Never on a number**, where red reads as loss. `accent-bright` on dark, `accent-deep` for link text |

`font-display` is Newsreader (H1-H4, pull quotes, figures). `font-sans` is Archivo (body, UI, all
tabular data). Sizes: `text-display-1..4`, `text-figure`, `text-lead`, `text-body`, `text-small`,
`text-micro`.

- `on-ink` sets the light-on-dark **colour context only**. `band-ink` is that **plus** a dark
  background. Content over the hero film uses `on-ink`; it must never paint a surface over media.
- Every number gets `tabular` or lives inside `table`/`time`/`.figure-value`.
- Layout: `container-site`, `grid-site` (12 col), `section-y`, `measure`, `rule`.

## Motion

CSS and IntersectionObserver only. No GSAP; see `docs/DECISIONS.md`. One easing family
(`ease-out-expo` / `ease-out-quart`), reveals 500-900ms, interface feedback 150-250ms, nothing
bounces. Add `data-reveal` (optionally `data-reveal-delay="1|2|3"`) to a **section opener**, not to
every element. Unprompted motion is limited to three things: the hero load, one reveal per section
opener, and the ambient globe and AI field.

## Content

Everything under `content/`, typed and Zod-validated at import. `@content/*` is the alias.
A malformed record fails the build rather than rendering an empty card.

**Truth rules.** Never invent a client, deal, figure, award, testimonial or credential. Every fact
traces to `content/_source/`, which is the abstract of the old site. The old site contradicts itself
on nearly every number, so figures carry `needsConfirmation` and a `sourceNote`; unresolved items go
to `docs/CLIENT-QUESTIONS.md`.

**Copy.** British English, sentence case, plain and active. No hype words, no exclamation marks,
no em-dashes. All copy is draft for partner review and collected in `docs/COPY-DRAFT.md`.

**People.** No generative model ever touches an image of a named person. Headshots are downloaded
and processed deterministically: one 4:5 crop, greyscale, matched contrast. No photograph means a
typographic monogram, not a stock face. Publish firm-domain email addresses only.

## Budgets, enforced

LCP under 2.0s on a mid-range phone on 4G, with the hero poster as the LCP element. CLS under 0.05.
INP under 200ms. Homepage JavaScript under ~170 kB gzipped first load. Lighthouse 95+ for
accessibility, best practices and SEO; 90+ for mobile performance. WCAG 2.2 AA throughout.

Keep the client bundle small: server components by default, and reduce content modules to the few
fields a client component actually renders before crossing the boundary (see
`src/components/layout/Header.tsx`). `cobe` and `lenis` are dynamically imported when needed.

## Reuse before writing

`PageHeader`, `Tombstone`, `Prose`, `FilterGroup`/`ResultCount`, `ContactBand`, `Portrait`,
`LocalTime`, `Logo`/`Roundel`, `MeridianField`. Check `src/components/shared/` and `src/components/ui/`
before adding anything.

## Avoid

Uppercase tracked eyebrows over every heading. 01/02/03 markers on things that are not a sequence
(the pillar "How we work" steps are a real sequence, so numbering is legitimate there). An arrow on
every link. Rounded cards with soft grey shadows. Gradient washes and glass. One italic or coloured
word in a headline. Fade-and-slide on every section. Counters that spin up from zero. Handshakes,
chess pieces, glowing blue brains. Custom cursors, preloaders, parallax for its own sake, chat
widgets, carousels that advance on their own.
