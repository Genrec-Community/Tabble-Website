"use client";

import { useRouter, type Route } from "@/lib/site/router";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#E0600A" />
      <g fill="#FFFAF3">
        <rect x="14" y="14" width="12" height="12" rx="3" />
        <rect x="38" y="14" width="12" height="12" rx="3" />
        <rect x="14" y="38" width="12" height="12" rx="3" />
      </g>
      <g fill="#FFD9B8">
        <rect x="38" y="38" width="5" height="5" rx="1.5" />
        <rect x="45" y="38" width="5" height="5" rx="1.5" />
        <rect x="38" y="45" width="5" height="5" rx="1.5" />
        <rect x="45" y="45" width="5" height="5" rx="1.5" />
      </g>
    </svg>
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
      className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      aria-label="Tabble — go to home page"
    >
      <LogoMark className={compact ? "h-8 w-8" : "h-9 w-9"} />
      <span
        className={`font-display font-semibold tracking-tight text-ink ${
          compact ? "text-xl" : "text-2xl"
        }`}
      >
        Tabble
      </span>
    </button>
  );
}

export function FooterLogo() {
  const { navigate } = useRouter();
  return (
    <button
      type="button"
      onClick={() => navigate("home")}
      className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      aria-label="Tabble — go to home page"
    >
      <LogoMark className="h-9 w-9" />
      <span className="font-display text-2xl font-semibold tracking-tight text-cream">
        Tabble
      </span>
    </button>
  );
}
