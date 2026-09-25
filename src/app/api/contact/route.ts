import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  sendEmail,
  CONTACT_EMAIL,
  contactNotificationHtml,
} from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "We couldn't read that request. Please try again." },
      { status: 400 }
    );
  }

  const errors: Record<string, string> = {};
  const name = str(body.name);
  const email = str(body.email).toLowerCase();
  const topic = str(body.topic) || "general";
  const message = str(body.message);

  if (!name) errors.name = "Please tell us your name so we know who we're replying to.";
  if (name.length > 80) errors.name = "Name is too long — please shorten it.";

  if (!email) errors.email = "Email is required so we can reply to you.";
  else if (!EMAIL_RE.test(email))
    errors.email = "That doesn't look like a complete email — e.g. you@restaurant.com.";

  if (!message) errors.message = "A short message helps us route your question to the right person.";
  else if (message.length < 10)
    errors.message = "Could you add a little more detail? At least a sentence helps.";
  else if (message.length > 4000) errors.message = "Message is too long — please keep it under 4,000 characters.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    await db.contactMessage.create({
      data: { name, email, topic, message },
    });

    // Best-effort inbox notification — the DB row is the source of truth,
    // so a Resend failure never fails the submit.
    const result = await sendEmail({
      to: CONTACT_EMAIL,
      subject: `Contact form — ${topic} — ${name}`,
      html: contactNotificationHtml({ name, email, topic, message }),
      replyTo: email,
    });

    return NextResponse.json({ ok: true, emailSent: result.ok });
  } catch (err) {
    console.error("contact error", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong on our side. Please try again in a moment." },
      { status: 500 }
    );
  }
}
