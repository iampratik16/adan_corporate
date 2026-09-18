import type { Figure } from '@content/schema';

/**
 * The row of figures. One treatment, used by the homepage statement and the
 * about page, so the firm's numbers always look the same.
 *
 * Laid out after the figures block on the Rothschild & Co homepage that the
 * client supplied: each figure is a raised card with a single heavy rule down
 * its left edge, the label small at the top and the value large beneath it.
 * The reference carries a third line, a caption under the figure, which these
 * do not have and will not be given: inventing a sentence to sit under
 * "US$5bn" is inventing a claim.
 *
 * MARKUP. A `<dl>` may directly contain only `<dt>`/`<dd>` pairs or `<div>`
 * wrappers around them, and axe fails the whole page when it contains anything
 * else. Each card is a `<div>` holding exactly one `<dt>` and one `<dd>`.
 *
 * The label is genuinely first here, on the page as well as in the DOM, so the
 * `order` juggling the previous version needed is gone with it. Reading order
 * and visual order agree, which is the only arrangement that cannot drift.
 *
 * THE UNCONFIRMED MARKER IS GONE FROM THE PAGE, not from the data. It rendered
 * in development only and read "Unconfirmed, see CLIENT-QUESTIONS" under three
 * of the four figures; the client asked for it off. Those three are still
 * `needsConfirmation` in content/figures.ts, each with the contradiction that
 * makes them so, and all of it is still open in docs/CLIENT-QUESTIONS.md. What
 * was removed is the reminder, not the problem.
 *
 * No count-up animation. A number that spins up from zero is a decoration on a
 * fact, and this audience reads the fact.
 */
export function FigureRow({ figures, asAt }: { figures: Figure[]; asAt: string }) {
  return (
    <>
      <dl className="figure-row grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {figures.map((figure) => (
          <div key={figure.id} className="border-l-2 border-ink bg-white px-6 py-7 lg:px-7 lg:py-8">
            <dt className="max-w-[22ch] text-small text-stone-700">{figure.label}</dt>
            <dd className="mt-5">
              <span className="figure-value figure-row-value block font-display">
                {figure.value}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      {/* Empty until a partner supplies a real date; see content/figures.ts. */}
      {asAt && <p className="mt-[clamp(24px,3vw,40px)] text-micro text-stone-500">{asAt}</p>}
    </>
  );
}
