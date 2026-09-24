"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { FOUNDING } from "@/lib/site/content";
import { useRouter } from "@/lib/site/router";
import { Reveal, Stagger, StaggerItem } from "../reveal";
import { CTAButtons, PillBadge } from "../ui-bits";
import { Lock, UtensilsCrossed, MessageCircle, Rocket } from "lucide-react";

const PERK_ICONS = [Lock, UtensilsCrossed, MessageCircle, Rocket] as const;

/** One numbered table tent on the founding board. */
function Tent({
  n,
  lit,
  ambient,
  onHover,
  onLeave,
  onClaim,
}: {
  n: number;
  lit: boolean;
  ambient: boolean;
  onHover: (n: number) => void;
  onLeave: () => void;
  onClaim: () => void;
}) {
  const num = String(n).padStart(2, "0");
  const fill = lit
    ? "#f97316"
    : ambient
      ? "rgba(249,115,22,0.10)"
      : "rgba(255,251,246,0.05)";
  const stroke = lit
    ? "#fb923c"
    : ambient
      ? "rgba(249,115,22,0.5)"
      : "rgba(255,251,246,0.32)";
  const textColor = lit ? "#221107" : ambient ? "#ffedd9" : "rgba(255,251,246,0.62)";
  return (
    <button
      type="button"
      className="tent group flex w-full flex-col items-center pb-1 focus:outline-none"
      onMouseEnter={() => onHover(n)}
      onMouseLeave={onLeave}
      onFocus={() => onHover(n)}
      onBlur={onLeave}
      onClick={onClaim}
      aria-label={`Founding table ${num} — claim it`}
    >
      <svg
        viewBox="0 0 36 30"
        className={`h-auto w-full max-w-10 ${ambient ? "tent-ambient" : ""}`}
        aria-hidden="true"
      >
        <path
          d="M18 2.5 L31.6 24.8 Q33 27.4 29.7 27.4 H6.3 Q3 27.4 4.4 24.8 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
          style={{
            filter:
              lit || ambient
                ? "drop-shadow(0 0 10px rgba(249,115,22,0.5))"
                : undefined,
          }}
        />
        <text
          x="18"
          y="25"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          className="font-mono"
          fill={textColor}
        >
          {num}
        </text>
      </svg>
    </button>
  );
}

/**
 * "The founding table" — the first-50 offer made physical: a private-club
 * seating board of 50 numbered table tents. Hover claims a seat (it lights
 * up, the board readout reacts), clicking reserves it for real. Perks sit
 * in an editorial hairline row — no cards.
 */
export function FoundingTableSection() {
  const { navigate } = useRouter();
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  const [ambientIdx, setAmbientIdx] = useState(0);

  // A quiet light drifting seat to seat — the board feels alive.
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setAmbientIdx((v) => (v + 1) % 50);
    }, 1100);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <section
      id="founding"
      data-section="founding"
      className="relative overflow-hidden bg-espresso text-cream"
    >
      <div className="absolute inset-0 warm-glow opacity-70" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_20%_85%,rgba(249,115,22,0.08),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        {/* centered header — Petpooja pattern */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <PillBadge tone="dark">{FOUNDING.kicker}</PillBadge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-cream text-balance sm:text-4xl lg:text-[2.9rem]">
              {FOUNDING.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-cream/70">
              {FOUNDING.body}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex justify-center">
              <CTAButtons primaryLabel={FOUNDING.cta} dark />
            </div>
          </Reveal>
        </div>

        {/* the founding table — a 50-seat board */}
        <Reveal delay={0.1} className="mt-12">
          <div className="relative rounded-[1.75rem] border border-cream/12 bg-espresso-2/50 p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-sm sm:p-9">
            {/* corner rivets */}
            {["left-3 top-3", "right-3 top-3", "left-3 bottom-3", "right-3 bottom-3"].map(
              (pos) => (
                <span
                  key={pos}
                  className={`absolute ${pos} h-1.5 w-1.5 rounded-full bg-cream/20`}
                  aria-hidden="true"
                />
              ),
            )}

            {/* board header with live readout */}
            <div className="flex items-center justify-between gap-4 border-b border-cream/10 pb-4">
              <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-cream/55 sm:text-[11px]">
                {FOUNDING.board.label}
                <span className="mx-2 text-tangerine" aria-hidden="true">
                  ·
                </span>
                {FOUNDING.board.status}
              </p>
              <p
                className={`text-right font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] transition-opacity duration-150 sm:text-[11px] ${
                  hovered ? "text-tangerine opacity-100" : "text-cream/40 opacity-100"
                }`}
              >
                {hovered
                  ? `${FOUNDING.board.hover} ${String(hovered).padStart(2, "0")} ${FOUNDING.board.hoverSuffix}`
                  : "Pick your table"}
              </p>
            </div>

            {/* 50 table tents */}
            <Stagger gap={0.014} className="mt-8 grid grid-cols-5 gap-x-2 gap-y-5 sm:grid-cols-10 sm:gap-x-3 sm:gap-y-6">
              {Array.from({ length: 50 }, (_, i) => (
                <StaggerItem key={i + 1} y={14}>
                  <Tent
                    n={i + 1}
                    lit={hovered === i + 1}
                    ambient={!reduced && hovered === null && ambientIdx === i + 1}
                    onHover={setHovered}
                    onLeave={() => setHovered(null)}
                    onClaim={() => navigate("request-access")}
                  />
                </StaggerItem>
              ))}
            </Stagger>

            <p className="mt-8 text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-cream/45">
              {FOUNDING.board.caption}
            </p>
          </div>
        </Reveal>

        {/* perks — hairline row, not cards */}
        <Stagger className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {FOUNDING.perks.map((perk, i) => {
            const Icon = PERK_ICONS[i % PERK_ICONS.length];
            return (
              <StaggerItem key={perk.title}>
                <article className="border-t border-cream/12 pt-5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-tangerine/15 text-tangerine">
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3.5 font-semibold text-cream">{perk.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream/60">
                    {perk.body}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
