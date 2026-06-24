"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandMark } from "./BrandMark";
import { Button } from "@/components/primitives/Button";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

const links = [
  { href: "/#how", label: "How it works" },
  { href: "/#science", label: "The science" },
  { href: "/#pricing", label: "Pricing" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-line/60 bg-[rgba(248,239,237,0.85)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="shell flex h-[64px] items-center justify-between gap-3 md:h-[68px]">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-ink md:gap-2.5"
          aria-label="Koompassia home"
        >
          <BrandMark size={24} />
          <span className="serif text-[18px] font-medium tracking-tightish md:text-[19px]">
            Koompassia
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex min-h-[44px] items-center text-[14px] text-ink/80 transition-colors duration-300 hover:text-clay"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/practitioners"
            className="hidden min-h-[44px] items-center text-[13px] text-ink-soft transition-colors duration-300 hover:text-clay md:inline-flex"
          >
            For practitioners
          </Link>
          <Button
            href={SITE.appStoreUrl}
            className="!px-4 !py-2 !text-[13px] md:!px-5 md:!py-2.5 md:!text-[14px]"
          >
            Download free
          </Button>
        </div>
      </div>
    </header>
  );
}
