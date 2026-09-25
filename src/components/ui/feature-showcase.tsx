// src/components/ui/feature-showcase.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabMedia = {
  value: string; // unique value for Tabs
  label: string; // button label
  src?: string; // image url (optional when content is provided)
  alt?: string;
  /** Rich panel content — a live product mockup rendered instead of an image. */
  content?: React.ReactNode;
};

export type ShowcaseStep = {
  id: string;
  title: string;
  text: string;
};

export type ShowcaseCta = {
  label: string;
  href: string;
};

export type FeatureShowcaseProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** small chips under the description */
  stats?: string[];
  /** accordion steps on the left */
  steps?: ShowcaseStep[];
  /** right-side tabs (image or rich content per tab) */
  tabs: TabMedia[];
  /** which tab is active initially */
  defaultTab?: string;
  /** fixed panel height in px (also applied as min-height) */
  panelMinHeight?: number;
  /** primary / secondary calls to action — hidden when omitted */
  ctaPrimary?: ShowcaseCta;
  ctaSecondary?: ShowcaseCta;
  className?: string;
};

export function FeatureShowcase({
  eyebrow = "Product tour",
  title,
  description,
  stats = [],
  steps = [],
  tabs,
  defaultTab,
  panelMinHeight = 560,
  ctaPrimary,
  ctaSecondary,
  className,
}: FeatureShowcaseProps) {
  const initial = defaultTab ?? (tabs[0]?.value ?? "tab-0");

  return (
    <section className={cn("w-full bg-background text-foreground", className)}>
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 md:grid-cols-12 md:py-20 lg:gap-14 lg:px-8">
        {/* Left column */}
        <div className="md:col-span-6">
          <Badge
            variant="outline"
            className="mb-6 rounded-full border-tangerine/25 bg-tangerine-soft/60 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ember"
          >
            {eyebrow}
          </Badge>

          <h2 className="text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
            {title}
          </h2>

          {description ? (
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}

          {/* Stats chips */}
          {stats.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {stats.map((s, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-muted font-medium text-secondary-foreground"
                >
                  {s}
                </Badge>
              ))}
            </div>
          )}

          {/* Steps (Accordion) */}
          {steps.length > 0 && (
            <div className="mt-10 max-w-xl">
              <Accordion type="single" collapsible className="w-full">
                {steps.map((step, i) => (
                  <AccordionItem key={step.id} value={step.id} className="border-border">
                    <AccordionTrigger className="text-left text-base font-semibold text-ink hover:no-underline hover:text-tangerine-deep">
                      <span className="flex items-baseline gap-3">
                        <span className="font-mono text-xs font-bold text-tangerine-deep/80">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {step.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-8 text-sm leading-relaxed text-muted-foreground">
                      {step.text}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* CTAs */}
              {(ctaPrimary || ctaSecondary) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {ctaPrimary && (
                    <Button
                      asChild
                      size="lg"
                      className="h-13 min-h-12 bg-tangerine-deep px-7 text-base font-bold text-primary-foreground hover:bg-tangerine-deep/90 shadow-[0_10px_32px_-8px_rgba(224,96,10,0.45)]"
                    >
                      <Link href={ctaPrimary.href}>
                        {ctaPrimary.label}
                        <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  )}
                  {ctaSecondary && (
                    <Button
                      asChild
                      size="lg"
                      variant="secondary"
                      className="h-13 min-h-12 border border-border bg-transparent px-6 text-base font-semibold text-ink hover:bg-sand/60"
                    >
                      <Link href={ctaSecondary.href}>{ctaSecondary.label}</Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right column — tabbed media panel */}
        <div className="md:col-span-6">
          <Card
            className="relative overflow-hidden rounded-[2rem] border border-border bg-card/40 p-0 shadow-[0_28px_64px_-36px_rgba(43,26,16,0.4)]"
            style={{ height: panelMinHeight, minHeight: panelMinHeight }}
          >
            <Tabs defaultValue={initial} className="relative h-full w-full">
              {/* Absolute-fill media container */}
              <div className="relative h-full w-full">
                {tabs.map((t, idx) => (
                  <TabsContent
                    key={t.value}
                    value={t.value}
                    className={cn(
                      "absolute inset-0 m-0 h-full w-full",
                      "data-[state=inactive]:hidden"
                    )}
                  >
                    {t.content ? (
                      t.content
                    ) : (
                      <img
                        src={t.src ?? ""}
                        alt={t.alt ?? t.label}
                        className="h-full w-full object-cover"
                        loading={idx === 0 ? "eager" : "lazy"}
                      />
                    )}
                  </TabsContent>
                ))}
              </div>

              {/* Tab controls (pill) */}
              <div className="pointer-events-auto absolute inset-x-0 bottom-4 z-10 flex w-full justify-center px-4">
                <TabsList className="flex max-w-full flex-wrap justify-center gap-1 rounded-2xl border border-border bg-background/85 p-1.5 backdrop-blur supports-[backdrop-filter]:bg-background/75">
                  {tabs.map((t) => (
                    <TabsTrigger
                      key={t.value}
                      value={t.value}
                      className="rounded-xl px-4 py-2 text-sm font-semibold text-ink-soft data-[state=active]:bg-espresso data-[state=active]:text-cream"
                    >
                      {t.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>
          </Card>
        </div>
      </div>
    </section>
  );
}
