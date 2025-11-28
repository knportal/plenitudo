/**
 * API route to publish weekly newsletter to Substack
 *
 * This endpoint:
 * 1. Fetches the week's top AI Daily items
 * 2. Formats them as a weekly newsletter
 * 3. Sends to Substack via email-to-post (arrives as DRAFT)
 *
 * IMPORTANT: Posts arrive as drafts for manual curation.
 * You must review, set as paid tier, and publish manually in Substack.
 *
 * Call this via cron job weekly on Monday at 9 AM ET (or manually)
 */

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { publishToSubstack, sendPostViaEmail } from "@/server/substack/publish";
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
    const { weeklyNewsletterTemplate } = await import("@/server/substack/templates");
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

    // Send to Substack (arrives as draft for manual curation)
    // Option 1: Email-to-post
    const substackEmail = process.env["SUBSTACK_EMAIL_ADDRESS"];
    if (substackEmail) {
      const emailResult = await sendPostViaEmail(
        {
          title: `Weekly AI Digest — Week of ${weekStart.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
          body: postBody,
          sendEmail: true,
          // Note: Post arrives as draft. Manually set as paid tier in Substack before publishing.
        },
        substackEmail
      );

      if (emailResult.success) {
        return NextResponse.json({
          success: true,
          method: "email",
          itemsCount: topItems.length,
          weekOf: weekStartISO,
        });
      }
    }

    // Option 2: API (if implemented)
    const substackApiKey = process.env["SUBSTACK_API_KEY"];
    const substackPublicationId = process.env["SUBSTACK_PUBLICATION_ID"];

    if (substackApiKey && substackPublicationId) {
      const apiResult = await publishToSubstack(
        {
          title: `Weekly AI Digest — Week of ${weekStart.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
          body: postBody,
          sendEmail: true,
          // Mark as paid-only in Substack
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
          itemsCount: topItems.length,
          weekOf: weekStartISO,
        });
      }
    }

    // If no method configured, return the formatted post
    return NextResponse.json({
      success: false,
      error: "No Substack publishing method configured",
      formattedPost: postBody,
      itemsCount: topItems.length,
      weekOf: weekStartISO,
    });
  } catch (error) {
    console.error("Error publishing weekly newsletter:", error);
    return NextResponse.json(
      {
        error: "Failed to publish weekly newsletter",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

