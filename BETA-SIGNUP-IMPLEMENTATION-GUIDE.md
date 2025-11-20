# Beta Signup Implementation & Deployment Guide

Complete step-by-step guide for implementing and deploying the beta signup feature with email verification.

## ⚡ Quick Start Checklist

### Local Development
- [ ] Database schema updated
- [ ] Prisma Client regenerated
- [ ] Dev server restarted
- [ ] Test signup flow works
- [ ] Email stub appears in terminal

### Production Deployment
- [ ] Code committed to git
- [ ] Migration file ready
- [ ] Resend account created
- [ ] Resend API key obtained
- [ ] Domain verified in Resend
- [ ] Environment variables set in Vercel
- [ ] Migration run on production DB
- [ ] Test signup in production
- [ ] Verification email received
- [ ] Admin endpoint tested

## 📋 Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Database Setup](#database-setup)
3. [Email Service Configuration](#email-service-configuration)
4. [Testing Locally](#testing-locally)
5. [Production Deployment](#production-deployment)
6. [Post-Deployment Verification](#post-deployment-verification)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)

---

## 🛠️ Local Development Setup

### Step 1: Update Database Schema

✅ **Status**: ✅ COMPLETED

- [x] Added `BetaSignup` model to `prisma/schema.dev.prisma`
- [x] Added `BetaSignup` model to `prisma/schema.prisma`
- [x] Fields: `id`, `email`, `verified`, `verificationToken`, `verifiedAt`, `createdAt`
- [x] Indexes added for `email` and `verificationToken`

### Step 2: Push Schema to Local Database

```bash
# Push dev schema to SQLite database
DATABASE_URL="file:./prisma/dev.db" npx prisma db push --schema=./prisma/schema.dev.prisma
```

**Expected Output**:
```
🚀 Your database is now in sync with your Prisma schema.
✔ Generated Prisma Client
```

### Step 3: Regenerate Prisma Client

```bash
# Generate Prisma Client from dev schema
DATABASE_URL="file:./prisma/dev.db" npx prisma generate --schema=./prisma/schema.dev.prisma
```

**Expected Output**:
```
✔ Generated Prisma Client (v6.16.2)
```

### Step 4: Verify Environment Variables

Check `.env.local` has:
```bash
DATABASE_URL="file:./prisma/dev.db"
```

### Step 5: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
# Then restart
npm run dev
```

**Why**: Prisma Client is cached, restart picks up new schema.

---

## 🗄️ Database Setup

### Development (SQLite)

✅ **Status**: ✅ COMPLETED

- [x] Schema updated in `schema.dev.prisma`
- [x] Database pushed
- [x] Prisma Client regenerated
- [x] Tested locally

### Production (PostgreSQL)

#### Step 1: Create Migration

```bash
# Create migration file (already exists, but verify)
npx prisma migrate dev --name add_beta_signup_verification --create-only
```

**Note**: Migration file already exists at:
`prisma/migrations/20251115093107_add_beta_signup/migration.sql`

#### Step 2: Review Migration File

Verify `prisma/migrations/20251115093107_add_beta_signup/migration.sql` contains:

```sql
CREATE TABLE "BetaSignup" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verificationToken" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ...
);
```

#### Step 3: Test Migration Locally (Optional)

```bash
# Test against production DB (use production DATABASE_URL)
export DATABASE_URL="postgresql://your-prod-url"
npx prisma migrate deploy
```

---

## 📧 Email Service Configuration

### Option A: Resend (Recommended)

#### Step 1: Sign Up for Resend

1. Go to https://resend.com
2. Sign up for free account
3. Verify your email

#### Step 2: Get API Key

1. Go to **API Keys** in dashboard
2. Click **Create API Key**
3. Name it: `plenitudo-beta-signup`
4. Copy the key (starts with `re_`)

#### Step 3: Install Resend Package

```bash
npm install resend
```

#### Step 4: Update Email Service

**File**: `src/server/notifications/email.ts`

Uncomment and update the Resend implementation:

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<void> {
  if (process.env.NODE_ENV === "development") {
    // Still log in dev for testing
    console.log("📧 EMAIL (Resend):", { to, subject });
  }

  const { data, error } = await resend.emails.send({
    from: "Plenitudo.ai <notifications@yourdomain.com>", // Update with your domain
    to: [to],
    subject,
    html,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}
```

#### Step 5: Verify Domain (Production)

1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Enter your domain: `plenitudo.ai` (or your domain)
4. Add DNS records as instructed:
   - SPF record
   - DKIM records
   - DMARC record (optional)
5. Wait for verification (usually 5-10 minutes)

#### Step 6: Set Environment Variables

**Local Development** (`.env.local`):
```bash
RESEND_API_KEY=re_xxx...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Production** (Vercel):
1. Go to **Project Settings → Environment Variables**
2. Add:
   - `RESEND_API_KEY`: `re_xxx...`
   - `NEXT_PUBLIC_APP_URL`: `https://yourdomain.com`

### Option B: Alternative Email Services

#### SendGrid
- Sign up at https://sendgrid.com
- Get API key
- Install: `npm install @sendgrid/mail`
- Update `sendEmail` function

#### AWS SES
- Set up AWS account
- Verify domain/email
- Install: `npm install @aws-sdk/client-ses`
- Configure IAM credentials

---

## 🧪 Testing Locally

### Step 1: Test Signup Flow

1. Start dev server: `npm run dev`
2. Open http://localhost:3000
3. Click "Join beta" button
4. Enter email: `test@example.com`
5. Submit form

**Expected**:
- Modal shows "Check your email!"
- Terminal shows email stub with verification link

### Step 2: Test Email Stub

Check terminal output for:
```
📧 EMAIL STUB (would send via Resend in production)
To: test@example.com
Subject: Verify your email for Plenitudo.ai Beta
---
[HTML email content with verification link]
```

### Step 3: Test Verification Link

1. Copy verification link from terminal
2. Open in browser
3. Should redirect to: `http://localhost:3000/?verified=success`

### Step 4: Test Disposable Email Blocking

1. Try signing up with: `test@tempmail.com`
2. Should see error: "Disposable email addresses are not allowed"

### Step 5: Test Admin Endpoint

```bash
curl http://localhost:3000/api/admin/beta-signups
```

**Expected Response**:
```json
{
  "count": 1,
  "verified": 1,
  "unverified": 0,
  "signups": [
    {
      "id": "...",
      "email": "test@example.com",
      "verified": true,
      "verifiedAt": "2025-11-15T...",
      "createdAt": "2025-11-15T..."
    }
  ]
}
```

### Step 6: View in Database

```bash
# Using Prisma Studio
npm run prisma:studio

# Or using script
npm run view:beta-signups
```

---

## 🚀 Production Deployment

### Step 1: Prepare Code

- [x] Code committed to git (ready to commit)
- [x] Migration file exists (`20251115093107_add_beta_signup`)
- [ ] Email service configured (Resend integration pending)
- [x] Environment variables documented

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Add beta signup with email verification"
git push origin main
```

### Step 3: Deploy to Vercel

1. Go to https://vercel.com
2. Import your GitHub repository (if not already)
3. Vercel will auto-deploy

### Step 4: Set Environment Variables in Vercel

Go to **Project Settings → Environment Variables**:

| Variable | Value | Environment |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://...` | Production |
| `RESEND_API_KEY` | `re_xxx...` | Production |
| `NEXT_PUBLIC_APP_URL` | `https://yourdomain.com` | Production |

**Important**:
- Select **Production** environment for all
- Click **Save** after each variable

### Step 5: Run Database Migration

After first deployment:

```bash
# Option A: Using Vercel CLI
vercel env pull .env.production
export DATABASE_URL="$(grep DATABASE_URL .env.production | cut -d '=' -f2)"
npx prisma migrate deploy

# Option B: Direct connection
export DATABASE_URL="postgresql://your-prod-url"
npx prisma migrate deploy
```

**Expected Output**:
```
✅ Applied migration: 20251115093107_add_beta_signup
```

### Step 6: Verify Domain in Resend

1. Go to Resend dashboard → Domains
2. Add your production domain
3. Add DNS records
4. Wait for verification

### Step 7: Test Production Signup

1. Visit your production site
2. Click "Join beta"
3. Enter real email address
4. Check inbox for verification email
5. Click verification link
6. Verify redirect works

---

## ✅ Post-Deployment Verification

### Checklist

- [ ] Migration applied successfully
- [ ] Environment variables set in Vercel
- [ ] Resend domain verified
- [ ] Test signup works
- [ ] Verification email received
- [ ] Verification link works
- [ ] Email marked as verified in database
- [ ] Admin endpoint accessible
- [ ] Disposable emails blocked

### Test Commands

```bash
# Test signup endpoint
curl -X POST https://yourdomain.com/api/beta-signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Check admin endpoint
curl https://yourdomain.com/api/admin/beta-signups

# Check database directly (if accessible)
# Query: SELECT * FROM "BetaSignup" WHERE verified = true;
```

---

## 📊 Monitoring & Maintenance

### Step 1: Monitor Signup Rate

**Admin API Response**:
```json
{
  "count": 150,
  "verified": 120,
  "unverified": 30
}
```

**Metrics to Track**:
- Total signups
- Verification rate (verified / total)
- Signups per day
- Unverified signups (older than 7 days)

### Step 2: Set Up Alerts (Optional)

**Vercel Logs**:
- Monitor for email sending errors
- Check for database connection issues

**Resend Dashboard**:
- Monitor email delivery rate
- Check bounce/spam rates
- Review domain reputation

### Step 3: Clean Up Old Unverified Signups (Optional)

Create a cron job or script to remove unverified signups older than 30 days:

```typescript
// scripts/cleanup-unverified-signups.ts
const oldSignups = await prisma.betaSignup.deleteMany({
  where: {
    verified: false,
    createdAt: {
      lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    },
  },
});
```

### Step 4: Export Signups (Optional)

```bash
# Export verified signups to CSV
npm run view:beta-signups | grep verified | awk '{print $2}' > verified-signups.csv
```

---

## 🐛 Troubleshooting

### Issue: "Prisma Client not generated"

**Solution**:
```bash
DATABASE_URL="file:./prisma/dev.db" npx prisma generate --schema=./prisma/schema.dev.prisma
# Restart dev server
```

### Issue: "Migration failed"

**Solution**:
```bash
# Check migration status
npx prisma migrate status

# Reset if needed (⚠️ deletes data)
npx prisma migrate reset

# Re-run migration
npx prisma migrate deploy
```

### Issue: "Emails not sending"

**Checklist**:
- [ ] `RESEND_API_KEY` set in environment
- [ ] Domain verified in Resend
- [ ] DNS records added correctly
- [ ] Check Resend dashboard for errors
- [ ] Check Vercel function logs

### Issue: "Verification link not working"

**Checklist**:
- [ ] `NEXT_PUBLIC_APP_URL` set correctly
- [ ] Token exists in database
- [ ] Token not expired (7 days)
- [ ] Check browser console for errors

### Issue: "Disposable emails getting through"

**Solution**:
1. Add domain to `DISPOSABLE_EMAIL_DOMAINS` in `validation.ts`
2. Consider third-party validation API

---

## 📝 Next Steps

### Future Enhancements

- [ ] Add rate limiting to signup endpoint
- [ ] Add CAPTCHA to prevent spam
- [ ] Add email preferences (opt-in/opt-out)
- [ ] Add signup analytics dashboard
- [ ] Add automated welcome email after verification
- [ ] Add email reminder for unverified signups
- [ ] Add export functionality for verified signups

### Integration Ideas

- [ ] Connect to email marketing tool (Mailchimp, ConvertKit)
- [ ] Add to CRM (HubSpot, Salesforce)
- [ ] Send to Slack/Discord on new signup
- [ ] Create admin dashboard page

---

## 📚 Related Documentation

- [EMAIL-VERIFICATION.md](./EMAIL-VERIFICATION.md) - Email verification details
- [DEPLOYMENT-BETA-SIGNUP.md](./DEPLOYMENT-BETA-SIGNUP.md) - Deployment overview
- [README.md](./README.md) - General project setup

---

## ✅ Implementation Status

### Completed ✅
- [x] Database schema (dev + prod)
- [x] API endpoints (signup + verify)
- [x] Email validation (format + disposable)
- [x] Email verification flow
- [x] UI components (modal + messages)
- [x] Admin endpoint
- [x] Migration files
- [x] Documentation
- [x] Local testing (email stub working)

### In Progress 🚧
- [ ] Resend integration (code ready, needs API key + package install)
- [ ] Domain verification (pending)
- [ ] Production deployment (pending)

### Pending ⏳
- [ ] Install Resend package
- [ ] Update email service code
- [ ] Production migration
- [ ] Production testing
- [ ] Monitoring setup
- [ ] Cleanup scripts

---

**Last Updated**: 2025-11-15
**Version**: 1.0

