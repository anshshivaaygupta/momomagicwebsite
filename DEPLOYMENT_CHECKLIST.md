# 🥟 Momo Magic CMS - Deployment Checklist

## 📋 Complete Deployment Checklist

Use this checklist to track your deployment progress. Check off each item as you complete it.

---

## ⏰ HOUR 1: CODE VERIFICATION ✅ COMPLETE

- [x] Verify all 11 CMS pages exist
- [x] Verify VisualDesignPanel integration
- [x] Verify database migration files
- [x] Verify API routes
- [x] Check PR status and merge to main
- [x] Create deployment documentation
- [x] Create verification scripts

---

## ⏰ HOURS 2-3: VERCEL SETUP & DNS CONFIGURATION

### STEP 1: Create Vercel Project (15 minutes)

- [ ] Go to https://vercel.com/dashboard
- [ ] Click "Add New" → "Project"
- [ ] Select repository: `asggroupsinfo/momomagicwebsite`
- [ ] Configure project:
  - [ ] Project Name: `momos-magic-cms`
  - [ ] Framework: Next.js (auto-detected)
  - [ ] Root Directory: `./`
- [ ] Click "Deploy" (initial deployment)
- [ ] Wait for deployment to complete

### STEP 2: Configure Environment Variables (10 minutes)

- [ ] Go to Project Settings → Environment Variables
- [ ] Generate secure credentials:
  ```bash
  # SESSION_SECRET
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  
  # ADMIN_PASSWORD
  node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
  ```
- [ ] Add each environment variable:
  - [ ] DATABASE_URL
  - [ ] ADMIN_USERNAME
  - [ ] ADMIN_PASSWORD
  - [ ] SESSION_SECRET
  - [ ] NEXT_PUBLIC_API_URL
  - [ ] NEXT_PUBLIC_SITE_URL
  - [ ] NEXT_PUBLIC_MAIN_SITE_URL
  - [ ] NODE_ENV
- [ ] Save all variables
- [ ] Trigger redeploy (Deployments → ... → Redeploy)
- [ ] Wait for new deployment to complete

### STEP 3: Configure DNS (5 minutes)

- [ ] Log in to Hostinger Control Panel
- [ ] Go to Domains → DNS/Name Servers
- [ ] Click "Manage" next to momosmagic.in
- [ ] Add new CNAME record:
  - [ ] Type: CNAME
  - [ ] Name: admin
  - [ ] Points to: cname.vercel-dns.com
  - [ ] TTL: 3600
- [ ] Click "Add Record"
- [ ] Wait 5-30 minutes for DNS propagation
- [ ] Verify DNS:
  ```bash
  nslookup admin.momosmagic.in
  ```

### STEP 4: Add Custom Domain in Vercel (5 minutes)

- [ ] Go to Project Settings → Domains
- [ ] Click "Add Domain"
- [ ] Enter: `admin.momosmagic.in`
- [ ] Click "Add"
- [ ] Wait for Vercel to verify DNS
- [ ] Wait for SSL certificate (automatic, up to 24 hours)
- [ ] Verify domain is active with SSL

---

## ⏰ HOURS 4-5: DATABASE MIGRATION & TESTING

### STEP 5: Run Database Migration (10 minutes)

**Option A: Using phpMyAdmin (Recommended)**

- [ ] Go to Hostinger Control Panel → Databases → phpMyAdmin
- [ ] Select your database
- [ ] Click "SQL" tab
- [ ] Copy SQL from `database/migrations/create_page_configurations.sql`
- [ ] Paste into SQL editor
- [ ] Click "Go"
- [ ] Verify: "11 rows inserted" message

**Option B: Using MySQL CLI**

- [ ] Run: `mysql -h host -u user -p database < database/migrations/create_page_configurations.sql`
- [ ] Verify migration completed

**Verify Migration:**

- [ ] Run verification script: `scripts/verify-database.sql`
- [ ] Check: `SELECT COUNT(*) FROM page_configurations;` should return 11
- [ ] Check: All 11 pages listed (homepage, menu, about, contact, gallery, combos, catering, franchise, download-app, legal-pages, careers)

### STEP 6: Test Deployment (15 minutes)

**Test Admin Login:**

- [ ] Go to: https://admin.momosmagic.in/admin/dashboard
- [ ] Enter ADMIN_USERNAME and ADMIN_PASSWORD
- [ ] Verify: Dashboard loads successfully
- [ ] Verify: No console errors

**Test CMS Pages (Spot Check 5 pages):**

- [ ] Hero: https://admin.momosmagic.in/admin/dashboard/hero
- [ ] Menu: https://admin.momosmagic.in/admin/dashboard/menu
- [ ] Franchise: https://admin.momosmagic.in/admin/dashboard/franchise
- [ ] Download App: https://admin.momosmagic.in/admin/dashboard/download-app
- [ ] Careers: https://admin.momosmagic.in/admin/dashboard/careers

**Test All 11 CMS Pages (Complete Check):**

- [ ] 1. Hero: https://admin.momosmagic.in/admin/dashboard/hero
- [ ] 2. Menu: https://admin.momosmagic.in/admin/dashboard/menu
- [ ] 3. About: https://admin.momosmagic.in/admin/dashboard/about
- [ ] 4. Contact: https://admin.momosmagic.in/admin/dashboard/contact
- [ ] 5. Gallery: https://admin.momosmagic.in/admin/dashboard/gallery
- [ ] 6. Combos: https://admin.momosmagic.in/admin/dashboard/combos
- [ ] 7. Catering: https://admin.momosmagic.in/admin/dashboard/catering
- [ ] 8. Franchise: https://admin.momosmagic.in/admin/dashboard/franchise
- [ ] 9. Download App: https://admin.momosmagic.in/admin/dashboard/download-app
- [ ] 10. Legal Pages: https://admin.momosmagic.in/admin/dashboard/legal-pages
- [ ] 11. Careers: https://admin.momosmagic.in/admin/dashboard/careers

**Test Visual Design Controls:**

- [ ] Go to any CMS page (e.g., Hero)
- [ ] Scroll down to "Visual Design Controls"
- [ ] Click to expand the panel
- [ ] Test changing a button color
- [ ] Click "Save Design Settings"
- [ ] Verify: Success message appears
- [ ] Refresh the page
- [ ] Verify: Setting persists after refresh
- [ ] Test on 2-3 more pages to confirm consistency

**Test API Endpoints:**

- [ ] Test: `curl https://admin.momosmagic.in/api/cms/page-builder`
- [ ] Test: `curl https://admin.momosmagic.in/api/cms/hero`
- [ ] Test: `curl https://admin.momosmagic.in/api/cms/menu`
- [ ] Verify: All return valid JSON responses

**Run Automated Verification:**

- [ ] Run: `./scripts/verify-deployment.sh`
- [ ] Verify: All checks pass (DNS, SSL, CMS pages, APIs)

---

## ⏰ HOUR 6: FINAL VERIFICATION & PROOFS

### STEP 7: Create Deployment Proofs (15 minutes)

**Screenshot 1: Vercel Deployment Success**

- [ ] Go to Vercel Dashboard → Deployments
- [ ] Take screenshot showing "Ready" status
- [ ] Save as: `proof-1-vercel-deployment.png`

**Screenshot 2: Custom Domain Active**

- [ ] Go to Project Settings → Domains
- [ ] Take screenshot showing admin.momosmagic.in with SSL
- [ ] Save as: `proof-2-custom-domain.png`

**Screenshot 3: Database Migration Complete**

- [ ] Open phpMyAdmin
- [ ] Show page_configurations table with 11 rows
- [ ] Take screenshot
- [ ] Save as: `proof-3-database-migration.png`

**Video 1: CMS Login and Navigation (2-3 minutes)**

- [ ] Start screen recording
- [ ] Navigate to https://admin.momosmagic.in
- [ ] Log in with admin credentials
- [ ] Navigate to 5-6 different CMS pages
- [ ] Show each page loads without errors
- [ ] Stop recording
- [ ] Save as: `proof-4-cms-navigation.mp4`

**Video 2: Visual Controls Working (2-3 minutes)**

- [ ] Start screen recording
- [ ] Go to Hero CMS page
- [ ] Scroll to Visual Design Controls
- [ ] Expand the panel
- [ ] Change a button color
- [ ] Click "Save Design Settings"
- [ ] Show success message
- [ ] Refresh the page
- [ ] Show setting persists
- [ ] Stop recording
- [ ] Save as: `proof-5-visual-controls.mp4`

### STEP 8: Final Verification

**Success Criteria:**

- [ ] admin.momosmagic.in is accessible
- [ ] SSL certificate is active (https://)
- [ ] Admin login works
- [ ] All 11 CMS pages load without errors
- [ ] Visual Design Controls appear on all pages
- [ ] Settings can be saved and persist
- [ ] Database connection working
- [ ] API endpoints responding
- [ ] No console errors
- [ ] All proofs created (3 screenshots + 2 videos)

**Final Tests:**

- [ ] Test from different browser (Chrome, Firefox, Safari)
- [ ] Test from mobile device
- [ ] Test from different network (mobile data, different WiFi)
- [ ] Verify live site (momosmagic.in) is NOT affected by CMS changes

---

## 🎉 DEPLOYMENT COMPLETE!

Once all items are checked:

- [ ] Share all proofs with stakeholders
- [ ] Document admin credentials securely
- [ ] Set up regular backup schedule
- [ ] Train team on CMS usage
- [ ] Plan content migration strategy
- [ ] Schedule regular maintenance

---

## 📞 Support

If you encounter issues:

- Check: `QUICK_START_DEPLOYMENT.md` for step-by-step instructions
- Check: `DEPLOYMENT_CONFIGURATION.md` for detailed configuration
- Check: `CMS_SEPARATE_DOMAIN_DEPLOYMENT_GUIDE.md` for troubleshooting
- Run: `./scripts/verify-deployment.sh` for automated checks
- Run: `scripts/verify-database.sql` for database verification
- Contact: shivamkumar14102801@gmail.com
- Devin Session: https://app.devin.ai/sessions/c548a2179b2f4898a72b20b29a48ca00

---

## 🥟 Congratulations!

Your Momo Magic CMS is now live on admin.momosmagic.in!

All 11 CMS pages are ready for content editing with visual design controls.
