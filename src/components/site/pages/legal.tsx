"use client";

import React from "react";
import { LEGAL } from "@/lib/site/content";
import { Reveal } from "../reveal";
import { Section } from "../ui-bits";

export function LegalPage({ kind }: { kind: "terms" | "privacy" }) {
  const doc = LEGAL[kind];
  return (
    <>
      <section className="bg-cream pt-28 sm:pt-36">
        <div className="mx-auto max-w-3xl px-4 pb-8 sm:px-6">
          <p className="rise rise-1 text-xs font-bold uppercase tracking-[0.14em] text-tangerine-deep">
            Legal
          </p>
          <h1 className="rise rise-2 mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {doc.title}
          </h1>
          <p className="rise rise-3 mt-3 text-sm text-ink-soft">{doc.updated}</p>
        </div>
      </section>
      <Section tone="white" className="pt-10">
        <div className="mx-auto max-w-3xl space-y-8">
          {doc.sections.map((s, i) => (
            <Reveal key={s.h} delay={Math.min(i * 0.04, 0.2)}>
              <article>
                <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                  {s.h}
                </h2>
                <p className="mt-3 leading-relaxed text-ink-soft">{s.p}</p>
              </article>
            </Reveal>
          ))}
          <p className="rounded-2xl border border-border bg-cream p-5 text-sm leading-relaxed text-ink-soft">
            This document is a starting template provided with the Tabble site
            scaffold. Have it reviewed against your business entity and local
            regulations before publishing.
          </p>
        </div>
      </Section>
    </>
  );
}
