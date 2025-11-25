/**
 * Restore rooms from a backup file.
 *
 * Run with: npm run restore:rooms backups/rooms-backup-[timestamp].json
 */

import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const backupFile = process.argv[2];

  if (!backupFile) {
    console.error("❌ Usage: npm run restore:rooms <backup-file>");
    console.error(
      "   Example: npm run restore:rooms backups/rooms-backup-2025-11-01T12-00-00.json"
    );
    process.exit(1);
  }

  if (!fs.existsSync(backupFile)) {
    console.error(`❌ Backup file not found: ${backupFile}`);
    process.exit(1);
  }

  console.log(`📦 Restoring from backup: ${backupFile}\n`);

  // Read backup
  const backup = JSON.parse(fs.readFileSync(backupFile, "utf-8"));
  console.log(`Backup created: ${backup.timestamp}`);
  console.log(`Rooms in backup: ${backup.rooms.length}\n`);

  // Warning
  console.log(
    "⚠️  WARNING: This will DELETE all existing data and restore from backup!"
  );
  console.log(
    "   Press Ctrl+C now to cancel, or wait 5 seconds to continue...\n"
  );

  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Delete existing data
  console.log("🗑️  Deleting current data...");
  await prisma.chatMessage.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.thread.deleteMany({});
  await prisma.room.deleteMany({});
  console.log("✅ Deleted existing data\n");

  // Restore rooms
  console.log("📥 Restoring data...");

  for (const room of backup.rooms) {
    // Create room
    const newRoom = await prisma.room.create({
      data: {
        slug: room.slug,
        title: room.title,
        description: room.description,
        updatedAt: new Date(),
      },
    });
    console.log(`✅ Restored room: ${newRoom.title}`);

    // Restore threads
    for (const thread of (room as any).Thread || []) {
      const newThread = await prisma.thread.create({
        data: {
          roomId: newRoom.id,
          title: thread.title,
          content: thread.content,
          authorName: thread.authorName,
          updatedAt: new Date(),
        },
      });

      // Restore posts
      if ((thread as any).Post?.length > 0) {
        await prisma.post.createMany({
          data: (thread as any).Post.map((post: any) => ({
            threadId: newThread.id,
            content: post.content,
            authorName: post.authorName,
            pinned: post.pinned,
            updatedAt: new Date(),
          })),
        });
        console.log(`   ✅ Restored ${(thread as any).Post.length} posts`);
      }

      // Restore chat messages
      if ((thread as any).ChatMessage?.length > 0) {
        await prisma.chatMessage.createMany({
          data: (thread as any).ChatMessage.map((msg: any) => ({
            threadId: newThread.id,
            authorName: msg.authorName,
            authorId: msg.authorId,
            content: msg.content,
            hidden: msg.hidden,
          })),
        });
        console.log(
          `   ✅ Restored ${thread.chatMessages.length} chat messages`
        );
      }

      console.log(`   ✅ Thread: ${thread.title}`);
    }
  }

  console.log("\n✨ Restore complete!\n");
}

main()
  .catch((e) => {
    console.error("❌ Error during restore:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
