import { NextResponse } from "next/server";
import { buildDaily } from "@/server/aiDaily/buildDaily";
import { createDailyThread } from "@/server/aiDaily/createDailyThread";

export async function GET() {
  try {
    // Build AI Daily items - increased limit to populate all 8 genres
    const count = await buildDaily({ limit: 30 });

    // Create daily discussion thread
    let threadId: string | null = null;
    try {
      threadId = await createDailyThread();
    } catch (error) {
      console.error("Failed to create daily thread:", error);
      // Don't fail the whole rebuild if thread creation fails
    }

    return NextResponse.json({ ok: true, count, threadId });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json(
        { ok: false, error: e.message },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
