import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { legalPages } from '@content/legal/index';
import { site } from '@content/site';
import { Prose } from '@/components/shared/Prose';
import { PageHeader } from '@/components/shared/PageHeader';
import { loadLegal } from '@/lib/legal';
import { renderMarkdown } from '@/lib/markdown';

/**
 * The legal pages carry over from the old site word for word. Nothing here
 * edits, summarises or reorders a sentence: the only work this route does is
 * set the text on a readable measure and put the other policies within reach.
 */

export function generateStaticParams() {
  return legalPages.map((page) => ({ slug: page.slug }));
}

/** Six files, six pages. An unknown slug is a 404, not a render. */
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
  const document = await loadLegal(slug);
  if (!document) return {};

  return {
    title: document.title,
    description: `${document.title} for ${site.name}.`,
    alternates: { canonical: `/legal/${document.slug}` },
    openGraph: {
      type: 'article',
      title: `${document.title} | ${site.name}`,
      description: `${document.title} for ${site.name}.`,
      url: `${site.url}/legal/${document.slug}`,
      // Setting openGraph on a page replaces the layout's, and Next does not
      // fold the root opengraph-image.tsx back in, so the card is named here.
      // A policy does not warrant a card of its own.
      images: ['/opengraph-image'],
    },
  };
}

export default async function LegalPage({ params }: PageProps) {
  const { slug } = await params;
  const document = await loadLegal(slug);
  if (!document) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: site.name, item: site.url },
      {
        '@type': 'ListItem',
        position: 2,
        name: document.title,
        item: `${site.url}/legal/${document.slug}`,
      },
    ],
  };

  return (
    <>
      <PageHeader kicker="Legal" title={document.title}>
        {document.updated && (
          <p className="mt-8 text-small text-stone-500">
            Last updated{' '}
            <time dateTime={document.updated} className="tabular">
              {dateFormat.format(new Date(`${document.updated}T00:00:00Z`))}
            </time>
          </p>
        )}
      </PageHeader>

      <div className="section-y">
        <div className="container-site lg:grid lg:grid-cols-12 lg:gap-x-12">
          <nav aria-labelledby="legal-index-heading" className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <h2
                id="legal-index-heading"
                className="font-sans text-micro font-medium tracking-[0.06em] text-stone-500 uppercase"
              >
                Legal and policies
              </h2>
              <ul className="mt-5 border-t border-stone-200">
                {legalPages.map((page) => {
                  const current = page.slug === document.slug;
                  return (
                    <li key={page.slug} className="border-b border-stone-200">
                      {current ? (
                        <span
                          aria-current="page"
                          className="flex items-center gap-2.5 py-3 text-small text-ink"
                        >
                          <span aria-hidden="true" className="h-px w-4 shrink-0 bg-accent" />
                          {page.title}
                        </span>
                      ) : (
                        <Link
                          href={`/legal/${page.slug}`}
                          className="block py-3 text-small text-stone-700 transition-colors duration-ui hover:text-ink focus-visible:text-ink"
                        >
                          {page.title}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-6 text-micro text-stone-500">
                Questions about any of these documents go to{' '}
                <a
                  href={`mailto:${site.mailboxes.partners.address}`}
                  className="link-underline text-stone-700"
                >
                  {site.mailboxes.partners.address}
                </a>
                .
              </p>
            </div>
          </nav>

          <article className="mt-14 lg:col-span-8 lg:col-start-5 lg:mt-0">
            <Prose>{renderMarkdown(document.body)}</Prose>
          </article>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
