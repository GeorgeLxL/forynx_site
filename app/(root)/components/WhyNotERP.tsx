const erpCons = ["Costs £50k–£500k+", "Takes 6–18 months to deploy", "Requires dedicated IT team", "Hard to customise", "You adapt to the software"];
const ourPros = ["Fixed price from £5,000", "Delivered in 2–4 weeks", "We handle everything", "Built around your workflow", "Software adapts to you"];

export default function WhyNotERP() {
  return (
    <section className="py-28 border-t" style={{ background: "var(--bg-raised)", borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Why Not ERP?</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
            Traditional ERP wasn't built for you
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl p-6 border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <h3 className="font-semibold mb-5 flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
              <span className="w-6 h-6 rounded-full bg-red-900/40 flex items-center justify-center text-red-400 text-xs">✕</span>
              Traditional ERP
            </h3>
            <ul className="flex flex-col gap-3">
              {erpCons.map((c) => (
                <li key={c} className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                  <span className="text-red-400 shrink-0">✕</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl p-6 border"
            style={{ background: "var(--bg-card)", borderColor: "color-mix(in srgb, var(--accent) 40%, transparent)" }}>
            <h3 className="font-semibold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                style={{ background: "color-mix(in srgb, var(--accent) 20%, transparent)", color: "var(--accent)" }}>✓</span>
              Custom-built system
            </h3>
            <ul className="flex flex-col gap-3">
              {ourPros.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm" style={{ color: "var(--text-primary)" }}>
                  <span className="text-emerald-400 shrink-0">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
