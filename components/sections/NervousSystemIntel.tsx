"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { AnimatedNumber } from "@/components/primitives/AnimatedNumber";
import { IconPulse, IconArchitect, IconCompass } from "@/lib/icons";

const intelligences = [
  {
    kicker: "Discipline Architect",
    icon: <IconArchitect />,
    title: "Guidance that knows your rhythm.",
    body: "A conversational coach designed around your nervous system. Sets your Daily Anchor and Affirmation, adjusts to your emotional state, and recommends the right practice at the right time.",
  },
  {
    kicker: "Pattern Intelligence",
    icon: <IconCompass />,
    title: "Your data becomes direction.",
    body: "Recurring patterns across physiology, behavior and recovery. The Regulation Beacon surfaces the most relevant next action, state-aware and science-informed.",
  },
];

export function NervousSystemIntel() {
  const reduce = useReducedMotion();

  return (
    <section id="inside" className="relative py-24 md:py-32">
      <div className="shell">
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

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-[1.1fr_0.9fr]">
          {/* NRS visualization card */}
          <Reveal
            as="div"
            className="dark-card-lit relative overflow-hidden rounded-3xl border border-bark-deep/40 p-10 text-paper md:p-14"
          >
            {/* breathing glow */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(242,195,206,0.42), rgba(176,94,118,0.18) 45%, transparent 70%)",
                filter: "blur(36px)",
              }}
              animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
              transition={reduce ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="flex items-center gap-3 text-amber-soft/80">
              <span className="h-px w-6 bg-amber-soft/40" />
              <span className="text-[11px] font-semibold uppercase tracking-eyebrow">
                Neural Regulation Score
              </span>
            </div>

            <div className="relative mt-10 flex items-end gap-6">
              <span className="serif text-[clamp(120px,18vw,200px)] font-normal leading-[0.85] tracking-[-0.05em] text-paper tabular-nums">
                <AnimatedNumber value={82} duration={2.4} />
              </span>
              <div className="mb-5 flex flex-col gap-1 text-[11px] uppercase tracking-eyebrow text-paper/60">
                <span>NRS</span>
                <span className="text-amber-soft/90">Primed</span>
              </div>
            </div>

            {/* simulated signal sparkline */}
            <Sparkline />

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-6 text-[12px]">
              {[
                ["Processing patterns", "Active"],
                ["Adaptive guidance", "Ready"],
                ["HRV trend", "+4%"],
                ["Recovery", "Good"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <dt className="text-paper/55 uppercase tracking-eyebrow">{k}</dt>
                  <dd className="text-paper/90">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Three intelligences as stacked cards */}
          <div className="grid gap-6">
            <Reveal
              as="div"
              className="group relative overflow-hidden rounded-3xl border border-line bg-paper p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
              delay={0.06}
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
                  <IconPulse />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-amber">
                    Digital Twin
                  </p>
                  <h3 className="serif mt-1.5 text-[20px] font-medium leading-tight tracking-tightish text-ink">
                    The most honest read of you.
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft text-pretty">
                    Your Nervous System Digital Twin updates with your body, all day,
                    quietly.
                  </p>
                </div>
              </div>
            </Reveal>

            {intelligences.map((it, i) => (
              <Reveal
                as="div"
                key={it.kicker}
                delay={0.12 + i * 0.06}
                className="group relative overflow-hidden rounded-3xl border border-line bg-paper p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
              >
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
          </div>
        </div>
      </div>
    </section>
  );
}

function Sparkline() {
  const path =
    "M0 36 C 20 28, 40 44, 60 30 S 100 18, 120 26 S 160 38, 180 22 S 220 12, 240 18 S 280 28, 300 16";

  return (
    <svg
      viewBox="0 0 300 56"
      className="mt-8 w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="spark" x1="0" x2="1">
          <stop offset="0%" stopColor="#F2C3CE" stopOpacity="0.0" />
          <stop offset="20%" stopColor="#F2C3CE" stopOpacity="0.9" />
          <stop offset="80%" stopColor="#D77E91" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D77E91" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path
        className="spark-line"
        d={path}
        stroke="url(#spark)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
