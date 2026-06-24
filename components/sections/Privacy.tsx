"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { IconShield, IconArrow } from "@/lib/icons";

const pillars = [
  {
    k: "On device",
    v: "Most intelligence runs on your iPhone and Watch.",
    Glyph: DeviceGlyph,
  },
  {
    k: "Plain language",
    v: "We name each Health permission before we ask.",
    Glyph: LockGlyph,
  },
  {
    k: "Calendar",
    v: "Read titles and timing. Never the contents.",
    Glyph: CalendarGlyph,
  },
  {
    k: "Friends",
    v: "Opt-in, granular, unlink in a single tap.",
    Glyph: ToggleGlyph,
  },
];

export function Privacy() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="shell">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-paper p-10 shadow-soft md:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-[320px] w-[320px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(242,195,206,0.45), transparent 65%)",
              filter: "blur(28px)",
            }}
          />
          <div className="relative grid items-start gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <Reveal as="div">
              <Eyebrow>Privacy &amp; trust</Eyebrow>
              <h2 className="serif mt-5 text-[clamp(28px,3.4vw,40px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
                Your data serves you. <em className="italic">Only you.</em>
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-ink-soft text-pretty">
                Physiology and personal patterns, handled with care. Your information
                personalizes your experience. It is not sold or shared. Ever.
              </p>
              <Link
                href="/privacy"
                className="mt-7 inline-flex items-center gap-2 text-[14px] font-medium text-clay transition-colors hover:text-bark"
              >
                <IconShield size={16} />
                Read the privacy story
                <IconArrow size={14} />
              </Link>
            </Reveal>

            <Reveal as="ul" delay={0.1} className="grid gap-3 sm:grid-cols-2">
              {pillars.map((p, i) => {
                const Glyph = p.Glyph;
                return (
                  <li
                    key={p.k}
                    className="group relative overflow-hidden rounded-2xl border border-line-soft bg-cream-2/30 p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-clay/40"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-paper border border-line-soft">
                      <Glyph />
                    </div>
                    <p className="serif mt-4 text-[15px] font-medium text-clay/85 tracking-tightish">
                      {p.k}
                    </p>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft text-pretty">
                      {p.v}
                    </p>
                  </li>
                );
              })}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Privacy pillar glyphs ===== */

function DeviceGlyph() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      <rect x="14" y="8" width="20" height="32" rx="4" fill="none" stroke="#B05E76" strokeWidth="1.4" />
      <line x1="14" y1="14" x2="34" y2="14" stroke="#B05E76" strokeOpacity="0.4" />
      {/* Pulse inside the device */}
      <motion.circle
        cx="24"
        cy="26"
        r="3"
        fill="#B05E76"
        animate={reduce ? undefined : { scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
        transition={reduce ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "24px 26px" }}
      />
      <motion.circle
        cx="24"
        cy="26"
        r="6"
        fill="none"
        stroke="#B05E76"
        strokeOpacity="0.5"
        animate={reduce ? undefined : { scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
        transition={reduce ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        style={{ transformOrigin: "24px 26px" }}
      />
    </svg>
  );
}

function LockGlyph() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      <rect x="14" y="22" width="20" height="18" rx="3" fill="none" stroke="#B05E76" strokeWidth="1.4" />
      <motion.path
        d="M 18 22 L 18 16 a 6 6 0 0 1 12 0 L 30 22"
        fill="none"
        stroke="#B05E76"
        strokeWidth="1.4"
        animate={reduce ? undefined : { opacity: [0.7, 1, 0.7] }}
        transition={reduce ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="24"
        cy="31"
        r="2"
        fill="#B05E76"
        animate={reduce ? undefined : { scale: [1, 1.4, 1] }}
        transition={reduce ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "24px 31px" }}
      />
    </svg>
  );
}

function CalendarGlyph() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      <rect x="10" y="12" width="28" height="26" rx="3" fill="none" stroke="#B05E76" strokeWidth="1.4" />
      <line x1="10" y1="20" x2="38" y2="20" stroke="#B05E76" strokeWidth="1.4" />
      <line x1="18" y1="10" x2="18" y2="16" stroke="#B05E76" strokeWidth="1.4" />
      <line x1="30" y1="10" x2="30" y2="16" stroke="#B05E76" strokeWidth="1.4" />
      {/* Pulsing event dot */}
      <motion.circle
        cx="20"
        cy="28"
        r="2"
        fill="#B05E76"
        animate={reduce ? undefined : { scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
        transition={reduce ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "20px 28px" }}
      />
      <motion.circle
        cx="30"
        cy="32"
        r="2"
        fill="#B05E76"
        opacity="0.4"
        animate={reduce ? undefined : { opacity: [0.3, 0.7, 0.3] }}
        transition={reduce ? undefined : { duration: 3, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function ToggleGlyph() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      <rect x="8" y="18" width="32" height="14" rx="7" fill="none" stroke="#B05E76" strokeWidth="1.4" />
      <motion.circle
        cx="16"
        cy="25"
        r="4.5"
        fill="#B05E76"
        animate={reduce ? undefined : { cx: [16, 32, 16] }}
        transition={
          reduce
            ? undefined
            : { duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }
        }
      />
    </svg>
  );
}
