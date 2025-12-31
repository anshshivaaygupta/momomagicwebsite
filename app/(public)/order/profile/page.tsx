'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { sampleOrders } from '@/data/orderData';

export default function OrderProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>(sampleOrders);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
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

  const handleLogout = async () => {
    try {
      await fetch('/api/order/auth', { method: 'DELETE' });
      router.push('/order/login');
    } catch (error) {
      alert('Logout failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pitch-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">👤</div>
          <p className="text-golden-glow">Loading profile...</p>
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
              <h1 className="text-2xl font-bold text-white">My Profile</h1>
              <p className="text-sm text-gray-400">Manage your account and orders</p>
            </div>
            <button
              onClick={() => router.push('/order/menu')}
              className="bg-premium-orange text-pitch-black px-6 py-2 rounded-lg font-bold hover:bg-golden-glow transition-all duration-300"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Card */}
            <div className="bg-deep-space border border-charcoal rounded-2xl p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-premium-orange to-golden-glow rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-4xl">👤</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{user?.name}</h3>
                <p className="text-sm text-gray-400">{user?.phone}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="bg-charcoal rounded-lg p-3">
                  <div className="text-sm text-gray-400">Total Orders</div>
                  <div className="text-2xl font-bold text-white">{orders.length}</div>
                </div>
                <div className="bg-charcoal rounded-lg p-3">
                  <div className="text-sm text-gray-400">Loyalty Points</div>
                  <div className="text-2xl font-bold text-premium-orange">{user?.loyaltyPoints || 0}</div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full border border-charcoal text-gray-400 py-3 rounded-lg font-semibold hover:border-warm-orange hover:text-warm-orange transition-all duration-300"
              >
                Logout
              </button>
            </div>

            {/* Loyalty Program */}
            <div className="bg-deep-space border border-charcoal rounded-2xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">Loyalty Program</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-premium-orange">⭐</span>
                  <span>Earn 1 point per ₹10 spent</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-premium-orange">🎁</span>
                  <span>100 points = ₹100 discount</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-premium-orange">⏰</span>
                  <span>Points valid for 1 year</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="lg:col-span-2">
            <div className="bg-deep-space border border-charcoal rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Order History</h3>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📦</div>
                  <h4 className="text-xl font-bold text-white mb-2">No orders yet</h4>
                  <p className="text-gray-400 mb-6">Start ordering to see your history here</p>
                  <button
                    onClick={() => router.push('/order/menu')}
                    className="bg-premium-orange text-pitch-black px-6 py-3 rounded-lg font-bold hover:bg-golden-glow transition-all duration-300"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <motion.div
                      key={order.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-charcoal border border-charcoal rounded-xl p-4 hover:border-premium-orange transition-all duration-300 cursor-pointer"
                      onClick={() => router.push(`/order/confirmation?orderId=${order.id}`)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-white font-bold">Order #{order.id}</h4>
                          <p className="text-sm text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString()} at{' '}
                            {new Date(order.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                        <div
                          className="px-3 py-1 rounded-lg text-xs font-bold"
                          style={{
                            backgroundColor:
                              order.status === 'completed'
                                ? '#05966920'
                                : order.status === 'cancelled'
                                ? '#ef444420'
                                : '#ffc24120',
                            color:
                              order.status === 'completed'
                                ? '#059669'
                                : order.status === 'cancelled'
                                ? '#ef4444'
                                : '#ffc241',
                          }}
                        >
                          {order.status.toUpperCase()}
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        {order.items.slice(0, 2).map((item: any, index: number) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <span className="text-xl">🥟</span>
                            <span className="text-gray-400">
                              {item.menuItem.name} ({item.quantity}pc)
                            </span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <div className="text-sm text-gray-500">
                            +{order.items.length - 2} more items
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-pitch-black">
                        <div className="text-sm text-gray-400">
                          {order.paymentMethod === 'phonepe' ? '💳 PhonePe' : '💵 Cash'}
                        </div>
                        <div className="text-lg font-bold text-premium-orange">
                          ₹{order.total.toFixed(2)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
