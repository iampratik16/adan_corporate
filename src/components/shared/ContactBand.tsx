import Link from 'next/link';

/**
 * The closing contact band. Routed, so the reader lands on the right partner
 * rather than a generic form.
 *
 * Ends the page on the warm photograph rather than on a third dark slab: the
 * hero, the AI band and the network are already dark, and a fourth would flatten
 * the rhythm the page has built.
 */
export function ContactBand({
  heading = 'Speak to a partner.',
  body = 'Tell us what you are trying to do and we will put you in front of the person who has done it before. No call centre, no junior triage.',
  action = { href: '/contact', label: 'Start a conversation' },
  media = true,
}: {
  heading?: string;
  body?: string;
  action?: { href: string; label: string };
  media?: boolean;
}) {
  return (
    <section className="bg-white" aria-labelledby="contact-band-heading">
      <div className="container-site">
        <div className="grid items-center gap-x-16 gap-y-10 py-section lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2
              id="contact-band-heading"
              data-reveal
              className="max-w-[16ch] font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
            >
              {heading}
            </h2>
            <p data-reveal data-reveal-delay="1" className="measure mt-6 text-lead text-stone-700">
              {body}
            </p>
            <div data-reveal data-reveal-delay="2" className="mt-9">
              <Link href={action.href} className="btn">
                {action.label}
              </Link>
            </div>
          </div>

          {media && (
            <div data-reveal className="lg:col-span-6">
              <div className="aspect-16/9 overflow-hidden bg-stone-100">
                <picture className="block size-full">
                  <source
                    type="image/avif"
                    srcSet="/media/contact-960.avif 960w, /media/contact-1280.avif 1280w, /media/contact-1920.avif 1920w"
                    sizes="(min-width: 1024px) 46vw, 100vw"
                  />
                  <source
                    type="image/webp"
                    srcSet="/media/contact-960.webp 960w, /media/contact-1280.webp 1280w, /media/contact-1920.webp 1920w"
                    sizes="(min-width: 1024px) 46vw, 100vw"
                  />
                  <img
                    src="/media/contact-1280.webp"
                    alt="A heavy timber door standing ajar onto a bright corridor, daylight lying across a pale stone floor."
                    width={1920}
                    height={1080}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover"
                  />
                </picture>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
