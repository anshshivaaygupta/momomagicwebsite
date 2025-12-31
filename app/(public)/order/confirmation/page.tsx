'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { canCancelOrder, orderStatusFlow } from '@/data/orderData';

function OrderConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const status = searchParams.get('status');

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (!orderId) {
      router.push('/order/menu');
      return;
    }

    loadOrder();
    const interval = setInterval(loadOrder, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [orderId]);

  useEffect(() => {
    if (order) {
      updateTimeRemaining();
      const interval = setInterval(updateTimeRemaining, 1000);
      return () => clearInterval(interval);
    }
  }, [order]);

  const loadOrder = () => {
    const savedOrder = sessionStorage.getItem('currentOrder');
    if (savedOrder) {
      const orderData = JSON.parse(savedOrder);
      if (orderData.id === orderId) {
        setOrder(orderData);
      }
    }
    setLoading(false);
  };

  const updateTimeRemaining = () => {
    if (!order) return;

    const createdTime = new Date(order.createdAt).getTime();
    const currentTime = new Date().getTime();
    const minutesElapsed = (currentTime - createdTime) / (1000 * 60);
    const remaining = Math.max(0, 5 - minutesElapsed);
    setTimeRemaining(remaining);
  };

  const handleCancelOrder = async () => {
    if (!canCancelOrder(order)) {
      alert('Cancellation window has expired');
      return;
    }

    if (!confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    setCancelling(true);

    try {
      const updatedOrder = {
        ...order,
        status: 'cancelled',
        cancelledAt: new Date().toISOString(),
        cancellationReason: 'Customer requested',
      };

      sessionStorage.setItem('currentOrder', JSON.stringify(updatedOrder));
      setOrder(updatedOrder);
      alert('Order cancelled successfully. Refund will be processed within 24 hours.');
    } catch (error) {
      alert('Failed to cancel order. Please contact support.');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pitch-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-golden-glow">Loading order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-pitch-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-white mb-4">Order not found</h2>
          <button
            onClick={() => router.push('/order/menu')}
            className="bg-premium-orange text-pitch-black px-6 py-3 rounded-lg font-bold hover:bg-golden-glow transition-all duration-300"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const currentStatusInfo = orderStatusFlow[order.status as keyof typeof orderStatusFlow];

  return (
    <div className="min-h-screen bg-pitch-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          {status === 'success' && order.status !== 'cancelled' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="text-8xl mb-4">✅</div>
              <h1 className="text-4xl font-bold text-white mb-2">Order Confirmed!</h1>
              <p className="text-gray-400">Your order has been placed successfully</p>
            </motion.div>
          )}

          {/* Cancelled Header */}
          {order.status === 'cancelled' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="text-8xl mb-4">❌</div>
              <h1 className="text-4xl font-bold text-white mb-2">Order Cancelled</h1>
              <p className="text-gray-400">Your order has been cancelled</p>
            </motion.div>
          )}

          {/* Order Details */}
          <div className="bg-deep-space border border-charcoal rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Order #{order.id}</h3>
                <p className="text-sm text-gray-400">
                  Placed on {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div
                className="px-4 py-2 rounded-lg font-bold"
                style={{ backgroundColor: `${currentStatusInfo.color}20`, color: currentStatusInfo.color }}
              >
                {currentStatusInfo.label}
              </div>
            </div>

            {/* Order Status Timeline */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                {['pending', 'confirmed', 'preparing', 'ready', 'completed'].map((statusKey, index) => {
                  const statusInfo = orderStatusFlow[statusKey as keyof typeof orderStatusFlow];
                  const isActive = order.status === statusKey;
                  const isPast = ['pending', 'confirmed', 'preparing', 'ready', 'completed'].indexOf(order.status) > index;
                  const isCancelled = order.status === 'cancelled';

                  return (
                    <div key={statusKey} className="flex-1 relative">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                            isActive
                              ? 'bg-premium-orange text-pitch-black scale-110'
                              : isPast
                              ? 'bg-vegetarian-green text-white'
                              : isCancelled
                              ? 'bg-gray-700 text-gray-500'
                              : 'bg-charcoal text-gray-500'
                          }`}
                        >
                          {isPast ? '✓' : index + 1}
                        </div>
                        <div className={`text-xs mt-2 text-center ${isActive ? 'text-premium-orange font-bold' : 'text-gray-400'}`}>
                          {statusInfo.label}
                        </div>
                      </div>
                      {index < 4 && (
                        <div
                          className={`absolute top-5 left-1/2 w-full h-0.5 -z-10 transition-all duration-300 ${
                            isPast ? 'bg-vegetarian-green' : 'bg-charcoal'
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Estimated Time */}
            {order.status !== 'cancelled' && order.status !== 'completed' && (
              <div className="bg-charcoal rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">Estimated Time</div>
                    <div className="text-sm text-gray-400">Your order will be ready in</div>
                  </div>
                  <div className="text-3xl font-bold text-premium-orange">{order.estimatedTime} min</div>
                </div>
              </div>
            )}

            {/* Cancellation Window */}
            {canCancelOrder(order) && order.status !== 'cancelled' && (
              <div className="bg-warm-orange/10 border border-warm-orange rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">Cancellation Window</div>
                    <div className="text-sm text-gray-400">
                      You can cancel within {Math.floor(timeRemaining)} min {Math.floor((timeRemaining % 1) * 60)} sec
                    </div>
                  </div>
                  <button
                    onClick={handleCancelOrder}
                    disabled={cancelling}
                    className="bg-warm-orange text-white px-6 py-2 rounded-lg font-bold hover:bg-red-600 transition-all duration-300 disabled:opacity-50"
                  >
                    {cancelling ? 'Cancelling...' : 'Cancel Order'}
                  </button>
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="border-t border-charcoal pt-6">
              <h4 className="text-white font-bold mb-4">Order Items</h4>
              <div className="space-y-3">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-charcoal to-pitch-black rounded-lg flex items-center justify-center">
                        <div className="text-xl">🥟</div>
                      </div>
                      <div>
                        <div className="text-white font-semibold">{item.menuItem.name}</div>
                        <div className="text-sm text-gray-400">
                          {item.quantity}pc • {item.spiceLevel}
                        </div>
                      </div>
                    </div>
                    <div className="text-premium-orange font-bold">₹{item.subtotal}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total */}
            <div className="border-t border-charcoal pt-6 mt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax</span>
                  <span>₹{order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-xl pt-2 border-t border-charcoal">
                  <span>Total</span>
                  <span className="text-premium-orange">₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="border-t border-charcoal pt-6 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold">Payment Method</div>
                  <div className="text-sm text-gray-400">
                    {order.paymentMethod === 'phonepe' ? 'PhonePe' : 'Cash on Pickup'}
                  </div>
                </div>
                <div
                  className={`px-4 py-2 rounded-lg font-bold ${
                    order.paymentStatus === 'paid'
                      ? 'bg-vegetarian-green/20 text-vegetarian-green'
                      : 'bg-warm-orange/20 text-warm-orange'
                  }`}
                >
                  {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/order/menu')}
              className="flex-1 bg-premium-orange text-pitch-black py-3 rounded-lg font-bold hover:bg-golden-glow transition-all duration-300"
            >
              Order Again
            </button>
            <button
              onClick={() => router.push('/order/profile')}
              className="flex-1 border border-charcoal text-gray-400 py-3 rounded-lg font-semibold hover:border-premium-orange hover:text-premium-orange transition-all duration-300"
            >
              View Order History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-pitch-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-golden-glow">Loading order...</p>
        </div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
