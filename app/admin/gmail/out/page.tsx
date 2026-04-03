"use client";
import { useEffect, useState } from "react";

type Message = { id: string; to: string; subject: string; date: string; snippet: string };

export default function GmailOutboxPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    fetch("/api/gmail/messages?label=SENT")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setMessages(d); })
      .catch(() => {});
  }, []);

  async function open(id: string) {
    try {
      const data = await fetch(`/api/gmail/message?id=${id}`).then(r => r.json());
      if (!data.error) setSelected(data);
    } catch {}
  }

  return (
    <div className="flex gap-4 h-full">
      <div className="w-80 shrink-0 flex flex-col gap-2">
        <h1 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>Gmail Outbox</h1>
        {messages.map(m => (
          <div key={m.id} onClick={() => open(m.id)}
            className="rounded-xl border p-3 cursor-pointer"
            style={{
              background: selected?.id === m.id ? "color-mix(in srgb, var(--accent) 10%, var(--bg-card))" : "var(--bg-card)",
              borderColor: selected?.id === m.id ? "var(--accent)" : "var(--border)",
            }}>
            <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{m.to}</p>
            <p className="text-xs truncate mt-0.5" style={{ color: "var(--text-muted)" }}>{m.subject}</p>
            <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-muted)" }}>{m.snippet}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="flex-1 rounded-xl border p-6 flex flex-col gap-4"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
          <p className="font-semibold" style={{ color: "var(--text-primary)" }}>{selected.subject}</p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>To: {selected.to}</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>{selected.date}</p>
          <div className="border-t pt-4 flex-1 overflow-auto" style={{ borderColor: "var(--border)" }}>
            <iframe srcDoc={selected.body} className="w-full h-full min-h-[400px] border-0" sandbox="allow-same-origin" />
          </div>
        </div>
      )}
    </div>
  );
}
