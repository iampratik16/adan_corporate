'use client';

import { useEffect, useState } from 'react';

/**
 * The sticky in-page index beside the capability groups on a pillar page.
 *
 * Desktop only. On a phone the accordion is already the index, and a second
 * list of the same five names would be two navigations for one set of content.
 *
 * Highlighting follows an IntersectionObserver rather than a scroll handler:
 * the browser does the work off the main thread and there is nothing to
 * throttle. Only the id and the label cross the client boundary.
 */
export function PillarIndex({
  sections,
  label,
}: {
  sections: { id: string; label: string }[];
  label: string;
}) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? '');
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const sync = () => setWide(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  const keys = sections.map((section) => section.id).join(',');

  useEffect(() => {
    // The capability groups swap DOM trees at this breakpoint, so the targets
    // only exist once the wide tree is mounted.
    if (!wide) return;
    const ids = keys.split(',').filter(Boolean);
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) seen.add(entry.target.id);
          else seen.delete(entry.target.id);
        }
        // The topmost group still in the reading band wins, so the mark never
        // jumps back up the list while the reader moves down it.
        const current = ids.find((id) => seen.has(id));
        if (current) setActive(current);
      },
      { rootMargin: '-18% 0px -60% 0px', threshold: 0 },
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, [keys, wide]);

  return (
    <nav aria-label={label} className="hidden lg:block">
      <ul>
        {sections.map((section) => {
          const current = section.id === active;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={current ? 'true' : undefined}
                className="flex min-h-[44px] items-center gap-3 py-1 text-small transition-colors duration-ui"
                style={{ color: current ? 'var(--color-ink)' : 'var(--color-stone-500)' }}
              >
                <span
                  aria-hidden="true"
                  className="h-px shrink-0 transition-all duration-ui-slow ease-out-quart"
                  style={{
                    width: current ? 24 : 10,
                    backgroundColor: current ? 'var(--color-accent)' : 'var(--color-stone-300)',
                  }}
                />
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
