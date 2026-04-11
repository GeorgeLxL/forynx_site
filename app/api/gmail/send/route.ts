import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/gmail";
import { supabaseAdmin } from "@/lib/supabase";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!await getSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { to, subject, html, templateId } = await req.json();
  if (!to || !subject) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  let body = html;
  if (!body && templateId) {
    const { data } = await supabaseAdmin.from("templates").select("content").eq("id", templateId).single();
    body = data?.content ?? "";
  }

  try {
    await sendEmail({ to, subject, html: body });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Failed to send email" }, { status: 500 });
  }
}
