const steps = [
  {
    num: "01",
    title: "Understand your workflow",
    desc: "We start with a free 15-min call to map out your current process, pain points, and what you actually need.",
  },
  {
    num: "02",
    title: "Design your system",
    desc: "We design the data model, screens, and logic — and show you before we build anything.",
  },
  {
    num: "03",
    title: "Build & deliver",
    desc: "We build it, test it with your team, and hand it over — fully working, in 2–4 weeks.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 border-t" style={{ background: "var(--bg-base)", borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Process</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text-primary)" }}>How it works</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 relative">
          <div className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px"
            style={{ background: "var(--border)" }} />

          {steps.map((s) => (
            <div key={s.num} className="rounded-2xl p-6 flex flex-col gap-4 relative border"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm z-10 border"
                style={{ background: "var(--bg-base)", borderColor: "var(--border)", color: "var(--accent)" }}>
                {s.num}
              </div>
              <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
