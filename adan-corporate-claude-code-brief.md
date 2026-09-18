# Adan Corporate: website redesign and build

Brief for Claude Code. If this was pasted into chat rather than supplied as a file, save it verbatim to `docs/BRIEF.md` first. Re-read it at the start of every phase so the direction survives context compaction.

## 1. Your role

You are the lead creative developer on this project. Work to the craft standard of studios such as Hello Monday and Active Theory, applied with the restraint that investment banking clients expect. You own design direction, front-end engineering, media production and QA.

The target: a site that a managing director at Rothschild & Co would find credible within five seconds, and that a design jury would recognise as carefully made. Where those two aims pull apart, credibility wins.

## 2. The project

**Client.** Adan Corporate, an international corporate advisory firm covering corporate finance, M&A, strategy and risk. Current site: https://adancorporate.com/en-uk/home/index.html

**Problem.** The current site is a dated template build: a preloader, a mega-menu of roughly 150 service pages, stale sections (COVID-19 services, an ambition dated "by 2020"), inconsistent team photography and a homepage that prints every team biography in full. It undersells a firm whose partners are mostly former C-suite executives of listed companies.

**Goal.** A new site, built from scratch, that presents Adan as a modern, senior, cross-border advisory house. Take an abstract of the existing content only. Do not port the old structure, markup or styling.

**Audience.** Senior, time-poor professionals: founders and CFOs of mid-market companies, private equity and venture investors, family offices, bankers, lawyers, and experienced executives who might join the partnership. They judge credibility in seconds, browse on a work desktop and on a phone between meetings, and have no patience for preloaders, gimmicks or vague copy. Test every decision with one question: would this make a fund partner more or less likely to take the meeting?

## 3. Decisions already made

1. **Five service pillars, high level only.** The long tail of sub-services is folded into these or dropped. No sub-service gets its own page. Coaching sits inside Strategy & Leadership. Startups are an audience of Corporate Finance, not a pillar.

   | Pillar                 | Descriptor                                                | Capabilities to cover                                                                                                                                                                                                                              |
   | ---------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Corporate Finance      | Raising equity and debt across borders                    | Private equity and venture capital, growth capital, family office investment, IPO, fund placement; debt, project and renewable energy finance, working capital and trade finance; special situations, restructuring, divestments and exit planning |
   | Mergers & Acquisitions | Buying, selling and combining businesses                  | Buy-side, sell-side, mergers and post-merger integration, MBO, MBI and LBO, joint ventures and alliances, valuation and deal strategy                                                                                                              |
   | Strategy & Leadership  | Senior counsel for boards and management teams            | Corporate and growth strategy, international expansion, board advisory and non-executive directors, interim management, executive coaching and leadership development                                                                              |
   | Risk & Governance      | Control, compliance and resilience                        | Enterprise risk, financial risk (market, credit, treasury, regulatory), internal audit and controls, SOX, ISO 27001, SOC 1 and 2, technology risk and GRC, business continuity                                                                     |
   | AI & Digital (new)     | Practical AI for deals and for the businesses behind them | See point 3                                                                                                                                                                                                                                        |

2. **People are the product.** The team gets far more prominence and far better presentation than today: a People section with filters, individual profile pages, and partners surfaced on the homepage and on every pillar page.

3. **A new AI & Digital section, treated as a flagship.** It appears as a dark feature band on the homepage and as a pillar page. Draft the proposition around two ideas and mark all of it for partner sign-off: (a) advisory for clients: AI readiness and strategy for mid-market companies, AI and data due diligence in transactions, AI governance and risk, analytics and automation; (b) how Adan applies AI in its own work: deal sourcing and screening, faster research and diligence, financial modelling. Use the current AI page as source material. Do not claim products, tools or results that the current site does not support.

4. **No rebrand.** The existing logo stays untouched. Download it, sample its colours, and make the palette sit comfortably with it. If only a low-resolution raster exists, use it as is and ask for a vector in the client questions. Never redraw or alter the mark.

5. **One locale.** British English, `lang="en-GB"`, no locale prefix in routes.

6. **Drop:** COVID-19 services, the "by 2020" ambition, the preloader, social share widgets, blockchain, IoT and RPA as headline offers, and the old footer credit.

## 4. Discovery (before any design)

### 4.1 Source content

Fetch these pages from `https://adancorporate.com` and store a cleaned abstract of each under `content/_source/`. The navigation markup on every page is enormous, so strip it.

- `/en-uk/home/index.html`
- `/en-uk/about-us/company-overview.html`
- `/en-uk/about-us/vision-mission-values.html`
- `/en-uk/about-us/the-adan-advantage.html`
- `/en-uk/about-us/team.html` and every profile under `/en-uk/team/`
- `/en-uk/clients/clients.html` (completed transactions) and `/en-uk/clients/live-deals.html`
- `/en-uk/about-us/contact-us.html` (mailboxes and offices)
- `/en-uk/about-us/insights-blog.html` and `/en-uk/about-us/a-done-deal-adan-podcast-index.html`
- `/en-uk/digital/artificial-intelligence.html`
- The four pillar index pages: `/en-uk/corporate-finance/index-corporate-finance.html`, `/en-uk/m-and-a/index-m-and-a.html`, `/en-uk/strategy/index-strategy.html`, `/en-uk/risk-management/index-risk-management.html`
- `/en-uk/legal/` pages (carry the legal text over as is) and `/en-uk/legal/sitemap.html` (for the redirect map)

Verified abstract, to use as a fallback and a cross-check:

- **Positioning.** An international corporate advisory firm with global reach through a network of multi-disciplinary professionals, mostly former C-suite executives of listed companies. Bespoke advice for small and medium-sized firms at every step of value creation, from seed funding to IPO. Specialises in giving junior and mid-tier growth firms the widest reach to cross-border financing and transactions. Long-term relationships with banks, PE and VC funds, promoters and investors, built on trust, transparency and results.
- **Figures as published (unverified).** 35 professionals; 20 years average experience; 15 countries on 3 continents (another passage says 19 countries: flag it); US$5bn transaction value; deal sizes from $1m to $500m with a mid-market focus.
- **Four principles.** Sector agnostic (from mining to AR and VR), location agnostic, deal-value agnostic, deal-type agnostic.
- **The network.** Funds (PE, VC, sovereign wealth, hedge, pension); financial firms (global banks, NBFCs, trade finance); specialised funds (impact, long-only, infrastructure, green, renewable energy, government); sophisticated investors (single and multi family offices, high net worth networks); agencies (regional development banks, development agencies, export credit agencies); strategic networks (strategic investors, business schools, partners).
- **Values.** Highest professional standards and integrity; strive for the success of clients; collaborate and bring out the best in each other; inclusivity, diversity and respect. Mission thread: "our success lies in our clients' success".
- **Cities.** London, Zurich, Amsterdam, Prague, Milan, Paris, Hamburg, Mumbai, Pune, Dubai, Abu Dhabi, Singapore, Almaty, Baku, Johannesburg, Abidjan.
- **People.** Managing partners: Ajay Mavinkurve (London), Sabapaty "Saba" Suryanarayanan (Mumbai). Partners: Vinayak Hattangadi, Thomas Peutz, Roland Giebitz, Arun Shroff, Neeraj Arora, Raju Venkataraman, George Christelis, Marco Salvini, Sandeep Bhat, Freddie Tshiaba, Thu Nga Haskovcova, Nav Kaplish, Vernon D'Cruz. Director: Sreeraman P.S. Advisors: Kieran Bourke, Dipak Khot. Plus analysts and an intern.
- **Transactions.** Nine anonymised deals, for example: US$1bn IPO of India's largest film production and distribution firm; US$200m project funding partner selection for a multinational technical consultancy in Asia; US$200m real estate private equity fund placement in Europe; US$150m corporate debt for Asia's largest private mining company; US$150m end-to-end IPO advisory for Asia's leading adhesive brand; business strategy and project finance for Asia's leading theme park (undisclosed).
- **Mailboxes.** partners@, careers@, alumni@ and info@ (media) at adancorporate.com.
- **Podcast.** "A Done Deal", on Spotify.

### 4.2 Reference sites

If a browser tool is available (Playwright MCP, Chrome DevTools MCP or similar), open each reference at 1440px and 390px, screenshot the homepage, the open navigation, one service page and one people page, and write your observations into `docs/references.md`. If not, work from these notes.

- **Rothschild & Co, https://www.rothschildandco.com (primary reference, weight it most).** An ambient, slow autoplay film in the hero (people passing through a glass entrance in motion blur, no faces in focus) under one confident H1 and one supporting sentence. Three businesses presented as a short list with portrait-crop photography rather than icon cards. One row of headline figures with an "as at" footnote. Typographic transaction tombstones: year, client, one-line description, value. A filterable office list. Mega-menu panels that open with a one-line descriptor for the section, then grouped links. Photography of architecture, material texture and unposed people in real offices. Quiet colour, generous whitespace, serif headlines.
- **Evercore, https://www.evercore.com.** A four-word tagline over film, four key figures, a featured transactions rail with one consistent sentence structure (who was advised, on what, in what role, for what value), values as a plain list.
- **JPMorganChase, https://www.jpmorganchase.com.** Editorial pacing: alternating image and text bands, a leadership quote used as hero content, mega-menu panels that include one featured story card.
- **Deutsche Bank, https://www.db.com.** An editorial stage with category kickers and quote-led headlines, microcopy that respects the reader's time ("Invest five minutes"), one strong brand colour used with discipline.
- **Clear Street, https://www.clearstreet.io.** The modern layer: scroll-driven narrative, film used as texture inside sections, an electric accent on dark, crisp grotesque type, a large closing contact band.

**Synthesis.** Rothschild's restraint and structure as the base. Evercore's clarity in presenting deals and figures. The editorial pacing of JPMorganChase and Deutsche Bank. From Clear Street take only the motion craft and the confident dark feature band, and use that for the AI section. Study these sites, do not copy them: no assets, text, code, look-alike marks or layouts lifted wholesale.

## 5. Design direction

### Concept: Corridors

Adan's real differentiator is reach: senior people in London, Mumbai, Singapore, Dubai, Johannesburg and a dozen other cities, connecting companies to capital across borders. Let the design express connection across distance:

- fine meridian-like lines as a recurring structural motif (section dividers, the globe, the AI band);
- city names with live local time wherever an office or partner appears, which is also useful to people working across time zones;
- transaction cards that state their corridor, for example "Asia to Europe";
- one signature interactive piece, the network globe.

Spend boldness on the hero film and the globe. Keep everything else quiet and exact.

### Colour (starting tokens, to be harmonised with the logo)

| Token                       | Hex                                     | Use                                                                                                                   |
| --------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Ink                         | `#0B1D33`                               | Text on light, background of dark bands and footer                                                                    |
| Paper                       | `#F6F7F8`                               | Page background. Cool off-white, not cream                                                                            |
| White                       | `#FFFFFF`                               | Raised surfaces                                                                                                       |
| Stone 700 / 500 / 300 / 200 | `#3E4A59` `#6B7785` `#B9C0C8` `#E3E6EA` | Secondary text, rules, borders                                                                                        |
| Brass                       | `#A38A5B`                               | The only accent: thin rules, active states, small marks. Under 5% of any screen. Never body text on light backgrounds |

If the logo's primary colour fights this palette, the logo wins and the palette is rebuilt around it. Check every text and background pair for WCAG AA before using it.

### Typography

- **Display:** Newsreader (variable, optical size axis), light to regular weights, for H1, H2, pull quotes and large figures. Tight leading (0.95 to 1.05) and slight negative tracking at large sizes. True italics for quotations only.
- **Text and UI:** Hanken Grotesk (variable). Body at 17 to 18px with 1.55 to 1.6 line height and a measure of 60 to 75 characters.
- Tabular lining figures for every number (`font-variant-numeric: tabular-nums lining-nums`). Confirm the font supports them; if not, choose a grotesque that does.
- Self-host through `next/font`. Two families only. Fluid scale with `clamp()`, H1 reaching roughly 96 to 112px on wide screens.
- If you believe another pairing serves the brief better, argue for it in the design direction document. Do not fall back to Inter, Roboto, Arial or system fonts. If the client later supplies licensed brand fonts, they swap in through tokens.

### Layout

- 12-column grid, content max width 1440px, full-bleed media, outer margins `clamp(20px, 5vw, 80px)`.
- Asymmetric editorial compositions. Text is left aligned. No centred paragraphs.
- Vary the rhythm: dense, informational sections (figures, tombstones) alternate with open, quiet ones (statement, film).
- Corners square or 2px. Shadows close to absent. Hairline rules only where they carry structure (tables, tombstones, lists).
- A small set of fixed image ratios: 16:9 film, 4:5 portraits, 3:2 editorial.

### Avoid the tells of templated or AI-made sites

Uppercase tracked eyebrow labels over every heading. Numbered 01, 02, 03 markers on content that is not a sequence. An arrow appended to every link. Identical rounded cards with soft grey shadows. Gradient washes and glass effects. One italic or coloured word inside a headline. Fade and slide up on every section. Counters that spin up from zero. Stock clichés: handshakes, chess pieces, bulls, towers shot from below with lens flare, glowing blue brains or networks for AI. Custom cursors, preloaders, parallax for its own sake, cookie walls, chat widgets, carousels that advance on their own.

## 6. Information architecture

**Header.** Two tiers on desktop. Utility row: Insights, Podcast, Careers, Contact. Primary row: Expertise (mega panel), Transactions, People, About, plus a persistent "Speak to a partner" button. The Expertise panel lists the five pillars, each with its descriptor and four to six capability links that anchor into the pillar page, and one featured card (latest transaction or insight) on the right. Transparent over the hero, solid once scrolled, hides on scroll down and returns on scroll up. Fully keyboard operable, Escape closes, focus is trapped in the mobile sheet, which uses accordions.

**Footer.** Four columns (Expertise, Firm, Connect, Legal), office cities with local time, LinkedIn and Spotify, a placeholder for the legal and regulatory line, copyright.

**Routes.**

```
/                                   Home
/expertise                          Overview of the five pillars
/expertise/corporate-finance
/expertise/mergers-acquisitions
/expertise/strategy-leadership
/expertise/risk-governance
/expertise/ai-digital
/transactions                       Filterable tombstones (and current mandates, see below)
/people                             Filterable grid with name search
/people/[slug]                      Profile
/about                              Firm, values, the Adan advantage, network, locations
/insights, /insights/[slug]         Articles
/podcast                            A Done Deal
/careers                            Including "Join the partnership"
/contact                            Enquiry router and offices
/legal/[slug]                       Carried over from the current site
```

**Pillar page template.** Opening statement. Capability groups (two-column list on desktop, accordion on mobile, one or two sentences each, no sub-pages). How we work (a real sequence, so numbering is legitimate here). Relevant transactions. The two to four partners who lead the area. A contact band routed to the right partner. Sticky in-page index on desktop.

**People.** Filters for role, location and expertise, plus name search. Cards: 4:5 portrait, name, role, city with local time. Order: managing partners, partners, directors, advisors, analysts. Profile pages: large portrait, short biography, expertise tags that link to pillars, sectors, LinkedIn, email, vCard download, related transactions and insights, and a print stylesheet, because people do print these before meetings.

**Transactions.** Typographic tombstones, since the deals are anonymised: corridor or region, sector, a one-sentence headline, value or "Undisclosed", and Adan's role as tags. Filters for pillar, sector, region and size band. No client logos. If the live deals page holds real content, carry it as a "Current mandates" tab with an enquiry button and a placeholder for a legal disclaimer supplied by the client.

**Contact.** An enquiry router: "I want to raise capital / buy or sell a business / strengthen strategy or the board / manage risk / explore AI / join the firm / speak to the press", plus region. It shows the right partner and mailbox and a short form. Below it, offices grouped by region with address, phone, local time and a partner contact.

## 7. Homepage, in order

1. **Hero.** Ambient film with a poster that matches its first frame. Draft H1: "Cross-border corporate finance for the mid-market." Draft supporting line: "Adan Corporate is an international advisory firm of former C-suite executives. We help growing companies and funds raise capital, buy, sell and transform, from seed funding to IPO." One primary action (Speak to a partner) and one quiet link (Our expertise). A visible pause control on the film.
2. **Statement and figures.** The "who we are" paragraph set large in the display face, then one ruled row of four figures with an "as at" footnote. No count-up animation.
3. **Who we work with.** Three routes in: companies and founders; funds and family offices; senior professionals who may join the partnership. Each is one sentence and one link.
4. **Expertise index.** The five pillars as a typographic list. Hovering or focusing a name swaps the adjacent image and reveals the descriptor and capability tags. On touch it is an accordion.
5. **AI & Digital feature band.** Dark. The one place with a more technical mood: a code-drawn field of fine lines (flow field or contour map) moving slowly behind the copy. Two short columns for the two ideas in section 3.
6. **Selected transactions.** A horizontal rail of tombstones with scroll snap, drag, arrow keys and visible previous and next buttons. It never advances on its own.
7. **The network.** The globe beside an accessible list of cities. The list drives the globe: focusing a city rotates to it. Below, the six network categories as a compact two-row table, and the four principles rewritten in plain language (sectors, geographies, deal sizes from $1m to $500m, deal types).
8. **People.** The two managing partners large, then a rail of partners, then a link to everyone.
9. **Insights and podcast.** Most existing articles date from 2018 and 2019, so design this module to work with evergreen pieces plus the podcast, and raise the need for fresh content in the client questions.
10. **Closing contact band,** then the footer.

## 8. Motion and interaction

Slow, weighted, purposeful. Reveals run 500 to 900ms, interface feedback 150 to 250ms, with one easing family (expo or quart out). Nothing bounces.

Motion that is not triggered by the user is limited to three things: the hero sequence on load (film fades up from the poster, H1 lines rise through a mask, the header settles), at most one reveal at each section opener, and the ambient globe and AI field. Everything else answers an action.

- Expertise index: clip-path image wipe with a slight scale settle from 1.04 to 1.
- People cards: greyscale to colour on hover and focus, 300ms.
- Links: the underline draws from the left. Buttons: a fill sweep.
- Page changes: the View Transitions API, a 250ms cross-fade, and a portrait morph from a people card to its profile. Fall back to instant navigation where unsupported.
- Smooth scrolling: Lenis at a light setting for desktop pointer devices only, off for touch and for reduced motion. Never hijack scroll, and never pin a section for more than a moment.
- Local times: `Intl.DateTimeFormat` with each office's time zone, rendered after hydration to avoid mismatches.
- `prefers-reduced-motion`: everything degrades to opacity changes or nothing, and the film is replaced by its poster.

## 9. Photography and film: generate with Vertex AI through ADC

This machine already has Application Default Credentials linked to a Google Cloud project with Vertex AI. Use them. Do not ask for API keys and never write credentials into the repository.

**Preflight.** Confirm `gcloud auth application-default print-access-token` succeeds. Resolve the project from `GOOGLE_CLOUD_PROJECT` or `gcloud config get-value project`. For location, try `global` first and fall back to `us-central1` (the image models may only answer on `global`, and Veo may only answer in a region). Make one cheap test image call before any batch. If you hit an authentication, quota-project or API-not-enabled error, report the exact error with the gcloud command that fixes it, and stop.

**SDK.** The Google Gen AI SDK for Node (`@google/genai`) initialised with `vertexai: true`, so the whole project stays on one toolchain. The older Vertex AI generative SDK modules have been deprecated or removed, so do not use them. Read the current SDK documentation before writing the script, because parameter names change.

**Models, as of September 2026. Verify before use.** Google retires model IDs often: the Imagen generate endpoints and the Veo 2 and Veo 3.0 endpoints have already been shut down.

- Stills: `gemini-3-pro-image` (it may carry a `-preview` suffix) for the hero and key art, `gemini-3.1-flash-image` for everything else.
- Film: `veo-3.1-generate-001` for the final hero, `veo-3.1-fast-generate-001` for drafts and secondary loops.
- If an ID is rejected, list the available models, choose the closest current equivalent and record the choice in `docs/DECISIONS.md`.

**Pipeline.** Build `scripts/media/` with `shots.ts` (the shot list and prompts), `generate.ts`, `process.ts` and `manifest.json`. The manifest records, for every call: id, model, prompt, parameters, timestamp and whether the take was kept. Originals go to `media/originals/` (git-ignored), processed files to `public/media/`.

**House look, appended to every prompt.** "Full-frame cinema camera, 40mm lens, natural available light at dawn or blue hour, muted palette of deep blue-black shadows, cool stone greys and occasional warm brass highlights, soft contrast, fine film grain, shallow depth of field, architectural composition with strong verticals, calm and unposed. No text, no signage, no logos, no recognisable landmarks, no faces in focus, no lens flare, no HDR look, no neon, no futuristic interfaces."

Evoke, do not depict. Generated versions of real skylines are always slightly wrong, and this audience works in those cities and will notice. Adan was founded in 2013, so do not fake heritage with quills, ledgers or oil portraits.

**Shot list.**

| Id                           | Subject                                                                                                                                                                                                                                                                                 | Format                                    |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `hero-still`, `hero-film`    | A stone and glass office lobby at dawn. Low sun rakes across a pale stone floor, two or three anonymous figures cross in soft motion blur, reflections drift across the glazing. Camera locked off or drifting almost imperceptibly: the life comes from figures, light and reflections | 16:9 and 9:16, 1080p, 8 seconds, no audio |
| `pillar-corporate-finance`   | Along a stone façade where a modern glass extension meets it, early light                                                                                                                                                                                                               | 3:2                                       |
| `pillar-ma`                  | Two buildings joined by an enclosed glass footbridge, seen from the street at blue hour                                                                                                                                                                                                 | 3:2                                       |
| `pillar-strategy`            | An empty boardroom at first light: long timber table, chairs slightly askew as if a meeting has just ended, the city soft beyond the window                                                                                                                                             | 3:2                                       |
| `pillar-risk`                | Close detail of precise structural steel and stone junctions in a repeating rhythm                                                                                                                                                                                                      | 3:2                                       |
| `pillar-ai`                  | No generated photograph. Use the code-drawn line field                                                                                                                                                                                                                                  | n/a                                       |
| `about-1`, `about-2`         | A rain-beaded window at blue hour with a harbour city reduced to bokeh; a quiet financial district street just after sunrise with one distant figure in motion blur                                                                                                                     | 3:2                                       |
| `contact`                    | A heavy timber door ajar onto a bright corridor, warm light across a stone floor                                                                                                                                                                                                        | 16:9                                      |
| `texture-01` to `texture-06` | Macro material studies: honed limestone, brushed brass, fluted glass, dark oak, woven wool, blued steel. For insight cards without imagery                                                                                                                                              | 1:1                                       |

Up to two secondary loops (six seconds, fast model) are allowed, for `pillar-strategy` and `about-1`.

**Matching poster and film.** Generate `hero-still` first and approve it on screen. Then animate that exact still with image-to-video, so the poster and the first frame are identical and nothing shifts when the film starts. If the API supports first and last frame conditioning, pass the same still as both to get a seamless loop. Otherwise build the loop in ffmpeg with a one-second crossfade.

**Quality control.** Open and inspect every output. For film, extract frames at 0, 2, 4, 6 and 8 seconds with ffmpeg and inspect those. Reject anything with legible or pseudo text, logos, warped geometry, melting figures, faces in focus, recognisable landmarks or a stock-photo feel. Up to three attempts per shot, refining the prompt each time.

**Grade and delivery.** Run every kept asset through the same light grade (slight desaturation, a gentle contrast curve) so stills and film share one world. Stills: `sharp` to AVIF and WebP at 640, 960, 1280, 1920 and 2560 widths, with blur placeholders. Film: strip audio, encode H.264 MP4 with faststart plus WebM, at 1920 and 1280 widths, at most 3 MB on desktop and 1.5 MB on mobile. Add a CSS scrim wherever text sits on media and check contrast against the brightest frame.

**Playback.** `muted`, `playsinline`, `loop`, `preload="none"`. Start after the poster has painted. Pause when off screen or when the tab is hidden. Do not load film on Save-Data or reduced motion.

**Budget caps for the whole project, retries included:** 60 image generations and 12 video generations. If film generation is unavailable, ship the hero with a very slow push on the still and record that.

**Real people.** Never generate, enhance or edit images of real, named people with a generative model. Download the existing headshots from the current site, self-host them, and apply deterministic processing only: a consistent 4:5 crop, greyscale and matched contrast. Anyone without a usable photograph gets a typographic monogram tile. A few current headshots appear to be AI-generated placeholders on a third-party image host: treat those as missing.

## 10. Stack and engineering standards

- Latest stable Next.js (App Router), TypeScript in strict mode, server components by default, pnpm.
- Latest stable Tailwind CSS, with design tokens as CSS variables. No UI kit. Radix UI primitives (or React Aria) for the navigation menu, dialog, accordion and tabs, styled from scratch, so keyboard and screen reader behaviour is right.
- GSAP with ScrollTrigger and SplitText, plus Lenis, loaded only where needed and after idle. The globe: a lightweight approach such as `cobe` or d3-geo on canvas, lazy-loaded, with a static fallback. No heavy Three.js scene.
- Content in typed files under `content/` (TypeScript and MDX) validated with Zod: site, pillars, people, transactions, offices, insights. A headless CMS can replace these later without touching components. Every figure lives in one file with a `needsConfirmation` flag.
- `next/image`, `next/font`, the metadata API, `next/og` for typographic social images, `sitemap.ts`, `robots.ts`, and JSON-LD for Organization, Person and Service.
- Contact form: a server action with Zod validation, a honeypot and rate limiting, sending through Resend (`RESEND_API_KEY`). Without a key, log the payload and show the success state. Document this in `.env.example`.
- No analytics by default. Leave a hook for Plausible. Show a cookie banner only if cookies are actually set.
- **Redirects.** Build a permanent redirect map from every URL in the old sitemap to its nearest new page, so existing search equity and inbound links survive. Keep it in `redirects.ts` and wire it into `next.config`.
- Hosting target: Vercel.
- **Budgets.** LCP under 2.0s on a mid-range phone on 4G, with the hero poster as the LCP element. CLS under 0.05. INP under 200ms. Homepage JavaScript under roughly 170 kB gzipped on first load. Lighthouse 95 or higher for accessibility, best practices and SEO, and 90 or higher for mobile performance.
- **Accessibility.** WCAG 2.2 AA. Landmarks, a skip link, visible focus, a pause control on the film, labelled forms with useful error messages, 24px minimum targets, no horizontal scroll at 320px, and content readable with JavaScript disabled.
- `pnpm check` runs ESLint, Prettier, the type check, Playwright smoke tests and axe.

## 11. Guardrails

- **Truth.** Do not invent clients, deals, figures, awards, testimonials, regulatory status or credentials. Every fact comes from the current site. Anything unverified or inconsistent carries the confirmation flag and appears in the client questions.
- **Copy.** British English. Plain, specific, active voice, sentence-case headings. No hype words ("world-class", "cutting-edge", "synergy", "secret sauce"), no exclamation marks, no em-dashes. All copy you write is draft: collect it in `docs/COPY-DRAFT.md` for partner review.
- **Intellectual property.** The reference sites are for study only.
- **Secrets.** ADC only. Nothing sensitive in the repository.
- **Personal data.** Publish only firm-domain email addresses.

## 12. Process and definition of done

Work through the phases in order, commit at the end of each, and do not stop for approval. Where something is ambiguous, make the call a senior creative director would make, record it in `docs/DECISIONS.md` and carry on. Stop only if Vertex AI authentication fails or the current site cannot be fetched at all. Use sub-agents for content extraction and media generation to protect your context.

0. **Set-up and discovery.** Save this brief. Scaffold the project. Fetch the content. Study the references. Sample the logo colours. Create a `CLAUDE.md` that summarises tokens, guardrails and commands so later sessions stay consistent.
1. **Design direction.** Write `docs/design-direction.md`: final tokens, type scale, grid, motion rules, and ASCII wireframes for the homepage, a pillar page and People. Then critique it against this brief. Revise anything that reads as the default answer to "finance website", and note what changed and why.
2. **Foundations.** Tokens, typography, grid, primitives, header, mega panel, footer.
3. **Media pipeline.** Hero still, hero film, then the pillar imagery.
4. **Homepage.** Complete and polished before any inner page. It sets the bar for everything else.
5. **Inner pages.**
6. **Polish.** At least two rounds of screenshot review at 390, 768, 1440 and 1920 wide. In each round, list the ten weakest details (spacing, alignment, widows and orphans, image crops, hover and focus states, empty states, long names, slow connections) and fix them.
7. **QA.** Playwright across Chromium, WebKit and Firefox. axe. Lighthouse. A keyboard-only walk-through. Reduced motion. 320px width. JavaScript disabled. Throttled 4G.
8. **Handover.** A README covering run, environment, deployment and how to regenerate media. `docs/DECISIONS.md`, `docs/CLIENT-QUESTIONS.md`, `docs/COPY-DRAFT.md`, the media manifest and the redirect map. A final report with Lighthouse scores, screenshots of every page at each width, and a list of every placeholder.

If a `frontend-design` skill is installed, use it in phases 1 and 6. If a `radlabs-web-audit` skill is installed, run it against the finished build in phase 7 and fix what it reports.

**Seed `docs/CLIENT-QUESTIONS.md` with these known issues:**

- Is it 15 countries or 19? Are "35 professionals" and "US$5bn" current, and as at what date?
- The leadership list: Keshav Adya appears as Managing Partner on insight posts and as the Dubai contact, but is absent from the homepage team list.
- A few team members appear to have placeholder headshots, and at least one profile lists a non-firm email address. Real photographs and firm addresses are needed, and ideally one consistent portrait shoot.
- The wording of the legal and regulatory footer must come from the client.
- Sign-off on the AI & Digital proposition.
- Insights date from 2018 and 2019. Fresh content is needed.
- A vector logo file.
- Should current mandates be published, and with what disclaimer?

**Done means:** every route is built with real content, the budgets in section 10 are met, there are no console errors, no lorem ipsum, no broken links, no unprocessed imagery and no invented facts, and a partner could open the homepage on a phone in a taxi and find the right person to call in under thirty seconds.
