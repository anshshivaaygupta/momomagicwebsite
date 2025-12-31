'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OfferTimerProps {
  endDate: string;
  showCountdown: boolean;
}

export const OfferTimer: React.FC<OfferTimerProps> = ({ endDate, showCountdown }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        setIsExpired(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (!showCountdown || isExpired) {
    return null;
  }

  return (
    <motion.div
      className="flex items-center gap-2 bg-warm-orange/20 border border-warm-orange rounded-lg px-3 py-2"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-warm-orange text-sm font-semibold">🕒 Ends in:</span>
      <div className="flex items-center gap-1">
        {timeLeft.days > 0 && (
          <motion.span
            className="bg-warm-orange text-pitch-black px-2 py-1 rounded font-bold text-xs"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {timeLeft.days}d
          </motion.span>
        )}
        <motion.span
          className="bg-warm-orange text-pitch-black px-2 py-1 rounded font-bold text-xs"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
        >
          {timeLeft.hours}h
        </motion.span>
        <motion.span
          className="bg-warm-orange text-pitch-black px-2 py-1 rounded font-bold text-xs"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
        >
          {timeLeft.minutes}m
        </motion.span>
        <motion.span
          className="bg-warm-orange text-pitch-black px-2 py-1 rounded font-bold text-xs"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
        >
          {timeLeft.seconds}s
        </motion.span>
      </div>
    </motion.div>
  );
};
