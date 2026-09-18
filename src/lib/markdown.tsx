import type { ReactNode } from 'react';

/**
 * A markdown renderer sized to exactly what content/legal/*.mdx contains:
 * YAML frontmatter, ATX headings, loose bullet lists, paragraphs and inline
 * links. Nothing else appears in those six files, so nothing else is parsed.
 *
 * The alternative was @next/mdx plus @mdx-js/react, roughly 200 kB of build
 * dependency to render text that uses four constructs. If a future page needs
 * tables, emphasis or ordered lists, that is the point to reconsider.
 * ponytail: four constructs, no dependency. Swap to MDX when the source needs it.
 */

/** `[label](href)`. Href may not contain whitespace or a closing bracket. */
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const HEADING = /^(#{1,6})\s+(.*)$/;
const BULLET = /^-\s+(.*)$/;
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const FIELD = /^([A-Za-z_][\w-]*):\s*(.*)$/;

export interface Frontmatter {
  /** A quoted or bare scalar. `null` covers both an explicit null and an empty value. */
  [key: string]: string | null;
}

/**
 * Splits YAML frontmatter from the body. Only flat `key: value` scalars are
 * read; comment lines are skipped, which is how legal.mdx records that the
 * source page carried no date.
 */
export function parseFrontmatter(source: string): { data: Frontmatter; body: string } {
  const match = FRONTMATTER.exec(source);
  if (!match?.[1]) return { data: {}, body: source };

  const data: Frontmatter = {};
  for (const line of match[1].split('\n')) {
    const field = FIELD.exec(line.trim());
    if (!field?.[1]) continue;
    const raw = field[2]?.trim() ?? '';
    data[field[1]] =
      raw === '' || raw === 'null' || raw === '~' ? null : raw.replace(/^['"]|['"]$/g, '');
  }
  return { data, body: source.slice(match[0].length) };
}

function inline(text: string, key: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(LINK)) {
    const at = match.index;
    if (at > cursor) nodes.push(text.slice(cursor, at));
    const href = match[2] ?? '';
    nodes.push(
      <a
        key={`${key}-${at}`}
        href={href}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {match[1]}
      </a>,
    );
    cursor = at + match[0].length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

/**
 * Renders the body to elements the Prose component styles.
 *
 * Headings start at h2 so the page keeps one h1. A blank line ends a paragraph
 * but not a list, because the source lists are loose: their items are separated
 * by blank lines and must still render as one list.
 */
export function renderMarkdown(body: string): ReactNode[] {
  const out: ReactNode[] = [];
  let paragraph: string[] = [];
  let items: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const key = `p-${out.length}`;
    out.push(<p key={key}>{inline(paragraph.join(' '), key)}</p>);
    paragraph = [];
  };

  const flushList = () => {
    if (items.length === 0) return;
    const key = `ul-${out.length}`;
    const collected = items;
    out.push(
      <ul key={key}>
        {collected.map((item, index) => (
          <li key={`${key}-${index}`}>{inline(item, `${key}-${index}`)}</li>
        ))}
      </ul>,
    );
    items = [];
  };

  for (const rawLine of body.split('\n')) {
    const line = rawLine.trim();

    if (line === '') {
      flushParagraph();
      continue;
    }

    const heading = HEADING.exec(line);
    if (heading?.[2]) {
      flushParagraph();
      flushList();
      const key = `h-${out.length}`;
      const level = (heading[1] ?? '##').length;
      if (level <= 2) out.push(<h2 key={key}>{inline(heading[2], key)}</h2>);
      else out.push(<h3 key={key}>{inline(heading[2], key)}</h3>);
      continue;
    }

    const bullet = BULLET.exec(line);
    if (bullet?.[1] !== undefined) {
      flushParagraph();
      items.push(bullet[1]);
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  return out;
}
