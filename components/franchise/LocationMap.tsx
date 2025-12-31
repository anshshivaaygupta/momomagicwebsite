'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  franchiseLocations,
  getAvailableLocations,
  getComingSoonLocations,
  FranchiseLocation,
} from '@/data/franchise';

export function LocationMap() {
  const [selectedCity, setSelectedCity] = useState<FranchiseLocation | null>(null);

  const availableLocations = getAvailableLocations();
  const comingSoonLocations = getComingSoonLocations();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'coming-soon':
        return 'bg-yellow-500';
      case 'sold-out':
        return 'bg-red-500';
      case 'head-office':
        return 'bg-premium-orange';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'coming-soon':
        return 'Coming Soon';
      case 'sold-out':
        return 'Sold Out';
      case 'head-office':
        return 'Head Office';
      default:
        return status;
    }
  };

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
              Franchise Locations Available in Bihar
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We're expanding across Bihar - be the first in your city!
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-pitch-black border border-charcoal rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Bihar Franchise Map</h3>

            {/* Map Container */}
            <div className="relative aspect-square bg-gradient-to-br from-deep-space to-pitch-black rounded-xl border border-gray-700 p-8">
              {/* Map Background */}
              <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M20,30 L80,30 L80,70 L20,70 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>

              {/* City Markers */}
              {franchiseLocations.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="absolute cursor-pointer"
                  style={{
                    top: location.position.top,
                    left: location.position.left,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => setSelectedCity(location)}
                  onMouseEnter={() => setSelectedCity(location)}
                >
                  {/* Marker Dot */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-4 h-4 rounded-full ${getStatusColor(
                      location.status
                    )} shadow-lg relative`}
                  >
                    {/* Pulse Animation for Available */}
                    {location.status === 'available' && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-green-500"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  {/* City Label */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-pitch-black/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-semibold border border-gray-700">
                      {location.city}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Selected City Info */}
              <AnimatePresence>
                {selectedCity && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-4 left-4 right-4 bg-pitch-black/95 backdrop-blur-sm border border-premium-orange rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-white">{selectedCity.city}</h4>
                        <p className="text-sm text-gray-400">{selectedCity.territory}</p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          selectedCity.status
                        )} text-white`}
                      >
                        {getStatusLabel(selectedCity.status)}
                      </div>
                    </div>
                    {selectedCity.status === 'available' && (
                      <div className="text-sm text-premium-orange font-semibold">
                        {selectedCity.availableUnits} franchise{selectedCity.availableUnits > 1 ? 's' : ''} available
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-400">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm text-gray-400">Coming Soon</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-premium-orange" />
                <span className="text-sm text-gray-400">Head Office</span>
              </div>
            </div>
          </motion.div>

          {/* City Lists */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Immediate Availability */}
            <div className="bg-pitch-black border border-charcoal rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span>🎯</span>
                <span>Immediate Availability</span>
              </h4>
              <ul className="space-y-4">
                {availableLocations.map((location) => (
                  <li
                    key={location.id}
                    className="flex items-center justify-between p-4 bg-deep-space rounded-lg border border-gray-700 hover:border-green-500 transition-colors cursor-pointer"
                    onClick={() => setSelectedCity(location)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-white font-semibold">{location.city}</span>
                    </div>
                    <span className="text-green-500 text-sm font-semibold">
                      {location.availableUnits} available
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coming Soon */}
            <div className="bg-pitch-black border border-charcoal rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span>🕒</span>
                <span>Coming Soon (2025)</span>
              </h4>
              <ul className="space-y-4">
                {comingSoonLocations.map((location) => (
                  <li
                    key={location.id}
                    className="flex items-center justify-between p-4 bg-deep-space rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors cursor-pointer"
                    onClick={() => setSelectedCity(location)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="text-white font-semibold">{location.city}</span>
                    </div>
                    <span className="text-yellow-500 text-sm font-semibold">Coming Soon</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
