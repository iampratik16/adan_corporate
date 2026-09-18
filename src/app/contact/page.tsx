import type { Metadata } from 'next';
import { media } from '@content/media';
import { offices } from '@content/offices';
import { site } from '@content/site';
import { PICKABLE, selectPartners } from '@/lib/enquiry';
import { PageHeader } from '@/components/shared/PageHeader';
import { LocalTime } from '@/components/ui/LocalTime';
import { Portrait } from '@/components/ui/Portrait';
import { EnquiryForm } from './EnquiryForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us what you are trying to do and we will show you the partner who has done it before, ' +
    'with the mailbox to write to and every office address.',
  alternates: { canonical: '/contact' },
};

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? '') : (value ?? '');
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const requested = first(params.enquiry);
  const route =
    site.enquiryRoutes.find((candidate) => candidate.id === requested) ?? site.enquiryRoutes[0];

  const requestedRegion = first(params.region);
  const region = PICKABLE.find((candidate) => candidate === requestedRegion) ?? '';

  const { partners, reason } = selectPartners(route.pillar, region);

  const byRegion = PICKABLE.map((name) => ({
    name,
    list: offices.filter((office) => office.region === name),
  })).filter((group) => group.list.length > 0);

  const photograph = media['contact'];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${site.name}`,
    url: `${site.url}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      contactPoint: Object.values(site.mailboxes).map((mailbox) => ({
        '@type': 'ContactPoint',
        contactType: mailbox.label,
        email: mailbox.address,
        description: mailbox.purpose,
      })),
    },
  };

  return (
    <>
      <PageHeader
        kicker="Contact"
        title="Speak to a partner"
        lead="Tell us what you are trying to do and where you are. We will show you the partner who has done it before, and the mailbox that reaches them."
      />

      {photograph && (
        <div className="container-site pt-[clamp(32px,4vw,56px)]">
          <div className="aspect-16/9 overflow-hidden bg-stone-100">
            <picture className="block size-full">
              <source
                type="image/avif"
                srcSet={photograph.widths.map((w) => `/media/contact-${w}.avif ${w}w`).join(', ')}
                sizes="(min-width: 1440px) 1360px, 100vw"
              />
              <source
                type="image/webp"
                srcSet={photograph.widths.map((w) => `/media/contact-${w}.webp ${w}w`).join(', ')}
                sizes="(min-width: 1440px) 1360px, 100vw"
              />
              <img
                src="/media/contact-1280.webp"
                alt="A heavy timber door standing ajar onto a bright corridor, daylight lying across a pale stone floor."
                width={photograph.width}
                height={photograph.height}
                fetchPriority="high"
                decoding="async"
                className="size-full object-cover"
              />
            </picture>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- router */}
      <section className="section-y" aria-labelledby="router-heading">
        <div className="container-site">
          <h2
            id="router-heading"
            data-reveal
            className="max-w-[20ch] font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
          >
            What are you trying to do?
          </h2>

          {/* A plain GET form. The whole router runs on the server, so it needs
              no JavaScript and the resulting URL can be shared or bookmarked. */}
          <form method="get" action="/contact" className="mt-10 border-t border-stone-200 pt-8">
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <label htmlFor="enquiry" className="text-small font-medium">
                  My enquiry is
                </label>
                <select
                  id="enquiry"
                  name="enquiry"
                  defaultValue={route.id}
                  className="mt-2 w-full border border-stone-300 bg-white px-3.5 py-3 text-body text-ink"
                >
                  {site.enquiryRoutes.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-4">
                <label htmlFor="region" className="text-small font-medium">
                  I am in
                </label>
                <select
                  id="region"
                  name="region"
                  defaultValue={region}
                  className="mt-2 w-full border border-stone-300 bg-white px-3.5 py-3 text-body text-ink"
                >
                  <option value="">No preference</option>
                  {PICKABLE.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end lg:col-span-2">
                <button type="submit" className="btn w-full">
                  Show me who
                </button>
              </div>
            </div>
          </form>

          {/* ---------------------------------------------------------- result */}
          <div className="mt-14 grid gap-x-16 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h3 className="font-display text-display-4 leading-[1.15]">
                {reason === 'matched' || reason === 'wrong-region'
                  ? 'Speak to'
                  : 'Start with the managing partners'}
              </h3>
              <p className="measure mt-3 text-small text-stone-500">
                {reason === 'matched' &&
                  `Partners who work on ${route.label.replace(/^I want to /, '')}${
                    region ? ` in ${region}` : ''
                  }. Write to ${route.mailbox} and name the person you want.`}
                {reason === 'wrong-region' &&
                  `No partner in ${region} covers this, so these are the partners who do, wherever they sit. Write to ${route.mailbox}.`}
                {reason === 'no-pillar' &&
                  `This route is not tied to one area of the practice, so it goes to the managing partners. Write to ${route.mailbox}.`}
                {reason === 'nothing' &&
                  `We could not match a partner to that combination, so this is the managing partners. Write to ${route.mailbox} and they will route it.`}
              </p>

              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-2">
                {partners.map((person) => (
                  <li key={person.slug}>
                    <a href={`/people/${person.slug}`} className="group block">
                      <Portrait
                        person={person}
                        sizes="(min-width: 1024px) 16vw, (min-width: 640px) 28vw, 44vw"
                      />
                      <p className="mt-3 font-display text-[1.25rem] leading-[1.2]">
                        {person.name}
                      </p>
                      <p className="mt-1 text-micro text-stone-500">{person.role}</p>
                      <p className="mt-1.5 text-micro text-stone-500">
                        {person.city} <LocalTime timeZone={person.timeZone} className="ml-1" />
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <EnquiryForm
                enquiryId={route.id}
                enquiryLabel={route.label}
                mailbox={route.mailbox}
                region={region}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- offices */}
      <section
        id="offices"
        className="border-t border-stone-200 bg-white"
        aria-labelledby="offices-heading"
      >
        <div className="container-site py-section">
          <h2
            id="offices-heading"
            data-reveal
            className="font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
          >
            Offices
          </h2>
          <p className="measure mt-6 text-lead text-stone-700">
            {offices.length} locations, and partners in cities beyond them. Every address below is
            carried across from the existing site and is being re-verified with the firm.
          </p>

          {byRegion.map((group) => (
            <div key={group.name} className="mt-14">
              <h3 className="border-b border-ink pb-3 text-micro font-medium tracking-[0.06em] text-stone-500 uppercase">
                {group.name}
              </h3>
              <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                {group.list.map((office) => (
                  <li key={office.slug} id={office.slug} className="border-b border-stone-200 py-8">
                    <h4 className="font-display text-display-4 leading-[1.15]">{office.city}</h4>
                    <p className="mt-1 text-micro text-stone-500">
                      {office.country} <LocalTime timeZone={office.timeZone} className="ml-1" />
                    </p>

                    {office.address.length > 0 && (
                      <address className="mt-4 text-small not-italic text-stone-700">
                        {office.address.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                    )}

                    {office.phone && (
                      <p className="mt-4 text-small">
                        <a
                          href={`tel:${office.phone.replace(/[^+\d]/g, '')}`}
                          className="link-underline tabular inline-block py-1 text-stone-700"
                        >
                          {office.phone}
                        </a>
                      </p>
                    )}

                    {office.address.length === 0 && !office.phone && (
                      <p className="mt-4 text-small text-stone-500">
                        Address and telephone to be confirmed. Email is the only routing published
                        for this office.
                      </p>
                    )}

                    {office.contactEmail && (
                      <p className="mt-4 text-small">
                        {office.contactName && (
                          <span className="block text-stone-500">{office.contactName}</span>
                        )}
                        <a
                          href={`mailto:${office.contactEmail}`}
                          className="link-underline inline-block py-1"
                        >
                          {office.contactEmail}
                        </a>
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- mailboxes */}
      <section className="section-y" aria-labelledby="mailboxes-heading">
        <div className="container-site">
          <h2
            id="mailboxes-heading"
            className="font-display text-display-3 leading-[1.08] tracking-[-0.02em]"
          >
            General mailboxes
          </h2>
          <dl className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(site.mailboxes).map(([key, mailbox]) => (
              <div key={key} className="border-t border-stone-200 py-6">
                <dt className="text-micro font-medium tracking-[0.06em] text-stone-500 uppercase">
                  {mailbox.label}
                </dt>
                <dd className="mt-3">
                  <a
                    href={`mailto:${mailbox.address}`}
                    className="link-underline inline-block py-1 text-small"
                  >
                    {mailbox.address}
                  </a>
                  <p className="mt-2 text-micro text-stone-500">{mailbox.purpose}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
