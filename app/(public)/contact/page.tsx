'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const faqs = [
  {
    question: 'What are your operating hours?',
    answer: 'We are open every day from 10:00 AM to 10:00 PM. We never take a day off because we love serving you!'
  },
  {
    question: 'Do you offer home delivery?',
    answer: 'Currently, we offer takeaway only. However, we are working on launching delivery services within a 10KM radius soon. Stay tuned!'
  },
  {
    question: 'Can I place bulk orders for events?',
    answer: 'Absolutely! We love catering to events. Please call us at +91 9955955191 or fill out the contact form with your requirements, and we will get back to you with a custom quote.'
  },
  {
    question: 'Are all your momos vegetarian?',
    answer: 'Yes! We are a 100% pure vegetarian kitchen. All our momos are made with fresh vegetables, paneer, soya, and cheese corn fillings.'
  },
  {
    question: 'What makes your Kurkure Momos special?',
    answer: 'Our Kurkure Momos are the first of their kind in Bihar! They feature a unique crispy, crunchy coating that sets them apart from regular momos. It\'s a must-try!'
  },
  {
    question: 'How can I provide feedback?',
    answer: 'We love hearing from our customers! You can fill out the contact form, call us directly, or leave a review on Google. Your feedback helps us improve.'
  }
];

function ContactPageContent() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!executeRecaptcha) {
      console.error('reCAPTCHA not yet available');
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 5000);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const recaptchaToken = await executeRecaptcha('contact_form_submit');

      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });

        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        setIsSubmitting(false);
        setSubmitError(true);
        console.error('Form submission error:', data.error);

        setTimeout(() => {
          setSubmitError(false);
        }, 5000);
      }
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(true);
      console.error('Form submission error:', error);

      setTimeout(() => {
        setSubmitError(false);
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-pitch-black py-20">
      {/* Section Border */}
      <div className="h-[3px] w-full bg-gradient-to-r from-premium-orange to-transparent mb-12" />
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-premium-orange mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Have questions? Want to place a bulk order? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            id="contact-form"
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-golden-glow mb-6">Send Us a Message</h2>

              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 p-4 bg-golden-glow/20 border-2 border-golden-glow rounded-lg"
                  >
                    <p className="text-golden-glow font-semibold flex items-center gap-2">
                      <span className="text-2xl">✓</span> Message sent successfully! We'll get back to you soon.
                    </p>
                  </motion.div>
                )}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 p-4 bg-warm-orange/20 border-2 border-warm-orange rounded-lg"
                  >
                    <p className="text-warm-orange font-semibold flex items-center gap-2">
                      <span className="text-2xl">✗</span> Failed to send message. Please try again.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground/80 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-deep-space border ${
                      errors.name ? 'border-warm-orange' : 'border-charcoal'
                    } rounded-lg text-foreground focus:outline-none focus:border-premium-orange focus:ring-2 focus:ring-premium-orange/20 transition-all`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-warm-orange">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground/80 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-deep-space border ${
                      errors.email ? 'border-warm-orange' : 'border-charcoal'
                    } rounded-lg text-foreground focus:outline-none focus:border-premium-orange focus:ring-2 focus:ring-premium-orange/20 transition-all`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-warm-orange">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-foreground/80 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-deep-space border ${
                      errors.phone ? 'border-warm-orange' : 'border-charcoal'
                    } rounded-lg text-foreground focus:outline-none focus:border-premium-orange focus:ring-2 focus:ring-premium-orange/20 transition-all`}
                    placeholder="9955955191"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-warm-orange">{errors.phone}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-foreground/80 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-deep-space border ${
                      errors.subject ? 'border-warm-orange' : 'border-charcoal'
                    } rounded-lg text-foreground focus:outline-none focus:border-premium-orange focus:ring-2 focus:ring-premium-orange/20 transition-all`}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="bulk-order">Bulk Order</option>
                    <option value="feedback">Feedback</option>
                    <option value="complaint">Complaint</option>
                    <option value="partnership">Partnership Opportunity</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-warm-orange">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground/80 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 bg-deep-space border ${
                      errors.message ? 'border-warm-orange' : 'border-charcoal'
                    } rounded-lg text-foreground focus:outline-none focus:border-premium-orange focus:ring-2 focus:ring-premium-orange/20 transition-all resize-none`}
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-warm-orange">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full bg-premium-orange text-pitch-black hover:bg-burnt-orange font-bold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span> Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-golden-glow mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📍</div>
                  <div>
                    <h3 className="font-semibold text-premium-orange mb-1">Address</h3>
                    <p className="text-foreground/70">
                      Naya Bazar, Near Post Office<br />
                      Sherghati, Bihar 824211
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-3xl">📞</div>
                  <div>
                    <h3 className="font-semibold text-premium-orange mb-1">Phone</h3>
                    <p className="text-foreground/70">
                      <a href="tel:+919955955191" className="hover:text-golden-glow transition-colors">
                        +91 9955955191
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-3xl">🌐</div>
                  <div>
                    <h3 className="font-semibold text-premium-orange mb-1">Website</h3>
                    <p className="text-foreground/70">www.momomegics.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-3xl">⏰</div>
                  <div>
                    <h3 className="font-semibold text-premium-orange mb-1">Business Hours</h3>
                    <p className="text-foreground/70">
                      10:00 AM - 10:00 PM<br />
                      Open Every Day
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-deep-space to-charcoal border-2 border-golden-glow">
              <h3 className="text-xl font-bold text-golden-glow mb-4">Quick Contact</h3>
              <p className="text-foreground/80 mb-6">
                For immediate assistance or bulk orders, call us directly:
              </p>
              <a
                href="tel:+919955955191"
                className="block text-center px-6 py-4 bg-premium-orange text-pitch-black font-bold text-xl rounded-lg hover:bg-burnt-orange transition-colors duration-300"
              >
                📞 +91 9955955191
              </a>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold text-golden-glow mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 flex items-center justify-center bg-deep-space border border-charcoal rounded-lg hover:border-golden-glow transition-colors text-2xl"
                >
                  📘
                </a>
                <a
                  href="#"
                  className="w-12 h-12 flex items-center justify-center bg-deep-space border border-charcoal rounded-lg hover:border-golden-glow transition-colors text-2xl"
                >
                  📷
                </a>
                <a
                  href="#"
                  className="w-12 h-12 flex items-center justify-center bg-deep-space border border-charcoal rounded-lg hover:border-golden-glow transition-colors text-2xl"
                >
                  🐦
                </a>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Interactive Map Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-premium-orange mb-8 text-center">
            Find Us on the Map
          </h2>
          <Card className="p-4 overflow-hidden">
            <div className="w-full h-[400px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.5234567890!2d84.79919!3d24.568549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDM0JzA2LjgiTiA4NMKwNDgnMDQuMyJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Momos Magic Location - Naya Bazar, Sherghati, Bihar"
              />
            </div>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-premium-orange mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Got questions? We've got answers! Here are some common questions our customers ask.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div
                  className="cursor-pointer"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <Card
                    className={`transition-all duration-300 ${
                      expandedFaq === index
                        ? 'border-premium-orange shadow-lg shadow-premium-orange/20'
                        : 'hover:border-premium-orange/50'
                    }`}
                  >
                    <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground pr-4">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-premium-orange text-2xl flex-shrink-0"
                      >
                        ▼
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {expandedFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-foreground/70 mt-4 leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Still Have Questions CTA */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="p-8 bg-gradient-to-br from-deep-space to-charcoal border-2 border-premium-orange max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-golden-glow mb-4">
                Still Have Questions?
              </h3>
              <p className="text-foreground/80 mb-6">
                Can't find what you're looking for? Feel free to reach out to us directly!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+919955955191"
                  className="px-6 py-3 bg-premium-orange text-pitch-black font-bold rounded-lg hover:bg-burnt-orange transition-colors duration-300"
                >
                  📞 Call Us Now
                </a>
                <button
                  onClick={() => {
                    const form = document.getElementById('contact-form');
                    form?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 border-2 border-premium-orange text-premium-orange font-bold rounded-lg hover:bg-premium-orange hover:text-pitch-black transition-colors duration-300"
                >
                  ✉️ Send a Message
                </button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      <ContactPageContent />
    </GoogleReCaptchaProvider>
  );
}
