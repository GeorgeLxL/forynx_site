"use client";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

type ChartPoint = { date: string; sent: number; received: number; gmail: number };

export default function AdminDashboard() {
  const [range, setRange] = useState<"week" | "month">("week");
  const [data, setData] = useState<ChartPoint[]>([]);
  const [todaySent, setTodaySent] = useState(0);
  const [todayReceived, setTodayReceived] = useState(0);
  const [todayGmailInbox, setTodayGmailInbox] = useState(0);

  useEffect(() => {
    fetch(`/api/admin/stats?range=${range}`)
      .then(r => r.json())
      .then(d => {
        setData(d.chart ?? []);
        setTodaySent(d.todaySent ?? 0);
        setTodayReceived(d.todayReceived ?? 0);
        setTodayGmailInbox(d.todayGmailInbox ?? 0);
      });
  }, [range]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 max-w-2xl">
        {[
          { label: "Emails Sent Today", value: todaySent },
          { label: "Contacts Received Today", value: todayReceived },
          { label: "Gmail Inbox", value: todayGmailInbox },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-4 border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{s.label}</p>
            <p className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border p-5" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Activity</p>
          <div className="flex gap-2">
            {(["week", "month"] as const).map(r => (
              <button key={r} onClick={() => setRange(r)}
                className="text-xs px-3 py-1 rounded-lg transition-colors"
                style={{
                  background: range === r ? "var(--accent)" : "var(--bg-base)",
                  color: range === r ? "#fff" : "var(--text-muted)",
                }}>
                {r === "week" ? "7 days" : "30 days"}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data}>
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
            <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sent" stroke="var(--accent)" strokeWidth={2} dot={false} name="Sent" />
            <Line type="monotone" dataKey="received" stroke="#10b981" strokeWidth={2} dot={false} name="Contact Form" />
            <Line type="monotone" dataKey="gmail" stroke="#f59e0b" strokeWidth={2} dot={false} name="Gmail Inbox" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
