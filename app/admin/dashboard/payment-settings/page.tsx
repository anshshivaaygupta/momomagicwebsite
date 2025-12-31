'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { paymentConfig } from '@/data/orderData';

export default function AdminPaymentSettingsPage() {
  const [settings, setSettings] = useState({
    merchantId: paymentConfig.merchantId,
    keyIndex: paymentConfig.keyIndex,
    merchantName: paymentConfig.merchantName,
    callbackUrl: paymentConfig.callbackUrl,
    redirectUrl: paymentConfig.redirectUrl,
  });

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 'upi', name: 'UPI', icon: '📱', enabled: true },
    { id: 'qr', name: 'QR Code', icon: '📷', enabled: true },
    { id: 'card', name: 'Debit/Credit Card', icon: '💳', enabled: true },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦', enabled: true },
  ]);

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    console.log('Saving payment settings:', settings, paymentMethods);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const togglePaymentMethod = (methodId: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) =>
        method.id === methodId ? { ...method, enabled: !method.enabled } : method
      )
    );
  };

  return (
    <div className="min-h-screen bg-pitch-black p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Payment Settings</h1>
          <p className="text-gray-400">Configure PhonePe payment gateway settings</p>
        </div>

        {/* Success Message */}
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-vegetarian-green/20 border border-vegetarian-green rounded-2xl p-4 mb-6 flex items-center gap-3"
          >
            <span className="text-2xl">✓</span>
            <span className="text-vegetarian-green font-semibold">Settings saved successfully!</span>
          </motion.div>
        )}

        {/* PhonePe Configuration */}
        <div className="bg-deep-space border border-charcoal rounded-2xl p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-6">PhonePe Configuration</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">Merchant ID</label>
              <input
                type="text"
                value={settings.merchantId}
                onChange={(e) => setSettings({ ...settings, merchantId: e.target.value })}
                className="w-full bg-charcoal border border-charcoal rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none font-mono"
                placeholder="M1DD3WP1E1VF"
              />
              <p className="text-sm text-gray-400 mt-1">Your PhonePe merchant ID</p>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Key Index</label>
              <input
                type="number"
                value={settings.keyIndex}
                onChange={(e) => setSettings({ ...settings, keyIndex: parseInt(e.target.value) })}
                className="w-full bg-charcoal border border-charcoal rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none"
                placeholder="1"
              />
              <p className="text-sm text-gray-400 mt-1">Key index for API authentication</p>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Merchant Name</label>
              <input
                type="text"
                value={settings.merchantName}
                onChange={(e) => setSettings({ ...settings, merchantName: e.target.value })}
                className="w-full bg-charcoal border border-charcoal rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none"
                placeholder="Momos Magic"
              />
              <p className="text-sm text-gray-400 mt-1">Display name for payment page</p>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Callback URL</label>
              <input
                type="text"
                value={settings.callbackUrl}
                onChange={(e) => setSettings({ ...settings, callbackUrl: e.target.value })}
                className="w-full bg-charcoal border border-charcoal rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none font-mono"
                placeholder="/api/payment/callback"
              />
              <p className="text-sm text-gray-400 mt-1">URL for payment status callbacks</p>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Redirect URL</label>
              <input
                type="text"
                value={settings.redirectUrl}
                onChange={(e) => setSettings({ ...settings, redirectUrl: e.target.value })}
                className="w-full bg-charcoal border border-charcoal rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none font-mono"
                placeholder="/order/confirmation"
              />
              <p className="text-sm text-gray-400 mt-1">URL to redirect after payment</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-deep-space border border-charcoal rounded-2xl p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-6">Payment Methods</h3>

          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <motion.div
                key={method.id}
                whileHover={{ scale: 1.02 }}
                className="bg-charcoal rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{method.icon}</div>
                  <div>
                    <div className="text-white font-semibold">{method.name}</div>
                    <div className="text-sm text-gray-400">
                      {method.enabled ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => togglePaymentMethod(method.id)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    method.enabled
                      ? 'bg-vegetarian-green text-white hover:bg-warm-orange'
                      : 'bg-gray-700 text-gray-400 hover:bg-vegetarian-green hover:text-white'
                  }`}
                >
                  {method.enabled ? 'Enabled' : 'Disabled'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-deep-space border border-charcoal rounded-2xl p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-6">Security Features</h3>

          <div className="space-y-3">
            {[
              'Instant payment confirmation',
              'Secure encrypted transactions',
              'Multiple payment options',
              'Auto-refund on cancellation',
              'PCI DSS compliant',
              'Two-factor authentication',
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-gray-400">
                <span className="text-vegetarian-green">✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Test Mode */}
        <div className="bg-warm-orange/10 border border-warm-orange rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="text-3xl">⚠️</div>
            <div>
              <h4 className="text-white font-bold mb-2">Test Mode Active</h4>
              <p className="text-sm text-gray-400 mb-4">
                Payment gateway is currently in test mode. No real transactions will be processed.
                Switch to production mode when ready to accept live payments.
              </p>
              <button className="bg-warm-orange text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300">
                Switch to Production
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-premium-orange text-pitch-black py-4 rounded-lg font-bold text-lg hover:bg-golden-glow transition-all duration-300"
        >
          Save Payment Settings
        </button>
      </div>
    </div>
  );
}
