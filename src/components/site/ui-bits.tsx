"use client";

import React from "react";
import { RouteLink, type Route } from "@/lib/site/router";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";

export function Section({
  children,
  className = "",
  id,
  tone = "cream",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "cream" | "deep" | "espresso" | "white";
}) {
  const tones = {
    cream: "bg-cream",
    deep: "bg-cream-deep",
    espresso: "bg-espresso text-cream",
    white: "bg-card",
  } as const;
  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {children}
      </div>
    </section>
  );
}

export function Kicker({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] ${
        tone === "light" ? "text-tangerine-deep" : "text-tangerine-soft"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${tone === "light" ? "bg-tangerine" : "bg-tangerine"}`}
        aria-hidden="true"
      />
      {children}
    </p>
  );
}

/** Petpooja-style section pill — light tint, uppercase mono, accent text. */
export function PillBadge({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] ${
        tone === "light"
          ? "bg-tangerine-soft text-ember"
          : "border border-tangerine/30 bg-tangerine/10 text-tangerine"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {children}
    </p>
  );
}

export function H2({
  children,
  className = "",
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <h2
      className={`font-display text-3xl font-semibold leading-[1.12] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] ${
        tone === "light" ? "text-ink" : "text-cream"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

export function CTAButtons({
  primaryLabel = "Request early access",
  primaryRoute = "request-access",
  secondaryLabel,
  secondaryRoute,
  secondaryAnchor,
  size = "lg",
  dark = false,
  align = "left",
}: {
  primaryLabel?: string;
  primaryRoute?: Route;
  secondaryLabel?: string;
  secondaryRoute?: Route;
  secondaryAnchor?: string;
  size?: "default" | "lg";
  dark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-center ${
        align === "center" ? "sm:justify-center items-center" : "items-start"
      }`}
    >
      <Button
        asChild
        size={size}
        className={`h-13 min-h-12 px-7 text-base font-bold ${
          dark
            ? "bg-tangerine text-espresso hover:bg-tangerine/90 shadow-[0_10px_32px_-8px_rgba(249,115,22,0.55)]"
            : "bg-tangerine-deep text-primary-foreground hover:bg-tangerine-deep/90 shadow-[0_10px_32px_-8px_rgba(224,96,10,0.45)]"
        }`}
      >
        <RouteLink route={primaryRoute}>
          {primaryLabel}
          <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
        </RouteLink>
      </Button>
      {secondaryLabel && secondaryRoute && (
        <Button
          asChild
          size={size}
          variant="ghost"
          className={`h-13 min-h-12 px-6 text-base font-semibold ${
            dark ? "text-cream hover:bg-cream/10" : "text-ink hover:bg-sand/60"
          }`}
        >
          <RouteLink route={secondaryRoute} anchor={secondaryAnchor}>
            <PlayCircle className="mr-1.5 h-5 w-5" aria-hidden="true" />
            {secondaryLabel}
          </RouteLink>
        </Button>
      )}
    </div>
  );
}

/** Image slot with warm placeholder fallback — never a gray box. */
export function ImgSlot({
  src,
  alt,
  className = "",
  ratio = "aspect-[4/3]",
  caption,
}: {
  src: string | null;
  alt: string;
  className?: string;
  ratio?: string;
  caption?: string;
}) {
  return (
    <figure className={className}>
      <div
        className={`relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-sand via-tangerine-soft to-sand ${ratio}`}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="rounded-full border border-ember/20 bg-cream/70 px-4 py-1.5 text-xs font-medium text-ember">
              {alt}
            </span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-center text-xs text-ink-soft">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
