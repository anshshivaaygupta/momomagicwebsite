'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appScreenshots } from '@/data/appData';

export function AppScreenshots() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<typeof appScreenshots[0] | null>(null);

  const categories = [
    { id: 'all', label: 'All Screens', icon: '📱' },
    { id: 'menu', label: 'Menu', icon: '🍕' },
    { id: 'cart', label: 'Cart & Checkout', icon: '🛒' },
    { id: 'tracking', label: 'Order Tracking', icon: '🚗' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  const filteredScreenshots =
    selectedCategory === 'all'
      ? appScreenshots
      : appScreenshots.filter((screenshot) => screenshot.category === selectedCategory);

  return (
    <section className="py-20 bg-pitch-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-premium-orange to-golden-glow bg-clip-text text-transparent">
              App Screenshots
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore the intuitive interface designed for the fastest ordering experience
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
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

        {/* Screenshots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredScreenshots.map((screenshot, index) => (
              <motion.div
                key={screenshot.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => setLightboxImage(screenshot)}
                className="bg-deep-space border border-charcoal rounded-2xl overflow-hidden cursor-pointer hover:border-premium-orange transition-all duration-300 hover:shadow-lg hover:shadow-premium-orange/20"
              >
                {/* Screenshot Image Placeholder */}
                <div className="aspect-[9/19] bg-gradient-to-b from-charcoal to-pitch-black flex items-center justify-center">
                  <div className="text-8xl">📱</div>
                </div>

                {/* Screenshot Info */}
                <div className="p-6">
                  <h4 className="text-lg font-bold text-white mb-2">{screenshot.title}</h4>
                  <p className="text-sm text-gray-400">{screenshot.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              className="fixed inset-0 bg-pitch-black/95 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-2xl w-full bg-deep-space border-2 border-premium-orange rounded-2xl overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-[9/19] bg-gradient-to-b from-charcoal to-pitch-black flex items-center justify-center">
                  <div className="text-9xl">📱</div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{lightboxImage.title}</h3>
                  <p className="text-gray-400 mb-4">{lightboxImage.description}</p>
                  <button
                    onClick={() => setLightboxImage(null)}
                    className="bg-premium-orange text-pitch-black px-6 py-2 rounded-lg font-bold hover:bg-golden-glow transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
