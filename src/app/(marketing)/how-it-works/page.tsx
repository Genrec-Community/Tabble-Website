import { HowItWorksPage } from "@/components/site/pages/how-it-works";
import { pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata({
  title: "How QR Ordering Works — From Table Scan to Kitchen — Tabble",
  description:
    "Guests scan the table QR code, order from their seats and pay by UPI — the full journey from scan to kitchen screen in four steps, with no app download and no new hardware.",
  path: "/how-it-works",
});

export default function Page() {
  return <HowItWorksPage />;
}
