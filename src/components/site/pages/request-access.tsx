"use client";

import React, { useState } from "react";
import { FOUNDING, OUTLET_OPTIONS, CURRENT_SETUP_OPTIONS } from "@/lib/site/content";
import { useForm, validateEmail, validateRequired, validatePhone } from "@/lib/site/form";
import { Reveal } from "../reveal";
import { TextField, SelectField } from "../form-fields";
import { Confetti } from "../confetti";
import { Button } from "@/components/ui/button";
import { Check, Loader2, PhoneCall, UtensilsCrossed, Rocket, PartyPopper } from "lucide-react";

const NEXT_STEPS = [
  {
    icon: PhoneCall,
    title: "Onboarding call",
    body: "We schedule a 30-minute call to map your menu and floor setup.",
  },
  {
    icon: UtensilsCrossed,
    title: "Menu setup, on us",
    body: "We build your Tabble menu; you review a live preview and approve.",
  },
  {
    icon: Rocket,
    title: "Go live",
    body: "QR table tents go out, the kitchen display goes on, service begins.",
  },
];

export function RequestAccessPage() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ position: number; already: boolean } | null>(null);
  const [topLevelError, setTopLevelError] = useState<string | null>(null);

  const form = useForm(
    {
      name: "",
      restaurantName: "",
      email: "",
      phone: "",
      city: "",
      outlets: "1 outlet",
      currentSetup: CURRENT_SETUP_OPTIONS[0],
    },
    {
      name: (v) => validateRequired("Your name", v),
      restaurantName: (v) =>
        validateRequired("Restaurant name", v) ??
        (v.length > 120 ? "Restaurant name is too long — please shorten it." : undefined),
      email: validateEmail,
      phone: validatePhone,
      city: (v) => (v.length > 60 ? "City name is too long." : undefined),
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
        body: JSON.stringify({
          name: form.values.name,
          restaurantName: form.values.restaurantName,
          email: form.values.email,
          phone: form.values.phone,
          city: form.values.city,
          outlets: form.values.outlets,
          currentSetup: form.values.currentSetup,
          source: "request",
        }),
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
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:px-8">
        {/* left — what happens next */}
        <div className="lg:sticky lg:top-28 lg:pt-6">
          <Reveal>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-tangerine-deep">
              <Check className="h-4 w-4" aria-hidden="true" />
              Founding cohort
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink text-balance sm:text-5xl">
              Request early access for your restaurant.
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
              Two minutes of your time, and we'll bring your restaurant into
              the founding cohort — with everything set up for you.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ol className="mt-9 space-y-6">
              {NEXT_STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <li key={s.title} className="relative flex gap-4">
                    {i < NEXT_STEPS.length - 1 && (
                      <span
                        className="absolute left-6 top-14 h-[calc(100%-1.5rem)] w-px bg-border"
                        aria-hidden="true"
                      />
                    )}
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-tangerine-soft text-ember">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="pt-1">
                      <p className="font-display text-lg font-semibold text-ink">
                        {s.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="mt-9 rounded-2xl border border-tangerine/30 bg-tangerine-soft/60 p-5">
              <p className="font-display text-lg font-semibold text-ember">
                {FOUNDING.perks[0].title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                {FOUNDING.perks[0].body}
              </p>
            </div>
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
                  {result.already
                    ? "This email is already on the list!"
                    : "Request received. Welcome aboard!"}
                </h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-tangerine-deep">
                  Founding cohort · spot #{result.position}
                </p>
                <p className="mx-auto mt-4 max-w-sm leading-relaxed text-ink-soft">
                  {result.already
                    ? "A request with this email already exists — we'll be in touch using the details we have. Need to update anything? Reply to our email or use the contact page."
                    : "We'll email you shortly to schedule your onboarding call. From there: menu setup on us, QR codes to your tables, founding pricing locked."}
                </p>
                <ul className="mx-auto mt-6 max-w-xs space-y-2.5 text-left">
                  {[
                    "Watch your inbox for the onboarding email",
                    "Your founding pricing is locked when you activate",
                    "Setup is done by us — you just approve",
                  ].map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm text-ink">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-tangerine-deep"
                        aria-hidden="true"
                      />
                      {s}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-8 h-12 w-full bg-tangerine-deep text-base font-bold text-primary-foreground hover:bg-tangerine-deep/90"
                  onClick={() => {
                    setResult(null);
                    form.setErrors({});
                  }}
                >
                  Request for another restaurant
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="relative space-y-5">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    Tell us about your restaurant
                  </h2>
                  <p className="mt-1.5 text-sm text-ink-soft">
                    The more we know, the better your onboarding call.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField
                    id="ra-name"
                    label="Your name"
                    placeholder="e.g. Shyam"
                    autoComplete="name"
                    value={form.values.name}
                    error={form.errors.name}
                    ref={form.registerRef("name")}
                    onChange={(e) => form.setField("name", e.target.value)}
                    onBlur={() => form.blurField("name")}
                  />
                  <TextField
                    id="ra-restaurant"
                    label="Restaurant name"
                    placeholder="e.g. Spice Route Kitchen"
                    autoComplete="organization"
                    value={form.values.restaurantName}
                    error={form.errors.restaurantName}
                    ref={form.registerRef("restaurantName")}
                    onChange={(e) => form.setField("restaurantName", e.target.value)}
                    onBlur={() => form.blurField("restaurantName")}
                  />
                </div>

                <TextField
                  id="ra-email"
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
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField
                    id="ra-phone"
                    label="Phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    optional
                    placeholder="+91 98XXX XXXXX"
                    value={form.values.phone}
                    error={form.errors.phone}
                    ref={form.registerRef("phone")}
                    onChange={(e) => form.setField("phone", e.target.value)}
                    onBlur={() => form.blurField("phone")}
                  />
                  <TextField
                    id="ra-city"
                    label="City"
                    optional
                    placeholder="e.g. Bengaluru"
                    autoComplete="address-level2"
                    value={form.values.city}
                    error={form.errors.city}
                    ref={form.registerRef("city")}
                    onChange={(e) => form.setField("city", e.target.value)}
                    onBlur={() => form.blurField("city")}
                  />
                </div>

                <SelectField
                  id="ra-outlets"
                  label="How many outlets?"
                  options={OUTLET_OPTIONS}
                  value={form.values.outlets}
                  onValueChange={(v) => form.setField("outlets", v)}
                  placeholder="Select outlets"
                />

                <SelectField
                  id="ra-setup"
                  label="How do you take orders today?"
                  options={CURRENT_SETUP_OPTIONS}
                  value={form.values.currentSetup}
                  onValueChange={(v) => form.setField("currentSetup", v)}
                  placeholder="Select your current setup"
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
                        Sending your request…
                      </>
                    ) : (
                      "Request early access"
                    )}
                  </Button>
                  <p className="text-center text-xs leading-relaxed text-ink-soft">
                    No fees to request. No obligation to continue. Your details
                    stay with us — see our{" "}
                    <a
                      href="#/privacy"
                      className="font-semibold text-tangerine-deep underline-offset-2 hover:underline"
                    >
                      privacy policy
                    </a>
                    .
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
