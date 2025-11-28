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
  const apiKey = process.env["RESEND_API_KEY"];
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
 * Uses RESEND_FROM_EMAIL if set, otherwise uses the default verified domain email.
 */
function getFromEmail(): string {
  // Check if a custom from address is configured
  const customFrom = process.env["RESEND_FROM_EMAIL"];
  if (customFrom) {
    return customFrom;
  }

  // Default to the verified domain email (news@plenitudo.ai)
  // This will only work if the domain is verified in Resend
  return "news@plenitudo.ai";
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

  const fromEmail = getFromEmail();

  // Log the from address being used for debugging
  console.log("📧 Sending email:", {
    from: fromEmail,
    to,
    subject,
    hasCustomFrom: !!process.env["RESEND_FROM_EMAIL"],
  });

  try {
    const { data, error } = await client.emails.send({
      from: fromEmail,
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error("❌ Resend error:", error);

      // Provide helpful error message for domain verification issues
      if (error.message?.includes("verify a domain") || error.message?.includes("testing emails")) {
        const helpfulMessage = `Domain verification required. ${error.message} To fix: 1) Go to resend.com/domains, 2) Verify plenitudo.ai domain, 3) Set RESEND_FROM_EMAIL=notifications@plenitudo.ai in Vercel, or 4) Use the email address Resend allows (check error message above).`;
        throw new Error(helpfulMessage);
      }

      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log("✅ Email sent successfully:", {
      from: fromEmail,
      to,
      subject,
      id: data?.id,
    });

    return;
  } catch (error) {
    console.error("❌ Failed to send email:", {
      from: fromEmail,
      to,
      error: error instanceof Error ? error.message : String(error),
    });
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
 * Convert HTML to plain text for email clients that don't parse HTML well.
 * Strips HTML tags and converts common elements to plain text.
 */
function htmlToPlainText(html: string): string {
  const text = html
    // Remove style blocks
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    // Convert headings
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n\n# $1\n\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n\n## $1\n\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n\n### $1\n\n')
    // Convert paragraphs
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    // Convert line breaks
    .replace(/<br\s*\/?>/gi, '\n')
    // Convert links: <a href="url">text</a> -> text (url)
    .replace(/<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, '$2 ($1)')
    // Convert strong/bold
    .replace(/<(strong|b)[^>]*>(.*?)<\/(strong|b)>/gi, '**$2**')
    // Convert emphasis/italic
    .replace(/<(em|i)[^>]*>(.*?)<\/(em|i)>/gi, '*$2*')
    // Convert horizontal rules
    .replace(/<hr[^>]*>/gi, '\n---\n')
    // Remove divs but keep content
    .replace(/<div[^>]*>/gi, '\n')
    .replace(/<\/div>/gi, '')
    // Remove all other HTML tags
    .replace(/<[^>]+>/g, '')
    // Decode HTML entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // Clean up extra whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return text;
}

/**
 * Send formatted post to Substack via email-to-post.
 * This is the easiest way to automate Substack publishing.
 *
 * Note: Substack email-to-post works better with plain text than HTML.
 * We send both text and HTML versions for maximum compatibility.
 */
export async function sendSubstackPost(
  title: string,
  htmlBody: string,
  to: string
): Promise<void> {
  // Format as email with proper subject line
  // Substack email-to-post uses the subject as the post title
  const subject = title;

  // Convert HTML to plain text for better Substack compatibility
  const plainText = htmlToPlainText(htmlBody);

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

  // Send email with both text and HTML versions
  // Substack email-to-post prefers plain text
  await sendEmailWithText(to, subject, plainText, emailHtml);
}

/**
 * Send email with both text and HTML versions.
 * Some email clients (like Substack) parse plain text better than HTML.
 */
async function sendEmailWithText(
  to: string,
  subject: string,
  text: string,
  html: string
): Promise<void> {
  const client = await getResendClient();

  if (!client) {
    if (process.env.NODE_ENV === "development") {
      console.log("=".repeat(60));
      console.log("📧 EMAIL STUB (RESEND_API_KEY not configured)");
      console.log("=".repeat(60));
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log("---");
      console.log("Text version:", text.substring(0, 200) + "...");
      console.log("=".repeat(60));
      return;
    } else {
      throw new Error(
        "RESEND_API_KEY is not configured. Cannot send email in production."
      );
    }
  }

  const fromEmail = getFromEmail();

  console.log("📧 Sending email (text + HTML):", {
    from: fromEmail,
    to,
    subject,
    textLength: text.length,
    htmlLength: html.length,
  });

  try {
    const { data, error } = await client.emails.send({
      from: fromEmail,
      to: [to],
      subject,
      text, // Plain text version (Substack prefers this)
      html, // HTML version (fallback)
    });

    if (error) {
      console.error("❌ Resend error:", error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log("✅ Email sent successfully:", {
      from: fromEmail,
      to,
      subject,
      id: data?.id,
    });

    return;
  } catch (error) {
    console.error("❌ Failed to send email:", {
      from: fromEmail,
      to,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}
