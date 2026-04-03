"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Message = { id: string; from: string; subject: string; date: string; snippet: string; starred: boolean };

const PAGE_SIZE = 10;

export default function GmailInboxPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [starredOnly, setStarredOnly] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();

  function extractEmail(from: string) {
    const match = from.match(/<(.+?)>/);
    return match ? match[1] : from.trim();
  }

  useEffect(() => {
    fetch("/api/gmail/messages?label=INBOX")
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

  async function toggleStar(m: Message) {
    const starred = !m.starred;
    await fetch("/api/gmail/star", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: m.id, starred }),
    });
    setMessages(prev => prev.map(x => x.id === m.id ? { ...x, starred } : x));
  }

  const filtered = starredOnly ? messages.filter(m => m.starred) : messages;
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function setFilter(starred: boolean) {
    setStarredOnly(starred);
    setPage(1);
    setSelected(null);
  }

  return (
    <div className="flex gap-4 h-full">
      <div className="w-80 shrink-0 flex flex-col gap-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Gmail Inbox</h1>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-1">
          {[{ label: "All", value: false }, { label: "⭐ Starred", value: true }].map(f => (
            <button key={String(f.value)} onClick={() => setFilter(f.value)}
              className="text-xs px-3 py-1 rounded-lg transition-colors"
              style={{
                background: starredOnly === f.value ? "var(--accent)" : "var(--bg-card)",
                color: starredOnly === f.value ? "#fff" : "var(--text-muted)",
                border: `1px solid ${starredOnly === f.value ? "var(--accent)" : "var(--border)"}`,
              }}>
              {f.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
          {paged.map(m => (
            <div key={m.id} onClick={() => open(m.id)}
              className="rounded-xl border p-3 cursor-pointer shrink-0"
              style={{
                background: selected?.id === m.id ? "color-mix(in srgb, var(--accent) 10%, var(--bg-card))" : "var(--bg-card)",
                borderColor: selected?.id === m.id ? "var(--accent)" : "var(--border)",
              }}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{m.from}</p>
                <button onClick={e => { e.stopPropagation(); toggleStar(m); }} className="text-base shrink-0 ml-1">
                  {m.starred ? "⭐" : "☆"}
                </button>
              </div>
              <p className="text-xs truncate mt-0.5" style={{ color: "var(--text-muted)" }}>{m.subject}</p>
              <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-muted)" }}>{m.snippet}</p>
            </div>
          ))}
          {paged.length === 0 && (
            <p className="text-sm text-center mt-4" style={{ color: "var(--text-muted)" }}>No messages</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "var(--border)" }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="text-xs px-3 py-1 rounded-lg border disabled:opacity-40"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
              ← Prev
            </button>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>{page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="text-xs px-3 py-1 rounded-lg border disabled:opacity-40"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
              Next →
            </button>
          </div>
        )}
      </div>

      {selected && (
        <div className="flex-1 rounded-xl border p-6 flex flex-col gap-4"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold" style={{ color: "var(--text-primary)" }}>{selected.subject}</p>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>From: {selected.from}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{selected.date}</p>
            </div>
            <button
              onClick={() => router.push(`/admin/gmail/out/compose?email=${encodeURIComponent(extractEmail(selected.from))}`)}
              className="text-sm px-4 py-2 rounded-lg text-white"
              style={{ background: "var(--accent)" }}>
              Reply
            </button>
          </div>
          <div className="border-t pt-4 flex-1 overflow-auto" style={{ borderColor: "var(--border)" }}>
            <iframe srcDoc={selected.body} className="w-full h-full min-h-[400px] border-0" sandbox="allow-same-origin" />
          </div>
        </div>
      )}
    </div>
  );
}
