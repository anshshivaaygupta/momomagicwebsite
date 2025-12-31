'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { franchiseBenefits } from '@/data/franchise';

export function BenefitsGrid() {
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
              Why Franchise With Us?
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join Bihar's fastest-growing momos brand with proven success and complete support
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {franchiseBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-deep-space border border-charcoal rounded-2xl p-8 hover:border-premium-orange transition-all duration-300 hover:shadow-lg hover:shadow-premium-orange/20"
            >
              {/* Icon */}
              <div className="text-6xl mb-6">{benefit.icon}</div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>

              {/* Description */}
              <p className="text-gray-400 mb-6">{benefit.description}</p>

              {/* Points */}
              <ul className="space-y-3">
                {benefit.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1 flex-shrink-0">✓</span>
                    <span className="text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
