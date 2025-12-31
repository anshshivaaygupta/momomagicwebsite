'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function FranchiseHero() {
  const stats = [
    { number: '15+', label: 'Cities Target' },
    { number: '₹25K-50K', label: 'Monthly Profit' },
    { number: '360°', label: 'Support' },
    { number: '6-8', label: 'Months ROI' },
  ];

  const floatingElements = ['🚀', '🥟', '💼', '🏆'];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-pitch-black overflow-hidden flex items-center justify-center py-20">
      {/* Floating Decorative Elements */}
      {floatingElements.map((emoji, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-20"
          initial={{ y: 0, x: 0 }}
          animate={{
            y: [0, -30, 0],
            x: [0, index % 2 === 0 ? 20 : -20, 0],
            rotate: [0, index % 2 === 0 ? 10 : -10, 0],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            top: `${20 + index * 15}%`,
            left: `${10 + index * 20}%`,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-r from-premium-orange to-golden-glow text-pitch-black px-6 py-2 rounded-full font-semibold text-sm">
              🎯 Launching Soon - Limited Franchises Available
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-premium-orange via-golden-glow to-premium-orange bg-clip-text text-transparent">
              Join the Momos Magic Revolution
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Be Your Own Boss with Bihar's Most Loved Momos Brand - Proven Business Model, Complete
            Support
          </motion.p>

          {/* Franchise Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-deep-space border border-charcoal rounded-xl p-6 hover:border-premium-orange transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-premium-orange mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => scrollToSection('documents')}
              className="bg-premium-orange text-pitch-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-golden-glow transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-premium-orange/50 w-full sm:w-auto"
            >
              Download Franchise Kit
            </button>
            <button
              onClick={() => scrollToSection('investment-calculator')}
              className="border-2 border-premium-orange text-premium-orange px-8 py-4 rounded-lg font-semibold text-lg hover:bg-premium-orange hover:text-pitch-black transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              Calculate Your Investment
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>FSSAI Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Award Winning Brand</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Proven Track Record</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Complete Training</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-pitch-black pointer-events-none" />
    </section>
  );
}
