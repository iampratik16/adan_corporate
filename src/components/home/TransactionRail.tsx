'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Transaction } from '@content/schema';

/**
 * A horizontal rail of typographic tombstones.
 *
 * It never advances on its own. It moves on: drag, wheel, arrow keys, the
 * previous and next buttons, and normal tab order. Scroll snapping does the
 * positioning, so there is no transform animation to keep in sync and the
 * native scrollbar stays honest on touch.
 *
 * The deals are anonymised, so there is nothing to show but type. That is the
 * point: no client logos, no invented imagery.
 */
export function TransactionRail({ transactions }: { transactions: Transaction[] }) {
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setAtStart(rail.scrollLeft < 8);
    setAtEnd(rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    sync();
    rail.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      rail.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const page = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector('li');
    const amount = card ? card.getBoundingClientRect().width + 24 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: amount * direction, behavior: 'smooth' });
  };

  // Drag to scroll, for pointer devices. Touch already does this natively.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let down = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      down = true;
      moved = false;
      startX = event.clientX;
      startScroll = rail.scrollLeft;
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!down) return;
      const delta = event.clientX - startX;
      if (Math.abs(delta) > 4) {
        moved = true;
        rail.style.cursor = 'grabbing';
        rail.style.scrollSnapType = 'none';
        rail.scrollLeft = startScroll - delta;
      }
    };
    const onPointerUp = () => {
      if (!down) return;
      down = false;
      rail.style.cursor = '';
      rail.style.scrollSnapType = '';
      // Swallow the click that ends a drag, so dragging never navigates.
      if (moved) {
        const swallow = (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
        };
        rail.addEventListener('click', swallow, { capture: true, once: true });
        setTimeout(() => rail.removeEventListener('click', swallow, { capture: true }), 60);
      }
    };

    rail.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      rail.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  return (
    <section className="section-y bg-white" aria-labelledby="transactions-heading">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2
              id="transactions-heading"
              data-reveal
              className="font-display text-display-2 leading-[1.06] tracking-[-0.018em]"
            >
              Selected transactions
            </h2>
            <p
              data-reveal
              data-reveal-delay="1"
              className="mt-4 max-w-[52ch] text-body text-stone-700"
            >
              Client names are withheld. Values are as completed.
            </p>
          </div>

          <div className="flex items-center gap-3" data-print-hide>
            <RailButton direction="previous" onClick={() => page(-1)} disabled={atStart} />
            <RailButton direction="next" onClick={() => page(1)} disabled={atEnd} />
          </div>
        </div>
      </div>

      <ul
        ref={railRef}
        // Full-bleed, with the container gutter recreated as scroll padding so
        // the first card lines up with the heading above it.
        className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          paddingInline:
            'max(var(--spacing-gutter), calc((100vw - var(--container-site)) / 2 + var(--spacing-gutter)))',
          scrollPaddingInline:
            'max(var(--spacing-gutter), calc((100vw - var(--container-site)) / 2 + var(--spacing-gutter)))',
        }}
        tabIndex={0}
        aria-label="Selected transactions, scrollable"
      >
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="w-[min(86vw,380px)] shrink-0 snap-start border-t border-ink"
          >
            <Link href="/transactions" className="group flex h-full flex-col pt-5 pb-2">
              <span className="tabular text-micro text-stone-500">{transaction.corridor}</span>
              <span className="figure-value mt-4 block font-display text-display-3 leading-[1] tracking-[-0.025em]">
                {transaction.value}
              </span>
              <span className="mt-4 block grow text-body text-stone-700 transition-colors group-hover:text-ink">
                {transaction.headline}
              </span>
              <span className="mt-6 flex flex-wrap gap-x-2 gap-y-1.5">
                {transaction.roles.slice(0, 3).map((role) => (
                  <span
                    key={role}
                    className="border border-stone-200 px-2.5 py-1 text-micro text-stone-500"
                  >
                    {role}
                  </span>
                ))}
              </span>
            </Link>
          </li>
        ))}

        <li className="flex w-[min(60vw,260px)] shrink-0 snap-start items-center">
          <Link href="/transactions" className="link-underline text-body">
            All transactions
          </Link>
        </li>
      </ul>
    </section>
  );
}

function RailButton({
  direction,
  onClick,
  disabled,
}: {
  direction: 'previous' | 'next';
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex size-12 items-center justify-center border border-stone-300 transition-colors duration-ui hover:border-ink disabled:pointer-events-none disabled:opacity-30"
    >
      <span className="sr-only">
        {direction === 'next' ? 'Next transactions' : 'Previous transactions'}
      </span>
      <svg
        width="15"
        height="10"
        viewBox="0 0 15 10"
        aria-hidden="true"
        style={{ transform: direction === 'previous' ? 'rotate(180deg)' : undefined }}
      >
        <path d="M0 5h13M9.5 1L14 5l-4.5 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </button>
  );
}
