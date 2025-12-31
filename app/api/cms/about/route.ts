import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import { query, queryOne } from '@/lib/db';

const defaultAboutData = {
  founderStory: {
    name: 'Dhruv Gupta',
    title: 'Founder & Chef',
    location: 'Sherghati, Bihar',
    established: 'September 2023',
    paragraphs: [
      'In September 2023, Dhruv Gupta, a young entrepreneur from Sherghati, started his journey with a simple yet powerful philosophy: "Better to be a small owner than someone else\'s employee."',
      'What began as a small experiment with Pita quickly transformed into something magical. Dhruv listened to his customers, understood the market, and pivoted to momos - a decision that would change everything.',
      'The breakthrough came with the introduction of Kurkure Momos - an innovation nobody in Bihar had attempted before. This bold move put Sherghati on the food map and earned Momos Magic recognition from the District Magistrate\'s office.',
      'Today, Momos Magic serves 2000+ happy customers with the same passion and commitment to quality that started it all. The journey continues with new innovations like Pizza Momos, always staying true to the core values of quality, hygiene, and customer satisfaction.',
    ],
  },
  philosophy: {
    subtitle: 'Our Philosophy',
    title: 'Quantity bhi Mast, Taste bhi Zabardast',
    description: 'Because every customer deserves the best of both worlds - generous portions without compromising on the authentic taste that made us famous.',
  },
  timeline: [
    { date: 'Sep 2023', event: 'Humble beginnings with small stall', icon: '🏪' },
    { date: 'Nov 2023', event: 'Pita to Momos transformation', icon: '🔄' },
    { date: 'Jan 2024', event: 'Exclusive Kurkure Momos introduced', icon: '✨' },
    { date: 'Jun 2024', event: '"Best Quality Food" award from DM Office', icon: '🏆' },
    { date: 'Dec 2024', event: 'Premium stall redesign', icon: '🎨' },
    { date: 'Mar 2025', event: 'Pizza Momos innovation launched', icon: '🍕' },
  ],
  qualityCommitments: [
    {
      icon: '🌱',
      title: 'Daily Fresh Ingredients',
      description: 'We source fresh vegetables and ingredients from local markets every morning. No frozen or pre-packaged items.',
    },
    {
      icon: '🔥',
      title: 'Magic Masala Recipe',
      description: 'Our special "Magic Masala" is created in-house using a secret blend of spices perfected over generations.',
    },
    {
      icon: '🧼',
      title: 'Hygiene-First Kitchen',
      description: 'FSSAI certified kitchen with strict hygiene protocols. Regular sanitization and quality checks.',
    },
    {
      icon: '👨‍🍳',
      title: 'Third-Generation Recipe',
      description: 'Traditional recipes passed down through generations, perfected with modern innovations.',
    },
  ],
};

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const result = await queryOne(
      'SELECT content_data FROM cms_content WHERE page_name = ?',
      ['about']
    );

    if (result && result.content_data) {
      const contentData = typeof result.content_data === 'string' 
        ? JSON.parse(result.content_data) 
        : result.content_data;
      
      return NextResponse.json({
        ...defaultAboutData,
        ...contentData
      });
    }

    return NextResponse.json(defaultAboutData);
  } catch (error) {
    console.error('Error fetching about content:', error);
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
      ['about']
    );

    if (existingResult) {
      await query(
        'UPDATE cms_content SET content_data = ?, updated_at = NOW() WHERE page_name = ?',
        [JSON.stringify(body), 'about']
      );
    } else {
      await query(
        'INSERT INTO cms_content (page_name, content_data, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
        ['about', JSON.stringify(body)]
      );
    }

    return NextResponse.json({
      success: true,
      message: 'About content saved successfully',
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error saving about content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
