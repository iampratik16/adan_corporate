import type { MetadataRoute } from 'next';
import { insights } from '@content/insights';
import { people } from '@content/people';
import { pillars } from '@content/pillars';
import { site } from '@content/site';
import { loadAllLegal } from '@/lib/legal';

/**
 * Every route, read from content/ rather than listed by hand, so a pillar, a
 * partner or a policy that is added to content appears here without anyone
 * remembering to come back.
 *
 * The site is prerendered, so the build is the only moment anything changes:
 * lastModified is the build time except where the content itself carries a
 * date, which is the case for insights and for the legal pages.
 */

type Entry = MetadataRoute.Sitemap[number];
type Frequency = NonNullable<Entry['changeFrequency']>;

/**
 * The top-level routes are the navigation. Anything added to site.nav is in the
 * sitemap the same day; the table below only sets its weight.
 */
const TOP_LEVEL: Record<string, { changeFrequency: Frequency; priority: number }> = {
  '/expertise': { changeFrequency: 'monthly', priority: 0.9 },
  '/transactions': { changeFrequency: 'monthly', priority: 0.8 },
  '/people': { changeFrequency: 'monthly', priority: 0.8 },
  '/about': { changeFrequency: 'yearly', priority: 0.7 },
  '/contact': { changeFrequency: 'yearly', priority: 0.7 },
  '/insights': { changeFrequency: 'monthly', priority: 0.7 },
  '/podcast': { changeFrequency: 'monthly', priority: 0.6 },
  '/careers': { changeFrequency: 'monthly', priority: 0.6 },
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const built = new Date();
  const url = (path: string) => `${site.url}${path}`;

  const home: Entry = {
    url: url('/'),
    lastModified: built,
    changeFrequency: 'monthly',
    priority: 1,
  };

  const topLevel: Entry[] = [...site.nav.primary, ...site.nav.utility].map((item) => ({
    url: url(item.href),
    lastModified: built,
    ...(TOP_LEVEL[item.href] ?? { changeFrequency: 'monthly' as const, priority: 0.6 }),
  }));

  const pillarPages: Entry[] = pillars.map((pillar) => ({
    url: url(`/expertise/${pillar.id}`),
    lastModified: built,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // A profile changes when someone joins, leaves or takes a new title, which is
  // rare, but it is the page a reader is most likely to arrive on from a search.
  const profiles: Entry[] = people.map((person) => ({
    url: url(`/people/${person.slug}`),
    lastModified: built,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  // Only pieces the firm hosts. Everything currently in content/insights.ts is
  // published elsewhere and carries an external url, so this is empty today and
  // fills itself when a hosted piece arrives.
  const articles: Entry[] = insights
    .filter((insight) => !insight.external)
    .map((insight) => ({
      url: url(`/insights/${insight.slug}`),
      lastModified: new Date(`${insight.date}T00:00:00Z`),
      changeFrequency: 'yearly',
      priority: 0.5,
    }));

  const legal: Entry[] = (await loadAllLegal()).map((document) => ({
    url: url(`/legal/${document.slug}`),
    lastModified: document.updated ? new Date(`${document.updated}T00:00:00Z`) : built,
    changeFrequency: 'yearly',
    priority: 0.3,
  }));

  return [home, ...topLevel, ...pillarPages, ...profiles, ...articles, ...legal];
}
