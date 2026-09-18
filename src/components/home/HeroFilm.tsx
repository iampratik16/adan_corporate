'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The ambient hero film.
 *
 * Rules the brief sets, all enforced here:
 *  - muted, playsinline, loop, preload="none"
 *  - never loaded on Save-Data, on reduced motion, or on a metered connection
 *  - starts only after the poster has painted, so it never competes for the LCP
 *  - pauses when off screen or when the tab is hidden
 *  - a visible pause control, which is also a WCAG 2.2 requirement for anything
 *    that moves for more than five seconds
 *
 * The poster is rendered by the server as a plain <img>, and this component
 * fades the film in over it once the first frame is decodable. The film was
 * generated from that exact still, so frame one and the poster are the same
 * composition and nothing shifts at the handover.
 */
export function HeroFilm({ sources }: { sources: { landscape: string[]; portrait: string[] } }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  // <source media> was dropped from the video spec, so the crop is chosen here
  // rather than declaratively. Decided once, before the element mounts, so no
  // file is ever fetched twice.
  const [portrait, setPortrait] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const thin =
      connection?.saveData === true ||
      (connection?.effectiveType !== undefined && /2g/.test(connection.effectiveType));

    if (reduced || thin) return;

    // Wait for the poster to have painted before asking for 1.5 MB of film.
    // Orientation is decided at the same moment the element mounts, so no file
    // is ever fetched for the wrong crop and no state is set during the effect
    // body itself, which would cascade a render.
    const start = () => {
      setPortrait(
        window.matchMedia('(orientation: portrait) and (max-width: 820px)').matches &&
          sources.portrait.length > 0,
      );
      setMounted(true);
    };
    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(handle);
    }
    const handle = window.setTimeout(start, 900);
    return () => clearTimeout(handle);
  }, [sources.portrait.length]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !mounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && !paused && !document.hidden) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(video);

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else if (!paused) void video.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [mounted, paused]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => {});
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  if (failed) return null;

  return (
    <>
      {mounted && (
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          // No poster attribute: the <img> behind this element already paints
          // the identical first frame, and a poster here fetched the full-size
          // still a second time on every load.
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover transition-opacity duration-[900ms] ease-out-quart"
          style={{ opacity: ready ? 1 : 0 }}
        >
          {(portrait ? sources.portrait : sources.landscape).map((src) => (
            <source key={src} src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
          ))}
        </video>
      )}

      {mounted && ready && (
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
