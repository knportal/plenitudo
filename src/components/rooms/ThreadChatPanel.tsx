/**
 * Live Chat panel for thread discussions.
 * Displays messages as a chat interface with infinite scroll up for pagination.
 */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useThreadChatRealtime } from "@/hooks/useThreadChatRealtime";
import { sendChatMessage } from "@/server/rooms/chatActions";
import { RateLimitError } from "@/server/rooms/rateLimitError";
import { ChatMessageKebab } from "./ChatMessageKebab";

import type { ChatMessage } from "@/hooks/useThreadChatRealtime";

interface ThreadChatPanelProps {
  threadId: string;
  initialMessages: ChatMessage[];
  currentUser?: { id: string; name: string };
  isAdmin?: boolean;
}

const MAX_CHARS = 500;
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const RATE_LIMIT_MAX_MESSAGES = 10;

// Simple in-memory rate limiting per thread
const rateLimitMap = new Map<string, number[]>();

// Client-side rate limiting (supplementary to server-side)
// Server action has main rate limiting with TODO for Redis
function isRateLimitedClient(key: string): boolean {
  const now = Date.now();
  const messages = rateLimitMap.get(key) || [];
  const recent = messages.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  rateLimitMap.set(key, recent);
  return recent.length >= RATE_LIMIT_MAX_MESSAGES;
}

function recordMessageClient(key: string) {
  const now = Date.now();
  const messages = rateLimitMap.get(key) || [];
  rateLimitMap.set(key, [...messages, now]);
}

export function ThreadChatPanel({
  threadId,
  initialMessages,
  currentUser,
  isAdmin = false,
}: ThreadChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const [userName, setUserName] = useState(currentUser?.name || "");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [toast, setToast] = useState<{
    message: string;
    retryAfter?: number;
  } | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const realtimeMessages = useThreadChatRealtime(threadId);

  // Merge realtime messages (filter hidden messages for non-admins)
  useEffect(() => {
    if (realtimeMessages.length > 0) {
      setMessages((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));
        const newMsgs = realtimeMessages
          .filter((m) => !existingIds.has(m.id))
          .filter((m) => isAdmin || !m.hidden); // Filter hidden messages for non-admins
        return [...prev, ...newMsgs].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
    }
  }, [realtimeMessages, isAdmin]);

  // Check rate limit (client-side, server has main check)
  useEffect(() => {
    const key = currentUser?.id || `name:${userName.trim() || "anon"}`;
    setRateLimited(isRateLimitedClient(key));
  }, [threadId, currentUser, userName]);

  // Auto-scroll to bottom when new messages arrive (but preserve position when loading older messages)
  useEffect(() => {
    if (scrollContainerRef.current && !isLoadingMore) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages.length, isLoadingMore]);

  // Infinite scroll up - load older messages when scrolling near top
  const handleScroll = useCallback(async () => {
    const container = scrollContainerRef.current;
    if (!container || isLoadingMore || !hasMore) return;

    // Load more when scrolled within 100px of top
    if (container.scrollTop < 100) {
      setIsLoadingMore(true);
      const oldestMessage = messages[0];
      if (!oldestMessage) {
        setIsLoadingMore(false);
        return;
      }

      // Store current scroll position
      const previousScrollHeight = container.scrollHeight;

      try {
        const response = await fetch(
          `/api/rooms/thread/${threadId}/chat-messages?beforeId=${encodeURIComponent(oldestMessage.id)}&limit=20&isAdmin=${isAdmin ? "1" : "0"}`
        );
        const data = await response.json();

        if (data.messages && data.messages.length > 0) {
          setMessages((prev) => [...data.messages, ...prev]);
          setHasMore(data.hasMore);

          // Restore scroll position after new content loads
          setTimeout(() => {
            if (container) {
              const newScrollHeight = container.scrollHeight;
              const heightDiff = newScrollHeight - previousScrollHeight;
              container.scrollTop = heightDiff;
            }
          }, 0);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Failed to load older messages:", error);
      } finally {
        setIsLoadingMore(false);
      }
    }
  }, [threadId, messages, isLoadingMore, hasMore, isAdmin]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const content = input.trim();
      if (
        !content ||
        content.length === 0 ||
        content.length > MAX_CHARS ||
        isSending ||
        rateLimited
      ) {
        return;
      }

      const authorName = userName.trim() || currentUser?.name || "Anon";
      const tempId = `temp-${Date.now()}`;
      const optimisticMessage: ChatMessage = {
        id: tempId,
        threadId,
        authorId: currentUser?.id || null,
        authorName,
        content,
        createdAt: new Date().toISOString(),
      };

      // Optimistic update
      setMessages((prev) => [...prev, optimisticMessage]);
      setInput("");
      setIsSending(true);
      const rateLimitKey = currentUser?.id || `name:${authorName}`;
      recordMessageClient(rateLimitKey);

      try {
        console.log("📤 Calling sendChatMessage server action...", {
          threadId,
          content: content.substring(0, 50),
          authorName,
        });

        const result = await sendChatMessage(
          threadId,
          content,
          authorName,
          currentUser?.id
        );

        console.log("✅ Server action completed successfully:", {
          messageId: result.message.id,
          mentions: result.mentions,
        });

        // Success - replace optimistic message with real message from server
        const realMessage: ChatMessage = {
          id: result.message.id,
          threadId: result.message.threadId,
          authorId: currentUser?.id || null,
          authorName: result.message.authorName,
          content: result.message.content,
          hidden: false,
          createdAt: result.message.createdAt.toISOString
            ? result.message.createdAt.toISOString()
            : new Date(result.message.createdAt).toISOString(),
        };

        // Replace optimistic with real message
        setMessages((prev) =>
          prev.map((m) => (m.id === tempId ? realMessage : m))
        );

        console.log("✅ Replaced optimistic message with real message");
      } catch (error) {
        console.error("❌ Server action failed:", error);

        // Remove optimistic message on error (message not persisted)
        setMessages((prev) => prev.filter((m) => m.id !== tempId));

        if (error instanceof RateLimitError) {
          // Show rate limit toast
          setToast({
            message: error.message,
            retryAfter: error.retryAfter,
          });
          // Auto-dismiss toast after 5 seconds
          setTimeout(() => setToast(null), 5000);
        } else {
          console.error("Failed to send message:", error);
          setToast({
            message:
              error instanceof Error ? error.message : "Failed to send message",
          });
          setTimeout(() => setToast(null), 5000);
        }
      } finally {
        setIsSending(false);
        inputRef.current?.focus();
      }
    },
    [input, userName, currentUser, isSending, rateLimited, threadId]
  );

  const charCount = input.length;
  const canSend =
    charCount > 0 && charCount <= MAX_CHARS && !isSending && !rateLimited;

  return (
    <div className="flex flex-col h-[600px] rounded-2xl ring-1 ring-white/10 bg-slate-900/40 relative">
      {/* Toast notification */}
      {toast && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-3 bg-amber-900/90 text-amber-100 rounded-lg shadow-lg ring-1 ring-amber-400/30 max-w-sm">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium">{toast.message}</p>
              {toast.retryAfter && (
                <p className="text-xs text-amber-300 mt-0.5">
                  Try again in {toast.retryAfter} second
                  {toast.retryAfter !== 1 ? "s" : ""}
                </p>
              )}
            </div>
            <button
              onClick={() => setToast(null)}
              className="ml-2 text-amber-300 hover:text-amber-100"
              aria-label="Dismiss"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Header with presence */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h3 className="text-lg font-semibold">Live Chat</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Active</span>
          {/* Placeholder presence avatars */}
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-emerald-500/20 ring-2 ring-slate-900 border border-emerald-400/30"
                aria-label={`User ${i}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Messages list */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
        aria-label="Chat messages"
      >
        {isLoadingMore && (
          <div className="flex items-center justify-center py-2 text-slate-400 text-sm">
            <span>Loading older messages...</span>
          </div>
        )}
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-400">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="flex gap-3 group"
              role="article"
              aria-label={`Message from ${msg.authorName ?? "Anonymous"}`}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-300">
                {(msg.authorName ?? "A")[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-medium text-slate-200">
                      {msg.authorName ?? "Anonymous"}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {isAdmin && msg.hidden && (
                      <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/30">
                        Hidden
                      </span>
                    )}
                  </div>
                  <ChatMessageKebab
                    messageId={msg.id}
                    isAdmin={isAdmin}
                    hidden={msg.hidden ?? false}
                  />
                </div>
                <p className="mt-1 text-sm text-slate-300 whitespace-pre-wrap break-words">
                  {msg.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Composer */}
      <div
        className="p-4 border-t border-white/10"
        role="complementary"
        aria-label="Chat composer"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-2"
          aria-label="Send message form"
        >
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full rounded-lg bg-slate-900/60 ring-1 ring-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            aria-label="Your name (optional)"
            aria-describedby="name-input-description"
            disabled={!!currentUser}
          />
          {!currentUser && (
            <span id="name-input-description" className="sr-only">
              Enter your name to identify yourself in chat messages
            </span>
          )}
          <div className="relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              rows={3}
              maxLength={MAX_CHARS}
              className="w-full rounded-lg bg-slate-900/60 ring-1 ring-white/10 px-3 py-2 text-sm resize-none pr-16 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              aria-label="Message input"
              aria-describedby="char-counter message-input-description"
              aria-required="true"
              disabled={isSending || rateLimited}
            />
            <span id="message-input-description" className="sr-only">
              Enter your message. Maximum {MAX_CHARS} characters.
            </span>
            <div
              id="char-counter"
              className={`absolute bottom-2 right-2 text-xs ${
                charCount > MAX_CHARS ? "text-red-400" : "text-slate-400"
              }`}
              aria-live="polite"
              aria-atomic="true"
            >
              {charCount}/{MAX_CHARS}
            </div>
          </div>
          <button
            type="submit"
            disabled={!canSend}
            className="w-full rounded-lg px-4 py-2 text-sm font-medium bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/30 hover:bg-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            aria-label={
              rateLimited
                ? "Rate limited, please wait"
                : isSending
                  ? "Sending message..."
                  : "Send message"
            }
            aria-disabled={!canSend}
          >
            {rateLimited
              ? "Rate limited (try again in a moment)"
              : isSending
                ? "Sending..."
                : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
