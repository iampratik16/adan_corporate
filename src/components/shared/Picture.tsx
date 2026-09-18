import type { MediaAsset } from '@content/media';

/** Anything in content/media.ts, named. The shape `pillarImage()` returns. */
export interface MediaImage {
  mediaId: string;
  asset: MediaAsset;
}

/**
 * The responsive `<picture>` for any generated photograph, AVIF then WebP.
 *
 * This was `PillarPicture` under src/components/expertise/ and served the five
 * pillar pages alone. The homepage audience cards, insight cards and network
 * plates all need exactly the same element, so it moved here rather than being
 * copied: CLAUDE.md asks for reuse before writing, and four near-identical
 * `<picture>` blocks is how a site ends up with four different sets of sizes.
 *
 * A `<picture>` is inline by default, so it is given `block size-full` and,
 * where the parent is the positioned box, `absolute inset-0`. Without that the
 * image collapses to nothing.
 *
 * The blur placeholder is a background on the `<img>` itself, so the box is
 * filled from the first paint and CLS stays at zero.
 */
export function Picture({
  image,
  alt,
  sizes,
  priority = false,
  fill = false,
  className,
}: {
  image: MediaImage;
  alt: string;
  sizes: string;
  /** True only for an image above the fold. */
  priority?: boolean;
  /** True when the parent is a positioned box this should fill. */
  fill?: boolean;
  className?: string;
}) {
  const srcSet = (ext: 'avif' | 'webp') =>
    image.asset.widths.map((w) => `/media/${image.mediaId}-${w}.${ext} ${w}w`).join(', ');

  return (
    <picture className={fill ? 'absolute inset-0 block size-full' : 'block size-full'}>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`/media/${image.mediaId}-1280.webp`}
        alt={alt}
        width={image.asset.width}
        height={image.asset.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={`block size-full object-cover ${className ?? ''}`}
        style={{ backgroundImage: `url(${image.asset.blurDataURL})`, backgroundSize: 'cover' }}
      />
    </picture>
  );
}
