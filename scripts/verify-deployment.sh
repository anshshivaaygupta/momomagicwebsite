#!/bin/bash


set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

DOMAIN="admin.momosmagic.in"
PROTOCOL="https"
BASE_URL="${PROTOCOL}://${DOMAIN}"

echo "🥟 Momo Magic CMS - Deployment Verification"
echo "=========================================="
echo ""

check_url() {
    local url=$1
    local description=$2
    
    echo -n "Checking ${description}... "
    
    if curl -s -o /dev/null -w "%{http_code}" --max-time 10 "${url}" | grep -q "200\|301\|302"; then
        echo -e "${GREEN}✓ OK${NC}"
        return 0
    else
        echo -e "${RED}✗ FAILED${NC}"
        return 1
    fi
}

check_dns() {
    echo -n "Checking DNS resolution... "
    
    if nslookup ${DOMAIN} > /dev/null 2>&1; then
        echo -e "${GREEN}✓ OK${NC}"
        return 0
    else
        echo -e "${RED}✗ FAILED${NC}"
        echo -e "${YELLOW}Note: DNS may still be propagating. Wait 5-30 minutes.${NC}"
        return 1
    fi
}

check_ssl() {
    echo -n "Checking SSL certificate... "
    
    if curl -s --head --max-time 10 "${BASE_URL}" | grep -q "HTTP/2 200\|HTTP/1.1 200\|HTTP/2 301\|HTTP/1.1 301"; then
        echo -e "${GREEN}✓ OK${NC}"
        return 0
    else
        echo -e "${YELLOW}⚠ WARNING${NC}"
        echo -e "${YELLOW}Note: SSL may still be provisioning. Wait up to 24 hours.${NC}"
        return 1
    fi
}

echo "1. DNS & SSL Verification"
echo "-------------------------"
check_dns
check_ssl
echo ""

echo "2. Admin Dashboard Verification"
echo "-------------------------------"
check_url "${BASE_URL}/admin/dashboard" "Admin Dashboard"
echo ""

echo "3. CMS Pages Verification (11 pages)"
echo "------------------------------------"
check_url "${BASE_URL}/admin/dashboard/hero" "Hero CMS"
check_url "${BASE_URL}/admin/dashboard/menu" "Menu CMS"
check_url "${BASE_URL}/admin/dashboard/about" "About CMS"
check_url "${BASE_URL}/admin/dashboard/contact" "Contact CMS"
check_url "${BASE_URL}/admin/dashboard/gallery" "Gallery CMS"
check_url "${BASE_URL}/admin/dashboard/combos" "Combos CMS"
check_url "${BASE_URL}/admin/dashboard/catering" "Catering CMS"
check_url "${BASE_URL}/admin/dashboard/franchise" "Franchise CMS"
check_url "${BASE_URL}/admin/dashboard/download-app" "Download App CMS"
check_url "${BASE_URL}/admin/dashboard/legal-pages" "Legal Pages CMS"
check_url "${BASE_URL}/admin/dashboard/careers" "Careers CMS"
echo ""

echo "4. API Endpoints Verification"
echo "-----------------------------"
check_url "${BASE_URL}/api/cms/page-builder" "Page Builder API"
check_url "${BASE_URL}/api/cms/hero" "Hero API"
check_url "${BASE_URL}/api/cms/menu" "Menu API"
echo ""

echo "=========================================="
echo "Verification Complete!"
echo ""
echo "Next Steps:"
echo "1. Log in to ${BASE_URL}/admin/dashboard"
echo "2. Test visual design controls on each page"
echo "3. Verify settings save and persist"
echo "4. Create deployment proof videos/screenshots"
echo ""
echo "For detailed testing instructions, see:"
echo "- QUICK_START_DEPLOYMENT.md (Step 6)"
echo "- DEPLOYMENT_CONFIGURATION.md (Testing section)"
echo ""
