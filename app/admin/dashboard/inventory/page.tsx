'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sampleMenuItems, type MenuItem } from '@/data/orderData';

export default function AdminInventoryPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(sampleMenuItems);
  const [filter, setFilter] = useState<string>('all');

  const updateStock = (itemId: string, newStock: number) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, stockLevel: Math.max(0, newStock), isAvailable: newStock > 0 }
          : item
      )
    );
  };

  const toggleAvailability = (itemId: string) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, isAvailable: !item.isAvailable, isManuallyMarkedOutOfStock: !item.isAvailable ? false : true }
          : item
      )
    );
  };

  const categories = [
    { id: 'all', label: 'All Items', icon: '🍽️' },
    { id: 'steamed', label: 'Steamed', icon: '🥟' },
    { id: 'fried', label: 'Fried', icon: '🍤' },
    { id: 'kurkure', label: 'Kurkure', icon: '✨' },
    { id: 'pizza', label: 'Pizza', icon: '🍕' },
  ];

  const filteredItems =
    filter === 'all'
      ? menuItems
      : menuItems.filter((item) => item.category === filter);

  const stockStats = {
    total: menuItems.length,
    inStock: menuItems.filter((item) => item.isAvailable && item.stockLevel > 0).length,
    lowStock: menuItems.filter((item) => item.stockLevel > 0 && item.stockLevel <= 20).length,
    outOfStock: menuItems.filter((item) => !item.isAvailable || item.stockLevel === 0).length,
  };

  return (
    <div className="min-h-screen bg-pitch-black p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Inventory Management</h1>
            <p className="text-gray-400">Manage stock levels and availability</p>
          </div>
        </div>

        {/* Stock Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-deep-space border border-charcoal rounded-2xl p-6">
            <div className="text-sm text-gray-400 mb-2">Total Items</div>
            <div className="text-3xl font-bold text-white">{stockStats.total}</div>
          </div>
          <div className="bg-deep-space border border-vegetarian-green rounded-2xl p-6">
            <div className="text-sm text-gray-400 mb-2">In Stock</div>
            <div className="text-3xl font-bold text-vegetarian-green">{stockStats.inStock}</div>
          </div>
          <div className="bg-deep-space border border-warm-orange rounded-2xl p-6">
            <div className="text-sm text-gray-400 mb-2">Low Stock</div>
            <div className="text-3xl font-bold text-warm-orange">{stockStats.lowStock}</div>
          </div>
          <div className="bg-deep-space border border-red-500 rounded-2xl p-6">
            <div className="text-sm text-gray-400 mb-2">Out of Stock</div>
            <div className="text-3xl font-bold text-red-500">{stockStats.outOfStock}</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                filter === category.id
                  ? 'bg-premium-orange text-pitch-black'
                  : 'bg-deep-space text-gray-400 border border-charcoal hover:border-premium-orange'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Inventory Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className="bg-deep-space border border-charcoal rounded-2xl p-6 hover:border-premium-orange transition-all duration-300"
            >
              {/* Item Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
                <div className="text-4xl ml-4">🥟</div>
              </div>

              {/* Stock Level */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Stock Level</span>
                  <span
                    className={`text-sm font-bold ${
                      item.stockLevel > 20
                        ? 'text-vegetarian-green'
                        : item.stockLevel > 0
                        ? 'text-warm-orange'
                        : 'text-red-500'
                    }`}
                  >
                    {item.stockLevel} units
                  </span>
                </div>
                <div className="bg-charcoal rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      item.stockLevel > 20
                        ? 'bg-vegetarian-green'
                        : item.stockLevel > 0
                        ? 'bg-warm-orange'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(100, (item.stockLevel / 100) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Stock Controls */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => updateStock(item.id, item.stockLevel - 10)}
                  className="flex-1 bg-charcoal text-white py-2 rounded-lg font-semibold hover:bg-warm-orange hover:text-pitch-black transition-all duration-300"
                >
                  -10
                </button>
                <button
                  onClick={() => updateStock(item.id, item.stockLevel - 1)}
                  className="flex-1 bg-charcoal text-white py-2 rounded-lg font-semibold hover:bg-warm-orange hover:text-pitch-black transition-all duration-300"
                >
                  -1
                </button>
                <button
                  onClick={() => updateStock(item.id, item.stockLevel + 1)}
                  className="flex-1 bg-charcoal text-white py-2 rounded-lg font-semibold hover:bg-vegetarian-green hover:text-pitch-black transition-all duration-300"
                >
                  +1
                </button>
                <button
                  onClick={() => updateStock(item.id, item.stockLevel + 10)}
                  className="flex-1 bg-charcoal text-white py-2 rounded-lg font-semibold hover:bg-vegetarian-green hover:text-pitch-black transition-all duration-300"
                >
                  +10
                </button>
              </div>

              {/* Pricing */}
              <div className="flex gap-4 mb-4 pb-4 border-b border-charcoal">
                <div className="flex-1">
                  <div className="text-premium-orange font-bold">₹{item.price5pc}</div>
                  <div className="text-xs text-gray-400">5 pieces</div>
                </div>
                <div className="flex-1">
                  <div className="text-premium-orange font-bold">₹{item.price10pc}</div>
                  <div className="text-xs text-gray-400">10 pieces</div>
                </div>
              </div>

              {/* Availability Toggle */}
              <button
                onClick={() => toggleAvailability(item.id)}
                className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                  item.isAvailable
                    ? 'bg-vegetarian-green text-white hover:bg-warm-orange'
                    : 'bg-red-500 text-white hover:bg-vegetarian-green'
                }`}
              >
                {item.isAvailable ? '✓ Available' : '✕ Unavailable'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
