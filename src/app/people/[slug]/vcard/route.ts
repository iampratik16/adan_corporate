import { people } from '@content/people';
import { site } from '@content/site';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return people.map((person) => ({ slug: person.slug }));
}

/** RFC 6350 escaping: backslash, comma, semicolon and newline. */
function esc(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/([,;])/g, '\\$1');
}

/**
 * The contact card behind "Save contact card" on a profile.
 *
 * Firm addresses only, which is the same rule the profile page follows. No
 * telephone number: the source publishes none for an individual.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = people.find((entry) => entry.slug === slug);
  if (!person) return new Response('Not found', { status: 404 });

  const words = person.name.split(/\s+/);
  const family = words.length > 1 ? words[words.length - 1]! : '';
  const given = words.slice(0, Math.max(words.length - 1, 1)).join(' ');
  const title = person.roleDetail ? `${person.role}, ${person.roleDetail}` : person.role;

  const card = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${esc(person.name)}`,
    `N:${esc(family)};${esc(given)};;;`,
    `ORG:${esc(site.name)}`,
    `TITLE:${esc(title)}`,
    `EMAIL;TYPE=INTERNET,WORK:${esc(person.email)}`,
    `ADR;TYPE=WORK:;;;${esc(person.city)};;;${esc(person.country)}`,
    `URL:${site.url}/people/${person.slug}`,
    ...(person.linkedin ? [`X-SOCIALPROFILE;TYPE=linkedin:${esc(person.linkedin)}`] : []),
    `NOTE:${esc(`${person.city} local time zone: ${person.timeZone}`)}`,
    'END:VCARD',
    '',
  ].join('\r\n');

  return new Response(card, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `attachment; filename="${person.slug}.vcf"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
