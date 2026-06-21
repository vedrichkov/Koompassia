import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  badge: string;
  icon: ReactNode;
  title: string;
  sub: string;
  bullets: string[];
  className?: string;
};

export function TabSurfaceCard({ badge, icon, title, sub, bullets, className }: Props) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-line bg-paper p-8 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="serif text-[12px] tabular-nums text-clay/80">{badge}</span>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-line-soft text-clay"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.95), rgba(248,234,233,0.6))",
          }}
          aria-hidden
        >
          {icon}
        </div>
      </div>

      <h3 className="serif mt-6 text-[28px] font-medium leading-[1.1] tracking-tightish text-ink">
        {title}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-soft text-pretty">{sub}</p>

      <ul className="mt-6 space-y-2.5 border-t border-line-soft pt-5">
        {bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-3 text-[14px] leading-relaxed text-ink-soft"
          >
            <span
              aria-hidden
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber/60"
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
