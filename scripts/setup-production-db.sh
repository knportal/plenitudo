#!/bin/bash

# Production Database Setup Script
# Run this AFTER deploying to Vercel to set up your production database

echo "🗄️  AI Daily - Production Database Setup"
echo "========================================"
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL environment variable is not set!"
    echo ""
    echo "Please set your production database URL:"
    echo "  export DATABASE_URL='postgresql://user:pass@host/db'"
    echo ""
    echo "Or run with:"
    echo "  DATABASE_URL='your-url' ./scripts/setup-production-db.sh"
    exit 1
fi

echo "✅ DATABASE_URL is set"
echo ""

# Validate it's not SQLite
if [[ "$DATABASE_URL" == *"file:"* ]]; then
    echo "❌ ERROR: DATABASE_URL appears to be SQLite!"
    echo "   Use a PostgreSQL connection string for production."
    exit 1
fi

echo "📊 Database URL: ${DATABASE_URL:0:30}..." # Show first 30 chars only
echo ""

# Check Prisma schema
echo "🔍 Checking Prisma schema..."
if grep -q 'provider = "postgresql"' prisma/schema.prisma; then
    echo "✅ Schema configured for PostgreSQL"
else
    echo "❌ Schema not configured for PostgreSQL!"
    echo "   Update prisma/schema.prisma: provider = \"postgresql\""
    exit 1
fi
echo ""

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate
echo ""

# Run migrations
echo "🚀 Running database migrations..."
npx prisma migrate deploy
echo ""

# Verify connection
echo "🔌 Testing database connection..."
if npx prisma db pull --force > /dev/null 2>&1; then
    echo "✅ Database connection successful!"
else
    echo "❌ Database connection failed!"
    echo "   Check your DATABASE_URL and network access."
    exit 1
fi
echo ""

# Optional: Run initial rebuild
echo "📰 Would you like to populate the database with today's AI news? (y/n)"
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "🔄 Running initial rebuild..."
    npm run rebuild:ai-daily
    echo ""
fi

echo "✅ Production database setup complete!"
echo ""
echo "Next steps:"
echo "1. Verify cron job is running in Vercel dashboard"
echo "2. Test the API: curl https://your-domain.vercel.app/api/ai-daily"
echo "3. Visit frontend: https://your-domain.vercel.app/daily"
echo ""
