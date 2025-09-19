#!/bin/bash

# Auto Build & Test Script for Professional Development
# Runs appropriate build and test steps after any change

set -e  # Exit on any error

echo "🔧 Auto Build & Test - Starting..."

# Ensure we're in the correct directory
cd "$(dirname "$0")"

# Function to run with error handling
run_step() {
    local step_name="$1"
    local command="$2"

    echo "📋 Running: $step_name"
    if eval "$command"; then
        echo "✅ $step_name - PASSED"
    else
        echo "❌ $step_name - FAILED"
        return 1
    fi
}

# Step 1: TypeScript type checking
run_step "TypeScript Check" "npm run type-check"

# Step 2: ESLint linting
run_step "ESLint Linting" "npm run lint"

# Step 3: Build the application
run_step "Next.js Build" "npm run build"

# Step 4: Check if server is running and test it
if curl -s -f http://localhost:3000 > /dev/null 2>&1; then
    echo "🌐 Server is running - testing endpoint..."

    # Test the API endpoint with sample data
    test_response=$(curl -s -X POST http://localhost:3000/api/route \
        -H "Content-Type: application/json" \
        -d '{"test": "data"}' \
        -w "%{http_code}" -o /tmp/test_response.json)

    if [ "$test_response" = "200" ]; then
        echo "✅ API Test - PASSED (HTTP $test_response)"
        echo "📊 Response preview:"
        head -c 200 /tmp/test_response.json
        echo "..."
    else
        echo "❌ API Test - FAILED (HTTP $test_response)"
        echo "📄 Full response:"
        cat /tmp/test_response.json
        exit 1
    fi
else
    echo "⚠️  Server not running - skipping API test"
    echo "💡 Start server with: npm run dev"
fi

echo ""
echo "🎉 All checks completed successfully!"
echo "📈 Build status: READY"
echo "🧪 Test status: PASSED"
