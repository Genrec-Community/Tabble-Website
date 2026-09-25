import type { Metadata } from "next";

/**
 * Central SEO config. Update SITE_URL once when the final domain goes live —
 * canonicals, sitemap, robots, OG URLs and JSON-LD all derive from it.
 */
export const SITE_URL = "https://tabble.in";
export const SITE_NAME = "Tabble";
export const SITE_TAGLINE = "Every table becomes your best waiter.";
export const SITE_DESCRIPTION =
  "Tabble is a QR code ordering system for restaurants — guests scan, order and pay from their phone, and every order lands on your kitchen display the moment it's placed. Now onboarding the first 50 restaurants.";
export const SITE_EMAIL = "contact@tabble.in";

/** Per-page metadata: unique title + description, canonical, OG and Twitter. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path === "/" ? "/" : path },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Tabble — QR code ordering and kitchen display system for restaurants",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

/** Renders a JSON-LD structured-data block. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization + WebSite — site identity for the homepage. */
export function organizationJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      email: SITE_EMAIL,
      description: SITE_DESCRIPTION,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  ];
}

/** SoftwareApplication — identity for the product (no public price list; rates are shared on the onboarding call). */
export function softwareAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web browser",
    url: SITE_URL,
    description:
      "QR code ordering and kitchen display system for restaurants. Guests scan a table QR code, order and pay from their phone — no app download — while orders reach the kitchen screen instantly.",
  };
}

/** FAQPage — the Q&As verbatim, for rich FAQ snippets in search results. */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** BreadcrumbList — trail like Home > Features. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
