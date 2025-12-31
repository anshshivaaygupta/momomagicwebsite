'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { franchiseDocuments } from '@/data/franchise';

export function DocumentDownload() {
  const handleDownload = (document: any) => {
    if (document.type === 'contact') {
      window.location.href = document.downloadUrl;
    } else {
      alert(`Downloading: ${document.title}\nFile: ${document.downloadUrl}`);
    }
  };

  return (
    <section id="documents" className="py-20 bg-pitch-black">
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
              Franchise Documents & Resources
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Download our franchise kit and related documents
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {franchiseDocuments.map((document, index) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-deep-space border border-charcoal rounded-2xl p-6 hover:border-premium-orange transition-all duration-300 hover:shadow-lg hover:shadow-premium-orange/20 flex flex-col"
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{document.icon}</div>

              {/* Title */}
              <h4 className="text-xl font-bold text-white mb-3">{document.title}</h4>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 flex-grow">{document.description}</p>

              {/* Metadata */}
              {document.type === 'download' ? (
                <div className="space-y-1 mb-4 text-xs text-gray-500">
                  <div>{document.fileSize}</div>
                  <div>{document.metadata}</div>
                </div>
              ) : (
                <div className="space-y-1 mb-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <span>📱</span>
                    <span>+91 9955955191</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📧</span>
                    <span>franchise@momomagics.com</span>
                  </div>
                </div>
              )}

              {/* Download/Contact Button */}
              <button
                onClick={() => handleDownload(document)}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                  document.type === 'download'
                    ? 'bg-premium-orange text-pitch-black hover:bg-golden-glow'
                    : 'border-2 border-premium-orange text-premium-orange hover:bg-premium-orange hover:text-pitch-black'
                }`}
              >
                {document.type === 'download' ? 'Download' : 'Call Now'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-16 text-center"
        >
          <div className="bg-deep-space border border-charcoal rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Need More Information?</h3>
            <p className="text-gray-400 mb-6">
              Our franchise development team is available to answer all your questions and guide you
              through the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  window.location.href = 'tel:+919955955191';
                }}
                className="bg-premium-orange text-pitch-black px-8 py-3 rounded-lg font-semibold hover:bg-golden-glow transition-all duration-300 hover:scale-105"
              >
                📞 Call: +91 9955955191
              </button>
              <button
                onClick={() => {
                  window.location.href = 'https://wa.me/919955955191';
                }}
                className="border-2 border-premium-orange text-premium-orange px-8 py-3 rounded-lg font-semibold hover:bg-premium-orange hover:text-pitch-black transition-all duration-300 hover:scale-105"
              >
                💬 WhatsApp Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
