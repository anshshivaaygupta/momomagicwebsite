'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { franchiseProcessSteps } from '@/data/franchise';

export function ProcessTimeline() {
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
              4 Simple Steps to Start Your Franchise
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From inquiry to launch - we guide you every step of the way
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {franchiseProcessSteps.map((step, index) => (
            <motion.div
              key={step.stepNumber}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Timeline Line */}
              {index < franchiseProcessSteps.length - 1 && (
                <div className="absolute left-8 md:left-1/2 top-20 bottom-0 w-0.5 bg-gradient-to-b from-premium-orange to-golden-glow transform md:-translate-x-1/2 z-0" />
              )}

              <div
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Step Number Circle */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-premium-orange to-golden-glow flex items-center justify-center text-pitch-black font-bold text-2xl shadow-lg shadow-premium-orange/50"
                  >
                    {step.stepNumber}
                  </motion.div>
                </div>

                {/* Step Content */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`flex-1 bg-deep-space border border-charcoal rounded-2xl p-8 hover:border-premium-orange transition-all duration-300 ${
                    index % 2 === 0 ? 'md:text-left' : 'md:text-right'
                  }`}
                >
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-6">{step.description}</p>

                  {/* Details */}
                  <ul
                    className={`space-y-2 mb-6 ${
                      index % 2 === 0 ? 'md:text-left' : 'md:text-right'
                    }`}
                  >
                    {step.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className={`flex items-start gap-2 ${
                          index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                        }`}
                      >
                        <span className="text-premium-orange flex-shrink-0">✓</span>
                        <span className="text-gray-300">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Duration Badge */}
                  <div
                    className={`inline-flex items-center gap-2 bg-premium-orange/10 border border-premium-orange/30 rounded-full px-4 py-2 ${
                      index % 2 === 0 ? '' : 'md:float-right'
                    }`}
                  >
                    <span className="text-premium-orange">⏱️</span>
                    <span className="text-premium-orange font-semibold text-sm">
                      Duration: {step.duration}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => {
              const element = document.getElementById('franchise-form');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-premium-orange text-pitch-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-golden-glow transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-premium-orange/50"
          >
            Start Your Application Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
