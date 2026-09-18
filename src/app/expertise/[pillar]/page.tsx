import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { people } from '@content/people';
import { pillars } from '@content/pillars';
import { site } from '@content/site';
import { transactions } from '@content/transactions';
import { ContactBand } from '@/components/shared/ContactBand';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tombstone } from '@/components/shared/Tombstone';
import { LocalTime } from '@/components/ui/LocalTime';
import { Portrait } from '@/components/ui/Portrait';
import { MeridianField } from '@/components/home/MeridianField';
import { CapabilityGroups } from '@/components/expertise/CapabilityGroups';
import { PillarIndex } from '@/components/expertise/PillarIndex';
import { PillarPicture } from '@/components/expertise/PillarPicture';
import { pillarImage } from '@/lib/pillar-media';

/** The most relevant deals, not all of them. The full record is /transactions. */
const TRANSACTION_LIMIT = 6;

export function generateStaticParams() {
  return pillars.map((pillar) => ({ pillar: pillar.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string }>;
}): Promise<Metadata> {
  const { pillar: id } = await params;
  const pillar = pillars.find((entry) => entry.id === id);
  if (!pillar) return {};

  return {
    title: pillar.title,
    description: pillar.statement,
    alternates: { canonical: `/expertise/${pillar.id}` },
    openGraph: {
      title: `${pillar.title} | ${site.name}`,
      description: pillar.statement,
      url: `${site.url}/expertise/${pillar.id}`,
    },
  };
}

export default async function PillarPage({ params }: { params: Promise<{ pillar: string }> }) {
  const { pillar: id } = await params;
  const pillar = pillars.find((entry) => entry.id === id);
  if (!pillar) notFound();

  const image = pillarImage(pillar.id);
  const leads = pillar.leads
    .map((slug) => people.find((person) => person.slug === slug))
    .filter((person): person is NonNullable<typeof person> => Boolean(person));
  const related = transactions
    .filter((transaction) => transaction.pillars.includes(pillar.id))
    .slice(0, TRANSACTION_LIMIT);
  const route = site.enquiryRoutes.find((entry) => entry.pillar === pillar.id);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Expertise', item: `${site.url}/expertise` },
      {
        '@type': 'ListItem',
        position: 3,
        name: pillar.title,
        item: `${site.url}/expertise/${pillar.id}`,
      },
    ],
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: pillar.title,
    serviceType: pillar.descriptor,
    description: pillar.statement,
    url: `${site.url}/expertise/${pillar.id}`,
    provider: { '@type': 'Organization', name: site.name, url: site.url },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${pillar.title} capabilities`,
      itemListElement: pillar.capabilities.map((capability) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: capability.title,
          description: capability.description,
        },
      })),
    },
  };

  return (
    <>
      <PageHeader breadcrumb={{ href: '/expertise', label: 'Expertise' }} title={pillar.title}>
        <p className="measure mt-8 font-display text-display-4 leading-[1.3] tracking-[-0.012em]">
          {pillar.statement}
        </p>
      </PageHeader>

      {/* --- The opening image, full bleed. AI & Digital has none by design. --- */}
      {image ? (
        <div className="h-[clamp(240px,42vw,560px)] w-full overflow-hidden bg-stone-100">
          <PillarPicture image={image} alt={pillar.imageAlt ?? ''} sizes="100vw" priority />
        </div>
      ) : (
        <div
          className="band-ink relative h-[clamp(240px,42vw,560px)] w-full overflow-hidden"
          aria-hidden="true"
        >
          <MeridianField />
        </div>
      )}

      {/* --- 1. Capability groups, with the sticky index beside them. --- */}
      <section className="section-y" aria-labelledby="capabilities-heading">
        <div className="container-site">
          <div className="grid gap-x-12 lg:grid-cols-12">
            {/* Sticky needs a grid item sized to its content, so the whole
                column is the sticky box and travels within the grid row. */}
            <div className="lg:col-span-3 lg:sticky lg:top-32 lg:self-start">
              <h2
                id="capabilities-heading"
                data-reveal
                className="font-display text-display-3 leading-[1.08] tracking-[-0.018em]"
              >
                What we do
              </h2>
              <div className="mt-10">
                <PillarIndex
                  label={`${pillar.title} capabilities`}
                  sections={pillar.capabilities.map((capability) => ({
                    id: capability.id,
                    label: capability.title,
                  }))}
                />
              </div>
            </div>

            <div className="lg:col-span-8 lg:col-start-5">
              <CapabilityGroups
                groups={pillar.capabilities.map((capability) => ({
                  id: capability.id,
                  title: capability.title,
                  description: capability.description,
                  items: capability.items,
                }))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. How we work. A real sequence, so the numbers are earned. --- */}
      <section id="how-we-work" className="bg-white" aria-labelledby="how-we-work-heading">
        <div className="container-site py-section">
          <h2
            id="how-we-work-heading"
            data-reveal
            className="max-w-[20ch] font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
          >
            How we work
          </h2>

          <ol className="mt-12 grid gap-x-12 gap-y-0 md:grid-cols-2 lg:grid-cols-3">
            {pillar.howWeWork.map((step, index) => (
              <li key={step.title} className="border-t border-stone-200 py-8">
                <span className="tabular block text-micro text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-display-4 leading-[1.15] tracking-[-0.015em]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[42ch] text-body text-stone-700">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --- 3. Relevant transactions. --- */}
      <section id="transactions" className="section-y" aria-labelledby="transactions-heading">
        <div className="container-site">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2
              id="transactions-heading"
              data-reveal
              className="font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
            >
              Relevant transactions
            </h2>
            <Link href="/transactions" className="link-underline text-small">
              All transactions
            </Link>
          </div>

          {related.length > 0 ? (
            <ul className="mt-12 border-b border-stone-200">
              {related.map((transaction) => (
                <Tombstone key={transaction.id} transaction={transaction} />
              ))}
            </ul>
          ) : (
            <p className="measure mt-10 text-body text-stone-700">
              No completed transaction in the published record is filed under this area yet. The
              full list is on the transactions page.
            </p>
          )}
        </div>
      </section>

      {/* --- 4. The partners who lead the area. --- */}
      {leads.length > 0 && (
        <section id="leadership" className="bg-white" aria-labelledby="leadership-heading">
          <div className="container-site py-section">
            <h2
              id="leadership-heading"
              data-reveal
              className="max-w-[24ch] font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
            >
              Who leads this work
            </h2>

            <ul
              className={`mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 ${
                leads.length > 2 ? 'lg:grid-cols-3' : ''
              }`}
            >
              {leads.map((person) => (
                <li key={person.slug}>
                  <Link href={`/people/${person.slug}`} className="group block">
                    <div className="overflow-hidden">
                      <Portrait
                        person={person}
                        sizes={
                          leads.length > 2
                            ? '(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 100vw'
                            : '(min-width: 640px) 44vw, 100vw'
                        }
                        className="transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-ink pt-4">
                      <div>
                        <h3 className="font-display text-display-4 leading-[1.15]">
                          <span className="link-underline">{person.name}</span>
                        </h3>
                        <p className="mt-1 text-small text-stone-700">
                          {person.role}
                          {person.roleDetail ? `, ${person.roleDetail.toLowerCase()}` : ''}
                        </p>
                      </div>
                      <p className="shrink-0 text-right text-micro text-stone-500">
                        {person.city}
                        <br />
                        <LocalTime timeZone={person.timeZone} showDot={false} />
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* --- 5. Contact, routed to this pillar. --- */}
      <ContactBand
        body={`Tell us what you are trying to do and we will put you in front of the partners who lead ${pillar.title.toLowerCase()}. No call centre, no junior triage.`}
        action={{
          href: route ? `/contact?enquiry=${route.id}` : '/contact',
          label: route ? route.label : 'Start a conversation',
        }}
      />

      <script
        type="application/ld+json"
        // Static, build-time JSON from typed content. No user input reaches it.
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbLd, serviceLd]) }}
      />
    </>
  );
}
