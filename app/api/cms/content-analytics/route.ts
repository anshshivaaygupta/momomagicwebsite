import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentId = searchParams.get('contentId');
    const contentType = searchParams.get('contentType');

    if (!contentId || !contentType) {
      return NextResponse.json(
        { error: 'contentId and contentType are required' },
        { status: 400 }
      );
    }

    const analytics = {
      views: getViewsForContent(contentId, contentType),
      engagement: getEngagementForContent(contentId, contentType),
      conversions: getConversionsForContent(contentId, contentType),
      lastUpdated: new Date().toISOString(),
      performance: {
        loadTime: getLoadTimeForContent(contentId, contentType),
        seoScore: getSeoScoreForContent(contentId, contentType),
      },
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error fetching content analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content analytics' },
      { status: 500 }
    );
  }
}

function getViewsForContent(contentId: string, contentType: string): number {
  const baseViews: Record<string, number> = {
    menu: 850,
    gallery: 620,
    testimonial: 450,
    page: 1200,
  };
  return baseViews[contentType] || 500;
}

function getEngagementForContent(contentId: string, contentType: string): number {
  const baseEngagement: Record<string, number> = {
    menu: 75,
    gallery: 68,
    testimonial: 82,
    page: 65,
  };
  return baseEngagement[contentType] || 60;
}

function getConversionsForContent(contentId: string, contentType: string): number {
  const baseConversions: Record<string, number> = {
    menu: 45,
    gallery: 28,
    testimonial: 35,
    page: 52,
  };
  return baseConversions[contentType] || 30;
}

function getLoadTimeForContent(contentId: string, contentType: string): number {
  const baseLoadTime: Record<string, number> = {
    menu: 1.2,
    gallery: 1.8,
    testimonial: 0.9,
    page: 1.5,
  };
  return baseLoadTime[contentType] || 1.3;
}

function getSeoScoreForContent(contentId: string, contentType: string): number {
  const baseSeoScore: Record<string, number> = {
    menu: 85,
    gallery: 78,
    testimonial: 88,
    page: 82,
  };
  return baseSeoScore[contentType] || 80;
}
