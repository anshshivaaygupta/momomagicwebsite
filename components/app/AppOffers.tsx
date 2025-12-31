'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { appOffers, appBenefits } from '@/data/appData';

export function AppOffers() {
  return (
    <section className="py-20 bg-deep-space">
      <div className="container mx-auto px-4">
        {/* App-Exclusive Offers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-premium-orange to-golden-glow bg-clip-text text-transparent">
              App-Exclusive Offers
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Special discounts and rewards only available on our mobile app
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {appOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-pitch-black border border-charcoal rounded-2xl p-6 hover:border-premium-orange transition-all duration-300 hover:shadow-lg hover:shadow-premium-orange/20 flex flex-col"
            >
              {/* Discount Badge */}
              <div className="bg-gradient-to-r from-premium-orange to-golden-glow text-pitch-black px-4 py-2 rounded-full font-bold text-xl text-center mb-4">
                {offer.discount}
              </div>

              {/* Title */}
              <h4 className="text-xl font-bold text-white mb-2">{offer.title}</h4>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 flex-grow">{offer.description}</p>

              {/* Valid Until */}
              <div className="text-xs text-gray-500 mb-4">
                Valid till {new Date(offer.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>

              {/* Terms */}
              <div className="border-t border-charcoal pt-4">
                <div className="text-xs text-gray-500 mb-2">Terms & Conditions:</div>
                <ul className="space-y-1">
                  {offer.terms.map((term, idx) => (
                    <li key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                      <span className="text-premium-orange mt-0.5">•</span>
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* App Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-2">{appBenefits.title}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appBenefits.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-pitch-black border border-charcoal rounded-xl p-6 hover:border-premium-orange/50 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                <p className="text-sm text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Loyalty Program Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-premium-orange/10 to-golden-glow/10 border border-premium-orange/30 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🎁</div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Join Our Loyalty Program
            </h3>
            <p className="text-gray-400 mb-6">
              Earn points on every order and redeem them for free momos!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-deep-space rounded-xl p-4">
                <div className="text-3xl font-bold text-premium-orange mb-1">1 Point</div>
                <div className="text-sm text-gray-400">For every ₹10 spent</div>
              </div>
              <div className="bg-deep-space rounded-xl p-4">
                <div className="text-3xl font-bold text-golden-glow mb-1">100 Points</div>
                <div className="text-sm text-gray-400">= ₹100 discount</div>
              </div>
              <div className="bg-deep-space rounded-xl p-4">
                <div className="text-3xl font-bold text-vegetarian-green mb-1">1 Year</div>
                <div className="text-sm text-gray-400">Points validity</div>
              </div>
            </div>
            <button className="bg-premium-orange text-pitch-black px-8 py-3 rounded-lg font-bold hover:bg-golden-glow transition-all duration-300">
              Download App to Join
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
