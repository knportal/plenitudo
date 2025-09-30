#!/bin/bash

# AI Daily Deployment Checklist
# Run this before deploying to Vercel

echo "🚀 AI Daily - Pre-Deployment Checklist"
echo "======================================="
echo ""

# Check 1: Git status
echo "📋 Checking Git status..."
if git diff-index --quiet HEAD --; then
    echo "✅ No uncommitted changes"
else
    echo "⚠️  You have uncommitted changes. Commit them before deploying."
    git status --short
fi
echo ""

# Check 2: Tests
echo "🧪 Running tests..."
if npm run test:run > /dev/null 2>&1; then
    echo "✅ All tests passing"
else
    echo "❌ Tests failing! Fix them before deploying."
fi
echo ""

# Check 3: Environment variables
echo "🔐 Checking environment variables..."
if [ -f ".env" ]; then
    echo "✅ .env file exists"
    if grep -q "DATABASE_URL" .env; then
        echo "✅ DATABASE_URL is set"
    else
        echo "❌ DATABASE_URL not found in .env"
    fi
    if grep -q "TZ" .env; then
        echo "✅ TZ is set"
    else
        echo "⚠️  TZ not set in .env (optional)"
    fi
else
    echo "⚠️  No .env file found (may need to set in Vercel)"
fi
echo ""

# Check 4: Prisma schema
echo "🗄️  Checking Prisma schema..."
if grep -q 'provider = "postgresql"' prisma/schema.prisma; then
    echo "✅ Using PostgreSQL (production-ready)"
elif grep -q 'provider = "sqlite"' prisma/schema.prisma; then
    echo "❌ Still using SQLite! Change to PostgreSQL for production."
    echo "   Run: sed -i '' 's/provider = \"sqlite\"/provider = \"postgresql\"/' prisma/schema.prisma"
fi
echo ""

# Check 5: Vercel config
echo "⏰ Checking Vercel cron configuration..."
if [ -f "vercel.json" ]; then
    echo "✅ vercel.json exists"
    if grep -q "crons" vercel.json; then
        echo "✅ Cron jobs configured"
    else
        echo "⚠️  No cron jobs found in vercel.json"
    fi
else
    echo "❌ vercel.json not found!"
fi
echo ""

# Check 6: Build test
echo "🏗️  Testing build..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Build successful"
else
    echo "❌ Build failed! Fix build errors before deploying."
fi
echo ""

# Final summary
echo "📝 Deployment Summary"
echo "====================="
echo ""
echo "Before deploying to Vercel, ensure:"
echo "1. ✅ Set DATABASE_URL in Vercel env vars (PostgreSQL connection string)"
echo "2. ✅ Set TZ=America/New_York in Vercel env vars"
echo "3. ✅ Run migrations: npx prisma migrate deploy (with production DATABASE_URL)"
echo "4. ✅ Trigger first rebuild: curl https://your-domain.vercel.app/api/admin/ai-daily/rebuild"
echo ""
echo "📚 See DEPLOYMENT.md for detailed instructions"
echo ""
