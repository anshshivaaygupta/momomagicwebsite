import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const testId = searchParams.get('id');
    const pageSlug = searchParams.get('pageSlug');

    if (testId) {
      const test = await queryOne(
        'SELECT * FROM ab_tests WHERE id = ?',
        [testId]
      );

      if (!test) {
        return NextResponse.json(
          { error: 'A/B test not found' },
          { status: 404 }
        );
      }

      const variants = await query(
        'SELECT * FROM ab_test_variants WHERE test_id = ?',
        [testId]
      );

      const metrics = await query(
        'SELECT * FROM ab_test_metrics WHERE test_id = ?',
        [testId]
      );

      return NextResponse.json({ test, variants, metrics });
    }

    if (pageSlug) {
      const tests = await query(
        'SELECT * FROM ab_tests WHERE page_slug = ? ORDER BY created_at DESC',
        [pageSlug]
      );

      return NextResponse.json({ tests });
    }

    const tests = await query(
      'SELECT * FROM ab_tests ORDER BY created_at DESC'
    );

    return NextResponse.json({ tests });
  } catch (error) {
    console.error('Error fetching A/B tests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch A/B tests' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, pageSlug, variants, trafficSplit, status = 'draft' } = body;

    if (!name || !pageSlug || !variants || variants.length < 2) {
      return NextResponse.json(
        { error: 'Name, pageSlug, and at least 2 variants are required' },
        { status: 400 }
      );
    }

    const testId = `ABTEST-${Date.now()}`;

    await query(
      `INSERT INTO ab_tests (id, name, page_slug, traffic_split, status, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [testId, name, pageSlug, JSON.stringify(trafficSplit), status]
    );

    for (const variant of variants) {
      const variantId = `VARIANT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      await query(
        `INSERT INTO ab_test_variants (id, test_id, name, sections, traffic_percentage)
         VALUES (?, ?, ?, ?, ?)`,
        [variantId, testId, variant.name, JSON.stringify(variant.sections), variant.trafficPercentage]
      );
    }

    return NextResponse.json({
      success: true,
      message: 'A/B test created successfully',
      testId,
    });
  } catch (error) {
    console.error('Error creating A/B test:', error);
    return NextResponse.json(
      { error: 'Failed to create A/B test' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { testId, status } = body;

    if (!testId || !status) {
      return NextResponse.json(
        { error: 'Test ID and status are required' },
        { status: 400 }
      );
    }

    await query(
      'UPDATE ab_tests SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, testId]
    );

    return NextResponse.json({
      success: true,
      message: 'A/B test status updated successfully',
    });
  } catch (error) {
    console.error('Error updating A/B test:', error);
    return NextResponse.json(
      { error: 'Failed to update A/B test' },
      { status: 500 }
    );
  }
}
