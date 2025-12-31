'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  calculateMonthlyRevenue,
  calculateMonthlyExpenses,
  calculateMonthlyProfit,
  calculateROIMonths,
  calculateTotalInvestment,
} from '@/data/franchise';

export function ROICalculator() {
  const [dailyCustomers, setDailyCustomers] = useState(75);
  const [avgOrderValue, setAvgOrderValue] = useState(100);

  const monthlyRevenue = calculateMonthlyRevenue(dailyCustomers, avgOrderValue);
  const expenses = calculateMonthlyExpenses(monthlyRevenue);
  const monthlyProfit = calculateMonthlyProfit(monthlyRevenue);
  const totalInvestment = calculateTotalInvestment(150000);
  const roiMonths = calculateROIMonths(totalInvestment, monthlyProfit);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-20 bg-pitch-black">
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
              Expected Returns & Profit Projections
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See realistic profit projections based on actual performance data
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Projections */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-deep-space border border-charcoal rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Monthly Revenue Projections</h3>

            {/* Daily Customers Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-300">Daily Customers</label>
                <span className="text-premium-orange font-semibold">{dailyCustomers}</span>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                step={5}
                value={dailyCustomers}
                onChange={(e) => setDailyCustomers(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #ffc241 0%, #ffd700 ${
                    ((dailyCustomers - 50) / (100 - 50)) * 100
                  }%, #333 ${((dailyCustomers - 50) / (100 - 50)) * 100}%, #333 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>50</span>
                <span>100</span>
              </div>
            </div>

            {/* Average Order Value Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-300">Average Order Value</label>
                <span className="text-premium-orange font-semibold">
                  {formatCurrency(avgOrderValue)}
                </span>
              </div>
              <input
                type="range"
                min={80}
                max={120}
                step={5}
                value={avgOrderValue}
                onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #ffc241 0%, #ffd700 ${
                    ((avgOrderValue - 80) / (120 - 80)) * 100
                  }%, #333 ${((avgOrderValue - 80) / (120 - 80)) * 100}%, #333 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹80</span>
                <span>₹120</span>
              </div>
            </div>

            {/* Revenue Breakdown */}
            <div className="space-y-4 mt-8">
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Daily Customers</span>
                <span className="text-white font-semibold">{dailyCustomers}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Average Order Value</span>
                <span className="text-white font-semibold">{formatCurrency(avgOrderValue)}</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-green-500/10 rounded-lg px-4">
                <span className="text-green-400 font-semibold">Monthly Revenue</span>
                <span className="text-green-400 font-bold text-xl">
                  {formatCurrency(monthlyRevenue)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Expense Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-deep-space border border-charcoal rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Monthly Expense Breakdown</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Raw Materials (40%)</span>
                <span className="text-white font-semibold">
                  {formatCurrency(expenses.rawMaterials)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Rent & Utilities</span>
                <span className="text-white font-semibold">
                  {formatCurrency(expenses.rentUtilities)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Staff Salary (2 people)</span>
                <span className="text-white font-semibold">
                  {formatCurrency(expenses.staffSalary)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Royalty (5% of revenue)</span>
                <span className="text-white font-semibold">{formatCurrency(expenses.royalty)}</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-red-500/10 rounded-lg px-4">
                <span className="text-red-400 font-semibold">Total Expenses</span>
                <span className="text-red-400 font-bold text-xl">
                  {formatCurrency(expenses.total)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Profit Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto mt-8"
        >
          <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Your Estimated Monthly Profit
            </h3>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-6xl md:text-7xl font-bold text-white mb-2"
            >
              {formatCurrency(monthlyProfit)}
            </motion.div>
            <div className="text-white/90 text-lg mb-8">After all expenses and royalty</div>

            {/* ROI Timeline */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center justify-center gap-2">
                <span>📅</span>
                <span>Return on Investment Timeline</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-white/80 mb-1">Break-even Point</div>
                  <div className="text-2xl font-bold text-white">6-8 Months</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm text-white/80 mb-1">Total ROI</div>
                  <div className="text-2xl font-bold text-white">{roiMonths} Months</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-8 text-center text-sm text-gray-500"
        >
          * Projections are based on average performance data. Actual results may vary based on
          location, market conditions, and operational efficiency.
        </motion.div>
      </div>
    </section>
  );
}
