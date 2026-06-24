"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AppStoreBadge, Button } from "@/components/primitives/Button";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  headline: ReactNode;
  sub?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
};

export function CTABand({
  eyebrow,
  headline,
  sub,
  secondaryHref = "#waitlist",
  secondaryLabel = "Join the waitlist",
  className,
}: Props) {
  const reduce = useReducedMotion();
  return (
    <section
      id="get"
      className={cn(
        "dark-card-lit--cta relative isolate overflow-hidden rounded-[28px] px-8 py-20 text-paper md:px-16 md:py-24",
        className,
      )}
    >
      {/* Breathing corner glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(242,195,206,0.38), rgba(176,94,118,0.15) 45%, transparent 70%)",
          filter: "blur(28px)",
        }}
        animate={
          reduce
            ? undefined
            : { scale: [1, 1.12, 1], x: [0, 18, 0], y: [0, -10, 0] }
        }
        transition={
          reduce
            ? undefined
            : { duration: 16, repeat: Infinity, ease: "easeInOut" }
        }
      />
      {/* Drifting bottom-left counter glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(215,126,145,0.22), transparent 60%)",
          filter: "blur(36px)",
        }}
        animate={
          reduce
            ? undefined
            : { scale: [1, 1.08, 1], x: [0, -14, 0], y: [0, 12, 0] }
        }
        transition={
          reduce
            ? undefined
            : { duration: 20, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <div className="relative mx-auto max-w-2xl text-center">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-amber-soft/85">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="serif mt-4 text-[clamp(28px,4.2vw,46px)] font-medium leading-[1.08] tracking-tighter2 text-balance">
          {headline}
        </h2>
        {sub ? (
          <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-paper/75 text-pretty">
            {sub}
          </p>
        ) : null}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <AppStoreBadge />
          <Button variant="ghost-dark" href={secondaryHref}>
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
