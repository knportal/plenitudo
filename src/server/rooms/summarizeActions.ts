/**
 * Server actions for summarizing chat messages into Posts.
 */
"use server";

import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { summarizeChat } from "./summarizeChat";
import { sendSummaryEmail } from "@/server/notifications/email";
import { indexDocuments } from "@/server/search/index";
import type { PostSearchDoc } from "@/server/search/types";

const SummarizeRecentChatSchema = z.object({
  threadId: z.string().min(1),
  minutes: z.coerce.number().int().min(1).max(1440).default(60), // Max 24 hours
});

/**
 * Summarize recent chat messages into a pinned Post.
 *
 * Fetches ChatMessages from the last N minutes, summarizes them,
 * and creates a pinned Post with the summary.
 *
 * @param threadId Thread ID to summarize
 * @param minutes Number of minutes to look back (default: 60)
 * @returns ID of the created Post
 */
export async function summarizeRecentChat(
  threadId: string,
  minutes: number = 60
) {
  // Check if user is admin/moderator
  const isAdmin = process.env["IS_ADMIN"] === "1";
  if (!isAdmin) {
    throw new Error("Unauthorized: Admin access required");
  }

  const validated = SummarizeRecentChatSchema.parse({
    threadId,
    minutes,
  });

  // Calculate cutoff time
  const cutoffTime = new Date();
  cutoffTime.setMinutes(cutoffTime.getMinutes() - validated.minutes);

  // Fetch recent chat messages (not hidden)
  const messages = await prisma.chatMessage.findMany({
    where: {
      threadId: validated.threadId,
      createdAt: { gte: cutoffTime },
      hidden: false, // Don't summarize hidden messages
    },
    select: {
      authorName: true,
      content: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  if (messages.length === 0) {
    throw new Error(
      `No messages found in the last ${validated.minutes} minutes`
    );
  }

  // Chunk messages if needed (for future LLM integration)
  // const chunks = chunkMessages(messages, 4000); // Reserved for future LLM integration

  // Summarize each chunk (for now, just summarize all at once)
  // TODO: When using LLM, summarize each chunk and combine
  const summary = summarizeChat(messages);

  // Format timestamp for title (HH:MM, TZ)
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  const title = `Chat Summary (${timeStr})`;

  // Get thread info for revalidation and email
  const thread = await prisma.thread.findUnique({
    where: { id: validated.threadId },
    select: {
      title: true,
      room: {
        select: {
          slug: true,
        },
      },
    },
  });

  // Create pinned Post with summary (include title in content)
  const post = await prisma.post.create({
    data: {
      threadId: validated.threadId,
      content: `## ${title}\n\n${summary}`,
      authorName: "System",
      pinned: true,
      updatedAt: new Date(),
    },
  });

  // Index summary Post for search (fire and forget - don't block)
  if (thread?.room?.slug) {
    const searchDoc: PostSearchDoc = {
      id: post.id,
      type: "post",
      content: post.content,
      ...(post.authorName ? { authorName: post.authorName } : {}),
      createdAt: post.createdAt.toISOString(),
      threadId: validated.threadId,
      threadTitle: thread.title,
      roomSlug: thread.room.slug,
      pinned: true,
    };

    indexDocuments([searchDoc]).catch((error) => {
      console.error("Failed to index summary post for search:", error);
    });
  }

  // Revalidate thread page
  if (thread?.room?.slug) {
    revalidatePath(`/rooms/${thread.room.slug}/thread/${validated.threadId}`);
  }

  // Send summary notification emails to thread participants
  // TODO: In production, fetch actual user emails from participants
  // For now, stub: log intended emails
  if (thread?.room?.slug) {
    const threadUrl = `https://yourdomain.com/rooms/${thread.room.slug}/thread/${validated.threadId}`;

    // Get unique participants from recent messages
    const participants = Array.from(
      new Set(messages.map((m) => m.authorName).filter(Boolean))
    );

    // Stub: In production, fetch user emails from User table
    // For now, construct email from username (placeholder)
    for (const participantName of participants) {
      if (!participantName) continue;

      // TODO: Replace with actual user email lookup:
      // const user = await prisma.user.findUnique({ where: { name: participantName } });
      // if (user?.email) {
      //   await sendSummaryEmail(...);
      // }

      const userEmail = `${participantName.toLowerCase().replace(/\s+/g, ".")}@example.com`; // Placeholder

      // Fire and forget - don't await to avoid blocking
      sendSummaryEmail(
        userEmail,
        participantName,
        thread.title || "Thread",
        threadUrl,
        summary
      ).catch((error) => {
        console.error(
          `Failed to send summary email to ${participantName}:`,
          error
        );
      });
    }
  }

  return post.id;
}
