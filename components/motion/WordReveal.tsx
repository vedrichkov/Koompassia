import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  /** Nodes that should replace specific tokens. Use as: {emphasis: <em>...</em>} */
  className?: string;
  /** Animation delay in seconds for the first word. Subsequent words stagger by step. */
  startDelay?: number;
  /** Seconds added per word. */
  step?: number;
  /** Render emphasized tokens — wrap the matching text in italic. */
  italic?: string[];
};

/**
 * WordReveal — splits text into per-word spans that fade and rise on a stagger.
 * SSR-safe (CSS keyframes, server-rendered final state via opacity:1 fallback
 * in animation forwards). The "reveal-word" class lives in globals.css.
 */
export function WordReveal({
  text,
  className,
  startDelay = 0,
  step = 0.06,
  italic = [],
}: Props) {
  const words = text.split(/(\s+)/).filter((s) => s.length);
  let wordIndex = 0;

  return (
    <span className={cn("inline", className)}>
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return <span key={i}>{w}</span>;
        const delay = startDelay + wordIndex * step;
        const style: CSSProperties = { animationDelay: `${delay}s` };
        wordIndex += 1;
        const wordsClean = w.replace(/[.,!?]$/, "");
        const isItalic = italic.includes(wordsClean);
        const content: ReactNode = isItalic ? <em className="italic">{w}</em> : w;
        return (
          <span
            key={i}
            className="reveal-word inline-block will-change-transform"
            style={style}
          >
            {content}
          </span>
        );
      })}
    </span>
  );
}
