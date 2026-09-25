"use client";

import React from "react";
import { FAQS } from "@/lib/site/content";
import { useRouter } from "@/lib/site/router";
import { Reveal } from "../reveal";
import { Section, Kicker, CTAButtons } from "../ui-bits";
import { FaqMarqueeRows, MarqueeHint } from "../sections/faq-marquee";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FaqPage() {
  const { navigate } = useRouter();
  return (
    <>
      <section className="relative overflow-hidden bg-cream warm-glow pt-28 sm:pt-36">
        <div className="mx-auto max-w-3xl px-4 pb-12 text-center sm:px-6 sm:pb-16">
          <p className="rise rise-1">
            <Kicker>FAQ</Kicker>
          </p>
          <h1 className="rise rise-2 mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl">
            Everything restaurant owners ask us.
          </h1>
          <p className="rise rise-3 mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Straight answers about guests, payments, setup and hardware — every
            one with its answer in the open. If yours isn't here, our contact
            page reaches a human.
          </p>
        </div>
      </section>

      <Section tone="white" id="faq-list" className="overflow-x-clip">
        <Reveal delay={0.02}>
          <MarqueeHint />
        </Reveal>

        {/* full-bleed ticker: rows drift edge to edge, hover pauses them */}
        <Reveal delay={0.08} className="mt-6">
          <div className="w-screen ml-[calc(50%-50vw)]">
            <FaqMarqueeRows items={FAQS} />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 max-w-3xl rounded-3xl bg-espresso p-8 text-center sm:p-12">
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
                variant="ghost"
                className="min-h-12 px-6 text-base font-semibold text-cream hover:bg-cream/10"
                onClick={() => navigate("contact")}
              >
                Contact us
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
