"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BellRing,
  Check,
  ChefHat,
  ClipboardList,
  Flame,
  IndianRupee,
  Plus,
  QrCode,
  Wallet,
} from "lucide-react";
import { Marquee } from "../magic/marquee";
import { BentoCard } from "../magic/bento";
import { Reveal, Stagger, StaggerItem } from "../reveal";
import { Section, H2, CTAButtons, PillBadge } from "../ui-bits";
import { IMAGES } from "@/lib/site/images";
import { DEMO_MENU } from "../phone-demo";

const EASE = [0.2, 0, 0, 1] as const;

/* ────────────────────────────────────────────────────────────────
   Card 01 background — the guest's camera viewfinder over the
   table QR: corner brackets, a sweeping scan line, the table chip.
   ──────────────────────────────────────────────────────────────── */
function ScanBackground() {
  return (
    <div className="absolute inset-x-4 bottom-4 top-[11rem] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-sand to-tangerine-soft">
      {IMAGES.qrScan && (
        <img
          src={IMAGES.qrScan}
          alt="Guest scanning the QR code on a restaurant table to open the digital menu"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      )}
      {/* warm cinematic grade so the photo sits in the card */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-espresso/35 via-transparent to-espresso/10"
        aria-hidden="true"
      />
      {/* viewfinder corners */}
      <span className="absolute left-3 top-3 h-6 w-6 rounded-tl-lg border-l-[3px] border-t-[3px] border-cream drop-shadow-[0_1px_3px_rgba(34,17,7,0.45)]" />
      <span className="absolute right-3 top-3 h-6 w-6 rounded-tr-lg border-r-[3px] border-t-[3px] border-cream drop-shadow-[0_1px_3px_rgba(34,17,7,0.45)]" />
      <span className="absolute bottom-3 left-3 h-6 w-6 rounded-bl-lg border-b-[3px] border-l-[3px] border-cream drop-shadow-[0_1px_3px_rgba(34,17,7,0.45)]" />
      <span className="absolute bottom-3 right-3 h-6 w-6 rounded-br-lg border-b-[3px] border-r-[3px] border-cream drop-shadow-[0_1px_3px_rgba(34,17,7,0.45)]" />
      {/* the sweep */}
      <span className="scan-line absolute inset-x-3 h-[3px] rounded-full bg-tangerine shadow-[0_0_18px_5px_rgba(249,115,22,0.5)]" />
      {/* table + result chips */}
      <span className="absolute right-3 top-3 rounded-full bg-espresso/75 px-3 py-1 font-mono text-[10.5px] font-bold tracking-[0.16em] text-cream backdrop-blur-sm">
        TABLE 06
      </span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Card 02 background — the menu itself, drifting past on a ticker:
   real dishes, veg marks, prices, add-to-order chips.
   ──────────────────────────────────────────────────────────────── */
const DISHES: { name: string; price: number; veg: boolean; img: string | null }[] =
  [
    { name: DEMO_MENU[0].name, price: DEMO_MENU[0].price, veg: DEMO_MENU[0].veg, img: DEMO_MENU[0].img },
    { name: DEMO_MENU[1].name, price: DEMO_MENU[1].price, veg: DEMO_MENU[1].veg, img: DEMO_MENU[1].img },
    { name: DEMO_MENU[2].name, price: DEMO_MENU[2].price, veg: DEMO_MENU[2].veg, img: DEMO_MENU[2].img },
    { name: "Dal Makhani", price: 240, veg: true, img: null },
    { name: "Tandoori Platter", price: 360, veg: false, img: null },
  ];

function VegMark({ veg }: { veg: boolean }) {
  return (
    <span
      className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border ${
        veg ? "border-leaf" : "border-[#a3372b]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${veg ? "bg-leaf" : "bg-[#a3372b]"}`}
      />
    </span>
  );
}

function DishCard({
  name,
  price,
  veg,
  img,
}: {
  name: string;
  price: number;
  veg: boolean;
  img: string | null;
}) {
  return (
    <figure className="relative w-48 shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-[0_14px_32px_-20px_rgba(43,26,16,0.35)] transform-gpu blur-[1px] opacity-90 transition-all duration-300 ease-out hover:blur-none hover:opacity-100">
      <div className="flex items-center gap-2.5">
        {img ? (
          <img
            src={img}
            alt={`${name} dish on Tabble's QR digital menu`}
            loading="lazy"
            decoding="async"
            className="h-11 w-11 shrink-0 rounded-xl object-cover"
          />
        ) : (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-tangerine-soft to-sand font-display text-sm font-semibold text-ember">
            {name
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <VegMark veg={veg} />
            <figcaption className="truncate text-[13px] font-semibold text-ink">
              {name}
            </figcaption>
          </div>
          <p className="mt-0.5 font-mono text-[11px] font-bold text-ember">
            ₹{price}
          </p>
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-center gap-1 rounded-lg bg-tangerine-soft py-1.5 text-[11px] font-bold text-ember">
        <Plus className="h-3 w-3" aria-hidden="true" />
        Add to order
      </div>
    </figure>
  );
}

function MenuMarqueeBackground() {
  return (
    <>
      <div className="absolute inset-x-0 top-[11rem]">
        <Marquee
          pauseOnHover
          className="[--duration:22s] [--gap:0.75rem] [mask-image:linear-gradient(to_bottom,#000_58%,transparent_96%)]"
        >
          {DISHES.map((d) => (
            <DishCard key={d.name} {...d} />
          ))}
        </Marquee>
        {/* dishes dissolve at the card's side edges, never hard-sliced */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-card to-transparent sm:w-20"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-card to-transparent sm:w-20"
          aria-hidden="true"
        />
      </div>
      {/* the running cart for this table — anchored to the card corner */}
      <div className="absolute bottom-6 right-6 rounded-full bg-espresso px-3.5 py-1.5 font-mono text-[10.5px] font-bold tracking-wide text-cream shadow-[0_10px_24px_-10px_rgba(34,17,7,0.6)]">
        Table 06 · 3 items · ₹700
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────
   Card 03 background — the kitchen display's live feed: order
   tickets arriving, stacking, dissolving (AnimatedList, Magic UI).
   ──────────────────────────────────────────────────────────────── */
const FEED = [
  { icon: Flame, title: "Table 06", body: "2× Butter Chicken · 1× Garlic Naan", meta: "just landed" },
  { icon: ChefHat, title: "Table 11", body: "Paneer Tikka · extra chutney", meta: "just landed" },
  { icon: BellRing, title: "Table 02", body: "Guest note — no onion, medium spice", meta: "from guest" },
  { icon: Check, title: "Table 09", body: "2× Thali marked served", meta: "by kitchen" },
  { icon: Flame, title: "Table 14", body: "1× Tandoori Platter · 2× Naan", meta: "just landed" },
  { icon: ChefHat, title: "Table 05", body: "Round 2 — Dal Makhani, jeera rice", meta: "just landed" },
] as const;

function FeedItem({ ev }: { ev: (typeof FEED)[number] }) {
  const Icon = ev.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: -18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 22, scale: 0.97, transition: { duration: 0.3 } }}
      transition={{ duration: 0.45, ease: EASE }}
      className="flex shrink-0 items-center gap-3 rounded-xl border border-border bg-card/95 px-3.5 py-2.5 shadow-[0_10px_28px_-18px_rgba(43,26,16,0.4)] backdrop-blur-sm"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-tangerine-soft text-ember">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold leading-tight text-ink">
          {ev.title}
        </p>
        <p className="mt-0.5 truncate text-xs text-ink-soft">{ev.body}</p>
      </div>
      <span className="flex shrink-0 items-center gap-1.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-ember">
        <span className="live-ping h-1.5 w-1.5 rounded-full bg-tangerine" />
        {ev.meta}
      </span>
    </motion.div>
  );
}

function KitchenFeedBackground() {
  const reduced = useReducedMotion();
  const counter = useRef(3);
  // Initial stack (top→bottom): 5, 4, 3 — the emission cycle picks up at 0,
  // so Table 06 arrives first and no event is ever shown twice at once.
  const [items, setItems] = useState<{ id: number; ev: number }[]>([
    { id: 0, ev: 5 },
    { id: 1, ev: 4 },
    { id: 2, ev: 3 },
  ]);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setItems((prev) => {
        const next = (prev[0]?.ev ?? 0) + 1;
        return [{ id: ++counter.current, ev: next % FEED.length }, ...prev].slice(0, 4);
      });
    }, 2400);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className="absolute left-3 right-3 top-[10.75rem] md:left-auto md:right-4 md:top-[4.5rem] md:w-[272px]">
      <div className="flex h-[8.75rem] flex-col gap-2.5 overflow-hidden [mask-image:linear-gradient(to_bottom,#000_60%,transparent_97%)] md:h-[14.5rem]">
        <AnimatePresence initial={false} mode="popLayout">
          {(reduced
            ? [
                { id: 0, ev: 0 },
                { id: 1, ev: 1 },
                { id: 2, ev: 2 },
              ]
            : items
          ).map(({ id, ev }) => (
            <FeedItem key={id} ev={FEED[ev]} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Card 04 background — the payment moment on loop: UPI paying →
   paid, settled. The same Table 06, the same ₹700.
   ──────────────────────────────────────────────────────────────── */
function PayLoopBackground() {
  const reduced = useReducedMotion();
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (reduced) {
      // Async (post-paint) so hydration never mismatches the server render.
      const raf = requestAnimationFrame(() => setPaid(true));
      return () => cancelAnimationFrame(raf);
    }
    const t = setInterval(() => setPaid((p) => !p), 2600);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <div className="absolute inset-0">
      {/* ember pool behind the widget */}
      <div className="absolute bottom-0 left-1/2 h-44 w-72 -translate-x-1/2 rounded-full bg-tangerine/10 blur-2xl" />
      <div className="absolute bottom-5 left-1/2 w-[232px] -translate-x-1/2">
        <AnimatePresence mode="wait" initial={false}>
          {paid ? (
            <motion.div
              key="paid"
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="rounded-2xl border border-leaf/30 bg-card px-4 py-3.5 shadow-[0_18px_40px_-20px_rgba(43,26,16,0.35)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-leaf text-white">
                  <Check className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-tight text-ink">
                    Paid · Table 06
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-leaf">
                    UPI · settled to your bank
                  </p>
                </div>
                <p className="font-display text-lg font-semibold text-ink">
                  ₹700
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="paying"
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="rounded-2xl border border-border bg-card px-4 py-3.5 shadow-[0_18px_40px_-20px_rgba(43,26,16,0.35)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tangerine-soft text-ember">
                  <Wallet className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-tight text-ink">
                    Paying via UPI
                    <span className="ml-1 inline-flex translate-y-[1px] gap-[3px]">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="h-1 w-1 animate-pulse rounded-full bg-ember"
                          style={{ animationDelay: `${d * 0.18}s` }}
                        />
                      ))}
                    </span>
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink-soft">
                    Table 06 · dinner
                  </p>
                </div>
                <p className="font-display text-lg font-semibold text-ink">
                  ₹700
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   The section — "From scan to kitchen in one breath." as a bento
   grid of four live tiles. One table (Table 06) travels through
   all four cards: scanned → ordered → fired → paid.
   ──────────────────────────────────────────────────────────────── */
export function StepsBentoSection() {
  return (
    <Section
      tone="cream"
      id="how-it-works"
      className="relative z-10 -mt-6 rounded-t-[2.5rem] shadow-[0_-18px_48px_-28px_rgba(34,17,7,0.45)]"
    >
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <PillBadge>How it works</PillBadge>
        </Reveal>
        <Reveal delay={0.08}>
          <H2 className="mt-5">From scan to kitchen in one breath.</H2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 leading-relaxed text-ink-soft">
            No app for your guests, no new hardware for you, no training night
            for staff. Four steps your guests already know how to do.
          </p>
        </Reveal>
      </div>

      <Stagger
        gap={0.08}
        className="mt-14 grid auto-rows-[19.5rem] gap-4 md:auto-rows-[21rem] md:grid-cols-3"
      >
        <StaggerItem className="h-full md:col-span-1">
          <BentoCard
            num="01"
            Icon={QrCode}
            title="Guest scans the table QR"
            className="h-full"
            background={<ScanBackground />}
          >
            No app, no sign-up. The menu opens in seconds — on the right
            table.
          </BentoCard>
        </StaggerItem>

        <StaggerItem className="h-full md:col-span-2">
          <BentoCard
            num="02"
            Icon={ClipboardList}
            title="They order from their seats"
            className="h-full"
            background={<MenuMarqueeBackground />}
          >
            Your photo-first menu with modifiers. Another round without
            flagging anyone down.
          </BentoCard>
        </StaggerItem>

        <StaggerItem className="h-full md:col-span-2">
          <BentoCard
            num="03"
            Icon={ChefHat}
            title="Kitchen fires instantly"
            className="h-full"
            textClassName="md:max-w-[calc(100%-19rem)]"
            background={<KitchenFeedBackground />}
          >
            Table, items and guest notes land on your kitchen display the
            moment they're placed.
          </BentoCard>
        </StaggerItem>

        <StaggerItem className="h-full md:col-span-1">
          <BentoCard
            num="04"
            Icon={IndianRupee}
            title="Guests pay when ready"
            className="h-full"
            background={<PayLoopBackground />}
          >
            UPI, cards or wallets from the same screen — tables turn while
            your staff host.
          </BentoCard>
        </StaggerItem>
      </Stagger>

      <Reveal delay={0.1}>
        <div className="mt-12 flex justify-center">
          <CTAButtons
            primaryLabel="Request early access"
            secondaryLabel="Full walkthrough"
            secondaryRoute="how-it-works"
            align="center"
          />
        </div>
      </Reveal>
    </Section>
  );
}
