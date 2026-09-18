# Adan Corporate - People (source abstract from the OLD site)

Source: https://adancorporate.com - fetched 2026-09-18 via `curl -sL -A "Mozilla/5.0"`.
Index page: https://adancorporate.com/en-uk/about-us/team.html (HTTP 200).

Every profile page lives at `https://adancorporate.com/en-uk/team/<slug>.html`. **None of these 29 profile
URLs appear in `content/_source/old-urls.txt`** (that list contains only `/en-uk/about-us/team.html`), so the
profile URLs below were discovered by grepping the raw team.html for `href='../team/...'`.

All 29 profile pages returned HTTP 200. All 29 were fetched and transcribed below.

Transcription rules applied: role lines, cities, emails, LinkedIn URLs, image `src` values and biography
text are verbatim from the fetched HTML, including original spelling, punctuation and typos. Sidebar taxonomy
("Areas of Expertise", "Sectors", "Geographies") is transcribed as listed. Nothing has been invented or
rewritten.

## Roster summary (team page display order)

| # | Name | Role line(s) | City as printed | Profile slug |
|---|------|--------------|-----------------|--------------|
| 1 | Ajay Mavinkurve | Managing Partner | London | ajay-mavinkurve |
| 2 | Chennakeshav (Keshav) Adya | Managing Partner | DUBAI & LONDON | keshav-adya |
| 3 | Sabapaty (Saba) Suryanarayanan | Managing Partner | Mumbai, India | sabapaty-suryanarayanan |
| 4 | Thomas Peutz | Partner / Sustainable Energy | Amsterdam | thomas-peutz |
| 5 | Roland Giebitz | Partner / Corporate Finance | Hamburg, Germany | roland-giebitz |
| 6 | Arun Shroff | Partner | Pune, India | arun-shroff |
| 7 | Neeraj Arora | Partner | London | neeraj-arora |
| 8 | Raju Venkataraman | Partner / Strategy, Executive Coaching | Singapore | raju-venkataraman |
| 9 | George Christelis | Partner / Southern African region | Johannesburg | george-christelis |
| 10 | Marco Salvini | Partner / Real Estate | Milan & London | marco-salvini |
| 11 | Sandeep Bhat | Partner, Capital Market | India | sandeep-bhat |
| 12 | Freddie Tshiaba | Partner / International Investments | London | freddie-tshiaba |
| 13 | Mike Kemball | Partner / Turnaround and Growth | London | mike-kemball |
| 14 | Thu Nga Haskovcova | Partner / Central Eastern Europe, Law | Prague, Czech Rep. | thu-nga-haskovcova |
| 15 | Nav Kaplish | Partner / Digital, Blockchain & Risk | London | nav-kaplish |
| 16 | Edgar Garay | Partner / Corporate Finance | Bogota, Colombia | edgar-garay |
| 17 | Jean-Bernard (JB) Tanqueray | Partner / Family Offices | Paris & London | jean-bernard-tanqueray |
| 18 | Vernon D'Cruz | Partner / Commercial, Tourism & CSR | Mumbai | vernon-d-cruz |
| 19 | Craig Tingle | Partner / Real Estate | Miami and Dubai | craig-tingle |
| 20 | Preethi Hari | Partner / Risk Management | London | preethi-hari |
| 21 | Suresh Nambiar | Partner / Procurement & Logistics | Manama City, Bahrain | suresh-nambiar |
| 22 | Rauf Akhundov | Partner / Central Asia | Baku, Azerbaijan | rauf-akhundov |
| 23 | Sreeraman P.S. | Director / Investments | Mumbai | sreeraman-p-s |
| 24 | Ajay Sethi | Director / Market Development | London | ajay-sethi |
| 25 | Varun Nadkarni | Financial Analyst | India | varun-nadkarni |
| 26 | Heena Tilwani | Financial Analyst | Gurgaon, India | heena-tilwani |
| 27 | Shreyash Gandhi | Financial Analyst / M&A, Accounting & Finance | Mumbai | shreyash-gandhi |
| 28 | Kieran Bourke | Partner / Commodities (listed under "Advisors") | Singapore | kieran-bourke |
| 29 | Dipak Khot | Advisor / Global Markets / Treasury Risk Management | London | dipak-khot |

The team page splits the roster into an unlabelled main block (items 1-27) and a heading "Advisors"
(items 28-29). Team page section headings, verbatim: "Talent wins games, but teamwork wins championships.",
"No one can whistle a symphony. It takes a whole orchestra to play it.", "Our Secret Sauce? Our Team!",
"Advisors".

---

## FLAGS

### Roster vs the brief's list

FLAG: **Vinayak Hattangadi has NO profile page and does not appear anywhere on the old site.** The string
"Hattangadi" returns zero hits in the fetched team.html and zero hits in the fetched alumni.html;
`https://adancorporate.com/en-uk/team/vinayak-hattangadi.html` returns **HTTP 404**. Client question: should
he be added to the new site, and if so who supplies his bio, role, city and headshot?

FLAG: All 18 other names in the brief's list were found and are transcribed below. Note the brief lists
"Keshav Adya"; the site prints his name as "Chennakeshav (Keshav) Adya".

FLAG: **Eleven people have profile pages but are NOT in the brief's list.** They are, with roles as printed:
Ajay Sethi (Director, Market Development, London); Craig Tingle (Partner, Real Estate, Miami and Dubai);
Edgar Garay (Partner, Corporate Finance, Bogota, Colombia); Heena Tilwani (Financial Analyst, Gurgaon, India);
Jean-Bernard (JB) Tanqueray (Partner, Family Offices, Paris & London); Mike Kemball (Partner, Turnaround and
Growth, London); Preethi Hari (Partner, Risk Management, London); Rauf Akhundov (Partner, Central Asia, Baku,
Azerbaijan); Shreyash Gandhi (Financial Analyst, M&A, Accounting & Finance, Mumbai); Suresh Nambiar (Partner,
Procurement & Logistics, Manama City, Bahrain); Varun Nadkarni (Financial Analyst, India). Client question:
are all eleven still with the firm and should they carry over to the new site?

### Headshots

FLAG: **No headshot is hosted on a third-party image host.** Every `src` on both the team page and the 29
profile pages is a site-relative path under `../../assets/images/`, i.e. resolving to
`https://adancorporate.com/assets/images/...`. All spot-checked image URLs returned HTTP 200.

FLAG: Each person has **two different headshot files** - a `-colour-home-page.webp` used on the team listing
page and a separate `.png` used on the profile page. Both are recorded per person below. The new build should
decide which master asset to re-derive from.

FLAG: Eight headshot filenames contain **literal spaces and inconsistent capitalisation**, breaking the
`adan-team-<name>` convention used by the other 21: `Arun Main Page.png`, `Arun Team Page.png`,
`Neeraj Arora Website photo format.png`, `Heena Website format photo.png`, `Varun Photo Index.png`,
`Varun Photo Team.png`, `Shreyash Website Photo Format.png`, plus `Freddie.png`, `sandeep-main.png` and
`sandeep-team.png`. These need renaming on migration.

FLAG: The team-page `<img alt>` for Vernon D'Cruz is `Vernon D Cruz` (no apostrophe) while the heading prints
`Vernon D'Cruz`.

### Emails

FLAG: **No non-firm email addresses found.** All 29 profile emails are `@adancorporate.com`. However the
address formats are inconsistent - most are `first.last@`, but five are not: `sethi@adancorporate.com`,
`raju.v@adancorporate.com`, `sabapatys@adancorporate.com`, `jean-bernard@adancorporate.com`,
`r.akhundov@adancorporate.com`. Six are also **mixed-case in the `mailto:`**: `Craig.Tingle@`, `Dipak.Khot@`,
`Edgar.Garay@`, `Freddie.Tshiaba@`, `Mike.Kemball@`, `Roland.Giebitz@`.

FLAG: The HTML source comment on every page carries a further address - `Chennakeshav Adya <website@adancorporate.com>` -
as the page author. Not published on the page itself; recorded here for completeness.

### Sidebar taxonomy appears to be copy-pasted between unrelated people

FLAG: **Neeraj Arora's** Expertise / Sectors / Geographies blocks are byte-identical to **Ajay Mavinkurve's**
(IPO, Private Equity, Project Finance ... Interim CFO). They do not match Neeraj's biography, which is
entirely about media distribution and broadcasting. Almost certainly an un-edited template copy.

FLAG: **Edgar Garay's** Expertise / Sectors / Geographies blocks are byte-identical to **Roland Giebitz's**,
including `Geographies: Germany | Europe | USA` - but Edgar's printed city is **Bogota, Colombia** and his
biography covers MENA (Jones Lang LaSalle MENA, Alesayi Group, GEMS) and Colombia (Pontificia Universidad
Javeriana). The geography tags contradict the bio.

FLAG: **Craig Tingle's** Sectors and Geographies are byte-identical to **Kieran Bourke's**
(`Banking & Capital Markets | Financial Services | Metals & Mining`; `Singapore | UK | South Africa`) - but
Craig's printed city is **Miami and Dubai** and his biography is US real-estate law. Contradicts the bio.

FLAG: Several Expertise lists contain **repeated entries within the same list**: Keshav Adya has
"Private Equity" twice and "Deal Strategy" twice; Vernon D'Cruz has "Special Situations" twice; Craig Tingle
has "Distressed Asset Management" twice.

FLAG: Sidebar taxonomies mix true service lines with sector names (e.g. Roland Giebitz, Edgar Garay and
Dipak Khot list "Financial Services" and "Capital Projects & Infra" under *Areas of Expertise*, while other
people list the same strings under *Sectors*). The two vocabularies are not cleanly separated in the source.

### Spelling, typos and data quality inside bios

FLAG: Thu Nga Haskovcova's Geographies reads **"Sout East Asia"** (missing "h").

FLAG: Edgar Garay's bio reads **"Finance Director of GEMS eduction"** (should presumably be "education").

FLAG: Jean-Bernard Tanqueray's bio contains a doubled-quote artefact: `a $120 mn ""Fund of hedge funds"" on
hedge fund due-diligence`. Also paragraphs 1 and 2 **repeat the same sentence verbatim** ("developed a deep
expertise in all main assets, strategies and styles (volatility & niche arbitrage strategies, event driven,
systematic, global macro, deep value)"). Also "has over the years, has developed" - duplicated verb.

FLAG: Arun Shroff's bio has **missing spaces after full stops**: "Paper & Paperboards.He managed",
"managing stakeholders.He is a well-experienced". Also "flair for creating." - sentence appears truncated
(creating *what*?).

FLAG: Suresh Nambiar's bio has a stray full stop mid-list: "Devising SOPs. Cost Optimization Support".

FLAG: Vernon D'Cruz's bio reads **"mid-sizes service organisations"** (should presumably be "mid-sized").
His bio also repeats the phrase "Commercial Negotiations, Commercial, Tourism & CSR" twice.

FLAG: Thomas Peutz's final sentence has **no terminating full stop**: "...from the VU University of Amsterdam".
Same for Thu Nga Haskovcova ("...Moscow State University of International Relations (MGIMO)"), Jean-Bernard
Tanqueray's first paragraph, Rauf Akhundov's second paragraph ("...for AGBank") and Keshav Adya's third
paragraph ("...to ensure delivery").

FLAG: Mixed US/UK spelling across bios despite a UK site: "optimization", "organization", "specializes",
"center"/"centers" (Craig Tingle, Suresh Nambiar, Sandeep Bhat) sit alongside "organisations", "specialises",
"centres", "prioritising" elsewhere. The brief asks for British English; the source is not consistent.

FLAG: Craig Tingle's bio states he **"is pursuing an MBA from London Business School"** - a present-tense
claim on an undated page. Needs verification before republishing.

FLAG: Neeraj Arora's bio contains the most recent datable claims on the site - **"Media Icon of the Year 2024"
at High Flyer 50 Global Icon Awards** and a **"Lifetime Achievement Award" in 2025 at British Asian Media
Awards**, and employment at Sony Pictures Networks "between 2004 and 2024". This suggests the page was last
edited in or after 2025, while most other bios are undated.

FLAG: Firm-size figures appear only in Keshav Adya's bio - **"a team of 45+ senior corporate professionals in
18 countries"**. The team page itself lists only 29 people. These two numbers do not agree; the 45+/18
countries figure needs confirmation before reuse.

FLAG: Two people's bios name their own outside firms: Neeraj Arora is "Founder and CEO of NNA Consultants
Limited" (NNACL), and Craig Tingle's LinkedIn slug is `craig-tingle-tingleandassociatespa-a5b93135`
(Tingle & Associates PA). Check whether these should be surfaced on the new site.

FLAG: Every profile page's "Insights" sidebar contains three placeholder items reading **"Blog Post"** linked
to `#`. No real insight links exist on any profile page.

FLAG: The Alumni page (`/en-uk/about-us/alumni.html`, HTTP 200) has **no named alumni at all** - only copy
about alumni events, a "Register as an Alumnus" invitation and three "Contact Alumni Relations" calls to
action. No email address is printed on it; the links are labelled only "Contact Alumni Relations".

---

## Profiles

### Ajay Mavinkurve

- **Profile URL:** https://adancorporate.com/en-uk/team/ajay-mavinkurve.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Managing Partner / London
- **City, as printed (final `<h6>` line):** London
- **Group on team page:** Team
- **Email:** ajay.mavinkurve@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/ajay-mavinkurve
- **Headshot (profile page `src`):** `../../assets/images/adan-team-ajay-mavinkurve.png` -> https://adancorporate.com/assets/images/adan-team-ajay-mavinkurve.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-ajay-mavinkurve-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-ajay-mavinkurve-colour-home-page.webp
- **Areas of Expertise (sidebar):** IPO, Private Equity, Project Finance, Debt Financing, Deal Strategy, Commercial negotiation, Distressed Asset Management, Transformation and Restructuring, M&A, Business Strategy, NED & Board Advisory Services, Working Capital and Trade Finance, Startups - Growth Capital, Credit Ratings Assistance, Interim CFO
- **Sectors (sidebar):** Media & Entertainment, Banking & Capital Markets, Private Equity, Financial Services, Technology, Industrial Manufacturing, Healthcare Systems & Services, Pharma & Life Sciences, Green Energy, Real Estate, Chemicals & Polymers
- **Geographies (sidebar):** UK, India, USA, UAE, Asia Pacific

**Biography (verbatim):**

> Ajay is a seasoned senior-level corporate finance executive with 30+ years of diversified experience in Global Corporate Finance, IPOs, Corporate and Tax structuring, Deal structuring, Commercial Negotiation, Valuations, Venture and Private Equity syndication, M&A, Growth Strategy, Distressed Asset Management, Working Capital and Buy-outs for Small & Mid-sized Enterprises (SMEs).
>
> Ajay provided these services for 17+ years via his niche financial services company in Mumbai since 1987. In 2005, he moved into a senior corporate role at a global media firm and led its growth, eventually listing it on the AIM exchange, London. In 2013, he repositioned Adan Corporate with a global outlook and turned it into a dedicated team of senior professionals to cater to the ever-increasing demand of SMEs looking for global funding. He has assisted growth strategies of several businesses, which have gone on to become significant companies.
>
> Ajay is a Chartered Accountant and holds an MBA from London Business School.

### Chennakeshav (Keshav) Adya

- **Profile URL:** https://adancorporate.com/en-uk/team/keshav-adya.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Managing Partner / DUBAI & LONDON
- **City, as printed (final `<h6>` line):** DUBAI & LONDON
- **Group on team page:** Team
- **Email:** ck.adya@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/cadya/
- **Headshot (profile page `src`):** `../../assets/images/adan-team-keshav-adya.png` -> https://adancorporate.com/assets/images/adan-team-keshav-adya.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-keshav-adya-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-keshav-adya-colour-home-page.webp
- **Areas of Expertise (sidebar):** M&A, Post-Merger Integration (PMI), Private Equity, Startups - Growth Capital, Commercial negotiation, NED & Board Advisory Services, Deal Strategy, Business Strategy, Corporate Strategy, Growth Strategy, Marketing Strategy, Career Transition, Private Equity, Family Offices Investments, Fund Placement, Credit Ratings Assistance, Special Situations, Distressed Asset Management, Asset Management, Capital Projects & Infra, Financial Services, Equity Financing, Debt Financing, Deal Strategy, Risk Management, Blockchain, Analytics, Interim CEO / Managing Director, Interim CMO
- **Sectors (sidebar):** Technology, Media & Entertainment, Healthcare Systems & Services, Pharma & Life Sciences, Private Equity, Retail, Real Estate, Banking & Capital Markets, Advanced Electronics, Green Energy, Travel, Transport & Logistics
- **Geographies (sidebar):** UK, India, USA, UAE, Asia Pacific, Australia

**Biography (verbatim):**

> Chennakeshav (Keshav) Adya is a versatile and resourceful business and technology professional with 20+ years of international corporate and entrepreneurial experience in building firms across sectors from a concept and leading global teams of 200+ spanning corporate finance advisory, international growth, M&A, technology delivery and fund-raising for top-flight firms such as Morgan Stanley, Lloyds Banking Group, HSBC, Marks and Spencer, Sainsbury’s, IMS Health, TCS, and Hitachi Rail in 25+ countries globally.
>
> Currently, Keshav is the founding Managing Partner of Adan Corporate, a global Corporate Advisory firm with a team of 45+ senior corporate professionals in 18 countries, focusing on mid-market firms(SMEs) and Private Equity(PE) funds, for their continuous needs of cross-border fund-raising, prospecting investments, M&A, corporate strategy, IPO, risk management, technology and other corporate services.
>
> A decalingual, multi-talented zymurgist, Keshav formulates the vision and converts it into strategy and reality through disciplined execution. He is quite resourceful with a wide variety of personal and professional skills; has a strong and vast industry network at all levels globally; a penchant and reputation for getting things done with empathy, creativity, discipline and humour. He adeptly handles conversations with C-level execs about the 30,000-foot view of the business-technology-operations interface and also easily gets down into the trenches with hands-on development work to ensure delivery
>
> Keshav began his entrepreneurial journey at the age of 9 at school, where he formed a library and by lending out books and reinvesting the returns, managed to put together about 8000 books in 7 years. Subsequently, over the next 20 years, he gained experience across a wide range of industries, geographies, business functions, transactions, deal-types, deal-sizes and in the process, has developed a leadership style of an agile-athlete to handle ambiguity by constantly learning from successes and failures; setting up processes and systems to scale; building multi-tiered leadership teams; revising risk appetite; resolving multiple constraints and dependencies creatively and frugally; and using effective planning, organizing, prioritising and communication skills.
>
> As a leader, he has grown teams from 2 to 200+ and is skilled in directing teams through the "Unknown"; by instilling a common vision in complex multi-disciplinary matrix structures, uniting diverse agendas to achieve common goals, defusing difficult interpersonal situations and creating a trust-based relationship. He has scouted, built and trained global high-performing teams and introduced sustainable governance structures to ensure transparency, accountability and growth.
>
> Keshav is also an Entrepreneur Mentor in Residence (EMiR) at London Business School and is supporting the school's experiential entrepreneurship activities for students and alumni who are interested in pursuing a career in entrepreneurship, whether launching or growing their own ventures. He is a board advisor to a number of businesses and is an active angel investor and offers unique insights into what it takes to start businesses from a concept and scale them to the next level.
>
> Keshav holds an MBA from London Business School and a Bachelor's degree in Mechanical engineering from Visveswaraya Technological University, India.

### Sabapaty (Saba) Suryanarayanan

- **Profile URL:** https://adancorporate.com/en-uk/team/sabapaty-suryanarayanan.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Managing Partner / Mumbai, India
- **City, as printed (final `<h6>` line):** Mumbai, India
- **Group on team page:** Team
- **Email:** sabapatys@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/sabapaty-suryanarayanan-96a31b4
- **Headshot (profile page `src`):** `../../assets/images/adan-team-sabapaty-s.png` -> https://adancorporate.com/assets/images/adan-team-sabapaty-s.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-sabapaty-s-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-sabapaty-s-colour-home-page.webp
- **Areas of Expertise (sidebar):** IPO, Private Equity, Project Finance, Debt Financing, Deal Strategy, Commercial negotiation, Distressed Asset Management, Transformation and Restructuring, M&A, Business Strategy, NED & Board Advisory Services, Working Capital and Trade Finance, Startups - Growth Capital, Credit Ratings Assistance, Interim CFO
- **Sectors (sidebar):** Industrial Manufacturing, Retail, Banking & Capital Markets, Technology, Media & Entertainment, Financial Services, Private Equity, Pharma & Life Sciences, Healthcare Systems & Services
- **Geographies (sidebar):** India, Eastern Europe, Asia, Africa

**Biography (verbatim):**

> Saba is a seasoned commercial and finance professional with 30+ years of experience in varied geographies and multiple industry segments, including Manufacturing, Trading, Media and Financial Services in areas such as Deal structuring, Commercial Negotiation, Growth Strategy, Distressed Asset Management, Working Capital Funding, and Buyouts.
>
> Saba specialises in strategic sector-agnostic advisory services to corporates in business and financial restructuring, business strategy, education and e-learning solutions, cost-effective financial arrangements, arranging funding from varied sources and corporate governance matters.
>
> His multi-faceted roles include heading the Commercial and Finance functions in capacities of CFO of one of the leading entertainment companies in India, incubating and managing an outsourcing unit with a UK based company as General Manager, managing FMCG companies in Africa and a trading company in Eastern Europe as MD and playing various roles in Advertising and Financial services in Project Finance, Retail finance, Debt, Equity including IPOs and Mutual Funds.
>
> Saba is a Chartered Accountant and is based in Mumbai.

### Thomas Peutz

- **Profile URL:** https://adancorporate.com/en-uk/team/thomas-peutz.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Partner / Sustainable Energy / Amsterdam
- **City, as printed (final `<h6>` line):** Amsterdam
- **Group on team page:** Team
- **Email:** thomas.peutz@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/thomas-peutz-a7a44116/
- **Headshot (profile page `src`):** `../../assets/images/adan-team-thomas-peutz.png` -> https://adancorporate.com/assets/images/adan-team-thomas-peutz.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-thomas-peutz-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-thomas-peutz-colour-home-page.webp
- **Areas of Expertise (sidebar):** Private Equity, Transformation and Restructuring, M&A, Business Strategy, Commercial negotiation, NED & Board Advisory Services, Interim CEO / Managing Director, Strategy & Planning, Deal Strategy, Business Strategy, Corporate Strategy, Board Advisors, Marketing Strategy, Market Entry
- **Sectors (sidebar):** Government & Public Services, Green Energy, Social Sector, Media & Entertainment, Financial Services, Technology, Banking & Capital Markets, Capital Projects & Infra, Energy & Utilities, Engineering & Construction
- **Geographies (sidebar):** The Netherlands, UK

**Biography (verbatim):**

> Thomas is an innovative entrepreneurial leader with 25+ years of experience in international management and organisational strategy, gained within the cultural sector and the creative industries. As a social entrepreneur with in-depth knowledge of new venture development and a passion for innovative business concepts with social relevance and impact, serving on executive and non-executive boards.
>
> Combined with his extensive knowledge of corporate leadership and business management, Thomas has in depth knowledge of investment-raising, international fundraising, replication models, financial planning, risk management, monitoring and evaluation procedures, while he demonstrates the ability to initiate and develop key relationships across a broad range of stakeholders.
>
> Previously, Thomas established, merged and grew organisations, corporations, a partnership and an investment fund, while he advised national and local Governments on innovation, urban development and the creative industries. As a former Government Policy Advisor, combined with extensive experience in trustee roles as well as serving on committees of charities and grant giving bodies, he has a deep understanding of good governance and best practices, as well as being an effective ambassador, lobbyist and negotiator to whom courtesy and diplomacy come naturally.
>
> Thomas is a Sloan Fellow (Masters in Strategy and Leadership) from London Business School, has Masters degrees in Art History and Classical Archaeology from the VU University of Amsterdam

### Roland Giebitz

- **Profile URL:** https://adancorporate.com/en-uk/team/roland-giebitz.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Partner / Corporate Finance / Hamburg, Germany
- **City, as printed (final `<h6>` line):** Hamburg, Germany
- **Group on team page:** Team
- **Email:** Roland.Giebitz@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/roland-giebitz-10292158
- **Headshot (profile page `src`):** `../../assets/images/adan-team-roland-giebitz.png` -> https://adancorporate.com/assets/images/adan-team-roland-giebitz.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-roland-giebitz-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-roland-giebitz-colour-home-page.webp
- **Areas of Expertise (sidebar):** Financial Services, M&A, Risk Management, Private Equity, Capital Projects & Infra, Special Situations, Transformation and Restructuring, Corporate Finance, Company Valuation, Deal Strategy, Business Strategy, Corporate Strategy
- **Sectors (sidebar):** Technology, Private Equity, Industrial Manufacturing, Banking & Capital Markets, Advanced Electronics, Green Energy
- **Geographies (sidebar):** Germany, Europe, USA

**Biography (verbatim):**

> Roland is a seasoned executive with 30+ years of experience in managing companies and in leading operational and business development projects.
>
> His 30+ years experience comprises consulting work with McKinsey, Strategic Decisions Group and Accelerate Business Consulting, management roles as Managing Director of Sartorius Separation Engineering, as CFO of SUSE Linux AG, and as investment manager at venture capital firms, as well as various turnaround and business development projects as interim manager or project leader.
>
> His recent focus is on developing business plans and helping clients financing their projects. He uses his experience to scrutinise and improve business models, using his skills in both financial modelling and in designing marketing and sales strategies.
>
> Roland holds an MBA from London Business School and a management degree from Goethe University in Frankfurt, Germany.
>
> His personal interests include hiking and gardening, playing the guitar and cooking for his family.

### Arun Shroff

- **Profile URL:** https://adancorporate.com/en-uk/team/arun-shroff.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Partner / Pune, India
- **City, as printed (final `<h6>` line):** Pune, India
- **Group on team page:** Team
- **Email:** arun.shroff@adancorporate.com
- **LinkedIn:** https://in.linkedin.com/in/arun-shroff
- **Headshot (profile page `src`):** `../../assets/images/Arun Team Page.png` -> https://adancorporate.com/assets/images/Arun Team Page.png
- **Headshot (team listing page `src`):** `../../assets/images/Arun Main Page.png` -> https://adancorporate.com/assets/images/Arun Main Page.png
- **Areas of Expertise (sidebar):** Operations, Logistics, Manufacturing Quality, Growing and Sustaining Customer Relationships, E2E Engagement
- **Sectors (sidebar):** Electrical Precision parts Manufacturing, Agriculture Business, Paper & Paperboards
- **Geographies (sidebar):** India, Germany, Japan, The Netherlands

**Biography (verbatim):**

> Arun Shroff is a seasoned Commercial and Operations leader with 4 decades of experience, working across different industries like Electrical precision parts Manufacturing, Agriculture Business (Pioneering Floriculture in India),and Paper & Paperboards.He managed relationships across countries, cultures, functions, and hierarchies. He has practical expertise in managing manufacturing and trading operations and fostering synergies to provide higher efficiency, products, and customer excellence.
>
> Arun excels at product development and has extensive experience managing stakeholders.He is a well-experienced executive who has a flair for creating. He is a seasoned executive with a talent for building sustainable customer relationships, and international relationships focused on representing trade fairs. His Floriculture Company was the 5-time winner of the APEDA Award for “Excellence in Exports” instituted by the Commerce Ministry, Government of India.
>
> He holds a bachelor’s degree in commerce from Calcutta University, unit St Xavier’s College, Kolkata.

### Neeraj Arora

- **Profile URL:** https://adancorporate.com/en-uk/team/neeraj-arora.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Partner / London
- **City, as printed (final `<h6>` line):** London
- **Group on team page:** Team
- **Email:** neeraj.arora@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/neeraj-arora-16537313/
- **Headshot (profile page `src`):** `../../assets/images/Neeraj Arora Website photo format.png` -> https://adancorporate.com/assets/images/Neeraj Arora Website photo format.png
- **Headshot (team listing page `src`):** `../../assets/images/Neeraj Arora Website photo format.png` -> https://adancorporate.com/assets/images/Neeraj Arora Website photo format.png
- **Areas of Expertise (sidebar):** IPO, Private Equity, Project Finance, Debt Financing, Deal Strategy, Commercial negotiation, Distressed Asset Management, Transformation and Restructuring, M&A, Business Strategy, NED & Board Advisory Services, Working Capital and Trade Finance, Startups - Growth Capital, Credit Ratings Assistance, Interim CFO
- **Sectors (sidebar):** Media & Entertainment, Banking & Capital Markets, Private Equity, Financial Services, Technology, Industrial Manufacturing, Healthcare Systems & Services, Pharma & Life Sciences, Green Energy, Real Estate, Chemicals & Polymers
- **Geographies (sidebar):** UK, India, USA, UAE, Asia Pacific

**Biography (verbatim):**

> Neeraj Arora is a specialist and expert in media monetisation and storytelling, with over 30 years of industry defining experience. During his notable 20-year tenure spearheading International Business at Sony Pictures Entertainment, he excelled in driving strategic growth and business development across diverse global markets. Neeraj has successfully launched and expanded prominent media entities such as Zee, B4U, and Sony from start-up level ambiguity to dominating brands in over 100 countries. His expertise lies in leading transformational strategies that transition traditional media into cutting-edge digital platforms, and in building and coaching high-performing business teams.
>
> In his hometown where he was born and raised, Arora studied at the University of Allahabad where he completed his degree in Economics, and a further diploma in Marketing and Business Administration.
>
> Upon graduating, he embarked on his career journey in Kanpur in 1989 as a door-to-door commercial furniture and equipment salesman for a few years; before his first of many big career breaks where he was presented with the opportunity to work at Asian Paints. Known for its innovation and pioneering approach to home decor and paints for industrial use, and for being the 2nd largest company in Asia and India’s leading paints company, Neeraj learned valuable commercial and business development skills in this role.
>
> In 1996, his media journey began and Arora’s career and the industry reached exponential heights each year thereafter. In 1998, he migrated to the United Kingdom for a bigger opportunity to set up the distribution arm for Zee TV; a local household name and India’s then leading entertainment company which was taking a leap of faith and expanding globally as one of the first multinational media companies from India catering to the South Asian diaspora.
>
> Since then, Neeraj has resided in the United Kingdom with his wife Neha and their two lovely daughters Isha and Anshika. He has received many accolades and recognition. In April 2002, Neeraj was inducted as an esteemed Member of The International Association of Business Leaders, incorporated in the United States of America. Arora was also on the esteemed panel of Judges for the Association of International Broadcasting Awards for the years 2014 and 2015. Alongside this, he served on the Board of Directors for many International companies including Sony Pictures Networks, where he was employed for 2 decades between 2004 and 2024. He was named “Media Icon of the Year 2024” at High Flyer 50 Global Icon Awards and also honoured with “Lifetime Achievement Award” in 2025 at British Asian Media Awards for his contribution to the growth and development of Asian Media globally.
>
> Renowned for his passion for mentoring emerging leaders, leading complex commercial negotiations and fostering innovation on the global media stage, Neeraj is exploring new opportunities within media technology and digital transformation.
>
> After a successful career spanning over 30 years in media, and attaining the senior most executive position in the International Business within the South Asian Media Network, he is now the Founder and CEO of NNA Consultants Limited.
>
> NNACL is set up to provide advisory and strategic direction to start ups and new media projects. Besides others, NNACL is proud to be working with the GEC’s Space Programme on their iconic GEC Space City project. GEC Space City, is a visionary UK initiative taking the lead in Space Habitats and Space Real Estate.

### Raju Venkataraman

- **Profile URL:** https://adancorporate.com/en-uk/team/raju-venkataraman.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Partner / Strategy, Executive Coaching / Singapore
- **City, as printed (final `<h6>` line):** Singapore
- **Group on team page:** Team
- **Email:** raju.v@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/rajuvenka1/
- **Headshot (profile page `src`):** `../../assets/images/adan-team-raju-venkataraman.png` -> https://adancorporate.com/assets/images/adan-team-raju-venkataraman.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-raju-venkataraman-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-raju-venkataraman-colour-home-page.webp
- **Areas of Expertise (sidebar):** NED & Board Advisory Services, Executive Coaching, Executive Transition, Principled Negotiation Skills, Leadership Identity, Private Equity / Venture Capital, Strategy & Planning, Deal Strategy, Business Strategy, Corporate Strategy, Growth Strategy, Marketing Strategy, Board Advisors, International Expansion, Market Entry
- **Sectors (sidebar):** Media & Entertainment, Retail, Pharma & Life Sciences, Technology, Agriculture, Industrial Manufacturing, Chemicals & Polymers, Private Equity, Banking & Capital Markets, Capital Projects & Infra
- **Geographies (sidebar):** UK, India, USA, UAE, Asia Pacific

**Biography (verbatim):**

> Raju brings 30+ years of rich C-suite experience from the corporate world as CFO, Head of Strategy, Business Unit Head, Head of Sales & Distribution - marking him out as a savvy leader. His most recent corporate role was as CFO & Head of Strategy of Walt Disney Company for South East Asia. He is a member of the Board of Directors of Special Olympics Asia-Pacific and chairs the Audit Committee.
>
> Presently, as a Coach and Corporate educator, Raju is powering on senior leaders to fulfil their potential and aspirations amidst change and disruption. Raju's cross-functional range, sharp business acumen, art of people management and insight into the Asia-Pac business region, make him a sought-after leadership and career coach.
>
> Raju is a Fellow Member of CIMA UK, Associate Member of ISCA & ICAI and has attended an Executive management course CTAMU, at the Harvard Business School.
>
> He is a member of International Coach Federation (ICF) and is accredited by Marshall Goldsmith Stakeholder Centered Coaching for executive coaching. He is also certified in GLA 360°, CCL 360°, Hogan & WorkPlace Big Five, besides being trained to use assessments such as MBTI, PROFILOR, Forte, Denison & more.

### George Christelis

- **Profile URL:** https://adancorporate.com/en-uk/team/george-christelis.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Partner / Southern African region / Johannesburg
- **City, as printed (final `<h6>` line):** Johannesburg
- **Group on team page:** Team
- **Email:** george.christelis@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/george-christelis-05753545/
- **Headshot (profile page `src`):** `../../assets/images/adan-team-george-christelis.png` -> https://adancorporate.com/assets/images/adan-team-george-christelis.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-george-christelis-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-george-christelis-colour-home-page.webp
- **Areas of Expertise (sidebar):** Project Finance, Debt Syndication, Deal Strategy, Commercial negotiation, Distressed Asset Management, Transformation and Restructuring, Business Strategy, NED & Board Advisory Services, Interim CFO, Coaching & Mentoring, Career Transition, Company Valuation, Corporate Strategy, Board Advisors
- **Sectors (sidebar):** Real Estate, Semiconductors, Engineering & Construction, Technology, Travel, Transport & Logistics
- **Geographies (sidebar):** South Africa, UK

**Biography (verbatim):**

> George is an experienced finance professional with 20+ years of experience working as CFO for listed medium/large sized businesses in sectors such as real estate, construction, engineering and logistics.
>
> Previously, George has played roles of CFO for various listed firms such as PSV Holdings (JSE Listed) and Questek Holdings (JSE Listed); Finance Director for Zotos Property Group and Hellmann Worldwide Logistics and Senior Finance Consultant for listed firms such as Texton Property Fund (JSE Listed) and Netcare 911, a division of Netcare Limited (JSE Listed).
>
> George is a Sloan Fellow (Masters in Strategy and Leadership) from London Business School, a Chartered Accountant (South African Institute of Chartered Accountants (SAICA)) and holds a Bachelor's degree in Accounting, Taxation, Auditing from University of South Africa/Universiteit van Suid-Afrika, Pretoria and a Bachelor's degree in Commerce from the University of Witwatersrand, Johannesburg.

### Marco Salvini

- **Profile URL:** https://adancorporate.com/en-uk/team/marco-salvini.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Partner / Real Estate / Milan & London
- **City, as printed (final `<h6>` line):** Milan & London
- **Group on team page:** Team
- **Email:** marco.salvini@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/marcosalvini/
- **Headshot (profile page `src`):** `../../assets/images/adan-team-marco-salvini.png` -> https://adancorporate.com/assets/images/adan-team-marco-salvini.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-marco-salvini-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-marco-salvini-colour-home-page.webp
- **Areas of Expertise (sidebar):** Equity Financing, Debt Financing, M&A, Private Equity, NED & Board Advisory Services, Special Situations, Transformation and Restructuring, Commercial negotiation, Distressed Asset Management, Interim CEO / Managing Director, Strategy & Planning, Deal Strategy, Business Strategy, Corporate Strategy, Board Advisors
- **Sectors (sidebar):** Real Estate, Social Sector, Sovereign Investment Funds, Banking & Capital Markets, Capital Projects & Infra, Financial Services
- **Geographies (sidebar):** Italy, UK, Europe

**Biography (verbatim):**

> Marco is a senior executive with 25+ years of Real Estate leadership, delivering strategy, transformational change and turnaround of underperforming portfolios, assets and companies. Previously, he was the CEO for AIG/Lincoln - AIG Global Real Estate (Italy), where he successfully navigated the 2008 financial crisis and following global recession, and has consistently demonstrated an ability to add value, resolve conflicts and define an alternative path to success.
>
> His career in Real Estate started in 1990. He worked for companies such as Babcock & Brown, Amplifon Group, McDonald's and Jones Lang Lasalle driving EUR 250 mn residential and commercial RE projects. At AIG Global RE, as Country Managing Partner, he had the accountability for the end-to-end development of a EUR 500 mn portfolio of shopping centres, logistics and industrial warehouses.
>
> He has built and mentored cross-functional teams and managed all development activities: viability studies, financing, acquisition, planning applications, construction, legal and contractual problem resolution, lease, and sale of property portfolios.
>
> On a personal level, he has a passion for travel and is the co-founder of a charitable organisation, which procures and distributes life-saving medicines to remote locations across Sub-Saharan African countries.
>
> Marco is based in London, has an MSc in Architecture from Politecnico di Milano, a Sloan Fellow (MSc) from London Business School and is a member of the Royal Institution of Chartered Surveyors (RICS).

### Sandeep Bhat

- **Profile URL:** https://adancorporate.com/en-uk/team/sandeep-bhat.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Partner, Capital Market / India
- **City, as printed (final `<h6>` line):** India
- **Group on team page:** Team
- **Email:** sandeep.bhat@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/sandeep-bhat-59225378/
- **Headshot (profile page `src`):** `../../assets/images/sandeep-team.png` -> https://adancorporate.com/assets/images/sandeep-team.png
- **Headshot (team listing page `src`):** `../../assets/images/sandeep-main.png` -> https://adancorporate.com/assets/images/sandeep-main.png
- **Areas of Expertise (sidebar):** Technical Analysis, Finance Control, Treasury Management, Risk Control, Merchant Banking, IPO, Human Resource & Administration
- **Sectors (sidebar):** Capital Markets, Private Banking, Private Equity, Wealth Management, Real-Estate
- **Geographies (sidebar):** India, Japan

**Biography (verbatim):**

> Sandeep is a multiskilled professional in the Financial Services industry with 30+ years of experience in C-Suite roles with global banks & PE companies overseeing accounting, financial control, treasury management, tax management, operational risk control, legal and compliance, optimization of IT, HR, and administrative resources helping set up businesses and leading them as a key member of the senior management team across banking, merchant banking, stockbroking, and private equity; was on the international committee for CSR and Offshoring. He keeps abreast of the global financial, commodity, and currency markets amongst which is a keen interest in Technical Analyst for the stocks markets.
>
> Sandeep started his career as a Chartered Accountant in practice, mainly as a financial consultant, before being drafted into a manufacturing company, having a Collaboration with Canon Inc., Japan to handle their IPO. With an eye for the financial services, he joined J.M as head of their Portfolio Management department, moved to ABN AMRO as their CFO for setting up their broking business in India, and then as the COO, India at CLSA India, the No. 1 FII broking house.
>
> At UBS India, in addition to his normal role as Executive Director and COO – India, he was part of the CSR Committee, the Offshoring Committee, and the Committee for setting up a Bank in India.
>
> He was the founding member of the team at Aditya Birla Private Equity instrumental in structuring the Fund, interacting with banks and insurance companies, laying down policies and procedures be it, compliance, financial, and risk, and carrying out a supervisory role in evaluating financial models, valuation and due diligence reports.
>
> Sandeep had been on the panel of various forums including at the ICAI, weekly Think Tank Webinars, the webinar on Wealth Management and Financial Planning for Manipal University – Jaipur, and the Forum of Indian Professionals and CREDAI on the subject “Real Estate Outlook in India” in 2020. Sandeep is also a member of an Educational Trust which runs a K-12 School in Mumbai.
>
> Sandeep is a Chartered Accountant, C.P.A (Aus), and holds a Bachelor of Commerce Degree from the University of Bombay. He has completed the following Certificate courses conducted by the ICAI:
>
> Financial Planning & Wealth Management
>
> Alternate Dispute Resolution (ADR) – Arbitration, Mediation & Conciliation
>
> Forex and Treasury Management

### Freddie Tshiaba

- **Profile URL:** https://adancorporate.com/en-uk/team/freddie-tshiaba.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Partner / International Investments / London
- **City, as printed (final `<h6>` line):** London
- **Group on team page:** Team
- **Email:** Freddie.Tshiaba@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/tshiaba/
- **Headshot (profile page `src`):** `../../assets/images/Freddie.png` -> https://adancorporate.com/assets/images/Freddie.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-freddie-tshiaba-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-freddie-tshiaba-colour-home-page.webp
- **Areas of Expertise (sidebar):** Private Equity, Capital Projects & Infra, Financial Services, Special Situations, Transformation and Restructuring, Distressed Asset Management, Corporate Finance, M&A, Company Valuation, Commercial negotiation, Deal Strategy, Business Strategy, Corporate Strategy, Risk Management, Market Entry
- **Sectors (sidebar):** Banking & Capital Markets, Capital Projects & Infra, Financial Services, Private Equity, Asset & Wealth Management, Sovereign Investment Funds
- **Geographies (sidebar):** Europe, Middle East Asia, Asia Pacific, Central Africa, UK, USA

**Biography (verbatim):**

> Freddie Tshiaba is a senior business leader with 20+ years of significant experience helping investment banks, financial institutions, enterprise software companies and multi-national corporates with strategic initiatives, business development, digital transformation, product management, liquidity risk and treasury management.
>
> Freddie brings over 20 years of experience and expertise in Business Development, Business Strategy, Capital Markets, Corporate Banking, Corporate Strategy, Corporate Finance, Corporate Turnaround, Data Analytics, Enterprise Software Business, Financial Analysis and Valuation, Foreign Exchange, Liquidity Management, Management Consulting, Marketing, Mergers and Acquisitions Integration, Payment Systems, Product Management, Project Management, Private Equity, Risk Management, Settlement Systems, Systematic Innovative Thinking, and Treasury Management.
>
> Fluent in English and French, Freddie benefits from a global business experience in the following countries: Austria, Belgium, Denmark, France, Finland, Germany, Hungary, Ireland, Italy, Netherlands, Norway, Pakistan, Poland, Portugal, Romania, Saudi-Arabia, Spain, Sweden, Switzerland, Democratic Republic of the Congo, United Arab Emirates, United Kingdom of Great Britain and Northern Ireland, and United States of America.
>
> Freddie holds an MBA from London Business School, has a Masters degree in Business Engineering from Liege HEC Management School and a Masters degree in Management Science and Entrepreneurship from the University of Liege, Belgium.

### Mike Kemball

- **Profile URL:** https://adancorporate.com/en-uk/team/mike-kemball.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Partner / Turnaround and Growth / London
- **City, as printed (final `<h6>` line):** London
- **Group on team page:** Team
- **Email:** Mike.Kemball@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/mikekemball/
- **Headshot (profile page `src`):** `../../assets/images/adan-team-mike-kemball.png` -> https://adancorporate.com/assets/images/adan-team-mike-kemball.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-mike-kemball-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-mike-kemball-colour-home-page.webp
- **Areas of Expertise (sidebar):** Transformation and Restructuring, Deal Strategy, Business Strategy, Corporate Strategy, Growth Strategy, Marketing Strategy, International Expansion, NED & Board Advisory Services, Interim CMO, Alliances, JVs & Partnerships, Market Entry
- **Sectors (sidebar):** Telecommunications, Engineering & Construction, Industrial Manufacturing, Pharma & Life Sciences, Chemicals & Polymers, Capital Projects & Infra
- **Geographies (sidebar):** UK, USA, Middle East Asia, Asia Pacific

**Biography (verbatim):**

> Mike is a sales transformation expert with 30+ years as an accomplished interim Sales Director and Managing Director in 15+ organisations across Telecom, Technology and Industrial sectors in Europe, India, Africa and the Middle East. Client companies and subsidiaries managed were typically $10m - $300m in revenue with sales teams from 10 up to 250 people.
>
> As an experienced hands-on change agent and trouble-shooter, Mike converts the high-level strategy into the reality of the day-to-day sales operation. His work is done when the change is embedded and the organisation operates at the required higher level of performance.
>
> Mike holds an MBA from London Business School (1980 cohort), specialising in Marketing and Strategy - selected for exchange programme with Fundacao Getulio Vargas in Sao Paulo, Brazil - together with a BSC in Physiology & Biochemistry from Southampton University. Additionally, he is a certified trainer in Neuro Linguistic Programming (NLP) and fully trained in SPIN solution selling skills. Mike speaks English, Spanish, Portuguese, French and German.

### Thu Nga Haskovcova

- **Profile URL:** https://adancorporate.com/en-uk/team/thu-nga-haskovcova.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Partner / Central Eastern Europe, Law / Prague, Czech Rep.
- **City, as printed (final `<h6>` line):** Prague, Czech Rep.
- **Group on team page:** Team
- **Email:** thu.nga@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/thu-nga-haskovcova-32431110/
- **Headshot (profile page `src`):** `../../assets/images/adan-team-thu-nga-haskovcova.png` -> https://adancorporate.com/assets/images/adan-team-thu-nga-haskovcova.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-thu-nga-haskovcova-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-thu-nga-haskovcova-colour-home-page.webp
- **Areas of Expertise (sidebar):** Project Finance, Private Equity, Equity Financing, Debt Financing, Working Capital and Trade Finance, Transformation and Restructuring, Commercial negotiation
- **Sectors (sidebar):** Banking & Capital Markets, Financial Services, Real Estate
- **Geographies (sidebar):** Eastern Europe, Sout East Asia

**Biography (verbatim):**

> Thu Nga is a Czech qualified lawyer with 20 years of international experience in M&A, Market Entry (Start-ups), Real Estate, Financing, Private Equity and Corporate law matters. Thu has in-depth local knowledge of the Central Eastern European (CEE) region and working experience in and in-depth knowledge of South East Asia.
>
> Thu Nga holds an MBA from London Business School, a PhD in Law from Charles University, Prague and a Master's in International Law from Moscow State University of International Relations (MGIMO)

### Nav Kaplish

- **Profile URL:** https://adancorporate.com/en-uk/team/nav-kaplish.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Partner / Digital, Blockchain & Risk / London
- **City, as printed (final `<h6>` line):** London
- **Group on team page:** Team
- **Email:** nav.kaplish@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/navkaplish
- **Headshot (profile page `src`):** `../../assets/images/adan-team-nav-kaplish.png` -> https://adancorporate.com/assets/images/adan-team-nav-kaplish.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-nav-kaplish-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-nav-kaplish-colour-home-page.webp
- **Areas of Expertise (sidebar):** Digital, Startups - Growth Capital, Risk Management, Risk Strategy, Enterprise Risk Management, Target Due-Diligence, Private Equity / Venture Capital, Deal Strategy, Business Strategy, Corporate Strategy, Coaching & Mentoring, Blockchain, Analytics, Interim CEO / Managing Director, Interim CMO
- **Sectors (sidebar):** Technology, Government & Public Services, Banking & Capital Markets, Financial Services, Telecommunications
- **Geographies (sidebar):** UK, India, Europe, South America

**Biography (verbatim):**

> Nav is a seasoned business and technology executive with 18+ years of global corporate and entrepreneurial experience in building and managing digital teams and in leadership roles spanning Governance, Risk & Compliance, Audits and conceptualisation and delivery of Blockchain products.
>
> Nav is the Head of Strategic Partnerships for the London Chapter of the Government Blockchain Association and is also an advisor on new venture strategy, market analysis, competitor analysis, venture financing for tech start-ups in the UK and India.
>
> Nav has an MBA from London Business School and a Bachelors degree in Engineering from the Middlesex University, UK.

### Edgar Garay

- **Profile URL:** https://adancorporate.com/en-uk/team/edgar-garay.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Partner / Corporate Finance / Bogota, Colombia
- **City, as printed (final `<h6>` line):** Bogota, Colombia
- **Group on team page:** Team
- **Email:** Edgar.Garay@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/garayedgar/
- **Headshot (profile page `src`):** `../../assets/images/adan-team-edgar-garay.png` -> https://adancorporate.com/assets/images/adan-team-edgar-garay.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-edgar-garay-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-edgar-garay-colour-home-page.webp
- **Areas of Expertise (sidebar):** Financial Services, M&A, Risk Management, Private Equity, Capital Projects & Infra, Special Situations, Transformation and Restructuring, Corporate Finance, Company Valuation, Deal Strategy, Business Strategy, Corporate Strategy
- **Sectors (sidebar):** Technology, Private Equity, Industrial Manufacturing, Banking & Capital Markets, Advanced Electronics, Green Energy
- **Geographies (sidebar):** Germany, Europe, USA

**Biography (verbatim):**

> Edgar is an eclectic digital nomad with 30+ years of experience in diverse asset classes across a broad spectrum of industries and geographies.
>
> He specialises in assisting mid-sized businesses with structuring, developing and deploying active-ownership approach to improve business strategies and operating structures, aligning all toward achieving optimum shareholder value.
>
> Previously, Edgar has played roles of CEO of Barracuda Finance, Finance Director of GEMS eduction, Corporate Investment Manager at Alesayi Group, and Vice President of Asset Management at Jones Lang LaSalle MENA.
>
> Edgar is an intense, results-oriented, self-starter, continuous learner and provides a broad-based expertise in operations, finance, administration and asset management in diverse sectorial, functional and geographical positions.
>
> Edgar holds an MBA from London Business School and a Bachelor's degree in industrial engineering from Pontificia Universidad Javeriana.

### Jean-Bernard (JB) Tanqueray

- **Profile URL:** https://adancorporate.com/en-uk/team/jean-bernard-tanqueray.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Partner / Family Offices / Paris & London
- **City, as printed (final `<h6>` line):** Paris & London
- **Group on team page:** Team
- **Email:** jean-bernard@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/jbtanqueray/
- **Headshot (profile page `src`):** `../../assets/images/adan-team-jean-bernard-tanqueray.png` -> https://adancorporate.com/assets/images/adan-team-jean-bernard-tanqueray.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-jean-bernard-tanqueray-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-jean-bernard-tanqueray-colour-home-page.webp
- **Areas of Expertise (sidebar):** Family Offices Investments, Startups - Growth Capital, Fund Placement, Equity Financing, Private Equity, Strategic Equity Partnerships, Divestments and Exit Planning, M&A, Deal Strategy, Business Strategy, Corporate Strategy, NED & Board Advisory Services, Interim CEO / Managing Director, Board Advisors
- **Sectors (sidebar):** Asset & Wealth Management, Sovereign Investment Funds, Banking & Capital Markets, Financial Services, Technology
- **Geographies (sidebar):** France, UK, Europe

**Biography (verbatim):**

> Jean-Bernard is a seasoned Wealth and Asset Management Executive with 20+ years of investment experience in investing in both businesses and public capital markets for Single Family Offices and Institutional Investors and has over the years, has developed a deep expertise in all main assets, strategies and styles (volatility & niche arbitrage strategies, event driven, systematic, global macro, deep value)
>
> In his past roles, JB designed and implemented top-down asset allocation processes and bottom-up fund selection for Family Offices (UK, US, French). He thus developed a deep expertise in all main assets, strategies and styles (volatility & niche arbitrage strategies, event driven, systematic, global macro, deep value).
>
> As a fund of hedge fund managers at Fortis Investments, he trebled assets under management. He has also advised a $120 mn ""Fund of hedge funds"" on hedge fund due-diligence as a member of the selection committee; rated European asset managers at Fitch Ratings; reframed the whole operational, commercial and investment capabilities of a major European investment manager that has now merged into French conglomerate BNP Paribas; and managed the outsourcing of a EUR 250 million US equities portfolio of a European asset management firm.
>
> Jean-Bernard holds an MBA from London Business School; a DEA/M.Phil in International Macroeconomics and Finance from the Universite Paris Dauphine; an MA in Management with specialisation in Finance & Industrial Economics from ESSCA (Angers); UK FCA's CF01 & CF30 certifications; and a certificate in launching new ventures from Harvard Business School.

### Vernon D'Cruz

- **Profile URL:** https://adancorporate.com/en-uk/team/vernon-d-cruz.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Partner / Commercial, Tourism & CSR / Mumbai
- **City, as printed (final `<h6>` line):** Mumbai
- **Group on team page:** Team
- **Email:** vernon.dcruz@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/vernondcruz/
- **Headshot (profile page `src`):** `../../assets/images/adan-team-vernon-dcruz.png` -> https://adancorporate.com/assets/images/adan-team-vernon-dcruz.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-vernon-dcruz-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-vernon-dcruz-colour-home-page.webp
- **Areas of Expertise (sidebar):** Commercial Negotiation, Special Situations, Distressed Asset Management, Transformation and Restructuring, Special Situations, Private Equity, Project Finance, Debt Syndication, Deal Strategy, M&A, Business Strategy, NED & Board Advisory Services, Working Capital and Trade Finance, Interim CFO
- **Sectors (sidebar):** Travel, Transport & Logistics, Insurance, Social Sector, Banking & Capital Markets, Financial Services
- **Geographies (sidebar):** India, South East Asia

**Biography (verbatim):**

> Vernon is a distinguished finance professional with 30+ years of experience in mid-sizes service organisations with demonstrated success in providing team leadership and development to foster growth. He has hands on experience in managing and running business with keen interest and knowledge in Finance, Taxation, Legal, Commercial Negotiations, Commercial, Tourism & CSR.
>
> He has substantial experience in Travel and Tourism, Exports, Commercial Negotiations, Commercial, Tourism & CSR, Private Placements and Buy-outs for SMEs. Vernon also takes a keen interest in the Insurance space. Vernon is creative and has an enthusiastic bent of mind towards Social work in the Ecology and Education space.
>
> Previously, Vernon was involved in successfully building from scratch, a Travel and Tourism Company and running it for 20 years. In addition he has been advising travel companies on their growth as well as exit strategies. Prior to this, Vernon headed the Finance Operations of one of the fastest growing Tour Operating companies and was instrumental in sourcing funding for Hotel projects and structuring a Bought-Out deal for the organization.
>
> Vernon is a Chartered Accountant and based in Mumbai.

### Craig Tingle

- **Profile URL:** https://adancorporate.com/en-uk/team/craig-tingle.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Partner / Real Estate / Miami and Dubai
- **City, as printed (final `<h6>` line):** Miami and Dubai
- **Group on team page:** Team
- **Email:** Craig.Tingle@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/craig-tingle-tingleandassociatespa-a5b93135/
- **Headshot (profile page `src`):** `../../assets/images/adan-team-craig-tingle.png` -> https://adancorporate.com/assets/images/adan-team-craig-tingle.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-craig-tingle-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-craig-tingle-colour-home-page.webp
- **Areas of Expertise (sidebar):** Private Equity, Real Estate, Capital Projects & Infra, Financial Services, Special Situations, Distressed Asset Management, Deal Strategy, Interim CEO / Managing Director, Company Valuation, Distressed Asset Management, Transformation and Restructuring, M&A, International Expansion
- **Sectors (sidebar):** Banking & Capital Markets, Financial Services, Metals & Mining
- **Geographies (sidebar):** Singapore, UK, South Africa

**Biography (verbatim):**

> Craig is a board-certified real estate attorney with more than twenty-five years legal experience and has closed billions of dollars in transactions. His expertise includes: shopping centers, shopping malls, apartment buildings, assisted living facilities, subdivisions, medical campuses and portfolios acquisitions of each of these.
>
> Stated succinctly, Craig has been involved in every conceivable facet of real estate development, acquisition and disposition. This area of expertise has extended itself to the agricultural sector as well to include: commercial farming, medical cannabis, and vineyards and wineries.
>
> Craig has managed corporate turnarounds, served as interim CEO, provided creative solutions for distressed property workouts and has litigated extensively. He has handled over 1,000 legal cases and has appeared before the United States Supreme Court.
>
> He has a unique expertise in U.S. Federal Indian Law and can advise on operations upon Indian Lands in the United States for casinos and other opportunities. Craig is retired from the United States Marine Corps, where he retired from the reserves after 26 years and can advise in the area of defense contracting and procurement for significant matters.
>
> Craig is a graduate of Washington University School of Law (J.D.) where he attended on full academic scholarship. He holds an LL.M. in Real Property Development from the University of Miami School of Law and is pursuing an MBA from London Business School.

### Preethi Hari

- **Profile URL:** https://adancorporate.com/en-uk/team/preethi-hari.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Partner / Risk Management / London
- **City, as printed (final `<h6>` line):** London
- **Group on team page:** Team
- **Email:** preethi.hari@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/preethihari/
- **Headshot (profile page `src`):** `../../assets/images/adan-team-preethi-hari.png` -> https://adancorporate.com/assets/images/adan-team-preethi-hari.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-preethi-hari-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-preethi-hari-colour-home-page.webp
- **Areas of Expertise (sidebar):** Risk Management, Risk Strategy, Enterprise Risk Management, Target Due-Diligence, Digital, Business Strategy, Corporate Strategy, Transformation and Restructuring, Interim CRO
- **Sectors (sidebar):** Real Estate, Banking & Capital Markets, Mining, Oil & Gas, Travel, Transport & Logistics, Shipping, Insurance, Capital Projects & Infra, Financial Services
- **Geographies (sidebar):** UK, India

**Biography (verbatim):**

> Preethi is an experienced Governance, Risk & Compliance professional with 18+ years of experience in Risk Management, IT Governance, IT Security, Business Continuity, Audits, Compliance and Regulatory. She specialises in COBIT/ COSO framework, ITSM (ITIL), 6-Sigma, SOX etc in Banking, Insurance, Oil & Gas, Shipping, Mining, Logistics, Telecom and Commercial Real Estate.
>
> She has led large, complex risk and compliance programmes for Deloitte, Ernst & Young and KPMG. She has worked with leading Financial Sector companies such as Deutsche Bank, ING, Bank of America, Barclays and Lloyds.
>
> Preethi has an MBA from London Business School.

### Suresh Nambiar

- **Profile URL:** https://adancorporate.com/en-uk/team/suresh-nambiar.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Partner / Procurement & Logistics / Manama City, Bahrain
- **City, as printed (final `<h6>` line):** Manama City, Bahrain
- **Group on team page:** Team
- **Email:** suresh.nambiar@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/suresh-nambiar-047a0918/
- **Headshot (profile page `src`):** `../../assets/images/adan-team-suresh-nambiar.png` -> https://adancorporate.com/assets/images/adan-team-suresh-nambiar.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-suresh-nambiar-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-suresh-nambiar-colour-home-page.webp
- **Areas of Expertise (sidebar):** Private Equity, Project Finance, Debt Syndication, Deal Strategy, Commercial negotiation, Distressed Asset Management, Transformation and Restructuring, M&A, Business Strategy, NED & Board Advisory Services, Working Capital and Trade Finance, Interim CEO / Managing Director
- **Sectors (sidebar):** Travel, Transport & Logistics, Industrial Manufacturing, Engineering & Construction, Chemicals & Polymers, Retail
- **Geographies (sidebar):** Middle East Asia, USA, Europe, Africa, China

**Biography (verbatim):**

> Suresh is a senior business executive with 30+ years of extensive and diverse experience in General Management, Financial Management, Human Resource Management, Procurement, and Logistics across varied industries such as Packaging, Pharma, Manufacturing and Engineering in areas such as cost optimization, fraud investigation, new product development and acquisitions.
>
> Suresh specializes in Project Management & Feasibility studies, Business Financial and Accounting Models, Corporate Financing, Devising SOPs. Cost Optimization Support, HR Systems and Management, and General Management areas. His assignments have covered various geographies including USA, Europe, Middle East, Africa, China, Indian Sub-continent and Far East.
>
> In his last role, he was the General Manager - Bahrain at Closure System (CSI), a global leader in packaging business. Suresh has also played multi-faceted roles in location and regional management (Middle East, India and Africa regions). He has been involved in greenfield projects and expansion activities in the Philippines, Middle East, India, Nepal and Egypt.
>
> Suresh is a Chartered Accountant (ACA), a Company Secretary (ACS), a CPA in Accounts, Taxation, Legal from AICPA Delaware, and holds a degree in Law (LLB) from the University of Mumbai.

### Rauf Akhundov

- **Profile URL:** https://adancorporate.com/en-uk/team/rauf-akhundov.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Partner / Central Asia / Baku, Azerbaijan
- **City, as printed (final `<h6>` line):** Baku, Azerbaijan
- **Group on team page:** Team
- **Email:** r.akhundov@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/rauf-akhundov-89495022/
- **Headshot (profile page `src`):** `../../assets/images/adan-team-rauf-akhundov.png` -> https://adancorporate.com/assets/images/adan-team-rauf-akhundov.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-rauf-akhundov-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-rauf-akhundov-colour-home-page.webp
- **Areas of Expertise (sidebar):** Project Finance, Private Equity, Equity Financing, Debt Financing, Working Capital and Trade Finance, Transformation and Restructuring, Commercial negotiation
- **Sectors (sidebar):** Banking & Capital Markets, Financial Services, Public Sector, Government & Public Services, Sovereign Investment Funds
- **Geographies (sidebar):** Azerbaijan, Central Asia

**Biography (verbatim):**

> Rauf is a seasoned banker with 20+ years of international experience in fundraising, strategic planning and budgeting, consumer, micro and corporate lending, network management, lobbying and relationship management with government officials in emerging markets.
>
> Previously, Rauf was the Deputy CEO and Board Member of DemirBank, Azerbaijan's leading private commercial bank; Chairman of the Steering Committee of Azerbaijan's first Private Credit Bureau and setting up a prudent governance structure with IFC and World Bank Group; Vice President - Finance at Akkord - Azerbaijan's leading construction company; the Country Officer for Azerbaijan and Central Asia for International Finance Corporation (IFC); Advisor to the Chairman of Supervisory Board (on credit risks) for AGBank
>
> Rauf has significant transaction experience and successful relationship management with leading international development institutions such as International Finance Corporation (IFC), European Bank for Reconstruction and Development (EBRD), Asian Development Bank (ADB), German Investment Corporation (DEG) and the Dutch Development Bank (FMO).
>
> Rauf holds a Sloan Master's in Leadership and Strategy from London Business School, a Bachelor's degree in Banking and Finance from Azerbaijan State University of Economics, a Bachelor's degree in Law from Azerbaijan International University, and a Bachelor's degree in International Law and Social Sciences from Khazar University.

### Sreeraman P.S.

- **Profile URL:** https://adancorporate.com/en-uk/team/sreeraman-p-s.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Director / Investments / Mumbai
- **City, as printed (final `<h6>` line):** Mumbai
- **Group on team page:** Team
- **Email:** sreeraman.ps@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/sreeraman-p-s-6a4985127/
- **Headshot (profile page `src`):** `../../assets/images/adan-team-sreeraman-ps.png` -> https://adancorporate.com/assets/images/adan-team-sreeraman-ps.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-sreeraman-ps-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-sreeraman-ps-colour-home-page.webp
- **Areas of Expertise (sidebar):** Family Offices Investments, Fund Placement, Private Equity, Project Finance, Working Capital and Trade Finance, Factoring, Invoice Discounting, Alternative Financing, Equity Financing, Debt Financing, M&A, Startups - Growth Capital
- **Sectors (sidebar):** Asset & Wealth Management, Financial Services, Private Equity, Sovereign Investment Funds, Banking & Capital Markets, Capital Projects & Infra
- **Geographies (sidebar):** India, South East Asia

**Biography (verbatim):**

> Sreeraman has 15+ years of experience in capital markets and investment banking dealing with small and medium enterprises. He has worked in Sales, Private Wealth Management, Investment Banking and Equity advisory roles in companies such as Indiabulls, Motilal Oswal and Kotak Securities. He is experienced in Supply Chain Finance for suppliers and buyers internationally in both services as well as manufacturing sectors such as Chemicals, Textiles, Rubber, Industrial Goods, FMCG, etc.
>
> At Adan, Sreeraman is responsible for deal due-diligence and implementation, covering the Indian geography and is working on a number of transactions related to PE/VC fund placement, M&A, fund raising (debt and equity), and distressed asset management.
>
> Sreeraman has an MBA from MIT School of Management.

### Ajay Sethi

- **Profile URL:** https://adancorporate.com/en-uk/team/ajay-sethi.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Director / Market Development / London
- **City, as printed (final `<h6>` line):** London
- **Group on team page:** Team
- **Email:** sethi@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/ajay-sethi-91968b177/
- **Headshot (profile page `src`):** `../../assets/images/adan-team-ajay-sethi.png` -> https://adancorporate.com/assets/images/adan-team-ajay-sethi.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-ajay-sethi-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-ajay-sethi-colour-home-page.webp
- **Areas of Expertise (sidebar):** Project Finance, Debt Financing, Working Capital and Trade Finance, Deal Strategy, Business Strategy, Commercial negotiation
- **Sectors (sidebar):** Retail, Industrial Manufacturing, Travel, Transport & Logistics
- **Geographies (sidebar):** UK, Africa

**Biography (verbatim):**

> Ajay Sethi is an innovative professional with a strong entrepreneurial spirit backing 35+ years of experience across management of growing businesses, sales and accountancy. Ajay has in-depth knowledge of business management, brand development, sales & marketing, product sourcing, fund-raising, accounting procedures, and risk mitigation.
>
> Ajay Sethi has previously established and grown organisations from an importing firm specialising in Kenyan products to a niche travel agency based in Central London.
>
> Ajay Sethi has also provided consultancy services advising on the growth of companies across various industries, including the set-up of three new branches of a large confectionary franchise, where he was responsible for the establishment of ingredient sourcing and inter-branch stock procedures while reporting directly to the global general manager and South African investors, the expansion of a travel agency, where he successfully set up tour operation packages and managed a 10,000 charter seat programme, and for fashion companies, where he established relationships directly with some of the largest clothes and garments retailers in the UK.
>
> His focus on the growth of his clients and balanced negotiation and sales skills have been a testament to his success across such areas, coupled with a demonstrable ability to develop and sustain key relationships with a wide range of stakeholders at all levels.
>
> Ajay Sethi has a background in accountancy, which has qualified and enabled him to oversee the preparation and audit of accounts for SME firms.

### Varun Nadkarni

- **Profile URL:** https://adancorporate.com/en-uk/team/varun-nadkarni.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Financial Analyst / India
- **City, as printed (final `<h6>` line):** India
- **Group on team page:** Team
- **Email:** varun.nadkarni@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/varun-nadkarni-43843a104/
- **Headshot (profile page `src`):** `../../assets/images/Varun Photo Team.png` -> https://adancorporate.com/assets/images/Varun Photo Team.png
- **Headshot (team listing page `src`):** `../../assets/images/Varun Photo Index.png` -> https://adancorporate.com/assets/images/Varun Photo Index.png
- **Areas of Expertise (sidebar):** Accounting, Finance
- **Sectors (sidebar):** Capital Market, Financial Services, Taxation
- **Geographies (sidebar):** India

**Biography (verbatim):**

> Varun having more than 6 years of experience in the field of accounts and finance, holds MBA degree in Finance and International Business from Amity University, India and has interest and passion for Equities and mutual funds and analysing of financial statements of the company to help the individual make better and relevant financial decisions over time.

### Heena Tilwani

- **Profile URL:** https://adancorporate.com/en-uk/team/heena-tilwani.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Financial Analyst / Gurgaon, India
- **City, as printed (final `<h6>` line):** Gurgaon, India
- **Group on team page:** Team
- **Email:** heena.tilwani@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/heena-tilwani-b73a71168/
- **Headshot (profile page `src`):** `../../assets/images/Heena Website format photo.png` -> https://adancorporate.com/assets/images/Heena Website format photo.png
- **Headshot (team listing page `src`):** `../../assets/images/Heena Website format photo.png` -> https://adancorporate.com/assets/images/Heena Website format photo.png
- **Areas of Expertise (sidebar):** Accounting, Finance
- **Sectors (sidebar):** Banking & Capital Markets, Financial Services, Accounting Services
- **Geographies (sidebar):** UK, India

**Biography (verbatim):**

> Heena is a financial analyst and Intermediate Accountant with over 5+ years of expertise in financial accounting, analysis, and reporting. She is experienced in providing monthly/quarterly reports and performance KPIs.
>
> She is interested in financial modelling, process improvement, and data analytics.

### Shreyash Gandhi

- **Profile URL:** https://adancorporate.com/en-uk/team/shreyash-gandhi.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Financial Analyst / M&A, Accounting & Finance / Mumbai
- **City, as printed (final `<h6>` line):** Mumbai
- **Group on team page:** Team
- **Email:** shreyash.gandhi@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/cashreyash/
- **Headshot (profile page `src`):** `../../assets/images/Shreyash Website Photo Format.png` -> https://adancorporate.com/assets/images/Shreyash Website Photo Format.png
- **Headshot (team listing page `src`):** `../../assets/images/Shreyash Website Photo Format.png` -> https://adancorporate.com/assets/images/Shreyash Website Photo Format.png
- **Areas of Expertise (sidebar):** M&A, Accounting, Finance
- **Sectors (sidebar):** Banking & Capital Markets, Financial Services, Private Equity
- **Geographies (sidebar):** India, UK

**Biography (verbatim):**

> Shreyash is a Chartered Accountant and finance professional with diverse experience in business valuation, financial due diligence, and strategic advisory.
>
> During his tenure with Deloitte’s Valuations team, he led and supported cross-border engagements across Europe, the Middle East, Canada, and Scandinavia, advising clients in sectors including infrastructure, FMCG, technology, and retail.
>
> His expertise spans transaction structuring, impairment testing, startup valuations, and market analysis, with a strong focus on delivering insights that drive value in investment and growth decisions.

### Kieran Bourke

- **Profile URL:** https://adancorporate.com/en-uk/team/kieran-bourke.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Partner / Commodities / Singapore
- **City, as printed (final `<h6>` line):** Singapore
- **Group on team page:** Advisors
- **Email:** kieran.bourke@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/kieran-bourke-006a511a/
- **Headshot (profile page `src`):** `../../assets/images/adan-team-kieran-bourke.png` -> https://adancorporate.com/assets/images/adan-team-kieran-bourke.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-kieran-bourke-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-kieran-bourke-colour-home-page.webp
- **Areas of Expertise (sidebar):** Risk Management, Risk Strategy, Enterprise Risk Management, Target Due-Diligence, Company Valuation, Special Situations, Transformation and Restructuring, Interim CRO, Coaching & Mentoring, Private Equity, Corporate Strategy, Board Advisors
- **Sectors (sidebar):** Banking & Capital Markets, Financial Services, Metals & Mining
- **Geographies (sidebar):** Singapore, UK, South Africa

**Biography (verbatim):**

> Kieran is a Financial Risk Management expert with 25+ years of broad global Financial Services experience across Market, Traded Credit, Operational, Regulatory, and Enterprise Risk Management protocols across 4 continents. He was a Managing Director at Standard Chartered Bank at London & Singapore, where he established the commodities market risk function from scratch.
>
> With 25+ years of trading and risk management experience spanning global investment banks, consulting, and an energy company on 4 continents, he is truly international with a proven track record of success in supporting rapidly growing and demanding businesses.
>
> Having successfully run multiple IMA model approval applications for global banks, as well as managing numerous regulatory audits, he has extensive experience of managing banking regulatory relationships and regulatory driven projects. He is a confident leader with extensive experience of interacting with senior stakeholders.
>
> Kieran is a Sloan Fellow of London Business School (MSc in Leadership & Strategy) and also holds an MSc. in Mathematical Trading & Finance from Cass Business School, London, an MBA from Smurfit Business School, Dublin, and a BA in Modern Business & Economics from Trinity College, Dublin.

### Dipak Khot

- **Profile URL:** https://adancorporate.com/en-uk/team/dipak-khot.html
- **Role/title, exactly as printed (successive `<h6>` lines on the profile page):** Advisor / Global Markets / Treasury Risk Management / London
- **City, as printed (final `<h6>` line):** London
- **Group on team page:** Advisors
- **Email:** Dipak.Khot@adancorporate.com
- **LinkedIn:** https://www.linkedin.com/in/dipak-khot-212623/
- **Headshot (profile page `src`):** `../../assets/images/adan-team-dipak-khot.png` -> https://adancorporate.com/assets/images/adan-team-dipak-khot.png
- **Headshot (team listing page `src`):** `../../assets/images/adan-team-dipak-khot-colour-home-page.webp` -> https://adancorporate.com/assets/images/adan-team-dipak-khot-colour-home-page.webp
- **Areas of Expertise (sidebar):** Financial Services, M&A, Risk Management, Private Equity, Capital Projects & Infra, Special Situations, Transformation and Restructuring, Corporate Finance, Company Valuation, Deal Strategy, Business Strategy, Corporate Strategy
- **Sectors (sidebar):** Banking & Capital Markets, Capital Projects & Infra, Financial Services, Private Equity, Asset & Wealth Management, Sovereign Investment Funds
- **Geographies (sidebar):** UK, USA, Middle East Asia, Asia Pacific

**Biography (verbatim):**

> Dipak is an accomplished client-focused banker with nearly 3 decades of experience in Treasury/ Market risk management. He has an exceptional understanding of global financial markets, banking, FX/ IR hedging/ structuring, liquidity management and an ability to leverage the knowledge of current economic, financial, accounting, regulatory and industry climate to develop effective hedging strategies. He is a refined communicator and able to transform strategic ideas and vision into reality through communication with management, stakeholders, and C-level executives.
>
> Dipak started his career with a couple of multinational corporates and subsequently gained 25+ years of Banking experience in a number of locations across the globe working for Standard Chartered Bank, RBS, HSBC and recently with Syndicate Bank in London. He was regularly invited to speak at various Banking & Corporate events on the subject of Market Risk Management and has authored articles on the subject for international Treasury publications.
>
> Dipak is a qualified Chartered Accountant, Cost & Management Accountant and a Chevenings Scholar in Banking and Finance from London School of Economics.
