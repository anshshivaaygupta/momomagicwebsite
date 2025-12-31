'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { jobCategories, workBenefits } from '@/data/legalData';

export default function CareersPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    position: '',
    experience: '',
    expectedSalary: '',
    noticePeriod: '',
    motivation: '',
    skills: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        city: '',
        position: '',
        experience: '',
        expectedSalary: '',
        noticePeriod: '',
        motivation: '',
        skills: ''
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-pitch-black text-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-b from-charcoal to-pitch-black py-20 px-4"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-premium-orange">
            Join the Momos Magic Family
          </h1>
          <p className="text-golden-glow text-xl mb-8">
            Be part of Bihar's fastest growing food brand
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/20">
              <div className="text-4xl font-bold text-premium-orange mb-2">2000+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/20">
              <div className="text-4xl font-bold text-premium-orange mb-2">50+</div>
              <div className="text-gray-300">Events Catered</div>
            </div>
            <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/20">
              <div className="text-4xl font-bold text-premium-orange mb-2">15+</div>
              <div className="text-gray-300">Cities Expansion Plan</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Job Categories */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-center text-premium-orange">
            We're Always Looking For
          </h2>
          <p className="text-gray-300 text-center mb-12 text-lg">
            Join our team and grow with us
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-charcoal rounded-lg p-6 border border-premium-orange/10 hover:border-premium-orange/30 transition-all duration-300"
              >
                <div className="text-5xl mb-4 text-center">{category.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-golden-glow text-center">{category.title}</h3>
                <p className="text-gray-400 text-center mb-4 text-sm">{category.subtitle}</p>
                <ul className="space-y-2">
                  {category.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-premium-orange mt-1">✓</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Application Form */}
      <div className="bg-charcoal py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-center text-premium-orange">
              Apply Now
            </h2>
            <p className="text-gray-300 text-center mb-12 text-lg">
              Fill out this form and we'll contact you within 24 hours
            </p>

            {submitSuccess && (
              <div className="bg-vegetarian-green/20 border border-vegetarian-green rounded-lg p-6 mb-8 text-center">
                <div className="text-4xl mb-2">✅</div>
                <h3 className="text-xl font-bold text-vegetarian-green mb-2">Application Submitted Successfully!</h3>
                <p className="text-gray-300">We'll contact you via WhatsApp within 24 hours.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="bg-pitch-black rounded-lg p-6 border border-premium-orange/20">
                <h4 className="text-2xl font-bold mb-6 text-golden-glow">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full bg-charcoal border border-premium-orange/20 rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-charcoal border border-premium-orange/20 rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none"
                      placeholder="Enter your WhatsApp number"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-charcoal border border-premium-orange/20 rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none"
                      placeholder="Enter your email (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Current City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full bg-charcoal border border-premium-orange/20 rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none"
                      placeholder="Enter your city"
                    />
                  </div>
                </div>
              </div>

              {/* Position & Experience */}
              <div className="bg-pitch-black rounded-lg p-6 border border-premium-orange/20">
                <h4 className="text-2xl font-bold mb-6 text-golden-glow">Position & Experience</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Position Applying For *</label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      className="w-full bg-charcoal border border-premium-orange/20 rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none"
                    >
                      <option value="">Select Position</option>
                      <option value="kitchen_staff">Kitchen Staff</option>
                      <option value="delivery_partner">Delivery Partner</option>
                      <option value="customer_support">Customer Support</option>
                      <option value="management_trainee">Management Trainee</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Previous Experience</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full bg-charcoal border border-premium-orange/20 rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none"
                    >
                      <option value="none">No Experience</option>
                      <option value="0-1">0-1 Years</option>
                      <option value="1-3">1-3 Years</option>
                      <option value="3-5">3-5 Years</option>
                      <option value="5+">5+ Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Expected Salary (Monthly)</label>
                    <input
                      type="text"
                      name="expectedSalary"
                      value={formData.expectedSalary}
                      onChange={handleChange}
                      className="w-full bg-charcoal border border-premium-orange/20 rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none"
                      placeholder="e.g., ₹10,000 - ₹15,000"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Notice Period</label>
                    <select
                      name="noticePeriod"
                      value={formData.noticePeriod}
                      onChange={handleChange}
                      className="w-full bg-charcoal border border-premium-orange/20 rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none"
                    >
                      <option value="immediate">Immediate</option>
                      <option value="1week">1 Week</option>
                      <option value="2weeks">2 Weeks</option>
                      <option value="1month">1 Month</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-pitch-black rounded-lg p-6 border border-premium-orange/20">
                <h4 className="text-2xl font-bold mb-6 text-golden-glow">Additional Information</h4>
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Why do you want to join Momos Magic? *</label>
                    <textarea
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-charcoal border border-premium-orange/20 rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none resize-none"
                      placeholder="Tell us about your interest in joining our team..."
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Any relevant skills or experience?</label>
                    <textarea
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-charcoal border border-premium-orange/20 rounded-lg px-4 py-3 text-white focus:border-premium-orange focus:outline-none resize-none"
                      placeholder="Mention any relevant skills, certifications, or experience..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-premium-orange text-pitch-black px-12 py-4 rounded-lg font-bold text-lg hover:bg-golden-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
                <p className="text-gray-400 mt-4">
                  We'll contact you via WhatsApp within 24 hours
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Why Work With Us */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-center text-premium-orange">
            Why Work With Momos Magic?
          </h2>
          <p className="text-gray-300 text-center mb-12 text-lg">
            Join a team that values growth, innovation, and excellence
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-charcoal rounded-lg p-6 border border-premium-orange/10 text-center hover:border-premium-orange/30 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h5 className="text-xl font-bold mb-2 text-golden-glow">{benefit.title}</h5>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-b from-charcoal to-pitch-black py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-premium-orange">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Don't see the right position? Send us your resume anyway!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919955955191"
              className="bg-premium-orange text-pitch-black px-8 py-3 rounded-lg font-bold hover:bg-golden-glow transition-all duration-300"
            >
              Call Us: +91 9955955191
            </a>
            <a
              href="https://wa.me/919955955191"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-charcoal text-premium-orange border-2 border-premium-orange px-8 py-3 rounded-lg font-bold hover:bg-premium-orange hover:text-pitch-black transition-all duration-300"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
