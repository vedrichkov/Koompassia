/**
 * Tiny external store for the ambient act state.
 *
 * The ambient WebGL canvas owns the shader uniform; the ActDirector and
 * its ScrollTriggers own the *target* darkness per act. We mediate via
 * this module so neither component needs to know about the other, and so
 * GSAP tweens can target a plain JS proxy object and stream values into
 * the shader on every onUpdate.
 */

import { ACT_INTENSITY } from "./motion-tokens";

export type ActName = keyof typeof ACT_INTENSITY;

// Proxy whose `value` property is the *current* uDarkness (0..1).
// ActDirector tweens this; AmbientCanvas subscribes and writes it to the
// shader uniform on every change.
export const darknessProxy: { value: number } = {
  value: ACT_INTENSITY.surface,
};

type Listener = (v: number) => void;
const listeners = new Set<Listener>();

/** Subscribe to changes. Returns an unsubscribe function. */
export function subscribeDarkness(fn: Listener): () => void {
  listeners.add(fn);
  // Send the current value immediately so late subscribers sync up.
  fn(darknessProxy.value);
  return () => {
    listeners.delete(fn);
  };
}

/** Set the current darkness and notify all subscribers. */
export function setDarkness(v: number): void {
  if (darknessProxy.value === v) return;
  darknessProxy.value = v;
  listeners.forEach((fn) => fn(v));
}
