/**
 * API route to send daily AI Daily newsletter to personal email
 *
 * This endpoint:
 * 1. Fetches today's AI Daily items
 * 2. Formats them as a newsletter
 * 3. Sends directly to personal email
 *
 * Call this via cron job daily at 11 AM ET (or manually)
 */

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendNewsletterToEmail } from "@/server/substack/publish";
import { toETDateISO } from "@/server/aiDaily/text";

const prisma = new PrismaClient();

// Add GET handler for testing (returns status without publishing)
export async function GET() {
  const personalEmail = process.env["PERSONAL_EMAIL"] || process.env["MANUAL_SUBSTACK_EMAIL"];
  return NextResponse.json({
    message: "This endpoint requires a POST request to send daily newsletter",
    usage: "curl -X POST https://your-domain.com/api/substack/publish-daily",
    personalEmail: personalEmail || "❌ NOT CONFIGURED",
  });
}

export async function POST() {
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

    const postTitle = `AI Daily — ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`;

    // Send to personal email address
    const personalEmail = process.env["PERSONAL_EMAIL"] || process.env["MANUAL_SUBSTACK_EMAIL"];
    if (!personalEmail) {
      return NextResponse.json(
        {
          error: "PERSONAL_EMAIL or MANUAL_SUBSTACK_EMAIL not configured",
          hint: "Set PERSONAL_EMAIL=your-email@example.com in environment variables",
        },
        { status: 400 }
      );
    }

    try {
      const emailResult = await sendNewsletterToEmail(
        postTitle,
        postBody,
        personalEmail,
        "daily"
      );

      if (emailResult.success) {
        return NextResponse.json({
          success: true,
          message: "Daily newsletter sent to personal email",
          to: personalEmail,
          itemsCount: items.length,
        });
      } else {
        return NextResponse.json(
          {
            error: "Failed to send newsletter email",
            details: emailResult.error,
          },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error("❌ Failed to send newsletter email:", error);
      return NextResponse.json(
        {
          error: "Failed to send newsletter email",
          message: error instanceof Error ? error.message : String(error),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error sending daily newsletter:", error);
    return NextResponse.json(
      {
        error: "Failed to send daily newsletter",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
