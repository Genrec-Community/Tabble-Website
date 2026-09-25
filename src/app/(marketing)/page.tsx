import { HomePage } from "@/components/site/pages/home";
import { pageMetadata, JsonLd, organizationJsonLd, softwareAppJsonLd } from "@/lib/site/seo";

export const metadata = pageMetadata({
  title: "Tabble — QR Code Ordering & Kitchen Display System for Restaurants",
  description:
    "Guests scan the QR code on the table, browse your digital menu, order and pay from their phone — and every order lands on your kitchen screen the moment it's placed. Now onboarding the first 50 restaurants.",
  path: "/",
});

export default function Page() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={softwareAppJsonLd()} />
      <HomePage />
    </>
  );
}
