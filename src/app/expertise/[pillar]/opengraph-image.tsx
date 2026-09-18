import { pillars } from '@content/pillars';
import { site } from '@content/site';
import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og';

export const alt = `An area of expertise at ${site.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return pillars.map((pillar) => ({ pillar: pillar.id }));
}

export default async function Image({ params }: { params: Promise<{ pillar: string }> }) {
  const { pillar } = await params;
  const entry = pillars.find((item) => item.id === pillar);
  if (!entry) return ogImage({ title: site.tagline });

  return ogImage({ title: entry.title, meta: entry.descriptor });
}
