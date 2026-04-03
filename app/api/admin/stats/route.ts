import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAccessToken } from "@/lib/gmail";
import { getSession } from "@/lib/auth";

type ChartPoint = { date: string; sent: number; received: number; gmail: number };

async function getMessagesByDay(accessToken: string, label: string, range: number): Promise<Record<string, number>> {
  const counts: Record<string, number> = {};
  try {
    const after = Math.floor((Date.now() - range * 86400000) / 1000);
    const res = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?labelIds=${label}&q=after:${after}&maxResults=500`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const data = await res.json();
    const ids: { id: string }[] = data.messages ?? [];

    await Promise.all(ids.map(async ({ id }) => {
      const r = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=metadata&metadataHeaders=Date`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const msg = await r.json();
      const day = new Date(Number(msg.internalDate)).toISOString().split("T")[0];
      counts[day] = (counts[day] ?? 0) + 1;
    }));
  } catch {}
  return counts;
}

export async function GET(req: NextRequest) {
  if (!await getSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const range = req.nextUrl.searchParams.get("range") === "month" ? 30 : 7;
  const today = new Date().toISOString().split("T")[0];
  const from = new Date(Date.now() - range * 86400000).toISOString();

  const { data: contacts } = await supabaseAdmin
    .from("contacts")
    .select("created_at")
    .gte("created_at", from);

  const todayReceived = contacts?.filter(c => c.created_at.startsWith(today)).length ?? 0;

  let gmailByDay: Record<string, number> = {};
  let sentByDay: Record<string, number> = {};

  try {
    const accessToken = await getAccessToken();
    [gmailByDay, sentByDay] = await Promise.all([
      getMessagesByDay(accessToken, "INBOX", range),
      getMessagesByDay(accessToken, "SENT", range),
    ]);
  } catch {}

  const chart: ChartPoint[] = [];
  for (let i = range - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000).toISOString().split("T")[0];
    chart.push({
      date: d.slice(5),
      received: contacts?.filter(c => c.created_at.startsWith(d)).length ?? 0,
      gmail: gmailByDay[d] ?? 0,
      sent: sentByDay[d] ?? 0,
    });
  }

  return NextResponse.json({
    todaySent: sentByDay[today] ?? 0,
    todayReceived,
    todayGmailInbox: gmailByDay[today] ?? 0,
    chart,
  });
}
