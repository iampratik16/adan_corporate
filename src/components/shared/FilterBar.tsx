'use client';

/**
 * The shared filter control for Transactions and People.
 *
 * Plain buttons in a labelled group rather than a select: the option counts are
 * small, and a reader can see every choice and how many records sit behind it
 * without opening anything. Filtering happens in the client against data
 * already on the page, so there is no request and no loading state.
 */
export function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Array<{ value: string; label: string; count?: number }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2.5 text-micro font-medium tracking-[0.06em] text-stone-500 uppercase">
        {label}
      </legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={active}
              className="border px-3 py-1.5 text-micro transition-colors duration-ui"
              style={{
                borderColor: active ? 'var(--color-ink)' : 'var(--color-stone-200)',
                backgroundColor: active ? 'var(--color-ink)' : 'transparent',
                color: active ? 'var(--color-paper)' : 'var(--color-stone-700)',
              }}
            >
              {option.label}
              {option.count !== undefined && (
                // An explicit colour per state, never opacity: opacity-60 over
                // stone-700 composites to #888F99, which measures 3.04:1 and
                // fails AA. A token that passes the audit stops passing the
                // moment something multiplies it.
                <span
                  className="tabular ml-1.5"
                  style={{ color: active ? 'var(--color-stone-300)' : 'var(--color-stone-500)' }}
                >
                  {option.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/** The live result count, announced to assistive technology when it changes. */
export function ResultCount({ count, noun }: { count: number; noun: string }) {
  return (
    <p aria-live="polite" className="tabular text-small text-stone-500">
      {count} {count === 1 ? noun : `${noun}s`}
    </p>
  );
}
