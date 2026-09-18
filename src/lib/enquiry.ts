import { offices } from '@content/offices';
import { people } from '@content/people';
import { personGroups, regions, type Person, type PillarId, type Region } from '@content/schema';

/** The regions a reader can choose. Global is a schema value, not a place, so it is not offered. */
export const PICKABLE: Region[] = regions.filter((region) => region !== 'Global');

/**
 * Country to region, taken from the office list so the two can never drift.
 * The four countries added below hold a partner but no office, so the office
 * list cannot supply their region. They are plain geography, not a claim about
 * the firm.
 */
const REGION_BY_COUNTRY: Record<string, Region> = {
  ...Object.fromEntries(offices.map((office) => [office.country, office.region])),
  Germany: 'Europe',
  Bahrain: 'Middle East',
  'United States': 'Americas',
  Colombia: 'Americas',
};

export function regionOf(person: Person): Region | undefined {
  return REGION_BY_COUNTRY[person.country];
}

const seniority = (person: Person) => personGroups.indexOf(person.group);

export type EnquiryMatch = {
  partners: Person[];
  /**
   * matched       the pillar, and the region if one was chosen, both hit
   * wrong-region  nobody in that region covers this, so the page widens out
   * no-pillar     the route is not tied to a pillar (joining, the press office)
   * nothing       no partner records this pillar at all
   */
  reason: 'matched' | 'wrong-region' | 'no-pillar' | 'nothing';
};

/**
 * Who the reader should speak to.
 *
 * Match the enquiry route's pillar against a partner's own pillars, then narrow
 * to the chosen region. A region that turns up nobody widens back to the pillar
 * rather than showing an empty result, and a route with no pillar goes to the
 * managing partners. The reason comes back so the page can say plainly which of
 * those happened. It never returns an empty list.
 */
export function selectPartners(pillar: PillarId | null, region: string): EnquiryMatch {
  const managing = people.filter((person) => person.group === 'managing-partner');
  const senior = people
    .filter((person) => person.group === 'managing-partner' || person.group === 'partner')
    .sort((a, b) => seniority(a) - seniority(b));

  if (!pillar) return { partners: managing.slice(0, 3), reason: 'no-pillar' };

  const onPillar = senior.filter((person) => person.pillars.includes(pillar));
  if (onPillar.length === 0) return { partners: managing.slice(0, 3), reason: 'nothing' };

  if (region) {
    const inRegion = onPillar.filter((person) => regionOf(person) === region);
    if (inRegion.length > 0) return { partners: inRegion.slice(0, 3), reason: 'matched' };
    return { partners: onPillar.slice(0, 3), reason: 'wrong-region' };
  }

  return { partners: onPillar.slice(0, 3), reason: 'matched' };
}
