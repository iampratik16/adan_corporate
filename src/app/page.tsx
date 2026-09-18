import type { Metadata } from 'next';
import { figures } from '@content/figures';
import { insights } from '@content/insights';
import { media } from '@content/media';
import { offices, partnerCities } from '@content/offices';
import { people } from '@content/people';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pillars } from '@content/pillars';
import { site } from '@content/site';
import { Hero } from '@/components/home/Hero';
import { Statement } from '@/components/home/Statement';
import { Audiences } from '@/components/home/Audiences';
import { ExpertiseIndex, type IndexPillar } from '@/components/home/ExpertiseIndex';
import { AiBand } from '@/components/home/AiBand';
import { InsightCards } from '@/components/home/InsightCards';
import { Network } from '@/components/home/Network';
import { PeopleModule } from '@/components/home/PeopleModule';
import { InsightsModule } from '@/components/home/InsightsModule';
import { ContactBand } from '@/components/shared/ContactBand';
import type { GlobeCity } from '@/components/home/NetworkGlobe';
import { pillarImage } from '@/lib/pillar-media';
import { mediaVersion, versioned } from '@/lib/media-version';

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description: site.description,
  alternates: { canonical: '/' },
};

/**
 * H.264 ONLY, AND THAT IS DELIBERATE.
 *
 * Every tier used to list a VP9 WebM first and the MP4 behind it, on the usual
 * reasoning that WebM is smaller and anything that cannot decode it falls
 * through to the next source. The fallthrough does not happen.
 *
 * WebKit answers `canPlayType('video/webm; codecs="vp9"')` with "probably",
 * commits to the WebM, reaches readyState 1 with the metadata parsed, and then
 * never plays a frame. It does not error, so `onError` never fires and nothing
 * falls back. The hero simply sat on its poster, for ever, on Safari. Measured:
 * the same 1280 MP4 in the same engine reaches readyState 4 and plays.
 *
 * Once the MP4 is listed first, every browser takes it and the WebM is never
 * selected by anything, so it is not built or shipped at all. It saved about
 * 0.8 MB on the largest rung and cost an entire browser engine.
 *
 * The full film is an optional tier. Until it has been assembled, the hero
 * simply loops its opening shot, which is what most visitors see anyway.
 *
 * Each rung is checked on its own, and the check reads the file's DURATION, not
 * just its name. Two ways this gate has been wrong before:
 *
 *   1. It tested only that `hero-film-1920.mp4` existed. That name was already
 *      occupied by the original single 8-second clip, so the gate passed and
 *      the hero served eight seconds as though it were sixty. A filename
 *      existing is not evidence that the thing exists.
 *   2. It probed the 1920 mp4 and spoke for all four files. When an interrupted
 *      encode left that one file truncated, the gate withdrew the whole tier,
 *      including a 1280 pair that decoded perfectly.
 *
 * A file that fails to probe is dropped from its own list and nothing else.
 *
 * The threshold is 10 seconds, not 30. It was 30 to catch a file that was
 * really the 8-second loop wearing the film's name. The film is now a 13.8s
 * cut, so 30 would have rejected the real thing and served the loop for ever;
 * 10 still catches the case it was written for.
 */
function rung(width: number): string[] {
  return (['mp4'] as const)
    .map((ext) => `hero-film-${width}.${ext}`)
    .filter((name) => {
      const file = path.join(process.cwd(), 'public/media', name);
      if (!existsSync(file)) return false;
      try {
        return (
          Number(
            execFileSync(
              'ffprobe',
              ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file],
              { encoding: 'utf8' },
            ).trim(),
          ) >= 10
        );
      } catch {
        // Either no ffprobe at build time or the file will not demux. Both mean
        // the same thing here: do not offer this file to a browser.
        return false;
      }
    })
    .map((name) => versioned(`/media/${name}`));
}

const FULL_FILM = rung(1920);
const FULL_FILM_NARROW = rung(1280);

export default function HomePage() {
  /**
   * The poster, which is the LCP element.
   *
   * `hero-poster` is frame 0 of the graded film, extracted by
   * scripts/media/assemble-hero.ts, so the poster and frame one of the film are
   * the same image by construction. `hero-still` is the fallback for a checkout
   * where the film has not been assembled yet; it is a generated still of the
   * lobby and matches the film only when the cut happens to open there, which
   * is exactly the mismatch `hero-poster` exists to stop.
   */
  const posterId = media['hero-poster'] ? 'hero-poster' : 'hero-still';
  const heroMedia = media[posterId];
  if (!heroMedia) {
    // Fail the build loudly rather than shipping a hero with no poster, which
    // would also mean no LCP element.
    throw new Error(
      'content/media.ts has no hero-poster or hero-still entry. Run `pnpm media:process`.',
    );
  }

  const indexPillars: IndexPillar[] = pillars.map((pillar) => {
    const image = pillarImage(pillar.id);
    return {
      id: pillar.id,
      title: pillar.title,
      descriptor: pillar.descriptor,
      href: `/expertise/${pillar.id}`,
      tags: pillar.capabilities.map((capability) => capability.title),
      image: image
        ? {
            mediaId: image.mediaId,
            src: `/media/${image.mediaId}-1280.webp`,
            widths: image.asset.widths,
            alt: pillar.imageAlt ?? '',
          }
        : undefined,
    };
  });

  const managing = people.filter((person) => person.group === 'managing-partner');
  const partners = people.filter((person) => person.group === 'partner');

  const cities: GlobeCity[] = [
    ...offices.map((office) => ({
      slug: office.slug,
      city: office.city,
      country: office.country,
      timeZone: office.timeZone,
      lat: office.lat,
      lng: office.lng,
      isOffice: true,
    })),
    ...partnerCities.map((city) => ({
      slug: `partner-${city.city.toLowerCase().replace(/\s+/g, '-')}`,
      city: city.city,
      country: city.country,
      timeZone: city.timeZone,
      lat: city.lat,
      lng: city.lng,
      isOffice: false,
    })),
  ];

  // The four insights that were given a photograph. The card section shows
  // these rather than the first four of the list, because nine of the thirteen
  // have no image and would fall back to a texture tile beside them.
  const cardInsights = insights.filter((insight) => insight.image).slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    url: site.url,
    description: site.description,
    areaServed: offices.map((office) => office.country),
    knowsAbout: pillars.map((pillar) => pillar.title),
    numberOfEmployees: figures.find((f) => f.id === 'professionals')?.value,
  };

  return (
    <>
      <Hero
        poster={{
          id: posterId,
          src: versioned(`/media/${posterId}-1920.webp`),
          widths: heroMedia.widths,
          v: mediaVersion(`/media/${posterId}-1920.webp`),
        }}
        blurDataURL={heroMedia.blurDataURL}
        film={{
          // Two rungs of one film, and HeroFilm picks between them in script:
          // `<source media>` is a <picture> feature and does nothing inside
          // <video>, where the browser simply takes the first source it can
          // decode. The loop and portrait tiers are gone; see HeroFilm.tsx.
          full: FULL_FILM,
          fullNarrow: FULL_FILM_NARROW,
        }}
      />
      <Statement />
      <Audiences />
      <ExpertiseIndex pillars={indexPillars} />
      <AiBand />
      <InsightCards insights={cardInsights} />
      <Network cities={cities} officeCount={offices.length} />
      <PeopleModule managing={managing} partners={partners} total={people.length} />
      {/*
        The library keeps its place further down, and drops the four already
        shown as cards above so the page does not print the same piece twice.
      */}
      <InsightsModule
        insights={insights.filter((insight) => !cardInsights.includes(insight)).slice(0, 5)}
      />
      <ContactBand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
