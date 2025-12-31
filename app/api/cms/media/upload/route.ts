import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import fs from 'fs/promises';
import path from 'path';
import { writeFile } from 'fs/promises';

const CMS_DATA_DIR = path.join(process.cwd(), 'data', 'cms');
const MEDIA_DATA_FILE = path.join(CMS_DATA_DIR, 'media.json');
const PUBLIC_UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

async function ensureDirectories() {
  try {
    await fs.mkdir(CMS_DATA_DIR, { recursive: true });
    await fs.mkdir(PUBLIC_UPLOADS_DIR, { recursive: true });
  } catch (error) {
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    await ensureDirectories();

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${originalName}`;
    const filepath = path.join(PUBLIC_UPLOADS_DIR, filename);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    const fileRecord = {
      id: timestamp.toString(),
      name: file.name,
      url: `/uploads/${filename}`,
      type: file.type.startsWith('image/') ? 'image' : 'video',
      size: file.size,
      uploadedAt: new Date().toISOString()
    };

    let mediaData: { files: any[] } = { files: [] };
    try {
      const data = await fs.readFile(MEDIA_DATA_FILE, 'utf-8');
      mediaData = JSON.parse(data);
    } catch (error) {
    }

    mediaData.files.push(fileRecord);

    await fs.writeFile(MEDIA_DATA_FILE, JSON.stringify(mediaData, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      file: fileRecord
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
