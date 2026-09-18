'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/ui/Logo';

/**
 * Radix Dialog and Accordion are about 20 kB together and are needed only once
 * somebody opens the mobile menu. Loading them on demand keeps them out of the
 * first-load budget on every route. See docs/DECISIONS.md.
 */
const MobileSheet = dynamic(() => import('./MobileSheet').then((m) => m.MobileSheet), {
  ssr: false,
});

export interface NavLink {
  label: string;
  href: string;
}
export interface NavPillar {
  id: string;
  title: string;
  descriptor: string;
  href: string;
  capabilities: Array<{ id: string; title: string }>;
}
export interface FeaturedCard {
  kicker: string;
  title: string;
  meta: string;
  href: string;
}

interface Props {
  utility: NavLink[];
  primary: NavLink[];
  pillars: NavPillar[];
  featured: FeaturedCard;
}

/**
 * Two tiers on desktop, a sheet on mobile.
 *
 * The header is transparent over the hero and solid once scrolled; it hides on
 * scroll down and returns on scroll up, so a reader moving down the page gets
 * the full viewport and a reader moving back up gets the navigation without
 * reaching for it.
 *
 * The mark cannot be reversed onto dark, so it sits in a paper masthead plate
 * that merges into the bar once the bar itself turns paper. That constraint is
 * the reason for the composition, and it reads as a masthead rather than a
 * patch.
 */
export function HeaderShell({ utility, primary, pillars, featured }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Set on the first hover or focus of the menu button, which starts the chunk
  // downloading before the tap lands.
  const [sheetPrimed, setSheetPrimed] = useState(false);
  const [panelValue, setPanelValue] = useState('');
  const lastY = useRef(0);
  const panelTriggerRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        // Only hide well below the fold, and never while a panel is open.
        if (y > 220 && y > lastY.current + 4) setHidden(true);
        else if (y < lastY.current - 4 || y <= 220) setHidden(false);
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // A route change closes everything and restores the bar. Adjusted during
  // render rather than in an effect: an effect would paint one frame with the
  // old panel still open, and React flags the cascading render it causes.
  // https://react.dev/learn/you-might-not-need-an-effect
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setPanelValue('');
    setHidden(false);
  }

  const open = panelValue !== '';

  /**
   * The behaviours a navigation-menu library would have provided, for one
   * dropdown next to four plain links. Escape closes and returns focus to the
   * trigger; a click or a focus move outside the header closes it. This is the
   * disclosure pattern, which is what a single expandable section actually is.
   */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setPanelValue('');
      panelTriggerRef.current?.focus();
    };
    const onOutside = (event: Event) => {
      const target = event.target as Node | null;
      if (target && !headerRef.current?.contains(target)) setPanelValue('');
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onOutside);
    document.addEventListener('focusin', onOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onOutside);
      document.removeEventListener('focusin', onOutside);
    };
  }, [open]);
  const solid = scrolled || open || pathname !== '/';

  return (
    <header
      ref={headerRef}
      data-site-header
      data-solid={solid ? '' : undefined}
      className="fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-ui-slow ease-out-quart"
      style={{
        transform: hidden && !open ? 'translateY(-100%)' : 'translateY(0)',
        backgroundColor: solid ? 'var(--color-paper)' : 'transparent',
        borderBottom: `1px solid ${solid ? 'var(--color-stone-200)' : 'transparent'}`,
      }}
    >
      {/* Scrim: only while the bar is transparent, so the nav stays legible over film. */}
      {!solid && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[210%]"
          style={{
            // Measured, not eyeballed: the nav sits over the brightest part of
            // the glazing, so the scrim has to carry 15px text at 4.5:1.
            // See scripts/check-media-contrast.ts.
            background:
              'linear-gradient(to bottom, ' +
              'color-mix(in srgb, var(--color-ink) 88%, transparent) 0%, ' +
              'color-mix(in srgb, var(--color-ink) 70%, transparent) 38%, ' +
              'color-mix(in srgb, var(--color-ink) 28%, transparent) 74%, transparent 100%)',
          }}
        />
      )}

      <div className="container-site relative">
        <div className="flex items-stretch gap-6">
          {/* --- Masthead plate. Paper always, because the mark needs it. --- */}
          <Link
            href="/"
            aria-label="Adan Corporate, home"
            className="group my-3 flex shrink-0 items-center self-center transition-[background-color,padding] duration-ui"
            style={{
              backgroundColor: solid ? 'transparent' : 'var(--color-paper)',
              paddingInline: solid ? 0 : 'clamp(12px, 1.4vw, 20px)',
              marginInline: solid ? 0 : 'calc(-1 * clamp(12px, 1.4vw, 20px))',
            }}
          >
            <Logo height={24} className="transition-opacity group-hover:opacity-80" />
          </Link>

          <div className="flex min-w-0 flex-1 flex-col justify-center">
            {/* --- Utility row. Desktop only. --- */}
            <div
              className="hidden items-center justify-end gap-7 pt-2.5 pb-1.5 lg:flex"
              style={{ color: solid ? 'var(--color-stone-500)' : 'rgba(255,255,255,0.72)' }}
            >
              {utility.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="link-underline text-micro transition-colors hover:text-ink data-[on-film]:hover:text-white"
                  {...(!solid ? { 'data-on-film': '' } : {})}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* --- Primary row. --- */}
            <div className="flex items-center justify-end gap-8 pb-3 lg:pb-3.5">
              <nav aria-label="Primary" className="hidden lg:block">
                <ul className="flex items-center gap-8">
                  <li>
                    <button
                      ref={panelTriggerRef}
                      type="button"
                      aria-expanded={open}
                      aria-controls="expertise-panel"
                      onClick={() => setPanelValue(open ? '' : 'expertise')}
                      onPointerEnter={() => setPanelValue('expertise')}
                      className="link-underline flex cursor-pointer items-center gap-1.5 bg-transparent py-1 text-small transition-colors"
                      style={{ color: solid ? 'var(--color-ink)' : 'var(--color-white)' }}
                    >
                      Expertise
                      <svg
                        width="9"
                        height="6"
                        viewBox="0 0 9 6"
                        aria-hidden="true"
                        className="transition-transform duration-ui"
                        style={{ transform: open ? 'rotate(180deg)' : undefined }}
                      >
                        <path
                          d="M1 1l3.5 3.5L8 1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        />
                      </svg>
                    </button>
                  </li>

                  {primary
                    .filter((l) => l.href !== '/expertise')
                    .map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={pathname.startsWith(link.href) ? 'page' : undefined}
                          className="link-underline relative py-1 text-small transition-colors"
                          style={{ color: solid ? 'var(--color-ink)' : 'var(--color-white)' }}
                        >
                          {link.label}
                          {pathname.startsWith(link.href) && (
                            <span
                              aria-hidden="true"
                              className="absolute inset-x-0 -bottom-1 h-px bg-accent"
                              style={{
                                backgroundColor: solid
                                  ? 'var(--color-accent)'
                                  : 'var(--color-accent-bright)',
                              }}
                            />
                          )}
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>

              <Link
                href="/contact"
                className="btn hidden shrink-0 lg:inline-flex"
                style={
                  solid
                    ? undefined
                    : {
                        ['--btn-bg' as string]: 'transparent',
                        ['--btn-fg' as string]: 'var(--color-white)',
                        ['--btn-sweep' as string]: 'var(--color-accent)',
                        borderColor: 'rgba(255,255,255,0.45)',
                        minHeight: 42,
                      }
                }
              >
                Speak to a partner
              </Link>

              <MobileTrigger
                open={menuOpen}
                onOpenChange={setMenuOpen}
                onPrime={() => setSheetPrimed(true)}
                solid={solid}
              />
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div
          id="expertise-panel"
          className="absolute inset-x-0 top-full hidden lg:block"
          onPointerLeave={() => setPanelValue('')}
        >
          <MegaPanel pillars={pillars} featured={featured} />
        </div>
      )}

      {(sheetPrimed || menuOpen) && (
        <MobileSheet
          open={menuOpen}
          onOpenChange={setMenuOpen}
          utility={utility}
          primary={primary}
          pillars={pillars}
        />
      )}
    </header>
  );
}

/* ------------------------------------------------------------- mega panel -- */

function MegaPanel({ pillars, featured }: { pillars: NavPillar[]; featured: FeaturedCard }) {
  return (
    <div
      className="relative left-1/2 w-[100vw] -translate-x-1/2 border-t border-stone-200 bg-paper"
      style={{
        boxShadow: '0 24px 40px -32px color-mix(in srgb, var(--color-ink) 28%, transparent)',
      }}
    >
      <div className="container-site grid grid-cols-1 gap-10 py-10 lg:grid-cols-[1fr_auto_300px] lg:gap-12">
        <div className="grid grid-cols-2 gap-x-10 gap-y-8 xl:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.id}>
              <Link href={pillar.href} className="group block">
                <span className="link-underline font-display text-display-4 leading-[1.1]">
                  {pillar.title}
                </span>
                <span className="mt-1.5 block text-micro text-stone-500">{pillar.descriptor}</span>
              </Link>
              <ul className="mt-4 space-y-1.5">
                {pillar.capabilities.slice(0, 6).map((cap) => (
                  <li key={cap.id}>
                    <Link
                      href={`${pillar.href}#${cap.id}`}
                      className="link-underline text-small text-stone-700 hover:text-ink"
                    >
                      {cap.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div aria-hidden="true" className="hidden w-px bg-stone-200 lg:block" />
        <Link href={featured.href} className="group block self-start">
          <span className="block text-micro tracking-[0.04em] text-accent">{featured.kicker}</span>
          <span className="mt-3 block font-display text-display-4 leading-[1.15]">
            <span className="link-underline">{featured.title}</span>
          </span>
          <span className="tabular mt-3 block text-micro text-stone-500">{featured.meta}</span>
        </Link>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- mobile sheet -- */

function MobileTrigger({
  open,
  onOpenChange,
  onPrime,
  solid,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onPrime: () => void;
  solid: boolean;
}) {
  return (
    <button
      type="button"
      onPointerEnter={onPrime}
      onFocus={onPrime}
      onTouchStart={onPrime}
      onClick={() => {
        onPrime();
        onOpenChange(!open);
      }}
      aria-expanded={open}
      aria-controls="mobile-nav"
      className="-mr-2 flex size-12 items-center justify-center lg:hidden"
      style={{ color: solid ? 'var(--color-ink)' : 'var(--color-white)' }}
    >
      <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
      <svg width="22" height="12" viewBox="0 0 22 12" aria-hidden="true">
        <path d="M0 1h22M0 11h22" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </button>
  );
}
