'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function OnlineOrderingPolicyPage() {
  return (
    <div className="min-h-screen bg-pitch-black text-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-b from-charcoal to-pitch-black py-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-premium-orange">
            Online Food Ordering Policy
          </h1>
          <p className="text-golden-glow text-lg mb-2">
            Last Updated: January 15, 2025
          </p>
          <p className="text-gray-300 text-lg">
            Guidelines for ordering through our website and mobile app.
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
          {/* Ordering Process */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              Ordering Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <div className="w-12 h-12 rounded-full bg-premium-orange text-pitch-black flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h5 className="text-lg font-bold mb-2 text-golden-glow">Account Creation</h5>
                <p className="text-gray-300 text-sm">
                  Create account with phone number verification for faster ordering
                </p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <div className="w-12 h-12 rounded-full bg-premium-orange text-pitch-black flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h5 className="text-lg font-bold mb-2 text-golden-glow">Menu Selection</h5>
                <p className="text-gray-300 text-sm">
                  Browse available items with real-time stock status
                </p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <div className="w-12 h-12 rounded-full bg-premium-orange text-pitch-black flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h5 className="text-lg font-bold mb-2 text-golden-glow">Customization</h5>
                <p className="text-gray-300 text-sm">
                  Select spice levels and add special instructions
                </p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <div className="w-12 h-12 rounded-full bg-premium-orange text-pitch-black flex items-center justify-center text-xl font-bold mb-4">
                  4
                </div>
                <h5 className="text-lg font-bold mb-2 text-golden-glow">Payment</h5>
                <p className="text-gray-300 text-sm">
                  Secure payment through PhonePe integration
                </p>
              </div>
            </div>
          </section>

          {/* Order Confirmation & Tracking */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              Order Confirmation & Tracking
            </h2>
            
            <div className="space-y-4">
              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10 flex gap-4">
                <div className="text-4xl">✅</div>
                <div>
                  <h5 className="text-xl font-bold mb-2 text-golden-glow">Instant Confirmation</h5>
                  <p className="text-gray-300">Order confirmation via SMS and in-app notification immediately after payment</p>
                </div>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10 flex gap-4">
                <div className="text-4xl">📱</div>
                <div>
                  <h5 className="text-xl font-bold mb-2 text-golden-glow">Real-time Tracking</h5>
                  <p className="text-gray-300">Track order status: Ordered → Preparing → Ready → Completed</p>
                </div>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10 flex gap-4">
                <div className="text-4xl">🔔</div>
                <div>
                  <h5 className="text-xl font-bold mb-2 text-golden-glow">Status Updates</h5>
                  <p className="text-gray-300">Automatic notifications at each stage of order preparation</p>
                </div>
              </div>
            </div>
          </section>

          {/* Quality Assurance */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              Quality Assurance
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10 text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h5 className="text-lg font-bold mb-2 text-golden-glow">FSSAI Certified</h5>
                <p className="text-gray-300 text-sm">
                  License No: 20424201001152 - Highest hygiene standards maintained
                </p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10 text-center">
                <div className="text-4xl mb-4">⭐</div>
                <h5 className="text-lg font-bold mb-2 text-golden-glow">Fresh Ingredients</h5>
                <p className="text-gray-300 text-sm">
                  Daily fresh ingredients sourced from local markets
                </p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10 text-center">
                <div className="text-4xl mb-4">👨‍🍳</div>
                <h5 className="text-lg font-bold mb-2 text-golden-glow">Expert Preparation</h5>
                <p className="text-gray-300 text-sm">
                  Traditional recipes with modern hygiene practices
                </p>
              </div>
            </div>
          </section>

          {/* Customer Support */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              Customer Support
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <div className="text-4xl mb-4 text-center">📞</div>
                <h5 className="text-lg font-bold mb-2 text-golden-glow text-center">Phone Support</h5>
                <p className="text-gray-300 text-center mb-2">+91 9955955191</p>
                <p className="text-gray-300 text-center text-sm">(10AM - 10PM)</p>
                <p className="text-premium-orange text-center text-sm mt-2">Average response: 3 rings</p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <div className="text-4xl mb-4 text-center">💬</div>
                <h5 className="text-lg font-bold mb-2 text-golden-glow text-center">WhatsApp Business</h5>
                <p className="text-gray-300 text-center mb-2">Same number for orders & queries</p>
                <p className="text-premium-orange text-center text-sm mt-2">Instant reply during business hours</p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <div className="text-4xl mb-4 text-center">📧</div>
                <h5 className="text-lg font-bold mb-2 text-golden-glow text-center">Email Support</h5>
                <p className="text-gray-300 text-center mb-2">support@momomagics.com</p>
                <p className="text-premium-orange text-center text-sm mt-2">Response within 6 hours</p>
              </div>
            </div>
          </section>

          {/* Payment Security */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              Payment Security
            </h2>
            
            <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-bold mb-4 text-golden-glow">Secure Payment Gateway</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-vegetarian-green mt-1">✓</span>
                      <span>PhonePe integration with PCI-DSS compliance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-vegetarian-green mt-1">✓</span>
                      <span>256-bit SSL encryption for all transactions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-vegetarian-green mt-1">✓</span>
                      <span>No card details stored on our servers</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold mb-4 text-golden-glow">Payment Options</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-premium-orange mt-1">•</span>
                      <span>UPI (Google Pay, PhonePe, Paytm)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-premium-orange mt-1">•</span>
                      <span>Credit/Debit Cards</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-premium-orange mt-1">•</span>
                      <span>Net Banking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-premium-orange mt-1">•</span>
                      <span>Cash on Pickup</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Order Modifications */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              Order Modifications & Cancellations
            </h2>
            
            <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-premium-orange mt-1">•</span>
                  <span>Orders can be cancelled within 5 minutes of placement</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-premium-orange mt-1">•</span>
                  <span>Modifications not possible after payment confirmation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-premium-orange mt-1">•</span>
                  <span>For changes, cancel and place a new order within 5-minute window</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-premium-orange mt-1">•</span>
                  <span>Contact support immediately for urgent issues</span>
                </li>
              </ul>
            </div>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              User Responsibilities
            </h2>
            
            <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-premium-orange mt-1">•</span>
                  <span>Provide accurate delivery address and contact information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-premium-orange mt-1">•</span>
                  <span>Be available at delivery location during estimated time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-premium-orange mt-1">•</span>
                  <span>Check order before accepting delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-premium-orange mt-1">•</span>
                  <span>Report issues immediately for quick resolution</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-premium-orange mt-1">•</span>
                  <span>Maintain respectful communication with delivery staff</span>
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
              <Link href="/shipping-delivery" className="text-premium-orange hover:text-golden-glow transition-colors flex items-center gap-2">
                <span>→</span> Shipping & Delivery
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
