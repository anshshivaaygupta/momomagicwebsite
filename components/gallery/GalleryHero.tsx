'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const GalleryHero: React.FC = () => {
  const handleScrollToGallery = () => {
    const element = document.getElementById('gallery-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShareMoment = () => {
    window.open('https://wa.me/919955955191?text=I want to share my Momos Magic moment!', '_blank');
  };

  return (
    <section className="relative py-20 overflow-hidden bg-pitch-black">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Floating Decorative Elements */}
          <motion.div
            className="absolute top-10 left-10 text-6xl"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            📸
          </motion.div>
          <motion.div
            className="absolute top-20 right-20 text-5xl"
            animate={{
              y: [0, -15, 0],
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          >
            🥟
          </motion.div>
          <motion.div
            className="absolute bottom-10 left-20 text-5xl"
            animate={{
              y: [0, -18, 0],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-10 text-6xl"
            animate={{
              y: [0, -22, 0],
              rotate: [0, -12, 0],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
          >
            🖼️
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-premium-orange via-golden-glow to-premium-orange bg-clip-text text-transparent">
              Experience the Momos Magic
            </span>
            <br />
            <span className="text-foreground">Visual Journey</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl md:text-2xl text-foreground/80 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From Kitchen Perfection to Customer Smiles - See Why We're Sherghati's Favorite
          </motion.p>

          {/* Gallery Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-deep-space border-2 border-charcoal rounded-xl p-6 hover:border-premium-orange hover:shadow-[0_0_20px_rgba(255,194,65,0.2)] transition-all duration-300">
              <motion.div
                className="text-5xl font-bold text-golden-glow mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                500+
              </motion.div>
              <div className="text-foreground/70">Momos Moments</div>
            </div>
            <div className="bg-deep-space border-2 border-charcoal rounded-xl p-6 hover:border-premium-orange hover:shadow-[0_0_20px_rgba(255,194,65,0.2)] transition-all duration-300">
              <motion.div
                className="text-5xl font-bold text-golden-glow mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                50+
              </motion.div>
              <div className="text-foreground/70">Events Catered</div>
            </div>
            <div className="bg-deep-space border-2 border-charcoal rounded-xl p-6 hover:border-premium-orange hover:shadow-[0_0_20px_rgba(255,194,65,0.2)] transition-all duration-300">
              <motion.div
                className="text-5xl font-bold text-golden-glow mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              >
                2000+
              </motion.div>
              <div className="text-foreground/70">Happy Customers</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              onClick={handleScrollToGallery}
              className="px-8 py-4 bg-premium-orange text-pitch-black rounded-lg font-bold text-lg hover:bg-golden-glow hover:shadow-[0_10px_30px_rgba(255,194,65,0.3)] transition-all duration-300 hover:-translate-y-1"
            >
              🖼️ Explore Our Gallery
            </button>
            <button
              onClick={handleShareMoment}
              className="px-8 py-4 bg-transparent border-2 border-premium-orange text-premium-orange rounded-lg font-bold text-lg hover:bg-premium-orange hover:text-pitch-black transition-all duration-300 hover:-translate-y-1"
            >
              📸 Share Your Momos Moment
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
