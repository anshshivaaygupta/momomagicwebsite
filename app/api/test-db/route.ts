import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const dbUrl = process.env.DATABASE_URL;
    const hasDbUrl = !!dbUrl;
    const dbUrlPreview = dbUrl ? `${dbUrl.substring(0, 20)}...` : 'NOT SET';
    
    const result = await query('SELECT COUNT(*) as count FROM page_configurations');
    
    return NextResponse.json({
      success: true,
      hasDbUrl,
      dbUrlPreview,
      pageCount: result[0]?.count || 0,
      message: 'Database connection successful!',
    });
  } catch (error: any) {
    return NextResponse.json({
      error: 'Database query failed',
      message: error.message,
      stack: error.stack?.split('\n').slice(0, 5),
      hasDbUrl: !!process.env.DATABASE_URL,
      dbUrlPreview: process.env.DATABASE_URL ? `${process.env.DATABASE_URL.substring(0, 20)}...` : 'NOT SET',
    }, { status: 500 });
  }
}
