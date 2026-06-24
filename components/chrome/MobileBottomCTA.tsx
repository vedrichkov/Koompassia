"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * MobileBottomCTA — sticky bottom bar with the Download CTA, mobile only.
 * Above the animation layer (z-50). Slides into view after the user has
 * scrolled past the hero so it doesn't compete with the in-hero CTA.
 */
export function MobileBottomCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const threshold = window.innerHeight * 0.85;
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-line/70 bg-[rgba(248,239,237,0.94)] px-4 pt-3 backdrop-blur-xl transition-transform duration-500 md:hidden",
        "pb-[calc(env(safe-area-inset-bottom,0)+12px)]",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      style={{ willChange: "transform" }}
      role="region"
      aria-label="Download Koompassia"
    >
      <Link
        href={SITE.appStoreUrl}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-bark px-5 py-3.5 text-[15px] font-medium text-paper shadow-soft"
      >
        Download free
        <span className="text-[12px] text-paper/60">· No card</span>
      </Link>
    </div>
  );
}
