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
  utility: NavLink[];
  primary: NavLink[];
  pillars: Array<{ id: string; title: string; descriptor: string; href: string }>;
}

/**
 * One row, on glass.
 *
 * The bar is a light frosted surface rather than the dark one the reference
 * uses, and the mark decides that: the roundel is navy below and red above, and
 * on a dark bar the navy half disappears into the ink, leaving a broken red arc
 * and a floating white disc. On light glass the whole mark reads. The reference
 * can afford a dark bar because its mark is pure white.
 *
 * There is no mega panel. Expertise is a plain link to the overview, which is
 * where the five pillars already live with their descriptors and capabilities.
 */
const MobileSheet = dynamic(() => import('./MobileSheet').then((m) => m.MobileSheet), {
  ssr: false,
});

export function HeaderShell({ utility, primary, pillars }: Props) {
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
      className="fixed inset-x-0 top-0 z-50 border-b transition-[transform,background-color,border-color] duration-ui-slow ease-out-quart"
      style={{
        transform: hidden && !menuOpen ? 'translateY(-100%)' : 'translateY(0)',
        // Frosted glass. The blur is what makes it read as a surface rather
        // than a wash, so the fallback below matters where it is unsupported.
        backgroundColor: scrolled ? 'rgba(246, 247, 248, 0.92)' : 'rgba(246, 247, 248, 0.82)',
        backdropFilter: 'blur(18px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(18px) saturate(1.6)',
        borderBottomColor: scrolled ? 'var(--color-stone-200)' : 'rgba(11, 29, 51, 0.08)',
      }}
    >
      <div className="container-site">
        <div className="flex h-[68px] items-center gap-8 lg:h-[76px]">
          <Link href="/" aria-label="Adan Corporate, home" className="group shrink-0">
            <Logo size={36} className="transition-opacity group-hover:opacity-75" />
          </Link>

          {/* --- Primary --- */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7">
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

          {/* --- Utility, pushed right --- */}
          <nav aria-label="Secondary" className="ml-auto hidden xl:block">
            <ul className="flex items-center gap-6">
              {utility.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isCurrent(link.href) ? 'page' : undefined}
                    className="block py-2 text-micro tracking-[0.07em] text-stone-700 uppercase transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-5 xl:ml-0">
            <span aria-hidden="true" className="hidden h-5 w-px bg-stone-300 xl:block" />
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
