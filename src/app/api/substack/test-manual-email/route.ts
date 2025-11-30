/**
 * Test endpoint to send a newsletter email
 * This helps verify the email configuration is working
 */

import { NextResponse } from "next/server";
import { sendNewsletterToEmail } from "@/server/substack/publish";

export async function POST() {
  try {
    const personalEmail = process.env["PERSONAL_EMAIL"] || process.env["MANUAL_SUBSTACK_EMAIL"];
    const resendApiKey = process.env["RESEND_API_KEY"];
    const resendFromEmail = process.env["RESEND_FROM_EMAIL"];

    // Check configuration
    if (!personalEmail) {
      return NextResponse.json(
        {
          error: "PERSONAL_EMAIL or MANUAL_SUBSTACK_EMAIL not configured",
          hint: "Set PERSONAL_EMAIL=your-email@example.com in Vercel environment variables",
        },
        { status: 400 }
      );
    }

    if (!resendApiKey) {
      return NextResponse.json(
        {
          error: "RESEND_API_KEY not configured",
          hint: "Set RESEND_API_KEY in Vercel environment variables",
        },
        { status: 400 }
      );
    }

    // Send a simple test email
    const testTitle = "Test Newsletter Email - " + new Date().toISOString();
    const testBody = `
      <h1>Test Newsletter Email</h1>
      <p>This is a test email to verify the newsletter email configuration is working.</p>
      <p>If you receive this, the configuration is correct!</p>
      <p>Sent at: ${new Date().toLocaleString()}</p>
    `;

    console.log("📧 Attempting to send newsletter email:", {
      to: personalEmail,
      from: resendFromEmail || "news@plenitudo.ai (default)",
      hasResendKey: !!resendApiKey,
    });

    await sendNewsletterToEmail(testTitle, testBody, personalEmail, "daily");

    return NextResponse.json({
      success: true,
      message: "Test newsletter email sent",
      to: personalEmail,
      from: resendFromEmail || "news@plenitudo.ai (default)",
      title: testTitle,
      hint: "Check your inbox (and spam folder) for the email",
    });
  } catch (error) {
    console.error("❌ Error sending test newsletter email:", error);
    return NextResponse.json(
      {
        error: "Failed to send test newsletter email",
        message: error instanceof Error ? error.message : String(error),
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const personalEmail = process.env["PERSONAL_EMAIL"] || process.env["MANUAL_SUBSTACK_EMAIL"];
  const resendApiKey = process.env["RESEND_API_KEY"];
  const resendFromEmail = process.env["RESEND_FROM_EMAIL"];

  return NextResponse.json({
    message: "Send a POST request to test newsletter email",
    usage: "curl -X POST https://plenitudo.vercel.app/api/substack/test-manual-email",
    configuration: {
      PERSONAL_EMAIL: personalEmail || "❌ NOT SET",
      RESEND_API_KEY: resendApiKey ? "✅ SET" : "❌ NOT SET",
      RESEND_FROM_EMAIL: resendFromEmail || "news@plenitudo.ai (default)",
    },
    hint: personalEmail
      ? `Email will be sent to: ${personalEmail}`
      : "Set PERSONAL_EMAIL in Vercel environment variables",
  });
}

