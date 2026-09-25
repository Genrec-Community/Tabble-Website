"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite ticker (Magic UI marquee port, warm-brand tuned).
 * Children are repeated `repeat` times; the row translates by
 * (-100% - gap) per cycle so the loop is seamless.
 *
 * SEO: only the first copy is server-rendered — the loop clones are
 * added client-side after mount, so crawlers read each piece of
 * content exactly once instead of `repeat` times.
 * Speed/spacing set per-instance: [--duration:26s] [--gap:1rem].
 */
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  vertical?: boolean;
  reverse?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
}) {
  const [copies, setCopies] = useState(1);

  useEffect(() => {
    // Hydrated — now build the seamless loop. SSR markup stays deduplicated.
    setCopies(repeat);
  }, [repeat]);

  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [gap:var(--gap)] [--duration:40s] [--gap:1rem]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {Array(copies)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            aria-hidden={i > 0}
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)]",
              vertical
                ? "animate-marquee-vertical flex-col"
                : "animate-marquee flex-row",
              reverse && "[animation-direction:reverse]",
              pauseOnHover && "group-hover:[animation-play-state:paused]"
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
