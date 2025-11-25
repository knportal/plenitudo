# RSS Feed Monitoring System

## Overview

The RSS feed monitoring system automatically validates all RSS feeds, tracks their health status, and identifies broken feeds that need attention.

## Features

- ✅ **Automatic Validation**: Check all 63 RSS feeds for health status
- 📊 **Health Tracking**: Database-backed tracking of feed status, response times, and failures
- ⚠️ **Broken Feed Detection**: Automatically identifies feeds with 3+ consecutive failures
- 📈 **Performance Metrics**: Tracks response times and item counts
- 🔄 **Scheduled Monitoring**: Can be run daily or weekly

## Usage

### Manual Validation

Run the validation script to check all feeds:

```bash
npm run validate:feeds
```

This will:
- Validate all RSS feeds
- Update health status in database
- Report broken/degraded feeds
- Show summary statistics

### API Endpoints

#### Validate All Feeds

```bash
GET /api/admin/feeds/validate
```

**Response:**
```json
{
  "success": true,
  "validation": {
    "total": 63,
    "healthy": 58,
    "degraded": 3,
    "broken": 2,
    "results": [...]
  },
  "brokenFeeds": [
    {
      "feedUrl": "https://example.com/feed",
      "feedLabel": "Example Feed",
      "consecutiveFailures": 5,
      "lastSuccess": null,
      "errorMessage": "Timeout after 10000ms"
    }
  ],
  "summary": {
    "total": 63,
    "checked": 63,
    "neverChecked": 0,
    "byStatus": {
      "healthy": 58,
      "degraded": 3,
      "broken": 2
    },
    "avgResponseTime": 1245,
    "lastChecked": "2025-01-15T10:30:00Z"
  }
}
```

#### Check Feed Health (No Validation)

```bash
GET /api/admin/feeds/health
```

Returns current health status without running validation. Useful for quick status checks.

## Feed Status Types

- **`healthy`**: Feed is working correctly, returns items, fast response
- **`degraded`**: Feed works but has issues (slow, no items, etc.)
- **`broken`**: Feed is not accessible or returns errors
- **`unknown`**: Feed has not been checked yet

## Database Schema

The `FeedHealth` model tracks:

- `feedUrl`: Unique RSS feed URL
- `feedLabel`: Human-readable feed name
- `status`: Current health status
- `lastChecked`: When feed was last validated
- `lastSuccess`: Last successful fetch timestamp
- `consecutiveFailures`: Number of consecutive failures
- `errorMessage`: Latest error message (if any)
- `responseTime`: Response time in milliseconds
- `itemCount`: Number of items in last successful fetch

## Scheduled Monitoring

### Option 1: Cron Job (Recommended)

Add to your crontab to run weekly:

```bash
# Run every Monday at 2 AM
0 2 * * 1 cd /path/to/plenitudo.ai && npm run validate:feeds
```

### Option 2: Vercel Cron Job

Add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/admin/feeds/validate",
      "schedule": "0 2 * * 1"
    }
  ]
}
```

### Option 3: GitHub Actions

Create `.github/workflows/validate-feeds.yml`:

```yaml
name: Validate RSS Feeds

on:
  schedule:
    - cron: '0 2 * * 1'  # Every Monday at 2 AM
  workflow_dispatch:  # Allow manual trigger

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run validate:feeds
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

## Handling Broken Feeds

When a feed is marked as broken:

1. **Check the error message** to understand the issue
2. **Verify the feed URL** manually in a browser
3. **Check if the publisher changed their feed URL**
4. **Consider finding a replacement feed** from the same publisher
5. **Update `feeds.ts`** with the new URL or remove the broken feed

### Finding Replacement Feeds

If a feed is broken, try:

1. Visit the publisher's website
2. Look for RSS feed links (usually in footer or `/feed`, `/rss`, `/atom.xml`)
3. Test the new URL manually
4. Update `feeds.ts` with the replacement

## Integration with AI Daily Build

The `buildDaily` function currently tries all feeds. You can optionally modify it to skip feeds marked as broken:

```typescript
// In buildDaily.ts
import { getBrokenFeeds } from "./validateFeeds";

const brokenUrls = new Set((await getBrokenFeeds()).map(f => f.feedUrl));
const activeFeeds = FEEDS.filter(f => !brokenUrls.has(f.url));
```

## Best Practices

1. **Run validation weekly** to catch issues early
2. **Monitor consecutive failures** - feeds with 3+ failures need attention
3. **Check stale feeds** - feeds not checked in 7+ days
4. **Keep feed list updated** - remove broken feeds, add replacements
5. **Document feed changes** - note why feeds were added/removed

## Troubleshooting

### Feed returns 0 items

- Check if the feed actually has recent content
- Verify the feed URL is correct
- Some feeds may be temporarily empty

### Feed times out

- Increase timeout in `validateFeeds.ts` (currently 10 seconds)
- Check if the publisher's server is slow
- Consider marking as "degraded" if it still works

### Database migration needed

After adding the `FeedHealth` model, run:

```bash
npx prisma migrate dev --name add_feed_health
```

For production:

```bash
npx prisma migrate deploy
```

## Future Enhancements

- [ ] Automatic feed replacement suggestions
- [ ] Email/Slack notifications for broken feeds
- [ ] Feed quality scoring based on content relevance
- [ ] Historical trend analysis (response times, item counts)
- [ ] Integration with feed discovery services

