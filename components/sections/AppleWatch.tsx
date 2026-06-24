"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { MiniRow } from "@/components/cards/MiniRow";
import { IconCalendar, IconHeart, IconWalk } from "@/lib/icons";

export function AppleWatch() {
  return (
    <section id="watch" className="relative py-24 md:py-32">
      <div className="shell">
        <div className="grid items-stretch gap-6 md:grid-cols-[1.05fr_0.95fr]">
          {/* Left, the message — now committed to dark to stay coherent with the
              watch face panel and to set up Act III as fully interior. */}
          <Reveal
            as="div"
            className="dark-card-lit relative overflow-hidden rounded-3xl border border-bark-deep/40 p-10 text-paper md:p-12"
          >
            <Eyebrow index="04">
              <span className="text-amber-soft">On the wrist</span>
            </Eyebrow>
            <h2 className="serif mt-5 text-[clamp(28px,3.4vw,40px)] font-medium leading-[1.1] tracking-tighter2 text-balance text-paper">
              Regulation that follows your body.
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-paper/72 text-pretty">
              The Apple Watch app is free for everyone. A glance, a haptic, a breath, the
              smallest possible footprint between you and the next right move.
            </p>
            <div className="mt-9 space-y-7">
              <MiniRow
                tone="dark"
                icon={<IconCalendar />}
                label="Next Moment"
                sub="A calendar-aware, full-screen reset that arrives before the meeting, not after it."
              />
              <MiniRow
                tone="dark"
                icon={<IconHeart />}
                label="Breathe and biofeedback"
                sub="Haptic presets and heart-rate-guided breathing, ready on your wrist."
              />
              <MiniRow
                tone="dark"
                icon={<IconWalk />}
                label="Walk and score"
                sub="A GPS walk synced with your NRS, so you can see what a slower mile does to you."
              />
            </div>
          </Reveal>

          {/* Right, watch face panel */}
          <Reveal as="div" delay={0.1}
            className="dark-card-lit--cta relative overflow-hidden rounded-3xl border border-bark-deep/40 p-10 text-paper md:p-12"
            >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-[340px] w-[340px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(242,195,206,0.32), transparent 65%)",
                filter: "blur(36px)",
              }}
            />

            <Eyebrow><span className="text-amber-soft">Watch face</span></Eyebrow>
            <p className="serif mt-5 text-[22px] font-medium italic leading-snug tracking-tightish text-paper/85">
              Breathe with me.
            </p>

            {/* Watch face mock */}
            <div className="mt-10 flex justify-center">
              <WatchFace />
            </div>

            <p className="mt-10 text-center text-[13px] text-paper/55">
              Free with the iPhone app. Pairs in a single tap.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WatchFace() {
  const reduce = useReducedMotion();
  return (
    <div
      className="relative aspect-square w-[230px] rounded-[44px] p-[3px]"
      style={{
        background:
          "linear-gradient(160deg, #3a2a2e, #1d1316 60%, #0f0809)",
        boxShadow: "0 30px 70px -20px rgba(0,0,0,0.6)",
      }}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[40px]"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(242,195,206,0.32), rgba(43,33,34,0.95) 65%)",
        }}
      >
        {/* Time-of-day ambient color drift */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          animate={
            reduce
              ? undefined
              : {
                  background: [
                    "radial-gradient(circle at 50% 40%, rgba(242,195,206,0.32), rgba(43,33,34,0.95) 65%)",
                    "radial-gradient(circle at 50% 40%, rgba(215,126,145,0.34), rgba(43,33,34,0.95) 65%)",
                    "radial-gradient(circle at 50% 40%, rgba(229,166,181,0.30), rgba(43,33,34,0.95) 65%)",
                    "radial-gradient(circle at 50% 40%, rgba(242,195,206,0.32), rgba(43,33,34,0.95) 65%)",
                  ],
                }
          }
          transition={reduce ? undefined : { duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        <svg
          viewBox="0 0 220 220"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          {/* 60 dial ticks, hairline */}
          {Array.from({ length: 60 }).map((_, i) => {
            const angle = (i * 6) - 90;
            const rad = (angle * Math.PI) / 180;
            const r1 = i % 5 === 0 ? 92 : 96;
            const r2 = 100;
            const x1 = 110 + Math.cos(rad) * r1;
            const y1 = 110 + Math.sin(rad) * r1;
            const x2 = 110 + Math.cos(rad) * r2;
            const y2 = 110 + Math.sin(rad) * r2;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#F2C3CE"
                strokeOpacity={i % 5 === 0 ? 0.45 : 0.16}
                strokeWidth={i % 5 === 0 ? 1 : 0.7}
              />
            );
          })}

          {/* Breath ring — outer */}
          <motion.circle
            cx="110"
            cy="110"
            r="70"
            fill="none"
            stroke="#F2C3CE"
            strokeOpacity="0.5"
            strokeWidth="1.2"
            animate={reduce ? undefined : { scale: [1, 1.09, 1], opacity: [0.4, 0.85, 0.4] }}
            transition={reduce ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "110px 110px" }}
          />

          {/* Inner breath ring */}
          <motion.circle
            cx="110"
            cy="110"
            r="48"
            fill="none"
            stroke="#F2C3CE"
            strokeOpacity="0.7"
            strokeWidth="1"
            animate={reduce ? undefined : { scale: [1, 1.06, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={reduce ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            style={{ transformOrigin: "110px 110px" }}
          />

          {/* Heartbeat tick line */}
          <g transform="translate(60 110)">
            <motion.path
              d="M 0 0 L 12 0 L 16 -10 L 22 18 L 28 -6 L 32 0 L 100 0"
              fill="none"
              stroke="#F2C3CE"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeOpacity="0.6"
              strokeDasharray="180"
              animate={reduce ? undefined : { strokeDashoffset: [180, -180] }}
              transition={reduce ? undefined : { duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </g>

          {/* Pulsing core */}
          <motion.circle
            cx="110"
            cy="110"
            r="10"
            fill="#F2C3CE"
            fillOpacity="0.85"
            animate={reduce ? undefined : { scale: [1, 0.85, 1.05, 1], opacity: [0.85, 1, 0.9, 0.85] }}
            transition={reduce ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "110px 110px" }}
          />
        </svg>

        <span className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.24em] text-amber-soft/80">
          Inhale
        </span>
      </div>
    </div>
  );
}
