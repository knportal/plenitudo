# Rooms & Chat QA - Quick Checklist

Run this after implementing rooms/chat features.

## Prerequisites ✅
```bash
npm run dev
npm run seed:rooms
# Verify IS_ADMIN=1 in .env
```

## Tests (5 min)

1. **Realtime** 🌐
   - [ ] Open thread in 2 browsers
   - [ ] Send message from A → appears in B instantly
   - [ ] Send message from B → appears in A instantly

2. **Rate Limit** ⏱️
   - [ ] Send 3+ messages in <1 second
   - [ ] See toast: "Too many messages. Please slow down."
   - [ ] RetryAfter shown

3. **Banned Words** 🚫
   - [ ] Send "spam message" → rejected
   - [ ] Send normal message → works

4. **Promote Chat** 📌
   - [ ] Admin: Kebab menu on chat message
   - [ ] Click "Promote to Post"
   - [ ] Post appears in left column

5. **Summarize Chat** 📝
   - [ ] Admin: Click "Summarize chat" button
   - [ ] Pinned Post created at top
   - [ ] Summary includes participants & messages

6. **Hide Message** 👁️
   - [ ] Admin: Hide a message
   - [ ] Regular user: Message not visible
   - [ ] Admin: Message shows "Hidden" badge

## All Pass? ✅
If all checks pass, rooms/chat feature is validated!


