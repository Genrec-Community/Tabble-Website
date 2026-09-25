import { Resend } from "resend";

/**
 * Server-only email helper (Resend).
 *
 * Env (.env.local):
 *   RESEND_API_KEY  — from the Resend dashboard
 *   CONTACT_EMAIL   — where form notifications land (default contact@tabble.in)
 *   EMAIL_FROM      — sender identity. Until tabble.in is DNS-verified inside
 *                     Resend, only onboarding@resend.dev may be used; after
 *                     verifying the domain switch it to "Tabble <hello@tabble.in>".
 *
 * Every send is best-effort: failures are logged and returned, never thrown —
 * the database remains the source of truth for submissions.
 */

let client: Resend | null = null;

function getClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY is not set — skipping email send");
    return null;
  }
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "contact@tabble.in";

const EMAIL_FROM = process.env.EMAIL_FROM || "Tabble <onboarding@resend.dev>";

export type SendResult = { ok: boolean; error?: string };

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendResult> {
  const resend = getClient();
  if (!resend) return { ok: false, error: "not-configured" };
  try {
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    if (error) {
      console.error("[email] Resend rejected the send:", error);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] Unexpected failure:", err);
    return { ok: false, error: String(err) };
  }
}

/* ─── Branded HTML shells ──────────────────────────────────────── */

const INK = "#2b1a10";
const SOFT = "#6b5644";
const CREAM = "#fffbf6";
const SAND = "#f3e6d3";
const TANGERINE = "#e0600a";

function escapeHtml(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(title: string, intro: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f6ede0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6ede0;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${CREAM};border-radius:20px;overflow:hidden;border:1px solid ${SAND};">
            <tr>
              <td style="padding:28px 32px 20px;">
                <p style="margin:0;font-size:20px;font-weight:700;color:${INK};">Tabble<span style="color:${TANGERINE};">.</span></p>
                <p style="margin:6px 0 0;font-size:12px;color:${SOFT};">Every table becomes your best waiter.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px;">
                <h1 style="margin:0 0 10px;font-size:19px;line-height:1.3;color:${INK};">${escapeHtml(title)}</h1>
                <p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:${SOFT};">${escapeHtml(intro)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 28px;">${bodyHtml}</td>
            </tr>
            <tr>
              <td style="padding:16px 32px;background:${SAND};">
                <p style="margin:0;font-size:11px;color:${SOFT};">Sent from tabble.in · reply directly to reach the sender.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function field(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;vertical-align:top;width:132px;font-size:12px;font-weight:700;color:${SOFT};text-transform:uppercase;letter-spacing:0.04em;">${escapeHtml(label)}</td>
    <td style="padding:8px 0;font-size:14px;line-height:1.55;color:${INK};">${escapeHtml(value)}</td>
  </tr>`;
}

function card(inner: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid ${SAND};border-radius:14px;padding:16px 20px;">
    ${inner}
  </table>`;
}

/* ─── Templates ─────────────────────────────────────────────────── */

export function contactNotificationHtml({
  name,
  email,
  topic,
  message,
}: {
  name: string;
  email: string;
  topic: string;
  message: string;
}): string {
  const rows =
    field("Name", name) +
    field("Email", email) +
    field("Topic", topic) +
    field("Message", message);
  return shell(
    "New contact message",
    "Someone reached out through the contact form on tabble.in.",
    card(rows)
  );
}

export function waitlistNotificationHtml({
  source,
  name,
  email,
  restaurantName,
  phone,
  city,
  outlets,
  position,
}: {
  source: "signup" | "request";
  name: string | null;
  email: string;
  restaurantName: string | null;
  phone: string | null;
  city: string | null;
  outlets: string | null;
  position: number;
}): string {
  const kind =
    source === "request" ? "founding-cohort request" : "sign-up (waitlist)";
  const rows =
    field("Type", kind) +
    field("Position", `#${position}`) +
    field("Name", name || "—") +
    field("Email", email) +
    field("Restaurant", restaurantName || "—") +
    field("Phone", phone || "—") +
    field("City", city || "—") +
    field("Outlets", outlets || "—");
  return shell(
    `New ${kind} — spot #${position}`,
    "A restaurant just joined the list on tabble.in.",
    card(rows)
  );
}
