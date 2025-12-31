# 🚀 Momo Magic CMS - Deployment Configuration

## Environment Variables for Vercel

Copy these environment variables to your Vercel project settings:

### Required Environment Variables

```env
# Database Configuration
DATABASE_URL=mysql://username:password@host:port/database_name

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here

# Session Configuration
SESSION_SECRET=your_random_secret_key_here

# API Configuration
NEXT_PUBLIC_API_URL=https://admin.momosmagic.in/api
NEXT_PUBLIC_SITE_URL=https://admin.momosmagic.in
NEXT_PUBLIC_MAIN_SITE_URL=https://momosmagic.in

# Environment
NODE_ENV=production
```

### How to Get Your Database URL

Your DATABASE_URL should be in this format:
```
mysql://username:password@host:port/database_name
```

Example:
```
mysql://momo_user:SecurePass123@mysql.hostinger.com:3306/momo_magic_db
```

### Generate Secure Credentials

Run these commands to generate secure credentials:

```bash
# Generate SESSION_SECRET (32 bytes)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate ADMIN_PASSWORD (16 bytes base64)
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

## Vercel Project Configuration

### Project Settings

```
Project Name: momos-magic-cms
Framework: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node.js Version: 18.x (or latest LTS)
```

### Build & Development Settings

```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
```

### Domain Configuration

1. **Add Custom Domain:**
   - Go to Project Settings → Domains
   - Add domain: `admin.momosmagic.in`
   - Vercel will provide DNS instructions

2. **DNS Configuration (Hostinger):**
   ```
   Type: CNAME
   Name: admin
   Value: cname.vercel-dns.com
   TTL: 3600 (or Auto)
   ```

## Database Migration Steps

### Step 1: Connect to Your MySQL Database

```bash
# Using MySQL CLI
mysql -h your_host -u your_user -p your_database

# Or using phpMyAdmin (Hostinger)
# Go to: Hostinger Control Panel → Databases → phpMyAdmin
```

### Step 2: Run the Migration

Copy and paste this SQL into your MySQL client:

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

### Step 3: Verify Migration

```sql
-- Check if table was created
SHOW TABLES LIKE 'page_configurations';

-- Check table structure
DESCRIBE page_configurations;

-- Check initial data
SELECT * FROM page_configurations;
```

You should see 11 rows (one for each CMS page).

## Deployment Checklist

### Pre-Deployment

- [ ] Vercel project created
- [ ] Environment variables configured
- [ ] DNS CNAME record added
- [ ] Database migration completed
- [ ] All 11 CMS pages verified in code

### Post-Deployment

- [ ] Custom domain connected and SSL active
- [ ] Admin login working
- [ ] All 11 CMS pages accessible
- [ ] Visual Design Controls working
- [ ] Database connection successful
- [ ] API endpoints responding

## Testing URLs

After deployment, test these URLs:

### Admin Dashboard
- https://admin.momosmagic.in/admin/dashboard

### CMS Pages (All 11)
1. https://admin.momosmagic.in/admin/dashboard/hero
2. https://admin.momosmagic.in/admin/dashboard/menu
3. https://admin.momosmagic.in/admin/dashboard/about
4. https://admin.momosmagic.in/admin/dashboard/contact
5. https://admin.momosmagic.in/admin/dashboard/gallery
6. https://admin.momosmagic.in/admin/dashboard/combos
7. https://admin.momosmagic.in/admin/dashboard/catering
8. https://admin.momosmagic.in/admin/dashboard/franchise
9. https://admin.momosmagic.in/admin/dashboard/download-app
10. https://admin.momosmagic.in/admin/dashboard/legal-pages
11. https://admin.momosmagic.in/admin/dashboard/careers

### API Endpoints
- https://admin.momosmagic.in/api/cms/page-builder
- https://admin.momosmagic.in/api/cms/hero
- https://admin.momosmagic.in/api/cms/menu

## Troubleshooting

### Issue: Database Connection Error

**Solution:**
1. Verify DATABASE_URL format is correct
2. Check database credentials
3. Ensure database allows connections from Vercel IPs
4. Check firewall rules in Hostinger

### Issue: SSL Certificate Not Active

**Solution:**
1. Wait 24 hours for DNS propagation
2. Verify CNAME record is correct
3. Check domain is added in Vercel
4. Try removing and re-adding domain

### Issue: Visual Controls Not Saving

**Solution:**
1. Verify page_configurations table exists
2. Check database permissions (INSERT, UPDATE)
3. Test API endpoint: `/api/cms/page-builder`
4. Check browser console for errors

### Issue: Admin Login Not Working

**Solution:**
1. Verify ADMIN_USERNAME and ADMIN_PASSWORD in environment variables
2. Check SESSION_SECRET is set
3. Clear browser cookies
4. Try incognito/private browsing mode

## Security Recommendations

1. **Strong Passwords:**
   - Use 16+ character passwords
   - Include uppercase, lowercase, numbers, symbols
   - Never share credentials

2. **Regular Updates:**
   - Update Next.js monthly
   - Apply security patches immediately
   - Monitor Vercel security advisories

3. **Access Control:**
   - Limit admin access to authorized users only
   - Use 2FA for Vercel account
   - Log all admin actions

4. **Backup Strategy:**
   - Daily automated database backups
   - Store backups in multiple locations
   - Test backup restoration monthly

## Support

For issues or questions:
- GitHub Issues: https://github.com/asggroupsinfo/momomagicwebsite/issues
- Email: shivamkumar14102801@gmail.com
- Devin Session: https://app.devin.ai/sessions/c548a2179b2f4898a72b20b29a48ca00

## Next Steps After Deployment

1. **Test All Features:**
   - Log in to admin dashboard
   - Test each of the 11 CMS pages
   - Try editing content with visual controls
   - Verify changes save to database

2. **Train Your Team:**
   - Share admin credentials securely
   - Provide CMS usage guide
   - Set up regular content review schedule

3. **Monitor Performance:**
   - Check Vercel Analytics
   - Monitor database query performance
   - Review error logs regularly
   - Set up alerts for downtime

4. **Plan Maintenance:**
   - Schedule regular backups
   - Plan security updates
   - Review and optimize performance
   - Update content regularly

🎉 **Your CMS is ready for deployment!**
