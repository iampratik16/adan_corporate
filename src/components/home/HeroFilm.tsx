'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface FilmSources {
  /** Tier 2: the 8-second seamless loop. What most visitors ever see. */
  loop: string[];
  /** Tier 3: the full 60 seconds. Desktop, wide, unmetered, motion allowed. */
  full: string[];
  /** The 9:16 loop, for a phone held upright. */
  portrait: string[];
}

const PAUSE_KEY = 'adan:hero-film-paused';
/** Give up on the full film after this and keep looping. */
const FULL_FILM_TIMEOUT = 15_000;
/** Cross-fade length when the full film takes over from the loop. */
const SWAP_MS = 400;

/**
 * The hero film, delivered in three tiers. See docs/HERO-FILM.md section 7.
 *
 *   1. the poster, rendered by the server as a plain <img>. The LCP element.
 *   2. an 8-second loop, requested once the poster has painted.
 *   3. the full 60 seconds, fetched in the background and swapped in at a loop
 *      boundary, but only on a desktop-shaped, unmetered, motion-allowing client.
 *
 * The swap happens at the end of a loop cycle rather than mid-play, so the cut
 * lands where the film already returns to its first frame and the cross-fade has
 * nothing to hide. If the film has not arrived within fifteen seconds it is
 * abandoned and the loop simply continues, which nobody notices.
 *
 * The pause control is always present, keyboard reachable, and its state
 * survives navigation in sessionStorage: a reader who turns the film off should
 * not have to turn it off again on every page they come back to.
 */
export function HeroFilm({ sources }: { sources: FilmSources }) {
  const loopRef = useRef<HTMLVideoElement>(null);
  const fullRef = useRef<HTMLVideoElement>(null);

  const [mounted, setMounted] = useState(false);
  const [portrait, setPortrait] = useState(false);
  const [loopReady, setLoopReady] = useState(false);
  const [wantFull, setWantFull] = useState(false);
  const [fullReady, setFullReady] = useState(false);
  const [showingFull, setShowingFull] = useState(false);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);

  /* --- Decide what, if anything, to load. ----------------------------------- */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    const saveData = connection?.saveData === true;
    const slow =
      connection?.effectiveType !== undefined && /(^|-)[23]g$/.test(connection.effectiveType);

    // Reduced motion or a metered connection means the poster is the hero.
    if (reduced || saveData || slow) return;

    const start = () => {
      const isPortrait =
        window.matchMedia('(orientation: portrait) and (max-width: 820px)').matches &&
        sources.portrait.length > 0;
      setPortrait(isPortrait);

      // The full film is a desktop luxury: fine pointer, real width, and a
      // connection that is either good or unmeasurable.
      const roomy =
        window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
        window.innerWidth >= 1024 &&
        !isPortrait &&
        (connection?.effectiveType === undefined || connection.effectiveType === '4g') &&
        sources.full.length > 0;
      setWantFull(roomy);

      try {
        setPaused(window.sessionStorage.getItem(PAUSE_KEY) === '1');
      } catch {
        // Private mode. Default to playing.
      }
      setMounted(true);
    };

    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(handle);
    }
    const handle = window.setTimeout(start, 900);
    return () => clearTimeout(handle);
  }, [sources.full.length, sources.portrait.length]);

  /* --- Abandon the full film if it does not turn up. ------------------------ */
  useEffect(() => {
    if (!wantFull || fullReady) return;
    const handle = window.setTimeout(() => setWantFull(false), FULL_FILM_TIMEOUT);
    return () => clearTimeout(handle);
  }, [wantFull, fullReady]);

  /* --- Swap at a loop boundary, never mid-play. ----------------------------- */
  useEffect(() => {
    const loop = loopRef.current;
    const full = fullRef.current;
    if (!loop || !full || !fullReady || showingFull) return;

    const onTime = () => {
      if (!loop.duration || loop.duration - loop.currentTime > SWAP_MS / 1000 + 0.1) return;
      loop.removeEventListener('timeupdate', onTime);
      void full.play().catch(() => {});
      setShowingFull(true);
    };
    loop.addEventListener('timeupdate', onTime);
    return () => loop.removeEventListener('timeupdate', onTime);
  }, [fullReady, showingFull]);

  /* --- Pause off screen, when hidden, and when asked. ----------------------- */
  const active = useCallback(
    () => (showingFull ? fullRef.current : loopRef.current),
    [showingFull],
  );

  useEffect(() => {
    if (!mounted) return;
    const node = loopRef.current;
    if (!node) return;

    let onScreen = true;
    const sync = () => {
      const video = active();
      if (!video) return;
      if (onScreen && !paused && !document.hidden) void video.play().catch(() => {});
      else video.pause();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry?.isIntersecting ?? false;
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    document.addEventListener('visibilitychange', sync);
    sync();

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [mounted, paused, active]);

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    try {
      window.sessionStorage.setItem(PAUSE_KEY, next ? '1' : '0');
    } catch {
      // Private mode. The preference simply does not persist.
    }
  };

  if (failed) return null;

  const loopSources = portrait ? sources.portrait : sources.loop;

  return (
    <>
      {mounted && (
        <video
          ref={loopRef}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setLoopReady(true)}
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover transition-opacity duration-[900ms] ease-out-quart"
          style={{ opacity: loopReady && !showingFull ? 1 : 0 }}
        >
          {loopSources.map((src) => (
            <source key={src} src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
          ))}
        </video>
      )}

      {mounted && wantFull && (
        <video
          ref={fullRef}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlayThrough={() => setFullReady(true)}
          onError={() => setWantFull(false)}
          className="absolute inset-0 size-full object-cover"
          style={{
            opacity: showingFull ? 1 : 0,
            transition: `opacity ${SWAP_MS}ms var(--ease-out-quart)`,
          }}
        >
          {sources.full.map((src) => (
            <source key={src} src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
          ))}
        </video>
      )}

      {mounted && loopReady && (
        <button
          type="button"
          onClick={toggle}
          className="absolute right-[var(--spacing-gutter)] bottom-8 z-20 flex items-center gap-2 border border-white/40 px-3 py-2 text-micro text-white backdrop-blur-[2px] transition-colors duration-ui hover:border-white hover:bg-white/10"
        >
          {paused ? (
            <svg width="9" height="11" viewBox="0 0 9 11" aria-hidden="true">
              <path d="M0 0l9 5.5L0 11z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="8" height="11" viewBox="0 0 8 11" aria-hidden="true">
              <path d="M0 0h2.5v11H0zM5.5 0H8v11H5.5z" fill="currentColor" />
            </svg>
          )}
          {paused ? 'Play film' : 'Pause film'}
        </button>
      )}
    </>
  );
}
