"use client";
import { useState } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";
import Link from "next/link";
import type { AIDailyItemDTO } from "@/types/aiDaily";
import PlSparklesIcon from "@/components/plenitudo/icons/PlSparklesIcon";
import PlShareIcon from "@/components/plenitudo/icons/PlShareIcon";

const fetcher = (u: string) => fetch(u).then((r) => r.json());

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

interface AIDailyResponse {
  items: AIDailyItemDTO[];
  threadId: string | null;
  discussUrl: string | null;
}

export default function AIDailyList() {
  const [visibleCount, setVisibleCount] = useState(6); // Start with 6 items

  const { data, error, isLoading } = useSWR<AIDailyResponse>(
    "/api/ai-daily",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (error) {
    return (
      <div className="text-center py-12 text-amber-300">
        Failed to load AI Daily: {String(error?.message ?? error)}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12 text-slate-400 animate-pulse">
        Loading today&apos;s AI breakthroughs...
      </div>
    );
  }

  if (!data || !data.items || data.items.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        No AI breakthroughs today. Check back tomorrow!
      </div>
    );
  }

  const { items, discussUrl } = data;
  const hasMore = items.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, items.length)); // Load 6 more at a time
  };

  return (
    <>
      {/* Discussion Thread Link */}
      {discussUrl && (
        <div className="mb-4 rounded-xl p-3 bg-emerald-500/10 ring-1 ring-emerald-400/30">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-emerald-300">Join the Discussion</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Share your thoughts on today&apos;s AI breakthroughs
              </p>
            </div>
            <a
              href={discussUrl}
              className="btn-ghost whitespace-nowrap text-xs"
              aria-label="Join discussion thread"
            >
              💬 Discuss
            </a>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, visibleCount).map((item, i) => (
          <motion.article
          key={item.id}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.25 }}
          className="card-glow rounded-xl p-4 sm:p-5 bg-slate-900/50 ring-1 ring-white/10 hover:ring-emerald-400/60 transition-all duration-300 focus-within:ring-emerald-400/80 h-full flex flex-col"
        >
          <div className="flex items-center gap-2 mb-2">
            <p
              className={`${
                MOOD_COLORS[item.mood as keyof typeof MOOD_COLORS] ||
                "text-slate-300"
              } text-xs tracking-wide uppercase`}
            >
              {GENRE_NAMES[item.genre as keyof typeof GENRE_NAMES] ||
                item.genre}
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

          <h3 className="text-base font-semibold leading-snug mb-2 flex-grow">
            {item.title}
          </h3>

          <p className="text-sm text-slate-300 line-clamp-3 mb-2">
            {item.summary}
          </p>

          {Array.isArray(item.bullets) && item.bullets.length > 0 && (
            <ul className="mb-2 space-y-0.5 text-xs text-slate-400">
              {item.bullets.slice(0, 2).map((b, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span className="flex-1">{b}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-1 mb-2">
            {(item.sources || []).slice(0, 4).map((s, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-0.5 rounded-full bg-slate-800/50 text-slate-400"
              >
                {s.publisher}
              </span>
            ))}
            {item.sources && item.sources.length > 4 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800/50 text-slate-400">
                +{item.sources.length - 4}
              </span>
            )}
          </div>

          <div className="mt-auto flex items-center gap-1.5 pt-2 border-t border-white/5">
            {discussUrl && (
              <a
                href={discussUrl}
                className="btn-ghost flex-1"
                aria-label="Discuss this breakthrough"
              >
                <span className="text-xs">💬</span>
                <span className="text-xs">Discuss</span>
              </a>
            )}
            <Link
              href="/rooms/ai"
              className="btn-ghost flex-1"
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
        </motion.article>
      ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-center"
        >
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/30 hover:bg-emerald-500/20 transition-all duration-200 hover:scale-105"
            aria-label="Load more AI breakthroughs"
          >
            <span className="text-sm font-medium">Load More</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </motion.div>
      )}

      {/* Utility styles */}
      <style jsx global>{`
        .card-glow {
          position: relative;
        }
        .card-glow::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 1rem;
          background:
            radial-gradient(
              60% 60% at 30% 10%,
              rgba(16, 185, 129, 0.35),
              transparent 60%
            ),
            radial-gradient(
              50% 50% at 90% 10%,
              rgba(59, 130, 246, 0.25),
              transparent 60%
            );
          filter: blur(18px);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        .card-glow:hover::before,
        .card-glow:focus-within::before {
          opacity: 1;
        }
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.375rem 0.5rem;
          border-radius: 0.75rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .btn-ghost:hover {
          background: rgba(16, 185, 129, 0.08);
          border-color: rgba(16, 185, 129, 0.45);
        }
      `}</style>
    </>
  );
}
