import { cn } from "@/lib/cn";

type Props = {
  rating: number;
  count?: number;
  /** Optional short pull-quote rendered below the stars line. */
  quote?: string;
  /** Optional attribution (name, situation) for the quote. */
  attribution?: string;
  /** Whether to render the "App Store" wordmark in the proof line. */
  showStoreMark?: boolean;
  className?: string;
};

/**
 * RatingProof — App-Store-style proof unit.
 *
 * TODO_REAL_RATING + TODO_REAL_QUOTE: the rating, count and quote should
 * be sourced live from the App Store. The structure below is correct;
 * just swap the placeholder numbers and quote when available.
 *
 * Contrast hardened in Pass 2: rating + count now use ink (#1F1718) and
 * ink-soft (#5C5052) on cream, both AA-pass. The previous ink-faint
 * caused the proof to read as disabled metadata.
 */
export function Stars({
  rating,
  count,
  quote,
  attribution,
  showStoreMark = false,
  className,
}: Props) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div
      className={cn("flex flex-col gap-1.5", className)}
      aria-label={`Rated ${rating} out of 5${count ? ` based on ${count.toLocaleString()} reviews` : ""}`}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] tabular-nums">
        <div className="flex items-center gap-0.5" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => {
            const isFull = i < full;
            const isHalf = !isFull && i === full && half;
            return (
              <svg
                key={i}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                className="text-clay"
                aria-hidden
              >
                <defs>
                  <linearGradient id={`s-${i}`} x1="0" x2="1">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path
                  fill={isFull ? "currentColor" : isHalf ? `url(#s-${i})` : "none"}
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  d="M12 2.6l2.95 6.0 6.6 0.96-4.78 4.66 1.13 6.58L12 17.77l-5.9 3.03 1.13-6.58L2.45 9.56l6.6-0.96z"
                />
              </svg>
            );
          })}
        </div>
        <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
        {count != null ? (
          <span className="text-ink-soft">
            · {count.toLocaleString()} ratings
          </span>
        ) : null}
        {showStoreMark ? (
          <span className="text-ink-soft">· App Store</span>
        ) : null}
      </div>
      {quote ? (
        <p className="serif max-w-[36ch] text-[13.5px] italic leading-snug text-ink-soft">
          &ldquo;{quote}&rdquo;
          {attribution ? (
            <span className="not-italic text-ink-faint"> — {attribution}</span>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
