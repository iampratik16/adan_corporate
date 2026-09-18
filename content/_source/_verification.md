# Verification — extracted source vs BRIEF.md §4.1 "Verified abstract"

Checked 2026-09-18 against every file in `content/_source/` (about, ai-digital, brand, contact,
home, insights, legal, old-urls, people, pillars, transactions).

**Bottom line: the brief's §4.1 abstract is accurate as a record of what the old site *prints*.
Its own caveat — "Figures as published (unverified)" — is the correct reading. Not one headline
figure carries a date, a source or an "as at" note anywhere on the old site, and three of the four
counters are contradicted by other copy on the same page or by the firm's own deal tables.**

Recommendation for the new build: publish **no** counter row unless the client signs off a figure
and an "as at" date. If a figures row is wanted for the Rothschild-style band, the only numbers the
source can defend are the countable ones (offices, mandates, completed transactions) — see §2.

---

## 1. Is it 15 countries or 19?

Both. The old site prints **four different country counts**, two of them on the same page,
and none of them matches what is actually listed.

| Figure | Where it appears | Source line |
|---|---|---|
| **15** Countries in 3 Continents | Homepage animated counter; Company Overview counter. Hardcoded in HTML *and* in `assets/js/main.js` (`CountUp("count-3",0,15,…)`), so it is deliberate, not a typo | `home.md:56`, `about.md:85` |
| **19** countries across 3 continents | "Location Agnostic" card — on the homepage, on Company Overview *and* on The Adan Advantage | `home.md:65`, `about.md:94`, `about.md:257` |
| **20** countries / 22 cities | Global Locations hero: "Adan Corporate has teams in 22 cities in 20 countries. and growing…" | `contact.md:78` |
| **18** countries, 45+ professionals | Chennakeshav (Keshav) Adya's biography, on his profile page | `people.md:228` |
| **4 continents** | Kieran Bourke's biography ("across 4 continents") — against "3 Continents" in the counter | `home.md:166` |

**What is actually countable:** the Contact Us and Global Locations pages (byte-identical office
lists) print **14 cities in 13 countries**. UAE appears twice (Dubai, Abu Dhabi) and Singapore is
both city and country. See `contact.md:83`.

**Verdict:** 15 vs 19 is a live, unresolved contradiction that sits on three separate pages. 20 and
18 are two further claims the brief does not mention. **Print neither. Ask the client.** The new
site can honestly say "offices and partners in 13 countries across Europe, Asia and Africa" only if
the client confirms the 14-office list is current.

---

## 2. Are "35 professionals", "20 years average experience" and "US$5bn" on the site?

Yes — all three, as animated CountUp counters, on exactly **two pages**: the homepage and
`/en-uk/about-us/company-overview.html`. Identical values in both places, hardcoded in the HTML and
mirrored in `main.js`. The source even carries the comment
`<!-- Change the numbers in the main.js file under the function initCountNbr() -->` (`about.md:89`).

**Date: none.** No "as at" footnote, no year, no methodology on either page. The only date anchors
anywhere near them are the HTML build comment `Datemodified 20210101/20200327` and the footer
`© Adan Corporate 2013 - 2021`. Treat every counter as **at best 2021 vintage, five years stale**.

### 35 Corporate Professionals — contradicted three ways
- The homepage itself renders only **23** team cards (`home.md:118`). Nine more are in the HTML but
  commented out; 32 total including hidden.
- `/en-uk/about-us/team.html` lists **29** people (`people.md:22-50`).
- Keshav Adya's bio claims **45+** (`people.md:228`).
- Counting every named individual across all pages (29 profiles + Vinayak Hattangadi, Mahimaa A.B,
  Harsh Katiyar on the homepage + Dr. Aneesh Chivukula on the digital pages + Subhash Baliga, Priya
  Shah, Suryadeep Nain, Carlos Dos Santos Leiria in sub-service "Featured Experts" + Nitin Kumar,
  Almira, Chris King from office mailboxes) gets to roughly **40** — but most of those are
  unverifiable name fragments, not staff records.

### 20 Average Years of Experience — arithmetically unsupported but directionally plausible
No page states a methodology or a date. Individual bios do state years: 30+ (Ajay, Saba, Roland,
Raju, Sandeep, Vernon), 25+ (Vinayak, Thomas, Marco, Kieran), 20+ (Keshav, George, Freddie, Thu Nga),
18+ (Nav), 15+ (Sreeraman), ~3 decades (Dipak), 4 decades (Arun), 5+ (Heena), 2.5 (Varun). The mean
of the senior cohort is well above 20; including analysts and the intern drags it down. "20" is a
rounded assertion, not a computed figure.

### US$5bn Value of Transactions — the one figure that can be partly reconstructed, and it does not add up as labelled
- The Clients page lists **36 completed transactions**. 33 carry a disclosed value; 3 are
  "Confidential". **The 33 disclosed values total ≈ US$2.40bn** (`transactions.md` §2).
- The Live Deals page lists **31 open mandates totalling ≈ US$2.35bn** (`transactions.md` §3).
- **2.40 + 2.35 ≈ US$4.75bn.** So "5 (billion USD) Value of Transactions" appears to be
  completed deals **plus the live pipeline** — i.e. deals not done. Labelling unclosed mandates as
  "Value of Transactions" is the kind of claim a fund partner will check.
- **This is the single most important question to put to the client.** Completed-only, the
  defensible figure is **≈ US$2.4bn across 36 transactions** (plus 3 undisclosed).

---

## 3. Is the deal size range "$1m to $500m"?

**The string is on the site, verbatim, three times** — homepage, Company Overview and The Adan
Advantage, all in the "Deal-Value Agnostic" card:

> "Our deal value ranges between $1 mn and $500 mn and our focus is the mid-market segment"

(`home.md:66`, `about.md:95`, `about.md:258`)

**But the firm's own deal tables break the range at both ends:**
- **Above:** completed deal 4, "IPO of India's largest film production and distribution firm",
  **$1 billion** — double the stated ceiling. Live mandates 57 ($450mn) and 60 ($400mn) also sit
  near/over it, and the Live Deals size filter's top band is "$200+ mn", with no $500m cap.
- **Below:** live mandate 90, "Business valuation of a food manufacturing company", **$0.25mn**;
  mandate 73 at $2mn; mandate 18 at $3mn. Completed deal 5 is **$2.5mn**.

**Verdict:** the *sentence* is verified as published. The *claim* is contradicted by the site's own
data. Either restate as "mid-market, typically $5m–$250m with selective larger mandates" (client to
confirm), or drop the numeric range and keep "mid-market focus".

---

## 4. Does the city list match the brief's list?

Brief's 16: London, Zurich, Amsterdam, Prague, Milan, Paris, **Hamburg**, Mumbai, **Pune**, Dubai,
Abu Dhabi, Singapore, Almaty, Baku, Johannesburg, Abidjan.

**14 of 16 match the offices pages. Two do not.**

| Brief city | On the Contact/Global Locations office list? | Note |
|---|---|---|
| London | Yes | 27 Old Gloucester Street, WC1N 3AX. Full address + tel |
| Zurich | Yes, as **Glattbrugg, Zurich 8152** | Locality only, no street address |
| Amsterdam | Yes | Herengracht 268. Full address |
| Prague | Yes | Vaclavske nam. Full address |
| Milan | Yes | **City name only, no address; phone is a +44 UK mobile** |
| Paris | Yes | **City name only; phone +420 is the Prague number, byte-identical** |
| **Hamburg** | **NO** | Not an office. Comes from Roland Giebitz's team card, "Hamburg, Germany" |
| Mumbai | Yes | Juhu JVPD Scheme. Full address |
| **Pune** | **NO** | Not an office. Comes from Arun Shroff's team card, "Pune, India" |
| Dubai | Yes | Sheikh Zayed Road, no building number. Two phone numbers |
| Abu Dhabi | Yes | Khalifa Street |
| Singapore | Yes | Simei Rise, no street number, **no phone number** |
| Almaty | Yes | **Address contains "Yasamal", a district of Baku; phone +994 is Azerbaijan's, identical to Baku's** |
| Baku | Yes | 574-2 Hagverdiyev St |
| Johannesburg | Yes | Senderwood |
| Abidjan | Yes | PO Box only. **No phone number**. Heading "Ivory Coast", address says "Cote d'Ivoire" |

**Cities in the source that the brief's list omits** (all from team profiles or the digital pages,
not from the offices list): Bogota (Edgar Garay), Miami (Craig Tingle), Manama, Bahrain (Suresh
Nambiar), Gurgaon (Heena Tilwani), Sydney (Dr. Aneesh Chivukula).

**Verdict:** the brief's list is a *merge* of the offices page and partner home cities, and does not
correspond to any single list on the old site. For the new site's office/globe component, use the
**14-city offices list** and label partner cities separately — the old site draws no
office-vs-presence distinction anywhere (`contact.md` §4), so any such split must come from the client.

---

## 5. Does the people list match? Where is Keshav Adya?

### Keshav Adya — the brief's §4.1 list omits him; he is very much on the site

| Location | Status |
|---|---|
| `/en-uk/about-us/team.html` | **LIVE.** Real markup, listed #2 as Managing Partner, "DUBAI & LONDON" |
| `/en-uk/team/keshav-adya.html` | **LIVE**, HTTP 200, full profile, `ck.adya@adancorporate.com` |
| Homepage team grid | **HIDDEN.** His card is wrapped in an HTML comment, with the inner comment markers hyphen-escaped so the outer comment survives — i.e. **deliberately** hidden, not an accident |
| Insights blog | **Bylined on 8 of the 13 articles** as Managing Partner |
| Homepage insight cards | Bylined on 2 of the 6 |
| "A Done Deal" podcast | **Host of all 14 episodes** |
| Contact page | The **Dubai** office contact, `ck.adya@adancorporate.com` |
| Legal pages | Named **Data Protection Officer** (`legal.md:34`) |
| Every page's HTML author comment | `Chennakeshav Adya <website@adancorporate.com>` |

**Correction to the brief.** BRIEF.md line 283 says he "is absent from the homepage team list" —
true, but narrower than it reads: he is absent **only** from the homepage, and present and live
everywhere else including the canonical team page. §4.1 then omits him from the people list
entirely, which overstates the position. **This needs a client decision before any copy is written
— it affects the podcast, the insights archive, the Dubai office, the DPO name and the site author
credit, not just one card.**

### Vinayak Hattangadi — the reverse problem
The brief lists him as a Partner. He appears on the **homepage only** (card #3, "Partner" /
"Executive Director & Interim CTO" / Mumbai). He is **not** on `/en-uk/about-us/team.html`, has
**no profile page** (`/en-uk/team/vinayak-hattangadi.html` returns **HTTP 404**), and "Hattangadi"
returns zero hits on team.html and alumni.html (`people.md:64-67`). Bio, role, city and headshot
would all have to be supplied fresh by the client.

### Everyone else in the brief's list: found
All other 17 names in §4.1 are present with live profile pages, at the roles and cities the brief
states. Two small corrections: the site prints "Chennakeshav (Keshav) Adya", and Kieran Bourke is
inconsistent — "Advisor / Risk Management" on his team card but "Partner, Commodities" on his
insight byline and in the team-page grouping.

### 11 people with live profile pages whom the brief's list does not mention
Ajay Sethi (Director, Market Development, London); Craig Tingle (Partner, Real Estate, Miami and
Dubai); Edgar Garay (Partner, Corporate Finance, Bogota); Heena Tilwani (Financial Analyst,
Gurgaon); Jean-Bernard (JB) Tanqueray (Partner, Family Offices, Paris & London — and the Paris
office contact); Mike Kemball (Partner, Turnaround and Growth, London — and a guest on podcast
episodes 4 and 8); Preethi Hari (Partner, Risk Management, London); Rauf Akhundov (Partner, Central
Asia, Baku); Shreyash Gandhi (Financial Analyst, Mumbai); Suresh Nambiar (Partner, Procurement &
Logistics, Manama); Varun Nadkarni (Financial Analyst, India).

Nine of these are also in the homepage's commented-out block, alongside Keshav. **Client must
confirm who is still with the firm.**

### Further names that appear nowhere in the 29-person roster
- **Mahimaa A.B** and **Harsh Katiyar** — live on the homepage grid, no profile page, not on
  team.html. Harsh is listed with a personal Gmail address, `katiyarh76@gmail.com`.
- **Dr. Aneesh Chivukula**, Director, Artificial Intelligence, Sydney — the *only* AI-credentialled
  name on the site, appears on six digital pages, **no profile page, not on the team page**. The new
  AI & Digital pillar leans entirely on him.
- **Subhash Baliga, Priya Shah, Suryadeep Nain, Carlos Dos Santos Leiria** — named in "Featured
  Experts" lists on sub-service pages only. No cards, no profiles, no emails.
- **Nitin Kumar** (Zurich), **Almira** (Almaty *and* Baku), **Chris King** (Abidjan), **sp@** (Abu
  Dhabi) — office mailbox local-parts with no printed names and no team entries.

---

## 6. Which headshots are third-party-hosted placeholders?

**None.** This premise does not hold.

`people.md:87-90` records the check: every headshot `src` on the team page and on all 29 profile
pages is a site-relative path under `../../assets/images/`, resolving to
`https://adancorporate.com/assets/images/…`, and all spot-checked URLs returned HTTP 200. No
`placehold.it`, `unsplash`, `randomuser`, `gravatar`, `dummyimage` or any other external host
appears on any headshot, on any page, in any extracted file.

Three near-misses that may have prompted the question:
1. **`main.js` contains dead `kenburns` code pointing at `http://placehold.it/…`** — a defunct
   service, over plain HTTP, i.e. mixed content. It is **not** a headshot; it is unused library
   configuration left in the shared bundle (`home.md:223`).
2. **Every profile page's "Insights" sidebar has three placeholder items reading "Blog Post" linked
   to `#`** — placeholder *links*, not images (`people.md:177`).
3. **The hero CTA renders as "Read More About How Adan Corporate ( ) Can Assist"** on at least six
   pages — an unfilled Font Awesome icon slot, present site-wide.

Real headshot problems, for the migration plan:
- Each person has **two** files — a `-colour-home-page.webp` for the listing and a separate `.png`
  for the profile. Pick one master.
- Ten filenames break the `adan-team-<name>` convention and contain literal spaces and inconsistent
  case: `Arun Main Page.png`, `Arun Team Page.png`, `Neeraj Arora Website photo format.png`,
  `Heena Website format photo.png`, `Varun Photo Index.png`, `Varun Photo Team.png`,
  `Shreyash Website Photo Format.png`, `Freddie.png`, `sandeep-main.png`, `sandeep-team.png`.
- Vinayak Hattangadi, Mahimaa A.B, Harsh Katiyar and Dr. Aneesh Chivukula have **no profile page**,
  so no profile-grade headshot exists for them.
- Vernon D'Cruz's `alt` is "Vernon D Cruz"; the heading prints "Vernon D'Cruz".

---

## 7. Is there a live-deals page with real content?

**Yes. Verified real, and it is the single best piece of content on the old site.**

`/en-uk/clients/live-deals.html` (HTTP 200, 75,240 bytes) carries **31 individually-numbered open
mandates** in a server-rendered HTML table: Deal Type, Amount, Industry, Region, Description, and a
working `mailto:info@adancorporate.com?subject=Interested in Deal - <#> - …` per row. Verified by
count: 33 `<tr>` = 1 filter row + 1 header + **31** `class="deal-list-row"`, and 31 distinct
`mailto:` links (`transactions.md` §3). Not lorem ipsum, not a placeholder.

Values run $0.25mn to $450mn, **≈ US$2.35bn total**, across 13 industries and 5 regions.

**Three blocking caveats before any of it is republished:**
1. **No dates. No last-updated stamp.** The table is hand-maintained static HTML and the footer
   reads "© Adan Corporate 2013 - 2021". **The client must confirm which of the 31 are still live.**
   Publishing a five-year-old "current mandates" table is worse than publishing none.
2. **Mandate IDs are public and non-contiguous, running to 96** — roughly 65 numbers in 1–96 are
   missing, which broadcasts how many mandates have been withdrawn or closed. Confirm the numbering
   is meant to be public.
3. **Four rows have a Deal Type that contradicts their own description** (87, 86, 83 typed "Sale"
   but described as financing an acquisition; 21 typed "Equity Raise" but described as a valuation),
   and the filters are broken — three rows are unreachable by the size filter, two deal types are
   missing from the type dropdown, and most filter options match no data at all.

Separately: the **Clients page carries 36 completed transactions**, not the nine the brief's §4.1
abstract mentions. The nine are the subset shown on the Company Overview / homepage band. The full
36 is a materially stronger asset for the new Transactions page. The two pages use **incompatible
taxonomies** (Clients: "Metals & Mining / Asia / Europe"; Live Deals: "Mining & Metals /
Asia - South East / Europe - Western") — one controlled vocabulary will have to be chosen.

---

## 8. Other §4.1 cross-checks

| §4.1 claim | Verdict |
|---|---|
| Positioning paragraph (international advisory firm, network of mostly former C-suite executives, SMEs, seed funding to IPO, junior/mid-tier growth firms, cross-border, trust/transparency/results) | **Verified verbatim.** Present word for word on the homepage and Company Overview. Note the source typo "navigate **though** a complex set of challenges" — fix, do not transcribe |
| Four principles (sector / location / deal-value / deal-type agnostic) | **Verified.** Identical four cards on three pages |
| The network (funds, financial firms, specialised funds, sophisticated investors, agencies, strategic networks) | **Verified,** with one caveat: the homepage groups these under six headings ending "Power Networks"; Company Overview renders "Government Funds" as a heading with no children and splits "Power Networks"/"Strategic Investors" differently. The grouping needs a visual check |
| Four values | **Verified verbatim.** But the old page gives **no descriptions** — the four one-line values are the entire section. The brief asks for "every value with its description"; those must be written new and signed off, not invented |
| Mission thread "our success lies in our clients' success" | **Verified verbatim** |
| Nine anonymised transactions | **Understated.** The Clients page has **36**; nine is the homepage/overview subset. All six examples the brief cites are accurate, with one typo to fix: "technical **consultany** firm" |
| Mailboxes partners@, careers@, alumni@, info@ (media) | **Verified.** Note "Media" points at generic `info@`; there is no `media@` or `press@`. Legal pages add six more: legal@, privacy@, dpo@, gdpr@, diversity@, accessibility@ |
| Podcast "A Done Deal" on Spotify | **Verified.** `open.spotify.com/show/2LfRgivNsxvxsWmMU4Lj3r`, plus Apple, Buzzsprout RSS and 12 other platforms. 14 episodes, AUG 2020 – JAN 2021. **Episodes 10 and 14 are marked "Coming soon…" with empty hrefs — they were never published.** TuneIn, iHeartRadio and Pandora links go to generic homepages, not the show. The on-page "Follow the Podcast" button href is `#` |

### Not in §4.1, but material to the build
- **Insights are a link-roll, not a blog.** All 13 articles point off-site (LinkedIn ×12, omny.fm ×1).
  Newest is **12 August 2019**. Comment-count badges are hard-coded frozen snapshots.
- **No vector logo exists.** Largest wordmark is **291×36px**; white background is baked in (RGBA but
  100% opaque); `logo-light.png` is byte-identical to `logo.png`, so **no knockout/inverse mark
  exists**. Brand colours sampled from pixels: navy `#002060`, red `#C00000`, grey `#F2F2F2` — which
  are exactly the Microsoft Office standard swatches, suggesting a PowerPoint export. Favicon is a
  75×83 non-square BMP with no alpha. No og:image, no apple-touch-icon, no manifest.
- **No company registration number, registered office, VAT number or FCA authorisation statement
  anywhere on the site** — a UK legal requirement. Two different legal entities are named
  ("Adan Corporate Services Limited" on Legal, "Adan Corporate LLP" in the Privacy Policy).
- **The Accessibility Statement is about a different business entirely** — it describes an
  e-learning platform with "learners", "course authoring software" and "content providers". Copied
  from somewhere else. Must be rewritten from scratch.
- **Much sub-service prose reads as third-party encyclopaedic text** (a stray `[13]` Wikipedia
  citation marker survives on the internal-audit page). **Plagiarism review before reuse.**
- **The AI page has zero Adan-specific content** — no service list, no methodology, no tooling, no
  client work, no metrics. If AI & Digital is the flagship pillar, its entire proposition must come
  from the client.

---

## Questions for the client, in priority order

1. **Countries: 15, 19, 20 or 18?** Four figures are published; 13 are countable. Which is correct,
   and as at what date?
2. **US$5bn "Value of Transactions" — completed only, or completed plus live pipeline?** The
   disclosed completed deals total ≈$2.4bn; adding the 31 open mandates reaches ≈$4.75bn. If the
   counter includes unclosed mandates it should not be labelled "Value of Transactions".
3. **Headcount: 35, 29, 23 or 45+?** And as at what date?
4. **Which of the 31 live mandates are still live?** Nothing from that table ships without this.
5. **What is Keshav Adya's status?** He is hidden on the homepage but live on the team page, hosts
   all 14 podcast episodes, wrote 8 of 13 insights, is the Dubai contact and the named DPO.
6. **Are the 11 people not in the brief's list still with the firm?** (Nine are in the homepage's
   commented-out block.)
7. **Vinayak Hattangadi** is on the homepage but has no profile page and returns 404. Who supplies
   his bio, role, city and headshot?
8. **Is Dr. Aneesh Chivukula still Director, Artificial Intelligence?** The new AI pillar depends
   entirely on him.
9. **Which of the 14 locations are staffed offices and which are a partner presence?** The old site
   draws no distinction; Milan, Paris and Zurich have no street address, Singapore and Abidjan have
   no phone.
10. **Does a vector logo master exist offline** (.ai/.eps/.svg/.pdf), and a knockout/white version?
11. **"Deal value $1mn–$500mn"** is contradicted by a $1bn completed deal and a $0.25mn live
    mandate. Restate the range, or drop it?
12. **Company registration number, registered office, VAT number, and which entity contracts** —
    Adan Corporate Services Limited or Adan Corporate LLP? Plus the regulatory/authorisation status.
13. **Average experience "20 years"** — how was it calculated, over whom, as at when?
14. **Office phone numbers are cross-contaminated** (Paris shows the Prague number; Almaty shows
    Baku's number and a Baku district in its address; Milan shows a UK mobile). Re-verify all.
15. **The four values have no descriptions on the old site.** Who writes and signs them off?
