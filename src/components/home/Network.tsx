import { networkCategories, networkPrinciples } from '@content/network';
import { NetworkGlobe, type GlobeCity } from './NetworkGlobe';

/**
 * The network: reach, made concrete.
 *
 * The six categories and the four principles live in content/network.ts because
 * the about page prints them too. This component is the loud treatment: the
 * globe, on a dark ground.
 */
export function Network({ cities, officeCount }: { cities: GlobeCity[]; officeCount: number }) {
  const principles = networkPrinciples(officeCount);

  return (
    <section className="band-ink on-ink" aria-labelledby="network-heading">
      <div className="container-site py-section-lg">
        <div className="max-w-[46ch]">
          <h2
            id="network-heading"
            data-reveal
            className="font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
          >
            Capital rarely sits in the same place as the company that needs it.
          </h2>
          <p data-reveal data-reveal-delay="1" className="mt-6 text-lead text-stone-300">
            Our value is the route between the two: senior people who already know the investors,
            lenders and agencies in the market where the money is.
          </p>
        </div>

        <div data-reveal className="mt-16">
          <NetworkGlobe cities={cities} />
        </div>

        {/* --- Six network categories, two rows. --- */}
        <div data-reveal className="mt-20">
          <h3 className="font-sans text-micro font-medium tracking-[0.06em] text-stone-300 uppercase">
            Who we know
          </h3>
          <dl className="mt-6 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {networkCategories.map((category) => (
              <div key={category.title} className="border-t border-white/12 py-5">
                <dt className="text-body">{category.title}</dt>
                <dd className="mt-1.5 text-small text-stone-300">{category.items}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* --- The four principles, in plain language. --- */}
        <div data-reveal className="mt-16">
          <dl className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle) => (
              <div key={principle.title} className="border-t border-accent-bright py-5">
                <dt className="font-display text-display-4">{principle.title}</dt>
                <dd className="mt-2 text-small text-stone-300">{principle.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
