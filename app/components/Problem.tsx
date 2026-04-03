const problems = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: "Manual Work",
    text: "Data copied between systems daily — by hand, every time.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    ),
    title: "Errors",
    text: "Inventory mismatches and reporting mistakes cost you time and money.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Slow Decisions",
    text: "Reports take hours or days to pull together.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    title: "Tool Chaos",
    text: "ERP + Excel + random tools that don't talk to each other.",
  },
];

export default function Problem() {
  return (
    <section className="py-28" style={{ background: "var(--bg-base)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Most operations are still held together<br className="hidden md:block" /> by spreadsheets
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Sound familiar? You're not alone — and it's not your fault. The tools just weren't built for your workflow.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {problems.map((p) => (
            <div key={p.title} className="rounded-2xl p-6 flex gap-4 border"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }}>{p.icon}</div>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
