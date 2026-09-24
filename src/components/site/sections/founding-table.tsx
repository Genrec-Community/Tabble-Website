"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FOUNDING } from "@/lib/site/content";
import { useRouter } from "@/lib/site/router";
import { Reveal, Stagger, StaggerItem } from "../reveal";
import { PillBadge } from "../ui-bits";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const EASE = [0.2, 0, 0, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

/** QR "eye" cells for the mini glyph on each tent. */
const QR_CELLS: Array<[number, number]> = [
  [0, 0],
  [2, 0],
  [1, 1],
  [0, 2],
  [2, 2],
];

/**
 * One numbered table tent on the founding board — a folded QR tent card
 * under a lamp: it stands in its own contact shadow, wears a tiny QR
 * glyph, and lifts off the felt when you reach for it.
 */
function Tent({
  n,
  lit,
  ambient,
  claimed,
  onHover,
  onLeave,
  onClaim,
}: {
  n: number;
  lit: boolean;
  ambient: boolean;
  claimed: boolean;
  onHover: (n: number) => void;
  onLeave: () => void;
  onClaim: () => void;
}) {
  const num = pad(n);
  const fill = lit
    ? "#f97316"
    : ambient
      ? "rgba(249,115,22,0.16)"
      : "rgba(255,251,246,0.05)";
  const stroke = lit
    ? "#fb923c"
    : ambient
      ? "rgba(249,115,22,0.62)"
      : "rgba(255,251,246,0.3)";
  const glyph = lit
    ? "rgba(34,17,7,0.62)"
    : ambient
      ? "rgba(255,237,217,0.62)"
      : "rgba(255,251,246,0.34)";
  const textColor = lit ? "#221107" : ambient ? "#ffedd9" : "rgba(255,251,246,0.6)";

  return (
    <button
      type="button"
      className="group relative flex w-full flex-col items-center focus:outline-none"
      onMouseEnter={() => onHover(n)}
      onMouseLeave={onLeave}
      onFocus={() => onHover(n)}
      onBlur={onLeave}
      onClick={onClaim}
      aria-label={`Founding table ${num} — claim it`}
    >
      {/* the tent — lifts toward the lamp on hover */}
      <svg
        viewBox="0 0 44 40"
        className={`h-auto w-full max-w-[46px] transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover:-translate-y-[7px] group-hover:scale-[1.07] group-focus-visible:-translate-y-[7px] sm:max-w-[42px] ${
          ambient ? "tent-ambient" : ""
        } ${claimed ? "scale-[1.07] -translate-y-[7px]" : ""}`}
        aria-hidden="true"
      >
        {/* front face */}
        <path
          d="M22 4 L35.4 32.4 Q37 35.5 33.2 35.5 H10.8 Q7 35.5 8.6 32.4 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
          style={{
            filter:
              lit || ambient
                ? "drop-shadow(0 0 10px rgba(249,115,22,0.5))"
                : undefined,
          }}
        />
        {/* lamp-light sheen across the top of the face */}
        <path
          d="M22 4 L27.8 18.5 H16.2 Z"
          fill="rgba(255,251,246,0.09)"
          aria-hidden="true"
        />
        {/* mini QR glyph */}
        {QR_CELLS.map(([cx, cy]) => (
          <rect
            key={`${cx}-${cy}`}
            x={17 + cx * 3.7}
            y={10 + cy * 3.7}
            width={2.4}
            height={2.4}
            rx={0.5}
            fill={glyph}
          />
        ))}
        {/* table number */}
        <text
          x="22"
          y="32.5"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          className="font-mono"
          fill={textColor}
        >
          {num}
        </text>
      </svg>

      {/* contact shadow — stays on the felt while the tent lifts */}
      <span
        className={`tent-shadow -mt-1 h-1.5 w-8 rounded-full bg-[radial-gradient(closest-side,rgba(8,4,1,0.95),transparent)] group-hover:scale-75 group-hover:opacity-40 ${
          lit ? "opacity-90" : "opacity-70"
        }`}
        aria-hidden="true"
      />

      {/* the claim stamp — slams down when the seat is taken */}
      {claimed && (
        <motion.span
          style={{ x: "-50%", y: "-50%" }}
          initial={{ scale: 2.6, opacity: 0, rotate: 8 }}
          animate={{ scale: 1, opacity: 1, rotate: -9 }}
          transition={{ type: "spring", stiffness: 480, damping: 20 }}
          className="pointer-events-none absolute left-1/2 top-[42%] z-10 whitespace-nowrap rounded-[5px] border-[2.5px] border-tangerine-soft bg-espresso/70 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-tangerine-soft [text-shadow:0_0_14px_rgba(249,115,22,0.5)]"
        >
          Yours
        </motion.span>
      )}
    </button>
  );
}

/**
 * "The founding table" — the first-50 offer made physical: a private
 * dining room at night, pendant lamps breathing over a felt board of
 * fifty numbered QR table tents. Hover reaches for a seat; claiming it
 * stamps it yours. The perks are served as a tasting menu.
 */
export function FoundingTableSection() {
  const { navigate } = useRouter();
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  const [claimed, setClaimed] = useState<number | null>(null);
  const [ambientIdx, setAmbientIdx] = useState(0);

  // A quiet light drifting seat to seat — the board feels alive.
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setAmbientIdx((v) => (v + 1) % 50);
    }, 1100);
    return () => clearInterval(t);
  }, [reduced]);

  // Claim a seat: stamp it, let the stamp land, then take them to the door.
  const claim = (n: number) => {
    if (claimed !== null) return;
    setClaimed(n);
    if (reduced) {
      navigate("request-access");
      return;
    }
    setTimeout(() => navigate("request-access"), 820);
  };

  const readout =
    claimed !== null
      ? `Table № ${pad(claimed)} — stamped yours`
      : hovered !== null
        ? `${FOUNDING.board.hover} ${pad(hovered)} ${FOUNDING.board.hoverSuffix}`
        : "Tap any tent to claim your seat";

  // "Be one of the first 50…" — light up the number.
  const [hPre, hPost = ""] = FOUNDING.headline.split("50");

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
        {/* centered header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <PillBadge tone="dark">{FOUNDING.kicker}</PillBadge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-cream text-balance sm:text-4xl lg:text-[2.9rem]">
              {hPre}
              <span className="text-tangerine [text-shadow:0_0_36px_rgba(249,115,22,0.4)]">
                50
              </span>
              {hPost}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-cream/70">
              {FOUNDING.body}
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid items-start gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* the founding board */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-cream/12 bg-espresso-2/50 p-4 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-sm sm:p-8">
              {/* pendant lamp light pooling on the board */}
              <div
                className="lamp-cone pointer-events-none absolute -top-8 left-[14%] h-48 w-48 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.13),transparent_65%)] blur-md"
                aria-hidden="true"
              />
              <div
                className="lamp-cone pointer-events-none absolute -top-10 right-[12%] h-56 w-56 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.10),transparent_65%)] blur-md [animation-delay:-3.2s]"
                aria-hidden="true"
              />
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

              {/* board header with rolling readout */}
              <div className="relative flex flex-col gap-2 border-b border-cream/10 pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <p className="shrink-0 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-cream/70 sm:text-[11px]">
                  {FOUNDING.board.label}
                  <span className="mx-2 hidden text-tangerine sm:inline" aria-hidden="true">
                    ·
                  </span>
                  <span className="hidden sm:inline">{FOUNDING.board.status}</span>
                </p>
                <span className="flex h-4 items-center self-end overflow-hidden sm:self-auto">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={readout}
                      initial={{ y: 14, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -14, opacity: 0 }}
                      transition={{ duration: 0.18, ease: EASE }}
                      className={`whitespace-nowrap text-right font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] sm:text-[11px] ${
                        hovered !== null || claimed !== null
                          ? "text-tangerine"
                          : "text-cream/55"
                      }`}
                    >
                      {readout}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>

              {/* 50 table tents */}
              <Stagger
                gap={0.014}
                className="relative mt-6 grid grid-cols-5 gap-x-2 gap-y-5 sm:mt-8 sm:grid-cols-10 sm:gap-x-3 sm:gap-y-7"
              >
                {Array.from({ length: 50 }, (_, i) => (
                  <StaggerItem key={i + 1} y={14}>
                    <Tent
                      n={i + 1}
                      lit={hovered === i + 1 || claimed === i + 1}
                      ambient={!reduced && hovered === null && claimed === null && ambientIdx === i + 1}
                      claimed={claimed === i + 1}
                      onHover={setHovered}
                      onLeave={() => setHovered(null)}
                      onClaim={() => claim(i + 1)}
                    />
                  </StaggerItem>
                ))}
              </Stagger>

              <p className="relative mt-7 px-2 text-center font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-cream/60">
                {FOUNDING.board.caption}
              </p>
            </div>
          </Reveal>

          {/* the founding menu — perks served as courses */}
          <Reveal delay={0.2} className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:-rotate-1 lg:mt-6">
              {/* paper sheets stacked behind */}
              <div
                className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[1.4rem] bg-cream/[0.07]"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 translate-x-1 translate-y-1 rounded-[1.4rem] bg-cream/[0.1]"
                aria-hidden="true"
              />
              <article className="relative rounded-[1.4rem] bg-cream px-6 py-7 text-ink shadow-[0_56px_100px_-36px_rgba(0,0,0,0.85)] sm:px-9 sm:py-9">
                <p className="text-center font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-ember/75">
                  {FOUNDING.menu.eyebrow}
                </p>
                <h3 className="mt-3 text-center font-display text-[1.9rem] font-semibold leading-tight text-ink">
                  {FOUNDING.menu.title}
                </h3>
                <p className="mt-2 text-center font-display text-[15px] italic leading-snug text-ink-soft">
                  {FOUNDING.menu.sub}
                </p>
                <div
                  className="mx-auto mt-4 flex max-w-[210px] items-center gap-3"
                  aria-hidden="true"
                >
                  <span className="h-px flex-1 bg-ink/15" />
                  <span className="h-1.5 w-1.5 rotate-45 bg-tangerine/70" />
                  <span className="h-px flex-1 bg-ink/15" />
                </div>

                <ul className="mt-5">
                  {FOUNDING.perks.map((perk, i) => (
                    <li
                      key={perk.title}
                      className={i > 0 ? "mt-4 border-t border-dashed border-ink/15 pt-4" : ""}
                    >
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-tangerine-deep">
                        {perk.course}
                      </p>
                      <div className="mt-1.5 flex items-end gap-2.5">
                        <h4 className="font-display text-[1.05rem] font-semibold leading-snug text-ink">
                          {perk.title}
                        </h4>
                        <span
                          className="mb-[5px] flex-1 border-b border-dotted border-ink/30"
                          aria-hidden="true"
                        />
                        <span className="mb-[1px] shrink-0 font-mono text-[10.5px] font-bold uppercase tracking-wider text-ember/90">
                          {perk.tag}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink/75">
                        {perk.body}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 border-t border-ink/10 pt-5">
                  <Button
                    size="lg"
                    className="h-13 min-h-12 w-full bg-tangerine-deep px-7 text-base font-bold text-white shadow-[0_14px_32px_-10px_rgba(224,96,10,0.55)] hover:bg-tangerine-deep/90"
                    onClick={() => navigate("request-access")}
                  >
                    {FOUNDING.menu.cta}
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </Button>
                  <p className="mt-3.5 text-center font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-ink-soft/80">
                    {FOUNDING.menu.footnote}
                  </p>
                </div>
              </article>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
