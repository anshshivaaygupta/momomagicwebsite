'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { appStats } from '@/data/appData';

export function AppHero() {
  const handleDownloadClick = () => {
    document.getElementById('download-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDemoClick = () => {
    document.getElementById('demo-video')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-pitch-black overflow-hidden flex items-center">
      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 text-6xl"
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
        📱
      </motion.div>
      <motion.div
        className="absolute top-40 right-20 text-5xl"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      >
        🥟
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-20 text-4xl"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      >
        🎁
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-40 text-5xl"
        animate={{
          y: [0, 15, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
      >
        ⚡
      </motion.div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-premium-orange to-golden-glow bg-clip-text text-transparent">
                Momos Magic
              </span>
              <br />
              <span className="text-white">in Your Pocket</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Order Faster, Earn Rewards, Get Exclusive Offers - Everything at Your Fingertips
            </p>

            {/* App Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-deep-space border border-charcoal rounded-xl p-4 text-center"
              >
                <div className="text-3xl font-bold text-premium-orange mb-1">
                  {appStats.downloads}
                </div>
                <div className="text-sm text-gray-400">Downloads</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-deep-space border border-charcoal rounded-xl p-4 text-center"
              >
                <div className="text-3xl font-bold text-golden-glow mb-1">
                  {appStats.rating}★
                </div>
                <div className="text-sm text-gray-400">Rating</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-deep-space border border-charcoal rounded-xl p-4 text-center"
              >
                <div className="text-3xl font-bold text-vegetarian-green mb-1">
                  {appStats.firstOrderDiscount}
                </div>
                <div className="text-sm text-gray-400">First Order</div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadClick}
                className="bg-premium-orange text-pitch-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-golden-glow transition-all duration-300 shadow-lg hover:shadow-premium-orange/50"
              >
                📥 Download Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDemoClick}
                className="border-2 border-premium-orange text-premium-orange px-8 py-4 rounded-lg font-bold text-lg hover:bg-premium-orange hover:text-pitch-black transition-all duration-300"
              >
                🎬 Watch Demo
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-vegetarian-green">✓</span>
                <span className="text-sm">FSSAI Certified</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-vegetarian-green">✓</span>
                <span className="text-sm">Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-vegetarian-green">✓</span>
                <span className="text-sm">Fast Ordering</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-vegetarian-green">✓</span>
                <span className="text-sm">Real-time Tracking</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - App Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md">
              {/* Phone Frame */}
              <div className="relative bg-gradient-to-br from-premium-orange to-golden-glow p-1 rounded-[3rem] shadow-2xl">
                <div className="bg-pitch-black rounded-[2.8rem] p-4">
                  {/* Phone Screen */}
                  <div className="bg-deep-space rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                    {/* App Screenshot Placeholder */}
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-deep-space to-pitch-black">
                      <div className="text-8xl mb-6">🥟</div>
                      <div className="text-2xl font-bold text-premium-orange mb-2">
                        Momos Magic
                      </div>
                      <div className="text-sm text-gray-400 text-center mb-6">
                        Order your favorite momos in seconds
                      </div>
                      <div className="w-full space-y-3">
                        <div className="bg-charcoal rounded-xl p-4 flex items-center gap-3">
                          <div className="text-2xl">🍕</div>
                          <div className="flex-1">
                            <div className="text-white font-semibold">Kurkure Momos</div>
                            <div className="text-sm text-gray-400">₹100 • 5pc</div>
                          </div>
                          <div className="text-premium-orange font-bold">+</div>
                        </div>
                        <div className="bg-charcoal rounded-xl p-4 flex items-center gap-3">
                          <div className="text-2xl">🥟</div>
                          <div className="flex-1">
                            <div className="text-white font-semibold">Paneer Fried</div>
                            <div className="text-sm text-gray-400">₹80 • 5pc</div>
                          </div>
                          <div className="text-premium-orange font-bold">+</div>
                        </div>
                      </div>
                      <button className="mt-6 w-full bg-premium-orange text-pitch-black py-3 rounded-xl font-bold">
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements Around Phone */}
              <motion.div
                className="absolute -top-10 -right-10 bg-premium-orange text-pitch-black px-4 py-2 rounded-full font-bold shadow-lg"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                50% OFF
              </motion.div>
              <motion.div
                className="absolute -bottom-10 -left-10 bg-golden-glow text-pitch-black px-4 py-2 rounded-full font-bold shadow-lg"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              >
                Fast Delivery
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
