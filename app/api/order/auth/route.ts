import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { query, queryOne, insert } from '@/lib/db';

const otpStore = new Map<string, { otp: string; expiresAt: number }>();

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, phone, otp, name } = body;

    if (action === 'send-otp') {
      const generatedOTP = generateOTP();
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

      otpStore.set(phone, { otp: generatedOTP, expiresAt });

      console.log(`OTP for ${phone}: ${generatedOTP}`);

      return NextResponse.json({
        success: true,
        message: 'OTP sent successfully',
        devOTP: generatedOTP,
      });
    }

    if (action === 'verify-otp') {
      const storedOTP = otpStore.get(phone);

      if (!storedOTP) {
        return NextResponse.json(
          { success: false, message: 'OTP not found or expired' },
          { status: 400 }
        );
      }

      if (storedOTP.expiresAt < Date.now()) {
        otpStore.delete(phone);
        return NextResponse.json(
          { success: false, message: 'OTP expired' },
          { status: 400 }
        );
      }

      if (storedOTP.otp !== otp) {
        return NextResponse.json(
          { success: false, message: 'Invalid OTP' },
          { status: 400 }
        );
      }

      let user = await queryOne<any>(
        'SELECT * FROM users WHERE phone = ?',
        [phone]
      );
      const isNewUser = !user;

      if (!user) {
        const userId = await insert(
          'INSERT INTO users (phone, name, email) VALUES (?, ?, ?)',
          [phone, name || 'User', '']
        );
        user = {
          id: userId,
          phone,
          name: name || 'User',
          email: '',
          created_at: new Date().toISOString(),
        };
      }

      otpStore.delete(phone);

      const sessionToken = Buffer.from(
        JSON.stringify({ userId: user.id, phone, createdAt: Date.now() })
      ).toString('base64');

      const cookieStore = await cookies();
      cookieStore.set('order_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      });

      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user,
        isNewUser,
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('order_session')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const session = JSON.parse(Buffer.from(sessionToken, 'base64').toString());
    const user = await queryOne<any>(
      'SELECT * FROM users WHERE phone = ?',
      [session.phone]
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to get user' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('order_session');

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Logout failed' },
      { status: 500 }
    );
  }
}
