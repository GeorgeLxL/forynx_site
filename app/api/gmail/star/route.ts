import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@/lib/gmail";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!await getSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, starred } = await req.json();
  const accessToken = await getAccessToken();

  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}/modify`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify(
      starred
        ? { addLabelIds: ["STARRED"] }
        : { removeLabelIds: ["STARRED"] }
    ),
  });

  if (!res.ok) return NextResponse.json({ error: await res.text() }, { status: 500 });
  return NextResponse.json({ ok: true });
}
