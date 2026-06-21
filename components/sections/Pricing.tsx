import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { PricingTier } from "@/components/cards/PricingTier";

const tiers = [
  {
    name: "Free",
    price: "$0",
    priceSub: "forever",
    pitch: "Core regulation tools to start building awareness.",
    features: [
      "Daily Anchor and Affirmation",
      "Basic regulation insights",
      "Single active Track",
      "Emotional Body Scan",
      "Guided breathing sessions",
    ],
    cta: { href: "https://apps.apple.com/", label: "Download the app" },
  },
  {
    name: "Monthly",
    price: "$9.99",
    priceSub: "/ month",
    pitch: "Full premium access. Flexible monthly billing.",
    features: [
      "Neural Regulation Score",
      "Advanced regulation insights",
      "Multiple active Tracks",
      "Nervous System Digital Twin",
      "Pattern Intelligence",
      "Apple Watch integration",
    ],
    cta: { href: "https://apps.apple.com/", label: "Go premium" },
    footnote: "Cancel anytime.",
  },
  {
    name: "Yearly",
    price: "$69",
    priceSub: "/ year",
    pitch: "Save over 40% vs. monthly. The full experience at the best price.",
    features: [
      "Everything in monthly",
      "Two months free",
      "Priority access to new features",
      "Long-form pattern reports",
    ],
    cta: { href: "https://apps.apple.com/", label: "Best value" },
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
            Invest in your <em className="italic">nervous system intelligence.</em>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft text-pretty">
            A free core experience. Premium opens the deeper intelligence.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal as="div" key={t.name} delay={i * 0.08} className="h-full">
              <PricingTier {...t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
