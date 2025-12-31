'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import type { CateringPackage } from '@/data/catering';

interface PackageCardProps {
  package: CateringPackage;
  index: number;
  onSelect: (packageId: string) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ package: pkg, index, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="relative h-full"
    >
      <div
        className={`bg-deep-space border-2 rounded-xl p-6 transition-all duration-300 hover:border-premium-orange hover:shadow-[0_0_25px_rgba(255,194,65,0.3)] h-full flex flex-col ${
          pkg.isFeatured
            ? 'border-premium-orange shadow-[0_0_20px_rgba(255,194,65,0.2)] scale-105'
            : 'border-charcoal'
        }`}
      >
        {/* Badge */}
        <motion.div
          className="absolute -top-3 right-4 bg-gradient-to-r from-premium-orange to-golden-glow text-pitch-black px-4 py-1 rounded-full font-bold text-sm shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
        >
          {pkg.badge}
        </motion.div>

        {/* Image Placeholder */}
        <div className="bg-charcoal rounded-lg mb-4 aspect-video flex items-center justify-center overflow-hidden relative group">
          <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
            {pkg.category === 'wedding' ? '💒' : pkg.category === 'office' ? '🏢' : pkg.category === 'birthday' ? '🎂' : '🎯'}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-pitch-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-golden-glow mb-2 group-hover:text-premium-orange transition-colors duration-300">
          {pkg.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-foreground/70 mb-4">{pkg.description}</p>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline gap-3 mb-1">
            {pkg.basePrice > 0 ? (
              <>
                <span className="text-3xl font-bold text-golden-glow">₹{pkg.basePrice.toLocaleString()}</span>
                <span className="text-sm text-foreground/50">{pkg.priceNote}</span>
              </>
            ) : (
              <span className="text-2xl font-bold text-golden-glow">Custom Quote</span>
            )}
          </div>
          {pkg.perGuestPrice > 0 && (
            <p className="text-sm text-foreground/60">(₹{pkg.perGuestPrice} per guest)</p>
          )}
        </div>

        {/* Included Items */}
        <div className="mb-4 flex-grow">
          <p className="text-sm font-semibold text-foreground/80 mb-2">What's Included:</p>
          <ul className="space-y-1">
            {pkg.includes.map((item, idx) => (
              <motion.li
                key={idx}
                className="text-sm text-foreground/70 flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.4 + idx * 0.05 }}
              >
                <span className="text-vegetarian-green mt-0.5">✓</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 mb-4 pt-4 border-t border-charcoal">
          {pkg.metaInfo.map((info, idx) => (
            <div key={idx} className="text-xs text-foreground/60">
              {info}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          variant="primary"
          className="w-full"
          size="md"
          onClick={() => onSelect(pkg.id)}
        >
          Select {pkg.name.split(' ')[0]} Package
        </Button>
      </div>
    </motion.div>
  );
};
