# Substack Setup - Step-by-Step Production Guide

**Goal:** Set up automated daily AI Daily posts and weekly newsletters on Substack.

**Important:** We'll test in production (not localhost) to avoid deployment issues.

---

## ✅ STEP 1: Create Substack Publication

### What You'll Do:

Create your Substack publication and get the email-to-post address.

### Instructions:

1. **Go to Substack:**
   - Visit [substack.com](https://substack.com)
   - Sign up or log in

2. **Create Publication:**
   - Click **"Start a publication"**
   - Choose a name: **"Plenitudo AI"** or **"Plenitudo Insights"**
   - Add description: "Daily AI news, insights, and community discussions"
   - Click **"Create publication"**

3. **Get Email-to-Post Address:**
   - Go to **Settings** (gear icon in top right)
   - Click **"Email"** in left sidebar
   - Find **"Post via email"** section
   - Copy the email address (format: `your-publication+post@substack.com`)
   - **Save this email address** - you'll need it in Step 3

4. **Set Up Subscription Tiers:**
   - Go to **Settings → Subscription tiers**
   - **Free tier:** Already enabled (for daily posts)
   - **Paid tier:** Click "Add paid tier"
     - Set price: $5-10/month (your choice)
     - Add description: "Weekly deep dives, exclusive analysis, early access"
   - Click **"Save"**

5. **Test Email-to-Post (Optional but Recommended):**
   - Send a test email to your `+post@substack.com` address
   - Subject: "Test Post"
   - Body: "This is a test"
   - Check your Substack dashboard - you should see the post appear
   - **If it works, you're ready for Step 2!**

### ✅ Step 1 Complete When:

- [ ] Substack publication created
- [ ] Email-to-post address copied
- [ ] Subscription tiers configured
- [ ] Test email worked (optional but recommended)

### 📝 What You Need for Next Step:

- Your Substack email-to-post address: `_________________@substack.com`
- Your Substack publication URL: `https://_________________.substack.com`

---

---

## ✅ STEP 2: Set Up Email Service (Resend)

### What You'll Do:

Set up Resend (email service) to send formatted posts to Substack's email-to-post address.

### Instructions:

1. **Sign Up for Resend:**
   - Go to [resend.com](https://resend.com)
   - Click **"Sign Up"** (use your email)
   - Verify your email address

2. **Get Your API Key:**
   - Once logged in, go to **"API Keys"** in the left sidebar
   - Click **"Create API Key"**
   - Name it: `Substack Automation`
   - Select permissions: **"Sending access"** (full access)
   - Click **"Add"**
   - **Copy the API key immediately** (you won't see it again!)
   - Format: `re_xxxxxxxxxxxxx...`
   - **Save this API key** - you'll need it in Step 3

3. **Verify Your Domain (Optional but Recommended):**
   - Go to **"Domains"** in left sidebar
   - Click **"Add Domain"**
   - Enter your domain: `plenitudo.ai` (or your domain)
   - Follow the DNS setup instructions
   - Add the DNS records to your domain provider
   - Wait for verification (can take a few minutes)
   - **Note:** You can skip this for now and use Resend's default domain, but verified domains have better deliverability

4. **Test Email Sending (Optional):**
   - Go to **"Emails"** in left sidebar
   - Click **"Send Test Email"**
   - Send to your own email
   - Check if you receive it
   - **If it works, you're ready for Step 3!**

### ✅ Step 2 Complete When:

- [ ] Resend account created
- [ ] API key created and copied
- [ ] Domain verified (optional but recommended)
- [ ] Test email sent successfully (optional)

### 📝 What You Need for Next Step:

- Your Resend API key: `re__________________`

### ⚠️ Important Notes:

- **Keep your API key secret** - never commit it to git
- You can use Resend's default domain (`onboarding.resend.com`) for testing, but verified domains work better
- Free tier: 3,000 emails/month (plenty for daily + weekly posts)

---

---

## ✅ STEP 3: Configure Environment Variables in Vercel

### What You'll Do:

Add all the required environment variables to your Vercel project so the automation can work in production.

### Instructions:

1. **Go to Vercel Dashboard:**
   - Visit [vercel.com](https://vercel.com)
   - Log in to your account
   - Find your **plenitudo.ai** project
   - Click on it to open

2. **Navigate to Environment Variables:**
   - Click **"Settings"** tab (top navigation)
   - Click **"Environment Variables"** in left sidebar

3. **Add Environment Variables:**

   Add each variable one by one by clicking **"Add New"**:

   **Variable 1: Substack Email Address**
   - **Key:** `SUBSTACK_EMAIL_ADDRESS`
   - **Value:** Your email-to-post address from Step 1 (format: `your-publication+post@substack.com`)
   - **Environment:** Select all (Production, Preview, Development)
   - Click **"Save"**

   **Variable 2: Resend API Key**
   - **Key:** `RESEND_API_KEY`
   - **Value:** Your Resend API key from Step 2 (format: `re_xxxxxxxxxxxxx...`)
   - **Environment:** Select all (Production, Preview, Development)
   - Click **"Save"**

   **Variable 3: Substack Publication URL**
   - **Key:** `NEXT_PUBLIC_SUBSTACK_URL`
   - **Value:** Your Substack publication URL (format: `https://your-publication.substack.com`)
   - **Environment:** Select all (Production, Preview, Development)
   - Click **"Save"**

   **Variable 4: App URL**
   - **Key:** `NEXT_PUBLIC_APP_URL`
   - **Value:** Your app URL (format: `https://plenitudo.ai` or your actual domain)
   - **Environment:** Select all (Production, Preview, Development)
   - Click **"Save"**

4. **Verify All Variables Added:**
   - You should see 4 variables in the list:
     - `SUBSTACK_EMAIL_ADDRESS`
     - `RESEND_API_KEY`
     - `NEXT_PUBLIC_SUBSTACK_URL`
     - `NEXT_PUBLIC_APP_URL`
   - All should have checkmarks for Production, Preview, and Development

5. **Redeploy Your Application:**
   - Go to **"Deployments"** tab
   - Click the **"..."** (three dots) on your latest deployment
   - Click **"Redeploy"**
   - Or push a new commit to trigger a new deployment
   - **Important:** Environment variables only take effect after redeployment!

### ✅ Step 3 Complete When:

- [ ] All 4 environment variables added to Vercel
- [ ] All variables have correct values
- [ ] All variables enabled for Production, Preview, and Development
- [ ] Application redeployed

### 📝 Checklist:

- [ ] `SUBSTACK_EMAIL_ADDRESS` = `your-publication+post@substack.com`
- [ ] `RESEND_API_KEY` = `re_xxxxxxxxxxxxx...`
- [ ] `NEXT_PUBLIC_SUBSTACK_URL` = `https://your-publication.substack.com`
- [ ] `NEXT_PUBLIC_APP_URL` = `https://plenitudo.ai` (or your domain)
- [ ] Application redeployed

### ⚠️ Important Notes:

- **Never commit these values to git** - they're already in `.gitignore`
- **Redeploy is required** - environment variables don't update on existing deployments
- **Double-check values** - typos will cause the automation to fail
- **Test after redeploy** - we'll test in Step 4

---

---

## ✅ STEP 4: Test the Automation in Production

### What You'll Do:

Test that the daily post automation works by manually triggering it and verifying it publishes to Substack.

### Instructions:

1. **Make Sure You Have Today's AI Daily Data:**
   - First, ensure today's AI Daily has been built
   - Go to your production app: `https://plenitudo.ai/daily`
   - Check if there are items for today
   - **If no items:** You need to trigger the rebuild first (see Step 4a below)

2. **Trigger the Daily Post Manually:**

   **⚠️ Important:** The endpoint only accepts POST requests. You can't just visit it in a browser (that's a GET request). You need to use one of these methods:

   **Option A: Use curl in Terminal (Easiest - Recommended)**

   **First, find your correct URL:**

   **Method 1: Use Production Domain (If Set Up)**
   - If you have `plenitudo.ai` connected to Vercel, use:
     ```bash
     curl -X POST https://plenitudo.ai/api/substack/publish-daily
     ```

   **Method 2: Find Latest Deployment URL**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Find the **latest deployment** (top of the list)
   - Click on it
   - Look at the URL in your browser address bar
   - It should be: `https://vercel.com/your-username/plenitudo/xxxxx`
   - **OR** look for "Domains" section - it will show the deployment URL
   - Format: `plenitudo-ai-xxxxx.vercel.app` or `plenitudo-git-main-xxxxx.vercel.app`
   - Copy the full URL (including `https://`)

   **Method 3: Use Vercel Project URL**
   - Go to Vercel Dashboard → Your Project
   - Look at the top - there should be a project URL
   - Format: `https://plenitudo-ai.vercel.app` (without the random hash)
   - Try this first - it's usually the production URL

   **Then run curl:**

   ```bash
   curl -X POST https://your-actual-url.vercel.app/api/substack/publish-daily
   ```

   **If you get "DEPLOYMENT_NOT_FOUND":**
   - The deployment URL is wrong or expired
   - Use Method 3 (project URL) instead
   - Or check Vercel dashboard for the correct URL
   - **Expected Response:** You should see JSON output like:
     ```json
     {
       "success": true,
       "method": "email",
       "itemsCount": 10
     }
     ```
   - **If you see an error:** Copy the error message - we'll troubleshoot

   **Option B: Use Browser with POST Request (Advanced)**
   - Install a browser extension like "REST Client" or use Postman
   - Make a POST request to: `https://your-deployment-url.vercel.app/api/substack/publish-daily`
   - This is more complex, so Option A is recommended

   **Option C: Check if Route Exists First**
   - In Vercel Dashboard → Your Project → Deployments
   - Click latest deployment → Functions tab
   - Look for `/api/substack/publish-daily` in the list
   - **If you don't see it:** The route might not be deployed - we need to redeploy

3. **Check Vercel Logs (After Triggering):**
   - **First:** Make sure you've triggered the endpoint (Step 2 above)
   - Go to Vercel Dashboard → Your Project
   - Click **"Logs"** tab (or go to Deployments → Latest → Functions)
   - In the search/filter, type: `publish-daily`
   - **Or** go to Deployments → Latest → Functions → `/api/substack/publish-daily`
   - Click to view logs
   - **Look for:**
     - ✅ "Sent post to Substack via email"
     - ✅ "Success: true"
     - ✅ "Error publishing to Substack:" (if there's an error)
     - ❌ Any error messages

   **If you don't see the function in the list:**
   - The route might not be deployed
   - Go to Deployments → Check if there's a recent deployment
   - If not, push a commit or redeploy to include the new route

4. **Check Resend Dashboard:**
   - Go to [resend.com](https://resend.com) → Log in
   - Click **"Emails"** in left sidebar
   - You should see a new email sent to your Substack address
   - **Check:**
     - Status: "Delivered" (green checkmark)
     - To: `aidailyreports+post@substack.com`
     - Subject: "AI Daily — [Today's Date]"

5. **Check Substack Dashboard:**
   - Go to [substack.com](https://substack.com) → Log in
   - Go to your publication: [aidailyreports.substack.com](https://aidailyreports.substack.com)
   - Click **"Posts"** in left sidebar
   - **Look for a new post:**
     - Title: "AI Daily — [Today's Date]"
     - Status: Should be published (or in drafts)
     - **If you see it:** ✅ Success! The automation works!

6. **Verify Post Content:**
   - Click on the post to view it
   - **Check:**
     - Title is correct
     - Content is formatted nicely
     - Stories are included
     - Links work
     - CTAs are present

### ✅ Step 4 Complete When:

- [ ] API endpoint returns `success: true`
- [ ] Vercel logs show successful email send
- [ ] Resend dashboard shows email delivered
- [ ] Substack dashboard shows new post
- [ ] Post content looks good

### 🆘 Troubleshooting:

**If API returns error:**

- Check Vercel logs for specific error message
- Verify all environment variables are set correctly
- Make sure you have AI Daily items for today

**If email not delivered:**

- Check Resend dashboard for delivery status
- Verify `SUBSTACK_EMAIL_ADDRESS` is correct
- Check Resend API key is valid
- Look for bounce/spam issues

**If post not appearing in Substack:**

- Check Substack spam/junk folder
- Verify email-to-post address is correct
- Try sending a manual test email to the address
- Check Substack Settings → Email for any restrictions

**If post appears but formatting is wrong:**

- This is normal - Substack may strip some HTML
- You can edit the post in Substack to fix formatting
- We can adjust templates if needed

---

## 📋 Step 4a: Rebuild AI Daily First (If Needed)

**Only do this if you don't have today's AI Daily data:**

1. **Trigger AI Daily Rebuild:**
   - Go to: `https://plenitudo.ai/api/admin/ai-daily/rebuild`
   - Or use curl:
     ```bash
     curl -X POST https://plenitudo.ai/api/admin/ai-daily/rebuild
     ```
   - Wait for it to complete (check Vercel logs)

2. **Verify Data:**
   - Go to: `https://plenitudo.ai/daily`
   - Check if today's items appear

3. **Then proceed with Step 4 above**

---

---

## 🔧 Troubleshooting: Common Issues

### Issue 1: Prisma Database Errors

**If you see errors like:**

```
Error [PrismaClientInitializationError]: Invalid 'prisma.aiDailyItem.findMany()' invocation
```

**This means:** Database connection issue

**Fix:**

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify `DATABASE_URL` is set correctly
3. Make sure it's a valid PostgreSQL connection string
4. Redeploy after fixing

### Issue 2: POST 405 Error

**If you see:**

```
POST 405 - INVALID_REQUEST_METHOD
```

**This means:** You're trying to access the endpoint with GET (browser) instead of POST

**Fix:** Use curl command (see Step 2 above) - browsers can't make POST requests easily

### Issue 3: No Logs for `/api/substack/publish-daily`

**This means:** The endpoint hasn't been called yet

**Fix:**

1. Make sure you're using curl with `-X POST`
2. Check the exact URL is correct
3. Verify the route is deployed (check Functions tab)

---

## ⏭️ Next: Step 5 - Set Up Cron Jobs (Automation)

**Don't proceed to Step 5 until Step 4 is complete and working!**

Once Step 4 is working (you see the post in Substack), let me know and I'll give you Step 5 instructions (setting up automatic daily/weekly publishing).

---

## 🆘 Troubleshooting Step 1

### Can't find email-to-post address?

- Make sure you're in **Settings → Email** (not General Settings)
- If you don't see it, your publication might need to be activated first
- Try publishing a manual post first, then check again

### Email-to-post not working?

- Check spam folder
- Make sure you're using the exact address format: `publication+post@substack.com`
- Try sending from a different email address
- Check Substack help: [help.substack.com](https://help.substack.com)

---

**Ready?** Complete Step 1 and let me know when you're done! 🚀
