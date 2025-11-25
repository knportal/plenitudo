# Plenitudo.ai

A modern Next.js platform for curated AI news, topic discussions, and community engagement.

## 🎯 Features

- **[AI Daily](README-AI-DAILY.md)**: Automated cross-verified AI news aggregation from 18+ trusted sources
- **[Rooms](README-ROOMS.md)**: Topic-based discussion forums with threads and replies (beta)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL (production) or SQLite (local dev)

### Local Development

```bash
# Install dependencies
npm install

# For local dev, use SQLite
DATABASE_URL="file:./prisma/dev.db" npx prisma generate --schema=./prisma/schema.dev.prisma
DATABASE_URL="file:./prisma/dev.db" npx prisma db push --schema=./prisma/schema.dev.prisma

# Seed data
DATABASE_URL="file:./prisma/dev.db" npm run seed:rooms

# Start dev server
BETA_START_THREAD=1 DATABASE_URL="file:./prisma/dev.db" npm run dev
```

Visit:

- Home: http://localhost:3000
- AI Daily: http://localhost:3000/daily
- Rooms: http://localhost:3000/rooms

## 📚 Documentation

- **[AI Daily Feature](README-AI-DAILY.md)** - News aggregation system
- **[Rooms Feature](README-ROOMS.md)** - Discussion forums
- **[Deployment Guide](DEPLOYMENT.md)** - Production setup
- **[Domain Setup](DOMAIN_SETUP.md)** - Custom domain configuration
- **[Scaling Guide](SCALING.md)** - Performance optimization
- **[Development Rules](DEVELOPMENT_RULES.md)** - Coding standards and automation

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run dev:full         # Dev server + auto-watch
npm run dev:clean       # Clear cache and start dev server

# Cache Management
npm run cache:clear      # Clear Next.js and Node.js caches

# Database
npm run seed:rooms       # Seed rooms and threads
npm run seed:ai-daily    # Seed AI Daily data
npm run rebuild:ai-daily # Rebuild AI Daily from feeds

# Quality
npm run lint             # ESLint
npm run type-check       # TypeScript check
npm run build            # Production build
npm run check-all        # Run all quality checks

# Testing
npm test                 # Run tests
npm run test:run         # Run tests once
```

## 🐛 Troubleshooting

Experiencing bundler errors, module not found issues, or cache problems? See **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** for solutions.

**Quick fix for cache issues:**

```bash
npm run cache:clear && npm run dev
```

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL (Prisma ORM)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Language**: TypeScript

## 📁 Project Structure

```
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (site)/       # Main site routes
│   │   ├── api/          # API routes
│   │   └── rooms/        # Rooms feature routes
│   ├── components/       # React components
│   ├── server/           # Server utilities (Prisma, etc.)
│   └── types/            # TypeScript types
├── prisma/
│   ├── schema.prisma     # Production schema (PostgreSQL)
│   └── schema.dev.prisma # Dev schema (SQLite)
├── scripts/              # Seed and utility scripts
└── public/               # Static assets
```

## 🔐 Environment Variables

### Core Variables

| Variable       | Description                            | Required | Example                          |
| -------------- | -------------------------------------- | -------- | -------------------------------- |
| `DATABASE_URL` | Database connection string             | Yes      | `postgresql://user:pass@host/db` |
| `TZ`           | Timezone (default: `America/New_York`) | No       | `America/New_York`               |

### Feature Flags (Development)

| Variable               | Description                                   | Required | Example |
| ---------------------- | --------------------------------------------- | -------- | ------- |
| `BETA_START_THREAD`    | Enable thread creation (`1` to enable)        | No       | `1`     |
| `IS_ADMIN`             | Enable admin features (dev/staging only)      | No       | `1`     |
| `NEXT_PUBLIC_IS_ADMIN` | Client-side admin features (dev/staging only) | No       | `1`     |

⚠️ **Never set `IS_ADMIN=1` in production!** Use proper auth instead.

### Realtime Chat (Optional)

| Variable                        | Description            | Required | Example                                   |
| ------------------------------- | ---------------------- | -------- | ----------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL   | No\*     | `https://xxx.supabase.co`                 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | No\*     | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

\* Required for instant real-time chat updates. Without these, chat works with manual refresh.

### Rate Limiting (Optional)

| Variable                   | Description              | Required | Example                  |
| -------------------------- | ------------------------ | -------- | ------------------------ |
| `UPSTASH_REDIS_REST_URL`   | Upstash Redis REST URL   | No\*\*   | `https://xxx.upstash.io` |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token | No\*\*   | `AXXXxxx...`             |

\*\* Required for distributed rate limiting in production. Falls back to in-memory (single-instance only).

### Email Notifications (Optional)

| Variable         | Description                            | Required | Example     |
| ---------------- | -------------------------------------- | -------- | ----------- |
| `RESEND_API_KEY` | Resend API key for email notifications | No\*\*\* | `re_xxx...` |

\*\*\* Required for production email. Currently uses console stubs in development.

### Substack Integration (Optional)

| Variable                   | Description                   | Required   | Example                          |
| -------------------------- | ----------------------------- | ---------- | -------------------------------- |
| `NEXT_PUBLIC_SUBSTACK_URL` | Substack publication URL      | No\*\*\*\* | `https://plenitudo.substack.com` |
| `NEXT_PUBLIC_APP_URL`      | Your app URL for UTM tracking | No\*\*\*\* | `https://plenitudo.ai`           |

\*\*\*\* Required for Substack newsletter integration. See [SUBSTACK-GROWTH-STRATEGY.md](./SUBSTACK-GROWTH-STRATEGY.md) for setup.

---

### Example `.env.local` (Development)

```bash
# Database (local SQLite or Neon PostgreSQL)
DATABASE_URL="file:./prisma/dev.db"

# Feature flags (dev only)
BETA_START_THREAD=1
IS_ADMIN=1
NEXT_PUBLIC_IS_ADMIN=1

# Optional: Supabase Realtime (see setup below)
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional: Upstash Redis (for rate limiting)
# UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
# UPSTASH_REDIS_REST_TOKEN=your-token

# Optional: Resend (for emails)
# RESEND_API_KEY=re_xxx...

# Optional: Substack (for newsletter integration)
# NEXT_PUBLIC_SUBSTACK_URL=https://plenitudo.substack.com
# NEXT_PUBLIC_APP_URL=https://plenitudo.ai
```

---

## 🔧 Optional Feature Setup

### Supabase Realtime (Instant Chat Updates)

Without Supabase, chat works with manual browser refresh. To enable instant real-time updates:

**1. Create Supabase Project**

- Go to https://supabase.com
- Create a free project
- Wait ~2 minutes for provisioning

**2. Get API Credentials**

- Project Settings → API
- Copy `Project URL` and `anon/public` key

**3. Add to Environment**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**4. Enable Realtime on `ChatMessage` Table**

- Supabase Dashboard → Database → Replication
- Enable replication for `ChatMessage` table
- Or run this SQL:

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE "ChatMessage";
```

**5. Restart Server**

```bash
npm run dev
```

**6. Verify**

- Open thread in two browser windows
- Send message from one → appears instantly in the other ✅

### Upstash Redis (Distributed Rate Limiting)

For production with multiple server instances:

**1. Create Upstash Account**

- Go to https://upstash.com
- Create a Redis database

**2. Get REST Credentials**

- Database → REST API tab
- Copy REST URL and token

**3. Add to Environment**

```bash
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXXXxxx...
```

**4. Deploy**

- Rate limiting automatically uses Redis when configured
- Falls back to in-memory if not set

### Resend Email (Production Notifications)

**1. Sign up at https://resend.com**

**2. Get API Key**

- API Keys → Create API Key

**3. Add to Environment**

```bash
RESEND_API_KEY=re_xxx...
```

**4. Verify Domain**

- Follow Resend instructions to verify your sending domain

**5. Update Email Service**

- Uncomment Resend code in `src/server/notifications/email.ts`
- Replace stubs with actual Resend API calls

---

## 🚢 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete production setup instructions.

Quick deploy checklist:

1. Provision PostgreSQL database (Neon/Supabase)
2. Push code to GitHub
3. Deploy to Vercel
4. Set environment variables
5. Run migrations: `npx prisma migrate deploy`
6. Seed rooms: `npm run seed:rooms`
7. Verify cron job for AI Daily rebuilds

## 📄 License

Private - All rights reserved

## 🤝 Contributing

This is a private project. For questions or issues, please contact the maintainer.

---

Built with intention — minimal, accessible, and a touch futuristic.
