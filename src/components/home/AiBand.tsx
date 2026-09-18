import Link from 'next/link';
import { MeridianField } from './MeridianField';

/**
 * The AI & Digital feature band. The one dark moment on the homepage and the
 * only place with a more technical mood.
 *
 * Every claim here is narrow on purpose. The old site supports an advisory
 * proposition and nothing else: no products, no tools, no track record, no
 * metrics. The whole section is draft pending partner sign-off, which is
 * recorded in docs/CLIENT-QUESTIONS.md.
 */
export function AiBand() {
  return (
    <section
      className="band-ink on-ink relative isolate overflow-hidden"
      aria-labelledby="ai-heading"
    >
      <div className="absolute inset-0 -z-10">
        <MeridianField />
      </div>

      <div className="container-site relative py-section-lg">
        <p data-reveal className="text-micro tracking-[0.06em] text-accent-bright uppercase">
          AI &amp; Digital
        </p>

        <h2
          id="ai-heading"
          data-reveal
          data-reveal-delay="1"
          className="mt-5 max-w-[18ch] font-display text-display-2 leading-[1.05] tracking-[-0.018em]"
        >
          Practical AI, for deals and for the businesses behind them.
        </h2>

        <div className="mt-14 grid gap-x-16 gap-y-12 lg:grid-cols-2">
          <div data-reveal data-reveal-delay="2" className="border-t border-white/20 pt-6">
            <h3 className="font-display text-display-4 leading-[1.2]">Advising clients</h3>
            <p className="mt-4 max-w-[46ch] text-body text-stone-300">
              Where AI changes what a mid-market business is worth, how it is run, or what a buyer
              needs to diligence, we advise on it: readiness and strategy, AI and data diligence in
              a transaction, governance and risk, and the analytics and automation that follow.
            </p>
          </div>

          <div data-reveal data-reveal-delay="3" className="border-t border-white/20 pt-6">
            <h3 className="font-display text-display-4 leading-[1.2]">In our own work</h3>
            <p className="mt-4 max-w-[46ch] text-body text-stone-300">
              We use the same tools ourselves, to source and screen opportunities across markets, to
              get through research and diligence faster, and to build and stress financial models.
              Partners still take the view. The work is checked before it leaves the firm.
            </p>
          </div>
        </div>

        <div data-reveal className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href="/expertise/ai-digital" className="btn">
            AI &amp; Digital
          </Link>
          <Link
            href="/contact?enquiry=explore-ai"
            className="link-underline text-small text-stone-300 hover:text-white"
          >
            Talk to us about AI
          </Link>
        </div>
      </div>
    </section>
  );
}
