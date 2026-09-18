import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { insights } from '@content/insights';
import { people } from '@content/people';
import { pillars } from '@content/pillars';
import { site } from '@content/site';
import { transactions } from '@content/transactions';
import { ContactBand } from '@/components/shared/ContactBand';
import { Prose } from '@/components/shared/Prose';
import { Tombstone } from '@/components/shared/Tombstone';
import { LocalTime } from '@/components/ui/LocalTime';
import { Portrait } from '@/components/ui/Portrait';

export function generateStaticParams() {
  return people.map((person) => ({ slug: person.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = people.find((entry) => entry.slug === slug);
  if (!person) return {};

  const role = person.roleDetail ? `${person.role}, ${person.roleDetail}` : person.role;
  return {
    title: person.name,
    description: `${person.name}, ${role} at ${site.name}, based in ${person.city}. ${person.bio.slice(0, 150).trim()}`,
    alternates: { canonical: `/people/${person.slug}` },
    openGraph: {
      type: 'profile',
      title: `${person.name} | ${site.name}`,
      description: `${role}, ${person.city}.`,
      url: `${site.url}/people/${person.slug}`,
    },
  };
}

/** A tag that is not a link. Used for sectors and geographies, which have no page. */
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="border border-stone-200 px-2.5 py-1 text-micro text-stone-500">{children}</li>
  );
}

/** A labelled band of tags. Renders nothing when the person has none. */
function TagBand({ heading, items }: { heading: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="border-t border-stone-200 py-7 lg:grid lg:grid-cols-12 lg:gap-x-12">
      <h3 className="text-small text-stone-700 lg:col-span-3">{heading}</h3>
      <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5 lg:col-span-9 lg:mt-0">
        {items.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </ul>
    </div>
  );
}

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = people.find((entry) => entry.slug === slug);
  if (!person) notFound();

  const role = person.roleDetail ? `${person.role}, ${person.roleDetail}` : person.role;
  // "Dr Nicholas Beecroft" should be addressed as Nicholas, not as Dr.
  const firstName =
    person.name.split(/\s+/).filter((part) => !/^(dr|mr|mrs|ms|prof)\.?$/i.test(part))[0] ??
    person.name;

  const personPillars = person.pillars
    .map((id) => pillars.find((pillar) => pillar.id === id))
    .filter((pillar): pillar is NonNullable<typeof pillar> => Boolean(pillar));

  // Transactions the firm completed in this person's areas. Deliberately not
  // presented as their own mandates: the source attributes no deal to a named
  // individual, and inventing that attribution is the one thing we cannot do.
  const related = transactions
    .filter((transaction) => transaction.pillars.some((id) => person.pillars.includes(id)))
    .slice(0, 4);

  const written = insights.filter((insight) => insight.authorSlug === person.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: role,
    email: `mailto:${person.email}`,
    url: `${site.url}/people/${person.slug}`,
    ...(person.linkedin ? { sameAs: [person.linkedin] } : {}),
    worksFor: { '@type': 'Organization', name: site.name, url: site.url },
    workLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: person.city,
        addressCountry: person.country,
      },
    },
    ...(person.expertise.length > 0 ? { knowsAbout: person.expertise } : {}),
  };

  return (
    <article>
      {/* --- Masthead. The one page where the H1 sits beside an image, because
          the photograph is half of what a reader came for. --- */}
      <header className="border-b border-stone-200">
        <div className="container-site pt-[clamp(128px,15vw,200px)] pb-[clamp(48px,6vw,80px)]">
          <Link
            href="/people"
            data-print-hide
            className="link-underline mb-8 inline-block text-micro text-stone-500"
          >
            People
          </Link>

          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-4" data-profile-portrait>
              <div style={{ viewTransitionName: `portrait-${person.slug}` }}>
                <Portrait
                  person={person}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  priority
                />
              </div>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <h1 className="font-display text-display-2 leading-[1.04] tracking-[-0.02em]">
                {person.name}
              </h1>
              <p className="mt-5 text-lead text-stone-700">{role}</p>

              <dl className="mt-9 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                <div>
                  <dt className="text-micro text-stone-500">Based in</dt>
                  <dd className="mt-1 text-small">
                    {person.city}, {person.country}
                    <span className="ml-2 text-stone-500">
                      <LocalTime timeZone={person.timeZone} />
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-micro text-stone-500">Email</dt>
                  <dd className="mt-1 text-small">
                    <a href={`mailto:${person.email}`} className="link-underline break-all">
                      {person.email}
                    </a>
                  </dd>
                </div>
                {person.linkedin && (
                  <div>
                    <dt className="text-micro text-stone-500">LinkedIn</dt>
                    <dd className="mt-1 text-small">
                      <a
                        href={person.linkedin}
                        rel="noreferrer"
                        target="_blank"
                        className="link-underline"
                      >
                        View profile
                      </a>
                    </dd>
                  </div>
                )}
              </dl>

              <a
                href={`/people/${person.slug}/vcard`}
                download={`${person.slug}.vcf`}
                data-print-hide
                className="btn btn-quiet mt-9"
              >
                Save contact card
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* --- Biography --- */}
      <section className="section-y" aria-labelledby="biography-heading">
        <div className="container-site lg:grid lg:grid-cols-12 lg:gap-x-12">
          <h2
            id="biography-heading"
            data-reveal
            className="font-display text-display-4 leading-[1.15] lg:col-span-3"
          >
            Biography
          </h2>
          <div className="mt-6 lg:col-span-8 lg:col-start-5 lg:mt-0">
            <Prose>
              <p>{person.bio}</p>
            </Prose>
          </div>
        </div>
      </section>

      {/* --- Expertise, sectors, geographies --- */}
      {(personPillars.length > 0 ||
        person.expertise.length > 0 ||
        person.sectors.length > 0 ||
        person.geographies.length > 0) && (
        <section className="pb-section" aria-labelledby="expertise-heading">
          <div className="container-site">
            <h2
              id="expertise-heading"
              data-reveal
              className="font-display text-display-3 leading-[1.06] tracking-[-0.018em]"
            >
              What {firstName} works on
            </h2>

            <div className="mt-10" data-print-block>
              {personPillars.length > 0 && (
                <div className="border-t border-stone-200 py-7 lg:grid lg:grid-cols-12 lg:gap-x-12">
                  <h3 className="text-small text-stone-700 lg:col-span-3">Practice areas</h3>
                  <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5 lg:col-span-9 lg:mt-0">
                    {personPillars.map((pillar) => (
                      <li key={pillar.id}>
                        <Link
                          href={`/expertise/${pillar.id}`}
                          className="inline-block border border-stone-300 px-2.5 py-1 text-micro text-stone-700 transition-colors duration-ui hover:border-ink hover:text-ink"
                        >
                          {pillar.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <TagBand heading="Expertise" items={person.expertise} />
              <TagBand heading="Sectors" items={person.sectors} />
              <TagBand heading="Geographies" items={person.geographies} />
              <hr className="rule" />
            </div>
          </div>
        </section>
      )}

      {/* --- Transactions in the same areas --- */}
      {related.length > 0 && (
        <section className="pb-section" aria-labelledby="transactions-heading">
          <div className="container-site">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2
                id="transactions-heading"
                data-reveal
                className="font-display text-display-3 leading-[1.06] tracking-[-0.018em]"
              >
                Transactions in these areas
              </h2>
              <Link href="/transactions" className="link-underline text-small" data-print-hide>
                All transactions
              </Link>
            </div>
            <p className="measure mt-5 text-small text-stone-500">
              Completed firm transactions in the practice areas above. The record is anonymised and
              is not an attribution of individual mandates.
            </p>
            <ul className="mt-10 border-b border-stone-200">
              {related.map((transaction) => (
                <Tombstone key={transaction.id} transaction={transaction} />
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* --- Anything this person has published --- */}
      {written.length > 0 && (
        <section className="pb-section" aria-labelledby="writing-heading">
          <div className="container-site">
            <h2
              id="writing-heading"
              data-reveal
              className="font-display text-display-3 leading-[1.06] tracking-[-0.018em]"
            >
              Published by {firstName}
            </h2>
            <ul className="mt-10 border-b border-stone-200">
              {written.map((insight) => (
                <li key={insight.slug} className="border-t border-stone-200">
                  <Link
                    href={insight.external ?? `/insights/${insight.slug}`}
                    className="group grid gap-x-8 gap-y-2 py-6 md:grid-cols-12 md:items-baseline"
                    {...(insight.external ? { rel: 'noreferrer', target: '_blank' } : {})}
                  >
                    <time
                      dateTime={insight.date}
                      className="tabular text-micro text-stone-500 md:col-span-2"
                    >
                      {new Date(insight.date).toLocaleDateString('en-GB', {
                        month: 'short',
                        year: 'numeric',
                        timeZone: 'UTC',
                      })}
                    </time>
                    <h3 className="font-display text-display-4 leading-[1.15] md:col-span-6">
                      <span className="link-underline">{insight.title}</span>
                    </h3>
                    <p className="text-small text-stone-500 md:col-span-4">{insight.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div data-print-hide>
        <ContactBand
          heading={`Speak to ${person.name}.`}
          body={`Write to ${firstName} directly. Enquiries reach the partner, not a central desk.`}
          action={{ href: `mailto:${person.email}`, label: `Email ${firstName}` }}
          media={false}
        />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
