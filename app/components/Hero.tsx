"use client";
export default function Hero() {
  return (
    <section className="w-full min-h-screen flex items-center pt-16" style={{ background: "var(--bg-base)" }}>
      <div className="w-full max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs border"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
            Built for manufacturing &amp; wholesale
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight" style={{ color: "var(--text-primary)" }}>
            Replace Your Messy<br />
            <span style={{ color: "var(--accent)" }}>Internal Tools</span><br />
            with a Custom System
          </h1>

          <p className="text-lg leading-relaxed max-w-md" style={{ color: "var(--text-muted)" }}>
            We build simple ERP-lite systems for manufacturing and wholesale teams to replace
            spreadsheets, manual workflows, and outdated tools.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a href="#contact" className="text-white font-medium px-6 py-3 rounded-lg transition-colors hover:opacity-90"
              style={{ background: "var(--accent)" }}>
              Book a 15-min call
            </a>
            <a href="#how-it-works" className="font-medium px-6 py-3 rounded-lg transition-colors border"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--text-muted)"; e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}>
              See how it works
            </a>
          </div>
        </div>

        {/* Right — fake dashboard */}
        <div className="rounded-2xl shadow-2xl p-5 flex flex-col gap-4 border"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Inventory Overview</span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Live</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total SKUs", value: "1,284" },
              { label: "Low Stock", value: "23" },
              { label: "Orders Today", value: "47" },
            ].map((k) => (
              <div key={k.label} className="rounded-xl p-3" style={{ background: "var(--bg-base)" }}>
                <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{k.label}</p>
                <p className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>{k.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-3" style={{ background: "var(--bg-base)" }}>
            <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>Weekly Shipments</p>
            <div className="flex items-end gap-1.5 h-16">
              {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm opacity-80" style={{ height: `${h}%`, background: "var(--accent)" }} />
              ))}
            </div>
          </div>

          <div className="rounded-xl overflow-hidden" style={{ background: "var(--bg-base)" }}>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                  <th className="text-left px-3 py-2 font-medium" style={{ color: "var(--text-muted)" }}>Item</th>
                  <th className="text-left px-3 py-2 font-medium" style={{ color: "var(--text-muted)" }}>Stock</th>
                  <th className="text-left px-3 py-2 font-medium" style={{ color: "var(--text-muted)" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { item: "Steel Pipe 40mm", stock: 340, status: "OK" },
                  { item: "Valve Set B", stock: 12, status: "Low" },
                  { item: "Connector Kit", stock: 0, status: "Out" },
                ].map((row) => (
                  <tr key={row.item} className="border-b" style={{ borderColor: "var(--bg-card)" }}>
                    <td className="px-3 py-2" style={{ color: "var(--text-primary)" }}>{row.item}</td>
                    <td className="px-3 py-2" style={{ color: "var(--text-muted)" }}>{row.stock}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        row.status === "OK"
                          ? "bg-emerald-900/50 text-emerald-400"
                          : row.status === "Low"
                          ? "bg-yellow-900/50 text-yellow-400"
                          : "bg-red-900/50 text-red-400"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
