import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import { query, queryOne } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const result = await queryOne(
      'SELECT content_data FROM cms_content WHERE page_name = ?',
      ['gallery']
    );

    if (result && result.content_data) {
      const contentData = typeof result.content_data === 'string' 
        ? JSON.parse(result.content_data) 
        : result.content_data;
      
      return NextResponse.json(contentData.images ? contentData : { images: [] });
    }

    return NextResponse.json({ images: [] });
  } catch (error) {
    console.error('Error fetching gallery content:', error);
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const body = await request.json();
    const { image } = body;

    const result = await queryOne(
      'SELECT content_data FROM cms_content WHERE page_name = ?',
      ['gallery']
    );

    let galleryData: { images: any[] } = { images: [] };
    if (result && result.content_data) {
      const contentData = typeof result.content_data === 'string' 
        ? JSON.parse(result.content_data) 
        : result.content_data;
      galleryData = contentData;
    }

    const existingIndex = galleryData.images.findIndex((i: any) => i.id === image.id);
    if (existingIndex >= 0) {
      galleryData.images[existingIndex] = image;
    } else {
      galleryData.images.push(image);
    }

    const existingResult = await queryOne(
      'SELECT id FROM cms_content WHERE page_name = ?',
      ['gallery']
    );

    if (existingResult) {
      await query(
        'UPDATE cms_content SET content_data = ?, updated_at = NOW() WHERE page_name = ?',
        [JSON.stringify(galleryData), 'gallery']
      );
    } else {
      await query(
        'INSERT INTO cms_content (page_name, content_data, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
        ['gallery', JSON.stringify(galleryData)]
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Image saved successfully'
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error saving image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      );
    }

    const result = await queryOne(
      'SELECT content_data FROM cms_content WHERE page_name = ?',
      ['gallery']
    );

    if (!result || !result.content_data) {
      return NextResponse.json(
        { error: 'Gallery data not found' },
        { status: 404 }
      );
    }

    const contentData = typeof result.content_data === 'string' 
      ? JSON.parse(result.content_data) 
      : result.content_data;
    
    let galleryData: { images: any[] } = contentData;
    galleryData.images = galleryData.images.filter((i: any) => i.id !== id);

    await query(
      'UPDATE cms_content SET content_data = ?, updated_at = NOW() WHERE page_name = ?',
      [JSON.stringify(galleryData), 'gallery']
    );

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
