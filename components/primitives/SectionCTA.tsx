import { Button } from "@/components/primitives/Button";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

type Props = {
  /** Small line above the CTA, e.g. "Ready?" */
  prompt?: string;
  /** Secondary text under the CTA */
  sub?: string;
  className?: string;
};

/**
 * SectionCTA — quiet "Download free" repeat at peak comprehension.
 * Used after major narrative sections to give the convinced reader a
 * one-tap exit. Visual weight intentionally below the hero/closing CTA.
 */
export function SectionCTA({ prompt, sub, className }: Props) {
  return (
    <div
      className={cn(
        "mx-auto mt-12 flex flex-col items-center text-center md:mt-16",
        className,
      )}
    >
      {prompt ? (
        <p
          className="serif text-[12px] font-semibold uppercase tracking-[0.28em] text-ink-soft"
          style={{ fontVariant: "small-caps" }}
        >
          {prompt}
        </p>
      ) : null}
      <Button
        href={SITE.appStoreUrl}
        className="mt-4 !px-7 !py-3.5 !text-[15px]"
      >
        Download free
      </Button>
      {sub ? (
        <p className="mt-3 text-[13px] text-ink-soft">{sub}</p>
      ) : null}
    </div>
  );
}
