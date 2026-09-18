/**
 * The Adan Corporate mark.
 *
 * The only source available is a 291x36 raster with the white ground baked in.
 * It has been alpha-keyed and rescaled, and nothing else: the mark is never
 * redrawn, recoloured or reversed. Its navy and crimson both disappear against
 * a dark ground, so on dark bands it sits on a paper masthead plate rather than
 * being inverted. A vector file is requested in docs/CLIENT-QUESTIONS.md.
 */
export function Logo({ height = 26, className }: { height?: number; className?: string }) {
  const width = Math.round((291 / 36) * height);
  return (
    <picture className={className}>
      <source
        type="image/webp"
        srcSet="/brand/adan-wordmark-36.webp 291w, /brand/adan-wordmark-72.webp 582w, /brand/adan-wordmark-108.webp 873w"
        sizes={`${width}px`}
      />
      <img
        src="/brand/adan-wordmark-72.png"
        srcSet="/brand/adan-wordmark-36.png 291w, /brand/adan-wordmark-72.png 582w, /brand/adan-wordmark-108.png 873w"
        sizes={`${width}px`}
        width={width}
        height={height}
        alt="Adan Corporate"
        // The masthead paints before anything else, and on a phone this small
        // mark is what Chrome reports as the largest contentful paint, so it
        // gets the priority hint rather than the hero poster behind it.
        fetchPriority="high"
        decoding="async"
        style={{ width, height }}
      />
    </picture>
  );
}

/** The roundel, which does hold up on a dark ground. Used as a small mark only. */
export function Roundel({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet="/brand/adan-roundel-52.webp 52w, /brand/adan-roundel-104.webp 104w"
        sizes={`${size}px`}
      />
      <img
        src="/brand/adan-roundel-180.png"
        width={size}
        height={size}
        alt=""
        aria-hidden="true"
        // Footer decoration, never the LCP: 180px of PNG was being fetched
        // eagerly on every page for a 26px mark.
        loading="lazy"
        decoding="async"
        className={className}
        style={{ width: size, height: size }}
      />
    </picture>
  );
}
