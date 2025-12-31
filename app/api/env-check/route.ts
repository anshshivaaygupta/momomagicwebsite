import { NextResponse } from 'next/server';

export async function GET() {
  const dbUrl = process.env.DATABASE_URL;
  
  if (!dbUrl) {
    return NextResponse.json({
      error: 'DATABASE_URL not set',
      allEnvKeys: Object.keys(process.env).filter(k => k.includes('DATABASE') || k.includes('MYSQL') || k.includes('PG') || k.includes('POSTGRES')),
    }, { status: 500 });
  }
  
  try {
    const url = new URL(dbUrl);
    return NextResponse.json({
      success: true,
      protocol: url.protocol,
      hostname: url.hostname,
      port: url.port || 'default',
      database: url.pathname.slice(1),
      usernameLength: url.username.length,
      passwordLength: url.password.length,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: 'Failed to parse DATABASE_URL',
      message: error.message,
    }, { status: 500 });
  }
}
