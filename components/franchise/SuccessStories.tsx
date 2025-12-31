'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { franchiseTestimonials } from '@/data/franchise';

export function SuccessStories() {
  return (
    <section className="py-20 bg-deep-space">
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
              Hear From Our Future Franchise Partners
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            While we're launching our franchise program, here's what potential partners are saying
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {franchiseTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="bg-pitch-black border border-charcoal rounded-2xl p-8 hover:border-premium-orange transition-all duration-300 hover:shadow-lg hover:shadow-premium-orange/20"
            >
              {/* Quote Icon */}
              <div className="text-5xl text-premium-orange/30 mb-4">"</div>

              {/* Testimonial Content */}
              <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.content}</p>

              {/* Author Info */}
              <div className="border-t border-gray-700 pt-6">
                {/* Author Image Placeholder */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-premium-orange to-golden-glow flex items-center justify-center text-2xl mb-4">
                  👤
                </div>

                {/* Author Name */}
                <div className="font-bold text-white mb-1">{testimonial.authorName}</div>

                {/* Author Title */}
                <div className="text-sm text-gray-400 mb-2">{testimonial.authorTitle}</div>

                {/* Author Status */}
                <div className="inline-flex items-center gap-1 bg-premium-orange/10 border border-premium-orange/30 rounded-full px-3 py-1">
                  <span className="text-xs text-premium-orange font-semibold">
                    {testimonial.authorStatus}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-16 text-center"
        >
          <div className="bg-pitch-black border border-premium-orange/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Join These Visionary Entrepreneurs
            </h3>
            <p className="text-gray-400 mb-6">
              Be part of Bihar's fastest-growing food franchise network. Limited opportunities
              available in select cities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const element = document.getElementById('franchise-form');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-premium-orange text-pitch-black px-8 py-3 rounded-lg font-semibold hover:bg-golden-glow transition-all duration-300 hover:scale-105"
              >
                Apply for Franchise
              </button>
              <button
                onClick={() => {
                  window.location.href = 'tel:+919955955191';
                }}
                className="border-2 border-premium-orange text-premium-orange px-8 py-3 rounded-lg font-semibold hover:bg-premium-orange hover:text-pitch-black transition-all duration-300 hover:scale-105"
              >
                Call Us: +91 9955955191
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
