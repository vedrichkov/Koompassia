"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { FAQ_ITEMS as items } from "@/lib/faq";
import { cn } from "@/lib/cn";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="shell max-w-4xl">
        <Reveal as="div">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="serif mt-5 text-[clamp(28px,3.6vw,42px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
            What you might be <em className="italic">wondering.</em>
          </h2>
        </Reveal>

        <Reveal as="div" delay={0.08} className="mt-12">
          <ul className="overflow-hidden rounded-3xl border border-line bg-paper shadow-soft">
            {items.map((it, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={it.q}
                  className={cn("border-b border-line-soft last:border-b-0")}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-6 px-7 py-6 text-left transition-colors duration-300 hover:bg-cream-2/30"
                  >
                    <span className="serif text-[18px] font-medium leading-snug tracking-tightish text-ink">
                      {it.q}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-soft bg-cream-2/40 text-clay transition-transform duration-500",
                        isOpen ? "rotate-45" : "rotate-0",
                      )}
                    >
                      <span className="absolute h-3 w-px bg-clay" />
                      <span className="absolute h-px w-3 bg-clay" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={reduce ? undefined : { height: 0, opacity: 0 }}
                        animate={reduce ? undefined : { height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-7 pb-7 pt-0">
                          <p className="max-w-prose text-[15px] leading-relaxed text-ink-soft text-pretty">
                            {it.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
