import type { Metadata } from 'next';
import { figures } from '@content/figures';
import { insights } from '@content/insights';
import { media } from '@content/media';
import { offices, partnerCities } from '@content/offices';
import { people } from '@content/people';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pillars } from '@content/pillars';
import { site } from '@content/site';
import { transactions } from '@content/transactions';
import { Hero } from '@/components/home/Hero';
import { Statement } from '@/components/home/Statement';
import { Audiences } from '@/components/home/Audiences';
import { ExpertiseIndex, type IndexPillar } from '@/components/home/ExpertiseIndex';
import { AiBand } from '@/components/home/AiBand';
import { TransactionRail } from '@/components/home/TransactionRail';
import { Network } from '@/components/home/Network';
import { PeopleModule } from '@/components/home/PeopleModule';
import { InsightsModule } from '@/components/home/InsightsModule';
import { ContactBand } from '@/components/shared/ContactBand';
import type { GlobeCity } from '@/components/home/NetworkGlobe';
import { pillarImage } from '@/lib/pillar-media';

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description: site.description,
  alternates: { canonical: '/' },
};

/**
 * The 60-second film is an optional tier. Until it has been generated and
 * assembled, the hero simply loops the 8-second shot, which is what most
 * visitors see anyway. Checked at build time so no client ever requests a file
 * that is not there.
 */
const FULL_FILM = existsSync(path.join(process.cwd(), 'public/media/hero-film-1920.mp4'))
  ? ['/media/hero-film-1920.webm', '/media/hero-film-1920.mp4']
  : [];

export default function HomePage() {
  const heroMedia = media['hero-still'];
  if (!heroMedia) {
    // Fail the build loudly rather than shipping a hero with no poster, which
    // would also mean no LCP element.
    throw new Error(
      'content/media.ts has no hero-still entry. Run `pnpm media:generate` then `pnpm media:process`.',
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

  // The rail leads with the largest deals, which are the strongest proof points.
  const railTransactions = transactions.slice(0, 10);

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
        poster={{ src: '/media/hero-still-1920.webp', widths: heroMedia.widths }}
        portraitPoster={
          media['hero-still-portrait'] ? { widths: media['hero-still-portrait'].widths } : undefined
        }
        blurDataURL={heroMedia.blurDataURL}
        film={{
          // Tier 2: the 8-second seamless loop, which is what most visitors ever see.
          loop: ['/media/hero-loop-1280.webm', '/media/hero-loop-1280.mp4'],
          // Tier 3: the full 60 seconds, desktop on a good connection only.
          full: FULL_FILM,
          portrait: ['/media/hero-film-portrait-1280.webm', '/media/hero-film-portrait-1280.mp4'],
        }}
      />
      <Statement />
      <Audiences />
      <ExpertiseIndex pillars={indexPillars} />
      <AiBand />
      <TransactionRail transactions={railTransactions} />
      <Network cities={cities} officeCount={offices.length} />
      <PeopleModule managing={managing} partners={partners} total={people.length} />
      <InsightsModule insights={insights.slice(0, 5)} />
      <ContactBand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
