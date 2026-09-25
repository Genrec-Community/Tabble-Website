"use client";

import React, { useState } from "react";
import { HERO, FOUNDING } from "@/lib/site/content";
import { RouteLink } from "@/lib/site/router";
import { useForm, validateEmail } from "@/lib/site/form";
import { Reveal } from "../reveal";
import { TextField } from "../form-fields";
import { Confetti } from "../confetti";
import { Button } from "@/components/ui/button";
import { Check, Loader2, PartyPopper, BadgeCheck } from "lucide-react";

export function SignupPage() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ position: number; already: boolean } | null>(null);
  const [topLevelError, setTopLevelError] = useState<string | null>(null);

  const form = useForm(
    { name: "", email: "" },
    {
      name: (v) => (v.length > 80 ? "Name is too long — please shorten it." : undefined),
      email: validateEmail,
    }
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTopLevelError(null);
    if (!form.validateAll()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form.values, source: "signup" }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setResult({ position: data.position, already: data.alreadyRegistered });
      } else if (data.errors) {
        form.setServerError(data.errors);
      } else {
        setTopLevelError(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setTopLevelError("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-cream warm-glow pt-28 sm:pt-36">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* left — pitch */}
        <div className="lg:pt-6">
          <Reveal>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-tangerine-deep">
              <PartyPopper className="h-4 w-4" aria-hidden="true" />
              Early access
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink text-balance sm:text-5xl">
              Get early access to Tabble.
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
              Join the list and be among the first restaurants to turn tables
              into self-ordering, self-paying guests.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-8 space-y-4">
              {[
                {
                  t: "Founding pricing, locked for life",
                  b: "Whatever plan you pick stays at founding rates, forever.",
                },
                {
                  t: "Priority onboarding",
                  b: "We set up your menu for you and walk you to your first live service.",
                },
                {
                  t: "Shape the product",
                  b: "Founding restaurants tell us what to build next — and get it first.",
                },
              ].map((item) => (
                <li key={item.t} className="flex gap-3.5">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tangerine-soft">
                    <Check className="h-3.5 w-3.5 text-ember" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{item.t}</p>
                    <p className="mt-0.5 text-sm text-ink-soft">{item.b}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.26}>
            <p className="mt-8 rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed text-ink-soft">
              Running a restaurant?{" "}
              <RouteLink
                route="request-access"
                className="font-bold text-tangerine-deep underline-offset-4 hover:underline"
              >
                Request access for your restaurant
              </RouteLink>{" "}
              instead — it takes two minutes and puts you in the founding
              cohort directly.
            </p>
          </Reveal>
        </div>

        {/* right — form / success */}
        <Reveal delay={0.1}>
          <div className="relative rounded-3xl border border-border bg-card p-6 shadow-[0_32px_64px_-40px_rgba(43,26,16,0.35)] sm:p-8">
            <Confetti fire={result !== null} />
            {result ? (
              <div className="relative text-center" role="status">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-tangerine-soft text-ember">
                  <PartyPopper className="h-8 w-8" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {result.already ? "You're already on the list!" : "You're on the list!"}
                </h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-tangerine-deep">
                  Spot #{result.position} in the early-access queue
                </p>
                <p className="mx-auto mt-4 max-w-sm leading-relaxed text-ink-soft">
                  {result.already
                    ? "Someone with this email has already joined — no action needed. We'll reach out as the founding cohort opens up."
                    : "We'll email you as soon as your spot opens. Here's what happens next:"}
                </p>
                {!result.already && (
                  <ol className="mx-auto mt-6 max-w-xs space-y-3 text-left">
                    {[
                      "We confirm your email and queue position",
                      "You get founding pricing details before anyone else",
                      "Your onboarding slot is scheduled",
                    ].map((s, i) => (
                      <li key={s} className="flex items-center gap-3 text-sm text-ink">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tangerine-soft font-display text-xs font-bold text-ember">
                          {i + 1}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ol>
                )}
                <Button
                  asChild
                  className="mt-8 h-12 w-full bg-tangerine-deep text-base font-bold text-primary-foreground hover:bg-tangerine-deep/90"
                >
                  <RouteLink route="home">Back to home</RouteLink>
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="relative space-y-5">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    Join the waitlist
                  </h2>
                  <p className="mt-1.5 text-sm text-ink-soft">
                    Two fields. Thirty seconds. No spam, ever.
                  </p>
                </div>
                <TextField
                  id="su-name"
                  label="Your name"
                  placeholder="e.g. Priya"
                  autoComplete="name"
                  value={form.values.name}
                  error={form.errors.name}
                  ref={form.registerRef("name")}
                  onChange={(e) => form.setField("name", e.target.value)}
                  onBlur={() => form.blurField("name")}
                />
                <TextField
                  id="su-email"
                  label="Email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@restaurant.com"
                  value={form.values.email}
                  error={form.errors.email}
                  ref={form.registerRef("email")}
                  onChange={(e) => form.setField("email", e.target.value)}
                  onBlur={() => form.blurField("email")}
                  hint="This is where your access link and founding pricing details will land."
                />
                {topLevelError && (
                  <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                    {topLevelError}
                  </p>
                )}
                <div className="space-y-3 pt-1">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="h-13 min-h-12 w-full bg-tangerine-deep text-base font-bold text-primary-foreground hover:bg-tangerine-deep/90 shadow-[0_10px_32px_-8px_rgba(224,96,10,0.45)]"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        Reserving your spot…
                      </>
                    ) : (
                      "Get early access"
                    )}
                  </Button>
                  <p className="flex items-start justify-center gap-2 text-center text-xs leading-relaxed text-ink-soft">
                    <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-tangerine-deep" aria-hidden="true" />
                    {HERO.trust}
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
