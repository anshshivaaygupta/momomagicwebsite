# ⚡ Quick Start: Deploy CMS to admin.momosmagic.in

## 🎯 Goal
Deploy the Momo Magic CMS to admin.momosmagic.in in 6 hours.

## ⏱️ Timeline

- **Hour 1:** Code Verification ✅ DONE
- **Hours 2-3:** Vercel Setup & DNS Configuration (IN PROGRESS)
- **Hours 4-5:** Database Migration & Testing
- **Hour 6:** Final Verification & Proofs

## 📋 Step-by-Step Instructions

### STEP 1: Create Vercel Project (15 minutes)

1. Go to https://vercel.com/dashboard
2. Click **"Add New"** → **"Project"**
3. Select repository: **asggroupsinfo/momomagicwebsite**
4. Configure:
   - **Project Name:** `momos-magic-cms`
   - **Framework:** Next.js (auto-detected)
   - **Root Directory:** `./`
   - Click **"Deploy"** (we'll add env vars after first deploy)

### STEP 2: Configure Environment Variables (10 minutes)

1. Go to Project Settings → Environment Variables
2. Add these variables (one by one):

```
DATABASE_URL = mysql://your_user:your_pass@your_host:3306/your_db
ADMIN_USERNAME = admin
ADMIN_PASSWORD = [generate secure password]
SESSION_SECRET = [generate random string]
NEXT_PUBLIC_API_URL = https://admin.momosmagic.in/api
NEXT_PUBLIC_SITE_URL = https://admin.momosmagic.in
NEXT_PUBLIC_MAIN_SITE_URL = https://momosmagic.in
NODE_ENV = production
```

**Generate Secure Values:**
```bash
# SESSION_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# ADMIN_PASSWORD
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

3. Click **"Save"**
4. Trigger a new deployment (Deployments → ... → Redeploy)

### STEP 3: Configure DNS (5 minutes)

1. Log in to **Hostinger Control Panel**
2. Go to **Domains** → **DNS/Name Servers**
3. Click **"Manage"** next to momosmagic.in
4. Add new record:
   ```
   Type: CNAME
   Name: admin
   Points to: cname.vercel-dns.com
   TTL: 3600
   ```
5. Click **"Add Record"**
6. Wait 5-30 minutes for DNS propagation

**Verify DNS:**
```bash
nslookup admin.momosmagic.in
```

### STEP 4: Add Custom Domain in Vercel (5 minutes)

1. Go to Project Settings → **Domains**
2. Click **"Add Domain"**
3. Enter: `admin.momosmagic.in`
4. Click **"Add"**
5. Vercel will verify DNS (may take a few minutes)
6. SSL certificate will be issued automatically (up to 24 hours)

### STEP 5: Run Database Migration (10 minutes)

**Option A: Using phpMyAdmin (Hostinger)**

1. Go to Hostinger Control Panel → **Databases** → **phpMyAdmin**
2. Select your database
3. Click **"SQL"** tab
4. Copy and paste this SQL:

```sql
CREATE TABLE IF NOT EXISTS page_configurations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_name VARCHAR(100) NOT NULL UNIQUE,
  sections_config JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_page_name (page_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO page_configurations (page_name, sections_config) VALUES
('homepage', '[]'),
('menu', '[]'),
('about', '[]'),
('contact', '[]'),
('gallery', '[]'),
('combos', '[]'),
('catering', '[]'),
('franchise', '[]'),
('download-app', '[]'),
('legal-pages', '[]'),
('careers', '[]')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;
```

5. Click **"Go"**
6. Verify: You should see "11 rows inserted"

**Option B: Using MySQL CLI**

```bash
mysql -h your_host -u your_user -p your_database < database/migrations/create_page_configurations.sql
```

**Verify Migration:**
```sql
SELECT COUNT(*) FROM page_configurations;
-- Should return: 11
```

### STEP 6: Test Deployment (15 minutes)

1. **Test Admin Login:**
   - Go to: https://admin.momosmagic.in/admin/dashboard
   - Login with ADMIN_USERNAME and ADMIN_PASSWORD
   - Should see dashboard

2. **Test CMS Pages (spot check 3-5 pages):**
   - Hero: https://admin.momosmagic.in/admin/dashboard/hero
   - Menu: https://admin.momosmagic.in/admin/dashboard/menu
   - Franchise: https://admin.momosmagic.in/admin/dashboard/franchise
   - Download App: https://admin.momosmagic.in/admin/dashboard/download-app
   - Careers: https://admin.momosmagic.in/admin/dashboard/careers

3. **Test Visual Design Controls:**
   - Go to any CMS page
   - Scroll down to "Visual Design Controls"
   - Click to expand
   - Try changing a button color
   - Click "Save Design Settings"
   - Verify success message appears
   - Refresh page and confirm setting persists

4. **Test API Endpoints:**
   ```bash
   # Test page-builder API
   curl https://admin.momosmagic.in/api/cms/page-builder
   
   # Test hero API
   curl https://admin.momosmagic.in/api/cms/hero
   ```

### STEP 7: Create Deployment Proofs (15 minutes)

**Required Proofs:**

1. **Screenshot: Vercel Deployment Success**
   - Go to Vercel Dashboard → Deployments
   - Take screenshot showing "Ready" status

2. **Screenshot: Custom Domain Active**
   - Go to Project Settings → Domains
   - Take screenshot showing admin.momosmagic.in with SSL

3. **Screenshot: Database Migration Complete**
   - phpMyAdmin showing page_configurations table with 11 rows

4. **Video: CMS Login and Navigation**
   - Record screen showing:
     - Login to admin.momosmagic.in
     - Navigate to 3-5 different CMS pages
     - Show Visual Design Controls panel

5. **Video: Visual Controls Working**
   - Record screen showing:
     - Open Visual Design Controls
     - Change a button color
     - Save settings
     - Refresh page
     - Verify setting persists

## ✅ Success Criteria

- [ ] admin.momosmagic.in is accessible
- [ ] SSL certificate is active (https://)
- [ ] Admin login works
- [ ] All 11 CMS pages load without errors
- [ ] Visual Design Controls appear on all pages
- [ ] Settings can be saved and persist
- [ ] Database connection working
- [ ] API endpoints responding

## 🚨 Common Issues & Quick Fixes

### Issue: "Cannot connect to database"
**Fix:** Check DATABASE_URL format and credentials in Vercel environment variables

### Issue: "Admin login not working"
**Fix:** Verify ADMIN_USERNAME, ADMIN_PASSWORD, and SESSION_SECRET are set in Vercel

### Issue: "Domain not found"
**Fix:** Wait for DNS propagation (5-30 minutes), verify CNAME record is correct

### Issue: "Visual controls not saving"
**Fix:** Verify page_configurations table exists and has correct structure

### Issue: "SSL certificate error"
**Fix:** Wait up to 24 hours for SSL issuance, verify domain is correctly added in Vercel

## 📞 Need Help?

If you encounter any issues:
1. Check the detailed guide: `CMS_SEPARATE_DOMAIN_DEPLOYMENT_GUIDE.md`
2. Check configuration: `DEPLOYMENT_CONFIGURATION.md`
3. Contact: shivamkumar14102801@gmail.com
4. Devin Session: https://app.devin.ai/sessions/c548a2179b2f4898a72b20b29a48ca00

## 🎉 Completion

Once all steps are complete and proofs are created:
- Share screenshots and videos
- Confirm all 11 CMS pages are working
- Verify visual controls are functional
- Test making actual content changes

**🥟 Your CMS is now live on admin.momosmagic.in!**
