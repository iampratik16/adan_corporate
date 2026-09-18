import Link from 'next/link';
import type { Facet } from './CompletedList';

/**
 * Largest first, with the undisclosed deals at the head of the column. An
 * undisclosed value is not a small one, and burying those records at the bottom
 * would say the opposite.
 */
export const sortKey = (valueUsd: number | null) =>
  valueUsd === null ? Number.MAX_SAFE_INTEGER : valueUsd;

/** Size bands read largest to smallest, so the filter row matches the column. */
export const COMPLETED_BANDS = [
  'Undisclosed',
  'Over US$200m',
  'US$50m to US$200m',
  'US$10m to US$50m',
  'Under US$10m',
];

export const MANDATE_BANDS = [
  'Over US$200m',
  'US$100m to US$200m',
  'US$50m to US$100m',
  'US$10m to US$50m',
  'US$3m to US$10m',
  'Under US$3m',
];

/** Counts each distinct value across the given rows, one count per record. */
export function facets(rows: readonly (readonly string[])[], order?: readonly string[]): Facet[] {
  const counts = new Map<string, number>();
  for (const row of rows) {
    for (const value of new Set(row)) {
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([value, count]) => ({ value, label: value, count }))
    .sort((a, b) =>
      order
        ? order.indexOf(a.value) - order.indexOf(b.value)
        : a.label.localeCompare(b.label, 'en-GB'),
    );
}

export function withAll(options: Facet[], total: number): Facet[] {
  return [{ value: 'all', label: 'All', count: total }, ...options];
}

/**
 * Completed work and current mandates are two routes, not one route with a
 * scripted tab widget.
 *
 * They are genuinely different records with different filters, they are both
 * worth indexing separately, and as links they need no JavaScript, stay
 * statically prerendered, and survive a middle-click. A tab component would
 * have cost about 8 kB and forced the page to render on every request, because
 * reading the tab from a query string opts a route out of static rendering.
 */
export function TransactionNav({
  current,
  counts,
}: {
  current: 'completed' | 'mandates';
  counts: { completed: number; mandates: number };
}) {
  const tabs = [
    { id: 'completed', href: '/transactions', label: 'Completed transactions' },
    { id: 'mandates', href: '/transactions/mandates', label: 'Current mandates' },
  ] as const;

  return (
    <div className="border-b border-stone-200">
      <nav className="container-site" aria-label="Transactions">
        <ul className="-mb-px flex flex-wrap gap-x-9 gap-y-1">
          {tabs.map((tab) => {
            const active = tab.id === current;
            return (
              <li key={tab.id}>
                <Link
                  href={tab.href}
                  aria-current={active ? 'page' : undefined}
                  className="flex items-baseline gap-2 border-b-2 py-5 text-small transition-colors duration-ui"
                  style={{
                    borderColor: active ? 'var(--color-accent)' : 'transparent',
                    color: active ? 'var(--color-ink)' : 'var(--color-stone-500)',
                  }}
                >
                  {tab.label}
                  <span className="tabular text-micro text-stone-500">{counts[tab.id]}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
