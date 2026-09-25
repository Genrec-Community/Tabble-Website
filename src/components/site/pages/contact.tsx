"use client";

import React, { useState } from "react";
import { BRAND, CONTACT_TOPICS } from "@/lib/site/content";
import { RouteLink } from "@/lib/site/router";
import { useForm, validateEmail, validateRequired } from "@/lib/site/form";
import { Reveal } from "../reveal";
import { Breadcrumbs } from "../breadcrumbs";
import { Section, Kicker } from "../ui-bits";
import { TextField, TextAreaField, SelectField } from "../form-fields";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Mail, MessageCircle, ArrowRight } from "lucide-react";

export function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [topLevelError, setTopLevelError] = useState<string | null>(null);

  const form = useForm(
    { name: "", email: "", topic: "General question", message: "" },
    {
      name: (v) => validateRequired("Your name", v),
      email: validateEmail,
      message: (v) => {
        if (!v.trim())
          return "A short message helps us route your question to the right person.";
        if (v.trim().length < 10)
          return "Could you add a little more detail? At least a sentence helps.";
        if (v.length > 4000) return "Message is too long — please keep it under 4,000 characters.";
        return undefined;
      },
    }
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTopLevelError(null);
    if (!form.validateAll()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.values),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setSent(true);
      } else if (data.errors) {
        form.setServerError(data.errors);
      } else {
        setTopLevelError(
          data.message ?? "Something went wrong. Please try again in a moment."
        );
      }
    } catch {
      setTopLevelError(
        "We couldn't reach the server. Check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-cream warm-glow pt-28 sm:pt-36">
        <div className="mx-auto max-w-3xl px-4 pb-12 text-center sm:px-6 sm:pb-16">
          <div className="rise rise-1 flex justify-center">
            <Breadcrumbs trail={["Contact"]} />
          </div>
          <p className="rise rise-1 mt-5">
            <Kicker>Contact</Kicker>
          </p>
          <h1 className="rise rise-2 mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink text-balance sm:text-5xl">
            Talk to a human, not a queue.
          </h1>
          <p className="rise rise-3 mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
            Questions about getting started, payments, or the founding cohort —
            messages land directly with the team building Tabble.
          </p>
        </div>
      </section>

      <Section tone="white" id="contact-form">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            {sent ? (
              <div
                className="rounded-3xl border border-leaf/30 bg-leaf/5 p-8 text-center sm:p-12"
                role="status"
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-leaf/15 text-leaf">
                  <Check className="h-8 w-8" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  Message sent. Thank you!
                </h2>
                <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-soft">
                  We read everything personally and typically reply within one
                  working day. If it's urgent, mention it in a follow-up and
                  we'll bump it up the queue.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button
                    asChild
                    className="h-12 bg-tangerine-deep px-7 font-bold text-primary-foreground hover:bg-tangerine-deep/90"
                  >
                    <RouteLink route="request-access">
                      Request early access
                      <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                    </RouteLink>
                  </Button>
                  <Button
                    variant="ghost"
                    className="min-h-12 px-6 font-semibold text-ink hover:bg-sand/60"
                    onClick={() => {
                      setSent(false);
                      form.setErrors({});
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              </div>
            ) : (
              <Reveal>
                <form
                  onSubmit={onSubmit}
                  noValidate
                  className="space-y-5 rounded-3xl border border-border bg-cream p-6 sm:p-8"
                >
                  <TextField
                    id="name"
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
                    id="email"
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
                  <SelectField
                    id="topic"
                    label="What's this about?"
                    options={CONTACT_TOPICS}
                    value={form.values.topic}
                    onValueChange={(v) => form.setField("topic", v)}
                    placeholder="Choose a topic"
                  />
                  <TextAreaField
                    id="message"
                    label="Message"
                    placeholder="Tell us about your restaurant, your question, or both…"
                    value={form.values.message}
                    error={form.errors.message}
                    ref={form.registerRef("message")}
                    onChange={(e) => form.setField("message", e.target.value)}
                    onBlur={() => form.blurField("message")}
                  />

                  {topLevelError && (
                    <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                      {topLevelError}
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-4 pt-1">
                    <p aria-live="polite" className="text-xs text-ink-soft">
                      {submitting ? "Sending your message…" : ""}
                    </p>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="h-12 bg-tangerine-deep px-8 text-base font-bold text-primary-foreground hover:bg-tangerine-deep/90"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                          Sending
                        </>
                      ) : (
                        "Send message"
                      )}
                    </Button>
                  </div>
                </form>
              </Reveal>
            )}
          </div>

          <div className="space-y-5">
            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-border bg-cream p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-tangerine-soft text-ember">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-semibold text-ink">Prefer email?</h2>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="mt-1.5 inline-flex min-h-11 items-center font-semibold text-tangerine-deep underline-offset-4 hover:underline"
                >
                  {BRAND.email}
                </a>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Same people, same speed. Email works if forms aren't your thing.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="rounded-2xl border border-border bg-cream p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-tangerine-soft text-ember">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-semibold text-ink">
                  Restaurant owner?
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  Skip the line — the request-access form puts you straight on
                  the founding cohort list, with onboarding details in your
                  first reply.
                </p>
                <Button
                  asChild
                  variant="ghost"
                  className="mt-3 min-h-11 px-4 text-sm font-bold text-tangerine-deep hover:bg-tangerine-soft"
                >
                  <RouteLink route="request-access">
                    Request access instead
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </RouteLink>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
