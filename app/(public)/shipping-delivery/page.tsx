'use client';
import {LegalNotes} from '@/components/LegalNotes';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ShippingDeliveryPage() {
  return (
    <div className="min-h-screen bg-pitch-black text-white">
      <LegalNotes slug="shipping-delivery"/>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-b from-charcoal to-pitch-black py-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-premium-orange">
            Shipping & Delivery Policy
          </h1>
          <p className="text-golden-glow text-lg mb-2">
            Last Updated: January 15, 2025
          </p>
          <p className="text-gray-300 text-lg">
            Information about our delivery areas, timing, and charges.
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-12"
        >
          {/* Delivery Areas */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              Delivery Areas
            </h2>
            
            <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-vegetarian-green"></div>
                  <span className="text-gray-300">Currently Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-golden-glow"></div>
                  <span className="text-gray-300">Coming Soon</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-bold mb-4 text-vegetarian-green flex items-center gap-2">
                    <span>🏠</span> Currently Serving:
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-vegetarian-green mt-1">✓</span>
                      <span>Naya Bazar and surrounding areas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-vegetarian-green mt-1">✓</span>
                      <span>Main Sherghati Market</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-vegetarian-green mt-1">✓</span>
                      <span>Near Post Office area</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-vegetarian-green mt-1">✓</span>
                      <span>Limited radius around our kitchen</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold mb-4 text-golden-glow flex items-center gap-2">
                    <span>📈</span> Expansion Plans:
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-golden-glow mt-1">→</span>
                      <span>Whole Sherghati town (Coming March 2025)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-golden-glow mt-1">→</span>
                      <span>10KM radius delivery (Planning Phase)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Delivery Timing */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              Delivery Timing & Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Preparation Time */}
              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <h4 className="text-2xl font-bold mb-4 text-golden-glow flex items-center gap-2">
                  <span>⏱️</span> Preparation Time
                </h4>
                <p className="text-gray-300 mb-4">
                  <strong className="text-white">15-30 minutes</strong> depending on order size and complexity
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1">•</span>
                    <span>Small orders (1-2 items): 15-20 minutes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1">•</span>
                    <span>Medium orders (3-5 items): 20-25 minutes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1">•</span>
                    <span>Large orders (6+ items): 25-30 minutes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1">•</span>
                    <span>Catering orders: As per discussion</span>
                  </li>
                </ul>
              </div>

              {/* Delivery Time */}
              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <h4 className="text-2xl font-bold mb-4 text-golden-glow flex items-center gap-2">
                  <span>🚗</span> Delivery Time
                </h4>
                <p className="text-gray-300 mb-4">
                  <strong className="text-white">30-45 minutes</strong> from order confirmation
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1">•</span>
                    <span>Standard delivery: 30-45 minutes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1">•</span>
                    <span>Express delivery: Not available currently</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1">•</span>
                    <span>Peak hours may have longer wait times</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Delivery Charges */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              Delivery Charges
            </h2>
            
            <div className="bg-charcoal rounded-lg overflow-hidden border border-premium-orange/10">
              <div className="grid grid-cols-2 bg-premium-orange text-pitch-black p-4 font-bold">
                <div>Order Value</div>
                <div>Delivery Charge</div>
              </div>
              <div className="grid grid-cols-2 p-4 border-b border-premium-orange/10">
                <div className="text-gray-300">Below ₹200</div>
                <div className="text-white font-bold">₹20</div>
              </div>
              <div className="grid grid-cols-2 p-4 bg-vegetarian-green/10 border-2 border-vegetarian-green">
                <div className="text-gray-300">₹200 and above</div>
                <div className="text-vegetarian-green font-bold text-xl">FREE</div>
              </div>
            </div>

            <div className="bg-charcoal rounded-lg p-6 border border-vegetarian-green/30 mt-6">
              <h5 className="text-xl font-bold mb-2 text-vegetarian-green flex items-center gap-2">
                <span>🎉</span> Free Delivery on Orders Above ₹200
              </h5>
              <p className="text-gray-300">
                No hidden charges. All prices include taxes.
              </p>
            </div>
          </section>

          {/* Pickup Option */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              Takeaway/Pickup Option
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pickup Benefits */}
              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <h4 className="text-xl font-bold mb-4 text-golden-glow flex items-center gap-2">
                  <span>🏪</span> Store Pickup Benefits:
                </h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-vegetarian-green mt-1">✓</span>
                    <span>No delivery charges</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-vegetarian-green mt-1">✓</span>
                    <span>Faster order readiness (15-20 minutes)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-vegetarian-green mt-1">✓</span>
                    <span>Fresh and hot food</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-vegetarian-green mt-1">✓</span>
                    <span>Pay on pickup option available</span>
                  </li>
                </ul>
              </div>

              {/* Pickup Location */}
              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <h4 className="text-xl font-bold mb-4 text-golden-glow flex items-center gap-2">
                  <span>📍</span> Pickup Location:
                </h4>
                <div className="space-y-2 text-gray-300">
                  <p className="text-white font-bold">Momos Magic</p>
                  <p>Naya Bazar, Near Post Office</p>
                  <p>Sherghati, Bihar 824211</p>
                  <p className="mt-4">
                    <strong className="text-white">Phone:</strong>{' '}
                    <a href="tel:+919955955191" className="text-premium-orange hover:text-golden-glow transition-colors">
                      +91 9955955191
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Delivery Guidelines */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              Delivery Guidelines
            </h2>
            
            <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-premium-orange mt-1">•</span>
                  <span>Please be available at the delivery address during estimated delivery time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-premium-orange mt-1">•</span>
                  <span>Delivery person will call you upon arrival</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-premium-orange mt-1">•</span>
                  <span>Please check your order before accepting delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-premium-orange mt-1">•</span>
                  <span>Contact us immediately if there are any issues with your order</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-premium-orange mt-1">•</span>
                  <span>Delivery may be delayed during peak hours or bad weather</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Related Policies */}
          <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/20">
            <h3 className="text-xl font-bold mb-4 text-golden-glow">Related Policies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link href="/privacy-policy" className="text-premium-orange hover:text-golden-glow transition-colors flex items-center gap-2">
                <span>→</span> Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="text-premium-orange hover:text-golden-glow transition-colors flex items-center gap-2">
                <span>→</span> Terms & Conditions
              </Link>
              <Link href="/refund-cancellation" className="text-premium-orange hover:text-golden-glow transition-colors flex items-center gap-2">
                <span>→</span> Refund & Cancellation
              </Link>
              <Link href="/online-ordering-policy" className="text-premium-orange hover:text-golden-glow transition-colors flex items-center gap-2">
                <span>→</span> Online Ordering Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Back to Top */}
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-premium-orange text-pitch-black px-8 py-3 rounded-lg font-bold hover:bg-golden-glow transition-all duration-300"
        >
          Back to Top ↑
        </button>
      </div>
    </div>
  );
}

