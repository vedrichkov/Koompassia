import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  tone?: "default" | "soft";
  className?: string;
};

export function Pill({ children, icon, tone = "default", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-medium text-ink-soft",
        tone === "default" && "border-line bg-paper/70 backdrop-blur-sm",
        tone === "soft" && "border-line-soft bg-cream-2/40",
        className,
      )}
    >
      {icon ? (
        <span className="text-clay/70" aria-hidden>
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </span>
  );
}
