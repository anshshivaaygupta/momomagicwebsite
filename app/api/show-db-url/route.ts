import { NextResponse } from 'next/server';

export async function GET() {
  const dbUrl = process.env.DATABASE_URL;
  
  if (!dbUrl) {
    return NextResponse.json({
      error: 'DATABASE_URL not set',
    }, { status: 500 });
  }
  
  const redacted = dbUrl.replace(/:([^:@]+)@/, ':***REDACTED***@');
  
  return NextResponse.json({
    success: true,
    databaseUrl: redacted,
    length: dbUrl.length,
    startsWithPostgresql: dbUrl.startsWith('postgresql://'),
    startsWithPostgres: dbUrl.startsWith('postgres://'),
    firstChar: dbUrl.charCodeAt(0),
    lastChar: dbUrl.charCodeAt(dbUrl.length - 1),
    hasNewlines: dbUrl.includes('\n'),
    hasCarriageReturns: dbUrl.includes('\r'),
    hasSpaces: dbUrl.includes(' '),
  });
}
