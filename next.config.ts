import type { NextConfig } from 'next';
import { redirects as redirectMap } from './content/redirects';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // `next dev` otherwise appends its own instruction block to CLAUDE.md on
  // every run, which turns a hand-written file into a generated one.
  agentRules: false,

  images: {
    // AVIF first: the hero poster is the LCP element and AVIF is roughly 30%
    // smaller than WebP at the same quality on this kind of photography.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  async redirects() {
    return redirectMap;
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
      {
        /*
         * Immutable for a year, which is only honest because every URL that can
         * change carries a `?v=` content hash. See src/lib/media-version.ts.
         *
         * This used to say "generated media is content-addressed by name and
         * never mutates", and that was simply not true: `hero-film-1280.mp4`
         * keeps its name through every re-cut of the film. A browser that had
         * seen one cut was told never to ask again, so it played a version of
         * the film that no longer existed on disk, for a year. It was reported
         * as the hero not updating, twice, and it is invisible from the server
         * side because the server is serving the right bytes to anyone who asks.
         *
         * If you rewrite a file under a name that is already published, its URL
         * must change too, or nothing will fetch it.
         */
        source: '/media/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
