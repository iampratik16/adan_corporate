# Questions for the partners

Everything the new site could not resolve from the old one. Grouped by how much it blocks.

Nothing on the new site invents an answer to any of these. Where a fact is unconfirmed it is either
marked, withheld, or shown as a visible placeholder.

---

## Blocking: the site cannot go live without these

### 1. The regulatory and legal footer

The footer currently prints a visible placeholder. The old site carries **no authorisation
statement**: no firm reference number, no "authorised and regulated by", no company number and no
registered office. Its only regulatory sentence says Adan operates under ICAEW guidance on corporate
finance activities, then links an **ICAS** handbook, which is a different institute in a different
jurisdiction.

We need: the trading entity, its registration number, its registered office, and the authorisation
statement, if any.

Related: the old legal pages name **two different entities**. Terms of Use says "Adan Corporate
Services Limited"; the Privacy Policy says "Adan Corporate LLP and its subsidiaries and affiliates".
Which entity runs this site?

### 2. Nine people are commented out of the old homepage but still have live profile pages

Are they still with the firm?

Keshav Adya, Mike Kemball, Edgar Garay, Jean-Bernard Tanqueray, Craig Tingle, Preethi Hari,
Suresh Nambiar, Rauf Akhundov, Ajay Sethi.

**Keshav Adya is the urgent one.** He is a Managing Partner, listed second on the team page, the
author of every page in the site's source comments, and the bylined author of two of the six
insight cards, yet he is commented out of the homepage team grid. He is currently included.

### 3. Sign-off on the AI & Digital proposition

Treated as a flagship: a dark feature band on the homepage and a full pillar page. Every word is
draft. It is deliberately narrow, claiming only advisory capability and the firm's own internal use
of AI. It claims **no product, no tool, no track record and no metric**, because the current site
supports none.

### 4. A vector logo

The only asset available is 291x36px with the white background baked in and no transparency. It has
been alpha-keyed and rescaled but never redrawn.

Because the wordmark is anti-aliased against white, it **cannot be reversed onto a dark ground at
all**: keying leaves hollow, outlined letterforms. The header therefore carries the mark in a paper
masthead plate over the hero film. That works, but an SVG would remove the constraint and would also
fix the softness of the mark at retina sizes.

---

## Figures: every headline number contradicts another

Each is printed with a confirmation flag. Please confirm the number **and the date it is as at**;
the site currently shows "As at [date to be confirmed by the client]".

| Figure                          | The contradiction                                                                                                                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Professionals**               | The homepage counter says **35**. Keshav Adya's biography says **"45+ senior corporate professionals in 18 countries"**. There are **29** profile pages. Only **23** people render on the old homepage.      |
| **Countries**                   | The homepage counter says **"15 Countries in 3 Continents"**. The Location Agnostic card, on the same page, says **"19 countries across 3 continents"**. Kieran Bourke's biography says **four** continents. |
| **Cities**                      | The locations page claims **"22 cities in 20 countries"** but lists **14 cities in 13 countries**. The site prints 14, counted rather than claimed.                                                          |
| **US$5bn transaction value**    | No date anywhere. Is it current?                                                                                                                                                                             |
| **20 years average experience** | Average across whom, and as at when?                                                                                                                                                                         |
| **Deal range $1m to $500m**     | The published transaction list runs from **$2.5m to $1bn**, so the stated range matches neither end.                                                                                                         |

---

## Data errors found in the source

### The Almaty office record is contaminated with the Baku one

The Kazakhstan entry carries a **+994 phone number**, which is Azerbaijan's country code, not
Kazakhstan's +7. It is byte-identical to the Baku number. Its address contains **"Yasamal"**, which
is a district of Baku. Both cities list the same contact.

The new site prints Almaty **with no phone and no address** rather than printing wrong details.
Please supply the correct ones.

### Three partners' expertise blocks are copy-pasted from other partners

Byte-identical taxonomy, so at least one person in each pair is wrong:

- Ajay Mavinkurve / Saba Suryanarayanan / Neeraj Arora share one block
- Roland Giebitz / Edgar Garay / Dipak Khot share another
- Kieran Bourke / Craig Tingle share a third

Where a block contradicted the person's own biography it has been **withheld rather than
republished**. Those profiles currently show no expertise tags.

### Kieran Bourke has three different titles

"Partner / Commodities" on his profile, "Advisor / Risk Management" on the homepage, and
"Partner, Commodities" on an insight byline. He is currently grouped as an advisor, which is where
the old team page places him.

### Other inconsistencies

- **Varun Nadkarni's** experience is "more than 6 years" on his profile and "more than 2.5 years" on
  the homepage. The profile figure is used.
- **Mahimaa A.B** is titled Financial Analyst but her biography describes a marketing and strategy
  professional, and her printed name disagrees with her email prefix (`mahima.baindur@`).
- **Craig Tingle's** biography says he "is pursuing an MBA from London Business School", present
  tense on an undated page, and claims "billions of dollars in transactions". Neither is published.
- **Thomas Peutz** is titled "Sustainable Energy" but neither his biography nor his sectors lead on
  energy. **Freddie Tshiaba** is "International Investments" on his profile and "Corporate Finance"
  on the homepage.
- **Preethi Hari's** biography names Deutsche Bank, ING, Bank of America, Barclays and Lloyds. That
  client list is not published; please confirm before it goes on the site.
- **Vinayak Hattangadi** is in the brief and on the old homepage but has **no profile page**
  (404). He is included from his homepage biography, with no photograph.

---

## Personal data

- **Harsh Katiyar**, a corporate intern, is the only person on the old site with a **personal Gmail
  address**. The new site publishes firm-domain addresses only, so his is omitted. Should interns
  appear on the site at all?
- Six profile emails are printed in mixed case (`Roland.Giebitz@`, `Craig.Tingle@`, `Dipak.Khot@`,
  `Edgar.Garay@`, `Freddie.Tshiaba@`, `Mike.Kemball@`). Carried verbatim; lower-casing them is a
  one-line change if you prefer.
- There is no `media@` or `press@` mailbox. The old site labels a "Media" contact but points it at
  the general `info@`. The contact router does the same.

---

## Photography

**A consistent portrait shoot is the single biggest visual upgrade available.**

Every headshot on the old site is a roughly 400x400 circular avatar with a red ring baked into the
pixels, on white, at inconsistent scales. The new site detects that ring, crops the largest 4:5
rectangle that fits inside it, and matches every portrait to a common tone, which is a large
improvement. But the geometry caps the usable image at about 240px wide, so output stops at 320px
and portraits are displayed small by design rather than upscaled.

Three people have **no photograph at all** and currently show a typographic monogram:
Vinayak Hattangadi, Mahimaa A.B, Harsh Katiyar.

---

## Content

### Insights are four to seven years old

Every article dates from **2018 or 2019**, and most link off-site to LinkedIn Pulse rather than to
an owned page. The module is therefore designed as a **library of evergreen pieces**, not a news
feed, and the words "latest", "recent" and "news" appear nowhere. Dates are printed honestly.

Fresh content is needed. Two or three pieces a year from partners would carry it.

### Current mandates

The Live Deals page holds **31 real mandates** in a server-rendered table, so the Current mandates
tab ships. But the data is **static HTML, last hand-edited some time ago**, and the old footer reads
"2013 - 2021" on some pages and "2013 - 2024" on others.

1. Are these mandates still live? Currency must be confirmed before republishing.
2. What disclaimer should sit above them? A visible placeholder notice is in place.
3. Should they be public at all, or behind an enquiry?

### The podcast

"A Done Deal" is on Spotify. Is it still running, and are there episodes to list?

---

## Smaller confirmations

- The **four values** and **the Adan advantage** have been rewritten from the old copy to the new
  tone. Please read them as drafts.
- **Alumni**: the old alumni page names no alumni at all, only an `alumni@` mailbox. Kept as a
  mailbox route on the careers page.
- **Careers**: there is no list of open roles anywhere. The page routes to `careers@` rather than
  faking a jobs board. Is there a role list?
- The old site's **COVID-19 services**, including UK CBILS, are dropped. CBILS closed to new
  applications on 31 March 2021.
- Blockchain, IoT and RPA are dropped as headline offers, per the brief. Nav Kaplish's title still
  reads "Digital, Blockchain & Risk" on the old site. Should it change?
- All copy written for this site is collected in `docs/COPY-DRAFT.md` for review.
