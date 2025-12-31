import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || 'week';

    const analyticsData = {
      pageViews: {
        total: 15420,
        today: 234,
        thisWeek: 1847,
        thisMonth: 6892
      },
      popularPages: [
        { page: 'Home', views: 5234 },
        { page: 'Menu', views: 4123 },
        { page: 'About', views: 2456 },
        { page: 'Contact', views: 1892 },
        { page: 'Gallery', views: 1715 }
      ],
      popularMenuItems: [
        { name: 'Kurkure Veg Momos', views: 892 },
        { name: 'Paneer Pizza Momos', views: 745 },
        { name: 'Cheese Corn Momos', views: 623 },
        { name: 'Veg Fried Momos', views: 534 },
        { name: 'Soya Momos', views: 412 }
      ],
      deviceStats: {
        mobile: 8234,
        desktop: 5892,
        tablet: 1294
      }
    };

    return NextResponse.json(analyticsData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}
