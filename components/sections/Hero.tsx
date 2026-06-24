"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { AppStoreBadge, Button } from "@/components/primitives/Button";
import { Pill } from "@/components/primitives/Pill";
import { DeviceMockup } from "@/components/device/DeviceMockup";
import { Magnetic } from "@/components/motion/Magnetic";
import { IconWatch, IconShield, IconCompass } from "@/lib/icons";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-24 md:pb-32">
      {/* Primary atmospheric light leak behind the device */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-30%] top-[-25%] h-[700px] w-[700px] rounded-full md:right-[-8%] md:top-[-15%] md:h-[1200px] md:w-[1200px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,245,240,0.88) 0%, rgba(242,195,206,0.42) 30%, rgba(215,126,145,0.12) 60%, transparent 80%)",
          filter: "blur(80px)",
        }}
        animate={reduce ? undefined : { x: [0, 16, 0], y: [0, -10, 0] }}
        transition={reduce ? undefined : { duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Deeper warm glow giving the device a shadow side */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[2%] top-[28%] hidden h-[460px] w-[460px] rounded-full md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(176,94,118,0.18), transparent 65%)",
          filter: "blur(60px)",
        }}
        animate={reduce ? undefined : { x: [0, -10, 0], y: [0, 14, 0] }}
        transition={reduce ? undefined : { duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Quiet counter-light bottom-left, keeps left column from going flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-8%] bottom-[8%] hidden h-[320px] w-[320px] rounded-full md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(176,94,118,0.10), transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      <div className="shell relative grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
        <div>
          <Reveal delay={0.05}>
            <Eyebrow>Nervous system intelligence</Eyebrow>
          </Reveal>

          <h1 className="serif mt-5 text-[clamp(36px,6.4vw,76px)] font-medium leading-[1.05] tracking-tighter2 text-balance">
            <WordStagger
              before="Meet the calm "
              afterPlain=""
              italic="beneath the noise."
              startDelay={0.18}
            />
          </h1>

          <Reveal delay={0.28}>
            <p className="mt-6 max-w-[36ch] text-[17px] leading-relaxed text-ink-soft text-pretty md:mt-7 md:text-[18px]">
              A few quiet minutes a day, guided by science and shaped to you.
              Understand your system, steady your focus, build discipline from the inside.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-9">
              <Magnetic strength={8}>
                <AppStoreBadge />
              </Magnetic>
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

        <Reveal delay={0.2} from="right" className="relative">
          <DeviceMockup parallax />
        </Reveal>
      </div>
    </section>
  );
}

function WordStagger({
  before,
  italic,
  afterPlain,
  startDelay = 0,
  step = 0.07,
}: {
  before: string;
  italic: string;
  afterPlain: string;
  startDelay?: number;
  step?: number;
}) {
  const plain = before.split(/(\s+)/).filter((s) => s.length);
  const italicWords = italic.split(/(\s+)/).filter((s) => s.length);
  let i = 0;
  const renderWords = (tokens: string[], em: boolean) =>
    tokens.map((tok, k) => {
      if (/^\s+$/.test(tok)) return <span key={`s-${k}-${tok}`}>{tok}</span>;
      const delay = startDelay + i * step;
      i += 1;
      const node = (
        <span
          key={`w-${k}-${tok}`}
          className="reveal-word inline-block"
          style={{ animationDelay: `${delay}s` }}
        >
          {tok}
        </span>
      );
      return em ? <em className="italic" key={`em-${k}-${tok}`}>{node}</em> : node;
    });
  return (
    <>
      {renderWords(plain, false)}
      {renderWords(italicWords, true)}
      {afterPlain ? <span>{afterPlain}</span> : null}
    </>
  );
}
