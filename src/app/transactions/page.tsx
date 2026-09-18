import type { Metadata } from 'next';
import { pillars } from '@content/pillars';
import { mandates, transactions } from '@content/transactions';
import { ContactBand } from '@/components/shared/ContactBand';
import { PageHeader } from '@/components/shared/PageHeader';
import { CompletedList, type CompletedItem } from './CompletedList';
import { COMPLETED_BANDS, TransactionNav, facets, sortKey, withAll } from './shared';

export const metadata: Metadata = {
  title: 'Transactions',
  description:
    'Completed transactions. The deals are anonymised: no client is named, and a value that was ' +
    'never disclosed is shown as undisclosed.',
  alternates: { canonical: '/transactions' },
};

export default function TransactionsPage() {
  const sorted = [...transactions].sort((a, b) => sortKey(b.valueUsd) - sortKey(a.valueUsd));

  // Only the fields a tombstone prints, plus the four filter keys. valueUsd has
  // done its job above and stays on the server.
  const items: CompletedItem[] = sorted.map((transaction) => ({
    id: transaction.id,
    corridor: transaction.corridor,
    value: transaction.value,
    ...(transaction.year === undefined ? {} : { year: transaction.year }),
    headline: transaction.headline,
    sectors: transaction.sectors,
    roles: transaction.roles,
    pillars: transaction.pillars,
    regions: transaction.regions,
    band: transaction.band,
  }));

  // Options come from the data, never from a fixed list. The old site offered
  // thirty industries for the twelve that existed, and every unused one was a
  // dead end.
  const pillarOptions = withAll(
    pillars
      .map((pillar) => ({
        value: pillar.id,
        label: pillar.title,
        count: transactions.filter((t) => t.pillars.includes(pillar.id)).length,
      }))
      .filter((option) => option.count > 0),
    transactions.length,
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Completed transactions',
    description: 'Transactions completed by Adan Corporate. Client names are withheld.',
    numberOfItems: sorted.length,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    itemListElement: sorted.map((transaction, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: transaction.headline,
    })),
  };

  return (
    <>
      <PageHeader
        kicker="Track record"
        title="Transactions"
        lead="A record of completed work. The deals are anonymised: no client is named, and a value that was never disclosed is shown as undisclosed."
      />

      <TransactionNav
        current="completed"
        counts={{ completed: transactions.length, mandates: mandates.length }}
      />

      <CompletedList
        items={items}
        pillarOptions={pillarOptions}
        sectorOptions={withAll(facets(transactions.map((t) => t.sectors)), transactions.length)}
        regionOptions={withAll(facets(transactions.map((t) => t.regions)), transactions.length)}
        bandOptions={withAll(
          facets(
            transactions.map((t) => [t.band]),
            COMPLETED_BANDS,
          ),
          transactions.length,
        )}
      />

      <ContactBand
        heading="Considering a transaction?"
        body="Bring us the situation rather than a mandate. A partner who has run one of these will tell you whether it is fundable, and what it would take."
        action={{ href: '/contact', label: 'Speak to a partner' }}
      />

      <script
        type="application/ld+json"
        // Static, build-time JSON from typed content. No user input reaches it.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
