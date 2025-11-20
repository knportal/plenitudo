/**
 * Email notification service.
 *
 * TODO: Replace stub implementation with Resend API.
 *
 * Resend integration pattern:
 * ```typescript
 * import { Resend } from "resend";
 *
 * const resend = new Resend(process.env.RESEND_API_KEY);
 *
 * export async function sendEmail(to: string, subject: string, html: string) {
 *   const { data, error } = await resend.emails.send({
 *     from: "notifications@yourdomain.com",
 *     to: [to],
 *     subject,
 *     html,
 *   });
 *
 *   if (error) {
 *     console.error("Resend error:", error);
 *     throw new Error(`Failed to send email: ${error.message}`);
 *   }
 *
 *   return data;
 * }
 * ```
 *
 * Setup:
 * 1. Install: `npm install resend`
 * 2. Get API key from https://resend.com/api-keys
 * 3. Add to .env: `RESEND_API_KEY=re_...`
 * 4. Verify domain in Resend dashboard
 * 5. Replace stub implementation below
 */

// Reserved for future email implementation
// Uncomment when implementing email functionality
/*
type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
}
*/

/**
 * Send an email notification.
 *
 * Current: Stub implementation that logs to console in development.
 * TODO: Replace with Resend API or other email provider.
 *
 * @param to Email recipient
 * @param subject Email subject line
 * @param html HTML email content
 * @returns Promise that resolves when email is sent (or logged)
 */
export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<void> {
  // Stub implementation: log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log("=".repeat(60));
    console.log("📧 EMAIL STUB (would send via Resend in production)");
    console.log("=".repeat(60));
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log("---");
    console.log(html);
    console.log("=".repeat(60));
  } else {
    // In production, this should call Resend API
    // TODO: Uncomment and configure when Resend is set up
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "notifications@yourdomain.com",
    //   to: [to],
    //   subject,
    //   html,
    // });

    console.warn(
      `[EMAIL STUB] Would send email to ${to} with subject: ${subject}`
    );
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
