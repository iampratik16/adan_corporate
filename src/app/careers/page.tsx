import type { Metadata } from 'next';
import Link from 'next/link';
import { offices } from '@content/offices';
import { site } from '@content/site';
import { ContactBand } from '@/components/shared/ContactBand';
import { PageHeader } from '@/components/shared/PageHeader';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Adan Corporate recruits experienced executives into a partnership rather than graduates into ' +
    'a job. Three ways in: join the partnership, an experienced hire, or the alumni network.',
  alternates: { canonical: '/careers' },
};

/**
 * What the partnership offers. Drawn from the old site's "For Prospective
 * Colleagues" column (content/_source/about.md), rewritten in plain British
 * English. No claim here goes beyond that source.
 */
const offer = [
  {
    title: 'No hierarchy to climb',
    body: 'The firm is a partnership, not a pyramid. There is no layer of management between you and the work, and no years to serve before you are trusted with a client.',
  },
  {
    title: 'Advice and the analysis behind it',
    body: 'Partners do the strategy work and the numbers. The modelling is not handed down to somebody else, which is part of why the advice holds up in a negotiation.',
  },
  {
    title: 'Reward tied to what you bring',
    body: 'Rewards are performance based. What you originate and close is what you are paid on, rather than a grade or a length of service.',
  },
  {
    title: 'Direct exposure to decision makers',
    body: 'Mid-market mandates put you across the table from founders, boards and investment committees, not from a procurement function.',
  },
  {
    title: 'A network that already spans borders',
    body: `Colleagues sit in ${offices.length} locations across Europe, Asia, the Middle East and Africa, and most mandates cross at least one border. A corridor you know is a corridor the firm can use.`,
  },
];

/**
 * What the firm expects. Every line describes the work as content/ records it:
 * former C-suite partners, cross-border mid-market mandates, self-originated
 * relationships. Draft for partner review; nothing here is a published policy.
 */
const expectation = [
  {
    title: 'You have run something',
    body: 'Most partners here are former chief executives, finance directors or board members. The proposition to a client is that the person advising them has already sat in their chair.',
  },
  {
    title: 'You bring relationships, not a CV',
    body: 'There is no central pipeline handing you mandates. Partners originate their own work, supported by the firm and by each other.',
  },
  {
    title: 'You work across time zones',
    body: 'A company in one market, the capital in another, and a structure that has to satisfy both. Colleagues you will rely on are often several hours ahead of you.',
  },
  {
    title: 'You give your name to the advice',
    body: 'A partnership carries its judgements collectively. Work that goes out under the name of the firm has to be work every partner would sign.',
  },
];

const routes = [
  {
    id: 'partnership',
    title: 'Join the partnership',
    body: 'For senior executives who want to advise rather than operate, and who would rather build a practice than take a role. Tell us what you have run, the sectors and corridors you know, and the kind of mandate you would expect to originate in your first year.',
    mailbox: site.mailboxes.careers,
    subject: 'Joining the partnership',
  },
  {
    id: 'experienced-hires',
    title: 'Experienced hires',
    body: 'For corporate finance, strategy, risk and analytical professionals earlier in their careers. The work is small teams on live deals, so send the transactions you have worked on and what you did on them, not a list of responsibilities.',
    mailbox: site.mailboxes.careers,
    subject: 'Experienced hire enquiry',
  },
  {
    id: 'alumni',
    title: 'Alumni',
    body: 'Former colleagues stay part of the firm through the alumni network. Write to the alumni mailbox to register, to update where you are now, or to hear about alumni events.',
    mailbox: site.mailboxes.alumni,
    subject: 'Alumni network',
  },
];

function mailto(address: string, subject: string) {
  return `mailto:${address}?subject=${encodeURIComponent(subject)}`;
}

export default function CareersPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Careers', item: `${site.url}/careers` },
    ],
  };

  return (
    <>
      <PageHeader
        kicker="Careers"
        title="Join the partnership"
        lead="Adan Corporate recruits experienced people into a partnership. It does not recruit graduates into a job, and it does not run a training programme. If you have already run a company, or advised the people who do, there is a way in here."
      />

      {/* --- The proposition --- */}
      <section className="section-y" aria-labelledby="proposition-heading">
        <div className="container-site">
          <h2
            id="proposition-heading"
            data-reveal
            className="max-w-[24ch] font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
          >
            A partnership of people who have already done the job.
          </h2>
          <div className="mt-10 grid gap-x-12 gap-y-6 lg:grid-cols-12">
            <p
              data-reveal
              data-reveal-delay="1"
              className="measure text-lead text-stone-700 lg:col-span-6 lg:col-start-7"
            >
              The firm is built out of former chief executives, finance directors and board members
              who now advise founders, boards and investors in the mid-market. Joining means taking
              a share in that, with the licence to build your own practice and the obligation to
              stand behind everyone else&rsquo;s.
            </p>
          </div>
        </div>
      </section>

      {/* --- What is on offer, and what is asked in return. --- */}
      <section className="bg-white" aria-labelledby="terms-heading">
        <div className="container-site py-section">
          <h2
            id="terms-heading"
            data-reveal
            className="font-display text-display-3 leading-[1.08] tracking-[-0.02em]"
          >
            The terms, plainly
          </h2>

          <div className="mt-12 grid gap-x-16 gap-y-14 lg:grid-cols-2">
            <div>
              <h3 className="text-micro font-medium tracking-[0.06em] text-stone-500 uppercase">
                What the firm offers
              </h3>
              <dl className="mt-6">
                {offer.map((item) => (
                  <div key={item.title} className="border-t border-stone-200 py-6 last:border-b">
                    <dt className="font-display text-display-4 leading-[1.15]">{item.title}</dt>
                    <dd className="measure mt-2.5 text-body text-stone-700">{item.body}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 className="text-micro font-medium tracking-[0.06em] text-stone-500 uppercase">
                What the firm expects
              </h3>
              <dl className="mt-6">
                {expectation.map((item) => (
                  <div key={item.title} className="border-t border-stone-200 py-6 last:border-b">
                    <dt className="font-display text-display-4 leading-[1.15]">{item.title}</dt>
                    <dd className="measure mt-2.5 text-body text-stone-700">{item.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* --- The three routes. No jobs board, because there is no jobs board. --- */}
      <section className="section-y" aria-labelledby="routes-heading">
        <div className="container-site">
          <h2
            id="routes-heading"
            data-reveal
            className="font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
          >
            Three ways in
          </h2>
          <p data-reveal data-reveal-delay="1" className="measure mt-6 text-lead text-stone-700">
            There is no list of open roles on this site, because the firm does not keep one. Hiring
            happens when a partner meets someone worth making room for. Write to the mailbox that
            fits and a partner will read it.
          </p>

          <ul className="mt-12">
            {routes.map((route) => (
              <li key={route.id} className="border-t border-stone-200 last:border-b">
                <div className="grid gap-x-12 gap-y-5 py-9 lg:grid-cols-12">
                  <h3 className="font-display text-display-3 leading-[1.08] tracking-[-0.02em] lg:col-span-5">
                    {route.title}
                  </h3>
                  <div className="lg:col-span-7">
                    <p className="measure text-body text-stone-700">{route.body}</p>
                    <a
                      href={mailto(route.mailbox.address, route.subject)}
                      className="link-underline mt-5 inline-block py-1 text-small"
                    >
                      {route.mailbox.address}
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-small text-stone-500">
            Prefer a form? The{' '}
            <Link href="/contact?enquiry=join-the-firm" className="link-underline text-ink">
              enquiry router
            </Link>{' '}
            sends the same message to the same mailbox.
          </p>
        </div>
      </section>

      {/* --- Equal opportunity. Carried from the old site's own wording. --- */}
      <section className="border-t border-stone-200" aria-labelledby="fairness-heading">
        <div className="container-site py-section">
          <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12">
            <h2
              id="fairness-heading"
              className="font-display text-display-4 leading-[1.15] lg:col-span-4"
            >
              A workplace free of discrimination
            </h2>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="measure text-body text-stone-700">
                Adan Corporate recruits, hires, trains and promotes people in all job titles without
                regard to race, colour, sex, religion, ancestry, sexual orientation, gender
                identity, national origin, age, physical or mental disability, pregnancy, veteran
                status, citizenship status, marital status, genetic information, height, weight or
                any other status protected by law.
              </p>
              <Link
                href="/legal/diversity-policy"
                className="link-underline mt-5 inline-block py-1 text-small"
              >
                Read the diversity policy
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactBand
        heading="Not sure which mailbox?"
        body="Use the enquiry router. Pick what you are trying to do and where you are, and it will show you the partner and the mailbox before you write a word."
        action={{ href: '/contact?enquiry=join-the-firm', label: 'Open the enquiry router' }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
