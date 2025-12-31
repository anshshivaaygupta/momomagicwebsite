'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CateringHero } from '@/components/catering/CateringHero';
import { PackageCard } from '@/components/catering/PackageCard';
import { GuestCalculator } from '@/components/catering/GuestCalculator';
import { MenuCustomizer } from '@/components/catering/MenuCustomizer';
import { QuoteGenerator } from '@/components/catering/QuoteGenerator';
import { BookingForm } from '@/components/catering/BookingForm';
import { CateringGallery } from '@/components/catering/CateringGallery';
import { cateringPackages, cateringCategories } from '@/data/catering';

export default function CateringPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [guestCount, setGuestCount] = useState(100);
  const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>([]);

  const filteredPackages =
    selectedCategory === 'all'
      ? cateringPackages.filter((p) => p.isActive)
      : cateringPackages.filter((p) => p.isActive && p.category === selectedCategory);

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackageId(packageId);
    const element = document.getElementById('quote-generator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookNow = () => {
    const element = document.getElementById('booking-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-pitch-black">
      {/* Hero Section */}
      <CateringHero />

      {/* Booking Process Steps */}
      <section className="py-16 border-t border-charcoal">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-premium-orange mb-12 text-center">
              4 Simple Steps to Your Perfect Event
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  number: '1',
                  title: 'Select Package',
                  description: 'Choose from our curated packages or build your custom package',
                  icon: '📦',
                },
                {
                  number: '2',
                  title: 'Customize Menu',
                  description: 'Select your favorite momos varieties and add-ons',
                  icon: '🥟',
                },
                {
                  number: '3',
                  title: 'Confirm Date',
                  description: 'Check availability and confirm your event date',
                  icon: '📅',
                },
                {
                  number: '4',
                  title: 'Enjoy Magic!',
                  description: 'Relax while we make your event memorable',
                  icon: '🎉',
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-deep-space border-2 border-premium-orange rounded-full flex items-center justify-center text-2xl font-bold text-golden-glow mx-auto">
                      {step.number}
                    </div>
                    <div className="absolute -top-2 -right-2 text-3xl">{step.icon}</div>
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2">{step.title}</h4>
                  <p className="text-sm text-foreground/70">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 border-y border-charcoal" id="packages">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-premium-orange text-pitch-black shadow-[0_10px_25px_rgba(255,194,65,0.3)]'
                  : 'bg-transparent text-foreground/70 border-2 border-premium-orange/30 hover:border-premium-orange hover:-translate-y-0.5'
              }`}
            >
              All Packages
            </button>
            {cateringCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-premium-orange text-pitch-black shadow-[0_10px_25px_rgba(255,194,65,0.3)]'
                    : 'bg-transparent text-foreground/70 border-2 border-premium-orange/30 hover:border-premium-orange hover:-translate-y-0.5'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredPackages.map((pkg, index) => (
                <PackageCard
                  key={pkg.id}
                  package={pkg}
                  index={index}
                  onSelect={handlePackageSelect}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredPackages.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-6xl mb-4">🎯</p>
              <h3 className="text-2xl font-bold text-golden-glow mb-2">No packages found</h3>
              <p className="text-foreground/70 mb-6">Try selecting a different category</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-6 py-3 bg-premium-orange text-pitch-black rounded-lg font-bold hover:bg-golden-glow transition-colors duration-300"
              >
                View All Packages
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Guest Calculator */}
      <GuestCalculator onPackageSelect={handlePackageSelect} />

      {/* Menu Customizer */}
      <MenuCustomizer selectedItems={selectedMenuItems} onItemsChange={setSelectedMenuItems} />

      {/* Quote Generator */}
      {selectedPackageId && (
        <QuoteGenerator
          selectedPackageId={selectedPackageId}
          guestCount={guestCount}
          selectedMenuItems={selectedMenuItems}
          onBookNow={handleBookNow}
        />
      )}

      {/* Catering Gallery */}
      <CateringGallery />

      {/* Booking Form */}
      <BookingForm
        selectedPackageId={selectedPackageId}
        estimatedCost={
          selectedPackageId
            ? require('@/data/catering').calculateEstimatedCost(
                selectedPackageId,
                guestCount,
                selectedMenuItems
              )
            : 0
        }
      />
    </div>
  );
}
