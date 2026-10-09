'use client';
import {useContent} from '@/lib/useContent';
import seed from '@/data/cms/catering.json';
import { openWhatsApp, BUSINESS } from '@/lib/business';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { cateringPackages,calculateEstimatedCost } from '@/data/catering';

interface BookingFormProps {
  selectedPackageId?: string;
  estimatedCost?: number;
}

export const BookingForm: React.FC<BookingFormProps> = ({ selectedPackageId, estimatedCost }) => {
  const {packages:cateringPackages}=useContent<any>('catering',seed);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    eventType: selectedPackageId?.includes('wedding') ? 'wedding' : '',
    guestCount: '',
    eventDate: '',
    eventLocation: '',
    packageId: selectedPackageId || '',
    additionalRequirements: '',
  });

  useEffect(()=>{if(selectedPackageId)setFormData(prev=>({...prev,packageId:selectedPackageId}));},[selectedPackageId]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const bookingEstimate=formData.guestCount&&formData.packageId?calculateEstimatedCost(formData.packageId,Number(formData.guestCount),[],cateringPackages):estimatedCost;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g,'').replace(/^91(?=\d{10}$)/,''))) { alert('Enter a valid 10-digit Indian mobile number.'); return; }
    openWhatsApp('Catering quote enquiry',{'Name':formData.fullName,'Phone':formData.phone,'Email':formData.email,'Event':formData.eventType,'Guests':formData.guestCount,'Date':formData.eventDate,'Venue':formData.eventLocation,'Package':cateringPackages.find((p:any)=>p.id===formData.packageId)?.name||'Custom','Estimated cost':bookingEstimate||'Please quote','Requirements':formData.additionalRequirements});
  };

  return (
    <section className="py-16 bg-deep-space/50" id="booking-form">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-premium-orange mb-3">
              Book Your Catering Service
            </h3>
            <p className="text-lg text-foreground/70">
              Fill in your details to request a quote on WhatsApp.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-deep-space border-2 border-charcoal rounded-xl p-8">
            {/* Your Information */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-golden-glow mb-4">Your Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    placeholder="Enter your WhatsApp number"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-golden-glow mb-4">Event Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Event Type *
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                  >
                    <option value="">Select Event Type</option>
                    <option value="wedding">Wedding</option>
                    <option value="office">Office Party</option>
                    <option value="birthday">Birthday</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Expected Guests *
                  </label>
                  <input
                    type="number"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    required
                    min="10"
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    placeholder="Approximate number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Event Location
                  </label>
                  <input
                    type="text"
                    name="eventLocation"
                    value={formData.eventLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    placeholder="Venue address"
                  />
                </div>
              </div>
            </div>

            {/* Package Selection */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-golden-glow mb-4">Package Selection</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {cateringPackages.map((pkg:any) => (
                  <label
                    key={pkg.id}
                    className={`flex items-center justify-between p-4 bg-pitch-black border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                      formData.packageId === pkg.id
                        ? 'border-premium-orange shadow-[0_0_15px_rgba(255,194,65,0.3)]'
                        : 'border-charcoal hover:border-premium-orange/50'
                    }`}
                  >
                    <div className="flex-1">
                      <input
                        type="radio"
                        name="packageId"
                        value={pkg.id}
                        checked={formData.packageId === pkg.id}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="font-semibold text-foreground">{pkg.name.replace(' Package', '')}</span>
                      <span className="block text-xs text-golden-glow mt-1">
                        {pkg.basePrice > 0 ? `₹${pkg.basePrice.toLocaleString()}` : 'Custom'}
                      </span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        formData.packageId === pkg.id
                          ? 'bg-premium-orange border-premium-orange'
                          : 'border-charcoal'
                      }`}
                    >
                      {formData.packageId === pkg.id && (
                        <div className="w-2 h-2 bg-pitch-black rounded-full" />
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Requirements */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-golden-glow mb-4">Additional Requirements</h4>
              <textarea
                name="additionalRequirements"
                value={formData.additionalRequirements}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors resize-none"
                placeholder="Any special requests, dietary restrictions, or specific requirements?"
              />
            </div>

            {/* Estimated Cost Display */}
            {estimatedCost && estimatedCost > 0 && (
              <div className="mb-8 p-4 bg-pitch-black border border-premium-orange/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-foreground/70">Estimated Cost:</span>
                  <span className="text-2xl font-bold text-premium-orange">
                    ₹{estimatedCost.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-foreground/50 mt-2">
                  * Final cost may vary based on customizations and additional requirements
                </p>
              </div>
            )}

            {/* Submit Message */}
            {submitMessage && (
              <motion.div
                className={`mb-6 p-4 rounded-lg ${
                  submitMessage.includes('✅')
                    ? 'bg-vegetarian-green/20 border border-vegetarian-green'
                    : 'bg-warm-orange/20 border border-warm-orange'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-foreground">{submitMessage}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Continue to WhatsApp'}
            </Button>

            <p className="text-center text-sm text-foreground/60 mt-4">
              💡 WhatsApp opens with your details. Tap Send; the business will confirm availability and price.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

