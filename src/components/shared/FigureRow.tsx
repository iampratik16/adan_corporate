import type { Figure } from '@content/schema';

/**
 * The ruled row of figures. One treatment, used by the homepage statement and
 * the about page, so the firm's numbers always look the same.
 *
 * No count-up animation. A number that spins up from zero is a decoration on a
 * fact, and this audience reads the fact.
 *
 * Every figure on the old site contradicts another figure on the old site, so
 * each one carries provenance in content/figures.ts and an unconfirmed figure
 * is marked in development until a partner signs it off.
 */
export function FigureRow({ figures, asAt }: { figures: Figure[]; asAt: string }) {
  return (
    <>
      <hr className="rule" />
      <dl className="grid grid-cols-2 lg:grid-cols-4">
        {figures.map((figure) => (
          <div
            key={figure.id}
            className="border-stone-200 py-8 pr-6 not-last:border-r max-lg:nth-[2]:border-r-0 max-lg:nth-[n+3]:border-t lg:py-10"
          >
            <dt className="sr-only">{figure.label}</dt>
            <dd>
              <span className="figure-value block font-display text-figure leading-[0.9] tracking-[-0.03em]">
                {figure.value}
              </span>
              <span className="mt-3 block max-w-[18ch] text-small text-stone-700">
                {figure.label}
              </span>
              {process.env.NODE_ENV === 'development' && figure.needsConfirmation && (
                <span className="mt-2 block text-micro text-accent">
                  Unconfirmed &mdash; see CLIENT-QUESTIONS
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <hr className="rule" />
      <p className="mt-4 text-micro text-stone-500">{asAt}</p>
    </>
  );
}
