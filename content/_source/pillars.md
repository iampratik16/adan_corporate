# Source abstract — Four pillar index pages (adancorporate.com, en-uk)

Fetched 2026-09-18 via `curl -sL -A "Mozilla/5.0"`. All four index pages returned HTTP 200.
Mega-nav / header / footer / script / style stripped before transcription. Everything below is
transcribed from the fetched HTML. British English preserved as found (note: the source itself is
inconsistent — see FLAGs).

**Shared meta description on all four pillar index pages and on every sub-service page fetched:**
> "Adan Corporate provides a wide range of bespoke advisory services to small and medium sized enterprises at every step of the value creation journey."

**FLAG (applies to all four pillar index pages):** none of the four pillar index pages carries a
positioning statement, intro paragraph, hero copy or any body prose whatsoever. Each page is
*only* a grid of image tiles grouped under `<h2>` sub-section headings, followed by the standard
"See what we can do for you" CTA. There is no `<h1>` on any of them. **No opening/positioning
statement exists to transcribe — new pillar copy will have to be written from the sub-service
pages' prose, not lifted from the index pages.**

**FLAG:** page comments in the HTML source give `Datecreated 20190927`, `Datemodified 20210101/20200703`,
`Copyright 2013-2021 Adan Corporate`, `Version 1.0`. Footer reads "© Adan Corporate 2013 - 2021."
Site content is stale by at least five years.

**FLAG:** every tile link on all four index pages opens with `target='_blank'`, and link text is
wrapped in deprecated `<font size=1>` tags inside `<h3 class='t-name'>`. Purely a legacy-markup note.

---

## 1. Corporate Finance
Source: https://adancorporate.com/en-uk/corporate-finance/index-corporate-finance.html (200)
`<title>`: **Index - Corporate Finance | Adan Corporate**

### Positioning statement
NONE PRESENT. (See FLAG above.) Unlike the other three pillars, this page does not even carry a
bare `Index - Corporate Finance` heading — it opens straight into "Index - Equity Financing".

### Sub-services linked, grouped exactly as the page groups them

**Index - Equity Financing**
- Private Equity → `corporate-finance/private-equity-venture-capital.html`
- IPO → `corporate-finance/ipo.html`
- Family Offices Investments → `corporate-finance/family-offices-investments.html`
- Startups - Growth Capital → `corporate-finance/startups-growth-capital.html`
- Fund Placement → `corporate-finance/fund-placement.html`
- Government Grants → `corporate-finance/government-grants.html`

**Index - Debt Financing**
- Debt Financing → `corporate-finance/debt-financing.html`
- Project Finance → `corporate-finance/project-finance.html`
- Renewable Energy Financing → `corporate-finance/renewable-energy-financing.html`
- Working Capital and Trade Finance → `corporate-finance/working-capital-and-trade-finance.html`
- Factoring → `corporate-finance/factoring.html`
- Invoice Discounting → `corporate-finance/invoice-discounting.html`

**Index - Other Categories**
- Special Situations → `corporate-finance/special-situations.html`
- Distressed Asset Management → `corporate-finance/distressed-asset-management.html`
- Transformation and Restructuring → `corporate-finance/transformation-and-restructuring.html`
- Divestments and Exit Planning → `corporate-finance/divestments-and-exit-planning.html`

**Index - Other Services**
- Transfer Pricing → `corporate-finance/transfer-pricing.html`
- Credit Ratings Assistance → `corporate-finance/credit-ratings-assistance.html`
- Devil's Advocate-Red Team → `strategy/devil-s-advocate-and-red-teaming.html` *(cross-links into Strategy)*
- Pitch preparation → `strategy/pitch-preparation-king-s-speech.html` *(cross-links into Strategy)*
- Investor Performance → `corporate-finance/investors-performance-enhancement.html`
- Decision Facilitation → `strategy/decision-facilitation.html` *(cross-links into Strategy)*
- Commercial Mediation → `corporate-finance/commercial-mediation.html`

Cross-check against `old-urls.txt`: all 20 non-index `corporate-finance/*` URLs are linked from
this index. No orphans in this section.

FLAG: tile label "Private Equity" points at `private-equity-venture-capital.html`, whose own
`<title>` is "Private Equity and Venture Capital". Tile label "Investor Performance" points at
`investors-performance-enhancement.html`. Labels and page titles do not match.

### Sub-service prose transcribed

#### IPO — `corporate-finance/ipo.html` (200). Accordion heading: "IPO"
Service blocks on the page, each headed by a bolded lead-in inside the paragraph:

- **IPO Valuation and Documentation** — "We understand your objectives for the fund-raise and help your company put its vision on paper. We can assist with pricing your IPO, cover all pre & post IPO governance issues, appointments of Board Committees, Investor information etc and provide Pre-IPO financial arrangements and be part of your team through the process to assist in IPO valuation, documentation, and supporting due diligence."
- **Roadshow Management** — "Roadshows represent the intersection of communication, creativity and storytelling. Don't leave the initial phases of the presentation (storytelling and slide creation in particular) to the last minute. We can assist with managing the roadshow for effective perception of the company's position."
- **Placement of Equity** — "We can assist pre-IPO financial arrangements and be part of your team through the process to assist in the placement of equity and supporting documentation."
- **Due Diligence Assistance** — "We perform financial, legal and commerial due deligence to increase confidence in financial projecttions. In a commercial due diligence engagement, we conduct a thorough analysis of the potential target's market environment and competitive position and their impact on the target's business plan. We also assist in all internal reports, controls, documentation, Our approach to due diligence is adapted to individual client requirements. The analysis focuses on key issues crucial to the investor, relates inter alia to the review and assessment of assumptions made in budgets and forecasts of the target against market evidence and industry expectations in the sector. Furthermore, a commercial due diligence investigation enables the investor to both address potential market risks in the target's valuation and recognise the target's unrealised growth potential."
  - FLAG: three typos verbatim in source — "commerial", "due deligence", "projecttions". Also a comma splice: "documentation, Our approach".
- **Liaising with Capital Market participants (advisers, legal, research)** — "We liaise with advisors and all participants both internal (Board / Key Management) and External (Advisors /Lawyers / Accountants/ Public Relations / Registrars) as a part of your team. We can also faciliate selection of advisors and other participants (Legal/Auditors/ Tax/ PR) and be a part of cost negotiations."
  - FLAG: "faciliate" typo verbatim in source.
- **Corporate restructuring** — "Corporate restructuring entails any fundamental change in a company's business or financial structure, designed to increase the company's value to shareholders or creditor. Corporate financial restructuring involves restructuring the assets and liabilities of corporations, including their debt-to-equity structures, in line with their cash-flow needs to promote efficiency, support growth, and maximize the value to shareholders, creditors and other stakeholders. We help you perform Corporate and Global Tax Structuring / Transfer Pricing advisory for effective Investor perception and unlock the true potential of the company."

Closing/boilerplate blocks on the page:
- "This insight into current market practice ensures we negotiate the best deal for you throughout your transaction. Our team has the experience to help guide and support management teams through the process. We advise management teams on structuring, valuation, financing and tax planning and assist them to approach the vendor with a credible bid."
- "Our team can engage with you to: Smokejump into the situation and perform the business valuation, due diligence, tax diligence / Conduct a feasibility study for the management team, key sensitivities and how these may impact the business. / Produce and update business plans / Manage negotiations with other promoters, advisors, creditors and investors / Assist you with the legal documentation, agreements, and other important documentation. / Post deal support - complete accounts, deferred considerations and directors tax planning."
- "Our experts partner with clients on corporate planning, providing perspective not only on immediate value and impact, but on long-term implications. We work closely with management and other advisers to leverage and complement their knowledge and ensure maximum impact, and actively support implementation and skill building."

Featured Experts - IPO: Ajay Mavinkurve; Sabapaty (Saba) Suryanarayanan; Marco Salvini; Thu Nga Haskovcova.

"A selection of completed transactions" (subheading: "Our team has facilitated a variety of successful transactions across sectors, geographies and complexities."):
- IPO of India's largest film production and distribution firm. — Deal Region: Europe, Asia, US — Deal Size: $ 1 billion — Sectors: Media & Entertainment — Expertise: IPO, Business Strategy, Credit Ratings Assistance
- End-to-end IPO advisory for Asia's leading adhesive brand. — Deal Region: Asia — Deal Size: $ 150 million — Sectors: Chemicals & Polymers, Industrial Manufacturing — Expertise: IPO, Credit Ratings Assistance, Deal Strategy
- End-to-end IPO advisory for Asia's largest private company with the largest investment in renewable energy. — Deal Region: Asia — Deal Size: $ 77 million — Sectors: Metals & Mining, Industrial Manufacturing — Expertise: IPO, Credit Ratings Assistance, Business Strategy
- End-to-end IPO Advisory including Rights issue for a 150K TPA Steel Ingot Plant based in Asia. — Deal Region: Asia — Deal Size: $ 8 million — Sectors: Metals & Mining — Expertise: IPO, Credit Ratings Assistance, Business Strategy
- IPO for a chemicals manufacturer — Deal Region: Asia — Deal Size: $ 7.69 million — Sectors: Chemicals & Polymers — Expertise: IPO, Credit Ratings Assistance, Business Strategy
- IPO of an alloy steel products firm — Deal Region: Asia — Deal Size: $ 6.5 million — Sectors: Metals & Mining — Expertise: IPO, Credit Ratings Assistance, Business Strategy

Featured-experts subheading (repeated site-wide): "Senior multi-disciplinary corporate and finance professionals with diverse geographic, sector and transaction focuses"

#### Private Equity / Venture Capital — `corporate-finance/private-equity-venture-capital.html` (200). Accordion heading: "Private Equity"
- "In today's highly competitive market, spotting value creation opportunities as well as understanding risk pre acquisition is key to driving value on completion and under ownership. Our Private Equity team works with our specialist sector teams which enables us to provide insights across all business sectors. This in turn helps facilitate the identification of strategic opportunities for buyouts."
- "As part of fund raising, Venture Capital firms provide high growth potential with finance and business skills to explore market opportunities. To deal with high risk environment, an equity syndicate involves two or more VC firms taking an equity stake in an investment, either in the same investment round or, more broadly defined, at different points in time."
- (financial modelling boilerplate) "Our experienced team build robust, transparent financial models covering all circumstances and across a wide range of sectors. Our approach is to start with a clear understanding of the situation and design a bespoke model using proven methodologies and techniques. The advantages of our models include creating outputs and usability that are designed specifically for the user, as well as providing the flexibility of assumptions to perform sensitivity analysis."
- (value-proposition boilerplate) "Our experts partner with clients on corporate planning, providing perspective not only on immediate value and impact, but on long-term implications. We work closely with management and other advisers to leverage and complement their knowledge and ensure maximum impact, and actively support implementation and skill building."

Featured Experts - Private Equity and Venture Capital: Ajay Mavinkurve; Subhash Baliga; Priya Shah; Marco Salvini; Chennakeshav (Keshav) Adya; Suryadeep Nain; Thomas Peutz; Sabapaty (Saba) Suryanarayanan; Craig Tingle; Freddie Tshiaba; Thu Nga Haskovcova; Jean-Bernard (JB) Tanqueray.

Transactions:
- Real-Estate Private Equity fund and Fund placement — Europe — $ 200 million — Sectors: Private Equity — Expertise: Fund Placement, Private Equity, Corporate Strategy
- Fund placement of Healthcare focused PE fund (AIF) — Asia — $ 125 million — Sectors: Private Equity, Healthcare Systems & Services — Expertise: Private Equity, Fund Placement, Corporate Strategy
- End-to-end M&A advisory for the world's largest VFX and 3D firm in 2015. — Europe — $ 100 million — Sectors: Media & Entertainment, Technology — Expertise: Sell Your Business, Private Equity, Deal Strategy

#### Debt Financing — `corporate-finance/debt-financing.html` (200). Accordion heading: "Debt Financing"
- "Debt financing occurs when a firm raises money for working capital or capital expenditures by selling debt instruments to individuals and/or institutional investors. In return for lending the money, the individuals or institutions become creditors and receive a promise that the principal and interest on the debt will be repaid."
- **What is Cost of Capital?** "Cost of capital is the minimum rate of return that a business must earn before generating value. Before a business can turn a profit, it must at least generate sufficient income to cover the cost of the capital it uses to fund its operations. Cost of capital consists of both the cost of debt and the cost of equity used for financing a business. A company's cost of capital depends to a large extent on the type of financing the company chooses to rely on. The company may rely solely on equity or debt, or use a combination of the two."
- "The choice of financing makes the cost of capital a crucial variable for every company, as it will determine the company's capital structure. Companies look for the optimal mix of financing that provides adequate funding and that minimizes the cost of capital."
- "In addition, investors use cost of capital as one of the financial metrics they consider in evaluating companies as potential investments. The cost of capital figure is also important because it is used as the discount rate for the company's free cash flows in the DCF analysis model."
- "The most common approach to calculating the cost of capital is to use the Weighted Average Cost of Capital (WACC). Under this method, all sources of financing are included in the calculation and each source is given a weight relative to its proportion in the company's capital structure. WACC provides us a formula to calculate the cost of capital:" — FLAG: the sentence ends on a colon; the formula itself is not in the text (likely an image asset).
- "Cost of debt in WACC is the interest rate that a company pays on its existing debt. Cost of equity is the expected rate of return for the company's shareholders."
- "Debt is a cheaper source of financing as compared to equity. Companies can benefit from their debt instruments by expensing the interest payments made on existing debt and thereby reducing the company's taxable income. These reductions in tax liability are known as tax shields. Tax shields are crucial to companies because they help to preserve the company's cash flows and the total value of the company."
- "However, at some point, the cost of issuing additional debt will exceed the cost of issuing new equity. For a company with a lot of debt, adding new debt will increase its risk of default, the inability to meet its financial obligations. A higher default risk will increase the cost of debt, as new lenders will ask for a premium to be paid for the higher default risk. In addition, a high default risk may also drive the cost of equity up because shareholders will likely also expect a premium for taking on additional risk."
- "The emergence of non-bank lenders and challenger banks in the market place has not only provided competition on pricing but also access to a variety of new finance products. If you are looking to secure funding we are able to use our extensive experience and market insight to guide you through this process."
- "Our capital sources provide solutions across the spectrum, from fully amortizing long-term debt and non-recourse construction transactions to a highly leveraged mezzanine or bridge deal. Because of the strength of our existing relationships with funding sources, we are often able to help facilitate debt placement opportunities at more favorable rates and terms than many of our clients could obtain independently."
- "We blend sophisticated capital markets expertise, with local market presence to negotiate customized financing packages that allow our clients to achieve their goals. We provide services in the below areas: Mortgage Origination / Mezzanine Debt / Secondary Financing / Sale/Leaseback Financing / Note Purchase/Loan Sale / Market Insight"
- (financial modelling boilerplate, as above)
- (value-proposition boilerplate, as above)

Featured Experts - Debt Financing: Ajay Mavinkurve; Sabapaty (Saba) Suryanarayanan; Chennakeshav (Keshav) Adya; George Christelis; Marco Salvini; Vernon D'Cruz; Freddie Tshiaba; Subhash Baliga; Carlos Dos Santos Leiria; Rauf Akhundov; Suryadeep Nain.

Transactions:
- Working Capital for VFX and 3D firm. — Asia, Europe — $ 20 million — Sectors: Media & Entertainment, Technology — Expertise: Working Capital, Debt Financing, Deal Strategy
- Corporate Debt & Sales Tax benefits for Asia's largest private mining company with the largest investment in renewable energy. — Asia — $ 150 million — Sectors: Metals & Mining, Green Energy — Expertise: Debt Financing, Project Finance, Deal Strategy
- Represented a state-of-the-art Antibiotic Drugs company in a review by a financial institution and helped with their debt raise — Asia — $ 16 million — Sectors: Pharma & Life Sciences — Expertise: Debt Financing, Project Finance, Deal Strategy
- Europe's leading clean energy provider for mid-sized businesses — Europe, Asia — Deal Size: Confidential — Sectors: Green Energy, Technology — Expertise: Debt Financing, Invoice Discounting
- Debt funding for reputed supplier of glass vials/ampoules to Pharma industry — Asia — $ 10 million — Sectors: Industrial Manufacturing — Expertise: Debt Financing, Business Strategy, Deal Strategy
- Debt funding for leading construction company — Asia — $ 10 million — Sectors: Engineering & Construction — Expertise: Debt Financing, Business Strategy, Deal Strategy

FLAG: the IPO page describes the same $ 150 million mining transaction as "Asia's largest private company"; the Debt Financing page calls it "Asia's largest private mining company". Descriptions are inconsistent between pages.

#### Project Finance — `corporate-finance/project-finance.html` (200). Accordion heading: "Project Finance"
- "Project finance is the funding (financing) of long-term infrastructure, industrial projects, and public services using a non-recourse or limited recourse financial structure. The debt and equity used to finance the project are paid back from the cash flow generated by the project."
- "Project financing is essentially a loan structure that relies primarily on the project's cash flow for repayment, with the project's assets, rights, and interests held as secondary collateral. Project finance is especially attractive to the private sector because companies can fund major projects off-balance sheet."
- "A project financing is essentially a transaction in which the focus is on creating a secure source of revenue from the project in question (which remains to be constructed) to cover operating costs, service debt and deliver a return on investment to sponsors. The reliability of the project's revenue is heavily dependent upon the delicate balance between the project's commercial viability, legal certainty of the risk allocation in the various project documents and the overall "structure" of the project. Project financings typically involve a combination of third-party debt and sponsor equity, usually provided in a ratio of approximately 80/20 or thereabouts. The debt/equity ratio will change according to the lenders' perceived risk profile of the project in question and may also require the sponsors to make "standby" or "contingent" equity available in the event of construction delays or …" — FLAG: paragraph is truncated mid-sentence in the source HTML itself.
- ""Project structure" refers to the way in which the participants in a project have been organized in terms of their "risk relationship" and how that "risk relationship" has been reflected in the project and financing agreements for the project in question. In other words, it refers to the project's "architecture," that is, everything from the jurisdiction(s) through which sponsors infuse equity into the project (to take advantage of favorable investment treaty protections), to the jurisdictions in which the project company holds its bank accounts (to safeguard project revenues and provide adequate repayment security for lenders), to the way in which the key commercial arrangements for the project (for example, construction, operation and maintenance, fuel supply and power purchase) have been structured to reduce credit risk or promote performance reliability by those parties and therefore …" — FLAG: also truncated mid-sentence in source.
- "Taking the economic and commercial viability of the project in question as a given, the creation of a successful project structure is possible only once the sponsors and lenders have gained a thorough understanding of the detailed legal, commercial and political risks affecting that project. This is referred to as the project's "risk profile." Such risk profile should cover the relevant project throughout its economic life, from its construction phase through its operating phase (particularly while senior debt remains outstanding)."
- "Every project brings with it its own unique risk profile. However, there is a well-trodden path to follow when building up a project's risk matrix:" — **FLAG: the promised list does not exist. The next element in the HTML is an unrelated paragraph. Content is missing from the live page.**
- Then the same non-bank-lenders paragraph, capital-sources paragraph, financial modelling boilerplate and value-proposition boilerplate as on the Debt Financing page.

Featured Experts - Project Finance: Ajay Mavinkurve; Sabapaty (Saba) Suryanarayanan; Thomas Peutz; Chennakeshav (Keshav) Adya; Marco Salvini; Vernon D'Cruz; Subhash Baliga; Carlos Dos Santos Leiria; Rauf Akhundov; Sreeraman P.S.; Suryadeep Nain.

Transactions: identical set of six to the Debt Financing page (see above). FLAG: deal carousels are duplicated verbatim across sub-service pages within a section.

---

## 2. Mergers and Acquisitions
Source: https://adancorporate.com/en-uk/m-and-a/index-m-and-a.html (200)
`<title>`: **Index - Mergers and Acquisitions | Adan Corporate**

### Positioning statement
NONE PRESENT. The page opens with a bare `<h2>Index - Mergers and Acquisitions</h2>` followed by an
empty subheading `<span>` and no tiles, then goes straight into the four grouped grids below.

### Sub-services linked, grouped exactly as the page groups them

**Index - Buy a Business**
- Buy a Business → `m-and-a/buy-a-business.html`
- M&A Synergies → `m-and-a/manda-synergies.html`
- MBOs and MBIs → `m-and-a/mbos-and-mbis.html`
- Leveraged Buy-Outs (LBOs) → `m-and-a/leveraged-buy-outs-lbos.html`
- Devil's Advocate-Red Team → `strategy/devil-s-advocate-and-red-teaming.html` *(cross-link)*
- Leadership Assessment → `coaching/leadership-assessment.html` *(cross-link into Coaching)*
- Decision Facilitation → `strategy/decision-facilitation.html` *(cross-link)*

**Index - Sell Your Business**
- Sell Your Business → `m-and-a/sell-your-business.html`
- Company Valuation → `m-and-a/manda-company-valuation.html`
- Deal Strategy → `m-and-a/deal-strategy.html`
- Devil's Advocate-Red Team → `strategy/devil-s-advocate-and-red-teaming.html` *(cross-link)*
- Decision Facilitation → `strategy/decision-facilitation.html` *(cross-link)*

**Index - Mergers**
- Mergers → `m-and-a/mergers.html`
- Post-Merger Integration (PMI) → `m-and-a/post-merger-integration-pmi.html`
- Leadership Assessment → `coaching/leadership-assessment.html` *(cross-link)*

**Index - Alliances, JVs & Partnerships**
- Alliances → `m-and-a/alliances.html`
- Joint Ventures → `m-and-a/joint-ventures.html`
- Partnerships → `m-and-a/partnerships.html`

Cross-check against `old-urls.txt`: all 12 non-index `m-and-a/*` URLs are linked. No orphans.

FLAG: `m-and-a/deal-strategy.html` and `strategy/deal-strategy-and-planning.html` are two separate
pages both labelled "Deal Strategy" in navigation. Duplicate naming across pillars.

### Sub-service prose transcribed

#### Sell Your Business — `m-and-a/sell-your-business.html` (200). `<title>`: "Sell Your Business M&A Sell-side | Adan Corporate"
- "Entrepreneurial exits can represent the great harvest of your life's work. While the business sales process can be an emotional roller coaster, it can also be an exciting time in the lifecycle of your business. When it comes time to sell your company, having the right professional assistance through this difficult process is critical to maximizing the value of the organization that may have taken a lifetime to build."
- "The acquisitions process has many steps and can often take anywhere from 6 months to several years to complete. Selling your business can be painstaking. Having the right professionals on your side of the deal can make it a lot easier."
- "One of the most complicated steps in the M&A process is properly structuring the deal. There are many factors to be considered, such as antitrust laws, securities regulations, corporate law, rival bidders, taxes, accounting issues, contacts, market conditions, forms of financing, and specific negotiation points in the M&A deal itself."
- Service list (verbatim items): "Work with you to prepare your company to be sold; Value your company; Create the seller sales documents (teaser, investor presentation, Confidential Information Memorandum (CIM); Market your business to prospective buyers; Negotiate Non-Disclosure Agreement (NDA) clauses; Pre-screen buyers; Negotiate the letter of intent/term sheet and structure of your deal; Advise on due diligence questions; Coordinate with your legal counsel and other advisors; Manage the closing process, including communicating timelines; and Help get your deal to the closing table."
  - FLAG: unbalanced parenthesis verbatim in source — "(Confidential Information Memorandum (CIM);".
- "In M&A deals, there are typically two types of acquirers: strategic and financial. Strategic acquirers are other companies, often direct competitors or companies operating in adjacent industries, such that the target company would fit in nicely with the acquirer's core business. Financial buyers are institutional buyers such as private equity firms that are looking to own, but not directly operate the acquisition target. Financial buyers will often use leverage to finance the acquisition, performing a leveraged buyout (LBO)."
- "The vast majority of acquisitions are competitive or potentially competitive. Companies normally have to pay a premium to acquire the target company, and this means having to offer more than rival bidders. To justify paying more than rival bidders, the acquiring company needs to be able to do more with the acquisition than the other bidders in the M&A process can (i.e., generate more synergies or have a greater strategic rationale for the transaction)."
- "When it comes to valuing synergies, there are two types of synergies to consider: hard and soft. Hard synergies are direct cost savings to be realized after completing the acquisition process. Hard synergies, also called operating or operational synergies, are benefits that are virtually sure to arise from the acquisition such as payroll savings that will come from eliminating redundant personnel between the acquirer and target companies. Soft synergies, also called financial synergies, are revenue increases that the acquirer hopes to realize after the deal closes. They are soft because realizing these benefits is not as assured as the hard synergy cost savings."
- "Companies choose to grow by acquiring others to increase market share, to gain access to promising new technologies, to achieve synergies in their operations, to tap well-developed distribution channels, to obtain control of undervalued assets, and a myriad of other reasons. But acquisition can be risky because many things can go wrong with even a well-laid plan to grow by acquiring: Cultures may clash, key employees may leave, synergies may fail to emerge, assets may be less valuable than perceived, and costs may skyrocket rather than fall. Still, perhaps because of the appeal of instant growth, acquisition is an increasingly common way to expand."
- **Deal Structuring** (repeat of the paragraph above), then: "We help identify key risks and rewards throughout the acquisition life cycle, even for the most complex deals. We help you align deals with your strategic business objectives, maintain compliance and enhance value from integration and potential upside opportunity. Our team of specialists helps you focus on the key questions during the critical stages of planning and executing an acquisition."
- "We blend sophisticated capital markets expertise, with local market presence to negotiate customized financing packages that allow our clients to achieve their goals."
- (financial modelling boilerplate)
- "This insight into current market practice ensures we negotiate the best deal for you throughout your transaction…" + "Our team can engage with you to: Smokejump into the situation and perform the business valuation, due diligence, tax diligence / Conduct a feasibility study… / Produce and update business plans / Manage negotiations with other promoters, advisors, creditors and investors / Assist you with the legal documentation, agreements, and other important documentation. / Post deal support - complete accounts, deferred considerations and directors tax planning." (identical to the IPO page)
- (value-proposition boilerplate)

Featured Experts - Sell Your Business - M&A Sell-side: Ajay Mavinkurve; Chennakeshav (Keshav) Adya; Sabapaty (Saba) Suryanarayanan; Kieran Bourke; Marco Salvini; Freddie Tshiaba; Mike Kemball; Craig Tingle; Thomas Peutz; Thu Nga Haskovcova; Subhash Baliga; Priya Shah; **Mike Kemball (repeated)**; **Craig Tingle (repeated)**; **Freddie Tshiaba (repeated)**; Nav Kaplish; Suryadeep Nain.
- FLAG: Mike Kemball, Craig Tingle and Freddie Tshiaba each appear twice in the same expert grid.

Transactions:
- Acquisition of Asia's leading online aggregator for Insurance products — Asia — Confidential — Sectors: Insurance, Technology — Expertise: Sell Your Business, Equity Financing, Deal Strategy
- End-to-end M&A advisory for the world's largest VFX and 3D firm in 2015. — Europe — $ 100 million — Sectors: Media & Entertainment, Technology — Expertise: Sell Your Business, Private Equity, Deal Strategy
- End-to-end M&A advisory for buying an augmented reality company in 2016. — Europe — $ 50 million — Sectors: Technology — Expertise: Sell Your Business, Private Equity, Deal Strategy
- Interim CFO and Strategy executive for a virtual reality company — Europe — $ 50 million — Sectors: Technology — Expertise: Deal Strategy
- Sale of Tertiary healthcare Hospital Group — Asia — $ 50 million — Sectors: Healthcare Systems & Services — Expertise: Sell Your Business, Private Equity, Deal Strategy
- Early stage and expansion phase funding for the acquisition of an Augmented Reality company. — Asia — $ 20 million — Sectors: Technology — Expertise: Business Strategy

FLAG: "Acquisition of Asia's leading online aggregator for Insurance products" is tagged as
*Sell Your Business* expertise while the headline says "Acquisition of". Also two different AR-company
deals at $ 50 million (Europe) and $ 20 million (Asia) sit in the same carousel — possibly the same
transaction recorded twice with different regions and sizes.

#### Buy a Business — `m-and-a/buy-a-business.html` (200). `<title>`: "Buy a Business M&A Buy-side | Adan Corporate"
- "There's only one real way to achieve massive growth literally overnight, and that's by buying somebody else's company. Acquisition has become one of the most popular ways to grow today. The mergers and acquisitions (M&A) process has many steps and can often take anywhere from 6 months to several years to complete."
- (same "Companies choose to grow by acquiring others…" paragraph as the Sell page)
- "As you execute your company's growth strategy through acquisitions you will reach a number of decision points. From identifying target markets and potential targets to running an efficient transaction process and realising upside or synergy value, we help you confidently navigate the complexities of buying a business, unlocking value at every stage."
- "The different types of successful acquisitions include the below strategies: Improve the target company's performance / Consolidate to remove excess capacity from industry / Accelerate market access for the target's (or buyer's) products / Get skills or technologies faster or at lower cost than they can be built / Exploit a business's industry-specific scalability / Pick winners early and help them develop their businesses / Roll-up strategy / Consolidate to improve competitive behavior / Enter into a transformational merger / Buy cheap"
- **Deal Structuring** paragraph (as above) and the "We help identify key risks and rewards…" paragraph.
- "We blend sophisticated capital markets expertise, with local market presence to negotiate customized financing packages that allow our clients to achieve their goals. We are particularly adept at advising on the following situations: Acquiring (family-owned) companies, groups, or other mid-market companies / Acquiring subsidiaries or business units from (international) corporates, including carve-outs / Acquiring businesses from a founder/(majority) shareholder, including succession / Acquiring shares owned by a private equity firm, family office or other investors"
- (financial modelling boilerplate, market-practice paragraph, "Our team can engage with you to:" list, value-proposition boilerplate — all identical to the Sell page)

Featured Experts - Buy a Business - M&A Buy-side: Ajay Mavinkurve; Chennakeshav (Keshav) Adya; Mike Kemball; Sabapaty (Saba) Suryanarayanan; Kieran Bourke; Craig Tingle; Marco Salvini; Freddie Tshiaba; Thomas Peutz; Thu Nga Haskovcova; Subhash Baliga; Priya Shah; Suryadeep Nain.

Transactions: identical set of six to the Sell Your Business page.

#### Mergers — `m-and-a/mergers.html` (200)
- "A merger refers to an agreement in which two companies join together to form one company. In other words, a merger is the combination of two companies into a single legal entity. In this article, we will look at different types of mergers that companies can undergo."
  - **FLAG: "In this article, we will look at…" — the copy is written as an article/blog, not as a service page. Likely lifted from a third-party finance-education source (the whole page reads like a textbook explainer).**
- **Motives for Mergers** — "Two companies may undertake a merger to increase the wealth of their shareholders. Generally, the consolidation of two businesses results in synergies that increase the value of a newly created business entity. Other motives include: 1. Value creation 2. Diversification 3. Acquisition of assets 4. Increase in financial capacity 5. Tax purposes 6. Incentives for managers"
- **Measuring the impact of merger** — "In order to fully analyze the impact, the company owners must compare the stand-alone acquirer to the newly combined business. An effective way of doing this is through EPS accretion/dilution. This is a simple test that shows whether the proposed deal will increase or decrease the post-transaction earnings per share (EPS) for the buyer. Using pro forma calculations to estimate the benefit of a merger or acquisition is important as it allows the acquirer to determine what price he is willing/ able to pay."
- "Revenue synergies: Synergies that primarily improve the company's revenue-generating ability. For example, market expansion, production diversification, and R&D activities are only a few factors that can create revenue synergies. Cost synergies: Synergies that reduce the company's cost structure. Generally, a successful merger may result in economies of scale, access to new technologies, and even elimination of certain costs. All these events may improve the cost structure of a company."
- **Types of Mergers** — "The term chosen to describe the merger depends on the economic function, purpose of the business transaction and relationship between the merging companies. There are generally five different types of commonly-referred to types of business combinations: 1. Horizontal merger: A merger between companies that are in direct competition with each other in terms of product lines and markets 2. Vertical merger: A merger between companies that are along the same supply chain (e.g., a retail company in the auto parts industry merges with a company that supplies raw materials for auto parts.) 3. Market-extension merger: A merger between companies in different markets that sell similar products or services 4. Product-extension merger: A merger between companies in the same markets that sell different but related products or services 5. Conglomerate merger: A merger between companies in unrelated business activities (e.g., a clothing company buys a software company)"
- **Deal Structuring** paragraph (as above).
- "The mergers process has many steps and can often take anywhere from 6 months to several years to complete. Selling or buying a business can be painstaking. Having the right professionals on your side of the deal can make it a lot easier."
- The full "Work with you to prepare your company to be sold; Value your company; …" sell-side list is repeated verbatim on this page. FLAG: sell-side service list re-used on the Mergers page where it does not fit.
- "We help identify key risks and rewards throughout the life cycle, even for the most complex deals… Our team of specialists helps you focus on the key questions during the critical stages of planning and executing a merger."
- (capital markets, financial modelling, market-practice, "Our team can engage with you to:", value-proposition boilerplate — all as above)

Featured Experts - Mergers: Ajay Mavinkurve; Chennakeshav (Keshav) Adya; Sabapaty (Saba) Suryanarayanan; Kieran Bourke; Freddie Tshiaba; Mike Kemball; Craig Tingle; Marco Salvini; Thomas Peutz; Thu Nga Haskovcova; Priya Shah; Suryadeep Nain.

Transactions: identical set of six to the Sell/Buy pages.

#### Post-Merger Integration (PMI) — `m-and-a/post-merger-integration-pmi.html` (200)
- "The key skills required during the various phases of an M&A cycle are vastly different. While the initial phases are focused on building a business case for the deal and the financial benefit resulting from the transaction, the planning and implementation phases require target operating model design, ongoing operations and change management with emphasis on combining the two organizations as efficiently and effectively as possible."
- "The broad steps for a PMI are fairly standard in terms of setting up an IMO and planning post-merger operations. The difference between a successful Integration which achieves or exceeds synergy goals and one that fails is distinguished by a two-pronged focus on value and change executed in a controlled manner and with support and attention from leadership. In this environment, it is the role of the integration management office and the integration project team to ensure that all functional organizations are engaged and project initiatives are managed collaboratively to ensure successful, efficient operations."
- "We help identify key risks and rewards throughout the acquisition life cycle, even for the most complex deals. We help you align deals with your strategic business objectives, maintain compliance and enhance value from integration and potential upside opportunity. Our team of specialists helps you focus on the key questions during the critical stages of planning and executing an acquisition."
- "A value-focused change management approach is the key to an accretive and seamless integration."
- "Value-focused change management includes identifying cultural strengths and weaknesses, and defining how to leverage them to overcome the barriers to changes. This requires a disciplined and structured process, as well as creating a detailed plan beginning with day one and continuing through each phase of the integration process. This plan should include essential go/no go checks at each stage, focusing on the financial view and tracking targeted synergy benefits."
- "After the deal is announced, the first action should be developing an integration project strategy and setting up an integration management office. Designing the team, tools, time lines and governance is critical for ensuring that all components of the planning process are effective. This includes creating a company-wide stakeholder engagement plan, and ensuring the key and strongest leaders are involved and fully committed to the integration."
- "Merger of two entities can become demanding from a personnel and financial perspective, and can quickly go out of control if high level goals and future aspirations are not outlined quickly by management. Quick and clear decisions on target operating model and required synergies will establish follow-up processes that can then be managed. Various functions will face challenges, but having a mitigation plan for potential risks in tandem with appropriate senior management involvement will ensure that these functions are prepared for any complications."
- Explicit service list (a real `<ul>` on this page):
  - Setup and operate a project management office for integration
  - Portfolio analysis - consolidation, rationalization, management etc.
  - HR Organization structure design and review
  - Policy and procedure integration
  - Vendor consolidation / service level review
  - IT Enterprise architecture design and review
- (financial modelling boilerplate, value-proposition boilerplate)

Featured Experts heading on this page reads **"Featured Experts - Buy a Business - M&A Buy-side"**.
FLAG: wrong heading — this is the PMI page. Names listed: Ajay Mavinkurve; Chennakeshav (Keshav) Adya; Freddie Tshiaba; Mike Kemball; Craig Tingle; Sabapaty (Saba) Suryanarayanan; Kieran Bourke; Marco Salvini; Thomas Peutz; Thu Nga Haskovcova; Subhash Baliga; Priya Shah; Suryadeep Nain.

Transactions: identical set of six to the Sell/Buy/Mergers pages.

---

## 3. Strategy
Source: https://adancorporate.com/en-uk/strategy/index-strategy.html (200)
`<title>`: **Index - Strategy | Adan Corporate**

### Positioning statement
NONE PRESENT. Bare `<h2>Index - Strategy</h2>` with an empty subheading span, then the four grids.

### Sub-services linked, grouped exactly as the page groups them

**Index - Strategy & Planning**
- Deal Strategy → `strategy/deal-strategy-and-planning.html`
- Business Strategy → `strategy/business-strategy-and-planning.html`
- Corporate Strategy → `strategy/corporate-strategy-and-planning.html`
- Growth Strategy → `strategy/growth-strategy-and-planning.html`
- Marketing Strategy → `strategy/marketing-strategy-and-planning.html`
- Risk Strategy → `strategy/risk-strategy-and-planning.html`
- International Expansion → `strategy/international-expansion.html`

**Index - Strategy Services**
- Devil's Advocate-Red Team → `strategy/devil-s-advocate-and-red-teaming.html`
- Pitch preparation → `strategy/pitch-preparation-king-s-speech.html`
- Geopolitical Strategy → `strategy/geopolitical-strategy.html`
- Future visioning → `strategy/future-visioning.html`
- Decision Facilitation → `strategy/decision-facilitation.html`

**Index - NED & Board Advisory Services**
- Non-Executive Directors (NED) → `strategy/non-executive-directors-ned.html`
- Board Advisors → `strategy/board-advisors.html`
- Mentors → `strategy/mentors.html`

**Index - Interim Management**
- Interim CEO / Managing Director → `strategy/interim-ceo-managing-director.html`
- Interim CFO → `strategy/interim-cfo.html`
- Interim Sales Head → `strategy/interim-sales-head.html`
- Interim CMO → `strategy/interim-cmo.html`
- Interim COO → `strategy/interim-coo.html`
- Interim CTO → `strategy/interim-cto.html`
- Interim CRO → `strategy/interim-cro.html`

Cross-check against `old-urls.txt`: all 22 non-index `strategy/*` URLs are linked. No orphans.

**FLAG — MAJOR:** all seven Interim Management pages are empty placeholders. Each returns HTTP 200
but the only body content is the heading and paragraph **"New content is being added"**. Verified on:
`interim-ceo-managing-director.html`, `interim-cfo.html`, `interim-cmo.html`, `interim-coo.html`,
`interim-cro.html`, `interim-cto.html`, `interim-sales-head.html`. There is **no source copy at all**
for the entire Interim Management sub-pillar. `board-advisors.html` and `mentors.html` do have content.

FLAG: the page title on `pitch-preparation-king-s-speech.html` is navigated as "Pitch preparation";
the URL slug references "King's Speech". Client should confirm which name is intended.

### Sub-service prose transcribed

#### Corporate Strategy — `strategy/corporate-strategy-and-planning.html` (200)
- "A corporate strategy entails a clearly defined, long-term vision that organizations set, seeking to create corporate value and motivate the workforce to implement the proper actions to achieve customer satisfaction. In addition, corporate strategy is a continuous process that requires a constant effort to engage investors in trusting the company with their money, thereby increasing the company's equity. Organizations that manage to deliver customer value unfailingly are those that revisit their corporate strategy regularly to improve areas that may not deliver the aimed results."
- "Corporate Strategy takes a portfolio approach to strategic decision making by looking across all of a firm's businesses to determine how to create the most value. In order to develop a corporate strategy, firms must look at how the various business they own fit together, how they impact each other, and how the parent company is structured in order to optimize human capital, processes, and governance. Corporate Strategy builds on top of business strategy, which is concerned with the strategic decision making for an individual business."
- "There are several important components of corporate strategy that leaders of organizations focus on. The main tasks of corporate strategy are: 1. Allocation of resources 2. Organizational design 3. Portfolio management 4. Strategic tradeoffs"
- "Corporate Strategy is different than business strategy as it focuses on how to manage resources, risk and return across a firm, as opposed to looking at competitive advantages."
- "Leaders responsible for strategic decision making have to consider many factors, including allocation of resources, organizational design, portfolio management, and strategic tradeoffs."
- "By optimizing all of the above factors, a leader can hopefully create a portfolio of businesses that is worth more than just the sum of the parts."
- (financial modelling boilerplate, value-proposition boilerplate)

Featured Experts - Corporate Strategy: Ajay Mavinkurve; Chennakeshav (Keshav) Adya; Mike Kemball; Craig Tingle; Nav Kaplish; Freddie Tshiaba; Marco Salvini; Suryadeep Nain; Sabapaty (Saba) Suryanarayanan.

No "completed transactions" section on the Strategy sub-pages fetched.

#### Growth Strategy — `strategy/growth-strategy-and-planning.html` (200)
- "Whether it's customers, revenue, locations, leads, mentions, or profits, you've got to play the growth game if you want to be successful in business."
- "Growth is fundamental to a business' survival. Roughly 66% of businesses survive their first two years in operation, 50% make it to the five-year mark, and just 33% will celebrate their tenth anniversary. Those numbers are remarkably consistent across most industries -- but they also highlight how important it is to plan for growth from day one."
  - **FLAG: 66% / 50% / 33% survival statistics are stated with no source, no date and no geography. Needs a citation or removal before reuse.**
- "There are various ways to grow a company. These ways are clearly presented in the Ansoff model, a strategic tool used during the development of a growth strategy. It is a good basis for considering the strategic development of your company."
- "The Ansoff growth matrix is comprised of two axes: 1. Products: Which products do you currently offer, and which new products would you like to offer in the future? 2. The market: Which markets do you currently serve, and which markets would you like to serve in the future?"
- "The four main growth strategies are as follows: **1. Market penetration** The aim of this strategy is to increase sales of existing products or services on existing markets, and thus to increase your market share."
- "**2. Market development** This means increasing sales of existing products or services on previously unexplored markets. Market expansion involves an analysis of the way in which a company's existing offer can be sold on new markets, or how to grow the existing market."
- "**3. Product development** The objective is to launch new products or services on existing markets. Product development may be used to extend the offer proposed to current customers with the aim of increasing their turnover."
- "**4. Diversification** This means launching new products or services on previously unexplored markets. Diversification is the riskiest strategy. It involves the marketing, by the company, of completely new products and services on a completely unknown market. Diversification may be divided into further categories: a. Horizontal diversification b. Vertical diversification c. Concentric diversification d. Conglomerate diversification"
- "Based on the strategies used and its ambitions, a company can choose one of these four strategies. This choice especially depends on the approach of a company's product/market and the latter's taste for risk."
- Variant boilerplate (note: "cover all circumstances", not "build robust, transparent financial models"): "Our experienced team cover all circumstances and across a wide range of sectors. Our approach is to start with a clear understanding of the situation and design a bespoke model using proven methodologies and techniques. The advantages of our models include creating outputs and usability that are designed specifically for the user, as well as providing the flexibility of assumptions to perform sensitivity analysis."
- Variant value proposition: "Our experts partner with clients, providing perspective not only on immediate value and impact, but on long-term implications. We work closely with management and other advisers to leverage and complement their knowledge and ensure maximum impact, and actively support implementation and skill building."

Featured Experts - Growth Strategy: Ajay Mavinkurve; Chennakeshav (Keshav) Adya; Mike Kemball; Raju Venkataraman; Marco Salvini; Craig Tingle; Nav Kaplish; Freddie Tshiaba.

#### Non-Executive Directors (NED) — `strategy/non-executive-directors-ned.html` (200)
- "A non-executive director (NED, also NXD) is a member of the board of directors who does not form part of the executive management. NEDs usually stand back from the day-to-day running of the business. The NED must however be careful as there is no legal distinction between executive directors and non-executive directors under company law. As a result NEDs have the same legal duties, responsibilities and potential liabilities as the executive management."
- "The role of the NED has changed in the last 25 years when Tiny Rowland notoriously compared non-executives to trinkets on Christmas trees. Board meetings were amiable in nature and were often followed by a good lunch. The role today is much more professional. NEDs must challenge; to do so they must gain a detailed understanding of the company."
  - FLAG: named third-party reference (Tiny Rowland) and an undated "last 25 years" claim on a page last modified 2020/2021.
- "**NEDs are the custodian of corporate governance.**"
- "The role of non-executive directors is broad. Non-executive directors are not employed by the company but appointed through a letter of appointment. They challenge, question and monitor the CEO and senior management; they bring an independent perspective to decision-making; they hold senior management to account; they also support and mentor the CEO and senior management. They are a critical friend and must act in the interests of the company's stakeholders (e.g. shareholders, employees, pensioners, suppliers)."
- "Non-executive directors typically sit on the main board and have responsibility on the board sub-committees (e.g. Audit Committee, Risk Committee, Nomination Committee, Remuneration Committee, etc.)."
- "A key role is being able to challenge as well as support. The NED must be prepared to ask difficult questions and be persistent and stimulate debate. The NED must spend the time to understand the business and be well prepared for meetings. That is not just reading the board papers but possibly asking questions in advance of meetings. In fact they can often assist by ensuring the board pack is fit for purpose and thereby guide the board to focus on the issues that are important and require input from the directors."
- "**1. Key responsibilities** The key responsibilities of non-executive directors are: a. Strategy: constructively challenging and contributing to the development of strategy. b. Performance: monitor and scrutinise the performance of management in meeting agreed goals and objectives. c. Risk: satisfying themselves that financial information is accurate and that financial controls and systems of risk management are robust and defensible. d. People: determining appropriate levels of remuneration of executive directors; having a prime role in appointing; where necessary removing senior management; and planning for success"
  - FLAG: "planning for success" — the standard UK Corporate Governance Code wording is "planning for succession". Likely a typo in source; sentence also ends without a full stop.
- "**2. Time Commitment** Non-Executive Directors will be required to: a. Undertake that they will be able to allocate sufficient time to meet the expectations of the role, as set out in their letter of appointment, or as agreed from time to time. b. Disclose their other significant commitments to the Board before appointment, with a broad indication of the time involved. c. Inform the Board of any subsequent changes."
- "Non-executive directors receive compensation, which tends to be a function of the size of the company, time commitment and complexity of the role. The demand for non-executive directors has increased in recent years and so as the demand for business leaders to transition to non-executive roles."
- "**3. Duration of appointment** Non-Executive Directors are typically appointed for an initial term of three years. The term may be renewed if both the director and the Board agree. Appointments are subject to the provisions of the Companies Act and the articles of association, including those relating to election/re-election by the Association Members at annual general meetings and the removal of directors."
- "**4. Independence** The Board will determine whether the director is independent in character and judgement and whether there are relationships or circumstances which are likely to affect, or could appear to affect, the director's judgement. The Board will state its reasons if it determines that a director is independent notwithstanding the existence, of relationships or circumstances which may appear relevant to its determination"
- "If you are appointing a non-executive director, you need to articulate why, and assess what skills and experience you need on the Board to help you grow the business. Make sure you take the appointment process seriously and understand the value the right NED can bring to you as a management team (this includes personal development) as well as the business as a whole."
- "Appointing the wrong person as an NED can have a terrible impact on both the individual and the company. The appointment of an NED should be seen by the board as a valuable, strategic appointment, not a box ticking exercise."
- (variant modelling boilerplate + variant value proposition, as on the Growth Strategy page)

Featured Experts - Non-Executive Directors (NED): Ajay Mavinkurve; Chennakeshav (Keshav) Adya; Sabapaty (Saba) Suryanarayanan; Raju Venkataraman; Marco Salvini; Thomas Peutz; Subhash Baliga; Mike Kemball; Craig Tingle; Nav Kaplish; Freddie Tshiaba.

#### Interim CFO — `strategy/interim-cfo.html` (200 but EMPTY)
Entire page body: heading "New content is being added", paragraph "New content is being added",
then the standard "See what we can do for you" CTA. **No source copy.** Same for the other six
Interim Management pages (see FLAG above).

---

## 4. Risk Management
Source: https://adancorporate.com/en-uk/risk-management/index-risk-management.html (200)
`<title>`: **Index - Risk Management | Adan Corporate**

### Positioning statement
NONE PRESENT. Bare `<h2>Index - Risk Management</h2>` with an empty subheading span, then six grids.

### Sub-services linked, grouped exactly as the page groups them

**Index - Enterprise Risk**
- Enterprise Risk Management → `risk-management/enterprise-risk-management.html`
- Risk Management Strategy → `risk-management/risk-management-strategy.html`
- Operational Risk → `risk-management/operational-risk.html`
- Risk Reporting → `risk-management/risk-reporting.html`
- Risk Management Training → `risk-management/risk-management-training.html`

**Index - Financial Risk Management**
- Market Risk → `risk-management/market-risk.html`
- Credit Risk → `risk-management/credit-risk.html`
- Regulatory Risk → `risk-management/regulatory-risk.html`
- Treasury and Liquidity Risk → `risk-management/treasury-liquidity-risk.html`

**Index - Business Risk Management**
- Risk Management for PE Funds → `risk-management/risk-management-for-pe-funds.html`
- Risk Management for SMEs → `risk-management/risk-management-for-smes.html`
- Devil's Advocate-Red Team → `strategy/devil-s-advocate-and-red-teaming.html` *(cross-link)*
- Geopolitical Risk → `risk-management/geopolitical-risk.html`

**Index - Technology Risk and Governance**
- IT governance → `risk-management/it-governance.html`
- GRC - Governance, Risk and Compliance → `risk-management/grc-governance-risk-and-compliance.html`
- ERP control and assurance → `risk-management/erp-control-and-assurance.html`
- Data assurance → `risk-management/data-assurance.html`
- Business Continuity → `risk-management/business-continuity.html`
- Disaster Recovery & Resilience → `risk-management/disaster-recovery-and-resilience.html`
- Vendor Risk → `risk-management/vendor-risk.html`
- Cloud Risk → `risk-management/cloud-risk.html`

**Index - Internal Audit**
- Internal Audit and Controls → `risk-management/internal-audit.html`

**Index - Compliance and Regulatory**
- SOX Advisory → `risk-management/sox-advisory.html`
- SOX Implementation → `risk-management/sox-implementation.html`
- ISO 27001 → `risk-management/iso-27001.html`
- SOC1 and SOC2 → `risk-management/soc1-and-soc2.html`

Cross-check against `old-urls.txt`: all 25 non-index `risk-management/*` URLs are linked. No orphans.

FLAG: `old-urls.txt` also contains `/en-uk/covid-19/covid-19-risk-management.html`, which is
risk-related but is **not** linked from this pillar index. Orphaned COVID-19 page — almost certainly
should be retired on the new site; confirm with client.

FLAG: the "Index - Internal Audit" group contains exactly one tile. Inconsistent with the other
groups and a weak structure to carry forward.

FLAG: casing is inconsistent within the Technology group — "IT governance", "ERP control and
assurance", "Data assurance" are sentence case while "Business Continuity", "Vendor Risk",
"Cloud Risk", "Disaster Recovery & Resilience" are title case.

### Sub-service prose transcribed

#### Enterprise Risk Management — `risk-management/enterprise-risk-management.html` (200)
- "Risk management encompasses the identification, analysis, and response to risk factors that form part of the life of a business, and it is usually done with its best interest in mind. Effective risk management means total control of future outcomes proactively rather than reactively. Therefore, effective risk management offers the potential to reduce both the possibility of a risk occurring and its impact."
- "Enterprise risk management (ERM) in business includes the methods and processes used by organizations to manage risks and seize opportunities related to the achievement of their objectives. ERM provides a framework for risk management, which typically involves identifying particular events or circumstances relevant to the organization's objectives (risks and opportunities), assessing them in terms of likelihood and magnitude of impact, determining a response strategy, and monitoring process. By identifying and proactively addressing risks and opportunities, business enterprises protect and create value for their stakeholders, including owners, employees, customers, regulators, and society overall."
- "ERM can also be described as a risk-based approach to managing an enterprise, integrating concepts of internal control, the Sarbanes-Oxley Act, data protection and strategic planning. ERM is evolving to address the needs of various stakeholders, who want to understand the broad spectrum of risks facing complex organizations to ensure they are appropriately managed. Regulators and debt rating agencies have increased their scrutiny on the risk management processes of companies."
- **ERM Frameworks:** "There are various important ERM frameworks, each of which describes an approach for identifying, analyzing, responding to, and monitoring risks and opportunities, within the internal and external environment facing the enterprise." Named: Casualty Actuarial Society framework; COSO ERM framework; ISO 31000 : the new International Risk Management Standard; RIMS Risk Maturity Model.
- **Risk Responses:** "Management selects a risk response strategy for specific risks identified and analyzed, which may include: **Avoidance:** exiting the activities giving rise to risk **Reduction:** taking action to reduce the likelihood or impact related to the risk **Alternative Actions:** deciding and considering other feasible steps to minimize risks **Share or Insure:** transferring or sharing a portion of the risk, to finance it **Accept:** no action is taken, due to a cost/benefit decision. Monitoring is typically performed by management as part of its internal control activities, such as review of analytical reports or management committee meetings with relevant experts, to understand how the risk response strategy is working and whether the objectives are being achieved."
- **Risk Functions:** "The primary risk functions in large corporations that may participate in an ERM program typically include: Strategic planning - identifies external threats and competitive opportunities, along with strategic initiatives to address them; Marketing - understands the target customer to ensure product/service alignment with customer requirements; Compliance & Ethics - monitors compliance with code of conduct and directs fraud investigations; Accounting / Financial compliance - directs the Sarbanes-Oxley Section 302 and 404 assessment, which identifies financial reporting risks; Law Department - manages litigation and analyzes emerging legal trends that may impact the organization; Insurance - ensures the proper insurance coverage for the organization; Treasury - ensures cash is sufficient to meet business needs, while managing risk related to commodity pricing or foreign exchange; Operational Quality Assurance - verifies operational output is within tolerances; Operations management - ensures the business runs day-to-day and that related barriers are surfaced for resolution; Credit - ensures any credit provided to customers is appropriate to their ability to pay; Customer service - ensures customer complaints are handled promptly and root causes are reported to operations for resolution; Internal audit - evaluates the effectiveness of each of the above risk functions and recommends improvements."
- **Current issues in ERM:** "The risk management processes of corporations worldwide are under increasing regulatory and private scrutiny. Risk is an essential part of any business. Properly managed, it drives growth and opportunity. Executives struggle with business pressures that may be partly or completely beyond their immediate control, such as distressed financial markets; mergers, acquisitions and restructurings; disruptive technology change; geopolitical instabilities; and the rising price of energy." Listed: Sarbanes-Oxley Act requirements; NYSE corporate governance rules; ERM and corporate debt ratings; IFC Performance Standards; Data Privacy.
- **Common challenges include:** "Identifying executive sponsors for ERM. Establishing a common risk language or glossary. Describing the entity's risk appetite (i.e., risks it will and will not take). Identifying and describing the risks in a "risk inventory". Implementing a risk-ranking methodology to prioritize risks within and across functions. Establishing a risk committee and or Chief Risk Officer (CRO) to coordinate certain activities of the risk functions. Establishing ownership for particular risks and responses. Demonstrating the cost-benefit of the risk management effort. Developing action plans to ensure the risks are appropriately managed. Developing consolidated reporting for various stakeholders. Monitoring the results of actions taken to mitigate risk. Ensuring efficient risk coverage by internal auditors, consulting teams, and other evaluating entities. Developing a technical ERM framework that enables secure participation by 3rd parties and remote employees."
- Risk-pillar boilerplate: "A risk management strategy provides a structured and coherent approach to identifying, assessing and managing risk or uncertainties followed up by minimizing, monitoring and controlling the impact of risk realities or enhancing the opportunity potential by applying coordinated and economical resources."
- Value proposition variant: "Our experts partner with clients on **risk management**, providing perspective not only on immediate value and impact, but on long-term implications. We work closely with management and other advisers to leverage and complement their knowledge and ensure maximum impact, and actively support implementation and skill building."

Featured Experts - Enterprise Risk Management: Kieran Bourke; Dipak Khot; Ajay Mavinkurve; Nav Kaplish; Priya Shah; Preethi Hari; Chennakeshav (Keshav) Adya.
No transactions section on the Risk pages fetched.

#### Internal Audit and Controls — `risk-management/internal-audit.html` (200). `<title>`: "Internal Audit | Adan Corporate"
- "Internal auditing is the independent and objective evaluation of an organisation's internal controls to effectively manage risk within its risk appetite." (note: "organisation's" — British spelling here, American spelling elsewhere on the same page)
- "It helps an organization accomplish its objectives by bringing a systematic, disciplined approach to evaluate and improve the effectiveness of risk management, control and governance processes."
- "Internal auditing achieves this by providing insight and recommendations based on analyses and assessments of data and business processes. With commitment to integrity and accountability, internal auditing provides value to governing bodies and senior management as an objective source of independent advice."
- "The scope of internal auditing within an organization is broad and may involve topics such as an organization's governance, risk management and management controls over: efficiency/effectiveness of operations (including safeguarding of assets), the reliability of financial and management reporting, and compliance with laws and regulations. Internal auditing may also involve conducting proactive fraud audits to identify potentially fraudulent acts; participating in fraud investigations under the direction of fraud investigation professionals, and conducting post investigation fraud audits to identify control breakdowns and establish financial loss."
- "Internal auditing activity is primarily directed at evaluating internal control. Under the COSO Framework, internal control is broadly defined as a process, effected by an entity's board of directors, management, and other personnel, designed to provide reasonable assurance regarding the achievement of the following core objectives for which all businesses strive: 1. Effectiveness and efficiency of operations. 2. Reliability of financial and management reporting. 3. Compliance with laws and regulations. 4. Safeguarding of Assets. Management is responsible for internal control, which comprises five critical components: 1. the control environment; 2. risk assessment; 3. risk focused control activities; 4. information and communication; and 5. monitoring activities."
- "Managers establish policies, processes, and practices in these five components of management control to help the organization achieve the four specific objectives listed above. Internal auditors perform audits to evaluate whether the five components of management control are present and operating effectively, and if not, provide recommendations for improvement."
- **Role in risk management:** "Under the COSO enterprise risk management (ERM) Framework, an organization's strategy, operations, reporting, and compliance objectives all have associated strategic business risks - the negative outcomes resulting from internal and external events that inhibit the organization's ability to achieve its objectives. Management assesses risk as part of the ordinary course of business activities such as strategic planning, marketing planning, capital planning, budgeting, hedging, incentive payout structure, credit/lending practices, mergers and acquisitions, strategic partnerships, legislative changes, conducting business abroad, etc. Sarbanes-Oxley regulations require extensive risk assessment of financial reporting processes."
- "The internal audit function may help the organization address its risk of fraud via a fraud risk assessment, using principles of fraud deterrence. Internal auditors may help companies establish and maintain Enterprise Risk Management processes. This process is highly valued by many businesses for establishing and implementing effective management systems and ensuring quality is maintained & professional standards are met Internal auditors also play an important role in helping companies execute a SOX 404 top-down risk assessment. In these latter two areas, internal auditors typically are part of the risk assessment team in an advisory role."
  - FLAG: missing full stop — "professional standards are met Internal auditors also play…".
- **Internal Audit Execution:** "A typical Internal Audit Assignment involves the following steps: 1. Establishing and communicating the scope and objectives of the Audit to appropriate members of management. 2. Developing an understanding of the business area under review - this includes objectives, measurements & key transaction types and involves interviews and a review of documents - flowcharts and narratives may be created, if necessary. 3. Describing the key risks facing the business activities within the scope of the Audit. 4. Identifying management practices in the five components of control used to ensure that each key risk is properly controlled and monitored. Internal 5. Audit Checklist[13] can be a helpful tool to identify common risks and desired controls in the specific process or specific industry being audited. 6. Developing and executing a risk-based sampling and testing approach to determine whether the most important management controls are operating as intended. 7. Reporting issues and challenges identified and negotiating action plans with the management to address these problems. 8. Following-up on reported findings at appropriate intervals. Internal Audit Departments maintain a follow-up database for this purpose. 9. Audit Assignment length varies based on the complexity of the activity being audited and Internal Audit resources available. Many of the above steps are iterative and may not all occur in the sequence indicated."
  - **FLAG — STRONG EVIDENCE OF COPY-PASTE FROM WIKIPEDIA:** the string "**Internal 5. Audit Checklist[13]**" contains a stray Wikipedia-style citation marker `[13]` and a broken list item split across numbers 4 and 5. This paragraph appears to be lifted verbatim from a public encyclopaedia article. The same pattern (textbook explainer voice, no first-person) runs through much of the Risk and M&A copy. **Legal/plagiarism review required before any of this is reused.**
- "In addition to assessing business processes, specialists called Information Technology (IT) Auditors review Information technology controls"
- **Internal audit reports:** "Internal auditors typically issue reports at the end of each audit that summarize their findings, recommendations, and any responses or action plans from management. An audit report may have an executive summary'a body that includes the specific issues or findings identified and related recommendations or action plans, and appendix information such as detailed graphs and charts or process information. Each audit finding within the body of the report may contain five elements, sometimes called the "5 C's": 1. Condition: What is the particular problem identified? 2. Criteria: What is the standard that was not met? The standard may be a company policy or other benchmark. 3. Cause: Why did the problem occur? 4. Consequence: What is the risk/negative outcome (or opportunity foregone) because of the finding? 5. Corrective action: What should management do about the finding? What have they agreed to do and by when?"
  - FLAG: "executive summary'a body" — mangled punctuation verbatim in source (an em-dash lost in encoding).
- "The recommendations in an internal audit report are designed to help the organization achieve effective and efficient governance, risk and control processes associated with operations objectives, financial and management reporting objectives; and legal/regulatory compliance objectives."
- (risk-pillar boilerplate paragraph, as above)
- "Audit findings and recommendations may also relate to particular assertions about transactions, such as whether the transactions audited were valid or authorized, completely processed, accurately valued, processed in the correct time period, and properly disclosed in financial or operational reporting, among other elements."
- **Adan Corporate's Value Proposition** — "Our experts partner with clients on internal audit, providing perspective not only on immediate value and impact, but on long-term implications. We work closely with management and other advisers to leverage and complement their knowledge and ensure maximum impact, and actively support implementation and skill building."
- "We have provided full range of Internal Audit services to our clients including fully outsourced, co-sourced, and loaned staff internal audit functions for multiple companies in various industries. Although each project is unique, we typically report to our client's Audit Committee or to the Head of Internal Audit, and as part of our service offerings, we have performed various internal audit activities such as enterprise risk assessments, fraud risk assessments, operational, tactical, regulatory, forensic, business transformation, strategic internal audits, and many other value-added activities."
- "Under a co-sourcing arrangement, we will work directly with your internal audit department under our tried and true method of full team integration; one team, one goal. We can provide specialized skills and also augment short-term staffing shortages on ad-hoc reviews and projects."
- "We can assist your organization in developing an internal audit approach focused on high-risk areas rather than the traditional compliance approach. Oftentimes, an organization retains a high-level resource such as a lead internal auditor who is responsible for the organization's internal audit process and communications with the Audit Committee. We assist by conducting all the agreed-upon internal audit reviews throughout the year."

Featured Experts - Internal Audit: Kieran Bourke; Nav Kaplish; Priya Shah; Preethi Hari.

#### SOX Advisory — `risk-management/sox-advisory.html` (200)
- **What is SOX compliance?** "The Sarbanes-Oxley Act of 2002, also known as the "Public Company Accounting Reform and Investor Protection Act" (in the Senate) and "Corporate and Auditing Accountability, Responsibility, and Transparency Act" (in the House) and more commonly called Sarbanes-Oxley, Sarbox or SOX, is a United States federal law that set new or expanded requirements for all U.S. public company boards, management and public accounting firms. A number of provisions of the Act also apply to privately held companies, such as the willful destruction of evidence to impede a federal investigation."
- "The bill, which contains eleven sections, was enacted as a reaction to a number of major corporate and accounting scandals, including Enron and WorldCom. The sections of the bill cover responsibilities of a public corporation's board of directors, add criminal penalties for certain misconduct, and require the Securities and Exchange Commission to create regulations to define how public corporations are to comply with the law."
- **The basics of SOX compliance** — "While the details of the Sarbanes-Oxley Act are complex, "SOX compliance" refers to the annual audit in which a public company is obligated to provide proof of accurate, data-secured financial reporting."
- "SOX reporting specifically involves IT departments because adequate SOX internal controls require complete file safety and full visibility into financial record history-conditions which require each IT employee to understand his or her role in demonstrating SOX compliance. All public companies must comply with SOX, both on the financial side and on the IT side. The way in which IT departments store corporate electronic records changed as a result of SOX."
- **What SOX Compliance Means for Senior Management** — "Formal penalties for non-compliance with SOX can include: - Fines - Removal from listings on public stock exchanges - Invalidation of Directors and Officers (D&O) insurance policies - **CEOs and CFOs who willfully submit an incorrect certification to a SOX compliance audit can face fines of up to $5 million and up to 20 years in jail.**"
- **Major Provisions** — "Three of its key provisions are commonly referred to by their section numbers: Section 302, Section 404, and Section 802."
- **Section 302 Corporate Responsibility for Financial Reports** — "This section relates to a company's financial reporting. The act requires a company's CEO and CFO to personally certify that all records are complete and accurate. Specifically, they must confirm that they accept personal responsibility for all internal controls and have reviewed these controls in the past 90 days."
- **Section 404 Management Assessment of Internal Controls** — "This section states that annual disclosures and quarterly updates must be provided to shareholders and the U.S. Securities and Exchange Commission. It stipulates further requirements for the monitoring and maintenance of internal controls related to the company's accounting and financials. It requires businesses to have an annual audit of these controls performed by an outside firm. This audit assesses the effectiveness of all internal controls and reports its findings back directly to the SEC."
- **Section 802 for Record Keeping** — "This section contains the three rules that affect recordkeeping. The first deals with destruction and falsification of records. The second strictly defines the retention period for storing records. The third rule outlines the specific business records that companies need to store, which includes electronic communications."
- **What SOX Compliance Means for Business teams** — "Besides the financial side of a business, such as audits, accuracy, and controls, the SOX Act of 2002 also outlines requirements for information technology (IT) departments regarding electronic records. The act does not specify a set of business practices in this regard but instead defines which company records need to be kept on file and for how long. The standards outlined in the SOX Act of 2002 do not specify how a business should store its records, just that it's the company IT department's responsibility to store them."
- (repeat of the internal-audit fraud-risk-assessment paragraph)
- "The best plan of action for SOX compliance is to have the correct security controls in place to ensure that financial data is accurate and protected against loss. Developing best practices and relying on the appropriate tools helps businesses automate SOX compliance and reduce SOX management costs."
- **What SOX Compliance Means for IT teams** — "In a SOX IT audit, the IT department proves compliance by providing documentation showing that its employer has met mandated financial transparency and data security thresholds."
- **The 3 rules of SOX** — "Three rules in Section 802 of SOX affect the management of electronic records." — **Record Destruction:** "This rule concerns the destruction, alteration, or falsification of records and the resulting penalties." — **Record Retention:** "A rule that defines the retention period for records storage; best practices suggest corporations securely store all business records using the same guidelines as public accountants." — **Record Types:** "This rule outlines the type of business records that need to be stored, including all business records, communications, and electronic communications."
- "To align with SOX regulation law, IT departments must be familiar with the security, access privilege, and log management standards required for their financial records. The first step in cementing SOX internal controls is creating "control environment", which should: 1. Acknowledge the need for increased transparency, internal balances, and regulation. 2. Strive to perform control actions that mitigate risk and ensure the inviolability and reliability of financial information."
- **Adan Corporate's Value Proposition** — "Understand how your business operates and identify areas in which technology may provide benefits via automation / Means-test ideas and work with your executive to build a robust technology plan / Provide technical advice on discrete issues such as platform choice, permissions, project structure, security and risk mitigation / Begin implementation or provide management assistance to existing projects. We are confident that engaging our consulting services will be an incredible value-add as your business positions itself for the future."
  - FLAG: this value proposition is about technology/automation consulting and reads as if pasted from a different (IT consulting) service page. It does not describe SOX advisory.
- "Our experts partner with clients on SOX assesments and implementations, providing perspective not only on immediate value and impact, but on long-term implications…" — FLAG: "assesments" typo verbatim in source.
- **Adan Corporate's Approach to SOX implementations** — "Our approach applies a top-down risk-based methodology that helps clients focus on the right risks and maximize efficiencies. We provide a full range of SOX advisory services, which address your business and compliance needs:
  + End-to-end SOX project management
  + Conduct risk assessment (as required under AS-5)
  + Assist corporates to document and evaluate internal controls
  + Document "as-is" processes throughout the organization, assess gaps in controls, and determine appropriate steps to remediate control gaps
  + Perform key controls testing
  + Identify Best Practices that can be integrated across the organization
  + Assist in developing an internal control framework
  + Assist in developing a risk management framework
  + Train personnel on COSO, methods of documenting controls, etc.
  + Reinforce continual improvement and analysis process
  + Institutionalize self-assessment"
  - This is the strongest, most first-person, most genuinely proprietary service list on any Risk page. Good source for new capability copy.

#### GRC - Governance, Risk and Compliance — `risk-management/grc-governance-risk-and-compliance.html` (200)
- "Growing regulatory environment, higher business complexity and increased focus on accountability have led enterprises to pursue a broad range of governance, risk and compliance initiatives across the organization. However, these initiatives are uncoordinated in an era when risks are interdependent and controls are shared. As a result, these initiatives get planned and managed in silos, which potentially increases the overall business risk for the organization. In addition, parallel compliance and risk initiatives lead to duplication of efforts and cause costs to spiral out of control. Governance, Risk, and Compliance process through control, definition, enforcement, and monitoring has the ability to coordinate and integrate these initiatives."
- "A governance, risk, and compliance (GRC) framework is an effective method of identifying and mitigating threats to your company that you wouldn't even have recognized in the first place. No business wishes to be taken by surprise when an audit reveals noncompliance. Compliance risk management is aimed at helping organizations avoid such a situation."
- "Most organizations have an approach to their GRC requirements and the maturity ranges from an ad hoc structure to a robust mature framework. A successful IT GRC strategy is one that aligns itself to the organizations Objectives, Culture and Values. A mature organization has IT GRC practices as part of its Organization strategy and operations while being supported by a range of technology and knowledge base. **Adan's approach in building a successful IT GRC strategy eliminates siloed view of Information security and aims at integrated security culture and practices that better assist organizations in handling security risks and align to organization goals. Adan offers an implementable and successful Enterprise Architecture framework that has enabled our customers with a robust framework to manage Governance, Risk and Compliance successfully.**"
  - Note: one of the very few genuinely first-person, Adan-branded passages on the whole site. FLAG: uses "Adan's" / "Adan" rather than "Adan Corporate" — naming inconsistency.
- "The GRC framework is all of managing a company's overall governance, enterprise risk management, and compliance through regulations. Consider it a structured approach to aligning your business objectives with IT while effectively meeting compliance demands and managing risks. While GRC is important for all companies, it is especially crucial for those dealing with EU citizens in the aftermath of the General Data Protection Regulation (GDPR)."
- "The span of a Governance, Risk and Compliance process includes three elements: 1. **Governance** is the oversight role and the process by which companies manage and mitigate business risks 2. **Risk management** enables an organization to evaluate all relevant business and regulatory risks and controls and monitor mitigation actions in a structured manner 3. **Compliance** ensures that an organization has the processes and internal controls to meet the requirements imposed by governmental bodies, regulators, industry mandates or internal policies."
- "**1. Governance:** With an increase in activism among shareholders and increased scrutiny from the regulatory bodies, corporate boards and executive teams are more focused on governance related issues than ever before. The governance process within n organization includes elements such as definition and communication of corporate control, key policies, enterprise risk management, regulatory and compliance management and oversight (e.g., compliance with ethics and options compliance as well as overall oversight of regulatory issues) and evaluating business performance through balanced scorecards, risk scorecards and operational dashboards. A governance process integrates all these elements into a coherent process to drive corporate governance."
  - FLAG: "within n organization" typo verbatim in source.
- "**2. Risk Management:** With the recent jump in regulatory mandates and increasingly activist shareholders, many organizations have become sensitized to identifying and managing areas of risk in their business: whether it is financial, operational, IT, brand or reputation related risk. These risks are no longer considered the sole responsibility of specialists - executives and the boards demand visibility into exposure and status so they can effectively manage the organization's long-term strategies. As a result, companies are looking to systemically identify, measure, prioritize and respond to all types of risk in the business, and then manage any exposure accordingly. A risk management process provides a strategic orientation for companies of all sizes in all geographies with a formal process to identify, measure and manage risk."
- "**3. Compliance:** An initiative to comply with a regulation typically begins as a project as companies race to meet deadlines to comply with that regulation. These projects consume significant resources as meeting the deadline becomes the most important objective. However, compliance is not a one-time event - organizations realize that they need to make it into a repeatable process, so that they can continue to sustain compliance with that regulation at a lower cost than for the first deadline. When an organization is dealing with multiple regulations at the same time, a streamlined process of managing compliance with each of these initiatives is critical, or else, costs can spiral out of control and the risk of non-compliance increases. The compliance process enables organizations to make compliance repeatable and hence enables them to sustain it on an ongoing basis at a lower cost."
- **Benefits of Taking an Integrated GRC Approach** — "Many organizations find themselves managing their governance, risk and compliance initiatives in silos - each initiative managed separately even if reporting needs overlap… As a result, organizations have ended up with dozens of such systems to manage individual governance, risk and compliance initiatives, each operating in its own silo."
- "**Majority of the Fortune 1000 organizations find themselves in this situation today.** However, they are quickly finding that as the multiple risk and compliance initiatives become more intertwined from regulatory and organizational perspectives, multiple systems cause confusion due to duplicative and contradictory processes and documentation. In addition, the redundancy of work, as well as sheer expense of maintaining multiple point software solutions causes the cost of compliance to spiral out of control."
  - FLAG: unsourced "Majority of the Fortune 1000 organizations" claim.
- "By taking an integrated GRC process approach and deploying a single system… Such an approach can: * Have a dramatic positive impact on organizational effectiveness by providing a clear, unambiguous process and a single point of reference for the organization * Eliminate all redundant work in various initiatives * Eliminate duplicative software, hardware, training and rollout costs as multiple governance, risk and compliance initiatives can be managed with one software solution * Provide a "single version of the truth" available to employees, management, auditors and regulatory bodies"
- "It is critical that a GRC solution must be able to address a wide range of compliance and risk management initiatives so that an organization can leverage GRC to deploy a consistent framework across the organization for compliance and risk management. **Many vendors window dress their point solution by re-labeling it as a GRC solution or adding support for a few additional regulations to claim multi-regulatory label.**"
  - FLAG: this paragraph reads as vendor-software marketing copy, not advisory-firm copy. The page as a whole drifts into evaluating "GRC solutions" as if Adan sold software.
- **Capabilities of the GRC solution include:** "Governance - Enterprise risk management and assessment - Board compliance capabilities such as options policy compliance, ethics and policy compliance, etc. - Business performance reporting such as balanced scorecards, risk scorecards, operational controls dashboards, etc - Policy management, documentation and communication. Risk Management - Risk assessment - Risk analysis and prioritization - Root cause analysis of issues and mitigation - Risk analytics and trend analysis. Compliance - Flexible controls hierarchy - Assessments and audits - Issue tracking and remediation - Analytics. Support for complex organization models with ability to rollup at various organizational levels, while retaining the ability to cost-effectively deploy the solution within a department to enable a tactical compliance or risk initiative. Ability to support multiple regulations - corporate initiatives (SOX, risk management, ethics, policy compliance, etc.) as well as operational compliance initiatives (cGMP, HACCP, ISO 9000 etc). It is critical that a GRC solution can support a large number of governance and risk management initiatives within a company. A wrong choice would force the organization to revert to having to support multiple point solutions. Integrated document management capability."
- (risk-pillar boilerplate + standard value-proposition boilerplate "on corporate planning" — FLAG: says "corporate planning" on a GRC page)

Featured Experts - GRC - Governance, Risk and Compliance: **Nav Kaplish; Preethi Hari** (only two).
FLAG: expert coverage is very thin on GRC (2 names) versus 12 on Private Equity. Expert grids are
inconsistently populated across services.

---

## Cross-cutting observations for the rebuild

1. **There is no pillar-level positioning copy anywhere on the old site.** All four index pages are
   link grids. New pillar page hero/intro copy has to be written fresh (and signed off by the client),
   not transcribed.
2. **Roughly 60–70% of every sub-service page is shared boilerplate.** Four blocks recur verbatim across
   pillars: the financial-modelling paragraph, the "Our experts partner with clients on corporate
   planning…" value proposition, the "This insight into current market practice…" paragraph, and the
   "Our team can engage with you to: Smokejump into the situation…" list. Only the first 2–6 paragraphs
   of each page are genuinely service-specific.
3. **Much of the service-specific prose is encyclopaedic, third-person explainer text, not client-facing
   firm copy.** The stray `[13]` Wikipedia citation marker on the internal-audit page, the "In this
   article, we will look at…" opener on the mergers page, and the textbook tone throughout strongly
   suggest third-party sources. **Plagiarism/legal review before reuse is required.**
4. **Spelling is American throughout ("organization", "maximize", "favorable", "customized",
   "behavior"), despite this being the `en-uk` locale.** The only British spellings found were
   "organisation"/"organisation's" (internal-audit, 2 occurrences), "realising" (buy-a-business),
   "recognise" (IPO page) and "scrutinise" (NED page) — i.e. the source is internally inconsistent. Instruction is to keep British spellings as
   found; note that the source is predominantly American.
5. **Deal carousels are duplicated verbatim across sibling pages** (identical six deals on all four
   M&A pages; identical six on debt-financing and project-finance). Deal data should be normalised into
   a single dataset on the new site, keyed by expertise/sector tag.
6. **Entire Interim Management sub-pillar (7 pages) has zero content.**
7. Social/contact endpoints found in the footer of every page (verbatim):
   LinkedIn `https://www.linkedin.com/company/11209203`; Twitter `https://twitter.com/AdanCorpFinance`;
   Facebook `https://www.facebook.com/AdanCorpFinance`; podcast "A Done Deal Podcast"
   `https://open.spotify.com/show/2LfRgivNsxvxsWmMU4Lj3r`; RSS `https://feeds.buzzsprout.com/1408666.rss`;
   contact page `../about-us/contact-us.html`. **No email address or telephone number appears on any
   pillar or sub-service page fetched.**
8. Recurring CTA on every page: heading **"See what we can do for you"** with link text **"Get in touch"**.
9. Recurring section subheadings: **"Senior multi-disciplinary corporate and finance professionals with
   diverse geographic, sector and transaction focuses"** (experts) and **"Our team has facilitated a
   variety of successful transactions across sectors, geographies and complexities."** (transactions).

## Pages fetched for this abstract (all HTTP 200)
Index: `corporate-finance/index-corporate-finance.html`, `m-and-a/index-m-and-a.html`,
`strategy/index-strategy.html`, `risk-management/index-risk-management.html`
Sub-service: `corporate-finance/ipo.html`, `corporate-finance/private-equity-venture-capital.html`,
`corporate-finance/debt-financing.html`, `corporate-finance/project-finance.html`,
`m-and-a/sell-your-business.html`, `m-and-a/buy-a-business.html`, `m-and-a/mergers.html`,
`m-and-a/post-merger-integration-pmi.html`, `strategy/corporate-strategy-and-planning.html`,
`strategy/growth-strategy-and-planning.html`, `strategy/non-executive-directors-ned.html`,
`strategy/interim-cfo.html` (empty placeholder),
`risk-management/enterprise-risk-management.html`, `risk-management/internal-audit.html`,
`risk-management/sox-advisory.html`, `risk-management/grc-governance-risk-and-compliance.html`
Placeholder-check only (all HTTP 200, all "New content is being added"):
`strategy/interim-ceo-managing-director.html`, `strategy/interim-cmo.html`, `strategy/interim-coo.html`,
`strategy/interim-cto.html`, `strategy/interim-cro.html`, `strategy/interim-sales-head.html`
Content-check only (HTTP 200, content present, not transcribed): `strategy/board-advisors.html`,
`strategy/mentors.html`

No 404s encountered.
