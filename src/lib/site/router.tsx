"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter as useNextRouter } from "next/navigation";

/**
 * Real-path routing. Every page lives at its own URL (/features, /pricing, …)
 * so each route can carry its own <title>, meta description, canonical and
 * OG tags — the pages are crawlable and individually rankable.
 */

export type Route =
  | "home"
  | "features"
  | "how-it-works"
  | "about"
  | "contact"
  | "faq"
  | "terms"
  | "privacy"
  | "signup"
  | "request-access";

export const ROUTE_PATHS: Record<Route, string> = {
  home: "/",
  features: "/features",
  "how-it-works": "/how-it-works",
  about: "/about",
  contact: "/contact",
  faq: "/faq",
  terms: "/terms",
  privacy: "/privacy",
  signup: "/signup",
  "request-access": "/request-access",
};

const PATH_ROUTES: Record<string, Route> = Object.fromEntries(
  Object.entries(ROUTE_PATHS).map(([route, path]) => [path, route as Route])
);

export function routePath(route: Route, anchor?: string): string {
  const base = ROUTE_PATHS[route] ?? "/";
  return anchor ? `${base}#${anchor}` : base;
}

/**
 * Crawlable internal link. Renders a real <a href> with next/link prefetching.
 * Use everywhere a visitor can click to move between pages — nav, footers, CTAs.
 */
export function RouteLink({
  route,
  anchor,
  children,
  className,
  ...rest
}: {
  route: Route;
  anchor?: string;
  children: React.ReactNode;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link href={routePath(route, anchor)} className={className} {...rest}>
      {children}
    </Link>
  );
}

/** Current route key, derived from the real pathname ("/pricing" → "pricing"). */
export function useSiteRoute(): Route {
  const pathname = usePathname();
  return PATH_ROUTES[pathname] ?? "home";
}

/** Programmatic navigation for flows that navigate after an animation. */
export function useSiteNavigate() {
  const next = useNextRouter();
  return useCallback(
    (to: Route, anchor?: string) => {
      next.push(routePath(to, anchor));
    },
    [next]
  );
}

/** Back-compat shim for remaining consumers ({ route, navigate }). */
export function useRouter() {
  const route = useSiteRoute();
  const navigate = useSiteNavigate();
  return { route, navigate };
}
