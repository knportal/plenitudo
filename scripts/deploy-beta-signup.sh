#!/bin/bash

# Beta Signup Production Deployment Script
# This script helps you deploy the beta signup feature to production

set -e

echo "🚀 Beta Signup - Production Deployment"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: Must run from project root"
  exit 1
fi

# Step 1: Check git status
echo "📋 Step 1: Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
  echo "⚠️  You have uncommitted changes:"
  git status --short
  echo ""
  read -p "Do you want to commit these changes? (y/n) " -n 1 -r
  echo ""
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git add .
    git commit -m "Add beta signup feature for production"
    echo "✅ Changes committed"
  else
    echo "⚠️  Proceeding without committing (not recommended)"
  fi
else
  echo "✅ No uncommitted changes"
fi
echo ""

# Step 2: Check if Vercel CLI is installed
echo "📋 Step 2: Checking Vercel CLI..."
if ! command -v vercel &> /dev/null; then
  echo "⚠️  Vercel CLI not found. Installing..."
  npm install -g vercel
else
  echo "✅ Vercel CLI installed"
fi
echo ""

# Step 3: Check Vercel authentication
echo "📋 Step 3: Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
  echo "⚠️  Not logged in to Vercel"
  echo "   Please run: vercel login"
  exit 1
else
  echo "✅ Authenticated with Vercel"
  vercel whoami
fi
echo ""

# Step 4: Environment variables checklist
echo "📋 Step 4: Environment Variables Checklist"
echo "=========================================="
echo ""
echo "Make sure these are set in Vercel (Project Settings → Environment Variables):"
echo ""
echo "  ✅ DATABASE_URL"
echo "     - Your PostgreSQL connection string"
echo "     - Format: postgresql://user:pass@host/db"
echo ""
echo "  ✅ NEXT_PUBLIC_APP_URL"
echo "     - Your production URL"
echo "     - Example: https://plenitudo.ai"
echo ""
echo "  ⚠️  ADMIN_API_TOKEN (optional but recommended)"
echo "     - Random string for securing /api/admin/beta-signups"
echo "     - Generate with: openssl rand -hex 32"
echo ""
echo "  ⚠️  RESEND_API_KEY (optional)"
echo "     - For sending verification emails"
echo "     - Get from: https://resend.com"
echo ""
read -p "Have you set all required environment variables in Vercel? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo ""
  echo "⚠️  Please set environment variables in Vercel dashboard first:"
  echo "   https://vercel.com/dashboard → Your Project → Settings → Environment Variables"
  exit 1
fi
echo ""

# Step 5: Push to git (if not already pushed)
echo "📋 Step 5: Pushing to git..."
if [ -n "$(git status --porcelain)" ]; then
  echo "⚠️  You still have uncommitted changes"
  read -p "Push to remote? (y/n) " -n 1 -r
  echo ""
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git push origin main || git push origin master
    echo "✅ Pushed to remote"
  fi
else
  CURRENT_BRANCH=$(git branch --show-current)
  echo "Current branch: $CURRENT_BRANCH"
  read -p "Push to remote? (y/n) " -n 1 -r
  echo ""
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git push origin $CURRENT_BRANCH || echo "⚠️  Push failed or already up to date"
  fi
fi
echo ""

# Step 6: Deploy to Vercel
echo "📋 Step 6: Deploying to Vercel..."
echo ""
echo "Vercel will auto-deploy when you push to your main branch."
echo "Or you can deploy manually with: vercel --prod"
echo ""
read -p "Deploy now with Vercel CLI? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
  vercel --prod
else
  echo "✅ Skipping manual deploy (Vercel will auto-deploy on push)"
fi
echo ""

# Step 7: Migration reminder
echo "📋 Step 7: Database Migration"
echo "=============================="
echo ""
echo "⚠️  IMPORTANT: Run the production migration after deployment:"
echo ""
echo "   Option A (using Vercel CLI):"
echo "   vercel env pull .env.production"
echo "   npx prisma migrate deploy --schema=./prisma/schema.prisma"
echo ""
echo "   Option B (manual):"
echo "   export DATABASE_URL=\"your-production-url\""
echo "   npx prisma migrate deploy --schema=./prisma/schema.prisma"
echo ""
echo "   Note: Migration was already marked as applied earlier,"
echo "   but verify the BetaSignup table exists in production."
echo ""

# Step 8: Testing
echo "📋 Step 8: Testing Production"
echo "============================="
echo ""
read -p "Enter your production URL (e.g., https://plenitudo.ai): " PROD_URL
if [ -n "$PROD_URL" ]; then
  echo ""
  echo "🧪 Testing production endpoints..."
  echo ""
  echo "1. Testing signup endpoint:"
  curl -X POST "$PROD_URL/api/beta-signup" \
    -H "Content-Type: application/json" \
    -d '{"email":"test+production@example.com"}' \
    -w "\nHTTP Status: %{http_code}\n" || echo "❌ Test failed"
  echo ""
  echo "2. Testing admin endpoint:"
  curl "$PROD_URL/api/admin/beta-signups" \
    -w "\nHTTP Status: %{http_code}\n" || echo "❌ Test failed"
  echo ""
else
  echo "⚠️  Skipping production tests"
fi

echo ""
echo "✅ Deployment checklist complete!"
echo ""
echo "Next steps:"
echo "  1. Verify migration ran successfully"
echo "  2. Test the UI flow on production"
echo "  3. (Optional) Secure admin endpoint with ADMIN_API_TOKEN"
echo ""

