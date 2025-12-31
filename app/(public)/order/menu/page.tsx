'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { sampleMenuItems, type MenuItem, type CartItem } from '@/data/orderData';

export default function OrderMenuPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(sampleMenuItems);

  useEffect(() => {
    checkAuth();
    const savedCart = sessionStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
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

  const categories = [
    { id: 'all', label: 'All Items', icon: '🍽️' },
    { id: 'steamed', label: 'Steamed', icon: '🥟' },
    { id: 'fried', label: 'Fried', icon: '🍤' },
    { id: 'kurkure', label: 'Kurkure', icon: '✨' },
    { id: 'pizza', label: 'Pizza', icon: '🍕' },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? menuItems.filter((item) => item.isAvailable && item.stockLevel > 0)
      : menuItems.filter(
          (item) =>
            item.category === selectedCategory && item.isAvailable && item.stockLevel > 0
        );

  const addToCart = (item: MenuItem, quantity: number) => {
    const cartItem: CartItem = {
      menuItem: item,
      quantity,
      spiceLevel: 'medium',
      subtotal: quantity === 5 ? item.price5pc : item.price10pc,
    };

    const updatedCart = [...cart, cartItem];
    setCart(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`Added ${item.name} (${quantity}pc) to cart!`);
  };

  const goToCart = () => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
    router.push('/order/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pitch-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🥟</div>
          <p className="text-golden-glow">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pitch-black">
      {/* Header */}
      <div className="bg-deep-space border-b border-charcoal sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Order Menu</h1>
              <p className="text-sm text-gray-400">Welcome, {user?.name}!</p>
            </div>
            <button
              onClick={goToCart}
              className="bg-premium-orange text-pitch-black px-6 py-2 rounded-lg font-bold hover:bg-golden-glow transition-all duration-300 flex items-center gap-2"
            >
              🛒 Cart ({cart.length})
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-premium-orange text-pitch-black'
                  : 'bg-deep-space text-gray-400 border border-charcoal hover:border-premium-orange'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-deep-space border border-charcoal rounded-2xl overflow-hidden hover:border-premium-orange transition-all duration-300 hover:shadow-lg hover:shadow-premium-orange/20"
              >
                {/* Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-charcoal to-pitch-black flex items-center justify-center">
                  <div className="text-6xl">🥟</div>
                </div>

                {/* Item Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                    {item.isVeg && (
                      <span className="bg-vegetarian-green text-white text-xs px-2 py-1 rounded">
                        VEG
                      </span>
                    )}
                  </div>

                  <p className="text-gray-400 text-sm mb-4">{item.description}</p>

                  {/* Stock Level */}
                  <div className="mb-4">
                    {item.stockLevel > 20 ? (
                      <span className="text-vegetarian-green text-sm">✓ In Stock</span>
                    ) : item.stockLevel > 0 ? (
                      <span className="text-warm-orange text-sm">
                        ⚠️ Only {item.stockLevel} left
                      </span>
                    ) : (
                      <span className="text-gray-500 text-sm">✗ Out of Stock</span>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <div className="text-premium-orange font-bold text-lg">₹{item.price5pc}</div>
                      <div className="text-gray-400 text-xs">5 pieces</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-premium-orange font-bold text-lg">
                        ₹{item.price10pc}
                      </div>
                      <div className="text-gray-400 text-xs">10 pieces</div>
                    </div>
                  </div>

                  {/* Add to Cart Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(item, 5)}
                      disabled={item.stockLevel === 0}
                      className="flex-1 bg-charcoal text-white py-2 rounded-lg font-semibold hover:bg-premium-orange hover:text-pitch-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add 5pc
                    </button>
                    <button
                      onClick={() => addToCart(item, 10)}
                      disabled={item.stockLevel === 0}
                      className="flex-1 bg-premium-orange text-pitch-black py-2 rounded-lg font-semibold hover:bg-golden-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add 10pc
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-bold text-white mb-2">No items available</h3>
            <p className="text-gray-400">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
}
