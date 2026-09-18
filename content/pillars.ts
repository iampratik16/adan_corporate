import { z } from 'zod';
import { Pillar } from './schema';

/**
 * Draft pillar copy for partner review.
 *
 * The old site carries no pillar-level positioning copy at all: the four index pages are link
 * grids (see content/_source/pillars.md). Everything below is written from the sub-service prose,
 * so every statement, capability description and sequence is new copy awaiting sign-off. Service
 * names, groupings and the specific items are taken from the source; the claims around them are
 * deliberately narrow.
 */
const data = [
  {
    id: 'corporate-finance',
    title: 'Corporate Finance',
    descriptor: 'Raising equity and debt across borders',
    statement:
      'We raise equity and debt for mid-market companies, funds and family offices, from early ' +
      'growth capital through to a listing. Most mandates cross a border: the company in one ' +
      'market, the capital in another, and a structure that has to satisfy both. Partners who ' +
      'have raised money as principals run the process themselves rather than handing it down.',
    capabilities: [
      {
        id: 'equity-and-growth-capital',
        title: 'Equity and growth capital',
        description:
          'We introduce companies to equity investors whose mandate, sector and stage actually ' +
          'fit, and run the process through to completion. For funds, we place mandates with ' +
          'institutional investors, family offices and private investors.',
        items: [
          'Private equity and venture capital',
          'Growth capital for founder-led and early-stage companies',
          'Family office investment',
          'IPO advisory, valuation and documentation',
          'Roadshow management and placement of equity',
          'Fund placement',
        ],
      },
      {
        id: 'debt-and-project-finance',
        title: 'Debt and project finance',
        description:
          'We arrange debt with banks, non-bank lenders and credit funds, and structure project ' +
          'finance that repays from the cash a project generates. Non-bank lenders now price a ' +
          'large part of this market, so the search runs wider than a company’s existing banks.',
        items: [
          'Corporate debt and refinancing',
          'Project finance on limited and non-recourse structures',
          'Renewable energy finance',
          'Working capital and trade finance',
          'Invoice discounting and factoring',
          'Mezzanine, bridge and sale-and-leaseback structures',
        ],
      },
      {
        id: 'special-situations-and-exits',
        title: 'Special situations and exits',
        description:
          'When a balance sheet, a shareholder or a market has turned, we work on the financial ' +
          'structure and the options around it. That includes planning an exit long before the ' +
          'owner intends to take it.',
        items: [
          'Special situations and distressed assets',
          'Transformation and restructuring',
          'Divestments and carve-outs',
          'Exit planning and shareholder succession',
          'Credit ratings assistance',
        ],
      },
      {
        id: 'modelling-and-diligence',
        title: 'Modelling and diligence',
        description:
          'Every raise rests on a model and on assumptions an investor will test. We build the ' +
          'model, run the sensitivities, and settle the questions diligence would raise before a ' +
          'lender or an investor raises them.',
        items: [
          'Financial models built for the decision at hand',
          'Sensitivity and scenario analysis',
          'Financial, commercial and legal due diligence support',
          'Valuation and pricing',
          'Capital structure and cost of capital analysis',
        ],
      },
    ],
    howWeWork: [
      {
        title: 'Set the objective',
        description:
          'We start with what the money is for, what the shareholders will accept and what the ' +
          'business can service. That decides whether the answer is equity, debt or both.',
      },
      {
        title: 'Prepare the case',
        description:
          'We build the model and the information memorandum, and put right the things that ' +
          'would otherwise reduce the price or stall the process.',
      },
      {
        title: 'Approach the right capital',
        description:
          'We go to a shortlist of investors and lenders whose mandate fits, drawn from our ' +
          'network across Europe, Asia, the Middle East and Africa, rather than to the market at ' +
          'large.',
      },
      {
        title: 'Negotiate and structure',
        description:
          'We lead the negotiation on price, structure and terms, and coordinate lawyers, ' +
          'auditors and tax advisers so the documents follow the commercial agreement.',
      },
      {
        title: 'Close and follow through',
        description:
          'We manage the process to completion and stay with the company through the first ' +
          'reporting cycles that follow it.',
      },
    ],
    leads: ['roland-giebitz', 'ajay-mavinkurve'],
    image: '/media/pillar-corporate-finance.avif',
    imageAlt:
      'Early light along a stone building façade, at the join where a modern glass extension ' +
      'meets the older masonry.',
    enquirySubject: 'Raising capital',
  },
  {
    id: 'mergers-acquisitions',
    title: 'Mergers & Acquisitions',
    descriptor: 'Buying, selling and combining businesses',
    statement:
      'We advise owners, boards and funds on buying, selling and combining businesses, most often ' +
      'where the seller is a founder, a family or a corporate parent. A sale takes months rather ' +
      'than weeks, and for most owners it happens once, so we run it from the first approach to ' +
      'the point where the two organisations work as one.',
    capabilities: [
      {
        id: 'sell-side',
        title: 'Selling a business',
        description:
          'We prepare a company for sale, find buyers who will pay for what it is worth, and ' +
          'carry the transaction to completion. Preparation is where most of the price is ' +
          'decided.',
        items: [
          'Preparing the company for sale',
          'Teaser, information memorandum and management presentation',
          'Buyer research, pre-screening and approach',
          'Letter of intent and term sheet negotiation',
          'Diligence management and completion',
          'Post-completion accounts and deferred consideration',
        ],
      },
      {
        id: 'buy-side',
        title: 'Buying a business',
        description:
          'We help buyers decide what to acquire and on what terms, from screening targets to ' +
          'financing the purchase. Management buy-outs, buy-ins and leveraged structures sit ' +
          'here, including deals where the management team is the buyer.',
        items: [
          'Acquisition strategy and target screening',
          'Approach and negotiation',
          'Commercial, financial and tax due diligence',
          'Deal structuring and acquisition finance',
          'Carve-outs from corporate parents',
          'MBO, MBI and leveraged buy-outs',
        ],
      },
      {
        id: 'mergers-and-integration',
        title: 'Mergers and post-merger integration',
        description:
          'A merger is agreed on paper and won in the year that follows. We test the combined ' +
          'numbers before signing, then help set up and run the integration office that has to ' +
          'deliver them.',
        items: [
          'Merger structuring and pro forma analysis',
          'Earnings accretion and dilution testing',
          'Integration management office set-up',
          'Target operating model and organisation design',
          'Policy, vendor and IT consolidation',
          'Day-one planning and change management',
        ],
      },
      {
        id: 'joint-ventures-and-alliances',
        title: 'Joint ventures and alliances',
        description:
          'Not every combination needs a change of ownership. Where a joint venture or an ' +
          'alliance is the better route into a market or a technology, we help find the partner ' +
          'and set terms that hold when the two sides disagree.',
        items: [
          'Joint ventures',
          'Alliances and commercial partnerships',
          'Partner search and selection',
          'Governance and shareholder agreements',
        ],
      },
      {
        id: 'valuation-and-deal-strategy',
        title: 'Valuation and deal strategy',
        description:
          'What a business is worth to this buyer, at this moment, under this structure, and how ' +
          'to run the process that gets there. We also act as the challenge in the room when a ' +
          'board wants its own case tested.',
        items: [
          'Company valuation',
          'Deal strategy and process design',
          'Negotiation strategy',
          'Red-team challenge before a decision',
          'Where the cost savings and revenue gains would actually come from',
        ],
      },
    ],
    howWeWork: [
      {
        title: 'Agree the mandate',
        description:
          'We settle what a good outcome looks like: price, timing, what happens to the team, ' +
          'and which parties are not to be approached.',
      },
      {
        title: 'Prepare and position',
        description:
          'We value the business, build the materials and resolve the issues that would ' +
          'otherwise surface in diligence at the worst moment.',
      },
      {
        title: 'Run the process',
        description:
          'We approach a controlled list of buyers or targets, keep more than one party in the ' +
          'conversation, and bring back offers that can be compared.',
      },
      {
        title: 'Negotiate and complete',
        description:
          'We negotiate structure and terms, manage diligence and coordinate legal counsel ' +
          'through to signing and closing.',
      },
      {
        title: 'Integrate',
        description:
          'We help stand up the integration office, sequence the first decisions and track the ' +
          'value the deal was done for.',
      },
    ],
    // Verified against content/_source/people.md: all three carry M&A, deal strategy and
    // valuation in their stated expertise and appear in the source M&A expert grids.
    leads: ['keshav-adya', 'ajay-mavinkurve', 'roland-giebitz'],
    image: '/media/pillar-ma.avif',
    imageAlt: 'Two buildings joined by an enclosed glass footbridge, seen from the street at dusk.',
    enquirySubject: 'Buying or selling a business',
  },
  {
    id: 'strategy-leadership',
    title: 'Strategy & Leadership',
    descriptor: 'Senior counsel for boards and management teams',
    statement:
      'We work with boards and management teams on the decisions that do not fit inside a single ' +
      'transaction: where to grow, which markets to enter, how the board is composed and who runs ' +
      'the business through the next phase. Our partners have held the roles they advise on, as ' +
      'chief executives, finance directors and non-executive directors. An engagement can be one ' +
      'board seat or a full strategy review.',
    capabilities: [
      {
        id: 'corporate-and-growth-strategy',
        title: 'Corporate and growth strategy',
        description:
          'Corporate strategy decides how a group allocates capital and people across its ' +
          'businesses. Growth strategy decides where the next revenue comes from: existing ' +
          'markets, new markets, new products, or some combination of the three.',
        items: [
          'Corporate strategy and portfolio choices',
          'Growth strategy and market entry',
          'Business and marketing strategy',
          'Resource allocation and organisation design',
          'Scenario and future visioning work',
        ],
      },
      {
        id: 'international-expansion',
        title: 'International expansion',
        description:
          'Entering a new country fails on execution more often than on strategy. Partners who ' +
          'live in the target market advise on the sequence, the local partner and the operating ' +
          'structure.',
        items: [
          'Market entry planning and sequencing',
          'Local partner and route-to-market selection',
          'Cross-border operating structure',
          'Geopolitical risk in market choice',
        ],
      },
      {
        id: 'board-advisory',
        title: 'Board advisory and non-executive directors',
        description:
          'A non-executive director carries the same legal duties as an executive one and earns ' +
          'the seat by challenging well. We help boards define the experience they are missing ' +
          'and place people who bring it.',
        items: [
          'Non-executive director appointments',
          'Board advisers and mentors',
          'Board effectiveness and committee structure',
          'Succession planning',
          'Decision facilitation for the board',
        ],
      },
      {
        id: 'interim-management',
        title: 'Interim management',
        description:
          'When a senior role falls vacant at a difficult moment, or a business needs experience ' +
          'it does not yet employ, we place an operator for a defined period with a defined ' +
          'objective.',
        items: [
          'Interim chief executive or managing director',
          'Interim chief financial officer',
          'Interim chief operating, technology or risk officer',
          'Interim sales and marketing leadership',
        ],
      },
      {
        id: 'coaching-and-leadership',
        title: 'Executive coaching and leadership development',
        description:
          'Coaching sits with the strategy work rather than apart from it, because a plan ' +
          'usually stands or falls on the people handed it. It is delivered by partners ' +
          'accredited for executive coaching.',
        items: [
          'Executive coaching for senior leaders',
          'Executive and career transition',
          'Leadership assessment',
          'Negotiation skills',
          'Team and board development',
        ],
      },
    ],
    howWeWork: [
      {
        title: 'Understand the position',
        description:
          'We read the numbers and talk to the board, the management team and, where it helps, ' +
          'customers, before offering a view.',
      },
      {
        title: 'Frame the choices',
        description:
          'We reduce the question to a small number of real options, each with its cost, its ' +
          'risk and what it rules out.',
      },
      {
        title: 'Decide with the board',
        description:
          'We facilitate the decision itself, including arguing the opposite case where the ' +
          'board wants its preferred option tested.',
      },
      {
        title: 'Put people behind it',
        description:
          'A decision needs someone accountable for it: the right executive, a non-executive ' +
          'director, an interim, or coaching for the person already in the seat.',
      },
      {
        title: 'Come back to it',
        description:
          'We return at agreed intervals to check what has moved, what has not, and what the ' +
          'evidence now says.',
      },
    ],
    // people.md supports both: Raju Venkataraman (strategy, board advisory, accredited executive
    // coaching, former CFO and head of strategy) and Mike Kemball (corporate, growth and market
    // entry strategy, interim leadership, NED and board advisory).
    leads: ['raju-venkataraman', 'mike-kemball'],
    image: '/media/pillar-strategy.avif',
    imageAlt:
      'An empty boardroom at first light, long timber table, chairs left slightly askew after a ' +
      'meeting, the city soft beyond the window.',
    enquirySubject: 'Strengthening strategy or the board',
  },
  {
    id: 'risk-governance',
    title: 'Risk & Governance',
    descriptor: 'Control, compliance and resilience',
    statement:
      'We help companies and funds see the risk they are carrying and control it: enterprise and ' +
      'financial risk, internal audit, regulatory compliance and the technology beneath all ' +
      'three. Our risk partners have run governance, treasury and audit functions inside banks ' +
      'and listed companies. Work ranges from a single control review to acting as the internal ' +
      'audit function itself.',
    capabilities: [
      {
        id: 'enterprise-risk',
        title: 'Enterprise risk',
        description:
          'We build the framework that identifies risks, ranks them and gives each one an owner, ' +
          'then keep the reporting short enough that the board reads it. Frameworks follow COSO ' +
          'or ISO 31000 rather than anything of our own invention.',
        items: [
          'Risk framework design on COSO or ISO 31000',
          'Risk appetite and risk inventory',
          'Operational risk',
          'Risk reporting to the board and its committees',
          'Risk management training',
          'Risk management for private equity funds and for smaller companies',
        ],
      },
      {
        id: 'financial-risk',
        title: 'Financial risk',
        description:
          'Market, credit, treasury and regulatory risk, advised by people who managed these ' +
          'books inside banks. Most of the work is hedging strategy, limits, and the reporting ' +
          'that shows whether either is holding.',
        items: [
          'Market risk',
          'Credit risk',
          'Treasury and liquidity risk',
          'Foreign exchange and interest rate hedging',
          'Regulatory risk',
        ],
      },
      {
        id: 'internal-audit-and-controls',
        title: 'Internal audit and controls',
        description:
          'We provide internal audit as a full outsourced function, alongside an existing team, ' +
          'or for a single review, reporting to the audit committee or to the head of internal ' +
          'audit.',
        items: [
          'Outsourced and co-sourced internal audit',
          'Risk-based audit planning',
          'Controls design and testing',
          'Fraud risk assessment',
          'Findings, remediation plans and follow-up',
          'Audit committee reporting',
        ],
      },
      {
        id: 'compliance-and-assurance',
        title: 'Compliance and assurance',
        description:
          'Sarbanes-Oxley, ISO 27001, SOC 1 and SOC 2 all ask a company to evidence its ' +
          'controls. We document what exists, test it, close the gaps and prepare the business ' +
          'for the assessment.',
        items: [
          'SOX advisory and implementation, including sections 302 and 404',
          'Risk assessment as required under AS-5',
          'ISO 27001',
          'SOC 1 and SOC 2 readiness',
          'Control documentation, gap assessment and remediation',
          'Training on COSO and control documentation',
        ],
      },
      {
        id: 'technology-risk-and-resilience',
        title: 'Technology risk and resilience',
        description:
          'Governance, risk and compliance run as separate programmes duplicate effort and still ' +
          'leave gaps between them. We bring them into one framework, and cover the systems, the ' +
          'suppliers and the recovery plan behind it.',
        items: [
          'IT governance, and governance, risk and compliance',
          'ERP control and assurance',
          'Data assurance',
          'Vendor and cloud risk',
          'Business continuity',
          'Disaster recovery and resilience',
        ],
      },
    ],
    howWeWork: [
      {
        title: 'Map what is at risk',
        description:
          'We work out which risks could stop the business meeting its objectives, and which of ' +
          'those the board has never been shown.',
      },
      {
        title: 'Test the controls',
        description:
          'We check whether the controls that are supposed to manage those risks exist, and ' +
          'whether they operate as described.',
      },
      {
        title: 'Close the gaps',
        description:
          'We agree remediation with the people who own each process, in the order that removes ' +
          'the most exposure first.',
      },
      {
        title: 'Report it plainly',
        description:
          'Each finding states the problem, the standard it misses, why it happened, what it ' +
          'risks, and what management has agreed to do.',
      },
      {
        title: 'Keep it running',
        description:
          'Frameworks decay. We train the team, retest on a cycle and rehearse the continuity ' +
          'plan before it is needed.',
      },
    ],
    // people.md supports all three: Preethi Hari (governance, risk and compliance, IT governance,
    // business continuity, SOX, COBIT and COSO), Dipak Khot (treasury and market risk, banking)
    // and Nav Kaplish (enterprise risk, risk strategy, governance, risk and compliance, audits).
    leads: ['preethi-hari', 'dipak-khot', 'nav-kaplish'],
    image: '/media/pillar-risk.avif',
    imageAlt:
      'Close detail of structural steel meeting stone in a precise, repeating rhythm across a ' +
      'building façade.',
    enquirySubject: 'Managing risk',
  },
  {
    // AWAITING PARTNER SIGN-OFF, IN FULL. The current site's Digital section carries no
    // Adan-specific AI substance at all: the AI page is a general explainer, and
    // content/_source/ai-digital.md lists what is not claimed anywhere (no product, tool,
    // framework, client, case study, metric, certification, partner tier or methodology). Nothing
    // below asserts a track record, a named tool or a result. It is a statement of intent and
    // needs partner confirmation before publication. The old digital section's three retired
    // headline offers are deliberately absent, per the brief.
    id: 'ai-digital',
    title: 'AI & Digital',
    descriptor: 'Practical AI for deals and for the businesses behind them',
    statement:
      'We advise mid-market companies and their investors on what to do about AI: where it would ' +
      'change the economics of a process, what it costs to run, and what has to be governed. We ' +
      'also apply the same methods inside our own advisory work, on sourcing, research and ' +
      'modelling. This is a new practice, and it is set out here as what we will do rather than ' +
      'as a record of what we have done.',
    capabilities: [
      {
        id: 'ai-readiness-and-strategy',
        title: 'AI readiness and strategy',
        description:
          'We work with management to find the few processes where AI would change the ' +
          'economics, and to say plainly which ones it would not. The output is a short sequence ' +
          'of things worth trying, with what each needs in data, people and running cost.',
        items: [
          'Review of where AI could apply in the business',
          'Data readiness and quality assessment',
          'Build, buy or partner decisions',
          'Cost and capability requirements',
          'Sequencing, and a first pilot worth running',
        ],
      },
      {
        id: 'ai-and-data-diligence',
        title: 'AI and data due diligence',
        description:
          'In a transaction, we examine what a target’s AI and data actually amount to: what the ' +
          'models do, what data they depend on, what rights the company holds over that data, ' +
          'and what would break if a supplier changed its terms.',
        items: [
          'Assessment of a target’s AI and data assets',
          'Data rights, licensing and dependency review',
          'Model and vendor concentration risk',
          'Technology claims in the information memorandum, tested',
          'Integration and running-cost implications',
        ],
      },
      {
        id: 'ai-governance-and-risk',
        title: 'AI governance and risk',
        description:
          'Anything a business comes to depend on has to be explainable to a board, an auditor ' +
          'and a regulator. We help set the policies, controls and records that make it so, using ' +
          'the same control work we do elsewhere in risk and governance.',
        items: [
          'Policy on AI use and approval routes',
          'Inventory of models in use, with named owners',
          'Controls, monitoring and audit trail',
          'Third-party and data protection risk',
          'Board and committee reporting',
        ],
      },
      {
        id: 'analytics-and-automation',
        title: 'Analytics and automation',
        description:
          'Reporting that answers a question the management team actually has, and automation of ' +
          'the work that consumes time without needing judgement.',
        items: [
          'Management reporting and dashboards',
          'Forecasting and scenario models',
          'Customer segmentation and lifecycle analysis',
          'Process automation where the case is clear',
        ],
      },
      {
        id: 'how-we-use-it',
        title: 'How we use AI in our own work',
        description:
          'We apply these methods inside the firm, on sourcing and screening, on research and ' +
          'diligence, and on financial modelling. It shortens the early weeks of a mandate. The ' +
          'judgement, the relationships and the negotiation stay with the partners.',
        items: [
          'Deal sourcing and screening across our network',
          'Faster market and company research',
          'Document review in diligence',
          'Financial modelling and sensitivity analysis',
        ],
      },
    ],
    howWeWork: [
      {
        title: 'Start with the decision, not the technology',
        description:
          'We begin with a business decision that is slow, expensive or badly informed today. If ' +
          'AI would not improve it, we say so and stop there.',
      },
      {
        title: 'Check the data',
        description:
          'We look at what data exists, who owns it and whether it is good enough. Most ' +
          'proposals fail at this point, and it is far cheaper to find out here.',
      },
      {
        title: 'Run one pilot',
        description:
          'One use case, a fixed period, a measure of success agreed in advance, and an honest ' +
          'decision to continue or stop at the end of it.',
      },
      {
        title: 'Govern it before it scales',
        description:
          'Ownership, monitoring, records and reporting go in before a pilot becomes something ' +
          'the business relies on.',
      },
    ],
    // Arun Shroff was proposed as a lead here but is NOT used: his bio and stated expertise
    // (commercial and operations leadership in manufacturing, agriculture and paper) contain
    // nothing digital. Keshav Adya is used instead: analytics and technology delivery are in his
    // stated expertise and he is a featured expert on the old AI and Analytics pages. Dr Aneesh
    // Chivukula, Director, Artificial Intelligence, is the only AI-credentialled name in the
    // source but does not appear on the team page roster at all, so he is not listed here.
    // Confirm the leads for this pillar with the partners.
    leads: ['nav-kaplish', 'keshav-adya'],
    // This pillar had no photograph and used the code-drawn line field. The
    // client asked for an image; see docs/DECISIONS.md section 18 for why it is
    // a data hall shot as architecture rather than anything that glows.
    image: '/media/pillar-ai-digital.avif',
    imageAlt:
      'A single aisle of tall equipment cabinets receding into the dark in a data hall, lit only ' +
      'by the cold points of their indicators.',
    enquirySubject: 'Exploring AI',
  },
] satisfies unknown[];

export const pillars = z.array(Pillar).parse(data);
