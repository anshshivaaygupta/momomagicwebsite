import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import { query, queryOne } from '@/lib/db';

function getDatabaseType(): 'mysql' | 'postgres' {
  const databaseUrl = process.env.DATABASE_URL || '';
  return databaseUrl.includes('postgres') ? 'postgres' : 'mysql';
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    console.log('[PUBLISH API] Starting publish request');
    await requireAuth();

    const { page } = await params;
    console.log('[PUBLISH API] Page:', page);
    
    const dbType = getDatabaseType();
    console.log('[PUBLISH API] Database type:', dbType);
    console.log('[PUBLISH API] DATABASE_URL present:', !!process.env.DATABASE_URL);
    
    const draftContent = await queryOne(
      'SELECT content_data FROM cms_content WHERE page_name = ?',
      [page]
    );
    console.log('[PUBLISH API] Draft content found:', !!draftContent);

    if (!draftContent) {
      return NextResponse.json(
        { error: 'No draft content found for this page' },
        { status: 404 }
      );
    }

    const existingPublished = await queryOne(
      'SELECT content_data FROM published_content WHERE page_name = ?',
      [page]
    );
    console.log('[PUBLISH API] Existing published content found:', !!existingPublished);

    if (existingPublished) {
      console.log('[PUBLISH API] Creating backup of existing published content');
      try {
        const backupData = typeof existingPublished.content_data === 'string' 
          ? existingPublished.content_data 
          : JSON.stringify(existingPublished.content_data);
        await query(
          'INSERT INTO content_backups (page_name, content_data, backup_type) VALUES (?, ?, ?)',
          [page, backupData, 'auto']
        );
        console.log('[PUBLISH API] Backup created successfully');
      } catch (backupError) {
        console.error('[PUBLISH API] Backup creation failed:', backupError);
      }
    }

    const existingRecord = await queryOne(
      'SELECT id FROM published_content WHERE page_name = ?',
      [page]
    );
    console.log('[PUBLISH API] Existing record found:', !!existingRecord);

    const contentData = typeof draftContent.content_data === 'string' 
      ? draftContent.content_data 
      : JSON.stringify(draftContent.content_data);
    console.log('[PUBLISH API] Content data type:', typeof draftContent.content_data);
    console.log('[PUBLISH API] Content data length:', contentData.length);

    if (existingRecord) {
      console.log('[PUBLISH API] Updating existing published content');
      await query(
        'UPDATE published_content SET content_data = ?, published_at = CURRENT_TIMESTAMP WHERE page_name = ?',
        [contentData, page]
      );
      console.log('[PUBLISH API] Update successful');
    } else {
      console.log('[PUBLISH API] Inserting new published content');
      await query(
        'INSERT INTO published_content (page_name, content_data) VALUES (?, ?)',
        [page, contentData]
      );
      console.log('[PUBLISH API] Insert successful');
    }

    console.log('[PUBLISH API] Recording publish history');
    await query(
      'INSERT INTO publish_history (page_name, action, status, message) VALUES (?, ?, ?, ?)',
      [page, 'publish', 'success', `Published ${page} content to live website`]
    );
    console.log('[PUBLISH API] Publish history recorded');

    return NextResponse.json({
      success: true,
      message: 'Content published successfully',
      publishedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('[PUBLISH API] ERROR OCCURRED:', error);
    console.error('[PUBLISH API] Error name:', error instanceof Error ? error.name : 'Unknown');
    console.error('[PUBLISH API] Error message:', error instanceof Error ? error.message : 'Unknown');
    console.error('[PUBLISH API] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    const { page } = await params;
    console.log('[PUBLISH API] Attempting to record error in publish_history');
    await query(
      'INSERT INTO publish_history (page_name, action, status, message) VALUES (?, ?, ?, ?)',
      [page, 'publish', 'error', error instanceof Error ? error.message : 'Unknown error']
    ).catch((historyError) => {
      console.error('[PUBLISH API] Failed to record error in history:', historyError);
    });

    return NextResponse.json(
      { 
        error: 'Failed to publish content',
        details: error instanceof Error ? error.message : 'Unknown error',
        errorName: error instanceof Error ? error.name : 'Unknown',
        errorStack: error instanceof Error ? error.stack : 'No stack trace',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    await requireAuth();

    const { page } = await params;
    
    const draftContent = await queryOne(
      'SELECT content_data, updated_at FROM cms_content WHERE page_name = ?',
      [page]
    );

    const publishedContent = await queryOne(
      'SELECT content_data, published_at FROM published_content WHERE page_name = ?',
      [page]
    );

    const hasUnpublishedChanges = draftContent && publishedContent && 
      JSON.stringify(draftContent.content_data) !== JSON.stringify(publishedContent.content_data);

    return NextResponse.json({
      status: publishedContent ? (hasUnpublishedChanges ? 'unpublished_changes' : 'published') : 'never_published',
      draftUpdatedAt: draftContent?.updated_at,
      publishedAt: publishedContent?.published_at,
      hasUnpublishedChanges
    });

  } catch (error) {
    console.error('Error getting publish status:', error);
    return NextResponse.json(
      { error: 'Failed to get publish status' },
      { status: 500 }
    );
  }
}
