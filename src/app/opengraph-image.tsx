import { site } from '@content/site';
import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og';

export const alt = `${site.name}: ${site.tagline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({ title: site.tagline });
}
