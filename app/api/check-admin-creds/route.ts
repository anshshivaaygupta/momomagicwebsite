import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasAdminUsername: !!process.env.ADMIN_USERNAME,
    hasAdminPassword: !!process.env.ADMIN_PASSWORD,
    defaultUsername: 'admin',
    defaultPassword: 'admin123',
    note: 'If environment variables are not set, defaults will be used'
  });
}
