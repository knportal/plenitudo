# Substack Integration Plan

**Date:** 2025-01-XX
**Status:** 🚧 In Progress

This document outlines the plan and implementation for integrating Substack newsletters into the AI Daily feed system.

---

## 🎯 Integration Goals

1. **RSS Feed Integration** (Phase 1) - Add Substack newsletters as RSS sources
2. **Enhanced Metadata** (Phase 2) - Extract author, publication name, subscriber count
3. **API Integration** (Phase 3) - Use Substack API for advanced features (optional)
4. **Cross-Posting** (Phase 4) - Automatically publish AI Daily summaries to Substack (optional)

---

## 📋 Phase 1: RSS Feed Integration (Recommended Start)

### Overview
Substack newsletters provide RSS feeds in the format:
```
https://[publication].substack.com/feed
```

This fits perfectly into the existing RSS feed architecture.

### Implementation Steps

1. **Add Substack Feeds to `feeds.ts`**
   - Add popular AI/tech Substack newsletters
   - Format: `{ label: "Publication Name", url: "https://[name].substack.com/feed" }`

2. **Update Publisher Recognition**
   - Update `publisherLabel()` in `buildDaily.ts` to recognize Substack domains
   - Extract publication name from Substack URL

3. **Add Reputation Scores**
   - Add Substack publications to `PUBLISHER_REP` map
   - Tier 3: High-reputation newsletters (e.g., The Batch, Stratechery)
   - Tier 2: Established newsletters
   - Tier 1: Emerging newsletters

4. **Test Integration**
   - Add 3-5 sample Substack feeds
   - Verify RSS parsing works
   - Check publisher recognition
   - Test in AI Daily rebuild

### Recommended Substack Newsletters

**Tier 3 (High Reputation):**
- The Batch (Andrew Ng) - `https://www.deeplearning.ai/the-batch/feed`
- Stratechery (Ben Thompson) - `https://stratechery.com/feed/`
- Not Boring (Packy McCormick) - `https://www.notboring.co/feed`
- Platformer (Casey Newton) - `https://www.platformer.news/feed`

**Tier 2 (Established):**
- AI Breakfast - `https://aibreakfast.substack.com/feed`
- The Neuron - `https://www.theneuron.ai/feed`
- AI Tool Report - `https://aitoolreport.substack.com/feed`
- The Gradient - `https://thegradient.pub/feed` (if they have Substack)

**Tier 1 (Emerging):**
- Various AI-focused newsletters

### Substack RSS Feed Format

Substack RSS feeds typically include:
- Standard RSS fields (title, link, description, pubDate)
- Author information
- Publication metadata
- Full content (for free posts) or excerpts (for paid posts)

---

## 📋 Phase 2: Enhanced Metadata Extraction

### Goals
- Extract publication name from Substack URL
- Identify author names
- Detect paid vs. free content
- Extract subscriber counts (if available via API)

### Implementation
- Enhance `publisherFromUrl()` to handle Substack domains
- Parse Substack-specific metadata from RSS feed
- Add `author` field to `FeedSource` type (optional)

---

## 📋 Phase 3: Substack API Integration (Optional)

### Overview
Substack doesn't have an official public API, but there are community solutions:

1. **Unofficial APIs:**
   - SubstackAPI by Noah Bjorner (Node.js)
   - Substack API Wrapper by Nick Hagar (Python)

2. **Use Cases:**
   - Fetch subscriber counts
   - Access paywalled content (with auth)
   - Get detailed post metadata
   - Manage subscriptions

### Implementation Considerations
- Requires API keys
- Unofficial APIs may break
- Only needed for advanced features
- Can be added later if needed

---

## 📋 Phase 4: Cross-Posting to Substack (Optional)

### Overview
Automatically publish AI Daily summaries to a Substack newsletter.

### Use Cases
- Daily AI news digest
- Weekly roundups
- Automated content distribution

### Implementation
- Substack API or webhook integration
- Format AI Daily items as Substack posts
- Schedule posts (daily/weekly)
- Handle authentication

---

## 🚀 Quick Start: Phase 1 Implementation

### Step 1: Add Substack Feeds

Add to `src/server/aiDaily/feeds.ts`:

```typescript
// Substack newsletters
{
  label: "The Batch (DeepLearning.AI)",
  url: "https://www.deeplearning.ai/the-batch/feed",
},
{
  label: "Stratechery",
  url: "https://stratechery.com/feed/",
},
// ... more feeds
```

### Step 2: Update Publisher Recognition

Update `publisherLabel()` in `buildDaily.ts`:

```typescript
if (host.includes("substack.com")) {
  // Extract publication name from URL
  const match = url.match(/https?:\/\/([^.]+)\.substack\.com/);
  return match ? match[1].replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "Substack";
}
```

### Step 3: Add Reputation Scores

Add to `PUBLISHER_REP` map:

```typescript
["The Batch", 3],
["Stratechery", 3],
["Not Boring", 3],
// ... more
```

---

## 📊 Testing Plan

1. **Unit Tests:**
   - Test Substack URL parsing
   - Test publisher name extraction
   - Test RSS feed fetching

2. **Integration Tests:**
   - Add 3-5 Substack feeds
   - Run `buildDaily()` and verify items appear
   - Check publisher names are correct
   - Verify items are classified correctly

3. **Manual Testing:**
   - Rebuild AI Daily: `npm run rebuild:ai-daily`
   - Check terminal logs for Substack items
   - Verify items appear in `/daily` page
   - Check publisher badges show correct names

---

## 🔧 Configuration

### Environment Variables
None required for Phase 1 (RSS only).

For Phase 3 (API):
```bash
SUBSTACK_API_KEY=your_key_here
SUBSTACK_PUBLICATION_ID=your_publication_id
```

---

## 📝 Notes

- **RSS Feed Availability:** All Substack newsletters have RSS feeds (free and paid)
- **Content Access:** RSS feeds may only include excerpts for paid content
- **Rate Limiting:** Substack RSS feeds are public, no rate limiting concerns
- **Publisher Names:** Extract from URL or use feed metadata

---

## ✅ Success Criteria

Phase 1 Complete When:
- [ ] 5+ Substack feeds added to `feeds.ts`
- [ ] Publisher recognition works for Substack domains
- [ ] Reputation scores added
- [ ] Items from Substack appear in AI Daily
- [ ] Publisher names display correctly
- [ ] No errors in build logs

---

## 🔮 Future Enhancements

- [ ] Substack-specific genre classification
- [ ] Author attribution in UI
- [ ] Substack publication badges
- [ ] Link to full Substack post
- [ ] Subscriber count display (if available)
- [ ] Filter by Substack publications

---

**Ready to implement?** Let's start with Phase 1! 🚀


