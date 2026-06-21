"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { cn } from "@/lib/cn";

const steps = [
  {
    n: "01",
    title: "Sense your state",
    body: "Sensor data, body signals and your reflections, woven into a real-time read of how your system is regulating.",
  },
  {
    n: "02",
    title: "Understand your patterns",
    body: "The intelligence layer finds the timing, habits and rhythms behind your steadiest days. It learns what your body already knows.",
  },
  {
    n: "03",
    title: "Receive adaptive guidance",
    body: "The AI coaching adjusts tone, timing and recommendations to your state, so each prompt arrives ready to land.",
  },
  {
    n: "04",
    title: "Build steadiness over time",
    body: "Every action loops back into a living model. Discipline strengthens because it grows from understanding, not force.",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how" className="relative py-24 md:py-32">
      <div className="shell">
        <div className="max-w-2xl">
          <Eyebrow index="01">How it works</Eyebrow>
          <h2 className="serif mt-5 text-[clamp(28px,3.6vw,42px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
            Intelligence that <em className="italic">adapts to you.</em>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft text-pretty">
            Not a system to push through. A loop that learns you, then meets you where you are.
          </p>
        </div>

        <div
          ref={ref}
          className="relative mt-16 grid gap-12 md:grid-cols-[180px_1fr] md:gap-20"
        >
          {/* Sticky step indicator */}
          <div className="hidden md:block">
            <div className="sticky top-32">
              <div className="relative ml-4 h-[280px] w-[2px] overflow-hidden rounded-full bg-line">
                <motion.div
                  className="absolute inset-x-0 top-0 rounded-full bg-clay/80"
                  style={{ height: reduce ? "100%" : progressHeight }}
                />
              </div>
              <div className="mt-6 text-[11px] font-semibold uppercase tracking-eyebrow text-amber">
                Living loop
              </div>
            </div>
          </div>

          <ol className="relative space-y-6 md:space-y-10">
            {steps.map((step, i) => (
              <Step key={step.n} step={step} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({
  step,
  index,
}: {
  step: { n: string; title: string; body: string };
  index: number;
}) {
  return (
    <li
      className={cn(
        "reveal group relative overflow-hidden rounded-3xl border border-line bg-paper p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift md:p-10",
      )}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="flex items-start gap-6">
        <span className="serif text-[34px] font-medium leading-none tracking-[-0.04em] text-clay/70 tabular-nums">
          {step.n}
        </span>
        <div>
          <h3 className="serif text-[24px] font-medium leading-[1.15] tracking-tightish text-ink">
            {step.title}
          </h3>
          <p className="mt-3 max-w-prose text-[15.5px] leading-relaxed text-ink-soft text-pretty">
            {step.body}
          </p>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-amber/0 via-amber/60 to-amber/0 transition-transform duration-700 ease-out group-hover:scale-x-100"
      />
    </li>
  );
}
