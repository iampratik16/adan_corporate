'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MeridianField } from './MeridianField';

export interface IndexPillar {
  id: string;
  title: string;
  descriptor: string;
  href: string;
  tags: string[];
  /** Media id from content/media.ts, e.g. 'pillar-ma'. Absent for AI & Digital. */
  image?: { mediaId: string; src: string; widths: number[]; alt: string };
}

/**
 * The five pillars as a typographic list.
 *
 * On a pointer device, focusing or hovering a name swaps the adjacent image
 * with a clip-path wipe and a 1.04 to 1 scale settle, and reveals that pillar's
 * capability tags. On touch the same content is an accordion, because a hover
 * that never fires is a dead end.
 *
 * AI & Digital has no photograph by design. It gets the code-drawn line field,
 * which is the one place on the site with a more technical mood.
 */
export function ExpertiseIndex({ pillars }: { pillars: IndexPillar[] }) {
  const [active, setActive] = useState(0);

  return (
    <section className="section-y" aria-labelledby="expertise-heading">
      <div className="container-site">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2
            id="expertise-heading"
            data-reveal
            className="font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
          >
            Expertise
          </h2>
          <Link href="/expertise" className="link-underline text-small">
            All five pillars
          </Link>
        </div>

        {/* --- Pointer devices --- */}
        <div data-reveal className="mt-12 hidden gap-12 lg:grid lg:grid-cols-12">
          <ul className="lg:col-span-7">
            {pillars.map((pillar, index) => (
              <li key={pillar.id} className="border-t border-stone-200 last:border-b">
                <Link
                  href={pillar.href}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className="group block py-7 transition-colors duration-ui-slow"
                  aria-describedby={`pillar-desc-${pillar.id}`}
                >
                  <div className="flex items-baseline justify-between gap-6">
                    <span
                      className="font-display text-display-3 leading-[1.05] tracking-[-0.02em] transition-colors duration-ui-slow"
                      style={{
                        color: active === index ? 'var(--color-ink)' : 'var(--color-stone-500)',
                      }}
                    >
                      {pillar.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 h-px shrink-0 transition-all duration-ui-slow ease-out-quart"
                      style={{
                        width: active === index ? 48 : 0,
                        backgroundColor: 'var(--color-accent)',
                      }}
                    />
                  </div>

                  <div
                    className="grid transition-[grid-template-rows,opacity] duration-ui-slow ease-out-quart"
                    style={{
                      gridTemplateRows: active === index ? '1fr' : '0fr',
                      opacity: active === index ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p id={`pillar-desc-${pillar.id}`} className="pt-3 text-body text-stone-700">
                        {pillar.descriptor}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5">
                        {pillar.tags.map((tag) => (
                          <li
                            key={tag}
                            className="border border-stone-200 px-2.5 py-1 text-micro text-stone-500"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* --- The swapping image. 3:2, fixed, so nothing reflows. --- */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 aspect-3/2 overflow-hidden bg-ink">
              {pillars.map((pillar, index) =>
                pillar.image ? (
                  <picture key={pillar.id} className="absolute inset-0 block size-full">
                    <source
                      type="image/avif"
                      srcSet={pillar.image.widths
                        .map((w) => `/media/${pillar.image!.mediaId}-${w}.avif ${w}w`)
                        .join(', ')}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                    <source
                      type="image/webp"
                      srcSet={pillar.image.widths
                        .map((w) => `/media/${pillar.image!.mediaId}-${w}.webp ${w}w`)
                        .join(', ')}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                    <img
                      src={pillar.image.src}
                      alt={index === active ? pillar.image.alt : ''}
                      loading="lazy"
                      decoding="async"
                      className="media-wipe absolute inset-0 size-full object-cover transition-opacity duration-reveal ease-out-expo"
                      style={{
                        opacity: index === active ? 1 : 0,
                        transform: index === active ? 'scale(1)' : 'scale(1.04)',
                        transition:
                          'opacity var(--duration-reveal) var(--ease-out-expo), transform var(--duration-reveal-slow) var(--ease-out-expo)',
                      }}
                    />
                  </picture>
                ) : (
                  <div
                    key={pillar.id}
                    className="absolute inset-0 transition-opacity duration-reveal ease-out-expo"
                    style={{ opacity: index === active ? 1 : 0 }}
                  >
                    <MeridianField density={0.7} />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* --- Touch. Native <details>: keyboard operable and announced
            correctly without shipping an accordion library. --- */}
        <div className="mt-10 lg:hidden">
          {pillars.map((pillar) => (
            <details key={pillar.id} className="disclosure">
              <summary>
                <span className="text-display-4 leading-[1.1]">{pillar.title}</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  aria-hidden="true"
                  className="disclosure-mark"
                >
                  <path d="M6.5 0v13M0 6.5h13" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </summary>
              <div className="pb-6">
                <p className="text-body text-stone-700">{pillar.descriptor}</p>
                <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-1.5">
                  {pillar.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border border-stone-200 px-2.5 py-1 text-micro text-stone-500"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <Link href={pillar.href} className="link-underline mt-5 inline-block text-small">
                  {pillar.title}
                </Link>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
