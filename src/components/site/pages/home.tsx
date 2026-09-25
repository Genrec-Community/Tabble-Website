"use client";

import React from "react";
import { RouteLink } from "@/lib/site/router";
import { HERO, PROBLEMS, FEATURES } from "@/lib/site/content";
import { HeroPhone, DEMO_MENU } from "../phone-demo";
import { OldWaySection } from "../sections/old-way";
import { OrderRelaySection } from "../sections/order-relay";
import { FoundingTableSection } from "../sections/founding-table";
import { StepsBentoSection } from "../sections/steps-bento";
import { FaqMarqueeSection } from "../sections/faq-marquee";
import { Reveal, Stagger, StaggerItem } from "../reveal";
import { Section, H2, CTAButtons, PillBadge } from "../ui-bits";
import { Button } from "@/components/ui/button";
import {
  ChefHat,
  Wallet,
  BarChart3,
  Store,
  Smartphone,
  Users,
  Check,
  ArrowRight,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

const FEATURE_ICONS = {
  chef: ChefHat,
  wallet: Wallet,
  bar: BarChart3,
  store: Store,
  smartphone: Smartphone,
  users: Users,
} as const;

function HeroSection() {
  return (
    <section
      id="hero"
      data-section="hero"
      className="relative overflow-hidden bg-cream warm-glow"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:pb-24 lg:pt-36">
        <div>
          <h1 className="rise rise-1 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-ink text-balance sm:text-6xl lg:text-[4.2rem]">
            Every table becomes your best{" "}
            <span className="relative inline-block text-tangerine-deep">
              waiter.
              <svg
                viewBox="0 0 220 12"
                className="absolute -bottom-1 left-0 w-full"
                aria-hidden="true"
              >
                <path
                  d="M3 9c60-5.5 140-5.5 214-2.5"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity="0.45"
                />
              </svg>
            </span>
          </h1>
          <p className="rise rise-2 mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            {HERO.sub}
          </p>
          <div className="rise rise-3 mt-8">
            <CTAButtons
              primaryLabel={HERO.ctaPrimary}
              secondaryLabel={HERO.ctaSecondary}
              secondaryRoute="how-it-works"
            />
          </div>
          <p className="rise rise-4 mt-6 flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
            <BadgeCheck
              className="mt-0.5 h-4.5 w-4.5 shrink-0 text-tangerine-deep"
              aria-hidden="true"
            />
            {HERO.trust}
          </p>
        </div>

        <div className="relative lg:pl-6">
          <HeroPhone menu={DEMO_MENU} />
        </div>
      </div>

      {/* honest product numbers strip */}
      <div className="border-t border-border bg-cream/70 backdrop-blur-sm">
        <dl className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-border px-4 sm:px-6 lg:px-8">
          {PROBLEMS.statLine.map((s, i) => (
            <div key={s.label} className="flex items-baseline justify-center gap-2 py-5">
              <dt className="sr-only">{s.label}</dt>
              <dd className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-semibold text-tangerine-deep sm:text-4xl">
                  {s.value}
                </span>
                <span className="max-w-28 text-xs leading-tight text-ink-soft sm:text-sm">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <Section
      tone="white"
      id="features"
      className="relative z-10 -mt-6 rounded-t-[2.5rem] shadow-[0_-18px_48px_-28px_rgba(34,17,7,0.45)]"
    >
      {/* centered header — Petpooja pattern */}
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <PillBadge>{FEATURES.kicker}</PillBadge>
        </Reveal>
        <Reveal delay={0.08}>
          <H2 className="mt-5">{FEATURES.headline}</H2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Menu, orders, kitchen, payments and insights — one calm system that
            runs itself while you run the floor.
          </p>
        </Reveal>
      </div>

      {/* hero feature — visual weight tier 1 */}
      <Reveal delay={0.1}>
        <article className="mt-14 grid overflow-hidden rounded-[2rem] bg-cream shadow-[0_2px_24px_-12px_rgba(43,26,16,0.12)] lg:grid-cols-2">
          <div className="p-8 sm:p-12">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-tangerine-soft text-ember">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-semibold text-ink sm:text-3xl">
              {FEATURES.hero.title}
            </h3>
            <p className="mt-3 leading-relaxed text-ink-soft">{FEATURES.hero.body}</p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {FEATURES.hero.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-ink">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-tangerine-deep"
                    aria-hidden="true"
                  />
                  {pt}
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant="ghost"
              className="mt-7 h-12 px-5 text-sm font-bold text-tangerine-deep hover:bg-tangerine-soft"
            >
              <RouteLink route="features">
                Explore all features
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </RouteLink>
            </Button>
          </div>
          {/* menu-editor visual */}
          <div className="relative min-h-64 bg-sand/70 p-7 sm:p-10">
            <div
              className="dotted-grid absolute inset-0 opacity-60"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-sm space-y-3">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-[0_16px_40px_-20px_rgba(43,26,16,0.3)]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-ink">Butter Chicken</p>
                    <p className="text-xs text-ink-soft">Mains · Best seller</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-sand px-2.5 py-1 text-xs font-bold text-ink">
                      ₹320
                    </span>
                    <span className="flex h-6 w-11 items-center rounded-full bg-tangerine px-0.5">
                      <span className="ml-auto h-5 w-5 rounded-full bg-white shadow" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4 opacity-70">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-ink">Paneer Tikka</p>
                    <p className="text-xs text-ink-soft">Starters</p>
                  </div>
                  <span className="rounded-lg border border-destructive/30 bg-destructive/10 px-2.5 py-1 text-xs font-bold text-destructive">
                    Sold out
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-dashed border-tangerine/50 bg-tangerine-soft/50 p-3.5 text-xs font-semibold text-ember">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-tangerine text-white">
                  +
                </span>
                Add weekend special — goes live Friday 6pm
              </div>
            </div>
          </div>
        </article>
      </Reveal>

      {/* checkerboard masonry — alternating tints, middle column staggered */}
      <Stagger
        gap={0.07}
        className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {FEATURES.items.map((f, i) => {
          const Icon = FEATURE_ICONS[f.icon as keyof typeof FEATURE_ICONS];
          const tinted = i % 2 === 1;
          const middleCol = i % 3 === 1;
          return (
            <StaggerItem key={f.title} className={`h-full ${middleCol ? "lg:mt-8" : ""}`}>
              <article
                className={`group h-full rounded-[1.75rem] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(43,26,16,0.25)] ${
                  tinted ? "bg-tangerine-soft/50" : "bg-cream"
                }`}
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors group-hover:bg-tangerine group-hover:text-white ${
                    tinted
                      ? "bg-white text-ember shadow-sm"
                      : "bg-tangerine-soft text-ember"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{f.body}</p>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}

function FinalCtaSection() {
  return (
    <section
      id="final-cta"
      data-section="final-cta"
      className="relative overflow-hidden bg-cream warm-glow warm-glow-b"
    >
      {/* Petpooja radar — concentric dashed circles radiating from the CTA */}
      <svg
        className="absolute left-1/2 top-1/2 h-[880px] w-[880px] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 880 880"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="440" cy="440" r="190" stroke="#f97316" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="3 12" />
        <circle cx="440" cy="440" r="310" stroke="#f97316" strokeOpacity="0.22" strokeWidth="1.5" strokeDasharray="3 12" />
        <circle cx="440" cy="440" r="430" stroke="#f97316" strokeOpacity="0.15" strokeWidth="1.5" strokeDasharray="3 12" />
      </svg>
      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink text-balance sm:text-5xl">
            Your tables are ready to work the rush.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink-soft">
            Join the founding cohort and turn every table into your best
            waiter. Setup is on us, founding pricing is forever.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-9 flex justify-center">
            <CTAButtons
              primaryLabel="Request early access"
              secondaryLabel="Talk to us"
              secondaryRoute="contact"
              align="center"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <HeroSection />
      <OldWaySection />
      <StepsBentoSection />
      <OrderRelaySection />
      <FeaturesSection />
      <FoundingTableSection />
      <FaqMarqueeSection />
      <FinalCtaSection />
    </>
  );
}
