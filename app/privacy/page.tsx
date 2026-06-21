import type { Metadata } from "next";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";
import { IconShield, IconHeart, IconCalendar, IconCompass } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Privacy and your data",
  description:
    "Koompassia handles physiological data on your device with plain-language Health permissions, consent-first calendar access and granular sharing toggles. Read the full privacy story.",
  alternates: { canonical: "/privacy" },
  keywords: [
    "Koompassia privacy",
    "on-device health data",
    "HealthKit privacy",
    "wellness app data privacy",
    "HRV data privacy",
  ],
  openGraph: {
    title: "Privacy at Koompassia",
    description:
      "On-device intelligence. Plain-language Health permissions. Granular sharing toggles. Your nervous system stays yours.",
    url: "/privacy",
  },
};

const healthRows = [
  {
    label: "Heart-rate variability",
    used: "Calculating your Neural Regulation Score and Digital Twin state.",
  },
  {
    label: "Resting heart rate",
    used: "Baseline trend and recovery reads. Never shared.",
  },
  {
    label: "Sleep stages",
    used: "Last-night context for your morning briefing and Pattern cards.",
  },
  {
    label: "Steps and movement",
    used: "Activity context for walks, recovery scoring and Adaptive Atmosphere.",
  },
  {
    label: "Workouts (optional)",
    used: "When you grant it, training-load context for Vitals.",
  },
];

const pillars = [
  {
    icon: <IconShield />,
    title: "On your device",
    body: "Most of Koompassia's intelligence runs on your iPhone and Watch. We do not stream raw Health data off your device.",
  },
  {
    icon: <IconHeart />,
    title: "Health, gated and named",
    body: "We ask for each Health data type one by one, in plain language. Nothing reads until you grant it. Revoke any time in iOS Settings.",
  },
  {
    icon: <IconCalendar />,
    title: "Calendar, on your terms",
    body: "Connect, pause or disconnect at any time. Koompassia reads titles and timing for prep and Next Moment, never the body of an event.",
  },
  {
    icon: <IconCompass />,
    title: "Friends, granular by default",
    body: "Sharing with friends or a practitioner is opt-in. Toggle vitals, Tracks and check-ins independently. Unlink in one tap.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-10%] top-[-5%] h-[460px] w-[460px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(242,195,206,0.35), transparent 65%)",
            filter: "blur(36px)",
          }}
        />
        <div className="shell max-w-3xl">
          <Reveal as="div">
            <Eyebrow>Privacy</Eyebrow>
            <h1 className="serif mt-5 text-[clamp(34px,5vw,58px)] font-medium leading-[1.05] tracking-tighter2 text-balance">
              Your nervous system is <em className="italic">yours.</em>
            </h1>
            <p className="mt-6 text-[18px] leading-relaxed text-ink-soft text-pretty">
              Koompassia is a regulation app. It should feel like care, not surveillance.
              Calm is part of the design, not just the experience. Here is exactly how
              your data is handled, in plain language.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative py-16 md:py-20">
        <div className="shell">
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line/60 shadow-soft sm:grid-cols-2">
            {pillars.map((p) => (
              <li key={p.title} className="flex items-start gap-5 bg-paper p-8">
                <div
                  aria-hidden
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-line-soft text-clay"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(255,255,255,0.95), rgba(248,234,233,0.6))",
                  }}
                >
                  {p.icon}
                </div>
                <div>
                  <h2 className="serif text-[20px] font-medium leading-tight tracking-tightish text-ink">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft text-pretty">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Health table */}
      <section className="relative py-16 md:py-20">
        <div className="shell max-w-4xl">
          <Reveal as="div">
            <Eyebrow index="01">What we ask for</Eyebrow>
            <h2 className="serif mt-5 text-[clamp(26px,3.2vw,36px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
              Every HealthKit permission, named and used for one thing.
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-ink-soft text-pretty">
              We never ask for a permission we do not use. We never use a permission for
              something we did not name.
            </p>
          </Reveal>

          <Reveal as="div" delay={0.1} className="mt-10 overflow-hidden rounded-3xl border border-line bg-paper shadow-soft">
            <dl>
              {healthRows.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid items-baseline gap-2 px-7 py-5 md:grid-cols-[260px_1fr] md:gap-8 ${
                    i !== 0 ? "border-t border-line-soft" : ""
                  }`}
                >
                  <dt className="serif text-[16px] font-medium text-ink tracking-tightish">
                    {row.label}
                  </dt>
                  <dd className="text-[14.5px] leading-relaxed text-ink-soft text-pretty">
                    {row.used}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Controls */}
      <section className="relative py-16 md:py-20">
        <div className="shell max-w-4xl">
          <Reveal as="div">
            <Eyebrow index="02">Controls in your hands</Eyebrow>
            <h2 className="serif mt-5 text-[clamp(26px,3.2vw,36px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
              How to disconnect, pause, or delete.
            </h2>
          </Reveal>

          <Reveal as="div" delay={0.1} className="mt-10 space-y-6">
            <div className="rounded-2xl border border-line bg-paper p-7 shadow-soft">
              <h3 className="serif text-[18px] font-medium text-ink tracking-tightish">
                Revoke Health access
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft text-pretty">
                Open iOS Settings → Health → Data Access &amp; Devices → Koompassia.
                Toggle anything off and Koompassia stops reading it immediately.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-7 shadow-soft">
              <h3 className="serif text-[18px] font-medium text-ink tracking-tightish">
                Pause or disconnect Calendar
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft text-pretty">
                In Koompassia, open Me → Privacy → Calendar. Pause for the day, the week,
                or disconnect entirely.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-7 shadow-soft">
              <h3 className="serif text-[18px] font-medium text-ink tracking-tightish">
                Delete your account
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft text-pretty">
                Open Me → Privacy → Delete account. We remove your remote profile within
                24 hours. On-device data is removed when you delete the app.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Terms anchor */}
      <section id="terms" className="relative py-16 md:py-20">
        <div className="shell max-w-3xl">
          <Reveal as="div">
            <Eyebrow>Terms</Eyebrow>
            <h2 className="serif mt-5 text-[clamp(24px,2.8vw,32px)] font-medium leading-[1.15] tracking-tighter2 text-balance">
              The short version, before the long version.
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-ink-soft text-pretty">
              Koompassia is a regulation tool, not medical care. We support your daily
              practice; we do not diagnose, treat, or replace a clinician. If something
              about your health worries you, talk to a doctor.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-faint">
              The full Terms of Service and Privacy Policy will be published with the
              public release. Questions in the meantime: hello@koompassia.com.
            </p>
          </Reveal>
        </div>
      </section>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Privacy", href: "/privacy" },
        ]}
      />
    </>
  );
}
