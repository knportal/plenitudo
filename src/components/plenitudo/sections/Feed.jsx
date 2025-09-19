import SparklesIcon from "../icons/SparklesIcon";
import ShareIcon from "../icons/ShareIcon";

const BREAKTHROUGHS = [
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

export default function Feed() {
  return (
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
        {BREAKTHROUGHS.map((b) => (
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
                <button className="btn-ghost" aria-label="Share to topic room">
                  <ShareIcon className="size-4" />
                  <span className="sr-only">Share</span>
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
