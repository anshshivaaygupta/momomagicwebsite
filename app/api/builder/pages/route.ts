import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('id');
    const slug = searchParams.get('slug');

    if (pageId) {
      const page = await queryOne(
        'SELECT * FROM builder_pages WHERE id = ?',
        [pageId]
      );

      if (!page) {
        return NextResponse.json(
          { error: 'Page not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ page });
    }

    if (slug) {
      const page = await queryOne(
        'SELECT * FROM builder_pages WHERE slug = ?',
        [slug]
      );

      if (!page) {
        return NextResponse.json(
          { error: 'Page not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ page });
    }

    const pages = await query(
      'SELECT * FROM builder_pages ORDER BY updated_at DESC'
    );

    return NextResponse.json({ pages });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, sections, status = 'draft', metaTitle, metaDescription } = body;

    if (!name || !slug || !sections) {
      return NextResponse.json(
        { error: 'Name, slug, and sections are required' },
        { status: 400 }
      );
    }

    const pageId = `PAGE-${Date.now()}`;
    const sectionsJson = JSON.stringify(sections);

    await query(
      `INSERT INTO builder_pages (id, name, slug, sections, status, meta_title, meta_description, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
       ON DUPLICATE KEY UPDATE 
         sections = ?, 
         status = ?, 
         meta_title = ?, 
         meta_description = ?, 
         updated_at = NOW()`,
      [
        pageId, name, slug, sectionsJson, status, metaTitle || null, metaDescription || null,
        sectionsJson, status, metaTitle || null, metaDescription || null
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Page saved successfully',
      pageId,
    });
  } catch (error) {
    console.error('Error saving page:', error);
    return NextResponse.json(
      { error: 'Failed to save page' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('id');

    if (!pageId) {
      return NextResponse.json(
        { error: 'Page ID is required' },
        { status: 400 }
      );
    }

    await query('DELETE FROM builder_pages WHERE id = ?', [pageId]);

    return NextResponse.json({
      success: true,
      message: 'Page deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    );
  }
}
