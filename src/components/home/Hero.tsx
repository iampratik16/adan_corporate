import Link from 'next/link';
import { HeroFilm, type FilmSources } from './HeroFilm';

/**
 * The hero.
 *
 * Centred, in the manner of the reference: the film does the work and the line
 * sits on top of it. The headline is set by .hero-h1 in globals.css, which owns
 * every typographic property, so no size, leading or measure utility belongs on
 * the element: a utility would beat the class and the rule would silently not
 * apply.
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
  blurDataURL,
  film,
}: {
  poster: { id: string; src: string; widths: number[]; v: string };
  blurDataURL: string;
  // Imported rather than restated: a second copy of this shape is how the 1280
  // rung got added in one place and silently dropped in the other.
  film: FilmSources;
}) {
  // The poster's media id is passed in rather than hard-coded: it is normally
  // `hero-poster`, which assemble-hero.ts extracts from frame 0 of the film, and
  // falls back to `hero-still` only where the film has not been built.
  // Every poster URL carries the same `?v=`, so a re-cut invalidates the whole
  // srcSet at once. Without it the browser keeps last week's poster for a year:
  // /media is served immutable and these names never change. See
  // src/lib/media-version.ts.
  const q = poster.v ? `?v=${poster.v}` : '';
  const srcSet = (ext: 'avif' | 'webp', id = poster.id, widths = poster.widths) =>
    widths.map((w) => `/media/${id}-${w}.${ext}${q} ${w}w`).join(', ');

  return (
    <section className="relative isolate flex min-h-[min(100svh,940px)] flex-col items-center justify-center overflow-hidden text-center">
      {/*
        No `z-0` here, deliberately.

        A z-index on a positioned element creates a stacking context, and this
        wrapper holding one trapped everything inside it, including the film's
        pause control. That control asks for `z-20` to sit above the headline's
        `z-10`, but a z-20 inside a z-0 context is still just z-0 from the
        outside, so the headline block covered it. The button rendered, read as
        visible, and could not be clicked anywhere the text block reached,
        which on a laptop at 720 to 800px tall is most of the hero.

        Without a z-index this div creates no context, it still paints under
        the headline because it comes first in the DOM, and the control's z-20
        finally means what it says.
      */}
      <div className="absolute inset-0 bg-ink">
        <picture className="absolute inset-0 block size-full">
          {/*
            NO PORTRAIT POSTER. There was a 9:16 crop of a lobby here for a
            phone held upright, and a matching 9:16 film behind it. Both are
            gone: the poster is now frame 0 of the delivered film and the film
            is one 16:9 cut, so a portrait pair would have painted a lobby and
            then played a skyline, which is the mismatch the extracted poster
            exists to prevent. `object-cover` crops the one poster and the one
            film identically. A portrait re-cut of the four shots would be the
            way to bring it back. See docs/DECISIONS.md section 27.
          */}
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
        {/*
          Three authored lines, not two.

          The break has to be authored because each line is its own clipped box
          that rises on its own delay, and globals.css already carries the
          nth-of-type(3) delay for a third. At the old 72px the line fell in two;
          at 104px inside a 16ch measure it falls in three, and leaving the old
          two-span split in place put two rendered lines inside the first mask,
          so half the headline rose as one block and the stagger broke.

          text-wrap: balance still earns its place on narrow viewports, where a
          span can wrap again inside its own mask.
        */}
        <h1 className="hero-h1 text-white">
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
