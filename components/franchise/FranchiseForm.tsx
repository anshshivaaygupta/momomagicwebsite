'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  currentCity: string;
  preferredLocation: string;
  investmentCapacity: string;
  experience: string;
  timeline: string;
  motivation: string;
  questions: string;
  agreeTerms: boolean;
}

export function FranchiseForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    currentCity: '',
    preferredLocation: '',
    investmentCapacity: '',
    experience: '',
    timeline: '',
    motivation: '',
    questions: '',
    agreeTerms: false,
  });

  const totalSteps = 3;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSubmitMessage(
      '✅ Application submitted successfully! We will contact you within 24 hours.'
    );
    setIsSubmitting(false);

    setTimeout(() => {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        currentCity: '',
        preferredLocation: '',
        investmentCapacity: '',
        experience: '',
        timeline: '',
        motivation: '',
        questions: '',
        agreeTerms: false,
      });
      setCurrentStep(1);
      setSubmitMessage('');
    }, 3000);
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <section id="franchise-form" className="py-20 bg-pitch-black">
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
              Start Your Franchise Journey
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Fill out this form and we'll contact you within 24 hours
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-deep-space border border-charcoal rounded-2xl p-8 md:p-12"
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{Math.round(progressPercentage)}% Complete</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-premium-orange to-golden-glow"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-300 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                          className="w-full bg-pitch-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          required
                          className="w-full bg-pitch-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your WhatsApp number"
                          required
                          className="w-full bg-pitch-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Current City *</label>
                        <input
                          type="text"
                          name="currentCity"
                          value={formData.currentCity}
                          onChange={handleInputChange}
                          placeholder="Where do you live?"
                          required
                          className="w-full bg-pitch-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Business Information */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">Business Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-300 mb-2">
                          Preferred Franchise Location *
                        </label>
                        <select
                          name="preferredLocation"
                          value={formData.preferredLocation}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-pitch-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none transition-colors"
                        >
                          <option value="">Select City</option>
                          <option value="patna">Patna</option>
                          <option value="gaya">Gaya</option>
                          <option value="muzaffarpur">Muzaffarpur</option>
                          <option value="other">Other City</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Investment Capacity *</label>
                        <select
                          name="investmentCapacity"
                          value={formData.investmentCapacity}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-pitch-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none transition-colors"
                        >
                          <option value="">Select Range</option>
                          <option value="1-2">₹1-2 Lakhs</option>
                          <option value="2-3">₹2-3 Lakhs</option>
                          <option value="3-5">₹3-5 Lakhs</option>
                          <option value="5+">₹5+ Lakhs</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">
                          Previous Business Experience
                        </label>
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="w-full bg-pitch-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none transition-colors"
                        >
                          <option value="">Select Experience</option>
                          <option value="none">No Experience</option>
                          <option value="food">Food Industry</option>
                          <option value="retail">Retail Business</option>
                          <option value="other">Other Business</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Timeline to Start</label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full bg-pitch-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none transition-colors"
                        >
                          <option value="">Select Timeline</option>
                          <option value="1month">Within 1 Month</option>
                          <option value="3months">1-3 Months</option>
                          <option value="6months">3-6 Months</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Additional Information */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">Additional Information</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-gray-300 mb-2">
                          Why do you want to join Momos Magic franchise?
                        </label>
                        <textarea
                          name="motivation"
                          value={formData.motivation}
                          onChange={handleInputChange}
                          placeholder="Tell us about your motivation and expectations..."
                          rows={4}
                          className="w-full bg-pitch-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none transition-colors resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">
                          Any questions or specific requirements?
                        </label>
                        <textarea
                          name="questions"
                          value={formData.questions}
                          onChange={handleInputChange}
                          placeholder="Your questions about franchise, support, training, etc..."
                          rows={3}
                          className="w-full bg-pitch-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none transition-colors resize-none"
                        />
                      </div>
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleInputChange}
                          required
                          className="mt-1 w-5 h-5 bg-pitch-black border border-gray-700 rounded focus:ring-premium-orange focus:ring-2"
                        />
                        <label className="text-gray-300 text-sm">
                          I agree to receive franchise information and updates via email/phone
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Navigation */}
              <div className="flex justify-between items-center mt-8">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-700 text-gray-400 hover:border-premium-orange hover:text-premium-orange transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-700 disabled:hover:text-gray-400"
                >
                  Previous
                </button>

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3 rounded-lg font-semibold bg-premium-orange text-pitch-black hover:bg-golden-glow transition-all duration-300 hover:scale-105"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.agreeTerms}
                    className="px-8 py-3 rounded-lg font-semibold bg-premium-orange text-pitch-black hover:bg-golden-glow transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                )}
              </div>

              {/* Submit Message */}
              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-center"
                >
                  {submitMessage}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
