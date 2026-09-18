import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { insights } from '@content/insights';
import { people } from '@content/people';
import { site } from '@content/site';
import { ContactBand } from '@/components/shared/ContactBand';
import { PageHeader } from '@/components/shared/PageHeader';
import { Prose } from '@/components/shared/Prose';

/**
 * A detail page exists only for a piece the firm actually holds.
 *
 * Every entry in content/insights.ts is currently published elsewhere and
 * carries an `external` url, so this route legitimately generates nothing: the
 * list links straight to the source instead. Building a page that restates
 * somebody else's article under our own masthead would be a claim we cannot
 * make, so the route stays empty until an entry arrives without an `external`.
 */
const hosted = insights.filter((insight) => !insight.external);

export function generateStaticParams() {
  return hosted.map((insight) => ({ slug: insight.slug }));
}

/** No hosted entry means no page, rather than a runtime render of an unknown slug. */
export const dynamicParams = false;

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = hosted.find((item) => item.slug === slug);
  if (!insight) return {};
  return {
    title: insight.title,
    description: insight.summary,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      type: 'article',
      title: insight.title,
      description: insight.summary,
      publishedTime: insight.date,
      authors: [insight.author],
    },
  };
}

export default async function InsightPage({ params }: PageProps) {
  const { slug } = await params;
  const insight = hosted.find((item) => item.slug === slug);
  if (!insight) notFound();

  const authorProfiled =
    insight.authorSlug !== undefined && people.some((person) => person.slug === insight.authorSlug);

  const related = insights
    .filter(
      (item) =>
        item.slug !== insight.slug &&
        item.pillars.some((pillar) => insight.pillars.includes(pillar)),
    )
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: insight.title,
      description: insight.summary,
      datePublished: insight.date,
      author: { '@type': 'Person', name: insight.author },
      publisher: { '@type': 'Organization', name: site.name, url: site.url },
      mainEntityOfPage: `${site.url}/insights/${insight.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Insights', item: `${site.url}/insights` },
        {
          '@type': 'ListItem',
          position: 2,
          name: insight.title,
          item: `${site.url}/insights/${insight.slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <PageHeader title={insight.title} breadcrumb={{ href: '/insights', label: 'Insights' }}>
        <p className="mt-8 text-small text-stone-500">
          {authorProfiled && insight.authorSlug ? (
            <Link href={`/people/${insight.authorSlug}`} className="link-underline text-stone-700">
              {insight.author}
            </Link>
          ) : (
            <span className="text-stone-700">{insight.author}</span>
          )}
          <span aria-hidden="true"> · </span>
          <time dateTime={insight.date} className="tabular">
            {dateFormat.format(new Date(`${insight.date}T00:00:00Z`))}
          </time>
        </p>
      </PageHeader>

      <article className="section-y">
        <div className="container-site">
          <Prose>
            <p>{insight.summary}</p>
          </Prose>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-y bg-white" aria-labelledby="related-heading">
          <div className="container-site">
            <h2
              id="related-heading"
              data-reveal
              className="font-display text-display-3 leading-[1.05] tracking-[-0.02em]"
            >
              Related reading
            </h2>
            <ul className="mt-10">
              {related.map((item) => (
                <li key={item.slug} className="border-t border-stone-200 last:border-b">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-6">
                    <span>
                      <Link
                        href={item.external ?? `/insights/${item.slug}`}
                        {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                        className="link-underline font-display text-display-4 leading-[1.2]"
                      >
                        {item.title}
                        {item.external && <span className="sr-only"> (opens in a new tab)</span>}
                      </Link>
                      <span className="mt-1.5 block text-micro text-stone-500">{item.author}</span>
                    </span>
                    <time dateTime={item.date} className="tabular text-micro text-stone-500">
                      {dateFormat.format(new Date(`${item.date}T00:00:00Z`))}
                    </time>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ContactBand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
