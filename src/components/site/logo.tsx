"use client";

import { useRouter } from "@/lib/site/router";

/**
 * The Tabble wordmark — typographic, no icon. The tangerine full stop
 * is the whole brand gesture: order complete, table turned.
 */
export function Wordmark({
  compact = false,
  dark = false,
}: {
  compact?: boolean;
  dark?: boolean;
}) {
  return (
    <span
      className={`font-display font-semibold tracking-tight ${
        dark ? "text-cream" : "text-ink"
      } ${compact ? "text-[1.45rem]" : "text-2xl"}`}
    >
      Tabble<span className={dark ? "text-tangerine" : "text-tangerine-deep"}>.</span>
    </span>
  );
}

export function Logo({
  onClick,
  compact = false,
}: {
  onClick?: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center rounded-lg px-1 py-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      aria-label="Tabble — go to home page"
    >
      <Wordmark compact={compact} />
    </button>
  );
}

export function FooterLogo() {
  const { navigate } = useRouter();
  return (
    <button
      type="button"
      onClick={() => navigate("home")}
      className="flex items-center rounded-lg px-1 py-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      aria-label="Tabble — go to home page"
    >
      <Wordmark dark />
    </button>
  );
}
