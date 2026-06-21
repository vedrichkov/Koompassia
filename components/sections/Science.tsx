"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";

const areas = [
  "Autonomic regulation",
  "Behavioral psychology",
  "Vagal tone & breath science",
  "Recovery & sleep physiology",
  "Circadian rhythm research",
  "Somatic awareness",
  "Longitudinal self-tracking",
  "Identity-based behavior change",
];

export function Science() {
  const reduce = useReducedMotion();
  const loop = [...areas, ...areas];

  return (
    <section id="science" className="relative py-24 md:py-32">
      <div className="shell">
        <Reveal as="div" className="max-w-2xl">
          <Eyebrow index="06">The science</Eyebrow>
          <h2 className="serif mt-5 text-[clamp(28px,3.6vw,42px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
            Grounded in research. <em className="italic">Built for real life.</em>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft text-pretty">
            Neuroscience, autonomic regulation, behavioral psychology and recovery
            physiology. Every score and intervention is informed by how the nervous
            system actually works.
          </p>
        </Reveal>
      </div>

      {/* Marquee */}
      <div
        className="relative mt-16 overflow-hidden py-3"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
        aria-hidden
      >
        <motion.div
          className="flex w-max gap-3"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={
            reduce
              ? undefined
              : { duration: 36, repeat: Infinity, ease: "linear" }
          }
        >
          {loop.map((a, i) => (
            <span
              key={`${a}-${i}`}
              className="inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-line bg-paper/80 px-5 py-2.5 text-[14px] text-ink"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-clay/70" />
              {a}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="shell mt-16">
        <Reveal as="div" className="rounded-3xl border border-line bg-paper/60 p-8 shadow-soft md:p-10">
          <p className="text-[15px] leading-relaxed text-ink-soft text-pretty">
            Data alone tells you what happened. Koompassia tells you what it means, by
            combining sensor signals, behavioral context and temporal patterns into a
            layer of interpretation that turns numbers into understanding.
          </p>
          <p className="mt-4 text-[12.5px] leading-relaxed text-ink-faint text-pretty">
            Koompassia supports awareness, regulation and daily wellbeing. It is not a
            medical device and does not diagnose, treat or prevent disease. Scores
            represent patterns and guidance, not clinical assessments.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
