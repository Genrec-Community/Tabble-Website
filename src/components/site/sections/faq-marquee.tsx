"use client";

import React from "react";
import { useReducedMotion } from "framer-motion";
import { MessageCircleQuestion, MousePointer2 } from "lucide-react";
import { Marquee } from "../magic/marquee";
import { Reveal } from "../reveal";
import { Section, H2, CTAButtons, PillBadge } from "../ui-bits";
import { Button } from "@/components/ui/button";
import { RouteLink } from "@/lib/site/router";
import { ArrowRight } from "lucide-react";
import { FAQS } from "@/lib/site/content";

export type FaqItem = { tag: string; q: string; a: string };

/** One Q&A as a drifting card — question on top, full answer below. */
export function FaqCard({ item }: { item: FaqItem }) {
  return (
    <figure className="relative flex h-[16.5rem] w-[330px] shrink-0 flex-col rounded-2xl border border-border bg-card p-5 shadow-[0_2px_16px_-10px_rgba(43,26,16,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-tangerine/40 hover:shadow-[0_20px_40px_-24px_rgba(43,26,16,0.25)] sm:w-[350px]">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tangerine-soft text-ember">
          <MessageCircleQuestion className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ember">
          {item.tag}
        </span>
      </div>
      <figcaption className="mt-3.5 text-[15px] font-semibold leading-snug text-ink">
        {item.q}
      </figcaption>
      <blockquote className="mt-2 text-[13px] leading-relaxed text-ink-soft">
        {item.a}
      </blockquote>
    </figure>
  );
}

/**
 * The FAQ ticker — two rows drifting opposite ways, full answers on
 * every card. Hover pauses a row so owners can actually read.
 * Reduced motion: the same cards as a calm static grid.
 */
export function FaqMarqueeRows({
  items = FAQS,
  edgeFrom = "from-card",
  className = "",
}: {
  items?: FaqItem[];
  edgeFrom?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const half = Math.ceil(items.length / 2);
  const first = items.slice(0, half);
  const second = items.slice(half);

  if (reduced) {
    return (
      <div
        className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
      >
        {items.map((item) => (
          <FaqCard key={item.q} item={item} />
        ))}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Marquee pauseOnHover className="[--duration:34s]">
        {first.map((item) => (
          <FaqCard key={item.q} item={item} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="mt-5 [--duration:38s]">
        {second.map((item) => (
          <FaqCard key={item.q} item={item} />
        ))}
      </Marquee>
      {/* edge fades — cards dissolve before text can read as "cut" */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-card from-25% to-transparent sm:w-48 ${edgeFrom}`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-card from-25% to-transparent sm:w-48 ${edgeFrom}`}
        aria-hidden="true"
      />
    </div>
  );
}

/** Small affordance — tells owners the ticker pauses for them. */
export function MarqueeHint({ className = "" }: { className?: string }) {
  return (
    <p
      className={`flex items-center justify-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-soft/70 ${className}`}
    >
      <MousePointer2 className="h-3.5 w-3.5 text-tangerine-deep" aria-hidden="true" />
      Hover any card to pause and read
    </p>
  );
}

/**
 * Home FAQ section — the honest answers as a drifting ticker.
 * Full-bleed: rows run edge to edge of the viewport.
 */
export function FaqMarqueeSection() {
  return (
    <Section
      tone="white"
      id="faq"
      className="relative z-10 -mt-6 overflow-x-clip rounded-t-[2.5rem] shadow-[0_-18px_48px_-28px_rgba(34,17,7,0.45)]"
    >
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <PillBadge>Questions</PillBadge>
        </Reveal>
        <Reveal delay={0.08}>
          <H2 className="mt-5">Asked by every restaurant owner.</H2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 leading-relaxed text-ink-soft">
            The honest answers we give on every demo call — before you even
            have to ask.
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <MarqueeHint className="mt-8" />
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-8">
        <div className="w-screen ml-[calc(50%-50vw)]">
          <FaqMarqueeRows />
        </div>
      </Reveal>

      <Reveal delay={0.14}>
        <div className="mt-8 flex justify-center">
          <Button
            asChild
            variant="ghost"
            className="h-12 px-5 text-sm font-bold text-tangerine-deep hover:bg-tangerine-soft"
          >
            <RouteLink route="faq">
              All questions, answered
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </RouteLink>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
