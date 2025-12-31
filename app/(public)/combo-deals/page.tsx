'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComboHero } from '@/components/combos/ComboHero';
import { ComboCard } from '@/components/combos/ComboCard';
import { Button } from '@/components/ui/Button';
import { combos, comboCategories } from '@/data/combos';

export default function ComboDealsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCombos = selectedCategory === 'all'
    ? combos.filter(c => c.isActive)
    : combos.filter(c => c.isActive && c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-pitch-black">
      {/* Hero Section */}
      <ComboHero />

      {/* Category Tabs */}
      <section className="py-8 border-b border-charcoal">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-premium-orange text-pitch-black shadow-[0_10px_25px_rgba(255,194,65,0.3)]'
                  : 'bg-transparent text-foreground/70 border-2 border-premium-orange/30 hover:border-premium-orange hover:-translate-y-0.5'
              }`}
            >
              All Combos
            </button>
            {comboCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-premium-orange text-pitch-black shadow-[0_10px_25px_rgba(255,194,65,0.3)]'
                    : 'bg-transparent text-foreground/70 border-2 border-premium-orange/30 hover:border-premium-orange hover:-translate-y-0.5'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Combos Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredCombos.map((combo, index) => (
                <ComboCard key={combo.id} combo={combo} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredCombos.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-6xl mb-4">🎁</p>
              <h3 className="text-2xl font-bold text-golden-glow mb-2">No combos found</h3>
              <p className="text-foreground/70 mb-6">Try selecting a different category</p>
              <Button variant="primary" onClick={() => setSelectedCategory('all')}>
                View All Combos
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Custom Combo CTA Section */}
      <section className="py-16 border-t border-charcoal">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-deep-space border-2 border-premium-orange/30 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto hover:border-premium-orange hover:shadow-[0_0_30px_rgba(255,194,65,0.2)] transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-golden-glow mb-4">
              Don't See Your Perfect Combo?
            </h3>
            <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
              We'll create a custom combo just for your occasion! Tell us your preferences and we'll magic it up.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="primary" size="lg">
                  📞 Call: +91 9955955191
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg">
                  💬 WhatsApp for Custom Order
                </Button>
              </motion.div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {['Wedding Events', 'Birthday Parties', 'Office Meetings', 'Family Gatherings'].map(
                (option, index) => (
                  <motion.span
                    key={index}
                    className="text-sm text-foreground/70 flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-vegetarian-green">✓</span>
                    {option}
                  </motion.span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
