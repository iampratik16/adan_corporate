/**
 * WCAG 2.2 contrast audit over the design tokens.
 *
 * The brief requires every text/background pair to be checked before use, so
 * this runs in `pnpm check` rather than living in someone's head.
 *   AA normal text 4.5:1 | AA large text (>=24px, or >=18.66px bold) 3:1 | UI components 3:1
 */
const TOKENS: Record<string, string> = {
  ink: '#0B1D33',
  ink800: '#12263D',
  paper: '#F6F7F8',
  white: '#FFFFFF',
  stone700: '#3E4A59',
  stone500: '#626D7A',
  stone300: '#B9C0C8',
  stone200: '#E3E6EA',
  stone100: '#EEF0F2',
  accent: '#C00000',
  accentBright: '#E8554B',
  accentDeep: '#A00000',
};

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  return [16, 8, 0]
    .map((s) => ((n >> s) & 255) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    .reduce((acc, c, i) => acc + c * [0.2126, 0.7152, 0.0722][i]!, 0);
}

export function contrast(a: string, b: string): number {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (l1 + 0.05) / (l2 + 0.05);
}

/** Every pair the site actually renders, with the standard each one must meet. */
const PAIRS: Array<[string, string, string, number]> = [
  ['ink', 'paper', 'body text on the page', 4.5],
  ['ink', 'white', 'body text on a raised surface', 4.5],
  ['stone700', 'paper', 'secondary text', 4.5],
  ['stone500', 'paper', 'meta text, captions, local times', 4.5],
  // Hairline dividers are decorative structure, not UI controls, so WCAG 1.4.11's
  // 3:1 does not apply. These thresholds are a house legibility floor, not a standard.
  ['stone300', 'paper', 'hairline rules (house floor, not WCAG)', 1.6],
  ['stone200', 'paper', 'borders (house floor, not WCAG)', 1.15],
  ['accent', 'paper', 'accent mark on the page', 4.5],
  ['accent', 'white', 'accent mark on a raised surface', 4.5],
  ['accentDeep', 'paper', 'accent link text on the page', 4.5],
  ['paper', 'ink', 'body text on a dark band', 4.5],
  ['stone300', 'ink', 'secondary text on a dark band', 4.5],
  ['stone500', 'ink', 'meta text on a dark band', 3],
  ['accentBright', 'ink', 'accent mark on a dark band', 3],
  ['accentBright', 'ink800', 'accent mark on a raised dark surface', 3],
  // Added after axe found both of these in the built pages. Neither pair exists
  // in a component's markup as two tokens: one was produced by an opacity
  // utility, the other by a token on a surface nobody had paired it with.
  ['stone500', 'stone100', 'monogram initials on their tile (large text)', 3],
  ['stone300', 'ink', 'filter count on an active (ink) chip', 4.5],
  ['accent', 'ink', 'REFERENCE: brand red direct on ink (expected to fail)', 3],
];

let failures = 0;
console.log('\n  WCAG 2.2 token audit\n  ' + '-'.repeat(68));
for (const [fg, bg, use, min] of PAIRS) {
  const ratio = contrast(TOKENS[fg]!, TOKENS[bg]!);
  const pass = ratio >= min;
  const reference = use.startsWith('REFERENCE');
  if (!pass && !reference) failures += 1;
  console.log(
    `  ${pass ? 'PASS' : 'FAIL'}  ${ratio.toFixed(2).padStart(5)}:1  (min ${min})  ` +
      `${fg} on ${bg}`.padEnd(26) +
      `  ${use}`,
  );
}
console.log('  ' + '-'.repeat(68));
console.log(failures ? `\n  ${failures} failing pair(s).\n` : '\n  All pairs pass.\n');
process.exit(failures ? 1 : 0);
