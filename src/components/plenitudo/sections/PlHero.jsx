export default function PlHero() {
  return (
    <section className="mt-8 sm:mt-14 relative">
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
          Stop <span className="fancy-underline">doomscrolling</span>, start{" "}
          <span className="text-emerald-400">idea scrolling</span>.
        </h1>
        <p className="mt-3 sm:mt-4 text-slate-300 max-w-2xl text-sm sm:text-base">
          A home for uplifting breakthroughs, mindful prompts, and rooms where
          builders connect. Minimal design, futuristic edge, zero noise.
        </p>
        <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-3">
          <a href="#feed-title" className="btn-primary">
            Explore Feed
          </a>
        </div>
      </div>
      <style>{`
        .fancy-underline { position: relative; }
        .fancy-underline::after { content:""; position:absolute; left:0; right:0; bottom:-4px; height:10px; border-radius:999px; background: radial-gradient(60% 100% at 30% 100%, rgba(52,211,153,.7), transparent 70%), radial-gradient(40% 100% at 90% 100%, rgba(96,165,250,.4), transparent 70%); filter: blur(8px); }
        .btn-primary { display:inline-flex; align-items:center; gap:.5rem; padding:.625rem .875rem; border-radius:1rem; font-weight:600; font-size:.875rem; background:linear-gradient(90deg, #10b981, #3b82f6); color:white; box-shadow:0 8px 30px rgba(16,185,129,.25); min-height: 44px; }
        @media (min-width: 640px) { .btn-primary { padding:.75rem 1rem; font-size:1rem; } }
        .btn-primary:hover, .btn-primary:focus { outline:none; filter:saturate(1.15) brightness(1.05) }
        .btn-secondary { display:inline-flex; align-items:center; padding:.75rem 1rem; border-radius:1rem; font-weight:600; border:1px solid rgba(255,255,255,0.12); background:rgba(255,255,255,0.04) }
        .btn-secondary:hover, .btn-secondary:focus{ outline:none; border-color: rgba(255,255,255,0.3) }
      `}</style>
    </section>
  );
}
