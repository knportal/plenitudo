import { sendEmail } from "@/server/notifications/email";

/**
 * Send verification email to beta signup
 */
export async function sendVerificationEmail(
  email: string,
  token: string
): Promise<void> {
  const baseUrl =
    process.env["NEXT_PUBLIC_APP_URL"] ||
    (process.env["VERCEL_URL"]
      ? `https://${process.env["VERCEL_URL"]}`
      : "http://localhost:3000");

  const verificationUrl = `${baseUrl}/api/beta-signup/verify?token=${token}`;

  const subject = "Verify your email for Plenitudo.ai Beta";
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1e293b;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
            color: white;
            padding: 32px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }
          .content {
            padding: 32px;
          }
          .content p {
            margin: 16px 0;
            color: #475569;
          }
          .button {
            display: inline-block;
            padding: 14px 28px;
            background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 24px 0;
            text-align: center;
          }
          .button:hover {
            opacity: 0.9;
          }
          .footer {
            padding: 24px 32px;
            background: #f8fafc;
            text-align: center;
            font-size: 12px;
            color: #64748b;
          }
          .link {
            color: #3b82f6;
            word-break: break-all;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Plenitudo.ai Beta!</h1>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>
              Thanks for joining our beta waitlist! To complete your signup and
              ensure we can reach you, please verify your email address.
            </p>
            <p style="text-align: center;">
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </p>
            <p style="font-size: 14px; color: #64748b;">
              Or copy and paste this link into your browser:
            </p>
            <p class="link">${verificationUrl}</p>
            <p style="font-size: 14px; color: #64748b; margin-top: 24px;">
              This link will expire in 7 days. If you didn't sign up for our
              beta, you can safely ignore this email.
            </p>
          </div>
          <div class="footer">
            <p>Plenitudo.ai - Stop doomscrolling, start idea scrolling.</p>
            <p>This is an automated message. Please do not reply.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await sendEmail(email, subject, html);
}

