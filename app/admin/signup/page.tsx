"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ userId: "", password: "", passwordConfirm: "" });
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error);
    router.push("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-base)" }}>
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border p-8 flex flex-col gap-4"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
        <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Admin Setup</h1>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {[
          { key: "userId", label: "User ID", type: "text" },
          { key: "password", label: "Password", type: "password" },
          { key: "passwordConfirm", label: "Confirm Password", type: "password" },
        ].map(f => (
          <div key={f.key} className="flex flex-col gap-1">
            <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{f.label}</label>
            <input type={f.type} value={(form as any)[f.key]}
              onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
              className="rounded-lg px-3 py-2 text-sm border outline-none"
              style={{ background: "var(--bg-base)", borderColor: "var(--border)", color: "var(--text-primary)" }} />
          </div>
        ))}
        <button type="submit" className="py-2 rounded-lg text-white text-sm font-medium mt-2"
          style={{ background: "var(--accent)" }}>
          Create Admin
        </button>
      </form>
    </div>
  );
}
