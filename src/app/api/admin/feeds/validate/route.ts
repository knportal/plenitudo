import { NextResponse } from "next/server";
import {
  validateAllFeeds,
  getBrokenFeeds,
  getFeedHealthSummary,
} from "@/server/aiDaily/validateFeeds";

/**
 * GET /api/admin/feeds/validate
 * Validates all RSS feeds and returns health status
 */
export async function GET() {
  try {
    // Check if user is admin (you can add auth check here)
    const isAdmin = process.env["IS_ADMIN"] === "true";
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const results = await validateAllFeeds();
    const broken = await getBrokenFeeds();
    const summary = await getFeedHealthSummary();

    return NextResponse.json({
      success: true,
      validation: results,
      brokenFeeds: broken,
      summary,
    });
  } catch (error: unknown) {
    console.error("Feed validation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
