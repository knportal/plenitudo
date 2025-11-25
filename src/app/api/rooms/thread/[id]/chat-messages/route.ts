/**
 * API endpoint for fetching paginated ChatMessages for a thread.
 * Used for infinite scroll up pagination.
 */
import { NextRequest, NextResponse } from "next/server";
import { listChatMessages } from "@/server/rooms/chatActions";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const threadId = params.id;
    const searchParams = request.nextUrl.searchParams;
    const beforeId = searchParams.get("beforeId") || undefined;
    const limit = Number(searchParams.get("limit")) || 20;
    // Allow isAdmin to be passed via query param (for client-side calls)
    // but default to env var for server-side auth
    const isAdmin =
      searchParams.get("isAdmin") === "1" || process.env["IS_ADMIN"] === "1";

    const messages = await listChatMessages(threadId, beforeId, limit, isAdmin);

    return NextResponse.json({
      messages,
      hasMore: messages.length === limit,
    });
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

