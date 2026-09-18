import { portraits, portraitWidths, portraitsVersion } from '@content/portraits';
import type { Person } from '@content/schema';

/**
 * A partner's portrait, or a typographic monogram where there is no usable
 * photograph.
 *
 * Every portrait here is a real photograph of a real person, downloaded from
 * the existing site and processed deterministically: one 4:5 crop, in colour,
 * at a matched exposure. No generative model touches an image of a named
 * person. They were greyscale until the client asked otherwise; see
 * scripts/media/portraits.ts.
 *
 * Round, after the leadership grid on mckinsey.com. The sources are circular
 * avatars, so this is the shape they were always cut for: the square crop
 * behind it uses the whole diameter where the old 4:5 rectangle used 0.625 of
 * it, which took the number of upscaled portraits from 27 of 29 down to 15.
 * The square's corners still carry the red ring and the border radius is what
 * removes them, so the two have to stay in step; see scripts/media/portraits.ts.
 *
 * Where a photograph is missing or unusable, the monogram is the honest answer.
 * It is not a placeholder to be embarrassed about: a consistent set of initials
 * reads better than a grid of mismatched headshots, one of which is obviously
 * synthetic.
 */
export function Portrait({
  person,
  sizes,
  priority = false,
  className,
}: {
  person: Pick<Person, 'slug' | 'name' | 'portrait' | 'needsPortrait' | 'role'>;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const initials = person.name
    .split(/\s+/)
    .filter((part) => /^[A-Za-z]/.test(part))
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('');

  if (person.needsPortrait || !person.portrait) {
    return (
      <div
        className={`flex aspect-square items-center justify-center rounded-full bg-stone-100 ${className ?? ''}`}
        role="img"
        aria-label={`${person.name}. No photograph available.`}
      >
        <span className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-[-0.02em] text-stone-500">
          {initials}
        </span>
      </div>
    );
  }

  // Only the widths the source avatars genuinely support. The originals are
  // ~400px circular crops, so the usable 4:5 rectangle inside them is about
  // 240px wide. Emitting a 960 would be upscaling a face and calling it a
  // portrait. See scripts/media/portraits.ts and docs/CLIENT-QUESTIONS.md.
  const asset = portraits[person.slug];
  // `?v=` or the browser keeps the portrait it already has, for a year: /media
  // is immutable and these filenames are stable across re-processing. See
  // portraitsVersion in content/portraits.ts.
  const srcSet = (ext: 'avif' | 'webp') =>
    portraitWidths
      .map((w) => `/media/people/${person.slug}-${w}.${ext}?v=${portraitsVersion} ${w}w`)
      .join(', ');

  return (
    <picture className="block size-full">
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`/media/people/${person.slug}-320.webp?v=${portraitsVersion}`}
        alt={`${person.name}, ${person.role}`}
        width={320}
        height={320}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={`portrait aspect-square size-full rounded-full bg-stone-100 object-cover ${className ?? ''}`}
        style={
          asset
            ? {
                backgroundImage: `url(${asset.blurDataURL})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      />
    </picture>
  );
}
