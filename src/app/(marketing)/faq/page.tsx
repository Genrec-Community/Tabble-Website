import { FaqPage } from "@/components/site/pages/faq";
import { FAQS } from "@/lib/site/content";
import { pageMetadata, JsonLd, faqJsonLd } from "@/lib/site/seo";

export const metadata = pageMetadata({
  title: "FAQ — QR Code Ordering for Restaurants — Tabble",
  description:
    "Straight answers about QR ordering for restaurants: guest apps, UPI payments, setup time, kitchen hardware, internet outages and what it costs. Everything owners ask us, answered in the open.",
  path: "/faq",
});

export default function Page() {
  const allFaqs = FAQS.map((f) => ({ q: f.q, a: f.a }));
  return (
    <>
      <JsonLd data={faqJsonLd(allFaqs)} />
      <FaqPage />
    </>
  );
}
