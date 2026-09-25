"use client";

import { RouteLink, type Route } from "@/lib/site/router";
import { BRAND } from "@/lib/site/content";
import { FooterLogo } from "./logo";

const COLUMNS: { title: string; links: { label: string; route: Route }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", route: "features" },
      { label: "How it works", route: "how-it-works" },
      { label: "Pricing", route: "pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", route: "about" },
      { label: "Contact", route: "contact" },
      { label: "FAQ", route: "faq" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Sign up", route: "signup" },
      { label: "Request access", route: "request-access" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto rounded-t-[2.5rem] bg-espresso text-cream/90 shadow-[0_-18px_48px_-28px_rgba(34,17,7,0.45)]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <FooterLogo />
            <p className="mt-4 text-sm leading-relaxed text-cream/70">
              {BRAND.tagline} Built with restaurants, for the Friday-night
              rush.
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-medium text-tangerine transition-colors hover:text-tangerine-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {BRAND.email}
            </a>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-cream/50">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <RouteLink
                      route={link.route}
                      className="flex min-h-11 items-center rounded-md text-sm text-cream/80 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {link.label}
                    </RouteLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-cream/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-cream/60">
            © {year} {BRAND.name}. Made for restaurants and the people who run them.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <RouteLink
              route="terms"
              className="inline-flex min-h-11 items-center rounded-md text-sm text-cream/60 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Terms of Service
            </RouteLink>
            <RouteLink
              route="privacy"
              className="inline-flex min-h-11 items-center rounded-md text-sm text-cream/60 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Privacy Policy
            </RouteLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
