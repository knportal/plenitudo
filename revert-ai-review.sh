#!/bin/bash

# Revert AI Code Review Changes
# This script safely removes AI-powered code review and restores original setup

echo "🔄 Reverting AI Code Review System..."
echo ""

# Check if backup exists
if [ ! -f "code-quality.backup.js" ]; then
    echo "❌ Error: Backup file not found (code-quality.backup.js)"
    echo "   Cannot safely revert. Original file may have been lost."
    exit 1
fi

# Restore original code-quality.js
echo "📦 Restoring original code-quality.js..."
cp code-quality.backup.js code-quality.js
echo "✅ Restored code-quality.js"

# Remove AI-specific files (optional - keep for reference)
read -p "Remove AI review files? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️  Removing AI review files..."
    rm -f ai-code-review.js
    rm -f .ai-review-config.json
    echo "✅ Removed AI review files"
else
    echo "⏭️  Keeping AI review files for reference"
fi

# Note about package.json
echo ""
echo "⚠️  Note: AI review scripts are still in package.json"
echo "   They won't cause issues but can be removed manually if desired:"
echo "   - npm run ai:review"
echo "   - npm run ai:review:staged"
echo "   - npm run ai:review:deep"
echo ""

echo "✅ Revert complete! Original code quality system restored."
echo ""
echo "You can now use:"
echo "  - npm run quality (original static analysis)"
echo "  - npm run watch (automated testing)"
echo "  - npm run dev:full (dev server + watch)"





