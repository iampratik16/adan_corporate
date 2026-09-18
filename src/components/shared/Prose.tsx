/**
 * Long-form text: legal pages, insight articles, biographies.
 *
 * A single measure, generous leading, and hairline rules for structure. Legal
 * text carries over from the old site verbatim, so this has to make dense,
 * unedited prose readable without touching a word of it.
 *
 * Inline links carry a real text-decoration underline at rest. The site's
 * link-underline device draws its rule with a background gradient, which a
 * link inside a paragraph cannot rely on: it leaves colour as the only cue,
 * fails WCAG 1.4.1, and axe reports it on /legal/legal.
 */
export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`measure text-body leading-body text-stone-700 [&_a]:text-accent-deep [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-[0.18em] [&_a]:transition-colors [&_a]:duration-ui [&_a:hover]:text-ink [&_a:focus-visible]:text-ink [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-display-4 [&_h2]:text-ink [&_h3]:mt-9 [&_h3]:mb-3 [&_h3]:font-display [&_h3]:text-[1.25rem] [&_h3]:text-ink [&_hr]:my-10 [&_hr]:border-stone-200 [&_li]:mb-2 [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-5 [&_strong]:font-medium [&_strong]:text-ink [&_table]:my-8 [&_table]:w-full [&_table]:text-small [&_td]:border-t [&_td]:border-stone-200 [&_td]:py-2.5 [&_td]:pr-4 [&_th]:border-b [&_th]:border-ink [&_th]:py-2.5 [&_th]:pr-4 [&_th]:text-left [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-5 ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
