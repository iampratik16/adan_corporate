/**
 * Every number the new site prints, with its provenance.
 *
 * The old site contradicts itself on almost all of these. Where it does, the
 * conflict is recorded in `sourceNote` and `needsConfirmation` is true, so the
 * figure renders with a partner-review marker instead of being quietly resolved
 * here. Only figures counted from our own content files are marked confirmed.
 */
import { z } from 'zod';
import { Figure } from './schema';

const data = [
  {
    id: 'professionals',
    value: '35',
    label: 'Corporate professionals',
    needsConfirmation: true,
    sourceNote:
      'Four different numbers in the source. The homepage counter says 35 (HTML and assets/js/main.js agree). ' +
      'Keshav Adya’s biography says "a team of 45+ senior corporate professionals in 18 countries". ' +
      'The old team section has 29 profile pages. Only 23 people appear on the old homepage. ' +
      'Partner to confirm which number is current and what it counts.',
  },
  {
    id: 'countries',
    value: '15',
    label: 'Countries across 3 continents',
    needsConfirmation: true,
    sourceNote:
      'Contradicted twice. The homepage counter says 15 countries in 3 continents. The Location Agnostic card ' +
      'on the same page says partners are based in 19 countries across 3 continents. The locations page claims ' +
      '22 cities in 20 countries but lists 14 cities in 13 countries. Kieran Bourke’s biography refers to ' +
      '4 continents. Partner to confirm.',
  },
  {
    id: 'transaction-value',
    value: 'US$5bn',
    label: 'Value of transactions advised',
    footnote: 'As at date to be confirmed.',
    needsConfirmation: true,
    sourceNote:
      'Homepage counter: 5 (billion USD). The old site gives no "as at" date and no basis for the total, and ' +
      'its footer runs to 2021, so the figure may be several years old. Partner to confirm the number and the date.',
  },
  {
    id: 'average-experience',
    value: '20 years',
    label: 'Average experience of our partners',
    needsConfirmation: true,
    sourceNote:
      'Homepage counter: 20 average years of experience. No workings are published and the figure is undated. ' +
      'Individual biographies range from 2.5 years to 4 decades, so the average depends on who is counted. ' +
      'Partner to confirm.',
  },
  {
    id: 'deal-size-range',
    value: '$1m to $500m',
    label: 'Typical deal size',
    needsConfirmation: true,
    sourceNote:
      'The Deal-Value Agnostic card says "Our deal value ranges between $1 mn and $500 mn and our focus is the ' +
      'mid-market segment". The published transaction list does not fit that range at either end: the largest ' +
      'completed deal is US$1bn and the smallest is $2.5m. Partner to confirm the stated range or replace it ' +
      'with the actual one.',
  },
  {
    id: 'offices',
    value: '14',
    label: 'Cities',
    needsConfirmation: false,
    // Counted from our own content file, so it is the one location number we can stand behind.
    sourceNote:
      'Counted from content/offices.ts, which carries the 14 locations printed on the old contact and locations ' +
      'pages. This is a count of what we publish, not a claim taken from the old site, whose hero says 22 cities ' +
      'in 20 countries. Whether every location is a staffed office is a separate question for the partner.',
  },
  {
    id: 'completed-transactions',
    value: '36',
    label: 'Completed transactions',
    needsConfirmation: false,
    sourceNote:
      'Counted from content/transactions.ts, which carries all 36 completed transactions transcribed from the ' +
      'old clients page. The count matches the old page exactly: 36 deal region labels and 36 deal size labels ' +
      'in its markup.',
  },
] satisfies unknown[];

export const figures = z.array(Figure).parse(data);

/**
 * The four figures in the ruled row on the homepage: the two we counted
 * ourselves, plus the two published figures that nothing else on the old site
 * contradicts. The professional and country counts are held back because each
 * has three or four competing values.
 */
export const homepageFigures = [
  'transaction-value',
  'completed-transactions',
  'offices',
  'average-experience',
] as const;

/**
 * The "as at" footnote under the homepage figures. The old site dates nothing:
 * its counters carry no date and its footer reads "2013 - 2021". A date here
 * would be invented, so this stays a placeholder until the client supplies one.
 */
export const figuresAsAt = 'As at [date to be confirmed by the client]';
