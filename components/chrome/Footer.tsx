import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { AppStoreBadge } from "@/components/primitives/Button";

const columns = [
  {
    title: "Product",
    items: [
      { href: "/#how", label: "How it works" },
      { href: "/#inside", label: "Nervous System Intelligence" },
      { href: "/#experiences", label: "Sensory experiences" },
      { href: "/#pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    items: [
      { href: "/practitioners", label: "For practitioners" },
      { href: "/#science", label: "The science" },
      { href: "mailto:ivo@mizuhealth.com", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/privacy#terms", label: "Terms of use" },
      { href: "/privacy#terms", label: "Medical disclaimer" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-line/70 bg-paper/40 backdrop-blur-sm">
      <div className="shell py-16">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <span className="brand-mark-pulse inline-block transition-transform duration-500 group-hover:scale-110">
                <BrandMark size={28} />
              </span>
              <span className="serif text-[20px] font-medium tracking-tightish">Koompassia</span>
            </Link>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-soft text-pretty">
              AI-guided nervous system intelligence for discipline, clarity and
              self-regulation.
            </p>
            <div className="mt-6">
              <AppStoreBadge />
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-eyebrow text-amber">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[14px] text-ink-soft transition-colors duration-300 hover:text-clay"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-line/70 pt-6 text-[12px] text-ink-faint md:flex-row md:items-center">
          <p>iPhone, Apple Watch, 2026.</p>
          <p>© 2026 Koompassia, a product of Mizu Health. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
