"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { DUR, EASE, REVEAL, TRIGGER } from "@/lib/motion-tokens";
import { cn } from "@/lib/cn";

type Tag = "div" | "section" | "header" | "article" | "li" | "ul";
type Direction = "up" | "left" | "right";

type Props = {
  children: ReactNode;
  /** Delay in seconds before the entrance starts (after the trigger fires). */
  delay?: number;
  className?: string;
  as?: Tag;
  /** Direction the element comes from. Default: up. */
  from?: Direction;
};

/**
 * Reveal — GSAP ScrollTrigger entrance.
 *
 * Initial state: opacity 0, translated 24px from `from` direction.
 * Animation: fires when element top reaches 80% viewport, plays once,
 * never reverses. 700ms expo-out. Reduced-motion shows final state
 * immediately, no animation.
 *
 * SSR note: we render the initial style inline so server output matches
 * the pre-animation state and there is no hydration flash. Hydration
 * mounts ScrollTrigger which animates to the final state. The element is
 * in the DOM and tappable throughout (opacity doesn't block pointer events).
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  from = "up",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  // Default to "animating from" state; effect will animate to neutral.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      // Snap to final state, no animation.
      gsap.set(node, { autoAlpha: 1, x: 0, y: 0 });
      setReady(true);
      return;
    }

    const fromVars: gsap.TweenVars = { autoAlpha: 0 };
    const toVars: gsap.TweenVars = { autoAlpha: 1, x: 0, y: 0 };
    if (from === "up") fromVars.y = REVEAL.y;
    if (from === "left") fromVars.x = -REVEAL.y;
    if (from === "right") fromVars.x = REVEAL.y;

    const ctx = gsap.context(() => {
      gsap.fromTo(node, fromVars, {
        ...toVars,
        duration: DUR.reveal,
        ease: EASE.reveal,
        delay,
        scrollTrigger: {
          trigger: node,
          start: TRIGGER.reveal.start,
          once: true,
          toggleActions: TRIGGER.reveal.toggleActions,
        },
      });
    }, node);

    setReady(true);
    return () => ctx.revert();
  }, [delay, from]);

  // Initial inline style mirrors the `from` state so SSR matches the
  // pre-animation visual. After mount, GSAP takes over.
  const initialStyle: CSSProperties = ready
    ? {}
    : {
        opacity: 0,
        visibility: "hidden",
        transform:
          from === "up"
            ? `translateY(${REVEAL.y}px)`
            : from === "left"
              ? `translateX(${-REVEAL.y}px)`
              : `translateX(${REVEAL.y}px)`,
        willChange: "transform, opacity",
      };

  const cls = cn(className);
  const props = { ref: ref as unknown as React.RefObject<never>, className: cls, style: initialStyle };

  switch (as) {
    case "section":
      return <section {...props}>{children}</section>;
    case "header":
      return <header {...props}>{children}</header>;
    case "article":
      return <article {...props}>{children}</article>;
    case "li":
      return <li {...props}>{children}</li>;
    case "ul":
      return <ul {...props}>{children}</ul>;
    default:
      return <div {...props}>{children}</div>;
  }
}
