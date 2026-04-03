const bullets = [
  "Manage inventory in one place",
  "Track operations in real time",
  "Replace spreadsheets completely",
  "Built specifically for your business",
];

export default function Solution() {
  return (
    <section id="solution" className="py-28 border-t" style={{ background: "var(--bg-base)", borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className="flex flex-col gap-6">
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>The Solution</p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
            A system built around<br />your workflow
          </h2>
          <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
            No bloated ERP. No generic software. A focused tool that does exactly what your team needs — nothing more.
          </p>
          <ul className="flex flex-col gap-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3" style={{ color: "var(--text-primary)" }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 border"
                  style={{ background: "color-mix(in srgb, var(--accent) 20%, transparent)", borderColor: "var(--accent)" }}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--accent)" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — dashboard mock */}
        <div className="rounded-2xl p-5 flex flex-col gap-4 shadow-2xl border"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Operations Dashboard</span>
            <span className="text-xs bg-emerald-900/40 text-emerald-400 px-2 py-0.5 rounded-full">Live</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Open Orders", value: "128", delta: "+12%" },
              { label: "Fulfilled Today", value: "34", delta: "+5%" },
              { label: "Avg. Lead Time", value: "3.2d", delta: "-0.4d" },
              { label: "Pending Issues", value: "4", delta: "-2" },
            ].map((k) => (
              <div key={k.label} className="rounded-xl p-3" style={{ background: "var(--bg-base)" }}>
                <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{k.label}</p>
                <div className="flex items-end justify-between">
                  <p className="font-bold text-xl" style={{ color: "var(--text-primary)" }}>{k.value}</p>
                  <p className="text-emerald-400 text-xs">{k.delta}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-3" style={{ background: "var(--bg-base)" }}>
            <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>Order Volume — Last 7 days</p>
            <div className="flex items-end gap-1.5 h-14">
              {[55, 70, 45, 90, 65, 80, 95].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm"
                  style={{ height: `${h}%`, background: i === 6 ? "var(--accent)" : "var(--border)" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
