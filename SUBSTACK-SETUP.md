# Substack Setup Guide

Quick setup guide for integrating Substack with Plenitudo.ai.

---

## 🚀 Quick Start

### 1. Create Substack Publication

1. Go to [substack.com](https://substack.com)
2. Sign up or log in
3. Click "Start a publication"
4. Choose a name: **"Plenitudo AI"** or **"Plenitudo Insights"**
5. Set up your publication:
   - Description: "Weekly AI news, insights, and community discussions"
   - Custom domain (optional): `newsletter.plenitudo.ai`

### 2. Configure Subscription Tiers

In Substack dashboard → Settings → Subscription tiers:

**Free Tier:**
- Default (already enabled)
- Weekly AI digest
- Links to public rooms

**Paid Tier:**
- Price: $5-10/month (your choice)
- Early access to AI Daily
- Exclusive rooms
- Deep-dive posts

**Founding Member (Optional):**
- Price: $20-30/month
- All paid benefits
- Direct access to founders
- Beta features

### 3. Set Environment Variables

Add to your `.env.local` (development) and Vercel (production):

```bash
# Your Substack publication URL
NEXT_PUBLIC_SUBSTACK_URL=https://plenitudo.substack.com

# Your app URL (for UTM tracking)
NEXT_PUBLIC_APP_URL=https://plenitudo.ai
```

**In Vercel:**
1. Go to Project Settings → Environment Variables
2. Add both variables
3. Redeploy

### 4. Test Integration

1. **Landing Page:**
   - Visit: `http://localhost:3000/substack`
   - Should show newsletter signup page

2. **Footer Link:**
   - Check footer on homepage
   - Should have "📰 Newsletter" link

3. **CTA Component:**
   - Can be used anywhere: `<SubstackCTA variant="button" />`

---

## 📝 Content Strategy

### Weekly Digest Template

Use this template for your weekly newsletter:

```markdown
# AI Weekly Digest — [Date]

This week's top AI breakthroughs, curated from our AI Daily feed.

## 🔥 Top Stories

### 1. [Title]
[Summary from AI Daily]
💬 [Join the discussion →](https://plenitudo.ai/rooms/ai?utm_source=substack&utm_medium=email&utm_campaign=weekly_digest)

### 2. [Title]
[Summary]
💬 [Join the discussion →](link)

...

## 💬 This Week in Our Community

[Highlight interesting room discussion]

[Read the full thread →](link to thread)

---

**Want more?** Join our AI Rooms for real-time discussions:
→ [plenitudo.ai/rooms/ai](link)

**Paid subscribers** get early access + exclusive rooms.
[Subscribe →](substack link)
```

### Using UTM Tracking

When linking from Substack to your app, use UTM parameters:

```
https://plenitudo.ai/rooms/ai?utm_source=substack&utm_medium=email&utm_campaign=weekly_digest
```

**Helper function:**
```typescript
import { getRoomLinkWithTracking } from "@/lib/substack";

const link = getRoomLinkWithTracking("ai", "weekly_digest");
// Returns: https://plenitudo.ai/rooms/ai?utm_source=substack&utm_medium=email&utm_campaign=weekly_digest
```

---

## 🎨 Using Components

### SubstackCTA Component

Use the reusable CTA component anywhere:

```tsx
import SubstackCTA from "@/components/plenitudo/SubstackCTA";

// Button style
<SubstackCTA variant="button" />

// Link style
<SubstackCTA variant="link" />

// Banner style
<SubstackCTA variant="banner" />
```

### In Room Pages

Add to room descriptions or thread pages:

```tsx
import SubstackCTA from "@/components/plenitudo/SubstackCTA";

// In room page
<div>
  <h2>AI Room</h2>
  <p>Join discussions about AI breakthroughs...</p>
  <SubstackCTA variant="banner" />
</div>
```

---

## 📊 Tracking & Analytics

### UTM Parameters

All Substack links automatically include UTM tracking:

- `utm_source=substack` - Traffic source
- `utm_medium=email` - Traffic medium
- `utm_campaign={campaign_name}` - Campaign identifier

### Check Analytics

1. **Vercel Analytics:**
   - Go to Analytics tab
   - Filter by `utm_source=substack`
   - See which campaigns drive traffic

2. **Substack Analytics:**
   - Dashboard → Analytics
   - Track open rates, click-through rates
   - See which posts drive most traffic

3. **App Analytics:**
   - Track room participation from Substack
   - Monitor conversion: Substack → Room visit → Chat participation

---

## 🔗 Integration Points

### App → Substack

**Footer:**
- Already added newsletter link
- Shows when `NEXT_PUBLIC_SUBSTACK_URL` is set

**Landing Page:**
- `/substack` page for direct signups
- Can be linked from anywhere

**CTA Component:**
- Use `<SubstackCTA />` anywhere in app
- Multiple variants available

### Substack → App

**In Every Post:**
- Link to relevant rooms
- Use UTM tracking
- Example: "💬 Join the discussion → [link]"

**Weekly Digest:**
- Link to AI Daily page
- Link to specific rooms
- Highlight community discussions

---

## 🚀 Launch Checklist

### Pre-Launch
- [ ] Substack publication created
- [ ] Subscription tiers configured
- [ ] Environment variables set
- [ ] Landing page tested (`/substack`)
- [ ] Footer link working
- [ ] 3-5 initial posts written

### Launch Week
- [ ] Publish first post
- [ ] Share on social media
- [ ] Email existing users (if you have a list)
- [ ] Post in relevant communities
- [ ] Monitor analytics

### First Month
- [ ] Publish weekly digest
- [ ] Create 2-4 paid subscriber posts
- [ ] Highlight community discussions
- [ ] Optimize CTAs based on data
- [ ] Iterate on content format

---

## 💡 Content Ideas

### Free Content
- Weekly AI news digest
- Room discussion highlights
- Product updates
- Community spotlights
- "How to use AI Rooms" guides

### Paid Content
- Deep dives on AI trends
- Technical analysis
- Exclusive room access
- Early feature access
- Founder insights
- Industry analysis

---

## 📚 Resources

- **Strategy Document:** [SUBSTACK-GROWTH-STRATEGY.md](./SUBSTACK-GROWTH-STRATEGY.md)
- **Substack Help:** [help.substack.com](https://help.substack.com)
- **Substack API:** [developers.substack.com](https://developers.substack.com) (if needed)

---

## 🆘 Troubleshooting

### Newsletter link not showing
- Check `NEXT_PUBLIC_SUBSTACK_URL` is set
- Restart dev server after adding env var
- Check Vercel env vars are set

### UTM tracking not working
- Verify `NEXT_PUBLIC_APP_URL` is set
- Check links include UTM params
- Use helper functions from `@/lib/substack`

### Landing page not loading
- Check `/substack` route exists
- Verify no build errors
- Check browser console for errors

---

**Ready to launch?** Start with creating your Substack publication! 🚀


