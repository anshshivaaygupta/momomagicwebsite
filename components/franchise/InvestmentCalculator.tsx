'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { franchiseInvestment, calculateTotalInvestment } from '@/data/franchise';

export function InvestmentCalculator() {
  const [kitchenSetup, setKitchenSetup] = useState(150000);

  const totalInvestment = calculateTotalInvestment(kitchenSetup);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section id="investment-calculator" className="py-20 bg-deep-space">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-premium-orange to-golden-glow bg-clip-text text-transparent">
              Your Franchise Investment Breakdown
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Calculate your total investment with our interactive calculator
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-charcoal border-2 border-premium-orange rounded-2xl p-8 md:p-12"
          >
            {/* Investment Breakdown */}
            <div className="space-y-8 mb-12">
              {/* Franchise Fee */}
              <div className="border-b border-gray-700 pb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-1">Franchise Fee</h4>
                    <p className="text-sm text-gray-400">
                      One-time fee for brand usage and training
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-premium-orange">
                    {formatCurrency(franchiseInvestment.franchiseFee)}
                  </div>
                </div>
              </div>

              {/* Kitchen Setup with Slider */}
              <div className="border-b border-gray-700 pb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-1">Kitchen Setup</h4>
                    <p className="text-sm text-gray-400">
                      Equipment, furniture, and setup costs
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-premium-orange">
                    {formatCurrency(kitchenSetup)}
                  </div>
                </div>

                {/* Slider */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>{formatCurrency(franchiseInvestment.kitchenSetupMin)}</span>
                    <span>{formatCurrency(franchiseInvestment.kitchenSetupMax)}</span>
                  </div>
                  <input
                    type="range"
                    min={franchiseInvestment.kitchenSetupMin}
                    max={franchiseInvestment.kitchenSetupMax}
                    step={10000}
                    value={kitchenSetup}
                    onChange={(e) => setKitchenSetup(Number(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-premium-orange to-golden-glow rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #ffc241 0%, #ffd700 ${
                        ((kitchenSetup - franchiseInvestment.kitchenSetupMin) /
                          (franchiseInvestment.kitchenSetupMax -
                            franchiseInvestment.kitchenSetupMin)) *
                        100
                      }%, #333 ${
                        ((kitchenSetup - franchiseInvestment.kitchenSetupMin) /
                          (franchiseInvestment.kitchenSetupMax -
                            franchiseInvestment.kitchenSetupMin)) *
                        100
                      }%, #333 100%)`,
                    }}
                  />
                </div>
              </div>

              {/* Initial Inventory */}
              <div className="border-b border-gray-700 pb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-1">Initial Inventory</h4>
                    <p className="text-sm text-gray-400">
                      Raw materials and packaging for first month
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-premium-orange">
                    {formatCurrency(franchiseInvestment.initialInventory)}
                  </div>
                </div>
              </div>

              {/* Marketing Support */}
              <div className="pb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-1">Marketing Support</h4>
                    <p className="text-sm text-gray-400">
                      Grand opening campaigns and materials
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-premium-orange">
                    {formatCurrency(franchiseInvestment.marketingSupport)}
                  </div>
                </div>
              </div>
            </div>

            {/* Total Investment */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-premium-orange to-golden-glow rounded-xl p-8 text-center"
            >
              <div className="text-sm font-semibold text-pitch-black mb-2 uppercase tracking-wide">
                Total Investment
              </div>
              <div className="text-5xl md:text-6xl font-bold text-pitch-black mb-2">
                {formatCurrency(totalInvestment)}
              </div>
              <div className="text-sm text-pitch-black/80">
                (Approximately ₹{Math.round(totalInvestment / 100000)} - ₹
                {Math.round(totalInvestment / 100000) + 1} Lakhs)
              </div>
            </motion.div>

            {/* Financing Options */}
            <div className="mt-8 bg-pitch-black/50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span>💡</span>
                <span>Financing Options Available</span>
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-500">✓</span>
                  <span>Bank loan assistance</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-500">✓</span>
                  <span>EMI options for equipment</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-500">✓</span>
                  <span>Partnership opportunities</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-500">✓</span>
                  <span>Payment plans available</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
