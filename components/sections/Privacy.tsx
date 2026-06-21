import Link from "next/link";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { IconShield, IconArrow } from "@/lib/icons";

export function Privacy() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="shell">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-paper p-10 shadow-soft md:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-[320px] w-[320px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(242,195,206,0.45), transparent 65%)",
              filter: "blur(28px)",
            }}
          />
          <div className="relative grid items-center gap-10 md:grid-cols-[0.95fr_1.05fr]">
            <Reveal as="div">
              <Eyebrow>Privacy &amp; trust</Eyebrow>
              <h2 className="serif mt-5 text-[clamp(28px,3.4vw,40px)] font-medium leading-[1.1] tracking-tighter2 text-balance">
                Your data serves you. <em className="italic">Only you.</em>
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-ink-soft text-pretty">
                Physiology and personal patterns, handled with care. Your information
                personalizes your experience. It is not sold or shared. Ever.
              </p>
              <Link
                href="/privacy"
                className="mt-7 inline-flex items-center gap-2 text-[14px] font-medium text-clay transition-colors hover:text-bark"
              >
                <IconShield size={16} />
                Read the privacy story
                <IconArrow size={14} />
              </Link>
            </Reveal>

            <Reveal as="div" delay={0.1}>
              <ul className="grid gap-3">
                {[
                  { k: "On device", v: "Most intelligence runs on your iPhone and Watch." },
                  { k: "Plain language", v: "We name each Health permission before we ask." },
                  { k: "Calendar", v: "Read titles and timing. Never the contents." },
                  { k: "Friends", v: "Opt-in, granular, unlink in a single tap." },
                ].map((it) => (
                  <li
                    key={it.k}
                    className="flex items-center gap-5 rounded-2xl border border-line-soft bg-cream-2/30 px-5 py-4"
                  >
                    <span className="serif text-[14px] font-medium text-clay/80 min-w-[110px]">
                      {it.k}
                    </span>
                    <span className="text-[14px] text-ink-soft text-pretty">{it.v}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
