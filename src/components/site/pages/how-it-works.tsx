"use client";

import React from "react";
import { STEPS, FOUNDING } from "@/lib/site/content";
import { Reveal, Stagger, StaggerItem } from "../reveal";
import { Section, Kicker, H2, CTAButtons, ImgSlot } from "../ui-bits";
import { Breadcrumbs } from "../breadcrumbs";
import { IMAGES } from "@/lib/site/images";
import { PhoneCall, UtensilsCrossed, Rocket, Check } from "lucide-react";

const SETUP = [
  {
    icon: PhoneCall,
    title: "Onboarding call",
    body: "A 30-minute call with the Tabble team. We map your menu structure, modifiers and how your floor works — no forms longer than the call itself.",
    time: "Day 1",
  },
  {
    icon: UtensilsCrossed,
    title: "We build your menu",
    body: "We set up your items, sections and pricing, and guide the photo style that makes dishes sell. You review a live preview and approve with comments.",
    time: "Days 2–4",
  },
  {
    icon: Rocket,
    title: "Print, place, go live",
    body: "We send print-ready QR table tents. Put them on tables, open the kitchen display, and your first scan-to-order service begins.",
    time: "Day 5",
  },
];

export function HowItWorksPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream warm-glow pt-28 sm:pt-36">
        <div className="mx-auto max-w-3xl px-4 pb-14 text-center sm:px-6 sm:pb-20">
          <div className="rise rise-1 flex justify-center">
            <Breadcrumbs trail={["How it works"]} />
          </div>
          <p className="rise rise-1 mt-5">
            <Kicker>How Tabble works</Kicker>
          </p>
          <h1 className="rise rise-2 mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl">
            <span className="mb-4 block font-body text-sm font-bold uppercase tracking-[0.14em] text-ember sm:text-base">
              How QR code ordering works, from table scan to kitchen
            </span>
            Scan. Order. Fire. Pay.
          </h1>
          <p className="rise rise-3 mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Four steps for your guests, zero steps for your waiters. Here's the
            whole flow, from the moment a guest sits down to the moment the
            table turns.
          </p>
        </div>
      </section>

      {/* the four guest steps */}
      <Section tone="white" id="flow">
        <ol className="relative space-y-14">
          <span
            className="absolute left-[21px] top-4 hidden h-[calc(100%-2rem)] w-px bg-border sm:block"
            aria-hidden="true"
          />
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.05}>
              <li className="grid items-start gap-8 sm:grid-cols-[44px_1fr_280px] sm:gap-10">
                <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-tangerine/40 bg-tangerine-soft font-display text-sm font-bold text-ember">
                  {step.n}
                </span>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                    {step.title}
                  </h2>
                  <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{step.body}</p>
                  <p className="mt-3 inline-flex rounded-xl bg-tangerine-soft px-3.5 py-2 text-sm font-semibold text-ember">
                    {step.detail}
                  </p>
                </div>
                <div className="hidden sm:block">
                  {i === 0 && (
                    <ImgSlot
                      src={IMAGES.qrScan}
                      alt="A guest scanning the table QR code"
                      ratio="aspect-[3/4]"
                      caption="Any phone camera works"
                    />
                  )}
                  {i === 2 && (
                    <ImgSlot
                      src={IMAGES.chef}
                      alt="A gourmet dish being finished with a sauce pour"
                      ratio="aspect-[3/4]"
                      caption="The kitchen keeps cooking"
                    />
                  )}
                  {i === 3 && (
                    <ImgSlot
                      src={IMAGES.diners}
                      alt="Guests enjoying a meal together outdoors"
                      ratio="aspect-[3/4]"
                      caption="Tables turn faster"
                    />
                  )}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* setup timeline */}
      <Section tone="espresso" id="setup">
        <div className="max-w-2xl">
          <Reveal>
            <Kicker tone="dark">Getting started</Kicker>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-cream text-balance sm:text-4xl">
              From request to live service in about a week.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 leading-relaxed text-cream/75">
              Founding restaurants don't lift a finger on setup. We build the
              menu with you, you approve it, and we hand you the QR codes.
            </p>
          </Reveal>
        </div>
        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {SETUP.map((s, i) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.title}>
                <article className="relative h-full rounded-2xl border border-cream/15 bg-espresso-2/70 p-6">
                  <span className="absolute right-5 top-5 rounded-full border border-tangerine/40 bg-tangerine/15 px-3 py-1 text-[11px] font-bold text-tangerine">
                    {s.time}
                  </span>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-tangerine/15 text-tangerine">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-cream">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70">{s.body}</p>
                  <p className="mt-4 font-display text-sm font-semibold text-cream/40">
                    Step {i + 1} of 3
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="mt-14 grid items-center gap-8 rounded-3xl border border-cream/15 bg-espresso-2/50 p-8 sm:p-10 lg:grid-cols-[1fr_auto]">
            <div>
              <h3 className="font-display text-2xl font-semibold text-cream">
                {FOUNDING.headline}
              </h3>
              <ul className="mt-4 space-y-2">
                {FOUNDING.perks.slice(0, 2).map((perk) => (
                  <li key={perk.title} className="flex items-start gap-2.5 text-sm text-cream/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-tangerine" aria-hidden="true" />
                    {perk.title} — {perk.body}
                  </li>
                ))}
              </ul>
            </div>
            <CTAButtons primaryLabel="Request early access" dark />
          </div>
        </Reveal>
      </Section>

      <Section tone="cream" id="cta">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <H2>See it on your own tables.</H2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 leading-relaxed text-ink-soft">
              The fastest way to understand Tabble is to watch your first
              scan-to-order land on the kitchen screen. Join the founding
              cohort and see it this week.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-8 flex justify-center">
              <CTAButtons
                primaryLabel="Request early access"
                secondaryLabel="Explore features"
                secondaryRoute="features"
                align="center"
              />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
