import { SignupPage } from "@/components/site/pages/signup";
import { pageMetadata } from "@/lib/site/seo";

export const metadata = pageMetadata({
  title: "Sign Up — Join the Founding Restaurants — Tabble",
  description:
    "Create your Tabble account and join the founding cohort — the first 50 restaurants lock founding pricing for life.",
  path: "/signup",
});

export default function Page() {
  return <SignupPage />;
}
