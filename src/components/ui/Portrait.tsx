import { portraits, portraitWidths } from '@content/portraits';
import type { Person } from '@content/schema';

/**
 * A partner's portrait, or a typographic monogram where there is no usable
 * photograph.
 *
 * Every portrait here is a real photograph of a real person, downloaded from
 * the existing site and processed deterministically: one 4:5 crop, greyscale,
 * matched contrast. No generative model touches an image of a named person.
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
        className={`flex aspect-4/5 items-center justify-center bg-stone-100 ${className ?? ''}`}
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
  const srcSet = (ext: 'avif' | 'webp') =>
    portraitWidths.map((w) => `/media/people/${person.slug}-${w}.${ext} ${w}w`).join(', ');

  return (
    <picture className="block size-full">
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`/media/people/${person.slug}-320.webp`}
        alt={`${person.name}, ${person.role}`}
        width={320}
        height={400}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={`portrait aspect-4/5 size-full bg-stone-100 object-cover ${className ?? ''}`}
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
