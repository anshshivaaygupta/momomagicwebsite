'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AppDemoVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section id="demo-video" className="py-20 bg-pitch-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-premium-orange to-golden-glow bg-clip-text text-transparent">
              See the App in Action
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Watch our 30-second demo to see how easy it is to order momos
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-deep-space border-2 border-premium-orange rounded-2xl overflow-hidden aspect-video">
            {/* Video Placeholder */}
            {!isPlaying ? (
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-pitch-black flex flex-col items-center justify-center">
                <div className="text-9xl mb-6">🎬</div>
                <h3 className="text-2xl font-bold text-white mb-4">App Demo Video</h3>
                <p className="text-gray-400 mb-8">30 seconds • Full HD</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePlay}
                  className="w-20 h-20 rounded-full bg-premium-orange flex items-center justify-center hover:bg-golden-glow transition-all duration-300 shadow-lg hover:shadow-premium-orange/50"
                >
                  <svg
                    className="w-10 h-10 text-pitch-black ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.button>
              </div>
            ) : (
              <div className="absolute inset-0 bg-pitch-black flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📱</div>
                  <p className="text-gray-400">Video player would load here</p>
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="mt-4 bg-premium-orange text-pitch-black px-6 py-2 rounded-lg font-bold hover:bg-golden-glow transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Video Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-deep-space border border-charcoal rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="text-white font-bold mb-1">Quick Tour</h4>
              <p className="text-sm text-gray-400">See all features in 30 seconds</p>
            </div>
            <div className="bg-deep-space border border-charcoal rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">📱</div>
              <h4 className="text-white font-bold mb-1">Real Interface</h4>
              <p className="text-sm text-gray-400">Actual app screens and features</p>
            </div>
            <div className="bg-deep-space border border-charcoal rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="text-white font-bold mb-1">Easy to Follow</h4>
              <p className="text-sm text-gray-400">Step-by-step walkthrough</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
