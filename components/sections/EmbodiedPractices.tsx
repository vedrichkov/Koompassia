import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { IconWave, IconWalk, IconBook, IconHeart } from "@/lib/icons";

const practices = [
  {
    icon: <IconWave />,
    name: "Adaptive Breathing",
    sub: "Parasympathetic recovery, guided by your state.",
  },
  {
    icon: <IconWalk />,
    name: "Mindful Walking",
    sub: "Embodied discipline, grounded in movement.",
  },
  {
    icon: <IconBook />,
    name: "Reflective Voice",
    sub: "Process your inner state through spoken reflection.",
  },
  {
    icon: <IconHeart />,
    name: "Emotional Body Scan",
    sub: "Map what you feel, deepen personalization.",
  },
];

export function EmbodiedPractices() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="shell">
        <Reveal as="div" className="max-w-2xl">
          <Eyebrow index="04">Embodied practices</Eyebrow>
          <h2 className="serif mt-5 text-[clamp(28px,3.6vw,42px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
            Breathing, walking, reflection, <em className="italic">voice.</em>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft text-pretty">
            Tools that deepen with use. Each one personalizes a different way of returning
            to a steadier state.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {practices.map((p, i) => (
            <li
              key={p.name}
              className="reveal group relative overflow-hidden rounded-3xl border border-line bg-paper p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div
                aria-hidden
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line-soft text-clay"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.95), rgba(248,234,233,0.6))",
                }}
              >
                {p.icon}
              </div>
              <h3 className="serif mt-6 text-[18px] font-medium leading-tight tracking-tightish text-ink">
                {p.name}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft text-pretty">
                {p.sub}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
