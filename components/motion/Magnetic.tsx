"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  /** Max pixel drift toward the cursor. */
  strength?: number;
  className?: string;
};

/**
 * Magnetic — translates its child subtly toward the cursor while the pointer
 * is near. Disabled on touch and reduced-motion contexts.
 */
export function Magnetic({ children, strength = 10, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 18, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 240, damping: 18, mass: 0.3 });

  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const clampedX = Math.max(-strength, Math.min(strength, (dx / rect.width) * strength * 2));
    const clampedY = Math.max(-strength, Math.min(strength, (dy / rect.height) * strength * 2));
    x.set(clampedX);
    y.set(clampedY);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className}
      style={{ display: "inline-block" }}
    >
      <motion.span style={{ x: sx, y: sy, display: "inline-block" }}>
        {children}
      </motion.span>
    </span>
  );
}
