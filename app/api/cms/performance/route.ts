import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const metrics = {
      pageLoadTime: 1200 + Math.random() * 800,
      firstContentfulPaint: 800 + Math.random() * 400,
      largestContentfulPaint: 1500 + Math.random() * 1000,
      cumulativeLayoutShift: Math.random() * 0.15,
      firstInputDelay: 50 + Math.random() * 100,
      totalBlockingTime: 100 + Math.random() * 300,
      speedIndex: 1000 + Math.random() * 500,
    };

    const images = [
      {
        filename: 'hero-banner.jpg',
        originalSize: 2500000,
        optimizedSize: 450000,
        savings: 2050000,
        format: 'jpg',
        dimensions: '1920x1080',
      },
      {
        filename: 'menu-item-1.png',
        originalSize: 1200000,
        optimizedSize: 280000,
        savings: 920000,
        format: 'png',
        dimensions: '800x600',
      },
      {
        filename: 'about-us.jpg',
        originalSize: 1800000,
        optimizedSize: 350000,
        savings: 1450000,
        format: 'jpg',
        dimensions: '1600x900',
      },
    ];

    const assets = [
      {
        type: 'css' as const,
        filename: 'globals.css',
        size: 125000,
        gzippedSize: 28000,
        suggestions: [
          'Remove unused CSS rules',
          'Minify CSS for production',
          'Consider splitting into smaller files',
        ],
      },
      {
        type: 'js' as const,
        filename: 'main.bundle.js',
        size: 450000,
        gzippedSize: 120000,
        suggestions: [
          'Enable code splitting',
          'Remove console.log statements',
          'Use dynamic imports for heavy components',
        ],
      },
      {
        type: 'js' as const,
        filename: 'vendor.bundle.js',
        size: 680000,
        gzippedSize: 180000,
        suggestions: [
          'Update to latest library versions',
          'Remove unused dependencies',
          'Consider using CDN for common libraries',
        ],
      },
    ];

    return NextResponse.json({ metrics, images, assets });
  } catch (error) {
    console.error('Error fetching performance data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch performance data' },
      { status: 500 }
    );
  }
}
