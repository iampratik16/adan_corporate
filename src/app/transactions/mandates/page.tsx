import type { Metadata } from 'next';
import { site } from '@content/site';
import { mandates, transactions } from '@content/transactions';
import { ContactBand } from '@/components/shared/ContactBand';
import { PageHeader } from '@/components/shared/PageHeader';
import { MandateTable } from '../MandateTable';
import { MANDATE_BANDS, TransactionNav, facets, withAll } from '../shared';

export const metadata: Metadata = {
  title: 'Current mandates',
  description:
    'Mandates the firm is working on today, by type, size, industry and region. Client names are withheld.',
  alternates: { canonical: '/transactions/mandates' },
};

export default function MandatesPage() {
  return (
    <>
      <PageHeader
        kicker="Track record"
        title="Current mandates"
        lead="Situations the firm is working on now. Each one carries an enquiry route to the partner running it."
      />

      <TransactionNav
        current="mandates"
        counts={{ completed: transactions.length, mandates: mandates.length }}
      />

      <MandateTable
        mandates={mandates}
        industryOptions={withAll(facets(mandates.map((m) => [m.industry])), mandates.length)}
        regionOptions={withAll(facets(mandates.map((m) => [m.region])), mandates.length)}
        bandOptions={withAll(
          facets(
            mandates.map((m) => [m.band]),
            MANDATE_BANDS,
          ),
          mandates.length,
        )}
        enquiryMailbox={site.mailboxes.partners.address}
      />

      <ContactBand
        heading="Interested in one of these?"
        body="Tell us which situation and what you are looking for. We will route you to the partner running it."
        action={{ href: '/contact', label: 'Speak to a partner' }}
      />
    </>
  );
}
