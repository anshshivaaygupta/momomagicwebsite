import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentId = searchParams.get('contentId');

    if (!contentId) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      );
    }

    const versions = await query(
      `SELECT * FROM content_versions 
       WHERE content_id = ? 
       ORDER BY created_at DESC 
       LIMIT 30`,
      [contentId]
    );

    return NextResponse.json({ versions });
  } catch (error) {
    console.error('Error fetching versions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch versions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentId, snapshot, description, author = 'System' } = body;

    if (!contentId || !snapshot) {
      return NextResponse.json(
        { error: 'Content ID and snapshot are required' },
        { status: 400 }
      );
    }

    const versionId = `VERSION-${Date.now()}`;
    const snapshotJson = JSON.stringify(snapshot);

    const previousVersion = await queryOne(
      'SELECT snapshot FROM content_versions WHERE content_id = ? ORDER BY created_at DESC LIMIT 1',
      [contentId]
    );

    let changes = [];
    if (previousVersion) {
      const prevData = JSON.parse(previousVersion.snapshot);
      const newData = snapshot;
      
      for (const key in newData) {
        if (JSON.stringify(prevData[key]) !== JSON.stringify(newData[key])) {
          changes.push({
            type: prevData[key] ? 'modified' : 'added',
            field: key,
            oldValue: prevData[key],
            newValue: newData[key],
          });
        }
      }
    }

    await query(
      `INSERT INTO content_versions (id, content_id, snapshot, changes, description, author, created_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [versionId, contentId, snapshotJson, JSON.stringify(changes), description || 'Auto-save', author]
    );

    return NextResponse.json({
      success: true,
      message: 'Version saved successfully',
      versionId,
    });
  } catch (error) {
    console.error('Error saving version:', error);
    return NextResponse.json(
      { error: 'Failed to save version' },
      { status: 500 }
    );
  }
}
