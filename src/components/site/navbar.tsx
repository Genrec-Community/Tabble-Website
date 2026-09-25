"use client";

import React, { useEffect, useState } from "react";
import { RouteLink, useSiteRoute, type Route } from "@/lib/site/router";
import { NAV_ITEMS } from "@/lib/site/content";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ArrowRight } from "lucide-react";

export function Navbar() {
  const route = useSiteRoute();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLink = (r: Route, label: string, className: string) => (
    <RouteLink
      route={r}
      onClick={() => setOpen(false)}
      aria-current={route === r ? "page" : undefined}
      className={className}
    >
      {label}
      {route === r && (
        <span
          className="absolute inset-x-4 -bottom-0.5 hidden h-0.5 rounded-full bg-tangerine lg:block"
          aria-hidden="true"
        />
      )}
    </RouteLink>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-md border-b border-border shadow-[0_1px_12px_rgba(43,26,16,0.04)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Logo compact />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = route === item.route;
            return (
              <li key={item.route} className="relative">
                {navLink(
                  item.route,
                  item.label,
                  `relative rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                    active ? "text-ember" : "text-ink-soft hover:text-ink"
                  }`
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" className="text-ink-soft hover:text-ink">
            <RouteLink route="signup">Sign up</RouteLink>
          </Button>
          <Button
            asChild
            className="bg-tangerine-deep hover:bg-tangerine-deep/90 text-primary-foreground shadow-[0_6px_20px_-6px_rgba(224,96,10,0.5)]"
          >
            <RouteLink route="request-access">
              Request access
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </RouteLink>
          </Button>
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11 border-border bg-card"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-cream border-border p-0 flex flex-col"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <Logo compact />
              </div>
              <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const active = route === item.route;
                    return (
                      <li key={item.route}>
                        {navLink(
                          item.route,
                          item.label,
                          `flex min-h-11 w-full items-center rounded-xl px-4 py-2.5 text-base font-medium transition-colors ${
                            active
                              ? "bg-tangerine-soft text-ember"
                              : "text-ink hover:bg-sand/60"
                          }`
                        )}
                      </li>
                    );
                  })}
                </ul>
                <div className="my-4 h-px bg-border" aria-hidden="true" />
                <ul className="space-y-1">
                  <li>
                    {navLink(
                      "signup",
                      "Sign up",
                      "flex min-h-11 w-full items-center rounded-xl px-4 py-2.5 text-base font-medium text-ink hover:bg-sand/60"
                    )}
                  </li>
                  <li>
                    {navLink(
                      "contact",
                      "Contact",
                      "flex min-h-11 w-full items-center rounded-xl px-4 py-2.5 text-base font-medium text-ink hover:bg-sand/60"
                    )}
                  </li>
                </ul>
              </nav>
              <div className="border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <Button
                  asChild
                  className="h-12 w-full bg-tangerine-deep hover:bg-tangerine-deep/90 text-primary-foreground text-base"
                >
                  <RouteLink route="request-access">
                    Request access
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </RouteLink>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
