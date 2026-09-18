# Final report

A new site for Adan Corporate, built from scratch. Nothing from the old build was ported: markup,
styling and structure are new, and the content is an abstract of the old site with its provenance
recorded.

---

## What was built

Seventeen route patterns, every one prerendered as static HTML.

| Route                                           | Records                                                                                                                |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `/`                                             | The homepage: film hero, figures, expertise index, AI band, transaction rail, network globe, people, insights, contact |
| `/expertise` + five pillar pages                | 5 pillars, 21 capability groups, 5 "how we work" sequences                                                             |
| `/transactions`                                 | 36 completed transactions, filterable by pillar, sector, region and size                                               |
| `/transactions/mandates`                        | 31 current mandates, with a placeholder disclaimer notice                                                              |
| `/people` + 32 profiles                         | Filterable by role, location and expertise, with name search                                                           |
| `/about`                                        | Firm, values, the Adan advantage, network, 14 offices                                                                  |
| `/insights`, `/podcast`, `/careers`, `/contact` | Library, channel, partnership route, enquiry router                                                                    |
| `/legal/[slug]`                                 | 6 policies, carried over verbatim                                                                                      |
| `sitemap.xml`, `robots.txt`, 404, OG images     | Generated from `content/`, never hand-listed                                                                           |

Plus 207 permanent redirects covering every URL in the old sitemap (176) and every team profile (29).
`vcard` route handlers on all 32 profiles.

---

## Measured results

### Lighthouse

|                         | Performance | Accessibility | Best practices | SEO     |
| ----------------------- | ----------- | ------------- | -------------- | ------- |
| **Desktop, `/`**        | **100**     | **100**       | **100**        | **100** |
| Mobile, `/`             | 94          | 100           | 100            | 100     |
| Mobile, `/transactions` | 99          | 100           | 100            | 100     |
| Mobile, `/about`        | 98          | 100           | 100            | 100     |
| Mobile, `/contact`      | 98          | 100           | 100            | 100     |
| Mobile, `/people`       | 93          | 100           | 100            | 100     |
| Mobile, pillar page     | 91          | 100           | 100            | 100     |

Mobile figures are Lighthouse's simulated 4G with a 4x CPU slowdown.

### Against the brief's budgets

| Budget                                 | Target                      | Result                                         |
| -------------------------------------- | --------------------------- | ---------------------------------------------- |
| Homepage JavaScript                    | under ~170 kB               | **159 kB**; worst route 160.7 kB               |
| CLS                                    | under 0.05                  | **0** on every route                           |
| INP proxy (total blocking time)        | under 200ms                 | **10 to 30ms**                                 |
| Lighthouse a11y / best practices / SEO | 95+                         | **100** on every route                         |
| Lighthouse mobile performance          | 90+                         | **91 to 99**                                   |
| LCP, desktop                           | under 2.0s                  | **0.7s**                                       |
| LCP, mobile                            | under 2.0s                  | **2.3s to 3.5s** — see below                   |
| Film                                   | 3 MB desktop, 1.5 MB mobile | hero **0.52 MB** / **0.22 MB**                 |
| WCAG                                   | 2.2 AA                      | 0 axe violations on 17 routes across 4 engines |
| No horizontal scroll at 320px          | required                    | verified on every route                        |

**Total first-load weight** runs from 276 kB (`/careers`) to 412 kB (a pillar page), of which
91 kB is fonts and 159 kB is JavaScript.

### The one budget not met, honestly

**Mobile LCP is 2.3s to 3.5s against a 2.0s target.** Three points on it:

1. It is a _simulated_ figure. The observed LCP on an unthrottled mobile emulation is about 150ms,
   and no network request finishes after 2s. Lighthouse replays the byte cost over a modelled
   1.6 Mbps link.
2. **The LCP element is the masthead logo, not the hero poster.** Chrome excludes a full-viewport
   image from LCP candidacy under its background-like heuristic. That cannot be overridden, so the
   priority hint sits on the mark instead. The brief expects the hero poster to be the LCP element;
   it cannot be.
3. It was worked hard. See `DECISIONS.md` section 9 for every change, with measurements, including
   one experiment that made things worse and was reverted.

### Tests

**256 passing** across Chromium, WebKit, Firefox and a Pixel 7 profile:

- every route returns 200, has one `h1`, and logs no console errors
- axe (WCAG 2.2 AA) on all 17 routes
- no horizontal scroll at 320px
- every route readable with **JavaScript disabled**, with no content stuck invisible
- both contact forms usable without scripting
- reduced motion: no film loads, no content hidden
- the transactions rail never advances on its own
- old URLs return 308 to the right destination
- every internal link resolves

Three audit scripts run outside Playwright: `check-contrast.ts` (the token matrix),
`check-media-contrast.ts` (text over photography, by glyph mask) and `check-budgets.ts`
(real transferred bytes per route).

---

## The header and the hero

The client supplied the roundel as a 200x200 PNG **with real transparency**, which replaced the
291x36 wordmark whose white ground was baked in. That one asset removed the workaround the header
had been built around.

- **The masthead is light frosted glass**, one row, with the mark and the firm's name at the left and
  letterspaced uppercase navigation across it. Composited against the hero at four opacities, a dark
  bar swallows the roundel's navy lower half; on light glass the whole mark reads. The reference site
  can use a dark bar because its mark is pure white.
- **The mega panel is gone.** It listed the five pillars with their descriptors and capability links
  and carried a featured transaction, all of which `/expertise` already holds. Removing it also
  removed the last reason to ship a navigation-menu library.
- **The hero is centred at 72px in Instrument Serif**, down from 112px in Newsreader. Instrument
  Serif has no tabular numerals, so it is scoped to the headline alone and never touches a figure.
- A centred headline needed a centred scrim: a vertical wash plus a radial pool, much larger below
  820px where the same copy fills far more of a narrow frame.

## Media

Generated through Vertex AI on Application Default Credentials. No API key exists in this repository.

**Budget used: 24 of 60 image generations, 4 of 12 films.** Four of those films were spent probing
model availability before the manifest was tracking, which is recorded rather than hidden.

- `gemini-3-pro-image` on `global` produced every still. Every flash image model and every Imagen
  endpoint returns 404 on this project.
- `veo-3.1-generate-001` produced the hero film, conditioned on the approved still so the poster and
  frame one are the same composition. The same still was passed as the last frame, so the loop closes.
- **The 60-second film is built as eight discrete 8-second shots**, not by chaining Veo's extend
  feature. Each extend hop is generated from the previous output, so palette drift and geometry warp
  compound across eight hops. Eight separate shots also give per-shot retries and an actual edit.
  Each is animated from an anchor still matched to `hero-key`, and shot 8 carries `hero-key` as its
  last frame so the loop closes in the model rather than in the edit.
  See `docs/HERO-FILM.md` and `scripts/media/assemble-hero.ts`.
- **Hero delivery is three tiers**: the poster (the LCP element), an 8-second loop requested once the
  poster has painted, and the full film fetched in the background and swapped in at a loop boundary,
  on desktop, wide, unmetered, motion-allowing clients only. The pause state persists in
  `sessionStorage`.
- 15 stills at up to 5 widths in AVIF and WebP; 4 films at 2 widths in MP4 and WebM, audio stripped.
- One grade runs across stills and film so they share a single world.

**Portraits never touched a generative model.** The 29 real headshots were downloaded and processed
deterministically. The source images turned out to be circular avatars with a red ring baked in, so
the pipeline detects the ring, crops the largest 4:5 rectangle that fits inside it, and matches every
portrait to a common tone. Three people have no photograph and get a typographic monogram.

Assets rejected on inspection and regenerated or re-picked:

- the first `contact` take read as a medieval cloister, wrong for a firm founded in 2013
- three hero takes: one for a near-in-focus figure, one for four near-identical silhouettes
- **hero film shot 5 take 1: a recognisable London skyline** through the rain. The brief forbids
  identifiable landmarks because this audience works in those cities. Take 2 dissolves the city
  properly and brings a brass mullion into the foreground, tying it to the other seven shots.

The rejection and its reason are recorded in `media/manifest.json`, not just in this report.

---

## Content

|                        |                                             |
| ---------------------- | ------------------------------------------- |
| People                 | 32 (3 without a photograph)                 |
| Completed transactions | 36                                          |
| Current mandates       | 31                                          |
| Offices                | 14, plus 6 partner cities                   |
| Pillars                | 5, with 21 capability groups                |
| Insights               | 13                                          |
| Published figures      | 7, of which **5 need partner confirmation** |

Everything is typed and Zod-validated at import, so a malformed record fails the build rather than
rendering an empty card.

**No fact on this site was invented.** Every one traces to `content/_source/`, the cleaned abstract
of the old site. Where the old site contradicts itself, which is most places, the contradiction is
recorded in the figure's `sourceNote` and raised in `CLIENT-QUESTIONS.md`.

---

## What blocks launch

Four things, all in `docs/CLIENT-QUESTIONS.md`:

1. **The regulatory and legal footer.** Currently a visible placeholder. The old site carries no
   authorisation statement at all, and its only regulatory sentence cites ICAEW guidance while
   linking an ICAS handbook.
2. **Nine people are commented out of the old homepage but still have live profile pages.** Are they
   still with the firm? Keshav Adya is the urgent one: Managing Partner, page author, and bylined on
   two insight posts.
3. **Sign-off on the AI & Digital proposition.** Every word is draft and deliberately narrow.
4. **A vector logo.** The only asset is 291x36px with the white ground baked in, and it cannot be
   reversed onto a dark background at all.

---

## Placeholders in the build

Every one is visible and marked, none is silent.

| Where                    | What                                                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Footer, every page       | The regulatory and company line                                                                                              |
| Homepage figure row      | "As at [date to be confirmed by the client]"                                                                                 |
| `/transactions/mandates` | A marked notice that the mandates' currency is unconfirmed                                                                   |
| Three people             | Monogram tiles instead of photographs                                                                                        |
| Several profiles         | No expertise tags, where the source's tags were copy-pasted from another partner and contradicted the person's own biography |
| Almaty office            | No phone and no address: the source's are Baku's                                                                             |

In development, any figure with `needsConfirmation` also renders a visible "Unconfirmed" marker.

---

## Handover

| Document                      | What it is                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------ |
| `README.md`                   | Run, environment, deploy, regenerate media                                     |
| `CLAUDE.md`                   | The working brief for anyone editing this codebase                             |
| `docs/DECISIONS.md`           | Every call made without the client, with the reason and the measurement        |
| `docs/CLIENT-QUESTIONS.md`    | Everything the site could not resolve, ranked by how much it blocks            |
| `docs/COPY-DRAFT.md`          | Every word written for this site, for partner review                           |
| `docs/design-direction.md`    | Tokens, type scale, grid, motion, wireframes, and a critique against the brief |
| `scripts/media/manifest.json` | Every generation call: model, prompt, parameters, timestamp, kept              |
| `content/redirects.ts`        | 207 permanent redirects                                                        |
| `content/_source/`            | The evidence behind every fact on the site                                     |
| `.review/`                    | Every route at 390, 768, 1440 and 1920                                         |

### Departures from the brief

Six, each measured and recorded in `DECISIONS.md`: the accent colour, `stone-500`, the body typeface,
the optical-size axis, GSAP, and the portrait crop method. Each one departs because following the
brief literally would have broken something else the brief also asks for, usually a budget or an
accessibility threshold.
