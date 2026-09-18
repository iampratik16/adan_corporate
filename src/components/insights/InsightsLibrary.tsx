'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FilterGroup, ResultCount } from '@/components/shared/FilterBar';

/**
 * One row of the library. The page hands over only the fields a row renders:
 * the full insight records carry summaries, source notes and pillar arrays that
 * would cross the client boundary for nothing.
 */
export interface LibraryEntry {
  slug: string;
  title: string;
  href: string;
  /** ISO date, for the time element. */
  date: string;
  /** "18 March 2018". The real date, printed. */
  dateLabel: string;
  author: string;
  /** Present only where a profile exists for the author. */
  authorHref?: string;
  summary: string;
  pillars: string[];
  /** Host of the piece where it is published elsewhere, e.g. "linkedin.com". */
  externalHost?: string;
  /** Texture tile, pre-resolved to the one width a small tile needs. */
  art?: { avif: string; webp: string };
}

/**
 * A ruled list, not a card grid.
 *
 * Nothing here is new, so the page is built to be read as a library: the piece,
 * who wrote it, when, and where it lives. Filtering runs in the client against
 * the thirteen records already on the page, so there is no request and no
 * loading state.
 */
export function InsightsLibrary({
  entries,
  pillarOptions,
}: {
  entries: LibraryEntry[];
  pillarOptions: Array<{ value: string; label: string; count?: number }>;
}) {
  const [pillar, setPillar] = useState('all');

  const shown = useMemo(
    () => (pillar === 'all' ? entries : entries.filter((entry) => entry.pillars.includes(pillar))),
    [entries, pillar],
  );

  return (
    <section className="section-y" aria-labelledby="library-heading">
      <div className="container-site">
        <h2 id="library-heading" className="sr-only">
          The library
        </h2>

        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <FilterGroup label="Area" options={pillarOptions} value={pillar} onChange={setPillar} />
          <ResultCount count={shown.length} noun="piece" />
        </div>

        {shown.length === 0 ? (
          <p className="mt-12 text-body text-stone-700">
            Nothing in the library sits under that area.
          </p>
        ) : (
          <ul className="mt-10">
            {shown.map((entry) => (
              <li key={entry.slug} className="border-t border-stone-200 last:border-b">
                <article className="grid gap-x-8 gap-y-4 py-7 md:grid-cols-12">
                  <div className="md:col-span-2">
                    <time dateTime={entry.date} className="tabular text-micro text-stone-500">
                      {entry.dateLabel}
                    </time>
                  </div>

                  <div className="md:col-span-7">
                    <h3 className="font-display text-display-4 leading-[1.2]">
                      <Link
                        href={entry.href}
                        {...(entry.externalHost ? { target: '_blank', rel: 'noreferrer' } : {})}
                        className="link-underline"
                      >
                        {entry.title}
                        {entry.externalHost && (
                          <span className="sr-only"> (opens in a new tab)</span>
                        )}
                      </Link>
                    </h3>

                    <p className="mt-2 text-micro text-stone-500">
                      {entry.authorHref ? (
                        <Link href={entry.authorHref} className="link-underline text-stone-700">
                          {entry.author}
                        </Link>
                      ) : (
                        entry.author
                      )}
                      {entry.externalHost && (
                        <>
                          <span aria-hidden="true"> · </span>
                          <span>Published on {entry.externalHost}</span>
                        </>
                      )}
                    </p>

                    <p className="measure mt-3 text-body text-stone-700">{entry.summary}</p>
                  </div>

                  {entry.art && (
                    <div className="md:col-span-3">
                      <div className="aspect-3/2 w-28 overflow-hidden bg-stone-100 md:ml-auto md:w-full md:max-w-[220px]">
                        <picture className="block size-full">
                          <source type="image/avif" srcSet={entry.art.avif} />
                          <source type="image/webp" srcSet={entry.art.webp} />
                          <img
                            src={entry.art.webp}
                            alt=""
                            width={400}
                            height={267}
                            loading="lazy"
                            decoding="async"
                            className="block size-full object-cover"
                          />
                        </picture>
                      </div>
                    </div>
                  )}
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
