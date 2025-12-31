import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    await requireAuth();

    const { page } = await params;
    
    const backups = await query(
      'SELECT id, backup_type, backup_name, created_at, created_by FROM content_backups WHERE page_name = ? AND created_at >= NOW() - INTERVAL 7 DAY ORDER BY created_at DESC LIMIT 50',
      [page]
    );

    const history = await query(
      'SELECT id, action, status, message, created_at, created_by FROM publish_history WHERE page_name = ? ORDER BY created_at DESC LIMIT 10',
      [page]
    );

    return NextResponse.json({
      backups,
      history
    });

  } catch (error) {
    console.error('Error getting history:', error);
    return NextResponse.json(
      { error: 'Failed to get history' },
      { status: 500 }
    );
  }
}
