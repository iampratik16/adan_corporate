import Link from 'next/link';
import type { Insight } from '@content/schema';
import { site } from '@content/site';

/**
 * Insights and the podcast.
 *
 * Every article on the old site dates from 2018 or 2019, so this module is
 * built to work as a library of evergreen pieces rather than a "latest news"
 * rail. Dates are still printed, because hiding them would be dishonest, but
 * nothing here is framed as recent. Fresh content is a client question.
 */
export function InsightsModule({ insights }: { insights: Insight[] }) {
  return (
    <section className="section-y bg-white" aria-labelledby="insights-heading">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2
            id="insights-heading"
            data-reveal
            className="font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
          >
            Writing and conversation
          </h2>
          <Link href="/insights" className="link-underline text-small">
            All insights
          </Link>
        </div>

        <div className="mt-12 grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <ul data-reveal className="lg:col-span-7">
            {insights.map((insight) => (
              <li key={insight.slug} className="border-t border-stone-200 last:border-b">
                <Link
                  href={insight.external ?? `/insights/${insight.slug}`}
                  {...(insight.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="group flex items-baseline justify-between gap-6 py-5"
                >
                  <span>
                    <span className="link-underline font-display text-display-4 leading-[1.2]">
                      {insight.title}
                    </span>
                    <span className="mt-1.5 block text-micro text-stone-500">{insight.author}</span>
                  </span>
                  <time
                    dateTime={insight.date}
                    className="tabular shrink-0 text-micro text-stone-500"
                  >
                    {new Date(insight.date).getFullYear()}
                  </time>
                </Link>
              </li>
            ))}
          </ul>

          {/* --- The podcast, given equal weight because it is the live channel. --- */}
          <div data-reveal data-reveal-delay="1" className="lg:col-span-5">
            <div className="band-ink on-ink flex h-full flex-col justify-between p-8 lg:p-10">
              <div>
                <p className="text-micro tracking-[0.06em] text-accent-bright uppercase">Podcast</p>
                <h3 className="mt-5 font-display text-display-3 leading-[1.05] tracking-[-0.02em]">
                  {site.podcast.name}
                </h3>
                <p className="mt-5 max-w-[38ch] text-body text-stone-300">
                  Conversations with founders, investors and advisers about deals that completed,
                  and what it took to get them there.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link href="/podcast" className="btn">
                  Episodes
                </Link>
                <a
                  href={site.podcast.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline text-small text-stone-300 hover:text-white"
                >
                  Listen on Spotify
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
