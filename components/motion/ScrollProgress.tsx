"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

/**
 * ScrollProgress — top hairline that scales 0 → 1 as the user scrolls
 * from page top to bottom. GSAP ScrollTrigger with scrub:0.3 for a
 * gentle smoothing. Reduced-motion: not rendered.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    gsap.set(node, { scaleX: 0, transformOrigin: "left center" });

    const st = ScrollTrigger.create({
      start: "top top",
      end: "max",
      scrub: 0.3,
      onUpdate: (self) => {
        gsap.set(node, { scaleX: self.progress });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]"
    >
      <div
        ref={ref}
        className="h-full origin-left"
        style={{
          background:
            "linear-gradient(90deg, rgba(215,126,145,0) 0%, #D77E91 40%, #B05E76 100%)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
