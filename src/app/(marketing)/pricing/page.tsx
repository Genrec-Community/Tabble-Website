import { PricingPage } from "@/components/site/pages/pricing";
import { pageMetadata, JsonLd, breadcrumbJsonLd, softwareAppJsonLd } from "@/lib/site/seo";

export const metadata = pageMetadata({
  title: "Pricing — QR Ordering Plans from ₹0 — Tabble",
  description:
    "Simple INR pricing for QR code ordering: start free on Starter, ₹1,499/month for the full ordering system on Growth, ₹3,999/month for chains on Pro. Founding rates locked for life — no hardware to buy, cancel anytime.",
  path: "/pricing",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])} />
      <JsonLd data={softwareAppJsonLd()} />
      <PricingPage />
    </>
  );
}
