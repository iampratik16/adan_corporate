import { figures, figuresAsAt, homepageFigures } from '@content/figures';
import { media } from '@content/media';
import { FigureRow } from '@/components/shared/FigureRow';
import { Picture } from '@/components/shared/Picture';

/**
 * The "who we are" paragraph set large in the display face, then one ruled row
 * of four figures.
 *
 * No count-up animation. A number that spins up from zero is a decoration on a
 * fact, and this audience reads the fact.
 *
 * Every figure on the old site contradicts another figure on the old site, so
 * each one carries provenance in content/figures.ts and an unconfirmed figure
 * is marked in development until a partner signs it off.
 */
export function Statement() {
  const statement = media['statement'];
  const shown = homepageFigures
    .map((id) => figures.find((f) => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <section className="section-y" aria-labelledby="statement-heading">
      <div className="container-site">
        <h2
          id="statement-heading"
          data-reveal
          className="max-w-[22ch] font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
        >
          An advisory firm of people who have run companies, not only advised them.
        </h2>

        {/*
          The standing text sat in the right half and the left half was empty,
          which read as a gap rather than as space. The photograph fills it and
          the two halves now balance. It is daylight rather than the house dawn,
          like the other card photography on this page; see docs/DECISIONS.md
          section 23.
        */}
        <div className="mt-12 grid items-center gap-x-12 gap-y-10 lg:grid-cols-12">
          {statement && (
            <div data-reveal data-reveal-delay="1" className="lg:col-span-6 lg:col-start-1">
              <div className="aspect-3/2 overflow-hidden">
                <Picture
                  image={{ mediaId: 'statement', asset: statement }}
                  alt=""
                  sizes="(min-width: 1024px) 46vw, 100vw"
                />
              </div>
            </div>
          )}
          <p
            data-reveal
            data-reveal-delay="2"
            className="measure text-lead text-stone-700 lg:col-span-6 lg:col-start-7"
          >
            Our partners are mostly former chief executives, finance directors and board members of
            listed companies. They work with founders, boards and investors in the mid-market, and
            most of what they do crosses a border: a company in one market, the capital in another,
            and a structure that has to satisfy both.
          </p>
        </div>

        {/* --- The ruled figure row. --- */}
        <div data-reveal data-reveal-delay="2" className="mt-[clamp(56px,7vw,96px)]">
          <FigureRow figures={shown} asAt={figuresAsAt} />
        </div>
      </div>
    </section>
  );
}
