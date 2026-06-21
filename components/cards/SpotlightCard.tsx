import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  icon: ReactNode;
  kicker: string;
  title: ReactNode;
  body: string;
  className?: string;
};

export function SpotlightCard({ icon, kicker, title, body, className }: Props) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-line bg-paper p-7 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      {/* gradient top bar */}
      <div className="spotlight-bar absolute inset-x-0 top-0 h-[3px]" aria-hidden />

      {/* icon tile */}
      <div
        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line-soft text-clay"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(248,234,233,0.85) 100%)",
        }}
        aria-hidden
      >
        {icon}
      </div>

      <p className="mt-6 text-[11px] font-semibold uppercase tracking-eyebrow text-amber">
        {kicker}
      </p>
      <h3 className="serif mt-2 text-[24px] font-medium leading-[1.2] tracking-tightish text-ink text-balance">
        {title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-soft text-pretty">
        {body}
      </p>
    </article>
  );
}
