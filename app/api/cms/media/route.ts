import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import fs from 'fs/promises';
import path from 'path';

const CMS_DATA_DIR = path.join(process.cwd(), 'data', 'cms');
const MEDIA_DATA_FILE = path.join(CMS_DATA_DIR, 'media.json');

async function ensureDataDir() {
  try {
    await fs.mkdir(CMS_DATA_DIR, { recursive: true });
  } catch (error) {
  }
}

export async function GET(request: NextRequest) {
  try {
    await requireAuth();
    await ensureDataDir();

    try {
      const data = await fs.readFile(MEDIA_DATA_FILE, 'utf-8');
      return NextResponse.json(JSON.parse(data));
    } catch (error) {
      const defaultData = {
        files: []
      };
      return NextResponse.json(defaultData);
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAuth();
    await ensureDataDir();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'File ID is required' },
        { status: 400 }
      );
    }

    let mediaData: { files: any[] } = { files: [] };
    try {
      const data = await fs.readFile(MEDIA_DATA_FILE, 'utf-8');
      mediaData = JSON.parse(data);
    } catch (error) {
      return NextResponse.json(
        { error: 'Media data not found' },
        { status: 404 }
      );
    }

    mediaData.files = mediaData.files.filter((f: any) => f.id !== id);

    await fs.writeFile(MEDIA_DATA_FILE, JSON.stringify(mediaData, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error deleting file:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
