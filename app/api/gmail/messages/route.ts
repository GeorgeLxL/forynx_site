import { NextRequest, NextResponse } from "next/server";
import { listMessages, getMessage, getHeader } from "@/lib/gmail";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  if (!await getSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = req.nextUrl;
  const label = searchParams.get("label") ?? "INBOX";

  try {
    const messages = await listMessages([label]);
    if (!messages.length) return NextResponse.json([]);

    return NextResponse.json(messages.map((msg: any) => {
      const headers = msg.payload?.headers ?? [];
      return {
        id: msg.id,
        from: getHeader(headers, "from"),
        to: getHeader(headers, "to"),
        subject: getHeader(headers, "subject"),
        date: getHeader(headers, "date"),
        snippet: msg.snippet ?? "",
        starred: (msg.labelIds ?? []).includes("STARRED"),
      };
    }));
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Gmail error" }, { status: 500 });
  }
}
