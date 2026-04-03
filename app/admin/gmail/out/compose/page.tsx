"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Template = { id: string; subject: string; content: string };

function ComposeForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [to, setTo] = useState(searchParams.get("email") ?? "");
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/templates").then(r => r.json()).then(setTemplates);
  }, []);

  function applyTemplate(id: string) {
    const t = templates.find(t => t.id === id);
    if (t) { setSubject(t.subject); setHtml(t.content); }
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Sending...");
    const res = await fetch("/api/gmail/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, html }),
    });
    if (res.ok) { setStatus("Sent!"); setTimeout(() => router.push("/admin/gmail/out"), 1500); }
    else setStatus("Failed to send.");
  }

  return (
    <form onSubmit={send} className="flex flex-col gap-4 max-w-2xl">
      <h1 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Compose Email</h1>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Template</label>
        <select onChange={e => applyTemplate(e.target.value)} defaultValue=""
          className="rounded-lg px-3 py-2 text-sm border outline-none"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }}>
          <option value="">— Select template —</option>
          {templates.map(t => <option key={t.id} value={t.id}>{t.subject}</option>)}
        </select>
      </div>

      {[
        { label: "To", value: to, set: setTo },
        { label: "Subject", value: subject, set: setSubject },
      ].map(f => (
        <div key={f.label} className="flex flex-col gap-1">
          <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{f.label}</label>
          <input value={f.value} onChange={e => f.set(e.target.value)}
            className="rounded-lg px-3 py-2 text-sm border outline-none"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
        </div>
      ))}

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>HTML Body</label>
        <textarea value={html} onChange={e => setHtml(e.target.value)} rows={12}
          className="rounded-lg px-3 py-2 text-sm border outline-none font-mono"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
      </div>

      <div className="flex items-center gap-4">
        <button type="submit" className="px-6 py-2 rounded-lg text-white text-sm font-medium"
          style={{ background: "var(--accent)" }}>Send</button>
        {status && <p className="text-sm" style={{ color: "var(--text-muted)" }}>{status}</p>}
      </div>
    </form>
  );
}

export default function ComposePage() {
  return <Suspense><ComposeForm /></Suspense>;
}
