import type { Metadata } from 'next';
import Link from 'next/link';
import { pillars } from '@content/pillars';
import { PageHeader } from '@/components/shared/PageHeader';
import { MeridianField } from '@/components/home/MeridianField';
import { PillarPicture } from '@/components/expertise/PillarPicture';
import { pillarImage } from '@/lib/pillar-media';

export const metadata: Metadata = {
  title: 'Expertise',
  description:
    'Corporate finance, mergers and acquisitions, strategy and leadership, risk and governance, ' +
    'and AI and digital. Five areas of work for mid-market companies, funds and family offices.',
  alternates: { canonical: '/expertise' },
};

/**
 * The five pillars as editorial entries rather than a card grid.
 *
 * The photographs alternate side down the page, which keeps a long page from
 * reading as a list of equal tiles and gives each pillar the width its
 * statement needs. AI & Digital has no photograph anywhere on this site, so it
 * takes the dark panel and the code-drawn field, and being the one dark moment
 * makes it the full stop the page ends on.
 */
export default function ExpertisePage() {
  const entries = pillars.map((pillar) => ({ pillar, image: pillarImage(pillar.id) }));

  return (
    <>
      <PageHeader
        title="Expertise"
        lead="Five areas of work. Many mandates draw on more than one of them, and most cross a border."
      />

      {entries.map(({ pillar, image }, index) =>
        image ? (
          <section
            key={pillar.id}
            className="border-b border-stone-200"
            aria-labelledby={`${pillar.id}-heading`}
          >
            <div className="container-site py-[clamp(56px,7vw,112px)]">
              <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-12">
                <div
                  className={
                    index % 2 === 0
                      ? 'lg:col-span-6'
                      : 'lg:col-span-6 lg:col-start-7 lg:row-start-1'
                  }
                >
                  <div data-reveal className="aspect-4/3 overflow-hidden bg-stone-100">
                    <PillarPicture
                      image={image}
                      alt={pillar.imageAlt ?? ''}
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      priority={index === 0}
                    />
                  </div>
                </div>

                <div
                  className={
                    index % 2 === 0
                      ? 'lg:col-span-5 lg:col-start-8'
                      : 'lg:col-span-5 lg:col-start-1 lg:row-start-1'
                  }
                >
                  <p className="text-micro text-stone-500">{pillar.descriptor}</p>
                  <h2
                    id={`${pillar.id}-heading`}
                    data-reveal
                    className="mt-3 font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
                  >
                    {pillar.title}
                  </h2>
                  <p data-reveal data-reveal-delay="1" className="mt-6 text-body text-stone-700">
                    {pillar.statement}
                  </p>

                  <ul className="mt-8">
                    {pillar.capabilities.map((capability) => (
                      <li
                        key={capability.id}
                        className="border-t border-stone-200 py-2.5 text-small text-stone-700 last:border-b"
                      >
                        {capability.title}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/expertise/${pillar.id}`}
                    className="link-underline mt-8 inline-block text-small"
                  >
                    {pillar.title}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section
            key={pillar.id}
            className="band-ink on-ink relative isolate overflow-hidden"
            aria-labelledby={`${pillar.id}-heading`}
          >
            <div className="absolute inset-0 -z-10">
              <MeridianField />
            </div>

            <div className="container-site relative py-section-lg">
              <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
                <div className="lg:col-span-6">
                  <p className="text-micro text-accent-bright">{pillar.descriptor}</p>
                  <h2
                    id={`${pillar.id}-heading`}
                    data-reveal
                    className="mt-3 font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
                  >
                    {pillar.title}
                  </h2>
                  <p
                    data-reveal
                    data-reveal-delay="1"
                    className="measure mt-6 text-lead text-stone-300"
                  >
                    {pillar.statement}
                  </p>
                  <Link href={`/expertise/${pillar.id}`} className="btn mt-9">
                    {pillar.title}
                  </Link>
                </div>

                <div className="lg:col-span-5 lg:col-start-8">
                  <ul>
                    {pillar.capabilities.map((capability) => (
                      <li
                        key={capability.id}
                        className="border-t border-white/20 py-3 text-small text-stone-300 last:border-b"
                      >
                        {capability.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ),
      )}
    </>
  );
}
