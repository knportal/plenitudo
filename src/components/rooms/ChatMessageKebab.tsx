/**
 * Kebab menu for chat messages (admin-only).
 * Allows promoting chat messages to Posts.
 */
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { promoteChatToPost } from "@/server/rooms/promoteActions";
import { toggleMessageHidden } from "@/server/rooms/moderateActions";

interface ChatMessageKebabProps {
  messageId: string;
  isAdmin: boolean;
  hidden?: boolean;
}

export function ChatMessageKebab({
  messageId,
  isAdmin,
  hidden = false,
}: ChatMessageKebabProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPromoting, setIsPromoting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!isAdmin) return null;

  const handlePromote = async () => {
    setIsPromoting(true);
    try {
      await promoteChatToPost(messageId, "Moderator");
      setIsOpen(false);
      // Refresh the Posts section by revalidating the route
      router.refresh();
    } catch (error) {
      console.error("Failed to promote message:", error);
      alert(error instanceof Error ? error.message : "Failed to promote message");
    } finally {
      setIsPromoting(false);
    }
  };

  const handleToggleHidden = async () => {
    setIsToggling(true);
    try {
      await toggleMessageHidden(messageId, !hidden);
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to toggle hidden status:", error);
      alert(error instanceof Error ? error.message : "Failed to toggle hidden status");
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-slate-700/50"
        aria-label="Message options"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg
          className="w-4 h-4 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-6 z-10 w-48 rounded-lg bg-slate-800 ring-1 ring-white/10 shadow-lg overflow-hidden">
          <button
            type="button"
            onClick={handlePromote}
            disabled={isPromoting || isToggling}
            className="w-full px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Promote to Post"
          >
            {isPromoting ? "Promoting..." : "Promote to Post"}
          </button>
          <button
            type="button"
            onClick={handleToggleHidden}
            disabled={isPromoting || isToggling}
            className="w-full px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed border-t border-white/10"
            aria-label={hidden ? "Unhide message" : "Hide message"}
          >
            {isToggling ? "Toggling..." : hidden ? "Unhide message" : "Hide message"}
          </button>
        </div>
      )}
    </div>
  );
}

