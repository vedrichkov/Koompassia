import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { MiniRow } from "@/components/cards/MiniRow";
import { IconCalendar, IconHeart, IconWalk } from "@/lib/icons";

export function AppleWatch() {
  return (
    <section id="watch" className="relative py-24 md:py-32">
      <div className="shell">
        <div className="grid items-stretch gap-6 md:grid-cols-[1.05fr_0.95fr]">
          {/* Left, the message */}
          <Reveal as="div" className="rounded-3xl border border-line bg-paper p-10 shadow-soft md:p-12">
            <Eyebrow index="04">On the wrist</Eyebrow>
            <h2 className="serif mt-5 text-[clamp(28px,3.4vw,40px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
              Regulation that follows your body.
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-soft text-pretty">
              The Apple Watch app is free for everyone. A glance, a haptic, a breath, the
              smallest possible footprint between you and the next right move.
            </p>
            <div className="mt-9 space-y-7">
              <MiniRow
                icon={<IconCalendar />}
                label="Next Moment"
                sub="A calendar-aware, full-screen reset that arrives before the meeting, not after it."
              />
              <MiniRow
                icon={<IconHeart />}
                label="Breathe and biofeedback"
                sub="Haptic presets and heart-rate-guided breathing, ready on your wrist."
              />
              <MiniRow
                icon={<IconWalk />}
                label="Walk and score"
                sub="A GPS walk synced with your NRS, so you can see what a slower mile does to you."
              />
            </div>
          </Reveal>

          {/* Right, dark contrast panel with watch face */}
          <Reveal as="div" delay={0.1}
            className="relative overflow-hidden rounded-3xl border border-bark-deep/40 p-10 text-paper shadow-lift md:p-12"
            >
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(165deg, #19110F 0%, #2A2122 55%, #5e3744 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-[340px] w-[340px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(242,195,206,0.32), transparent 65%)",
                filter: "blur(36px)",
              }}
            />

            <Eyebrow><span className="text-amber-soft">Watch face</span></Eyebrow>
            <p className="serif mt-5 text-[22px] font-medium italic leading-snug tracking-tightish text-paper/85">
              Breathe with me.
            </p>

            {/* Watch face mock */}
            <div className="mt-10 flex justify-center">
              <div
                className="relative aspect-square w-[230px] rounded-[44px] p-[3px]"
                style={{
                  background:
                    "linear-gradient(160deg, #3a2a2e, #1d1316 60%, #0f0809)",
                  boxShadow: "0 30px 70px -20px rgba(0,0,0,0.6)",
                }}
              >
                <div
                  className="relative h-full w-full overflow-hidden rounded-[40px]"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 40%, rgba(242,195,206,0.32), rgba(43,33,34,0.95) 65%)",
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="h-24 w-24 rounded-full border border-amber-soft/30" />
                    <div className="absolute h-16 w-16 rounded-full border border-amber-soft/40" />
                    <div className="absolute h-9 w-9 rounded-full bg-amber-soft/35 blur-[2px]" />
                    <span className="absolute bottom-7 text-[10px] font-medium uppercase tracking-[0.24em] text-amber-soft/80">
                      Inhale
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-10 text-center text-[13px] text-paper/55">
              Free with the iPhone app. Pairs in a single tap.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
