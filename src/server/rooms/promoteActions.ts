/**
 * Server actions for moderating chat messages.
 * Promotes ChatMessage to Post (long-form reply).
 */
"use server";

import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const PromoteSchema = z.object({
  messageId: z.string().min(1),
  moderatorName: z.string().min(1).max(100),
});

/**
 * Promotes a ChatMessage to a Post (long-form reply).
 * Adds attribution header noting the promotion.
 */
export async function promoteChatToPost(
  messageId: string,
  moderatorName: string
) {
  // Check if user is admin/moderator
  const isAdmin = process.env["IS_ADMIN"] === "1";
  if (!isAdmin) {
    throw new Error("Unauthorized: Admin access required");
  }

  const validated = PromoteSchema.parse({
    messageId,
    moderatorName: moderatorName.trim(),
  });

  // Load the chat message
  console.log("🔍 Attempting to promote message with ID:", validated.messageId);

  const chatMessage = await prisma.chatMessage.findUnique({
    where: { id: validated.messageId },
    select: {
      id: true,
      threadId: true,
      content: true,
      authorName: true,
      createdAt: true,
      Thread: {
        select: {
          Room: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  });

  if (!chatMessage) {
    console.error(
      "❌ Chat message not found in database. Message ID:",
      validated.messageId
    );
    console.error(
      "This usually means the message was shown optimistically but never saved."
    );
    throw new Error(
      `Chat message not found. ID: ${validated.messageId}. Try refreshing the page and using an older message.`
    );
  }

  console.log(
    "✅ Found chat message:",
    chatMessage.id,
    chatMessage.content.substring(0, 50)
  );

  // Format promotion header
  const promotionDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const header = `Promoted from chat by @${validated.moderatorName} on ${promotionDate}`;
  const promotedContent = `${header}\n\n${chatMessage.content}`;

  // Create Post from ChatMessage
  const post = await prisma.post.create({
    data: {
      threadId: chatMessage.threadId,
      content: promotedContent,
      authorName: chatMessage.authorName,
      updatedAt: new Date(),
    },
  });

  // Revalidate thread page to refresh Posts section
  if (chatMessage.Thread?.Room?.slug) {
    revalidatePath(
      `/rooms/${chatMessage.Thread.Room.slug}/thread/${chatMessage.threadId}`
    );
  }

  return { postId: post.id };
}
