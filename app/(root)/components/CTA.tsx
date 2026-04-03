"use client";
import { useState } from "react";

export default function CTA() {
  const [form, setForm] = useState({ email: "", subject: "", content: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? "sent" : "error");
  }

  return (
    <section id="contact" className="py-28 border-t" style={{ background: "var(--accent-muted)", borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">

        {/* Left */}
        <div className="flex flex-col gap-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
            Stop wasting time on<br />manual processes
          </h2>
          <p className="text-lg" style={{ color: "var(--text-muted)" }}>
            Let's build a system that actually fits your business. Free 15-min call — no commitment.
          </p>
          <div className="flex flex-col items-start gap-3 pt-2">
            <a href="mailto:sato.takeru6611@gmail.com"
              className="inline-flex items-center gap-3 text-sm font-medium"
              style={{ color: "var(--text-primary)" }}>
              <span className="w-9 h-9 rounded-lg flex items-center justify-center border"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              Email us
            </a>
            <a href="https://calendar.app.google/iZtfBu3tyDyoLPdG8"
              target="_blank"
              className="inline-flex items-center gap-3 text-sm font-medium"
              style={{ color: "var(--text-primary)" }}>
              <span className="w-9 h-9 rounded-lg flex items-center justify-center border"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              Book a 15-min call
            </a>
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>No sales pitch. Just a conversation about your workflow.</p>
        </div>

        {/* Right — contact form */}
        <form onSubmit={submit} className="rounded-2xl border p-6 flex flex-col gap-4"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
          {[
            { key: "email", label: "Your Email", type: "email", placeholder: "you@company.com" },
            { key: "subject", label: "Subject", type: "text", placeholder: "What's this about?" },
          ].map(f => (
            <div key={f.key} className="flex flex-col gap-1">
              <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{f.label}</label>
              <input type={f.type} placeholder={f.placeholder}
                value={(form as any)[f.key]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                required
                className="rounded-lg px-3 py-2 text-sm border outline-none"
                style={{ background: "var(--bg-base)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>What is your problem or complaint?</label>
            <textarea placeholder="Tell us about your workflow challenges..." rows={5}
              value={form.content}
              onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
              className="rounded-lg px-3 py-2 text-sm border outline-none resize-none"
              style={{ background: "var(--bg-base)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
          </div>

          {status === "sent" ? (
            <p className="text-sm text-emerald-400 font-medium">✓ Message sent! We'll be in touch soon.</p>
          ) : (
            <button type="submit" disabled={status === "sending"}
              className="py-3 rounded-lg text-white font-semibold text-sm transition-opacity"
              style={{ background: "var(--accent)", opacity: status === "sending" ? 0.7 : 1 }}>
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          )}
          {status === "error" && <p className="text-sm text-red-400">Something went wrong. Please try again.</p>}
        </form>
      </div>
    </section>
  );
}
