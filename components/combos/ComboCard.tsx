'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { OfferTimer } from './OfferTimer';
import type { ComboDeal } from '@/data/combos';

interface ComboCardProps {
  combo: ComboDeal;
  index: number;
}

export const ComboCard: React.FC<ComboCardProps> = ({ combo, index }) => {
  const savings = combo.regularPrice - combo.comboPrice;
  const savingsPercent = Math.round((savings / combo.regularPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="relative"
    >
      <div className="bg-deep-space border-2 border-charcoal rounded-xl p-6 transition-all duration-300 hover:border-premium-orange hover:shadow-[0_0_25px_rgba(255,194,65,0.3)] h-full flex flex-col">
        {/* Badge */}
        {combo.badge && (
          <motion.div
            className="absolute -top-3 right-4 bg-gradient-to-r from-premium-orange to-golden-glow text-pitch-black px-4 py-1 rounded-full font-bold text-sm shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
          >
            {combo.badge}
          </motion.div>
        )}

        {/* Offer Timer */}
        {combo.offerTimer && (
          <div className="mb-4">
            <OfferTimer
              endDate={combo.offerTimer.endDate}
              showCountdown={combo.offerTimer.showCountdown}
            />
          </div>
        )}

        {/* Image Placeholder */}
        <div className="bg-charcoal rounded-lg mb-4 aspect-video flex items-center justify-center overflow-hidden relative group">
          <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
            🎁
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-pitch-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-golden-glow mb-2 group-hover:text-premium-orange transition-colors duration-300">
          {combo.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-foreground/70 mb-4">{combo.description}</p>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-3xl font-bold text-golden-glow">₹{combo.comboPrice}</span>
            <span className="text-lg text-foreground/50 line-through">₹{combo.regularPrice}</span>
          </div>
          <motion.p
            className="text-vegetarian-green font-semibold text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            You Save: ₹{savings} ({savingsPercent}% OFF)
          </motion.p>
        </div>

        {/* Included Items */}
        <div className="mb-4 flex-grow">
          <p className="text-sm font-semibold text-foreground/80 mb-2">Includes:</p>
          <ul className="space-y-1">
            {combo.includedItems.map((item, idx) => (
              <motion.li
                key={idx}
                className="text-sm text-foreground/70 flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.4 + idx * 0.05 }}
              >
                <span className="text-premium-orange mt-0.5">•</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between mb-4 pt-4 border-t border-charcoal">
          <div className="flex items-center gap-2 text-xs text-foreground/60">
            <span>🕒 {combo.preparationTime} mins</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground/60">
            <span>👥 {combo.serves}</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button variant="primary" className="w-full" size="md">
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};
