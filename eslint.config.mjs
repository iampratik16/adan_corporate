import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

/**
 * Next 16 ships flat configs directly, so there is no FlatCompat shim here.
 */
const config = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      '.review/**',
      'media/**',
      'public/**',
      'test-results/**',
      'playwright-report/**',
      'next-env.d.ts',
    ],
  },
  {
    rules: {
      // This site serves its own pre-graded AVIF and WebP at fixed widths from
      // scripts/media/process.ts. Running them through next/image again would
      // re-encode an already optimal asset and add latency to the LCP path.
      // See docs/DECISIONS.md.
      '@next/next/no-img-element': 'off',
    },
  },
]

export default config;
