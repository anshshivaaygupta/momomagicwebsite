import { NextResponse } from 'next/server';

export async function GET() {
  const dbUrl = process.env.DATABASE_URL;
  
  return NextResponse.json({
    hasDatabaseUrl: !!dbUrl,
    databaseUrlLength: dbUrl?.length || 0,
    databaseUrlStart: dbUrl?.substring(0, 30) || 'NOT SET',
    protocol: dbUrl ? new URL(dbUrl).protocol : 'N/A',
    allEnvKeys: Object.keys(process.env).filter(k => k.includes('DATABASE') || k.includes('MYSQL') || k.includes('PG')),
  });
}
