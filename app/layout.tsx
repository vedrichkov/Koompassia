import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Nav } from "@/components/chrome/Nav";
import { Footer } from "@/components/chrome/Footer";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://koompassia.com";
const SITE_NAME = "Koompassia";
const DEFAULT_DESCRIPTION =
  "Nervous system intelligence for iPhone and Apple Watch. Daily AI guidance shaped by your HRV, sleep, breathing and behavior, so discipline can grow from understanding.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Koompassia, AI nervous system intelligence for iPhone and Apple Watch",
    template: "%s | Koompassia",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Mizu Health", url: SITE_URL }],
  creator: "Mizu Health",
  publisher: "Mizu Health",
  generator: "Next.js",
  keywords: [
    "nervous system regulation app",
    "HRV app for Apple Watch",
    "heart rate variability tracker",
    "AI wellness coach",
    "discipline app",
    "Neural Regulation Score",
    "breathwork app",
    "vagal tone",
    "self regulation",
    "adaptive guidance",
    "calm app alternative",
    "stress recovery iOS",
    "mindful walking app",
    "emotional body scan",
    "Koompassia",
    "Mizu Health",
  ],
  category: "health",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Koompassia, AI nervous system intelligence for iPhone and Apple Watch",
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Koompassia, AI nervous system intelligence",
    description: DEFAULT_DESCRIPTION,
    creator: "@koompassia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    title: SITE_NAME,
    capable: true,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  other: {
    "apple-itunes-app": "app-id=000000000",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8EFED" },
    { media: "(prefers-color-scheme: dark)", color: "#19110F" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-bark focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to main content
        </a>
        <SmoothScroll />
        <ScrollProgress />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </body>
    </html>
  );
}
