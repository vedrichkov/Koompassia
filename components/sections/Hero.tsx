"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { Button } from "@/components/primitives/Button";
import { Pill } from "@/components/primitives/Pill";
import { Stars } from "@/components/primitives/Stars";
import { DeviceMockup } from "@/components/device/DeviceMockup";
import { Magnetic } from "@/components/motion/Magnetic";
import { HandoffQR } from "@/components/hero/HandoffQR";
import { SITE } from "@/lib/site";
import { IconShield, IconWatch } from "@/lib/icons";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-24 md:pb-28">
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

          <h1 className="serif mt-5 text-[clamp(36px,6.4vw,72px)] font-medium leading-[1.05] tracking-tighter2 text-balance">
            <WordStagger
              before="Meet the calm "
              afterPlain=""
              italic="beneath the noise."
              startDelay={0.18}
            />
          </h1>

          {/* Plain-language subhead — what the product actually does */}
          <Reveal delay={0.26}>
            <p className="serif mt-5 max-w-[40ch] text-[17px] font-normal leading-snug tracking-tightish text-ink/85 text-pretty md:text-[19px]">
              A daily nervous-system score and 3-minute guided practices that
              calm you on demand, on iPhone and Apple Watch.
            </p>
          </Reveal>

          {/* Brand voice line, kept secondary */}
          <Reveal delay={0.34}>
            <p className="mt-4 max-w-[40ch] text-[14.5px] leading-relaxed text-ink-soft text-pretty">
              Understand your system, steady your focus, build discipline from
              the inside.
            </p>
          </Reveal>

          {/* Primary CTA cluster: Download free, microcopy, ratings */}
          <Reveal delay={0.44}>
            <div className="mt-7 flex flex-wrap items-center gap-3 md:mt-8">
              <Magnetic strength={8}>
                <Button href={SITE.appStoreUrl} className="!px-7 !py-3.5 !text-[15px]">
                  Download free
                </Button>
              </Magnetic>
              <Button variant="ghost-light" href="#how">
                See how it works
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-ink-faint">
              <span className="font-medium text-ink/80">Free forever. No card.</span>
              {/* TODO_REAL_RATING: replace 4.9 / 1247 with live App Store numbers
                  once the app is published and reviewed. */}
              <Stars rating={4.9} count={1247} />
            </div>
          </Reveal>

          {/* Trust pills — single row above the fold */}
          <Reveal delay={0.58}>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Pill icon={<IconWatch size={14} />}>iPhone + Apple Watch</Pill>
              <Pill icon={<IconShield size={14} />}>Private, on-device</Pill>
            </div>
          </Reveal>

          {/* Desktop QR for desktop→mobile handoff */}
          <Reveal delay={0.66}>
            <div className="mt-7">
              <HandoffQR />
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
