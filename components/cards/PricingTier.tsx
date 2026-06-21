import Link from "next/link";
import type { ReactNode } from "react";
import { IconCheck, IconArrow } from "@/lib/icons";
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
    <article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-3xl border p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift",
        featured
          ? "border-bark-deep/40 text-paper"
          : "border-line bg-paper text-ink",
        className,
      )}
      style={
        featured
          ? {
              background:
                "linear-gradient(165deg, #19110F 0%, #2A2122 55%, #5e3744 100%)",
            }
          : undefined
      }
    >
      {featured ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(242,195,206,0.32), transparent 60%)",
            filter: "blur(8px)",
          }}
        />
      ) : null}

      <div className="relative">
        <div className="flex items-baseline justify-between">
          <h3 className={cn("serif text-[26px] font-medium tracking-tightish", featured ? "text-paper" : "text-ink")}>
            {name}
          </h3>
          {featured ? (
            <span className="rounded-full border border-amber-soft/40 bg-amber-soft/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-eyebrow text-amber-soft">
              Most chosen
            </span>
          ) : null}
        </div>

        <p
          className={cn(
            "mt-4 text-[14px] leading-relaxed text-pretty",
            featured ? "text-paper/75" : "text-ink-soft",
          )}
        >
          {pitch}
        </p>

        <div className="mt-6 flex items-baseline gap-2">
          <span className={cn("serif text-[40px] font-medium leading-none tracking-[-0.02em]", featured ? "text-paper" : "text-ink")}>
            {price}
          </span>
          {priceSub ? (
            <span className={cn("text-[13px]", featured ? "text-paper/55" : "text-ink-faint")}>
              {priceSub}
            </span>
          ) : null}
        </div>
      </div>

      <ul className="relative mt-7 space-y-3 border-t pt-6"
          style={{ borderColor: featured ? "rgba(255,255,255,0.12)" : "var(--line-soft)" }}>
        {features.map((f) => (
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
            >
              <IconCheck size={12} />
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
    </article>
  );
}
