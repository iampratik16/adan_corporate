'use client';

import { useEffect, useRef, useState } from 'react';
import { LocalTime } from '@/components/ui/LocalTime';

export interface GlobeCity {
  slug: string;
  city: string;
  country: string;
  timeZone: string;
  lat: number;
  lng: number;
  isOffice: boolean;
}

/**
 * The network globe.
 *
 * The accessible list is the content; the globe is the enhancement. Focusing or
 * hovering a city rotates the globe to it, so keyboard and pointer reach the
 * same behaviour and the list works perfectly with the canvas absent, failed or
 * switched off.
 *
 * cobe is about 8 kB and draws to a 2D canvas rather than standing up a WebGL
 * scene. It is imported only once the section is near the viewport, so it never
 * appears in the homepage's first load.
 */
export function NetworkGlobe({ cities }: { cities: GlobeCity[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const focus = useRef<{ lat: number; lng: number } | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let globe: { destroy: () => void } | null = null;
    let cancelled = false;

    const boot = async () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const { default: createGlobe } = await import('cobe');
      if (cancelled) return;

      let phi = 4.2; // opens on Europe and the Middle East, where most offices are
      let theta = 0.28;
      let width = canvas.offsetWidth;

      const onResize = () => {
        width = canvas.offsetWidth;
      };
      window.addEventListener('resize', onResize);

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: width * 2,
        height: width * 2,
        phi,
        theta,
        dark: 1,
        diffuse: 1.1,
        mapSamples: 15000,
        mapBrightness: 5.2,
        baseColor: [0.16, 0.22, 0.32],
        markerColor: [0.91, 0.33, 0.29],
        glowColor: [0.07, 0.13, 0.22],
        markers: cities.map((c) => ({
          location: [c.lat, c.lng] as [number, number],
          size: c.isOffice ? 0.055 : 0.03,
        })),
        onRender: (state: Record<string, unknown>) => {
          const target = focus.current;
          if (target) {
            // Rotate the short way round to the focused city.
            const targetPhi = -(target.lng * Math.PI) / 180 + Math.PI;
            const twoPi = Math.PI * 2;
            const forward = (targetPhi - phi + twoPi) % twoPi;
            const backward = (phi - targetPhi + twoPi) % twoPi;
            phi += forward < backward ? forward * 0.09 : -backward * 0.09;
            theta += ((target.lat * Math.PI) / 180 - theta) * 0.09;
          } else if (!reduced) {
            phi += 0.0022; // ambient drift
          }
          state.phi = phi;
          state.theta = theta;
          state.width = width * 2;
          state.height = width * 2;
        },
      });

      setLive(true);
      return () => window.removeEventListener('resize', onResize);
    };

    // Only load cobe when the section is close to view.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          observer.disconnect();
          void boot();
        }
      },
      { rootMargin: '300px' },
    );
    observer.observe(canvas);

    return () => {
      cancelled = true;
      observer.disconnect();
      globe?.destroy();
    };
  }, [cities]);

  const look = (city: GlobeCity | null) => {
    focus.current = city ? { lat: city.lat, lng: city.lng } : null;
    setActive(city?.slug ?? null);
  };

  const offices = cities.filter((c) => c.isOffice);
  const partnerCities = cities.filter((c) => !c.isOffice);

  return (
    <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
      {/* --- The globe. Decorative: everything it shows is in the list. --- */}
      <div className="order-2 lg:order-1 lg:col-span-5">
        <div
          className="relative mx-auto aspect-square w-full max-w-[460px]"
          aria-hidden="true"
          data-print-hide
        >
          <canvas
            ref={canvasRef}
            className="size-full transition-opacity duration-[900ms] ease-out-quart"
            style={{ opacity: live ? 1 : 0, contain: 'layout paint size' }}
          />
          {!live && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-[72%] rounded-full border border-white/10" />
            </div>
          )}
        </div>
      </div>

      {/* --- The list, which drives it. --- */}
      <div className="order-1 lg:order-2 lg:col-span-7">
        <h3 className="font-sans text-micro font-medium tracking-[0.06em] text-stone-300 uppercase">
          Offices
        </h3>
        <ul
          className="mt-5 grid grid-cols-1 gap-x-10 sm:grid-cols-2"
          onMouseLeave={() => look(null)}
        >
          {offices.map((city) => (
            <li key={city.slug}>
              <a
                href={`/contact#${city.slug}`}
                onMouseEnter={() => look(city)}
                onFocus={() => look(city)}
                onBlur={() => look(null)}
                className="flex items-baseline justify-between gap-4 border-b border-white/12 py-3 transition-colors"
                style={{ color: active === city.slug ? 'var(--color-accent-bright)' : undefined }}
              >
                <span className="text-body">{city.city}</span>
                <LocalTime
                  timeZone={city.timeZone}
                  showDot={false}
                  className="shrink-0 text-micro text-stone-300"
                />
              </a>
            </li>
          ))}
        </ul>

        {partnerCities.length > 0 && (
          <>
            <h3 className="mt-10 font-sans text-micro font-medium tracking-[0.06em] text-stone-300 uppercase">
              Partners also based in
            </h3>
            <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
              {partnerCities.map((city) => (
                <li key={city.slug}>
                  <button
                    type="button"
                    onMouseEnter={() => look(city)}
                    onFocus={() => look(city)}
                    onBlur={() => look(null)}
                    onClick={() => look(city)}
                    className="border border-white/20 px-2.5 py-1 text-micro text-stone-300 transition-colors hover:border-white/50 hover:text-white"
                  >
                    {city.city}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
