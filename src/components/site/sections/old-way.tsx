"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PROBLEMS } from "@/lib/site/content";
import { IMAGES } from "@/lib/site/images";
import { Reveal } from "../reveal";
import { H2 } from "../ui-bits";

const EASE = [0.2, 0, 0, 1] as const;

type Pain = (typeof PROBLEMS.pains)[number];

/** Scattered layout + rotation per ticket — reads like chits tossed on a table. */
const SCATTER = [
  { rot: -2.2, offset: "lg:ml-0", z: "z-30" },
  { rot: 1.8, offset: "lg:ml-14", z: "z-20" },
  { rot: -1.2, offset: "lg:ml-6", z: "z-10" },
] as const;

/** One paper KOT chit: receipt paper, torn bottom edge, dashed rules, rubber stamp. */
function Ticket({ pain, index }: { pain: Pain; index: number }) {
  const reduced = useReducedMotion();
  const t = pain.ticket;
  const scatter = SCATTER[index];

  return (
    <motion.article
      initial={
        reduced ? undefined : { opacity: 0, y: 64, rotate: 0, scale: 0.95 }
      }
      whileInView={
        reduced ? undefined : { opacity: 1, y: 0, rotate: scatter.rot, scale: 1 }
      }
      viewport={{ once: true, margin: "-56px" }}
      transition={{ duration: 0.75, delay: 0.14 * index, ease: EASE }}
      className={`ticket-paper ticket-tear relative w-full max-w-md rounded-t-md p-5 pb-10 sm:p-6 ${scatter.offset} ${scatter.z}`}
      style={{
        rotate: `${scatter.rot}deg`,
        boxShadow:
          "0 1px 2px rgba(20,10,3,0.25), 0 26px 48px -18px rgba(10,5,1,0.65)",
      }}
      aria-label={`${pain.title} — ${pain.body}`}
    >
      {/* ticket meta */}
      <div className="flex items-baseline justify-between font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ember/80">
        <span>KOT · Table {t.table}</span>
        <span>{t.time}</span>
      </div>
      <div
        className="my-3 border-t border-dashed border-ember/25"
        aria-hidden="true"
      />

      <h3 className="font-display text-xl font-semibold leading-snug text-ink">
        {pain.title}
      </h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
        {pain.body}
      </p>

      {/* barcode + stamp row */}
      <div className="mt-5 flex items-end justify-between">
        <div
          className="h-7 w-24 opacity-70"
          style={{
            background:
              "repeating-linear-gradient(90deg, #2b1a10 0 2px, transparent 2px 4px, #2b1a10 4px 5px, transparent 5px 9px, #2b1a10 9px 10px, transparent 10px 13px)",
          }}
          aria-hidden="true"
        />
        <motion.span
          initial={reduced ? undefined : { opacity: 0, scale: 2.1, rotate: 0 }}
          whileInView={
            reduced
              ? undefined
              : { opacity: 0.92, scale: 1, rotate: t.stampRot }
          }
          viewport={{ once: true, margin: "-56px" }}
          transition={{
            duration: 0.32,
            delay: 0.5 + 0.14 * index,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="rounded-[4px] border-[2.5px] border-ember/75 px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ember/85 mix-blend-multiply"
          style={{ rotate: t.stampRot }}
        >
          {t.stamp}
        </motion.span>
      </div>
    </motion.article>
  );
}

/**
 * "The old way is paper" — the rush-hour problem told as a scene:
 * a busy dining room at night, with the night's paper tickets
 * scattered across it. The chaos of the old way is the visual.
 */
export function OldWaySection() {
  return (
    <section
      id="problem"
      data-section="problem"
      className="relative overflow-hidden bg-espresso text-cream"
    >
      {/* dining-room-at-night backdrop */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={IMAGES.interior ?? ""}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/97 via-espresso/90 to-espresso/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/92 via-espresso/35 to-espresso/96" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_46%_38%_at_72%_46%,rgba(249,115,22,0.10),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-tangerine/30 bg-tangerine/10 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-tangerine backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tangerine opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-tangerine" />
                </span>
                {PROBLEMS.kicker} · Friday 9 PM
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <H2 tone="dark" className="mt-5">
                {PROBLEMS.headline}
              </H2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-lg leading-relaxed text-cream/75">
                {PROBLEMS.intro}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/45">
                <span className="h-px w-8 bg-cream/25" aria-hidden="true" />
                Tonight&apos;s paper trail
              </p>
            </Reveal>
          </div>

          {/* the scattered paper tickets */}
          <div className="flex flex-col items-start gap-7 sm:gap-8 lg:gap-9">
            {PROBLEMS.pains.map((pain, i) => (
              <Ticket key={pain.title} pain={pain} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
