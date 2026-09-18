import type { Transaction } from '@content/schema';

/**
 * Only what a tombstone prints. A full Transaction satisfies it, and a client
 * component can hand over a projection without carrying valueUsd, pillars and
 * the rest of the record across the boundary.
 */
export type TombstoneFields = Pick<
  Transaction,
  'corridor' | 'value' | 'year' | 'headline' | 'sectors' | 'roles'
>;

/**
 * A transaction tombstone.
 *
 * The deals are anonymised, so there is no logo and no image: the record is
 * entirely typographic, which is both the honest presentation and the one this
 * audience reads fastest. Corridor first, because reach is the differentiator;
 * then the value, set large in tabular figures so a column of them aligns.
 */
export function Tombstone({
  transaction,
  as: Tag = 'li',
}: {
  transaction: TombstoneFields;
  as?: 'li' | 'div';
}) {
  return (
    <Tag className="group grid gap-x-8 gap-y-3 border-t border-stone-200 py-7 md:grid-cols-12 md:items-baseline">
      <div className="md:col-span-2">
        <span className="tabular text-micro text-stone-500">{transaction.corridor}</span>
      </div>

      <div className="md:col-span-3">
        <span className="figure-value font-display text-display-4 leading-none tracking-[-0.02em]">
          {transaction.value}
        </span>
        {transaction.year && (
          <span className="tabular mt-1 block text-micro text-stone-500">{transaction.year}</span>
        )}
      </div>

      <div className="md:col-span-5">
        <p className="text-body text-ink">{transaction.headline}</p>
        <p className="mt-2 text-micro text-stone-500">{transaction.sectors.join(' · ')}</p>
      </div>

      <div className="md:col-span-2">
        <ul className="flex flex-wrap gap-x-1.5 gap-y-1.5 md:justify-end">
          {transaction.roles.map((role) => (
            <li
              key={role}
              className="border border-stone-200 px-2 py-0.5 text-micro whitespace-nowrap text-stone-500"
            >
              {role}
            </li>
          ))}
        </ul>
      </div>
    </Tag>
  );
}
