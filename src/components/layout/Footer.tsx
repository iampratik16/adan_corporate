import Link from 'next/link';
import { offices } from '@content/offices';
import { site } from '@content/site';
import { LocalTime } from '@/components/ui/LocalTime';
import { Roundel } from '@/components/ui/Logo';

/**
 * Four columns, the office cities with their local time, and the legal line.
 *
 * The clocks are the last appearance of the Corridors idea and the most
 * practical: a reader deciding whether to call Singapore at 18:40 in London can
 * see that it is 01:40 there.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-site-footer className="band-ink on-ink">
      <div className="container-site">
        <div className="grid gap-x-10 gap-y-12 pt-section pb-14 md:grid-cols-2 lg:grid-cols-4">
          {site.footerColumns.map((column) => (
            <nav key={column.title} aria-labelledby={`footer-${column.title}`}>
              <h2
                id={`footer-${column.title}`}
                className="font-sans text-micro font-medium tracking-[0.06em] text-stone-300 uppercase"
              >
                {column.title}
              </h2>
              <ul className="mt-5 space-y-2.5">
                {column.links.map((link) => {
                  const external = link.href.startsWith('http');
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="link-underline text-small text-paper"
                        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <hr className="rule-ink" />

        {/* --- Offices, with the local time in each. --- */}
        <section aria-labelledby="footer-offices" className="py-12">
          <h2
            id="footer-offices"
            className="font-sans text-micro font-medium tracking-[0.06em] text-stone-300 uppercase"
          >
            Offices
          </h2>
          {/* Two columns need 144px each for "Johannesburg" plus its clock, which a
              320px screen cannot give, so the narrowest phones get one column. */}
          <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {offices.map((office) => (
              <li key={office.slug} className="flex items-baseline justify-between gap-3">
                <Link
                  href={`/contact#${office.slug}`}
                  className="link-underline text-small text-paper"
                >
                  {office.city}
                </Link>
                <LocalTime
                  timeZone={office.timeZone}
                  className="shrink-0 text-micro text-stone-300"
                />
              </li>
            ))}
          </ul>
        </section>

        <hr className="rule-ink" />

        <div className="flex flex-col gap-8 py-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[52ch]">
            <div className="flex items-center gap-3">
              <Roundel size={26} />
              <span className="font-display text-body">{site.name}</span>
            </div>
            {/* Placeholder until the client supplies the regulatory wording. */}
            <p className="mt-4 text-micro leading-[1.6] text-stone-300">{site.legalLine}</p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 lg:items-end">
            <div className="flex gap-6">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-small"
              >
                LinkedIn
              </a>
              <a
                href={site.social.spotify}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-small"
              >
                Spotify
              </a>
            </div>
            <p className="tabular text-micro text-stone-300">
              &copy; {site.name} {site.founded}&ndash;{year}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
