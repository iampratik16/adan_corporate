/**
 * Footer legal list. Order follows the legal sub-navigation on the old site.
 *
 * The old /en-uk/legal/sitemap.html is deliberately absent: it was an empty stub
 * ("Watch this space for more") with nothing to carry over. The new site needs a
 * real sitemap page and an XML sitemap, not a transcription.
 */
import { z } from 'zod';

const LegalPage = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
});
export type LegalPage = z.infer<typeof LegalPage>;

const data = [
  { slug: 'legal', title: 'Legal' },
  { slug: 'privacy-policy', title: 'Privacy policy' },
  { slug: 'gdpr-policy', title: 'GDPR policy' },
  { slug: 'diversity-policy', title: 'Diversity policy' },
  { slug: 'cookie-policy', title: 'Cookie policy' },
  { slug: 'accessibility', title: 'Accessibility statement' },
] satisfies unknown[];

export const legalPages = z.array(LegalPage).parse(data);
