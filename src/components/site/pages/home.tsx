"use client";

import React from "react";
import { useRouter } from "@/lib/site/router";
import {
  HERO,
  PROBLEMS,
  STEPS,
  FEATURES,
  FOUNDING,
  FAQS,
} from "@/lib/site/content";
import { HeroPhone, DEMO_MENU } from "../phone-demo";
import { KitchenDisplay } from "../kds-mock";
import { Reveal, Stagger, StaggerItem } from "../reveal";
import { Section, Kicker, H2, CTAButtons, ImgSlot } from "../ui-bits";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { IMAGES } from "@/lib/site/images";

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
          <p className="rise rise-1 inline-flex items-center gap-2 rounded-full border border-tangerine/30 bg-tangerine-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-ember">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {HERO.eyebrow}
          </p>
          <h1 className="rise rise-2 mt-6 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-ink text-balance sm:text-6xl lg:text-[4.2rem]">
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
          <p className="rise rise-3 mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            {HERO.sub}
          </p>
          <div className="rise rise-4 mt-8">
            <CTAButtons
              primaryLabel={HERO.ctaPrimary}
              secondaryLabel={HERO.ctaSecondary}
              secondaryRoute="how-it-works"
            />
          </div>
          <p className="rise rise-5 mt-6 flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
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

function ProblemSection() {
  return (
    <Section tone="white" id="problem">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Reveal>
            <Kicker>{PROBLEMS.kicker}</Kicker>
          </Reveal>
          <Reveal delay={0.08}>
            <H2 className="mt-4">{PROBLEMS.headline}</H2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-lg leading-relaxed text-ink-soft">
              {PROBLEMS.intro}
            </p>
          </Reveal>
        </div>
        <Stagger className="space-y-4">
          {PROBLEMS.pains.map((p, i) => (
            <StaggerItem key={p.title}>
              <article className="flex gap-4 rounded-2xl border border-border bg-cream p-5 sm:p-6">
                <span className="font-display text-2xl font-semibold text-tangerine/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {p.body}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

function StepsSection() {
  const { navigate } = useRouter();
  return (
    <Section tone="cream" id="how-it-works">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div>
          <Reveal>
            <Kicker>How it works</Kicker>
          </Reveal>
          <Reveal delay={0.08}>
            <H2 className="mt-4">
              From scan to kitchen in one breath.
            </H2>
          </Reveal>
          <ol className="mt-10 space-y-0">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.06}>
                <li className="relative flex gap-5 pb-8 last:pb-0">
                  {i < STEPS.length - 1 && (
                    <span
                      className="absolute left-[22px] top-12 h-[calc(100%-3rem)] w-px bg-border"
                      aria-hidden="true"
                    />
                  )}
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-tangerine/40 bg-tangerine-soft font-display text-sm font-bold text-ember">
                    {step.n}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">{step.body}</p>
                    <p className="mt-2 text-sm font-medium text-ember">
                      {step.detail}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.2}>
            <div className="mt-10">
              <CTAButtons
                primaryLabel="Request early access"
                secondaryLabel="Full walkthrough"
                secondaryRoute="how-it-works"
              />
            </div>
          </Reveal>
        </div>
        <div className="space-y-6 lg:sticky lg:top-28">
          <Reveal delay={0.1}>
            <ImgSlot
              src={IMAGES.qrScan}
              alt="A guest scanning the table QR code with a phone"
              ratio="aspect-[4/5]"
              caption="No app. No sign-up. Just scan."
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function ProofSection() {
  return (
    <Section tone="deep" id="proof">
      <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div>
          <Reveal>
            <Kicker>Behind the counter</Kicker>
          </Reveal>
          <Reveal delay={0.08}>
            <H2 className="mt-4">
              Every order lands the moment it's placed.
            </H2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 leading-relaxed text-ink-soft">
              This is the screen your kitchen runs on. Table numbers, items,
              guest-typed notes — no waiter re-entry, no shouted modifications,
              no printer between the guest and the chef. Orders arrive in the
              order they were placed, and the display keeps working through
              the rush.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <ul className="mt-6 space-y-3">
              {[
                "Guest-typed notes reach the kitchen unedited",
                "New orders highlight themselves — nothing gets missed",
                "Runs on any tablet or browser you already own",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf/15">
                    <Check className="h-3 w-3 text-leaf" aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.12} className="relative">
          <div
            className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-tangerine/10 blur-2xl"
            aria-hidden="true"
          />
          <KitchenDisplay />
        </Reveal>
      </div>
    </Section>
  );
}

function FeaturesSection() {
  const { navigate } = useRouter();
  return (
    <Section tone="white" id="features">
      <div className="max-w-2xl">
        <Reveal>
          <Kicker>{FEATURES.kicker}</Kicker>
        </Reveal>
        <Reveal delay={0.08}>
          <H2 className="mt-4">{FEATURES.headline}</H2>
        </Reveal>
      </div>

      {/* hero feature — visual weight tier 1 */}
      <Reveal delay={0.1}>
        <article className="mt-12 grid overflow-hidden rounded-3xl border border-border bg-cream lg:grid-cols-2">
          <div className="p-7 sm:p-10">
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
              variant="ghost"
              className="mt-7 h-12 px-5 text-sm font-bold text-tangerine-deep hover:bg-tangerine-soft"
              onClick={() => navigate("features")}
            >
              Explore all features
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
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

      {/* compact grid — tier 2 */}
      <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.items.map((f) => {
          const Icon = FEATURE_ICONS[f.icon as keyof typeof FEATURE_ICONS];
          return (
            <StaggerItem key={f.title}>
              <article className="group h-full rounded-2xl border border-border bg-cream p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(43,26,16,0.25)]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-tangerine-soft text-ember transition-colors group-hover:bg-tangerine group-hover:text-white">
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

function FoundingSection() {
  const { navigate } = useRouter();
  return (
    <section
      id="founding"
      data-section="founding"
      className="relative overflow-hidden bg-espresso text-cream"
    >
      <div
        className="absolute inset-0 warm-glow opacity-60"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Kicker tone="dark">{FOUNDING.kicker}</Kicker>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-cream text-balance sm:text-4xl lg:text-[2.75rem]">
                {FOUNDING.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 leading-relaxed text-cream/75">{FOUNDING.body}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8">
                <CTAButtons primaryLabel={FOUNDING.cta} dark />
              </div>
            </Reveal>
          </div>
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {FOUNDING.perks.map((perk, i) => (
              <StaggerItem key={perk.title}>
                <article className="h-full rounded-2xl border border-cream/15 bg-espresso-2/70 p-6 backdrop-blur-sm">
                  <span className="font-display text-lg font-semibold text-tangerine">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-semibold text-cream">{perk.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70">
                    {perk.body}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function FaqTeaserSection() {
  const { navigate } = useRouter();
  return (
    <Section tone="white" id="faq">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Kicker>Questions</Kicker>
          </Reveal>
          <Reveal delay={0.08}>
            <H2 className="mt-4">Asked by every restaurant owner.</H2>
          </Reveal>
          <Reveal delay={0.16}>
            <Button
              variant="ghost"
              className="mt-6 h-12 px-5 text-sm font-bold text-tangerine-deep hover:bg-tangerine-soft"
              onClick={() => navigate("faq")}
            >
              All questions, answered
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.slice(0, 4).map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="border-border"
              >
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
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
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
              secondaryLabel="See pricing"
              secondaryRoute="pricing"
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
      <ProblemSection />
      <StepsSection />
      <ProofSection />
      <FeaturesSection />
      <FoundingSection />
      <FaqTeaserSection />
      <FinalCtaSection />
    </>
  );
}
