import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Koompassia, AI nervous system intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#F8EFED",
          backgroundImage:
            "radial-gradient(900px 600px at 100% -10%, rgba(242,195,206,0.85), transparent 55%), radial-gradient(700px 600px at 0% 110%, rgba(176,94,118,0.18), transparent 60%)",
          color: "#1F1718",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="48" height="48" viewBox="0 0 32 32">
            <defs>
              <linearGradient id="n" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EFAAB7" />
                <stop offset="55%" stopColor="#BF7C8B" />
                <stop offset="100%" stopColor="#140E0F" />
              </linearGradient>
            </defs>
            <path
              d="M16 5c5 0 8 3.6 8 8.5 0 4-2.6 6.5-6 7.5l-2 6-2-6c-3.4-1-6-3.5-6-7.5C8 8.6 11 5 16 5z"
              fill="#F3BCC8"
            />
            <path d="M16 7.5l1.2 11h-2.4z" fill="url(#n)" />
          </svg>
          <span style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.02em" }}>
            Koompassia
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 18,
              color: "#B05E76",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            <span
              style={{
                display: "flex",
                width: 28,
                height: 2,
                background: "#B05E76",
                opacity: 0.65,
              }}
            />
            Nervous system intelligence
          </div>
          <div
            style={{
              fontSize: 92,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              fontWeight: 500,
              maxWidth: 980,
              color: "#1F1718",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Meet the calm</span>
            <span style={{ fontStyle: "italic" }}>beneath the noise.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#5C5052",
            fontSize: 22,
          }}
        >
          <span>iPhone and Apple Watch</span>
          <span style={{ fontSize: 20, color: "#938587" }}>koompassia.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
