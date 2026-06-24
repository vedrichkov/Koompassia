import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { PricingTier } from "@/components/cards/PricingTier";
import { SITE } from "@/lib/site";

const tiers = [
  {
    name: "Free",
    price: "$0",
    priceSub: "forever, no card",
    pitch:
      "The daily loop, on the house. Build the habit before you spend anything.",
    features: [
      "Daily Anchor + Affirmation",
      "Guided breathing sessions",
      "Emotional Body Scan",
      "One active Track",
      "Apple Watch app included",
    ],
    cta: { href: SITE.appStoreUrl, label: "Download free" },
    footnote: "No trial. No card. Free forever.",
  },
  {
    name: "Monthly",
    price: "$9.99",
    priceSub: "/ month",
    pitch: "Full intelligence, billed month to month. Cancel anytime.",
    features: [
      "Neural Regulation Score",
      "Pattern Intelligence",
      "Nervous System Digital Twin",
      "Multiple active Tracks",
      "Advanced regulation insights",
    ],
    cta: { href: SITE.appStoreUrl, label: "Go monthly" },
    footnote: "Cancel anytime.",
  },
  {
    name: "Yearly",
    price: "$69",
    // Explicit savings + per-month math per the Phase 3 brief.
    priceSub: "/ year · $5.75 / mo · save 42%",
    pitch:
      "Same intelligence, the lowest price. Two months free vs. monthly.",
    features: [
      "Everything in Monthly",
      "Two months free",
      "Long-form pattern reports",
      "Priority access to new Tracks",
    ],
    cta: { href: SITE.appStoreUrl, label: "Save 42%" },
    variant: "featured" as const,
    footnote: "Prices may vary by region.",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="shell">
        <Reveal as="div" className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Pricing</Eyebrow>
          <h2 className="serif mt-5 text-[clamp(28px,3.6vw,42px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
            Free forever. <em className="italic">Premium when you're ready.</em>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft text-pretty">
            The full daily loop is free, no card. Premium opens the deeper
            intelligence: the Score, the patterns, the long-form path.
          </p>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 pt-6 md:grid-cols-3 md:gap-7 md:pt-10">
          {tiers.map((t, i) => (
            <Reveal as="div" key={t.name} delay={i * 0.08} className="flex h-full">
              <PricingTier {...t} className="flex-1" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
