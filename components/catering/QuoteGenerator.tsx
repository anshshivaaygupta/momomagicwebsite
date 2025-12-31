'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { calculateEstimatedCost, cateringPackages } from '@/data/catering';

interface QuoteGeneratorProps {
  selectedPackageId: string;
  guestCount: number;
  selectedMenuItems: string[];
  onBookNow?: () => void;
}

export const QuoteGenerator: React.FC<QuoteGeneratorProps> = ({
  selectedPackageId,
  guestCount,
  selectedMenuItems,
  onBookNow,
}) => {
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [breakdown, setBreakdown] = useState({
    packageCost: 0,
    menuItemsCost: 0,
    total: 0,
  });

  useEffect(() => {
    const selectedPackage = cateringPackages.find((pkg) => pkg.id === selectedPackageId);
    if (!selectedPackage) {
      setEstimatedCost(0);
      return;
    }

    const packageCost = selectedPackage.perGuestPrice > 0
      ? guestCount * selectedPackage.perGuestPrice
      : selectedPackage.basePrice;

    const total = calculateEstimatedCost(selectedPackageId, guestCount, selectedMenuItems);
    const menuItemsCost = total - packageCost;

    setBreakdown({
      packageCost,
      menuItemsCost,
      total,
    });
    setEstimatedCost(total);
  }, [selectedPackageId, guestCount, selectedMenuItems]);

  const selectedPackage = cateringPackages.find((pkg) => pkg.id === selectedPackageId);

  if (!selectedPackage || estimatedCost === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-deep-space/50" id="quote-generator">
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
              Your Instant Quote
            </h3>
            <p className="text-lg text-foreground/70">
              Real-time pricing based on your selections
            </p>
          </div>

          {/* Quote Card */}
          <div className="bg-deep-space border-2 border-premium-orange rounded-xl p-8 shadow-[0_0_30px_rgba(255,194,65,0.2)]">
            {/* Selected Package */}
            <div className="mb-6">
              <h4 className="text-xl font-bold text-golden-glow mb-2">Selected Package</h4>
              <div className="flex items-center justify-between bg-pitch-black rounded-lg p-4">
                <div>
                  <p className="font-bold text-foreground">{selectedPackage.name}</p>
                  <p className="text-sm text-foreground/60">
                    {guestCount} guests × ₹{selectedPackage.perGuestPrice > 0 ? selectedPackage.perGuestPrice : 'Custom'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-golden-glow">
                    ₹{breakdown.packageCost.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Add-ons */}
            {selectedMenuItems.length > 0 && breakdown.menuItemsCost > 0 && (
              <div className="mb-6">
                <h4 className="text-xl font-bold text-golden-glow mb-2">Add-ons & Extras</h4>
                <div className="bg-pitch-black rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-foreground/80">{selectedMenuItems.length} additional items</p>
                    <p className="text-xl font-bold text-golden-glow">
                      +₹{breakdown.menuItemsCost.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Total */}
            <div className="mb-6 pt-6 border-t-2 border-charcoal">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">Total Estimated Cost</p>
                  <p className="text-sm text-foreground/60 mt-1">
                    * Final cost may vary based on customizations
                  </p>
                </div>
                <motion.div
                  className="text-right"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.5 }}
                  key={breakdown.total}
                >
                  <p className="text-4xl font-bold text-premium-orange">
                    ₹{breakdown.total.toLocaleString()}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Savings Badge */}
            {selectedPackage.perGuestPrice > 0 && (
              <div className="mb-6 p-4 bg-vegetarian-green/10 border border-vegetarian-green rounded-lg">
                <p className="text-vegetarian-green font-semibold text-center">
                  💰 Great Value! Only ₹{selectedPackage.perGuestPrice} per guest
                </p>
              </div>
            )}

            {/* What's Included */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-golden-glow mb-3">What's Included:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedPackage.includes.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="text-vegetarian-green mt-0.5">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {onBookNow && (
                <button
                  onClick={onBookNow}
                  className="flex-1 px-8 py-4 bg-premium-orange text-pitch-black rounded-lg font-bold text-lg hover:bg-golden-glow transition-colors duration-300 shadow-lg"
                >
                  Book This Package Now
                </button>
              )}
              <a
                href="tel:+919955955191"
                className="flex-1 px-8 py-4 bg-transparent border-2 border-premium-orange text-premium-orange rounded-lg font-bold text-lg hover:bg-premium-orange hover:text-pitch-black transition-all duration-300 text-center"
              >
                📞 Call for Custom Quote
              </a>
            </div>

            {/* Trust Badge */}
            <div className="mt-6 text-center">
              <p className="text-sm text-foreground/60">
                ✅ Free Delivery in Sherghati | 🏆 Award Winning Quality | ⭐ 4.9/5 Rating
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
