'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { appFeatures, phonePeConfig } from '@/data/appData';

export function AppFeatures() {
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
              Why Download Our App?
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the fastest and most rewarding way to order your favorite momos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {appFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-pitch-black border border-charcoal rounded-2xl p-8 hover:border-premium-orange transition-all duration-300 hover:shadow-lg hover:shadow-premium-orange/20"
            >
              {/* Icon */}
              <div className="text-6xl mb-4">{feature.icon}</div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>

              {/* Description */}
              <p className="text-gray-400 mb-6">{feature.description}</p>

              {/* Feature Points */}
              <ul className="space-y-3 mb-6">
                {feature.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <span className="text-vegetarian-green mt-1">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* PhonePe Integration Details (for Easy Payments feature) */}
              {feature.id === 'easy-payments' && feature.metadata && (
                <div className="mt-6 pt-6 border-t border-charcoal">
                  <div className="bg-deep-space border border-premium-orange/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">💳</span>
                      <span className="font-bold text-premium-orange">PhonePe Integration</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Merchant ID:</span>
                        <span className="text-white font-mono">{feature.metadata.merchantId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Key Index:</span>
                        <span className="text-white font-mono">{feature.metadata.keyIndex}</span>
                      </div>
                      <div className="mt-4">
                        <div className="text-gray-400 mb-2">Payment Methods:</div>
                        <div className="flex flex-wrap gap-2">
                          {feature.metadata.paymentMethods.map((method: string) => (
                            <span
                              key={method}
                              className="bg-charcoal text-premium-orange px-3 py-1 rounded-full text-xs font-semibold"
                            >
                              {method}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* PhonePe Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-premium-orange/10 to-golden-glow/10 border border-premium-orange/30 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-2">
                Powered by PhonePe
              </h3>
              <p className="text-gray-400">
                India's most trusted payment gateway for secure transactions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {phonePeConfig.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-premium-orange flex items-center justify-center flex-shrink-0">
                    <span className="text-pitch-black font-bold">✓</span>
                  </div>
                  <span className="text-white">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              {phonePeConfig.paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="bg-deep-space border border-charcoal rounded-lg px-4 py-2 flex items-center gap-2"
                >
                  <span className="text-2xl">{method.icon}</span>
                  <span className="text-white font-semibold">{method.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
