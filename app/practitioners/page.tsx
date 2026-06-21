import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Pill } from "@/components/primitives/Pill";
import { Reveal } from "@/components/primitives/Reveal";
import { Button } from "@/components/primitives/Button";
import { SpotlightCard } from "@/components/cards/SpotlightCard";
import { MiniRow } from "@/components/cards/MiniRow";
import { CTABand } from "@/components/cards/CTABand";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";
import {
  IconCompass,
  IconShield,
  IconArchitect,
  IconCalendar,
  IconHeart,
  IconLeaf,
  IconMirror,
  IconWalk,
  IconBook,
} from "@/lib/icons";

export const metadata: Metadata = {
  title: "Koompassia Pro for coaches, therapists and performance practitioners",
  description:
    "Turn your practice into a regulation channel. Consent-first client linking, practitioner codes, protocol assignment and review, alongside the consumer Koompassia app.",
  alternates: { canonical: "/practitioners" },
  keywords: [
    "practitioner app for coaches",
    "client HRV monitoring",
    "therapist between-session app",
    "nervous system regulation for clinicians",
    "AI coaching for practitioners",
    "Koompassia Pro",
  ],
  openGraph: {
    title: "Koompassia Pro for practitioners",
    description:
      "Turn your practice into a regulation channel. Consent-first client linking, practitioner codes, protocol assignment.",
    url: "/practitioners",
  },
};

const proFeatures = [
  {
    icon: <IconCompass />,
    kicker: "Your roster",
    title: "Clients, on one calm page",
    body: "A clear list of who's regulating, who's drifting, and who hasn't checked in. Open a client to see their daily picture, not just their numbers.",
  },
  {
    icon: <IconArchitect />,
    kicker: "Protocols",
    title: "Assign the right next move",
    body: "Send a breath, a walk, a journaling prompt, or a custom Track. Reviewable inside Koompassia, not by email.",
  },
  {
    icon: <IconShield />,
    kicker: "Consent first",
    title: "Linking is opt-in, always",
    body: "Your practitioner code invites a client; they choose what to share. They can pause or unlink in a tap.",
  },
];

const roles = [
  { icon: <IconHeart />, label: "Therapists", sub: "Between-session regulation and a clearer picture of week-to-week change." },
  { icon: <IconLeaf />, label: "Coaches", sub: "Habit and discipline work backed by physiology, not just self-report." },
  { icon: <IconMirror />, label: "Psychologists", sub: "Inner Edge signals to follow patterns that aren't visible in conversation alone." },
  { icon: <IconWalk />, label: "Performance pros", sub: "Calendar-aware resets and recovery reads for high-load weeks." },
  { icon: <IconBook />, label: "Wellness leads", sub: "A shared language with clients between visits, gentler and more precise." },
  { icon: <IconCalendar />, label: "Sports trainers", sub: "Training-load context that respects the nervous system, not just the muscle." },
];

export default function PractitionersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-10%] top-[-10%] h-[520px] w-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(242,195,206,0.45), transparent 65%)",
            filter: "blur(36px)",
          }}
        />
        <div className="shell">
          <Reveal as="div" className="max-w-3xl">
            <Eyebrow>Koompassia Pro</Eyebrow>
            <h1 className="serif mt-5 text-[clamp(36px,5.4vw,64px)] font-medium leading-[1.05] tracking-tighter2 text-balance">
              Turn your practice into a <em className="italic">regulation channel.</em>
            </h1>
            <p className="mt-7 max-w-[42ch] text-[18px] leading-relaxed text-ink-soft text-pretty">
              The same calm app, on your side of the table. See how your clients are
              regulating between sessions, and send the right next move, without
              chasing them by email.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#trial">Start a 7-day trial</Button>
              <Button variant="ghost-light" href="mailto:hello@koompassia.com">
                Talk to us
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Pill icon={<IconShield size={14} />}>Consent-first linking</Pill>
              <Pill>HealthKit, on each device</Pill>
              <Pill>Run alongside your own practice</Pill>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What Pro gives */}
      <section className="relative py-20 md:py-28">
        <div className="shell">
          <Reveal as="div" className="max-w-2xl">
            <Eyebrow index="01">What Pro gives you</Eyebrow>
            <h2 className="serif mt-5 text-[clamp(28px,3.4vw,40px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
              The same daily intelligence, with a window into your clients.
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {proFeatures.map((f, i) => (
              <Reveal as="li" key={f.kicker} delay={i * 0.08}>
                <SpotlightCard {...f} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* How linking works */}
      <section className="relative py-20 md:py-28">
        <div className="shell">
          <div className="grid items-stretch gap-8 md:grid-cols-[1fr_1fr]">
            <Reveal as="div" className="rounded-3xl border border-line bg-paper p-10 shadow-soft md:p-12">
              <Eyebrow index="02">How linking works</Eyebrow>
              <h2 className="serif mt-5 text-[clamp(26px,3.2vw,36px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
                Privacy and consent are the design.
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-soft text-pretty">
                A practitioner code begins the connection. The client picks what they
                share. Either of you can pause or end the link at any moment.
              </p>
              <div className="mt-9 space-y-7">
                <MiniRow
                  icon={<IconCompass />}
                  label="1. You share a code"
                  sub="Each practitioner has a private invite code, on paper, in email, or in session."
                />
                <MiniRow
                  icon={<IconShield />}
                  label="2. They choose what to share"
                  sub="The client decides whether to share vitals, Tracks, or just check-ins."
                />
                <MiniRow
                  icon={<IconHeart />}
                  label="3. You walk alongside"
                  sub="A weekly read, a daily glance, or a single between-session ping, your call."
                />
              </div>
            </Reveal>

            <Reveal as="div" delay={0.1} className="relative overflow-hidden rounded-3xl border border-bark-deep/40 p-10 text-paper shadow-lift md:p-12">
              <div
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "linear-gradient(165deg, #19110F 0%, #2A2122 55%, #5e3744 100%)",
                }}
              />
              <Eyebrow><span className="text-amber-soft">For client trust</span></Eyebrow>
              <h3 className="serif mt-5 text-[26px] font-medium leading-snug tracking-tightish text-paper text-balance">
                "I can see you, only as much as you'd like to be seen."
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed text-paper/70 text-pretty">
                Linking is reversible and granular. There is no shadow data, no quiet
                tracking, no permissions you didn't grant.
              </p>
              <ul className="mt-8 space-y-3 text-[14px] text-paper/80">
                <li>· Toggle vitals, Tracks, journaling, and check-ins independently.</li>
                <li>· Pause sharing without leaving Koompassia.</li>
                <li>· Unlink in a single tap. The data stays on the client's device.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="relative py-20 md:py-28">
        <div className="shell">
          <Reveal as="div" className="max-w-2xl">
            <Eyebrow index="03">Who Pro is for</Eyebrow>
            <h2 className="serif mt-5 text-[clamp(28px,3.4vw,40px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
              Built for anyone whose work runs through the body.
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((r, i) => (
              <Reveal
                as="li"
                key={r.label}
                delay={i * 0.04}
                className="rounded-3xl border border-line bg-paper p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
              >
                <MiniRow icon={r.icon} label={r.label} sub={r.sub} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section id="trial" className="relative py-20 md:py-28">
        <div className="shell">
          <Reveal as="div">
            <CTABand
              eyebrow="Start"
              headline={
                <>
                  Run your practice <em className="italic">alongside your clients.</em>
                </>
              }
              sub="Seven-day trial of Pro. No card up front. Cancel anytime."
              secondaryLabel="Talk to the team"
              secondaryHref="mailto:hello@koompassia.com"
            />
            <p className="mt-6 text-center text-[13px] text-ink-faint">
              Looking for the consumer app?{" "}
              <Link href="/" className="text-clay underline-offset-4 hover:underline">
                See Koompassia for everyone
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "For practitioners", href: "/practitioners" },
        ]}
      />
    </>
  );
}
