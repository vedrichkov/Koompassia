import type { ReactNode } from "react";
import { AppStoreBadge, Button } from "@/components/primitives/Button";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  headline: ReactNode;
  sub?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
};

export function CTABand({
  eyebrow,
  headline,
  sub,
  secondaryHref = "#waitlist",
  secondaryLabel = "Join the waitlist",
  className,
}: Props) {
  return (
    <section
      id="get"
      className={cn(
        "dark-card-lit--cta relative isolate overflow-hidden rounded-[28px] px-8 py-20 text-paper md:px-16 md:py-24",
        className,
      )}
    >
      {/* corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(242,195,206,0.38), rgba(176,94,118,0.15) 45%, transparent 70%)",
          filter: "blur(28px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(215,126,145,0.22), transparent 60%)",
          filter: "blur(36px)",
        }}
      />

      <div className="relative mx-auto max-w-2xl text-center">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-amber-soft/85">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="serif mt-4 text-[clamp(28px,4.2vw,46px)] font-medium leading-[1.08] tracking-tighter2 text-balance">
          {headline}
        </h2>
        {sub ? (
          <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-paper/75 text-pretty">
            {sub}
          </p>
        ) : null}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <AppStoreBadge />
          <Button variant="ghost-dark" href={secondaryHref}>
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
