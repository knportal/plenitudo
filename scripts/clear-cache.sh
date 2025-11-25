#!/bin/bash

# Clear Next.js and Node.js caches
# Use this when experiencing bundler errors or module not found issues

set -e

echo "🧹 Clearing Next.js and Node.js caches..."

# Kill any running Next.js processes
echo "🛑 Stopping any running Next.js processes..."
pkill -f "next dev" || true
pkill -f "next build" || true
sleep 2

# Clear Next.js cache
if [ -d ".next" ]; then
  echo "🗑️  Removing .next directory..."
  rm -rf .next
  echo "   ✅ .next removed"
else
  echo "   ℹ️  .next directory not found (already clean)"
fi

# Clear Node.js cache
if [ -d "node_modules/.cache" ]; then
  echo "🗑️  Removing node_modules/.cache..."
  rm -rf node_modules/.cache
  echo "   ✅ node_modules/.cache removed"
else
  echo "   ℹ️  node_modules/.cache not found (already clean)"
fi

# Clear Next.js cache directory (if it exists separately)
if [ -d ".next/cache" ]; then
  echo "🗑️  Removing .next/cache..."
  rm -rf .next/cache
  echo "   ✅ .next/cache removed"
fi

# Clear Turbopack cache (if using Turbopack)
if [ -d ".turbo" ]; then
  echo "🗑️  Removing .turbo cache..."
  rm -rf .turbo
  echo "   ✅ .turbo removed"
fi

echo ""
echo "✅ Cache cleared successfully!"
echo ""
echo "💡 Next steps:"
echo "   1. Restart your dev server: npm run dev"
echo "   2. If issues persist, try: npm install"
echo ""


