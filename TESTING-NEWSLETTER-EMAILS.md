# Testing Newsletter Email Sending

This guide will help you test sending daily and weekly newsletters to your personal email.

## 📋 Prerequisites

Before testing, make sure these environment variables are set in Vercel:

1. **`MANUAL_SUBSTACK_EMAIL`** - Your personal email address (e.g., `your-email@example.com`)
2. **`RESEND_API_KEY`** - Your Resend API key (required for sending emails)
3. **`RESEND_FROM_EMAIL`** - (Optional) Custom "from" address (defaults to `news@plenitudo.ai`)

## 🧪 Step 1: Test Basic Email Configuration

First, test that your email setup is working with a simple test email.

### Option A: Using curl (Terminal)

```bash
# Replace with your actual domain
curl -X POST https://your-domain.vercel.app/api/substack/test-email
```

### Option B: Using Browser

1. Open your browser
2. Go to: `https://your-domain.vercel.app/api/substack/test-email`
3. You'll see a GET response with configuration info
4. To actually send the test email, you need to use POST (see curl command above)

### Option C: Using Vercel Dashboard

1. Go to Vercel Dashboard → Your Project → Functions
2. Find the `/api/substack/test-email` function
3. Use Vercel's function testing interface (if available)

### Expected Response

```json
{
  "success": true,
  "message": "Test email sent",
  "to": "your-email@example.com",
  "title": "Test Newsletter - 2025-01-XX..."
}
```

**Check your inbox!** You should receive a simple test email.

---

## 📰 Step 2: Test Daily Newsletter

**Important:** This requires that AI Daily items exist for today. If you haven't built today's AI Daily yet, you'll get an error.

### First, Build Today's AI Daily (if needed)

```bash
# This builds and creates today's AI Daily items
curl -X GET https://your-domain.vercel.app/api/admin/ai-daily/rebuild
```

### Then Send Daily Newsletter

```bash
curl -X POST https://your-domain.vercel.app/api/substack/publish-daily
```

### Expected Response

```json
{
  "success": true,
  "message": "Daily newsletter sent to personal email",
  "to": "your-email@example.com",
  "itemsCount": 10
}
```

**Check your inbox!** You should receive a beautifully formatted daily newsletter with today's top AI stories.

---

## 📊 Step 3: Test Weekly Newsletter

**Important:** This requires that AI Daily items exist for this week (Monday to Sunday).

### Send Weekly Newsletter

```bash
curl -X POST https://your-domain.vercel.app/api/substack/publish-weekly
```

### Expected Response

```json
{
  "success": true,
  "message": "Weekly newsletter sent to personal email",
  "to": "your-email@example.com",
  "itemsCount": 5,
  "weekOf": "2025-01-XX"
}
```

**Check your inbox!** You should receive a formatted weekly digest with the top 5 stories from this week.

---

## 🔍 Troubleshooting

### Error: "PERSONAL_EMAIL or MANUAL_SUBSTACK_EMAIL not configured"

**Solution:** Make sure `MANUAL_SUBSTACK_EMAIL` is set in Vercel environment variables.

1. Go to Vercel → Project Settings → Environment Variables
2. Add or verify `MANUAL_SUBSTACK_EMAIL=your-email@example.com`
3. Redeploy or wait for next deployment

### Error: "RESEND_API_KEY is not configured"

**Solution:** Add your Resend API key to Vercel.

1. Get your API key from https://resend.com/api-keys
2. Add `RESEND_API_KEY=re_xxx...` to Vercel environment variables
3. Redeploy

### Error: "No AI Daily items found for today"

**Solution:** Build today's AI Daily first.

```bash
curl -X GET https://your-domain.vercel.app/api/admin/ai-daily/rebuild
```

Then try sending the daily newsletter again.

### Error: "Failed to send email" or Domain verification issues

**Solution:** Check Resend domain verification.

1. Go to https://resend.com/domains
2. Make sure `plenitudo.ai` (or your domain) is verified
3. Or set `RESEND_FROM_EMAIL` to a verified email address in Resend

### Email not arriving?

1. **Check spam folder** - Emails might be filtered
2. **Check Vercel logs** - Look for email sending errors
3. **Verify Resend dashboard** - Check https://resend.com/emails for delivery status
4. **Test with simple email first** - Use `/api/substack/test-email` to verify basic setup

---

## 🎯 Quick Test Checklist

- [ ] `MANUAL_SUBSTACK_EMAIL` is set in Vercel
- [ ] `RESEND_API_KEY` is set in Vercel
- [ ] Test email endpoint works (`/api/substack/test-email`)
- [ ] Today's AI Daily items exist (check `/api/admin/ai-daily/rebuild`)
- [ ] Daily newsletter sends successfully (`/api/substack/publish-daily`)
- [ ] Weekly newsletter sends successfully (`/api/substack/publish-weekly`)
- [ ] Emails arrive in inbox (check spam folder too!)

---

## 📝 Local Testing (Development)

If you want to test locally:

1. Set environment variables in `.env.local`:
   ```bash
   MANUAL_SUBSTACK_EMAIL=your-email@example.com
   RESEND_API_KEY=re_xxx...
   RESEND_FROM_EMAIL=news@plenitudo.ai
   ```

2. Run the dev server:
   ```bash
   npm run dev
   ```

3. Test endpoints:
   ```bash
   # Test email
   curl -X POST http://localhost:3000/api/substack/test-email

   # Daily newsletter
   curl -X POST http://localhost:3000/api/substack/publish-daily

   # Weekly newsletter
   curl -X POST http://localhost:3000/api/substack/publish-weekly
   ```

**Note:** In development, if `RESEND_API_KEY` is not set, emails will be logged to console instead of actually sent.

---

## 🚀 Production Setup

Once testing is successful, set up automated cron jobs in Vercel:

1. **Daily Newsletter** (11 AM ET daily):
   - Path: `/api/substack/publish-daily`
   - Schedule: `0 11 * * *` (11 AM ET)

2. **Weekly Newsletter** (Monday 9 AM ET):
   - Path: `/api/substack/publish-weekly`
   - Schedule: `0 9 * * 1` (Monday 9 AM ET)

See `vercel.json` for cron job configuration.

