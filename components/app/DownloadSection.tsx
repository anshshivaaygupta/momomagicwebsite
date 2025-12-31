'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { downloadLinks } from '@/data/appData';

export function DownloadSection() {
  const handleDownload = (link: typeof downloadLinks[0]) => {
    if (link.downloadUrl) {
      window.open(link.downloadUrl, '_blank');
    } else {
      alert('Scan the QR code with your phone camera to download the app');
    }
  };

  const handleDirectAPKDownload = () => {
    const apkUrl = '/downloads/momos-magic.apk';
    const link = document.createElement('a');
    link.href = apkUrl;
    link.download = 'momos-magic.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="download-section" className="py-20 bg-pitch-black">
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
              Download Momos Magic App Now
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Available on Android and iOS - Start ordering in minutes
          </p>
        </motion.div>

        {/* Direct APK Download Button - Prominent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-r from-premium-orange to-golden-glow p-1 rounded-2xl">
            <div className="bg-deep-space rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">📥</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Download APK Directly
              </h3>
              <p className="text-gray-400 mb-6">
                For Android devices - Install directly without Play Store
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDirectAPKDownload}
                className="w-full py-4 bg-premium-orange text-pitch-black rounded-lg font-bold text-xl transition-all duration-300 hover:bg-golden-glow shadow-lg hover:shadow-premium-orange/50 flex items-center justify-center gap-3"
              >
                <span className="text-2xl">⬇️</span>
                <span>DOWNLOAD APK DIRECTLY</span>
              </motion.button>
              <p className="text-sm text-gray-500 mt-4">
                Latest version • Free • Safe & Secure
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {downloadLinks.map((link, index) => (
            <motion.div
              key={link.platform}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-deep-space border border-charcoal rounded-2xl p-8 hover:border-premium-orange transition-all duration-300 hover:shadow-lg hover:shadow-premium-orange/20 flex flex-col items-center text-center"
            >
              {/* Store Icon */}
              <div className="text-7xl mb-4">{link.storeIcon}</div>

              {/* Store Name */}
              <h4 className="text-2xl font-bold text-white mb-2">{link.storeName}</h4>

              {/* Platform Description */}
              <p className="text-gray-400 mb-4">
                {link.platform === 'android' && 'For Android devices'}
                {link.platform === 'ios' && 'For iPhone & iPad'}
                {link.platform === 'qr' && 'Quick download on your phone'}
              </p>

              {/* Rating (for app stores) */}
              {link.platform !== 'qr' && (
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-golden-glow text-xl">
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-400">
                    {link.rating}/5 ({link.reviews.toLocaleString()}+ reviews)
                  </div>
                </div>
              )}

              {/* QR Code (for QR option) */}
              {link.platform === 'qr' && (
                <div className="mb-6">
                  <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center">
                    <div className="text-6xl">📱</div>
                  </div>
                  <p className="text-sm text-gray-400 mt-3">Point your camera at the code</p>
                </div>
              )}

              {/* Download Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDownload(link)}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                  link.platform === 'qr'
                    ? 'border-2 border-premium-orange text-premium-orange hover:bg-premium-orange hover:text-pitch-black'
                    : 'bg-premium-orange text-pitch-black hover:bg-golden-glow shadow-lg hover:shadow-premium-orange/50'
                }`}
              >
                {link.platform === 'android' && (
                  <div className="flex flex-col items-center">
                    <span className="text-sm">Download on</span>
                    <span className="text-lg">Google Play</span>
                  </div>
                )}
                {link.platform === 'ios' && (
                  <div className="flex flex-col items-center">
                    <span className="text-sm">Download on</span>
                    <span className="text-lg">App Store</span>
                  </div>
                )}
                {link.platform === 'qr' && <span>Scan QR Code</span>}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-deep-space border border-charcoal rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Get 50% OFF on Your First Order!
            </h3>
            <p className="text-gray-400 mb-6">
              Download the app now and use code <span className="text-premium-orange font-bold">FIRST50</span> at checkout
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-vegetarian-green">✓</span>
                <span>No minimum order</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-vegetarian-green">✓</span>
                <span>Valid for 30 days</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-vegetarian-green">✓</span>
                <span>Maximum discount ₹150</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
