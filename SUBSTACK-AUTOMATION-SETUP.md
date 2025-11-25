# Substack Automation Setup Guide

Complete guide to setting up automated daily AI Daily posts and weekly newsletters on Substack.

---

## 🎯 Overview

This system automatically:
- **Daily:** Publishes AI Daily digest to Substack (free posts)
- **Weekly:** Publishes curated newsletter to Substack (paid subscribers)

---

## 📧 Method 1: Email-to-Post (Recommended - Easiest)

Substack supports email-to-post, which is the simplest way to automate publishing.

### Step 1: Get Your Substack Email Address

1. Go to your Substack publication dashboard
2. Navigate to **Settings → Email**
3. Find your **"Post via email"** address
   - Format: `your-publication+post@substack.com`
4. Copy this email address

### Step 2: Configure Environment Variables

Add to `.env.local` and Vercel:

```bash
# Substack email-to-post address
SUBSTACK_EMAIL_ADDRESS=your-publication+post@substack.com

# Your Substack publication URL (for links in posts)
NEXT_PUBLIC_SUBSTACK_URL=https://your-publication.substack.com

# Your app URL (for UTM tracking)
NEXT_PUBLIC_APP_URL=https://plenitudo.ai

# Email service (Resend) - for sending emails
RESEND_API_KEY=re_xxx...
```

### Step 3: Configure Email Service (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Verify your sending domain (optional but recommended)
4. Add `RESEND_API_KEY` to environment variables

### Step 4: Update Email Service Code

Edit `src/server/notifications/email.ts` to add Substack email sending:

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendSubstackPost(
  title: string,
  body: string,
  to: string
) {
  return await resend.emails.send({
    from: "AI Daily <noreply@yourdomain.com>", // Use your verified domain
    to: to,
    subject: title,
    html: body, // Use the HTML templates from templates.ts
  });
}
```

### Step 5: Update Publish Functions

The publish functions in `src/server/substack/publish.ts` are already set up to use email-to-post. Just make sure `sendSubstackPost` is implemented.

---

## 🤖 Method 2: Browser Automation (Advanced)

If email-to-post doesn't work, you can use browser automation.

### Using Puppeteer

1. Install Puppeteer:
```bash
npm install puppeteer
```

2. Create automation script:
```typescript
import puppeteer from "puppeteer";

async function publishToSubstackViaBrowser(
  title: string,
  body: string,
  email: string,
  password: string
) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Login to Substack
  await page.goto("https://substack.com/sign-in");
  // ... implement login flow

  // Create post
  await page.goto("https://your-publication.substack.com/publish");
  // ... implement post creation

  await browser.close();
}
```

**Note:** This is more complex and requires handling authentication securely.

---

## ⚙️ Cron Job Configuration

Cron jobs are already configured in `vercel.json`:

```json
{
  "crons": [
    { "path": "/api/admin/ai-daily/rebuild", "schedule": "0 11 * * *" },
    { "path": "/api/substack/publish-daily", "schedule": "0 11 * * *" },
    { "path": "/api/substack/publish-weekly", "schedule": "0 9 * * 1" }
  ]
}
```

**Schedule:**
- **Daily AI Daily:** 11 AM ET (after RSS feed rebuild)
- **Weekly Newsletter:** Monday 9 AM ET

---

## 🧪 Testing

### Test Daily Post

```bash
# Manually trigger daily post
curl -X POST http://localhost:3000/api/substack/publish-daily
```

### Test Weekly Newsletter

```bash
# Manually trigger weekly newsletter
curl -X POST http://localhost:3000/api/substack/publish-weekly
```

### Expected Response

```json
{
  "success": true,
  "method": "email",
  "itemsCount": 10
}
```

---

## 📝 Post Formatting

### Daily AI Daily Format

The daily post includes:
- Title: "AI Daily — [Date]"
- Top 10 curated stories
- Each story with:
  - Title and summary
  - Mood indicator (✨ 💡 ⚠️)
  - Source links
  - Genre tag
- CTA to subscribe
- Link to AI Rooms

### Weekly Newsletter Format

The weekly newsletter includes:
- Title: "Weekly AI Digest — Week of [Date]"
- Big picture overview
- Top 5 stories with:
  - Deep analysis
  - Why it matters
  - Source links
- Insights & analysis section
- Looking ahead section
- Community CTAs

---

## 🎨 Customizing Templates

Edit `src/server/substack/templates.ts` to customize:

- Colors and styling
- Layout and structure
- Content sections
- CTAs and links

The templates use inline CSS for Substack compatibility.

---

## 🔒 Paid Subscriber Posts

To make weekly newsletter paid-only:

1. In Substack dashboard → Settings → Posts
2. Set default post visibility to "Paid subscribers only"
3. Or manually mark weekly posts as paid-only after publishing

**Note:** Email-to-post will create free posts by default. You'll need to manually change visibility or use API if available.

---

## 📊 Monitoring

### Check Post Status

1. Go to Substack dashboard → Posts
2. Verify posts are publishing daily/weekly
3. Check email delivery (if using email-to-post)

### Monitor Analytics

- Substack dashboard → Analytics
- Track open rates, click-through rates
- See which posts perform best

---

## 🐛 Troubleshooting

### Posts Not Publishing

1. **Check cron jobs:**
   - Vercel dashboard → Cron Jobs
   - Verify jobs are running

2. **Check email service:**
   - Verify Resend API key is set
   - Check Resend dashboard for delivery status
   - Verify Substack email address is correct

3. **Check logs:**
   - Vercel dashboard → Functions → Logs
   - Look for errors in publish endpoints

### Formatting Issues

- Substack may strip some HTML/CSS
- Test templates in Substack editor first
- Use inline styles (already in templates)
- Avoid complex layouts

### Email Delivery Issues

- Verify Resend domain is set up
- Check spam folder
- Verify Substack email address format
- Test with a manual email first

---

## 🚀 Next Steps

1. **Set up email-to-post** (Method 1)
2. **Test daily post** manually
3. **Test weekly newsletter** manually
4. **Verify cron jobs** are running
5. **Monitor first week** of automated posts
6. **Optimize templates** based on performance

---

## 📚 Resources

- **Substack Help:** [help.substack.com](https://help.substack.com)
- **Resend Docs:** [resend.com/docs](https://resend.com/docs)
- **Vercel Cron:** [vercel.com/docs/cron-jobs](https://vercel.com/docs/cron-jobs)

---

**Ready to automate!** 🚀

Start with email-to-post (Method 1) - it's the easiest and most reliable.


