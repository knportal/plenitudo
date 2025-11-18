/**
 * Server actions for moderating chat messages.
 * Hide/unhide messages (admin only).
 */
"use server";

import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ToggleHiddenSchema = z.object({
  messageId: z.string().min(1),
  hidden: z.boolean(),
});

/**
 * Toggle hidden status of a chat message.
 * Admin only - checks IS_ADMIN env var.
 */
export async function toggleMessageHidden(messageId: string, hidden: boolean) {
  // Check if user is admin/moderator
  const isAdmin = process.env["IS_ADMIN"] === "1";
  if (!isAdmin) {
    throw new Error("Unauthorized: Admin access required");
  }

  const validated = ToggleHiddenSchema.parse({
    messageId,
    hidden,
  });

  // Check if message exists first
  console.log(
    "🔍 Attempting to toggle hidden for message ID:",
    validated.messageId
  );

  const existingMessage = await prisma.chatMessage.findUnique({
    where: { id: validated.messageId },
    select: { id: true, content: true },
  });

  if (!existingMessage) {
    console.error(
      "❌ Chat message not found in database. Message ID:",
      validated.messageId
    );
    throw new Error(
      `Chat message not found. ID: ${validated.messageId}. Try refreshing and using a different message.`
    );
  }

  console.log(
    "✅ Found message:",
    existingMessage.id,
    existingMessage.content.substring(0, 50)
  );

  // Update message
  const message = await prisma.chatMessage.update({
    where: { id: validated.messageId },
    data: { hidden: validated.hidden },
    select: {
      thread: {
        select: {
          id: true,
          room: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  });

  // Revalidate thread page
  if (message.thread?.room?.slug) {
    revalidatePath(
      `/rooms/${message.thread.room.slug}/thread/${message.thread.id}`
    );
  }

  return { success: true };
}
