'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface HeroContent {
  headline: string;
  subheadline: string;
  primaryCTA: string;
  secondaryCTA: string;
  badges: string[];
  backgroundVideo: string;
}

export default function HeroCMSPage() {
  const [content, setContent] = useState<HeroContent>({
    headline: 'From Humble Stall to Culinary Legend',
    subheadline: 'Experience the Magic That Transformed Sherghati\'s Street Food Scene',
    primaryCTA: 'Order Now',
    secondaryCTA: 'Our Story',
    badges: [
      'Awarded "Best Quality Food in City"',
      'FSSAI Certified: 20424201001152',
      '100% Pure Vegetarian · Since 2023',
      '⭐ 4.9/5 (2000+ Happy Customers)'
    ],
    backgroundVideo: '/videos/hero-bg.mp4'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      const response = await fetch('/api/cms/hero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        setSaveMessage('✅ Hero section updated successfully!');
      } else {
        setSaveMessage('❌ Failed to update hero section');
      }
    } catch (error) {
      setSaveMessage('❌ Error saving changes');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const updateBadge = (index: number, value: string) => {
    const newBadges = [...content.badges];
    newBadges[index] = value;
    setContent({ ...content, badges: newBadges });
  };

  const addBadge = () => {
    setContent({ ...content, badges: [...content.badges, 'New Badge'] });
  };

  const removeBadge = (index: number) => {
    const newBadges = content.badges.filter((_, i) => i !== index);
    setContent({ ...content, badges: newBadges });
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-premium-orange mb-2">
              Hero Section CMS
            </h1>
            <p className="text-foreground/70">
              Edit your homepage hero section content
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : '💾 Save Changes'}
          </Button>
        </div>

        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              saveMessage.includes('✅')
                ? 'bg-vegetarian-green/20 border border-vegetarian-green'
                : 'bg-warm-orange/20 border border-warm-orange'
            }`}
          >
            <p className="text-foreground">{saveMessage}</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl font-bold text-golden-glow mb-6">
                Content Editor
              </h2>

              <div className="space-y-6">
                {/* Headline */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={content.headline}
                    onChange={(e) => setContent({ ...content, headline: e.target.value })}
                    className="w-full px-4 py-3 bg-deep-space border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    placeholder="Enter main headline"
                  />
                  <p className="text-xs text-foreground/60 mt-1">
                    Large, bold text at the top of the hero section
                  </p>
                </div>

                {/* Subheadline */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Subheadline
                  </label>
                  <textarea
                    value={content.subheadline}
                    onChange={(e) => setContent({ ...content, subheadline: e.target.value })}
                    className="w-full px-4 py-3 bg-deep-space border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    rows={3}
                    placeholder="Enter subheadline"
                  />
                  <p className="text-xs text-foreground/60 mt-1">
                    Supporting text below the main headline
                  </p>
                </div>

                {/* Primary CTA */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Primary Button Text
                  </label>
                  <input
                    type="text"
                    value={content.primaryCTA}
                    onChange={(e) => setContent({ ...content, primaryCTA: e.target.value })}
                    className="w-full px-4 py-3 bg-deep-space border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    placeholder="e.g., Order Now"
                  />
                </div>

                {/* Secondary CTA */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Secondary Button Text
                  </label>
                  <input
                    type="text"
                    value={content.secondaryCTA}
                    onChange={(e) => setContent({ ...content, secondaryCTA: e.target.value })}
                    className="w-full px-4 py-3 bg-deep-space border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    placeholder="e.g., Our Story"
                  />
                </div>

                {/* Background Video */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Background Video URL
                  </label>
                  <input
                    type="text"
                    value={content.backgroundVideo}
                    onChange={(e) => setContent({ ...content, backgroundVideo: e.target.value })}
                    className="w-full px-4 py-3 bg-deep-space border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    placeholder="/videos/hero-bg.mp4"
                  />
                  <p className="text-xs text-foreground/60 mt-1">
                    Path to background video file
                  </p>
                </div>

                {/* Badges */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-semibold text-foreground/80">
                      Achievement Badges
                    </label>
                    <button
                      onClick={addBadge}
                      className="text-sm text-premium-orange hover:text-golden-glow transition-colors"
                    >
                      + Add Badge
                    </button>
                  </div>
                  <div className="space-y-3">
                    {content.badges.map((badge, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={badge}
                          onChange={(e) => updateBadge(index, e.target.value)}
                          className="flex-1 px-4 py-2 bg-deep-space border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors text-sm"
                        />
                        <button
                          onClick={() => removeBadge(index)}
                          className="px-3 py-2 bg-warm-orange/20 text-warm-orange rounded-lg hover:bg-warm-orange/30 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl font-bold text-golden-glow mb-6">
                Live Preview
              </h2>

              <div className="bg-pitch-black rounded-lg p-8 border border-charcoal">
                {/* Preview Headline */}
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-golden-glow to-premium-orange mb-4">
                  {content.headline}
                </h1>

                {/* Preview Subheadline */}
                <p className="text-lg text-foreground/80 mb-6">
                  {content.subheadline}
                </p>

                {/* Preview Badges */}
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {content.badges.map((badge, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-foreground/70 bg-deep-space px-4 py-2 rounded-lg border border-charcoal"
                    >
                      <span className="text-golden-glow">✓</span>
                      {badge}
                    </div>
                  ))}
                </div>

                {/* Preview CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-6 py-3 bg-premium-orange text-pitch-black rounded-lg font-bold text-sm">
                    {content.primaryCTA}
                  </button>
                  <button className="px-6 py-3 border-2 border-premium-orange text-premium-orange rounded-lg font-bold text-sm">
                    {content.secondaryCTA}
                  </button>
                </div>

                {/* Background Video Info */}
                <div className="mt-6 pt-6 border-t border-charcoal">
                  <p className="text-xs text-foreground/60">
                    Background Video: {content.backgroundVideo}
                  </p>
                </div>
              </div>
            </Card>

            {/* Tips Card */}
            <Card className="bg-deep-space/50">
              <h3 className="text-lg font-bold text-golden-glow mb-3">
                💡 Tips
              </h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Keep headlines short and impactful (under 60 characters)</li>
                <li>• Use action-oriented CTA button text</li>
                <li>• Badges should highlight key achievements</li>
                <li>• Background video should be optimized for web (under 10MB)</li>
                <li>• Changes are saved to database and reflected immediately</li>
              </ul>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
