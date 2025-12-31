import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query('SELECT COUNT(*) as count FROM cms_content');
    
    return NextResponse.json({
      success: true,
      message: 'cms_content table exists!',
      count: result[0]?.count || 0,
      result: result
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
