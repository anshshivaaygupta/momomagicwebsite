'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PublishControls } from '@/components/cms/PublishControls';

interface CTAButton {
  id: string;
  label: string;
  url: string;
  location: string;
  style: 'primary' | 'secondary' | 'outline';
  icon?: string;
  isActive: boolean;
}

const CTA_LOCATIONS = [
  'Hero Section',
  'Menu Page',
  'About Page',
  'Contact Page',
  'Footer',
  'Navigation',
];

const CTA_STYLES = [
  { value: 'primary', label: 'Primary (Orange)', preview: 'bg-premium-orange text-pitch-black' },
  { value: 'secondary', label: 'Secondary (Golden)', preview: 'bg-golden-glow text-pitch-black' },
  { value: 'outline', label: 'Outline', preview: 'border-2 border-premium-orange text-premium-orange' },
];

export default function CTAManagementPage() {
  const [ctas, setCtas] = useState<CTAButton[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    loadCTAs();
  }, []);

  const loadCTAs = async () => {
    try {
      const response = await fetch('/api/cms/cta');
      if (response.ok) {
        const data = await response.json();
        setCtas(data.ctas || []);
      }
    } catch (error) {
      console.error('Error loading CTAs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/cms/cta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ctas }),
      });

      if (response.ok) {
        setSaveMessage('✅ CTAs saved successfully!');
      } else {
        setSaveMessage('❌ Failed to save CTAs');
      }
    } catch (error) {
      setSaveMessage('❌ Error saving CTAs');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const updateCTA = (id: string, updates: Partial<CTAButton>) => {
    setCtas(ctas.map(cta => cta.id === id ? { ...cta, ...updates } : cta));
  };

  const addCTA = () => {
    const newCTA: CTAButton = {
      id: Date.now().toString(),
      label: 'New Button',
      url: '#',
      location: 'Hero Section',
      style: 'primary',
      icon: '🎯',
      isActive: true,
    };
    setCtas([...ctas, newCTA]);
  };

  const deleteCTA = (id: string) => {
    if (confirm('Delete this CTA button?')) {
      setCtas(ctas.filter(cta => cta.id !== id));
    }
  };

  const saveCtaData = async () => {
    await loadCTAs();
  };

  if (isLoading) {
  return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-golden-glow">Loading CTAs...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PublishControls
        pageName="cta"
        onSave={saveCtaData}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-premium-orange mb-2">
              CTA Management
            </h1>
            <p className="text-foreground/70">
              Manage all call-to-action buttons across your website
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={addCTA}>
              ➕ Add CTA
            </Button>
            <Button variant="primary" size="lg" onClick={handleSave}>
              💾 Save All Changes
            </Button>
          </div>
        </div>

        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-deep-space border border-charcoal rounded-lg text-center"
          >
            {saveMessage}
          </motion.div>
        )}

        <div className="grid gap-6">
          {ctas.map((cta) => (
            <Card key={cta.id}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Button Label
                    </label>
                    <input
                      type="text"
                      value={cta.label}
                      onChange={(e) => updateCTA(cta.id, { label: e.target.value })}
                      className="w-full px-4 py-2 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      URL / Link
                    </label>
                    <input
                      type="text"
                      value={cta.url}
                      onChange={(e) => updateCTA(cta.id, { url: e.target.value })}
                      className="w-full px-4 py-2 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Location
                    </label>
                    <select
                      value={cta.location}
                      onChange={(e) => updateCTA(cta.id, { location: e.target.value })}
                      className="w-full px-4 py-2 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow"
                    >
                      {CTA_LOCATIONS.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Button Style
                    </label>
                    <div className="space-y-2">
                      {CTA_STYLES.map(style => (
                        <button
                          key={style.value}
                          onClick={() => updateCTA(cta.id, { style: style.value as any })}
                          className={`w-full px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                            cta.style === style.value
                              ? 'ring-2 ring-golden-glow'
                              : ''
                          } ${style.preview}`}
                        >
                          {style.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={cta.isActive}
                      onChange={(e) => updateCTA(cta.id, { isActive: e.target.checked })}
                      className="w-5 h-5"
                    />
                    <label className="text-sm font-semibold text-foreground/80">
                      Active (visible on website)
                    </label>
                  </div>

                  <button
                    onClick={() => deleteCTA(cta.id)}
                    className="w-full px-4 py-2 bg-warm-orange/20 text-warm-orange rounded-lg font-bold hover:bg-warm-orange hover:text-white transition-colors"
                  >
                    🗑️ Delete Button
                  </button>
                </div>
              </div>
            </Card>
          ))}

          {ctas.length === 0 && (
            <Card>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-foreground/80 mb-2">
                  No CTA Buttons Yet
                </h3>
                <p className="text-foreground/60 mb-6">
                  Create your first call-to-action button
                </p>
                <Button variant="primary" onClick={addCTA}>
                  ➕ Add First CTA
                </Button>
              </div>
            </Card>
          )}
        </div>
      </motion.div>
    </div>
  );
}
