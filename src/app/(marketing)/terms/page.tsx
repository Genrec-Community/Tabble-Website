import { LegalPage } from "@/components/site/pages/legal";
import { pageMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata = pageMetadata({
  title: "Terms of Service — Tabble",
  description:
    "The terms that govern your use of the Tabble QR code ordering platform, the restaurant dashboard and related services.",
  path: "/terms",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Terms of Service", path: "/terms" }])} />
      <LegalPage kind="terms" />
    </>
  );
}
