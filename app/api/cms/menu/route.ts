import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import fs from 'fs/promises';
import path from 'path';

const CMS_DATA_DIR = path.join(process.cwd(), 'data', 'cms');
const MENU_DATA_FILE = path.join(CMS_DATA_DIR, 'menu.json');

async function ensureDataDir() {
  try {
    await fs.mkdir(CMS_DATA_DIR, { recursive: true });
  } catch (error) {
  }
}

const defaultCategories = [
  'Steamed Perfection',
  'Crispy Fried Delights',
  'Magic Signatures',
  'Fusion Innovations'
];

export async function GET(request: NextRequest) {
  try {
    console.log('[MENU API] GET request received');
    const user = await requireAuth();
    console.log('[MENU API] User authenticated:', user?.username);
    await ensureDataDir();

    try {
      console.log('[MENU API] Reading file:', MENU_DATA_FILE);
      const data = await fs.readFile(MENU_DATA_FILE, 'utf-8');
      const menuData = JSON.parse(data);
      console.log('[MENU API] Raw data items count:', menuData.items?.length || 0);
      
      const transformedItems = menuData.items.map((item: any) => {
        const price = item.price?.half !== undefined 
          ? item.price 
          : {
              half: item.price5pc || 0,
              full: item.price10pc || 0
            };
        
        return {
          id: item.id,
          name: item.name,
          category: item.category,
          description: item.description,
          price: price,
          image: item.image,
          imageHalf: item.imageHalf,
          imageFull: item.imageFull,
          isPopular: item.isFeatured || item.isPopular || false,
          isNew: item.badge === 'NEW' || item.isNew || false,
          spiceLevel: item.spiceLevel || 'Medium'
        };
      });
      
      console.log('[MENU API] Transformed items count:', transformedItems.length);
      console.log('[MENU API] First item:', JSON.stringify(transformedItems[0], null, 2));
      
      return NextResponse.json({
        items: transformedItems,
        categories: menuData.categories || defaultCategories
      });
    } catch (error) {
      console.error('[MENU API] Error reading menu data:', error);
      const defaultData = {
        items: [],
        categories: defaultCategories
      };
      return NextResponse.json(defaultData);
    }
  } catch (error) {
    console.error('[MENU API] Auth error:', error);
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    await ensureDataDir();

    const body = await request.json();
    const { item, categories } = body;

    let menuData: { items: any[]; categories: string[] } = { 
      items: [], 
      categories: defaultCategories 
    };
    
    try {
      const data = await fs.readFile(MENU_DATA_FILE, 'utf-8');
      menuData = JSON.parse(data);
    } catch (error) {
    }

    if (categories) {
      menuData.categories = categories;
    }

    if (item) {
      const existingIndex = menuData.items.findIndex((i: any) => i.id === item.id);
      if (existingIndex >= 0) {
        menuData.items[existingIndex] = item;
      } else {
        menuData.items.push(item);
      }
    }

    await fs.writeFile(MENU_DATA_FILE, JSON.stringify(menuData, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: item ? 'Menu item saved successfully' : 'Categories updated successfully'
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error saving menu data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAuth();
    await ensureDataDir();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Item ID is required' },
        { status: 400 }
      );
    }

    let menuData: { items: any[]; categories: string[] } = { 
      items: [], 
      categories: defaultCategories 
    };
    
    try {
      const data = await fs.readFile(MENU_DATA_FILE, 'utf-8');
      menuData = JSON.parse(data);
    } catch (error) {
      return NextResponse.json(
        { error: 'Menu data not found' },
        { status: 404 }
      );
    }

    menuData.items = menuData.items.filter((i: any) => i.id !== id);

    await fs.writeFile(MENU_DATA_FILE, JSON.stringify(menuData, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error deleting menu item:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
