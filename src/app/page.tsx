"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RouterProvider, useRouter } from "@/lib/site/router";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { HomePage } from "@/components/site/pages/home";
import { FeaturesPage } from "@/components/site/pages/features";
import { HowItWorksPage } from "@/components/site/pages/how-it-works";
import { PricingPage } from "@/components/site/pages/pricing";
import { AboutPage } from "@/components/site/pages/about";
import { ContactPage } from "@/components/site/pages/contact";
import { FaqPage } from "@/components/site/pages/faq";
import { LegalPage } from "@/components/site/pages/legal";
import { SignupPage } from "@/components/site/pages/signup";
import { RequestAccessPage } from "@/components/site/pages/request-access";

const PAGES = {
  home: HomePage,
  features: FeaturesPage,
  "how-it-works": HowItWorksPage,
  pricing: PricingPage,
  about: AboutPage,
  contact: ContactPage,
  faq: FaqPage,
  terms: () => <LegalPage kind="terms" />,
  privacy: () => <LegalPage kind="privacy" />,
  signup: SignupPage,
  "request-access": RequestAccessPage,
} as const;

function PageSwitcher() {
  const { route } = useRouter();
  const reduced = useReducedMotion();
  const Page = PAGES[route];

  useEffect(() => {
    // set document title per route for a real multi-page feel
    const titles: Record<string, string> = {
      home: "Tabble — QR dine-in ordering & restaurant OS",
      features: "Features — Tabble",
      "how-it-works": "How it works — Tabble",
      pricing: "Pricing — Tabble",
      about: "About — Tabble",
      contact: "Contact — Tabble",
      faq: "FAQ — Tabble",
      terms: "Terms of Service — Tabble",
      privacy: "Privacy Policy — Tabble",
      signup: "Get early access — Tabble",
      "request-access": "Request early access — Tabble",
    };
    document.title = titles[route] ?? titles.home;
  }, [route]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={route}
        id="main-content"
        initial={reduced ? undefined : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: -10 }}
        transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
        className="flex flex-1 flex-col"
      >
        <Page />
      </motion.main>
    </AnimatePresence>
  );
}

export default function Site() {
  return (
    <RouterProvider>
      {/* sticky-footer layout: footer pushed down naturally on long pages */}
      <div className="flex min-h-screen flex-col bg-background">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-espresso focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-cream"
        >
          Skip to main content
        </a>
        <Navbar />
        <PageSwitcher />
        <Footer />
      </div>
    </RouterProvider>
  );
}
