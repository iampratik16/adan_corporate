/**
 * The network: the six categories of counterparty the firm deals with, and the
 * four principles the old site called "agnostic".
 *
 * Source: content/_source/about.md, "How do we do it?" and "Our Breadth and
 * Depth of Services". The taxonomy is carried across; the wording is not.
 * "Sector agnostic" tells a reader nothing; "from mining to augmented reality"
 * tells them the range.
 *
 * Kept here rather than in a component because the homepage and the about page
 * both print it, and two copies of the same claim would drift apart.
 */
import { z } from 'zod';

const NetworkCategory = z.object({
  title: z.string(),
  /** One line of examples, comma separated. */
  items: z.string(),
});
export type NetworkCategory = z.infer<typeof NetworkCategory>;

const categoryData = [
  { title: 'Funds', items: 'Private equity, venture capital, sovereign wealth, hedge, pension' },
  { title: 'Financial firms', items: 'Global banks, non-bank lenders, trade finance houses' },
  {
    title: 'Specialised funds',
    items: 'Impact, long-only, infrastructure, green and renewable energy, government',
  },
  {
    title: 'Sophisticated investors',
    items: 'Single and multi family offices, private investor networks',
  },
  {
    title: 'Agencies',
    items: 'Regional development banks, development agencies, export credit agencies',
  },
  { title: 'Strategic networks', items: 'Strategic investors, business schools, partner firms' },
] satisfies unknown[];

export const networkCategories = z.array(NetworkCategory).parse(categoryData);

export interface NetworkPrinciple {
  title: string;
  body: string;
}

/**
 * The four principles. The geography line counts the offices we actually
 * publish in content/offices.ts, so the caller passes that count rather than
 * this file asserting a number of its own.
 */
export function networkPrinciples(officeCount: number): NetworkPrinciple[] {
  return [
    {
      title: 'Sectors',
      body: 'From mining and manufacturing to augmented reality and clean energy. We are not tied to a sector.',
    },
    {
      title: 'Geographies',
      body: `Offices in ${officeCount} cities and partners in several more. Most mandates cross at least one border.`,
    },
    {
      title: 'Deal sizes',
      body: 'US$1m to US$500m, with the weight of the work in the mid-market.',
    },
    {
      title: 'Deal types',
      body: 'Equity, debt, a sale, a purchase, a merger, a restructuring or a placement.',
    },
  ];
}
