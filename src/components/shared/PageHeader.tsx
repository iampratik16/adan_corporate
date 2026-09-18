import Link from 'next/link';

/**
 * The standard inner-page masthead.
 *
 * Every page below the homepage opens the same way, so a reader always knows
 * where they are: a small kicker, one H1, one lead paragraph, and an optional
 * band of media beneath. The homepage hero is the only exception, and being the
 * exception is what gives it weight.
 */
export function PageHeader({
  kicker,
  title,
  lead,
  children,
  breadcrumb,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
  breadcrumb?: { href: string; label: string };
}) {
  return (
    <header className="border-b border-stone-200">
      <div className="container-site pt-[clamp(128px,15vw,200px)] pb-[clamp(48px,6vw,80px)]">
        {breadcrumb && (
          <Link
            href={breadcrumb.href}
            className="link-underline mb-6 inline-block text-micro text-stone-500"
          >
            {breadcrumb.label}
          </Link>
        )}
        {kicker && !breadcrumb && (
          <p className="mb-6 text-micro tracking-[0.06em] text-stone-500 uppercase">{kicker}</p>
        )}
        <h1 className="max-w-[18ch] font-display text-display-1 leading-display-tight tracking-[-0.022em]">
          {title}
        </h1>
        {lead && <p className="measure mt-8 text-lead text-stone-700">{lead}</p>}
        {children}
      </div>
    </header>
  );
}
