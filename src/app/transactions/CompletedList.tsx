'use client';

import { useMemo, useState } from 'react';
import { FilterGroup, ResultCount } from '@/components/shared/FilterBar';
import { Tombstone } from '@/components/shared/Tombstone';

/**
 * The fields a tombstone renders, plus the four filter keys. Deliberately not
 * the Transaction type: valueUsd and the rest of the content module never need
 * to cross into the bundle, and the page sorts before it projects.
 */
export interface CompletedItem {
  id: string;
  corridor: string;
  value: string;
  year?: number;
  headline: string;
  sectors: string[];
  roles: string[];
  pillars: string[];
  regions: string[];
  band: string;
}

export interface Facet {
  value: string;
  label: string;
  count?: number;
}

const ALL = 'all';

/**
 * The completed transactions, filtered in the browser against records already
 * on the page. The first render is the full list in source order, so the
 * server-rendered markup is the complete record and the filters are an
 * enhancement rather than a dependency.
 */
export function CompletedList({
  items,
  pillarOptions,
  sectorOptions,
  regionOptions,
  bandOptions,
}: {
  items: CompletedItem[];
  pillarOptions: Facet[];
  sectorOptions: Facet[];
  regionOptions: Facet[];
  bandOptions: Facet[];
}) {
  const [pillar, setPillar] = useState(ALL);
  const [sector, setSector] = useState(ALL);
  const [region, setRegion] = useState(ALL);
  const [band, setBand] = useState(ALL);

  const filtered = useMemo(
    () =>
      items.filter(
        (item) =>
          (pillar === ALL || item.pillars.includes(pillar)) &&
          (sector === ALL || item.sectors.includes(sector)) &&
          (region === ALL || item.regions.includes(region)) &&
          (band === ALL || item.band === band),
      ),
    [items, pillar, sector, region, band],
  );

  const active = [
    pillar !== ALL && labelOf(pillarOptions, pillar),
    sector !== ALL && labelOf(sectorOptions, sector),
    region !== ALL && labelOf(regionOptions, region),
    band !== ALL && labelOf(bandOptions, band),
  ].filter((label): label is string => Boolean(label));

  const clearAll = () => {
    setPillar(ALL);
    setSector(ALL);
    setRegion(ALL);
    setBand(ALL);
  };

  return (
    <div className="container-site pt-[clamp(40px,5vw,64px)] pb-[clamp(72px,9vw,128px)]">
      <h2 className="sr-only">Completed transactions</h2>

      <div className="grid gap-x-10 gap-y-7 border-t border-stone-200 pt-8 md:grid-cols-2 xl:grid-cols-4">
        <FilterGroup
          label="Expertise"
          options={pillarOptions}
          value={pillar}
          onChange={setPillar}
        />
        <FilterGroup label="Region" options={regionOptions} value={region} onChange={setRegion} />
        <FilterGroup label="Deal size" options={bandOptions} value={band} onChange={setBand} />
        <FilterGroup label="Sector" options={sectorOptions} value={sector} onChange={setSector} />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 pt-5">
        <ResultCount count={filtered.length} noun="transaction" />
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
        <ul className="mt-2 border-b border-stone-200">
          {filtered.map((item) => (
            <Tombstone key={item.id} transaction={item} />
          ))}
        </ul>
      ) : (
        <div className="mt-2 border-t border-b border-stone-200 py-[clamp(48px,7vw,96px)]">
          <p className="measure font-display text-display-4 leading-[1.15]">
            No completed transaction matches {formatList(active)}.
          </p>
          <p className="measure mt-4 text-body text-stone-700">
            Clear one of those filters to widen the list, or clear all four to see every one of the{' '}
            {items.length} transactions on this page.
          </p>
          <button type="button" onClick={clearAll} className="btn btn-quiet mt-7">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

function labelOf(options: Facet[], value: string): string | undefined {
  return options.find((option) => option.value === value)?.label;
}

/** "a, b and c", because a list of filters reads as a sentence here. */
export function formatList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? 'that combination';
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}
