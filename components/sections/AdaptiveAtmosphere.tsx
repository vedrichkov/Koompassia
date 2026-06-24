"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { IconSun, IconWave, IconMoon } from "@/lib/icons";
import { cn } from "@/lib/cn";

type Mode = "morning" | "pressure" | "recovery";

const modes: {
  key: Mode;
  label: string;
  hour: string;
  state: string;
  copy: string;
  surface: string;
  glow: string;
  text: string;
  textSoft: string;
  chip: string;
  icon: React.ReactNode;
}[] = [
  {
    key: "morning",
    label: "Morning",
    hour: "7:14",
    state: "Open",
    copy: "A clean start. One small anchor before the day pulls.",
    surface:
      "linear-gradient(165deg, #FCEDE3 0%, #F7D7C8 55%, #EDB7A3 100%)",
    glow: "rgba(255, 213, 184, 0.55)",
    text: "#3D2A24",
    textSoft: "rgba(61,42,36,0.66)",
    chip: "rgba(255,255,255,0.55)",
    icon: <IconSun />,
  },
  {
    key: "pressure",
    label: "Pressure",
    hour: "2:48",
    state: "Activated",
    copy: "Heart rate is rising. A 90-second breath will land in time.",
    surface:
      "linear-gradient(165deg, #F8EAE9 0%, #F1CFD3 55%, #EAB4BB 100%)",
    glow: "rgba(242,195,206,0.6)",
    text: "#1F1718",
    textSoft: "rgba(31,23,24,0.62)",
    chip: "rgba(255,255,255,0.6)",
    icon: <IconWave />,
  },
  {
    key: "recovery",
    label: "Recovery",
    hour: "10:32",
    state: "Settling",
    copy: "Lights down. The hum guides you toward a longer exhale.",
    surface:
      "linear-gradient(165deg, #2C1F23 0%, #3B2A30 55%, #5B3946 100%)",
    glow: "rgba(176,94,118,0.35)",
    text: "#F4E0E1",
    textSoft: "rgba(244,224,225,0.62)",
    chip: "rgba(244,224,225,0.10)",
    icon: <IconMoon />,
  },
];

export function AdaptiveAtmosphere() {
  const [active, setActive] = useState<Mode>("pressure");
  const reduce = useReducedMotion();
  const current = modes.find((m) => m.key === active)!;

  return (
    <section className="relative py-24 md:py-32">
      <div className="shell">
        <Reveal as="div" className="max-w-3xl">
          <Eyebrow>Signature</Eyebrow>
          <h2 className="serif mt-5 text-[clamp(28px,3.6vw,42px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
            An interface that <em className="italic">breathes with you.</em>
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-soft text-pretty">
            Warmer and dimmer at night. Calmer when you are frayed. Quieter when you have
            room to think. It feels like care, not a dashboard.
          </p>
        </Reveal>

        <Reveal as="div" delay={0.1} className="mt-14">
          <div
            role="tablist"
            aria-label="Adaptive Atmosphere preview"
            className="mx-auto flex w-fit items-center gap-1 rounded-full border border-line bg-paper/70 p-1 shadow-soft backdrop-blur"
          >
            {modes.map((m) => {
              const isActive = m.key === active;
              return (
                <button
                  key={m.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(m.key)}
                  className={cn(
                    "relative inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors duration-300",
                    isActive ? "text-paper" : "text-ink-soft hover:text-clay",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="atmosphere-pill"
                      className="absolute inset-0 rounded-full bg-bark"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <span className="opacity-80">{m.icon}</span>
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative mx-auto mt-10 max-w-3xl">
            <motion.div
              animate={{ background: current.surface }}
              transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[28px] border border-line p-10 shadow-lift md:p-14"
              style={{ background: current.surface }}
            >
              {/* ambient glow */}
              <motion.div
                aria-hidden
                animate={{ backgroundColor: current.glow }}
                transition={{ duration: reduce ? 0 : 0.6 }}
                className="pointer-events-none absolute -right-20 -top-20 h-[320px] w-[320px] rounded-full"
                style={{ background: current.glow, filter: "blur(40px)" }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="flex items-center justify-between">
                    <motion.div
                      animate={{ color: current.textSoft }}
                      transition={{ duration: reduce ? 0 : 0.6 }}
                      className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-eyebrow"
                      style={{ color: current.textSoft }}
                    >
                      <span style={{ background: current.chip }} className="rounded-full px-2.5 py-1">
                        {current.hour}
                      </span>
                      <span>{current.state}</span>
                    </motion.div>
                    <motion.div
                      animate={{ color: current.textSoft }}
                      style={{ color: current.textSoft }}
                      className="text-[11px] font-medium uppercase tracking-eyebrow"
                    >
                      Today
                    </motion.div>
                  </div>

                  <motion.h3
                    animate={{ color: current.text }}
                    style={{ color: current.text }}
                    transition={{ duration: reduce ? 0 : 0.6 }}
                    className="serif mt-6 max-w-xl text-[clamp(26px,3.2vw,38px)] font-medium leading-[1.15] tracking-tighter2 text-balance"
                  >
                    {current.copy}
                  </motion.h3>

                  <div className="mt-10 flex flex-wrap items-end gap-8">
                    <div>
                      <motion.p
                        animate={{ color: current.textSoft }}
                        style={{ color: current.textSoft }}
                        className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                      >
                        NRS
                      </motion.p>
                      <motion.p
                        animate={{ color: current.text }}
                        style={{ color: current.text }}
                        className="serif text-[64px] font-normal leading-none tracking-[-0.04em] tabular-nums"
                      >
                        {current.key === "morning" ? "81" : current.key === "pressure" ? "62" : "70"}
                      </motion.p>
                    </div>
                    <div
                      className="flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-medium"
                      style={{ background: current.chip, color: current.text }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: current.text }} />
                      Next move ready
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
