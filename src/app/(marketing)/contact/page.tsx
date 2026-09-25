import { ContactPage } from "@/components/site/pages/contact";
import { pageMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/site/seo";

export const metadata = pageMetadata({
  title: "Contact Tabble — Talk to a Human",
  description:
    "Questions about QR ordering for your restaurant? Reach the Tabble team — access requests, partnerships and press all reach a person, usually answered within a day.",
  path: "/contact",
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <ContactPage />
    </>
  );
}
