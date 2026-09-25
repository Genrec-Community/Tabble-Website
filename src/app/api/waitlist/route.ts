import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  sendEmail,
  CONTACT_EMAIL,
  waitlistNotificationHtml,
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
  const email = str(body.email).toLowerCase();
  const source = str(body.source) === "request" ? "request" : "signup";
  const name = str(body.name);
  const restaurantName = str(body.restaurantName);
  const phone = str(body.phone);
  const city = str(body.city);
  const outlets = str(body.outlets);
  const plan = str(body.plan);

  if (!email) errors.email = "Email is required — this is where we send your access link.";
  else if (!EMAIL_RE.test(email))
    errors.email = "That doesn't look like a complete email — e.g. you@restaurant.com.";

  if (source === "request") {
    if (!name) errors.name = "Your name helps us address you properly on the onboarding call.";
    if (!restaurantName)
      errors.restaurantName = "Restaurant name is required — we set up your menu against it.";
    if (name.length > 80) errors.name = "Name is too long — please shorten it.";
    if (restaurantName.length > 120)
      errors.restaurantName = "Restaurant name is too long — please shorten it.";
    if (phone) {
      const digits = phone.replace(/\d/g, "");
      const digitCount = phone.replace(/\D/g, "").length;
      if (digitCount < 10)
        errors.phone = "Phone number needs at least 10 digits — include the country code if outside India.";
      else if (digitCount > 13) errors.phone = "That's more than 13 digits — please double-check the number.";
      if (digits.length > 0 && /[^+\-\s()]/.test(digits))
        errors.phone = "Phone can only contain digits, spaces, and + ( ) - characters.";
    }
  } else {
    if (name.length > 80) errors.name = "Name is too long — please shorten it.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    const existing = await db.waitlistEntry.findFirst({
      where: { email, source },
      orderBy: { createdAt: "asc" },
    });

    if (existing) {
      const position = await db.waitlistEntry.count({
        where: { source, createdAt: { lte: existing.createdAt } },
      });
      return NextResponse.json({
        ok: true,
        position,
        alreadyRegistered: true,
        message: "You're already on the list — here's your spot.",
      });
    }

    const entry = await db.waitlistEntry.create({
      data: {
        email,
        name: name || null,
        source,
        restaurantName: restaurantName || null,
        phone: phone || null,
        city: city || null,
        outlets: outlets || null,
        plan: plan || null,
      },
    });

    const position = await db.waitlistEntry.count({
      where: { source, createdAt: { lte: entry.createdAt } },
    });

    // Best-effort inbox notification — the DB row is the source of truth,
    // so a Resend failure never fails the submit.
    const result = await sendEmail({
      to: CONTACT_EMAIL,
      subject:
        source === "request"
          ? `Founding cohort request #${position} — ${restaurantName || email}`
          : `New sign-up #${position} — ${email}`,
      html: waitlistNotificationHtml({
        source,
        name: name || null,
        email,
        restaurantName: restaurantName || null,
        phone: phone || null,
        city: city || null,
        outlets: outlets || null,
        position,
      }),
      replyTo: email,
    });

    return NextResponse.json({
      ok: true,
      position,
      alreadyRegistered: false,
      emailSent: result.ok,
    });
  } catch (err) {
    console.error("waitlist error", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong on our side. Please try again in a moment." },
      { status: 500 }
    );
  }
}
