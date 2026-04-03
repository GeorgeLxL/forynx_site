const included = [
  "Full custom build — no templates",
  "Delivered in 2–4 weeks",
  "No monthly subscription",
  "Unlimited revisions during build",
  "30-day post-launch support",
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 border-t" style={{ background: "var(--bg-base)", borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text-primary)" }}>Simple, fixed price</h2>
          <p className="mt-3" style={{ color: "var(--text-muted)" }}>No surprises. No subscriptions. One build, yours forever.</p>
        </div>

        <div className="max-w-md mx-auto rounded-2xl p-8 flex flex-col gap-6 shadow-2xl border"
          style={{ background: "var(--bg-card)", borderColor: "color-mix(in srgb, var(--accent) 40%, transparent)" }}>
          <div>
            <p className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>Fixed, one-time build</p>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-bold" style={{ color: "var(--text-primary)" }}>£5,000</span>
              <span className="mb-1" style={{ color: "var(--text-muted)" }}>starting from</span>
            </div>
          </div>

          <ul className="flex flex-col gap-3">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "var(--text-primary)" }}>
                <span className="text-emerald-400 shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <a href="#contact" className="text-white font-semibold text-center py-3 rounded-lg transition-colors hover:opacity-90"
            style={{ background: "var(--accent)" }}>
            Book a call
          </a>

          <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
            Price varies based on scope. We'll give you a fixed quote after a free 15-min call.
          </p>
        </div>
      </div>
    </section>
  );
}
