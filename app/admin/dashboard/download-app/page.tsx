'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ImageDropZone } from '@/components/cms/ImageDropZone';
import { InlineEditor } from '@/components/cms/InlineEditor';
import { VisualDesignPanel } from '@/components/cms/VisualDesignPanel';

interface DownloadAppContent {
  title: string;
  subtitle: string;
  appStoreLink: string;
  playStoreLink: string;
  appIcon: string;
  screenshots: string[];
  features: string[];
  qrCode: string;
}

export default function DownloadAppCMSPage() {
  const [content, setContent] = useState<DownloadAppContent>({
    title: 'Download Momo Magic App',
    subtitle: 'Order your favorite momos anytime, anywhere',
    appStoreLink: 'https://apps.apple.com/app/momo-magic',
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.momomagic',
    appIcon: '/images/app-icon.png',
    screenshots: [
      '/images/app-screenshot-1.png',
      '/images/app-screenshot-2.png',
      '/images/app-screenshot-3.png',
    ],
    features: [
      'Easy ordering with just a few taps',
      'Track your order in real-time',
      'Exclusive app-only deals and discounts',
      'Save your favorite orders',
      'Secure payment options',
    ],
    qrCode: '/images/qr-code.png',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      const response = await fetch('/api/cms/download-app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        setSaveMessage('✅ Download App section updated successfully!');
      } else {
        setSaveMessage('❌ Failed to update Download App section');
      }
    } catch (error) {
      setSaveMessage('❌ Error saving changes');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const addFeature = () => {
    setContent({ ...content, features: [...content.features, 'New Feature'] });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...content.features];
    newFeatures[index] = value;
    setContent({ ...content, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = content.features.filter((_, i) => i !== index);
    setContent({ ...content, features: newFeatures });
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
              Download App CMS
            </h1>
            <p className="text-foreground/70">
              Manage your mobile app download page content
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
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Title
                  </label>
                  <InlineEditor
                    value={content.title}
                    onChange={(value) => setContent({ ...content, title: value })}
                    onSave={handleSave}
                    placeholder="Enter title"
                    className="w-full text-lg font-semibold"
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Subtitle
                  </label>
                  <InlineEditor
                    value={content.subtitle}
                    onChange={(value) => setContent({ ...content, subtitle: value })}
                    onSave={handleSave}
                    placeholder="Enter subtitle"
                    multiline={true}
                    className="w-full"
                  />
                </div>

                {/* App Store Link */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    App Store Link
                  </label>
                  <input
                    type="url"
                    value={content.appStoreLink}
                    onChange={(e) => setContent({ ...content, appStoreLink: e.target.value })}
                    className="w-full px-4 py-3 bg-deep-space border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    placeholder="https://apps.apple.com/..."
                  />
                </div>

                {/* Play Store Link */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Play Store Link
                  </label>
                  <input
                    type="url"
                    value={content.playStoreLink}
                    onChange={(e) => setContent({ ...content, playStoreLink: e.target.value })}
                    className="w-full px-4 py-3 bg-deep-space border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    placeholder="https://play.google.com/..."
                  />
                </div>

                {/* App Icon */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    App Icon
                  </label>
                  <ImageDropZone
                    currentImage={content.appIcon}
                    onImageChange={(url) => setContent({ ...content, appIcon: url })}
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
                    alt="App Icon"
                    height="150px"
                  />
                </div>

                {/* QR Code */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    QR Code
                  </label>
                  <ImageDropZone
                    currentImage={content.qrCode}
                    onImageChange={(url) => setContent({ ...content, qrCode: url })}
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
                    alt="QR Code"
                    height="200px"
                  />
                </div>

                {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-semibold text-foreground/80">
                      App Features
                    </label>
                    <button
                      onClick={addFeature}
                      className="text-sm text-premium-orange hover:text-golden-glow transition-colors"
                    >
                      + Add Feature
                    </button>
                  </div>
                  <div className="space-y-3">
                    {content.features.map((feature, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <div className="flex-1">
                          <InlineEditor
                            value={feature}
                            onChange={(value) => updateFeature(index, value)}
                            onSave={handleSave}
                            placeholder="Enter feature"
                            className="w-full text-sm"
                          />
                        </div>
                        <button
                          onClick={() => removeFeature(index)}
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
                {/* Preview Title */}
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-golden-glow to-premium-orange mb-4">
                  {content.title}
                </h1>

                {/* Preview Subtitle */}
                <p className="text-lg text-foreground/80 mb-6">
                  {content.subtitle}
                </p>

                {/* App Icon Preview */}
                {content.appIcon && (
                  <div className="mb-6">
                    <img
                      src={content.appIcon}
                      alt="App Icon"
                      className="w-24 h-24 rounded-2xl border-2 border-golden-glow"
                    />
                  </div>
                )}

                {/* Download Buttons */}
                <div className="flex flex-col gap-3 mb-6">
                  <a
                    href={content.appStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-pitch-black border-2 border-premium-orange text-premium-orange rounded-lg font-bold text-center hover:bg-premium-orange hover:text-pitch-black transition-all"
                  >
                    📱 Download on App Store
                  </a>
                  <a
                    href={content.playStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-pitch-black border-2 border-vegetarian-green text-vegetarian-green rounded-lg font-bold text-center hover:bg-vegetarian-green hover:text-pitch-black transition-all"
                  >
                    🤖 Get it on Google Play
                  </a>
                </div>

                {/* Features Preview */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-golden-glow mb-3">Features:</h3>
                  <ul className="space-y-2">
                    {content.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-foreground/70">
                        <span className="text-vegetarian-green">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* QR Code Preview */}
                {content.qrCode && (
                  <div className="text-center">
                    <p className="text-sm text-foreground/60 mb-2">Scan to download:</p>
                    <img
                      src={content.qrCode}
                      alt="QR Code"
                      className="w-32 h-32 mx-auto border-2 border-charcoal rounded-lg"
                    />
                  </div>
                )}
              </div>
            </Card>

            {/* Tips Card */}
            <Card className="bg-deep-space/50">
              <h3 className="text-lg font-bold text-golden-glow mb-3">
                💡 Tips
              </h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Use high-quality app icon (1024x1024px recommended)</li>
                <li>• Keep feature descriptions short and impactful</li>
                <li>• Test all download links before publishing</li>
                <li>• QR code should be clear and scannable</li>
                <li>• Update app screenshots regularly</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Visual Design Controls */}
        <VisualDesignPanel pageName="download-app" onSave={handleSave} />
      </motion.div>
    </div>
  );
}
