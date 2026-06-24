"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { TRIGGER } from "@/lib/motion-tokens";
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
  const pinRef = useRef<HTMLDivElement>(null);
  const overallRailRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [stageIdx, setStageIdx] = useState<0 | 1 | 2>(0);
  const [stageProgress, setStageProgress] = useState(0);

  // GSAP ScrollTrigger pins the stage for ~3 viewports of scroll and scrubs
  // a timeline that derives the active experience index and per-stage
  // progress from scroll position. scrub:1 catches the score-style number
  // motion smoothing per the guideline.
  useEffect(() => {
    if (reduce) return;
    const section = stageRef.current;
    const pinned = pinRef.current;
    if (!section || !pinned) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: pinned,
        pinSpacing: false,
        scrub: TRIGGER.scrub,
        onUpdate: (self) => {
          const p = self.progress;
          setStageIdx((p < 0.34 ? 0 : p < 0.67 ? 1 : 2) as 0 | 1 | 2);
          const local =
            p < 0.34 ? p / 0.34 : p < 0.67 ? (p - 0.34) / 0.33 : (p - 0.67) / 0.33;
          setStageProgress(Math.max(0, Math.min(1, local)));
          if (overallRailRef.current) {
            gsap.set(overallRailRef.current, { scaleX: p });
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduce]);

  const current = experiences[stageIdx];

  // Reduced-motion fallback: 3 static stacked panels, no pin, no crossfade.
  // Hard constraint from the motion guideline.
  if (reduce) {
    return <ReducedMotionStack />;
  }

  return (
    <div
      ref={stageRef}
      className="relative h-[300vh] md:h-[400vh]"
      aria-label="Three immersive regulation experiences, switched by scroll."
    >
      <div ref={pinRef} className="h-screen overflow-hidden">
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

          {/* Top progress hairline — scaleX driven by ScrollTrigger */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px]">
            <div className="h-full w-full bg-white/[0.06]" />
            <div
              ref={overallRailRef}
              className="absolute inset-y-0 left-0 origin-left"
              style={{
                width: "100%",
                background:
                  "linear-gradient(90deg, transparent 0%, #F2C3CE 40%, #B05E76 100%)",
                transform: reduce ? "scaleX(1)" : "scaleX(0)",
                willChange: "transform",
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

                {/* Text content — single block keyed to stageIdx so only one
                    label/heading/caption is ever in the DOM at once. mode="wait"
                    guarantees the exiting block finishes (opacity 0) before
                    the incoming block fades in: no co-rendered text overlap. */}
                <div className="relative mt-12 min-h-[320px] md:min-h-[300px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`stage-${stageIdx}`}
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      animate={reduce ? undefined : { opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -12 }}
                      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <p
                        className="text-[11px] font-semibold uppercase tracking-[0.32em]"
                        style={{ color: current.accent + "B3" }}
                      >
                        {current.axis}
                      </p>
                      <h3 className="serif mt-4 text-[clamp(38px,5vw,72px)] font-medium leading-[1.02] tracking-tighter2 text-balance text-paper">
                        {current.name}
                      </h3>
                      <p className="mt-6 max-w-[42ch] text-[16px] leading-relaxed text-paper/72 text-pretty md:text-[17px]">
                        {current.caption}
                      </p>
                    </motion.div>
                  </AnimatePresence>
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

/**
 * Reduced-motion fallback: three static stacked panels, no pin, no crossfade,
 * no continuous loops. Each panel renders with its `active=false` so the
 * canvases stay still. All three experiences are simultaneously legible.
 */
function ReducedMotionStack() {
  return (
    <div className="space-y-12 py-8">
      {experiences.map((e, i) => {
        const Canvas = e.Canvas;
        return (
          <div
            key={e.name}
            className="dark-card-lit relative overflow-hidden rounded-3xl border border-bark-deep/40"
            style={{ background: e.bg }}
          >
            <div className="grid items-center md:grid-cols-[1fr_1.4fr]">
              <div className="p-8 md:p-12">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.32em]"
                  style={{ color: e.accent + "B3" }}
                >
                  {String(i + 1).padStart(2, "0")} · {e.axis}
                </p>
                <h3 className="serif mt-3 text-[clamp(28px,3.4vw,42px)] font-medium leading-[1.1] tracking-tighter2 text-paper">
                  {e.name}
                </h3>
                <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-paper/72 text-pretty">
                  {e.caption}
                </p>
              </div>
              <div className="relative h-[40vh] overflow-hidden">
                <Canvas active={false} intensity={0} />
              </div>
            </div>
          </div>
        );
      })}
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
  const ripples = Array.from({ length: 8 });
  const sediment = [
    { x: 130, delay: 0, dur: 14 },
    { x: 230, delay: 5, dur: 16 },
    { x: 380, delay: 9, dur: 13 },
    { x: 470, delay: 2, dur: 18 },
    { x: 520, delay: 11, dur: 15 },
  ];
  const bubbles = [
    { x: 280, delay: 0, dur: 9 },
    { x: 310, delay: 4, dur: 11 },
    { x: 300, delay: 7, dur: 8 },
  ];

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
          <linearGradient id="sw-shaft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F2C3CE" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#F2C3CE" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#F2C3CE" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="sw-wave" x1="0" x2="1">
            <stop offset="0%" stopColor="#F2C3CE" stopOpacity="0" />
            <stop offset="50%" stopColor="#F2C3CE" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#F2C3CE" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Soft center glow */}
        <rect width="600" height="600" fill="url(#sw-glow)" />

        {/* Vertical light shaft from above */}
        <motion.rect
          x="240"
          y="0"
          width="120"
          height="330"
          fill="url(#sw-shaft)"
          animate={
            active && !reduce ? { opacity: [0.5, 1, 0.5], scaleX: [1, 1.08, 1] } : undefined
          }
          transition={
            active && !reduce ? { duration: 9, repeat: Infinity, ease: "easeInOut" } : undefined
          }
          style={{ transformOrigin: "300px 165px" }}
        />

        {/* Sediment drifting downward, slowly fading out */}
        {sediment.map((s, i) => (
          <motion.circle
            key={`sed-${i}`}
            cx={s.x}
            r="0.9"
            fill="#F2C3CE"
            initial={{ cy: -20, opacity: 0 }}
            animate={
              active && !reduce
                ? { cy: [-20, 620], opacity: [0, 0.35, 0.35, 0] }
                : undefined
            }
            transition={
              active && !reduce
                ? {
                    duration: s.dur,
                    delay: s.delay,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.1, 0.85, 1],
                  }
                : undefined
            }
          />
        ))}

        {/* Three softly undulating horizon lines */}
        {[324, 330, 336].map((y, i) => (
          <motion.line
            key={`wave-${i}`}
            x1="0"
            x2="600"
            y1={y}
            y2={y}
            stroke="url(#sw-wave)"
            strokeWidth="1"
            animate={
              active && !reduce
                ? { x1: [-30, 30, -30], opacity: [0.4, 0.9, 0.4] }
                : undefined
            }
            transition={
              active && !reduce
                ? {
                    duration: 8 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.6,
                  }
                : undefined
            }
          />
        ))}

        {/* Concentric ripples */}
        {ripples.map((_, i) => (
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
                    delay: i * 0.85,
                    ease: "easeOut",
                  }
                : undefined
            }
            style={{ transformOrigin: "300px 330px" }}
          />
        ))}

        {/* Rising bubbles from the impact point */}
        {bubbles.map((b, i) => (
          <motion.circle
            key={`bub-${i}`}
            cx={b.x}
            r="2.2"
            fill="none"
            stroke="#F2C3CE"
            strokeOpacity="0.6"
            strokeWidth="0.7"
            initial={{ cy: 330, opacity: 0, scale: 0.6 }}
            animate={
              active && !reduce
                ? { cy: [330, 80], opacity: [0, 0.7, 0], scale: [0.6, 1, 1.3] }
                : undefined
            }
            transition={
              active && !reduce
                ? {
                    duration: b.dur,
                    delay: b.delay,
                    repeat: Infinity,
                    ease: "easeOut",
                    times: [0, 0.4, 1],
                  }
                : undefined
            }
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
              ? { scale: [1, 0.7, 1.1, 0.9, 1], opacity: [0.85, 1, 0.85] }
              : undefined
          }
          transition={
            active && !reduce
              ? { duration: 7, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
          style={{ transformOrigin: "300px 330px" }}
        />

        {/* Faint specks suspended in the dark */}
        {[
          [120, 200],
          [480, 220],
          [180, 460],
          [430, 470],
          [80, 380],
          [510, 340],
          [60, 110],
          [550, 80],
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
                ? { opacity: [0.1, 0.55, 0.1] }
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
  const ringCount = 12;
  // Constellation: 7 stars with hand-picked positions, plus the connecting edges
  const stars = [
    [128, 138],
    [186, 92],
    [260, 168],
    [340, 102],
    [444, 156],
    [510, 232],
    [468, 322],
  ] as const;
  const edges: Array<[number, number]> = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [2, 5],
  ];
  // Spiral particles orbiting at three radii
  const spirals = [
    { r: 140, dur: 22, delay: 0 },
    { r: 200, dur: 30, delay: 3 },
    { r: 260, dur: 38, delay: 7 },
  ];
  // Shooting star paths
  const shooters = [
    { x: 30, y: 80, dx: 320, dy: 120, dur: 4, delay: 6 },
    { x: 540, y: 110, dx: -260, dy: 80, dur: 5, delay: 14 },
  ];

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
          <radialGradient id="cb-nebula" cx="30%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#E5A6B5" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#B05E76" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#B05E76" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cb-trail" x1="0" x2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* Background nebula, slowly rotating */}
        <motion.g
          animate={active && !reduce ? { rotate: 360 } : undefined}
          transition={
            active && !reduce
              ? { duration: 90, repeat: Infinity, ease: "linear" }
              : undefined
          }
          style={{ transformOrigin: "300px 300px" }}
        >
          <rect width="600" height="600" fill="url(#cb-nebula)" />
        </motion.g>

        <rect width="600" height="600" fill="url(#cb-core-bg)" />

        {/* Constellation edges — draw in via dasharray */}
        {edges.map(([a, b], i) => {
          const [x1, y1] = stars[a];
          const [x2, y2] = stars[b];
          return (
            <motion.line
              key={`edge-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#F2C3CE"
              strokeOpacity="0.5"
              strokeWidth="0.5"
              strokeDasharray="220"
              animate={
                active && !reduce
                  ? { strokeDashoffset: [220, 0, 0, 220], opacity: [0, 0.6, 0.6, 0] }
                  : undefined
              }
              transition={
                active && !reduce
                  ? {
                      duration: 10,
                      delay: 2 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.35, 0.65, 1],
                    }
                  : undefined
              }
            />
          );
        })}

        {/* Constellation stars */}
        {stars.map(([x, y], i) => (
          <motion.circle
            key={`con-${i}`}
            cx={x}
            cy={y}
            r="2.2"
            fill="#FFFFFF"
            opacity="0.8"
            animate={
              active && !reduce
                ? { opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }
                : undefined
            }
            transition={
              active && !reduce
                ? { duration: 4, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }
                : undefined
            }
            style={{ transformOrigin: `${x}px ${y}px` }}
          />
        ))}

        {/* Concentric breathing rings */}
        {Array.from({ length: ringCount }).map((_, i) => {
          const r = 35 + i * 22;
          return (
            <motion.circle
              key={i}
              cx="300"
              cy="300"
              r={r}
              fill="none"
              stroke="#F2C3CE"
              strokeOpacity={Math.max(0.04, 0.55 - i * 0.04)}
              strokeWidth="0.6"
              animate={
                active && !reduce
                  ? { scale: [1, 1.18, 1], opacity: [0.4, 0.85, 0.4] }
                  : undefined
              }
              transition={
                active && !reduce
                  ? { duration: 8, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }
                  : undefined
              }
              style={{ transformOrigin: "300px 300px" }}
            />
          );
        })}

        {/* Spiral particles orbiting at three radii */}
        {spirals.map((s, i) => (
          <motion.g
            key={`spiral-${i}`}
            animate={active && !reduce ? { rotate: 360 } : undefined}
            transition={
              active && !reduce
                ? { duration: s.dur, repeat: Infinity, ease: "linear", delay: s.delay }
                : undefined
            }
            style={{ transformOrigin: "300px 300px" }}
          >
            <circle cx={300 + s.r} cy="300" r="2" fill="#F2C3CE" opacity="0.85" />
            <circle cx={300 + s.r} cy="300" r="8" fill="none" stroke="#F2C3CE" strokeOpacity="0.25" />
          </motion.g>
        ))}

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

        {/* Shooting stars — translate diagonally with a fading trail */}
        {shooters.map((s, i) => (
          <motion.g
            key={`shoot-${i}`}
            animate={
              active && !reduce
                ? { x: [0, s.dx], y: [0, s.dy], opacity: [0, 1, 0] }
                : undefined
            }
            transition={
              active && !reduce
                ? {
                    duration: s.dur,
                    delay: s.delay,
                    repeat: Infinity,
                    repeatDelay: 12,
                    ease: "easeOut",
                    times: [0, 0.2, 1],
                  }
                : undefined
            }
          >
            <line
              x1={s.x}
              y1={s.y}
              x2={s.x - 40 * (s.dx > 0 ? 1 : -1)}
              y2={s.y - 14 * (s.dy > 0 ? 1 : -1)}
              stroke="url(#cb-trail)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle cx={s.x} cy={s.y} r="1.5" fill="#FFFFFF" />
          </motion.g>
        ))}

        {/* Particle field — slow-twinkling background stars */}
        {[
          [90, 90, 0.8],
          [520, 110, 0.7],
          [550, 480, 0.5],
          [70, 510, 0.6],
          [200, 70, 0.4],
          [480, 540, 0.6],
          [40, 280, 0.5],
          [560, 290, 0.45],
          [110, 410, 0.4],
          [560, 380, 0.5],
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

  // Field lines radiating from center every 30deg
  const fieldLines = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);
  // Five orbiting bodies on different orbits
  const bodies = [
    { rx: 220, ry: 115, ang: 0, dur: 14, dir: 1, r: 6, fill: "#F2C3CE", trailArc: 110 },
    { rx: 115, ry: 220, ang: 90, dur: 19, dir: -1, r: 4, fill: "#E5A6B5", trailArc: 80 },
    { rx: 180, ry: 180, ang: 45, dur: 24, dir: 1, r: 3, fill: "#FFFFFF", trailArc: 90 },
    { rx: 80, ry: 80, ang: 200, dur: 9, dir: -1, r: 2.5, fill: "#F2C3CE", trailArc: 60 },
    { rx: 270, ry: 60, ang: 130, dur: 30, dir: 1, r: 2, fill: "#D77E91", trailArc: 70 },
  ];

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
          <linearGradient id="ax-field" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F2C3CE" stopOpacity="0.0" />
            <stop offset="60%" stopColor="#F2C3CE" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#F2C3CE" stopOpacity="0" />
          </linearGradient>
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

        {/* Rotating crosshair guides — extremely slow */}
        <motion.g
          animate={active && !reduce ? { rotate: 360 } : undefined}
          transition={
            active && !reduce
              ? { duration: 90, repeat: Infinity, ease: "linear" }
              : undefined
          }
          style={{ transformOrigin: "300px 300px" }}
        >
          <line x1="100" y1="300" x2="500" y2="300" stroke="#F2C3CE" strokeOpacity="0.08" strokeWidth="0.6" />
          <line x1="300" y1="100" x2="300" y2="500" stroke="#F2C3CE" strokeOpacity="0.08" strokeWidth="0.6" />
        </motion.g>

        {/* Magnetic field lines emanating from center */}
        {fieldLines.map((deg, i) => (
          <motion.line
            key={`field-${i}`}
            x1="300"
            y1="300"
            x2="450"
            y2="300"
            stroke="url(#ax-field)"
            strokeWidth="0.6"
            style={{ transformOrigin: "300px 300px", transform: `rotate(${deg}deg)` }}
            animate={
              active && !reduce
                ? { opacity: [0.1, 0.5, 0.1] }
                : undefined
            }
            transition={
              active && !reduce
                ? { duration: 5, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }
                : undefined
            }
          />
        ))}

        {/* Four orbit guide lines */}
        <ellipse cx="300" cy="300" rx="220" ry="115" fill="none" stroke="#F2C3CE" strokeOpacity="0.32" strokeWidth="0.9" />
        <ellipse cx="300" cy="300" rx="115" ry="220" fill="none" stroke="#F2C3CE" strokeOpacity="0.18" strokeWidth="0.9" />
        <ellipse cx="300" cy="300" rx="180" ry="180" fill="none" stroke="#F2C3CE" strokeOpacity="0.10" strokeWidth="0.7" />
        <ellipse cx="300" cy="300" rx="270" ry="60" fill="none" stroke="#F2C3CE" strokeOpacity="0.10" strokeWidth="0.7" />
        <circle cx="300" cy="300" r="80" fill="none" stroke="#F2C3CE" strokeOpacity="0.10" strokeWidth="0.8" />

        {/* Center point with double pulsing reticle */}
        <circle cx="300" cy="300" r="4" fill="#D77E91" />
        <motion.circle
          cx="300"
          cy="300"
          r="14"
          fill="none"
          stroke="#D77E91"
          strokeOpacity="0.45"
          animate={active && !reduce ? { scale: [1, 1.25, 1] } : undefined}
          transition={
            active && !reduce
              ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
          style={{ transformOrigin: "300px 300px" }}
        />
        {/* Sonar ping */}
        <motion.circle
          cx="300"
          cy="300"
          r="14"
          fill="none"
          stroke="#D77E91"
          strokeWidth="0.6"
          initial={{ opacity: 0, scale: 1 }}
          animate={
            active && !reduce
              ? { opacity: [0.6, 0], scale: [1, 6] }
              : undefined
          }
          transition={
            active && !reduce
              ? { duration: 4, repeat: Infinity, ease: "easeOut" }
              : undefined
          }
          style={{ transformOrigin: "300px 300px" }}
        />

        {/* Orbiting bodies with motion trails */}
        {bodies.map((b, i) => {
          const trailEnd = b.ang - b.dir * b.trailArc;
          const trailPath = arcPath(b.rx, b.ry, b.ang, trailEnd, b.dir);
          return (
            <motion.g
              key={`body-${i}`}
              animate={
                active && !reduce
                  ? { rotate: b.dir * 360 }
                  : undefined
              }
              transition={
                active && !reduce
                  ? { duration: b.dur, repeat: Infinity, ease: "linear" }
                  : undefined
              }
              style={{ transformOrigin: "300px 300px" }}
            >
              {/* Trail */}
              <path d={trailPath} fill="none" stroke={b.fill} strokeOpacity="0.35" strokeWidth="1.2" strokeLinecap="round" />
              {/* Body */}
              <circle cx={300 + b.rx * Math.cos((b.ang * Math.PI) / 180)} cy={300 + b.ry * Math.sin((b.ang * Math.PI) / 180)} r={b.r} fill={b.fill} />
              {b.r >= 4 ? (
                <circle cx={300 + b.rx * Math.cos((b.ang * Math.PI) / 180)} cy={300 + b.ry * Math.sin((b.ang * Math.PI) / 180)} r={b.r + 6} fill="none" stroke={b.fill} strokeOpacity="0.4" />
              ) : null}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

/**
 * Build an SVG arc path from one angle to another on an ellipse.
 * Used to draw motion trails behind orbiting bodies.
 */
function arcPath(rx: number, ry: number, fromDeg: number, toDeg: number, dir: number) {
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const x1 = 300 + rx * Math.cos(rad(fromDeg));
  const y1 = 300 + ry * Math.sin(rad(fromDeg));
  const x2 = 300 + rx * Math.cos(rad(toDeg));
  const y2 = 300 + ry * Math.sin(rad(toDeg));
  const largeArc = Math.abs(fromDeg - toDeg) > 180 ? 1 : 0;
  const sweep = dir > 0 ? 0 : 1;
  return `M ${x2} ${y2} A ${rx} ${ry} 0 ${largeArc} ${sweep} ${x1} ${y1}`;
}
