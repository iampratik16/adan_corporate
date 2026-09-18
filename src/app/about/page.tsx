import type { Metadata } from 'next';
import Link from 'next/link';
import { figures, figuresAsAt } from '@content/figures';
import { media } from '@content/media';
import { networkCategories, networkPrinciples } from '@content/network';
import { offices } from '@content/offices';
import { people } from '@content/people';
import { site } from '@content/site';
import { regions } from '@content/schema';
import { PageHeader } from '@/components/shared/PageHeader';
import { FigureRow } from '@/components/shared/FigureRow';
import { ContactBand } from '@/components/shared/ContactBand';
import { LocalTime } from '@/components/ui/LocalTime';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Adan Corporate is an international advisory firm built as a network of senior corporate ' +
    'professionals, most of them former C-suite executives of listed companies.',
  alternates: { canonical: '/about' },
};

/**
 * The figures printed here describe the firm rather than its deal record, which
 * is the homepage row's job. Every one of them traces to content/figures.ts.
 */
const ABOUT_FIGURES = [
  'professionals',
  'countries',
  'transaction-value',
  'completed-transactions',
] as const;

/**
 * The four values exactly as the firm publishes them. The source gives one line
 * each and no description, so none is written here: an invented gloss on a
 * value is the kind of thing a partner would have to unpick later.
 */
const VALUES = [
  'Commit to the highest professional standards and integrity',
  'Strive for the success of our clients',
  'Collaborate and bring out the best in each other',
  'Build an environment of inclusivity, diversity and respect',
] as const;

/**
 * The advantage, by reader. Carried from the source and rewritten: the same
 * claims, in plain sentences, with the duplicated and half-translated lines
 * repaired.
 */
const ADVANTAGE = [
  {
    title: 'For corporates',
    points: [
      'Corporate strategy first, then the transaction that serves it',
      'Pragmatic, quick and oriented to a solution',
      'Buy-side execution carried from screening to completion',
      'Access to the buyers and solution providers for a divestment',
      'Special committee advice that comes to the point',
    ],
  },
  {
    title: 'For business owners',
    points: [
      'One mandate at a time, so the view of yours is unobstructed',
      'A process run at your pace until the fit is the right one',
      'Execution built around your situation rather than a template',
      'We carry the pressure of the process so you can keep running the company',
      'A relationship that is not confined to a single transaction',
    ],
  },
  {
    title: 'For investors',
    points: [
      'A clear industry and deal focus, declared at the outset',
      'A working line between investors and entrepreneurs',
      'An acquisition strategy in place of opportunistic bids',
      'Networks that reach the right partner or target',
      'Exit planning before and after the transaction',
      'Investment banking work at mid-market scale',
    ],
  },
  {
    title: 'For management teams',
    points: [
      'Strategic support through the whole process',
      'Networks that reach the right partner or target',
      'A hands-on approach measured by the outcome',
      'Minimal interruption to the running of the business',
      'Assertive negotiation on your behalf',
    ],
  },
  {
    title: 'For prospective colleagues',
    points: [
      'No hierarchy',
      'An entrepreneurial environment with real ownership of the work',
      'Teamwork in place of individual scorekeeping',
      'Strategy advice combined with the analytical work behind it',
      'Rewards based on performance, and room to develop',
      'Exposure to decision makers across the industry',
    ],
  },
] as const;

/**
 * A full-bleed photograph between two blocks of argument. The blur data URL
 * sits behind the image so the band never opens as a white hole, and the box
 * holds its own ratio so nothing shifts when the file arrives.
 */
function EditorialBand({ id, alt }: { id: string; alt: string }) {
  const asset = media[id];
  if (!asset) return null;

  return (
    <div
      className="relative aspect-3/2 overflow-hidden bg-ink md:aspect-[21/9]"
      style={{
        backgroundImage: `url("${asset.blurDataURL}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <picture className="absolute inset-0 block size-full">
        <source
          type="image/avif"
          srcSet={asset.widths.map((w) => `/media/${id}-${w}.avif ${w}w`).join(', ')}
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet={asset.widths.map((w) => `/media/${id}-${w}.webp ${w}w`).join(', ')}
          sizes="100vw"
        />
        <img
          src={`/media/${id}-1280.webp`}
          alt={alt}
          width={asset.width}
          height={asset.height}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      </picture>
    </div>
  );
}

export default function AboutPage() {
  const shownFigures = ABOUT_FIGURES.map((id) => figures.find((f) => f.id === id)).filter(
    (f): f is NonNullable<typeof f> => Boolean(f),
  );

  const principles = networkPrinciples(offices.length);

  // Region order comes from the content schema, so the list reads the same way
  // on every page that groups by region.
  const byRegion = regions
    .map((region) => ({ region, items: offices.filter((office) => office.region === region) }))
    .filter((group) => group.items.length > 0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${site.url}/about`,
        url: `${site.url}/about`,
        name: `About | ${site.name}`,
        description: metadata.description,
        mainEntity: {
          '@type': 'Organization',
          name: site.name,
          legalName: site.legalName,
          url: site.url,
          description: site.description,
          email: site.mailboxes.partners.address,
          sameAs: [site.social.linkedin],
          address: offices.map((office) => ({
            '@type': 'PostalAddress',
            addressLocality: office.city,
            addressCountry: office.country,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
          { '@type': 'ListItem', position: 2, name: 'About', item: `${site.url}/about` },
        ],
      },
    ],
  };

  return (
    <>
      <PageHeader
        title="Built as a network, not a head office."
        lead="Adan Corporate is an international corporate advisory firm. We work with small and medium-sized enterprises and with junior to mid-tier growth companies, at every step of the value creation journey, from early funding through to a listing. Our partners are mostly former C-suite executives of listed companies, and they are based in the markets where our clients raise and transact."
      />

      {/* ---------- 1. The story ---------- */}
      <section className="section-y" aria-labelledby="story-heading">
        <div className="container-site">
          <h2
            id="story-heading"
            data-reveal
            className="max-w-[24ch] font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
          >
            Reach that belongs to people, not to a letterhead.
          </h2>

          <div className="mt-10 grid gap-x-12 gap-y-6 lg:grid-cols-12">
            <div
              data-reveal
              data-reveal-delay="1"
              className="measure text-lead text-stone-700 lg:col-span-6 lg:col-start-7"
            >
              <p>
                Success in a cross-border mandate usually comes down to reaching the right person at
                the right time. That is what the firm is: a network of multi-disciplinary corporate
                professionals who between them know the funds, the banks, the agencies and the
                family offices in the markets our clients need.
              </p>
              <p className="mt-5">
                We specialise in giving junior and mid-tier growth companies the widest practical
                reach to cross-border financing and transactions. The work runs on long-term
                relationships with banks, private equity and venture funds, promoters and investors,
                and those relationships are the reason we can put unconventional forms of financing
                in front of a client.
              </p>
              <p className="mt-5">
                <Link href="/people" className="link-underline text-body text-ink">
                  All {people.length} people
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div data-reveal className="mt-[clamp(56px,7vw,96px)]">
          <EditorialBand
            id="about-1"
            alt="Rain beaded on the inside of a tall window at blue hour, the harbour city beyond reduced to soft circles of blue and amber light."
          />
        </div>

        <div className="container-site">
          <div className="mt-[clamp(56px,7vw,96px)] grid gap-x-12 gap-y-10 lg:grid-cols-2">
            <div className="border-t border-ink pt-6">
              <h3 className="font-display text-display-4 leading-[1.15]">Our vision</h3>
              <p className="measure mt-4 text-body text-stone-700">
                To become the firm that small and medium-sized enterprises turn to first for
                corporate services, and to give entrepreneurial professionals a way of working that
                uses technology to cross borders rather than stopping at them.
              </p>
            </div>
            <div className="border-t border-ink pt-6">
              <h3 className="font-display text-display-4 leading-[1.15]">Our mission</h3>
              <p className="measure mt-4 text-body text-stone-700">
                To be a single point of contact for the corporate needs of small and medium-sized
                enterprises worldwide, through a global knowledge ecosystem in which professionals
                contribute their own experience, networks and standing, and draw on everyone
                else&rsquo;s. We hold that our success follows our clients&rsquo; success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 2. Figures ---------- */}
      <section className="section-y bg-white" aria-labelledby="figures-heading">
        <div className="container-site">
          <h2 id="figures-heading" className="sr-only">
            The firm in figures
          </h2>
          <div data-reveal>
            <FigureRow figures={shownFigures} asAt={figuresAsAt} />
          </div>
        </div>
      </section>

      {/* ---------- 3. Values ---------- */}
      <section className="section-y" aria-labelledby="values-heading">
        <div className="container-site">
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2
                id="values-heading"
                data-reveal
                className="font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
              >
                Our values
              </h2>
              <p data-reveal data-reveal-delay="1" className="mt-6 text-small text-stone-500">
                Four commitments, in the firm&rsquo;s own words.
              </p>
            </div>

            <ul data-reveal className="lg:col-span-8">
              {VALUES.map((value) => (
                <li
                  key={value}
                  className="border-t border-stone-200 py-6 font-display text-display-4 leading-[1.2] last:border-b"
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- 4. The Adan advantage ---------- */}
      <section className="section-y bg-white" aria-labelledby="advantage-heading">
        <div className="container-site">
          <h2
            id="advantage-heading"
            data-reveal
            className="max-w-[20ch] font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
          >
            The Adan advantage
          </h2>
          <p data-reveal data-reveal-delay="1" className="measure mt-6 text-lead text-stone-700">
            Small enough to care, big enough to get you there. What that means in practice depends
            on which side of the table you are sitting on.
          </p>

          <dl data-reveal className="mt-14">
            {ADVANTAGE.map((group) => (
              <div
                key={group.title}
                className="grid gap-x-12 gap-y-4 border-t border-stone-200 py-8 last:border-b lg:grid-cols-12"
              >
                <dt className="font-display text-display-4 leading-[1.15] lg:col-span-4">
                  {group.title}
                </dt>
                <dd className="lg:col-span-8">
                  <ul className="grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
                    {group.points.map((point) => (
                      <li key={point} className="text-body text-stone-700">
                        {point}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- 5. The network ---------- */}
      <section className="section-y" aria-labelledby="network-about-heading">
        <div className="container-site">
          <h2
            id="network-about-heading"
            data-reveal
            className="max-w-[24ch] font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
          >
            How the work actually gets done.
          </h2>
          <p data-reveal data-reveal-delay="1" className="measure mt-6 text-lead text-stone-700">
            Most of a cross-border mandate is knowing who to call and being able to call them. The
            firm keeps those relationships up over years, across six kinds of counterparty, and uses
            them to source deals and to place them.
          </p>

          <div data-reveal className="mt-16">
            <h3 className="font-sans text-micro font-medium tracking-[0.06em] text-stone-500 uppercase">
              Who we know
            </h3>
            <dl className="mt-6 grid gap-x-12 sm:grid-cols-2">
              {networkCategories.map((category) => (
                <div key={category.title} className="border-t border-stone-200 py-5">
                  <dt className="text-body">{category.title}</dt>
                  <dd className="mt-1.5 text-small text-stone-500">{category.items}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-reveal className="mt-16">
            <h3 className="font-sans text-micro font-medium tracking-[0.06em] text-stone-500 uppercase">
              What we are not tied to
            </h3>
            <dl className="mt-6 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-4">
              {principles.map((principle) => (
                <div key={principle.title} className="border-t border-accent py-5">
                  <dt className="font-display text-display-4 leading-[1.15]">{principle.title}</dt>
                  <dd className="mt-2 text-small text-stone-700">{principle.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div data-reveal className="mt-[clamp(56px,7vw,96px)]">
          <EditorialBand
            id="about-2"
            alt="A financial district street just after sunrise, tall stone and glass buildings receding on both sides, one distant figure walking away along wet paving."
          />
        </div>
      </section>

      {/* ---------- 6. Locations ---------- */}
      <section className="section-y" aria-labelledby="locations-heading">
        <div className="container-site">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2
              id="locations-heading"
              data-reveal
              className="font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
            >
              Where we are
            </h2>
            <Link href="/contact#offices" className="link-underline text-small">
              Addresses and contacts
            </Link>
          </div>
          <p data-reveal data-reveal-delay="1" className="measure mt-6 text-body text-stone-700">
            {offices.length} cities, with partners working from several more. The clock beside each
            city is the time there now.
          </p>

          <div data-reveal className="mt-12 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {byRegion.map((group) => (
              <section key={group.region} aria-labelledby={`region-${group.region}`}>
                <h3
                  id={`region-${group.region}`}
                  className="font-sans text-micro font-medium tracking-[0.06em] text-stone-500 uppercase"
                >
                  {group.region}
                </h3>
                <ul className="mt-4">
                  {group.items.map((office) => (
                    <li
                      key={office.slug}
                      className="flex items-baseline justify-between gap-4 border-t border-stone-200 py-4 last:border-b"
                    >
                      <span className="min-w-0">
                        <Link href={`/contact#${office.slug}`} className="link-underline text-body">
                          {office.city}
                        </Link>
                        <span className="mt-0.5 block text-micro text-stone-500">
                          {office.country}
                        </span>
                      </span>
                      <LocalTime
                        timeZone={office.timeZone}
                        className="shrink-0 text-micro text-stone-500"
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <ContactBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
