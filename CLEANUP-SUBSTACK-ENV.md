# Substack Environment Variables Cleanup Guide

## 🗑️ Variables to Remove from Vercel

These Substack-specific environment variables are no longer used and can be safely removed:

### Remove These:
1. **`SUBSTACK_EMAIL_ADDRESS`** - Was used for email-to-post automation (no longer needed)
2. **`SUBSTACK_API_KEY`** - Was for Substack API integration (never fully implemented, not needed)
3. **`SUBSTACK_PUBLICATION_ID`** - Was for Substack API integration (never fully implemented, not needed)

## ✅ Variables to Keep

### Required for Email Functionality:
1. **`MANUAL_SUBSTACK_EMAIL`** ✅ **KEEP** - Your personal email address where newsletters will be sent
2. **`RESEND_API_KEY`** ✅ **KEEP** - Required for sending emails via Resend
3. **`RESEND_FROM_EMAIL`** ✅ **KEEP** (optional) - Custom "from" address (defaults to `news@plenitudo.ai`)

### Optional (for UI links):
4. **`NEXT_PUBLIC_SUBSTACK_URL`** ⚠️ **OPTIONAL** - Still used in UI components for Substack links
   - If you want to keep Substack links in your UI (CTA buttons, etc.), keep this
   - If you want to remove all Substack references from the UI, you can remove this too

## 📋 Steps to Clean Up in Vercel

1. **Go to Vercel Dashboard**
   - Navigate to your project
   - Go to **Settings → Environment Variables**

2. **Delete Unused Variables:**
   - Delete `SUBSTACK_EMAIL_ADDRESS`
   - Delete `SUBSTACK_API_KEY`
   - Delete `SUBSTACK_PUBLICATION_ID`

3. **Verify Required Variables:**
   - ✅ `MANUAL_SUBSTACK_EMAIL` should be set to your email (e.g., `your-email@example.com`)
   - ✅ `RESEND_API_KEY` should be set to your Resend API key
   - ✅ `RESEND_FROM_EMAIL` (optional) - your custom from address

4. **Optional - Remove Substack URL:**
   - If you want to remove all Substack references from the UI, delete `NEXT_PUBLIC_SUBSTACK_URL`
   - Note: This will remove Substack links from CTA buttons and templates

5. **Redeploy:**
   - After removing variables, trigger a new deployment
   - Or wait for the next automatic deployment

## 🔧 Resend Configuration

**No changes needed in Resend!**

The Resend dashboard itself doesn't need any cleanup. You just need:
- Your `RESEND_API_KEY` in Vercel (already set)
- Your `RESEND_FROM_EMAIL` in Vercel (if you want a custom from address)
- Domain verification in Resend (if using custom domain)

## 📧 Current Email Flow

After cleanup, the email flow is simple:
1. Daily/Weekly newsletters are generated
2. They're sent directly to `MANUAL_SUBSTACK_EMAIL` via Resend
3. You receive the formatted newsletter in your inbox
4. You can manually copy/paste to Substack if desired

## ✅ Summary

**Remove from Vercel:**
- `SUBSTACK_EMAIL_ADDRESS`
- `SUBSTACK_API_KEY`
- `SUBSTACK_PUBLICATION_ID`

**Keep in Vercel:**
- `MANUAL_SUBSTACK_EMAIL` (your email)
- `RESEND_API_KEY` (for sending emails)
- `RESEND_FROM_EMAIL` (optional, for custom from address)
- `NEXT_PUBLIC_SUBSTACK_URL` (optional, only if you want Substack links in UI)

**Resend Dashboard:**
- No changes needed



