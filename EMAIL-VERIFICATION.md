# Email Verification for Beta Signups

## ✅ What's Implemented

### Email Validation
1. **Format Validation**: Checks for valid email format
2. **Disposable Email Detection**: Blocks common temporary email services
3. **Email Verification**: Requires users to verify their email address

### Flow
1. User submits email → System validates format and checks for disposable emails
2. Verification token generated → Secure token created using crypto
3. Verification email sent → User receives email with verification link
4. User clicks link → Email is verified and added to waitlist
5. Only verified emails count as valid signups

## 🔧 How It Works

### Signup Process
```
User submits email
    ↓
Validate format + check disposable
    ↓
Generate verification token
    ↓
Save to database (verified: false)
    ↓
Send verification email
    ↓
User clicks link in email
    ↓
Mark as verified (verified: true)
```

### Database Schema
```prisma
model BetaSignup {
  id                String    @id @default(cuid())
  email             String    @unique
  verified          Boolean   @default(false)
  verificationToken String?   @unique
  verifiedAt        DateTime?
  createdAt         DateTime  @default(now())
}
```

## 📧 Email Configuration

### Development
- Uses email stub (logs to console)
- Check terminal for email content
- Verification links work with `localhost:3000`

### Production
Requires Resend API key:

1. **Get Resend API Key**:
   - Sign up at https://resend.com
   - Get API key from dashboard

2. **Set Environment Variable**:
   ```bash
   RESEND_API_KEY=re_xxx...
   ```

3. **Update Email Service**:
   - Already configured in `src/server/notifications/email.ts`
   - Uncomment Resend code when ready

4. **Set App URL**:
   ```bash
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```
   Or it will auto-detect from `VERCEL_URL`

## 🚀 Testing

### Local Testing
1. Sign up with email
2. Check terminal for email stub (shows verification link)
3. Copy link and open in browser
4. Should redirect to homepage with `?verified=success`

### Production Testing
1. Sign up with real email
2. Check inbox for verification email
3. Click verification link
4. Email marked as verified in database

## 📊 Viewing Verified Signups

### Admin API
```bash
curl http://localhost:3000/api/admin/beta-signups
```

Returns:
```json
{
  "count": 10,
  "verified": 7,
  "unverified": 3,
  "signups": [
    {
      "id": "...",
      "email": "user@example.com",
      "verified": true,
      "verifiedAt": "2025-11-15T10:30:00Z",
      "createdAt": "2025-11-15T10:25:00Z"
    }
  ]
}
```

### Database Query
```sql
-- All verified signups
SELECT * FROM "BetaSignup" WHERE verified = true;

-- Unverified signups (older than 7 days)
SELECT * FROM "BetaSignup"
WHERE verified = false
AND "createdAt" < NOW() - INTERVAL '7 days';
```

## 🛡️ Security Features

1. **Secure Tokens**: Uses crypto.randomFillSync for token generation
2. **One-time Use**: Token cleared after verification
3. **Disposable Email Blocking**: Prevents temporary email services
4. **Idempotent**: Re-signing up resends verification if not verified

## 🔄 Migration Required

After deploying, run migration to add new fields:

```bash
# Development
DATABASE_URL="file:./prisma/dev.db" npx prisma db push --schema=./prisma/schema.dev.prisma

# Production
npx prisma migrate dev --name add_email_verification
npx prisma migrate deploy
```

## 📝 Disposable Email Domains

Currently blocks these domains:
- 10minutemail.com
- tempmail.com
- guerrillamail.com
- mailinator.com
- throwaway.email
- temp-mail.org
- getnada.com
- mohmal.com
- fakeinbox.com
- trashmail.com
- yopmail.com
- sharklasers.com
- grr.la
- guerrillamailblock.com

To add more, edit `src/server/betaSignup/validation.ts`

## 🎯 Best Practices

1. **Only count verified signups** when reporting waitlist size
2. **Clean up old unverified signups** (optional cron job)
3. **Monitor verification rate** to catch email delivery issues
4. **Resend verification** if user requests it (already implemented)

## 🐛 Troubleshooting

### Emails not sending
- Check `RESEND_API_KEY` is set (production)
- Check terminal logs (development)
- Verify domain in Resend dashboard

### Verification links not working
- Check `NEXT_PUBLIC_APP_URL` is set correctly
- Verify token hasn't expired (7 days)
- Check database for token existence

### Disposable emails getting through
- Add domain to `DISPOSABLE_EMAIL_DOMAINS` array
- Consider using third-party validation API for more coverage

