#!/bin/bash

# Test Beta Signup Endpoint
# Usage: ./scripts/test-beta-signup.sh [local|production] [email]

MODE="${1:-local}"
EMAIL="${2:-test+$(date +%s)@example.com}"

if [ "$MODE" = "local" ]; then
  URL="http://localhost:3000"
  echo "🧪 Testing LOCAL beta signup endpoint..."
  echo "   Make sure your dev server is running: npm run dev"
  echo ""
else
  # Try to get production URL from environment or use default
  if [ -f ".env.production" ]; then
    PROD_URL=$(grep "NEXT_PUBLIC_APP_URL" .env.production | cut -d '=' -f2 | tr -d '"' | tr -d "'")
  fi

  if [ -z "$PROD_URL" ]; then
    echo "❌ Production URL not found in .env.production"
    echo "   Please provide your production URL:"
    echo "   ./scripts/test-beta-signup.sh production https://your-domain.vercel.app test@example.com"
    exit 1
  fi

  URL="$PROD_URL"
  echo "🌐 Testing PRODUCTION beta signup endpoint..."
  echo ""
fi

echo "📧 Testing with email: $EMAIL"
echo "📍 Endpoint: $URL/api/beta-signup"
echo ""

# Test signup
echo "1️⃣  Testing POST /api/beta-signup"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$URL/api/beta-signup" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\"}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo "   HTTP Status: $HTTP_CODE"
echo "   Response: $BODY"
echo ""

if [ "$HTTP_CODE" = "201" ] || [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Signup successful!"
else
  echo "❌ Signup failed"
fi

echo ""
echo "2️⃣  Testing GET /api/admin/beta-signups"
ADMIN_RESPONSE=$(curl -s -w "\n%{http_code}" "$URL/api/admin/beta-signups")
ADMIN_HTTP_CODE=$(echo "$ADMIN_RESPONSE" | tail -n1)
ADMIN_BODY=$(echo "$ADMIN_RESPONSE" | sed '$d')

echo "   HTTP Status: $ADMIN_HTTP_CODE"
echo "   Response: $ADMIN_BODY"
echo ""

if [ "$ADMIN_HTTP_CODE" = "200" ]; then
  echo "✅ Admin endpoint working!"
  # Try to parse and show count
  COUNT=$(echo "$ADMIN_BODY" | grep -o '"count":[0-9]*' | cut -d':' -f2 || echo "?")
  echo "   Total signups: $COUNT"
else
  echo "❌ Admin endpoint failed"
fi

