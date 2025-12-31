import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'cta.json');

async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

async function loadCTAs() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return {
      ctas: [
        {
          id: '1',
          label: 'Order Now',
          url: '/menu',
          location: 'Hero Section',
          style: 'primary',
          icon: '🥟',
          isActive: true,
        },
        {
          id: '2',
          label: 'Our Story',
          url: '/about',
          location: 'Hero Section',
          style: 'secondary',
          icon: '📖',
          isActive: true,
        },
      ],
    };
  }
}

async function saveCTAs(data: any) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  try {
    const data = await loadCTAs();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load CTAs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    await saveCTAs(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save CTAs' },
      { status: 500 }
    );
  }
}
