'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const CateringGallery: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Priya & Rahul',
      event: 'Wedding Reception',
      rating: 5,
      comment: 'Momos Magic made our wedding reception unforgettable! The Royal Package was worth every rupee. Guests are still talking about the live momos counter!',
      image: '💒',
      date: 'March 2025',
    },
    {
      id: 2,
      name: 'Tech Solutions Pvt Ltd',
      event: 'Annual Office Party',
      rating: 5,
      comment: 'Professional service, amazing taste, and perfect timing. The Office Party Package was ideal for our 80-person team celebration.',
      image: '🏢',
      date: 'February 2025',
    },
    {
      id: 3,
      name: 'Anjali Sharma',
      event: 'Birthday Celebration',
      rating: 5,
      comment: 'My daughter\'s 10th birthday was a hit! The themed presentation and fun serving style made it extra special. Highly recommended!',
      image: '🎂',
      date: 'January 2025',
    },
  ];

  const eventPhotos = [
    { id: 1, title: 'Wedding Setup', emoji: '💒', description: 'Elegant wedding catering setup' },
    { id: 2, title: 'Live Counter', emoji: '🥟', description: 'Fresh momos being prepared' },
    { id: 3, title: 'Office Party', emoji: '🏢', description: 'Corporate event catering' },
    { id: 4, title: 'Birthday Bash', emoji: '🎂', description: 'Fun birthday celebration' },
    { id: 5, title: 'Premium Setup', emoji: '✨', description: 'Luxury serving arrangements' },
    { id: 6, title: 'Happy Guests', emoji: '😊', description: 'Satisfied customers enjoying' },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-premium-orange mb-3">
              See Our Previous Events
            </h3>
            <p className="text-lg text-foreground/70">
              Real stories from real events - see why customers love Momos Magic catering
            </p>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-deep-space border-2 border-charcoal rounded-xl p-6 hover:border-premium-orange hover:shadow-[0_0_20px_rgba(255,194,65,0.2)] transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Image Placeholder */}
                <div className="w-20 h-20 bg-charcoal rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">
                  {testimonial.image}
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-golden-glow text-xl">
                      ⭐
                    </span>
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-foreground/80 mb-4 text-center italic">
                  "{testimonial.comment}"
                </p>

                {/* Author */}
                <div className="text-center">
                  <p className="font-bold text-premium-orange">{testimonial.name}</p>
                  <p className="text-xs text-foreground/60">{testimonial.event}</p>
                  <p className="text-xs text-foreground/50 mt-1">{testimonial.date}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Event Photos Gallery */}
          <div>
            <h4 className="text-2xl font-bold text-golden-glow mb-6 text-center">Event Gallery</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {eventPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  className="bg-deep-space border-2 border-charcoal rounded-lg p-4 hover:border-premium-orange hover:shadow-[0_0_15px_rgba(255,194,65,0.2)] transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-5xl mb-2 text-center">{photo.emoji}</div>
                  <p className="text-xs font-semibold text-foreground text-center">{photo.title}</p>
                  <p className="text-xs text-foreground/50 text-center mt-1">{photo.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="mt-12 text-center bg-deep-space border-2 border-premium-orange/30 rounded-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h4 className="text-2xl font-bold text-golden-glow mb-3">
              Ready to Make Your Event Memorable?
            </h4>
            <p className="text-foreground/70 mb-6">
              Join 50+ satisfied customers who trusted Momos Magic for their special events
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+919955955191"
                className="px-8 py-3 bg-premium-orange text-pitch-black rounded-lg font-bold hover:bg-golden-glow transition-colors duration-300"
              >
                📞 Call: +91 9955955191
              </a>
              <a
                href="https://wa.me/919955955191"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-transparent border-2 border-premium-orange text-premium-orange rounded-lg font-bold hover:bg-premium-orange hover:text-pitch-black transition-all duration-300"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
