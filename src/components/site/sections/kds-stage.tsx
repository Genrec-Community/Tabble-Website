"use client";

import React from "react";
import { PROOF } from "@/lib/site/content";
import { KitchenDisplay } from "../kds-mock";
import { Reveal } from "../reveal";
import { H2, PillBadge } from "../ui-bits";

/** Hairline annotation pinned to the stage edge (desktop only). */
function Callout({
  label,
  side,
  className = "",
}: {
  label: string;
  side: "left" | "right" | "bottom";
  className?: string;
}) {
  const dot = (
    <span
      className="h-1.5 w-1.5 shrink-0 rounded-full bg-tangerine shadow-[0_0_10px_rgba(249,115,22,0.9)]"
      aria-hidden="true"
    />
  );
  const line = (
    <span
      className={
        side === "bottom"
          ? "h-6 w-px bg-gradient-to-b from-tangerine/70 to-transparent"
          : "h-px w-8 shrink-0 bg-gradient-to-r from-tangerine/70 to-transparent"
      }
      aria-hidden="true"
    />
  );
  const text = (
    <span className="font-mono text-[11px] font-bold uppercase leading-relaxed tracking-[0.08em] text-cream/65">
      {label}
    </span>
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute hidden select-none lg:flex ${
        side === "bottom" ? "flex-col items-center gap-1.5" : "items-center gap-2.5"
      } ${className}`}
    >
      {side === "left" ? (
        <>
          {text}
          <span
            className="h-px w-8 shrink-0 bg-gradient-to-l from-tangerine/70 to-transparent"
            aria-hidden="true"
          />
          {dot}
        </>
      ) : (
        <>
          {dot}
          {line}
          {text}
        </>
      )}
    </div>
  );
}

/**
 * "The kitchen pass at night" — the KDS presented like a keynote device:
 * centered on a dark stage, ember glow behind it, a live order chip
 * pulsing in sync with the order rotation, hairline annotations
 * calling out what makes it different, and a hard-zero stat row.
 */
export function KdsStageSection() {
  return (
    <section
      id="proof"
      data-section="proof"
      className="relative overflow-hidden bg-espresso text-cream"
    >
      {/* faint warm haze across the whole stage */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_38%,rgba(249,115,22,0.09),transparent_75%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        {/* centered headline */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <PillBadge tone="dark">{PROOF.kicker}</PillBadge>
          </Reveal>
          <Reveal delay={0.08}>
            <H2 tone="dark" className="mt-5">
              {PROOF.headline}
            </H2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-cream/70">
              {PROOF.sub}
            </p>
          </Reveal>
        </div>

        {/* the stage */}
        <Reveal delay={0.12} className="relative mx-auto mt-20 max-w-2xl lg:mt-24 lg:max-w-3xl">
          {/* Petpooja radar — concentric dashed circles radiating from the screen */}
          <svg
            className="absolute left-1/2 top-1/2 -z-10 h-[920px] w-[920px] -translate-x-1/2 -translate-y-1/2"
            viewBox="0 0 920 920"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="460" cy="460" r="210" stroke="#f97316" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="3 12" />
            <circle cx="460" cy="460" r="330" stroke="#f97316" strokeOpacity="0.22" strokeWidth="1.5" strokeDasharray="3 12" />
            <circle cx="460" cy="460" r="450" stroke="#f97316" strokeOpacity="0.14" strokeWidth="1.5" strokeDasharray="3 12" />
          </svg>
          {/* ember light pool behind the screen */}
          <div
            className="kds-glow absolute -inset-x-24 -inset-y-20 -z-10"
            aria-hidden="true"
          />

          {/* live order chip, pulsing with the 3.8s order rotation */}
          <div className="absolute -top-4 right-3 z-20 sm:-right-6">
            <p className="live-ping flex items-center gap-2.5 rounded-full border border-tangerine/40 bg-espresso-2/95 px-4 py-2 font-mono text-[11px] font-bold tracking-[0.06em] text-tangerine-soft shadow-[0_12px_32px_-10px_rgba(249,115,22,0.5)] backdrop-blur-sm">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tangerine opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-tangerine" />
              </span>
              {PROOF.liveChip}
            </p>
          </div>

          <KitchenDisplay />

          {/* light pooling under the screen */}
          <div
            className="kds-reflection mx-auto mt-3 h-16 w-[72%] rounded-[100%] blur-md"
            aria-hidden="true"
          />

          {/* hairline annotations (desktop) */}
          <Callout
            label={PROOF.callouts[0]}
            side="left"
            className="top-[62%] right-[calc(100%+14px)] w-44 flex-row"
          />
          <Callout
            label={PROOF.callouts[1]}
            side="right"
            className="top-[15%] left-[calc(100%+14px)] w-44"
          />
          <Callout
            label={PROOF.callouts[2]}
            side="bottom"
            className="bottom-[-44px] left-1/2 -translate-x-1/2"
          />
        </Reveal>

        {/* annotations as a list on smaller screens */}
        <ul className="mx-auto mt-12 max-w-2xl space-y-2.5 lg:hidden">
          {PROOF.callouts.map((c) => (
            <li
              key={c}
              className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cream/65"
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-tangerine"
                aria-hidden="true"
              />
              {c}
            </li>
          ))}
        </ul>

        {/* hard-zero stat hairline */}
        <Reveal delay={0.1}>
          <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-8 border-t border-cream/10 pt-10 sm:grid-cols-3 sm:gap-6">
            {PROOF.stats.map((s) => (
              <div key={s.label} className="text-center">
                <dd className="font-display text-[2.75rem] font-semibold leading-none text-tangerine [text-shadow:0_0_32px_rgba(249,115,22,0.35)]">
                  {s.value}
                </dd>
                <dt className="mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-cream/55">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
