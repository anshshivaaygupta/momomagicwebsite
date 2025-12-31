import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentId, versionId } = body;

    if (!contentId || !versionId) {
      return NextResponse.json(
        { error: 'Content ID and version ID are required' },
        { status: 400 }
      );
    }

    const version = await queryOne(
      'SELECT * FROM content_versions WHERE id = ? AND content_id = ?',
      [versionId, contentId]
    );

    if (!version) {
      return NextResponse.json(
        { error: 'Version not found' },
        { status: 404 }
      );
    }

    const newVersionId = `VERSION-${Date.now()}`;
    await query(
      `INSERT INTO content_versions (id, content_id, snapshot, changes, description, author, created_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [
        newVersionId,
        contentId,
        version.snapshot,
        JSON.stringify([{ type: 'restored', field: 'all', oldValue: null, newValue: 'Restored from version' }]),
        `Restored from version ${versionId}`,
        'System',
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Version restored successfully',
      snapshot: JSON.parse(version.snapshot),
    });
  } catch (error) {
    console.error('Error restoring version:', error);
    return NextResponse.json(
      { error: 'Failed to restore version' },
      { status: 500 }
    );
  }
}
