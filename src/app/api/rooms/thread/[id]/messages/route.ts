/**
 * API endpoint for fetching paginated chat messages (Posts) for a thread.
 * Used for infinite scroll up pagination.
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { z } from "zod";

const QuerySchema = z.object({
  before: z.string().datetime().optional(), // ISO timestamp of oldest message to fetch
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const threadId = params.id;
    const searchParams = request.nextUrl.searchParams;

    const query = QuerySchema.parse({
      before: searchParams.get("before") || undefined,
      limit: searchParams.get("limit") || "20",
    });

    const where: { threadId: string; createdAt?: { lt: Date } } = {
      threadId,
    };

    if (query.before) {
      where.createdAt = { lt: new Date(query.before) };
    }

    const messages = await prisma.post.findMany({
      where,
      select: {
        id: true,
        content: true,
        authorName: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: query.limit,
    });

    // Reverse to chronological order (oldest first)
    const sorted = messages.reverse();

    return NextResponse.json({
      messages: sorted,
      hasMore: messages.length === query.limit,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}


