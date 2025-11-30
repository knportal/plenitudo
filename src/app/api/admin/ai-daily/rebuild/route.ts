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

    // Send newsletter email (if configured)
    // This combines the daily rebuild and email sending into one cron job
    let emailResult: { success: boolean; error?: string } | null = null;
    try {
      const personalEmail = process.env["PERSONAL_EMAIL"] || process.env["MANUAL_SUBSTACK_EMAIL"];
      if (personalEmail) {
        // Import and call the email function
        const { sendNewsletterToEmail } = await import("@/server/substack/publish");
        const { dailyAITemplate } = await import("@/server/substack/templates");
        const { toETDateISO } = await import("@/server/aiDaily/text");
        const { PrismaClient } = await import("@prisma/client");

        const prisma = new PrismaClient();
        const dateISO = toETDateISO();

        // Fetch today's items
        const items = await prisma.aIDailyItem.findMany({
          where: { dateISO },
          orderBy: { score: "desc" },
          take: 10,
        });

        if (items.length > 0) {
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

          emailResult = await sendNewsletterToEmail(
            postTitle,
            postBody,
            personalEmail,
            "daily"
          );
        }

        await prisma.$disconnect();
      }
    } catch (error) {
      console.error("Failed to send newsletter email:", error);
      // Don't fail the whole rebuild if email sending fails
      emailResult = {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }

    return NextResponse.json({
      ok: true,
      count,
      threadId,
      email: emailResult,
    });
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
