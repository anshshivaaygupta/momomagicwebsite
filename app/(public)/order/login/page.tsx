'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function OrderLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp' | 'name'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOTP] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [devOTP, setDevOTP] = useState(''); // For development

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/order/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send-otp', phone: `+91${phone}` }),
      });

      const data = await response.json();

      if (data.success) {
        setDevOTP(data.devOTP); // For development
        setStep('otp');
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/order/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify-otp',
          phone: `+91${phone}`,
          otp,
          name: name || 'User',
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.isNewUser) {
          setStep('name');
        } else {
          router.push('/order/menu');
        }
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteName = () => {
    router.push('/order/menu');
  };

  return (
    <div className="min-h-screen bg-pitch-black flex items-center justify-center p-4">
      <div className="container mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-deep-space border border-charcoal rounded-2xl p-8"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🥟</div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to Momos Magic</h1>
            <p className="text-gray-400">Login to start ordering</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-warm-orange/10 border border-warm-orange rounded-lg text-warm-orange text-sm">
              {error}
            </div>
          )}

          {/* Phone Number Step */}
          {step === 'phone' && (
            <form onSubmit={handleSendOTP}>
              <div className="mb-6">
                <label className="block text-white font-semibold mb-2">Phone Number</label>
                <div className="flex gap-2">
                  <div className="bg-charcoal border border-charcoal rounded-lg px-4 py-3 text-white font-semibold">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="99559 55191"
                    maxLength={10}
                    required
                    className="flex-1 bg-charcoal border border-charcoal rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || phone.length !== 10}
                className="w-full bg-premium-orange text-pitch-black py-3 rounded-lg font-bold hover:bg-golden-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>

              {/* Benefits */}
              <div className="mt-8 pt-8 border-t border-charcoal">
                <h4 className="text-white font-semibold mb-4">Why Create Account?</h4>
                <ul className="space-y-2">
                  {['Faster ordering', 'Order history', 'Exclusive offers', 'Loyalty rewards'].map(
                    (benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-gray-400">
                        <span className="text-vegetarian-green">✓</span>
                        <span>{benefit}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </form>
          )}

          {/* OTP Verification Step */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOTP}>
              <div className="mb-6">
                <label className="block text-white font-semibold mb-2">Enter OTP</label>
                <p className="text-sm text-gray-400 mb-4">
                  We've sent a 6-digit code to +91{phone}
                </p>
                {devOTP && (
                  <div className="mb-4 p-3 bg-premium-orange/10 border border-premium-orange rounded-lg text-premium-orange text-sm">
                    Development OTP: <strong>{devOTP}</strong>
                  </div>
                )}
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  required
                  className="w-full bg-charcoal border border-charcoal rounded-lg px-4 py-3 text-white text-center text-2xl tracking-widest focus:border-premium-orange focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-premium-orange text-pitch-black py-3 rounded-lg font-bold hover:bg-golden-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full border border-charcoal text-gray-400 py-3 rounded-lg font-semibold hover:border-premium-orange hover:text-premium-orange transition-all duration-300"
              >
                Change Phone Number
              </button>
            </form>
          )}

          {/* Name Step (for new users) */}
          {step === 'name' && (
            <div>
              <div className="mb-6">
                <label className="block text-white font-semibold mb-2">Your Name</label>
                <p className="text-sm text-gray-400 mb-4">Help us personalize your experience</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full bg-charcoal border border-charcoal rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none"
                />
              </div>

              <button
                onClick={handleCompleteName}
                disabled={!name.trim()}
                className="w-full bg-premium-orange text-pitch-black py-3 rounded-lg font-bold hover:bg-golden-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Menu
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
