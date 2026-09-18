import Link from 'next/link';
import { media } from '@content/media';
import { Picture } from '@/components/shared/Picture';

/**
 * Three routes in. One picture, one sentence and one link each: a reader should
 * be able to identify themselves and leave this section within a few seconds.
 *
 * Laid out after the three-card block on the Rothschild & Co homepage: a square
 * photograph, then the name set in the display serif, then the standing text.
 * The rule that used to sit above each column is gone, because the image is now
 * the thing that starts the column and a hairline over a photograph reads as a
 * mistake.
 *
 * The photography is deliberately NOT the house dawn look. See
 * docs/DECISIONS.md section 23: the client asked for the reference's brighter,
 * greener summer daylight on these cards, which is a real departure and is the
 * one thing on this page that does not sit in the same world as the hero film.
 *
 * `alt` is empty on all three. They are mood, not information: every card
 * already carries its name, its sentence and its link as text, so describing
 * the picture to a screen reader would only add noise.
 */
const AUDIENCES = [
  {
    title: 'Companies and founders',
    body: 'You are raising capital, planning a sale or an acquisition, or preparing for a listing, and you want partners who have sat on your side of the table.',
    href: '/expertise/corporate-finance',
    label: 'Corporate finance',
    mediaId: 'audience-companies',
  },
  {
    title: 'Funds and family offices',
    body: 'You are placing a fund, sourcing mid-market opportunities across borders, or need diligence on a deal in a market you do not cover.',
    href: '/transactions',
    label: 'Selected transactions',
    mediaId: 'audience-funds',
  },
  {
    title: 'Senior professionals',
    body: 'You have run a company and want to keep working on deals and boards, with a partnership rather than an employer.',
    href: '/careers',
    label: 'Join the partnership',
    mediaId: 'audience-professionals',
  },
] as const;

export function Audiences() {
  return (
    <section className="section-y bg-white" aria-labelledby="audiences-heading">
      <div className="container-site">
        <h2 id="audiences-heading" className="sr-only">
          Who we work with
        </h2>
        <div className="grid gap-x-12 gap-y-14 md:grid-cols-3">
          {AUDIENCES.map((audience, index) => {
            const asset = media[audience.mediaId];
            return (
              <div
                key={audience.title}
                data-reveal
                data-reveal-delay={String(index) as '0' | '1' | '2'}
              >
                {asset && (
                  <div className="mb-7 aspect-square overflow-hidden">
                    <Picture
                      image={{ mediaId: audience.mediaId, asset }}
                      alt=""
                      sizes="(min-width: 768px) 30vw, 100vw"
                    />
                  </div>
                )}
                <h3 className="font-display text-display-4 leading-[1.15]">{audience.title}</h3>
                <p className="mt-4 text-body text-stone-700">{audience.body}</p>
                <Link href={audience.href} className="link-underline mt-6 inline-block text-small">
                  {audience.label}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
