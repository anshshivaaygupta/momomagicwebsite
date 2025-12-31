import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import { query, queryOne } from '@/lib/db';

const defaultData = {
  packages: [],
  bookings: [],
  testimonials: [],
  settings: {
    deliveryRadius: 10,
    advanceBookingDays: 7,
    maxGuestsPerPackage: 1000,
    contactPhone: '+91 9955955191',
    contactEmail: 'catering@momomagic.com',
  },
};

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const result = await queryOne(
      'SELECT content_data FROM cms_content WHERE page_name = ?',
      ['catering']
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
    console.error('Error fetching catering content:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const body = await request.json();
    const { type, data } = body;

    const result = await queryOne(
      'SELECT content_data FROM cms_content WHERE page_name = ?',
      ['catering']
    );

    let cateringData: any = { packages: [], bookings: [], testimonials: [], settings: {} };
    if (result && result.content_data) {
      const contentData = typeof result.content_data === 'string' 
        ? JSON.parse(result.content_data) 
        : result.content_data;
      cateringData = contentData;
    }

    switch (type) {
      case 'package':
        const existingPackageIndex = cateringData.packages.findIndex((p: any) => p.id === data.id);
        if (existingPackageIndex >= 0) {
          cateringData.packages[existingPackageIndex] = data;
        } else {
          cateringData.packages.push(data);
        }
        break;

      case 'booking':
        const existingBookingIndex = cateringData.bookings.findIndex((b: any) => b.id === data.id);
        if (existingBookingIndex >= 0) {
          cateringData.bookings[existingBookingIndex] = data;
        } else {
          cateringData.bookings.push(data);
        }
        break;

      case 'testimonial':
        const existingTestimonialIndex = cateringData.testimonials.findIndex((t: any) => t.id === data.id);
        if (existingTestimonialIndex >= 0) {
          cateringData.testimonials[existingTestimonialIndex] = data;
        } else {
          cateringData.testimonials.push(data);
        }
        break;

      case 'settings':
        cateringData.settings = { ...cateringData.settings, ...data };
        break;

      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    const existingResult = await queryOne(
      'SELECT id FROM cms_content WHERE page_name = ?',
      ['catering']
    );

    if (existingResult) {
      await query(
        'UPDATE cms_content SET content_data = ?, updated_at = NOW() WHERE page_name = ?',
        [JSON.stringify(cateringData), 'catering']
      );
    } else {
      await query(
        'INSERT INTO cms_content (page_name, content_data, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
        ['catering', JSON.stringify(cateringData)]
      );
    }

    return NextResponse.json({
      success: true,
      message: `Catering ${type} saved successfully`,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.error('Error saving catering data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json({ error: 'Type and ID are required' }, { status: 400 });
    }

    const result = await queryOne(
      'SELECT content_data FROM cms_content WHERE page_name = ?',
      ['catering']
    );

    if (!result || !result.content_data) {
      return NextResponse.json({ error: 'Catering data not found' }, { status: 404 });
    }

    const contentData = typeof result.content_data === 'string' 
      ? JSON.parse(result.content_data) 
      : result.content_data;
    
    let cateringData: any = contentData;

    switch (type) {
      case 'package':
        cateringData.packages = cateringData.packages.filter((p: any) => p.id !== id);
        break;

      case 'booking':
        cateringData.bookings = cateringData.bookings.filter((b: any) => b.id !== id);
        break;

      case 'testimonial':
        cateringData.testimonials = cateringData.testimonials.filter((t: any) => t.id !== id);
        break;

      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    await query(
      'UPDATE cms_content SET content_data = ?, updated_at = NOW() WHERE page_name = ?',
      [JSON.stringify(cateringData), 'catering']
    );

    return NextResponse.json({
      success: true,
      message: `Catering ${type} deleted successfully`,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.error('Error deleting catering data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
