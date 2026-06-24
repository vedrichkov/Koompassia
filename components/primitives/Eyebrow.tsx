import { cn } from "@/lib/cn";

type Props = {
  /**
   * Accepts "01"-"10" or a Roman numeral string directly.
   * Drop the prop for unnumbered interludes (AdaptiveAtmosphere, Privacy,
   * Pricing, FAQ, FinalCTA). Per the Pass 2 critique, only the seven
   * narrative sections should carry numerals.
   */
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

/**
 * Eyebrow — the small label above every section heading.
 *
 * Contrast hardened (Pass 2): the label is now ink-soft (5C5052) on
 * cream (F8EFED), measured ~6.5:1 (AA-large + AA-normal pass). Sized up
 * to 12px and weight bumped to 600 so small-caps still read as labels.
 * The dash glyph and numeral keep a soft clay tint as decorative tokens.
 */
export function Eyebrow({ index, children, className }: Props) {
  const numeral = index ? ROMAN[index] ?? index : null;

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span aria-hidden className="text-[14px] leading-none text-clay/55">
        &mdash;
      </span>
      {numeral ? (
        <span className="serif text-[13px] italic tracking-[0.04em] text-clay/85">
          {numeral}.
        </span>
      ) : null}
      <span
        className="serif text-[12px] font-semibold uppercase tracking-[0.28em] text-ink-soft"
        style={{ fontVariant: "small-caps" }}
      >
        {children}
      </span>
    </div>
  );
}
