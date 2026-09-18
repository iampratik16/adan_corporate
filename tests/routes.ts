/** Every route the site serves, shared by the test files. */
export const ROUTES = [
  '/',
  '/expertise',
  '/expertise/corporate-finance',
  '/expertise/mergers-acquisitions',
  '/expertise/strategy-leadership',
  '/expertise/risk-governance',
  '/expertise/ai-digital',
  '/transactions',
  '/transactions/mandates',
  '/people',
  '/about',
  '/insights',
  '/podcast',
  '/careers',
  '/contact',
  // Two of the six legal pages: one with a source date, one without, and the
  // longest of them. The other four share the same route and component.
  '/legal/legal',
  '/legal/privacy-policy',
] as const;
