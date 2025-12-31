'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RefundCancellationPage() {
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
            Refund & Cancellation Policy
          </h1>
          <p className="text-golden-glow text-lg mb-2">
            Last Updated: January 15, 2025
          </p>
          <p className="text-gray-300 text-lg">
            Clear guidelines for order cancellations and refund processing.
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
          {/* Cancellation Policy */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              Order Cancellation Policy
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Free Cancellation Window */}
              <div className="bg-charcoal rounded-lg p-6 border-2 border-vegetarian-green">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">✅</div>
                  <h4 className="text-2xl font-bold text-vegetarian-green">Free Cancellation Window</h4>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    <strong className="text-white">First 5 Minutes:</strong> Full refund if cancelled within 5 minutes of order placement
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-vegetarian-green mt-1">✓</span>
                      <span>100% amount refunded</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-vegetarian-green mt-1">✓</span>
                      <span>Instant refund processing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-vegetarian-green mt-1">✓</span>
                      <span>No questions asked</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* After Preparation Starts */}
              <div className="bg-charcoal rounded-lg p-6 border-2 border-warm-orange">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">⚠️</div>
                  <h4 className="text-2xl font-bold text-warm-orange">After Preparation Starts</h4>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    <strong className="text-white">After 5 Minutes:</strong> Cancellation not possible once preparation begins
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-warm-orange mt-1">×</span>
                      <span>Ingredients already prepared</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-warm-orange mt-1">×</span>
                      <span>Kitchen resources allocated</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-warm-orange mt-1">×</span>
                      <span>No refund provided</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Refund Eligibility */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              Refund Eligibility
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Eligible for Refund */}
              <div className="bg-charcoal rounded-lg p-6 border border-vegetarian-green/30">
                <h5 className="text-xl font-bold mb-4 text-vegetarian-green flex items-center gap-2">
                  <span>✅</span> Eligible for Refund
                </h5>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-vegetarian-green mt-1">•</span>
                    <span>Order cancelled within 5-minute window</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-vegetarian-green mt-1">•</span>
                    <span>Technical payment failures (double charges)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-vegetarian-green mt-1">•</span>
                    <span>Wrong order delivered (verified cases)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-vegetarian-green mt-1">•</span>
                    <span>Quality issues (verified by our team)</span>
                  </li>
                </ul>
              </div>

              {/* Not Eligible for Refund */}
              <div className="bg-charcoal rounded-lg p-6 border border-warm-orange/30">
                <h5 className="text-xl font-bold mb-4 text-warm-orange flex items-center gap-2">
                  <span>❌</span> Not Eligible for Refund
                </h5>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-warm-orange mt-1">•</span>
                    <span>Order cancelled after preparation starts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-warm-orange mt-1">•</span>
                    <span>Change of mind after order preparation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-warm-orange mt-1">•</span>
                    <span>Late pickup resulting in cold food</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-warm-orange mt-1">•</span>
                    <span>Personal taste preferences</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Refund Process */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              Refund Process & Timeline
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <div className="w-12 h-12 rounded-full bg-premium-orange text-pitch-black flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h5 className="text-lg font-bold mb-2 text-golden-glow">Refund Request</h5>
                <p className="text-gray-300 text-sm">
                  Contact us via phone or WhatsApp within 1 hour of order delivery/pickup
                </p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <div className="w-12 h-12 rounded-full bg-premium-orange text-pitch-black flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h5 className="text-lg font-bold mb-2 text-golden-glow">Verification</h5>
                <p className="text-gray-300 text-sm">
                  Our team verifies the issue within 2 hours
                </p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <div className="w-12 h-12 rounded-full bg-premium-orange text-pitch-black flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h5 className="text-lg font-bold mb-2 text-golden-glow">Approval</h5>
                <p className="text-gray-300 text-sm">
                  Refund approved if eligible as per policy
                </p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <div className="w-12 h-12 rounded-full bg-premium-orange text-pitch-black flex items-center justify-center text-xl font-bold mb-4">
                  4
                </div>
                <h5 className="text-lg font-bold mb-2 text-golden-glow">Processing</h5>
                <p className="text-gray-300 text-sm">
                  Refund processed within 24-48 hours to original payment method
                </p>
              </div>
            </div>
          </section>

          {/* Refund Contact Information */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              Refund Contact Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10 text-center">
                <div className="text-4xl mb-3">📞</div>
                <h5 className="text-lg font-bold mb-2 text-golden-glow">Phone Support</h5>
                <p className="text-gray-300">+91 9955955191</p>
                <p className="text-sm text-gray-400">(10AM - 10PM)</p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10 text-center">
                <div className="text-4xl mb-3">💬</div>
                <h5 className="text-lg font-bold mb-2 text-golden-glow">WhatsApp</h5>
                <p className="text-gray-300">Same number</p>
                <p className="text-sm text-gray-400">Quick response guaranteed</p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10 text-center">
                <div className="text-4xl mb-3">📧</div>
                <h5 className="text-lg font-bold mb-2 text-golden-glow">Email</h5>
                <p className="text-gray-300">refunds@momomagics.com</p>
                <p className="text-sm text-gray-400">Response within 6 hours</p>
              </div>
            </div>
          </section>

          {/* Important Notes */}
          <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/20">
            <h3 className="text-xl font-bold mb-4 text-golden-glow">Important Notes</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-premium-orange mt-1">•</span>
                <span>Refunds are processed to the original payment method only</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-premium-orange mt-1">•</span>
                <span>Bank processing time may take 5-7 business days after refund initiation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-premium-orange mt-1">•</span>
                <span>For cash payments, refunds will be processed via bank transfer</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-premium-orange mt-1">•</span>
                <span>Partial refunds may be issued for partially fulfilled orders</span>
              </li>
            </ul>
          </div>

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
              <Link href="/shipping-delivery" className="text-premium-orange hover:text-golden-glow transition-colors flex items-center gap-2">
                <span>→</span> Shipping & Delivery
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
