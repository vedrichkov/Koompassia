import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { AnimatedNumber } from "@/components/primitives/AnimatedNumber";

export function CloseTheLoop() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="shell">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.05fr] md:gap-16">
          <Reveal as="div" from="left">
            <Eyebrow index="07">Close the loop</Eyebrow>
            <h2 className="serif mt-5 text-[clamp(28px,3.6vw,42px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
              See what is working. <em className="italic">See what is changing.</em>
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-soft text-pretty">
              Koompassia connects actions to outcomes over time. Your Path visualizes
              body-and-practice balance across weeks and months.
            </p>
            <div className="mt-7 flex items-center gap-6 text-[12px] uppercase tracking-eyebrow text-ink-faint">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-3 rounded-full bg-clay" /> Body
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-3 rounded-full bg-amber/70" /> Practice
              </span>
            </div>
          </Reveal>

          <Reveal as="div" from="right" delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-paper p-8 shadow-soft md:p-10">
              {/* faint week grid */}
              <div className="mb-6 flex items-center justify-between">
                <p className="serif text-[15px] tracking-tightish text-ink">Your Path</p>
                <div className="flex gap-2 text-[10px] uppercase tracking-eyebrow text-ink-faint">
                  <span>4 weeks</span>
                  <span className="text-clay">12 weeks</span>
                  <span>3 mo</span>
                </div>
              </div>

              <svg viewBox="0 0 400 200" className="w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="bodyFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#B05E76" stopOpacity="0.30" />
                    <stop offset="100%" stopColor="#B05E76" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="bodyLine" x1="0" x2="1">
                    <stop offset="0%" stopColor="#D77E91" />
                    <stop offset="100%" stopColor="#B05E76" />
                  </linearGradient>
                  <linearGradient id="practiceLine" x1="0" x2="1">
                    <stop offset="0%" stopColor="#E5A6B5" />
                    <stop offset="100%" stopColor="#D77E91" />
                  </linearGradient>
                </defs>

                {/* Grid lines */}
                {[40, 80, 120, 160].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2="400"
                    y1={y}
                    y2={y}
                    stroke="#EFDADC"
                    strokeWidth="0.5"
                    strokeDasharray="2 6"
                  />
                ))}

                {/* Body area */}
                <path
                  className="chart-area"
                  d="M0 150 C 40 140, 80 130, 120 120 S 200 95, 240 85 S 320 65, 400 55 L 400 200 L 0 200 Z"
                  fill="url(#bodyFill)"
                />

                {/* Body line */}
                <path
                  className="chart-line"
                  d="M0 150 C 40 140, 80 130, 120 120 S 200 95, 240 85 S 320 65, 400 55"
                  fill="none"
                  stroke="url(#bodyLine)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />

                {/* Practice line (more wobble) */}
                <path
                  className="chart-line chart-line--practice"
                  d="M0 170 C 40 160, 80 150, 120 145 S 200 130, 240 120 S 320 100, 400 92"
                  fill="none"
                  stroke="url(#practiceLine)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeDasharray="4 5"
                />

                {/* Data point markers along the body line */}
                {[
                  { x: 80, y: 130 },
                  { x: 200, y: 95 },
                  { x: 320, y: 65 },
                  { x: 400, y: 55 },
                ].map((p, i) => (
                  <g key={i} className="chart-marker" style={{ animationDelay: `${1.4 + i * 0.25}s` }}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="4"
                      fill="#B05E76"
                      opacity="0.95"
                    />
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="8"
                      fill="none"
                      stroke="#B05E76"
                      strokeOpacity="0.5"
                      className="chart-marker-ring"
                    />
                  </g>
                ))}
              </svg>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-line-soft pt-5 text-[12px]">
                <div>
                  <p className="text-ink-faint uppercase tracking-eyebrow text-[10px]">
                    NRS trend
                  </p>
                  <p className="serif mt-1 text-[20px] tracking-tightish text-ink tabular-nums">
                    +<AnimatedNumber value={12} duration={1.6} />%
                  </p>
                </div>
                <div>
                  <p className="text-ink-faint uppercase tracking-eyebrow text-[10px]">
                    Steady days
                  </p>
                  <p className="serif mt-1 text-[20px] tracking-tightish text-ink tabular-nums">
                    <AnimatedNumber value={18} duration={1.6} /> / 28
                  </p>
                </div>
                <div>
                  <p className="text-ink-faint uppercase tracking-eyebrow text-[10px]">
                    Strongest practice
                  </p>
                  <p className="serif mt-1 text-[15px] tracking-tightish text-ink">
                    Adaptive Breathing
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
