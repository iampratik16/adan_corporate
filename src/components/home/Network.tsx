import { networkCategories, networkPrinciples } from '@content/network';
import { media } from '@content/media';
import { Picture } from '@/components/shared/Picture';
import { NetworkGlobe, type GlobeCity } from './NetworkGlobe';

/**
 * The network: reach, made concrete.
 *
 * The six categories and the four principles live in content/network.ts because
 * the about page prints them too. This component is the loud treatment: the
 * globe, on a dark ground.
 */
/**
 * The two plates. Alt text is real here, unlike the audience cards: these carry
 * the only depiction of the firm's people anywhere on the homepage, so what
 * they show is worth describing.
 */
const NETWORK_PLATES = [
  {
    id: 'network-1',
    alt: 'Two colleagues standing at a high office window, seen from behind, looking out over a sunlit city.',
    offset: '',
  },
  {
    id: 'network-2',
    alt: 'An empty boardroom table running the length of a room, reflecting a wall of bright windows.',
    offset: 'mt-10 lg:mt-16',
  },
] as const;

export function Network({ cities, officeCount }: { cities: GlobeCity[]; officeCount: number }) {
  const principles = networkPrinciples(officeCount);

  return (
    <section className="band-ink on-ink" aria-labelledby="network-heading">
      <div className="container-site py-section-lg">
        {/*
          Two plates beside the statement, after the Rothschild & Co careers
          band: a tall photograph, the line set large against it, a second
          smaller plate dropped below the first so the pair does not read as a
          diptych. On a phone they stack under the text and lose the offset,
          which is the only honest thing a 390px column can do with a layout
          built on horizontal space.

          The globe still follows. It is the section's real subject and the one
          place besides the hero where this site spends on motion, so the
          photographs are scaled to flank the sentence rather than compete
          with it.
        */}
        <div className="grid items-center gap-x-14 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-6 lg:col-start-1">
            <h2
              id="network-heading"
              data-reveal
              className="max-w-[20ch] font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
            >
              Capital rarely sits in the same place as the company that needs it.
            </h2>
            <p
              data-reveal
              data-reveal-delay="1"
              className="mt-6 max-w-[46ch] text-lead text-stone-300"
            >
              Our value is the route between the two: senior people who already know the investors,
              lenders and agencies in the market where the money is.
            </p>
          </div>

          <div
            data-reveal
            data-reveal-delay="2"
            className="grid grid-cols-2 gap-5 lg:col-span-6 lg:col-start-7"
          >
            {NETWORK_PLATES.map(({ id, alt, offset }) => {
              const asset = media[id];
              if (!asset) return null;
              return (
                <div key={id} className={`aspect-4/5 overflow-hidden ${offset}`}>
                  <Picture
                    image={{ mediaId: id, asset }}
                    alt={alt}
                    sizes="(min-width: 1024px) 24vw, 45vw"
                  />
                </div>
              );
            })}
          </div>
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
