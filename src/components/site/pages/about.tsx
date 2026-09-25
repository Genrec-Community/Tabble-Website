"use client";

import React from "react";
import { BRAND, FOUNDING } from "@/lib/site/content";
import { Reveal, Stagger, StaggerItem } from "../reveal";
import { Section, Kicker, H2, CTAButtons, ImgSlot } from "../ui-bits";
import { IMAGES } from "@/lib/site/images";
import { QrCode, HeartHandshake, Eye } from "lucide-react";

const VALUES = [
  {
    icon: QrCode,
    title: "The table is the interface",
    body: "Restaurants don't need another screen for staff to babysit. The most powerful computer in the room is already in every guest's pocket — Tabble simply puts your menu on it.",
  },
  {
    icon: HeartHandshake,
    title: "Built with, not for",
    body: "Every founding restaurant shapes the product. We're onboarding slowly and personally because a feature that a real rush hasn't tested is a feature we don't trust yet.",
  },
  {
    icon: Eye,
    title: "Hospitality first, software second",
    body: "Technology should make the room warmer, not colder. Guests order faster, waiters host instead of transcribe, and the kitchen cooks with a calmer queue. The food stays the hero.",
  },
];

export function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream warm-glow pt-28 sm:pt-36">
        <div className="mx-auto max-w-3xl px-4 pb-14 text-center sm:px-6 sm:pb-20">
          <h1 className="rise rise-1 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl">
            We're building for the Friday-night rush.
          </h1>
          <p className="rise rise-2 mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Tabble is a small team with one obsession: the hour when every
            table is full, the kitchen is at full tilt, and the difference
            between a great night and a rough one is how fast a table can
            order and pay.
          </p>
        </div>
      </section>

      <Section tone="white" id="story">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <Kicker>Why we exist</Kicker>
            </Reveal>
            <Reveal delay={0.08}>
              <H2 className="mt-4">
                The busiest restaurants run on the least technology.
              </H2>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-5 space-y-4 leading-relaxed text-ink-soft">
                <p>
                  Watch a full house on a weekend and you'll see it: brilliant
                  food, loyal regulars, staff sprinting — and orders still
                  travelling by paper, memory and hand gestures between the
                  table, the counter and the kitchen.
                </p>
                <p>
                  The tools that could fix this were built for someone else —
                  dashboards for chains, aggregators that take the customer
                  relationship, apps guests never download twice. Meanwhile
                  the neighbourhood restaurant, the café, the dhaba with a
                  line out the door, kept running on scribbled pads.
                </p>
                <p>
                  Tabble is our answer: ordering that lives on the table
                  itself, a kitchen queue that never drops a ticket, and
                  prices a working restaurant can actually afford. Simple to
                  scan, serious underneath.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="space-y-5">
            <Reveal delay={0.1}>
              <ImgSlot
                src={IMAGES.interior}
                alt="A warm, full restaurant during evening service"
                ratio="aspect-[4/3]"
              />
            </Reveal>
            <Reveal delay={0.16}>
              <ImgSlot
                src={IMAGES.owner}
                alt="A kitchen team working together during service"
                ratio="aspect-[4/3]"
              />
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="cream" id="values">
        <div className="max-w-2xl">
          <Reveal>
            <Kicker>What we believe</Kicker>
          </Reveal>
          <Reveal delay={0.08}>
            <H2 className="mt-4">Three things we won't compromise on.</H2>
          </Reveal>
        </div>
        <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <StaggerItem key={v.title}>
                <article className="h-full rounded-2xl border border-border bg-card p-7">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-tangerine-soft text-ember">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{v.body}</p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      <Section tone="espresso" id="join">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <Kicker tone="dark">Where we are now</Kicker>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-cream text-balance sm:text-4xl">
                {FOUNDING.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 leading-relaxed text-cream/75">
                {FOUNDING.body} If that sounds like the kind of product you
                want your restaurant to help shape, we'd love to meet you.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8">
                <CTAButtons primaryLabel="Request early access" dark />
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <ImgSlot
              src={IMAGES.chef}
              alt="A gourmet dish being finished with a sauce pour"
              ratio="aspect-[4/3]"
            />
          </Reveal>
        </div>
      </Section>

      {/* light closing strip — meets the rounded footer cleanly */}
      <section className="bg-cream py-12">
        <Reveal>
          <p className="mx-auto max-w-2xl px-4 text-center text-sm text-ink-soft sm:px-6">
            Want to talk first? Write to us at{" "}
            <a
              href={`mailto:${BRAND.email}`}
              className="font-semibold text-tangerine-deep underline-offset-4 hover:underline"
            >
              {BRAND.email}
            </a>
          </p>
        </Reveal>
      </section>
    </>
  );
}
