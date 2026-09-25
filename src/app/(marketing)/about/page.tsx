import { AboutPage } from "@/components/site/pages/about";
import { pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata({
  title: "About Tabble — Built With Indian Restaurants",
  description:
    "Tabble is a restaurant SaaS team building QR code ordering the honest way — personally onboarding the first 50 founding restaurants and shipping what their floors actually need.",
  path: "/about",
});

export default function Page() {
  return <AboutPage />;
}
