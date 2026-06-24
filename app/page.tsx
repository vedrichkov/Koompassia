import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
// DemoPreview removed in Pass 2: the "Coming soon" placeholder was
// actively suppressing intent. Re-add once real screenshots and demo
// video land in /public.
// import { DemoPreview } from "@/components/sections/DemoPreview";
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
 * Pass 2 reorder (#11): proof + pricing pulled forward so the
 * convinced reader can convert before the poetic middle. The 4-act
 * narrative spine becomes:
 *
 *   Act I  — Surface  (light)            Your everyday + the score
 *   Act II — Decision (light, +warm)     Proof + price; convert here
 *   Act III — Interior (DARK)            The immersive stretch
 *   Act IV — Resurface (light)           Back to your life, equipped
 *
 * The `data-act` attribute is the contract with ActDirector: each act
 * tweens uDarkness to ACT_INTENSITY[act] as it enters viewport.
 *
 * Section numbering (I-VII) follows true narrative DOM order; interludes
 * (AdaptiveAtmosphere, Privacy, Pricing, FAQ, FinalCTA) carry
 * unnumbered eyebrows deliberately.
 */
export default function HomePage() {
  return (
    <>
      <div data-act="surface">
        <Hero />
        <HowItWorks />
        <NervousSystemIntel />
      </div>

      <div data-act="decision">
        <Science />
        <Pricing />
      </div>

      {/* Mechanism act: AdaptiveAtmosphere + Sensory + EmbodiedPractices
          all use the standard cream theme, so the ambient stays warm/light
          (uDarkness 0.15) through this stretch. */}
      <div data-act="mechanism">
        <AdaptiveAtmosphere />
        <SensoryExperiences />
        <EmbodiedPractices />
      </div>

      {/* Interior act: focused dark moment, now AppleWatch alone. */}
      <div data-act="interior">
        <AppleWatch />
      </div>

      <div data-act="resurface">
        <CloseTheLoop />
        <Privacy />
        <FAQ />
        <FinalCTA />
      </div>

      <MobileAppJsonLd />
      <FAQJsonLd items={FAQ_ITEMS} />
      <BreadcrumbsJsonLd items={[{ name: "Home", href: "/" }]} />
    </>
  );
}
