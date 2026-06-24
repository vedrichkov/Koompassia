import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { cn } from "@/lib/cn";

/**
 * DemoPreview — a row of slots for the real product assets we still need.
 * Each slot is correctly sized, visually quiet, and clearly marked TODO.
 *
 * TODO_REAL_ASSETS:
 *   - DemoVideo: a 20-45s muted loop of the actual daily flow (open → reading
 *     → recommendation → practice → progress). Highest-impact single asset.
 *     Drop in /public/demo.mp4 + /public/demo-poster.jpg.
 *   - 4 phone screenshots, 9:19.5 aspect, at /public/screens/today.png,
 *     /public/screens/vitals.png, /public/screens/moves.png,
 *     /public/screens/watch.png.
 */
const screens = [
  {
    label: "Today",
    caption: "Your day's briefing + the single next move.",
    src: null as string | null,
  },
  {
    label: "Vitals",
    caption: "NRS, HRV, sleep, Inner Edge at a glance.",
    src: null as string | null,
  },
  {
    label: "Moves",
    caption: "Breath, walk, voice, body scan.",
    src: null as string | null,
  },
  {
    label: "Watch",
    caption: "A glance, a haptic, a breath.",
    src: null as string | null,
  },
];

export function DemoPreview() {
  return (
    <section
      id="preview"
      aria-label="App preview"
      className="relative py-20 md:py-24"
    >
      <div className="shell">
        <Reveal as="div" className="max-w-2xl">
          <Eyebrow>What it looks like</Eyebrow>
          <h2 className="serif mt-5 text-[clamp(26px,3.4vw,40px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
            See yourself <em className="italic">using it.</em>
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft text-pretty">
            A short look at the actual app. Real screens, real flow.
          </p>
        </Reveal>

        {/* Video slot — 16:9 placeholder */}
        <Reveal as="div" delay={0.12} className="relative mt-12">
          <DemoVideoSlot />
        </Reveal>

        {/* Screenshot row */}
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {screens.map((s, i) => (
            <Reveal as="li" key={s.label} delay={0.18 + i * 0.06}>
              <ScreenSlot label={s.label} caption={s.caption} src={s.src} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function DemoVideoSlot() {
  // TODO_REAL_VIDEO: replace this placeholder with:
  //   <video src="/demo.mp4" poster="/demo-poster.jpg" autoPlay muted loop playsInline />
  return (
    <div
      className="relative aspect-video overflow-hidden rounded-3xl border border-line bg-paper shadow-soft"
      role="img"
      aria-label="Demo video placeholder"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 40%, rgba(242,195,206,0.45), transparent 70%), linear-gradient(180deg, #FDF8F7 0%, #F1DEDF 100%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-line-soft bg-paper/90 shadow-soft">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-clay">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <p className="serif mt-5 text-[18px] italic text-ink/80">
          A 30-second look at the daily loop
        </p>
        <p className="mt-1 text-[12px] uppercase tracking-eyebrow text-ink-faint">
          Coming soon
        </p>
      </div>
    </div>
  );
}

function ScreenSlot({
  label,
  caption,
  src,
}: {
  label: string;
  caption: string;
  src: string | null;
}) {
  return (
    <figure className="group relative">
      <div
        className={cn(
          "relative aspect-[9/19.5] overflow-hidden rounded-[28px] border border-line bg-paper shadow-soft",
          "transition-transform duration-500 group-hover:-translate-y-1",
        )}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={`Koompassia ${label} screen`} className="h-full w-full object-cover" />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 60% at 50% 35%, rgba(242,195,206,0.55), rgba(248,239,237,0.0) 70%), linear-gradient(180deg, #FDF8F7 0%, #EAB4BB 100%)",
            }}
          />
        )}
        {/* Subtle "screen" frame inset */}
        <div aria-hidden className="pointer-events-none absolute inset-2 rounded-[24px] border border-white/40" />
        {!src ? (
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-bark/70 px-2 py-0.5 text-[10px] uppercase tracking-eyebrow text-paper/80">
            Placeholder
          </span>
        ) : null}
      </div>
      <figcaption className="mt-3">
        <span className="serif text-[14px] font-medium tracking-tightish text-ink">
          {label}
        </span>
        <span className="ml-2 text-[12.5px] text-ink-soft">{caption}</span>
      </figcaption>
    </figure>
  );
}
