import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import { query, queryOne } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    await requireAuth();

    const { page } = await params;
    
    const latestBackup = await queryOne(
      'SELECT content_data FROM content_backups WHERE page_name = ? ORDER BY created_at DESC LIMIT 1',
      [page]
    );

    if (!latestBackup) {
      return NextResponse.json(
        { error: 'No backup found for this page' },
        { status: 404 }
      );
    }

    const existingRecord = await queryOne(
      'SELECT id FROM published_content WHERE page_name = ?',
      [page]
    );

    if (existingRecord) {
      await query(
        'UPDATE published_content SET content_data = ?, published_at = NOW() WHERE page_name = ?',
        [JSON.stringify(latestBackup.content_data), page]
      );
    } else {
      await query(
        'INSERT INTO published_content (page_name, content_data) VALUES (?, ?)',
        [page, JSON.stringify(latestBackup.content_data)]
      );
    }

    await query(
      'INSERT INTO publish_history (page_name, action, status, message) VALUES (?, ?, ?, ?)',
      [page, 'undo', 'success', `Restored ${page} content from backup`]
    );

    return NextResponse.json({
      success: true,
      message: 'Content restored from backup successfully'
    });

  } catch (error) {
    console.error('Error undoing changes:', error);
    return NextResponse.json(
      { error: 'Failed to undo changes' },
      { status: 500 }
    );
  }
}
