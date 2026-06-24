"use client";

import { useEffect, useRef } from "react";

/**
 * AmbientCanvas — single fixed full-viewport WebGL layer behind all content.
 *
 * The page's "always alive" substrate. Renders two slow blush auroras on
 * sine loops plus a fine procedural grain. Couples to scroll velocity:
 * faster scroll → more turbulence; settles when the user stops.
 *
 * Exposes a single `uDarkness` uniform (0–1) that the four acts will wipe
 * to create the light → light-warming → dark → light story. Phase 2 keeps
 * uDarkness ≈ 0 (light-act intensity only). Phase 3 will animate it on
 * scroll boundaries.
 *
 * Performance contract from the guideline:
 *   - Mobile (< 768px): no canvas. Fixed CSS gradient + grain only.
 *   - DPR capped at 2.
 *   - IntersectionObserver pauses the rAF when offscreen (always true here
 *     since it's a fixed background, so we use document.visibilitychange).
 *   - Hero text/device render before this canvas mounts.
 *   - LCP: this is below the hero and doesn't block first paint.
 */
export function AmbientCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Mobile: render nothing — the body::before CSS gradient handles it.
    if (window.matchMedia("(max-width: 767px)").matches) return;

    // Reduced motion: skip the live canvas; static gradient handles it.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    // Lazy-load OGL so SSR and the initial bundle stay slim. The canvas
    // mounts after first paint; hero is already interactive by then.
    let stop = () => {};
    let cancelled = false;

    (async () => {
      const { Renderer, Program, Mesh, Triangle } = await import("ogl");
      if (cancelled) return;

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio || 1, 2),
        alpha: true,
        antialias: false,
        premultipliedAlpha: true,
      });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      container.appendChild(gl.canvas);
      gl.canvas.style.cssText =
        "position:fixed;inset:0;width:100%;height:100%;display:block;pointer-events:none;";

      const vertex = `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      // Fragment shader: two sine-driven gradient blobs + scroll-coupled
      // turbulent grain. Output blends additively on the cream page bg.
      const fragment = `
        precision mediump float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2  uRes;
        uniform float uVel;       // 0..1 scroll velocity (smoothed)
        uniform float uDarkness;  // 0 = light act, 1 = dark act

        // Cream + blush palette uniforms
        const vec3 cBlush  = vec3(0.949, 0.765, 0.808); // #F2C3CE
        const vec3 cClay   = vec3(0.690, 0.369, 0.463); // #B05E76
        const vec3 cDeep   = vec3(0.098, 0.067, 0.059); // #19110F

        float hash(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        // Soft radial gradient centered at c with radius r.
        float aurora(vec2 uv, vec2 c, float r) {
          float d = distance(uv, c);
          return smoothstep(r, 0.0, d);
        }

        void main() {
          vec2 uv = vUv;
          float aspect = uRes.x / uRes.y;
          vec2 p = vUv;
          p.x = (p.x - 0.5) * aspect + 0.5;

          // Two slow drifting auroras
          float t = uTime * 0.04; // ~25s cycle baseline
          vec2 a1c = vec2(0.78 + 0.06 * sin(t), 0.18 + 0.04 * cos(t * 0.8));
          vec2 a2c = vec2(0.18 + 0.05 * sin(t * 0.6 + 1.7), 0.85 + 0.06 * cos(t * 0.9));

          float a1 = aurora(p, a1c, 0.55);
          float a2 = aurora(p, a2c, 0.45);

          // Grain — scroll-velocity coupled. More turbulence when scrolling fast.
          float grainScale = 540.0 + uVel * 280.0;
          float g = noise(uv * grainScale + uTime * 0.05);
          g = (g - 0.5) * 0.035 * (1.0 + uVel * 1.8);

          // Light act: blush warmth tinted toward cream.
          vec3 light = mix(cBlush * 0.55, cBlush, a1) + cClay * 0.20 * a2;
          // Dark act: same auroras but on a deep base.
          vec3 dark  = mix(cDeep, cBlush * 0.45, a1 * 0.6) + cClay * 0.5 * a2;

          vec3 col = mix(light, dark, uDarkness);
          col += g;

          // Premultiplied alpha; we only contribute extra warmth/light over
          // the page's cream bg. Alpha is the overall intensity envelope.
          float alpha = (a1 * 0.55 + a2 * 0.35) * (1.0 - 0.55 * uDarkness)
                      + uDarkness * 0.85;
          gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
        }
      `;

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uRes: { value: [gl.canvas.width, gl.canvas.height] as [number, number] },
          uVel: { value: 0 },
          uDarkness: { value: 0 },
        },
        transparent: true,
      });
      const mesh = new Mesh(gl, { geometry, program });

      const resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        program.uniforms.uRes.value = [
          gl.canvas.width,
          gl.canvas.height,
        ] as [number, number];
      };
      resize();
      window.addEventListener("resize", resize, { passive: true });

      // Scroll-velocity coupling
      let lastY = window.scrollY;
      let velTarget = 0;
      let vel = 0;
      const onScroll = () => {
        const dy = Math.abs(window.scrollY - lastY);
        lastY = window.scrollY;
        velTarget = Math.min(1, dy / 40); // normalize: 40px/frame ≈ max
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      let raf = 0;
      let running = true;
      let start = performance.now();
      const tick = (now: number) => {
        if (!running) return;
        const t = (now - start) / 1000;
        // Settle velocity exponentially when the user stops
        vel += (velTarget - vel) * 0.08;
        velTarget *= 0.85;
        program.uniforms.uTime.value = t;
        program.uniforms.uVel.value = vel;
        renderer.render({ scene: mesh });
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      // Pause when the tab is hidden — saves GPU/battery.
      const onVis = () => {
        if (document.hidden) {
          running = false;
          cancelAnimationFrame(raf);
        } else if (!running) {
          running = true;
          start = performance.now() - (program.uniforms.uTime.value * 1000);
          raf = requestAnimationFrame(tick);
        }
      };
      document.addEventListener("visibilitychange", onVis);

      stop = () => {
        running = false;
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", onScroll);
        document.removeEventListener("visibilitychange", onVis);
        gl.canvas.remove();
      };
    })();

    return () => {
      cancelled = true;
      stop();
    };
  }, []);

  // The container is a fixed full-viewport host. The canvas is appended
  // imperatively above. Behind all content via negative z-index.
  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-[1]"
      style={{ contain: "strict" }}
    />
  );
}
