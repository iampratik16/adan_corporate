import { media, type MediaAsset } from '@content/media';
import type { PillarId } from '@content/schema';

/**
 * Media ids for the pillars that carry a photograph. All five now do.
 *
 * AI & Digital used to be deliberately absent, on the reasoning that it has no
 * photograph anywhere on the old site and that the code-drawn line field said
 * more than a stock picture of technology would. The client asked for an image.
 *
 * The risk in that request is the one the brief names: a glowing blue brain, a
 * network of dots over a city, a hand touching a screen. The prompt avoids it
 * by treating the subject as architecture rather than as technology. It is a
 * data hall shot the way the other four pillars are shot: strict perspective,
 * strong verticals, deep blue-black, one brass highlight, nobody present. The
 * indicator lights are deliberately too small to read as lights.
 *
 * MeridianField is still the AI band's background on the homepage; this only
 * changes the pillar card and the pillar page. A missing entry here remains the
 * signal to render the line field instead.
 */
const PILLAR_MEDIA: Partial<Record<PillarId, string>> = {
  'corporate-finance': 'pillar-corporate-finance',
  'mergers-acquisitions': 'pillar-ma',
  'strategy-leadership': 'pillar-strategy',
  'risk-governance': 'pillar-risk',
  'ai-digital': 'pillar-ai-digital',
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
