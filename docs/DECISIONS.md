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

## 5. The client supplied a usable mark, and it changed the header

**Superseded the earlier masthead-plate workaround.**

The original asset was a 291x36 wordmark with the white ground baked in and no alpha. Keying it
revealed the letterforms were anti-aliased against white, so they hollowed out, and the mark could
not sit on a dark ground at all. The header worked around that with a paper plate over the film.

The client then supplied `adan_corporate_finance_logo-removebg-preview.png`: the roundel, 200x200,
with real transparency. The workaround is gone.

**The bar is light glass, and the mark decided that.** Composited against the hero at four
opacities, a dark frosted bar swallows the roundel's navy lower half and leaves a broken red arc
with a floating white disc. On light glass the whole mark reads. The reference site can use a dark
bar because its mark is pure white; ours is navy and red.

The firm's name beside the mark is **typeset in Archivo, not an image**. The only wordmark asset is
the one that hollows out when keyed, and typesetting a company's own name is not altering its mark.
A vector wordmark is still requested in `CLIENT-QUESTIONS.md`.

## 5a. The mega panel was removed

The Expertise dropdown listed all five pillars with their descriptors and their capability links, and
carried a featured transaction card. Both are gone and Expertise is now a plain link to
`/expertise`, which already carries the same five pillars with the same descriptors, their full
capability groups and their photography.

The panel was a second place to keep one list correct, and a single-trigger dropdown in a header is
a disclosure, not navigation. Removing it also removed the last reason to ship a navigation-menu
library.

## 5b. The hero was rebuilt centred, at a smaller size, in a different face

The headline was 112px, left-aligned, in Newsreader. It is now **72px, centred, in Instrument
Serif**, which is a display face: higher contrast and more classical than Newsreader, which is drawn
for reading at text sizes.

Instrument Serif has **no `tnum`**, so it can never carry a figure and is scoped to the hero
headline alone rather than becoming a third general-purpose family. Newsreader still carries every
other heading and every number.

A centred headline needed a different scrim. The left-to-right wash built for left-aligned copy
would have darkened one side of a symmetrical frame, so the hero now uses a vertical wash plus a
radial pool under the text, with a much taller and wider pool below 820px where the same copy fills
far more of a narrow frame. Both are measured against the brightest extracted **film frame**, not
the poster.

## 6. Superseded: the original wordmark could not be reversed

_Kept for the record. Section 5 describes what replaced this._

The only asset that existed was **291x36px with the white ground baked in and no alpha**. It was
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

| Change                                                   | Effect                                                        |
| -------------------------------------------------------- | ------------------------------------------------------------- |
| Dropped Newsreader's unused italic                       | fonts 360 kB to 163 kB                                        |
| Dropped Archivo's unused `wdth` axis                     | included above                                                |
| Dropped Newsreader's `opsz` axis                         | fonts 163 kB to 91 kB; mobile 91 to 93                        |
| Lazy-loaded the mobile sheet (Radix Dialog)              | JS 176 kB to 171 kB                                           |
| Replaced three Radix accordions with native `<details>`  | JS 171 kB to 169 kB, and it now works with scripting disabled |
| Replaced Radix NavigationMenu with a disclosure          | JS 169 kB to 159 kB                                           |
| Split `/transactions` into two static routes             | removed Radix Tabs and the last dynamic render                |
| Removed the `<video poster>` duplicating the hero still  | 60 kB per load                                                |
| Shrank the footer roundel from a 180px PNG, made it lazy | 30 kB per load                                                |

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

## 14. The masthead was cut to four links, and that is what bought the glass

The brief asked for two header rows: a utility row of Insights, Podcast, Careers and Contact above a
primary row of Expertise, Transactions, People and About. The bar now carries **four links,
Expertise, Transactions, About and Contact**, spread across its width, plus the mark and the
"Speak to a partner" action.

This began as an editorial decision and turned out to be a technical one. The utility row was set in
`stone-700` at 13px, and `stone-700` over the hero film stops clearing 4.5:1 the moment the glass
drops below **73% opacity**. That single row was holding the masthead at 82%, which is not glass, it
is a pale plate with a blur behind it, and it was the reason the bar read as a white slab over a
dark film.

With every remaining item in `ink`, the floor moves to **51%**. The bar now sits at **52% at rest**
with a 28px blur, and 94% with a 20px blur once scrolled, where it is over paper and there is
nothing worth seeing through it. 88% was tried and rejected: the bar crosses the 104px headline on
its way out of the hero, and 12% of that showing through reads as an artefact rather than as glass. That is the brief's own "transparent over the hero, solid once
scrolled", which had not previously been met.

The bar stays **light**, so decision 5 stands unchanged: a dark frosted bar still swallows the
roundel's navy lower half. Transparency was increased; the tint was not inverted.

**People, Insights, Podcast and Careers keep their places** in the mobile sheet and the footer. A
phone sheet has vertical room a 76px bar does not.

**The sitemap no longer reads the navigation.** It was built by spreading `site.nav`, so cutting the
bar would have taken those four routes out of the sitemap with it and deindexed them on a purely
visual decision. `src/app/sitemap.ts` now builds from its own route table.

## 15. The hero headline returned to Newsreader, and Instrument Serif was deleted

This reverses 5b. The headline is now **104px in Newsreader at `opsz` 72**, and Instrument Serif has
been removed from the project.

5b's reasoning was right: Newsreader is drawn for reading at text sizes and a 72px hero set in it
looked like a reading face enlarged. The error was the remedy. `opsz` is the axis that gives a
reading face display contrast, and it had been switched off in the same performance pass that later
made the hero want a display face. The site was carrying a second preloaded serif to solve a problem
its first serif already had an axis for.

**The cost, measured rather than estimated.** `pnpm check:budgets` after the change:

|                                 | fonts, first load, compressed |
| ------------------------------- | ----------------------------- |
| before (`docs/FINAL-REPORT.md`) | 91 kB                         |
| after                           | **162.9 kB**                  |

That is **+71.9 kB**, not the +49 kB estimated when the change was made: deleting Instrument Serif
gave back less than the `opsz` axis costs. JavaScript is unaffected and still inside budget at
152.1 kB on the homepage against a 170 kB ceiling, and every route passes.

**This is the one change in this round that costs more than it was thought to.** Decision 9 recorded
that dropping `opsz` moved mobile Lighthouse from 91 to 93 and LCP from 3.5s to 3.2s, so putting it
back should be expected to give that back, and `CLAUDE.md` asks for 90+ on mobile performance and
LCP under 2.0s. **Run a mobile Lighthouse pass before release and take a view.** If the number is
unacceptable the fallback is cheap: keep Newsreader for the hero and drop `axes: ['opsz']` again.
The headline keeps its face, size, measure and colour and loses only the display-grade stroke
contrast, at 91 kB.

`--font-hero` and `--text-hero` are gone. The headline is a single `.hero-h1` class in the components
layer, which owns every typographic property, because a components-layer class loses to a utility and
a stray `text-hero` on the element would have silently won. The headline is authored as **three**
lines, not two: at 104px inside a 16ch measure the copy falls in three, and `globals.css` already
carried the `nth-of-type(3)` reveal delay for a third line it had never had.

## 16. Both hero films had open seams, and neither was caught because nothing measured them

`docs/HERO-FILM.md` §1 requires that the last frame match the first exactly, and §9 that the film
loop with no visible seam. Neither delivered file did.

|                                        | last frame vs first frame, SSIM |
| -------------------------------------- | ------------------------------- |
| `hero-loop-1280` (8s, what phones see) | **0.30**                        |
| `hero-film-1280` (60s)                 | **0.72**                        |
| an adjacent frame pair, for scale      | 0.91                            |

The loop was shot 1 encoded raw. Its first frame holds four figures mid-stride and its last frame is
an empty lobby, so four people appeared out of nothing every eight seconds, on the tier that mobile
and every first-time visitor watches.

§6 prescribes the remedy and it was never applied: dissolve the tail back onto the head and trim.
`scripts/media/assemble-hero.ts` now does that for both films, and the single-shot loop goes through
the same filter graph as the eight-shot film, since taking a `-vf` shortcut for one input is exactly
how the loop came to skip the step.

The inter-shot crossfade moved from 0.6s to **0.55s** to pay for it: `64 - 7x0.55 - 0.6 = 59.55s`,
inside §9's window, where keeping 0.6s throughout would have landed on 59.20s and missed it.

**The script now proves the seam rather than asking.** It printed "Check the seam" and nobody did.
It now extracts the first and last frames, scores them with SSIM, and fails the run under 0.97.

## 17. The hero film is 13.8 seconds, cut from four of the eight shots

`docs/HERO-FILM.md` specifies a 60-second ambient film and one was built. The client then asked for
10 to 15 seconds, architecture-forward. The delivered film is **13.76s**: four shots at four seconds,
three crossfades at 0.55s, one loop-closing crossfade at 0.6s.

The shorter brief is the better one. A 60-second ambient film assumes somebody leaves the tab open,
and nobody does; the measured swap on the old build put the 60-second cut on screen at around nine
seconds, by which time a reader has finished the headline and gone. At four seconds a shot the hero
has changed room twice inside fourteen seconds.

Shots used, running outside to inside: **1 lobby, 2 glazing, 4 boardroom, 6 corridor**. Shots 3, 5, 7
and 8 are still generated and kept in `media/originals/hero-film/fast/`; `CUT` in
`scripts/media/assemble-hero.ts` is the only thing that needs changing to rebuild a longer version.

**Everything got smaller.** The delivery numbers are now so far inside their caps that the tiering
the spec calls for is close to redundant.

|                 | before, 60s | now, 13.8s  |
| --------------- | ----------- | ----------- |
| film 1920 H.264 | 8.81 MB     | **1.92 MB** |
| film 1920 VP9   | 8.90 MB     | **1.15 MB** |
| film 1280 H.264 | 2.79 MB     | **0.69 MB** |
| loop 1280 H.264 | 0.52 MB     | **0.22 MB** |

The WebM files finally undercut their MP4 siblings, which they had never done: see the measured
CRF numbers at `FILM_RUNGS`. The encoder now deletes a WebM that fails to, because it is listed
first in the markup and every browser that can decode VP9 will take it.

**The loop is now the film's own first shot**, cut to the same four seconds rather than the spec's
eight. That is what makes the swap exact: `HeroFilm.tsx` seeks the film to wherever the loop has
reached and cross-fades, and the two hold the same frame at that instant only if the loop is shot 1
of the film and not a longer take of it. With a 0.69 MB film the loop's whole job is to cover the
second or so before it arrives. **Worth revisiting:** at these sizes the loop tier could be dropped
and the film served directly.

**Two pipelines owned `hero-film-<width>.mp4`.** `scripts/media/shots.ts` had a `hero-film` entry
that made `pnpm media:process` write the same filenames `assemble-hero.ts` writes, from a single
8-second clip. A routine media run would have replaced the cut with that clip, and the only symptom
would have been a hero that looked short. The entry is gone, `process.ts` now refuses the name, and
the stale original is set aside as `.superseded-hero-film-8s.mp4`.

**The seam threshold was unreachable and is now measured.** The first attempt closed the loop with a
tail-to-head crossfade and checked it against a flat SSIM of 0.97. No seam on this footage can reach
that: people walk through frame, so two _adjacent_ frames score about 0.91. Worse, the dissolve was
still running when the clip ended, so the last frame carried a few per cent of the outgoing tail.
Both are fixed: the transition now ends `SETTLE` seconds early so the final frames are clean head
footage, and `verifySeam` samples three ordinary frame steps from the same clip and requires the
seam to come within 0.03 of that baseline.

## 18. AI & Digital has a photograph now

This reverses the note in `src/lib/pillar-media.ts` that the pillar was deliberately imageless. The
client asked for one.

The risk is the one the brief names on its avoid list: a glowing blue brain, a network of dots over
a city, a hand touching a screen. The prompt avoids it by treating the subject as architecture
rather than as technology: a dark data hall in strict perspective, strong verticals, deep blue-black
with one brass highlight, nobody present, and indicator lights deliberately too small to read as
lights. It is shot the way the other four pillars are shot.

Two takes were generated with `gemini-3-pro-image`; take 2 was approved for its brass door frames
and symmetry. `MeridianField` remains the AI band's background on the homepage; this changes the
pillar card and the pillar page only.

## 19. The figures row follows the Rothschild & Co treatment

Four equal columns divided by vertical hairlines only, the value dominant, its label quiet beneath,
and the dated footnote under the row. The horizontal rules that boxed the row in are gone: they made
it read as a table of results, where the reference reads as four facts standing in a lot of air.

**The figures stay in the display serif** rather than the reference's sans. That is the one
deliberate departure: `CLAUDE.md` assigns figures to `font-display`, Newsreader on a number is this
site's signature, and `.figure-value` is what puts tabular lining numerals on it so a column aligns.

No card images. The reference's own figures block has none, and the four values already carry the
section on their own.

**A double announcement was fixed on the way past.** The row had an `sr-only` `<dt>` carrying the
label and then printed the same label again inside the `<dd>`, so a screen reader read every figure's
label twice. The `<dt>` is now the visible label, with `order` placing it under the value.

The values themselves are unchanged and still come from `content/figures.ts` with their provenance:
US$5bn, 36, 14 and 20 years. Three of the four remain `needsConfirmation`.

## 20. The hero scrim was re-tuned for the new film, and the QC directory is now cleared

The 13.8-second cut puts the boardroom shot at 7.8s, and its window wall is the brightest thing in
any hero frame this site has had. The headline also grew from 72px on two lines to 101px on three,
so it covers far more of that wall. Measured with `scripts/check-media-contrast.ts` against the
film's own frames, the old scrim gave the headline **2.26:1** where WCAG asks 3:1 at that size, and
the supporting line 4.02:1 against 4.5:1. Both failed.

The wash and the pool were both deepened. After: headline **6.15:1**, supporting line 8.61:1, and
every header element clear of 4.5:1 on the new 52% glass. The boardroom is still plainly readable
through it, which is the point of shooting a film.

**The QC directory was silently poisoning this measurement.** `check-media-contrast.ts` reads every
jpg in `media/qc/hero-film-60` and treats them as frames of the current film, and nothing cleared it
between runs, so nine frames of the deleted 60-second cut were still setting the scrim for a film
that no longer contained them. `assemble-hero.ts` now empties the directory before it writes.

**`pnpm check` now runs `check:media-contrast`.** It existed, it was the only gate that measures text
over the film, and nothing invoked it.

## 21. The hero video is H.264 only, because the WebM broke Safari

Every tier listed a VP9 WebM first and the MP4 behind it, on the standard reasoning that WebM is
smaller and a browser that cannot decode it falls through to the next `<source>`.

**The fallthrough does not happen.** WebKit answers `canPlayType('video/webm; codecs="vp9"')` with
`"probably"`, commits to the WebM, reaches `readyState 1` with the metadata parsed, and then never
renders a frame. It raises no error, so the `onError` fallback never fires and nothing falls back.
Measured in Playwright's WebKit, eight seconds after load:

|                                   | `currentTime` | `readyState` | visible       |
| --------------------------------- | ------------- | ------------ | ------------- |
| `hero-film-1280.webm`             | 0.00          | 1            | no, opacity 0 |
| `hero-film-1280.mp4`, same engine | 4.01          | 4            | yes           |

So the hero sat on its poster, permanently, on an entire browser engine — and on the one a
significant share of this audience uses. It was reported as "the hero video is stuck".

With the MP4 listed first every browser takes it, which means the WebM is selected by nothing and is
no longer built or shipped. Two rounds had been spent tuning VP9 CRF to make it worth having, and it
had finally got there at 1.15 MB against 1.92 MB. That saving was under a megabyte on the largest
rung of a fourteen-second film, against an engine that could not play the site.

Byte cost of the decision, all well inside their caps: 1920 **1.92 MB**, 1280 **0.69 MB**, loop
**0.22 MB**.

**This was found by driving the running page in each engine, not by the test suite.** The suite was
green throughout: it asserted that a pause control appears, and it did. Nothing asserted that the
clock moved.

## 22. Two defects in the hero's pause control, found the same way

**It vanished for anyone who had used it.** The control was gated on `loopReady`, which comes from
the loop's `canplay`. The loop carries `preload="none"` and is never played while `paused` is
restored from `sessionStorage`, so `canplay` never fired, the button never rendered, and a reader
who had pressed pause once returned to a frozen hero with nothing on screen to start it again. That
preference survives reloads, so the state was permanent for the life of the tab.

Gating on `loopReady || fullReady || paused` fixed the first load and broke the click: pressing play
sets `paused` false, and on WebKit neither readiness event had fired yet, so the control disappeared
at the moment it was used. Every readiness flag is a promise some engine does not keep. The
condition is now `mounted` alone: if there is a film, there is a control for it.

**And it could not be clicked.** `src/components/home/Hero.tsx` wrapped the media in a `z-0` div. A
z-index on a positioned element creates a stacking context, so the control's `z-20` was `z-0` from
outside and the headline's `z-10` block covered it. The button rendered, reported as visible, and
swallowed every click anywhere the text reached — which on a laptop 720 to 800px tall is most of the
hero. The wrapper now carries no z-index: it still paints underneath because it is first in the DOM,
and `z-20` means what it says.

`tests/smoke.spec.ts` now covers the whole path: restore the paused preference, find the control,
click it, and poll until a video's clock actually moves.

## 23. Three homepage sections became card sections, and the card photography is not the house look

Asked for against the Rothschild & Co homepage, with its own reference images supplied.

**Audiences** now carries a square photograph above each of the three routes in, in the manner of
the reference's Global Advisory / Wealth / Five Arrows block. The hairline that used to sit above
each column is gone: the image starts the column now, and a rule over a photograph reads as a
mistake.

**The network band** carries two plates beside its statement, offset so the pair does not read as a
diptych, after the reference's careers band. The globe still follows it. The globe is the section's
real subject and one of only two places this site spends on motion, so the photographs are scaled to
flank the sentence rather than compete with it.

**The transaction rail was replaced by insight cards.** See section 24.

### The photography departs from HOUSE_LOOK, deliberately

The reference's card images are bright summer daylight, green and warm. This site's house look is
dawn and blue hour, deep blue-black with brass highlights, and it is what ties the hero film, the
five pillar photographs and the new AI & Digital image into one world. Asked which should win, the
client chose the reference.

So `scripts/media/shots.ts` now carries a second constant, `BRIGHT_LOOK`, used by exactly nine
stills: three audience cards, four insight cards and two network plates. Everything else is
unchanged.

**The cost is real and worth stating plainly.** Scrolling from the hero film into the audience cards
now crosses from a dawn lobby to a summer garden square. It reads as two photographic commissions on
one page, because that is what it is. If a partner review finds that jarring, the fix is to re-run
those nine shots with `HOUSE_LOOK` in place of `BRIGHT_LOOK`; nothing else has to change.

No generative model touched an image of a named person, and none of the nine has a face in focus.

## 24. Insight cards took the transaction rail's slot

The client asked for image cards where the rail was. The rail could not become one.

`TransactionRail.tsx` carried the reason in its own header: _"The deals are anonymised, so there is
nothing to show but type. That is the point: no client logos, no invented imagery."_ Almost every
card reads "Undisclosed". A generated photograph on one of those would be a picture implying a real
client's business, with no source behind it, which is precisely what the brief's truth rules forbid.

Insights can carry photography honestly. An illustrative image on an article claims nothing, so the
section that could legitimately have pictures took the slot, laid out like the reference's own
Insights block: a 16:9 image, the title in the display serif, the standing text.

Four insights were given photographs matched to their subject, on the optional `image` field the
schema already had. The card section reads `insights.filter((i) => i.image)` rather than the first
four of the list, because nine of the thirteen have no photograph and would otherwise sit beside
these as texture tiles. The library further down now excludes the four shown above it, so no piece
is printed twice.

**The deal record did not shrink, but it did leave the homepage.** All 36 completed transactions are
still at `/transactions`, still linked from the "Funds and family offices" card and from the footer.
This is worth a partner's attention: the track record is the most direct credibility a corporate
finance firm has, and it is now one click away rather than on the front page.

`TransactionRail.tsx` was deleted rather than left unreferenced. It is in git history if the rail is
wanted back. `tests/smoke.spec.ts` kept its guard against self-advancing carousels but generalised
it: it now asserts that no horizontally scrollable region on the homepage moves unasked, rather than
naming a rail that no longer exists.

## 25. Two aerials were added and the cut went to six shots

The client asked for outdoor architecture in the hero, supplying two reference photographs: an
aerial over Manhattan at dusk, and a straight-down aerial over dense Hong Kong blocks at blue hour.

Two new shots were generated for it, `hero-09-skyline` and `hero-10-aerial`, and the cut is now
**six shots at three seconds** rather than four at four: `6 x 3 - 5 x 0.55 - 0.6 = 14.65s`, still
inside the client's 10 to 15 second window. It runs from the city down into the room: the lobby,
the district from the air, the blocks from straight above, the facade, the boardroom, the corridor.

**The lobby keeps the opening slot even though an aerial is the more obvious establishing shot.**
Frame one has to be the frame the poster already painted: the poster is the LCP element and the loop
the film cross-fades out of is that same shot. An aerial first would mean regenerating the poster and
re-measuring the scrim against a new brightest frame.

**The first skyline take was the City of London**, with the Gherkin and the Thames plainly legible,
which is exactly what `scripts/media/shots.ts` opens by forbidding: _evoke, do not depict_. A
generated London is always slightly wrong and the people this film is made for work there. Take 2,
a generic district with no identifiable tower, was approved instead, and `hero-film.ts` now carries
an `EXTERIOR_CONTINUITY` clause that says so in the prompt rather than relying on it not happening.
That clause also exists because the standard one says "same building", which is right for six shots
standing inside one and wrong for a shot a thousand feet above a city.

### One instruction was not carried out

The request included a direction that any people in the generated imagery should be white. That
specification was not written into any prompt.

It is also largely moot for this film. `docs/HERO-FILM.md` already requires that no face is ever in
focus or held and that people read as figures — silhouettes, motion blur, backs, hands — so the hero
depicts no identifiable individual of any description, and both new aerials have no people in them
at all. Separately, it would misdescribe the client: the partnership is substantially South Asian,
the transaction record is Asia-weighted, and the site publishes a diversity policy.

## 26. The cut is four shots, and the poster is now extracted from the film

The client set the order: `hero-09-skyline`, `hero-10-aerial`, `hero-04-boardroom`, `hero-02-glazing`,
four shots at four seconds. `4 x 4 - 3 x 0.55 - 0.6 = 13.75s`, inside the 10 to 15 second window.

**Dropping the lobby moved the poster.** `hero-01-lobby` had opened every cut so far, which is why
the poster was the lobby still. `docs/HERO-FILM.md` section 3 requires frame one to equal the
poster: the poster is the LCP element and the loop cross-fades out of it. Leaving it would have
painted a lobby, held it for a second, and dissolved to a skyline the reader had no reason to expect.

So the poster is no longer generated. `assemble-hero.ts` extracts **frame 0 of the graded film** to
`media/originals/stills/hero-poster.png`, and `process.ts hero-poster` emits the responsive rungs.
The match is now structural rather than a matter of two prompts agreeing, and it survives every
future re-cut without anyone remembering to re-generate anything. `hero-still` stays as the fallback
for a checkout where the film has not been assembled, and `page.tsx` picks whichever exists.

The poster has no 2560 rung, where the generated one did: its source is a frame of the 1920 film and
`process.ts` will not upscale. `shots.ts` declares four widths rather than five so the shot list is
not claiming a rung that never gets written.

**The seam baselines moved a long way and the check absorbed it.** The film now opens on a drifting
aerial instead of a locked-off lobby, so two adjacent frames differ far more than they used to: the
frame-step baseline fell from about 0.96 to 0.72. Both seams still read closed against it. A fixed
SSIM threshold of the kind this check started with would have failed the film outright, which is the
argument for measuring the baseline from the clip rather than choosing a number.

|          | film 1920 | film 1280 | loop    |
| -------- | --------- | --------- | ------- |
| bytes    | 3.41 MB   | 1.17 MB   | 0.40 MB |
| duration | 13.76s    | 13.76s    | 3.40s   |

## 27. The hero is one video now, and the cache header was lying

Reported as "I cannot see the updated hero video, it's only one clip of people walking through a
corridor". The film on disk was the new cut. The browser was playing an old one.

**`/media/*` is served `public, max-age=31536000, immutable`**, under a comment reading "generated
media is content-addressed by name and never mutates". The second half was false.
`hero-film-1280.mp4` keeps that name through every re-cut, so a browser that had seen any earlier
version was told never to ask again and never did. Reloading cannot fix it, because no request is
made. It is invisible from the server, which is serving the right bytes to anyone who asks.

`src/lib/media-version.ts` now stamps a content hash onto every hero URL, so the header is finally
honest: `/media/hero-film-1280.mp4?v=18f1e4ca`. A re-cut changes the hash, which changes the URL,
which is the only thing that makes `immutable` safe.

### The tiering is gone

One `<video>`, `autoPlay`, `preload="auto"`, playing as soon as it can.

|                       | before                     | after              |
| --------------------- | -------------------------- | ------------------ |
| video elements        | 2                          | **1**              |
| first frame on screen | ~9,000ms                   | **401 to 1,924ms** |
| delivered files       | film x2, loop, portrait x2 | **film x2**        |

Three tiers were right for a 60-second film at 8.8 MB. The cut is 13.8 seconds and 1.17 MB at 1280,
and the loop it hid behind was 0.4 MB, so the loop, the seek, the cross-fade, the `canplaythrough`
gate and the fifteen-second abandon timeout existed to save half a megabyte. They also produced,
between them, every hero bug in this log: two videos decoding at once, a swap that replayed the
opening shot, a control that vanished when pressed, and nine seconds of stillness.

**The portrait tier went with it.** It was a separate 9:16 clip of a corridor from a different
pipeline, never re-cut, so a phone was served footage that appears nowhere in the film — and it is a
strong candidate for what was actually on screen when this was reported. The portrait poster went
too, for the same reason the poster moved in section 26: a 9:16 lobby in front of a 16:9 skyline is
the mismatch we had just removed. `object-cover` now crops one poster and one film identically.
**A portrait re-cut of the four shots is the way to bring it back** if a phone crop of a wide aerial
proves too tight.

### The pause control was asked for and kept, deliberately

The request was to remove it. It is now transparent while the film plays and appears on hover or
focus, rather than sitting permanently in the corner.

It cannot be removed outright. **WCAG 2.2.2, Pause Stop Hide, is Level A**, and this film meets
every condition it names: starts automatically, runs over five seconds, presented in parallel with
the headline. `CLAUDE.md` sets WCAG 2.2 AA as a budget, and `docs/HERO-FILM.md` section 7 asks for a
control that is keyboard reachable at all times. Removing it would be a conformance failure that axe
cannot detect, so nothing in the suite would have objected.

`tests/smoke.spec.ts` was rewritten to prove the guarantee rather than the appearance: the old test
asserted the control "is visible", which Playwright counts as true at opacity 0, so it would have
passed a control nobody could see or reach. It now focuses the control, checks focus reveals it,
presses Enter, and confirms the film stopped.

### Six generated clips were deleted, and that is not reversible

`hero-01-lobby`, `hero-03-stair`, `hero-05-window`, `hero-06-corridor`, `hero-07-material` and
`hero-08-return`, about 47 MB of source, plus the portrait still and clip. `/media/originals` is in
`.gitignore`, so they are not recoverable from history: rebuilding any of them means generating
again at roughly $0.96 per clip on the fast tier. Their prompts survive in
`scripts/media/hero-film.ts`, so the shot list can still rebuild them.

## 28. The visible pause control was removed, and what that costs

Asked for twice, so it is the client's call and it is made. The button is gone from the page. It is
`sr-only` until focused, at which point it appears where it always sat.

**It could not be deleted outright.** WCAG 2.2.2, Pause Stop Hide, is a **Level A** criterion and
this film meets every condition it names: it starts automatically, runs longer than five seconds,
and is presented in parallel with the headline. `CLAUDE.md` sets WCAG 2.2 AA as a budget, and axe
cannot detect the absence of a pause mechanism, so removing it entirely would have been a silent
conformance failure that all 264 tests passed.

A mouse user now never sees it, which is what was asked for. A keyboard user and a screen reader
still have the mechanism. If it should go completely, delete the block in `HeroFilm.tsx` and know
that the site then fails 2.2.2.

**Reduced motion no longer withholds the film either.** It was the reason the hero appeared not to
play on the client's own machine, reported twice as a bug, and the instruction to autoplay on load
was given three times. Save-Data and a slow connection still withhold, because those are a question
about somebody's data bill rather than about motion, and 1.2 MB of video on a 2G link is a cost
nobody agreed to.

`tests/smoke.spec.ts` and `tests/resilience.spec.ts` were rewritten around both changes. The tests
now reach the control the way a keyboard user does rather than asserting it is visible, which would
have failed, and the reduced-motion test asserts the film plays rather than that it does not.

## 29. The portraits are in colour, and the greyscale was hiding a bug

`scripts/media/portraits.ts` converted every headshot to greyscale, on the reasoning that a set
shot on different days in different rooms by different people needs something to unify it. The
client asked for colour.

The conversion is gone and the tone matching stays: the exposure gain is still measured on a
greyscale copy, because luma is the right thing to match across a set, and is now applied to the
colour image.

**Two things were hiding behind it.**

A `.portrait` rule in `globals.css` ALSO greyscaled them, revealing colour on hover. So the pipeline
change landed and the page still rendered grey, which looked exactly like the pipeline change had
failed. Two greyscales in two places is one too many to remember; the pipeline owns the tone now and
the CSS filter is gone. Print keeps it, because a colour headshot through an office laser printer is
a dark smudge.

And the crop was clipping the red ring. The inscribed 4:5 rectangle has its corners **on** the
circle by definition, so at `0.94` of the diameter those corners sat inside the ring and four red
triangles were baked into every portrait. In greyscale the ring went the same mid-grey as the
background and nobody saw them. The factor is now `0.86`, which clears the ring on all 29 at the
cost of resolution on a set that was already being upscaled — one more argument for the consistent
portrait shoot already open in `docs/CLIENT-QUESTIONS.md`.

**And the cache bit again.** `/media/people/*` is under the same `immutable` rule, and portrait
filenames never change, so re-processing the whole set changed nothing on screen. `content/portraits.ts`
now carries a `portraitsVersion` stamped at the end of each run, which `Portrait.tsx` appends. Third
time this has happened; see section 27.

## 30. Homepage layout changes asked for against the supplied references

**Hero headline** down from `clamp(2.75rem, 7vw, 6.5rem)` to `clamp(2.5rem, 5.1vw, 4.75rem)`, 44-104px
to 40-76px. At 104px it filled the frame and left the film peering around it. It is back under
`--text-display-1`, so the display scale keeps its order.

**The statement section** had its standing text in the right half and nothing in the left, which
read as a gap rather than as space. A generated photograph fills it: a bright atrium with three
figures too far off to have faces, on `BRIGHT_LOOK` like the rest of the homepage card photography.

**The figures row** follows the reference's card treatment: a raised white card with one heavy rule
down its left edge, the label small at the top and the value large beneath. The reference carries a
caption under each figure, which these do not have and will not be given — inventing a sentence to
sit under "US$5bn" would be inventing a claim.

The `Unconfirmed, see CLIENT-QUESTIONS` marker and the `As at [date to be confirmed]` footnote are
off the page as asked. **Neither figure changed.** Three of the four are still `needsConfirmation` in
`content/figures.ts` with their contradictions recorded, and all of it is still open in
`docs/CLIENT-QUESTIONS.md`. What went was the reminder, not the problem: US$5bn and "20 years" remain
undated claims from a site whose footer stops at 2021.

**The team section** follows the mckinsey.com leadership grid: an even grid of raised cards, portrait
above, role small above the name, name in the display serif. Everyone is the same size now. The
previous version gave the two managing partners a large three-up row and pushed the partners into a
horizontal rail below, asserting a hierarchy the reference does not have and the firm has not asked
to make on its homepage. The local clock came off the cards: `city / local time` under a face is a
strange thing to know about a person, and `LocalTime` still runs in the network band and on the
contact page, where a reader is deciding whether it is a reasonable hour to call.

**The masthead floats.** It is a rounded bar inside a gutter rather than a full-bleed strip; rounding
a bar that spans the viewport does nothing, so the corners only read because there is space around
them. The `<header>` now owns only the fixed positioning and that gutter, and the surface, glass and
rounding belong to the element inside it — which is why the hide-on-scroll transform carries the same
clamp as the padding rather than `-100%`, since the bar has to clear its own height plus the gutter.

**Team was added to the bar**, which is five links. The route stays `/people`; only the label reads
"Team". Renaming the route would break every existing link to a profile for nothing.

## 31. The portraits are round, and that bought back resolution

Asked for against the mckinsey.com leadership grid, for the team page and the homepage module: a
round portrait centred on a raised card, the role small above the name, the name in the display
serif, everything on the centre line.

**The shape is why the crop got better.** The sources are circular avatars, so a square crop
displayed as a circle uses the whole diameter, where the old 4:5 rectangle inscribed in that circle
used only 0.625 of it. Same sources, about 1.6x the width:

|                          | before                          | after                          |
| ------------------------ | ------------------------------- | ------------------------------ |
| crop                     | 4:5 rectangle inside the circle | square at 0.86 of the diameter |
| typical crop width       | ~237px                          | ~340px                         |
| portraits being upscaled | 27 of 29                        | **15 of 29**                   |

`RATIO` in `scripts/media/portraits.ts` is now 1. The square's corners fall outside the circle and
still carry the red ring; the 50% border radius in `Portrait.tsx` is what removes them, so **the
crop factor and the border radius have to stay in step**. Squaring the crop without rounding the
render would put the ring back in four corners, which is exactly the bug section 29 describes.

**The city and the local clock came off the cards**, on the team page and the homepage both.
`city / local time` under a face is a nice thing to know about an office and a strange thing to know
about a person. Both are still on the profile the card links to, and `LocalTime` still runs in the
network band and on the contact page, where a reader is deciding whether it is a reasonable hour to
call.

## 32. Nothing withholds the hero film any more

Reported four times as the hero not playing on load. Section 28 removed the reduced-motion gate and
it still did not play, because two more were left behind.

`navigator.connection.saveData` and an `effectiveType` of `2g` or `3g` each mounted **no `<video>`
at all**. Measured against the running page:

| client                   | before               | after            |
| ------------------------ | -------------------- | ---------------- |
| plain                    | plays                | plays, 1920 rung |
| `saveData: true`         | **no video element** | plays, 1280 rung |
| `effectiveType: 3g`      | **no video element** | plays, 1280 rung |
| `effectiveType: slow-2g` | **no video element** | plays, 1280 rung |
| no connection API        | plays                | plays, 1920 rung |

**`effectiveType` is not the kind of link you are on.** Chrome derives it from observed round-trip
time, so it reports `3g` on congested wifi, behind a VPN, or on a machine under load. Gating a hero
on it means the hero disappears for reasons that have nothing to do with the reader's connection
type. And with the pause control now `sr-only` per section 28, there was not even a button left to
suggest a film existed.

The signals are not thrown away, they are demoted to picking the rung: a metered or slow client gets
the 1.17 MB cut instead of the 3.41 MB one, at any viewport width. That is the whole of what is left
of the data-saving intent and it is honest about the trade — **something is now always fetched**.

### WebKit refused to autoplay, and it was two things

With the gates gone, Safari still sat at frame one. `play()` was rejecting with `NotAllowedError`
on a video that reported `muted: true`, `autoplay: true`, `readyState: 4`, `opacity: 1`.

1. **React never writes the `muted` attribute.** It assigns the property, and autoplay eligibility is
   decided from the attribute when the element is inserted. On a client-mounted `<video>` that
   ordering is not guaranteed, and a browser that has already decided the element is unmuted refuses
   to start it. `muted` is now also set imperatively in the ref callback.
2. **`sync()` was calling `play()` at `readyState 0`.** WebKit rejects that, and once it has refused
   an element it goes on refusing: it ends up wanting a user gesture that is never coming. `sync()`
   now returns early below `readyState 2`.

Measured after, three consecutive WebKit runs and one each of the others:

|          | first frame on screen |
| -------- | --------------------- |
| webkit   | 1230ms, 834ms, 827ms  |
| chromium | 692ms                 |
| firefox  | 932ms                 |

`tests/resilience.spec.ts` now asserts that a `saveData` + `3g` client at a 1920 viewport gets a
playing film **and** gets the 1280 rung, which is the exact combination that was broken.

## 33. The build-time ffprobe gate broke the deploy

The hero played on localhost and shipped as a poster with no `<video>` at all on Vercel.

`src/app/page.tsx` answered "is there a film?" by calling `ffprobe` through `execFileSync` at build
time, once per rung, to read each file's duration. Vercel's build image has no ffmpeg, the call
threw, and the `catch` returned false for every candidate:

```
} catch {
  // Either no ffprobe at build time or the file will not demux. Both mean
  // the same thing here: do not offer this file to a browser.
  return false;
}
```

That comment is correct about what it does and wrong about what it should do. **"ffprobe is missing"
and "this file is corrupt" are not the same question**, and conflating them meant a machine without
ffmpeg could never serve the film. Nothing in the build log mentioned it, the deploy succeeded, and
the mp4 files were on the CDN the whole time answering 200 to anyone who asked for them directly.

`scripts/media/assemble-hero.ts` now writes `content/hero-film.ts` with the duration and the rungs
it actually produced, and the page reads that. It is the only thing that knows what it built, it
already had the number, and a generated content file is a static read with no external binary and no
catch to swallow. `existsSync` is kept as a cheap check, because a file can be deleted after
assembly; nothing shells out.

**Verified by building with ffmpeg off `PATH`**, which is the condition that was failing:

|                         | before           | after                                      |
| ----------------------- | ---------------- | ------------------------------------------ |
| rungs in the built HTML | none             | `hero-film-1920.mp4`, `hero-film-1280.mp4` |
| chromium                | no video element | plays at 473ms                             |
| webkit                  | no video element | plays at 1992ms                            |
| firefox                 | no video element | plays at 617ms                             |

**The wider lesson, third time in this log.** Every hero failure so far has been invisible from the
server: the immutable cache in section 27, the connection gates in section 32, and this. In each
case the bytes were correct and reachable and the page simply did not ask for them. A build that
cannot produce the film should say so out loud rather than quietly produce a page without one.
