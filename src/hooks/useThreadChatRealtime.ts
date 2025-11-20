/**
 * Hook to subscribe to ChatMessage changes for a thread via Supabase Realtime.
 * Automatically unsubscribes on unmount or threadId change.
 */
"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/server/realtime/supabase";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

export interface ChatMessage {
  id: string;
  threadId: string;
  authorId: string | null;
  authorName: string;
  content: string;
  hidden?: boolean;
  createdAt: string;
}

type SupabaseChannel = ReturnType<NonNullable<typeof supabase>["channel"]>;

export function useThreadChatRealtime(threadId: string): ChatMessage[] {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const channelRef = useRef<SupabaseChannel | null>(null);

  useEffect(() => {
    if (!threadId || !supabase) return;

    // Cleanup previous subscription
    if (channelRef.current) {
      channelRef.current.unsubscribe();
    }

    // Create new channel subscription
    const channel = supabase
      .channel(`thread:${threadId}`)
      .on<ChatMessage>(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "ChatMessage",
          filter: `threadId=eq.${threadId}`,
        },
        (payload: RealtimePostgresChangesPayload<ChatMessage>) => {
          if (payload.new) {
            const newMsg = payload.new as ChatMessage;
            setMessages((prev) => {
              // Prevent duplicates
              if (prev.some((m) => m.id === newMsg.id)) {
                return prev;
              }
              return [...prev, newMsg];
            });
          }
        }
      )
      .subscribe();

    channelRef.current = channel;

    // Cleanup on unmount
    return () => {
      channel?.unsubscribe();
      channelRef.current = null;
    };
  }, [threadId]);

  return messages;
}

