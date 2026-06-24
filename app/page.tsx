import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { DemoPreview } from "@/components/sections/DemoPreview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { NervousSystemIntel } from "@/components/sections/NervousSystemIntel";
import { AdaptiveAtmosphere } from "@/components/sections/AdaptiveAtmosphere";
import { SensoryExperiences } from "@/components/sections/SensoryExperiences";
import { EmbodiedPractices } from "@/components/sections/EmbodiedPractices";
import { CloseTheLoop } from "@/components/sections/CloseTheLoop";
import { AppleWatch } from "@/components/sections/AppleWatch";
import { Science } from "@/components/sections/Science";
import { Privacy } from "@/components/sections/Privacy";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import {
  BreadcrumbsJsonLd,
  FAQJsonLd,
  MobileAppJsonLd,
} from "@/components/seo/JsonLd";
import { FAQ_ITEMS } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Koompassia, AI nervous system intelligence for iPhone and Apple Watch",
  description:
    "Meet the calm beneath the noise. Koompassia reads your HRV, sleep and behavior, then guides discipline with one daily Neural Regulation Score, adaptive coaching and immersive regulation experiences.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Koompassia, AI nervous system intelligence",
    description:
      "Meet the calm beneath the noise. Daily AI guidance shaped by your HRV, sleep, breathing and behavior. Free on iPhone and Apple Watch.",
    url: "/",
  },
};

/**
 * Page restructured into the four-act narrative spine.
 * The `data-act` attribute on each wrapper is the contract with the
 * ActDirector: as each act enters the viewport it tweens the ambient
 * canvas's uDarkness toward that act's target intensity.
 *
 *   Act I  — Surface       (light)              Your everyday + the score.
 *   Act II — Mechanism     (light, warming)     How it works on you.
 *   Act III — Interior     (DARK)               Inside the nervous system.
 *   Act IV — Resurface     (light)              Back to your life, equipped.
 */
export default function HomePage() {
  return (
    <>
      <div data-act="surface">
        <Hero />
        <DemoPreview />
        <HowItWorks />
        <NervousSystemIntel />
      </div>

      <div data-act="mechanism">
        <AdaptiveAtmosphere />
        <EmbodiedPractices />
      </div>

      <div data-act="interior">
        <SensoryExperiences />
        <AppleWatch />
      </div>

      <div data-act="resurface">
        <CloseTheLoop />
        <Science />
        <Privacy />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </div>

      <MobileAppJsonLd />
      <FAQJsonLd items={FAQ_ITEMS} />
      <BreadcrumbsJsonLd items={[{ name: "Home", href: "/" }]} />
    </>
  );
}
