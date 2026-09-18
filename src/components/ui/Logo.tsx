import { site } from '@content/site';

/**
 * The Adan Corporate lockup: the supplied mark, plus the firm's name set in the
 * site's own text face.
 *
 * The client supplied a 200x200 PNG of the roundel with real transparency,
 * which replaced the 291x36 wordmark that had the white ground baked in and
 * could not be reversed at all. The mark is used exactly as supplied: scaled,
 * never redrawn, never recoloured.
 *
 * The name beside it is typeset rather than an image, because the only wordmark
 * asset is anti-aliased against white and hollows out when keyed. Typesetting
 * the company's name is not altering the mark, and it stays crisp at any size.
 * A vector wordmark is still requested in docs/CLIENT-QUESTIONS.md.
 */
export function Logo({
  size = 36,
  showName = true,
  className,
}: {
  size?: number;
  showName?: boolean;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ''}`}>
      <Mark size={size} />
      {showName && (
        <span className="text-small font-medium tracking-[0.02em] whitespace-nowrap text-ink">
          {site.name}
        </span>
      )}
    </span>
  );
}

/** The mark on its own. It carries alpha, so it sits on any light surface. */
export function Mark({
  size = 36,
  priority = false,
  className,
}: {
  size?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <img
      src="/brand/adan-mark-80.webp"
      srcSet="/brand/adan-mark-40.webp 40w, /brand/adan-mark-80.webp 80w, /brand/adan-mark-120.webp 120w, /brand/adan-mark-160.webp 160w"
      sizes={`${size}px`}
      width={size}
      height={size}
      alt="Adan Corporate"
      // The masthead paints before anything else and is what Chrome reports as
      // the largest contentful paint on a phone.
      {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
      decoding="async"
      className={className}
      style={{ width: size, height: size }}
    />
  );
}

/** Backwards-compatible alias: the footer and 404 still ask for a Roundel. */
export const Roundel = Mark;
