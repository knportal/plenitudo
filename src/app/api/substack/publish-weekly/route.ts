/**
 * API route to send weekly newsletter to personal email
 *
 * This endpoint:
 * 1. Fetches the week's top AI Daily items
 * 2. Formats them as a weekly newsletter
 * 3. Sends directly to personal email
 *
 * Call this via cron job weekly on Monday at 9 AM ET (or manually)
 */

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendNewsletterToEmail } from "@/server/substack/publish";
import { toETDateISO } from "@/server/aiDaily/text";
import { startOfWeek } from "date-fns";

const prisma = new PrismaClient();

export async function POST() {
  try {
    // Get this week's date range (Monday to Sunday)
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday
    const weekStartISO = toETDateISO(weekStart);

    // Fetch this week's top AI Daily items (by score)
    const items = await prisma.aIDailyItem.findMany({
      where: {
        dateISO: {
          gte: weekStartISO,
        },
      },
      orderBy: { score: "desc" },
      take: 15, // Get top 15, then curate to top 5
    });

    if (items.length === 0) {
      return NextResponse.json(
        { error: "No AI Daily items found for this week" },
        { status: 404 }
      );
    }

    // Curate top 5 stories (you can add more logic here)
    const topItems = items.slice(0, 5);

    // Format as weekly newsletter (use HTML template for better formatting)
    const { weeklyNewsletterTemplate } = await import(
      "@/server/substack/templates"
    );
    const postBody = weeklyNewsletterTemplate(
      topItems.map((item) => ({
        title: item.title,
        summary: item.summary,
        genre: item.genre,
        mood: item.mood as "uplift" | "opportunity" | "caution",
        sources: JSON.parse(item.sources as string),
        // You can add analysis here or fetch from another source
      })),
      weekStart
    );

    const postTitle = `Weekly AI Digest — Week of ${weekStart.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`;

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
        "weekly"
      );

      if (emailResult.success) {
        return NextResponse.json({
          success: true,
          message: "Weekly newsletter sent to personal email",
          to: personalEmail,
          itemsCount: topItems.length,
          weekOf: weekStartISO,
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
    console.error("Error sending weekly newsletter:", error);
    return NextResponse.json(
      {
        error: "Failed to send weekly newsletter",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
