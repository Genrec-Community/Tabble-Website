import { permanentRedirect } from "next/navigation";

/**
 * Public plan pricing has been retired — Tabble is onboarded personally.
 * Old /pricing links (search results, shared URLs) land on request-access.
 */
export default function Page() {
  permanentRedirect("/request-access");
}
