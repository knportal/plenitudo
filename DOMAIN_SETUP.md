# Domain Setup: plenitudo.ai → Vercel

## 🎯 Goal

Connect your custom domain `plenitudo.ai` to your Vercel-deployed app.

---

## 📋 Prerequisites

- Your app is already deployed to Vercel
- You own the domain `plenitudo.ai`
- You have access to your domain registrar (where you bought the domain)

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Add Domain in Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Click on your **plenitudo.ai project**
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter:
   - `plenitudo.ai` (apex domain)
   - `www.plenitudo.ai` (optional, recommended)
6. Click **Add**

### Step 2: Configure DNS Records

Vercel will show you the DNS records you need to add. You'll see something like:

**For plenitudo.ai:**

```
Type: A
Name: @
Value: 76.76.21.21
```

**For www.plenitudo.ai:**

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: Update DNS at Your Registrar

This depends on where you bought your domain. Common registrars:

#### **Namecheap**

1. Log in to Namecheap
2. Go to **Domain List** → Click **Manage** on plenitudo.ai
3. Go to **Advanced DNS** tab
4. **⚠️ IMPORTANT: Remove ALL existing records first** (Delete URL redirects, old A/CNAME records, etc.)
5. Click **Add New Record**
6. Add the A record: `@` → `76.76.21.21` (TTL: Automatic)
7. Add the CNAME record: `www` → `cname.vercel-dns.com` (TTL: Automatic)
8. Click **Save All Changes**

#### **GoDaddy**

1. Log in to GoDaddy
2. Go to **My Products** → **Domains** → Click **DNS** on plenitudo.ai
3. Find **Records** section
4. Click **Add** next to A record
5. Type: `@` → Points to: `76.76.21.21`
6. Click **Add** next to CNAME record
7. Name: `www` → Points to: `cname.vercel-dns.com`
8. Click **Save**

#### **Google Domains / Squarespace Domains**

1. Log in to domains.google.com or domains.squarespace.com
2. Click on **plenitudo.ai**
3. Go to **DNS** settings
4. Under **Custom records**, click **Add**
5. Add both A and CNAME records as shown above
6. Save changes

#### **Cloudflare**

1. Log in to Cloudflare
2. Select **plenitudo.ai**
3. Go to **DNS** → **Records**
4. Click **Add record**
   - Type: `A` → Name: `@` → Content: `76.76.21.21` → Proxied: ❌ (DNS only)
5. Click **Add record** again
   - Type: `CNAME` → Name: `www` → Target: `cname.vercel-dns.com` → Proxied: ❌
6. Save

#### **DNSimple / Name.com / Hover**

Same process:

1. Go to DNS settings
2. Add A record for `@` → `76.76.21.21`
3. Add CNAME record for `www` → `cname.vercel-dns.com`
4. Save

### Step 4: Wait for Propagation (5-60 minutes)

DNS changes can take anywhere from:

- ✅ **5-10 minutes** (most common)
- ⏳ Up to 24 hours (rare)

You can check if it's working:

```bash
# Check DNS propagation
nslookup plenitudo.ai

# Should return Vercel's IP (76.76.21.21 or similar)
```

Or use an online tool:

- [whatsmydns.net](https://www.whatsmydns.net/#A/plenitudo.ai)
- [dnschecker.org](https://dnschecker.org/#A/plenitudo.ai)

### Step 5: Verify in Vercel

1. Go back to Vercel → **Settings** → **Domains**
2. Wait for status to show **Valid Configuration**
3. Once green ✅, your site is live!

---

## 🔧 Troubleshooting

### "Invalid Configuration" in Vercel

**Problem**: DNS records aren't set correctly.

**Solution**:

1. Double-check the exact records Vercel gave you
2. Make sure you added both A and CNAME records
3. Remove any conflicting records (old hosting, etc.)
4. Wait 15-30 minutes and refresh

### "Not yet propagated" warning

**Problem**: DNS changes haven't propagated yet.

**Solution**:

- This is normal! Wait up to 1 hour
- DNS propagates in waves across the globe
- Some locations see it faster than others

### Site shows "not found" or old site

**Problem**: DNS still pointing to old server.

**Solution**:

1. Check DNS records are correct
2. Clear your browser cache
3. Try incognito mode
4. Wait longer (up to 24 hours for global propagation)

### Can't find DNS settings

**Problem**: Domain registrar makes it hard to find.

**Solution**:

- Look for **DNS**, **Nameservers**, or **Zone File** settings
- Contact support if stuck
- If you're using custom nameservers (Cloudflare, etc.), update DNS there instead

### Want to redirect www → apex (or vice versa)

**Option**: Configure redirects in Vercel.

1. Go to **Settings** → **Domains**
2. Find redirect settings
3. Choose:
   - **Redirect www to apex**: www.plenitudo.ai → plenitudo.ai
   - **Redirect apex to www**: plenitudo.ai → www.plenitudo.ai

---

## 🌐 Post-Setup Checklist

- [ ] Domain added in Vercel
- [ ] DNS records configured at registrar
- [ ] DNS propagated (check with whatsmydns.net)
- [ ] Status shows "Valid Configuration" ✅
- [ ] Site accessible at plenitudo.ai
- [ ] Site accessible at www.plenitudo.ai
- [ ] HTTPS certificate active (automatic with Vercel)

---

## 🔒 Security Note

Vercel **automatically provides**:

- ✅ Free SSL/HTTPS certificate
- ✅ Automatic certificate renewal
- ✅ DDoS protection
- ✅ CDN acceleration

No additional setup needed!

---

## 📚 Vercel Documentation

- [Custom Domains Guide](https://vercel.com/docs/concepts/projects/domains)
- [DNS Configuration](https://vercel.com/docs/concepts/projects/domains/apex-domains)
- [Troubleshooting](https://vercel.com/docs/concepts/projects/domains/troubleshooting)

---

## 💡 Pro Tips

1. **Always add www subdomain**: Redirects properly and looks professional
2. **Set up email separately**: Use Google Workspace or Zoho if you need `name@plenitudo.ai`
3. **Keep nameservers simple**: Use your registrar's defaults unless you have a reason to change
4. **Monitor DNS propagation**: Use dnschecker.org to see global status

---

_Your domain should be live at plenitudo.ai within an hour!_ 🎉

---

## ✅ Success!

If you see this and your domain is working, you're all set! Your app is now live at **plenitudo.ai**.
