# Rooms - Topic-Based Discussion Feature

Topic rooms for focused, ongoing conversations on specific subjects. Built with Next.js Server Actions, Prisma, and PostgreSQL.

## 🎯 Features

- ✅ **Room Management**: Create and browse topic-specific rooms
- ✅ **Thread Discussions**: Start threads within rooms
- ✅ **Reply System**: Reply to threads with instant updates via Supabase Realtime
- ✅ **Realtime Messaging**: New replies appear instantly across all clients
- ✅ **Smart Sorting**: Top threads by reply count, then newest
- ✅ **Pagination**: Load more threads (5 per page)
- ✅ **Beta Gating**: Thread creation gated by `BETA_START_THREAD` env var
- ✅ **Server-Side Rendering**: All pages are server-rendered with real-time data

## 📊 Data Model

```
Room
├── id (cuid)
├── slug (unique)
├── title
├── description
└── threads[] → Thread

Thread
├── id (cuid)
├── roomId → Room
├── title
├── content
├── authorName
└── posts[] → Post

Post
├── id (cuid)
├── threadId → Thread
├── content
└── authorName
```

## 🚀 Development Setup

### Prerequisites

- Node.js 18+
- PostgreSQL or SQLite (for local dev)
- Supabase project (for Realtime features)

### Local Development with SQLite

```bash
# Generate Prisma client
DATABASE_URL="file:./prisma/dev.db" npx prisma generate --schema=./prisma/schema.dev.prisma

# Push schema to database
DATABASE_URL="file:./prisma/dev.db" npx prisma db push --schema=./prisma/schema.dev.prisma

# Seed initial rooms
DATABASE_URL="file:./prisma/dev.db" npm run seed:rooms

# Start dev server (with thread creation enabled)
BETA_START_THREAD=1 DATABASE_URL="file:./prisma/dev.db" npm run dev
```

### Supabase Realtime Setup

Realtime message delivery requires Supabase Realtime to be enabled:

1. **Create Supabase Project** (if using Supabase for Postgres):
   - Go to https://supabase.com
   - Create a new project
   - Copy your project URL and anon key from Settings → API

2. **Enable Realtime on Post table**:
   - In Supabase Dashboard → Database → Replication
   - Enable replication for the `Post` table
   - Or if using Supabase SQL editor, run:
     ```sql
     ALTER PUBLICATION supabase_realtime ADD TABLE "Post";
     ```

3. **Set Environment Variables**:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
   ```

**Note**: If using Neon or another Postgres provider, you can still use Supabase Realtime by:

- Pointing Supabase to your external Postgres database, OR
- Using Supabase just for Realtime (separate from your main DB)

For production, ensure Supabase Realtime is enabled on the `public.Post` table.

### Production Setup

```bash
# Run migrations (uses production DATABASE_URL)
npx prisma migrate deploy

# Seed rooms
npm run seed:rooms
```

## 📁 File Structure

```
src/
├── app/
│   ├── rooms/
│   │   ├── page.tsx                    # Rooms index
│   │   └── [slug]/
│   │       ├── page.tsx                # Room detail with threads list
│   │       └── thread/
│   │           └── [id]/
│   │               └── page.tsx        # Thread detail with replies
├── components/
│   └── rooms/
│       └── ThreadReplies.tsx          # Client component with Realtime
├── hooks/
│   └── useThreadChatRealtime.ts       # Realtime subscription hook
├── server/
│   ├── db.ts                           # Prisma singleton
│   └── realtime/
│       └── supabase.ts                 # Supabase browser client
scripts/
└── seed-rooms.ts                       # Seed script

prisma/
├── schema.prisma                       # Production schema (PostgreSQL)
└── schema.dev.prisma                    # Dev schema (SQLite)
```

## 🔌 API Routes

All functionality uses Next.js Server Actions (no API routes needed):

- `createThreadAction`: Creates a new thread (beta gated)
- `replyAction`: Creates a reply to a thread

## 🎨 Pages

### `/rooms`

Lists all available rooms from the database.

### `/rooms/[slug]`

Room detail page showing:

- Room description
- Top 5 threads (sorted by reply count)
- "Load more" pagination
- Form to start new thread (if `BETA_START_THREAD=1`)

### `/rooms/[slug]/thread/[id]`

Thread detail page showing:

- Thread title and initial content
- All replies (ordered chronologically)
- Form to add a reply

## 🔐 Beta Gating

Thread creation is gated by the `BETA_START_THREAD` environment variable:

```bash
# Enable thread creation
BETA_START_THREAD=1

# Disable thread creation (default)
# Form shows "Beta only" button, disabled
```

## 🧪 Testing

```bash
# Seed rooms and test data
npm run seed:rooms

# Test locally
BETA_START_THREAD=1 DATABASE_URL="file:./prisma/dev.db" npm run dev
```

## 📝 Seeding

The `seed-rooms.ts` script:

1. Creates/updates 3 default rooms (AI, Mindfulness, Entrepreneurship)
2. Adds 2 starter threads per room (if none exist)

Run manually:

```bash
npm run seed:rooms
```

## 🔄 Data Flow

1. **Room Index** (`/rooms`)
   - Fetches all rooms from DB
   - Server-rendered, revalidates on demand

2. **Room Detail** (`/rooms/[slug]`)
   - Fetches room + top 5 threads (by reply count)
   - Pagination via `?page=2` query param
   - Revalidates after thread creation

3. **Thread Detail** (`/rooms/[slug]/thread/[id]`)
   - Fetches thread + all replies (server-rendered)
   - Subscribes to Supabase Realtime for new Post inserts
   - New replies appear instantly via WebSocket subscription
   - Revalidates after reply submission (server action still runs)

## 🚢 Deployment Notes

1. **Run migrations** before first deploy:

   ```bash
   npx prisma migrate deploy
   ```

2. **Seed rooms** after migration:

   ```bash
   npm run seed:rooms
   ```

3. **Set environment variables**:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `BETA_START_THREAD`: Set to `1` to enable thread creation
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL (for Realtime)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key (for Realtime)

4. **Schema files**:
   - Production uses `schema.prisma` (PostgreSQL)
   - Local dev uses `schema.dev.prisma` (SQLite)

## 🔧 Troubleshooting

### Threads not showing

- Check database connection
- Verify rooms are seeded: `npm run seed:rooms`
- Check Prisma client is generated: `npx prisma generate`

### "Beta only" form disabled

- Set `BETA_START_THREAD=1` in environment
- Restart dev server after setting env var

### Pagination not working

- Check thread count in database
- Verify `searchParams` are being read correctly
- Ensure `hasMore` calculation is correct

### Realtime messages not appearing

- Verify Supabase env vars are set: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Check that Realtime is enabled on `Post` table in Supabase Dashboard → Database → Replication
- Ensure you're using Supabase Postgres (or have Realtime configured for external DB)
- Check browser console for WebSocket connection errors
- Verify the Post table name matches exactly (case-sensitive: `Post` not `post`)

## 📚 Next Steps

Potential enhancements:

- [ ] User authentication system
- [ ] Edit/delete own threads and replies
- [ ] Thread search and filtering
- [ ] Notifications for replies
- [ ] Markdown support in posts
- [ ] Thread categories/tags
- [ ] User profiles
- [ ] Thread pinning
