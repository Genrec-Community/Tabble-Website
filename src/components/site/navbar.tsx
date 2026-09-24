"use client";

import React, { useEffect, useState } from "react";
import { useRouter, type Route } from "@/lib/site/router";
import { NAV_ITEMS } from "@/lib/site/content";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ArrowRight } from "lucide-react";

export function Navbar() {
  const { route, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (r: Route) => {
    setOpen(false);
    navigate(r);
  };

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
        <Logo onClick={() => go("home")} compact />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = route === item.route;
            return (
              <li key={item.route}>
                <button
                  type="button"
                  onClick={() => go(item.route)}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                    active
                      ? "text-ember"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-tangerine"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            variant="ghost"
            className="text-ink-soft hover:text-ink"
            onClick={() => go("signup")}
          >
            Sign up
          </Button>
          <Button
            className="bg-tangerine-deep hover:bg-tangerine-deep/90 text-primary-foreground shadow-[0_6px_20px_-6px_rgba(224,96,10,0.5)]"
            onClick={() => go("request-access")}
          >
            Request access
            <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
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
                <Logo onClick={() => go("home")} compact />
              </div>
              <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const active = route === item.route;
                    return (
                      <li key={item.route}>
                        <button
                          type="button"
                          onClick={() => go(item.route)}
                          aria-current={active ? "page" : undefined}
                          className={`flex min-h-11 w-full items-center rounded-xl px-4 py-2.5 text-base font-medium transition-colors ${
                            active
                              ? "bg-tangerine-soft text-ember"
                              : "text-ink hover:bg-sand/60"
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <div className="my-4 h-px bg-border" aria-hidden="true" />
                <ul className="space-y-1">
                  <li>
                    <button
                      type="button"
                      onClick={() => go("signup")}
                      className="flex min-h-11 w-full items-center rounded-xl px-4 py-2.5 text-base font-medium text-ink hover:bg-sand/60"
                    >
                      Sign up
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => go("contact")}
                      className="flex min-h-11 w-full items-center rounded-xl px-4 py-2.5 text-base font-medium text-ink hover:bg-sand/60"
                    >
                      Contact
                    </button>
                  </li>
                </ul>
              </nav>
              <div className="border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <Button
                  className="h-12 w-full bg-tangerine-deep hover:bg-tangerine-deep/90 text-primary-foreground text-base"
                  onClick={() => go("request-access")}
                >
                  Request access
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
