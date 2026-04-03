const cards = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Save hours every week",
    text: "Eliminate manual data entry, exports, and repetitive tasks. Free up your team to focus on actual work.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Reduce operational friction",
    text: "No more switching between tools, fixing spreadsheets, or chasing data across systems.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Lower operational costs",
    text: "Fewer errors, faster processes, and less manual work translate directly into cost savings.",
  },
];

export default function ROI() {
  return (
    <section className="py-28 border-t" style={{ background: "var(--bg-raised)", borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Save time, reduce errors, and cut operational costs
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Replacing manual workflows with a simple system has a direct impact on your operations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cards.map((c) => (
            <div key={c.title} className="rounded-xl p-6 flex flex-col gap-3 border"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div style={{ color: "var(--accent)" }}>{c.icon}</div>
              <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>{c.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{c.text}</p>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto mt-12 rounded-xl p-6 border flex items-start gap-4"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
          <span className="text-2xl shrink-0">💡</span>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            <span className="font-semibold" style={{ color: "var(--text-primary)" }}>Even saving 10–15 hours per week</span> can cover the cost of the system within months.
          </p>
        </div>
      </div>
    </section>
  );
}
