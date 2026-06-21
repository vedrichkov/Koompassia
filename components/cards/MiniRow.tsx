import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  icon: ReactNode;
  label: string;
  sub: string;
  tone?: "light" | "dark";
  className?: string;
};

export function MiniRow({ icon, label, sub, tone = "light", className }: Props) {
  const dark = tone === "dark";
  return (
    <div className={cn("flex items-start gap-4", className)}>
      <div
        aria-hidden
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
          dark
            ? "border-white/15 bg-white/[0.05] text-amber-soft"
            : "border-line-soft bg-paper text-clay",
        )}
      >
        {icon}
      </div>
      <div className="pt-1">
        <p
          className={cn(
            "text-[15px] font-semibold leading-tight",
            dark ? "text-paper" : "text-ink",
          )}
        >
          {label}
        </p>
        <p
          className={cn(
            "mt-1 text-[14px] leading-relaxed",
            dark ? "text-paper/70" : "text-ink-soft",
          )}
        >
          {sub}
        </p>
      </div>
    </div>
  );
}
