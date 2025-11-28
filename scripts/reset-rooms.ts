/**
 * Reset rooms to seed data state.
 * IMPORTANT: Backs up all data before resetting!
 *
 * Run with: npm run reset:rooms
 *
 * Backup file saved to: backups/rooms-backup-[timestamp].json
 * To restore: npm run restore:rooms backups/rooms-backup-[timestamp].json
 */

import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("🗑️  Resetting rooms to default state...\n");

  // Step 1: Backup existing data
  console.log("💾 Backing up existing data...");

  const backup = {
    timestamp: new Date().toISOString(),
    rooms: await prisma.room.findMany({
      include: {
        Thread: {
          include: {
            Post: true,
            ChatMessage: true,
          },
        },
      },
    }),
  };

  // Create backups directory if it doesn't exist
  const backupDir = path.join(process.cwd(), "backups");
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // Save backup with timestamp
  const timestamp = new Date().toISOString().replace(/:/g, "-").split(".")[0];
  const backupFile = path.join(backupDir, `rooms-backup-${timestamp}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2));

  console.log(`✅ Backup saved: ${backupFile}`);
  console.log(`   Rooms: ${backup.rooms.length}`);
  console.log(
    `   Threads: ${backup.rooms.reduce((sum: number, r: any) => sum + r.Thread.length, 0)}`
  );
  console.log(
    `   Posts: ${backup.rooms.reduce((sum: number, r: any) => sum + r.Thread.reduce((s: number, t: any) => s + t.Post.length, 0), 0)}`
  );
  console.log(
    `   Messages: ${backup.rooms.reduce((sum: number, r: any) => sum + r.Thread.reduce((s: number, t: any) => s + t.ChatMessage.length, 0), 0)}`
  );
  console.log("");

  // Step 2: Delete all data
  console.log("🗑️  Deleting existing data...");

  // Delete all chat messages
  const chatMessages = await prisma.chatMessage.deleteMany({});
  console.log(`✅ Deleted ${chatMessages.count} chat messages`);

  // Delete all posts
  const posts = await prisma.post.deleteMany({});
  console.log(`✅ Deleted ${posts.count} posts`);

  // Delete all threads
  const threads = await prisma.thread.deleteMany({});
  console.log(`✅ Deleted ${threads.count} threads`);

  // Delete all rooms
  const rooms = await prisma.room.deleteMany({});
  console.log(`✅ Deleted ${rooms.count} rooms`);

  console.log("\n🌱 Re-seeding with default data...\n");

  // Re-seed rooms
  const aiRoom = await prisma.room.create({
    data: {
      slug: "ai",
      title: "AI",
      description: "Latest breakthroughs, tools, and prompts to build with.",
      updatedAt: new Date(),
    },
  });

  const mindfulnessRoom = await prisma.room.create({
    data: {
      slug: "mindfulness",
      title: "Mindfulness",
      description: "Guided reflections, breathing, and gratitude threads.",
      updatedAt: new Date(),
    },
  });

  const entrepreneurshipRoom = await prisma.room.create({
    data: {
      slug: "entrepreneurship",
      title: "Entrepreneurship",
      description: "Idea validation, small bets, funding leads, collabs.",
      updatedAt: new Date(),
    },
  });

  console.log(
    `✅ Created ${[aiRoom, mindfulnessRoom, entrepreneurshipRoom].length} rooms`
  );

  // Create starter thread for AI room
  const aiThread = await prisma.thread.create({
    data: {
      roomId: aiRoom.id,
      title: "AI Starter Thread",
      content:
        "Welcome to the AI room! Share one insight or question to kick things off.",
      authorName: "System",
    },
  });

  console.log(`✅ Created starter thread: ${aiThread.title}`);

  // Add seed chat messages
  await prisma.chatMessage.createMany({
    data: [
      {
        threadId: aiThread.id,
        authorName: "Alex",
        content: "Hey everyone! Excited to be here. 👋",
      },
      {
        threadId: aiThread.id,
        authorName: "Jordan",
        content: "Welcome! Looking forward to the discussion.",
      },
      {
        threadId: aiThread.id,
        authorName: "Sam",
        content: "This is a great space to share ideas.",
      },
    ],
  });

  console.log(`✅ Created 3 seed chat messages`);

  console.log("\n✨ Reset complete! Rooms back to default state.");
  console.log(`\n💾 Backup saved to: ${backupFile}`);
  console.log("   To restore this backup, run:");
  console.log(`   npm run restore:rooms ${backupFile}\n`);
}

main()
  .catch((e) => {
    console.error("❌ Error during reset:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
