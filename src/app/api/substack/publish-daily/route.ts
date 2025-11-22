/**
 * API route to publish daily AI Daily to Substack
 *
 * This endpoint:
 * 1. Fetches today's AI Daily items
 * 2. Formats them as a Substack post
 * 3. Publishes to Substack (via email or API)
 *
 * Call this via cron job daily at 11 AM ET
 */

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { publishToSubstack, sendPostViaEmail } from "@/server/substack/publish";
import { toETDateISO } from "@/server/aiDaily/text";

const prisma = new PrismaClient();

// Add GET handler for testing (returns status without publishing)
export async function GET() {
  return NextResponse.json({
    message: "This endpoint requires a POST request to publish to Substack",
    usage: "curl -X POST https://your-domain.com/api/substack/publish-daily",
  });
}

export async function POST(request: Request) {
  try {
    // Get today's date in ET
    const dateISO = toETDateISO();

    // Fetch today's AI Daily items
    const items = await prisma.aIDailyItem.findMany({
      where: { dateISO },
      orderBy: { score: "desc" },
      take: 10,
    });

    if (items.length === 0) {
      return NextResponse.json(
        { error: "No AI Daily items found for today" },
        { status: 404 }
      );
    }

    // Format as Substack post (use HTML template for better formatting)
    const { dailyAITemplate } = await import("@/server/substack/templates");
    const postBody = dailyAITemplate(
      items.map((item) => ({
        title: item.title,
        summary: item.summary,
        genre: item.genre,
        mood: item.mood as "uplift" | "opportunity" | "caution",
        sources: JSON.parse(item.sources as string),
      })),
      new Date(dateISO)
    );

    // Publish to Substack
    // Option 1: Email-to-post (recommended)
    const substackEmail = process.env.SUBSTACK_EMAIL_ADDRESS;
    if (substackEmail) {
      const emailResult = await sendPostViaEmail(
        {
          title: `AI Daily — ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
          body: postBody,
          sendEmail: true,
        },
        substackEmail
      );

      if (emailResult.success) {
        return NextResponse.json({
          success: true,
          method: "email",
          itemsCount: items.length,
        });
      }
    }

    // Option 2: API (if implemented)
    const substackApiKey = process.env.SUBSTACK_API_KEY;
    const substackPublicationId = process.env.SUBSTACK_PUBLICATION_ID;

    if (substackApiKey && substackPublicationId) {
      const apiResult = await publishToSubstack(
        {
          title: `AI Daily — ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
          body: postBody,
          sendEmail: true,
        },
        {
          publicationId: substackPublicationId,
          apiKey: substackApiKey,
        }
      );

      if (apiResult.success) {
        return NextResponse.json({
          success: true,
          method: "api",
          postId: apiResult.postId,
          itemsCount: items.length,
        });
      }
    }

    // If no method configured, return the formatted post
    return NextResponse.json({
      success: false,
      error: "No Substack publishing method configured",
      formattedPost: postBody,
      itemsCount: items.length,
    });
  } catch (error) {
    console.error("Error publishing to Substack:", error);
    return NextResponse.json(
      {
        error: "Failed to publish to Substack",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

