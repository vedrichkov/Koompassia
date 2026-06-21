import { cn } from "@/lib/cn";

type Props = {
  index?: string;
  children: React.ReactNode;
  className?: string;
};

export function Eyebrow({ index, children, className }: Props) {
  return (
    <div className={cn("flex items-center gap-3 text-amber", className)}>
      {index ? (
        <span className="serif text-[13px] font-medium tabular-nums text-clay/80">
          {index}
        </span>
      ) : (
        <span className="h-px w-[26px] bg-amber/60" aria-hidden />
      )}
      <span className="text-[11px] font-semibold uppercase tracking-eyebrow">
        {children}
      </span>
    </div>
  );
}
