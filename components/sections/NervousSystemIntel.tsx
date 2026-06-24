"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { IconPulse, IconArchitect, IconCompass } from "@/lib/icons";

const intelligences = [
  {
    kicker: "Digital Twin",
    icon: <IconPulse />,
    title: "The most honest read of you.",
    body: "Your Nervous System Digital Twin updates with your body, all day, quietly.",
  },
  {
    kicker: "Discipline Architect",
    icon: <IconArchitect />,
    title: "Guidance that knows your rhythm.",
    body: "A conversational coach designed around your nervous system. Sets your Daily Anchor and Affirmation, adjusts to your state, recommends the right practice at the right time.",
  },
  {
    kicker: "Pattern Intelligence",
    icon: <IconCompass />,
    title: "Your data becomes direction.",
    body: "Recurring patterns across physiology, behavior and recovery. The Regulation Beacon surfaces the most relevant next action, state-aware and science-informed.",
  },
];

// Three narrative beats of the score's journey
const stages = [
  { score: 60, state: "Activated", caption: "Under pressure. Your system is asking for a beat." },
  { score: 71, state: "Settling", caption: "Settling. The breath is doing its work." },
  { score: 82, state: "Primed", caption: "Primed. Ready for what matters." },
];

export function NervousSystemIntel() {
  return (
    <section id="inside" className="relative">
      {/* Intro header */}
      <div className="shell pt-24 md:pt-32">
        <Reveal as="div" className="max-w-2xl">
          <Eyebrow index="02">Nervous System Intelligence</Eyebrow>
          <h2 className="serif mt-5 text-[clamp(28px,3.6vw,42px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
            A living model of your <em className="italic">inner state.</em>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft text-pretty">
            HRV, recovery, breathing, circadian stability, resilience. One number each
            day. A compass, not a diagnosis.
          </p>
        </Reveal>
      </div>

      {/* The pinned signature moment */}
      <PinnedNRS />

      {/* Three intelligence cards below the moment */}
      <div className="shell pb-24 md:pb-32">
        <ul className="grid gap-6 md:grid-cols-3">
          {intelligences.map((it, i) => (
            <Reveal
              as="li"
              key={it.kicker}
              delay={i * 0.06}
              className="group relative overflow-hidden rounded-3xl border border-line bg-paper p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="spotlight-bar absolute inset-x-0 top-0 h-[3px]" aria-hidden />
              <div className="flex items-start gap-5">
                <div
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-line-soft text-clay"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(255,255,255,0.95), rgba(248,234,233,0.6))",
                  }}
                >
                  {it.icon}
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-amber">
                    {it.kicker}
                  </p>
                  <h3 className="serif mt-1.5 text-[20px] font-medium leading-tight tracking-tightish text-ink">
                    {it.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft text-pretty">
                    {it.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PinnedNRS() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  // Score 60 → 82 across the stage
  const scoreMV = useTransform(scrollYProgress, [0, 1], [60, 82]);
  const [score, setScore] = useState(reduce ? 82 : 60);
  useMotionValueEvent(scoreMV, "change", (v) => {
    if (!reduce) setScore(Math.round(v));
  });

  // Active stage index (0, 1, 2) for the narrative caption + state label.
  // Function transformer for crisp transitions rather than linear interpolation.
  const stageMV = useTransform(scrollYProgress, (p) =>
    p < 0.32 ? 0 : p < 0.66 ? 1 : 2,
  );
  const [stageIdx, setStageIdx] = useState(reduce ? 2 : 0);
  useMotionValueEvent(stageMV, "change", (v) => {
    if (!reduce) setStageIdx(v as 0 | 1 | 2);
  });

  // Sparkline draw — 0 (fully drawn) at end of scroll
  const sparkOffset = useTransform(scrollYProgress, [0, 1], [360, 0]);

  // Subtle glow scales with progress for atmosphere
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.45, 0.8, 1]);

  // HRV trend chip animates from 0 to +4%
  const hrvTrend = useTransform(scrollYProgress, [0, 1], [0, 4]);
  const [hrvDisplay, setHrvDisplay] = useState(reduce ? 4 : 0);
  useMotionValueEvent(hrvTrend, "change", (v) => {
    if (!reduce) setHrvDisplay(Math.round(v));
  });

  const current = stages[stageIdx];

  return (
    <div
      ref={stageRef}
      className="relative md:h-[200vh]"
      aria-label="A living score: as you scroll, your Neural Regulation Score rises from 60 to 82, narrating three states."
    >
      <div className="md:sticky md:top-[88px] md:flex md:h-[calc(100vh-88px)] md:items-center md:py-6">
        <div className="shell w-full">
          <div className="dark-card-lit relative mx-auto max-w-[920px] overflow-hidden rounded-[28px] border border-bark-deep/40 p-10 text-paper md:p-16">
            {/* breathing glow */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-[460px] w-[460px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(242,195,206,0.42), rgba(176,94,118,0.18) 45%, transparent 70%)",
                filter: "blur(40px)",
                scale: reduce ? 1 : glowScale,
                opacity: reduce ? 0.8 : glowOpacity,
              }}
            />

            <div className="flex items-center gap-3 text-amber-soft/80">
              <span className="h-px w-6 bg-amber-soft/40" aria-hidden />
              <span className="text-[11px] font-semibold uppercase tracking-eyebrow">
                Neural Regulation Score
              </span>
            </div>

            <div className="relative mt-8 grid items-end gap-x-10 gap-y-8 md:grid-cols-[auto_1fr]">
              {/* The big number */}
              <div className="flex items-end gap-6">
                <span className="serif text-[clamp(140px,18vw,220px)] font-normal leading-[0.82] tracking-[-0.05em] text-paper tabular-nums">
                  {score}
                </span>
                <div className="mb-4 flex flex-col gap-1 text-[11px] uppercase tracking-eyebrow text-paper/55">
                  <span>NRS</span>
                  <motion.span
                    key={current.state}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={reduce ? undefined : { opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-amber-soft/90"
                  >
                    {current.state}
                  </motion.span>
                </div>
              </div>

              {/* Narrative caption — crossfades through three lines */}
              <div className="relative md:pb-6">
                <div className="relative h-[88px] md:h-[112px]">
                  {stages.map((s, i) => (
                    <motion.p
                      key={s.state}
                      className="serif absolute inset-0 text-[20px] italic leading-[1.4] text-paper/90 md:text-[24px]"
                      initial={false}
                      animate={
                        reduce
                          ? { opacity: i === 2 ? 1 : 0 }
                          : { opacity: i === stageIdx ? 1 : 0, y: i === stageIdx ? 0 : 8 }
                      }
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {s.caption}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>

            {/* Scroll-drawn sparkline */}
            <svg
              viewBox="0 0 360 64"
              className="mt-6 w-full"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="spark-pin" x1="0" x2="1">
                  <stop offset="0%" stopColor="#F2C3CE" stopOpacity="0.0" />
                  <stop offset="20%" stopColor="#F2C3CE" stopOpacity="0.9" />
                  <stop offset="80%" stopColor="#D77E91" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#D77E91" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <motion.path
                d="M0 44 C 30 32, 60 56, 90 38 S 150 18, 180 28 S 240 42, 270 22 S 330 8, 360 18"
                stroke="url(#spark-pin)"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="360"
                style={{ strokeDashoffset: reduce ? 0 : sparkOffset }}
              />
            </svg>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-6 text-[12px]">
              {[
                ["Processing patterns", current.state === "Activated" ? "Reading" : "Active"],
                ["Adaptive guidance", current.state === "Primed" ? "Ready" : "Settling"],
                ["HRV trend", `+${hrvDisplay}%`],
                ["Recovery", current.state === "Primed" ? "Good" : current.state === "Settling" ? "Improving" : "Building"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <dt className="text-paper/55 uppercase tracking-eyebrow">{k}</dt>
                  <dd className="text-paper/90 tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>

            {/* Quiet scroll affordance — desktop only */}
            <div className="mt-8 hidden items-center gap-2 text-[10px] uppercase tracking-eyebrow text-paper/40 md:flex">
              <motion.span
                aria-hidden
                className="inline-block h-3 w-px bg-paper/40"
                animate={reduce ? undefined : { scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.8, 0.3] }}
                transition={reduce ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              Scroll to watch the score settle
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
