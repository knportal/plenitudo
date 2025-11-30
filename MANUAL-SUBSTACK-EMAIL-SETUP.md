# Manual Substack Email Setup

This setup allows you to receive formatted daily and weekly Substack posts via email, ready to copy/paste into Substack while waiting for the API integration.

## Setup

### 1. Add Environment Variable

Add your email address to your environment variables:

```bash
MANUAL_SUBSTACK_EMAIL=your-email@example.com
```

**For Vercel:**
1. Go to your project settings → Environment Variables
2. Add `MANUAL_SUBSTACK_EMAIL` with your email address
3. Apply to Production, Preview, and Development as needed
4. Redeploy if necessary

### 2. How It Works

When the automated daily or weekly posts are generated:

1. **If `SUBSTACK_EMAIL_ADDRESS` is set:** The post is automatically sent to Substack via email-to-post (arrives as draft)
2. **If `MANUAL_SUBSTACK_EMAIL` is set:** You'll also receive a formatted email with:
   - Instructions on how to copy/paste
   - The post title
   - Markdown content ready to copy (formatted in a code box)
   - HTML preview showing how it will look

### 3. Email Format

Each email includes:

- **Clear instructions** on how to copy/paste into Substack
- **Post title** at the top
- **Markdown content box** - ready to copy/paste directly into Substack
- **HTML preview** - showing how the content will look when formatted

### 4. Workflow

1. **Daily posts:** Sent when `/api/substack/publish-daily` is called (automated via cron at 11 AM ET)
2. **Weekly posts:** Sent when `/api/substack/publish-weekly` is called (automated via cron Monday 9 AM ET)
3. **Check your email** for the formatted post
4. **Copy the markdown content** from the email
5. **Paste into Substack** → New Post
6. **Review and publish** as usual

### 5. Testing

To test the setup manually:

```bash
# Test daily post
curl -X POST https://your-domain.com/api/substack/publish-daily

# Test weekly post
curl -X POST https://your-domain.com/api/substack/publish-weekly
```

Check your email (`MANUAL_SUBSTACK_EMAIL`) to see the formatted content.

## Notes

- The email will be sent **in addition to** any Substack email-to-post functionality
- If manual email sending fails, it won't break the main publishing workflow (errors are logged but don't stop the process)
- The markdown format is optimized for Substack's editor
- You can still use Substack's email-to-post feature simultaneously - both will work together

## Troubleshooting

**Not receiving emails?**
- Check your spam folder
- Verify `MANUAL_SUBSTACK_EMAIL` is set correctly
- Verify `RESEND_API_KEY` is configured (required for sending emails)
- Check server logs for any email sending errors

**Markdown formatting issues?**
- Substack's editor will automatically format markdown
- If something looks off, you can manually edit in Substack before publishing

**Want to disable manual emails?**
- Simply remove or comment out the `MANUAL_SUBSTACK_EMAIL` environment variable

