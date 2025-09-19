export default function Hero() {
  return (
    <section className="mt-14 relative">
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
          Stop <span className="fancy-underline">doomscrolling</span>, start{" "}
          <span className="text-emerald-400">idea scrolling</span>.
        </h1>
        <p className="mt-4 text-slate-300 max-w-2xl">
          A home for uplifting breakthroughs, mindful prompts, and rooms where
          builders connect. Minimal design, futuristic edge, zero noise.
        </p>
        <div className="mt-6 flex gap-3">
          <a href="#feed-title" className="btn-primary">
            Explore Feed
          </a>
          <a href="#" className="btn-secondary">
            Create Account
          </a>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute -top-8 -right-8 w-44 h-44 rounded-3xl neon-corner"
      />
      <style>{`
        .fancy-underline { position: relative; }
        .fancy-underline::after { content:""; position:absolute; left:0; right:0; bottom:-4px; height:10px; border-radius:999px; background: radial-gradient(60% 100% at 30% 100%, rgba(52,211,153,.7), transparent 70%), radial-gradient(40% 100% at 90% 100%, rgba(96,165,250,.4), transparent 70%); filter: blur(8px); }
        .btn-primary { display:inline-flex; align-items:center; gap:.5rem; padding:.75rem 1rem; border-radius:1rem; font-weight:600; background:linear-gradient(90deg, #10b981, #3b82f6); color:white; box-shadow:0 8px 30px rgba(16,185,129,.25); }
        .btn-primary:hover, .btn-primary:focus { outline:none; filter:saturate(1.15) brightness(1.05) }
        .btn-secondary { display:inline-flex; align-items:center; padding:.75rem 1rem; border-radius:1rem; font-weight:600; border:1px solid rgba(255,255,255,0.12); background:rgba(255,255,255,0.04) }
        .btn-secondary:hover, .btn-secondary:focus{ outline:none; border-color: rgba(255,255,255,0.3) }
        .neon-corner { background: conic-gradient(from 180deg at 70% 70%, rgba(16,185,129,.7), rgba(59,130,246,.6), transparent 70%); filter: blur(16px); }
      `}</style>
    </section>
  );
}
