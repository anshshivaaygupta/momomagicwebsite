import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET() {
  const dbUrl = process.env.DATABASE_URL;
  
  if (!dbUrl) {
    return NextResponse.json({
      error: 'DATABASE_URL not set',
    }, { status: 500 });
  }
  
  try {
    const url = new URL(dbUrl);
    const pool = new Pool({
      host: url.hostname,
      port: parseInt(url.port || '5432'),
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1),
      max: 1,
    });
    
    const client = await pool.connect();
    const result = await client.query('SELECT COUNT(*) as count FROM page_configurations');
    client.release();
    await pool.end();
    
    return NextResponse.json({
      success: true,
      message: 'Direct PostgreSQL connection successful!',
      pageCount: result.rows[0]?.count || 0,
      host: url.hostname,
      port: url.port || '5432',
      database: url.pathname.slice(1),
    });
  } catch (error: any) {
    return NextResponse.json({
      error: 'Direct PostgreSQL connection failed',
      message: error.message,
      stack: error.stack?.split('\n').slice(0, 5),
    }, { status: 500 });
  }
}
