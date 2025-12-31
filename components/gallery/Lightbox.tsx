'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryItem } from '@/data/gallery';

interface LightboxProps {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalItems: number;
  onShare: (item: GalleryItem) => void;
  onDownload: (item: GalleryItem) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  item,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  currentIndex,
  totalItems,
  onShare,
  onDownload,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext]);

  if (!item) return null;

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-pitch-black/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-7xl max-h-[95vh] bg-deep-space border-2 border-premium-orange rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,194,65,0.3)]"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-charcoal bg-pitch-black">
              <button
                onClick={onPrevious}
                className="px-4 py-2 bg-premium-orange text-pitch-black rounded-lg font-bold hover:bg-golden-glow transition-colors duration-300"
                disabled={currentIndex === 0}
              >
                ⬅️ Previous
              </button>
              <div className="text-golden-glow font-bold">
                {currentIndex + 1} of {totalItems}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onNext}
                  className="px-4 py-2 bg-premium-orange text-pitch-black rounded-lg font-bold hover:bg-golden-glow transition-colors duration-300"
                  disabled={currentIndex === totalItems - 1}
                >
                  Next ➡️
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-warm-orange text-white rounded-lg font-bold hover:bg-burnt-orange transition-colors duration-300"
                >
                  ❌ Close
                </button>
              </div>
            </div>

            {/* Media Content */}
            <div className="relative flex items-center justify-center p-8 bg-pitch-black min-h-[60vh] max-h-[70vh] overflow-auto">
              {item.mediaType === 'image' ? (
                <div className="w-full h-full flex items-center justify-center">
                  {/* Image Placeholder */}
                  <div className="text-center">
                    <div className="text-9xl mb-4">{getCategoryIcon(item.category)}</div>
                    <div className="text-2xl font-bold text-premium-orange mb-2">{item.title}</div>
                    <div className="text-foreground/60">Image: {item.fileUrl}</div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {/* Video Placeholder */}
                  <div className="text-center">
                    <div className="text-9xl mb-4">🎥</div>
                    <div className="text-2xl font-bold text-premium-orange mb-2">{item.title}</div>
                    <div className="text-foreground/60">Video: {item.fileUrl}</div>
                    <button className="mt-4 px-8 py-4 bg-premium-orange text-pitch-black rounded-lg font-bold text-lg hover:bg-golden-glow transition-colors duration-300">
                      ▶️ Play Video
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-charcoal bg-deep-space">
              {/* Image Info */}
              <div className="mb-4">
                <h4 className="text-2xl font-bold text-premium-orange mb-2">{item.title}</h4>
                <p className="text-foreground/80 mb-3">{item.description}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-premium-orange text-pitch-black text-sm font-bold rounded">
                    {getCategoryIcon(item.category)} {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </span>
                  {item.isFeatured && (
                    <span className="px-3 py-1 bg-golden-glow text-pitch-black text-sm font-bold rounded">
                      ⭐ Featured
                    </span>
                  )}
                  {item.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-charcoal text-foreground/60 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onShare(item)}
                  className="px-6 py-3 bg-premium-orange text-pitch-black rounded-lg font-bold hover:bg-golden-glow transition-colors duration-300"
                >
                  📤 Share
                </button>
                {item.socialSharing.allowDownload && (
                  <button
                    onClick={() => onDownload(item)}
                    className="px-6 py-3 bg-transparent border-2 border-premium-orange text-premium-orange rounded-lg font-bold hover:bg-premium-orange hover:text-pitch-black transition-all duration-300"
                  >
                    🔽 Download
                  </button>
                )}
                <div className="ml-auto text-sm text-foreground/60">
                  <div>📅 {new Date(item.metadata.uploadDate).toLocaleDateString()}</div>
                  <div>📐 {item.metadata.dimensions}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
