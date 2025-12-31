import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'categories.json');

async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

async function loadCategories() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return {
      categories: [
        {
          id: '1',
          name: 'Steamed Momos',
          slug: 'steamed',
          description: 'Fresh and healthy steamed momos',
          icon: '🥟',
          color: '#059669',
          order: 1,
          isActive: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Fried Momos',
          slug: 'fried',
          description: 'Crispy golden fried momos',
          icon: '🔥',
          color: '#EA580C',
          order: 2,
          isActive: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Kurkure Momos',
          slug: 'kurkure',
          description: 'Sherghati exclusive crunchy momos',
          icon: '✨',
          color: '#ffd700',
          order: 3,
          isActive: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: '4',
          name: 'Pizza Momos',
          slug: 'pizza',
          description: 'Innovative fusion pizza momos',
          icon: '🍕',
          color: '#ffc241',
          order: 4,
          isActive: true,
          createdAt: new Date().toISOString(),
        },
      ],
    };
  }
}

async function saveCategories(data: any) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  try {
    const data = await loadCategories();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const category = await request.json();
    const data = await loadCategories();

    const existingIndex = data.categories.findIndex((c: any) => c.id === category.id);

    if (existingIndex >= 0) {
      data.categories[existingIndex] = category;
    } else {
      data.categories.push(category);
    }

    data.categories.sort((a: any, b: any) => a.order - b.order);

    await saveCategories(data);
    return NextResponse.json({ success: true, category });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save category' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }

    const data = await loadCategories();
    data.categories = data.categories.filter((c: any) => c.id !== id);

    await saveCategories(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
