import Link from 'next/link';
import type { Person } from '@content/schema';
import { LocalTime } from '@/components/ui/LocalTime';
import { Portrait } from '@/components/ui/Portrait';

/**
 * People are the product, so they get the space.
 *
 * The two managing partners large, then a rail of partners, then a route to
 * everyone. The portrait morphs into the profile page through a named view
 * transition, which is why each one carries a viewTransitionName.
 */
export function PeopleModule({
  managing,
  partners,
  total,
}: {
  managing: Person[];
  partners: Person[];
  total: number;
}) {
  return (
    <section className="section-y" aria-labelledby="people-heading">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2
            id="people-heading"
            data-reveal
            className="max-w-[20ch] font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
          >
            The people you would actually be working with.
          </h2>
          <Link href="/people" className="link-underline text-small">
            All {total} people
          </Link>
        </div>

        {/* --- Managing partners --- */}
        <div
          data-reveal
          data-reveal-delay="1"
          className={`mt-14 grid gap-x-12 gap-y-12 ${
            managing.length >= 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'
          }`}
        >
          {managing.map((person) => (
            <Link key={person.slug} href={`/people/${person.slug}`} className="group block">
              <div className="overflow-hidden">
                <Portrait
                  person={person}
                  sizes={
                    managing.length >= 3
                      ? '(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw'
                      : '(min-width: 768px) 44vw, 100vw'
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
          ))}
        </div>

        {/* --- Partner rail --- */}
        <ul
          data-reveal
          className="mt-16 flex snap-x gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Partners"
        >
          {partners.map((person) => (
            <li key={person.slug} className="w-[min(46vw,210px)] shrink-0 snap-start">
              <Link href={`/people/${person.slug}`} className="group block">
                <div className="overflow-hidden">
                  <Portrait person={person} sizes="210px" />
                </div>
                <h3 className="mt-3 text-small">
                  <span className="link-underline">{person.name}</span>
                </h3>
                <p className="mt-0.5 text-micro text-stone-500">
                  {person.roleDetail ?? person.role} &middot; {person.city}
                </p>
              </Link>
            </li>
          ))}
          <li className="flex w-[min(40vw,180px)] shrink-0 items-center">
            <Link href="/people" className="link-underline text-body">
              Everyone
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
