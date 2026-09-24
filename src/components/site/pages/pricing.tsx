"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PRICING } from "@/lib/site/content";
import { useRouter } from "@/lib/site/router";
import { Reveal, Stagger, StaggerItem } from "../reveal";
import { Section, Kicker, CTAButtons } from "../ui-bits";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Minus, ShieldCheck, MonitorSmartphone, Lock } from "lucide-react";

const GUARANTEE_ICONS = [ShieldCheck, MonitorSmartphone, Lock];

function formatINR(n: number): string {
  return n.toLocaleString("en-IN");
}

function PricingCard({
  plan,
  yearly,
  index,
}: {
  plan: (typeof PRICING.monthly)[number];
  yearly: boolean;
  index: number;
}) {
  const { navigate } = useRouter();
  const price = yearly ? plan.yearly : plan.price;
  const monthlyEq = plan.yearly ? Math.round(plan.yearly / 12) : plan.price;
  const save = plan.price * 12 - plan.yearly;

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.2, 0, 0, 1] }}
      className={`relative flex h-full flex-col rounded-3xl border p-7 sm:p-8 ${
        plan.recommended
          ? "border-tangerine bg-espresso text-cream shadow-[0_36px_72px_-32px_rgba(34,17,7,0.5)] lg:-my-3 lg:py-11"
          : "border-border bg-card text-ink"
      }`}
    >
      {plan.recommended && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-tangerine px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-espresso shadow-lg">
          Recommended for most
        </span>
      )}
      <h3 className={`font-display text-2xl font-semibold ${plan.recommended ? "text-cream" : "text-ink"}`}>
        {plan.name}
      </h3>
      <p className={`mt-1.5 text-sm ${plan.recommended ? "text-cream/70" : "text-ink-soft"}`}>
        {plan.blurb}
      </p>

      <div className="mt-6 flex items-baseline gap-1.5">
        <span className={`font-display text-5xl font-semibold tracking-tight ${plan.recommended ? "text-cream" : "text-ink"}`}>
          {price === 0 ? "₹0" : `₹${formatINR(price)}`}
        </span>
        <span className={`text-sm ${plan.recommended ? "text-cream/60" : "text-ink-soft"}`}>
          {price === 0 ? "forever" : yearly ? "/year" : "/month"}
        </span>
      </div>
      {yearly && price > 0 && (
        <p className={`mt-1.5 text-xs font-semibold ${plan.recommended ? "text-tangerine-soft" : "text-ember"}`}>
          ₹{formatINR(monthlyEq)}/mo equivalent — saves ₹{formatINR(save)} a year
        </p>
      )}

      <Button
        className={`mt-7 h-12 w-full text-base font-bold ${
          plan.recommended
            ? "bg-tangerine text-espresso hover:bg-tangerine/90 shadow-[0_10px_32px_-8px_rgba(249,115,22,0.5)]"
            : "bg-tangerine-deep text-primary-foreground hover:bg-tangerine-deep/90"
        }`}
        onClick={() => navigate("request-access")}
      >
        {plan.cta}
      </Button>

      <ul className="mt-7 space-y-3">
        {plan.features.map((f) => (
          <li
            key={f}
            className={`flex items-start gap-2.5 text-sm ${
              plan.recommended ? "text-cream/85" : "text-ink"
            }`}
          >
            <Check
              className={`mt-0.5 h-4 w-4 shrink-0 ${plan.recommended ? "text-tangerine" : "text-tangerine-deep"}`}
              aria-hidden="true"
            />
            {f}
          </li>
        ))}
        {plan.missing.map((f) => (
          <li
            key={f}
            className={`flex items-start gap-2.5 text-sm line-through decoration-1 ${
              plan.recommended ? "text-cream/35" : "text-ink-soft/50"
            }`}
          >
            <Minus className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-cream warm-glow pt-28 sm:pt-36">
        <div className="mx-auto max-w-3xl px-4 pb-10 text-center sm:px-6 sm:pb-14">
          <p className="rise rise-1">
            <Kicker>{PRICING.kicker}</Kicker>
          </p>
          <h1 className="rise rise-2 mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl">
            {PRICING.headline}
          </h1>
          <p className="rise rise-3 mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            {PRICING.sub}
          </p>

          {/* billing toggle */}
          <div
            className="rise rise-4 mt-8 inline-flex items-center rounded-full border border-border bg-card p-1.5"
            role="group"
            aria-label="Billing period"
          >
            <button
              type="button"
              onClick={() => setYearly(false)}
              aria-pressed={!yearly}
              className={`min-h-11 rounded-full px-5 text-sm font-bold transition-colors ${
                !yearly ? "bg-espresso text-cream" : "text-ink-soft hover:text-ink"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              aria-pressed={yearly}
              className={`flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-bold transition-colors ${
                yearly ? "bg-espresso text-cream" : "text-ink-soft hover:text-ink"
              }`}
            >
              Yearly
              <span className="rounded-full bg-tangerine/20 px-2 py-0.5 text-[11px] font-bold text-tangerine-deep">
                2 months free
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* plans */}
      <section className="bg-cream pb-4 pt-6 sm:pt-10">
        <div className="mx-auto grid max-w-6xl items-stretch gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:gap-5 lg:px-8">
          {PRICING.monthly.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} yearly={yearly} index={i} />
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-2xl px-4 text-center text-sm text-ink-soft">
          Prices exclude applicable taxes. Founding restaurants lock their rate
          for life — see the founding cohort terms during onboarding.
        </p>
      </section>

      {/* guarantees */}
      <Section tone="white" id="guarantee">
        <Stagger className="grid gap-5 md:grid-cols-3">
          {PRICING.guarantee.map((g, i) => {
            const Icon = GUARANTEE_ICONS[i];
            return (
              <StaggerItem key={g.title}>
                <article className="flex h-full gap-4 rounded-2xl border border-border bg-cream p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tangerine-soft text-ember">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{g.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{g.body}</p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* comparison table */}
      <Section tone="cream" id="compare">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Compare plans, line by line.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-8 overflow-x-auto rounded-3xl border border-border bg-card">
            <table className="w-full min-w-640 border-collapse text-left">
              <caption className="sr-only">Feature comparison of Tabble plans</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="p-4 text-sm font-bold text-ink-soft sm:p-5">
                    Feature
                  </th>
                  {PRICING.compare.columns.map((c) => (
                    <th
                      key={c}
                      scope="col"
                      className={`p-4 text-center text-sm font-bold sm:p-5 ${
                        c === "Growth" ? "bg-tangerine-soft/60 text-ember" : "text-ink"
                      }`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRICING.compare.rows.map((row) => (
                  <tr key={row.feature} className="border-b border-border/70 last:border-0">
                    <th scope="row" className="p-4 text-sm font-medium text-ink sm:p-5">
                      {row.feature}
                    </th>
                    {row.values.map((v, vi) => (
                      <td
                        key={vi}
                        className={`p-4 text-center text-sm sm:p-5 ${
                          PRICING.compare.columns[vi] === "Growth"
                            ? "bg-tangerine-soft/40 font-semibold text-ink"
                            : "text-ink-soft"
                        }`}
                      >
                        {v === true ? (
                          <>
                            <Check
                              className="mx-auto h-4 w-4 text-tangerine-deep"
                              aria-label="Included"
                            />
                            <span className="sr-only">Included</span>
                          </>
                        ) : v === false ? (
                          <>
                            <Minus className="mx-auto h-4 w-4 text-ink-soft/40" aria-label="Not included" />
                            <span className="sr-only">Not included</span>
                          </>
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <p className="mt-3 text-xs text-ink-soft">
          *Unlimited displays within fair use for your outlet(s).
        </p>
      </Section>

      {/* pricing faqs */}
      <Section tone="white" id="pricing-faq">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Kicker>Before you decide</Kicker>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                The money questions.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {PRICING.faqs.map((faq, i) => (
                <AccordionItem key={faq.q} value={`pq-${i}`} className="border-border">
                  <AccordionTrigger className="py-5 text-left font-display text-lg font-semibold text-ink hover:no-underline hover:text-tangerine-deep">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 leading-relaxed text-ink-soft">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 rounded-3xl bg-espresso p-8 text-center sm:p-12">
            <h2 className="font-display text-2xl font-semibold text-cream text-balance sm:text-3xl">
              Lock founding pricing while the cohort is open.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-cream/70">
              The first 50 restaurants keep their rate forever, plus free menu
              setup and a direct line to the founders.
            </p>
            <div className="mt-7 flex justify-center">
              <CTAButtons primaryLabel="Request early access" dark />
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
