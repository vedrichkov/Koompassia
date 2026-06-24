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
import { cn } from "@/lib/cn";

type Experience = {
  name: string;
  axis: string;
  caption: string;
  /** Stage background — atmospheric gradient unique per experience. */
  bg: string;
  /** Accent color used for progress glyph and overlays. */
  accent: string;
  Canvas: React.FC<{ active: boolean; intensity: number }>;
};

const experiences: Experience[] = [
  {
    name: "Still Water",
    axis: "Stillness",
    caption:
      "Steady breath, soft visual feedback. As you stay composed, the water settles and clarity emerges from the dark.",
    bg: "radial-gradient(60% 50% at 65% 50%, #2a1f24 0%, #16101a 75%)",
    accent: "#F2C3CE",
    Canvas: StillWaterCanvas,
  },
  {
    name: "Cosmic Breath",
    axis: "Rhythm",
    caption:
      "Rhythmic breathing gradually builds a living visual structure. Breathwork that feels like watching a slow star bloom.",
    bg: "radial-gradient(60% 60% at 55% 50%, #3a2532 0%, #14101a 75%)",
    accent: "#E5A6B5",
    Canvas: CosmicBreathCanvas,
  },
  {
    name: "Axis",
    axis: "Attention",
    caption:
      "Attention and control through motion, rhythm, composure. Guide an orbiting path with precision, return to center.",
    bg: "radial-gradient(60% 60% at 40% 50%, #2c1d25 0%, #141015 75%)",
    accent: "#D77E91",
    Canvas: AxisCanvas,
  },
];

export function SensoryExperiences() {
  return (
    <section id="experiences" className="relative">
      {/* Section intro */}
      <div className="shell pt-24 md:pt-32">
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
      </div>

      <ImmersiveStage />
    </section>
  );
}

function ImmersiveStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  // Active stage index from scroll progress (0, 1, 2)
  const stageMV = useTransform(scrollYProgress, (p) =>
    p < 0.34 ? 0 : p < 0.67 ? 1 : 2,
  );
  const [stageIdx, setStageIdx] = useState<0 | 1 | 2>(reduce ? 2 : 0);
  useMotionValueEvent(stageMV, "change", (v) => {
    if (!reduce) setStageIdx(v as 0 | 1 | 2);
  });

  // Per-stage local progress 0-1 (used to drive canvas intensity)
  const stageProgressMV = useTransform(scrollYProgress, (p) => {
    if (p < 0.34) return p / 0.34;
    if (p < 0.67) return (p - 0.34) / 0.33;
    return (p - 0.67) / 0.33;
  });
  const [stageProgress, setStageProgress] = useState(0);
  useMotionValueEvent(stageProgressMV, "change", (v) => {
    if (!reduce) setStageProgress(Math.max(0, Math.min(1, v)));
  });

  // Overall scroll progress for the top hairline
  const overallScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const current = experiences[stageIdx];

  return (
    <div
      ref={stageRef}
      className="relative h-[300vh] md:h-[400vh]"
      aria-label="Three immersive regulation experiences, switched by scroll."
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="relative h-screen w-full overflow-hidden text-paper"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.5)",
          }}
        >
          {/* Atmospheric backgrounds — crossfade per stage */}
          {experiences.map((e, i) => (
            <motion.div
              key={`bg-${i}`}
              aria-hidden
              className="absolute inset-0"
              style={{ background: e.bg }}
              initial={false}
              animate={{ opacity: stageIdx === i ? 1 : 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}

          {/* Persistent dark base under all backgrounds */}
          <div aria-hidden className="absolute inset-0 -z-10 bg-[#14101a]" />

          {/* Top progress hairline */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px]">
            <div className="h-full w-full bg-white/[0.06]" />
            <motion.div
              className="absolute inset-y-0 left-0 origin-left"
              style={{
                scaleX: reduce ? 1 : overallScale,
                width: "100%",
                background:
                  "linear-gradient(90deg, transparent 0%, #F2C3CE 40%, #B05E76 100%)",
              }}
            />
          </div>

          {/* Stage grid */}
          <div className="relative grid h-full grid-cols-1 md:grid-cols-[minmax(360px,1fr)_1.5fr]">
            {/* LEFT: Text panel */}
            <div className="z-10 flex items-center px-7 md:px-16 lg:px-24">
              <div className="relative w-full max-w-[420px]">
                {/* Numbered progress glyphs */}
                <div className="flex items-end gap-5">
                  {experiences.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        // Click-to-jump scrolls the page to that stage's segment
                        const el = stageRef.current;
                        if (!el) return;
                        const offsets = [0.05, 0.45, 0.85];
                        const top =
                          el.offsetTop +
                          (el.offsetHeight - window.innerHeight) * offsets[i];
                        window.scrollTo({ top, behavior: "smooth" });
                      }}
                      className={cn(
                        "serif text-[14px] italic transition-all duration-500",
                        stageIdx === i
                          ? "text-amber-soft"
                          : "text-paper/30 hover:text-paper/55",
                      )}
                      style={{
                        transform: stageIdx === i ? "translateY(-4px)" : "none",
                      }}
                      aria-label={`Show experience ${i + 1}`}
                      aria-current={stageIdx === i ? "true" : undefined}
                    >
                      {String(i + 1).padStart(2, "0")}
                      {stageIdx === i ? (
                        <motion.span
                          layoutId="stage-underline"
                          className="mt-1 block h-px w-full"
                          style={{ background: current.accent }}
                          transition={{
                            type: "spring",
                            stiffness: 280,
                            damping: 30,
                          }}
                        />
                      ) : null}
                    </button>
                  ))}
                </div>

                {/* Crossfading text content */}
                <div className="relative mt-12 min-h-[320px] md:min-h-[300px]">
                  {experiences.map((e, i) => (
                    <motion.div
                      key={`txt-${i}`}
                      className="absolute inset-0"
                      initial={false}
                      animate={{
                        opacity: stageIdx === i ? 1 : 0,
                        y: stageIdx === i ? 0 : stageIdx > i ? -14 : 14,
                      }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p
                        className="text-[11px] font-semibold uppercase tracking-[0.32em]"
                        style={{ color: e.accent + "B3" }}
                      >
                        {e.axis}
                      </p>
                      <h3 className="serif mt-4 text-[clamp(38px,5vw,72px)] font-medium leading-[1.02] tracking-tighter2 text-balance text-paper">
                        {e.name}
                      </h3>
                      <p className="mt-6 max-w-[42ch] text-[16px] leading-relaxed text-paper/72 text-pretty md:text-[17px]">
                        {e.caption}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Scroll affordance */}
                <div className="mt-10 hidden items-center gap-3 text-[10px] uppercase tracking-eyebrow text-paper/35 md:flex">
                  <motion.span
                    aria-hidden
                    className="inline-block h-3 w-px bg-paper/40"
                    animate={
                      reduce
                        ? undefined
                        : { scaleY: [0.5, 1, 0.5], opacity: [0.25, 0.7, 0.25] }
                    }
                    transition={
                      reduce
                        ? undefined
                        : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                    }
                  />
                  Scroll to flow
                </div>
              </div>
            </div>

            {/* RIGHT: Canvas stage, full-bleed */}
            <div className="relative h-[60vh] overflow-hidden md:h-full">
              {experiences.map((e, i) => {
                const Canvas = e.Canvas;
                const isActive = stageIdx === i;
                return (
                  <motion.div
                    key={`canvas-${i}`}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 1.06,
                    }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Canvas
                      active={isActive}
                      intensity={isActive ? stageProgress : 0}
                    />
                  </motion.div>
                );
              })}

              {/* Vignette so canvas blends to the dark frame */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(80% 100% at 50% 50%, transparent 55%, rgba(15,10,16,0.45) 95%)",
                }}
              />
            </div>
          </div>

          {/* Bottom segmented progress bar */}
          <div className="absolute inset-x-0 bottom-0 z-20 hidden md:block">
            <div className="mx-auto flex max-w-[640px] items-center gap-2 px-8 pb-7">
              {experiences.map((_, i) => (
                <div
                  key={`seg-${i}`}
                  className="relative h-px flex-1 overflow-hidden bg-white/10"
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 origin-left"
                    style={{
                      width: "100%",
                      background: experiences[i].accent,
                    }}
                    initial={false}
                    animate={{
                      scaleX:
                        stageIdx > i
                          ? 1
                          : stageIdx === i
                            ? stageProgress
                            : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Canvases — full-screen capable. Each accepts `active` (drives heavy loops
   only when on stage to save CPU) and `intensity` (0-1, drives subtle scale).
   All elements respect reduced-motion via `useReducedMotion()`.
   ========================================================================== */

function StillWaterCanvas({ active }: { active: boolean; intensity: number }) {
  const reduce = useReducedMotion();
  const rings = [0, 1, 2, 3, 4, 5];

  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 600 600"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <radialGradient id="sw-glow" cx="50%" cy="55%" r="50%">
            <stop offset="0%" stopColor="#F2C3CE" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#D77E91" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#D77E91" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft center glow */}
        <rect width="600" height="600" fill="url(#sw-glow)" />

        {/* Horizon line, very faint */}
        <line
          x1="0"
          x2="600"
          y1="330"
          y2="330"
          stroke="#F2C3CE"
          strokeOpacity="0.06"
          strokeWidth="1"
        />

        {/* Concentric ripples */}
        {rings.map((i) => (
          <motion.circle
            key={i}
            cx="300"
            cy="330"
            r="20"
            fill="none"
            stroke="#F2C3CE"
            strokeWidth="0.9"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={
              active && !reduce
                ? { opacity: [0, 0.6, 0], scale: [0.6, 7, 8] }
                : { opacity: 0.4, scale: 1 }
            }
            transition={
              active && !reduce
                ? {
                    duration: 7,
                    repeat: Infinity,
                    delay: i * 1.2,
                    ease: "easeOut",
                  }
                : undefined
            }
            style={{ transformOrigin: "300px 330px" }}
          />
        ))}

        {/* Center drop */}
        <motion.circle
          cx="300"
          cy="330"
          r="6"
          fill="#F2C3CE"
          opacity={0.95}
          animate={
            active && !reduce
              ? { scale: [1, 0.7, 1], opacity: [0.85, 1, 0.85] }
              : undefined
          }
          transition={
            active && !reduce
              ? { duration: 7, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
          style={{ transformOrigin: "300px 330px" }}
        />

        {/* Faint specks suspended */}
        {[
          [120, 200],
          [480, 220],
          [180, 460],
          [430, 470],
          [80, 380],
          [510, 340],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`s-${i}`}
            cx={cx}
            cy={cy}
            r="1.2"
            fill="#F2C3CE"
            opacity="0.35"
            animate={
              active && !reduce
                ? { opacity: [0.1, 0.5, 0.1] }
                : undefined
            }
            transition={
              active && !reduce
                ? { duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }
                : undefined
            }
          />
        ))}
      </svg>
    </div>
  );
}

function CosmicBreathCanvas({
  active,
}: {
  active: boolean;
  intensity: number;
}) {
  const reduce = useReducedMotion();
  const ringCount = 10;

  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 600 600"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <radialGradient id="cb-core-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F2C3CE" stopOpacity="0.55" />
            <stop offset="40%" stopColor="#B05E76" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#B05E76" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cb-flare" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#F2C3CE" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F2C3CE" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="600" height="600" fill="url(#cb-core-bg)" />

        {/* Concentric breathing rings */}
        {Array.from({ length: ringCount }).map((_, i) => {
          const r = 40 + i * 25;
          return (
            <motion.circle
              key={i}
              cx="300"
              cy="300"
              r={r}
              fill="none"
              stroke="#F2C3CE"
              strokeOpacity={Math.max(0.05, 0.55 - i * 0.05)}
              strokeWidth="0.6"
              animate={
                active && !reduce
                  ? {
                      scale: [1, 1.18, 1],
                      opacity: [0.4, 0.85, 0.4],
                    }
                  : undefined
              }
              transition={
                active && !reduce
                  ? {
                      duration: 8,
                      repeat: Infinity,
                      delay: i * 0.18,
                      ease: "easeInOut",
                    }
                  : undefined
              }
              style={{ transformOrigin: "300px 300px" }}
            />
          );
        })}

        {/* Core flare */}
        <motion.circle
          cx="300"
          cy="300"
          r="64"
          fill="url(#cb-flare)"
          animate={
            active && !reduce
              ? { scale: [1, 1.22, 1], opacity: [0.75, 1, 0.75] }
              : undefined
          }
          transition={
            active && !reduce
              ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
          style={{ transformOrigin: "300px 300px" }}
        />

        {/* Hot center point */}
        <circle cx="300" cy="300" r="4" fill="#FFFFFF" opacity="0.9" />

        {/* Drifting "stars" */}
        {[
          [90, 90, 0.8],
          [520, 110, 0.7],
          [550, 480, 0.5],
          [70, 510, 0.6],
          [200, 70, 0.4],
          [480, 540, 0.6],
        ].map(([cx, cy, op], i) => (
          <motion.circle
            key={`star-${i}`}
            cx={cx as number}
            cy={cy as number}
            r="1.4"
            fill="#FFFFFF"
            opacity={op as number}
            animate={
              active && !reduce
                ? { opacity: [(op as number) * 0.3, op as number, (op as number) * 0.3] }
                : undefined
            }
            transition={
              active && !reduce
                ? { duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }
                : undefined
            }
          />
        ))}
      </svg>
    </div>
  );
}

function AxisCanvas({ active }: { active: boolean; intensity: number }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 600 600"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <radialGradient id="ax-glow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#D77E91" stopOpacity="0.32" />
            <stop offset="60%" stopColor="#D77E91" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#D77E91" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="600" height="600" fill="url(#ax-glow)" />

        {/* Soft grid suggestion */}
        {[180, 300, 420].map((g) => (
          <line
            key={`gv-${g}`}
            x1={g}
            x2={g}
            y1="100"
            y2="500"
            stroke="#F2C3CE"
            strokeOpacity="0.05"
            strokeWidth="0.8"
          />
        ))}
        {[180, 300, 420].map((g) => (
          <line
            key={`gh-${g}`}
            y1={g}
            y2={g}
            x1="100"
            x2="500"
            stroke="#F2C3CE"
            strokeOpacity="0.05"
            strokeWidth="0.8"
          />
        ))}

        {/* Orbits */}
        <ellipse
          cx="300"
          cy="300"
          rx="220"
          ry="115"
          fill="none"
          stroke="#F2C3CE"
          strokeOpacity="0.32"
          strokeWidth="0.9"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="115"
          ry="220"
          fill="none"
          stroke="#F2C3CE"
          strokeOpacity="0.18"
          strokeWidth="0.9"
        />
        <circle
          cx="300"
          cy="300"
          r="80"
          fill="none"
          stroke="#F2C3CE"
          strokeOpacity="0.10"
          strokeWidth="0.8"
        />

        {/* Center point */}
        <circle cx="300" cy="300" r="4" fill="#D77E91" />
        <circle cx="300" cy="300" r="14" fill="none" stroke="#D77E91" strokeOpacity="0.45" />

        {/* Three orbiting bodies at different speeds and radii */}
        <motion.g
          animate={active && !reduce ? { rotate: 360 } : undefined}
          transition={
            active && !reduce
              ? { duration: 12, repeat: Infinity, ease: "linear" }
              : undefined
          }
          style={{ transformOrigin: "300px 300px" }}
        >
          <circle cx="520" cy="300" r="6" fill="#F2C3CE" />
          <circle cx="520" cy="300" r="14" fill="none" stroke="#F2C3CE" strokeOpacity="0.45" />
        </motion.g>

        <motion.g
          animate={active && !reduce ? { rotate: -360 } : undefined}
          transition={
            active && !reduce
              ? { duration: 18, repeat: Infinity, ease: "linear" }
              : undefined
          }
          style={{ transformOrigin: "300px 300px" }}
        >
          <circle cx="300" cy="80" r="4" fill="#E5A6B5" opacity="0.85" />
        </motion.g>

        <motion.g
          animate={active && !reduce ? { rotate: 360 } : undefined}
          transition={
            active && !reduce
              ? { duration: 22, repeat: Infinity, ease: "linear" }
              : undefined
          }
          style={{ transformOrigin: "300px 300px" }}
        >
          <circle cx="220" cy="380" r="3" fill="#FFFFFF" opacity="0.6" />
        </motion.g>
      </svg>
    </div>
  );
}
