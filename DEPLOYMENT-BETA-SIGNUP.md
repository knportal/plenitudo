# Beta Signup - Production Deployment

> You can **export this document as a PDF** (Print → Save as PDF) and use it as your deployment runbook.

## ✅ What's Already Set Up

1. **Database Schema**: The `BetaSignup` model is already in `prisma/schema.prisma`
2. **API Endpoint**: `/api/beta-signup` is ready to accept signups
3. **Admin Endpoint**: `/api/admin/beta-signups` to view signups
4. **Migration**: Migration file created for production database

## 🚀 Deployment Steps

### Step 1: Run Database Migration

After deploying to production, run the migration:

```bash
# Option A: Run locally against production DB
export DATABASE_URL="postgresql://your-prod-url"
npx prisma migrate deploy

# Option B: Use Vercel CLI
vercel env pull .env.production
npx prisma migrate deploy
```

This will create the `BetaSignup` table in your production PostgreSQL database.

### Step 2: Verify It Works

1. **Test the signup endpoint:**

   ```bash
   curl -X POST https://your-domain.vercel.app/api/beta-signup \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```

2. **View signups (admin endpoint):**
   ```bash
   curl https://your-domain.vercel.app/api/admin/beta-signups
   ```

### Step 3: How It Works in Production

#### Frontend (User Experience)

- User clicks "Join beta" button in header
- Modal opens with email input
- User submits email
- Email is saved to PostgreSQL database
- Success message shown

#### Backend (What Happens)

1. **API Route**: `/api/beta-signup/route.ts`
   - Validates email format
   - Checks for duplicates
   - Saves to `BetaSignup` table in PostgreSQL
   - Returns success/error response

2. **Database**: PostgreSQL (production)
   - Uses `schema.prisma` (not dev schema)
   - Prisma Client auto-generated during build
   - Connection via `DATABASE_URL` env var

3. **Build Process**:
   - `npm run build` runs `prisma generate`
   - Generates Prisma Client from `schema.prisma`
   - Client includes `BetaSignup` model

## 📊 Viewing Signups in Production

### Option 1: Admin API Endpoint

```bash
curl https://your-domain.vercel.app/api/admin/beta-signups
```

Returns JSON:

```json
{
  "count": 5,
  "signups": [
    {
      "id": "clx...",
      "email": "user@example.com",
      "createdAt": "2025-11-15T09:30:00.000Z"
    }
  ]
}
```

### Option 2: Database Direct Access

- **Neon**: Use SQL Editor in dashboard
- **Supabase**: Use Table Editor or SQL Editor
- Query: `SELECT * FROM "BetaSignup" ORDER BY "createdAt" DESC;`

### Option 3: Prisma Studio (Local)

```bash
# Connect to production DB locally
export DATABASE_URL="postgresql://your-prod-url"
npx prisma studio
```

## 🔒 Security Considerations

### Current State

- ✅ `/api/beta-signup` - Public (intended)
- ⚠️ `/api/admin/beta-signups` - **Public** (should be protected)

### Recommended: Protect Admin Endpoint

Add authentication to `/api/admin/beta-signups/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";

export async function GET(request: NextRequest) {
  // Add authentication check
  const authHeader = request.headers.get("authorization");
  const expectedToken = process.env.ADMIN_API_TOKEN;

  if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ... rest of the code
}
```

Then set `ADMIN_API_TOKEN` in Vercel environment variables.

## 🔄 Differences: Dev vs Production

| Aspect            | Development               | Production                 |
| ----------------- | ------------------------- | -------------------------- |
| **Database**      | SQLite (`dev.db`)         | PostgreSQL (Neon/Supabase) |
| **Schema**        | `schema.dev.prisma`       | `schema.prisma`            |
| **Prisma Client** | Generated from dev schema | Generated from prod schema |
| **DATABASE_URL**  | `file:./prisma/dev.db`    | `postgresql://...`         |
| **Migrations**    | `prisma db push`          | `prisma migrate deploy`    |

## ✅ Production Checklist

- [ ] Migration file exists in `prisma/migrations/`
- [ ] `BetaSignup` model in `schema.prisma` ✅
- [ ] `DATABASE_URL` set in Vercel (PostgreSQL)
- [ ] Run `npx prisma migrate deploy` after first deploy
- [ ] Test signup endpoint works
- [ ] Test admin endpoint (consider adding auth)
- [ ] Verify data persists in production DB

## 🐛 Troubleshooting

### "Table does not exist" error

- Run migrations: `npx prisma migrate deploy`

### "Prisma Client not generated"

- Build process should auto-generate
- Check Vercel build logs for `prisma generate`

### "Invalid datasource" error

- Verify `DATABASE_URL` is PostgreSQL (not SQLite)
- Check environment variable in Vercel dashboard

## 📝 Notes

- The signup feature works **automatically** once deployed
- No code changes needed between dev and production
- Only difference is database type (SQLite → PostgreSQL)
- Prisma handles the abstraction

---

## 📄 Step-by-Step Deployment Guide (PDF-Friendly)

This section is a linear checklist for deploying the beta signup feature to production.

### 0. Prerequisites

1. **Accounts**
   - Vercel account (for hosting).
   - PostgreSQL provider (recommended: **Neon** or **Supabase**).
   - Email provider (recommended: **Resend**).
2. **Local tools**
   - Node.js (LTS), npm, Git.

### 1. Set Up Production PostgreSQL

1. Create a new Postgres database (Neon or Supabase).
2. Copy the database connection string (e.g. `postgresql://user:password@host:port/dbname?schema=public`).

### 2. Configure Vercel Project

1. Link this repo to a Vercel project (if not already).
2. In Vercel → **Settings → Environment Variables** (Production):
   - `DATABASE_URL` = your Postgres connection string.
   - `NEXT_PUBLIC_APP_URL` = your production URL (e.g. `https://plenitudo.ai`).
   - `ADMIN_API_TOKEN` = long random string (for securing `/api/admin/beta-signups`).
   - `RESEND_API_KEY` = your Resend API key (see next step).

### 3. Configure Email Provider (Resend – Recommended)

1. Create a **Resend** account.
2. Add and verify your sending domain (e.g. `plenitudo.ai`) and complete the DNS steps (SPF/DKIM).
3. Create an API key in Resend and add it to Vercel as `RESEND_API_KEY`.
4. When ready, update `src/server/notifications/email.ts` to use Resend’s official client while keeping the `sendEmail(to, subject, html)` signature.

### 4. First Production Deploy

1. Ensure local changes are committed and pushed:

   git status
   git commit -am "Prepare beta signup for production" # if needed
   git push origin main 2. Let Vercel auto-deploy.

2. In the Vercel build logs, confirm:
   - `prisma generate` runs against `prisma/schema.prisma`.
   - `npm run build` completes without errors.

### 5. Run Production Database Migration

1. From your local machine:

   cd /path/to/plenitudo.ai
   export DATABASE_URL="postgresql://your-prod-url"
   npx prisma migrate deploy --schema=./prisma/schema.prisma 2. In Neon/Supabase, verify the `BetaSignup` table:

   SELECT \* FROM "BetaSignup" ORDER BY "createdAt" DESC;

   ### 6. Smoke-Test Beta Signup in Production

1. Test the **API** directly:

   curl -X POST https://YOUR_DOMAIN/api/beta-signup \
    -H "Content-Type: application/json" \
    -d '{"email":"you+test@plenitudo.ai"}' 2. Test the **UI flow**:
   - Visit the live site.
   - Click **Join beta** in the header.
   - Submit a test email.
   - Confirm:
     - Success state in the modal.
     - Verification email arrives (if Resend is configured).

1. Click the verification link:
   - It should call `/api/beta-signup/verify?token=...`.
   - You should be redirected to `/` and see the verification banner.

### 7. Verify Data in Production

1. In Neon/Supabase, run:

   SELECT \* FROM "BetaSignup"
   ORDER BY "createdAt" DESC
   LIMIT 20; 2. Confirm:
   - `verified = true` and `verifiedAt` is set for emails that clicked the link.

### 8. Secure the Admin Endpoint (Optional but Recommended)

1. Implement the `ADMIN_API_TOKEN` check in `/api/admin/beta-signups/route.ts` (as shown earlier in this file).
2. Access it with:

   curl https://YOUR_DOMAIN/api/admin/beta-signups \
    -H "Authorization: Bearer YOUR_ADMIN_API_TOKEN"

   ### 9. Monitoring & Maintenance Recommendations

- **Monitoring** (optional, later):
  - Add logging/monitoring (e.g. Vercel Logs, Logtail, Datadog) for:
    - `/api/beta-signup`
    - `/api/beta-signup/verify`
- **Error tracking** (optional):
  - Add an error tracker like **Sentry** for:
    - Server routes (beta signup).
    - Client components (header, modal, `VerificationBanner`).
- **Regular checks**:
  - Monthly:
    - Review the `BetaSignup` table for growth and abuse.
    - Confirm email deliverability.
  - Before schema changes:
    - Update both `schema.dev.prisma` and `schema.prisma`.
    - Regenerate Prisma clients and run `npm run build`.

You can now print this document to PDF from your editor or GitHub (File → Print → Save as PDF) and keep it as your deployment playbook.
