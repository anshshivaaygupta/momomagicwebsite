'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HoverScaleProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export function HoverScale({ children, scale = 1.05, className = '' }: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface HoverGlowProps {
  children: ReactNode;
  glowColor?: string;
  className?: string;
}

export function HoverGlow({ children, glowColor = 'rgba(255, 194, 65, 0.3)', className = '' }: HoverGlowProps) {
  return (
    <motion.div
      whileHover={{
        boxShadow: `0 10px 30px ${glowColor}`,
        scale: 1.02,
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface HoverBorderProps {
  children: ReactNode;
  borderColor?: string;
  className?: string;
}

export function HoverBorder({ children, borderColor = '#ffc241', className = '' }: HoverBorderProps) {
  return (
    <motion.div
      whileHover={{
        borderColor: borderColor,
        scale: 1.02,
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageZoom({ src, alt, className = '' }: ImageZoomProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
