import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import webpush from "web-push";

webpush.setVapidDetails(
  process.env.VAPID_MAILTO!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: NextRequest) {
  const { email, subject, content } = await req.json();
  if (!email || !subject) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const { error } = await supabaseAdmin.from("contacts").insert({ email, subject, content });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Send push notification to all admin subscriptions
  const { data: subs } = await supabaseAdmin.from("push_subscriptions").select("subscription");
  if (subs?.length) {
    const payload = JSON.stringify({
      title: "New Contact Form Submission",
      body: `From: ${email} — ${subject}`,
      url: "/admin/inbox",
    });

    await Promise.allSettled(
      subs.map(({ subscription }) =>
        webpush.sendNotification(JSON.parse(subscription), payload)
      )
    );
  }

  return NextResponse.json({ ok: true });
}
