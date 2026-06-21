import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function IconPulse({ size = 22, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M3 12h3l2-5 4 10 2-5 2 3h5" />
    </svg>
  );
}

export function IconMirror({ size = 22, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 7.5a4.5 4.5 0 0 0 0 9" />
    </svg>
  );
}

export function IconWave({ size = 22, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M3 13c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
      <path d="M3 18c2-3 4-3 6 0s4 3 6 0 4-3 6 0" opacity=".55" />
    </svg>
  );
}

export function IconSun({ size = 22, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
    </svg>
  );
}

export function IconLeaf({ size = 22, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M5 19c0-8 6-14 14-14-1 9-6 14-14 14z" />
      <path d="M5 19l8-8" />
    </svg>
  );
}

export function IconMoon({ size = 22, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  );
}

export function IconCalendar({ size = 22, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

export function IconHeart({ size = 22, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
    </svg>
  );
}

export function IconCompass({ size = 22, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.5 9.5l-1.6 4.4-4.4 1.6 1.6-4.4z" />
    </svg>
  );
}

export function IconWalk({ size = 22, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="13" cy="4.5" r="1.7" />
      <path d="M9 21l2-6 3 2 2 4M11 15l-2-4 3-3 3 2 2 2" />
    </svg>
  );
}

export function IconBook({ size = 22, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z" />
      <path d="M8 7h6M8 11h6" />
    </svg>
  );
}

export function IconWatch({ size = 22, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <rect x="7" y="6" width="10" height="12" rx="3" />
      <path d="M9 6V3h6v3M9 18v3h6v-3M12 10v3l2 1" />
    </svg>
  );
}

export function IconShield({ size = 22, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function IconCheck({ size = 14, ...props }: IconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 16 16" {...props}>
      <path d="M3 8.5l3.2 3L13 4.5" />
    </svg>
  );
}

export function IconArrow({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconArchitect({ size = 22, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M4 19V8l8-5 8 5v11" />
      <path d="M9 19v-6h6v6" />
    </svg>
  );
}

export function IconEngine({ size = 22, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1l2.1-2.1M17 7l2.1-2.1" />
    </svg>
  );
}
