/**
 * Test endpoint to send a simple email to Substack
 * This helps verify the email-to-post address is working
 */

import { NextResponse } from "next/server";
import { sendSubstackPost } from "@/server/notifications/email";

export async function POST() {
  try {
    const substackEmail = process.env.SUBSTACK_EMAIL_ADDRESS;

    if (!substackEmail) {
      return NextResponse.json(
        { error: "SUBSTACK_EMAIL_ADDRESS not configured" },
        { status: 400 }
      );
    }

    // Send a simple test email
    const testTitle = "Test Post - " + new Date().toISOString();
    const testBody = `
      <h1>Test Post</h1>
      <p>This is a test email to verify Substack email-to-post is working.</p>
      <p>If you see this in Substack, the email address is correct!</p>
      <p>Sent at: ${new Date().toLocaleString()}</p>
    `;

    await sendSubstackPost(testTitle, testBody, substackEmail);

    return NextResponse.json({
      success: true,
      message: "Test email sent",
      to: substackEmail,
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
  return NextResponse.json({
    message: "Send a POST request to test Substack email",
    usage: "curl -X POST https://your-domain.com/api/substack/test-email",
    substackEmail: process.env.SUBSTACK_EMAIL_ADDRESS || "not configured",
  });
}

