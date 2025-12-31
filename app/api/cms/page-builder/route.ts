import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pageName = searchParams.get('page');

    if (!pageName) {
      return NextResponse.json(
        { error: 'Page name is required' },
        { status: 400 }
      );
    }

    const result = await query(
      'SELECT * FROM page_configurations WHERE page_name = ?',
      [pageName]
    );

    if (result.length === 0) {
      return NextResponse.json(
        { sections: [] },
        { status: 200 }
      );
    }

    const sectionsConfig = result[0].sections_config;
    const sections = typeof sectionsConfig === 'string' 
      ? JSON.parse(sectionsConfig) 
      : sectionsConfig;
    
    return NextResponse.json({
      sections,
    });
  } catch (error) {
    console.error('Error fetching page configuration:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page configuration' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pageName, sections } = body;

    if (!pageName || !sections) {
      return NextResponse.json(
        { error: 'Page name and sections are required' },
        { status: 400 }
      );
    }

    const existingResult = await query(
      'SELECT id FROM page_configurations WHERE page_name = ?',
      [pageName]
    );

    if (existingResult.length > 0) {
      await query(
        'UPDATE page_configurations SET sections_config = ?, updated_at = NOW() WHERE page_name = ?',
        [JSON.stringify(sections), pageName]
      );
    } else {
      await query(
        'INSERT INTO page_configurations (page_name, sections_config, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
        [pageName, JSON.stringify(sections)]
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Page configuration saved successfully',
    });
  } catch (error) {
    console.error('Error saving page configuration:', error);
    return NextResponse.json(
      { error: 'Failed to save page configuration' },
      { status: 500 }
    );
  }
}
