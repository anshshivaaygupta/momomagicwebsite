import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import { query, queryOne } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const result = await queryOne(
      'SELECT content_data FROM cms_content WHERE page_name = ?',
      ['combos']
    );

    if (result && result.content_data) {
      const contentData = typeof result.content_data === 'string' 
        ? JSON.parse(result.content_data) 
        : result.content_data;
      
      return NextResponse.json(contentData.combos ? contentData : { combos: [] });
    }

    return NextResponse.json({ combos: [] });
  } catch (error) {
    console.error('Error fetching combos content:', error);
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
    const { combo } = body;

    const result = await queryOne(
      'SELECT content_data FROM cms_content WHERE page_name = ?',
      ['combos']
    );

    let combosData: { combos: any[] } = { combos: [] };
    if (result && result.content_data) {
      const contentData = typeof result.content_data === 'string' 
        ? JSON.parse(result.content_data) 
        : result.content_data;
      combosData = contentData;
    }

    const existingIndex = combosData.combos.findIndex((c: any) => c.id === combo.id);
    if (existingIndex >= 0) {
      combosData.combos[existingIndex] = combo;
    } else {
      combosData.combos.push(combo);
    }

    const existingResult = await queryOne(
      'SELECT id FROM cms_content WHERE page_name = ?',
      ['combos']
    );

    if (existingResult) {
      await query(
        'UPDATE cms_content SET content_data = ?, updated_at = NOW() WHERE page_name = ?',
        [JSON.stringify(combosData), 'combos']
      );
    } else {
      await query(
        'INSERT INTO cms_content (page_name, content_data, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
        ['combos', JSON.stringify(combosData)]
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Combo deal saved successfully'
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error saving combo deal:', error);
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
        { error: 'Combo ID is required' },
        { status: 400 }
      );
    }

    const result = await queryOne(
      'SELECT content_data FROM cms_content WHERE page_name = ?',
      ['combos']
    );

    if (!result || !result.content_data) {
      return NextResponse.json(
        { error: 'Combos data not found' },
        { status: 404 }
      );
    }

    const contentData = typeof result.content_data === 'string' 
      ? JSON.parse(result.content_data) 
      : result.content_data;
    
    let combosData: { combos: any[] } = contentData;
    combosData.combos = combosData.combos.filter((c: any) => c.id !== id);

    await query(
      'UPDATE cms_content SET content_data = ?, updated_at = NOW() WHERE page_name = ?',
      [JSON.stringify(combosData), 'combos']
    );

    return NextResponse.json({
      success: true,
      message: 'Combo deal deleted successfully'
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error deleting combo deal:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
