import Link from 'next/link';

/**
 * Three routes in. One sentence and one link each: a reader should be able to
 * identify themselves and leave this section within a few seconds.
 */
const AUDIENCES = [
  {
    title: 'Companies and founders',
    body: 'You are raising capital, planning a sale or an acquisition, or preparing for a listing, and you want partners who have sat on your side of the table.',
    href: '/expertise/corporate-finance',
    label: 'Corporate finance',
  },
  {
    title: 'Funds and family offices',
    body: 'You are placing a fund, sourcing mid-market opportunities across borders, or need diligence on a deal in a market you do not cover.',
    href: '/transactions',
    label: 'Selected transactions',
  },
  {
    title: 'Senior professionals',
    body: 'You have run a company and want to keep working on deals and boards, with a partnership rather than an employer.',
    href: '/careers',
    label: 'Join the partnership',
  },
] as const;

export function Audiences() {
  return (
    <section className="section-y bg-white" aria-labelledby="audiences-heading">
      <div className="container-site">
        <h2 id="audiences-heading" className="sr-only">
          Who we work with
        </h2>
        <div className="grid gap-x-12 gap-y-12 md:grid-cols-3">
          {AUDIENCES.map((audience, index) => (
            <div
              key={audience.title}
              data-reveal
              data-reveal-delay={String(index) as '0' | '1' | '2'}
              className="border-t border-ink pt-6"
            >
              <h3 className="font-display text-display-4 leading-[1.15]">{audience.title}</h3>
              <p className="mt-4 text-body text-stone-700">{audience.body}</p>
              <Link href={audience.href} className="link-underline mt-6 inline-block text-small">
                {audience.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
