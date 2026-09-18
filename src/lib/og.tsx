import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from '@content/site';

/**
 * The shared Open Graph card: typographic, on the ink ground, no photograph.
 *
 * A card is read at about 200px wide in a LinkedIn feed or a Slack unfurl, so a
 * face or a corridor becomes mud at that size while a name set large stays
 * legible. It also keeps these routes cheap: one font file and a few boxes.
 *
 * Newsreader is read from assets/ rather than fetched from Google at build
 * time, so a build without network access still produces a correct card.
 * Supplying fonts replaces @vercel/og's bundled sans outright, so the whole
 * card is set in Newsreader and differentiated by size, tracking and colour.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

const newsreader = await readFile(join(process.cwd(), 'assets', 'Newsreader-Regular.ttf')).catch(
  () => null,
);

/** Ink, paper, stone-300 and accent-bright, matching the tokens in globals.css. */
const INK = '#0B1D33';
const PAPER = '#F6F7F8';
const STONE = '#B9C0C8';
const ACCENT = '#E8554B';

/** One line of display type has to fit 1040px. Long titles step down. */
function titleSize(title: string): number {
  if (title.length > 58) return 62;
  if (title.length > 38) return 78;
  return 96;
}

export function ogImage({ title, meta }: { title: string; meta?: string }) {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: INK,
        color: PAPER,
        padding: '76px 80px',
        fontFamily: 'Newsreader',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 56, height: 2, backgroundColor: ACCENT, marginRight: 20 }} />
        <div style={{ fontSize: 26, letterSpacing: '0.16em', color: STONE }}>
          {site.name.toUpperCase()}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontSize: titleSize(title),
            lineHeight: 1.04,
            letterSpacing: '-0.02em',
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
        {meta ? (
          <div style={{ display: 'flex', marginTop: 30, fontSize: 30, color: STONE }}>{meta}</div>
        ) : null}
      </div>
    </div>,
    {
      ...OG_SIZE,
      ...(newsreader
        ? {
            fonts: [
              {
                name: 'Newsreader',
                data: newsreader,
                style: 'normal' as const,
                weight: 400 as const,
              },
            ],
          }
        : {}),
    },
  );
}
