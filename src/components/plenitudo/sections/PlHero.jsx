export default function PlHero() {
  const substackUrl = process.env.NEXT_PUBLIC_SUBSTACK_URL;

  const getSubstackUrl = () => {
    if (!substackUrl) return "/substack";
    try {
      const url = new URL(substackUrl);
      url.searchParams.set("utm_source", "plenitudo_landing");
      url.searchParams.set("utm_medium", "web");
      url.searchParams.set("utm_campaign", "hero_cta");
      return url.toString();
    } catch {
      return substackUrl;
    }
  };

  return (
    <section className="mt-8 sm:mt-14 relative">
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
          Daily AI insights,{" "}
          <span className="text-emerald-400">curated for you</span>.
        </h1>
        <p className="mt-3 sm:mt-4 text-slate-300 max-w-2xl text-sm sm:text-base">
          Get the day's top AI breakthroughs delivered to your inbox. Plus weekly
          deep dives, exclusive analysis, and access to our community discussions.
        </p>
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
          {substackUrl ? (
            <a
              href={getSubstackUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              📰 Subscribe on Substack
            </a>
          ) : (
            <a href="/substack" className="btn-primary">
              📰 Subscribe to Newsletter
            </a>
          )}
          <a href="#feed-title" className="btn-secondary">
            Preview Latest Stories
          </a>
        </div>
        {substackUrl && (
          <p className="mt-3 text-xs text-slate-400">
            Free daily digest • Paid weekly newsletter • Community access
          </p>
        )}
      </div>
      <style>{`
        .fancy-underline { position: relative; }
        .fancy-underline::after { content:""; position:absolute; left:0; right:0; bottom:-4px; height:10px; border-radius:999px; background: radial-gradient(60% 100% at 30% 100%, rgba(52,211,153,.7), transparent 70%), radial-gradient(40% 100% at 90% 100%, rgba(96,165,250,.4), transparent 70%); filter: blur(8px); }
        .btn-primary { display:inline-flex; align-items:center; gap:.5rem; padding:.625rem .875rem; border-radius:1rem; font-weight:600; font-size:.875rem; background:linear-gradient(90deg, #10b981, #3b82f6); color:white; box-shadow:0 8px 30px rgba(16,185,129,.25); min-height: 44px; text-decoration:none; }
        @media (min-width: 640px) { .btn-primary { padding:.75rem 1rem; font-size:1rem; } }
        .btn-primary:hover, .btn-primary:focus { outline:none; filter:saturate(1.15) brightness(1.05) }
        .btn-secondary { display:inline-flex; align-items:center; padding:.75rem 1rem; border-radius:1rem; font-weight:600; border:1px solid rgba(255,255,255,0.12); background:rgba(255,255,255,0.04); color:white; text-decoration:none; min-height: 44px; }
        .btn-secondary:hover, .btn-secondary:focus{ outline:none; border-color: rgba(255,255,255,0.3); background:rgba(255,255,255,0.08); }
      `}</style>
    </section>
  );
}
