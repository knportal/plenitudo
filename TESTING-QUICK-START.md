# Quick Start: Testing Newsletter Emails

## ⚠️ SSL Certificate Issue

If you're getting SSL certificate errors with `plenitudo.ai`, here are your options:

## Option 1: Use the Test Script (Recommended)

The test script handles SSL issues automatically:

```bash
./test-newsletter-simple.sh
```

This script:
- Uses `-k` flag to bypass SSL verification (for testing only)
- Provides clear step-by-step output
- Shows success/failure for each step

## Option 2: Manual Commands with -k Flag

If you prefer manual testing, add `-k` to bypass SSL:

```bash
# 1. Check configuration
curl -k -X GET https://plenitudo.ai/api/substack/test-email

# 2. Send test email
curl -k -X POST https://plenitudo.ai/api/substack/test-email

# 3. Build AI Daily
curl -k -X GET https://plenitudo.ai/api/admin/ai-daily/rebuild

# 4. Send daily newsletter
curl -k -X POST https://plenitudo.ai/api/substack/publish-daily

# 5. Send weekly newsletter
curl -k -X POST https://plenitudo.ai/api/substack/publish-weekly
```

## Option 3: Use Vercel Dashboard

1. Go to Vercel Dashboard → Your Project
2. Go to **Deployments** → Click on latest deployment
3. Go to **Functions** tab
4. Find the API route (e.g., `/api/substack/test-email`)
5. Click **Invoke** button to test

## Option 4: Use Browser (GET requests only)

For GET requests, you can test in your browser:

1. **Check configuration:**
   ```
   https://plenitudo.ai/api/substack/test-email
   ```

2. **Build AI Daily:**
   ```
   https://plenitudo.ai/api/admin/ai-daily/rebuild
   ```

**Note:** POST requests require curl or a tool like Postman.

## Option 5: Fix SSL Certificate

If you want to fix the SSL issue properly:

1. Check Vercel Dashboard → Settings → Domains
2. Verify `plenitudo.ai` is properly configured
3. Check DNS settings match Vercel's requirements
4. Wait for SSL certificate to propagate (can take up to 24 hours)

See `DOMAIN_SETUP.md` for detailed domain configuration.

## Expected Results

### Test Email Success:
```json
{
  "success": true,
  "message": "Test email sent",
  "to": "your-email@example.com",
  "title": "Test Newsletter - ..."
}
```

### Daily Newsletter Success:
```json
{
  "success": true,
  "message": "Daily newsletter sent to personal email",
  "to": "your-email@example.com",
  "itemsCount": 10
}
```

### Weekly Newsletter Success:
```json
{
  "success": true,
  "message": "Weekly newsletter sent to personal email",
  "to": "your-email@example.com",
  "itemsCount": 5,
  "weekOf": "2025-01-XX"
}
```

## Troubleshooting

### Still getting errors?

1. **Check environment variables in Vercel:**
   - `MANUAL_SUBSTACK_EMAIL` is set
   - `RESEND_API_KEY` is set

2. **Check Vercel logs:**
   - Go to Vercel Dashboard → Your Project → Logs
   - Look for error messages

3. **Test with simple endpoint first:**
   ```bash
   curl -k -X GET https://plenitudo.ai/api/healthz
   ```
   This verifies the domain is accessible.

4. **Check Resend dashboard:**
   - Go to https://resend.com/emails
   - See if emails are being sent
   - Check for delivery errors

