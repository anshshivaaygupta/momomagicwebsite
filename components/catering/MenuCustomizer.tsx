'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems } from '@/data/catering';
import type { MenuItem } from '@/data/catering';

interface MenuCustomizerProps {
  selectedItems: string[];
  onItemsChange: (items: string[]) => void;
}

export const MenuCustomizer: React.FC<MenuCustomizerProps> = ({ selectedItems, onItemsChange }) => {
  const [activeCategory, setActiveCategory] = useState<'steamed' | 'fried' | 'kurkure' | 'pizza' | 'addons'>('steamed');

  const categories = [
    { id: 'steamed' as const, name: 'Steamed Momos', icon: '🥟' },
    { id: 'fried' as const, name: 'Fried Momos', icon: '🔥' },
    { id: 'kurkure' as const, name: 'Kurkure Momos', icon: '✨' },
    { id: 'pizza' as const, name: 'Pizza Momos', icon: '🍕' },
    { id: 'addons' as const, name: 'Add-ons', icon: '🎯' },
  ];

  const filteredItems = menuItems.filter((item) => item.category === activeCategory && item.isAvailable);

  const toggleItem = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      onItemsChange(selectedItems.filter((id) => id !== itemId));
    } else {
      onItemsChange([...selectedItems, itemId]);
    }
  };

  const totalCost = selectedItems.reduce((total, itemId) => {
    const item = menuItems.find((mi) => mi.id === itemId);
    return total + (item?.price || 0);
  }, 0);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-premium-orange mb-3">
              Build Your Perfect Menu
            </h3>
            <p className="text-lg text-foreground/70">
              Customize your catering package with our wide variety of momos and add-ons
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-premium-orange text-pitch-black shadow-[0_10px_25px_rgba(255,194,65,0.3)]'
                    : 'bg-transparent text-foreground/70 border-2 border-premium-orange/30 hover:border-premium-orange hover:-translate-y-0.5'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`bg-deep-space border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    selectedItems.includes(item.id)
                      ? 'border-premium-orange shadow-[0_0_15px_rgba(255,194,65,0.3)]'
                      : 'border-charcoal hover:border-premium-orange/50'
                  }`}
                  onClick={() => toggleItem(item.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground mb-1">{item.name}</h4>
                      <p className="text-xs text-foreground/60">{item.description}</p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                        selectedItems.includes(item.id)
                          ? 'bg-premium-orange border-premium-orange'
                          : 'border-charcoal'
                      }`}
                    >
                      {selectedItems.includes(item.id) && (
                        <motion.span
                          className="text-pitch-black text-sm"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                        >
                          ✓
                        </motion.span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-golden-glow font-bold">+₹{item.price}</span>
                    <span className="text-xs text-foreground/50">{item.quantity}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Selected Items Summary */}
          {selectedItems.length > 0 && (
            <motion.div
              className="bg-deep-space border-2 border-premium-orange rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold text-golden-glow">Selected Add-ons</h4>
                <button
                  onClick={() => onItemsChange([])}
                  className="text-sm text-warm-orange hover:text-warm-orange/80 transition-colors"
                >
                  Clear All
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {selectedItems.map((itemId) => {
                  const item = menuItems.find((mi) => mi.id === itemId);
                  if (!item) return null;
                  return (
                    <div
                      key={itemId}
                      className="flex items-center justify-between bg-pitch-black rounded-lg p-3"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{item.name}</p>
                        <p className="text-xs text-foreground/50">{item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-golden-glow">₹{item.price}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleItem(itemId);
                          }}
                          className="text-warm-orange hover:text-warm-orange/80 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-charcoal">
                <span className="text-lg font-semibold text-foreground">Total Add-ons Cost:</span>
                <span className="text-2xl font-bold text-premium-orange">₹{totalCost.toLocaleString()}</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
