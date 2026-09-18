/**
 * Site-level constants: identity, metadata, mailboxes, navigation and the
 * contact router. No Zod here because nothing in this file is a claim about
 * the firm's record; the two items that are unverified carry a comment and a
 * placeholder rather than a guess.
 */
export const site = {
  name: 'Adan Corporate',
  // The old legal pages name two entities: "Adan Corporate Services Limited" in the Terms of Use
  // and "Adan Corporate LLP and its subsidiaries and affiliates" in the Privacy Policy. No company
  // number, registered office or VAT number appears anywhere. Client to confirm which entity runs
  // this site before the footer prints it.
  legalName: 'Adan Corporate Services Limited',
  url: 'https://adancorporate.com',
  locale: 'en-GB',
  founded: 2013,

  tagline: 'Cross-border corporate finance for the mid-market',
  description:
    'An international advisory firm of former C-suite executives. We help growing companies and ' +
    'funds raise capital, buy, sell and transform.',

  mailboxes: {
    partners: {
      address: 'partners@adancorporate.com',
      label: 'Enquiries',
      purpose: 'Client enquiries and introductions to a partner.',
    },
    careers: {
      address: 'careers@adancorporate.com',
      label: 'Careers',
      purpose: 'Applications and enquiries about joining the firm.',
    },
    alumni: {
      address: 'alumni@adancorporate.com',
      label: 'Alumni',
      purpose: 'Former colleagues keeping in touch with the firm.',
    },
    // The old site labels this one "Media" but points it at the generic info@ mailbox.
    // There is no media@ or press@ address anywhere in the source.
    media: {
      address: 'info@adancorporate.com',
      label: 'Media',
      purpose: 'Press enquiries and interview requests.',
    },
  },

  social: {
    linkedin: 'https://www.linkedin.com/company/11209203',
    spotify: 'https://open.spotify.com/show/2LfRgivNsxvxsWmMU4Lj3r',
  },

  podcast: {
    name: 'A Done Deal',
    url: 'https://open.spotify.com/show/2LfRgivNsxvxsWmMU4Lj3r',
  },

  nav: {
    utility: [
      { label: 'Insights', href: '/insights' },
      { label: 'Podcast', href: '/podcast' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
    primary: [
      { label: 'Expertise', href: '/expertise' },
      { label: 'Transactions', href: '/transactions' },
      { label: 'People', href: '/people' },
      { label: 'About', href: '/about' },
    ],
  },

  footerColumns: [
    {
      title: 'Expertise',
      links: [
        { label: 'Corporate finance', href: '/expertise/corporate-finance' },
        { label: 'Mergers and acquisitions', href: '/expertise/mergers-acquisitions' },
        { label: 'Strategy and leadership', href: '/expertise/strategy-leadership' },
        { label: 'Risk and governance', href: '/expertise/risk-governance' },
        { label: 'AI and digital', href: '/expertise/ai-digital' },
      ],
    },
    {
      title: 'Firm',
      links: [
        { label: 'About', href: '/about' },
        { label: 'People', href: '/people' },
        { label: 'Transactions', href: '/transactions' },
        { label: 'Insights', href: '/insights' },
        { label: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'Contact', href: '/contact' },
        { label: 'Offices', href: '/contact#offices' },
        { label: 'A Done Deal podcast', href: '/podcast' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/company/11209203' },
        { label: 'Spotify', href: 'https://open.spotify.com/show/2LfRgivNsxvxsWmMU4Lj3r' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of use', href: '/legal/legal' },
        { label: 'Privacy policy', href: '/legal/privacy-policy' },
        { label: 'Cookie policy', href: '/legal/cookie-policy' },
        { label: 'GDPR policy', href: '/legal/gdpr-policy' },
        { label: 'Diversity policy', href: '/legal/diversity-policy' },
        { label: 'Accessibility', href: '/legal/accessibility' },
      ],
    },
  ],

  // Placeholder. The old site carries no authorisation statement: no FCA firm reference number,
  // no "authorised and regulated by" wording, no company number and no registered office. Its only
  // regulatory sentence says Adan "operates under the guidance on Corporate Finance Activities by
  // ICAEW", then links an ICAS handbook, a different regulator. Nothing here can be written for the
  // client. See content/_source/legal.md.
  legalLine:
    '[Placeholder: regulatory and company wording awaited from the client. Needs the trading ' +
    'entity, company or LLP registration number, registered office and the authorisation ' +
    'statement, if any.]',

  enquiryRoutes: [
    {
      id: 'raise-capital',
      label: 'I want to raise capital',
      pillar: 'corporate-finance',
      mailbox: 'partners@adancorporate.com',
    },
    {
      id: 'buy-or-sell',
      label: 'I want to buy or sell a business',
      pillar: 'mergers-acquisitions',
      mailbox: 'partners@adancorporate.com',
    },
    {
      id: 'strategy-board',
      label: 'I want to strengthen strategy or the board',
      pillar: 'strategy-leadership',
      mailbox: 'partners@adancorporate.com',
    },
    {
      id: 'manage-risk',
      label: 'I want to manage risk',
      pillar: 'risk-governance',
      mailbox: 'partners@adancorporate.com',
    },
    {
      id: 'explore-ai',
      label: 'I want to explore AI',
      pillar: 'ai-digital',
      mailbox: 'partners@adancorporate.com',
    },
    {
      id: 'join-the-firm',
      label: 'I want to join the firm',
      pillar: null,
      mailbox: 'careers@adancorporate.com',
    },
    {
      id: 'press',
      label: 'I want to speak to the press office',
      pillar: null,
      mailbox: 'info@adancorporate.com',
    },
  ],
} as const;
