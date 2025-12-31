'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ContentAnalytics } from '@/components/cms/ContentAnalytics';
import { ImageDropZone } from '@/components/cms/ImageDropZone';
import { InlineEditor } from '@/components/cms/InlineEditor';
import { VisualDesignPanel } from '@/components/cms/VisualDesignPanel';
import { PublishControls } from '@/components/cms/PublishControls';

interface ContactData {
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
  };
  phone: string;
  website: string;
  businessHours: {
    weekdays: string;
    weekends: string;
    note: string;
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  mapEmbedUrl: string;
  mapImage?: string;
}

export default function ContactCMSPage() {
  const [contactData, setContactData] = useState<ContactData>({
    address: {
      line1: 'Naya Bazar, Near Post Office',
      line2: '',
      city: 'Sherghati',
      state: 'Bihar',
      pincode: '824211',
    },
    phone: '+91 9955955191',
    website: 'www.momomegics.com',
    businessHours: {
      weekdays: '10:00 AM - 10:00 PM',
      weekends: '10:00 AM - 10:00 PM',
      note: 'Open Every Day',
    },
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
    },
    mapEmbedUrl: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadContactData();
  }, []);

  const loadContactData = async () => {
    try {
      const response = await fetch('/api/cms/contact');
      if (response.ok) {
        const data = await response.json();
        setContactData({
          ...data,
          businessHours: data.businessHours || {
            weekdays: '10:00 AM - 10:00 PM',
            weekends: '10:00 AM - 10:00 PM',
            note: 'Open Every Day',
          },
          socialMedia: data.socialMedia || {
            facebook: '',
            instagram: '',
            twitter: '',
          },
        });
      }
    } catch (error) {
      console.error('Error loading contact data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveContactData = async () => {
    setIsSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/cms/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        setMessage('✅ Contact information saved successfully!');
      } else {
        setMessage('❌ Failed to save contact information');
      }
    } catch (error) {
      setMessage('❌ Error saving contact information');
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">📞</div>
          <p className="text-golden-glow">Loading contact information...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PublishControls
        pageName="contact"
        onSave={saveContactData}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-premium-orange mb-2">
              Contact Information CMS
            </h1>
            <p className="text-foreground/70">
              Manage your business contact details
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={saveContactData}
            disabled={isSaving}
          >
            {isSaving ? '⏳ Saving...' : '💾 Save Changes'}
          </Button>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message.includes('✅')
                ? 'bg-vegetarian-green/20 border border-vegetarian-green'
                : 'bg-warm-orange/20 border border-warm-orange'
            }`}
          >
            <p className="text-foreground">{message}</p>
          </motion.div>
        )}

        <div className="space-y-6">
          {/* Address Section */}
          <Card>
            <h2 className="text-2xl font-bold text-golden-glow mb-6">📍 Address</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">
                  Address Line 1
                </label>
                <InlineEditor
                  value={contactData.address.line1}
                  onChange={(value) => setContactData({
                    ...contactData,
                    address: { ...contactData.address, line1: value }
                  })}
                  onSave={saveContactData}
                  placeholder="Naya Bazar, Near Post Office"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">
                  Address Line 2 (Optional)
                </label>
                <InlineEditor
                  value={contactData.address.line2}
                  onChange={(value) => setContactData({
                    ...contactData,
                    address: { ...contactData.address, line2: value }
                  })}
                  onSave={saveContactData}
                  placeholder="Additional address details"
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    City
                  </label>
                  <InlineEditor
                    value={contactData.address.city}
                    onChange={(value) => setContactData({
                      ...contactData,
                      address: { ...contactData.address, city: value }
                    })}
                    onSave={saveContactData}
                    placeholder="City"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    State
                  </label>
                  <InlineEditor
                    value={contactData.address.state}
                    onChange={(value) => setContactData({
                      ...contactData,
                      address: { ...contactData.address, state: value }
                    })}
                    onSave={saveContactData}
                    placeholder="State"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Pincode
                  </label>
                  <InlineEditor
                    value={contactData.address.pincode}
                    onChange={(value) => setContactData({
                      ...contactData,
                      address: { ...contactData.address, pincode: value }
                    })}
                    onSave={saveContactData}
                    placeholder="Pincode"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Details */}
          <Card>
            <h2 className="text-2xl font-bold text-golden-glow mb-6">📞 Contact Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">
                  Phone Number
                </label>
                <InlineEditor
                  value={contactData.phone}
                  onChange={(value) => setContactData({ ...contactData, phone: value })}
                  onSave={saveContactData}
                  placeholder="+91 9955955191"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">
                  Website
                </label>
                <InlineEditor
                  value={contactData.website}
                  onChange={(value) => setContactData({ ...contactData, website: value })}
                  onSave={saveContactData}
                  placeholder="www.momomegics.com"
                  className="w-full"
                />
              </div>
            </div>
          </Card>

          {/* Business Hours */}
          <Card>
            <h2 className="text-2xl font-bold text-golden-glow mb-6">⏰ Business Hours</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">
                  Weekdays
                </label>
                <InlineEditor
                  value={contactData.businessHours.weekdays}
                  onChange={(value) => setContactData({
                    ...contactData,
                    businessHours: { ...contactData.businessHours, weekdays: value }
                  })}
                  onSave={saveContactData}
                  placeholder="10:00 AM - 10:00 PM"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">
                  Weekends
                </label>
                <InlineEditor
                  value={contactData.businessHours.weekends}
                  onChange={(value) => setContactData({
                    ...contactData,
                    businessHours: { ...contactData.businessHours, weekends: value }
                  })}
                  onSave={saveContactData}
                  placeholder="10:00 AM - 10:00 PM"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">
                  Note
                </label>
                <InlineEditor
                  value={contactData.businessHours.note}
                  onChange={(value) => setContactData({
                    ...contactData,
                    businessHours: { ...contactData.businessHours, note: value }
                  })}
                  onSave={saveContactData}
                  placeholder="Open Every Day"
                  className="w-full"
                />
              </div>
            </div>
          </Card>

          {/* Social Media */}
          <Card>
            <h2 className="text-2xl font-bold text-golden-glow mb-6">📱 Social Media</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">
                  Facebook URL
                </label>
                <InlineEditor
                  value={contactData.socialMedia.facebook}
                  onChange={(value) => setContactData({
                    ...contactData,
                    socialMedia: { ...contactData.socialMedia, facebook: value }
                  })}
                  onSave={saveContactData}
                  placeholder="https://facebook.com/momomagic"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">
                  Instagram URL
                </label>
                <InlineEditor
                  value={contactData.socialMedia.instagram}
                  onChange={(value) => setContactData({
                    ...contactData,
                    socialMedia: { ...contactData.socialMedia, instagram: value }
                  })}
                  onSave={saveContactData}
                  placeholder="https://instagram.com/momomagic"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">
                  Twitter URL
                </label>
                <InlineEditor
                  value={contactData.socialMedia.twitter}
                  onChange={(value) => setContactData({
                    ...contactData,
                    socialMedia: { ...contactData.socialMedia, twitter: value }
                  })}
                  onSave={saveContactData}
                  placeholder="https://twitter.com/momomagic"
                  className="w-full"
                />
              </div>
            </div>
          </Card>

          {/* Map Embed */}
          <Card>
            <h2 className="text-2xl font-bold text-golden-glow mb-6">🗺️ Google Maps Embed</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">
                  Google Maps Embed URL
                </label>
                <InlineEditor
                  value={contactData.mapEmbedUrl}
                  onChange={(value) => setContactData({ ...contactData, mapEmbedUrl: value })}
                  onSave={saveContactData}
                  multiline={true}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  className="w-full"
                />
                <p className="mt-2 text-xs text-foreground/60">
                  Get the embed URL from Google Maps → Share → Embed a map
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">
                  Location Map Image
                </label>
                <ImageDropZone
                  currentImage={contactData.mapImage || ''}
                  onImageChange={(url) => setContactData({ ...contactData, mapImage: url })}
                  onUpload={async (file) => {
                    const formData = new FormData();
                    formData.append('file', file);
                    const response = await fetch('/api/cms/media/upload', {
                      method: 'POST',
                      body: formData,
                    });
                    if (response.ok) {
                      const data = await response.json();
                      return data.url;
                    }
                    throw new Error('Upload failed');
                  }}
                  alt="Location map"
                  height="200px"
                />
              </div>
            </div>
          </Card>

          {/* Content Analytics */}
          <ContentAnalytics
            contentId="contact-page"
            contentType="page"
            analytics={{
              views: 8500,
              engagement: 65,
              conversions: 320,
              lastUpdated: new Date().toISOString(),
              performance: {
                loadTime: 0.9,
                seoScore: 88,
              },
            }}
          />
        </div>

        {/* Visual Design Controls */}
        <VisualDesignPanel pageName="contact" onSave={saveContactData} />
      </motion.div>
    </div>
  );
}
