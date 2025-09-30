const PROMPTS = [
  "What's one problem you couldn't stop thinking about this week?",
  "Name a tiny habit that would compound over 30 days.",
  "Who could you collaborate with to 10× an idea?",
];

export default function PlPrompts() {
  return (
    <section aria-labelledby="prompts-title" className="mt-16 mb-24">
      <h2
        id="prompts-title"
        className="text-xl md:text-2xl font-semibold tracking-tight"
      >
        Guided Prompts
      </h2>
      <ul className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4" role="list">
        {PROMPTS.map((p, i) => (
          <li key={i} className="group">
            <button className="w-full text-left rounded-2xl p-5 bg-slate-900/50 ring-1 ring-white/10 hover:ring-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition-all">
              <div className="inline-flex items-center gap-2">
                <span
                  aria-hidden
                  className="size-2 rounded-full bg-emerald-400 animate-pulse-slow"
                ></span>
                <span className="text-sm text-slate-300">Reflect</span>
              </div>
              <p className="mt-2 text-base md:text-lg font-medium leading-snug group-hover:underline underline-offset-4 decoration-emerald-400/60">
                {p}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
