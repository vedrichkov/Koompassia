import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { cn } from "@/lib/cn";
import {
  IconPulse,
  IconSun,
  IconEngine,
  IconArchitect,
  IconMirror,
} from "@/lib/icons";

const items = [
  {
    icon: <IconPulse />,
    name: "Neural Regulation Score",
    body: "One number you learn to trust, drawn from your body, your day, and how you actually move through both.",
  },
  {
    icon: <IconSun />,
    name: "Adaptive Atmosphere",
    body: "An interface that shifts warmth and dimness with time of day and how regulated you are.",
  },
  {
    icon: <IconEngine />,
    name: "Intervention Engine",
    body: "A quiet background watcher that surfaces the right reset before stress compounds.",
  },
  {
    icon: <IconArchitect />,
    name: "Discipline Architect",
    body: "A 30-day path built from your own words. Speak or type your intent, get a daily anchor and a conversational AI coach.",
  },
  {
    icon: <IconMirror />,
    name: "Inner Edge, Digital Twin",
    body: "A portrait of the person, not just the pulse, with six capacity signals tracked gently over time.",
  },
];

export function Different() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="shell">
        <Reveal as="div" className="max-w-2xl">
          <Eyebrow index="03">Why it's different</Eyebrow>
          <h2 className="serif mt-5 text-[clamp(28px,3.6vw,42px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
            Five quiet ideas, woven together.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft text-pretty">
            None of these stand alone. They work because they meet in one place, your
            day, on your wrist, in your pocket.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line/60 shadow-soft md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              as="li"
              key={item.name}
              delay={i * 0.05}
              className={cn(
                "group flex items-start gap-5 bg-paper p-7 transition-colors duration-500 hover:bg-cream-2/40",
              )}
            >
              <div
                aria-hidden
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-line-soft text-clay"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.95), rgba(248,234,233,0.6))",
                }}
              >
                {item.icon}
              </div>
              <div>
                <h3 className="serif text-[20px] font-medium leading-[1.2] tracking-tightish text-ink">
                  {item.name}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft text-pretty">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
