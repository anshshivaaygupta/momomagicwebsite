import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  recaptchaToken: string;
}

interface RecaptchaV3Response {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  'error-codes'?: string[];
}

async function verifyRecaptchaV3(token: string): Promise<{ success: boolean; score: number }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not set');
    return { success: false, score: 0 };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data: RecaptchaV3Response = await response.json();
    
    if (!data.success) {
      console.error('reCAPTCHA v3 verification failed:', data['error-codes']);
      return { success: false, score: 0 };
    }

    return { success: true, score: data.score };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, score: 0 };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactSubmission = await request.json();

    const { name, email, phone, subject, message, recaptchaToken } = body;

    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification is required' },
        { status: 400 }
      );
    }

    const recaptchaResult = await verifyRecaptchaV3(recaptchaToken);
    
    if (!recaptchaResult.success) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }

    if (recaptchaResult.score < 0.5) {
      console.warn(`Low reCAPTCHA score detected: ${recaptchaResult.score}`);
      return NextResponse.json(
        { error: 'Suspicious activity detected. Please try again later.' },
        { status: 403 }
      );
    }

    const result = await query<any>(
      `INSERT INTO contact_submissions (name, email, phone, subject, message, recaptcha_score)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, phone, subject, message, recaptchaResult.score]
    );

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        submissionId: (result as any).insertId,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
