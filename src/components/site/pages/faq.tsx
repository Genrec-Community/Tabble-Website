"use client";

import React from "react";
import { FAQS } from "@/lib/site/content";
import { RouteLink } from "@/lib/site/router";
import { Reveal } from "../reveal";
import { Section, Kicker, CTAButtons } from "../ui-bits";
import { Breadcrumbs } from "../breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Users,
  Wallet,
  Wrench,
  Wifi,
  type LucideIcon,
} from "lucide-react";

type QA = { q: string; a: string };
type Group = { id: string; label: string; icon: LucideIcon; items: QA[] };

/** Grouped by what owners actually ask about — anchors match the quick-nav. */
const GROUPS: Group[] = [
  {
    id: "guests",
    label: "Guests",
    icon: Users,
    items: FAQS.filter((f) => f.tag === "Guests").map(({ q, a }) => ({ q, a })),
  },
  {
    id: "payments-pricing",
    label: "Payments & pricing",
    icon: Wallet,
    items: FAQS.filter(
      (f) => f.tag === "Payments" || f.tag === "Pricing"
    ).map(({ q, a }) => ({ q, a })),
  },
  {
    id: "setup-hardware",
    label: "Setup & hardware",
    icon: Wrench,
    items: FAQS.filter((f) => f.tag === "Setup" || f.tag === "Hardware").map(({ q, a }) => ({ q, a })),
  },
  {
    id: "reliability",
    label: "Reliability",
    icon: Wifi,
    items: FAQS.filter((f) => f.tag === "Reliability").map(({ q, a }) => ({ q, a })),
  },
];

function GroupSection({ group, delay }: { group: Group; delay: number }) {
  const Icon = group.icon;
  return (
    <section aria-labelledby={`faq-${group.id}`} className="mt-12 first:mt-0">
      <Reveal delay={delay}>
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tangerine-soft text-ember">
            <Icon className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <h2
            id={`faq-${group.id}`}
            className="font-display text-xl font-semibold text-ink sm:text-2xl"
          >
            {group.label}
          </h2>
        </div>
      </Reveal>
      <Reveal delay={delay + 0.06}>
        <Accordion
          type="single"
          collapsible
          className="mt-5 space-y-3"
        >
          {group.items.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`${group.id}-${i}`}
              className="rounded-2xl border border-border bg-cream px-5 transition-colors data-[state=open]:border-tangerine/40 data-[state=open]:bg-card hover:border-tangerine/40 sm:px-6"
            >
              <AccordionTrigger className="gap-3 py-5 text-left text-[15px] font-semibold leading-snug text-ink hover:no-underline sm:text-base [&>svg]:ml-auto [&>svg]:shrink-0 [&>svg]:h-4.5 [&>svg]:w-4.5 [&>svg]:text-ember/70 [&>svg]:stroke-[2.5]">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-ink-soft sm:text-[15px]">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}

export function FaqPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream warm-glow pt-28 sm:pt-36">
        <div className="mx-auto max-w-3xl px-4 pb-12 text-center sm:px-6 sm:pb-14">
          <div className="rise rise-1 flex justify-center">
            <Breadcrumbs trail={["FAQ"]} />
          </div>
          <div className="rise rise-1 mt-5 flex justify-center">
            <Kicker>FAQ</Kicker>
          </div>
          <h1 className="rise rise-2 mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl">
            Everything restaurant owners ask us about QR ordering.
          </h1>
          <p className="rise rise-3 mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Straight answers about guests, UPI payments, setup, hardware and
            what it costs — every one in the open. If yours isn&apos;t here,
            our contact page reaches a human.
          </p>
          {/* category quick-nav — jump straight to what you came for */}
          <div className="rise rise-4 mt-7 flex flex-wrap items-center justify-center gap-2">
            {GROUPS.map((g) => (
              <a
                key={g.id}
                href={`#faq-${g.id}`}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-tangerine/40 hover:bg-tangerine-soft hover:text-ember focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <g.icon className="h-3.5 w-3.5 text-tangerine-deep" aria-hidden="true" />
                {g.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <Section
        tone="white"
        id="faq-list"
        className="relative z-10 -mt-6 rounded-t-[2.5rem] shadow-[0_-18px_48px_-28px_rgba(34,17,7,0.45)]"
      >
        <div className="mx-auto max-w-3xl">
          {GROUPS.map((group, i) => (
            <GroupSection key={group.id} group={group} delay={0.02 + i * 0.04} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-16 max-w-3xl rounded-3xl bg-espresso p-8 text-center sm:p-12">
            <h2 className="font-display text-2xl font-semibold text-cream text-balance sm:text-3xl">
              Still weighing it up?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/70">
              Ask us anything directly, or join the founding cohort and see
              Tabble on your own tables this week.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CTAButtons primaryLabel="Request early access" dark />
              <Button
                asChild
                variant="ghost"
                className="min-h-12 px-6 text-base font-semibold text-cream hover:bg-cream/10"
              >
                <RouteLink route="contact">
                  Contact us
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                </RouteLink>
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
