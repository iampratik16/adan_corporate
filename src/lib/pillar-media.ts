import { media, type MediaAsset } from '@content/media';
import type { PillarId } from '@content/schema';

/**
 * Media ids for the four pillars that carry a photograph.
 *
 * AI & Digital is deliberately absent: it has no photograph anywhere on the
 * site and uses the code-drawn line field instead. A missing entry here is the
 * signal to render MeridianField, not a gap to be filled later.
 */
const PILLAR_MEDIA: Partial<Record<PillarId, string>> = {
  'corporate-finance': 'pillar-corporate-finance',
  'mergers-acquisitions': 'pillar-ma',
  'strategy-leadership': 'pillar-strategy',
  'risk-governance': 'pillar-risk',
};

export interface PillarImage {
  mediaId: string;
  asset: MediaAsset;
}

export function pillarImage(id: PillarId): PillarImage | undefined {
  const mediaId = PILLAR_MEDIA[id];
  if (!mediaId) return undefined;
  const asset = media[mediaId];
  return asset ? { mediaId, asset } : undefined;
}
