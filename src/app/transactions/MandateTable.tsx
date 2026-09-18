'use client';

import { useMemo, useState } from 'react';
import type { Mandate } from '@content/schema';
import { FilterGroup, ResultCount } from '@/components/shared/FilterBar';
import { formatList, type Facet } from './CompletedList';

const ALL = 'all';

/**
 * Current mandates as a table, not as cards.
 *
 * Thirty-one rows of reference, type, amount, industry and region are tabular
 * data: a reader compares down a column, which a grid of cards makes
 * impossible. The table sits in a scrollable, focusable region so the page
 * itself never scrolls sideways on a narrow screen.
 */
export function MandateTable({
  mandates,
  industryOptions,
  regionOptions,
  bandOptions,
  enquiryMailbox,
}: {
  mandates: Mandate[];
  industryOptions: Facet[];
  regionOptions: Facet[];
  bandOptions: Facet[];
  enquiryMailbox: string;
}) {
  const [industry, setIndustry] = useState(ALL);
  const [region, setRegion] = useState(ALL);
  const [band, setBand] = useState(ALL);

  const filtered = useMemo(
    () =>
      mandates.filter(
        (mandate) =>
          (industry === ALL || mandate.industry === industry) &&
          (region === ALL || mandate.region === region) &&
          (band === ALL || mandate.band === band),
      ),
    [mandates, industry, region, band],
  );

  const active = [
    industry !== ALL && industry,
    region !== ALL && region,
    band !== ALL && band,
  ].filter((label): label is string => Boolean(label));

  const clearAll = () => {
    setIndustry(ALL);
    setRegion(ALL);
    setBand(ALL);
  };

  return (
    <div className="container-site pt-[clamp(40px,5vw,64px)] pb-[clamp(72px,9vw,128px)]">
      <h2 className="sr-only">Current mandates</h2>

      {/* The one piece of copy on this page that is not yet the firm's own. */}
      <div role="note" className="border-l-2 border-accent bg-white px-5 py-5 md:px-7 md:py-6">
        <p className="text-micro font-medium tracking-[0.06em] text-accent uppercase">
          Placeholder notice, awaiting the firm
        </p>
        <p className="measure mt-3 text-small text-stone-700">
          The currency of these mandates is to be confirmed. They are carried over from a page that
          held no date and no last-updated field, so none of them should be read as live until the
          firm has reviewed the list. References, amounts, industries and regions are the
          source&rsquo;s own wording.
        </p>
      </div>

      <div className="mt-10 grid gap-x-10 gap-y-7 border-t border-stone-200 pt-8 md:grid-cols-3">
        <FilterGroup
          label="Industry"
          options={industryOptions}
          value={industry}
          onChange={setIndustry}
        />
        <FilterGroup label="Region" options={regionOptions} value={region} onChange={setRegion} />
        <FilterGroup label="Band" options={bandOptions} value={band} onChange={setBand} />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 pt-5">
        <ResultCount count={filtered.length} noun="mandate" />
        {active.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="link-underline py-1 text-small text-stone-700"
          >
            Clear all filters
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <>
          {/*
          Stacked records on a phone, a real table on a desktop.

          Seven columns cannot be read at 320px: the table has to be scrolled
          sideways inside its own box, which means a reader on a phone works
          twice for every row. The same records stacked read straight down.
          Both come from one filtered array, so they never disagree.
        */}
          <ul className="mt-2 lg:hidden">
            {filtered.map((mandate) => (
              <li
                key={mandate.ref}
                className="border-b border-stone-200 py-6 first:border-t first:border-ink"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="tabular text-micro text-stone-500">Ref. {mandate.ref}</span>
                  <span className="figure-value font-display text-display-4 leading-none tracking-[-0.02em]">
                    {mandate.amount}
                  </span>
                </div>
                <p className="mt-3 text-body text-ink">{mandate.description}</p>
                <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">
                  {[
                    ['Type', mandate.dealType],
                    ['Industry', mandate.industry],
                    ['Region', mandate.region],
                    ['Size band', mandate.band],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-micro text-stone-500">{label}</dt>
                      <dd className="mt-0.5 text-small text-stone-700">{value}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href={`mailto:${enquiryMailbox}?subject=${encodeURIComponent(
                    `Mandate ${mandate.ref}`,
                  )}`}
                  className="link-underline mt-5 inline-block text-small text-accent-deep"
                >
                  Enquire
                  <span className="sr-only"> about mandate {mandate.ref}</span>
                </a>
              </li>
            ))}
          </ul>

          <div
            role="region"
            aria-label="Current mandates"
            tabIndex={0}
            className="mt-2 hidden overflow-x-auto lg:block"
          >
            <table className="w-full min-w-[56rem] border-collapse text-left">
              <caption className="sr-only">
                Current mandates, with reference, type, amount, industry, region and description.
              </caption>
              <thead>
                <tr className="border-y border-ink">
                  <Th className="w-[5rem]">Ref.</Th>
                  <Th className="w-[10rem]">Type</Th>
                  <Th className="w-[7rem]">Amount</Th>
                  <Th className="w-[11rem]">Industry</Th>
                  <Th className="w-[11rem]">Region</Th>
                  <Th>Description</Th>
                  <Th className="w-[6rem]">
                    <span className="sr-only">Enquiry</span>
                  </Th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((mandate) => (
                  <tr key={mandate.ref} className="border-b border-stone-200 align-top">
                    <th
                      scope="row"
                      className="tabular py-5 pr-4 text-small font-medium whitespace-nowrap"
                    >
                      {mandate.ref}
                    </th>
                    <td className="py-5 pr-4 text-small text-stone-700">{mandate.dealType}</td>
                    <td className="tabular py-5 pr-4 text-small whitespace-nowrap">
                      {mandate.amount}
                    </td>
                    <td className="py-5 pr-4 text-small text-stone-700">{mandate.industry}</td>
                    <td className="py-5 pr-4 text-small text-stone-700">{mandate.region}</td>
                    <td className="py-5 pr-4 text-small text-stone-700">{mandate.description}</td>
                    <td className="py-5">
                      <a
                        href={`mailto:${enquiryMailbox}?subject=${encodeURIComponent(
                          `Mandate ${mandate.ref}`,
                        )}`}
                        className="link-underline inline-block py-1 text-small text-accent-deep"
                      >
                        Enquire
                        <span className="sr-only"> about mandate {mandate.ref}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="mt-2 border-t border-b border-stone-200 py-[clamp(48px,7vw,96px)]">
          <p className="measure font-display text-display-4 leading-[1.15]">
            No current mandate matches {formatList(active)}.
          </p>
          <p className="measure mt-4 text-body text-stone-700">
            Clear one of those filters to widen the table, or clear all three to see every one of
            the {mandates.length} mandates on this page.
          </p>
          <button type="button" onClick={clearAll} className="btn btn-quiet mt-7">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

function Th({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      scope="col"
      className={`py-4 pr-4 text-micro font-medium tracking-[0.06em] text-stone-500 uppercase ${className}`}
    >
      {children}
    </th>
  );
}
