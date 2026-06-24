import Link from "next/link";
import { IconArrow } from "@/lib/icons";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { cn } from "@/lib/cn";

type Props = {
  name: string;
  price: string;
  priceSub?: string;
  pitch: string;
  features: string[];
  cta: { href: string; label: string };
  variant?: "light" | "featured";
  footnote?: string;
  className?: string;
};

export function PricingTier({
  name,
  price,
  priceSub,
  pitch,
  features,
  cta,
  variant = "light",
  footnote,
  className,
}: Props) {
  const featured = variant === "featured";

  return (
    <SpotlightCard
      spotlightColor={
        featured ? "rgba(242, 195, 206, 0.18)" : "rgba(215, 126, 145, 0.14)"
      }
      radius={460}
      className={cn(
        "flex h-full flex-col overflow-hidden border p-8 transition-all duration-500",
        featured
          ? "dark-card-lit rounded-[28px] border-bark-deep/40 text-paper md:scale-[1.04] md:-translate-y-3 md:p-10"
          : "rounded-3xl border-line bg-paper text-ink shadow-soft hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      {featured ? (
        <p className="serif relative mb-5 text-[11px] italic uppercase tracking-[0.32em] text-amber-soft/80">
          the considered choice
        </p>
      ) : null}

      <div className="relative">
        <h3
          className={cn(
            "serif font-medium tracking-tightish",
            featured ? "text-[30px] text-paper" : "text-[26px] text-ink",
          )}
        >
          {name}
        </h3>

        <p
          className={cn(
            "mt-3 text-[14px] leading-relaxed text-pretty",
            featured ? "text-paper/72" : "text-ink-soft",
          )}
        >
          {pitch}
        </p>

        <div className="mt-6 flex items-baseline gap-2">
          <span
            className={cn(
              "serif font-medium leading-none tracking-[-0.02em] tabular-nums",
              featured ? "text-[44px] text-paper" : "text-[40px] text-ink",
            )}
          >
            {price}
          </span>
          {priceSub ? (
            <span className={cn("text-[13px]", featured ? "text-paper/55" : "text-ink-faint")}>
              {priceSub}
            </span>
          ) : null}
        </div>
      </div>

      <ul
        className="relative mt-7 space-y-3 border-t pt-6"
        style={{ borderColor: featured ? "rgba(255,255,255,0.10)" : "var(--line-soft)" }}
      >
        {features.map((f, i) => (
          <li
            key={f}
            className={cn(
              "flex items-start gap-3 text-[14px] leading-relaxed",
              featured ? "text-paper/85" : "text-ink-soft",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                featured ? "bg-amber-soft/15 text-amber-soft" : "bg-cream-2/60 text-clay",
              )}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <DrawnCheck
                color={featured ? "#F2C3CE" : "#B05E76"}
                delay={i * 0.08}
              />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-8 flex-1" />

      <Link
        href={cta.href}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[14px] font-medium transition-all duration-300",
          featured
            ? "bg-amber-soft text-bark-deep hover:bg-[#E8B5C2]"
            : "border border-line bg-cream-2/40 text-ink hover:border-clay/40 hover:text-clay",
        )}
      >
        {cta.label}
        <IconArrow size={14} />
      </Link>

      {footnote ? (
        <p
          className={cn(
            "relative mt-3 text-center text-[12px]",
            featured ? "text-paper/55" : "text-ink-faint",
          )}
        >
          {footnote}
        </p>
      ) : null}
    </SpotlightCard>
  );
}

/** Checkmark that draws in via CSS stroke-dashoffset on mount. */
function DrawnCheck({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path
        d="M3 8.5l3.2 3L13 4.5"
        className="drawn-check"
        style={{ animationDelay: `${delay}s` }}
      />
    </svg>
  );
}
