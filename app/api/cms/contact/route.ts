import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import { query, queryOne } from '@/lib/db';

const defaultContactData = {
  address: {
    line1: 'Naya Bazar, Near Post Office',
    line2: '',
    city: 'Sherghati',
    state: 'Bihar',
    pincode: '824211',
  },
  phone: '+91 9955955191',
  website: 'www.momomegics.com',
  businessHours: {
    weekdays: '10:00 AM - 10:00 PM',
    weekends: '10:00 AM - 10:00 PM',
    note: 'Open Every Day',
  },
  socialMedia: {
    facebook: '',
    instagram: '',
    twitter: '',
  },
  mapEmbedUrl: '',
};

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const result = await queryOne(
      'SELECT content_data FROM cms_content WHERE page_name = ?',
      ['contact']
    );

    if (result && result.content_data) {
      const contentData = typeof result.content_data === 'string' 
        ? JSON.parse(result.content_data) 
        : result.content_data;
      
      return NextResponse.json({
        ...defaultContactData,
        ...contentData
      });
    }

    return NextResponse.json(defaultContactData);
  } catch (error) {
    console.error('Error fetching contact content:', error);
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
      ['contact']
    );

    if (existingResult) {
      await query(
        'UPDATE cms_content SET content_data = ?, updated_at = NOW() WHERE page_name = ?',
        [JSON.stringify(body), 'contact']
      );
    } else {
      await query(
        'INSERT INTO cms_content (page_name, content_data, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
        ['contact', JSON.stringify(body)]
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Contact information saved successfully',
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error saving contact information:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
