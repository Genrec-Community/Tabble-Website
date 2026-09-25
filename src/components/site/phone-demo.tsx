"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronRight, Flame, Leaf, Minus, Plus, QrCode, Receipt } from "lucide-react";

const EASE = [0.2, 0, 0, 1] as const;

export type MenuItem = {
  name: string;
  desc: string;
  price: number;
  img: string | null;
  veg: boolean;
  spicy?: boolean;
};

export const DEMO_MENU: MenuItem[] = [
  {
    name: "Butter Chicken",
    desc: "Creamy tomato gravy, tandoor-smoked",
    price: 320,
    img: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/599ba1297534.jpg",
    veg: false,
    spicy: true,
  },
  {
    name: "Paneer Tikka",
    desc: "Charred cottage cheese, mint chutney",
    price: 280,
    img: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/87b933bc36ac.jpg",
    veg: true,
    spicy: true,
  },
  {
    name: "Garlic Naan",
    desc: "Clay-oven flatbread, garlic butter",
    price: 60,
    img: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/439b9830aa04.jpg",
    veg: true,
  },
];

function VegDot({ veg }: { veg: boolean }) {
  return (
    <span
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border ${
        veg ? "border-leaf" : "border-[#a3372b]"
      }`}
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      role="img"
    >
      <span
        className={`h-2 w-2 rounded-full ${veg ? "bg-leaf" : "bg-[#a3372b]"}`}
      />
    </span>
  );
}

function Thumb({ item }: { item: MenuItem }) {
  return item.img ? (
    <img
      src={item.img}
      alt={`${item.name} dish on the Tabble QR menu`}
      className="h-12 w-12 rounded-xl object-cover"
      loading="lazy"
    />
  ) : (
    <span
      aria-hidden="true"
      className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-tangerine-soft to-sand"
    >
      <span className="font-display text-sm font-semibold text-ember">
        {item.name.slice(0, 2)}
      </span>
    </span>
  );
}

/**
 * The animated guest-ordering demo that lives inside the hero phone.
 * Cycles: menu → items added → cart → order confirmed. Reduced-motion: static menu.
 */
export function PhoneDemo({ menu }: { menu: MenuItem[] }) {
  const reduced = useReducedMotion();
  // 0 menu, 1 cart, 2 confirmed. One state object so the loop reset is atomic.
  const [state, setState] = useState<{ scene: number; added: number[] }>({
    scene: 0,
    added: [],
  });

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setState((s) => {
        const next = (s.scene + 1) % 3;
        return { scene: next, added: next === 0 ? [] : s.added };
      });
    }, 3400);
    return () => clearInterval(t);
  }, [reduced]);

  // progressively add items during menu scene
  useEffect(() => {
    if (state.scene !== 0 || reduced) return;
    const timers = menu.map((_, i) =>
      setTimeout(
        () => setState((s) => (s.added.includes(i) ? s : { ...s, added: [...s.added, i] })),
        600 + i * 700
      )
    );
    return () => timers.forEach(clearTimeout);
  }, [state.scene, menu, reduced]);

  // reduced motion: settle on the confirmed scene, fully ordered
  const scene = reduced ? 2 : state.scene;
  const added = reduced ? menu.map((_, i) => i) : state.added;

  const total = useMemo(
    () => added.reduce((sum, i) => sum + (menu[i]?.price ?? 0), 0),
    [added, menu]
  );

  return (
    <div className="flex h-full flex-col bg-cream" role="img" aria-label="Demo of the Tabble guest ordering flow: browse the menu, add dishes, review the cart, and place the order.">
      {/* status bar */}
      <div className="flex items-center justify-between px-5 pt-3 text-[10px] font-medium text-ink-soft">
        <span>9:41</span>
        <span className="flex items-center gap-1" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-ink-soft/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-ink-soft/60" />
          <span className="h-1.5 w-3 rounded-sm bg-ink-soft/60" />
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {scene === 0 && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="px-5 pb-3 pt-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-tangerine-deep">
                Spice Route Kitchen
              </p>
              <h3 className="font-display text-lg font-semibold text-ink">
                Table 6 · Dinner menu
              </h3>
            </div>
            <ul className="flex-1 space-y-2.5 overflow-hidden px-4">
              {menu.map((item, i) => (
                <motion.li
                  key={item.name}
                  layout
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-2.5"
                >
                  <Thumb item={item} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <VegDot veg={item.veg} />
                      <p className="truncate text-[13px] font-semibold text-ink">
                        {item.name}
                      </p>
                      {item.spicy && (
                        <Flame
                          className="h-3 w-3 shrink-0 text-tangerine-deep"
                          aria-label="Spicy"
                        />
                      )}
                    </div>
                    <p className="truncate text-[11px] text-ink-soft">{item.desc}</p>
                    <p className="mt-0.5 text-[13px] font-bold text-ink">₹{item.price}</p>
                  </div>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                      added.includes(i)
                        ? "bg-leaf text-white"
                        : "bg-tangerine-deep text-white"
                    }`}
                  >
                    {added.includes(i) ? (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    )}
                  </span>
                </motion.li>
              ))}
            </ul>
            <div className="px-5 pb-5 pt-3">
              <div
                className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                  added.length > 0
                    ? "bg-tangerine-deep text-white"
                    : "bg-sand text-ink-soft"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/25 text-[11px]">
                    {added.length}
                  </span>
                  {added.length > 0 ? "View order" : "Add dishes"}
                </span>
                <span>{total > 0 ? `₹${total}` : "—"}</span>
              </div>
            </div>
          </motion.div>
        )}

        {scene === 1 && (
          <motion.div
            key="cart"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="px-5 pb-3 pt-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-tangerine-deep">
                Your order · Table 6
              </p>
              <h3 className="font-display text-lg font-semibold text-ink">Review & confirm</h3>
            </div>
            <ul className="flex-1 space-y-2 px-4">
              {menu.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between rounded-2xl border border-border bg-card px-3.5 py-2.5"
                >
                  <span className="flex items-center gap-2">
                    <Minus className="h-3.5 w-3.5 text-ink-soft" aria-hidden="true" />
                    <span className="text-[13px] font-medium text-ink">1× {item.name}</span>
                    <Plus className="h-3.5 w-3.5 text-ink-soft" aria-hidden="true" />
                  </span>
                  <span className="text-[13px] font-bold text-ink">₹{item.price}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-2 px-5 pb-5 pt-3">
              <div className="flex items-center justify-between text-sm text-ink-soft">
                <span>Total · taxes included</span>
                <span className="font-bold text-ink">₹{total}</span>
              </div>
              <motion.button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-tangerine-deep py-3.5 text-sm font-bold text-white"
                animate={reduced ? undefined : { scale: [1, 1.03, 1] }}
                transition={{ duration: 0.5, repeat: 1 }}
                tabIndex={-1}
                aria-hidden="true"
              >
                Place order · Pay with UPI
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {scene === 2 && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex min-h-0 flex-1 flex-col px-5 pb-5 pt-4"
          >
            <div className="flex flex-col items-center pb-4 pt-2 text-center">
              <motion.span
                initial={reduced ? undefined : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-leaf/15 text-leaf"
              >
                <Check className="h-7 w-7" aria-hidden="true" />
              </motion.span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                Order sent to the kitchen
              </h3>
              <p className="mt-1 text-xs text-ink-soft">
                #1042 · Table 6 · ₹{total} paid via UPI
              </p>
            </div>
            <ol className="space-y-2">
              {[
                { label: "Order received", done: true },
                { label: "Kitchen is cooking", done: true },
                { label: "On its way to you", done: false },
              ].map((s, i) => (
                <li
                  key={s.label}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-2.5 ${
                    s.done ? "border-leaf/30 bg-leaf/10" : "border-border bg-card"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                      s.done ? "bg-leaf text-white" : "bg-sand text-ink-soft"
                    }`}
                  >
                    {s.done ? (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span
                    className={`text-[13px] font-medium ${
                      s.done ? "text-ink" : "text-ink-soft"
                    }`}
                  >
                    {s.label}
                  </span>
                  {i === 1 && !reduced && (
                    <span className="ml-auto flex items-center gap-1 text-[11px] font-semibold text-tangerine-deep">
                      <Flame className="h-3 w-3" aria-hidden="true" />
                      live
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <div className="mt-auto flex items-center justify-center gap-2 pt-4 text-[11px] text-ink-soft">
              <Receipt className="h-3.5 w-3.5" aria-hidden="true" />
              Receipt sent to your phone
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** The hero phone frame + floating live-order chips around it. */
export function HeroPhone({ menu }: { menu: MenuItem[] }) {
  const reduced = useReducedMotion();
  return (
    <div className="relative mx-auto w-[300px] sm:w-[320px]" aria-hidden="false">
      {/* glow */}
      <div className="absolute -inset-10 -z-10 rounded-full bg-tangerine/15 blur-3xl" aria-hidden="true" />

      {/* table tent QR card */}
      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 16, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
        className="absolute -left-16 top-10 z-20 hidden w-28 rounded-2xl border border-border bg-card p-3 shadow-[0_12px_32px_-12px_rgba(43,26,16,0.25)] sm:block lg:-left-24"
      >
        <div className="grid grid-cols-5 gap-[3px] rounded-lg bg-ink p-2" aria-hidden="true">
          {Array.from({ length: 25 }).map((_, i) => (
            <span
              key={i}
              className={`aspect-square rounded-[1.5px] ${
                [0, 1, 3, 4, 5, 7, 9, 10, 12, 14, 16, 18, 20, 21, 22, 23, 24].includes(i)
                  ? "bg-cream"
                  : "bg-ink"
              }`}
            />
          ))}
        </div>
        <p className="mt-2 text-center text-[10px] font-bold uppercase tracking-wide text-ink">
          Table 6
        </p>
        <p className="text-center text-[9px] text-ink-soft">Scan to order</p>
      </motion.div>

      {/* floating order chip */}
      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
        className="absolute -right-12 top-24 z-20 hidden items-center gap-2 rounded-2xl border border-border bg-card px-3.5 py-2.5 shadow-[0_12px_32px_-12px_rgba(43,26,16,0.25)] sm:flex lg:-right-20"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-tangerine-soft text-ember">
          <QrCode className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-[11px] font-bold text-ink">New order · Table 6</p>
          <p className="text-[10px] text-ink-soft">2× Butter Chicken, 4× Naan</p>
        </div>
      </motion.div>

      {/* payment chip */}
      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5, ease: EASE }}
        className="absolute -bottom-5 -left-10 z-20 hidden items-center gap-2 rounded-2xl border border-border bg-card px-3.5 py-2.5 shadow-[0_12px_32px_-12px_rgba(43,26,16,0.25)] sm:flex lg:-left-16"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-leaf/15 text-leaf">
          <Check className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-[11px] font-bold text-ink">Payment received</p>
          <p className="text-[10px] text-ink-soft">₹1,040 · UPI · Table 6</p>
        </div>
      </motion.div>

      {/* phone frame */}
      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
        className="relative rounded-[2.6rem] border-[10px] border-espresso bg-cream shadow-[0_32px_64px_-24px_rgba(43,26,16,0.4)]"
      >
        {/* notch */}
        <div
          className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-espresso"
          aria-hidden="true"
        />
        <div className="h-[560px] overflow-hidden rounded-[1.9rem]">
          <PhoneDemo menu={menu} />
        </div>
      </motion.div>
    </div>
  );
}
