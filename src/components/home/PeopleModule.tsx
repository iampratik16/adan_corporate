import Link from 'next/link';
import type { Person } from '@content/schema';
import { Portrait } from '@/components/ui/Portrait';

/**
 * People are the product, so they get the space.
 *
 * Laid out after the leadership grid on mckinsey.com that the client supplied:
 * an even grid of raised cards, the portrait above, the role small above the
 * name, and the name in the display serif. Everyone is the same size. The
 * previous version gave the managing partners a large three-up row and then
 * pushed the partners into a horizontal rail beneath them, which made a
 * hierarchy the reference does not have and which this firm has not asked to
 * assert on its homepage.
 *
 * The portraits are in colour now. They were greyscaled to hide how uneven the
 * sources are, which worked and cost the section its warmth; see
 * scripts/media/portraits.ts and docs/DECISIONS.md section 29. Tone matching
 * survives, so they still sit at one exposure.
 *
 * THE LOCAL CLOCK IS GONE FROM THE CARDS. It read `city / local time` under
 * every face, which is a nice thing to know about an office and a strange thing
 * to know about a person. `LocalTime` still runs in the network band and on the
 * contact page, which is where a reader is deciding whether it is a reasonable
 * hour to call.
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
  // Managing partners first, then partners, then stop: eight cards is two full
  // rows at the widest breakpoint and the section has a route to the rest.
  const shown = [...managing, ...partners].slice(0, 8);

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

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((person, index) => (
            <li
              key={person.slug}
              data-reveal
              data-reveal-delay={String(Math.min(index, 3)) as '0' | '1' | '2' | '3'}
            >
              <Link
                href={`/people/${person.slug}`}
                className="group flex h-full flex-col items-center border border-stone-200 bg-white px-5 py-8 text-center transition-colors duration-ui hover:border-stone-300"
              >
                <div className="w-[min(62%,168px)]">
                  <Portrait
                    person={person}
                    sizes="168px"
                    className="transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-7 text-micro text-stone-500">{person.roleDetail ?? person.role}</p>
                <h3 className="mt-1.5 font-display text-display-4 leading-[1.15]">
                  <span className="link-underline">{person.name}</span>
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
