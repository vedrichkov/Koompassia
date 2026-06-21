"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { AppStoreBadge, Button } from "@/components/primitives/Button";
import { Pill } from "@/components/primitives/Pill";
import { DeviceMockup } from "@/components/device/DeviceMockup";
import { IconWatch, IconShield, IconCompass } from "@/lib/icons";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-24 md:pb-32">
      {/* Drifting decorative orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-30%] top-[-15%] h-[400px] w-[400px] rounded-full md:right-[-12%] md:top-[-12%] md:h-[640px] md:w-[640px]"
        style={{
          background:
            "radial-gradient(circle, rgba(242,195,206,0.55), rgba(215,126,145,0.18) 45%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={reduce ? undefined : { x: [0, 18, 0], y: [0, -14, 0] }}
        transition={reduce ? undefined : { duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[-30%] bottom-[10%] h-[280px] w-[280px] rounded-full md:left-[-8%] md:h-[420px] md:w-[420px]"
        style={{
          background:
            "radial-gradient(circle, rgba(176,94,118,0.18), transparent 65%)",
          filter: "blur(40px)",
        }}
        animate={reduce ? undefined : { x: [0, -16, 0], y: [0, 12, 0] }}
        transition={reduce ? undefined : { duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="shell relative grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
        <div>
          <Reveal delay={0.05}>
            <Eyebrow>Nervous system intelligence</Eyebrow>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="serif mt-5 text-[clamp(36px,6.4vw,76px)] font-medium leading-[1.05] tracking-tighter2 text-balance">
              Meet the calm <em className="italic">beneath the noise.</em>
            </h1>
          </Reveal>

          <Reveal delay={0.28}>
            <p className="mt-6 max-w-[36ch] text-[17px] leading-relaxed text-ink-soft text-pretty md:mt-7 md:text-[18px]">
              A few quiet minutes a day, guided by science and shaped to you.
              Understand your system, steady your focus, build discipline from the inside.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-9">
              <AppStoreBadge />
              <Button variant="ghost-light" href="#how">
                How it works
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-6 flex flex-wrap items-center gap-2 md:mt-7">
              <Pill icon={<IconWatch size={14} />}>iPhone + Apple Watch</Pill>
              <Pill icon={<IconShield size={14} />}>Private by design</Pill>
              <Pill icon={<IconCompass size={14} />}>Adaptive guidance</Pill>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative">
          <DeviceMockup parallax />
        </Reveal>
      </div>
    </section>
  );
}
