"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { TRIGGER } from "@/lib/motion-tokens";
import { cn } from "@/lib/cn";

// Day-in-the-life sequence — each step is a concrete moment with a
// time, an action and an outcome. Replaces the previous abstract
// 4-step ("Sense / Understand / Receive / Build") per Phase 3 brief:
// "Replace the abstract how-it-works steps with a literal
// day-in-the-life sequence."
const steps = [
  {
    n: "01",
    time: "7:14 am",
    title: "Morning brief.",
    body: "Overnight HRV reads recovered. Today is a Focus day. Koompassia opens with one anchor practice: a 90-second box breath.",
    outcome: "90 seconds · before the inbox.",
    Glyph: SenseGlyph,
  },
  {
    n: "02",
    time: "10:48 am",
    title: "Pre-meeting nudge.",
    body: "Calendar shows a hard 1:1 at 11:00. Heart rate is climbing. Watch taps your wrist: a single screen, a single move.",
    outcome: "3-minute breath. Lands before the meeting, not after.",
    Glyph: PatternGlyph,
  },
  {
    n: "03",
    time: "3:30 pm",
    title: "Mindful walk.",
    body: "Energy dips. A 4-minute walk routes you outside; the Watch tracks pace and HRV; the Score recalibrates as you settle.",
    outcome: "+6 NRS after the loop. Back to your desk steadier.",
    Glyph: GuidanceGlyph,
  },
  {
    n: "04",
    time: "Sunday",
    title: "Weekly trend.",
    body: "Your Path shows 18 steady days of 28, with HRV trending +4%. The Discipline Architect adjusts next week's anchor.",
    outcome: "One number you learn to trust.",
    Glyph: SteadinessGlyph,
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const railFill = useRef<HTMLDivElement>(null);
  const railDot = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // GSAP ScrollTrigger drives the rail fill height and the dot's top
  // position from 0 → 100% as the user scrolls the section, with scrub:1
  // for the gentle smoothing the guideline specifies.
  useEffect(() => {
    const section = ref.current;
    if (!section || reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(railFill.current, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(railDot.current, { top: "0%", y: "-50%" });

      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        scrub: TRIGGER.scrub,
        onUpdate: (self) => {
          gsap.set(railFill.current, { scaleY: self.progress });
          gsap.set(railDot.current, { top: `${self.progress * 100}%` });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="how" className="relative py-24 md:py-32">
      <div className="shell">
        <div className="max-w-2xl">
          <Eyebrow index="01">A day with Koompassia</Eyebrow>
          <h2 className="serif mt-5 text-[clamp(28px,3.6vw,42px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
            Four small moments. <em className="italic">One steady week.</em>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft text-pretty">
            Not a system to push through. Four nudges across the day that
            arrive when they help, so discipline grows from understanding.
          </p>
        </div>

        <div
          ref={ref}
          className="relative mt-16 grid gap-12 md:grid-cols-[180px_1fr] md:gap-20"
        >
          {/* Sticky step indicator */}
          <div className="hidden md:block">
            <div className="sticky top-32">
              <div className="relative ml-4 h-[320px] w-[2px] overflow-visible rounded-full bg-line">
                <div
                  ref={railFill}
                  className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-clay/80"
                  style={{
                    transform: reduce ? "scaleY(1)" : "scaleY(0)",
                    willChange: "transform",
                  }}
                />
                <div
                  ref={railDot}
                  className="absolute -left-[5px] h-3 w-3 -translate-y-1/2 rounded-full border-2 border-paper bg-clay shadow-soft"
                  style={{ top: reduce ? "100%" : "0%", willChange: "top" }}
                />
              </div>
              <div className="mt-6 text-[11px] font-semibold uppercase tracking-eyebrow text-amber">
                A typical day
              </div>
            </div>
          </div>

          <ol className="relative space-y-6 md:space-y-10">
            {steps.map((step, i) => (
              <Step key={step.n} step={step} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({
  step,
  index,
}: {
  step: {
    n: string;
    time: string;
    title: string;
    body: string;
    outcome: string;
    Glyph: React.FC;
  };
  index: number;
}) {
  const { Glyph } = step;
  return (
    <li
      className={cn(
        "reveal group relative overflow-hidden rounded-3xl border border-line bg-paper p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift md:p-9",
      )}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="grid grid-cols-[auto_1fr] items-start gap-6 md:grid-cols-[auto_1fr_120px] md:gap-8">
        <div className="flex flex-col">
          <span className="serif text-[36px] font-medium leading-none tracking-[-0.04em] text-clay/70 tabular-nums">
            {step.n}
          </span>
          <span className="mt-2 text-[10px] font-semibold uppercase tracking-eyebrow text-amber">
            {step.time}
          </span>
        </div>
        <div>
          <h3 className="serif text-[24px] font-medium leading-[1.15] tracking-tightish text-ink">
            {step.title}
          </h3>
          <p className="mt-3 max-w-prose text-[15.5px] leading-relaxed text-ink-soft text-pretty">
            {step.body}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-line-soft bg-cream-2/40 px-3 py-1.5 text-[12px] font-medium text-clay">
            <span aria-hidden className="h-1 w-1 rounded-full bg-clay" />
            {step.outcome}
          </p>
        </div>
        <div className="col-span-2 hidden h-16 md:col-span-1 md:block">
          <Glyph />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-amber/0 via-amber/60 to-amber/0 transition-transform duration-700 ease-out group-hover:scale-x-100"
      />
    </li>
  );
}

/* ===== Step glyphs — small ambient SVGs ===== */

function SenseGlyph() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 120 64" className="h-full w-full" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx="60"
          cy="32"
          r="6"
          fill="none"
          stroke="#B05E76"
          strokeWidth="0.8"
          animate={
            reduce ? undefined : { scale: [1, 3, 1], opacity: [0.6, 0, 0.6] }
          }
          transition={
            reduce
              ? undefined
              : { duration: 3, delay: i * 0.9, repeat: Infinity, ease: "easeOut" }
          }
          style={{ transformOrigin: "60px 32px" }}
        />
      ))}
      <motion.circle
        cx="60"
        cy="32"
        r="3"
        fill="#B05E76"
        animate={reduce ? undefined : { opacity: [0.7, 1, 0.7] }}
        transition={reduce ? undefined : { duration: 3, repeat: Infinity }}
      />
    </svg>
  );
}

function PatternGlyph() {
  const reduce = useReducedMotion();
  const points = [
    [20, 40],
    [40, 18],
    [60, 36],
    [80, 22],
    [100, 38],
  ];
  return (
    <svg viewBox="0 0 120 64" className="h-full w-full" aria-hidden>
      {/* connecting lines drawn in */}
      <motion.path
        d={`M ${points.map(([x, y]) => `${x} ${y}`).join(" L ")}`}
        fill="none"
        stroke="#B05E76"
        strokeWidth="0.8"
        strokeOpacity="0.6"
        strokeDasharray="120"
        animate={reduce ? undefined : { strokeDashoffset: [120, 0, 0, 120] }}
        transition={
          reduce
            ? undefined
            : { duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.35, 0.65, 1] }
        }
      />
      {points.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="2.2"
          fill="#B05E76"
          animate={reduce ? undefined : { opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
          transition={
            reduce
              ? undefined
              : { duration: 3, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }
          }
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
    </svg>
  );
}

function GuidanceGlyph() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 120 64" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="gg-beam" x1="0" x2="1">
          <stop offset="0%" stopColor="#B05E76" stopOpacity="0" />
          <stop offset="50%" stopColor="#B05E76" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#B05E76" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="10" x2="110" y1="32" y2="32" stroke="#EFDADC" strokeWidth="1" />
      <motion.line
        x1="10"
        x2="110"
        y1="32"
        y2="32"
        stroke="url(#gg-beam)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="40 100"
        animate={reduce ? undefined : { strokeDashoffset: [140, 0] }}
        transition={reduce ? undefined : { duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle
        cx="60"
        cy="32"
        r="2.5"
        fill="#B05E76"
        animate={reduce ? undefined : { scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
        transition={reduce ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "60px 32px" }}
      />
    </svg>
  );
}

function SteadinessGlyph() {
  const reduce = useReducedMotion();
  const bars = [22, 16, 28, 24, 36, 30, 42, 38];
  return (
    <svg viewBox="0 0 120 64" className="h-full w-full" aria-hidden>
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={12 + i * 12}
          width="3"
          fill="#B05E76"
          initial={false}
          animate={
            reduce
              ? { y: 56 - h, height: h, opacity: 0.8 }
              : { y: [56 - h * 0.4, 56 - h, 56 - h * 0.4], height: [h * 0.4, h, h * 0.4], opacity: [0.5, 0.9, 0.5] }
          }
          transition={
            reduce
              ? undefined
              : { duration: 3 + i * 0.1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }
          }
        />
      ))}
    </svg>
  );
}
