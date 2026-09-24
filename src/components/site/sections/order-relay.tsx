"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import { PROOF } from "@/lib/site/content";
import {
  RELAY_ORDERS,
  orderLines,
  orderTotal,
  packetLabel,
  type RelayOrder,
} from "@/lib/site/relay";
import { KitchenDisplay, type DisplayOrder, type KdsStatus } from "../kds-mock";
import { Reveal } from "../reveal";
import { H2, PillBadge } from "../ui-bits";

const EASE = [0.2, 0, 0, 1] as const;

type Phase = "idle" | "press" | "fly" | "landed";

/** One loop of the relay story, in milliseconds. */
const PHASE_MS: Record<Phase, number> = {
  idle: 1500,
  press: 600,
  fly: 900,
  landed: 2800,
};
const FLY_MS = PHASE_MS.fly;
const FINAL_S = 0.38;
const N = RELAY_ORDERS.length;

const uidOf = (idx: number) => 100 + idx;

/** Tiny scene label above a device — mono, hairline-flanked. */
function SceneLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-cream/60">
      <span className="h-px w-6 bg-cream/25" aria-hidden="true" />
      {children}
      <span className="h-px w-6 bg-cream/25" aria-hidden="true" />
    </p>
  );
}

/** Proof-point caption under a device. */
function SceneCaption({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex max-w-60 items-start gap-2 text-center font-mono text-[10.5px] font-bold uppercase leading-relaxed tracking-[0.08em] text-cream/70">
      <span
        className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-tangerine shadow-[0_0_10px_rgba(249,115,22,0.9)]"
        aria-hidden="true"
      />
      {children}
    </p>
  );
}

/**
 * The stopwatch on the wire: counts hundredths while the order is in
 * flight, freezes the instant it lands on the kitchen screen.
 */
function FlightTimer({ phase }: { phase: Phase }) {
  const [t, setT] = useState(0);

  useEffect(() => {
    if (phase === "fly") {
      const start = performance.now();
      let raf = 0;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / FLY_MS);
        setT(FINAL_S * p);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }
    setT(phase === "landed" ? FINAL_S : 0);
  }, [phase]);

  const done = phase === "landed";
  return (
    <div
      className={`flex items-center gap-2.5 rounded-full border px-4 py-2 backdrop-blur-sm transition-colors duration-300 ${
        done
          ? "border-tangerine/60 bg-espresso-2/95 shadow-[0_12px_32px_-10px_rgba(249,115,22,0.55)]"
          : "border-cream/12 bg-espresso-2/90"
      }`}
    >
      {done && <Check className="h-3.5 w-3.5 text-tangerine" aria-hidden="true" />}
      <span
        className={`font-mono text-lg font-bold leading-none tabular-nums transition-colors duration-300 ${
          done
            ? "text-tangerine [text-shadow:0_0_18px_rgba(249,115,22,0.6)]"
            : "text-cream/80"
        }`}
      >
        {t.toFixed(2)}s
      </span>
      <span className="h-3.5 w-px bg-cream/15" aria-hidden="true" />
      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-cream/50">
        {PROOF.timerCaption}
      </span>
    </div>
  );
}

/**
 * The guest's phone at the moment of truth: cart reviewed, thumb on the
 * button. The button breathes, gets pressed, turns green the instant
 * the order leaves — same order the kitchen is about to receive.
 */
function RelayPhone({ order, phase }: { order: RelayOrder; phase: Phase }) {
  const placed = phase === "fly" || phase === "landed";
  const pressing = phase === "press";
  const total = orderTotal(order);

  return (
    <div className="relative w-[218px]" role="img" aria-label={`The guest's phone: cart for table ${order.table} with ${orderLines(order).join(", ")}, and the place-order button`}>
      {/* warm pool behind the phone */}
      <div
        className="absolute -inset-9 -z-10 rounded-full bg-tangerine/10 blur-2xl"
        aria-hidden="true"
      />
      {/* socket glow where the wire plugs in (desktop) */}
      <span
        className="wire-socket absolute -right-3 top-[52%] hidden -translate-y-1/2 lg:block"
        aria-hidden="true"
      />
      <div className="relative rounded-[2.2rem] border-[9px] border-espresso-2 bg-cream shadow-[0_28px_56px_-20px_rgba(0,0,0,0.7)] ring-1 ring-cream/12">
        {/* notch */}
        <div
          className="absolute left-1/2 top-1.5 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-espresso"
          aria-hidden="true"
        />
        <div className="h-[400px] overflow-hidden rounded-[1.5rem]">
          <div className="flex h-full flex-col bg-cream">
            {/* status bar */}
            <div className="flex items-center justify-between px-5 pt-2.5 text-[10px] font-medium text-ink-soft">
              <span>9:41</span>
              <span className="flex items-center gap-1" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-ink-soft/60" />
                <span className="h-1.5 w-1.5 rounded-full bg-ink-soft/60" />
                <span className="h-1.5 w-3 rounded-sm bg-ink-soft/60" />
              </span>
            </div>

            {/* header */}
            <div className="px-4 pb-2 pt-2.5">
              <p className="text-[10.5px] font-semibold uppercase tracking-wider text-tangerine-deep">
                Your order · Table {order.table}
              </p>
              <h4 className="font-display text-[17px] font-semibold text-ink">
                Review &amp; confirm
              </h4>
            </div>

            {/* items */}
            <motion.ul
              key={order.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden px-4"
            >
              {order.items.map((it) => (
                <li
                  key={it.name}
                  className="flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2"
                >
                  <span className="text-[12px] font-medium text-ink">
                    {it.qty}× {it.name}
                  </span>
                  <span className="text-[12px] font-bold text-ink">
                    ₹{it.qty * it.price}
                  </span>
                </li>
              ))}
              {order.note && (
                <li className="rounded-lg bg-tangerine-soft/60 px-2.5 py-1.5 text-[11px] font-medium text-ember">
                  Note to kitchen: {order.note}
                </li>
              )}
            </motion.ul>

            {/* total + button */}
            <div className="space-y-2 px-4 pb-4 pt-2">
              <div className="flex items-center justify-between text-[12px] text-ink-soft">
                <span>Total · taxes in</span>
                <span className="font-bold text-ink">₹{total}</span>
              </div>
              {placed ? (
                <motion.div
                  initial={{ scale: 0.96, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex w-full items-center justify-center gap-1.5 rounded-2xl bg-leaf py-3 text-[12.5px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(37,109,58,0.6)]"
                >
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Order placed · ₹{total} via UPI
                </motion.div>
              ) : (
                <div
                  className={`flex w-full items-center justify-center gap-1.5 rounded-2xl bg-tangerine-deep py-3 text-[12.5px] font-bold text-white transition-transform duration-150 ${
                    pressing ? "scale-[0.97] brightness-110" : "cta-breath"
                  }`}
                >
                  {pressing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Placing…
                    </>
                  ) : (
                    <>
                      Place order · Pay with UPI
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * "Every order lands the moment it's placed" — told as one synchronized
 * machine: the guest's thumb on the left, the kitchen screen on the
 * right, and the order itself visibly making the trip between them.
 * One clock drives all three, so phone, packet and screen always agree.
 */
export function OrderRelaySection() {
  const reduced = useReducedMotion();
  const [{ step, phase }, advance] = useState<{ step: number; phase: Phase }>({
    step: 0,
    phase: "idle",
  });

  // The relay loop: idle → press → fly → landed → next order.
  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => {
      advance(({ step, phase }) =>
        phase === "landed"
          ? { step: (step + 1) % N, phase: "idle" }
          : {
              step,
              phase:
                phase === "idle" ? "press" : phase === "press" ? "fly" : "landed",
            }
      );
    }, PHASE_MS[phase]);
    return () => clearTimeout(t);
  }, [phase, step, reduced]);

  // Reduced motion: freeze on the moment of arrival — order placed,
  // packet mid-wire, kitchen screen holding the landed order.
  const live = reduced ? { step: 0, phase: "landed" as Phase } : { step, phase };
  const order = RELAY_ORDERS[live.step];
  const placed = live.phase === "fly" || live.phase === "landed";

  // The kitchen screen shows a rolling 3-order window that ages with
  // the loop — the current order enters the moment it "lands".
  const kdsOrders = useMemo<DisplayOrder[]>(() => {
    const end = placed ? live.step : live.step - 1;
    const count = 3;
    return Array.from({ length: count }, (_, k) => {
      const idx = (((end - (count - 1) + k) % N) + N) % N;
      const o = RELAY_ORDERS[idx];
      const newest = k === count - 1;
      const status: KdsStatus = newest
        ? placed
          ? "new"
          : "cooking"
        : k === count - 2
          ? placed
            ? "cooking"
            : "served"
          : "served";
      return {
        id: o.id,
        table: o.table,
        items: orderLines(o),
        note: o.note,
        status,
        uid: uidOf(idx),
      };
    });
  }, [live.step, placed]);

  const landedUid = live.phase === "landed" ? uidOf(live.step) : null;
  const flying = live.phase === "fly";

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

        {/* the relay scene */}
        <Reveal delay={0.12} className="relative mx-auto mt-16 max-w-5xl lg:mt-24">
          {/* Petpooja radar — faint rings radiating from the trip */}
          <svg
            className="absolute left-1/2 top-1/2 -z-10 h-[880px] w-[880px] -translate-x-1/2 -translate-y-1/2"
            viewBox="0 0 880 880"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="440" cy="440" r="205" stroke="#f97316" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="3 12" />
            <circle cx="440" cy="440" r="320" stroke="#f97316" strokeOpacity="0.13" strokeWidth="1.5" strokeDasharray="3 12" />
            <circle cx="440" cy="440" r="430" stroke="#f97316" strokeOpacity="0.08" strokeWidth="1.5" strokeDasharray="3 12" />
          </svg>

          <div className="relative grid items-center gap-10 lg:grid-cols-[auto_1fr_auto] lg:gap-6 xl:gap-8">
            {/* the wire — one continuous line from the phone into the
                kitchen screen. It runs the full width at the row's
                midline; both devices sit on top of it, so it visibly
                plugs into the phone on one end and the screen on the
                other (desktop only — mobile uses the vertical wire
                further down). */}
            <div
              className="pointer-events-none absolute inset-x-0 top-1/2 z-0 hidden h-28 -translate-y-1/2 lg:block"
              aria-hidden="true"
            >
              {/* stem mounting the stopwatch above the wire */}
              <span className="absolute left-[41%] top-[40px] h-[16px] w-px -translate-x-1/2 bg-gradient-to-b from-tangerine/70 to-tangerine/10" />
              {/* the line itself */}
              <div
                className={`relay-wire absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full ${flying ? "is-live" : ""}`}
              />
              {/* the order, making the trip — it slides under the kitchen
                  screen's edge and disappears into it */}
              <AnimatePresence>
                {flying && (
                  <motion.div
                    key={`h-${order.id}`}
                    className="absolute top-1/2 z-[1]"
                    initial={{ left: "27%", opacity: 0, x: "-50%", y: "-50%" }}
                    animate={{ left: "60%", opacity: 1, x: "-50%", y: "-50%" }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: FLY_MS / 1000, ease: [0.45, 0, 0.2, 1] }}
                  >
                    <span className="relay-packet block rounded-full bg-tangerine px-2.5 py-1 font-mono text-[10px] font-bold tracking-wide text-espresso">
                      {packetLabel(order)}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* the stopwatch, mounted above the wire */}
              <div className="absolute left-[41%] top-0 z-[2] -translate-x-1/2">
                <FlightTimer phase={live.phase} />
              </div>
              <p className="absolute left-[41%] top-[72px] -translate-x-1/2 whitespace-nowrap font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-cream/60">
                {PROOF.wireCaption}
              </p>
            </div>

            {/* the guest's phone */}
            <div className="relative z-[1] flex flex-col items-center gap-4">
              <SceneLabel>
                {PROOF.phoneLabel} · T{order.table}
              </SceneLabel>
              <RelayPhone order={order} phase={live.phase} />
              <SceneCaption>{PROOF.callouts[0]}</SceneCaption>
            </div>

            {/* breathing room between the devices — the wire lives in the
                absolute layer above */}
            <div className="hidden lg:block" aria-hidden="true" />

            {/* the wire — vertical on smaller screens */}
            <div
              className="relative flex flex-col items-center gap-3 lg:hidden"
              aria-hidden="true"
            >
              <FlightTimer phase={live.phase} />
              <div className="relative h-16 w-4">
                <div
                  className={`relay-wire-v absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full ${flying ? "is-live" : ""}`}
                />
                <AnimatePresence>
                  {flying && (
                    <motion.div
                      key={`v-${order.id}`}
                      className="absolute left-1/2"
                      initial={{ top: "0%", opacity: 0, x: "-50%", y: "-50%" }}
                      animate={{ top: "100%", opacity: 1, x: "-50%", y: "-50%" }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: FLY_MS / 1000, ease: [0.45, 0, 0.2, 1] }}
                    >
                      <span className="relay-packet-v block rounded-full bg-tangerine px-2.5 py-1 font-mono text-[10px] font-bold tracking-wide text-espresso">
                        {packetLabel(order)}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <p className="text-center font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-cream/60">
                {PROOF.wireCaption}
              </p>
            </div>

            {/* the kitchen screen */}
            <div className="relative z-[1] flex w-full flex-col items-center gap-4 lg:w-[400px]">
              {/* scoreboard header — the label and the live arrival chip
                  share one row, so the chip can never collide with it */}
              <div className="flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
                <SceneLabel>{PROOF.kitchenLabel}</SceneLabel>
                <span className="relative ml-auto flex h-7 items-center">
                  <AnimatePresence>
                    {placed && (
                      <motion.span
                        key={`chip-${order.id}`}
                        initial={{ opacity: 0, y: 8, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.95 }}
                        transition={{ duration: 0.32, ease: EASE }}
                        className="flex items-center gap-2 whitespace-nowrap rounded-full border border-tangerine/40 bg-espresso-2/95 px-3.5 py-1.5 font-mono text-[10px] font-bold tracking-[0.05em] text-tangerine shadow-[0_12px_32px_-10px_rgba(249,115,22,0.5)] backdrop-blur-sm"
                      >
                        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tangerine opacity-70" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-tangerine" />
                        </span>
                        Order #{order.id} · just placed
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </div>
              <div className="relative w-full">
                {/* socket glow where the wire enters the screen */}
                <span
                  className="wire-socket absolute -left-3 top-[calc(50%-6px)] hidden -translate-y-1/2 lg:block"
                  aria-hidden="true"
                />
                {/* ember light pool behind the screen */}
                <div
                  className="kds-glow absolute -inset-x-16 -inset-y-14 -z-10"
                  aria-hidden="true"
                />
                <KitchenDisplay
                  dense
                  orders={kdsOrders}
                  landedUid={landedUid}
                  className="w-full"
                />
              </div>
              <SceneCaption>{PROOF.callouts[1]}</SceneCaption>
            </div>
          </div>

          {/* bottom hairline annotation */}
          <div className="mt-14 flex flex-col items-center gap-2">
            <span
              className="hidden h-6 w-px bg-gradient-to-b from-tangerine/70 to-transparent lg:block"
              aria-hidden="true"
            />
            <p className="flex items-center gap-2.5 text-center font-mono text-[11px] font-bold uppercase leading-relaxed tracking-[0.08em] text-cream/75">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-tangerine shadow-[0_0_10px_rgba(249,115,22,0.9)]"
                aria-hidden="true"
              />
              {PROOF.callouts[2]}
            </p>
          </div>
        </Reveal>

        {/* hard-zero stat hairline */}
        <Reveal delay={0.1}>
          <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-8 border-t border-cream/10 pt-10 sm:grid-cols-3 sm:gap-6">
            {PROOF.stats.map((s) => (
              <div key={s.label} className="text-center">
                <dd className="font-display text-[2.75rem] font-semibold leading-none text-tangerine [text-shadow:0_0_32px_rgba(249,115,22,0.35)]">
                  {s.value}
                </dd>
                <dt className="mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-cream/65">
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
