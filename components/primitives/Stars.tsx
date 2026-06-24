import { cn } from "@/lib/cn";

type Props = {
  rating: number;
  count?: number;
  className?: string;
};

/**
 * Stars — small rating glyph + numeric rating + review count.
 *
 * TODO_REAL_RATING: the rating + count props should be sourced live from the
 * App Store (e.g. via a build-time fetch of /lookup?id={appId}). Until then
 * the call site passes a placeholder value and this comment marks the swap.
 */
export function Stars({ rating, count, className }: Props) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-[12px] tabular-nums text-ink-soft",
        className,
      )}
      aria-label={`Rated ${rating} out of 5${count ? ` based on ${count.toLocaleString()} reviews` : ""}`}
    >
      <div className="flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => {
          const isFull = i < full;
          const isHalf = !isFull && i === full && half;
          return (
            <svg
              key={i}
              width="13"
              height="13"
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
                strokeWidth="1.5"
                strokeLinejoin="round"
                d="M12 2.6l2.95 6.0 6.6 0.96-4.78 4.66 1.13 6.58L12 17.77l-5.9 3.03 1.13-6.58L2.45 9.56l6.6-0.96z"
              />
            </svg>
          );
        })}
      </div>
      <span className="font-medium text-ink">{rating.toFixed(1)}</span>
      {count != null ? (
        <span className="text-ink-faint">· {count.toLocaleString()} reviews</span>
      ) : null}
    </div>
  );
}
