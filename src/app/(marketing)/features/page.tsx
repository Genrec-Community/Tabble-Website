import { FeaturesPage } from "@/components/site/pages/features";
import { pageMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata = pageMetadata({
  title: "QR Code Ordering Features for Restaurants — Tabble",
  description:
    "Photo-first digital menus, a live kitchen display system, built-in UPI payments and sales insights — every QR ordering feature your floor needs, on any device you already own.",
  path: "/features",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Features", path: "/features" }])} />
      <FeaturesPage />
    </>
  );
}
