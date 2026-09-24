"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Route =
  | "home"
  | "features"
  | "how-it-works"
  | "pricing"
  | "about"
  | "contact"
  | "faq"
  | "terms"
  | "privacy"
  | "signup"
  | "request-access";

export const ROUTE_HASHES: Record<Route, string> = {
  home: "#/",
  features: "#/features",
  "how-it-works": "#/how-it-works",
  pricing: "#/pricing",
  about: "#/about",
  contact: "#/contact",
  faq: "#/faq",
  terms: "#/terms",
  privacy: "#/privacy",
  signup: "#/signup",
  "request-access": "#/request-access",
};

const HASH_ROUTES: Record<string, Route> = Object.fromEntries(
  Object.entries(ROUTE_HASHES).map(([route, hash]) => [hash, route as Route])
);

function routeFromHash(): Route {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash || "#/";
  return HASH_ROUTES[hash] ?? "home";
}

type RouterCtx = {
  route: Route;
  navigate: (route: Route, anchor?: string) => void;
};

const Ctx = createContext<RouterCtx>({ route: "home", navigate: () => {} });

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [route, setRoute] = useState<Route>("home");

  useEffect(() => {
    const onHash = () => {
      setRoute(routeFromHash());
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = useCallback((next: Route, anchor?: string) => {
    const hash = ROUTE_HASHES[next];
    if (window.location.hash === hash) {
      // same route — just scroll
      if (anchor) {
        document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    window.location.hash = hash;
    if (anchor) {
      // wait for the new page to mount, then scroll to anchor
      setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    }
  }, []);

  return <Ctx.Provider value={{ route, navigate }}>{children}</Ctx.Provider>;
}

export function useRouter() {
  return useContext(Ctx);
}
