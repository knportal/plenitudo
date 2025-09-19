export default function PlenitudoMVP() {
  const breakthroughs = [
    {
      id: 1,
      title: "Solar paint turns walls into power",
      source: "Uplifted Journal",
      tag: "Innovation",
    },
    {
      id: 2,
      title: "Teen builds open-source mental health app",
      source: "HumanKind",
      tag: "Mindfulness",
    },
    {
      id: 3,
      title: "Neighborhood micro-grants fund 42 ideas",
      source: "Small Bets",
      tag: "Entrepreneurship",
    },
  ];

  const prompts = [
    "What's one problem you couldn't stop thinking about this week?",
    "Name a tiny habit that would compound over 30 days.",
    "Who could you collaborate with to 10× an idea?",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
      {/* Futuristic fractal/nebula background */}
      <BackgroundFX />

      {/* Page container */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        <Header />

        <Hero />

        {/* Feed */}
        <section aria-labelledby="feed-title" className="mt-16">
          <div className="flex items-center justify-between gap-4">
            <h2
              id="feed-title"
              className="text-xl md:text-2xl font-semibold tracking-tight"
            >
              Daily Breakthroughs
            </h2>
            <a
              href="#"
              className="text-sm underline underline-offset-4 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-2 py-1"
            >
              Submit a story
            </a>
          </div>
          <ul
            className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            role="list"
          >
            {breakthroughs.map((b) => (
              <li key={b.id} className="group">
                <article className="card-glow rounded-2xl p-5 bg-slate-900/50 ring-1 ring-white/10 hover:ring-emerald-400/60 transition-all duration-300 focus-within:ring-emerald-400/80">
                  <p className="text-emerald-300 text-xs tracking-wide uppercase mb-2">
                    {b.tag}
                  </p>
                  <h3 className="text-lg font-semibold leading-snug">
                    <a
                      href="#"
                      className="focus:outline-none focus-visible:ring ring-emerald-400 rounded"
                    >
                      {b.title}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">{b.source}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      className="btn-ghost"
                      aria-label="Inspire me with similar"
                    >
                      <SparklesIcon className="size-4" />
                      <span className="sr-only">Inspire</span>
                    </button>
                    <button
                      className="btn-ghost"
                      aria-label="Share to topic room"
                    >
                      <ShareIcon className="size-4" />
                      <span className="sr-only">Share</span>
                    </button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* Topic Rooms (beta) */}
        <section aria-labelledby="rooms-title" className="mt-16">
          <div className="flex items-center gap-3">
            <h2
              id="rooms-title"
              className="text-xl md:text-2xl font-semibold tracking-tight"
            >
              Topic Rooms
            </h2>
            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-white/5 ring-1 ring-white/10">
              beta
            </span>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <RoomCard
              title="AI"
              desc="Latest breakthroughs, tools, and prompts to build with."
              accent="from-fuchsia-500 via-cyan-400 to-emerald-400"
            />
            <RoomCard
              title="Mindfulness"
              desc="Practices, insights, and gentle nudges toward presence."
              accent="from-emerald-400 via-teal-400 to-blue-400"
            />
            <RoomCard
              title="Entrepreneurship"
              desc="Stories of builders, makers, and small bets that pay off."
              accent="from-amber-400 via-orange-400 to-red-400"
            />
          </div>
        </section>

        {/* Guided Prompts */}
        <section aria-labelledby="prompts-title" className="mt-16">
          <h2
            id="prompts-title"
            className="text-xl md:text-2xl font-semibold tracking-tight mb-6"
          >
            Guided Prompts
          </h2>
          <div className="space-y-4">
            {prompts.map((prompt, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="p-4 rounded-xl bg-slate-900/30 ring-1 ring-white/5 hover:ring-white/10 transition-all duration-200">
                  <p className="text-slate-200 group-hover:text-white transition-colors">
                    {prompt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>

      {/* Local styles for glow/animations (works without Tailwind config) */}
      <style>{`
        .card-glow { position: relative; }
        .card-glow::before {
          content: "";
          position: absolute; inset: -1px; border-radius: 1rem;
          background: radial-gradient(60% 60% at 30% 10%, rgba(16,185,129,0.35), transparent 60%),
                      radial-gradient(50% 50% at 90% 10%, rgba(59,130,246,0.25), transparent 60%);
          filter: blur(18px); opacity: 0; transition: opacity .3s ease;
          z-index: -1;
        }
        .card-glow:hover::before, .card-glow:focus-within::before { opacity: 1; }
        .btn-ghost { display:inline-flex; align-items:center; gap:.5rem; padding:.375rem .5rem; border-radius:.75rem; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); }
        .btn-ghost:hover { background: rgba(16,185,129,0.08); border-color: rgba(16,185,129,0.2); }
      `}</style>
    </div>
  );
}
