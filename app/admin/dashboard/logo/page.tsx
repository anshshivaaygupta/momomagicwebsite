'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MediaLibraryPicker } from '@/components/cms/MediaLibraryPicker';
import { PublishControls } from '@/components/cms/PublishControls';

interface LogoSettings {
  headerLogo: string;
  footerLogo: string;
  favicon: string;
  appleTouchIcon: string;
}

const IMAGE_SPECS = {
  headerLogo: {
    width: 200,
    height: 60,
    format: 'PNG with transparency',
    description: 'Main logo displayed in header'
  },
  footerLogo: {
    width: 200,
    height: 60,
    format: 'PNG with transparency',
    description: 'Logo displayed in footer'
  },
  favicon: {
    width: 32,
    height: 32,
    format: 'PNG',
    description: 'Browser tab icon'
  },
  appleTouchIcon: {
    width: 180,
    height: 180,
    format: 'PNG',
    description: 'Mobile home screen icon'
  }
};

export default function LogoManagementPage() {
  const [logos, setLogos] = useState<LogoSettings>({
    headerLogo: '/logo.png',
    footerLogo: '/logo.png',
    favicon: '/favicon.png',
    appleTouchIcon: '/apple-touch-icon.png'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [mediaLibraryOpen, setMediaLibraryOpen] = useState(false);
  const [mediaLibraryField, setMediaLibraryField] = useState<keyof LogoSettings>('headerLogo');
  const fileInputRefs = {
    headerLogo: useRef<HTMLInputElement>(null),
    footerLogo: useRef<HTMLInputElement>(null),
    favicon: useRef<HTMLInputElement>(null),
    appleTouchIcon: useRef<HTMLInputElement>(null)
  };

  useEffect(() => {
    loadLogos();
  }, []);

  const loadLogos = async () => {
    try {
      const response = await fetch('/api/cms/logo');
      if (response.ok) {
        const data = await response.json();
        setLogos(data.logos || logos);
      }
    } catch (error) {
      console.error('Error loading logos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      const response = await fetch('/api/cms/logo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logos),
      });

      if (response.ok) {
        setSaveMessage('✅ Logo settings saved successfully! Changes will reflect immediately on the website.');
      } else {
        setSaveMessage('❌ Failed to save logo settings');
      }
    } catch (error) {
      setSaveMessage('❌ Error saving logo settings');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 5000);
    }
  };

  const handleFileUpload = async (field: keyof LogoSettings, file: File) => {
    setUploadingField(field);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('field', field);

    try {
      const response = await fetch('/api/cms/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setLogos({ ...logos, [field]: data.url });
        setSaveMessage(`✅ ${field} uploaded successfully!`);
      } else {
        setSaveMessage(`❌ Failed to upload ${field}`);
      }
    } catch (error) {
      setSaveMessage(`❌ Error uploading ${field}`);
    } finally {
      setUploadingField(null);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleFileSelect = (field: keyof LogoSettings, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(field, e.target.files[0]);
    }
  };

  const openMediaLibrary = (field: keyof LogoSettings) => {
    setMediaLibraryField(field);
    setMediaLibraryOpen(true);
  };

  const handleMediaSelect = (url: string) => {
    setLogos({ ...logos, [mediaLibraryField]: url });
    setSaveMessage(`✅ ${mediaLibraryField} selected from library!`);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const saveLogoData = async () => {
    await loadLogos();
  };

  if (isLoading) {
  return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🎨</div>
          <p className="text-golden-glow">Loading logo settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PublishControls
        pageName="logo"
        onSave={saveLogoData}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-premium-orange mb-2">
              Logo Management
            </h1>
            <p className="text-foreground/70">
              Manage your brand logos and icons with real-time website updates
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : '💾 Save All Changes'}
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
          {/* Header Logo */}
          <Card>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-golden-glow mb-2">
                  Header Logo
                </h2>
                <p className="text-sm text-foreground/60">
                  {IMAGE_SPECS.headerLogo.description}
                </p>
              </div>
              <span className="px-3 py-1 bg-premium-orange/20 text-premium-orange text-xs font-bold rounded">
                {IMAGE_SPECS.headerLogo.width}×{IMAGE_SPECS.headerLogo.height}px
              </span>
            </div>

            {/* Preview */}
            <div className="h-32 bg-pitch-black rounded-lg mb-4 flex items-center justify-center border border-charcoal">
              {logos.headerLogo ? (
                <img
                  src={logos.headerLogo}
                  alt="Header Logo"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-4xl">🎨</span>
              )}
            </div>

            {/* Specifications */}
            <div className="bg-deep-space rounded-lg p-4 mb-4 border border-charcoal">
              <h3 className="text-sm font-bold text-premium-orange mb-2">📐 Image Specifications</h3>
              <ul className="space-y-1 text-xs text-foreground/70">
                <li>• Dimensions: {IMAGE_SPECS.headerLogo.width}×{IMAGE_SPECS.headerLogo.height}px</li>
                <li>• Format: {IMAGE_SPECS.headerLogo.format}</li>
                <li>• Max Size: 500KB recommended</li>
                <li>• Background: Transparent PNG preferred</li>
              </ul>
            </div>

            {/* URL Input */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground/80 mb-2">
                Logo URL
              </label>
              <input
                type="text"
                value={logos.headerLogo}
                onChange={(e) => setLogos({ ...logos, headerLogo: e.target.value })}
                className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                placeholder="/logo.png"
              />
            </div>

            {/* Upload Button */}
            <div className="flex gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => fileInputRefs.headerLogo.current?.click()}
                disabled={uploadingField === 'headerLogo'}
                className="flex-1"
              >
                {uploadingField === 'headerLogo' ? '⏳ Uploading...' : '📤 Upload'}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => openMediaLibrary('headerLogo')}
                className="flex-1 bg-golden-glow/10 border-golden-glow text-golden-glow hover:bg-golden-glow hover:text-pitch-black"
              >
                📚 Library
              </Button>
              <input
                ref={fileInputRefs.headerLogo}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => handleFileSelect('headerLogo', e)}
                className="hidden"
              />
            </div>
          </Card>

          {/* Footer Logo */}
          <Card>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-golden-glow mb-2">
                  Footer Logo
                </h2>
                <p className="text-sm text-foreground/60">
                  {IMAGE_SPECS.footerLogo.description}
                </p>
              </div>
              <span className="px-3 py-1 bg-premium-orange/20 text-premium-orange text-xs font-bold rounded">
                {IMAGE_SPECS.footerLogo.width}×{IMAGE_SPECS.footerLogo.height}px
              </span>
            </div>

            {/* Preview */}
            <div className="h-32 bg-pitch-black rounded-lg mb-4 flex items-center justify-center border border-charcoal">
              {logos.footerLogo ? (
                <img
                  src={logos.footerLogo}
                  alt="Footer Logo"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-4xl">🎨</span>
              )}
            </div>

            {/* Specifications */}
            <div className="bg-deep-space rounded-lg p-4 mb-4 border border-charcoal">
              <h3 className="text-sm font-bold text-premium-orange mb-2">📐 Image Specifications</h3>
              <ul className="space-y-1 text-xs text-foreground/70">
                <li>• Dimensions: {IMAGE_SPECS.footerLogo.width}×{IMAGE_SPECS.footerLogo.height}px</li>
                <li>• Format: {IMAGE_SPECS.footerLogo.format}</li>
                <li>• Max Size: 500KB recommended</li>
                <li>• Background: Transparent PNG preferred</li>
              </ul>
            </div>

            {/* URL Input */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground/80 mb-2">
                Logo URL
              </label>
              <input
                type="text"
                value={logos.footerLogo}
                onChange={(e) => setLogos({ ...logos, footerLogo: e.target.value })}
                className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                placeholder="/logo.png"
              />
            </div>

            {/* Upload Button */}
            <div className="flex gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => fileInputRefs.footerLogo.current?.click()}
                disabled={uploadingField === 'footerLogo'}
                className="flex-1"
              >
                {uploadingField === 'footerLogo' ? '⏳ Uploading...' : '📤 Upload'}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => openMediaLibrary('footerLogo')}
                className="flex-1 bg-golden-glow/10 border-golden-glow text-golden-glow hover:bg-golden-glow hover:text-pitch-black"
              >
                📚 Library
              </Button>
              <input
                ref={fileInputRefs.footerLogo}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => handleFileSelect('footerLogo', e)}
                className="hidden"
              />
            </div>
          </Card>

          {/* Favicon */}
          <Card>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-golden-glow mb-2">
                  Favicon
                </h2>
                <p className="text-sm text-foreground/60">
                  {IMAGE_SPECS.favicon.description}
                </p>
              </div>
              <span className="px-3 py-1 bg-premium-orange/20 text-premium-orange text-xs font-bold rounded">
                {IMAGE_SPECS.favicon.width}×{IMAGE_SPECS.favicon.height}px
              </span>
            </div>

            {/* Preview */}
            <div className="h-32 bg-pitch-black rounded-lg mb-4 flex items-center justify-center border border-charcoal">
              {logos.favicon ? (
                <img
                  src={logos.favicon}
                  alt="Favicon"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-4xl">🎨</span>
              )}
            </div>

            {/* Specifications */}
            <div className="bg-deep-space rounded-lg p-4 mb-4 border border-charcoal">
              <h3 className="text-sm font-bold text-premium-orange mb-2">📐 Image Specifications</h3>
              <ul className="space-y-1 text-xs text-foreground/70">
                <li>• Dimensions: {IMAGE_SPECS.favicon.width}×{IMAGE_SPECS.favicon.height}px</li>
                <li>• Format: {IMAGE_SPECS.favicon.format}</li>
                <li>• Max Size: 100KB recommended</li>
                <li>• Square format required</li>
              </ul>
            </div>

            {/* URL Input */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground/80 mb-2">
                Favicon URL
              </label>
              <input
                type="text"
                value={logos.favicon}
                onChange={(e) => setLogos({ ...logos, favicon: e.target.value })}
                className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                placeholder="/favicon.png"
              />
            </div>

            {/* Upload Button */}
            <div className="flex gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => fileInputRefs.favicon.current?.click()}
                disabled={uploadingField === 'favicon'}
                className="flex-1"
              >
                {uploadingField === 'favicon' ? '⏳ Uploading...' : '📤 Upload'}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => openMediaLibrary('favicon')}
                className="flex-1 bg-golden-glow/10 border-golden-glow text-golden-glow hover:bg-golden-glow hover:text-pitch-black"
              >
                📚 Library
              </Button>
              <input
                ref={fileInputRefs.favicon}
                type="file"
                accept="image/png,image/x-icon"
                onChange={(e) => handleFileSelect('favicon', e)}
                className="hidden"
              />
            </div>
          </Card>

          {/* Apple Touch Icon */}
          <Card>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-golden-glow mb-2">
                  Apple Touch Icon
                </h2>
                <p className="text-sm text-foreground/60">
                  {IMAGE_SPECS.appleTouchIcon.description}
                </p>
              </div>
              <span className="px-3 py-1 bg-premium-orange/20 text-premium-orange text-xs font-bold rounded">
                {IMAGE_SPECS.appleTouchIcon.width}×{IMAGE_SPECS.appleTouchIcon.height}px
              </span>
            </div>

            {/* Preview */}
            <div className="h-32 bg-pitch-black rounded-lg mb-4 flex items-center justify-center border border-charcoal">
              {logos.appleTouchIcon ? (
                <img
                  src={logos.appleTouchIcon}
                  alt="Apple Touch Icon"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-4xl">🎨</span>
              )}
            </div>

            {/* Specifications */}
            <div className="bg-deep-space rounded-lg p-4 mb-4 border border-charcoal">
              <h3 className="text-sm font-bold text-premium-orange mb-2">📐 Image Specifications</h3>
              <ul className="space-y-1 text-xs text-foreground/70">
                <li>• Dimensions: {IMAGE_SPECS.appleTouchIcon.width}×{IMAGE_SPECS.appleTouchIcon.height}px</li>
                <li>• Format: {IMAGE_SPECS.appleTouchIcon.format}</li>
                <li>• Max Size: 200KB recommended</li>
                <li>• Square format required</li>
              </ul>
            </div>

            {/* URL Input */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground/80 mb-2">
                Icon URL
              </label>
              <input
                type="text"
                value={logos.appleTouchIcon}
                onChange={(e) => setLogos({ ...logos, appleTouchIcon: e.target.value })}
                className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                placeholder="/apple-touch-icon.png"
              />
            </div>

            {/* Upload Button */}
            <div className="flex gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => fileInputRefs.appleTouchIcon.current?.click()}
                disabled={uploadingField === 'appleTouchIcon'}
                className="flex-1"
              >
                {uploadingField === 'appleTouchIcon' ? '⏳ Uploading...' : '📤 Upload'}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => openMediaLibrary('appleTouchIcon')}
                className="flex-1 bg-golden-glow/10 border-golden-glow text-golden-glow hover:bg-golden-glow hover:text-pitch-black"
              >
                📚 Library
              </Button>
              <input
                ref={fileInputRefs.appleTouchIcon}
                type="file"
                accept="image/png"
                onChange={(e) => handleFileSelect('appleTouchIcon', e)}
                className="hidden"
              />
            </div>
          </Card>
        </div>

        {/* Tips Card */}
        <Card className="mt-8 bg-deep-space/50">
          <h3 className="text-lg font-bold text-golden-glow mb-3">
            💡 Logo Management Tips
          </h3>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li>• <strong>Header/Footer Logo:</strong> Use transparent PNG for best results. Recommended size: 200×60px</li>
            <li>• <strong>Favicon:</strong> Small icon shown in browser tabs. Must be 32×32px PNG or ICO format</li>
            <li>• <strong>Apple Touch Icon:</strong> Used when users add your site to their iPhone home screen. Must be 180×180px PNG</li>
            <li>• <strong>File Upload:</strong> Click "Upload" buttons to select files from your computer</li>
            <li>• <strong>URL Input:</strong> Or paste direct URLs to images hosted elsewhere</li>
            <li>• <strong>Real-Time Updates:</strong> Changes are saved to database and reflected immediately on the website</li>
            <li>• <strong>Image Optimization:</strong> Keep file sizes small for faster loading (under 500KB for logos)</li>
          </ul>
        </Card>
      </motion.div>

      {/* Media Library Picker */}
      <MediaLibraryPicker
        isOpen={mediaLibraryOpen}
        onClose={() => setMediaLibraryOpen(false)}
        onSelect={handleMediaSelect}
        fileType="image"
      />
    </div>
  );
}
