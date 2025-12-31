'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { howToUseSteps } from '@/data/appData';

export function HowToUse() {
  return (
    <section className="py-20 bg-deep-space">
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
              How to Use the App
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start ordering your favorite momos in just 4 simple steps
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howToUseSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line (except for last step) */}
                {index < howToUseSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-premium-orange to-transparent -translate-x-1/2 z-0" />
                )}

                <div className="bg-pitch-black border border-charcoal rounded-2xl p-6 hover:border-premium-orange transition-all duration-300 hover:shadow-lg hover:shadow-premium-orange/20 relative z-10 h-full flex flex-col">
                  {/* Step Number */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-premium-orange to-golden-glow flex items-center justify-center text-pitch-black font-bold text-2xl mb-4 mx-auto">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="text-5xl mb-4 text-center">{step.icon}</div>

                  {/* Title */}
                  <h4 className="text-xl font-bold text-white mb-3 text-center">{step.title}</h4>

                  {/* Description */}
                  <p className="text-gray-400 text-center mb-4 flex-grow">{step.description}</p>

                  {/* Duration */}
                  <div className="text-center">
                    <span className="bg-deep-space border border-premium-orange/30 text-premium-orange px-4 py-2 rounded-full text-sm font-semibold">
                      ⏱️ {step.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Total Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-premium-orange/10 to-golden-glow/10 border border-premium-orange/30 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-2">
                Total Time: ~20 minutes
              </h3>
              <p className="text-gray-400">
                From download to enjoying your hot, delicious momos!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
