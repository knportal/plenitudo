/**
 * Create a daily discussion thread for AI Daily.
 * Runs after AI Daily rebuild to generate a thread with curated items.
 */

import { prisma } from "@/server/db";
import { toETDateISO } from "./text";
import { indexDocuments } from "@/server/search/index";
import type { ThreadSearchDoc } from "@/server/search/types";

interface DailyItem {
  title: string;
  summary: string;
  bullets: string; // JSON string
  sources: string; // JSON string
  genre: string;
  mood: string;
}

/**
 * Ensure the "AI Daily" room exists.
 * Creates it if not found.
 */
async function ensureAIDailyRoom() {
  const slug = "ai-daily";
  let room = await prisma.room.findUnique({
    where: { slug },
  });

  if (!room) {
    room = await prisma.room.create({
      data: {
        slug,
        title: "AI Daily",
        description:
          "Daily curated AI news and breakthroughs. Discuss cross-verified updates from 18+ trusted sources.",
        updatedAt: new Date(),
      },
    });
    console.log("✅ Created AI Daily room:", room.id);
  }

  return room;
}

/**
 * Find or create today's AI Daily discussion thread.
 * Returns existing thread if already created for today.
 */
export async function createDailyThread(): Promise<string> {
  // Ensure AI Daily room exists
  const room = await ensureAIDailyRoom();

  // Get today's date in ET timezone
  const dateISO = toETDateISO();
  const threadTitle = `AI Daily — ${dateISO}`;

  // Check if thread already exists for today
  let thread = await prisma.thread.findFirst({
    where: {
      roomId: room.id,
      title: threadTitle,
    },
    select: { id: true },
  });

  if (thread) {
    console.log(`✅ Daily thread already exists: ${thread.id}`);
    return thread.id;
  }

  // Fetch today's AI Daily items
  const rows = await prisma.aIDailyItem.findMany({
    where: { dateISO },
    orderBy: { score: "desc" },
    take: 10,
  });

  if (rows.length === 0) {
    console.warn(
      "⚠️  No AI Daily items found for today, skipping thread creation"
    );
    throw new Error("No AI Daily items found for today");
  }

  // Convert to DailyItem format
  const items = rows.map(
    (r): DailyItem => ({
      title: r.title,
      summary: r.summary,
      bullets:
        typeof r.bullets === "string" ? r.bullets : JSON.stringify(r.bullets),
      sources:
        typeof r.sources === "string" ? r.sources : JSON.stringify(r.sources),
      genre: r.genre,
      mood: r.mood,
    })
  );

  // Format thread content with curated items
  const threadContent = formatThreadContent(items, dateISO);

  // Create thread
  thread = await prisma.thread.create({
    data: {
      roomId: room.id,
      title: threadTitle,
      content: threadContent,
      authorName: "AI Daily Bot",
    },
  });

  console.log(`✅ Created daily thread: ${thread.id}`);

  // Index thread for search
  const threadSearchDoc: ThreadSearchDoc = {
    id: thread.id,
    type: "thread",
    title: threadTitle,
    content: threadContent,
    authorName: "AI Daily Bot",
    createdAt: new Date().toISOString(),
    threadId: thread.id,
    roomSlug: room.slug,
    roomTitle: room.title,
  };

  indexDocuments([threadSearchDoc]).catch((error) => {
    console.error("Failed to index daily thread for search:", error);
  });

  return thread.id;
}

/**
 * Format thread content with today's curated items.
 * Creates a nice markdown summary of the day's AI news.
 */
function formatThreadContent(items: DailyItem[], dateISO: string): string {
  const lines: string[] = [];

  lines.push(`📰 AI DAILY BREAKTHROUGHS — ${dateISO}`);
  lines.push(
    `Welcome to today's discussion! Here are ${items.length} cross-verified AI news items from 43 trusted sources.`
  );
  lines.push("━".repeat(60));

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.title.toUpperCase()}`);
    lines.push(`Category: ${item.genre} • Sentiment: ${item.mood}`);
    lines.push(item.summary);

    try {
      const bullets = JSON.parse(item.bullets) as string[];
      if (bullets.length > 0) {
        bullets.forEach((bullet) => {
          lines.push(`- ${bullet}`);
        });
      }
    } catch {
      // Skip if bullets can't be parsed
    }

    try {
      const sources = JSON.parse(item.sources) as Array<{
        publisher: string;
        url: string;
        title?: string;
      }>;
      if (sources.length > 0) {
        lines.push(`📚 Read the full story:`);
        sources.slice(0, 3).forEach((source, idx) => {
          lines.push(`   ${idx + 1}. [${source.publisher}](${source.url})`);
        });
      }
    } catch {
      // Skip if sources can't be parsed
    }

    lines.push("━".repeat(60));
  });

  lines.push(
    "💬 Join the discussion! Share your thoughts, insights, or questions about today's AI breakthroughs."
  );

  return lines.join("\n");
}

/**
 * Get or create today's AI Daily thread ID.
 * Safe to call multiple times - returns existing thread if already created.
 */
export async function getTodayThreadId(): Promise<string | null> {
  const room = await prisma.room.findUnique({
    where: { slug: "ai-daily" },
    select: { id: true },
  });

  if (!room) {
    return null;
  }

  const dateISO = toETDateISO();
  const threadTitle = `AI Daily — ${dateISO}`;

  const thread = await prisma.thread.findFirst({
    where: {
      roomId: room.id,
      title: threadTitle,
    },
    select: { id: true },
  });

  return thread?.id || null;
}
