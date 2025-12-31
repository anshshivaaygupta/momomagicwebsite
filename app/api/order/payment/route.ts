import { NextRequest, NextResponse } from 'next/server';
import { paymentConfig } from '@/data/orderData';
import { query, queryOne, update } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, amount, transactionId, userId, phone } = body;

    if (!orderId || !amount || !transactionId || !userId) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    await query(
      `INSERT INTO payments (transaction_id, order_id, user_id, phone, amount, status, merchant_id, key_index) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [transactionId, orderId, userId, phone, amount, 'pending', paymentConfig.merchantId, paymentConfig.keyIndex]
    );

    
    const mockPaymentUrl = `/api/order/payment/simulate?transactionId=${transactionId}`;

    return NextResponse.json({
      success: true,
      message: 'Payment initiated',
      transactionId,
      paymentUrl: mockPaymentUrl,
    });
  } catch (error) {
    console.error('Payment initiation error:', error);
    return NextResponse.json(
      { success: false, message: 'Payment initiation failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get('transactionId');

    if (!transactionId) {
      return NextResponse.json(
        { success: false, message: 'Transaction ID required' },
        { status: 400 }
      );
    }

    const payment = await queryOne<any>(
      'SELECT * FROM payments WHERE transaction_id = ?',
      [transactionId]
    );

    if (!payment) {
      return NextResponse.json(
        { success: false, message: 'Payment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error('Payment status error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to get payment status' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { transactionId, status, phonepeResponse } = body;

    if (!transactionId || !status) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const payment = await queryOne<any>(
      'SELECT * FROM payments WHERE transaction_id = ?',
      [transactionId]
    );

    if (!payment) {
      return NextResponse.json(
        { success: false, message: 'Payment not found' },
        { status: 404 }
      );
    }

    await update(
      'UPDATE payments SET status = ?, phonepe_response = ? WHERE transaction_id = ?',
      [status, JSON.stringify(phonepeResponse), transactionId]
    );

    const updatedPayment = {
      ...payment,
      status,
      phonepe_response: phonepeResponse,
      updated_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Payment status updated',
      payment: updatedPayment,
    });
  } catch (error) {
    console.error('Payment update error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update payment status' },
      { status: 500 }
    );
  }
}
