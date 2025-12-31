'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const GalleryCTA: React.FC = () => {
  const handleSocialClick = (platform: string) => {
    const urls = {
      instagram: 'https://instagram.com/momomagicsherghati',
      facebook: 'https://facebook.com/momomagicsherghati',
      whatsapp: 'https://wa.me/919955955191?text=I want to share my Momos Magic moment!',
    };
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  return (
    <section className="py-16 bg-deep-space/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Heading */}
          <h3 className="text-4xl md:text-5xl font-bold text-premium-orange mb-4">
            Join Our Growing Family of 2000+ Happy Customers
          </h3>
          <p className="text-xl text-foreground/80 mb-12">
            Share your Momos Magic moments with us!
          </p>

          {/* Social Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              className="bg-deep-space border-2 border-charcoal rounded-xl p-6 hover:border-premium-orange hover:shadow-[0_0_20px_rgba(255,194,65,0.2)] transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="text-5xl mb-3">📸</div>
              <div className="text-4xl font-bold text-golden-glow mb-2">500+</div>
              <div className="text-foreground/70">Photos Shared</div>
            </motion.div>
            <motion.div
              className="bg-deep-space border-2 border-charcoal rounded-xl p-6 hover:border-premium-orange hover:shadow-[0_0_20px_rgba(255,194,65,0.2)] transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="text-5xl mb-3">⭐</div>
              <div className="text-4xl font-bold text-golden-glow mb-2">4.9/5</div>
              <div className="text-foreground/70">Average Rating</div>
            </motion.div>
            <motion.div
              className="bg-deep-space border-2 border-charcoal rounded-xl p-6 hover:border-premium-orange hover:shadow-[0_0_20px_rgba(255,194,65,0.2)] transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="text-5xl mb-3">😊</div>
              <div className="text-4xl font-bold text-golden-glow mb-2">2000+</div>
              <div className="text-foreground/70">Happy Customers</div>
            </motion.div>
          </div>

          {/* Hashtag */}
          <div className="mb-8 p-6 bg-pitch-black border-2 border-premium-orange/30 rounded-xl">
            <p className="text-lg text-foreground/80 mb-2">Tag us on social media with</p>
            <p className="text-3xl font-bold text-premium-orange">#MomosMagicSherghati</p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleSocialClick('instagram')}
              className="px-8 py-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white rounded-lg font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              📷 Instagram
            </button>
            <button
              onClick={() => handleSocialClick('facebook')}
              className="px-8 py-4 bg-[#1877F2] text-white rounded-lg font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              👍 Facebook
            </button>
            <button
              onClick={() => handleSocialClick('whatsapp')}
              className="px-8 py-4 bg-[#25D366] text-white rounded-lg font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              💬 WhatsApp
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
