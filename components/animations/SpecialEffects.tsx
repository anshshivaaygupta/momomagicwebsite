'use client';

import { motion } from 'framer-motion';
import React from 'react';

export function FloatingMomos() {
  const momos = [
    { x: '10%', y: '20%', duration: 15, delay: 0 },
    { x: '80%', y: '60%', duration: 20, delay: 2 },
    { x: '50%', y: '80%', duration: 18, delay: 4 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {momos.map((momo, index) => (
        <motion.div
          key={index}
          className="absolute text-6xl"
          style={{ color: '#ffc241' }}
          initial={{ x: momo.x, y: momo.y, rotate: 0 }}
          animate={{
            x: [momo.x, `${parseFloat(momo.x) + 5}%`, momo.x],
            y: [momo.y, `${parseFloat(momo.y) + 10}%`, momo.y],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: momo.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: momo.delay,
          }}
        >
          🥟
        </motion.div>
      ))}
    </div>
  );
}

export function GoldParticles({ count = 30 }: { count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ backgroundColor: '#ffd700' }}
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            opacity: 0,
            scale: 0,
          }}
          animate={{
            y: [
              Math.random() * 100 + '%',
              (Math.random() * 100 - 20) + '%',
            ],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function CountUp({ end, duration = 2, suffix = '', className = '' }: CountUpProps) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {count}{suffix}
    </motion.span>
  );
}

export function PulseDot({ color = '#ffc241', size = 12 }: { color?: string; size?: number }) {
  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
