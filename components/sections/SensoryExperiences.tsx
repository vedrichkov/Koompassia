"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";

const experiences = [
  {
    name: "Still Water",
    body: "Stillness, steady breath, soft visual feedback. As you stay composed, the water settles and clarity emerges.",
    canvas: <StillWaterCanvas />,
    tone: "calm",
  },
  {
    name: "Cosmic Breath",
    body: "Rhythmic breathing gradually builds a living visual structure. Breathwork made immersive and rewarding.",
    canvas: <CosmicBreathCanvas />,
    tone: "deep",
  },
  {
    name: "Axis",
    body: "Attention and control through motion, rhythm, composure. Guide an orbiting path with precision.",
    canvas: <AxisCanvas />,
    tone: "focus",
  },
];

export function SensoryExperiences() {
  return (
    <section id="experiences" className="relative py-24 md:py-32">
      <div className="shell">
        <Reveal as="div" className="max-w-2xl">
          <Eyebrow index="03">Sensory experiences</Eyebrow>
          <h2 className="serif mt-5 text-[clamp(28px,3.6vw,42px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
            Regulation, <em className="italic">made immersive.</em>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft text-pretty">
            Breath, stillness, rhythm and attention. Each experience returns you to a
            steadier internal state, in a different way.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {experiences.map((e, i) => (
            <Reveal as="li" key={e.name} delay={i * 0.08}>
              <article className="dark-card-lit group relative h-full overflow-hidden rounded-3xl border border-bark-deep/40 p-8 text-paper transition-all duration-500 hover:-translate-y-1">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  {e.canvas}
                </div>
                <div className="mt-7">
                  <h3 className="serif text-[22px] font-medium leading-tight tracking-tightish text-paper">
                    {e.name}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-paper/70 text-pretty">
                    {e.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ===== Mini canvases ===== */

function StillWaterCanvas() {
  const reduce = useReducedMotion();
  const rings = [0, 1, 2, 3];

  return (
    <div
      className="relative h-full w-full"
      style={{
        background:
          "radial-gradient(circle at 50% 55%, #2a1f24 0%, #1a1214 70%)",
      }}
    >
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
        {rings.map((i) => (
          <motion.circle
            key={i}
            cx="100"
            cy="110"
            r="14"
            fill="none"
            stroke="#F2C3CE"
            strokeWidth="0.8"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={
              reduce
                ? { opacity: 0.5, scale: 1 }
                : { opacity: [0, 0.6, 0], scale: [0.6, 3.6, 4] }
            }
            transition={
              reduce
                ? undefined
                : {
                    duration: 6,
                    repeat: Infinity,
                    delay: i * 1.4,
                    ease: "easeOut",
                  }
            }
            style={{ transformOrigin: "100px 110px" }}
          />
        ))}
        <circle cx="100" cy="110" r="4" fill="#F2C3CE" opacity="0.9" />
      </svg>
    </div>
  );
}

function CosmicBreathCanvas() {
  const reduce = useReducedMotion();
  return (
    <div
      className="relative h-full w-full"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #3a2530 0%, #1a1214 75%)",
      }}
    >
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="cb-core">
            <stop offset="0%" stopColor="#F2C3CE" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#D77E91" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#D77E91" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((i) => {
          const r = 18 + i * 14;
          return (
            <motion.circle
              key={i}
              cx="100"
              cy="100"
              r={r}
              fill="none"
              stroke="#F2C3CE"
              strokeWidth="0.5"
              strokeOpacity={0.6 - i * 0.08}
              animate={
                reduce
                  ? undefined
                  : { scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }
              }
              transition={
                reduce
                  ? undefined
                  : {
                      duration: 7,
                      repeat: Infinity,
                      delay: i * 0.18,
                      ease: "easeInOut",
                    }
              }
              style={{ transformOrigin: "100px 100px" }}
            />
          );
        })}
        <motion.circle
          cx="100"
          cy="100"
          r="28"
          fill="url(#cb-core)"
          animate={reduce ? undefined : { scale: [1, 1.22, 1], opacity: [0.7, 1, 0.7] }}
          transition={reduce ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "100px 100px" }}
        />
      </svg>
    </div>
  );
}

function AxisCanvas() {
  const reduce = useReducedMotion();
  return (
    <div
      className="relative h-full w-full"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #2c1d25 0%, #1a1214 75%)",
      }}
    >
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
        <ellipse
          cx="100"
          cy="100"
          rx="70"
          ry="36"
          fill="none"
          stroke="#F2C3CE"
          strokeOpacity="0.35"
          strokeWidth="0.8"
        />
        <ellipse
          cx="100"
          cy="100"
          rx="36"
          ry="70"
          fill="none"
          stroke="#F2C3CE"
          strokeOpacity="0.18"
          strokeWidth="0.8"
        />
        <circle cx="100" cy="100" r="3" fill="#D77E91" />
        <motion.g
          animate={reduce ? undefined : { rotate: 360 }}
          transition={reduce ? undefined : { duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        >
          <circle cx="170" cy="100" r="5" fill="#F2C3CE" />
          <circle
            cx="170"
            cy="100"
            r="10"
            fill="none"
            stroke="#F2C3CE"
            strokeOpacity="0.4"
          />
        </motion.g>
        <motion.g
          animate={reduce ? undefined : { rotate: -360 }}
          transition={reduce ? undefined : { duration: 14, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        >
          <circle cx="100" cy="30" r="3" fill="#E5A6B5" opacity="0.8" />
        </motion.g>
      </svg>
    </div>
  );
}
