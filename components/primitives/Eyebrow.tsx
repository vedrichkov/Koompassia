import { cn } from "@/lib/cn";

type Props = {
  /** Accepts "01", "02", etc. or a Roman numeral string directly. */
  index?: string;
  children: React.ReactNode;
  className?: string;
};

const ROMAN: Record<string, string> = {
  "01": "I",
  "02": "II",
  "03": "III",
  "04": "IV",
  "05": "V",
  "06": "VI",
  "07": "VII",
  "08": "VIII",
  "09": "IX",
  "10": "X",
};

export function Eyebrow({ index, children, className }: Props) {
  const numeral = index ? ROMAN[index] ?? index : null;

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* Hairline glyph anchors every eyebrow, even those without a numeral */}
      <span aria-hidden className="text-[14px] leading-none text-clay/40">
        &mdash;
      </span>
      {numeral ? (
        <span className="serif text-[12px] italic tracking-[0.04em] text-clay/75">
          {numeral}.
        </span>
      ) : null}
      <span
        className="serif text-[10px] font-medium uppercase tracking-[0.32em] text-amber"
        style={{ fontVariant: "small-caps", letterSpacing: "0.32em" }}
      >
        {children}
      </span>
    </div>
  );
}
