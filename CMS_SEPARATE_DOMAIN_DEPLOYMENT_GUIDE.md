# 🥟 Momo Magic CMS - Separate Domain Deployment Guide

## Overview

This guide explains how to deploy the Momo Magic CMS on a separate domain (admin.momosmagic.in) while keeping the live website (momosmagic.in) safe and protected.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  momosmagic.in (Live Website)                                │
│  - Public-facing website                                     │
│  - Read-only access to database                              │
│  - No admin access                                           │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │
                            │ Reads data from
                            │
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  Shared MySQL Database                                       │
│  - Stores all content                                        │
│  - Accessed by both domains                                  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │
                            │ Writes data to
                            │
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  admin.momosmagic.in (CMS Admin)                             │
│  - Admin dashboard only                                      │
│  - Full CRUD access to database                              │
│  - Protected by authentication                               │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Prerequisites

1. **Domain Setup**
   - Main domain: momosmagic.in (already configured)
   - Admin subdomain: admin.momosmagic.in (needs DNS configuration)

2. **Hosting Requirements**
   - Vercel account (for both deployments)
   - MySQL database (shared between both domains)
   - Environment variables configured

3. **Access Requirements**
   - GitHub repository access
   - Vercel project access
   - Database credentials

## Step 1: DNS Configuration

### Add Subdomain DNS Record

1. Log in to your domain registrar (e.g., GoDaddy, Namecheap)
2. Go to DNS Management
3. Add a new CNAME record:
   ```
   Type: CNAME
   Name: admin
   Value: cname.vercel-dns.com
   TTL: 3600 (or Auto)
   ```
4. Save the DNS record
5. Wait 5-30 minutes for DNS propagation

### Verify DNS Configuration

```bash
# Check if DNS is propagated
nslookup admin.momosmagic.in

# Or use dig
dig admin.momosmagic.in
```

## Step 2: Create Separate Vercel Project for CMS

### Option A: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import the same GitHub repository: `asggroupsinfo/momomagicwebsite`
4. Configure the project:
   ```
   Project Name: momos-magic-cms
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```
5. Click "Deploy"

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project directory
cd /path/to/momomagicwebsite

# Login to Vercel
vercel login

# Create new project
vercel --name momos-magic-cms

# Follow the prompts
```

## Step 3: Configure Environment Variables for CMS

### Required Environment Variables

In the Vercel project settings for `momos-magic-cms`, add these environment variables:

```env
# Database Configuration (Same as main site)
DATABASE_URL=mysql://username:password@host:port/database

# Authentication (Use strong credentials)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here

# Session Secret (Generate a random string)
SESSION_SECRET=your_random_secret_key_here

# API Keys (if needed)
NEXT_PUBLIC_API_URL=https://admin.momosmagic.in/api

# Environment
NODE_ENV=production
```

### Generate Secure Credentials

```bash
# Generate a random session secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate a secure password
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

## Step 4: Configure Custom Domain in Vercel

1. Go to Vercel project settings for `momos-magic-cms`
2. Navigate to "Domains"
3. Click "Add Domain"
4. Enter: `admin.momosmagic.in`
5. Click "Add"
6. Vercel will verify DNS configuration
7. Wait for SSL certificate to be issued (automatic)

## Step 5: Configure Next.js for CMS-Only Deployment

### Create CMS-Specific Configuration

Create a new file: `next.config.cms.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only include admin routes
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/admin/dashboard',
      },
    ];
  },
  
  // Redirect all non-admin routes to main site
  async redirects() {
    return [
      {
        source: '/:path((?!admin).*)',
        destination: 'https://momosmagic.in/:path*',
        permanent: false,
      },
    ];
  },
  
  // Environment-specific settings
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://admin.momosmagic.in',
    NEXT_PUBLIC_MAIN_SITE_URL: 'https://momosmagic.in',
  },
};

module.exports = nextConfig;
```

### Update Vercel Build Settings

In Vercel project settings:

```
Build Command: NEXT_CONFIG=cms npm run build
Output Directory: .next
Install Command: npm install
```

## Step 6: Database Migration

### Run Required Migrations

```sql
-- Connect to your MySQL database
mysql -h your_host -u your_user -p your_database

-- Run the page configurations migration
SOURCE database/migrations/create_page_configurations.sql;

-- Verify the table was created
SHOW TABLES LIKE 'page_configurations';

-- Check the table structure
DESCRIBE page_configurations;
```

### Verify Database Access

```bash
# Test database connection from CMS
curl https://admin.momosmagic.in/api/cms/hero

# Should return hero section data
```

## Step 7: Security Configuration

### 1. Enable Authentication Middleware

Ensure `/app/admin/middleware.ts` is configured:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if user is authenticated
  const session = request.cookies.get('admin_session');
  
  if (!session && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
```

### 2. Configure CORS

Update API routes to only accept requests from admin domain:

```typescript
// In API routes
const allowedOrigins = [
  'https://admin.momosmagic.in',
  'http://localhost:3000', // For local development
];

const origin = req.headers.get('origin');
if (origin && !allowedOrigins.includes(origin)) {
  return new Response('Forbidden', { status: 403 });
}
```

### 3. Enable Rate Limiting

Add rate limiting to prevent abuse:

```typescript
// Install: npm install express-rate-limit
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

// Apply to API routes
export default limiter;
```

## Step 8: Testing the Deployment

### 1. Test CMS Access

```bash
# Test admin login
curl -X POST https://admin.momosmagic.in/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your_password"}'

# Should return session token
```

### 2. Test CMS Pages

Visit these URLs to verify all CMS pages are accessible:

- https://admin.momosmagic.in/admin/dashboard
- https://admin.momosmagic.in/admin/dashboard/hero
- https://admin.momosmagic.in/admin/dashboard/menu
- https://admin.momosmagic.in/admin/dashboard/about
- https://admin.momosmagic.in/admin/dashboard/contact
- https://admin.momosmagic.in/admin/dashboard/gallery
- https://admin.momosmagic.in/admin/dashboard/combos
- https://admin.momosmagic.in/admin/dashboard/catering
- https://admin.momosmagic.in/admin/dashboard/franchise
- https://admin.momosmagic.in/admin/dashboard/download-app
- https://admin.momosmagic.in/admin/dashboard/legal-pages
- https://admin.momosmagic.in/admin/dashboard/careers

### 3. Test Visual Design Controls

1. Log in to admin dashboard
2. Navigate to any CMS page (e.g., Hero)
3. Scroll down to "Visual Design Controls"
4. Click to expand the panel
5. Test each control:
   - Change button colors
   - Upload background image
   - Adjust section colors
   - Modify layout settings
6. Click "Save Design Settings"
7. Verify success message appears

### 4. Test Database Integration

```sql
-- Check if design settings are saved
SELECT * FROM page_configurations WHERE page_name = 'homepage';

-- Should show saved design configuration
```

### 5. Test Live Site Safety

1. Make changes in CMS (admin.momosmagic.in)
2. Verify changes are saved to database
3. Check that live site (momosmagic.in) is NOT affected
4. Verify live site still loads correctly

## Step 9: Deployment Workflow

### Safe Deployment Process

```
┌─────────────────────────────────────────────────────────────┐
│ Step 1: Edit Content in CMS (admin.momosmagic.in)           │
│ - Make changes to content                                    │
│ - Upload images                                              │
│ - Adjust design settings                                     │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 2: Preview Changes in CMS                              │
│ - Use preview mode to see changes                            │
│ - Verify everything looks correct                            │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 3: Save Changes to Database                            │
│ - Click "Save" button                                        │
│ - Changes are stored in database                             │
│ - Live site is NOT affected yet                              │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 4: Approve Changes (Optional)                          │
│ - Review changes one more time                               │
│ - Use staging environment if available                       │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 5: Deploy to Live Site                                 │
│ - Trigger Vercel deployment for main site                   │
│ - Live site pulls new data from database                    │
│ - Changes are now visible to public                          │
└─────────────────────────────────────────────────────────────┘
```

### Automated Deployment (Optional)

Set up GitHub Actions to automatically deploy changes:

```yaml
# .github/workflows/deploy-live.yml
name: Deploy Live Site

on:
  workflow_dispatch:
    inputs:
      confirm:
        description: 'Type "deploy" to confirm'
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    if: github.event.inputs.confirm == 'deploy'
    
    steps:
      - name: Trigger Vercel Deployment
        run: |
          curl -X POST https://api.vercel.com/v1/integrations/deploy/...
```

## Step 10: Monitoring and Maintenance

### 1. Set Up Monitoring

```bash
# Install monitoring tools
npm install @vercel/analytics

# Add to _app.tsx
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

### 2. Set Up Error Tracking

```bash
# Install Sentry
npm install @sentry/nextjs

# Configure Sentry
npx @sentry/wizard -i nextjs
```

### 3. Regular Backups

```bash
# Backup database daily
mysqldump -h your_host -u your_user -p your_database > backup_$(date +%Y%m%d).sql

# Upload to cloud storage
aws s3 cp backup_$(date +%Y%m%d).sql s3://your-bucket/backups/
```

### 4. Monitor Performance

- Check Vercel Analytics dashboard
- Monitor database query performance
- Review error logs regularly
- Set up alerts for downtime

## Troubleshooting

### Issue 1: DNS Not Resolving

**Problem:** admin.momosmagic.in not accessible

**Solution:**
```bash
# Check DNS propagation
nslookup admin.momosmagic.in

# If not propagated, wait 24 hours
# If still not working, verify CNAME record is correct
```

### Issue 2: SSL Certificate Error

**Problem:** "Your connection is not private" error

**Solution:**
- Wait for Vercel to issue SSL certificate (can take up to 24 hours)
- Verify domain is correctly added in Vercel
- Check DNS is pointing to Vercel

### Issue 3: Database Connection Error

**Problem:** "Cannot connect to database" error

**Solution:**
```bash
# Verify environment variables
vercel env ls

# Test database connection
mysql -h your_host -u your_user -p your_database

# Check firewall rules allow Vercel IPs
```

### Issue 4: Authentication Not Working

**Problem:** Cannot log in to admin dashboard

**Solution:**
- Verify ADMIN_USERNAME and ADMIN_PASSWORD environment variables
- Check session secret is set
- Clear browser cookies and try again
- Check API route is accessible

### Issue 5: Visual Controls Not Saving

**Problem:** Design settings not persisting

**Solution:**
```sql
-- Verify page_configurations table exists
SHOW TABLES LIKE 'page_configurations';

-- Check API endpoint
curl https://admin.momosmagic.in/api/cms/page-builder

-- Verify database permissions
SHOW GRANTS FOR 'your_user'@'%';
```

## Security Best Practices

1. **Strong Passwords**
   - Use 16+ character passwords
   - Include uppercase, lowercase, numbers, symbols
   - Change passwords every 90 days

2. **Two-Factor Authentication**
   - Enable 2FA for Vercel account
   - Enable 2FA for GitHub account
   - Enable 2FA for database access

3. **Regular Updates**
   - Update Next.js and dependencies monthly
   - Apply security patches immediately
   - Monitor security advisories

4. **Access Control**
   - Limit admin access to authorized users only
   - Use role-based access control
   - Log all admin actions

5. **Backup Strategy**
   - Daily automated backups
   - Store backups in multiple locations
   - Test backup restoration regularly

## Support

For issues or questions:
- GitHub Issues: https://github.com/asggroupsinfo/momomagicwebsite/issues
- Email: shivamkumar14102801@gmail.com
- Devin Session: https://app.devin.ai/sessions/c548a2179b2f4898a72b20b29a48ca00

## Conclusion

Your CMS is now deployed on a separate domain (admin.momosmagic.in) while keeping the live website (momosmagic.in) safe and protected. All 11 CMS pages have integrated visual design controls, and you can safely edit content without affecting the live site until you're ready to deploy.

**Next Steps:**
1. Test all CMS pages thoroughly
2. Train your team on using the CMS
3. Set up automated backups
4. Monitor performance and errors
5. Plan regular maintenance schedule

🎉 **Congratulations! Your CMS is ready to use!**
