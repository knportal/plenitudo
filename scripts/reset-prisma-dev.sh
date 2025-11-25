#!/bin/bash

echo "🔄 Resetting Prisma for development..."
echo ""

# Clear Next.js cache
echo "Clearing Next.js cache..."
rm -rf .next

# Clear Prisma cache
echo "Clearing Prisma cache..."
rm -rf node_modules/.prisma

# Regenerate Prisma Client from dev schema
echo "Regenerating Prisma Client from dev schema..."
DATABASE_URL="file:./prisma/dev.db" npx prisma generate --schema=./prisma/schema.dev.prisma

echo ""
echo "✅ Done! Now restart your dev server with: npm run dev"

