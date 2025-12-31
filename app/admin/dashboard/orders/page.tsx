'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sampleOrders, orderStatusFlow, type Order } from '@/data/orderData';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [filter, setFilter] = useState<string>('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previousOrderCount = useRef(orders.length);

  useEffect(() => {
    audioRef.current = new Audio('/sounds/notification.mp3');
    audioRef.current.volume = 0.5;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (orders.length > previousOrderCount.current && soundEnabled) {
      playNotificationSound();
    }
    previousOrderCount.current = orders.length;
  }, [orders.length, soundEnabled]);

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error('Failed to play notification sound:', error);
      });
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus as any,
              [`${newStatus}At`]: new Date().toISOString(),
            }
          : order
      )
    );
  };

  const filteredOrders =
    filter === 'all'
      ? orders
      : orders.filter((order) => order.status === filter);

  const orderCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    confirmed: orders.filter((o) => o.status === 'confirmed').length,
    preparing: orders.filter((o) => o.status === 'preparing').length,
    ready: orders.filter((o) => o.status === 'ready').length,
    completed: orders.filter((o) => o.status === 'completed').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
  };

  return (
    <div className="min-h-screen bg-pitch-black p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Order Management</h1>
            <p className="text-gray-400">Manage and track all orders in real-time</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                soundEnabled
                  ? 'bg-premium-orange text-pitch-black'
                  : 'bg-charcoal text-gray-400'
              }`}
            >
              {soundEnabled ? '🔔 Sound On' : '🔕 Sound Off'}
            </button>
            <div className="bg-deep-space border border-charcoal rounded-lg px-4 py-2">
              <div className="text-sm text-gray-400">Total Orders</div>
              <div className="text-2xl font-bold text-premium-orange">{orders.length}</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { id: 'all', label: 'All Orders', count: orderCounts.all },
            { id: 'pending', label: 'Pending', count: orderCounts.pending },
            { id: 'confirmed', label: 'Confirmed', count: orderCounts.confirmed },
            { id: 'preparing', label: 'Preparing', count: orderCounts.preparing },
            { id: 'ready', label: 'Ready', count: orderCounts.ready },
            { id: 'completed', label: 'Completed', count: orderCounts.completed },
            { id: 'cancelled', label: 'Cancelled', count: orderCounts.cancelled },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                filter === tab.id
                  ? 'bg-premium-orange text-pitch-black'
                  : 'bg-deep-space text-gray-400 border border-charcoal hover:border-premium-orange'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  filter === tab.id ? 'bg-pitch-black text-premium-orange' : 'bg-charcoal'
                }`}
              >
                {tab.count}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredOrders.map((order) => {
              const statusInfo = orderStatusFlow[order.status];
              const nextStatus = statusInfo.next;

              return (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-deep-space border border-charcoal rounded-2xl p-6 hover:border-premium-orange transition-all duration-300"
                >
                  {/* Order Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">#{order.id}</h3>
                      <p className="text-sm text-gray-400">
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <div
                      className="px-3 py-1 rounded-lg text-xs font-bold"
                      style={{
                        backgroundColor: `${statusInfo.color}20`,
                        color: statusInfo.color,
                      }}
                    >
                      {statusInfo.label}
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="bg-charcoal rounded-lg p-3 mb-4">
                    <div className="text-sm text-gray-400 mb-1">Customer</div>
                    <div className="text-white font-semibold">User #{order.userId}</div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-2">Items ({order.items.length})</div>
                    <div className="space-y-2">
                      {order.items.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <span className="text-xl">🥟</span>
                          <span className="text-white flex-1">
                            {item.menuItem.name} ({item.quantity}pc)
                          </span>
                          <span className="text-premium-orange font-bold">₹{item.subtotal}</span>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="text-sm text-gray-500">+{order.items.length - 3} more</div>
                      )}
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-charcoal">
                    <span className="text-gray-400">Total</span>
                    <span className="text-xl font-bold text-premium-orange">
                      ₹{order.total.toFixed(2)}
                    </span>
                  </div>

                  {/* Payment Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400 text-sm">Payment</span>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        order.paymentStatus === 'paid'
                          ? 'bg-vegetarian-green/20 text-vegetarian-green'
                          : 'bg-warm-orange/20 text-warm-orange'
                      }`}
                    >
                      {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  {nextStatus && order.status !== 'cancelled' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, nextStatus)}
                      className="w-full bg-premium-orange text-pitch-black py-3 rounded-lg font-bold hover:bg-golden-glow transition-all duration-300"
                    >
                      Mark as {orderStatusFlow[nextStatus as keyof typeof orderStatusFlow].label}
                    </button>
                  )}

                  {/* Estimated Time */}
                  {order.status !== 'completed' && order.status !== 'cancelled' && (
                    <div className="mt-3 text-center text-sm text-gray-400">
                      Est. Time: {order.estimatedTime} min
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">📦</div>
            <h3 className="text-2xl font-bold text-white mb-2">No orders found</h3>
            <p className="text-gray-400">
              {filter === 'all'
                ? 'No orders yet. New orders will appear here.'
                : `No ${filter} orders at the moment.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
