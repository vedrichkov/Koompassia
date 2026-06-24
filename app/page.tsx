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

export default function HomePage() {
  return (
    <>
      <Hero />
      <DemoPreview />
      <HowItWorks />
      <NervousSystemIntel />
      <AdaptiveAtmosphere />
      <SensoryExperiences />
      <EmbodiedPractices />
      <CloseTheLoop />
      <AppleWatch />
      <Science />
      <Privacy />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <MobileAppJsonLd />
      <FAQJsonLd items={FAQ_ITEMS} />
      <BreadcrumbsJsonLd items={[{ name: "Home", href: "/" }]} />
    </>
  );
}
