import { SITE } from "@/lib/site";

type AnyRecord = Record<string, unknown>;

function JsonLd({ id, data }: { id: string; data: AnyRecord }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.publisher.name,
    url: SITE.publisher.url,
    email: SITE.publisher.email,
    brand: {
      "@type": "Brand",
      name: SITE.name,
      logo: `${SITE.url}/favicon.svg`,
    },
    sameAs: [SITE.url],
  };
  return <JsonLd id="ld-organization" data={data} />;
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: SITE.publisher.name,
    },
  };
  return <JsonLd id="ld-website" data={data} />;
}

export function MobileAppJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: SITE.name,
    operatingSystem: "iOS 16, watchOS 10",
    applicationCategory: "HealthApplication",
    applicationSubCategory: "Wellness",
    description: SITE.defaultDescription,
    url: SITE.url,
    downloadUrl: SITE.appStoreUrl,
    installUrl: SITE.appStoreUrl,
    softwareVersion: "1.0",
    publisher: {
      "@type": "Organization",
      name: SITE.publisher.name,
      url: SITE.publisher.url,
    },
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "USD",
        description: "Core regulation tools, Daily Anchor, breathing sessions.",
      },
      {
        "@type": "Offer",
        name: "Premium Monthly",
        price: "9.99",
        priceCurrency: "USD",
        billingDuration: "P1M",
        description: "Neural Regulation Score, Pattern Intelligence, multiple Tracks.",
      },
      {
        "@type": "Offer",
        name: "Premium Yearly",
        price: "69.00",
        priceCurrency: "USD",
        billingDuration: "P1Y",
        description: "All Premium features, two months free.",
      },
    ],
    featureList: [
      "Neural Regulation Score",
      "Nervous System Digital Twin",
      "AI Discipline Architect",
      "Pattern Intelligence",
      "Adaptive Atmosphere",
      "Adaptive Parasympathetic Breathing Engine",
      "Mindful Walking",
      "Emotional Body Scan",
      "Reflective Voice",
      "Apple Watch integration",
    ],
  };
  return <JsonLd id="ld-mobileapp" data={data} />;
}

export function FAQJsonLd({ items }: { items: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };
  return <JsonLd id="ld-faq" data={data} />;
}

export function BreadcrumbsJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.href.startsWith("http") ? it.href : `${SITE.url}${it.href}`,
    })),
  };
  return <JsonLd id="ld-breadcrumbs" data={data} />;
}
