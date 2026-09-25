import { LegalPage } from "@/components/site/pages/legal";
import { pageMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy — Tabble",
  description:
    "What Tabble collects from restaurant accounts and guest orders, how it's used, and the control you have over your data.",
  path: "/privacy",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy" }])} />
      <LegalPage kind="privacy" />
    </>
  );
}
