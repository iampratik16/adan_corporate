import type { Metadata } from 'next';
import Link from 'next/link';
import { podcast } from '@content/insights';
import { people } from '@content/people';
import { site } from '@content/site';
import { ContactBand } from '@/components/shared/ContactBand';

export const metadata: Metadata = {
  title: podcast.name,
  description: podcast.description,
  alternates: { canonical: '/podcast' },
};

const monthFormat = new Intl.DateTimeFormat('en-GB', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/**
 * The podcast is the one channel on this site that is not a page of links, so it
 * is given the dark ground and holds it the whole way down: masthead, the show,
 * and every episode in one band. PageHeader is built for a light ground and its
 * lead and kicker colours fail on ink, so the masthead is written here instead.
 *
 * Two episodes were never published. The old site showed "Coming soon..." against
 * an empty link; they are listed and marked rather than quietly dropped.
 */
export default function PodcastPage() {
  const hostProfiled = people.some((person) => person.slug === podcast.hostSlug);
  const published = podcast.episodes.filter((episode) => episode.published);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    name: podcast.name,
    description: podcast.description,
    url: `${site.url}/podcast`,
    sameAs: [podcast.spotify],
    numberOfEpisodes: published.length,
    author: { '@type': 'Person', name: podcast.host },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
  };

  return (
    <>
      <div className="band-ink on-ink">
        <header className="container-site pt-[clamp(128px,15vw,200px)] pb-[clamp(48px,6vw,80px)]">
          <p className="mb-6 text-micro text-stone-300">A podcast from {site.name}</p>
          <h1 className="max-w-[14ch] font-display text-display-1 leading-display-tight tracking-[-0.022em]">
            {podcast.name}
          </h1>
          <p className="measure mt-8 text-lead text-stone-300">{podcast.description}</p>

          <p className="mt-6 text-small text-stone-300">
            Hosted by{' '}
            {hostProfiled ? (
              <Link href={`/people/${podcast.hostSlug}`} className="link-underline text-paper">
                {podcast.host}
              </Link>
            ) : (
              <span className="text-paper">{podcast.host}</span>
            )}
          </p>

          <div className="mt-9">
            <a href={podcast.spotify} target="_blank" rel="noreferrer" className="btn">
              Listen on Spotify
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </header>

        <section
          className="container-site pb-[clamp(72px,9vw,160px)]"
          aria-labelledby="episodes-heading"
        >
          <h2
            id="episodes-heading"
            data-reveal
            className="font-display text-display-3 leading-[1.05] tracking-[-0.02em]"
          >
            Episodes
          </h2>
          <p className="tabular mt-3 text-small text-stone-300">
            {published.length} published of {podcast.episodes.length} recorded
          </p>

          <ul className="mt-10">
            {podcast.episodes.map((episode) => (
              <li key={episode.number} className="border-t border-white/16 last:border-b">
                <article className="grid gap-x-8 gap-y-3 py-7 md:grid-cols-12">
                  <p className="tabular text-micro text-accent-bright md:col-span-1">
                    <span className="sr-only">Episode </span>
                    {String(episode.number).padStart(2, '0')}
                  </p>

                  <div className="md:col-span-8">
                    <h3 className="font-display text-display-4 leading-[1.2]">{episode.title}</h3>
                    <p className="mt-2 text-micro text-stone-300">
                      {episode.guestUrl ? (
                        <a
                          href={episode.guestUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="link-underline text-paper"
                        >
                          {episode.guest}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : (
                        <span className="text-paper">{episode.guest}</span>
                      )}
                    </p>
                    <p className="measure mt-3 text-body text-stone-300">{episode.description}</p>
                  </div>

                  <div className="md:col-span-3 md:text-right">
                    <time dateTime={episode.date} className="tabular text-micro text-stone-300">
                      {monthFormat.format(new Date(`${episode.date}-01T00:00:00Z`))}
                    </time>
                    {!episode.published && (
                      <p className="mt-2 text-micro text-stone-300">Recorded, not published</p>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <p className="measure mt-10 text-small text-stone-300">
            Every published episode is on Spotify. Nothing is streamed from this page, so the show
            plays wherever you already listen.
          </p>
        </section>
      </div>

      <ContactBand
        heading="Come on the show, or start a conversation."
        body="If you have run the kind of business the show talks about, or you want to speak to a partner about your own, tell us what you are working on."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
