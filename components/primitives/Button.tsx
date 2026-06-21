import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary-light" | "primary-dark" | "ghost-light" | "ghost-dark" | "appstore";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children?: ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

const styles: Record<Variant, string> = {
  "primary-light":
    "bg-bark text-paper hover:bg-bark-deep shadow-soft hover:shadow-lift",
  "primary-dark":
    "bg-amber-soft text-bark-deep hover:bg-[#E8B5C2] shadow-soft",
  "ghost-light":
    "bg-transparent text-ink border border-line hover:border-clay/40 hover:text-clay",
  "ghost-dark":
    "bg-white/[0.08] text-paper border border-white/[0.22] hover:bg-white/[0.14]",
  appstore:
    "bg-bark text-paper hover:bg-bark-deep shadow-soft hover:shadow-lift",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium leading-none transition-all duration-300 ease-out will-change-transform";

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary-light", className, children, ...rest } = props;
  const cls = cn(base, styles[variant], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={cls} {...(rest as Omit<ComponentProps<typeof Link>, "href" | "className" | "children">)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as ComponentProps<"button">)}>
      {children}
    </button>
  );
}

export function AppStoreBadge({ className, href = "#get" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      aria-label="Download on the App Store"
      className={cn(
        "inline-flex items-center gap-3 rounded-2xl bg-bark px-5 py-3 text-paper shadow-soft transition-all duration-300 hover:bg-bark-deep hover:shadow-lift",
        className,
      )}
    >
      <svg width="22" height="26" viewBox="0 0 22 26" fill="currentColor" aria-hidden>
        <path d="M16.5 13.6c0-2.7 2.2-4 2.3-4.1-1.3-1.8-3.2-2.1-3.9-2.1-1.6-.2-3.2.9-4 .9-.8 0-2.1-.9-3.5-.9-1.8 0-3.5 1-4.4 2.7-1.9 3.3-.5 8.1 1.4 10.8 1 1.3 2 2.7 3.5 2.6 1.4-.1 1.9-.9 3.6-.9 1.6 0 2.1.9 3.6.9 1.5 0 2.5-1.3 3.4-2.6 1-1.5 1.5-3 1.5-3.1-.1 0-2.9-1.1-3-4.2zM13.9 5.8c.7-.8 1.2-2 1.1-3.2-1 0-2.3.7-3 1.5-.6.7-1.3 1.9-1.1 3.1 1.2.1 2.3-.6 3-1.4z" />
      </svg>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[10px] font-normal uppercase tracking-eyebrow text-paper/70">
          Download on the
        </span>
        <span className="serif text-[18px] font-medium">App Store</span>
      </span>
    </Link>
  );
}
