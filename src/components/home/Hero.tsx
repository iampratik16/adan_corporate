import Link from 'next/link';
import { HeroFilm } from './HeroFilm';

/**
 * The hero.
 *
 * The poster is a plain <img> with fetchPriority="high" rather than next/image:
 * the asset is already graded and encoded to AVIF at five widths by
 * scripts/media/process.ts, so a second optimisation pass at request time would
 * only add latency to the LCP element. Being in the initial HTML, the preload
 * scanner finds it before any script runs.
 *
 * The headline rises through a mask in three lines. That is CSS, not a
 * animation library, so it costs nothing and runs before hydration.
 */
export function Hero({
  poster,
  portraitPoster,
  blurDataURL,
  film,
}: {
  poster: { avif: string; webp: string; src: string; widths: number[] };
  /** The 9:16 crop, generated for exactly this. Absent means fall back to the 16:9. */
  portraitPoster?: { widths: number[] };
  blurDataURL: string;
  film: { landscape: string[]; portrait: string[] };
}) {
  const srcSet = (ext: 'avif' | 'webp', id = 'hero-still', widths = poster.widths) =>
    widths.map((w) => `/media/${id}-${w}.${ext} ${w}w`).join(', ');

  return (
    <section className="relative isolate flex min-h-[min(100svh,900px)] flex-col justify-end overflow-hidden">
      {/* --- Media --- */}
      <div className="absolute inset-0 z-0 bg-ink">
        <picture className="absolute inset-0 block size-full">
          {/*
            A phone held upright gets the 9:16 crop rather than a centre slice
            of the 16:9, which loses the floor and most of the raking light.
            The portrait still was generated for this and the portrait film is
            conditioned on it, so poster and first frame still match exactly.
          */}
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
            // The fallback carries its own srcSet, not a fixed large src: the
            // preload scanner fetches `src` before it has parsed the <source>
            // elements above, so a hard-coded 1920 wide WebP was downloaded on
            // every phone in addition to the AVIF the browser actually used.
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
          Two scrims rather than one heavy one.

          A single vertical wash dark enough to carry 22px body text would flatten
          the whole lower half of the photograph. Instead the vertical scrim does
          the general work and a second, left-to-right scrim sits under the copy
          column only, so the right of the frame, where the figures cross, stays
          open. Measured against the brightest rendered pixel behind the text,
          not against the poster's average.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, color-mix(in srgb, var(--color-ink) 90%, transparent) 0%, ' +
              'color-mix(in srgb, var(--color-ink) 72%, transparent) 30%, ' +
              'color-mix(in srgb, var(--color-ink) 26%, transparent) 66%, transparent 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, color-mix(in srgb, var(--color-ink) 66%, transparent) 0%, ' +
              'color-mix(in srgb, var(--color-ink) 46%, transparent) 34%, ' +
              'color-mix(in srgb, var(--color-ink) 18%, transparent) 58%, transparent 76%)',
          }}
        />
      </div>

      {/* --- Copy --- */}
      <div className="on-ink container-site relative z-10 pt-40 pb-20 lg:pb-28">
        <h1 className="max-w-[16ch] font-display text-display-1 leading-display-tight tracking-[-0.022em] text-white">
          <span className="line-mask">
            <span>Cross-border</span>
          </span>
          <span className="line-mask">
            <span>corporate finance</span>
          </span>
          <span className="line-mask">
            <span>for the mid-market.</span>
          </span>
        </h1>

        <p className="hero-settle mt-8 max-w-[52ch] text-lead leading-[1.5] text-white/92">
          Adan Corporate is an international advisory firm of former C-suite executives. We help
          growing companies and funds raise capital, buy, sell and transform, from seed funding to
          listing.
        </p>

        <div className="hero-settle mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
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
