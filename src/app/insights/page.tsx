import type { Metadata } from 'next';
import { insights, insightsNeedRefresh } from '@content/insights';
import { media } from '@content/media';
import { people } from '@content/people';
import { pillars } from '@content/pillars';
import { ContactBand } from '@/components/shared/ContactBand';
import { PageHeader } from '@/components/shared/PageHeader';
import { InsightsLibrary, type LibraryEntry } from '@/components/insights/InsightsLibrary';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Writing by the partners of Adan Corporate on negotiation, risk, leadership and change. ' +
    'Most of it is published on the authors’ own channels.',
  alternates: { canonical: '/insights' },
};

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/**
 * The texture path in content/insights.ts names the source file, not a generated
 * width, so resolve it back to the media record and ask for the one width a
 * small tile needs. A missing record means no tile rather than a broken image.
 */
function textureArt(texture: string | undefined): LibraryEntry['art'] {
  if (!texture) return undefined;
  const id = texture
    .split('/')
    .pop()
    ?.replace(/\.[a-z0-9]+$/i, '');
  if (!id || !media[id]) return undefined;
  return { avif: `/media/${id}-400.avif`, webp: `/media/${id}-400.webp` };
}

function hostOf(url: string): string {
  return new URL(url).hostname.replace(/^www\./, '');
}

export default function InsightsPage() {
  const profiled = new Set(people.map((person) => person.slug));

  const entries: LibraryEntry[] = [...insights]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((insight) => ({
      slug: insight.slug,
      title: insight.title,
      href: insight.external ?? `/insights/${insight.slug}`,
      date: insight.date,
      dateLabel: dateFormat.format(new Date(`${insight.date}T00:00:00Z`)),
      author: insight.author,
      authorHref:
        insight.authorSlug && profiled.has(insight.authorSlug)
          ? `/people/${insight.authorSlug}`
          : undefined,
      summary: insight.summary,
      pillars: [...insight.pillars],
      externalHost: insight.external ? hostOf(insight.external) : undefined,
      art: textureArt(insight.texture),
    }));

  const pillarOptions = [
    { value: 'all', label: 'All', count: entries.length },
    ...pillars
      .map((pillar) => ({
        value: pillar.id,
        label: pillar.title,
        count: entries.filter((entry) => entry.pillars.includes(pillar.id)).length,
      }))
      .filter((option) => option.count > 0),
  ];

  const years = entries.map((entry) => entry.date.slice(0, 4)).sort();
  const firstYear = years[0];
  const lastYear = years[years.length - 1];

  return (
    <>
      <PageHeader
        title="Insights"
        lead="Writing by the partners on negotiation, risk, leadership and the way people handle change. Read it as a library rather than a feed: these are the pieces that have kept, not the ones published this week."
      >
        {insightsNeedRefresh && firstYear && lastYear && (
          <p className="measure mt-6 text-small text-stone-500">
            Everything here was published between {firstYear} and {lastYear}, mostly on the authors’
            own channels, and the library is being refreshed.
          </p>
        )}
      </PageHeader>

      <InsightsLibrary entries={entries} pillarOptions={pillarOptions} />
      <ContactBand />
    </>
  );
}
