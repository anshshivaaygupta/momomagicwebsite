'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryItem } from '@/data/gallery';

interface SocialShareProps {
  item: GalleryItem;
  isOpen: boolean;
  onClose: () => void;
}

export const SocialShare: React.FC<SocialShareProps> = ({ item, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = `https://momomagic.com/gallery/${item.id}`;
  const shareText = item.socialSharing.shareText;

  const handleShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);

    let url = '';
    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'instagram':
        alert('Please share this on Instagram by saving the image and posting it with the hashtag #MomosMagicSherghati');
        return;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-pitch-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-md bg-deep-space border-2 border-premium-orange rounded-xl p-6 shadow-[0_0_30px_rgba(255,194,65,0.3)]"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-premium-orange">Share This Moment</h3>
              <button
                onClick={onClose}
                className="text-foreground/60 hover:text-premium-orange transition-colors"
              >
                ❌
              </button>
            </div>

            {/* Share Text */}
            <div className="mb-6 p-4 bg-pitch-black rounded-lg border border-charcoal">
              <p className="text-sm text-foreground/80">{shareText}</p>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                <span className="text-xl">💬</span>
                WhatsApp
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1877F2] text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                <span className="text-xl">👍</span>
                Facebook
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1DA1F2] text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                <span className="text-xl">🐦</span>
                Twitter
              </button>
              <button
                onClick={() => handleShare('instagram')}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                <span className="text-xl">📷</span>
                Instagram
              </button>
            </div>

            {/* Copy Link */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground/80 text-sm"
              />
              <button
                onClick={handleCopyLink}
                className="px-6 py-3 bg-premium-orange text-pitch-black rounded-lg font-bold hover:bg-golden-glow transition-colors duration-300"
              >
                {copied ? '✅ Copied!' : '📋 Copy'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
