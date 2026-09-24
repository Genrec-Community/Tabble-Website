# Worklog

---
Task ID: 1
Agent: main (Super Z)
Task: Build the Tabble multi-page landing site (QR dine-in ordering + restaurant SaaS) — warm food-brand design, tangerine accent, sign-up + request-access flows, mobile-optimized, stock imagery, best-in-class animations.

Work Log:
- Clarified requirements via AskUserQuestion (PDF/SKILL.md uploads never reached the server; upload/ was empty). Locked: Restaurant SaaS + QR dine-in ordering product, audience = restaurant owners, warm food-brand style, tangerine accent, pages = core marketing + how-it-works + FAQ + terms/privacy + signup + request access, INR pricing, waitlist + success states.
- Loaded fullstack-dev skill, initialized environment (Next.js 16 + Turbopack, Tailwind 4, shadcn/ui, framer-motion 12, Prisma/SQLite).
- Loaded design skill system (SKILL.md, landing-page.md, quality-gate.md, animation-discipline.md, form-validation.md, laws-of-ux.md, link-and-proof.md, cafe style reference). Applied: Structure A narrative scroll, asymmetric hero, visual weight tiers, one-audience-one-CTA, honest proof (no fake logos/testimonials/metrics — founding-cohort framing instead), reduced-motion-safe choreographed entrance, blur-then-input validation timing, 3-tier pricing with objection ladder.
- Prisma schema: WaitlistEntry (signup + request sources, position tracking, dedup by email+source), ContactMessage. db pushed. API routes /api/waitlist + /api/contact with server-authoritative validation returning field errors (never throwing), adaptive error messages.
- Design system: Fraunces (display) + Plus Jakarta Sans (body) via next/font; warm palette (cream #FFFBF6, espresso #221107, tangerine #F97316/#E0600A, ember, sand, leaf) in globals.css @theme; rise-in entrance keyframes; reduced-motion overrides.
- Architecture: hash-based router (11 routes on the single `/` Next.js route per sandbox constraint) with per-route document titles, AnimatePresence page transitions, sticky footer, skip-link, mobile Sheet nav.
- Hero centerpiece: animated phone demo (menu → cart → order-confirmed cycle, real dish thumbnails, veg dots, spice icons) + floating table-tent QR card / live-order / payment chips. Kitchen display mock with cycling live orders. Insights bar chart labeled "Sample data".
- Pages: Home (hero, problem, how-it-works, KDS proof, tiered features, dark founding cohort, FAQ teaser, final CTA), Features (guests/kitchen/owner three-view), How it works (4 steps + setup timeline), Pricing (monthly/yearly toggle, ₹ savings, comparison table, money FAQs), About, Contact (working form), FAQ, Terms, Privacy, Signup, Request access.
- Stock imagery: 9 searches via z-ai image-search (the `-o` flag is broken in this CLI build — captured stdout instead). Every candidate vision-verified (rejected 1 instructional graphic, 1 watermarked, swapped 1). 10 images live on OSS CDN, lazy-loaded.
- Browser verification via agent-browser: all 11 routes render (titles + H1s), golden-path request-access form (empty submit → 3 adaptive errors + focus first invalid; bad email → specific message; valid → confetti success + spot #1 + DB row; duplicate email → "already on the list" + original position), contact form → DB, signup → spot #1, pricing yearly toggle (₹14,990 + saves ₹2,998), mobile menu sheet, image loading on all pages.
- Fixed: duplicate React keys in KDS rotation (uid counter); stale Turbopack CSS cache (old globals.css served — custom palette missing, CTA button transparent). Server restart with clean cache fixed it; root cause was the killable dev server. Built double-fork daemonizer (scripts/daemon_dev.py) so the dev server survives tool-session boundaries; bumped KDS meta text contrast cream/40 → cream/60 per vision review.
- Vision design reviews: desktop hero 8/10 wow (clean, premium), KDS section 8/10, founding section 9/10, mobile hero verified unclipped on scroll.

Stage Summary:
- Deliverable: complete multi-page Tabble landing site, live at the preview panel (port 3000, single `/` route with 11 hash routes: #/, #/features, #/how-it-works, #/pricing, #/about, #/contact, #/faq, #/terms, #/privacy, #/signup, #/request-access).
- Forms persist to SQLite (waitlist dedup + position counting; contact messages). Success states include one-shot confetti (reduced-motion safe).
- Honest-content decisions: no fabricated logos/testimonials/traction stats; founding-cohort offer framing; insights chart labeled "Sample data"; legal pages marked as review-before-publish templates.
- Placeholders the owner should replace: hello@tabble.app email, About page story details, legal entity review, dish thumbnails with their own menu photos.
- Key files: src/app/page.tsx (site shell), src/lib/site/{router,content,form,images}.ts, src/components/site/* (navbar, footer, phone-demo, kds-mock, confetti, reveal, form-fields, ui-bits), src/components/site/pages/* (11 pages), src/app/api/{waitlist,contact}/route.ts, prisma/schema.prisma.
- Dev server note: if the sandbox restarts it, run `python3 /home/z/my-project/scripts/daemon_dev.py` to bring it back detached.
