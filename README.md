# Tabble — Website

Marketing website for [Tabble](https://tabble.in) — a QR code ordering and kitchen display system for restaurants.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Prisma](https://www.prisma.io/) + SQLite (local) / PostgreSQL (production)
- **Email**: [Resend](https://resend.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Push the database schema
npm run db:push

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

Create a `.env.local` file with:

```env
# Database
DATABASE_URL="file:./db/local.db"

# Email (Resend)
RESEND_API_KEY=re_...
CONTACT_EMAIL=contact@tabble.in
EMAIL_FROM="Tabble <hello@tabble.in>"
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, problem, steps, features, founding cohort |
| `/features` | Full features breakdown |
| `/how-it-works` | Step-by-step walkthrough |
| `/about` | About Tabble |
| `/faq` | Frequently asked questions |
| `/pricing` | Pricing information |
| `/signup` | Waitlist sign-up form |
| `/request-access` | Founding cohort access form |
| `/contact` | Contact form |
| `/terms` | Terms of service |
| `/privacy` | Privacy policy |

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/waitlist` | POST | Waitlist & founding cohort sign-up |
| `/api/contact` | POST | Contact form submission |

## Deployment

This site is deployed on Vercel. Every push to `main` triggers a production deployment.

**Required Vercel environment variables:**
- `DATABASE_URL` — Turso or PostgreSQL connection string
- `RESEND_API_KEY` — Resend API key for email notifications
- `CONTACT_EMAIL` — Inbox for form submissions
- `EMAIL_FROM` — Verified sender identity

---

© 2026 Tabble · [tabble.in](https://tabble.in)
