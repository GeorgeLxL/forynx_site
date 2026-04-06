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
              className="py-3 px-4 w-[200px] inline-flex items-center justify-start gap-3 text-sm font-medium border rounded-lg"
              style={{ color: "var(--text-primary)", background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email us
            </a>
            <a href="https://calendar.app.google/iZtfBu3tyDyoLPdG8"
              target="_blank"
              className="py-3 px-4 w-[200px] inline-flex items-center justify-start gap-3 text-sm font-medium border rounded-lg"
              style={{ color: "var(--text-primary)", background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book a 15-min call
            </a>
            <a href="https://whatsapp.com/channel/0029Vb7qFH67Noa4TACE710k"
              target="_blank" rel="noopener noreferrer"
              className="py-3 px-4 w-[200px] inline-flex items-center justify-start gap-3 text-sm font-medium border rounded-lg"
              style={{ color: "#25D366", background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Follow on WhatsApp
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
