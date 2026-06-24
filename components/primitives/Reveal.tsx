import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tag = "div" | "section" | "header" | "article" | "li" | "ul";
type Direction = "up" | "left" | "right";

type Props = {
  children: ReactNode;
  /** Delay in seconds before the entrance animation starts. */
  delay?: number;
  className?: string;
  as?: Tag;
  /** Direction the element comes from. Default: up. */
  from?: Direction;
};

/**
 * Reveal — pure CSS keyframe entrance. SSR-safe: even without JS the
 * animation runs and the element ends in its natural state. The element
 * cannot get stuck invisible.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  from = "up",
}: Props) {
  const cls = cn(
    from === "up" && "reveal",
    from === "left" && "reveal-left",
    from === "right" && "reveal-right",
    className,
  );
  const style: CSSProperties | undefined =
    delay > 0 ? { animationDelay: `${delay}s` } : undefined;

  switch (as) {
    case "section":
      return <section className={cls} style={style}>{children}</section>;
    case "header":
      return <header className={cls} style={style}>{children}</header>;
    case "article":
      return <article className={cls} style={style}>{children}</article>;
    case "li":
      return <li className={cls} style={style}>{children}</li>;
    case "ul":
      return <ul className={cls} style={style}>{children}</ul>;
    default:
      return <div className={cls} style={style}>{children}</div>;
  }
}
