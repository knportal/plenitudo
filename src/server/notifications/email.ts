/**
 * Email notification service using Resend API.
 *
 * Setup:
 * 1. Install: `npm install resend` ✅
 * 2. Get API key from https://resend.com/api-keys
 * 3. Add to .env: `RESEND_API_KEY=re_...`
 * 4. Verify domain in Resend dashboard (optional, can use onboarding.resend.com for testing)
 */

// Import Resend at module level - Next.js will handle bundling correctly
// with transpilePackages config
let ResendClass: typeof import("resend").Resend | null = null;

/**
 * Lazy load Resend to avoid issues in serverless functions.
 * Uses dynamic import as fallback if static import fails.
 */
async function getResendClass() {
  if (ResendClass) {
    return ResendClass;
  }

  try {
    // Try static import first (should work with transpilePackages)
    const resendModule = await import("resend");
    ResendClass = resendModule.Resend;

    if (!ResendClass || typeof ResendClass !== 'function') {
      throw new Error(`Resend class not found or not a function. Got: ${typeof ResendClass}`);
    }

    return ResendClass;
  } catch (error) {
    console.error("❌ Failed to import Resend:", error);
    throw error;
  }
}

/**
 * Get or create Resend client.
 * Creates a new instance each time to avoid issues with serverless functions.
 */
async function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }

  try {
    const Resend = await getResendClass();
    // Create new instance each time to avoid serverless function state issues
    return new Resend(apiKey);
  } catch (error) {
    console.error("❌ Failed to create Resend client:", error);
    return null;
  }
}

/**
 * Get the "from" email address.
 * Uses verified domain if available, otherwise falls back to Resend's default.
 */
function getFromEmail(): string {
  // If you have a verified domain, use it:
  // return "notifications@plenitudo.ai";

  // Otherwise, use Resend's default domain (works for testing):
  return "onboarding@resend.dev";
}

/**
 * Send an email notification using Resend API.
 *
 * @param to Email recipient
 * @param subject Email subject line
 * @param html HTML email content
 * @returns Promise that resolves when email is sent
 * @throws Error if Resend API key is not configured or email sending fails
 */
export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<void> {
  const client = await getResendClient();

  // If no API key configured, log in development, throw in production
  if (!client) {
    if (process.env.NODE_ENV === "development") {
      console.log("=".repeat(60));
      console.log("📧 EMAIL STUB (RESEND_API_KEY not configured)");
      console.log("=".repeat(60));
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log("---");
      console.log(html.substring(0, 200) + "...");
      console.log("=".repeat(60));
      return;
    } else {
      throw new Error(
        "RESEND_API_KEY is not configured. Cannot send email in production."
      );
    }
  }

  try {
    const { data, error } = await client.emails.send({
      from: getFromEmail(),
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error("❌ Resend error:", error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log("✅ Email sent successfully:", {
      to,
      subject,
      id: data?.id,
    });

    return;
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error;
  }
}

/**
 * Send mention notification email.
 * Formats a user-friendly email when someone is mentioned in chat.
 */
export async function sendMentionEmail(
  mentionedUserEmail: string,
  mentionedUserName: string,
  authorName: string,
  messageContent: string,
  threadTitle: string,
  threadUrl: string
): Promise<void> {
  const subject = `${authorName} mentioned you in "${threadTitle}"`;
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .message { background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .button { display: inline-block; padding: 12px 24px; background: #10b981; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>You were mentioned</h2>
          <p>Hi ${mentionedUserName},</p>
          <p><strong>${authorName}</strong> mentioned you in the thread <strong>"${threadTitle}"</strong>:</p>
          <div class="message">
            ${messageContent.replace(/\n/g, "<br>")}
          </div>
          <a href="${threadUrl}" class="button">View Thread</a>
        </div>
      </body>
    </html>
  `;

  await sendEmail(mentionedUserEmail, subject, html);
}

/**
 * Send summary notification email.
 * Notifies users when a chat summary is created.
 */
export async function sendSummaryEmail(
  userEmail: string,
  userName: string,
  threadTitle: string,
  threadUrl: string,
  summaryContent: string
): Promise<void> {
  const subject = `New chat summary for "${threadTitle}"`;
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .summary { background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .button { display: inline-block; padding: 12px 24px; background: #10b981; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>New Chat Summary</h2>
          <p>Hi ${userName},</p>
          <p>A new summary has been created for the thread <strong>"${threadTitle}"</strong>:</p>
          <div class="summary">
            ${summaryContent.replace(/\n/g, "<br>")}
          </div>
          <a href="${threadUrl}" class="button">View Thread</a>
        </div>
      </body>
    </html>
  `;

  await sendEmail(userEmail, subject, html);
}

/**
 * Send formatted post to Substack via email-to-post.
 * This is the easiest way to automate Substack publishing.
 */
export async function sendSubstackPost(
  title: string,
  htmlBody: string,
  to: string
): Promise<void> {
  // Format as email with proper subject line
  // Substack email-to-post uses the subject as the post title
  const subject = title;

  // Wrap HTML body in email-friendly format
  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
        ${htmlBody}
      </body>
    </html>
  `;

  await sendEmail(to, subject, emailHtml);
}
