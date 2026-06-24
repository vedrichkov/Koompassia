"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { ACT_INTENSITY, DUR, EASE } from "@/lib/motion-tokens";
import { darknessProxy, setDarkness, type ActName } from "@/lib/act-store";

/**
 * ActDirector — animates the ambient canvas's uDarkness uniform as the
 * page moves between the four acts.
 *
 * Sections tag themselves with a `data-act` attribute (surface, mechanism,
 * interior, resurface). When the act's section enters the viewport
 * (top crosses 60%), we tween the darkness toward that act's target
 * intensity over 1s. Same in reverse on scroll-up. Reduced-motion: we
 * still snap to targets so the page background reads correctly, but
 * without the tween.
 *
 * Mounted once in the root layout.
 */
export function ActDirector() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    const tweenTo = (target: number) => {
      if (prefersReduced) {
        setDarkness(target);
        return;
      }
      gsap.killTweensOf(darknessProxy);
      gsap.to(darknessProxy, {
        value: target,
        duration: DUR.actWipe,
        ease: EASE.settle,
        onUpdate: () => setDarkness(darknessProxy.value),
      });
    };

    // Build a trigger per act-tagged section. Each trigger fires on enter
    // (going down) and onEnterBack (going up); both tween to that act's
    // target intensity. We don't need onLeave because the next act's
    // trigger will fire and override.
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-act]"),
    );

    const triggers: ScrollTrigger[] = sections.map((el) => {
      const act = el.getAttribute("data-act") as ActName;
      const target = ACT_INTENSITY[act] ?? ACT_INTENSITY.surface;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => tweenTo(target),
        onEnterBack: () => tweenTo(target),
      });
    });

    // Refresh after Lenis is wired so trigger positions are correct.
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return null;
}
