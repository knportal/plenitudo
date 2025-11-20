"use client";

// AI Daily Feed - Integrated with beautiful landing page
import Link from "next/link";
import PlSparklesIcon from "../icons/PlSparklesIcon";
import PlShareIcon from "../icons/PlShareIcon";
import { motion } from "framer-motion";
import useSWR from "swr";

const fetcher = (u) => fetch(u).then((r) => r.json());

// Mood to color mapping
const MOOD_COLORS = {
  uplift: "text-emerald-300",
  opportunity: "text-blue-300",
  caution: "text-amber-300",
};

// Genre to display name
const GENRE_NAMES = {
  policy: "Policy",
  research: "Research",
  chips: "Chips",
  enterprise: "Enterprise",
  consumer: "Consumer",
  robotics: "Robotics",
  health: "Health",
  climate: "Climate",
};

export default function PlFeed() {
  const {
    data,
    error,
    isLoading,
  } = useSWR("/api/ai-daily", fetcher, {
    revalidateOnFocus: false,
  });

  // Handle new API response format: { items, threadId, discussUrl }
  const aiDaily = data?.items || data || [];
  // Show loading state
  if (isLoading) {
    return (
      <section aria-labelledby="feed-title" className="mt-8 sm:mt-16">
        <div className="flex items-center justify-between gap-4">
          <h2
            id="feed-title"
            className="text-xl md:text-2xl font-semibold tracking-tight"
          >
            AI Daily Breakthroughs
          </h2>
        </div>
        <div className="mt-6 text-center py-12 text-slate-400 animate-pulse">
          Loading today&apos;s AI breakthroughs...
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section aria-labelledby="feed-title" className="mt-8 sm:mt-16">
        <div className="flex items-center justify-between gap-4">
          <h2
            id="feed-title"
            className="text-xl md:text-2xl font-semibold tracking-tight"
          >
            AI Daily Breakthroughs
          </h2>
        </div>
        <div className="mt-6 text-center py-12 text-amber-300">
          Unable to load AI Daily. Please try again later.
        </div>
      </section>
    );
  }

  // Use AI Daily data or show empty state
  const items = aiDaily || [];

  return (
    <section aria-labelledby="feed-title" className="mt-16">
      <div className="flex items-center justify-between gap-4">
        <h2
          id="feed-title"
          className="text-xl md:text-2xl font-semibold tracking-tight"
        >
          AI Daily Breakthroughs
        </h2>
        <a
          href="/daily"
          className="text-sm underline underline-offset-4 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-2 py-1 hover:text-emerald-300 transition-colors"
        >
          View all &rarr;
        </a>
      </div>

      {items.length === 0 ? (
        <div className="mt-6 text-center py-12 text-slate-400">
          No AI breakthroughs today. Check back tomorrow!
        </div>
      ) : (
        <ul
          className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5"
          role="list"
        >
          {items.slice(0, 6).map((item, idx) => (
            <motion.li
              key={item.id}
              className="group"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <article className="card-glow rounded-xl sm:rounded-2xl p-4 sm:p-5 bg-slate-900/50 ring-1 ring-white/10 hover:ring-emerald-400/60 transition-all duration-300 focus-within:ring-emerald-400/80 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <p
                    className={`${
                      MOOD_COLORS[item.mood] || "text-slate-300"
                    } text-xs tracking-wide uppercase`}
                  >
                    {GENRE_NAMES[item.genre] || item.genre}
                  </p>
                  {item.mood === "caution" && (
                    <span className="text-amber-400 text-xs">⚠️</span>
                  )}
                  {item.mood === "opportunity" && (
                    <span className="text-blue-400 text-xs">💡</span>
                  )}
                  {item.mood === "uplift" && (
                    <span className="text-emerald-400 text-xs">✨</span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-semibold leading-snug mb-2 sm:mb-3 flex-grow">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-300 line-clamp-2 mb-2 sm:mb-3">
                  {item.summary}
                </p>

                <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                  {(item.sources || []).slice(0, 3).map((s, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 rounded-full bg-slate-800/50 text-slate-400"
                    >
                      {s.publisher}
                    </span>
                  ))}
                  {item.sources?.length > 3 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800/50 text-slate-400">
                      +{item.sources.length - 3}
                    </span>
                  )}
                </div>

                <div className="mt-auto flex items-center gap-1 sm:gap-2 pt-2 sm:pt-3 border-t border-white/5">
                  {data?.discussUrl && (
                    <a
                      href={data.discussUrl}
                      className="btn-ghost flex-1"
                      aria-label="Discuss this breakthrough"
                    >
                      <span className="text-xs">💬</span>
                      <span className="text-xs">Discuss</span>
                    </a>
                  )}
                  <Link
                    href="/rooms/ai"
                    className="btn-ghost flex-1 relative z-10"
                    aria-label="Explore in AI room"
                  >
                    <PlSparklesIcon className="size-4" />
                    <span className="text-xs">Explore</span>
                  </Link>
                  <a
                    href={item.sources?.[0]?.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost flex-1"
                    aria-label="Read full story"
                  >
                    <PlShareIcon className="size-4" />
                    <span className="text-xs">Read</span>
                  </a>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}
