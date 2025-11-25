# Scaling Guide for AI Daily

## 📊 Current Architecture

- **Hosting**: Vercel (Next.js 15)
- **Database**: Neon PostgreSQL
- **ORM**: Prisma
- **Feeds**: 26 RSS feeds
- **Update Frequency**: Daily cron (11 AM ET)

## 🚀 Scaling Milestones

### ✅ 0-1,000 Users (Current State)

**Status**: Works fine as-is
- All users read the same 5-10 articles daily
- Single database query per page load
- Vercel Hobby plan sufficient

**Cost**: ~$0/month

---

### 🔶 1,000-10,000 Users

**What happens**:
- 100-1,000 page views per day
- Database query times start mattering
- RSS fetching might hit timeout limits

**What you need**:
1. **Database Indexes** ✅ (Just added)
   - `dateISO` index for fast daily lookups
   - `score` index for sorting

2. **Connection Pooling**
   - Add `?pgbouncer=true` to your Neon connection string
   - Or use Prisma Data Proxy (free tier: 10k connections/month)

3. **Vercel Pro Plan**
   - $20/month
   - 60s function timeout (vs 10s on Hobby)
   - Better CDN performance

**Upgrade**:
```bash
# Add pgbouncer to connection string in Vercel env vars
DATABASE_URL="postgresql://...neon.tech/...?pgbouncer=true"
```

**Estimated Cost**: $20/month (Vercel Pro)

---

### 🔶 10,000-100,000 Users

**What happens**:
- 1,000-10,000 page views per day
- API responses need caching
- RSS fetching timeouts become critical
- Database connections may max out

**What you need**:

1. **Response Caching** (Next.js 13+)

   Update `src/app/api/ai-daily/route.ts`:
   ```typescript
   export const dynamic = 'force-static';
   export const revalidate = 3600; // Cache for 1 hour

   export async function GET() {
     // ... existing code
   }
   ```

2. **Separate RSS Fetching into Background Job**

   Move `buildDaily()` to a separate worker/queue:
   - Use Vercel Cron + separate API route
   - Or use a service like Inngest (free tier: 100 runs/month)
   - Or AWS Lambda with EventBridge schedule ($0.20 per million requests)

3. **Read Replicas** (if needed)
   - Neon Pro: $19/month
   - Gives dedicated read DB for queries

**Estimated Cost**: $40-80/month

---

### 🔴 100,000+ Users

**What happens**:
- 10,000+ page views per day
- Need intelligent caching
- Feed parsing becomes bottleneck
- May need horizontal scaling

**What you need**:

1. **Redis Cache** (Upstash: free tier 10k reads/day)

   ```typescript
   // Cache API responses in Redis
   import { Redis } from '@upstash/redis';

   const redis = new Redis({
     url: process.env.UPSTASH_REDIS_URL,
     token: process.env.UPSTASH_REDIS_TOKEN,
   });

   export async function GET() {
     const cached = await redis.get(`ai-daily:${today}`);
     if (cached) return NextResponse.json(cached);

     // ... fetch from DB
     await redis.set(`ai-daily:${today}`, data, { ex: 3600 });
   }
   ```

2. **Queue System for RSS Parsing**

   Options:
   - **Inngest**: $0-20/month for background jobs
   - **Resend Queue**: Email-focused but can handle jobs
   - **BullMQ + Redis**: Self-hosted on Fly.io ($5/month)

3. **Database Scaling**
   - Neon Pro: $19/month (32 GB RAM)
   - Add connection pooling
   - Consider read replicas

4. **CDN/Edge Caching**
   - Vercel already provides this
   - Add `export const dynamic = 'force-static'` to pages

**Estimated Cost**: $60-150/month

---

### 🔴 1M+ Users

**What happens**:
- 100,000+ page views per day
- Need microservices architecture
- Feed parsing must be parallelized
- Database becomes critical path

**What you need**:

1. **Microservices Architecture**
   - Separate API server from frontend
   - Feed parser as independent service
   - Queue system for async processing

2. **Database Clustering**
   - Neon Scale: $39/month (autoscaling)
   - Primary + read replicas
   - Connection pooling required

3. **Distributed Caching**
   - Redis Cluster
   - Multi-region cache invalidation

4. **Monitoring & Observability**
   - Sentry ($26/month starter)
   - Datadog or New Relic ($31/month)
   - Custom analytics

5. **Load Testing**
   - k6 or Apache Bench
   - Identify bottlenecks before launch

**Estimated Cost**: $200-500/month

---

## 🛠️ Quick Wins (Do These Now)

### 1. Add Database Indexes ✅

Already done! Your `schema.prisma` now has:
```prisma
@@index([dateISO])
@@index([score])
```

Run migration:
```bash
npx prisma migrate dev --name add_performance_indexes
```

### 2. Enable Connection Pooling

In Vercel dashboard → Environment Variables:
```
DATABASE_URL=postgresql://...?pgbouncer=true
```

### 3. Add Caching to API

Update `src/app/api/ai-daily/route.ts`:

```typescript
export const revalidate = 3600; // Cache 1 hour
```

### 4. Monitor Function Times

Go to Vercel Dashboard → Deployments → Functions tab
- Watch for any function taking >5 seconds
- RSS cron job should complete in <10s

---

## ⚠️ Breaking Points to Watch

### Current Limits:
- **Vercel Hobby**: 10s function timeout ⚠️
- **Neon Free**: 100 connections, 3 GB storage
- **RSS Feeds**: 26 feeds × ~2s each = ~13s (will timeout on Hobby)

### Signs You're Hitting Limits:

1. **Function Timeouts**
   - Cron job fails to complete
   - API returns 504 errors
   → Upgrade to Vercel Pro

2. **Database Connection Errors**
   - `Too many connections` errors
   - Slow queries
   → Enable connection pooling

3. **Slow Page Loads**
   - TTFB >500ms
   - API takes >100ms
   → Add response caching

---

## 📈 Cost Summary

| Users | Monthly Cost | Plan | Notes |
|-------|-------------|------|-------|
| 0-1k | **$0** | Hobby | Current setup works |
| 1k-10k | **$20-40** | Vercel Pro + pooling | Recommended next step |
| 10k-100k | **$60-150** | Add caching + job queue | Monitor closely |
| 100k-1M | **$200-500** | Microservices + monitoring | Hire DevOps help |
| 1M+ | **$1k+** | Enterprise setup | Full team required |

---

## 🎯 Recommended Next Steps

1. ✅ Add database indexes (done)
2. Enable connection pooling when you hit 1k users
3. Upgrade to Vercel Pro when RSS timeouts occur
4. Add Redis caching at 10k+ users
5. Implement queue system for feed parsing at 50k+ users

**Don't over-engineer!** Most apps never reach 10k active users. Build for the next milestone, not the moon.

---

## 📞 When You Hit Limits

**Database**: Migrate to Neon Scale ($39/month) or move to AWS RDS
**Hosting**: Consider AWS or Google Cloud for custom needs
**Queues**: Move to managed service (AWS SQS, Google Pub/Sub)
**Monitoring**: Use Vercel Analytics + Sentry for errors

---

## 🔍 Monitoring Checklist

- [ ] Page load times <2s
- [ ] API responses <100ms
- [ ] Cron job completes in <10s
- [ ] Database connections <50%
- [ ] Error rate <0.1%
- [ ] Uptime >99.9%

---

*Last updated: December 2024*




