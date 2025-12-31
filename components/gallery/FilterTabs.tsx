'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GalleryCategory } from '@/data/gallery';

interface FilterTabsProps {
  categories: GalleryCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <section className="py-8 border-y border-charcoal sticky top-0 bg-pitch-black z-40">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`group relative px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-premium-orange text-pitch-black shadow-[0_10px_25px_rgba(255,194,65,0.3)] scale-105'
                  : 'bg-transparent text-foreground/70 border-2 border-premium-orange/30 hover:border-premium-orange hover:-translate-y-0.5'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: activeCategory === category.id ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{category.icon}</span>
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                    activeCategory === category.id
                      ? 'bg-pitch-black text-premium-orange'
                      : 'bg-premium-orange/20 text-premium-orange'
                  }`}
                >
                  {category.itemCount}
                </span>
              </div>

              {/* Hover Glow Effect */}
              {activeCategory !== category.id && (
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-premium-orange/10 to-golden-glow/10" />
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
