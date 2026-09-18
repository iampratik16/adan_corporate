'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/ui/Logo';

export interface NavLink {
  label: string;
  href: string;
}

interface Props {
  primary: NavLink[];
  secondary: NavLink[];
  pillars: Array<{ id: string; title: string; descriptor: string; href: string }>;
}

/**
 * One row, on glass, with four links spread across it.
 *
 * The bar is a light frosted surface rather than the dark one the reference
 * uses, and the mark decides that: the roundel is navy below and red above, and
 * on a dark bar the navy half disappears into the ink, leaving a broken red arc
 * and a floating white disc. On light glass the whole mark reads. The reference
 * can afford a dark bar because its mark is pure white. That has not changed.
 * What changed is how much light gets through it.
 *
 * The glass was 82% opaque, which is not glass, it is a pale plate with a blur
 * behind it. It was 82% because of the second row: those links were stone-700
 * at 13px, and stone-700 over the hero film stops clearing 4.5:1 the moment the
 * surface drops below 73% opacity. Cutting the bar to four links took the
 * lightest text in the header out with it, and every remaining item is ink, so
 * the floor moved from 73% to 51%. The rest state is now 52%, which is the
 * brief's "transparent over the hero" and is genuinely see-through.
 *
 * Scrolled, it goes to 94%, which is the brief's "solid once scrolled" and is
 * not a compromise between the two states. It was tried at 88% and the scrolled
 * bar passes over the hero headline on the way out of the section: 12% of a
 * 104px serif showing through a 20px blur reads as a rendering artefact, not as
 * glass. The transparency is for the hero. Past it, legibility is the only
 * consideration and there is nothing behind the bar worth seeing.
 *
 * There is no mega panel. Expertise is a plain link to the overview, which is
 * where the five pillars already live with their descriptors and capabilities.
 */
const MobileSheet = dynamic(() => import('./MobileSheet').then((m) => m.MobileSheet), {
  ssr: false,
});

export function HeaderShell({ primary, secondary, pillars }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sheetPrimed, setSheetPrimed] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        if (y > 220 && y > lastY.current + 4) setHidden(true);
        else if (y < lastY.current - 4 || y <= 220) setHidden(false);
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reset on navigation during render, not in an effect: an effect would paint
  // one frame with the sheet still open.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setHidden(false);
  }

  const isCurrent = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header
      data-site-header
      className="fixed inset-x-0 top-0 z-50 px-[clamp(12px,2vw,28px)] pt-[clamp(10px,1.4vw,18px)] transition-transform duration-ui-slow ease-out-quart"
      style={{
        transform:
          hidden && !menuOpen
            ? 'translateY(calc(-100% - clamp(10px, 1.4vw, 18px)))'
            : 'translateY(0)',
      }}
    >
      {/*
        A floating pill, not a full-bleed bar.
        
        The <header> is now only the fixed positioning and the gutter it floats
        in; the surface, the glass and the rounding all belong to the div below.
        That split matters for the hide-on-scroll: the bar has to travel its own
        height PLUS the top gutter to clear the viewport, which is why the
        transform carries the same clamp as the padding rather than -100%.

        Rounding a bar that spans the full width does nothing, so the corners
        only read because there is a gutter around them. The shadow is what
        makes it sit above the film rather than on it, and it is deliberately
        soft and offset downward: a ring of shadow all round would read as a
        card, and this is a bar.
      */}
      <div
        className="rounded-full border transition-[background-color,border-color,box-shadow] duration-ui-slow ease-out-quart"
        style={{
          // The blur is doing the work now, not the opacity. At 52% the surface
          // alone would leave the film legible enough to fight the nav, so the
          // blur goes up with the transparency: 28px flattens the film behind the
          // bar into fields of colour while the bar still visibly moves with it.
          // Saturation is pulled back from 1.6 to 1.25 because the film's warm
          // floor bands bloom through a thinner surface.
          backgroundColor: scrolled ? 'rgba(246, 247, 248, 0.94)' : 'rgba(246, 247, 248, 0.52)',
          backdropFilter: `blur(${scrolled ? 20 : 28}px) saturate(${scrolled ? 1.4 : 1.25})`,
          WebkitBackdropFilter: `blur(${scrolled ? 20 : 28}px) saturate(${scrolled ? 1.4 : 1.25})`,
          borderColor: scrolled ? 'var(--color-stone-200)' : 'rgba(255, 255, 255, 0.28)',
          boxShadow: scrolled
            ? '0 1px 2px rgba(11, 29, 51, 0.06), 0 8px 24px -12px rgba(11, 29, 51, 0.18)'
            : '0 8px 30px -18px rgba(11, 29, 51, 0.35)',
        }}
      >
        <div className="px-[clamp(16px,2.2vw,34px)]">
          <div className="flex h-[60px] items-center gap-6 lg:h-[68px]">
            <Link href="/" aria-label="Adan Corporate, home" className="group shrink-0">
              <Logo size={36} className="transition-opacity group-hover:opacity-75" />
            </Link>

            {/*
            Four links, spread. The bar used to cluster everything hard left and
            push a second row hard right, which left a corridor of empty glass
            down the middle of a 1440px container. `flex-1` on the nav and
            `justify-evenly` on the list hand that corridor back to the links,
            so each one sits in its own share of the width instead of queueing.
          */}
            <nav aria-label="Primary" className="hidden flex-1 lg:block">
              <ul className="flex items-center justify-evenly">
                {primary.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isCurrent(link.href) ? 'page' : undefined}
                      className="relative block py-2 text-micro font-medium tracking-[0.09em] text-ink uppercase transition-opacity hover:opacity-65"
                    >
                      {link.label}
                      {isCurrent(link.href) && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 -bottom-0.5 h-px bg-accent"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="ml-auto flex items-center gap-5 lg:ml-0">
              <Link
                href="/contact"
                className="hidden shrink-0 text-micro font-medium tracking-[0.07em] text-ink uppercase lg:block"
              >
                <span className="link-underline">Speak to a partner</span>
              </Link>

              <button
                type="button"
                onPointerEnter={() => setSheetPrimed(true)}
                onFocus={() => setSheetPrimed(true)}
                onTouchStart={() => setSheetPrimed(true)}
                onClick={() => {
                  setSheetPrimed(true);
                  setMenuOpen(!menuOpen);
                }}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                className="-mr-2 flex size-12 items-center justify-center text-ink lg:hidden"
              >
                <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
                <svg width="22" height="12" viewBox="0 0 22 12" aria-hidden="true">
                  <path d="M0 1h22M0 11h22" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {(sheetPrimed || menuOpen) && (
        <MobileSheet
          open={menuOpen}
          onOpenChange={setMenuOpen}
          primary={primary}
          secondary={secondary}
          pillars={pillars}
        />
      )}
    </header>
  );
}
