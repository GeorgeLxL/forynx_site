import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";
import { signToken, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { userId, password } = await req.json();
  if (!userId || !password)
    return NextResponse.json({ error: "All fields required" }, { status: 400 });

  const { data } = await supabaseAdmin
    .from("admin_users")
    .select("user_id, password_hash")
    .eq("user_id", userId)
    .single();

  if (!data) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const valid = await bcrypt.compare(password, data.password_hash);
  if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = await signToken({ userId });
  await setSessionCookie(token);
  return NextResponse.json({ ok: true });
}
