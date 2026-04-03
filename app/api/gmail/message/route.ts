import { NextRequest, NextResponse } from "next/server";
import { getMessage, extractBody, getHeader } from "@/lib/gmail";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  if (!await getSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const msg = await getMessage(id);
    const headers = msg.payload?.headers ?? [];
    return NextResponse.json({
      id,
      from: getHeader(headers, "from"),
      to: getHeader(headers, "to"),
      subject: getHeader(headers, "subject"),
      date: getHeader(headers, "date"),
      body: extractBody(msg.payload),
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Gmail error" }, { status: 500 });
  }
}
