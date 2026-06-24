/**
 * Motion tokens — single source of truth for the entire site.
 *
 * Defined by /koompassia-unified-design-motion-guideline.md §4.
 * Do not invent new easing curves or durations in components.
 *
 * Boundary: GSAP owns scroll-driven motion. Framer Motion owns component
 * state and pointer interactions. Lenis is the smooth-scroll substrate.
 */

// ===== Easing =====
// GSAP-syntax strings. Use `EASE.reveal` etc. when configuring tweens.
export const EASE = {
  /** Entrances & reveals — confident arrival, no overshoot */
  reveal: "expo.out",
  /** Settles & counters — softer landing */
  settle: "cubic-bezier(0.22, 1, 0.36, 1)",
  /** Continuous loops — organic, never mechanical */
  loop: "sine.inOut",
} as const;

// CSS-syntax versions for inline transitions / Tailwind utilities
export const EASE_CSS = {
  reveal: "cubic-bezier(0.16, 1, 0.3, 1)",
  settle: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

// ===== Durations (seconds, GSAP-friendly) =====
export const DUR = {
  /** Micro-interactions: hover, toggle */
  micro: 0.25,
  /** Default reveal / entrance */
  reveal: 0.7,
  /** Hero per-word stagger */
  heroWord: 0.07,
  /** Card-group sibling stagger */
  cardStagger: 0.1,
  /** Section dark↔light wipes (act boundaries) */
  actWipe: 1.0,
  /** Eternal breathing loop (4s inhale / 6s exhale) */
  breathe: 10,
  /** Ambient aurora drift */
  aurora: 30,
} as const;

// ===== Scroll trigger configs =====
export const TRIGGER = {
  /** Reveal trigger: fires when element top reaches 80% of viewport */
  reveal: { start: "top 80%", once: true, toggleActions: "play none none none" } as const,
  /** Scrubbed scroll (1s catch-up smoothing — essential for organic feel) */
  scrub: 1,
} as const;

// ===== Reveal grammar =====
export const REVEAL = {
  /** Default upward translate distance in px */
  y: 24,
  duration: DUR.reveal,
  ease: EASE.reveal,
} as const;

// ===== Parallax planes =====
export const PARALLAX = {
  back: 0.15, // ambient aurora, grain — moves least
  mid: 0.7,   // large type, device mockups, hero art
  front: 1.0, // body copy, UI cards (i.e. normal scroll speed)
} as const;

// ===== Act boundaries (uDarkness target per act) =====
// Used by AmbientCanvas to wipe between light and dark acts.
export const ACT_INTENSITY = {
  /** Act I — Surface, light */
  surface: 0.0,
  /** Act II — Mechanism, light warming */
  mechanism: 0.15,
  /** Act III — Interior, fully dark */
  interior: 1.0,
  /** Act IV — Resurface, light again */
  resurface: 0.05,
} as const;
