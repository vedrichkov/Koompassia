type Props = { size?: number; className?: string };

export function BrandMark({ size = 26, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient id="needle-mark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFAAB7" />
          <stop offset="55%" stopColor="#BF7C8B" />
          <stop offset="100%" stopColor="#140E0F" />
        </linearGradient>
      </defs>
      <path
        d="M16 5c5 0 8 3.6 8 8.5 0 4-2.6 6.5-6 7.5l-2 6-2-6c-3.4-1-6-3.5-6-7.5C8 8.6 11 5 16 5z"
        fill="#F3BCC8"
      />
      <path d="M16 7.5l1.2 11h-2.4z" fill="url(#needle-mark)" />
    </svg>
  );
}
