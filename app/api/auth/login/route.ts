import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, createSession } from '@/lib/auth/auth';
import { checkRateLimit, recordLoginAttempt, getRemainingBlockTime } from '@/lib/auth/rate-limit';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const identifier = `${clientIp}-${username}`;
    const rateLimit = checkRateLimit(identifier);

    if (!rateLimit.allowed) {
      const remainingTime = getRemainingBlockTime(identifier);
      const minutes = Math.ceil(remainingTime / 60000);
      return NextResponse.json(
        { error: `Too many login attempts. Please try again in ${minutes} minute${minutes > 1 ? 's' : ''}.` },
        { status: 429 }
      );
    }

    const user = validateCredentials(username, password);

    if (!user) {
      recordLoginAttempt(identifier, false);
      const remaining = rateLimit.remainingAttempts ? rateLimit.remainingAttempts - 1 : 0;
      return NextResponse.json(
        { 
          error: 'Invalid credentials',
          remainingAttempts: remaining > 0 ? remaining : 0
        },
        { status: 401 }
      );
    }

    recordLoginAttempt(identifier, true);

    const sessionToken = createSession(user);
    const cookieStore = await cookies();
    
    cookieStore.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
