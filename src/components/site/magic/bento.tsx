"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Bento grid (Magic UI bento port, Tabble warm-brand).
 * 3 columns on md+; each card declares its own col-span.
 */
export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid auto-rows-[19.5rem] gap-4 md:auto-rows-[21rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * One bento tile: step chip + title + short body pinned to the TOP,
 * an animated `background` filling the space below/behind it.
 * The background gently scales up on hover.
 */
export function BentoCard({
  className,
  background,
  backgroundClassName,
  textClassName,
  num,
  Icon,
  title,
  children,
}: {
  className?: string;
  background?: React.ReactNode;
  backgroundClassName?: string;
  textClassName?: string;
  num: string;
  Icon: LucideIcon;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "group relative col-span-1 flex flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card",
        "shadow-[0_2px_20px_-10px_rgba(43,26,16,0.10)] transition-shadow duration-300",
        "hover:shadow-[0_24px_48px_-24px_rgba(43,26,16,0.28)]",
        className
      )}
    >
      {background ? (
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]",
            backgroundClassName
          )}
        >
          {background}
        </div>
      ) : null}

      <div
        className={cn(
          "pointer-events-none relative z-10 flex flex-1 flex-col p-6",
          textClassName
        )}
      >
        <div className="flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-dashed border-tangerine/45 bg-card font-mono text-sm font-bold text-ember">
            {num}
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-tangerine-soft text-ember">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>
        <div className="mt-4">
          <h3 className="font-display text-xl font-semibold leading-snug text-ink">
            {title}
          </h3>
          {children ? (
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {children}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
