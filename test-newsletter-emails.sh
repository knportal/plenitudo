#!/bin/bash

# Test Newsletter Email Sending for plenitudo.ai
# Make sure MANUAL_SUBSTACK_EMAIL and RESEND_API_KEY are set in Vercel

DOMAIN="https://plenitudo.ai"

echo "🧪 Testing Newsletter Email Configuration"
echo "=========================================="
echo ""

# Step 1: Check configuration
echo "📋 Step 1: Checking email configuration..."
curl -s -X GET "${DOMAIN}/api/substack/test-email" | jq '.' || echo "⚠️  Could not check configuration"
echo ""
echo ""

# Step 2: Send test email
echo "📧 Step 2: Sending test email..."
echo "This will send a simple test email to verify your setup."
read -p "Press Enter to continue or Ctrl+C to cancel..."
echo ""

TEST_RESULT=$(curl -s -X POST "${DOMAIN}/api/substack/test-email")
echo "$TEST_RESULT" | jq '.' || echo "$TEST_RESULT"
echo ""

if echo "$TEST_RESULT" | grep -q '"success":true'; then
  echo "✅ Test email sent successfully! Check your inbox."
else
  echo "❌ Test email failed. Check the error above."
  exit 1
fi

echo ""
echo ""

# Step 3: Build today's AI Daily (if needed)
echo "📰 Step 3: Building today's AI Daily items..."
echo "This ensures we have content for the daily newsletter."
read -p "Press Enter to continue or Ctrl+C to cancel..."
echo ""

BUILD_RESULT=$(curl -s -X GET "${DOMAIN}/api/admin/ai-daily/rebuild")
echo "$BUILD_RESULT" | jq '.' || echo "$BUILD_RESULT"
echo ""

echo ""
echo ""

# Step 4: Send daily newsletter
echo "📬 Step 4: Sending daily newsletter..."
echo "This will send today's formatted daily newsletter."
read -p "Press Enter to continue or Ctrl+C to cancel..."
echo ""

DAILY_RESULT=$(curl -s -X POST "${DOMAIN}/api/substack/publish-daily")
echo "$DAILY_RESULT" | jq '.' || echo "$DAILY_RESULT"
echo ""

if echo "$DAILY_RESULT" | grep -q '"success":true'; then
  echo "✅ Daily newsletter sent successfully! Check your inbox."
else
  echo "❌ Daily newsletter failed. Check the error above."
  echo "💡 Tip: Make sure today's AI Daily items exist (run step 3 first)."
fi

echo ""
echo ""

# Step 5: Send weekly newsletter
echo "📊 Step 5: Sending weekly newsletter..."
echo "This will send this week's top 5 stories as a weekly digest."
read -p "Press Enter to continue or Ctrl+C to cancel..."
echo ""

WEEKLY_RESULT=$(curl -s -X POST "${DOMAIN}/api/substack/publish-weekly")
echo "$WEEKLY_RESULT" | jq '.' || echo "$WEEKLY_RESULT"
echo ""

if echo "$WEEKLY_RESULT" | grep -q '"success":true'; then
  echo "✅ Weekly newsletter sent successfully! Check your inbox."
else
  echo "❌ Weekly newsletter failed. Check the error above."
  echo "💡 Tip: Make sure this week's AI Daily items exist."
fi

echo ""
echo ""
echo "🎉 Testing complete!"
echo "Check your email inbox (and spam folder) for the newsletters."

