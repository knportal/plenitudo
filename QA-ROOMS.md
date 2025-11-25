# Rooms & Chat QA Testing Script

**Purpose**: Validate all rooms/chat functionality in local development.

**Prerequisites**:
- Dev server running (`npm run dev`)
- Seed data loaded (`npm run seed:rooms`)
- Admin mode enabled (`IS_ADMIN=1` in `.env`)

---

## Test Setup

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Ensure seed data exists**:
   ```bash
   npm run seed:rooms
   ```

3. **Verify admin mode** (check `.env`):
   ```
   IS_ADMIN=1
   ```

4. **Open two browser windows** (or use incognito + regular):
   - Window A: `http://localhost:3000` (or your dev port)
   - Window B: `http://localhost:3000` (different browser/session)

---

## Test 1: Real-time Messaging ✅

**Goal**: Verify bidirectional real-time chat updates.

### Steps:
1. **Window A**: Navigate to `/rooms/ai` (or any room)
2. **Window A**: Click on the first thread
3. **Window B**: Navigate to the same thread URL
4. **Window A**: Send a chat message (e.g., "Hello from Window A")
5. **Window B**: Should see the message appear automatically without refresh
6. **Window B**: Send a reply (e.g., "Hello from Window B")
7. **Window A**: Should see the reply appear automatically

### Expected Result:
- ✅ Messages appear in real-time in both windows
- ✅ No page refresh needed
- ✅ Messages ordered chronologically
- ✅ Avatar/author names display correctly

---

## Test 2: Rate Limiting UX ⏱️

**Goal**: Verify rate limit triggers and shows friendly toast.

### Steps:
1. Open a thread with chat panel
2. In the chat composer, type a message
3. **Rapidly send 3+ messages within 1 second** (click "Send" quickly)
4. Observe the UI behavior

### Expected Result:
- ✅ First 2 messages send successfully
- ✅ 3rd message blocked by rate limit
- ✅ Toast notification appears: "Too many messages. Please slow down."
- ✅ Toast shows retryAfter countdown
- ✅ Input disabled or shows "Rate limited" state
- ✅ Toast auto-dismisses after ~5 seconds
- ✅ After waiting, can send messages again

---

## Test 3: Content Filtering (Banned Words) 🚫

**Goal**: Verify banned words are rejected with clear error.

### Steps:
1. In chat composer, type: `spam message`
2. Click "Send"
3. Try another: `test123 this is spam`
4. Send a normal message (should work)

### Expected Result:
- ✅ Messages with "spam" or "test123" are rejected
- ✅ Error toast appears: "Message contains inappropriate content"
- ✅ Normal messages send successfully
- ✅ Optimistic UI message removed on rejection

---

## Test 4: Promote Chat to Post 📌

**Goal**: Verify admin can promote chat messages to long-form Posts.

### Steps:
1. As admin (Window A with `IS_ADMIN=1`), navigate to a thread
2. In the chat panel, hover over a chat message
3. Click the kebab menu (three dots) on the message
4. Click "Promote to Post"
5. Check the Posts section (left column)

### Expected Result:
- ✅ Kebab menu visible on hover (admin only)
- ✅ "Promote to Post" option available
- ✅ New Post appears in left column (Posts section)
- ✅ Post content includes: "Promoted from chat by @Moderator on YYYY-MM-DD"
- ✅ Original chat message content included
- ✅ Page refreshes/updates automatically

---

## Test 5: Summarize Chat 📝

**Goal**: Verify chat summarization creates pinned Post.

### Steps:
1. Ensure thread has some chat messages (send a few if needed)
2. In thread header, click "Summarize chat" button (admin only)
3. Wait for button to finish (shows "Summarizing...")
4. Check Posts section (left column)

### Expected Result:
- ✅ "Summarize chat" button visible in thread header (admin only)
- ✅ Button shows loading state while processing
- ✅ New Post created with title: "Chat Summary (HH:MM, TZ)"
- ✅ Post is **pinned** (amber highlight, "Pinned" badge)
- ✅ Post appears at **top** of Posts list
- ✅ Summary includes participant names and recent messages
- ✅ Summary formatted with markdown (## title)

---

## Test 6: Hide/Unhide Messages (Admin) 👁️

**Goal**: Verify admin can hide messages and visibility differs.

### Steps:

#### As Admin:
1. In chat panel, hover over any message
2. Click kebab menu (three dots)
3. Click "Hide message"
4. Message should still be visible to you (admin)
5. Check for "Hidden" badge on message

#### As Regular User (Window B, or without IS_ADMIN):
1. Navigate to same thread
2. Check chat panel
3. Verify hidden messages are **not visible**

#### Unhide:
1. As admin, click kebab on hidden message
2. Click "Unhide message"
3. As regular user, refresh/check - message should now be visible

### Expected Result:
- ✅ Admin sees kebab menu on all messages
- ✅ "Hide message" / "Unhide message" option available
- ✅ Hidden messages show "Hidden" badge (admin only)
- ✅ Hidden messages **disappear** for regular users
- ✅ Regular users cannot see hidden messages in real-time or pagination
- ✅ Unhiding restores visibility for all users

---

## Test 7: Pinned Posts Ordering 📌

**Goal**: Verify pinned posts always appear first.

### Steps:
1. Create a regular Post (reply form)
2. Create a chat summary (pinned Post)
3. Create another regular Post
4. Observe Posts list order

### Expected Result:
- ✅ Pinned posts (summaries) appear at **top**
- ✅ Regular posts appear below pinned posts
- ✅ Posts within same category (pinned vs regular) ordered by `createdAt` ascending
- ✅ Visual distinction: Pinned posts have amber ring and "Pinned" badge

---

## Test 8: Edge Cases 🔍

### 8.1 Empty Chat
- Open a new/empty thread
- Verify empty state: "No messages yet. Start the conversation!"

### 8.2 Long Messages
- Send a message with 500 characters (max limit)
- Verify character counter shows "500/500"
- Try 501 characters - should be blocked

### 8.3 Special Characters in Mentions
- Send message: "@user-name @user_name @user123"
- Check console logs (dev) for mention emails

### 8.4 Search Indexing (Development)
- Create a new Post
- Check console logs: `[SEARCH] Would index 1 document(s)`
- Create a summary
- Check console logs for summary indexing

---

## Common Issues & Fixes

### Realtime not working:
- ✅ Check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env`
- ✅ Verify Supabase Realtime enabled on `ChatMessage` table
- ✅ Check browser console for WebSocket connection errors

### Rate limit not triggering:
- ✅ Verify Redis/memory rate limiter is working (check console logs)
- ✅ Try sending exactly 2 messages in <1 second, then immediately a 3rd

### Admin features not visible:
- ✅ Verify `IS_ADMIN=1` in `.env`
- ✅ Restart dev server after env changes
- ✅ Check `NEXT_PUBLIC_IS_ADMIN=1` for client-side checks

### Messages not appearing:
- ✅ Check browser console for errors
- ✅ Verify database connection
- ✅ Check Supabase Realtime subscription status

---

## Quick Validation Checklist

- [ ] Real-time messaging works bidirectionally
- [ ] Rate limit toast appears and blocks excessive sends
- [ ] Banned words rejected with clear error
- [ ] Chat messages can be promoted to Posts
- [ ] Summarize chat creates pinned Post at top
- [ ] Hidden messages invisible to regular users
- [ ] Hidden messages visible to admin with badge
- [ ] Pinned posts render at top of list
- [ ] All features work without page refresh
- [ ] Console shows search indexing logs (dev mode)

---

## Notes

- All tests assume local development environment
- For production testing, update URLs and verify email delivery
- Rate limiting uses in-memory fallback if Redis not configured
- Search indexing is no-op in current implementation (logs only)


