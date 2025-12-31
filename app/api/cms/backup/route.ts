import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import fs from 'fs/promises';
import path from 'path';

const CMS_DATA_DIR = path.join(process.cwd(), 'data', 'cms');
const BACKUP_DIR = path.join(CMS_DATA_DIR, 'backups');
const BACKUP_INDEX_FILE = path.join(BACKUP_DIR, 'index.json');

async function ensureDirectories() {
  try {
    await fs.mkdir(BACKUP_DIR, { recursive: true });
  } catch (error) {
  }
}

export async function GET(request: NextRequest) {
  try {
    await requireAuth();
    await ensureDirectories();

    try {
      const data = await fs.readFile(BACKUP_INDEX_FILE, 'utf-8');
      const backupIndex = JSON.parse(data);
      return NextResponse.json(backupIndex);
    } catch (error) {
      return NextResponse.json({ backups: [] });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    await ensureDirectories();

    const body = await request.json();
    const { type } = body;

    const backupId = Date.now().toString();
    const backupName = `backup-${new Date().toISOString().split('T')[0]}-${backupId}.json`;

    const backupData: any = {
      timestamp: new Date().toISOString(),
      type: type || 'manual'
    };

    const dataFiles = ['hero.json', 'menu.json', 'media.json'];
    for (const file of dataFiles) {
      try {
        const filePath = path.join(CMS_DATA_DIR, file);
        const data = await fs.readFile(filePath, 'utf-8');
        backupData[file.replace('.json', '')] = JSON.parse(data);
      } catch (error) {
        backupData[file.replace('.json', '')] = null;
      }
    }

    const backupFilePath = path.join(BACKUP_DIR, backupName);
    await fs.writeFile(backupFilePath, JSON.stringify(backupData, null, 2), 'utf-8');

    const stats = await fs.stat(backupFilePath);
    const sizeKB = (stats.size / 1024).toFixed(2);

    let backupIndex: { backups: any[] } = { backups: [] };
    try {
      const data = await fs.readFile(BACKUP_INDEX_FILE, 'utf-8');
      backupIndex = JSON.parse(data);
    } catch (error) {
    }

    backupIndex.backups.unshift({
      id: backupId,
      name: backupName,
      date: new Date().toISOString(),
      size: `${sizeKB} KB`,
      type: type || 'manual'
    });

    if (backupIndex.backups.length > 10) {
      const oldBackups = backupIndex.backups.slice(10);
      for (const backup of oldBackups) {
        try {
          await fs.unlink(path.join(BACKUP_DIR, backup.name));
        } catch (error) {
        }
      }
      backupIndex.backups = backupIndex.backups.slice(0, 10);
    }

    await fs.writeFile(BACKUP_INDEX_FILE, JSON.stringify(backupIndex, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Backup created successfully',
      backup: backupIndex.backups[0]
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error creating backup:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAuth();
    await ensureDirectories();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Backup ID is required' },
        { status: 400 }
      );
    }

    let backupIndex: { backups: any[] } = { backups: [] };
    try {
      const data = await fs.readFile(BACKUP_INDEX_FILE, 'utf-8');
      backupIndex = JSON.parse(data);
    } catch (error) {
      return NextResponse.json(
        { error: 'Backup index not found' },
        { status: 404 }
      );
    }

    const backup = backupIndex.backups.find((b: any) => b.id === id);
    if (!backup) {
      return NextResponse.json(
        { error: 'Backup not found' },
        { status: 404 }
      );
    }

    try {
      await fs.unlink(path.join(BACKUP_DIR, backup.name));
    } catch (error) {
    }

    backupIndex.backups = backupIndex.backups.filter((b: any) => b.id !== id);
    await fs.writeFile(BACKUP_INDEX_FILE, JSON.stringify(backupIndex, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Backup deleted successfully'
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error deleting backup:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
