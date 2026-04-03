import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";
import { signToken, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { userId, password, passwordConfirm } = await req.json();

  if (!userId || !password || !passwordConfirm)
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  if (password !== passwordConfirm)
    return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
  if (userId !== "GeorgeLXL")
    return NextResponse.json({ error: "Unauthorized user ID" }, { status: 403 });

  const { data: existing } = await supabaseAdmin.from("admin_users").select("id").limit(1);
  if (existing && existing.length > 0)
    return NextResponse.json({ error: "Admin already exists" }, { status: 403 });

  const hash = await bcrypt.hash(password, 12);
  const { error } = await supabaseAdmin.from("admin_users").insert({ user_id: userId, password_hash: hash });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const token = await signToken({ userId });
  await setSessionCookie(token);
  return NextResponse.json({ ok: true });
}
