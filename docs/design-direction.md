# Design direction

## Concept: Corridors

Adan's real differentiator is not a sector or a product. It is reach: senior people in London,
Mumbai, Singapore, Dubai, Johannesburg and a dozen other cities, connecting companies to capital
across borders. The design expresses connection across distance.

Four expressions, and no more, so the idea stays an idea rather than a motif applied everywhere:

1. **Fine meridian-like lines** as a recurring structure: hairline dividers that carry real
   structure, the globe, and the drifting contour field behind the AI band.
2. **A city name with its live local time** wherever an office or a partner appears. Ornamental on a
   normal site; genuinely useful to people working across time zones, and the quietest possible
   proof of reach.
3. **Transaction tombstones that state their corridor**: "Asia to Europe", "Within Asia". Reach,
   made specific, on every record.
4. **One signature interactive piece**: the network globe, driven by the accessible city list beside
   it, so keyboard and pointer reach the same behaviour.

Boldness is spent on the hero film and the globe. Everything else is quiet and exact.

---

## Tokens, as built

### Colour

| Token         | Hex       | Use                                               | Measured         |
| ------------- | --------- | ------------------------------------------------- | ---------------- |
| Ink           | `#0B1D33` | Text on light; ground of dark bands and footer    | 15.82:1 on Paper |
| Paper         | `#F6F7F8` | Page background. Cool off-white, not cream        |                  |
| White         | `#FFFFFF` | Raised surfaces                                   |                  |
| Stone 700     | `#3E4A59` | Secondary text                                    | 8.41:1           |
| Stone 500     | `#626D7A` | Meta text, captions, local times                  | 4.91:1           |
| Stone 300     | `#B9C0C8` | Rules; secondary text on dark                     | 9.24:1 on Ink    |
| Stone 200     | `#E3E6EA` | Borders                                           |                  |
| Accent        | `#C00000` | The logo's red. Rules, active states, small marks | 6.04:1 on Paper  |
| Accent deep   | `#A00000` | Accent link text on light                         | 7.85:1           |
| Accent bright | `#E8554B` | The accent on dark grounds                        | 4.71:1 on Ink    |

Two rules on the accent: under about 3% of any screen, and **never on a number**. See
`DECISIONS.md` for why brass was retired and why `stone-500` was darkened from the brief's value.

`scripts/check-contrast.ts` audits the full matrix; `scripts/check-media-contrast.ts` audits text
over photography with a glyph-mask method. Both run in `pnpm check`.

### Type

**Newsreader** (variable, optical-size axis) for H1-H4, pull quotes and large figures. Tight leading
(0.95 to 1.05) and slight negative tracking at display sizes. True italics for quotations only.

**Archivo** (variable, width axis) for body, UI and all tabular data. It replaces the brief's Hanken
Grotesk, which ships no `tnum`; see `DECISIONS.md`. Body 17 to 18px, 1.58 leading, 60 to 75
character measure.

Every number is `tabular-nums lining-nums`, so a column of deal values aligns.

| Token            | Range       | Use                       |
| ---------------- | ----------- | ------------------------- |
| `text-display-1` | 44 to 112px | H1                        |
| `text-display-2` | 34 to 68px  | Section openers           |
| `text-display-3` | 28 to 46px  | Sub-sections, rail values |
| `text-display-4` | 22 to 32px  | Card and list headings    |
| `text-figure`    | 40 to 80px  | The ruled figure row      |
| `text-lead`      | 19 to 22px  | Standfirsts               |
| `text-body`      | 17 to 18px  | Body                      |
| `text-small`     | 15px        | UI, secondary             |
| `text-micro`     | 13px        | Meta, clocks, tags        |

All fluid with `clamp()`, bounded at 390px and 1600px.

### Layout

12 columns, content max 1440px, full-bleed media, outer margins `clamp(20px, 5vw, 80px)`.
Asymmetric editorial compositions. Text left aligned; no centred paragraphs.

Rhythm alternates dense and open: figures and tombstones against statement and film. Corners square
or 2px. Shadows effectively absent. Hairlines only where they carry structure. Fixed ratios: 16:9
film, 4:5 portraits, 3:2 editorial, 1:1 textures.

### Motion

One easing family, expo and quart out. Nothing bounces. Reveals 500 to 900ms, interface feedback
150 to 250ms.

Motion not triggered by the reader is limited to three things: the hero sequence on load, at most
one reveal per section opener, and the ambient globe and contour field. Everything else answers an
action.

CSS and `IntersectionObserver` only; no timeline library. `prefers-reduced-motion` degrades
everything to opacity or nothing, and replaces the film with its poster.

---

## Wireframes

### Homepage

```
┌────────────────────────────────────────────────────────────────────────┐
│ ┌────────────┐                      Insights  Podcast  Careers  Contact│
│ │ADAN Corp.  │        Expertise v  Transactions  People  About  [Speak]│
│ └────────────┘   <- paper masthead plate: the mark cannot reverse      │
│                                                                        │
│        AMBIENT FILM, locked off, figures crossing in motion blur       │
│        two scrims: vertical + left-to-right under the copy only        │
│                                                                        │
│   Cross-border                                                         │
│   corporate finance            <- 112px Newsreader, rises through      │
│   for the mid-market.             a mask in three lines, pure CSS      │
│                                                                        │
│   Adan Corporate is an international advisory firm of former           │
│   C-suite executives...                                                │
│                                                                        │
│   [Speak to a partner]   Our expertise              [|| Pause film]    │
├────────────────────────────────────────────────────────────────────────┤
│ An advisory firm of people                                             │
│ who have run companies,                 Our partners are mostly former │
│ not only advised them.                  chief executives, finance      │
│                                         directors and board members... │
│                                                      <- asymmetric     │
│ ───────────────────────────────────────────────────────────────────    │
│ US$5bn        │ 36           │ 14          │ 20 years                  │
│ Value of      │ Completed    │ Cities      │ Average experience        │
│ transactions  │ transactions │             │ of our partners           │
│ ───────────────────────────────────────────────────────────────────    │
│ As at [date to be confirmed by the client]   <- no count-up animation  │
├────────────────────────────────────────────────────────────────────────┤
│ ────────────────  ────────────────  ────────────────                   │
│ Companies and     Funds and family  Senior                             │
│ founders          offices           professionals                      │
│ One sentence.     One sentence.     One sentence.                      │
│ Corporate finance Selected transac. Join the partnership               │
├────────────────────────────────────────────────────────────────────────┤
│ Expertise                                            All five pillars  │
│ ─────────────────────────────────────┐  ┌───────────────────────────┐  │
│ Corporate Finance              ──    │  │                           │  │
│   Raising equity and debt...         │  │   3:2 photograph, wiped    │  │
│   [tag] [tag] [tag] [tag]            │  │   in on hover or focus     │  │
│ ─────────────────────────────────────┤  │   clip-path + 1.04 to 1    │  │
│ Mergers & Acquisitions               │  │                           │  │
│ Strategy & Leadership                │  │   AI & Digital gets the   │  │
│ Risk & Governance                    │  │   contour field instead   │  │
│ AI & Digital                         │  └───────────────────────────┘  │
│ ─────────────────────────────────────┘     (accordion on touch)        │
├────────────────────────────────────────────────────────────────────────┤
│ ░░░ DARK ░░░ drifting contour field, value noise, ~2 kB, no WebGL ░░░  │
│ AI & DIGITAL                                                           │
│ Practical AI, for deals and                                            │
│ for the businesses behind them.                                        │
│ ──────────────────────────  ──────────────────────────                 │
│ Advising clients            In our own work                            │
│ [AI & Digital]  Talk to us about AI                                    │
├────────────────────────────────────────────────────────────────────────┤
│ Selected transactions                              [ < ]  [ > ]        │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────       │
│ │ Asia to Eur. │ │ Within Asia  │ │ Within Asia  │ │ Europe            │
│ │ US$1bn       │ │ US$200m      │ │ US$150m      │ │ US$150m           │
│ │ End-to-end...│ │ Selection... │ │ Corporate... │ │ End-to-end...     │
│ │ [IPO][Strat] │ │ [Project fin]│ │ [Debt]       │ │ [IPO]             │
│ └──────────────┘ └──────────────┘ └──────────────┘ └────────────       │
│  scroll-snap, drag, arrow keys. Never advances on its own.             │
├────────────────────────────────────────────────────────────────────────┤
│ ░░░ DARK ░░░                                                           │
│ Capital rarely sits in the same place as the company that needs it.    │
│   ┌───────────┐   Offices                                              │
│   │   ((()))  │   London      08:42   Mumbai      13:12                │
│   │  GLOBE    │   Zurich      09:42   Dubai       11:42                │
│   │  cobe,    │   Amsterdam   09:42   Singapore   15:42                │
│   │  lazy     │   ...          the list drives the globe: focusing     │
│   └───────────┘                a city rotates to it                    │
│ Who we know: six categories, two rows                                  │
│ Sectors | Geographies | Deal sizes | Deal types   <- four principles   │
├────────────────────────────────────────────────────────────────────────┤
│ The people you would actually be working with.        All 32 people    │
│ ┌────────┐ ┌────────┐ ┌────────┐     <- managing partners, 4:5         │
│ │ 4:5    │ │ 4:5    │ │ 4:5    │        greyscale to colour on hover   │
│ └────────┘ └────────┘ └────────┘                                       │
│ ┌────┐┌────┐┌────┐┌────┐┌────┐  Everyone     <- partner rail           │
├────────────────────────────────────────────────────────────────────────┤
│ Writing and conversation              ┌──────────────────────────────┐ │
│ ─────────────────────────────  2019   │ ░░ PODCAST ░░                │ │
│ ─────────────────────────────  2019   │ A Done Deal                  │ │
│ ─────────────────────────────  2018   │ [Episodes]  Listen on Spotify│ │
│   evergreen library, not a news feed  └──────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────┤
│ Speak to a partner.              ┌────────────────────────────────┐    │
│ Tell us what you are trying to   │  16:9 timber door ajar onto    │    │
│ do and we will put you in front  │  a bright corridor             │    │
│ of the person who has done it.   └────────────────────────────────┘    │
│ [Start a conversation]                                                 │
├────────────────────────────────────────────────────────────────────────┤
│ ░░░ FOOTER, DARK ░░░  Expertise | Firm | Connect | Legal               │
│ Offices, each with its live local time                                 │
│ [placeholder: regulatory wording awaited]     LinkedIn  Spotify        │
└────────────────────────────────────────────────────────────────────────┘
```

### Pillar page

```
┌────────────────────────────────────────────────────────────────────────┐
│ < Expertise                                                            │
│ Corporate Finance                          <- H1, 112px                │
│ Raising equity and debt across borders                                 │
│ We raise equity and debt for mid-market companies, funds and family    │
│ offices, from early growth capital through to a listing...             │
├────────────────────────────────────────────────────────────────────────┤
│              FULL-BLEED 3:2 PHOTOGRAPH                                 │
│   (AI & Digital has no photograph: the contour field instead)          │
├──────────────┬─────────────────────────────────────────────────────────┤
│ ON THIS PAGE │ Capabilities                                            │
│ ─ Equity     │ ─────────────────────────  ─────────────────────────    │
│   Debt       │ Equity and growth capital  Debt and project finance     │
│   Special    │ One or two sentences.      One or two sentences.        │
│   Modelling  │ · Private equity and VC    · Working capital            │
│              │ · Growth capital           · Trade finance              │
│ sticky,      │ · IPO advisory             · Renewable energy           │
│ IO-driven    │ ─────────────────────────  ─────────────────────────    │
│              │ (two columns desktop, accordion on touch)               │
│              │ Each group has an id: /expertise/x#equity anchors here  │
│              ├─────────────────────────────────────────────────────────┤
│              │ How we work                                             │
│              │ 01 ───────────  02 ───────────  03 ───────────          │
│              │ A real sequence, so numbering is legitimate here        │
│              ├─────────────────────────────────────────────────────────┤
│              │ Relevant transactions                                   │
│              │ Asia to Eur. │ US$1bn  │ End-to-end advisory... │ [IPO] │
│              │ Within Asia  │ US$200m │ Selection of project... │[Proj]│
│              ├─────────────────────────────────────────────────────────┤
│              │ Who leads this                                          │
│              │ ┌────┐ ┌────┐   name, role, city, local time            │
├──────────────┴─────────────────────────────────────────────────────────┤
│ Contact band, routed: /contact?enquiry=raise-capital                   │
└────────────────────────────────────────────────────────────────────────┘
```

### People

```
┌────────────────────────────────────────────────────────────────────────┐
│ People                                                                 │
│ Mostly former chief executives, finance directors and board members.   │
│                                                                        │
│ ROLE      [All][Managing partner][Partner][Director][Advisor][Analyst] │
│ LOCATION  [All][London][Mumbai][Singapore][Dubai][...]                 │
│ EXPERTISE [All][Corporate finance][M&A][Strategy][Risk][AI]            │
│ SEARCH    [ name...                    ]              32 people        │
├────────────────────────────────────────────────────────────────────────┤
│ Managing partners                                                      │
│ ┌────────┐ ┌────────┐ ┌────────┐                                       │
│ │  4:5   │ │  4:5   │ │  4:5   │   greyscale -> colour, 300ms          │
│ │        │ │        │ │        │   monogram tile where no photograph   │
│ └────────┘ └────────┘ └────────┘                                       │
│ Ajay Mavin. Keshav Adya Saba Sury.                                     │
│ Managing p. Managing p. Managing p.                                    │
│ London 08:42 Dubai 11:42 Mumbai 13:12                                  │
│                                                                        │
│ Partners                                                               │
│ ┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐                                   │
│ ...                                                                    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Critique against the brief, and what changed

The brief lists the tells of a templated or AI-made site. Here is the first draft audited against
that list, honestly.

**Caught and removed.**

- _Uppercase tracked eyebrows over every heading._ The first pass had a kicker over most sections.
  Removed everywhere except two places where it is a genuine category label and not decoration: the
  AI band and the podcast card. Section openers are now just the heading.
- _01/02/03 on things that are not a sequence._ Numbering survives in exactly one place, the pillar
  "How we work", which is a real sequence. The audience routes, the network categories and the four
  principles are all unnumbered.
- _An arrow appended to every link._ No arrows on text links anywhere. Arrows appear only on the
  two transaction rail controls, where they indicate direction of travel.
- _Identical rounded cards with soft grey shadows._ There is one box-shadow in the entire stylesheet,
  on the mega panel, where it separates an overlay from the page beneath. Everything else is
  separated by hairlines. Corners are square.
- _Counters that spin up from zero._ The figure row is static.
- _Fade and slide up on every section._ `data-reveal` is on section openers only, and each element
  is unobserved after it fires so nothing re-animates on scroll back.
- _Stock clichés for AI._ No glowing brain, no particle network, no neural mesh. A contour map,
  because the section is about measurement and diligence.

**Revised after the first review, because it read as the default answer to "finance website".**

1. **The figure row was four boxed cards.** That is the default. It is now one ruled row with
   hairline dividers, the figures set in the display face, and an honest "as at" footnote. Closer to
   a printed report than a dashboard.
2. **The expertise section was a five-card grid.** Also the default. It is now a typographic index
   where the list is the interface and the photograph answers it, which puts the words first.
3. **The values section on About was going to be a grid of boxes with icons.** It is a plain list.
   Evercore does this and it is more confident than any grid.
4. **The transactions rail auto-advanced.** Removed. It never moves on its own.
5. **The closing band was a fourth dark slab.** With the hero, the AI band and the network already
   dark, a fourth flattened the page's rhythm. The contact band is now paper with the door
   photograph, so the page ends warm and the AI band keeps its weight.
6. **The hero had a single scrim.** Measurement showed the supporting line at 3.16:1, which fails.
   A single wash heavy enough to fix it killed the photograph. Two scrims, one vertical and one
   under the copy column, fix the contrast and keep the image alive.

**Accepted risks.**

- The accent is red, which is the most common colour in finance branding. The mitigation is
  restraint, under 3% of any screen, and the fact that distinctiveness here is carried by the
  typography, the meridian structure and the film rather than by an unusual hue. The alternative,
  keeping brass, would have left the logo looking pasted on. See `DECISIONS.md`.
- Portraits are displayed small. That is a consequence of the source assets, not a style choice, and
  showing them small is better than upscaling them. A portrait shoot is the fix.
