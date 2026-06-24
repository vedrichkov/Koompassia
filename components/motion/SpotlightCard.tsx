"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** Color for the spotlight glow. Use rgba for soft blending. */
  spotlightColor?: string;
  /** Glow radius in pixels. */
  radius?: number;
  style?: CSSProperties;
};

/**
 * SpotlightCard — radial-gradient glow follows the cursor inside the card.
 * Hooks always run (no conditional hooks); the glow's opacity gates visibility.
 * No-ops on touch and reduced-motion contexts.
 */
export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(242, 195, 206, 0.22)",
  radius = 420,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 320, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 320, damping: 28, mass: 0.4 });

  // Combine motion values into a CSS background string
  const background = useTransform([sx, sy], (latest) => {
    const [xx, yy] = latest as number[];
    return `radial-gradient(${radius}px circle at ${xx}px ${yy}px, ${spotlightColor}, transparent 60%)`;
  });

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const onPointerEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    setHovered(true);
  };

  const onPointerLeave = () => setHovered(false);

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={cn("relative", className)}
      style={style}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 ease-out"
        style={{
          background,
          opacity: hovered ? 1 : 0,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
