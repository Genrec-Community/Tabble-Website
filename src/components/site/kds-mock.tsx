"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChefHat, CircleDot } from "lucide-react";

const EASE = [0.2, 0, 0, 1] as const;

type KdsOrder = {
  id: number;
  table: number;
  items: string[];
  note?: string;
};

const ROTATION: KdsOrder[] = [
  { id: 1042, table: 6, items: ["2× Butter Chicken", "4× Garlic Naan"], note: "One mild" },
  { id: 1043, table: 2, items: ["1× Paneer Tikka", "2× Lassi"], note: "Jain paneer" },
  { id: 1044, table: 9, items: ["1× Dal Makhani", "3× Butter Naan", "1× Jeera Rice"] },
  { id: 1045, table: 4, items: ["2× Chilli Chicken", "1× Fried Rice"], note: "Extra spicy" },
  { id: 1046, table: 11, items: ["1× Tandoori Platter", "2× Naan"] },
  { id: 1047, table: 7, items: ["2× Veg Biryani", "1× Raita"] },
];

type DisplayOrder = KdsOrder & { status: "new" | "cooking" | "served"; uid: number };

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

export function KitchenDisplay() {
  const reduced = useReducedMotion();
  const [orders, setOrders] = useState<DisplayOrder[]>(STATIC);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setTick((v) => v + 1);
      setOrders((prev) => {
        const next = ROTATION[(tick + 1) % ROTATION.length];
        const aged = prev.map((o, i) =>
          i === 0
            ? { ...o, status: "cooking" as const }
            : i === 1
              ? { ...o, status: "served" as const }
              : o
        );
        return [{ ...next, status: "new", uid: tick + 10 }, ...aged].slice(0, 4);
      });
    }, 3800);
    return () => clearInterval(t);
  }, [reduced, tick]);

  return (
    <div
      className="overflow-hidden rounded-3xl border border-espresso-2/60 bg-espresso shadow-[0_40px_80px_-32px_rgba(34,17,7,0.55)]"
      role="img"
      aria-label="The Tabble kitchen display: guest orders arrive in real time with table numbers, items and status — new, cooking, served."
    >
      {/* window bar */}
      <div className="flex items-center justify-between border-b border-cream/10 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-cream/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-cream/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-cream/20" />
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

      <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
        <AnimatePresence initial={false} mode="popLayout">
          {orders.map((order) => {
            const meta = STATUS_META[order.status];
            const Icon = meta.icon;
            return (
              <motion.article
                key={order.uid}
                layout
                initial={reduced ? undefined : { opacity: 0, y: -18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: EASE }}
                className={`rounded-2xl border p-4 ${
                  order.status === "new"
                    ? "border-tangerine/50 bg-espresso-2 shadow-[0_0_0_1px_rgba(249,115,22,0.25),0_12px_32px_-16px_rgba(249,115,22,0.4)]"
                    : "border-cream/10 bg-espresso-2/60"
                }`}
              >
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
