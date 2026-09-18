import type { Metadata } from 'next';
import Link from 'next/link';
import { pillars } from '@content/pillars';
import { PageHeader } from '@/components/shared/PageHeader';

/**
 * The old site had 207 addressable pages and most of them now fold into one of
 * five pillars. The redirects in content/redirects.ts catch every URL that was
 * in the old sitemap, so a reader who lands here followed something older or
 * mistyped it. Either way the useful answer is the same: the five areas of
 * expertise, then the three pages people actually come for.
 */

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you asked for is not here. The routes below cover most of the site.',
  robots: { index: false, follow: true },
};

const ELSEWHERE = [
  {
    href: '/people',
    title: 'People',
    note: 'The partners, where they sit and what they have run.',
  },
  {
    href: '/transactions',
    title: 'Transactions',
    note: 'Completed deals and current mandates, filterable by corridor and sector.',
  },
  { href: '/contact', title: 'Contact', note: 'Offices, mailboxes and a routed enquiry form.' },
];

function RouteRow({ href, title, note }: { href: string; title: string; note: string }) {
  return (
    <li className="border-t border-stone-200 last:border-b">
      <Link href={href} className="group block py-7">
        <div className="flex items-baseline justify-between gap-6">
          <span className="font-display text-display-3 leading-[1.05] tracking-[-0.02em] text-stone-500 transition-colors duration-ui-slow ease-out-quart group-hover:text-ink group-focus-visible:text-ink">
            {title}
          </span>
          <span
            aria-hidden="true"
            className="mt-1 h-px w-0 shrink-0 bg-accent transition-all duration-ui-slow ease-out-quart group-hover:w-12 group-focus-visible:w-12"
          />
        </div>
        <p className="measure mt-3 text-body text-stone-700">{note}</p>
      </Link>
    </li>
  );
}

export default function NotFound() {
  return (
    <>
      <PageHeader
        kicker="Error 404"
        title="That page has moved or no longer exists."
        lead="The link you followed is out of date, or the address has a typo in it. Almost everything on the old site now sits inside one of the five areas below."
      />

      <section className="section-y" aria-labelledby="not-found-expertise">
        <div className="container-site">
          <h2
            id="not-found-expertise"
            data-reveal
            className="font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
          >
            Expertise
          </h2>
          <ul className="mt-10">
            {pillars.map((pillar) => (
              <RouteRow
                key={pillar.id}
                href={`/expertise/${pillar.id}`}
                title={pillar.title}
                note={pillar.descriptor}
              />
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-white" aria-labelledby="not-found-elsewhere">
        <div className="container-site">
          <h2
            id="not-found-elsewhere"
            data-reveal
            className="font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
          >
            Elsewhere on the site
          </h2>
          <ul className="mt-10">
            {ELSEWHERE.map((route) => (
              <RouteRow key={route.href} {...route} />
            ))}
          </ul>
          <p className="mt-10 text-small text-stone-500">
            Still stuck? Go to the{' '}
            <Link href="/" className="link-underline text-stone-700">
              home page
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
