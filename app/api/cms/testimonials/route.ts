import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import fs from 'fs/promises';
import path from 'path';

const CMS_DATA_DIR = path.join(process.cwd(), 'data', 'cms');
const TESTIMONIALS_DATA_FILE = path.join(CMS_DATA_DIR, 'testimonials.json');

async function ensureDataDir() {
  try {
    await fs.mkdir(CMS_DATA_DIR, { recursive: true });
  } catch (error) {
  }
}

const defaultTestimonials = [
  {
    id: '1',
    name: 'Rohan Kumar',
    role: 'Regular Customer',
    rating: 5,
    text: 'The Kurkure Momos are revolutionary! Nobody in Bihar makes them like Momos Magic. Dhruv bhaiya\'s innovation changed street food forever!',
    image: '',
    date: '2024-12-15',
    featured: true,
  },
  {
    id: '2',
    name: 'City Food Blog',
    role: 'Food Critic',
    rating: 5,
    text: 'Awarded "Best Quality Food" for a reason! The hygiene, taste, and innovation combination is unmatched in Sherghati.',
    image: '',
    date: '2024-11-20',
    featured: true,
  },
  {
    id: '3',
    name: 'Priya Sharma',
    role: 'Local Foodie',
    rating: 5,
    text: 'From watching them start with a small stall to becoming the most premium food spot - what a journey! The Pizza Momos are genius!',
    image: '',
    date: '2024-10-05',
    featured: true,
  },
];

export async function GET(request: NextRequest) {
  try {
    await requireAuth();
    await ensureDataDir();

    try {
      const data = await fs.readFile(TESTIMONIALS_DATA_FILE, 'utf-8');
      const rawData = JSON.parse(data);
      
      const transformedData = {
        testimonials: (rawData.items || rawData.testimonials || []).map((item: any) => ({
          id: item.id,
          name: item.name,
          role: item.location || item.role || 'Customer',
          rating: item.rating,
          text: item.text,
          image: item.image || '',
          date: item.date,
          featured: item.isFeatured || item.featured || false
        }))
      };
      
      return NextResponse.json(transformedData);
    } catch (error) {
      const defaultData = {
        testimonials: defaultTestimonials
      };
      return NextResponse.json(defaultData);
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    await ensureDataDir();

    const body = await request.json();
    const { testimonial } = body;

    let testimonialsData: { testimonials: any[] } = { testimonials: defaultTestimonials };
    try {
      const data = await fs.readFile(TESTIMONIALS_DATA_FILE, 'utf-8');
      testimonialsData = JSON.parse(data);
    } catch (error) {
    }

    const existingIndex = testimonialsData.testimonials.findIndex((t: any) => t.id === testimonial.id);
    if (existingIndex >= 0) {
      testimonialsData.testimonials[existingIndex] = testimonial;
    } else {
      testimonialsData.testimonials.push(testimonial);
    }

    await fs.writeFile(TESTIMONIALS_DATA_FILE, JSON.stringify(testimonialsData, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Testimonial saved successfully'
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error saving testimonial:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAuth();
    await ensureDataDir();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Testimonial ID is required' },
        { status: 400 }
      );
    }

    let testimonialsData: { testimonials: any[] } = { testimonials: defaultTestimonials };
    try {
      const data = await fs.readFile(TESTIMONIALS_DATA_FILE, 'utf-8');
      testimonialsData = JSON.parse(data);
    } catch (error) {
      return NextResponse.json(
        { error: 'Testimonials data not found' },
        { status: 404 }
      );
    }

    testimonialsData.testimonials = testimonialsData.testimonials.filter((t: any) => t.id !== id);

    await fs.writeFile(TESTIMONIALS_DATA_FILE, JSON.stringify(testimonialsData, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error deleting testimonial:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
