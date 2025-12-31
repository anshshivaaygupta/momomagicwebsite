'use client';

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/Card';

const TrophyIcon = () => (
  <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9C6 10.5913 6.63214 12.1174 7.75736 13.2426C8.88258 14.3679 10.4087 15 12 15C13.5913 15 15.1174 14.3679 16.2426 13.2426C17.3679 12.1174 18 10.5913 18 9V4H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 9H3C3 10.0609 3.42143 11.0783 4.17157 11.8284C4.92172 12.5786 5.93913 13 7 13H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 9H21C21 10.0609 20.5786 11.0783 19.8284 11.8284C19.0783 12.5786 18.0609 13 17 13H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15V19M12 19H15M12 19H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarIcon = () => (
  <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
  </svg>
);

const LeafIcon = () => (
  <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 20C11 20 7 16.5 7 12C7 7.5 11 4 11 4C11 4 15 7.5 15 12C15 16.5 11 20 11 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 4C11 4 15 7.5 15 12C15 16.5 11 20 11 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 12C11 12 14 10 17 10C20 10 22 12 22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const useCountUp = (end: number, duration: number = 2000, isInView: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;
    
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = startValue + (end - startValue) * easeOutQuad(progress);
      
      setCount(Math.floor(currentCount));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return count;
};

const achievements = [
  {
    icon: 'trophy',
    title: 'DM Award 2024',
    description: 'Best Quality Food in City - District Magistrate Office',
    color: 'golden-glow',
    year: '2024',
  },
  {
    icon: 'shield',
    title: 'FSSAI Certified',
    description: 'License: 20424201001152 - Highest Hygiene Standards',
    color: 'vegetarian-green',
    year: '2023',
  },
  {
    icon: 'star',
    title: '4.9/5 Rating',
    description: '2000+ Google Reviews - Consistent Quality',
    color: 'premium-orange',
    year: '2024',
  },
  {
    icon: 'leaf',
    title: '100% Vegetarian',
    description: 'Pure Veg Kitchen - No Compromise on Quality',
    color: 'vegetarian-green',
    year: '2023',
  },
  {
    icon: 'trophy',
    title: 'First in Bihar',
    description: 'Kurkure Momos Innovation - Revolutionary Recipe',
    color: 'golden-glow',
    year: '2024',
  },
  {
    icon: 'star',
    title: '2000+ Customers',
    description: 'Served with Love - Growing Community',
    color: 'warm-orange',
    year: '2025',
  },
];

const renderIcon = (iconName: string, color: string) => {
  const colorClasses: Record<string, string> = {
    'golden-glow': 'text-golden-glow',
    'vegetarian-green': 'text-vegetarian-green',
    'premium-orange': 'text-premium-orange',
    'warm-orange': 'text-warm-orange',
  };
  
  const colorClass = colorClasses[color] || 'text-golden-glow';
  
  switch (iconName) {
    case 'trophy':
      return <div className={colorClass}><TrophyIcon /></div>;
    case 'shield':
      return <div className={colorClass}><ShieldIcon /></div>;
    case 'star':
      return <div className={colorClass}><StarIcon /></div>;
    case 'leaf':
      return <div className={colorClass}><LeafIcon /></div>;
    default:
      return <div className={colorClass}><TrophyIcon /></div>;
  }
};

const stats = [
  { number: 2000, label: 'Happy Customers', icon: '😊', suffix: '+' },
  { number: 16, label: 'Menu Items', icon: '🥟', suffix: '+' },
  { number: 4.9, label: 'Google Rating', icon: '⭐', suffix: '/5', decimals: true },
  { number: 100, label: 'Vegetarian', icon: '🌱', suffix: '%' },
];

const StatCounter: React.FC<{ stat: typeof stats[0]; delay: number }> = ({ stat, delay }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useCountUp(stat.decimals ? stat.number * 10 : stat.number, 2000, isInView);
  
  const displayValue = stat.decimals ? (count / 10).toFixed(1) : count;
  
  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="text-5xl mb-3">{stat.icon}</div>
      <div className="text-4xl md:text-5xl font-bold text-golden-glow mb-2">
        {displayValue}{stat.suffix}
      </div>
      <p className="text-foreground/70">{stat.label}</p>
    </motion.div>
  );
};

export const TrustAchievements: React.FC = () => {
  return (
    <section className="py-20 bg-deep-space">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-premium-orange mb-4">
            Trust & Achievements
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Building trust through quality, hygiene, and innovation
          </p>
        </motion.div>

        {/* Stats Section with Count-up Animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <StatCounter key={index} stat={stat} delay={index * 0.1} />
          ))}
        </div>

        {/* Achievements Grid with Timeline Animation */}
        <div className="mb-16">
          <motion.h3
            className="text-3xl font-bold text-center text-golden-glow mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Journey of Excellence
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="text-center h-full relative overflow-hidden group cursor-pointer">
                  {/* Year Badge */}
                  <div className="absolute top-4 right-4 bg-premium-orange text-pitch-black text-xs px-3 py-1 rounded-full font-bold">
                    {achievement.year}
                  </div>
                  
                  {/* Icon with hover animation */}
                  <motion.div 
                    className="mb-4"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {renderIcon(achievement.icon, achievement.color)}
                  </motion.div>
                  
                  {/* Title with dynamic color */}
                  <h3 className={`text-xl font-bold mb-2 text-${achievement.color}`}>
                    {achievement.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-foreground/70 text-sm">
                    {achievement.description}
                  </p>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-golden-glow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Badges - 4 Column Layout */}
        <motion.div
          className="bg-gradient-to-r from-pitch-black via-deep-space to-pitch-black border-2 border-golden-glow rounded-lg p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-center text-golden-glow mb-8">
            Why Choose Momos Magic?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              className="text-center p-4 rounded-lg transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(255, 194, 65, 0.1)',
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="text-4xl mb-3"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                🧼
              </motion.div>
              <h4 className="font-semibold text-premium-orange mb-2">Hygienic</h4>
              <p className="text-sm text-foreground/70">
                Maintained with highest hygiene standards
              </p>
            </motion.div>

            <motion.div 
              className="text-center p-4 rounded-lg transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(255, 194, 65, 0.1)',
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="text-4xl mb-3"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                👨‍🍳
              </motion.div>
              <h4 className="font-semibold text-premium-orange mb-2">Expert Chef</h4>
              <p className="text-sm text-foreground/70">
                Trained in authentic momo preparation
              </p>
            </motion.div>

            <motion.div 
              className="text-center p-4 rounded-lg transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(255, 194, 65, 0.1)',
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="text-4xl mb-3"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                🥬
              </motion.div>
              <h4 className="font-semibold text-premium-orange mb-2">Fresh Ingredients</h4>
              <p className="text-sm text-foreground/70">
                Daily fresh vegetables and quality ingredients
              </p>
            </motion.div>

            <motion.div 
              className="text-center p-4 rounded-lg transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(255, 194, 65, 0.1)',
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="text-4xl mb-3"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                💰
              </motion.div>
              <h4 className="font-semibold text-premium-orange mb-2">Affordable</h4>
              <p className="text-sm text-foreground/70">
                Premium quality at reasonable prices
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
