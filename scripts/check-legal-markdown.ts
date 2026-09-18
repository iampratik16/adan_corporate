/**
 * The legal text is carried over verbatim, so the only thing worth testing about
 * the renderer is that nothing is lost, reordered or left as raw syntax.
 *
 * Run: npx tsx scripts/check-legal-markdown.ts
 */
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { legalPages } from '../content/legal/index';
import { loadAllLegal } from '../src/lib/legal';
import { renderMarkdown } from '../src/lib/markdown';

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&#39;': "'",
};

function plainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, (entity) => ENTITIES[entity] ?? entity)
    .replace(/\s+/g, ' ')
    .trim();
}

/** The text a source line should contribute, with its markdown syntax removed. */
function expectedText(line: string): string {
  return line
    .replace(/^#{1,6}\s+/, '')
    .replace(/^-\s+/, '')
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

async function main() {
  const documents = await loadAllLegal();
  assert.equal(documents.length, legalPages.length, 'every legal page must have a .mdx file');

  let lines = 0;
  for (const document of documents) {
    assert.ok(document.title.length > 0, `${document.slug}: no frontmatter title`);

    const html = renderToStaticMarkup(renderMarkdown(document.body));
    const text = plainText(html);

    // Nothing verbatim was dropped.
    for (const line of document.body.split('\n')) {
      const expected = expectedText(line);
      if (expected === '') continue;
      lines += 1;
      assert.ok(
        text.includes(expected),
        `${document.slug}: this source line did not survive the render:\n  ${expected.slice(0, 120)}`,
      );
    }

    // Nothing was left as raw syntax.
    assert.ok(!/(^|\s)#{1,6}\s/.test(text), `${document.slug}: an unrendered heading marker`);
    assert.ok(!/\[[^\]]+\]\([^)]+\)/.test(text), `${document.slug}: an unrendered link`);
    assert.ok(!text.includes('---'), `${document.slug}: frontmatter leaked into the body`);
    assert.ok(html.startsWith('<h2') || html.startsWith('<p'), `${document.slug}: odd first block`);
  }

  // Loose lists, whose items are separated by blank lines, must stay one list.
  const privacy = documents.find((document) => document.slug === 'privacy-policy');
  assert.ok(privacy, 'privacy-policy is missing');
  const privacyHtml = renderToStaticMarkup(renderMarkdown(privacy.body));
  const longestList = Math.max(
    ...[...privacyHtml.matchAll(/<ul>([\s\S]*?)<\/ul>/g)].map(
      (match) => [...(match[1] ?? '').matchAll(/<li>/g)].length,
    ),
  );
  assert.ok(longestList >= 5, `loose list items were split apart: longest list is ${longestList}`);

  // Inline links keep their destination.
  const legal = documents.find((document) => document.slug === 'legal');
  assert.ok(legal, 'legal is missing');
  assert.match(
    renderToStaticMarkup(renderMarkdown(legal.body)),
    /<a href="https:\/\/www\.icaew\.com[^"]*" target="_blank" rel="noreferrer">Link<\/a>/,
    'the ICAEW link did not render',
  );

  console.log(
    `OK: ${documents.length} legal pages, ${lines} source lines rendered verbatim, ` +
      `longest list ${longestList} items.`,
  );
}

main();
