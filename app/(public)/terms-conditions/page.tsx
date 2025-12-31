'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsConditionsPage() {
  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'ordering', title: 'Ordering Process' },
    { id: 'cancellation', title: 'Cancellation Policy' },
    { id: 'payments', title: 'Payments' },
    { id: 'liability', title: 'Liability' }
  ];

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
            Terms & Conditions
          </h1>
          <p className="text-golden-glow text-lg mb-2">
            Last Updated: January 15, 2025
          </p>
          <p className="text-gray-300 text-lg">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </motion.div>

      {/* Table of Contents */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-charcoal rounded-lg p-6 mb-8 border border-premium-orange/20"
        >
          <h3 className="text-2xl font-bold mb-4 text-premium-orange">Quick Navigation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-golden-glow hover:text-premium-orange transition-colors duration-300 flex items-center gap-2"
              >
                <span className="text-premium-orange">→</span>
                {section.title}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-12"
        >
          {/* Section 1: Acceptance of Terms */}
          <section id="acceptance" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              1. Acceptance of Terms
            </h2>
            
            <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10 mb-6">
              <p className="text-gray-300 mb-4">
                By accessing and using Momos Magic website, mobile application, or services, you agree to be bound by these Terms and Conditions.
              </p>
              
              <h4 className="text-xl font-bold mb-4 text-golden-glow">Key Agreements:</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-premium-orange mt-1">•</span>
                  <span>You are at least 18 years old or have parental consent</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-premium-orange mt-1">•</span>
                  <span>You provide accurate and complete information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-premium-orange mt-1">•</span>
                  <span>You will not misuse our services or website</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-premium-orange mt-1">•</span>
                  <span>You accept our pricing and menu changes</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: Ordering Process */}
          <section id="ordering" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              2. Ordering Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-premium-orange text-pitch-black flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <h5 className="text-xl font-bold text-golden-glow">Menu Selection</h5>
                </div>
                <p className="text-gray-300">
                  Select items from our available menu. Menu availability may change based on stock.
                </p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-premium-orange text-pitch-black flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <h5 className="text-xl font-bold text-golden-glow">Order Confirmation</h5>
                </div>
                <p className="text-gray-300">
                  Review your order before payment. Once confirmed, changes require cancellation and reordering.
                </p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-premium-orange text-pitch-black flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <h5 className="text-xl font-bold text-golden-glow">Payment</h5>
                </div>
                <p className="text-gray-300">
                  Complete payment through our secure payment gateway. Orders are processed only after successful payment.
                </p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-premium-orange text-pitch-black flex items-center justify-center text-xl font-bold">
                    4
                  </div>
                  <h5 className="text-xl font-bold text-golden-glow">Order Preparation</h5>
                </div>
                <p className="text-gray-300">
                  Preparation begins immediately after payment confirmation. Estimated preparation time: 15-30 minutes.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Cancellation Policy */}
          <section id="cancellation" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              3. Cancellation & Modification Policy
            </h2>
            
            <div className="space-y-4">
              <div className="bg-charcoal rounded-lg p-6 border border-vegetarian-green/30 flex gap-4">
                <div className="text-4xl">⏰</div>
                <div>
                  <h5 className="text-xl font-bold mb-2 text-vegetarian-green">5-Minute Cancellation Window</h5>
                  <p className="text-gray-300">Orders can be cancelled within 5 minutes of placement without any charges.</p>
                </div>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-warm-orange/30 flex gap-4">
                <div className="text-4xl">🚫</div>
                <div>
                  <h5 className="text-xl font-bold mb-2 text-warm-orange">After Preparation Starts</h5>
                  <p className="text-gray-300">Once order preparation begins, cancellations are not accepted and refunds are not provided.</p>
                </div>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/30 flex gap-4">
                <div className="text-4xl">📞</div>
                <div>
                  <h5 className="text-xl font-bold mb-2 text-golden-glow">Contact for Issues</h5>
                  <p className="text-gray-300">For wrong orders or quality issues, contact us immediately at +91 9955955191</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Payments */}
          <section id="payments" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              4. Payments & Pricing
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <h4 className="text-xl font-bold mb-4 text-golden-glow">Accepted Payment Methods</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1">•</span>
                    <span>PhonePe UPI Payments</span>
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
                    <span>Cash on Pickup (for takeaway orders)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <h4 className="text-xl font-bold mb-4 text-golden-glow">Pricing Policy</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1">•</span>
                    <span>All prices are in Indian Rupees (₹)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1">•</span>
                    <span>Prices include applicable taxes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1">•</span>
                    <span>Menu prices are subject to change without prior notice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1">•</span>
                    <span>Offers and discounts cannot be combined unless specified</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Liability */}
          <section id="liability" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              5. Liability & Disclaimers
            </h2>
            
            <div className="space-y-6">
              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <h4 className="text-xl font-bold mb-3 text-golden-glow">Quality Assurance</h4>
                <p className="text-gray-300">
                  We maintain highest quality standards with FSSAI certification (License: 20424201001152). However, taste preferences are subjective.
                </p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <h4 className="text-xl font-bold mb-3 text-golden-glow">Delivery Areas</h4>
                <p className="text-gray-300">
                  Currently we serve limited areas in Sherghati. Delivery availability is subject to change.
                </p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <h4 className="text-xl font-bold mb-3 text-golden-glow">Force Majeure</h4>
                <p className="text-gray-300">
                  We are not liable for delays or non-performance due to circumstances beyond our control including weather, strikes, or government restrictions.
                </p>
              </div>
            </div>
          </section>

          {/* Agreement Notice */}
          <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/20">
            <h3 className="text-xl font-bold mb-3 text-golden-glow">Agreement Notice</h3>
            <p className="text-gray-300">
              By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>

          {/* Related Policies */}
          <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/20">
            <h3 className="text-xl font-bold mb-4 text-golden-glow">Related Policies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link href="/privacy-policy" className="text-premium-orange hover:text-golden-glow transition-colors flex items-center gap-2">
                <span>→</span> Privacy Policy
              </Link>
              <Link href="/refund-cancellation" className="text-premium-orange hover:text-golden-glow transition-colors flex items-center gap-2">
                <span>→</span> Refund & Cancellation
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
