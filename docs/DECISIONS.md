# Decisions

Every call made without the client in the room, with the reason. Where a decision departs from
`docs/BRIEF.md`, the departure is stated first.

---

## 1. The accent is the logo's red, not brass

**Departs from the brief.** The brief proposed Brass `#A38A5B` as the only accent.

The logo was downloaded and sampled: it is `#C00000` crimson and `#002060` navy, both Microsoft
Office theme defaults, which tells us the mark was drawn in PowerPoint. Brass sitting beside
crimson reads heraldic and clubby, which is the opposite of the restraint this audience expects.
The brief's own rule settles it: _"If the logo's primary colour fights this palette, the logo wins
and the palette is rebuilt around it."_

The logo's navy is hue 212 and the brief's Ink `#0B1D33` is hue 213, so those two were never in
conflict and Ink is unchanged. Only the accent moved.

Two rules keep red from making this a generic red-and-navy finance site:

- it stays under about 3% of any screen, and carries thin rules, active states and small marks only;
- **it never appears on a number**, where red reads as loss rather than as brand.

Rothschild & Co, the primary reference, does exactly this: a red mark on an otherwise restrained
navy and stone system.

## 2. `stone-500` was darkened to `#626D7A`

**Departs from the brief.** The brief specified `#6B7785`.

Measured at **4.25:1 on Paper**, which fails WCAG AA for normal text. It is the colour of the meta
text, the captions and the local-time clocks, so it appears under every partner's name and beside
every office. `#626D7A` measures 4.91:1. `scripts/check-contrast.ts` runs the full token matrix in
`pnpm check` so this cannot regress.

`stone-500` is a light-ground token only: on Ink it falls to 3.22:1, so dark bands use `stone-300`
for secondary text.

## 3. GSAP and ScrollTrigger were dropped

**Departs from the brief.** The brief asked for GSAP with ScrollTrigger and SplitText, plus Lenis.

Every motion the brief specifies is expressible in CSS: the clip-path image wipe with a scale
settle, underlines drawing from the left, button fill sweeps, the staggered line-mask hero reveal,
and one reveal per section opener. GSAP with ScrollTrigger is roughly 70 kB gzipped, against a
total homepage budget of 170 kB. Adding a timeline engine to stagger opacity would consume 40% of
the budget for no visible gain.

Section reveals use one `IntersectionObserver` (`RevealObserver`, about 20 lines) that unobserves
each element after it fires. Lenis is kept: it is about 3 kB, dynamically imported after idle, and
runs on fine-pointer devices only, off for touch and for reduced motion.

## 4. Hanken Grotesk was replaced with Archivo

**Departs from the brief**, under a condition the brief itself set: _"Confirm the font supports
[tabular lining figures]; if not, choose a grotesque that does."_

Hanken Grotesk's OpenType feature list is `ccmp dnom frac kern liga locl mark mkmk numr`. It has
**no `tnum`**. This site sets deal values, office clocks and a 31-row mandate table in columns, so
tabular figures are structural, not decorative.

Archivo was chosen over Public Sans, Instrument Sans, Schibsted Grotesk, Familjen Grotesk, Karla
and Work Sans, all of which also carry `tnum`. It is a true grotesque in the Roman plaque tradition
rather than a geometric or a startup sans, it has a width axis useful for tight table headers, and
it pairs with Newsreader without competing. Schibsted Grotesk was the runner-up.

Newsreader carries `tnum` and is otherwise unchanged, but its **optical-size axis was dropped after
measurement**. A two-axis variable font weighs 129 kB against 57 kB for one axis, and that 72 kB sits
on the critical path of every page. Removing it moved mobile Lighthouse from 91 to 93 and LCP from
3.5s to 3.2s, against a difference in the letterforms visible only when the two renderings are
cropped and stacked. Its declared-but-unused italic went at the same time, for another ~130 kB.

Both are one line to restore in `src/lib/fonts.ts`, which says so, and says to re-measure first.

## 5. The logo cannot be reversed, so the header carries a masthead plate

The only asset that exists is **291x36px with the white ground baked in and no alpha**. It was
alpha-keyed and rescaled, which is asset preparation; the mark itself is never redrawn, recoloured
or altered.

Keying revealed the wordmark is anti-aliased against white, so reversing it leaves hollow, outlined
letterforms. It therefore cannot sit on a dark ground at all. Over the hero film the mark sits in a
paper masthead plate that merges into the bar once the bar itself turns paper on scroll. The
constraint produced the composition, and it reads as a masthead rather than as a patch.

A vector file is the single most useful asset the client can supply. See `CLIENT-QUESTIONS.md`.

## 6. Portraits are cropped from inside the circular source avatars

**The brief assumed rectangular source photography.** It does not exist.

Every headshot on the old site is a roughly 400x400 circular avatar with a thick `#C00000` ring
baked into the pixels, on white, at inconsistent scales and tones. Resizing those to 4:5 produced a
grid of circles floating in boxes.

`scripts/media/portraits.ts` instead detects the ring by colour, takes its bounding box as the
circle, and crops the largest 4:5 rectangle that fits **inside** it, past the ring, so the ring is
removed rather than masked. Each crop is then greyscaled and shifted towards a common mean
luminance, so 29 portraits from 29 different shoots sit at one tonal level.

The geometry sets a hard ceiling: the inscribed rectangle in a circle of diameter _d_ is _d_/1.6
wide, which here is 146 to 392px. **Output stops at 320px.** Emitting 640 or 960 would be upscaling
a face and presenting it as a portrait. Cards and profiles are sized to what the source supports.

The brief expected some headshots to be third-party-hosted AI placeholders. They are not: all 29
are served from adancorporate.com. Three people appear on the old homepage with no profile page and
no photograph, and they get typographic monogram tiles.

No generative model touched any image of a named person.

## 7. Vertex AI model selection

Probed against this project on 2026-09-18 before any batch ran:

| Model                                                                     | Result                                       |
| ------------------------------------------------------------------------- | -------------------------------------------- |
| `gemini-3-pro-image` on `global`                                          | **Works.** Used for every still              |
| `gemini-3.1-flash-image`, `gemini-3-flash-image`, and `-preview` variants | 404                                          |
| `gemini-2.5-flash-image` and `-preview`                                   | 404                                          |
| `imagen-4.0-generate-001`                                                 | 404                                          |
| `veo-3.1-generate-001` and `-fast-`                                       | **Work**, on both `us-central1` and `global` |

The brief expected a cheaper flash model for secondary stills. None exists on this project, so
`gemini-3-pro-image` generated all of them. Images answer only on `global`; Veo answers in both, and
is called on `us-central1`. The pipeline carries a per-model location map rather than one constant.

**Four video generations were spent on availability probes** before the budget was being tracked.
That is recorded honestly in the manifest's running total.

## 8. Two scrims on the hero, not one

Text over film has to be measured, not judged by eye. `scripts/check-media-contrast.ts` screenshots
the page twice, once with the text visible and once hidden, diffs the two to derive a **glyph mask**,
and tests the computed text colour against the background at exactly those pixels, across the poster
and every extracted film frame.

Bounding-box measurement was tried first and is wrong for display type: an `h1` block spans the full
column, so its box includes the empty space after every short line. One bright door handle out there
reported 1.72:1 for a headline that never touches it.

The audit found two real failures: the supporting line at 3.16:1 and the header navigation at
2.31:1, both needing 4.5:1. A single vertical wash heavy enough to fix them flattened the lower half
of the photograph, so the hero carries two: a vertical scrim doing the general work, and a
left-to-right scrim under the copy column only, leaving the right of the frame, where the figures
cross, open. Everything now passes at 390px and 1440px.

## 9. Performance work, and one experiment that failed

Every change below was measured, not assumed.

| Change | Effect |
|---|---|
| Dropped Newsreader's unused italic | fonts 360 kB to 163 kB |
| Dropped Archivo's unused `wdth` axis | included above |
| Dropped Newsreader's `opsz` axis | fonts 163 kB to 91 kB; mobile 91 to 93 |
| Lazy-loaded the mobile sheet (Radix Dialog) | JS 176 kB to 171 kB |
| Replaced three Radix accordions with native `<details>` | JS 171 kB to 169 kB, and it now works with scripting disabled |
| Replaced Radix NavigationMenu with a disclosure | JS 169 kB to 159 kB |
| Split `/transactions` into two static routes | removed Radix Tabs and the last dynamic render |
| Removed the `<video poster>` duplicating the hero still | 60 kB per load |
| Shrank the footer roundel from a 180px PNG, made it lazy | 30 kB per load |

**The experiment that failed.** Fonts were un-preloaded on the theory that 163 kB at high priority
was starving the LCP image. Measured: first contentful paint went from 0.9s to **2.0s** and CLS from
0 to **0.044** as the fallback swapped. Reverted. The fonts belong on the critical path because the
page is typography.

**Chrome does not treat the hero photograph as an LCP candidate.** The brief expects the hero poster
to be the LCP element; it is not, and cannot be made so. A full-viewport image is excluded by
Chrome's background-like heuristic, so the largest contentful paint is the masthead mark, which is
why that carries `fetchPriority="high"` instead.

## 10. The network section is dark, the closing band is not

The globe needs a dark ground. That would have given the page four dark moments: hero, AI band,
network and a dark closing band. The contact band instead uses the `contact` photograph on paper,
so the page ends warm and the AI band keeps its weight as the one technical moment.

## 11. Corrections to the brief's own source abstract

The extraction pass contradicted several assumptions in the brief. The site follows the source.

| The brief says                                 | The site actually says                                                          |
| ---------------------------------------------- | ------------------------------------------------------------------------------- |
| 9 anonymised transactions                      | **36**, each with region, size, sector and role                                 |
| Live deals may be empty                        | **31 real mandates** in a server-rendered table. The Current mandates tab ships |
| 18 named people                                | **29 profile pages**, plus 3 homepage-only people                               |
| Keshav Adya is absent from the team list       | He is **Managing Partner**, listed second, and the page author                  |
| Some headshots are third-party AI placeholders | None are; all 29 are first-party                                                |
| 16 cities                                      | **14** are actually listed. Pune and Hamburg are partner cities, not offices    |

Nine people are **commented out** of the old homepage but still have live profile pages. They are
included, flagged, and raised as the most urgent client question.

## 12. Mandate and transaction size bands are defined here

The old site filtered on bands it never defined. Boundaries are stated in a comment at the top of
`content/transactions.ts` and applied consistently. Mandate bands keep the old site's own vocabulary
because that data is verbatim; completed transactions use the house vocabulary. The two do not match,
and that is deliberate.

## 13. Figures print their provenance

Every published number carries `needsConfirmation` and a `sourceNote` naming what contradicts it.
The homepage prints the four least contradictory. The "as at" footnote is a visible placeholder
rather than a date, because the old site gives none.
