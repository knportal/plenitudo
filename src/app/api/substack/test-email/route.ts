/**
 * Test endpoint to send a simple email to personal email
 * This helps verify the email configuration is working
 */

import { NextResponse } from "next/server";
import { sendNewsletterEmail } from "@/server/notifications/email";

export async function POST() {
  try {
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

    // Send a simple test email
    const testTitle = "Test Newsletter - " + new Date().toISOString();
    const testBody = `
      <h1>Test Newsletter</h1>
      <p>This is a test email to verify the newsletter email configuration is working.</p>
      <p>If you receive this, the email address is correct!</p>
      <p>Sent at: ${new Date().toLocaleString()}</p>
    `;

    await sendNewsletterEmail(testTitle, testBody, personalEmail, "daily");

    return NextResponse.json({
      success: true,
      message: "Test email sent",
      to: personalEmail,
      title: testTitle,
    });
  } catch (error) {
    console.error("Error sending test email:", error);
    return NextResponse.json(
      {
        error: "Failed to send test email",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const personalEmail = process.env["PERSONAL_EMAIL"] || process.env["MANUAL_SUBSTACK_EMAIL"];
  return NextResponse.json({
    message: "Send a POST request to test newsletter email",
    usage: "curl -X POST https://your-domain.com/api/substack/test-email",
    personalEmail: personalEmail || "❌ NOT CONFIGURED",
  });
}
