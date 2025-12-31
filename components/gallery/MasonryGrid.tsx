'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryItem as GalleryItemType } from '@/data/gallery';
import { GalleryItem } from './GalleryItem';

interface MasonryGridProps {
  items: GalleryItemType[];
  onView: (item: GalleryItemType) => void;
  onShare: (item: GalleryItemType) => void;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({ items, onView, onShare }) => {
  return (
    <section className="py-16" id="gallery-grid">
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={items.length}
            className="masonry-grid"
            style={{
              columnCount: 'auto',
              columnGap: '16px',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {items.map((item, index) => (
              <GalleryItem
                key={item.id}
                item={item}
                index={index}
                onView={onView}
                onShare={onShare}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {items.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-6xl mb-4">🖼️</p>
            <h3 className="text-2xl font-bold text-golden-glow mb-2">No items found</h3>
            <p className="text-foreground/70">Try selecting a different category</p>
          </motion.div>
        )}

        {/* CSS for Masonry Grid */}
        <style jsx>{`
          .masonry-grid {
            column-count: 4;
            column-gap: 16px;
          }

          @media (max-width: 1200px) {
            .masonry-grid {
              column-count: 3;
            }
          }

          @media (max-width: 768px) {
            .masonry-grid {
              column-count: 2;
            }
          }

          @media (max-width: 480px) {
            .masonry-grid {
              column-count: 1;
            }
          }
        `}</style>
      </div>
    </section>
  );
};
