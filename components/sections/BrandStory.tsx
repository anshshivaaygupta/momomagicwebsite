'use client';

import React from 'react';
import { motion } from 'framer-motion';

const timelineEvents = [
  {
    date: 'Sep 2023',
    title: 'Humble Beginnings',
    description: 'Started with a small stall in Naya Bazar, Sherghati',
  },
  {
    date: 'Nov 2023',
    title: 'Pita to Momos Transformation',
    description: 'Pivoted from Pita to Momos after understanding market demand',
  },
  {
    date: 'Jan 2024',
    title: 'Kurkure Momos Introduced',
    description: 'Launched exclusive Kurkure Momos - first in Bihar',
  },
  {
    date: 'Jun 2024',
    title: 'Award from DM Office',
    description: 'Received "Best Quality Food in City" award',
  },
  {
    date: 'Dec 2024',
    title: 'Premium Stall Redesign',
    description: 'Upgraded to premium stall with modern setup',
  },
  {
    date: 'Mar 2025',
    title: 'Pizza Momos Launched',
    description: 'Introduced innovative Pizza Momos fusion',
  },
];

export const BrandStory: React.FC = () => {
  return (
    <section id="brand-story" className="py-20 bg-deep-space">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-golden-glow mb-4">
            The Magic Began With a Dream, Not a Recipe
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            From a young entrepreneur's vision to Sherghati's most loved food destination
          </p>
        </motion.div>

        {/* Story Content - Split Screen Design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Side - Story Text with Fade-in Animations */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Story Paragraphs with Individual Fade-in */}
            <motion.p
              className="text-lg text-foreground/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              In September 2023, <span className="text-premium-orange font-semibold">Dhruv Gupta</span>, 
              a young entrepreneur with a dream, started his journey with a simple philosophy: 
              "Better to be a small owner than someone else's employee."
            </motion.p>
            
            <motion.p
              className="text-lg text-foreground/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Initially experimenting with Pita, Dhruv quickly learned from the market. The pivot 
              to momos wasn't just a business decision—it was listening to what people truly wanted. 
              This adaptability became the foundation of Momos Magic.
            </motion.p>
            
            <motion.p
              className="text-lg text-foreground/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              The breakthrough came with <span className="text-golden-glow font-semibold">Kurkure Momos</span>—an 
              innovation nobody in Bihar had attempted. The crispy, crunchy coating combined with 
              perfectly steamed filling created a sensation that put Sherghati on the food map.
            </motion.p>
            
            <motion.p
              className="text-lg text-foreground/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Today, Momos Magic stands as a testament to quality, innovation, and the magic that 
              happens when passion meets perseverance. With the District Magistrate's award for 
              "Best Quality Food" and 2000+ happy customers, the journey continues.
            </motion.p>

            {/* High-Quality Image Placeholder - Founder/Stall */}
            <motion.div
              className="mt-8 rounded-lg overflow-hidden border-2 border-golden-glow/30 hover:border-golden-glow transition-colors duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative aspect-video bg-gradient-to-br from-deep-space to-charcoal flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🥟</div>
                  <p className="text-golden-glow font-semibold">Dhruv Gupta - Founder</p>
                  <p className="text-foreground/60 text-sm">Image Coming Soon</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Philosophy Highlight Box */}
          <motion.div
            className="flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Enhanced Philosophy Box */}
            <motion.div
              className="relative bg-pitch-black border-2 border-golden-glow rounded-lg p-8 text-center shadow-lg shadow-golden-glow/20"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(255, 215, 0, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative Corner Elements */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-premium-orange -translate-x-1 -translate-y-1" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-premium-orange translate-x-1 -translate-y-1" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-premium-orange -translate-x-1 translate-y-1" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-premium-orange translate-x-1 translate-y-1" />
              
              <motion.p
                className="text-3xl md:text-4xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-premium-orange via-golden-glow to-premium-orange mb-4"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                "Quantity bhi Mast,<br />Taste bhi Zabardast"
              </motion.p>
              <p className="text-foreground/70 font-semibold">— Momos Magic Philosophy</p>
            </motion.div>

            {/* High-Quality Image Placeholder - Stall */}
            <motion.div
              className="w-full rounded-lg overflow-hidden border-2 border-golden-glow/30 hover:border-golden-glow transition-colors duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative aspect-video bg-gradient-to-br from-deep-space to-charcoal flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏪</div>
                  <p className="text-golden-glow font-semibold">Momos Magic Stall</p>
                  <p className="text-foreground/60 text-sm">Image Coming Soon</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Timeline - Vertical on Desktop, Horizontal Scroll on Mobile */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-center text-premium-orange mb-12">
            Our Journey
          </h3>

          {/* Desktop Timeline - Vertical */}
          <div className="relative hidden lg:block">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-golden-glow/30" />

            {/* Timeline Events */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <motion.div
                      className="bg-deep-space border border-[#1a1a1a] rounded-xl p-6 hover:border-premium-orange hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,194,65,0.2)] transition-all duration-300 relative before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-premium-orange before:to-transparent before:rounded-t-xl"
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.p
                        className="text-premium-orange font-semibold mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {event.date}
                      </motion.p>
                      <motion.h4
                        className="text-xl font-bold text-golden-glow mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {event.title}
                      </motion.h4>
                      <motion.p
                        className="text-foreground/70"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {event.description}
                      </motion.p>
                    </motion.div>
                  </div>

                  <div className="relative z-10">
                    <motion.div
                      className="w-6 h-6 rounded-full bg-golden-glow border-4 border-pitch-black shadow-lg shadow-golden-glow/50"
                      whileHover={{ scale: 1.8, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline - Horizontal Scroll */}
          <div className="lg:hidden">
            <div className="relative overflow-x-auto pb-8 scrollbar-hide">
              <div className="flex gap-6 px-4" style={{ width: 'max-content' }}>
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <motion.div
                        className="w-4 h-4 rounded-full bg-golden-glow border-2 border-pitch-black shadow-lg shadow-golden-glow/50"
                        whileInView={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      />
                    </div>

                    {/* Timeline Card */}
                    <motion.div
                      className="w-72 bg-deep-space border border-[#1a1a1a] rounded-xl p-6 hover:border-premium-orange hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,194,65,0.2)] transition-all duration-300 relative before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-premium-orange before:to-transparent before:rounded-t-xl"
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-premium-orange font-semibold mb-2">{event.date}</p>
                      <h4 className="text-xl font-bold text-golden-glow mb-2">{event.title}</h4>
                      <p className="text-foreground/70">{event.description}</p>
                    </motion.div>

                    {/* Connecting Line */}
                    {index < timelineEvents.length - 1 && (
                      <div className="absolute top-0 left-full w-6 h-1 bg-golden-glow/30 transform -translate-y-8" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="text-center mt-4">
              <p className="text-foreground/50 text-sm flex items-center justify-center gap-2">
                <span>←</span>
                <span>Swipe to explore our journey</span>
                <span>→</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
