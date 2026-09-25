"use client";

import React from "react";
import { FEATURES } from "@/lib/site/content";
import { FeatureShowcase, type TabMedia } from "@/components/ui/feature-showcase";
import { PhoneDemo, DEMO_MENU } from "../phone-demo";
import { KitchenDisplay } from "../kds-mock";
import { Reveal, Stagger, StaggerItem } from "../reveal";
import { Section, Kicker, H2, CTAButtons, ImgSlot } from "../ui-bits";
import { IMAGES } from "@/lib/site/images";
import { Check, ChefHat, Wallet, BarChart3, Store, Smartphone, Users } from "lucide-react";

const FEATURE_ICONS = {
  chef: ChefHat,
  wallet: Wallet,
  bar: BarChart3,
  store: Store,
  smartphone: Smartphone,
  users: Users,
} as const;

const GUEST_POINTS = [
  {
    title: "Photo-first menu",
    body: "Dishes shown the way guests choose them — with photos, descriptions, spice levels and veg badges.",
  },
  {
    title: "Customisations that stick",
    body: "Add-ons, portion choices and notes travel with the order, typed by the guest — not paraphrased by a waiter.",
  },
  {
    title: "Order rounds without flagging",
    body: "Another round of naan or a final dessert — guests add it from their seats, the kitchen sees it instantly.",
  },
  {
    title: "Pay from the table",
    body: "UPI, cards, wallets, or split the bill — settled before anyone looks around for the machine.",
  },
];

const KITCHEN_POINTS = [
  {
    title: "Orders in sequence, never lost",
    body: "A single queue in the order it was placed. New orders highlight themselves so nothing slips in the rush.",
  },
  {
    title: "Guest notes, unedited",
    body: "'No onion', 'Jain', 'extra spicy' — exactly as the guest typed it, right on the ticket.",
  },
  {
    title: "Sold-out sync",
    body: "Mark a dish sold-out at the counter and it stops being orderable at every table, instantly.",
  },
  {
    title: "Any device you own",
    body: "Runs in a browser on any tablet, phone, or computer. No special hardware, no installations.",
  },
];

const OWNER_POINTS = [
  {
    title: "Best sellers & slow movers",
    body: "See which dishes earn their menu space and which to retire — per day, per shift, per outlet.",
  },
  {
    title: "Peak hours, visible",
    body: "When do orders actually land? Staff the floor for the real rush, not the assumed one.",
  },
  {
    title: "Table turns & ticket sizes",
    body: "Track how fast tables turn and how ordering-from-the-table grows ticket sizes over time.",
  },
  {
    title: "Payments at a glance",
    body: "Every UPI, card and wallet payment reconciled in one view — no end-of-night matching.",
  },
];

/** Sample insights chart — demo data, labeled as such. */
function InsightsMock() {
  const bars = [
    { label: "12p", v: 22 },
    { label: "2p", v: 34 },
    { label: "4p", v: 18 },
    { label: "6p", v: 48 },
    { label: "8p", v: 88 },
    { label: "10p", v: 64 },
  ];
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_60px_-32px_rgba(43,26,16,0.3)]">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <p className="text-sm font-bold text-ink">Orders by hour · Friday</p>
        <span className="rounded-full bg-sand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-soft">
          Sample data
        </span>
      </div>
      <div className="p-5">
        <div className="flex h-44 items-end gap-3 sm:h-52" role="img" aria-label="Bar chart of sample orders by hour, peaking at 8pm">
          {bars.map((b) => (
            <div key={b.label} className="flex flex-1 flex-col items-center gap-2">
              <div
                className={`w-full rounded-t-lg ${
                  b.v > 60 ? "bg-tangerine" : "bg-tangerine/40"
                }`}
                style={{ height: `${b.v}%` }}
              />
              <span className="text-[11px] font-medium text-ink-soft">{b.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4">
          {[
            { k: "Tickets tonight", v: "142" },
            { k: "Avg ticket", v: "₹940" },
            { k: "Tables turned", v: "3.1×" },
          ].map((s) => (
            <div key={s.k}>
              <p className="font-display text-lg font-semibold text-ink">{s.v}</p>
              <p className="text-[11px] text-ink-soft">{s.k}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[10px] text-ink-soft/80">
          Sample view with demo data — your dashboard shows your live numbers.
        </p>
      </div>
    </div>
  );
}

/**
 * Interactive product tour — one tabbed panel carrying the three views
 * (guest menu / kitchen display / insights) with the journey steps alongside.
 */
function TourSection() {
  const tabs: TabMedia[] = [
    {
      value: "guests",
      label: "Guest menu",
      content: (
        <div
          className="flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-cream-deep to-sand/60 p-3 sm:p-6"
          role="img"
          aria-label="A guest's phone running the Tabble QR menu: dish photos, prices and a cart"
        >
          <div className="rounded-[2.4rem] border-[10px] border-espresso bg-cream shadow-[0_32px_64px_-28px_rgba(43,26,16,0.45)]">
            <div className="h-[500px] w-[272px] overflow-hidden rounded-[1.7rem]">
              <PhoneDemo menu={DEMO_MENU} />
            </div>
          </div>
        </div>
      ),
    },
    {
      value: "kitchen",
      label: "Kitchen",
      content: (
        <div
          className="flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-cream-deep to-sand/60 p-3 pb-14 sm:p-6 sm:pb-14"
          aria-label="The Tabble kitchen display with live orders"
        >
          {/* pb-14 keeps the floating tab pill clear of the last ticket row */}
          <KitchenDisplay forceTwoCols className="h-full w-full max-w-[440px]" />
        </div>
      ),
    },
    {
      value: "insights",
      label: "Insights",
      content: (
        <div
          className="flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-cream-deep to-sand/60 p-3 sm:p-6"
          aria-label="The Tabble owner dashboard with sample sales insights"
        >
          <div className="w-full max-w-[520px]">
            <InsightsMock />
          </div>
        </div>
      ),
    },
  ];

  return (
    <FeatureShowcase
      className="bg-card"
      eyebrow="Product tour"
      title="See it the way your restaurant will."
      description="Switch between the guest menu, the kitchen display and your owner dashboard — three views of the same live order, from scan to settled payment."
      stats={["No app for guests", "UPI built in", "Runs on any device"]}
      steps={[
        {
          id: "tour-scan",
          title: "Guests scan and order",
          text: "The QR code on the table opens your photo-first menu in the browser — no app, no sign-up. Customisations and notes are typed by the guest, not paraphrased mid-rush.",
        },
        {
          id: "tour-kitchen",
          title: "The kitchen fires instantly",
          text: "The order lands on the kitchen display the moment it's placed — sequenced, complete, notes unedited. No printer, no re-entry, no shouting across the pass.",
        },
        {
          id: "tour-pay",
          title: "Payment happens at the table",
          text: "Guests pay by UPI, card or wallet from the same screen whenever they're ready. Tables turn faster and nobody hunts for the card machine.",
        },
        {
          id: "tour-numbers",
          title: "You watch the numbers",
          text: "Best sellers, peak hours, ticket sizes and payment reconciliation — recorded as it happens, ready when you are.",
        },
      ]}
      tabs={tabs}
      defaultTab="guests"
      panelMinHeight={580}
      ctaPrimary={{ label: "Request early access", href: "/request-access" }}
      ctaSecondary={{ label: "Talk to us", href: "/contact" }}
    />
  );
}

function ViewSection({
  id,
  kicker,
  headline,
  body,
  points,
  visual,
  flip = false,
  tone,
}: {
  id: string;
  kicker?: string;
  headline: string;
  body: string;
  points: { title: string; body: string }[];
  visual: React.ReactNode;
  flip?: boolean;
  tone: "white" | "cream" | "deep";
}) {
  return (
    <Section id={id} tone={tone}>
      <div
        className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ${
          flip ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          {kicker && (
            <Reveal>
              <Kicker>{kicker}</Kicker>
            </Reveal>
          )}
          <Reveal delay={0.08}>
            <H2 className={kicker ? "mt-4" : "mt-0"}>{headline}</H2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 leading-relaxed text-ink-soft">{body}</p>
          </Reveal>
          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2">
            {points.map((p) => (
              <StaggerItem key={p.title}>
                <div>
                  <h3 className="flex items-start gap-2.5 font-semibold text-ink">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-tangerine-deep"
                      aria-hidden="true"
                    />
                    {p.title}
                  </h3>
                  <p className="mt-1.5 pl-7 text-sm leading-relaxed text-ink-soft">
                    {p.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <Reveal delay={0.12} className="relative">
          {visual}
        </Reveal>
      </div>
    </Section>
  );
}

export function FeaturesPage() {
  return (
    <>
      {/* page header */}
      <section className="relative overflow-hidden bg-cream warm-glow pt-28 sm:pt-36">
        <div className="mx-auto max-w-3xl px-4 pb-14 text-center sm:px-6 sm:pb-20">
          <h1 className="rise rise-1 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl">
            One system. Three views.
          </h1>
          <p className="rise rise-2 mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Guests get a menu they love. The kitchen gets a queue it can trust.
            You get the numbers that matter — one calm system, three clear
            views.
          </p>
        </div>
      </section>

      <TourSection />

      <ViewSection
        id="guests"
        headline="A menu your guests actually enjoy using."
        body="The ordering flow is the product your guests touch. It's fast, photographed beautifully, and works on any phone in seconds — no downloads, no accounts, no friction between hunger and order."
        points={GUEST_POINTS}
        tone="cream"
        visual={
          <ImgSlot
            src={IMAGES.diners}
            alt="Guests enjoying a meal together at a restaurant table"
            ratio="aspect-[4/3]"
          />
        }
      />

      <ViewSection
        id="kitchen"
        kicker="For your kitchen"
        headline="A kitchen queue the rush can't break."
        body="Every order arrives digital, sequenced and complete. The display is the kitchen's single source of truth — readable at a glance from across the pass, stable through the busiest hours."
        points={KITCHEN_POINTS}
        tone="deep"
        flip
        visual={
          <ImgSlot
            src={IMAGES.owner}
            alt="A kitchen team working together during a busy service"
            ratio="aspect-[4/3]"
          />
        }
      />

      <ViewSection
        id="owner"
        kicker="For you"
        headline="Numbers that decide next week's menu."
        body="Tabble records every order, payment and table turn as it happens. The insights view turns that into decisions — what to push, what to retire, when to staff up."
        points={OWNER_POINTS}
        tone="white"
        visual={
          <ImgSlot
            src={IMAGES.interior}
            alt="A cozy, warmly lit restaurant interior with neatly set tables"
            ratio="aspect-[4/3]"
          />
        }
      />

      {/* everything else */}
      <Section tone="cream" id="more">
        <div className="max-w-2xl">
          <Reveal>
            <Kicker>And everything else</Kicker>
          </Reveal>
          <Reveal delay={0.08}>
            <H2 className="mt-4">The details that make it whole.</H2>
          </Reveal>
        </div>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.items.map((f) => {
            const Icon = FEATURE_ICONS[f.icon as keyof typeof FEATURE_ICONS];
            return (
              <StaggerItem key={f.title}>
                <article className="h-full rounded-2xl border border-border bg-card p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-tangerine-soft text-ember">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-semibold text-ink">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{f.body}</p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="mt-14 rounded-3xl border border-border bg-card p-8 sm:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <H2 className="font-display text-2xl sm:text-3xl">
                  {FEATURES.hero.title}
                </H2>
                <p className="mt-3 leading-relaxed text-ink-soft">{FEATURES.hero.body}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
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
              </div>
              <ImgSlot
                src={IMAGES.food}
                alt="A colorful spread of dishes from a Tabble menu"
                ratio="aspect-[4/3]"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-14 text-center">
            <CTAButtons
              primaryLabel="Request early access"
              secondaryLabel="Talk to us"
              secondaryRoute="contact"
              align="center"
            />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
