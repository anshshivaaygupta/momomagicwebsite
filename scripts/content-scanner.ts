/**
 * CONTENT SCANNER - Phase 5 Task 1
 * 
 * Scans all website pages and extracts existing content to populate CMS
 * 
 * Features:
 * - Scans all 11 pages for text, images, videos, buttons
 * - Extracts content with CSS selectors
 * - Creates content inventory JSON
 * - Auto-categorizes content by pages and types
 */

import fs from 'fs';
import path from 'path';

interface ContentItem {
  id: string;
  type: 'text' | 'image' | 'video' | 'button' | 'link';
  page: string;
  section: string;
  selector: string;
  content: string;
  metadata: Record<string, any>;
}

interface ContentInventory {
  scannedAt: string;
  totalPages: number;
  totalItems: number;
  pages: Record<string, {
    path: string;
    sections: Record<string, ContentItem[]>;
  }>;
}

const PAGES_TO_SCAN = [
  { path: '/', name: 'home', title: 'Homepage' },
  { path: '/menu', name: 'menu', title: 'Menu Page' },
  { path: '/about', name: 'about', title: 'About Page' },
  { path: '/contact', name: 'contact', title: 'Contact Page' },
  { path: '/gallery', name: 'gallery', title: 'Gallery Page' },
  { path: '/combo-deals', name: 'combo-deals', title: 'Combo Deals Page' },
  { path: '/catering', name: 'catering', title: 'Catering Page' },
  { path: '/franchise', name: 'franchise', title: 'Franchise Page' },
  { path: '/download-app', name: 'download-app', title: 'Download App Page' },
  { path: '/careers', name: 'careers', title: 'Careers Page' },
  { path: '/privacy-policy', name: 'privacy-policy', title: 'Privacy Policy' },
];

const CONTENT_MAPPING = {
  'hero-heading': { module: 'hero', field: 'headline' },
  'hero-subheading': { module: 'hero', field: 'subheadline' },
  'hero-cta-primary': { module: 'hero', field: 'primaryButton' },
  'hero-cta-secondary': { module: 'hero', field: 'secondaryButton' },
  
  'menu-item': { module: 'menu', field: 'items' },
  'menu-category': { module: 'menu', field: 'categories' },
  
  'founder-story': { module: 'about', field: 'founderStory' },
  'company-values': { module: 'about', field: 'values' },
  'timeline': { module: 'about', field: 'timeline' },
  
  'contact-address': { module: 'contact', field: 'address' },
  'contact-phone': { module: 'contact', field: 'phone' },
  'contact-email': { module: 'contact', field: 'email' },
  'contact-hours': { module: 'contact', field: 'hours' },
  
  'gallery-image': { module: 'gallery', field: 'images' },
  'gallery-album': { module: 'gallery', field: 'albums' },
  
  'testimonial': { module: 'testimonials', field: 'items' },
  
  'combo-deal': { module: 'combos', field: 'items' },
  
  'catering-package': { module: 'catering', field: 'packages' },
  
  'franchise-info': { module: 'franchise', field: 'information' },
};

/**
 * Scan a React component file and extract static content
 */
function scanComponentFile(filePath: string): ContentItem[] {
  const items: ContentItem[] = [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath, '.tsx');
    
    const textMatches = content.matchAll(/"([^"]{10,})"/g);
    for (const match of textMatches) {
      const text = match[1];
      if (!text.includes('/') && !text.includes('className') && !text.includes('px-')) {
        items.push({
          id: `${fileName}-text-${items.length}`,
          type: 'text',
          page: fileName.toLowerCase(),
          section: fileName,
          selector: `component:${fileName}`,
          content: text,
          metadata: { source: 'component', file: filePath }
        });
      }
    }
    
    const imageMatches = content.matchAll(/src=["']([^"']+\.(jpg|jpeg|png|gif|webp|svg))["']/gi);
    for (const match of imageMatches) {
      items.push({
        id: `${fileName}-image-${items.length}`,
        type: 'image',
        page: fileName.toLowerCase(),
        section: fileName,
        selector: `img[src="${match[1]}"]`,
        content: match[1],
        metadata: { source: 'component', file: filePath, format: match[2] }
      });
    }
    
    const videoMatches = content.matchAll(/src=["']([^"']+\.(mp4|webm|ogg))["']/gi);
    for (const match of videoMatches) {
      items.push({
        id: `${fileName}-video-${items.length}`,
        type: 'video',
        page: fileName.toLowerCase(),
        section: fileName,
        selector: `video[src="${match[1]}"]`,
        content: match[1],
        metadata: { source: 'component', file: filePath, format: match[2] }
      });
    }
    
  } catch (error) {
    console.error(`Error scanning ${filePath}:`, error);
  }
  
  return items;
}

/**
 * Scan all component files in a directory
 */
function scanDirectory(dirPath: string): ContentItem[] {
  let allItems: ContentItem[] = [];
  
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        allItems = allItems.concat(scanDirectory(fullPath));
      } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
        allItems = allItems.concat(scanComponentFile(fullPath));
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
  }
  
  return allItems;
}

/**
 * Main content scanner function
 */
export async function scanWebsiteContent(): Promise<ContentInventory> {
  console.log('🔍 Starting website content scan...\n');
  
  const projectRoot = process.cwd();
  const componentsDir = path.join(projectRoot, 'components');
  const appDir = path.join(projectRoot, 'app');
  
  console.log('📂 Scanning components directory...');
  const componentItems = scanDirectory(componentsDir);
  console.log(`   Found ${componentItems.length} content items in components\n`);
  
  console.log('📂 Scanning app directory...');
  const appItems = scanDirectory(appDir);
  console.log(`   Found ${appItems.length} content items in app\n`);
  
  const allItems = [...componentItems, ...appItems];
  
  const inventory: ContentInventory = {
    scannedAt: new Date().toISOString(),
    totalPages: PAGES_TO_SCAN.length,
    totalItems: allItems.length,
    pages: {}
  };
  
  for (const page of PAGES_TO_SCAN) {
    inventory.pages[page.name] = {
      path: page.path,
      sections: {}
    };
  }
  
  for (const item of allItems) {
    const pageName = item.page;
    const sectionName = item.section;
    
    let targetPage = pageName;
    if (!inventory.pages[pageName]) {
      const matchedPage = PAGES_TO_SCAN.find(p => 
        pageName.includes(p.name) || p.name.includes(pageName)
      );
      targetPage = matchedPage ? matchedPage.name : 'home';
    }
    
    if (!inventory.pages[targetPage].sections[sectionName]) {
      inventory.pages[targetPage].sections[sectionName] = [];
    }
    
    inventory.pages[targetPage].sections[sectionName].push(item);
  }
  
  return inventory;
}

/**
 * Save inventory to JSON file
 */
export function saveInventory(inventory: ContentInventory, outputPath: string): void {
  fs.writeFileSync(outputPath, JSON.stringify(inventory, null, 2), 'utf-8');
  console.log(`\n✅ Content inventory saved to: ${outputPath}`);
}

/**
 * Generate summary report
 */
export function generateSummaryReport(inventory: ContentInventory): void {
  console.log('\n📊 CONTENT SCAN SUMMARY');
  console.log('========================\n');
  console.log(`Scan Date: ${new Date(inventory.scannedAt).toLocaleString()}`);
  console.log(`Total Pages: ${inventory.totalPages}`);
  console.log(`Total Content Items: ${inventory.totalItems}\n`);
  
  console.log('📄 Content by Page:');
  for (const [pageName, pageData] of Object.entries(inventory.pages)) {
    const sectionCount = Object.keys(pageData.sections).length;
    const itemCount = Object.values(pageData.sections).reduce((sum, items) => sum + items.length, 0);
    console.log(`   ${pageName.padEnd(20)} - ${sectionCount} sections, ${itemCount} items`);
  }
  
  console.log('\n📝 Content by Type:');
  const typeCount: Record<string, number> = {};
  for (const pageData of Object.values(inventory.pages)) {
    for (const items of Object.values(pageData.sections)) {
      for (const item of items) {
        typeCount[item.type] = (typeCount[item.type] || 0) + 1;
      }
    }
  }
  for (const [type, count] of Object.entries(typeCount)) {
    console.log(`   ${type.padEnd(10)} - ${count} items`);
  }
  
  console.log('\n');
}

if (require.main === module) {
  (async () => {
    try {
      const inventory = await scanWebsiteContent();
      
      const outputDir = path.join(process.cwd(), 'data', 'scanner');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const outputPath = path.join(outputDir, 'content-inventory.json');
      saveInventory(inventory, outputPath);
      generateSummaryReport(inventory);
      
      console.log('✅ Content scan complete!\n');
    } catch (error) {
      console.error('❌ Error during content scan:', error);
      process.exit(1);
    }
  })();
}
