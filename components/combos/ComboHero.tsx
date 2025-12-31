'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ComboHero: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-pitch-black via-deep-space to-pitch-black" />

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [`${Math.random() * 100}%`, `${Math.random() * 100 - 20}%`],
              x: [`${Math.random() * 100}%`, `${Math.random() * 100 + 10}%`],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            🎁
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Unbeatable Combos -{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-premium-orange via-golden-glow to-premium-orange animate-gradient-x drop-shadow-[0_0_30px_rgba(255,194,65,0.5)]">
              More Magic, Less Money
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Perfect Combinations for Every Occasion - From Family Dinners to Party Celebrations
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { icon: '✅', text: 'Most Popular Combos' },
              { icon: '💰', text: 'Save Up to 30%' },
              { icon: '⚡', text: 'Quick Preparation' },
              { icon: '🎉', text: 'Perfect for Events' },
            ].map((badge, index) => (
              <motion.div
                key={index}
                className="bg-deep-space/80 backdrop-blur-sm border-2 border-premium-orange/30 rounded-xl px-6 py-3 flex items-center gap-3 hover:border-golden-glow hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,194,65,0.2)] transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.6 + index * 0.1,
                }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-2xl">{badge.icon}</span>
                <span className="text-sm font-semibold text-foreground">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
