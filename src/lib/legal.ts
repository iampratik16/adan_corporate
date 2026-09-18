import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { legalPages, type LegalPage } from '@content/legal/index';
import { parseFrontmatter } from './markdown';

export interface LegalDocument extends LegalPage {
  /** ISO date from the source page, or null where the old site carried none. */
  updated: string | null;
  /** Markdown body with the frontmatter removed. */
  body: string;
}

/**
 * Reads one legal page from content/legal/. The route is fully prerendered, so
 * this runs at build time only and never on a request.
 *
 * Returns null for an unknown slug rather than throwing, so the route can call
 * notFound() and the sitemap can skip a file that has been removed.
 */
export async function loadLegal(slug: string): Promise<LegalDocument | null> {
  const page = legalPages.find((entry) => entry.slug === slug);
  if (!page) return null;

  const source = await readFile(join(process.cwd(), 'content', 'legal', `${slug}.mdx`), 'utf8');
  const { data, body } = parseFrontmatter(source);

  return {
    ...page,
    // The file's own title is the one the old site printed; the index title is
    // the navigation label. They agree today, and the file wins if they diverge.
    title: data.title ?? page.title,
    updated: data.updated ?? null,
    body,
  };
}

export async function loadAllLegal(): Promise<LegalDocument[]> {
  const documents = await Promise.all(legalPages.map((page) => loadLegal(page.slug)));
  return documents.filter((document): document is LegalDocument => document !== null);
}
