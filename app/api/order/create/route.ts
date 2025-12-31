import { NextRequest, NextResponse } from 'next/server';
import { insert } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, userId, items, subtotal, tax, total, paymentMethod, transactionId } = body;

    if (!orderId || !userId || !items || !subtotal || !tax || !total || !paymentMethod) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const cancellationDeadline = new Date(Date.now() + 5 * 60 * 1000);

    await insert(
      `INSERT INTO orders (order_id, user_id, items, subtotal, tax, total, payment_method, payment_status, payment_id, order_status, cancellation_deadline) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        userId,
        JSON.stringify(items),
        subtotal,
        tax,
        total,
        paymentMethod,
        'pending',
        transactionId || null,
        'placed',
        cancellationDeadline
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      orderId,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create order' },
      { status: 500 }
    );
  }
}
