/**
 * Admin button to summarize recent chat messages into a pinned Post.
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { summarizeRecentChat } from "@/server/rooms/summarizeActions";

interface SummarizeChatButtonProps {
  threadId: string;
  isAdmin: boolean;
}

export function SummarizeChatButton({ threadId, isAdmin }: SummarizeChatButtonProps) {
  const router = useRouter();
  const [isSummarizing, setIsSummarizing] = useState(false);

  if (!isAdmin) return null;

  const handleSummarize = async () => {
    if (isSummarizing) return;

    setIsSummarizing(true);
    try {
      await summarizeRecentChat(threadId, 60); // Last 60 minutes
      router.refresh();
    } catch (error) {
      console.error("Failed to summarize chat:", error);
      alert(error instanceof Error ? error.message : "Failed to summarize chat");
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <button
      onClick={handleSummarize}
      disabled={isSummarizing}
      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-amber-500/10 text-amber-300 ring-1 ring-amber-400/30 hover:bg-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/50"
      aria-label="Summarize recent chat messages"
    >
      {isSummarizing ? (
        <>
          <svg
            className="w-4 h-4 animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Summarizing...
        </>
      ) : (
        <>
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Summarize chat
        </>
      )}
    </button>
  );
}


