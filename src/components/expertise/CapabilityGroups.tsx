/** Only the four fields this component renders. */
export interface CapabilityGroup {
  id: string;
  title: string;
  description: string;
  items: string[];
}

/**
 * The capability groups on a pillar page.
 *
 * Two-column list on desktop: the name on the left, the record on the right.
 * There is no sub-page behind any of these, so the description plus the items
 * is the whole record, and hiding half of it behind a link would misrepresent
 * how much there is. On a phone the same groups collapse, because five groups
 * of six items each is a very long column.
 *
 * A server component with no JavaScript at all. The two layouts are both in the
 * DOM and swapped by CSS, and the anchor `id` sits on the wrapper that is
 * always present, so /expertise/x#equity lands correctly at every width. The
 * mega panel and the redirect map both rely on that.
 *
 * The narrow layout is a native <details>, not a scripted accordion: it is
 * keyboard operable and announced correctly for free, it animates through
 * ::details-content where the browser supports it, and it still opens with
 * scripting disabled. A Radix accordion costs about 8 kB to be worse at the
 * last of those.
 */
export function CapabilityGroups({ groups }: { groups: CapabilityGroup[] }) {
  return (
    <div className="mt-10 lg:mt-12">
      {groups.map((group) => (
        <div key={group.id} id={group.id}>
          {/* --- Wide --- */}
          <div className="hidden gap-x-12 gap-y-5 border-t border-stone-200 py-9 lg:grid lg:grid-cols-12 [&:last-of-type]:border-b">
            <h3 className="font-display text-display-4 leading-[1.15] tracking-[-0.015em] lg:col-span-5">
              {group.title}
            </h3>
            <div className="lg:col-span-7">
              <p className="measure text-body text-stone-700">{group.description}</p>
              {group.items.length > 0 && (
                <ul className="mt-6">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border-t border-stone-200 py-2.5 text-small text-stone-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* --- Narrow --- */}
          <details className="disclosure lg:hidden">
            <summary>
              <h3 className="text-display-4 leading-[1.15] tracking-[-0.015em]">{group.title}</h3>
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                aria-hidden="true"
                className="disclosure-mark"
              >
                <path d="M6.5 0v13M0 6.5h13" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </summary>
            <div className="pb-7">
              <p className="text-body text-stone-700">{group.description}</p>
              {group.items.length > 0 && (
                <ul className="mt-5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border-t border-stone-200 py-2.5 text-small text-stone-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}
