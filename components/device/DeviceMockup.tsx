"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  className?: string;
  /** 0–100. Defaults to 74. */
  score?: number;
  /** Apply parallax based on document scroll. */
  parallax?: boolean;
};

export function DeviceMockup({ className, score = 74, parallax = false }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5]);

  return (
    <div
      ref={ref}
      className={className}
      aria-label="A preview of the Koompassia app on iPhone, showing a calm breathing prompt and a Neural Regulation Score of seventy-four"
      role="img"
    >
      <motion.div
        className="relative mx-auto"
        style={{
          width: "min(360px, 84vw)",
          y: parallax && !reduce ? y : 0,
          rotate: parallax && !reduce ? rotate : 0,
        }}
      >
        {/* Ambient halo behind the phone */}
        <motion.div
          aria-hidden
          className="absolute -inset-12 -z-10 rounded-[60%]"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 45%, rgba(242,195,206,0.85), rgba(215,126,145,0.15) 55%, transparent 75%)",
            filter: "blur(36px)",
          }}
          animate={reduce ? undefined : { opacity: [0.85, 1, 0.85], scale: [1, 1.04, 1] }}
          transition={reduce ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* iPhone frame */}
        <div
          className="relative aspect-[9/19.5] rounded-[46px] p-[3px]"
          style={{
            background:
              "linear-gradient(160deg, #FFFFFF 0%, #FCE9EC 38%, #EFC4CC 100%)",
            boxShadow:
              "0 50px 90px -30px rgba(43,30,33,0.45), 0 18px 36px -18px rgba(176,94,118,0.32), inset 0 0 0 1px rgba(255,255,255,0.55)",
          }}
        >
          {/* Inner bezel ring */}
          <div
            className="relative h-full w-full overflow-hidden rounded-[43px] p-[2px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(31,23,24,0.85), rgba(31,23,24,0.65))",
            }}
          >
            {/* Screen */}
            <div
              className="relative h-full w-full overflow-hidden rounded-[40px]"
              style={{
                background:
                  "linear-gradient(170deg, #F8EAE9 0%, #F1CFD3 55%, #EAB4BB 100%)",
              }}
            >
              {/* Dynamic Island */}
              <div className="absolute left-1/2 top-2 z-20 h-[28px] w-[100px] -translate-x-1/2 rounded-full bg-bark-deep/95" />

              {/* Status bar */}
              <div className="relative z-10 flex items-center justify-between px-7 pt-3 text-[11px] font-medium text-ink/80">
                <span className="tabular-nums">9:41</span>
                <div className="flex items-center gap-1.5" aria-hidden>
                  <span className="text-[10px]">●●●●</span>
                  <svg width="14" height="9" viewBox="0 0 14 9" fill="currentColor"><path d="M0 7l1-1 1 1 1-2 1 2 1-3 1 3 1-4 1 4 1-5 1 5 1-6 1 6V9H0z"/></svg>
                  <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="0.8"><rect x="0.5" y="0.5" width="18" height="9" rx="2"/><rect x="2" y="2" width="14" height="6" rx="1" fill="currentColor"/><rect x="20" y="3" width="1.5" height="4" rx="0.5" fill="currentColor"/></svg>
                </div>
              </div>

              {/* Center breathing UI */}
              <div className="relative z-10 flex h-[calc(100%-44px)] flex-col items-center px-6">
                <div className="mt-10 flex items-center gap-2">
                  <span className="h-px w-4 bg-clay/60" aria-hidden />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-clay/80">
                    Today, 9:41
                  </span>
                </div>

                <p className="serif mt-3 text-[18px] font-normal italic tracking-tightish text-ink/90">
                  Breathe with me.
                </p>

                <div className="relative mt-7 flex h-[200px] w-[200px] items-center justify-center">
                  <motion.div
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.7) 0%, rgba(242,195,206,0.55) 40%, rgba(176,94,118,0) 75%)",
                      boxShadow: "inset 0 0 40px rgba(255,255,255,0.65)",
                    }}
                    animate={reduce ? undefined : { scale: [1, 1.07, 1], opacity: [0.9, 1, 0.9] }}
                    transition={reduce ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    aria-hidden
                    className="absolute inset-6 rounded-full border border-white/70"
                    style={{ background: "radial-gradient(circle, rgba(255,255,255,0.45), transparent 70%)" }}
                    animate={reduce ? undefined : { scale: [1, 1.045, 1], opacity: [0.85, 1, 0.85] }}
                    transition={reduce ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
                  />
                  <motion.div
                    aria-hidden
                    className="absolute inset-12 rounded-full border border-white/45"
                    animate={reduce ? undefined : { scale: [1, 1.03, 1] }}
                    transition={reduce ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />

                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-ink/55">
                      NRS
                    </span>
                    <span className="serif mt-1 text-[78px] font-normal leading-none tracking-[-0.04em] text-ink/95 tabular-nums">
                      {score}
                    </span>
                    <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-clay/70">
                      Steady
                    </span>
                  </div>
                </div>

                <p className="serif mt-auto mb-3 text-center text-[13px] leading-snug text-ink/75 text-pretty">
                  A 90-second breath before your 10:00.
                </p>

                <div className="mb-5 flex items-center gap-2 rounded-full bg-bark/90 px-4 py-2 text-[11px] font-medium text-paper">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-soft" />
                  Start
                </div>

                <div className="mb-6 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-ink/40">
                  <span className="serif text-[11px] normal-case tracking-tightish text-ink/55">
                    Koompassia
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
