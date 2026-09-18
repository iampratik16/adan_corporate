/**
 * The content contract. Every typed file under content/ is validated against
 * these schemas at import time, so a malformed entry fails the build rather
 * than rendering as an empty card.
 *
 * A headless CMS can replace these files later without touching a component,
 * provided it satisfies these shapes.
 */
import { z } from 'zod';

export const pillarIds = [
  'corporate-finance',
  'mergers-acquisitions',
  'strategy-leadership',
  'risk-governance',
  'ai-digital',
] as const;

export const PillarId = z.enum(pillarIds);
export type PillarId = z.infer<typeof PillarId>;

/** Ordering on the People page and in every partner rail. */
export const personGroups = [
  'managing-partner',
  'partner',
  'director',
  'advisor',
  'analyst',
] as const;
export const PersonGroup = z.enum(personGroups);
export type PersonGroup = z.infer<typeof PersonGroup>;

export const regions = ['Europe', 'Asia', 'Africa', 'Americas', 'Middle East', 'Global'] as const;
export const Region = z.enum(regions);
export type Region = z.infer<typeof Region>;

/**
 * Every published figure carries its provenance. `needsConfirmation` drives a
 * visible partner-review marker in development and an entry in
 * docs/CLIENT-QUESTIONS.md. Nothing on this site prints a number without one.
 */
export const Figure = z.object({
  id: z.string(),
  value: z.string(),
  label: z.string(),
  footnote: z.string().optional(),
  needsConfirmation: z.boolean(),
  /** Where the number came from, and what contradicts it. */
  sourceNote: z.string(),
});
export type Figure = z.infer<typeof Figure>;

export const Person = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  /** Name as the old site printed it, where it differs. */
  printedAs: z.string().optional(),
  role: z.string(),
  /** The specialism that follows the slash on the old site, e.g. "Sustainable Energy". */
  roleDetail: z.string().optional(),
  group: PersonGroup,
  city: z.string(),
  country: z.string(),
  /** IANA zone. Drives the local clock beside the name. */
  timeZone: z.string(),
  email: z.string().email(),
  linkedin: z.string().url().optional(),
  bio: z.string().min(40),
  expertise: z.array(z.string()).default([]),
  sectors: z.array(z.string()).default([]),
  geographies: z.array(z.string()).default([]),
  pillars: z.array(PillarId).default([]),
  /** Processed 4:5 portrait under /media/people/. Absent means a monogram tile. */
  portrait: z.string().optional(),
  blurDataURL: z.string().optional(),
  /** True when the source headshot was missing, broken or unusable. */
  needsPortrait: z.boolean().default(false),
  notes: z.string().optional(),
});
export type Person = z.infer<typeof Person>;

export const Transaction = z.object({
  id: z.string(),
  /** One sentence: who was advised, on what, in what role. Sentence case. */
  headline: z.string(),
  /** "Asia to Europe", or a single region where the deal did not cross a border. */
  corridor: z.string(),
  regions: z.array(Region).min(1),
  sectors: z.array(z.string()).min(1),
  /** Adan's role, rendered as tags. */
  roles: z.array(z.string()).min(1),
  pillars: z.array(PillarId).min(1),
  /** Display string exactly as published, e.g. "US$1bn" or "Undisclosed". */
  value: z.string(),
  /** Sort and filter key in US dollars. Null for undisclosed. */
  valueUsd: z.number().nullable(),
  /** Filter band label. */
  band: z.string(),
  year: z.number().int().optional(),
});
export type Transaction = z.infer<typeof Transaction>;

/** A current mandate. Carries a client-supplied disclaimer; see CLIENT-QUESTIONS. */
export const Mandate = z.object({
  ref: z.string(),
  dealType: z.string(),
  amount: z.string(),
  band: z.string(),
  industry: z.string(),
  region: z.string(),
  description: z.string(),
});
export type Mandate = z.infer<typeof Mandate>;

export const Office = z.object({
  slug: z.string(),
  city: z.string(),
  country: z.string(),
  region: Region,
  timeZone: z.string(),
  address: z.array(z.string()).default([]),
  phone: z.string().optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().email().optional(),
  /** Decimal degrees, for the globe. */
  lat: z.number(),
  lng: z.number(),
  /** False where the old site lists a presence rather than a staffed office. */
  isOffice: z.boolean().default(true),
  notes: z.string().optional(),
});
export type Office = z.infer<typeof Office>;

export const Capability = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  /** One or two sentences. No sub-page: this is the whole record. */
  description: z.string(),
  items: z.array(z.string()).default([]),
});

export const Pillar = z.object({
  id: PillarId,
  title: z.string(),
  /** The one-line descriptor used in the mega panel and the expertise index. */
  descriptor: z.string(),
  /** The opening statement on the pillar page. Two or three sentences. */
  statement: z.string(),
  capabilities: z.array(Capability).min(2),
  /** A real sequence, so numbering it is legitimate. */
  howWeWork: z.array(z.object({ title: z.string(), description: z.string() })).min(3),
  /** Slugs of the two to four partners who lead the area. */
  leads: z.array(z.string()).min(1),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  /** Routed enquiry subject for the contact band. */
  enquirySubject: z.string(),
});
export type Pillar = z.infer<typeof Pillar>;

export const Insight = z.object({
  slug: z.string(),
  title: z.string(),
  author: z.string(),
  authorSlug: z.string().optional(),
  date: z.string(),
  summary: z.string(),
  pillars: z.array(PillarId).default([]),
  /** Falls back to a texture tile when absent. */
  image: z.string().optional(),
  texture: z.string().optional(),
  external: z.string().url().optional(),
});
export type Insight = z.infer<typeof Insight>;

/** Parse helper that names the offending file in the error. */
export function validate<T>(schema: z.ZodType<T>, data: unknown, file: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`content/${file} failed validation:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}
