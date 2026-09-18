import type { PillarImage } from '@/lib/pillar-media';

/**
 * The responsive <picture> for a pillar photograph, in AVIF then WebP.
 *
 * A <picture> is inline by default, so it is given `block size-full` and, where
 * the parent is the positioned box, `absolute inset-0`. Without that the image
 * collapses to nothing.
 */
export function PillarPicture({
  image,
  alt,
  sizes,
  priority = false,
  fill = false,
}: {
  image: PillarImage;
  alt: string;
  sizes: string;
  /** True only for the image above the fold on a pillar page. */
  priority?: boolean;
  /** True when the parent is a positioned box this should fill. */
  fill?: boolean;
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
        className="block size-full object-cover"
        style={{ backgroundImage: `url(${image.asset.blurDataURL})`, backgroundSize: 'cover' }}
      />
    </picture>
  );
}
