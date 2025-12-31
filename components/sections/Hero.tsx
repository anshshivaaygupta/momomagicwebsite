'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export const Hero: React.FC = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background with Mobile Optimization */}
      <div className="absolute inset-0 z-0">
        {/* Enhanced Gradient Overlay with Gold Sparkle Particles */}
        <div className="absolute inset-0 bg-gradient-to-b from-pitch-black/70 via-pitch-black/50 to-pitch-black z-10">
          {/* Animated Gold Sparkle Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))',
                }}
                initial={{
                  y: '100%',
                  opacity: 0,
                  scale: 0,
                  rotate: 0,
                }}
                animate={{
                  y: [100, -20],
                  x: [0, Math.random() * 100 - 50],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: 'easeOut',
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Video for Desktop, Image for Mobile */}
        {!isMobile ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="/images/hero-poster.jpg"
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/hero-poster.jpg)' }}
          />
        )}
      </div>

      {/* Floating Momos Animation */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div
          className="absolute text-6xl"
          initial={{ x: '10%', y: '20%', rotate: 0 }}
          animate={{
            x: ['10%', '15%', '10%'],
            y: ['20%', '30%', '20%'],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🥟
        </motion.div>

        <motion.div
          className="absolute text-6xl"
          initial={{ x: '80%', y: '60%', rotate: 0 }}
          animate={{
            x: ['80%', '75%', '80%'],
            y: ['60%', '50%', '60%'],
            rotate: [0, -360, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🥟
        </motion.div>

        <motion.div
          className="absolute text-6xl"
          initial={{ x: '50%', y: '80%', rotate: 0 }}
          animate={{
            x: ['50%', '55%', '50%'],
            y: ['80%', '70%', '80%'],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🥟
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-foreground mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          From Humble Stall to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-premium-orange via-golden-glow to-premium-orange animate-gradient-x drop-shadow-[0_0_30px_rgba(255,194,65,0.5)]">
            Culinary Legend
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Experience the Magic That Transformed Sherghati's Street Food Scene
        </motion.p>

        {/* CTAs - Reduced Size for Elegance */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="primary" 
              size="md" 
              className="relative overflow-hidden group"
              onClick={() => router.push('/order/menu')}
            >
              <span className="relative z-10">Order Now</span>
              <motion.div
                className="absolute inset-0 border-2 border-golden-glow opacity-0 group-hover:opacity-100 rounded-lg"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              size="md" 
              className="relative overflow-hidden group"
              onClick={() => scrollToSection('brand-story')}
            >
              <span className="relative z-10">Our Story</span>
              <motion.div
                className="absolute inset-0 bg-golden-glow/10 opacity-0 group-hover:opacity-100 rounded-lg"
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust Badges with Staggered Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            {
              icon: '🏆',
              text: "Awarded 'Best Quality Food in City' by District Magistrate",
              borderColor: 'border-golden-glow/30',
              delay: 0.6,
            },
            {
              icon: '🔒',
              text: 'FSSAI Certified: 20424201001152',
              borderColor: 'border-vegetarian-green/30',
              delay: 0.7,
            },
            {
              icon: '🌱',
              text: '100% Pure Vegetarian · Since 2023',
              borderColor: 'border-vegetarian-green/30',
              delay: 0.8,
            },
            {
              icon: '⭐',
              text: '4.9/5 (2000+ Happy Customers)',
              borderColor: 'border-warm-orange/30',
              delay: 0.9,
            },
          ].map((badge, index) => (
            <motion.div
              key={index}
              className={`bg-deep-space/80 backdrop-blur-sm border-2 ${badge.borderColor} rounded-xl p-4 flex items-center gap-3 hover:border-golden-glow hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,194,65,0.2)] transition-all duration-300`}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: badge.delay,
                ease: 'easeOut',
              }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.span
                className="text-3xl"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  delay: badge.delay + 0.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                {badge.icon}
              </motion.span>
              <p className="text-sm text-foreground/90 text-left">
                {badge.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <div className="text-premium-orange text-4xl">↓</div>
        </motion.div>
      </div>
    </section>
  );
};
