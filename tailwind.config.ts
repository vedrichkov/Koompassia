import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--cream)",
        "cream-2": "var(--cream-2)",
        paper: "var(--paper)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-faint": "var(--ink-faint)",
        line: "var(--line)",
        "line-soft": "var(--line-soft)",
        bark: "var(--bark)",
        "bark-deep": "var(--bark-deep)",
        amber: "var(--amber)",
        "amber-soft": "var(--amber-soft)",
        sage: "var(--sage)",
        clay: "var(--clay)",
        gold: "var(--gold)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "var(--shadow)",
        lift: "var(--shadow-lg)",
      },
      borderRadius: {
        "2xl": "20px",
        "3xl": "24px",
      },
      maxWidth: {
        prose: "65ch",
        shell: "1180px",
      },
      letterSpacing: {
        tightish: "-0.015em",
        tighter2: "-0.02em",
        eyebrow: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
