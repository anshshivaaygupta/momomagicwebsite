import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSlug = searchParams.get('pageSlug');

    if (!pageSlug) {
      return NextResponse.json(
        { error: 'Page slug is required' },
        { status: 400 }
      );
    }

    const analysis = {
      score: 75,
      title: {
        status: 'pass' as const,
        score: 90,
        message: 'Title length is optimal (58 characters)',
        suggestions: [
          'Consider adding your target keyword at the beginning',
          'Make it more compelling to improve click-through rate',
        ],
      },
      description: {
        status: 'warning' as const,
        score: 70,
        message: 'Meta description could be improved (145 characters)',
        suggestions: [
          'Expand to 150-160 characters for better visibility',
          'Include a clear call-to-action',
          'Add your target keyword naturally',
        ],
      },
      keywords: {
        status: 'pass' as const,
        score: 85,
        message: 'Good keyword usage throughout the page',
        suggestions: [
          'Consider adding more long-tail keywords',
          'Use keywords in image alt text',
        ],
      },
      headings: {
        status: 'pass' as const,
        score: 95,
        message: 'Proper heading hierarchy (H1, H2, H3)',
        suggestions: [
          'Great job! Your heading structure is SEO-friendly',
        ],
      },
      images: {
        status: 'warning' as const,
        score: 60,
        message: '3 images missing alt text',
        suggestions: [
          'Add descriptive alt text to all images',
          'Include keywords in alt text where relevant',
          'Compress images to improve page speed',
        ],
      },
      links: {
        status: 'pass' as const,
        score: 80,
        message: 'Good internal linking structure',
        suggestions: [
          'Add more internal links to related pages',
          'Use descriptive anchor text',
          'Consider adding external links to authoritative sources',
        ],
      },
      mobile: {
        status: 'pass' as const,
        score: 95,
        message: 'Page is mobile-friendly',
        suggestions: [
          'Excellent mobile optimization!',
        ],
      },
      speed: {
        status: 'warning' as const,
        score: 65,
        message: 'Page load time could be improved',
        suggestions: [
          'Optimize images for web',
          'Enable browser caching',
          'Minify CSS and JavaScript',
          'Use a CDN for static assets',
        ],
      },
    };

    const keywords = [
      { word: 'momos', count: 15, density: 2.5 },
      { word: 'sherghati', count: 8, density: 1.3 },
      { word: 'delivery', count: 6, density: 1.0 },
      { word: 'food', count: 12, density: 2.0 },
      { word: 'menu', count: 10, density: 1.7 },
      { word: 'order', count: 9, density: 1.5 },
      { word: 'restaurant', count: 7, density: 1.2 },
      { word: 'kurkure', count: 5, density: 0.8 },
      { word: 'steamed', count: 4, density: 0.7 },
      { word: 'fried', count: 4, density: 0.7 },
    ];

    return NextResponse.json({ analysis, keywords });
  } catch (error) {
    console.error('Error analyzing SEO:', error);
    return NextResponse.json(
      { error: 'Failed to analyze SEO' },
      { status: 500 }
    );
  }
}
