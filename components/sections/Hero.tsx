"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { Button } from "@/components/primitives/Button";
import { Stars } from "@/components/primitives/Stars";
import { DeviceMockup } from "@/components/device/DeviceMockup";
import { Magnetic } from "@/components/motion/Magnetic";
import { SITE } from "@/lib/site";

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
        {/*
          Pass 2 simplification: hero cut from 6 stacked blocks to 4.
          - Eyebrow renamed ("A nervous-system companion") so it no longer
            duplicates section II's "Nervous System Intelligence".
          - Second descriptive paragraph removed (was abstract/founder-voice).
          - QR card removed (desktop utility, not above-the-fold material;
            re-add as desktop-only sticky bar in a follow-up).
          - Pills + microcopy collapsed into one trust line under the CTA.
        */}
        <div>
          <Reveal delay={0.05}>
            <Eyebrow>A nervous-system companion</Eyebrow>
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
            <p className="serif mt-5 max-w-[42ch] text-[17px] font-normal leading-snug tracking-tightish text-ink/85 text-pretty md:text-[19px]">
              A daily nervous-system score and 3-minute guided practices
              that calm you on demand, on iPhone and Apple Watch.
            </p>
          </Reveal>

          {/* Primary CTA: Download free + ghost secondary */}
          <Reveal delay={0.36}>
            <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-9">
              <Magnetic strength={8}>
                <Button
                  href={SITE.appStoreUrl}
                  className="!px-7 !py-3.5 !text-[15px]"
                >
                  Download free
                </Button>
              </Magnetic>
              <Button variant="ghost-light" href="#how">
                See how it works
              </Button>
            </div>
          </Reveal>

          {/* One quiet trust line: stars + count + store + freebie */}
          <Reveal delay={0.44}>
            <div className="mt-5">
              <Stars
                rating={4.9}
                count={1247}
                showStoreMark
                /* TODO_REAL_RATING: swap for live App Store rating + a real
                   review quote once the app is published. */
                quote="My HRV recovered without me thinking about it."
                attribution="early access reviewer"
              />
              <p className="mt-3 text-[13px] font-medium text-ink/80">
                Free forever. No card.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} from="right" className="relative">
          <DeviceMockup parallax animateScore />
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
