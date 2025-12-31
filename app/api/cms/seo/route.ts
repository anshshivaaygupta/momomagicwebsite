import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'seo.json');

async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

async function loadSEOData() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return {
      pages: [
        {
          page: 'Home',
          title: 'Momos Magic - Best Momos in Sherghati, Bihar',
          description: 'Experience the magic of authentic momos in Sherghati. Award-winning quality, innovative flavors like Kurkure and Pizza Momos. FSSAI certified, 100% vegetarian.',
          keywords: 'momos, sherghati, kurkure momos, pizza momos, food, bihar, best momos',
          ogTitle: '',
          ogDescription: '',
          ogImage: '/og-image.jpg',
          twitterCard: 'summary_large_image',
          canonicalUrl: 'https://momomagic.com',
          robots: 'index, follow',
        },
      ],
      sitemapEnabled: true,
    };
  }
}

async function saveSEOData(data: any) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  try {
    const data = await loadSEOData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load SEO data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    await saveSEOData(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save SEO data' },
      { status: 500 }
    );
  }
}
