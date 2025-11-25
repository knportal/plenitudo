import { NextResponse } from "next/server";
import {
  getFeedHealthSummary,
  getBrokenFeeds,
  suggestReplacements,
} from "@/server/aiDaily/validateFeeds";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET /api/admin/feeds/health
 * Returns current feed health status without running validation
 */
export async function GET() {
  try {
    const summary = await getFeedHealthSummary();
    const broken = await getBrokenFeeds();

    // Get replacement suggestions for broken feeds
    const brokenWithSuggestions = await Promise.all(
      broken.map(async (feed) => {
        const suggestions = await suggestReplacements(feed.feedUrl);
        return {
          ...feed,
          suggestions,
        };
      })
    );

    // Get feeds that haven't been checked in 7+ days
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const stale = await prisma.feedHealth.findMany({
      where: {
        lastChecked: { lt: weekAgo },
      },
      orderBy: { lastChecked: "asc" },
    });

    return NextResponse.json({
      success: true,
      summary,
      brokenFeeds: brokenWithSuggestions,
      staleFeeds: stale.map((f) => ({
        feedUrl: f.feedUrl,
        feedLabel: f.feedLabel,
        lastChecked: f.lastChecked,
        daysSinceCheck: Math.floor(
          (Date.now() - f.lastChecked.getTime()) / (1000 * 60 * 60 * 24)
        ),
      })),
    });
  } catch (error: unknown) {
    console.error("Feed health check error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

