/**
 * Server actions for ChatMessage operations.
 * Rate limiting: 2 msgs/sec per user per thread; 60 msgs/5min per user site-wide.
 */
"use server";

import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { checkAndConsume } from "@/server/rate-limit";
import { RateLimitError } from "./rateLimitError";
import { filterMessage } from "./contentFilter";
import { parseMentions } from "./parseMentions";
import { sendMentionEmail } from "@/server/notifications/email";

// Rate limit configuration
const RATE_LIMIT_PER_THREAD = { limit: 2, windowSec: 1 }; // 2 messages per second
const RATE_LIMIT_SITE_WIDE = { limit: 60, windowSec: 300 }; // 60 messages per 5 minutes

const SendChatMessageSchema = z.object({
  threadId: z.string().min(1),
  content: z.string().min(1).max(500).trim(),
  authorName: z.string().min(1).max(100),
  authorId: z.string().optional(),
});

const ListChatMessagesSchema = z.object({
  threadId: z.string().min(1),
  beforeId: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(50).default(50),
});

/**
 * Send a chat message to a thread.
 * Validates content length, filters bad words, and enforces rate limiting.
 * Returns the created message and list of mentioned usernames.
 */
export async function sendChatMessage(
  threadId: string,
  content: string,
  authorName: string,
  authorId?: string
): Promise<{
  message: {
    id: string;
    threadId: string;
    authorName: string;
    content: string;
    createdAt: Date;
  };
  mentions: string[];
}> {
  const validated = SendChatMessageSchema.parse({
    threadId,
    content: content.trim(),
    authorName: authorName.trim(),
    authorId,
  });

  // Content filtering
  const filterResult = filterMessage(validated.content);
  if (!filterResult.ok) {
    throw new Error(filterResult.reason || "Message was filtered");
  }

  // Build rate limit keys
  const userKey = validated.authorId || `name:${validated.authorName}`;
  const threadKey = `thread:${validated.threadId}:${userKey}`;
  const siteKey = `site:${userKey}`;

  // Check per-thread rate limit (2 messages/second)
  const threadLimit = await checkAndConsume(
    threadKey,
    RATE_LIMIT_PER_THREAD.limit,
    RATE_LIMIT_PER_THREAD.windowSec
  );

  if (!threadLimit.allowed) {
    throw new RateLimitError(
      threadLimit.retryAfter || RATE_LIMIT_PER_THREAD.windowSec,
      "Too many messages. Please slow down."
    );
  }

  // Check site-wide rate limit (60 messages/5 minutes)
  const siteLimit = await checkAndConsume(
    siteKey,
    RATE_LIMIT_SITE_WIDE.limit,
    RATE_LIMIT_SITE_WIDE.windowSec
  );

  if (!siteLimit.allowed) {
    throw new RateLimitError(
      siteLimit.retryAfter || RATE_LIMIT_SITE_WIDE.windowSec,
      "You've sent too many messages site-wide. Please slow down."
    );
  }

  // Create message (only if rate limits passed)
  console.log("💾 Creating chat message:", {
    threadId: validated.threadId,
    authorName: validated.authorName,
    contentLength: validated.content.length,
  });

  const message = await prisma.chatMessage.create({
    data: {
      threadId: validated.threadId,
      content: validated.content,
      authorName: validated.authorName,
      authorId: validated.authorId || null,
      hidden: false,
    },
  });

  console.log("✅ Chat message created successfully:", {
    id: message.id,
    threadId: message.threadId,
    createdAt: message.createdAt,
  });

  // Parse mentions from message content
  const mentions = parseMentions(validated.content);

  // Get thread info for email notifications and revalidation
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

  // Send mention emails (fire and forget - don't block on email)
  if (mentions.length > 0 && thread) {
    // TODO: In production, look up user emails from database using mentions
    // For now, stub: log intended emails
    const threadUrl = thread.room?.slug
      ? `https://yourdomain.com/rooms/${thread.room.slug}/thread/${validated.threadId}`
      : "#";

    // Stub: In production, fetch user emails from User table
    // For now, construct email from username (placeholder)
    for (const username of mentions) {
      // TODO: Replace with actual user email lookup:
      // const user = await prisma.user.findUnique({ where: { username } });
      // if (user?.email) {
      //   await sendMentionEmail(...);
      // }

      const userEmail = `${username}@example.com`; // Placeholder

      // Fire and forget - don't await to avoid blocking
      sendMentionEmail(
        userEmail,
        username,
        validated.authorName,
        validated.content,
        thread.title,
        threadUrl
      ).catch((error) => {
        console.error(`Failed to send mention email to ${username}:`, error);
      });
    }
  }

  // Revalidate thread page
  if (thread?.room?.slug) {
    revalidatePath(`/rooms/${thread.room.slug}/thread/${validated.threadId}`);
  }

  return { message, mentions };
}

/**
 * List chat messages for a thread with pagination.
 * Returns messages ordered by createdAt desc (newest first for stable sort in UI).
 * Filters out hidden messages for non-admin users.
 */
export async function listChatMessages(
  threadId: string,
  beforeId?: string,
  limit: number = 50,
  isAdmin: boolean = false
) {
  const validated = ListChatMessagesSchema.parse({
    threadId,
    beforeId,
    limit,
  });

  // Build where clause - filter hidden messages for non-admins
  const whereClause: {
    threadId: string;
    createdAt?: { lt: Date };
    hidden?: boolean;
  } = {
    threadId: validated.threadId,
  };

  if (!isAdmin) {
    whereClause.hidden = false;
  }

  if (validated.beforeId) {
    // Get the createdAt of the message before which we want to fetch
    const beforeMessage = await prisma.chatMessage.findUnique({
      where: { id: validated.beforeId },
      select: { createdAt: true },
    });

    if (beforeMessage) {
      // Fetch messages older than beforeMessage
      const messages = await prisma.chatMessage.findMany({
        where: {
          ...whereClause,
          createdAt: { lt: beforeMessage.createdAt },
        },
        select: {
          id: true,
          threadId: true,
          authorId: true,
          authorName: true,
          content: true,
          hidden: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        take: validated.limit,
      });

      // Return in reverse order (oldest first) for UI
      return messages.reverse();
    }
  }

  // Initial load: get most recent messages
  const messages = await prisma.chatMessage.findMany({
    where: whereClause,
    select: {
      id: true,
      threadId: true,
      authorId: true,
      authorName: true,
      content: true,
      hidden: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: validated.limit,
  });

  // Return in reverse order (oldest first) for UI
  return messages.reverse();
}
