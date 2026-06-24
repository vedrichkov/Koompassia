"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";

const practices = [
  {
    name: "Adaptive Breathing",
    sub: "Parasympathetic recovery, guided by your state.",
    Canvas: BreathCanvas,
  },
  {
    name: "Mindful Walking",
    sub: "Embodied discipline, grounded in movement.",
    Canvas: WalkCanvas,
  },
  {
    name: "Reflective Voice",
    sub: "Process your inner state through spoken reflection.",
    Canvas: VoiceCanvas,
  },
  {
    name: "Emotional Body Scan",
    sub: "Map what you feel, deepen personalization.",
    Canvas: BodyScanCanvas,
  },
];

export function EmbodiedPractices() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="shell">
        <Reveal as="div" className="max-w-2xl">
          <Eyebrow index="04">Embodied practices</Eyebrow>
          <h2 className="serif mt-5 text-[clamp(28px,3.6vw,42px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
            Breathing, walking, reflection, <em className="italic">voice.</em>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft text-pretty">
            Tools that deepen with use. Each one personalizes a different way of
            returning to a steadier state.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {practices.map((p, i) => {
            const Canvas = p.Canvas;
            return (
              <li
                key={p.name}
                className="reveal group relative overflow-hidden rounded-3xl border border-line bg-paper shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {/* Live mini canvas — picks up subtle theme color */}
                <div className="relative h-[112px] overflow-hidden border-b border-line-soft bg-cream-2/30">
                  <Canvas />
                </div>
                <div className="p-6">
                  <h3 className="serif text-[18px] font-medium leading-tight tracking-tightish text-ink">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft text-pretty">
                    {p.sub}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ==========================================================================
   Mini canvases — each ~200x112 viewBox, calm ambient animations.
   ========================================================================== */

function BreathCanvas() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 200 112" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id="bc-core" cx="50%" cy="50%" r="40%">
          <stop offset="0%" stopColor="#D77E91" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#D77E91" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="112" fill="url(#bc-core)" />
      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={i}
          cx="100"
          cy="56"
          r="14"
          fill="none"
          stroke="#B05E76"
          strokeOpacity="0.5"
          strokeWidth="0.8"
          animate={
            reduce
              ? undefined
              : { scale: [1, 2.6, 1], opacity: [0.55, 0, 0.55] }
          }
          transition={
            reduce
              ? undefined
              : { duration: 6, repeat: Infinity, delay: i * 1.5, ease: "easeOut" }
          }
          style={{ transformOrigin: "100px 56px" }}
        />
      ))}
      <motion.circle
        cx="100"
        cy="56"
        r="4"
        fill="#B05E76"
        animate={reduce ? undefined : { scale: [1, 0.7, 1], opacity: [0.7, 1, 0.7] }}
        transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "100px 56px" }}
      />
    </svg>
  );
}

function WalkCanvas() {
  const reduce = useReducedMotion();
  // A gently undulating path representing a walk; stroke draws across.
  const path = "M 10 70 C 30 50, 50 80, 70 60 S 110 40, 130 60 S 170 80, 190 56";
  return (
    <svg viewBox="0 0 200 112" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="wc-line" x1="0" x2="1">
          <stop offset="0%" stopColor="#D77E91" stopOpacity="0" />
          <stop offset="50%" stopColor="#B05E76" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D77E91" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path} fill="none" stroke="#EFDADC" strokeWidth="1" />
      <motion.path
        d={path}
        fill="none"
        stroke="url(#wc-line)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="60 240"
        animate={reduce ? undefined : { strokeDashoffset: [300, 0] }}
        transition={reduce ? undefined : { duration: 7, repeat: Infinity, ease: "linear" }}
      />
      {/* Footprints — small marks along the path */}
      {[
        [25, 62],
        [55, 70],
        [85, 56],
        [115, 50],
        [145, 58],
        [175, 67],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="1.6"
          fill="#B05E76"
          animate={reduce ? undefined : { opacity: [0.2, 0.9, 0.2] }}
          transition={
            reduce
              ? undefined
              : { duration: 4, delay: i * 0.55, repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}
    </svg>
  );
}

function VoiceCanvas() {
  const reduce = useReducedMotion();
  // A row of bars rising and falling, suggesting a soft waveform
  const bars = Array.from({ length: 28 }, (_, i) => i);
  return (
    <svg viewBox="0 0 200 112" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <line x1="10" x2="190" y1="56" y2="56" stroke="#EFDADC" strokeWidth="0.8" />
      {bars.map((i) => {
        const x = 10 + i * 6.4;
        const baseHeight = 6 + ((Math.sin(i * 1.7) + 1) * 11);
        const phase = (i * 0.18) % (2 * Math.PI);
        return (
          <motion.rect
            key={i}
            x={x}
            width="2"
            fill="#B05E76"
            initial={false}
            animate={
              reduce
                ? { y: 56 - baseHeight / 2, height: baseHeight }
                : {
                    y: [56 - baseHeight / 2, 56 - (baseHeight * 1.6) / 2, 56 - baseHeight / 2],
                    height: [baseHeight, baseHeight * 1.6, baseHeight],
                  }
            }
            transition={
              reduce
                ? undefined
                : { duration: 1.6 + (i % 5) * 0.18, repeat: Infinity, ease: "easeInOut", delay: phase * 0.3 }
            }
          />
        );
      })}
    </svg>
  );
}

function BodyScanCanvas() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 200 112" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="bs-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D77E91" stopOpacity="0" />
          <stop offset="50%" stopColor="#D77E91" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D77E91" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Body outline — head, torso, limbs as quick hairline shapes */}
      <g stroke="#B05E76" strokeOpacity="0.55" strokeWidth="1" fill="none" strokeLinecap="round">
        <circle cx="100" cy="22" r="9" />
        <path d="M100 32 L 100 76" />
        <path d="M 100 40 L 78 56 M 100 40 L 122 56" />
        <path d="M 100 76 L 86 100 M 100 76 L 114 100" />
      </g>
      {/* Heart marker */}
      <motion.circle
        cx="105"
        cy="52"
        r="2"
        fill="#B05E76"
        animate={reduce ? undefined : { opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
        transition={reduce ? undefined : { duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "105px 52px" }}
      />
      {/* Scanning sweep */}
      <motion.rect
        x="0"
        width="200"
        height="12"
        fill="url(#bs-scan)"
        initial={{ y: -6 }}
        animate={reduce ? undefined : { y: [-6, 110] }}
        transition={
          reduce
            ? undefined
            : { duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }
        }
      />
    </svg>
  );
}
