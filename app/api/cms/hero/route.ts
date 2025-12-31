import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import { query, queryOne } from '@/lib/db';

const defaultData = {
  headline: 'From Humble Stall to Culinary Legend',
  subheadline: 'Experience the Magic That Transformed Sherghati\'s Street Food Scene',
  primaryCTA: 'Order Now',
  secondaryCTA: 'Our Story',
  badges: [
    'Awarded "Best Quality Food in City"',
    'FSSAI Certified: 20424201001152',
    '100% Pure Vegetarian · Since 2023',
    '⭐ 4.9/5 (2000+ Happy Customers)'
  ],
  backgroundVideo: '/videos/hero-bg.mp4'
};

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const result = await queryOne(
      'SELECT content_data FROM cms_content WHERE page_name = ?',
      ['hero']
    );

    if (result && result.content_data) {
      const contentData = typeof result.content_data === 'string' 
        ? JSON.parse(result.content_data) 
        : result.content_data;
      
      return NextResponse.json({
        ...defaultData,
        ...contentData
      });
    }

    return NextResponse.json(defaultData);
  } catch (error) {
    console.error('Error fetching hero content:', error);
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

    const existingResult = await queryOne(
      'SELECT id FROM cms_content WHERE page_name = ?',
      ['hero']
    );

    if (existingResult) {
      await query(
        'UPDATE cms_content SET content_data = ?, updated_at = NOW() WHERE page_name = ?',
        [JSON.stringify(body), 'hero']
      );
    } else {
      await query(
        'INSERT INTO cms_content (page_name, content_data, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
        ['hero', JSON.stringify(body)]
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Hero content updated successfully'
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error saving hero content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
