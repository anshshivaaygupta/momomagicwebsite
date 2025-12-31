'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export const CateringHero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-pitch-black via-deep-space to-pitch-black" />

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100 - 20}%`,
                `${Math.random() * 100}%`,
              ],
              x: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100 + 10}%`,
                `${Math.random() * 100}%`,
              ],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {i % 3 === 0 ? '🎊' : i % 3 === 1 ? '🥟' : '🎉'}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Headline */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-premium-orange via-golden-glow to-premium-orange bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Make Your Events Memorable with Momos Magic
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl md:text-2xl text-foreground/80 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Premium Catering for 10 to 1000+ Guests - From Intimate Gatherings to Grand Celebrations
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { icon: '✅', text: '50+ Events Catered' },
              { icon: '⭐', text: '4.9/5 Customer Rating' },
              { icon: '🏆', text: 'Award Winning Quality' },
              { icon: '🚚', text: 'Free Delivery in Sherghati' },
            ].map((badge, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-deep-space/50 border border-premium-orange/30 rounded-full backdrop-blur-sm"
                whileHover={{ scale: 1.05, borderColor: 'rgba(255, 194, 65, 0.6)' }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-xl">{badge.icon}</span>
                <span className="text-sm font-semibold text-foreground/90">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollToSection('quote-generator')}
              >
                Get Instant Quote
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('packages')}
              >
                View Our Packages
              </Button>
            </motion.div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[
              { number: '50+', label: 'Events Catered' },
              { number: '5000+', label: 'Happy Guests' },
              { number: '4.9/5', label: 'Rating' },
              { number: '100%', label: 'Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-golden-glow mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-foreground/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
