import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import fs from 'fs/promises';
import path from 'path';

const CMS_DATA_DIR = path.join(process.cwd(), 'data', 'cms');
const GALLERY_DATA_FILE = path.join(CMS_DATA_DIR, 'gallery.json');

async function ensureDataDir() {
  try {
    await fs.mkdir(CMS_DATA_DIR, { recursive: true });
  } catch (error) {
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAuth();
    await ensureDataDir();

    const body = await request.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Image IDs array is required' },
        { status: 400 }
      );
    }

    let galleryData: { images: any[] } = { images: [] };
    try {
      const data = await fs.readFile(GALLERY_DATA_FILE, 'utf-8');
      galleryData = JSON.parse(data);
    } catch (error) {
      return NextResponse.json(
        { error: 'Gallery data not found' },
        { status: 404 }
      );
    }

    galleryData.images = galleryData.images.filter((i: any) => !ids.includes(i.id));

    await fs.writeFile(GALLERY_DATA_FILE, JSON.stringify(galleryData, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: `${ids.length} images deleted successfully`
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error bulk deleting images:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAuth();
    await ensureDataDir();

    const body = await request.json();
    const { ids, category } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Image IDs array is required' },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { error: 'Category is required' },
        { status: 400 }
      );
    }

    let galleryData: { images: any[] } = { images: [] };
    try {
      const data = await fs.readFile(GALLERY_DATA_FILE, 'utf-8');
      galleryData = JSON.parse(data);
    } catch (error) {
      return NextResponse.json(
        { error: 'Gallery data not found' },
        { status: 404 }
      );
    }

    galleryData.images = galleryData.images.map((image: any) => {
      if (ids.includes(image.id)) {
        return { ...image, category };
      }
      return image;
    });

    await fs.writeFile(GALLERY_DATA_FILE, JSON.stringify(galleryData, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: `${ids.length} images updated successfully`
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error bulk updating images:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
