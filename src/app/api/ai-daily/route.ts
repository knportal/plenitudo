import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { toETDateISO } from "@/server/aiDaily/text";
import { getTodayThreadId } from "@/server/aiDaily/createDailyThread";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const today = toETDateISO();
    console.log("API: Looking for dateISO:", today);

    const rows = await prisma.aIDailyItem.findMany({
      where: { dateISO: today },
      orderBy: { score: "desc" },
      take: 10,
    });

    console.log("API: Found rows:", rows.length);
    // shape into DTO
    const items = rows.map((r) => ({
      id: r.id,
      dateISO: r.dateISO,
      genre: r.genre,
      mood: r.mood,
      title: r.title,
      summary: r.summary,
      bullets:
        typeof r.bullets === "string" ? JSON.parse(r.bullets) : r.bullets,
      sources:
        typeof r.sources === "string" ? JSON.parse(r.sources) : r.sources,
      score: r.score,
    }));

    // Get today's discussion thread ID (don't fail if this errors)
    let threadId: string | null = null;
    try {
      threadId = await getTodayThreadId();
    } catch (error) {
      console.error("API: Error getting thread ID:", error);
      // Continue without thread ID
    }

    return NextResponse.json({
      items,
      threadId,
      discussUrl: threadId ? `/rooms/ai-daily/thread/${threadId}` : null,
    });
  } catch (error: unknown) {
    console.error("API: Error in /api/ai-daily:", error);
    // Return 200 with empty items so useSWR doesn't treat it as an error
    // The component will show "No AI breakthroughs today" message
    return NextResponse.json({
      items: [],
      threadId: null,
      discussUrl: null,
    });
  }
}
