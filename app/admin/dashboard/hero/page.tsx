'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MediaLibraryPicker } from '@/components/cms/MediaLibraryPicker';
import { ImageDropZone } from '@/components/cms/ImageDropZone';
import { ContentAnalytics } from '@/components/cms/ContentAnalytics';
import { ContentStateManager, ContentState } from '@/components/cms/ContentStateManager';
import { InlineEditor } from '@/components/cms/InlineEditor';
import { VisualDesignPanel } from '@/components/cms/VisualDesignPanel';
import { PublishControls } from '@/components/cms/PublishControls';

interface HeroContent {
  headline: string;
  subheadline: string;
  primaryCTA: string;
  secondaryCTA: string;
  badges: string[];
  backgroundVideo: string;
  backgroundImage?: string;
  backgroundType: 'video' | 'image';
  state?: ContentState;
  scheduledDate?: string;
}

const IMAGE_SPECS = {
  heroBackground: {
    width: 1920,
    height: 1080,
    format: 'JPG or PNG',
    description: 'Full HD background for hero section'
  }
};

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
    backgroundVideo: '/videos/hero-bg.mp4',
    backgroundImage: '',
    backgroundType: 'video'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [uploadingFile, setUploadingFile] = useState(false);
  const [mediaLibraryOpen, setMediaLibraryOpen] = useState(false);
  const [mediaLibraryField, setMediaLibraryField] = useState<'video' | 'image'>('image');
  
  const videoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadHeroData();
  }, []);

  const loadHeroData = async () => {
    try {
      const response = await fetch('/api/cms/hero');
      if (response.ok) {
        const data = await response.json();
        setContent({
          headline: data.headline || 'From Humble Stall to Culinary Legend',
          subheadline: data.subheadline || 'Experience the Magic That Transformed Sherghati\'s Street Food Scene',
          primaryCTA: data.primaryCTA || 'Order Now',
          secondaryCTA: data.secondaryCTA || 'Our Story',
          badges: data.badges || [
            'Awarded "Best Quality Food in City"',
            'FSSAI Certified: 20424201001152',
            '100% Pure Vegetarian · Since 2023',
            '⭐ 4.9/5 (2000+ Happy Customers)'
          ],
          backgroundVideo: data.backgroundVideo || '/videos/hero-bg.mp4',
          backgroundImage: data.backgroundImage || '',
          backgroundType: data.backgroundType || 'video'
        });
      }
    } catch (error) {
      console.error('Error loading hero data:', error);
    }
  };

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
        await loadHeroData();
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

  const handleFileUpload = async (file: File, type: 'video' | 'image') => {
    setUploadingFile(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/cms/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (type === 'video') {
          setContent({ ...content, backgroundVideo: data.url, backgroundType: 'video' });
        } else {
          setContent({ ...content, backgroundImage: data.url, backgroundType: 'image' });
        }
        setSaveMessage(`✅ ${type === 'video' ? 'Video' : 'Image'} uploaded successfully!`);
      } else {
        setSaveMessage(`❌ Failed to upload ${type}`);
      }
    } catch (error) {
      setSaveMessage(`❌ Error uploading ${type}`);
    } finally {
      setUploadingFile(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const openMediaLibrary = (field: 'video' | 'image') => {
    setMediaLibraryField(field);
    setMediaLibraryOpen(true);
  };

  const handleMediaSelect = (url: string) => {
    if (mediaLibraryField === 'video') {
      setContent({ ...content, backgroundVideo: url, backgroundType: 'video' });
    } else {
      setContent({ ...content, backgroundImage: url, backgroundType: 'image' });
    }
    setSaveMessage(`✅ ${mediaLibraryField === 'video' ? 'Video' : 'Image'} selected from library!`);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div>
      <PublishControls
        pageName="hero"
        onSave={handleSave}
      />
      
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
                  <InlineEditor
                    value={content.headline}
                    onChange={(value) => setContent({ ...content, headline: value })}
                    onSave={handleSave}
                    placeholder="Enter main headline"
                    className="w-full text-lg font-semibold"
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
                  <InlineEditor
                    value={content.subheadline}
                    onChange={(value) => setContent({ ...content, subheadline: value })}
                    onSave={handleSave}
                    placeholder="Enter subheadline"
                    multiline={true}
                    className="w-full"
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
                  <InlineEditor
                    value={content.primaryCTA}
                    onChange={(value) => setContent({ ...content, primaryCTA: value })}
                    onSave={handleSave}
                    placeholder="e.g., Order Now"
                    className="w-full"
                  />
                </div>

                {/* Secondary CTA */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Secondary Button Text
                  </label>
                  <InlineEditor
                    value={content.secondaryCTA}
                    onChange={(value) => setContent({ ...content, secondaryCTA: value })}
                    onSave={handleSave}
                    placeholder="e.g., Our Story"
                    className="w-full"
                  />
                </div>

                {/* Background Media Section */}
                <div className="space-y-6 p-6 bg-pitch-black border border-charcoal rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-golden-glow">🎬 Background Media</h3>
                    <div className="text-xs text-foreground/60">
                      {content.backgroundType === 'image' 
                        ? `${IMAGE_SPECS.heroBackground.width}×${IMAGE_SPECS.heroBackground.height}px`
                        : 'MP4 or WebM (under 10MB)'}
                    </div>
                  </div>

                  {/* Background Type Toggle */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Background Type
                    </label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setContent({ ...content, backgroundType: 'video' })}
                        className={`flex-1 px-4 py-3 rounded-lg font-bold transition-all ${
                          content.backgroundType === 'video'
                            ? 'bg-premium-orange text-pitch-black'
                            : 'bg-deep-space text-foreground/70 border border-charcoal hover:border-golden-glow'
                        }`}
                      >
                        🎥 Video
                      </button>
                      <button
                        onClick={() => setContent({ ...content, backgroundType: 'image' })}
                        className={`flex-1 px-4 py-3 rounded-lg font-bold transition-all ${
                          content.backgroundType === 'image'
                            ? 'bg-premium-orange text-pitch-black'
                            : 'bg-deep-space text-foreground/70 border border-charcoal hover:border-golden-glow'
                        }`}
                      >
                        🖼️ Image
                      </button>
                    </div>
                  </div>

                  {/* Video Upload */}
                  {content.backgroundType === 'video' && (
                    <div>
                      <label className="block text-sm font-semibold text-foreground/80 mb-2">
                        Background Video
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={content.backgroundVideo}
                          onChange={(e) => setContent({ ...content, backgroundVideo: e.target.value })}
                          className="flex-1 px-4 py-3 bg-deep-space border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                          placeholder="/videos/hero-bg.mp4"
                        />
                        <input
                          ref={videoInputRef}
                          type="file"
                          accept="video/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, 'video');
                          }}
                          className="hidden"
                        />
                        <button
                          onClick={() => videoInputRef.current?.click()}
                          disabled={uploadingFile}
                          className="px-6 py-3 bg-premium-orange text-pitch-black rounded-lg font-bold hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
                        >
                          {uploadingFile ? '⏳' : '📁'} Upload
                        </button>
                        <button
                          onClick={() => openMediaLibrary('video')}
                          className="px-6 py-3 bg-golden-glow text-pitch-black rounded-lg font-bold hover:-translate-y-0.5 transition-all duration-300"
                        >
                          📚 Library
                        </button>
                      </div>
                      {content.backgroundVideo && (
                        <div className="mt-3 h-32 bg-charcoal rounded-lg overflow-hidden flex items-center justify-center">
                          <video src={content.backgroundVideo} className="w-full h-full object-cover" muted />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Image Upload */}
                  {content.backgroundType === 'image' && (
                    <div>
                      <label className="block text-sm font-semibold text-foreground/80 mb-2">
                        Background Image
                      </label>
                      <ImageDropZone
                        currentImage={content.backgroundImage || ''}
                        onImageChange={(url) => setContent({ ...content, backgroundImage: url })}
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
                        alt="Hero background"
                        height="200px"
                      />
                    </div>
                  )}

                  <p className="text-xs text-foreground/50 pt-2 border-t border-charcoal">
                    💡 Tip: Use high-quality {content.backgroundType === 'video' ? 'videos optimized for web' : 'images in Full HD resolution'} for best results
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
                      <div key={index} className="flex gap-2 items-center">
                        <div className="flex-1">
                          <InlineEditor
                            value={badge}
                            onChange={(value) => updateBadge(index, value)}
                            onSave={handleSave}
                            placeholder="Enter badge text"
                            className="w-full text-sm"
                          />
                        </div>
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
            {/* Content State Manager */}
            <Card>
              <ContentStateManager
                currentState={content.state || 'published'}
                onStateChange={(state) => setContent({ ...content, state })}
                scheduledDate={content.scheduledDate}
                onScheduleDateChange={(scheduledDate) => setContent({ ...content, scheduledDate })}
              />
            </Card>

            {/* Content Analytics */}
            <ContentAnalytics
              contentId="hero-section"
              contentType="page"
              analytics={{
                views: 12500,
                engagement: 78,
                conversions: 450,
                lastUpdated: new Date().toISOString(),
                performance: {
                  loadTime: 1.2,
                  seoScore: 92,
                },
              }}
            />

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

        {/* Visual Design Controls */}
        <VisualDesignPanel pageName="homepage" onSave={handleSave} />
      </motion.div>

      {/* Media Library Picker */}
      <MediaLibraryPicker
        isOpen={mediaLibraryOpen}
        onClose={() => setMediaLibraryOpen(false)}
        onSelect={handleMediaSelect}
        fileType={mediaLibraryField === 'video' ? 'video' : 'image'}
      />
    </div>
  );
}
