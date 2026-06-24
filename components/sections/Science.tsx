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

/**
 * Science — editorial, still treatment. The previous horizontal marquee was
 * tonally generic; this version uses a quiet 4-column grid of disciplines in
 * small-caps. Reserve motion for feeling; let the facts sit still.
 *
 * TODO_REAL_CITATIONS: replace the mechanisms paragraph with named studies
 * (HRV + paced breathing — Lehrer; vagal tone — Porges; identity-based
 * behavior change — Clear / Stanford BJ Fogg). Until then this is positioned
 * as "evidence-informed" rather than evidence-based to avoid a credibility
 * vacuum.
 */
export function Science() {
  return (
    <section id="science" className="relative py-24 md:py-32">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-[0.95fr_1.05fr] md:gap-16">
          <Reveal as="div">
            <Eyebrow index="03">The science</Eyebrow>
            <h2 className="serif mt-5 text-[clamp(28px,3.6vw,42px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
              Grounded in research. <em className="italic">Built for real life.</em>
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-soft text-pretty">
              Koompassia is evidence-informed. The Neural Regulation Score and the
              regulation moves are built on accepted mechanisms in heart-rate
              variability, paced breathing, vagal tone, recovery physiology and
              identity-based behavior change.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft text-pretty">
              Data alone tells you what happened. Koompassia tells you what it
              means, by combining sensor signals, behavioral context and temporal
              patterns into a layer of interpretation that turns numbers into
              understanding.
            </p>
          </Reveal>

          <Reveal as="div" delay={0.12}>
            <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line/60 shadow-soft sm:grid-cols-2">
              {areas.map((a) => (
                <li key={a} className="bg-paper/80 px-5 py-4 backdrop-blur-sm">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-clay/80" style={{ fontVariant: "small-caps" }}>
                    {a}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[12px] leading-relaxed text-ink-faint text-pretty">
              Koompassia supports awareness, regulation and daily wellbeing. It is
              not a medical device and does not diagnose, treat or prevent disease.
              Scores represent patterns and guidance, not clinical assessments.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
