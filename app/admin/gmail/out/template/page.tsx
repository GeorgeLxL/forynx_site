"use client";
import { useEffect, useState } from "react";

type Template = { id: string; subject: string; content: string };

export default function TemplatePage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [editing, setEditing] = useState<Template | null>(null);
  const [form, setForm] = useState({ subject: "", content: "" });

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await fetch("/api/templates").then(r => r.json());
    setTemplates(data);
  }

  function startNew() { setEditing({ id: "", subject: "", content: "" }); setForm({ subject: "", content: "" }); }
  function startEdit(t: Template) { setEditing(t); setForm({ subject: t.subject, content: t.content }); }

  async function save() {
    const method = editing?.id ? "PUT" : "POST";
    const body = editing?.id ? { id: editing.id, ...form } : form;
    await fetch("/api/templates", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setEditing(null);
    load();
  }

  async function del(id: string) {
    await fetch("/api/templates", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  }

  return (
    <div className="flex gap-6 h-full">
      <div className="w-72 shrink-0 flex flex-col gap-2">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Templates</h1>
          <button onClick={startNew} className="text-xs px-3 py-1.5 rounded-lg text-white" style={{ background: "var(--accent)" }}>+ New</button>
        </div>
        {templates.map(t => (
          <div key={t.id} className="rounded-xl border p-3 flex items-center justify-between gap-2"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <p className="text-sm truncate" style={{ color: "var(--text-primary)" }}>{t.subject}</p>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(t)} className="text-xs" style={{ color: "var(--accent)" }}>Edit</button>
              <button onClick={() => del(t.id)} className="text-xs text-red-400">Del</button>
            </div>
          </div>
        ))}
      </div>

      {editing !== null && (
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>{editing.id ? "Edit Template" : "New Template"}</h2>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Subject</label>
            <input value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
              className="rounded-lg px-3 py-2 text-sm border outline-none"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>HTML Content</label>
            <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
              className="flex-1 rounded-lg px-3 py-2 text-sm border outline-none font-mono resize-none"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
          </div>
          <div className="flex gap-3">
            <button onClick={save} className="px-6 py-2 rounded-lg text-white text-sm font-medium" style={{ background: "var(--accent)" }}>Save</button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-sm border"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
