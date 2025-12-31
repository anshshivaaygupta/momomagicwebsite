'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { type CartItem, calculateOrderTotal } from '@/data/orderData';

export default function OrderCartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCart = sessionStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  const updateQuantity = (index: number, newQuantity: number) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];
    item.quantity = newQuantity;
    item.subtotal = newQuantity === 5 ? item.menuItem.price5pc : item.menuItem.price10pc;
    setCart(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateSpiceLevel = (index: number, spiceLevel: 'mild' | 'medium' | 'hot') => {
    const updatedCart = [...cart];
    updatedCart[index].spiceLevel = spiceLevel;
    setCart(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const goToCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    router.push('/order/checkout');
  };

  const { subtotal, tax, total } = calculateOrderTotal(cart);

  if (loading) {
    return (
      <div className="min-h-screen bg-pitch-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-golden-glow">Loading cart...</p>
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
              <h1 className="text-2xl font-bold text-white">Your Cart</h1>
              <p className="text-sm text-gray-400">{cart.length} items</p>
            </div>
            <button
              onClick={() => router.push('/order/menu')}
              className="border border-charcoal text-gray-400 px-6 py-2 rounded-lg font-semibold hover:border-premium-orange hover:text-premium-orange transition-all duration-300"
            >
              ← Back to Menu
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {cart.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Add some delicious momos to get started!</p>
            <button
              onClick={() => router.push('/order/menu')}
              className="bg-premium-orange text-pitch-black px-8 py-3 rounded-lg font-bold hover:bg-golden-glow transition-all duration-300"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-deep-space border border-charcoal rounded-2xl p-6 hover:border-premium-orange/50 transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="w-24 h-24 bg-gradient-to-br from-charcoal to-pitch-black rounded-xl flex items-center justify-center flex-shrink-0">
                        <div className="text-4xl">🥟</div>
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-white">
                              {item.menuItem.name}
                            </h3>
                            <p className="text-sm text-gray-400">{item.quantity} pieces</p>
                          </div>
                          <button
                            onClick={() => removeItem(index)}
                            className="text-warm-orange hover:text-red-500 transition-colors"
                          >
                            ✕
                          </button>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex gap-2 mb-3">
                          <button
                            onClick={() => updateQuantity(index, 5)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                              item.quantity === 5
                                ? 'bg-premium-orange text-pitch-black'
                                : 'bg-charcoal text-gray-400 hover:text-white'
                            }`}
                          >
                            5pc
                          </button>
                          <button
                            onClick={() => updateQuantity(index, 10)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                              item.quantity === 10
                                ? 'bg-premium-orange text-pitch-black'
                                : 'bg-charcoal text-gray-400 hover:text-white'
                            }`}
                          >
                            10pc
                          </button>
                        </div>

                        {/* Spice Level */}
                        <div className="flex gap-2 mb-3">
                          <span className="text-sm text-gray-400">Spice:</span>
                          {['mild', 'medium', 'hot'].map((level) => (
                            <button
                              key={level}
                              onClick={() =>
                                updateSpiceLevel(index, level as 'mild' | 'medium' | 'hot')
                              }
                              className={`px-3 py-1 rounded text-xs font-semibold transition-all duration-300 ${
                                item.spiceLevel === level
                                  ? 'bg-premium-orange text-pitch-black'
                                  : 'bg-charcoal text-gray-400 hover:text-white'
                              }`}
                            >
                              {level === 'mild' && '🌶️'}
                              {level === 'medium' && '🌶️🌶️'}
                              {level === 'hot' && '🌶️🌶️🌶️'}
                            </button>
                          ))}
                        </div>

                        {/* Price */}
                        <div className="text-xl font-bold text-premium-orange">
                          ₹{item.subtotal}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
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
                  <div className="border-t border-charcoal pt-3 flex justify-between text-white font-bold text-xl">
                    <span>Total</span>
                    <span className="text-premium-orange">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={goToCheckout}
                  className="w-full bg-premium-orange text-pitch-black py-3 rounded-lg font-bold hover:bg-golden-glow transition-all duration-300 mb-4"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => router.push('/order/menu')}
                  className="w-full border border-charcoal text-gray-400 py-3 rounded-lg font-semibold hover:border-premium-orange hover:text-premium-orange transition-all duration-300"
                >
                  Add More Items
                </button>

                {/* Benefits */}
                <div className="mt-6 pt-6 border-t border-charcoal">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="text-vegetarian-green">✓</span>
                      <span>Secure PhonePe payment</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="text-vegetarian-green">✓</span>
                      <span>Real-time order tracking</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="text-vegetarian-green">✓</span>
                      <span>5-min cancellation window</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
