/**
 * Test script to verify chat message persistence.
 * Run with: npx tsx scripts/test-chat-persistence.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔍 Testing chat message persistence...\n");

  // Get first thread
  const thread = await prisma.thread.findFirst({
    select: { id: true, title: true },
  });

  if (!thread) {
    console.log("❌ No thread found in database");
    return;
  }

  console.log("✅ Found thread:", thread.id, "-", thread.title);

  // Try to create a test message
  console.log("\n💾 Attempting to create test message...");

  try {
    const msg = await prisma.chatMessage.create({
      data: {
        threadId: thread.id,
        authorName: "TestBot",
        content: "Direct database test - if you see this, persistence works!",
        hidden: false,
      },
    });

    console.log("✅ Message created successfully!");
    console.log("   ID:", msg.id);
    console.log("   Created at:", msg.createdAt);

    // Verify it exists by querying
    console.log("\n🔍 Verifying message exists...");
    const verify = await prisma.chatMessage.findUnique({
      where: { id: msg.id },
      select: { id: true, content: true, authorName: true },
    });

    if (verify) {
      console.log("✅ Message verified in database:");
      console.log("   Content:", verify.content);
      console.log("   Author:", verify.authorName);
    } else {
      console.log("❌ Message not found after creation!");
    }

    // Count total messages in thread
    const count = await prisma.chatMessage.count({
      where: { threadId: thread.id },
    });
    console.log("\n📊 Total messages in thread:", count);

    // Clean up test message
    console.log("\n🧹 Cleaning up test message...");
    await prisma.chatMessage.delete({ where: { id: msg.id } });
    console.log("✅ Test message deleted");

    console.log("\n✅ RESULT: Database persistence is WORKING!");
    console.log("   The issue is likely in the server action or client-side call.");

  } catch (error) {
    console.error("\n❌ RESULT: Database write FAILED!");
    console.error("Error:", error instanceof Error ? error.message : error);

    if (error instanceof Error && error.message.includes("Foreign key")) {
      console.log("\n💡 TIP: Thread might not exist. Check thread ID.");
    }
  }
}

main()
  .catch((e) => {
    console.error("Fatal error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());


