"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AppStoreBadge, Button } from "@/components/primitives/Button";
import { DUR } from "@/lib/motion-tokens";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  headline: ReactNode;
  sub?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
  /**
   * Closing CTA polish per Phase 3: NRS settle chip + breathing ring
   * behind the App Store button + ambient peak. Pass `closing` to enable.
   */
  closing?: boolean;
};

export function CTABand({
  eyebrow,
  headline,
  sub,
  secondaryHref = "#waitlist",
  secondaryLabel = "Join the waitlist",
  className,
  closing = false,
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
        {/* Settling-NRS chip — closing CTA only */}
        {closing ? <ClosingScore reduce={!!reduce} /> : null}

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
        <div className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {/* Breathing ring behind the primary button — closing variant only */}
          {closing ? <BreathingRing reduce={!!reduce} /> : null}
          <div className="relative">
            <AppStoreBadge />
          </div>
          <Button variant="ghost-dark" href={secondaryHref}>
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

/**
 * BreathingRing — soft expanding ring behind the App Store button on the
 * closing CTA. 10s sine.inOut loop, low opacity so it reads as ambient
 * warmth rather than decoration.
 */
function BreathingRing({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:left-[80px]"
      style={{
        background:
          "radial-gradient(circle, rgba(242,195,206,0.32) 0%, rgba(215,126,145,0.10) 45%, transparent 70%)",
        filter: "blur(8px)",
      }}
      animate={
        reduce
          ? undefined
          : { scale: [1, 1.12, 1], opacity: [0.5, 1, 0.5] }
      }
      transition={
        reduce
          ? undefined
          : { duration: DUR.breathe, repeat: Infinity, ease: "easeInOut" }
      }
    />
  );
}

/**
 * ClosingScore — small chip with NRS settling number above the headline.
 * Animates 70 → 82 once on entry as the user reaches the final CTA.
 */
function ClosingScore({ reduce }: { reduce: boolean }) {
  const final = 82;
  return (
    <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-amber-soft/30 bg-amber-soft/[0.06] px-4 py-2 backdrop-blur">
      <span
        aria-hidden
        className="relative flex h-2 w-2 rounded-full bg-amber-soft"
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-amber-soft/60"
          style={{
            animation: reduce ? undefined : "ping 2.4s ease-in-out infinite",
          }}
        />
      </span>
      <span className="serif text-[14px] italic text-paper/90">
        Today, your score settles at{" "}
      </span>
      <span className="serif text-[18px] font-medium text-paper tabular-nums">
        {final}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-eyebrow text-amber-soft/85">
        Primed
      </span>
    </div>
  );
}
