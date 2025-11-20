/**
 * Client component for thread replies (Posts).
 * Displays initial posts from server. Realtime updates handled by parent via revalidation.
 */
"use client";

interface ThreadRepliesProps {
  threadId: string;
  initialPosts: Array<{
    id: string;
    content: string;
    authorName: string | null;
    pinned: boolean;
    createdAt: Date;
  }>;
}

export function ThreadReplies({ initialPosts }: ThreadRepliesProps) {

  if (initialPosts.length === 0) {
    return <p className="mt-2 text-slate-300">No replies yet. Join the conversation.</p>;
  }

  return (
    <ul className="mt-3 space-y-2 text-slate-300">
      {initialPosts.map((p) => (
        <li
          key={p.id}
          className={`rounded-xl p-3 bg-slate-900/60 ring-1 ring-white/10 ${
            p.pinned ? "ring-amber-400/30 bg-amber-500/5" : ""
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              {p.pinned && (
                <div className="mb-2 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  <span className="text-xs text-amber-400 font-medium">Pinned</span>
                </div>
              )}
              <p className="whitespace-pre-wrap">{p.content}</p>
            </div>
            <span className="text-xs text-slate-400 flex-shrink-0">{p.authorName ?? "Anon"}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

