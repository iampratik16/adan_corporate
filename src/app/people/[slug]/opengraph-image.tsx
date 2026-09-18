import { people } from '@content/people';
import { site } from '@content/site';
import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og';

export const alt = `A partner profile at ${site.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return people.map((person) => ({ slug: person.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = people.find((entry) => entry.slug === slug);
  if (!person) return ogImage({ title: site.tagline });

  const role = person.roleDetail ? `${person.role}, ${person.roleDetail}` : person.role;
  return ogImage({ title: person.name, meta: `${role} · ${person.city}` });
}
