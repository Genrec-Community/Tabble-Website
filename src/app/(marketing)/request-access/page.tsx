import { RequestAccessPage } from "@/components/site/pages/request-access";
import { pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata({
  title: "Request Early Access — Tabble",
  description:
    "Join the first 50 restaurants on Tabble — QR code ordering with founding pricing locked for life and your menu set up by us, free.",
  path: "/request-access",
});

export default function Page() {
  return <RequestAccessPage />;
}
