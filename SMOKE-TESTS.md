# Post-Deployment Smoke Tests

Quick verification checklist after deploying to production.

**Run these tests immediately after deployment to verify core functionality.**

---

## Prerequisites

- [ ] Deployment completed successfully
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Seed data loaded (if first deploy)

---

## 1. Health Check ✅

**Test**: Verify server and database connectivity

```bash
# Should return 200 with {"status":"healthy"}
curl https://yourdomain.com/api/healthz
```

**Expected**:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-01T...",
  "database": "connected"
}
```

- [ ] Returns 200 status code
- [ ] JSON contains `"status":"healthy"`
- [ ] Database shows "connected"

---

## 2. Homepage ✅

**Test**: Main landing page loads

```bash
curl -I https://yourdomain.com/
```

**Expected**:
- [ ] Returns 200 status code
- [ ] Page loads in browser
- [ ] No console errors (check DevTools)

---

## 3. AI Daily ✅

**Test**: AI Daily page displays items

**Visit**: `https://yourdomain.com/daily`

**Check**:
- [ ] Page loads without errors
- [ ] AI Daily items displayed (or "No items" message if not rebuilt)
- [ ] If items exist, "Join the Discussion" banner visible
- [ ] "Discuss" buttons present on items

---

## 4. Rooms Index ✅

**Test**: Rooms listing page

**Visit**: `https://yourdomain.com/rooms`

**Check**:
- [ ] Page loads without errors
- [ ] Room cards displayed (AI, Mindfulness, Entrepreneurship)
- [ ] Click on "AI" room → navigates to room page

---

## 5. Room & Threads ✅

**Test**: Room page with threads

**Visit**: `https://yourdomain.com/rooms/ai`

**Check**:
- [ ] Room page loads
- [ ] Thread list displays
- [ ] Click on a thread → thread page loads
- [ ] Thread shows Posts (left) and Live Chat (right) columns

---

## 6. Chat Functionality ✅

**Test**: Send a chat message

**On any thread page**:

**Steps**:
1. Scroll to Live Chat panel (right side)
2. Enter name (optional)
3. Type message: "Smoke test message"
4. Click Send

**Check**:
- [ ] Message sends without errors
- [ ] Message appears in chat (refresh if needed)
- [ ] Character counter works (0/500)
- [ ] No console errors

---

## 7. Rate Limiting ✅

**Test**: Verify rate limiting is active

**Steps**:
1. Send 11 messages rapidly in chat
2. Observe button behavior

**Check**:
- [ ] After ~10 messages, send button disables
- [ ] Button shows "Rate limited" text
- [ ] No server errors in logs

---

## 8. Content Filtering ✅

**Test**: Banned words are blocked

**Steps**:
1. Try to send: "spam message"
2. Observe result

**Check**:
- [ ] Message rejected
- [ ] Error toast/message shown
- [ ] Message does not appear in chat

---

## 9. Admin Features (If Enabled) ⚠️

**Only test if `IS_ADMIN=1` in production** (not recommended)

**Steps**:
1. Open any thread
2. Check for admin features

**Check**:
- [ ] "Summarize chat" button visible in header
- [ ] Kebab menu (⋮) on chat messages
- [ ] Can promote messages to posts
- [ ] Can hide/unhide messages

**Note**: In production, admin features should use proper authentication, not env vars.

---

## 10. AI Daily Auto-Thread (Optional) 📰

**Test**: AI Daily discussion thread creation

**Steps**:
1. Trigger rebuild: `curl https://yourdomain.com/api/admin/ai-daily/rebuild`
2. Visit: `https://yourdomain.com/daily`
3. Click "Discuss" button

**Check**:
- [ ] Rebuild succeeds (returns `{"ok":true}`)
- [ ] Discussion banner appears on /daily
- [ ] Clicking "Discuss" navigates to AI Daily thread
- [ ] Thread contains today's curated items
- [ ] Source links are clickable

---

## 🔍 Server Logs Check

**Check server logs for**:

✅ **Good Signs**:
- `✅ Using Redis rate limiter` (if Redis configured)
- `✓ Compiled` or similar build success
- No error stack traces

❌ **Bad Signs**:
- Database connection errors
- Prisma errors
- Unhandled exceptions
- 500 errors

---

## 🚨 Critical Issues Checklist

If ANY of these fail, investigate immediately:

- [ ] Health check returns 503 → Database issue
- [ ] Pages return 500 → Server error
- [ ] Chat messages don't save → Database schema issue
- [ ] Rate limiting not working → Security issue

---

## ✅ Success Criteria

**Minimum passing score: 8/10 core tests** (excluding admin features)

If all core tests pass:
- ✅ **Deployment successful**
- ✅ **Ready for user traffic**
- ✅ **Monitor for first 24 hours**

---

## 📊 Monitoring Recommendations

After smoke tests pass:

1. **Set up monitoring** (Vercel Analytics, Sentry, etc.)
2. **Monitor error rates** for first 24 hours
3. **Check database query performance**
4. **Verify rate limiting effectiveness**
5. **Monitor memory usage** (in-memory rate limit)

---

## 🔗 Quick Links

- Health Check: `/api/healthz`
- Homepage: `/`
- AI Daily: `/daily`
- Rooms: `/rooms`
- Sample Thread: `/rooms/ai/thread/[first-thread-id]`

---

## ⏱️ Expected Duration

**Full smoke test suite**: ~5-10 minutes

**Quick validation** (tests 1-6): ~2 minutes

---

## 🐛 If Something Fails

1. Check `/api/healthz` first
2. Review server logs
3. Verify environment variables set correctly
4. Check database migrations applied
5. Verify seed data loaded
6. Review [DEPLOYMENT.md](DEPLOYMENT.md) for troubleshooting

---

**Run these tests on every deployment to ensure stability!** 🚀


