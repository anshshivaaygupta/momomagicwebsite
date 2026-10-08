'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useMenu } from '@/lib/useMenu';

const categories = [
  {
    id: 'steamed',
    name: 'Steamed Perfection',
    highlight: 'Fresh & Healthy',
    icon: '🥟',
    color: 'vegetarian-green',
    items: [
      { name: 'Veg Momos', price: '₹25 (5pc) | ₹50 (10pc)' },
      { name: 'Paneer Momos', price: '₹35 (5pc) | ₹70 (10pc)' },
      { name: 'Soya Momos', price: '₹30 (5pc) | ₹60 (10pc)' },
      { name: 'Cheese Corn', price: '₹50 (5pc) | ₹100 (10pc)' },
    ],
    description: 'Soft, juicy, and perfectly steamed momos with fresh ingredients',
  },
  {
    id: 'fried',
    name: 'Crispy Fried Delights',
    highlight: 'Golden & Crunchy',
    icon: '🔥',
    color: 'warm-orange',
    items: [
      { name: 'Veg Fried', price: '₹30 (5pc) | ₹60 (10pc)' },
      { name: 'Paneer Fried', price: '₹46 (5pc) | ₹80 (10pc)' },
      { name: 'Soya Fried', price: '₹35 (5pc) | ₹70 (10pc)' },
      { name: 'Cheese Corn Fried', price: '₹55 (5pc) | ₹119 (10pc)' },
    ],
    description: 'Golden-fried momos with a perfect crispy exterior',
  },
  {
    id: 'kurkure',
    name: 'Magic Signatures',
    highlight: 'Sherghati Exclusive',
    icon: '✨',
    color: 'golden-glow',
    items: [
      { name: 'Kurkure Veg', price: '₹50 (5pc) | ₹100 (10pc)' },
      { name: 'Kurkure Paneer', price: '₹60 (5pc) | ₹120 (10pc)' },
      { name: 'Kurkure Cheese', price: '₹60 (5pc) | ₹120 (10pc)' },
    ],
    description: 'Our exclusive Kurkure momos - crispy, crunchy, and magical',
  },
  {
    id: 'pizza',
    name: 'Fusion Innovations',
    highlight: 'Innovative Fusion',
    icon: '🍕',
    color: 'premium-orange',
    items: [
      { name: 'Veg Pizza', price: '₹80 (5pc) | ₹160 (10pc)' },
      { name: 'Paneer Pizza', price: '₹100 (5pc) | ₹200 (10pc)' },
      { name: 'Soya Pizza', price: '₹90 (5pc) | ₹180 (10pc)' },
      { name: 'Cheese Corn Pizza', price: '₹120 (5pc) | ₹240 (10pc)' },
    ],
    description: 'Revolutionary Pizza Momos - a fusion like never before',
  },
];

export const MenuHighlights: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({});

  const liveItems=useMenu();
  const displayedCategories=categories.map(c=>({...c,items:liveItems.filter(i=>i.category===c.id).map(i=>({name:i.name,price:`₹${i.halfPrice} (5pc) | ₹${i.price} (10pc)`}))}));
  const filteredCategories = selectedFilter === 'all' 
    ? displayedCategories 
    : displayedCategories.filter(cat => cat.id === selectedFilter);

  return (
    <section id="menu" className="py-20 bg-pitch-black">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-premium-orange mb-4">
            Explore Our Menu
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            From traditional steamed to innovative fusion - discover flavors that define Momos Magic
          </p>
        </motion.div>

        {/* Category Filtering System */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {[
            { id: 'all', name: 'All Categories', icon: '🍽️' },
            { id: 'steamed', name: 'Steamed', icon: '🥟' },
            { id: 'fried', name: 'Fried', icon: '🔥' },
            { id: 'kurkure', name: 'Kurkure', icon: '✨' },
            { id: 'pizza', name: 'Pizza', icon: '🍕' },
          ].map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                selectedFilter === filter.id
                  ? 'bg-premium-orange text-pitch-black shadow-[0_10px_25px_rgba(255,194,65,0.3)]'
                  : 'bg-transparent text-foreground/70 border-2 border-premium-orange/30 hover:border-premium-orange hover:-translate-y-0.5'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{filter.icon}</span>
              {filter.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Grid with Enhanced Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="h-full bg-deep-space border-2 border-transparent rounded-xl p-6 flex flex-col cursor-pointer hover:border-premium-orange hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,194,65,0.2)] transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image Placeholder with Loading State */}
                  <motion.div
                    className="relative aspect-video mb-4 rounded-lg overflow-hidden border-2 border-golden-glow/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img src={`/images/stock/${category.id==='steamed'?'steamed':category.id==='pizza'?'fusion':'fried'}.jpg`} alt={`${category.name} — representative stock photograph`} className="w-full h-full object-cover" loading="lazy"/>
                  </motion.div>

                  {/* Category Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold text-golden-glow mb-2">
                      {category.name}
                    </h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold bg-${category.color}/20 text-${category.color}`}>
                      {category.highlight}
                    </span>
                  </div>

                  <p className="text-foreground/70 text-center mb-4 flex-grow">
                    {category.description}
                  </p>

                  {/* Items with Prices */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-premium-orange mb-2">
                      {category.items.length} Items Available:
                    </p>
                    <ul className="text-sm space-y-2">
                      {category.items.map((item, idx) => (
                        <motion.li
                          key={idx}
                          className="flex flex-col gap-1 p-2 rounded bg-pitch-black/50 hover:bg-pitch-black transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-golden-glow">•</span>
                            <span className="text-foreground/80 font-medium">{item.name}</span>
                          </div>
                          <span className="text-golden-glow font-bold text-xs ml-4">
                            {item.price}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Enhanced View Full Menu CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/menu">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="primary" 
                size="lg" 
                className="relative overflow-hidden group shadow-lg shadow-premium-orange/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>View Full Menu</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-golden-glow/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
            </motion.div>
          </Link>
          
          <motion.p
            className="text-foreground/60 text-sm mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Explore our complete menu with detailed descriptions and pricing
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

