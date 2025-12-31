'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GalleryItem as GalleryItemType } from '@/data/gallery';

interface GalleryItemProps {
  item: GalleryItemType;
  index: number;
  onView: (item: GalleryItemType) => void;
  onShare: (item: GalleryItemType) => void;
}

export const GalleryItem: React.FC<GalleryItemProps> = ({ item, index, onView, onShare }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'food':
        return 'bg-premium-orange';
      case 'stall':
        return 'bg-golden-glow';
      case 'customers':
        return 'bg-vegetarian-green';
      case 'awards':
        return 'bg-warm-orange';
      case 'events':
        return 'bg-burnt-orange';
      default:
        return 'bg-premium-orange';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'food':
        return '🍕';
      case 'stall':
        return '🏪';
      case 'customers':
        return '📸';
      case 'awards':
        return '🏆';
      case 'events':
        return '🎉';
      default:
        return '🌠';
    }
  };

  return (
    <motion.div
      className="group relative bg-deep-space rounded-xl overflow-hidden border-2 border-charcoal hover:border-premium-orange hover:shadow-[0_10px_25px_rgba(255,194,65,0.2)] transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      onClick={() => onView(item)}
      style={{ breakInside: 'avoid', marginBottom: '16px' }}
    >
      {/* Image/Video Container */}
      <div className="relative overflow-hidden">
        {item.mediaType === 'image' ? (
          <div className="relative w-full aspect-[4/3] bg-charcoal">
            {/* Placeholder for image */}
            <div className="absolute inset-0 flex items-center justify-center text-6xl">
              {getCategoryIcon(item.category)}
            </div>
            {/* Featured Badge */}
            {item.isFeatured && (
              <div className="absolute top-3 right-3 z-10">
                <span className="px-3 py-1 bg-golden-glow text-pitch-black text-xs font-bold rounded-full shadow-lg">
                  ⭐ Featured
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="relative w-full aspect-video bg-charcoal">
            {/* Video Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">🎥</div>
                <div className="text-sm text-foreground/60">Video Content</div>
              </div>
            </div>
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-premium-orange rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-pitch-black">▶️</span>
              </div>
            </div>
            {/* Featured Badge */}
            {item.isFeatured && (
              <div className="absolute top-3 right-3 z-10">
                <span className="px-3 py-1 bg-golden-glow text-pitch-black text-xs font-bold rounded-full shadow-lg">
                  ⭐ Featured
                </span>
              </div>
            )}
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-pitch-black via-pitch-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView(item);
            }}
            className="px-6 py-3 bg-premium-orange text-pitch-black rounded-lg font-bold hover:bg-golden-glow transition-colors duration-300 shadow-lg"
          >
            {item.mediaType === 'video' ? '🎥 Play' : '👁️ View'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare(item);
            }}
            className="px-6 py-3 bg-transparent border-2 border-premium-orange text-premium-orange rounded-lg font-bold hover:bg-premium-orange hover:text-pitch-black transition-all duration-300 shadow-lg"
          >
            📤 Share
          </button>
        </div>
      </div>

      {/* Item Info */}
      <div className="p-4">
        <h4 className="text-lg font-bold text-premium-orange mb-2 line-clamp-2">{item.title}</h4>
        <p className="text-sm text-foreground/70 mb-3 line-clamp-2">{item.description}</p>

        {/* Item Meta */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`px-2 py-1 ${getCategoryColor(
              item.category
            )} text-pitch-black text-xs font-bold rounded`}
          >
            {getCategoryIcon(item.category)} {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </span>
          {item.tags.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-charcoal text-foreground/60 text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
