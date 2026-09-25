"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChefHat, CircleDot } from "lucide-react";
import { RELAY_ORDERS, orderLines } from "@/lib/site/relay";

const EASE = [0.2, 0, 0, 1] as const;

export type KdsStatus = "new" | "cooking" | "served";

export type DisplayOrder = {
  id: number;
  table: number;
  items: string[];
  note?: string;
  status: KdsStatus;
  uid: number;
};

/** Rotation labels derived from the shared relay data (uncontrolled mode). */
const ROTATION = RELAY_ORDERS.map((o) => ({
  id: o.id,
  table: o.table,
  items: orderLines(o),
  note: o.note,
}));

const STATIC: DisplayOrder[] = [
  { ...ROTATION[1], status: "new", uid: 1 },
  { ...ROTATION[2], status: "cooking", uid: 2 },
  { ...ROTATION[3], status: "cooking", uid: 3 },
  { ...ROTATION[4], status: "served", uid: 4 },
];

const STATUS_META = {
  new: { label: "New", icon: CircleDot, cls: "bg-tangerine-soft text-ember border-tangerine/30" },
  cooking: { label: "Cooking", icon: ChefHat, cls: "bg-[#fef3c7] text-[#92400e] border-[#fcd34d]/40" },
  served: { label: "Served", icon: Check, cls: "bg-leaf/10 text-leaf border-leaf/30" },
} as const;

/**
 * The Tabble kitchen display.
 *
 * Uncontrolled (no props): runs its own order rotation — used on the
 * Features page. Controlled (`orders` prop): renders exactly the orders
 * given, so the order-relay scene can sync it to the guest's phone.
 * `landedUid` triggers a one-shot arrival flash on that order card.
 */
export function KitchenDisplay({
  orders,
  landedUid = null,
  dense = false,
  forceTwoCols = false,
  className = "",
}: {
  orders?: DisplayOrder[];
  landedUid?: number | null;
  dense?: boolean;
  /** Always render tickets in two columns — for fixed-height frames on mobile. */
  forceTwoCols?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const controlled = orders !== undefined;
  const [internalOrders, setInternalOrders] = useState<DisplayOrder[]>(STATIC);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced || controlled) return;
    const t = setInterval(() => {
      setTick((v) => v + 1);
      setInternalOrders((prev) => {
        const next = ROTATION[(tick + 1) % ROTATION.length];
        const aged = prev.map((o, i) =>
          i === 0
            ? { ...o, status: "cooking" as const }
            : i === 1
              ? { ...o, status: "served" as const }
              : o
        );
        return [{ ...next, status: "new" as const, uid: tick + 10 }, ...aged].slice(0, 4);
      });
    }, 3800);
    return () => clearInterval(t);
  }, [reduced, tick, controlled]);

  const list = orders ?? internalOrders;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-espresso-2/60 bg-espresso shadow-[0_40px_80px_-32px_rgba(34,17,7,0.55)] ${className}`}
      role="img"
      aria-label="The Tabble kitchen display: guest orders arrive in real time with table numbers, items and status — new, cooking, served."
    >
      {/* one-shot warm screen flash when an order lands */}
      {dense && (
        <AnimatePresence>
          {landedUid !== null && list.some((o) => o.uid === landedUid) && (
            <motion.div
              key={`screen-flash-${landedUid}`}
              initial={{ opacity: reduced ? 0 : 0.32 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="pointer-events-none absolute inset-0 z-20 rounded-3xl bg-tangerine"
              aria-hidden="true"
            />
          )}
        </AnimatePresence>
      )}

      {/* window bar */}
      <div className="flex items-center justify-between border-b border-cream/10 px-4 py-3 sm:px-5 sm:py-3.5">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
          </span>
          <p className="text-sm font-semibold text-cream">Tabble Kitchen · Live orders</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-tangerine/40 bg-tangerine/15 px-2.5 py-1 text-[11px] font-bold text-tangerine">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tangerine opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-tangerine" />
          </span>
          LIVE
        </span>
      </div>

      <div
        className={
          dense
            ? "grid gap-2.5 p-3.5"
            : forceTwoCols
              ? "grid grid-cols-2 gap-3 p-4 sm:p-5"
              : "grid gap-3 p-4 sm:grid-cols-2 sm:p-5"
        }
      >
        <AnimatePresence initial={false} mode="popLayout">
          {list.map((order) => {
            const meta = STATUS_META[order.status];
            const Icon = meta.icon;
            const justLanded = dense && order.uid === landedUid;
            return (
              <motion.article
                key={order.uid}
                layout
                initial={reduced ? undefined : { opacity: 0, y: -18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: EASE }}
                className={`relative rounded-2xl border p-4 ${dense ? "min-h-[170px]" : ""} ${
                  order.status === "new"
                    ? "border-tangerine/50 bg-espresso-2 shadow-[0_0_0_1px_rgba(249,115,22,0.25),0_12px_32px_-16px_rgba(249,115,22,0.4)]"
                    : "border-cream/10 bg-espresso-2/60"
                }`}
              >
                {/* arrival ring flash */}
                {justLanded && (
                  <motion.span
                    key={`ring-${landedUid}`}
                    initial={{ boxShadow: "0 0 0 0 rgba(249,115,22,0.55)" }}
                    animate={{ boxShadow: "0 0 0 18px rgba(249,115,22,0)" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    aria-hidden="true"
                  />
                )}
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display text-base font-semibold text-cream">
                    Table {order.table}
                  </p>
                  <span
                    className={`flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${meta.cls}`}
                  >
                    <Icon className="h-3 w-3" aria-hidden="true" />
                    {meta.label}
                  </span>
                </div>
                <ul className="mt-2.5 space-y-1">
                  {order.items.map((item) => (
                    <li key={item} className="text-[13px] text-cream/80">
                      {item}
                    </li>
                  ))}
                </ul>
                {order.note && (
                  <p className="mt-2 inline-flex rounded-lg bg-cream/10 px-2 py-1 text-[11px] font-medium text-tangerine-soft">
                    Note: {order.note}
                  </p>
                )}
                <p className="mt-2 text-[10px] uppercase tracking-wide text-cream/60">
                  Order #{order.id} · from guest's phone
                </p>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
