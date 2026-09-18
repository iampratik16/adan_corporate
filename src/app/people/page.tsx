import type { Metadata } from 'next';
import { people } from '@content/people';
import { pillars } from '@content/pillars';
import { site } from '@content/site';
import { PageHeader } from '@/components/shared/PageHeader';
import { ContactBand } from '@/components/shared/ContactBand';
import { PeopleDirectory, type PersonCard } from '@/components/people/PeopleDirectory';

export const metadata: Metadata = {
  title: 'People',
  description:
    'The partners, directors, advisers and analysts of Adan Corporate, and where each of them works.',
  alternates: { canonical: '/people' },
};

export default function PeoplePage() {
  // The grid renders ten fields per person. Sending the whole record would put
  // 32 biographies and their expertise lists into the client bundle unread.
  const cards: PersonCard[] = people.map((person) => ({
    slug: person.slug,
    name: person.name,
    role: person.role,
    ...(person.roleDetail ? { roleDetail: person.roleDetail } : {}),
    group: person.group,
    city: person.city,
    timeZone: person.timeZone,
    pillars: person.pillars,
    ...(person.portrait ? { portrait: person.portrait } : {}),
    needsPortrait: person.needsPortrait,
  }));

  const pillarLabels = pillars.map((pillar) => ({ id: pillar.id, title: pillar.title }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: site.name, item: site.url },
      { '@type': 'ListItem', position: 2, name: 'People', item: `${site.url}/people` },
    ],
  };

  return (
    <>
      <PageHeader
        title="The people you would be working with"
        lead="Our partners are mostly former chief executives, finance directors and board members of listed companies. Find someone by what they do, or by where they are."
      />
      <PeopleDirectory people={cards} pillarLabels={pillarLabels} />
      <ContactBand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
