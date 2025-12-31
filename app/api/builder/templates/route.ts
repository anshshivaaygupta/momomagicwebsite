import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const templateId = searchParams.get('id');

    if (templateId) {
      const template = await queryOne(
        'SELECT * FROM page_templates WHERE id = ?',
        [templateId]
      );

      if (!template) {
        return NextResponse.json(
          { error: 'Template not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ template });
    }

    let sql = 'SELECT * FROM page_templates WHERE 1=1';
    const params: any[] = [];

    if (category && category !== 'all') {
      sql += ' AND category = ?';
      params.push(category);
    }

    sql += ' ORDER BY created_at DESC';

    const templates = await query(sql, params);

    return NextResponse.json({ templates });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, sections, thumbnail, isPublic = false } = body;

    if (!name || !category || !sections) {
      return NextResponse.json(
        { error: 'Name, category, and sections are required' },
        { status: 400 }
      );
    }

    const templateId = `TEMPLATE-${Date.now()}`;
    const sectionsJson = JSON.stringify(sections);

    await query(
      `INSERT INTO page_templates (id, name, category, sections, thumbnail, is_public, created_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [templateId, name, category, sectionsJson, thumbnail || null, isPublic]
    );

    return NextResponse.json({
      success: true,
      message: 'Template saved successfully',
      templateId,
    });
  } catch (error) {
    console.error('Error saving template:', error);
    return NextResponse.json(
      { error: 'Failed to save template' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const templateId = searchParams.get('id');

    if (!templateId) {
      return NextResponse.json(
        { error: 'Template ID is required' },
        { status: 400 }
      );
    }

    await query('DELETE FROM page_templates WHERE id = ?', [templateId]);

    return NextResponse.json({
      success: true,
      message: 'Template deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting template:', error);
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    );
  }
}
