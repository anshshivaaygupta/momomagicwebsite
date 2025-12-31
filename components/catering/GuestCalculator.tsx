'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPackageRecommendation, calculateEstimatedCost } from '@/data/catering';
import type { CateringPackage } from '@/data/catering';

interface GuestCalculatorProps {
  onPackageSelect?: (packageId: string) => void;
}

export const GuestCalculator: React.FC<GuestCalculatorProps> = ({ onPackageSelect }) => {
  const [guestCount, setGuestCount] = useState(100);
  const [recommendedPackage, setRecommendedPackage] = useState<CateringPackage | null>(null);

  useEffect(() => {
    const recommendation = getPackageRecommendation(guestCount);
    setRecommendedPackage(recommendation);
  }, [guestCount]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuestCount(parseInt(e.target.value));
  };

  const estimatedCost = recommendedPackage
    ? calculateEstimatedCost(recommendedPackage.id, guestCount)
    : 0;

  return (
    <section className="py-16 bg-deep-space/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-premium-orange mb-3">
              Not Sure Which Package You Need?
            </h3>
            <p className="text-lg text-foreground/70">
              Tell us your guest count and we'll recommend the perfect package
            </p>
          </div>

          {/* Calculator Container */}
          <div className="bg-deep-space border-2 border-charcoal rounded-xl p-8 hover:border-premium-orange/50 transition-all duration-300">
            {/* Guest Input */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground/80 mb-4">
                Number of Guests:
              </label>
              <input
                type="range"
                min="10"
                max="1000"
                value={guestCount}
                onChange={handleSliderChange}
                className="w-full h-3 bg-charcoal rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, #ffc241 0%, #ffc241 ${
                    ((guestCount - 10) / 990) * 100
                  }%, #1a1a1a ${((guestCount - 10) / 990) * 100}%, #1a1a1a 100%)`,
                }}
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-foreground/60">10 guests</span>
                <motion.div
                  className="text-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                  key={guestCount}
                >
                  <span className="text-4xl font-bold text-golden-glow">{guestCount}</span>
                  <span className="text-lg text-foreground/70 ml-2">Guests</span>
                </motion.div>
                <span className="text-sm text-foreground/60">1000+ guests</span>
              </div>
            </div>

            {/* Recommendation */}
            {recommendedPackage ? (
              <motion.div
                className="bg-pitch-black rounded-lg p-6 border border-premium-orange/30"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                key={recommendedPackage.id}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-golden-glow mb-2">
                      We Recommend: {recommendedPackage.name}
                    </h4>
                    <p className="text-sm text-foreground/70">{recommendedPackage.description}</p>
                  </div>
                  <div className="text-6xl">
                    {recommendedPackage.category === 'wedding'
                      ? '💒'
                      : recommendedPackage.category === 'office'
                      ? '🏢'
                      : recommendedPackage.category === 'birthday'
                      ? '🎂'
                      : '🎯'}
                  </div>
                </div>

                <div className="bg-deep-space rounded-lg p-4 mb-4">
                  <p className="text-sm text-foreground/60 mb-1">Estimated Cost for {guestCount} guests:</p>
                  <p className="text-3xl font-bold text-premium-orange">
                    ₹{estimatedCost.toLocaleString()}
                  </p>
                  {recommendedPackage.perGuestPrice > 0 && (
                    <p className="text-xs text-foreground/50 mt-1">
                      (₹{recommendedPackage.perGuestPrice} per guest)
                    </p>
                  )}
                </div>

                {onPackageSelect && (
                  <button
                    onClick={() => onPackageSelect(recommendedPackage.id)}
                    className="w-full px-6 py-3 bg-premium-orange text-pitch-black rounded-lg font-bold hover:bg-golden-glow transition-colors duration-300"
                  >
                    Select This Package
                  </button>
                )}
              </motion.div>
            ) : (
              <div className="bg-pitch-black rounded-lg p-6 border border-charcoal text-center">
                <p className="text-foreground/70">
                  For {guestCount}+ guests, we recommend a custom package. Please contact us for a personalized quote.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          background: #ffc241;
          border: 3px solid #ffd700;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 194, 65, 0.5);
        }

        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #ffc241;
          border: 3px solid #ffd700;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 194, 65, 0.5);
        }
      `}</style>
    </section>
  );
};
