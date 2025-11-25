# AI Daily - Production Deployment Guide

## 🚀 Deploying to Vercel

### Step 1: Provision Production Database

Choose one of these options:

#### Option A: Neon (Recommended - Serverless PostgreSQL)

1. Go to https://neon.tech
2. Sign up and create a new project
3. Name it `plenitudo-ai-daily`
4. Copy the connection string from the dashboard
   - Format: `postgresql://user:password@endpoint.neon.tech/dbname`

#### Option B: Supabase (PostgreSQL with extras)

1. Go to https://supabase.com
2. Create a new project
3. Go to **Settings → Database → Connection String → URI**
4. Copy the connection string
   - Format: `postgresql://postgres:password@db.project.supabase.co:5432/postgres`

#### Option C: PlanetScale (MySQL - requires schema changes)

1. Go to https://planetscale.com
2. Create a new database
3. Copy the connection string
   - Note: Requires changing `provider` to `mysql` in schema.prisma

---

### Step 2: Push Your Code to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Add AI Daily feature"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/plenitudo.ai.git
git branch -M main
git push -u origin main
```

---

### Step 3: Deploy to Vercel

1. Go to https://vercel.com
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

---

### Step 4: Set Environment Variables in Vercel

Go to **Project Settings → Environment Variables** and add:

| Name              | Value                            | Environment                      |
| ----------------- | -------------------------------- | -------------------------------- |
| `DATABASE_URL`    | `postgresql://user:pass@host/db` | Production                       |
| `TZ`              | `America/New_York`               | Production, Preview, Development |
| `BETA_START_THREAD` | `1` (optional)                 | Production, Preview, Development |

**Important:**
- Make sure to select the appropriate environments for each variable!
- `BETA_START_THREAD` enables thread creation in Rooms. Omit or set to `0` to disable.

---

### Step 5: Run Database Migrations

After deploying, you need to set up your production database:

#### Option A: Run migrations locally against production DB

```bash
# Temporarily set production DATABASE_URL
export DATABASE_URL="postgresql://your-prod-url"

# Run migrations
npx prisma migrate deploy

# Or create a fresh migration
npx prisma migrate dev --name init_production
```

#### Option B: Use Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Run migration via Vercel function
vercel env pull .env.production
npx prisma migrate deploy
```

#### Option C: Create a setup script

Add this script to run migrations on first deploy:

**scripts/setup-production.ts:**

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Setting up production database...");

  // Test connection
  await prisma.$connect();
  console.log("✅ Database connected");

  // Run seed if needed
  console.log("Database is ready!");
}

main()
  .catch((e) => {
    console.error("❌ Setup failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Run it once after deploy:

```bash
npx tsx scripts/setup-production.ts
```

---

### Step 6: Verify Deployment

1. **Check Vercel Cron:**
   - Go to **Project Settings → Cron Jobs**
   - Verify `vercel.json` cron is registered
   - Should show: `/api/admin/ai-daily/rebuild` running at `0 11 * * *` (11 AM ET daily)

2. **Test the API:**

   ```bash
   # Test public API
   curl https://your-domain.vercel.app/api/ai-daily

   # Trigger manual rebuild
   curl https://your-domain.vercel.app/api/admin/ai-daily/rebuild
   ```

3. **Visit the frontend:**
   - https://your-domain.vercel.app/daily

---

### Step 7: First-Time Data Population

After deployment, populate your database:

```bash
# AI Daily data
# Option 1: Via API (recommended)
curl https://your-domain.vercel.app/api/admin/ai-daily/rebuild

# Option 2: Via Vercel CLI
vercel env pull .env.production
npm run rebuild:ai-daily

# Rooms (seed initial rooms and threads)
vercel env pull .env.production
npm run seed:rooms
```

---

## 📊 Production Checklist

- [ ] Database provisioned (Neon/Supabase/PlanetScale)
- [ ] Environment variables set in Vercel
  - [ ] `DATABASE_URL` (required)
  - [ ] `TZ` (optional, defaults to America/New_York)
  - [ ] `BETA_START_THREAD` (optional, set to `1` to enable thread creation)
- [ ] Code pushed to GitHub
- [ ] Project deployed to Vercel
- [ ] Database migrations run
- [ ] Rooms seeded: `npm run seed:rooms`
- [ ] Cron job verified in Vercel dashboard
- [ ] First data rebuild completed
- [ ] Frontend tested at `/daily`
- [ ] Frontend tested at `/rooms`
- [ ] API tested at `/api/ai-daily`

---

## 🔧 Troubleshooting

### Database Connection Issues

```bash
# Test connection locally with production URL
export DATABASE_URL="postgresql://your-prod-url"
npx prisma db pull
```

### Vercel Function Timeout

If the rebuild takes too long:

1. Go to **Project Settings → Functions**
2. Increase **Max Duration** (Pro plan required for >10s)

### Cron Not Running

1. Check **Deployments → Functions** tab
2. Verify `vercel.json` is in the root
3. Check cron logs in **Project → Logs**

### Migration Errors

```bash
# Reset and recreate migrations
npx prisma migrate reset --force
npx prisma migrate deploy
```

---

## 🎯 Post-Deployment Optimization

1. **Add Database Indexing:**

   ```prisma
   model AIDailyItem {
     // ... existing fields
     @@index([dateISO])
     @@index([score])
   }
   ```

2. **Enable Connection Pooling:**
   - Add `?pgbouncer=true` to Neon connection string
   - Or use Prisma Data Proxy

3. **Monitor Performance:**
   - Use Vercel Analytics
   - Add Sentry for error tracking
   - Monitor database metrics in Neon/Supabase dashboard

4. **Set up Staging Environment:**
   - Create a staging branch
   - Deploy to Vercel preview
   - Use separate staging database

---

## 📚 Additional Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Prisma Production Guide](https://www.prisma.io/docs/guides/deployment/deployment)
- [Neon Documentation](https://neon.tech/docs)
- [Next.js Production Checklist](https://nextjs.org/docs/going-to-production)

---

## 🆘 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Review database connection in provider dashboard
3. Test locally with production DATABASE_URL
4. Check Vercel function logs for runtime errors
