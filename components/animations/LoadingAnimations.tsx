'use client';

import { motion } from 'framer-motion';

export function Spinner({ size = 40, color = '#ffc241' }: { size?: number; color?: string }) {
  return (
    <motion.div
      className="rounded-full border-4"
      style={{
        width: size,
        height: size,
        borderColor: `${color}33`,
        borderTopColor: color,
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

export function SkeletonLoader({ className = '', width = '100%', height = '20px' }: { className?: string; width?: string; height?: string }) {
  return (
    <motion.div
      className={`rounded ${className}`}
      style={{
        width,
        height,
        background: 'linear-gradient(90deg, #0a0a0a 25%, #111111 50%, #0a0a0a 75%)',
        backgroundSize: '200% 100%',
      }}
      animate={{
        backgroundPosition: ['200% 0', '-200% 0'],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

export function LoadingDots({ color = '#ffc241' }: { color?: string }) {
  return (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            y: [0, -10, 0],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export function ProgressBar({ progress, color = '#ffc241' }: { progress: number; color?: string }) {
  return (
    <div className="w-full h-2 bg-charcoal rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
}
