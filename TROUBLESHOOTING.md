# Troubleshooting Guide

Common issues and solutions for the Plenitudo.ai development environment.

## 🔧 Cache Issues

### React Client Manifest Errors

**Symptoms:**
```
Error: Could not find the module ".../node_modules/next/dist/..." in the React Client Manifest.
This is probably a bug in the React Server Components bundler.
```

**Solution:**
```bash
# Quick fix: Clear cache and restart
npm run cache:clear
npm run dev

# Or use the clean dev command
npm run dev:clean
```

### Module Not Found Errors (@swc.js, vendor-chunks)

**Symptoms:**
```
Error: Cannot find module './vendor-chunks/@swc.js'
```

**Solution:**
```bash
# Clear all caches
./scripts/clear-cache.sh

# Restart dev server
npm run dev
```

### Persistent Build Errors

**Symptoms:**
- Build fails with module errors
- TypeScript errors that shouldn't exist
- Components not updating after changes

**Solution:**
```bash
# Full cleanup
./scripts/clear-cache.sh
rm -rf node_modules/.cache .next .turbo

# Reinstall dependencies (if needed)
npm install

# Regenerate Prisma Client
npx prisma generate

# Restart
npm run dev
```

## 🗄️ Database Issues

### Prisma Client Out of Sync

**Symptoms:**
```
Error: Unknown argument 'X' in prisma.Y.findMany()
```

**Solution:**
```bash
# Regenerate Prisma Client
npx prisma generate

# If schema changed, push changes
npx prisma db push
```

### Migration Errors

**Symptoms:**
```
Error: Migration failed
Error: Table already exists
```

**Solution:**
```bash
# Check migration status
npx prisma migrate status

# If migration is stuck, mark as applied
npx prisma migrate resolve --applied <migration_name>

# Or reset database (⚠️ deletes data)
npx prisma migrate reset
```

## 🌐 Network/API Issues

### API Routes Returning 500

**Symptoms:**
- API routes fail with 500 errors
- Database connection errors

**Solution:**
1. Check database connection:
   ```bash
   # Test connection
   npx prisma db execute --stdin <<< "SELECT 1"
   ```

2. Verify environment variables:
   ```bash
   # Check .env.local exists and has DATABASE_URL
   cat .env.local | grep DATABASE_URL
   ```

3. Check server logs in terminal

### Rate Limiting Issues

**Symptoms:**
- "Too many requests" errors
- Rate limit not working

**Solution:**
- **In-memory rate limiter**: Works per-instance only (dev)
- **Redis rate limiter**: Requires `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
- Check if Redis is configured in `.env.local`

## 🎨 UI/Component Issues

### Components Not Updating

**Symptoms:**
- Changes to components not reflected
- Stale data in UI

**Solution:**
```bash
# Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
# Or clear Next.js cache
npm run cache:clear
```

### Styling Not Applied

**Symptoms:**
- Tailwind classes not working
- Styles missing

**Solution:**
1. Check `tailwind.config.js` includes correct paths
2. Restart dev server
3. Clear browser cache

## 📦 Dependency Issues

### Package Installation Errors

**Symptoms:**
```
npm ERR! peer dependency missing
npm ERR! cannot resolve module
```

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# If using pnpm/yarn, use their equivalent commands
```

### TypeScript Errors After Package Update

**Solution:**
```bash
# Regenerate types
npm run type-check

# Clear cache
npm run cache:clear
```

## 🚀 Development Server Issues

### Port Already in Use

**Symptoms:**
```
Error: Port 3000 is already in use
```

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Server Won't Start

**Symptoms:**
- Dev server fails to start
- No error message

**Solution:**
```bash
# Check for syntax errors
npm run type-check
npm run lint

# Clear cache and restart
npm run dev:clean
```

## 🔍 Debugging Tips

### Enable Verbose Logging

```bash
# Next.js debug mode
DEBUG=* npm run dev

# Or specific Next.js debug
DEBUG=next:* npm run dev
```

### Check Prisma Query Logs

Add to your Prisma Client initialization:
```typescript
const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});
```

### Inspect Build Output

```bash
# Build with verbose output
npm run build -- --debug

# Check .next directory structure
ls -la .next/server/app
```

## 📚 Additional Resources

- [Next.js Troubleshooting](https://nextjs.org/docs/app/building-your-application/troubleshooting)
- [Prisma Troubleshooting](https://www.prisma.io/docs/guides/troubleshooting)
- [TypeScript Errors](https://www.typescriptlang.org/docs/handbook/error-messages.html)

## 🆘 Still Having Issues?

1. **Check logs**: Look at terminal output for specific error messages
2. **Clear everything**: Run `./scripts/clear-cache.sh` and restart
3. **Verify environment**: Ensure all required env vars are set
4. **Check versions**: Ensure Node.js and npm versions are compatible
5. **Search issues**: Check if it's a known Next.js/Prisma issue

---

**Quick Reference:**
- Clear cache: `npm run cache:clear` or `./scripts/clear-cache.sh`
- Clean dev start: `npm run dev:clean`
- Regenerate Prisma: `npx prisma generate`
- Type check: `npm run type-check`
- Lint: `npm run lint`


