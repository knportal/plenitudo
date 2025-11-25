# AI Daily Discussion Threads

Automatic daily discussion threads for AI Daily curated news.

## Overview

After each AI Daily rebuild, a discussion thread is automatically created in the "AI Daily" room, allowing users to discuss today's breakthroughs.

## Features

- **Automatic Thread Creation**: After rebuild, creates thread titled `AI Daily — YYYY-MM-DD`
- **Curated Content**: First post contains all today's items with titles, summaries, bullets, and sources
- **Deep Linking**: "Discuss" buttons on `/daily` page link directly to today's thread
- **Search Indexed**: Thread automatically indexed for future search functionality
- **Idempotent**: Safe to run multiple times (won't create duplicates)

## How It Works

### 1. AI Daily Rebuild
When `/api/admin/ai-daily/rebuild` is called:
1. Fetches and curates AI news (existing functionality)
2. Calls `createDailyThread()` to generate discussion thread
3. Returns both item count and thread ID

### 2. Room Creation
`ensureAIDailyRoom()` ensures "AI Daily" room exists:
- Slug: `ai-daily`
- Title: "AI Daily"
- Description: Daily curated AI news discussions

### 3. Thread Creation
`createDailyThread()` handles thread generation:
- Checks if thread exists for today (based on title pattern)
- Fetches today's AI Daily items from database
- Formats thread content with markdown:
  - Title and date
  - List of items with categories, summaries, bullets
  - Sources for each item
- Creates Thread with formatted content
- Indexes for search

### 4. UI Integration
`/daily` page displays discussion link:
- Fetches thread ID via `/api/ai-daily` endpoint
- Shows prominent "Join the Discussion" banner at top
- Each item card has "💬 Discuss" button
- Deep-links directly to `/rooms/ai-daily/thread/{threadId}`

## API Endpoints

### POST `/api/admin/ai-daily/rebuild`
Rebuilds AI Daily and creates discussion thread.

**Response:**
```json
{
  "ok": true,
  "count": 10,
  "threadId": "clxx..."
}
```

### GET `/api/ai-daily`
Fetches today's AI Daily items with discussion link.

**Response:**
```json
{
  "items": [...],
  "threadId": "clxx...",
  "discussUrl": "/rooms/ai-daily/thread/clxx..."
}
```

## Thread Content Format

```markdown
# AI Daily Breakthroughs — 2025-01-15

Welcome to today's discussion! Here are the 10 cross-verified AI news items from 18+ trusted sources:

---

## 1. OpenAI Releases GPT-5 with Multimodal Capabilities

**Category:** research • **Sentiment:** uplift

GPT-5 introduces breakthrough multimodal capabilities across text, vision, and audio...

- Impact: cross-verified by multiple outlets.
- Keep an eye on follow-ups.

**Sources:** OpenAI Blog, TechCrunch, The Verge

---

[... more items ...]

💬 **Join the discussion!** Share your thoughts, insights, or questions about today's AI breakthroughs.
```

## Files

### Core Functionality
- `src/server/aiDaily/createDailyThread.ts` - Thread creation logic
- `src/app/api/admin/ai-daily/rebuild/route.ts` - Rebuild hook
- `src/app/api/ai-daily/route.ts` - Updated to include discuss URL

### UI Components
- `src/components/AIDaily/AIDailyList.tsx` - Updated with discussion links

## Usage

### Manual Trigger (Development)
```bash
# Rebuild AI Daily (creates today's thread)
curl http://localhost:3000/api/admin/ai-daily/rebuild

# Visit the daily page
open http://localhost:3000/daily

# Or directly access the room
open http://localhost:3000/rooms/ai-daily
```

### Automated (Production)
Set up a cron job or scheduled task:
```bash
# Daily at 11 AM ET
0 11 * * * curl https://yourdomain.com/api/admin/ai-daily/rebuild
```

## Edge Cases

### Thread Already Exists
- Safe to run rebuild multiple times per day
- Returns existing thread ID if already created
- No duplicate threads

### No AI Daily Items
- Thread creation fails gracefully
- Rebuild still succeeds (doesn't block)
- No thread link shown on `/daily` page

### Room Doesn't Exist
- Automatically created on first run
- Subsequent runs reuse existing room

## Future Enhancements

1. **Scheduled Summaries**: Auto-summarize chat at end of day
2. **Notifications**: Email subscribers when new thread created
3. **Trending Topics**: Extract trending topics from discussions
4. **Related Threads**: Link to previous days' discussions

## Development

To test locally:
1. Ensure dev server running
2. Seed rooms: `npm run seed:rooms`
3. Rebuild AI Daily: `curl http://localhost:3000/api/admin/ai-daily/rebuild`
4. Visit: `http://localhost:3000/daily`
5. Click "💬 Discuss" button


