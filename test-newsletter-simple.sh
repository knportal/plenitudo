#!/bin/bash

# Simple Newsletter Email Testing Script
# Handles SSL certificate issues and provides clear output

DOMAIN="https://plenitudo.ai"

echo "🧪 Testing Newsletter Email for plenitudo.ai"
echo "=============================================="
echo ""

# Function to make API call with error handling
api_call() {
    local method=$1
    local endpoint=$2
    local description=$3

    echo "📋 $description"
    echo "   Endpoint: $method $endpoint"
    echo ""

    # Try with -k flag to bypass SSL verification and -L to follow redirects
    response=$(curl -k -L -s -w "\n%{http_code}" -X "$method" "${DOMAIN}${endpoint}" 2>&1)
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
        echo "✅ Success (HTTP $http_code)"
        echo "$body" | jq '.' 2>/dev/null || echo "$body"
    else
        echo "❌ Failed (HTTP $http_code)"
        echo "$body"
    fi
    echo ""
    echo "---"
    echo ""
}

# Step 1: Check configuration
api_call "GET" "/api/substack/test-email" "Step 1: Checking email configuration"

# Step 2: Send test email
echo "📧 Step 2: Sending test email..."
echo "   This will send a simple test email to verify your setup."
read -p "   Press Enter to send test email (or Ctrl+C to cancel)..."
echo ""
api_call "POST" "/api/substack/test-email" "Sending test email"

# Step 3: Build AI Daily
echo "📰 Step 3: Building today's AI Daily items..."
echo "   This ensures we have content for the daily newsletter."
read -p "   Press Enter to build AI Daily (or Ctrl+C to cancel)..."
echo ""
api_call "GET" "/api/admin/ai-daily/rebuild" "Building AI Daily items"

# Step 4: Send daily newsletter
echo "📬 Step 4: Sending daily newsletter..."
echo "   This will send today's formatted daily newsletter."
read -p "   Press Enter to send daily newsletter (or Ctrl+C to cancel)..."
echo ""
api_call "POST" "/api/substack/publish-daily" "Sending daily newsletter"

# Step 5: Send weekly newsletter
echo "📊 Step 5: Sending weekly newsletter..."
echo "   This will send this week's top 5 stories as a weekly digest."
read -p "   Press Enter to send weekly newsletter (or Ctrl+C to cancel)..."
echo ""
api_call "POST" "/api/substack/publish-weekly" "Sending weekly newsletter"

echo ""
echo "🎉 Testing complete!"
echo "📬 Check your email inbox (and spam folder) for the newsletters."
echo ""
echo "💡 Note: If you see SSL errors, the -k flag was used to bypass"
echo "   certificate verification for testing purposes."

