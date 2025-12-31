import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'cms', 'logo.json');

async function ensureDataDir() {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

export async function GET() {
  try {
    await ensureDataDir();
    
    try {
      const data = await fs.readFile(DATA_FILE, 'utf-8');
      return NextResponse.json(JSON.parse(data));
    } catch {
      const defaultLogos = {
        logos: {
          headerLogo: '/logo.png',
          footerLogo: '/logo.png',
          favicon: '/favicon.png',
          appleTouchIcon: '/apple-touch-icon.png'
        }
      };
      return NextResponse.json(defaultLogos);
    }
  } catch (error) {
    console.error('Error loading logo settings:', error);
    return NextResponse.json(
      { error: 'Failed to load logo settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureDataDir();
    const body = await request.json();
    
    const data = {
      logos: body,
      lastUpdated: new Date().toISOString()
    };
    
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ 
      success: true,
      message: 'Logo settings saved successfully'
    });
  } catch (error) {
    console.error('Error saving logo settings:', error);
    return NextResponse.json(
      { error: 'Failed to save logo settings' },
      { status: 500 }
    );
  }
}
