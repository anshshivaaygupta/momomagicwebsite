'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  type CartItem,
  calculateOrderTotal,
  generateOrderId,
  generateTransactionId,
  paymentConfig,
} from '@/data/orderData';

export default function OrderCheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'phonepe' | 'cash'>('phonepe');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const savedCart = sessionStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      router.push('/order/menu');
      return;
    }

    try {
      const response = await fetch('/api/order/auth');
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
      } else {
        router.push('/order/login');
      }
    } catch (error) {
      router.push('/order/login');
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setProcessing(true);

    try {
      const { subtotal, tax, total } = calculateOrderTotal(cart);
      const orderId = generateOrderId();
      const transactionId = generateTransactionId();

      const orderData = {
        id: orderId,
        userId: user.id,
        items: cart,
        subtotal,
        tax,
        discount: 0,
        total,
        status: 'pending',
        paymentStatus: 'pending',
        paymentMethod,
        phonepeTransactionId: paymentMethod === 'phonepe' ? transactionId : undefined,
        createdAt: new Date().toISOString(),
        estimatedTime: 20,
        canCancel: true,
      };

      sessionStorage.setItem('currentOrder', JSON.stringify(orderData));

      const orderResponse = await fetch('/api/order/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          userId: user.id,
          items: cart,
          subtotal,
          tax,
          total,
          paymentMethod,
          transactionId: paymentMethod === 'phonepe' ? transactionId : undefined,
        }),
      });

      const orderResult = await orderResponse.json();

      if (!orderResult.success) {
        alert('Failed to create order. Please try again.');
        setProcessing(false);
        return;
      }

      if (paymentMethod === 'phonepe') {
        const paymentResponse = await fetch('/api/order/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            amount: total,
            transactionId,
            userId: user.id,
            phone: user.phone,
          }),
        });

        const paymentData = await paymentResponse.json();

        if (paymentData.success) {
          setTimeout(() => {
            router.push(`/order/confirmation?orderId=${orderId}&status=success`);
          }, 2000);
        } else {
          alert('Payment initiation failed. Please try again.');
          setProcessing(false);
        }
      } else {
        router.push(`/order/confirmation?orderId=${orderId}&status=success`);
      }
    } catch (error) {
      console.error('Order placement error:', error);
      alert('Failed to place order. Please try again.');
      setProcessing(false);
    }
  };

  const { subtotal, tax, total } = calculateOrderTotal(cart);

  if (loading) {
    return (
      <div className="min-h-screen bg-pitch-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">💳</div>
          <p className="text-golden-glow">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pitch-black">
      {/* Header */}
      <div className="bg-deep-space border-b border-charcoal">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Checkout</h1>
              <p className="text-sm text-gray-400">Complete your order</p>
            </div>
            <button
              onClick={() => router.push('/order/cart')}
              className="border border-charcoal text-gray-400 px-6 py-2 rounded-lg font-semibold hover:border-premium-orange hover:text-premium-orange transition-all duration-300"
            >
              ← Back to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className="bg-deep-space border border-charcoal rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Customer Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white font-semibold">{user?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone:</span>
                  <span className="text-white font-semibold">{user?.phone}</span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-deep-space border border-charcoal rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Order Items</h3>
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 pb-4 border-b border-charcoal last:border-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-charcoal to-pitch-black rounded-lg flex items-center justify-center">
                      <div className="text-2xl">🥟</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{item.menuItem.name}</h4>
                      <p className="text-sm text-gray-400">
                        {item.quantity}pc • {item.spiceLevel} spice
                      </p>
                    </div>
                    <div className="text-premium-orange font-bold">₹{item.subtotal}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-deep-space border border-charcoal rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Payment Method</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentMethod('phonepe')}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                    paymentMethod === 'phonepe'
                      ? 'border-premium-orange bg-premium-orange/10'
                      : 'border-charcoal hover:border-premium-orange/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">💳</div>
                    <div className="flex-1 text-left">
                      <div className="text-white font-bold">PhonePe</div>
                      <div className="text-sm text-gray-400">UPI, Cards, Net Banking</div>
                    </div>
                    {paymentMethod === 'phonepe' && (
                      <div className="text-premium-orange">✓</div>
                    )}
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentMethod('cash')}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                    paymentMethod === 'cash'
                      ? 'border-premium-orange bg-premium-orange/10'
                      : 'border-charcoal hover:border-premium-orange/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">💵</div>
                    <div className="flex-1 text-left">
                      <div className="text-white font-bold">Cash on Pickup</div>
                      <div className="text-sm text-gray-400">Pay when you collect</div>
                    </div>
                    {paymentMethod === 'cash' && (
                      <div className="text-premium-orange">✓</div>
                    )}
                  </div>
                </motion.button>
              </div>

              {/* PhonePe Details */}
              {paymentMethod === 'phonepe' && (
                <div className="mt-4 p-4 bg-charcoal rounded-xl">
                  <div className="text-sm text-gray-400 mb-2">Payment Gateway Details:</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Merchant ID:</span>
                      <span className="text-white font-mono">{paymentConfig.merchantId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Key Index:</span>
                      <span className="text-white font-mono">{paymentConfig.keyIndex}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-deep-space border border-charcoal rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Delivery</span>
                  <span className="text-vegetarian-green">FREE</span>
                </div>
                <div className="border-t border-charcoal pt-3 flex justify-between text-white font-bold text-xl">
                  <span>Total</span>
                  <span className="text-premium-orange">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={processing}
                className="w-full bg-premium-orange text-pitch-black py-4 rounded-lg font-bold hover:bg-golden-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                {processing ? 'Processing...' : `Place Order • ₹${total.toFixed(2)}`}
              </button>

              {/* Security Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-vegetarian-green">🔒</span>
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-vegetarian-green">⚡</span>
                  <span>Instant order confirmation</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-vegetarian-green">🔔</span>
                  <span>Real-time status updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
