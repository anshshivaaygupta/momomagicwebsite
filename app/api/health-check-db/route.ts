import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const testQuery = await query('SELECT 1 as test');
    
    let tableExists = false;
    try {
      const tableCheck = await query('SELECT COUNT(*) as count FROM cms_content');
      tableExists = true;
    } catch (e) {
      tableExists = false;
    }
    
    return NextResponse.json({
      success: true,
      database_connected: true,
      cms_content_table_exists: tableExists,
      timestamp: new Date().toISOString(),
      test_query_result: testQuery
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      database_connected: false,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
