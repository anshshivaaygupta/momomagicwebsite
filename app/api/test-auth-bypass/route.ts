import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/auth/auth';
import { cookies } from 'next/headers';

// TEMPORARY TEST ENDPOINT - REMOVE AFTER PHASE 7 TESTING
// This endpoint bypasses authentication for testing purposes only
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testKey } = body;
    
    // Simple test key to prevent abuse
    if (testKey !== 'phase7-testing-2025') {
      return NextResponse.json(
        { error: 'Invalid test key' },
        { status: 401 }
      );
    }
    
    // Create a test admin session
    const testUser = {
      id: '1',
      username: 'test-admin',
      email: 'test@momomagic.com',
      role: 'admin' as const,
    };
    
    const sessionToken = createSession(testUser);
    const cookieStore = await cookies();
    
    cookieStore.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hour only
      path: '/',
    });
    
    return NextResponse.json({
      success: true,
      message: 'Test session created',
      user: testUser,
    });
  } catch (error) {
    console.error('Test auth bypass error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
