import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Koompassia",
    short_name: "Koompassia",
    description:
      "AI nervous system intelligence for iPhone and Apple Watch. Daily guidance shaped by your body and your day.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8EFED",
    theme_color: "#F8EFED",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    categories: ["health", "lifestyle", "wellness"],
    orientation: "portrait",
  };
}
