import Link from 'next/link';
import { media } from '@content/media';
import type { Insight } from '@content/schema';
import { Picture } from '@/components/shared/Picture';

/**
 * Four insight cards, in the manner of the Rothschild & Co homepage: a wide
 * photograph, the title in the display serif beneath it, then the standing
 * text. It sits where the transaction rail used to.
 *
 * WHY THE TRANSACTIONS LEFT THIS SLOT. The client asked for cards with images
 * here. The deals are anonymised, almost all of them reading "Undisclosed", so
 * putting a generated photograph on a deal card would produce a picture that
 * implies a real client's business and has no source. The brief's truth rules
 * forbid exactly that. Insights are editorial, an illustrative image for an
 * article is ordinary practice and claims nothing, so the section that could
 * honestly carry photography took the slot. The full record is unchanged and
 * still at /transactions, still linked from the audience cards above.
 *
 * `image` is optional on an insight and most do not have one. Nine of the
 * thirteen fall back to their texture tile, which is why this module takes the
 * four that were given photographs rather than the first four of the list.
 */
export function InsightCards({ insights }: { insights: Insight[] }) {
  return (
    <section className="section-y bg-white" aria-labelledby="insight-cards-heading">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2
            id="insight-cards-heading"
            data-reveal
            className="font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
          >
            Insights
          </h2>
          <Link href="/insights" className="link-underline text-small">
            All insights
          </Link>
        </div>

        <ul className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {insights.map((insight, index) => {
            const asset = insight.image ? media[insight.image] : undefined;
            return (
              <li
                key={insight.slug}
                data-reveal
                data-reveal-delay={String(Math.min(index, 3)) as '0' | '1' | '2' | '3'}
              >
                <Link
                  href={insight.external ?? `/insights/${insight.slug}`}
                  {...(insight.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="group block"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    {asset ? (
                      <Picture
                        image={{ mediaId: insight.image!, asset }}
                        alt=""
                        sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 100vw"
                      />
                    ) : (
                      // The texture tile, which is what an insight without a
                      // photograph has always fallen back to.
                      <img
                        src={insight.texture ?? '/media/texture-01.avif'}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="block size-full object-cover"
                      />
                    )}
                  </div>
                  <h3 className="mt-5 font-display text-display-4 leading-[1.2]">
                    <span className="link-underline">{insight.title}</span>
                  </h3>
                  <p className="mt-3 text-small leading-[1.6] text-stone-700">{insight.summary}</p>
                  <p className="mt-3 text-micro text-stone-500">
                    {insight.author} &middot;{' '}
                    <time dateTime={insight.date}>{new Date(insight.date).getFullYear()}</time>
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
