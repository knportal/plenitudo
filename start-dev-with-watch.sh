#!/bin/bash

# Start Development Server with Auto-Watch
# This script starts both the dev server and the watch system

set -e

echo "🚀 Starting Development Environment with Auto-Watch..."

# Kill any existing processes
echo "🧹 Cleaning up existing processes..."
pkill -f "next dev" || true
pkill -f "auto-watch" || true
sleep 2

# Clear cache if .next exists and is older than 1 day (optional auto-cleanup)
# Uncomment the lines below to enable automatic cache clearing
# if [ -d ".next" ]; then
#   CACHE_AGE=$(find .next -type f -name "*.js" -mtime +1 2>/dev/null | wc -l)
#   if [ "$CACHE_AGE" -gt 0 ]; then
#     echo "🧹 Clearing stale cache (older than 1 day)..."
#     rm -rf .next node_modules/.cache
#   fi
# fi

# Start the development server in background
echo "🌐 Starting Next.js development server..."
npm run dev &
DEV_PID=$!

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 5

# Check if server is running
if curl -s -f http://localhost:3000 > /dev/null 2>&1 || curl -s -f http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Development server is running"
else
    echo "❌ Development server failed to start"
    exit 1
fi

# Start the watch system
echo "👀 Starting auto-watch system..."
node auto-watch.js &
WATCH_PID=$!

echo ""
echo "🎉 Development environment started successfully!"
echo "📱 Server: http://localhost:3000 (or 3001 if 3000 is busy)"
echo "👀 Watch: Monitoring src/ and public/ for changes"
echo "🛑 Press Ctrl+C to stop both processes"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping development environment..."
    kill $DEV_PID 2>/dev/null || true
    kill $WATCH_PID 2>/dev/null || true
    pkill -f "next dev" || true
    pkill -f "auto-watch" || true
    echo "✅ Cleanup complete"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for processes
wait
