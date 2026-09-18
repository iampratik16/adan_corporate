'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { PersonGroup } from '@content/schema';
import { FilterGroup, ResultCount } from '@/components/shared/FilterBar';
import { LocalTime } from '@/components/ui/LocalTime';
import { Portrait } from '@/components/ui/Portrait';

/**
 * The slim projection that crosses the client boundary.
 *
 * Deliberately not `Person`: the 32 biographies, with their expertise and
 * sector lists, are tens of kilobytes of JSON that this grid never renders.
 * The page projects each record down to the fields below before handing it over.
 */
export interface PersonCard {
  slug: string;
  name: string;
  role: string;
  roleDetail?: string;
  group: PersonGroup;
  city: string;
  timeZone: string;
  pillars: string[];
  portrait?: string;
  needsPortrait: boolean;
}

/** Seniority order, which is how the firm lists itself. */
const GROUPS: Array<{ id: PersonGroup; label: string }> = [
  { id: 'managing-partner', label: 'Managing partners' },
  { id: 'partner', label: 'Partners' },
  { id: 'director', label: 'Directors' },
  { id: 'advisor', label: 'Advisers' },
  { id: 'analyst', label: 'Analysts' },
];

const GROUP_LABEL = new Map(GROUPS.map((group) => [group.id, group.label]));

interface Filters {
  group: string;
  city: string;
  pillar: string;
  query: string;
}

const EMPTY: Filters = { group: 'all', city: 'all', pillar: 'all', query: '' };

/**
 * One predicate for both the grid and the facet counts. `skip` leaves one
 * dimension out, so each filter group can count what it would return rather
 * than what is already on screen.
 */
function matches(person: PersonCard, filters: Filters, skip?: keyof Filters): boolean {
  if (skip !== 'group' && filters.group !== 'all' && person.group !== filters.group) return false;
  if (skip !== 'city' && filters.city !== 'all' && person.city !== filters.city) return false;
  if (skip !== 'pillar' && filters.pillar !== 'all' && !person.pillars.includes(filters.pillar)) {
    return false;
  }
  if (skip !== 'query') {
    const query = filters.query.trim().toLowerCase();
    if (query !== '' && !person.name.toLowerCase().includes(query)) return false;
  }
  return true;
}

/** Options keep a stable order and a stable set; only the counts move. */
function facet(
  pool: PersonCard[],
  keys: string[],
  label: (key: string) => string,
  values: (person: PersonCard) => string[],
  allLabel: string,
) {
  const counts = new Map<string, number>();
  for (const person of pool) {
    for (const value of values(person)) counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [
    { value: 'all', label: allLabel, count: pool.length },
    ...keys.map((key) => ({ value: key, label: label(key), count: counts.get(key) ?? 0 })),
  ];
}

export function PeopleDirectory({
  people,
  pillarLabels,
}: {
  people: PersonCard[];
  /** Pillar id to title, so the filter reads in words rather than in slugs. */
  pillarLabels: Array<{ id: string; title: string }>;
}) {
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const set = (key: keyof Filters) => (value: string) =>
    setFilters((current) => ({ ...current, [key]: value }));

  const cities = useMemo(
    () => [...new Set(people.map((person) => person.city))].sort((a, b) => a.localeCompare(b)),
    [people],
  );

  const groupOptions = facet(
    people.filter((person) => matches(person, filters, 'group')),
    GROUPS.map((group) => group.id),
    (key) => GROUP_LABEL.get(key as PersonGroup) ?? key,
    (person) => [person.group],
    'Everyone',
  );

  const cityOptions = facet(
    people.filter((person) => matches(person, filters, 'city')),
    cities,
    (key) => key,
    (person) => [person.city],
    'Everywhere',
  );

  const pillarOptions = facet(
    people.filter((person) => matches(person, filters, 'pillar')),
    pillarLabels.map((pillar) => pillar.id),
    (key) => pillarLabels.find((pillar) => pillar.id === key)?.title ?? key,
    (person) => person.pillars,
    'All expertise',
  );

  const results = people.filter((person) => matches(person, filters));
  const active =
    filters.group !== 'all' ||
    filters.city !== 'all' ||
    filters.pillar !== 'all' ||
    filters.query.trim() !== '';

  return (
    <section className="section-y" aria-label="People directory">
      <div className="container-site">
        <div data-print-hide>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="lg:w-[22rem] lg:shrink-0">
              <label
                htmlFor="people-search"
                className="mb-2.5 block text-micro font-medium tracking-[0.06em] text-stone-500 uppercase"
              >
                Search by name
              </label>
              <input
                id="people-search"
                type="search"
                autoComplete="off"
                spellCheck={false}
                value={filters.query}
                onChange={(event) => set('query')(event.target.value)}
                placeholder="Start typing a name"
                className="h-12 w-full border border-stone-300 bg-white px-3.5 text-body text-ink transition-colors duration-ui placeholder:text-stone-500 focus:border-ink"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <FilterGroup
                label="Role"
                options={groupOptions}
                value={filters.group}
                onChange={set('group')}
              />
              <FilterGroup
                label="Location"
                options={cityOptions}
                value={filters.city}
                onChange={set('city')}
              />
              <FilterGroup
                label="Expertise"
                options={pillarOptions}
                value={filters.pillar}
                onChange={set('pillar')}
              />
            </div>
          </div>

          <div className="mt-8 flex items-center gap-5 border-t border-stone-200 pt-4">
            <ResultCount count={results.length} noun="person" />
            {active && (
              <button
                type="button"
                onClick={() => setFilters(EMPTY)}
                className="link-underline min-h-6 text-small text-stone-700"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {results.length === 0 ? (
          <p className="mt-16 text-lead text-stone-700">
            No one matches those filters. Try a wider search, or{' '}
            <button
              type="button"
              onClick={() => setFilters(EMPTY)}
              className="link-underline text-ink"
            >
              clear them
            </button>
            .
          </p>
        ) : (
          GROUPS.map((group) => {
            const members = results.filter((person) => person.group === group.id);
            if (members.length === 0) return null;
            return (
              <section key={group.id} className="mt-16" aria-labelledby={`group-${group.id}`}>
                <div className="flex items-baseline justify-between gap-6 border-b border-ink pb-3">
                  <h2
                    id={`group-${group.id}`}
                    className="font-display text-display-4 leading-[1.15]"
                  >
                    {group.label}
                  </h2>
                  <span className="tabular text-micro text-stone-500">{members.length}</span>
                </div>
                <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
                  {members.map((person) => (
                    <li key={person.slug}>
                      <Link href={`/people/${person.slug}`} className="group block">
                        <div
                          className="overflow-hidden"
                          style={{ viewTransitionName: `portrait-${person.slug}` }}
                        >
                          <Portrait
                            person={person}
                            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw"
                            className="transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.02]"
                          />
                        </div>
                        <h3 className="mt-4 border-t border-stone-200 pt-3 text-body">
                          <span className="link-underline">{person.name}</span>
                        </h3>
                        <p className="mt-1 text-micro text-stone-500">
                          {person.roleDetail ?? person.role}
                        </p>
                        <p className="mt-1.5 text-micro text-stone-500">
                          {person.city}
                          <span aria-hidden="true"> &middot; </span>
                          <LocalTime timeZone={person.timeZone} showDot={false} />
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })
        )}
      </div>
    </section>
  );
}
