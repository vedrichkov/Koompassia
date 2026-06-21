import { Reveal } from "@/components/primitives/Reveal";
import { CTABand } from "@/components/cards/CTABand";

export function FinalCTA() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="shell">
        <Reveal as="div">
          <CTABand
            eyebrow="Begin"
            headline={
              <>
                Build a steadier mind.{" "}
                <em className="italic">A calmer system.</em>{" "}
                A stronger relationship with discipline.
              </>
            }
            sub="Where nervous system intelligence meets premium design. Discover what discipline feels like when it begins with understanding."
          />
        </Reveal>
      </div>
    </section>
  );
}
