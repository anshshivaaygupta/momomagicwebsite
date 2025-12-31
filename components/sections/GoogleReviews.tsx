'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { fetchGoogleReviews, formatReview, fallbackReviews } from '@/lib/googleReviews';

interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
  url?: string;
}

export const GoogleReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'fallback'>('loading');

  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      const data = await fetchGoogleReviews();
      
      if (data && data.reviews && data.reviews.length > 0) {
        const formattedReviews = data.reviews.map(formatReview);
        setReviews(formattedReviews);
        setApiStatus('success');
      } else {
        setReviews(fallbackReviews);
        setApiStatus('fallback');
      }
      
      setIsLoading(false);
    };

    loadReviews();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const getVisibleReviews = () => {
    const visibleCount = 3;
    const visible = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % reviews.length;
      visible.push({ ...reviews[index], index });
    }
    
    return visible;
  };
  const visibleReviews = getVisibleReviews();

  return (
    <section className="py-20 bg-deep-space">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-golden-glow mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-6">
            2000+ Happy Customers · 4.9/5 Rating on Google
          </p>
          
          {/* Star Rating Display */}
          <div className="flex items-center justify-center gap-2 text-3xl mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.span
                key={star}
                className="text-golden-glow"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: star * 0.1 }}
                whileHover={{ scale: 1.2, rotate: 15 }}
              >
                ⭐
              </motion.span>
            ))}
          </div>

          {/* API Status Indicator */}
          {!isLoading && (
            <motion.p
              className="text-sm text-foreground/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {apiStatus === 'success' ? (
                <span className="text-vegetarian-green">✓ Live reviews from Google</span>
              ) : (
                <span className="text-premium-orange">⚠ Showing featured reviews</span>
              )}
            </motion.p>
          )}
        </motion.div>

        {/* Carousel Container */}
        <div className="relative mb-12">
          {/* Navigation Buttons - Desktop */}
          <div className="hidden lg:block">
            <motion.button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-premium-orange text-pitch-black rounded-full flex items-center justify-center shadow-lg hover:bg-burnt-orange transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous review"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-premium-orange text-pitch-black rounded-full flex items-center justify-center shadow-lg hover:bg-burnt-orange transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next review"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Reviews Carousel - Desktop (3 cards) */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleReviews.map((review, idx) => (
                <motion.div
                  key={`${currentIndex}-${idx}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      {typeof review.avatar === 'string' && review.avatar.startsWith('http') ? (
                        <img 
                          src={review.avatar} 
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="text-4xl">{review.avatar}</div>
                      )}
                      <div>
                        <h4 className="font-semibold text-foreground">{review.name}</h4>
                        <p className="text-sm text-foreground/60">{review.date}</p>
                      </div>
                    </div>

                    <div className="flex gap-1 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <motion.span
                          key={i}
                          className="text-golden-glow text-lg"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          ⭐
                        </motion.span>
                      ))}
                    </div>

                    <p className="text-foreground/80 text-sm flex-grow line-clamp-4">
                      "{review.text}"
                    </p>

                    <div className="mt-4 pt-4 border-t border-charcoal">
                      <p className="text-xs text-foreground/50 flex items-center gap-1">
                        <span className="text-premium-orange font-bold">G</span> Google Review
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Reviews Carousel - Mobile (1 card with swipe) */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -10000) {
                    goToNext();
                  } else if (swipe > 10000) {
                    goToPrevious();
                  }
                }}
              >
                <Card className="h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    {typeof reviews[currentIndex].avatar === 'string' && reviews[currentIndex].avatar.startsWith('http') ? (
                      <img 
                        src={reviews[currentIndex].avatar} 
                        alt={reviews[currentIndex].name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="text-4xl">{reviews[currentIndex].avatar}</div>
                    )}
                    <div>
                      <h4 className="font-semibold text-foreground">{reviews[currentIndex].name}</h4>
                      <p className="text-sm text-foreground/60">{reviews[currentIndex].date}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-3">
                    {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                      <span key={i} className="text-golden-glow text-lg">⭐</span>
                    ))}
                  </div>

                  <p className="text-foreground/80 text-sm flex-grow">
                    "{reviews[currentIndex].text}"
                  </p>

                  <div className="mt-4 pt-4 border-t border-charcoal">
                    <p className="text-xs text-foreground/50 flex items-center gap-1">
                      <span className="text-premium-orange font-bold">G</span> Google Review
                    </p>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <motion.button
                onClick={goToPrevious}
                className="w-10 h-10 bg-premium-orange text-pitch-black rounded-full flex items-center justify-center shadow-lg"
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              <motion.button
                onClick={goToNext}
                className="w-10 h-10 bg-premium-orange text-pitch-black rounded-full flex items-center justify-center shadow-lg"
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-golden-glow'
                    : 'w-2 bg-charcoal hover:bg-premium-orange'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="text-center mt-4">
            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-sm text-foreground/50 hover:text-foreground/80 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {isAutoPlaying ? '⏸ Pause auto-play' : '▶ Resume auto-play'}
            </motion.button>
          </div>
        </div>

        {/* View All Reviews Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="https://www.google.com/maps/place/Momos+Magic"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-premium-orange text-pitch-black font-semibold rounded-lg hover:bg-burnt-orange transition-colors duration-300 shadow-lg shadow-premium-orange/30"
          >
            <span className="text-xl font-bold">G</span>
            Read All Reviews on Google
          </a>
        </motion.div>
      </div>
    </section>
  );
};
