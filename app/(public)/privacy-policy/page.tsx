'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const sections = [
    { id: 'information-collection', title: 'Information We Collect' },
    { id: 'how-we-use', title: 'How We Use Information' },
    { id: 'data-protection', title: 'Data Protection' },
    { id: 'your-rights', title: 'Your Rights' },
    { id: 'contact', title: 'Contact Us' }
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
            Privacy Policy
          </h1>
          <p className="text-golden-glow text-lg mb-2">
            Last Updated: January 15, 2025
          </p>
          <p className="text-gray-300 text-lg">
            Your privacy is our priority. Learn how we protect and use your information.
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
          {/* Section 1: Information We Collect */}
          <section id="information-collection" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              1. Information We Collect
            </h2>
            
            <div className="space-y-6">
              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <h4 className="text-xl font-bold mb-4 text-golden-glow">Personal Information</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1">•</span>
                    <span><strong className="text-white">Name:</strong> For order processing and personalization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1">•</span>
                    <span><strong className="text-white">Phone Number:</strong> For order confirmation and delivery updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1">•</span>
                    <span><strong className="text-white">Email Address:</strong> For order receipts and promotional communications (optional)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1">•</span>
                    <span><strong className="text-white">Delivery Address:</strong> For food delivery services</span>
                  </li>
                </ul>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <h4 className="text-xl font-bold mb-4 text-golden-glow">Automatically Collected Information</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1">•</span>
                    <span>Device information and IP address</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1">•</span>
                    <span>Browser type and version</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1">•</span>
                    <span>Pages visited and time spent</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-premium-orange mt-1">•</span>
                    <span>Order history and preferences</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: How We Use Information */}
          <section id="how-we-use" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              2. How We Use Your Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10 hover:border-premium-orange/30 transition-all duration-300">
                <div className="text-4xl mb-4">📦</div>
                <h5 className="text-xl font-bold mb-2 text-golden-glow">Order Processing</h5>
                <p className="text-gray-300">Process and deliver your food orders efficiently</p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10 hover:border-premium-orange/30 transition-all duration-300">
                <div className="text-4xl mb-4">🔔</div>
                <h5 className="text-xl font-bold mb-2 text-golden-glow">Order Updates</h5>
                <p className="text-gray-300">Send order confirmation and status updates via SMS/WhatsApp</p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10 hover:border-premium-orange/30 transition-all duration-300">
                <div className="text-4xl mb-4">🎁</div>
                <h5 className="text-xl font-bold mb-2 text-golden-glow">Personalized Offers</h5>
                <p className="text-gray-300">Provide special offers based on your order history</p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10 hover:border-premium-orange/30 transition-all duration-300">
                <div className="text-4xl mb-4">📊</div>
                <h5 className="text-xl font-bold mb-2 text-golden-glow">Service Improvement</h5>
                <p className="text-gray-300">Enhance our menu and services based on customer preferences</p>
              </div>
            </div>
          </section>

          {/* Section 3: Data Protection */}
          <section id="data-protection" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              3. Data Protection & Security
            </h2>
            
            <div className="space-y-4">
              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10 flex gap-4">
                <div className="text-4xl">🔒</div>
                <div>
                  <h5 className="text-xl font-bold mb-2 text-golden-glow">SSL Encryption</h5>
                  <p className="text-gray-300">All data transmitted between your device and our servers is encrypted using 256-bit SSL technology</p>
                </div>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10 flex gap-4">
                <div className="text-4xl">🚫</div>
                <div>
                  <h5 className="text-xl font-bold mb-2 text-golden-glow">No Third-Party Sharing</h5>
                  <p className="text-gray-300">We do not sell, trade, or rent your personal information to third parties</p>
                </div>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10 flex gap-4">
                <div className="text-4xl">💳</div>
                <div>
                  <h5 className="text-xl font-bold mb-2 text-golden-glow">Secure Payments</h5>
                  <p className="text-gray-300">Payment processing through PCI-DSS compliant payment gateways (PhonePe)</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Your Rights */}
          <section id="your-rights" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              4. Your Rights & Choices
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <h5 className="text-xl font-bold mb-2 text-golden-glow">Access & Correction</h5>
                <p className="text-gray-300">You can access and update your personal information anytime</p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <h5 className="text-xl font-bold mb-2 text-golden-glow">Data Deletion</h5>
                <p className="text-gray-300">Request deletion of your personal data (subject to legal requirements)</p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <h5 className="text-xl font-bold mb-2 text-golden-glow">Marketing Preferences</h5>
                <p className="text-gray-300">Opt-out of promotional communications at any time</p>
              </div>

              <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/10">
                <h5 className="text-xl font-bold mb-2 text-golden-glow">Cookies</h5>
                <p className="text-gray-300">Manage cookie preferences through your browser settings</p>
              </div>
            </div>
          </section>

          {/* Section 5: Contact */}
          <section id="contact" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 text-premium-orange">
              5. Contact Information
            </h2>
            
            <div className="bg-charcoal rounded-lg p-8 border border-premium-orange/10">
              <p className="text-gray-300 mb-6">
                For privacy-related inquiries or to exercise your rights, contact us:
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-premium-orange font-bold">Email:</span>
                  <a href="mailto:privacy@momomagics.com" className="text-golden-glow hover:text-premium-orange transition-colors">
                    privacy@momomagics.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-premium-orange font-bold">Phone:</span>
                  <a href="tel:+919955955191" className="text-golden-glow hover:text-premium-orange transition-colors">
                    +91 9955955191
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-premium-orange font-bold">Address:</span>
                  <span className="text-gray-300">
                    Momos Magic, Naya Bazar, Near Post Office, Sherghati, Bihar 824211
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Policy Updates */}
          <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/20">
            <h3 className="text-xl font-bold mb-3 text-golden-glow">Policy Updates</h3>
            <p className="text-gray-300">
              We may update this privacy policy periodically. Continued use of our services constitutes acceptance of updated terms.
            </p>
          </div>

          {/* Related Policies */}
          <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/20">
            <h3 className="text-xl font-bold mb-4 text-golden-glow">Related Policies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link href="/terms-conditions" className="text-premium-orange hover:text-golden-glow transition-colors flex items-center gap-2">
                <span>→</span> Terms & Conditions
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
