"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SmoothScroll — Lenis is the inertia substrate. We drive ScrollTrigger's
 * update from Lenis's scroll callback and feed Lenis's raf from gsap's
 * ticker so there's exactly one frame loop. This is the canonical
 * Lenis + GSAP integration from gsap.com/docs/v3/Plugins/ScrollTrigger.
 *
 * Mounted at the top of the layout. Renders nothing.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Always register the plugin (server-safe to call multiple times).
    gsap.registerPlugin(ScrollTrigger);

    if (prefersReduced) {
      // No smooth scroll, no inertia, no scroll-triggered tweens get smoothing.
      // ScrollTrigger continues to function on native scroll events.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    // Drive ScrollTrigger from Lenis's scroll callback so pinned + scrubbed
    // tweens stay in sync with Lenis's eased scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis's raf from gsap's ticker — one frame loop for the whole page.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links: smooth-scroll via Lenis with the nav offset.
    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"], a[href^="/#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const hash = href.startsWith("/#") ? href.slice(1) : href;
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash) as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -72, duration: 1.2 });
    };
    document.addEventListener("click", onAnchorClick);

    // ScrollTrigger.refresh after Lenis is wired — pinned/scrubbed positions
    // need recalculation now that the scroll engine has switched over.
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
