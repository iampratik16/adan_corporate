import Link from 'next/link';
import { HeroFilm } from './HeroFilm';

/**
 * The hero.
 *
 * Centred, in the manner of the reference: the film does the work and the line
 * sits quietly on top of it. The headline is deliberately well below the page's
 * other display sizes. A banner-sized H1 competes with the film; a statement-
 * sized one lets the film be the hero, which is the point of shooting one.
 *
 * The poster is a plain <img> with fetchPriority rather than next/image: the
 * asset is already graded and encoded to AVIF at five widths by
 * scripts/media/process.ts, so a second optimisation pass at request time would
 * only add latency to the LCP element.
 *
 * The mark is not repeated here. The reference can place its mark over the film
 * because it is pure white; ours is navy and red and disappears into a dark
 * frame. It sits in the masthead, on glass, where it reads.
 */
export function Hero({
  poster,
  portraitPoster,
  blurDataURL,
  film,
}: {
  poster: { src: string; widths: number[] };
  portraitPoster?: { widths: number[] };
  blurDataURL: string;
  film: { loop: string[]; full: string[]; portrait: string[] };
}) {
  const srcSet = (ext: 'avif' | 'webp', id = 'hero-still', widths = poster.widths) =>
    widths.map((w) => `/media/${id}-${w}.${ext} ${w}w`).join(', ');

  return (
    <section className="relative isolate flex min-h-[min(100svh,940px)] flex-col items-center justify-center overflow-hidden text-center">
      <div className="absolute inset-0 z-0 bg-ink">
        <picture className="absolute inset-0 block size-full">
          {portraitPoster && (
            <>
              <source
                media="(orientation: portrait) and (max-width: 820px)"
                type="image/avif"
                srcSet={srcSet('avif', 'hero-still-portrait', portraitPoster.widths)}
                sizes="100vw"
              />
              <source
                media="(orientation: portrait) and (max-width: 820px)"
                type="image/webp"
                srcSet={srcSet('webp', 'hero-still-portrait', portraitPoster.widths)}
                sizes="100vw"
              />
            </>
          )}
          <source type="image/avif" srcSet={srcSet('avif')} sizes="100vw" />
          <source type="image/webp" srcSet={srcSet('webp')} sizes="100vw" />
          <img
            src={poster.src}
            srcSet={srcSet('webp')}
            sizes="100vw"
            alt=""
            width={2752}
            height={1536}
            fetchPriority="high"
            decoding="sync"
            className="size-full object-cover"
            style={{
              backgroundImage: `url(${blurDataURL})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </picture>

        <HeroFilm sources={film} />

        {/*
          A centred headline needs a centred scrim. The earlier left-to-right
          wash was built for left-aligned copy and would now darken one side of
          a symmetrical frame. This is a vertical wash plus a soft radial pool
          under the text, measured with scripts/check-media-contrast.ts against
          the brightest frame of the film rather than the poster.
        */}
        <div aria-hidden="true" className="hero-scrim-wash absolute inset-0" />
        <div aria-hidden="true" className="hero-scrim-pool absolute inset-0" />
      </div>

      <div className="on-ink container-site relative z-10 flex flex-col items-center pt-28 pb-28">
        <h1 className="max-w-[17ch] font-hero text-hero leading-[1.08] tracking-[-0.012em] text-white">
          <span className="line-mask">
            <span>Cross-border corporate finance</span>
          </span>
          <span className="line-mask">
            <span>for the mid-market.</span>
          </span>
        </h1>

        <p className="hero-settle mt-7 max-w-[54ch] text-body leading-[1.6] text-white/85">
          An international advisory firm of former C-suite executives. We help growing companies and
          funds raise capital, buy, sell and transform, from seed funding to listing.
        </p>

        <div className="hero-settle mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link href="/contact" className="btn">
            Speak to a partner
          </Link>
          <Link
            href="/expertise"
            className="link-underline text-small text-white/90 hover:text-white"
          >
            Our expertise
          </Link>
        </div>
      </div>
    </section>
  );
}
