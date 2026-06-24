import Image from "next/image";

/**
 * HandoffQR — desktop visitors scan to open the site on phone, where the
 * App Store download is one tap. Hidden on touch devices (md+ only).
 *
 * TODO: once the real App Store ID is set in lib/site.ts, regenerate the
 * QR SVG at /public/qr-appstore.svg to point directly at the App Store
 * URL instead of the homepage.
 */
export function HandoffQR() {
  return (
    <div className="hidden md:block">
      <div className="flex items-center gap-4 rounded-2xl border border-line bg-paper/80 px-4 py-3 shadow-soft backdrop-blur-sm">
        <Image
          src="/qr-appstore.svg"
          alt="QR code to open Koompassia on your phone"
          width={64}
          height={64}
          className="rounded-md"
        />
        <div className="text-[12.5px] leading-snug">
          <p className="font-medium text-ink">Scan to open on iPhone</p>
          <p className="text-ink-faint">Then tap Download free.</p>
        </div>
      </div>
    </div>
  );
}
