'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

const services = [
  {
    icon: '🏪',
    title: 'Takeaway Only',
    description: 'Currently Available - Quick pickup for on-the-go cravings',
    color: 'premium-orange',
    status: 'available',
  },
  {
    icon: '🚚',
    title: '10KM Delivery Radius',
    description: 'Coming Soon - Hot momos delivered to your doorstep',
    color: 'golden-glow',
    status: 'coming-soon',
  },
  {
    icon: '📱',
    title: 'Online Ordering',
    description: 'Available via Momo Magic App',
    color: 'warm-orange',
    status: 'available',
  },
  {
    icon: '🎉',
    title: 'Group Order Discounts',
    description: 'Special discounts for bulk orders',
    color: 'vegetarian-green',
    status: 'available',
  },
  {
    icon: '🍽️',
    title: 'Catering Service',
    description: 'Booking Available in App',
    color: 'premium-orange',
    status: 'available',
  },
  {
    icon: '📅',
    title: 'Table Booking',
    description: 'Coming Soon in App',
    color: 'golden-glow',
    status: 'coming-soon',
  },
];

const BUSINESS_HOURS = {
  open: 10,
  close: 22,
};

const LOCATION = {
  address: 'Momo Magic, Naya Bazar, Near Post Office, Sherghati, Bihar 824211',
  phone: '+91 9955955191',
  website: 'www.momomegics.com',
  coordinates: {
    lat: 24.5735,
    lng: 85.1234,
  },
};

export const LocationServices: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const checkBusinessHours = () => {
      const now = new Date();
      const currentHour = now.getHours();
      setIsOpen(currentHour >= BUSINESS_HOURS.open && currentHour < BUSINESS_HOURS.close);
    };

    checkBusinessHours();
    const interval = setInterval(checkBusinessHours, 60000);

    return () => clearInterval(interval);
  }, []);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(LOCATION.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const openDirections = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(LOCATION.address)}`;
    window.open(mapsUrl, '_blank');
  };
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const isDemoKey = !apiKey || apiKey.includes('Demo');

  return (
    <section className="py-20 bg-pitch-black">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-premium-orange mb-4">
            Visit Us & Services
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Find us in the heart of Sherghati · Open Every Day
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full">
              <h3 className="text-2xl font-bold text-golden-glow mb-4">
                📍 Our Location
              </h3>
              
              <div className="space-y-3 mb-6">
                {/* Address with Copy-to-Clipboard */}
                <motion.div 
                  className="flex items-start gap-3 cursor-pointer group"
                  onClick={copyAddress}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-premium-orange text-xl">📍</span>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground flex items-center gap-2">
                      Address
                      <span className="text-xs text-foreground/50 group-hover:text-golden-glow transition-colors">
                        {copied ? '✓ Copied!' : '(Click to copy)'}
                      </span>
                    </p>
                    <p className="text-foreground/70">
                      Naya Bazar, Near Post Office<br />
                      Sherghati, Bihar 824211
                    </p>
                  </div>
                </motion.div>

                {/* Phone with Click-to-Call */}
                <motion.a
                  href={`tel:${LOCATION.phone}`}
                  className="flex items-start gap-3 cursor-pointer group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-premium-orange text-xl">📞</span>
                  <div>
                    <p className="font-semibold text-foreground flex items-center gap-2">
                      Phone
                      <span className="text-xs text-foreground/50 group-hover:text-golden-glow transition-colors">
                        (Click to call)
                      </span>
                    </p>
                    <p className="text-foreground/70 group-hover:text-golden-glow transition-colors">
                      {LOCATION.phone}
                    </p>
                  </div>
                </motion.a>

                {/* Hours with Open/Closed Status */}
                <div className="flex items-start gap-3">
                  <span className="text-premium-orange text-xl">⏰</span>
                  <div>
                    <p className="font-semibold text-foreground flex items-center gap-2">
                      Hours
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isOpen 
                          ? 'bg-vegetarian-green/20 text-vegetarian-green' 
                          : 'bg-warm-orange/20 text-warm-orange'
                      }`}>
                        {isOpen ? '● Open Now' : '● Closed'}
                      </span>
                    </p>
                    <p className="text-foreground/70">
                      10:00 AM - 10:00 PM<br />
                      Open Every Day
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-premium-orange text-xl">🌐</span>
                  <div>
                    <p className="font-semibold text-foreground">Website</p>
                    <p className="text-foreground/70">{LOCATION.website}</p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="bg-charcoal rounded-lg overflow-hidden border border-golden-glow/30 relative">
                {!isDemoKey ? (
                  <motion.div
                    className="aspect-video relative cursor-pointer"
                    onClick={openDirections}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    onLoad={() => setMapLoaded(true)}
                  >
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(LOCATION.address)}&zoom=16&maptype=roadmap`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pitch-black/50 to-transparent pointer-events-none" />
                    <motion.div
                      className="absolute bottom-4 right-4 bg-premium-orange text-pitch-black px-4 py-2 rounded-lg font-semibold shadow-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Click for Directions →
                    </motion.div>
                  </motion.div>
                ) : (
                  <div className="aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-golden-glow text-4xl mb-2">🗺️</p>
                      <p className="text-foreground/70">Google Maps</p>
                      <p className="text-sm text-foreground/50">
                        Naya Bazar, Sherghati
                      </p>
                      <p className="text-xs text-premium-orange mt-2">
                        (Demo mode - Add API key to enable)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <motion.button
                onClick={openDirections}
                className="block w-full mt-4 text-center px-6 py-3 bg-premium-orange text-pitch-black font-semibold rounded-lg hover:bg-burnt-orange transition-colors duration-300 shadow-lg shadow-premium-orange/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Directions on Google Maps →
              </motion.button>
            </Card>
          </motion.div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-golden-glow mb-6">
              Our Services
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      borderColor: '#ffd700',
                      boxShadow: '0 10px 30px rgba(255, 215, 0, 0.2)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="text-center h-full relative overflow-hidden">
                      {/* Status Badge */}
                      {service.status === 'coming-soon' && (
                        <div className="absolute top-2 right-2 bg-premium-orange text-pitch-black text-xs px-2 py-1 rounded-full font-semibold">
                          Coming Soon
                        </div>
                      )}
                      
                      <motion.div 
                        className="text-5xl mb-3"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {service.icon}
                      </motion.div>
                      
                      <h4 className={`text-lg font-semibold text-${service.color} mb-2`}>
                        {service.title}
                      </h4>
                      
                      <p className="text-sm text-foreground/70">
                        {service.description}
                      </p>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-deep-space to-charcoal border-2 border-golden-glow">
              <h4 className="text-xl font-bold text-golden-glow mb-4">
                🎊 Special Offers
              </h4>
              <ul className="space-y-3 text-foreground/80">
                <motion.li 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <span className="text-premium-orange">✓</span>
                  <span>Bulk orders for parties & events (50+ pieces)</span>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <span className="text-premium-orange">✓</span>
                  <span>Free delivery on orders above ₹500 (Coming Soon)</span>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <span className="text-premium-orange">✓</span>
                  <span>Special combo deals available</span>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <span className="text-premium-orange">✓</span>
                  <span>Student discounts on weekdays</span>
                </motion.li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
