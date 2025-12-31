'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PublishControls } from '@/components/cms/PublishControls';

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  color: string;
  isActive: boolean;
}

const SOCIAL_PLATFORMS = [
  { name: 'Facebook', icon: '📘', color: '#1877F2', defaultUrl: 'https://facebook.com/' },
  { name: 'Instagram', icon: '📷', color: '#E4405F', defaultUrl: 'https://instagram.com/' },
  { name: 'Twitter', icon: '🐦', color: '#1DA1F2', defaultUrl: 'https://twitter.com/' },
  { name: 'YouTube', icon: '📺', color: '#FF0000', defaultUrl: 'https://youtube.com/' },
  { name: 'WhatsApp', icon: '💬', color: '#25D366', defaultUrl: 'https://wa.me/' },
  { name: 'LinkedIn', icon: '💼', color: '#0A66C2', defaultUrl: 'https://linkedin.com/' },
  { name: 'TikTok', icon: '🎵', color: '#000000', defaultUrl: 'https://tiktok.com/' },
  { name: 'Telegram', icon: '✈️', color: '#0088cc', defaultUrl: 'https://t.me/' },
];

export default function SocialMediaManagementPage() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');
  const [footerPosition, setFooterPosition] = useState<'left' | 'center' | 'right'>('center');
  const [showInFooter, setShowInFooter] = useState(true);

  useEffect(() => {
    loadSocialLinks();
  }, []);

  const loadSocialLinks = async () => {
    try {
      const response = await fetch('/api/cms/social');
      if (response.ok) {
        const data = await response.json();
        setSocialLinks(data.socialLinks || []);
        setFooterPosition(data.footerPosition || 'center');
        setShowInFooter(data.showInFooter !== false);
      }
    } catch (error) {
      console.error('Error loading social links:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/cms/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ socialLinks, footerPosition, showInFooter }),
      });

      if (response.ok) {
        setSaveMessage('✅ Social media settings saved successfully!');
      } else {
        setSaveMessage('❌ Failed to save settings');
      }
    } catch (error) {
      setSaveMessage('❌ Error saving settings');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const updateLink = (platform: string, updates: Partial<SocialLink>) => {
    setSocialLinks(socialLinks.map(link => 
      link.platform === platform ? { ...link, ...updates } : link
    ));
  };

  const addPlatform = (platform: typeof SOCIAL_PLATFORMS[0]) => {
    const newLink: SocialLink = {
      platform: platform.name,
      url: platform.defaultUrl,
      icon: platform.icon,
      color: platform.color,
      isActive: true,
    };
    setSocialLinks([...socialLinks, newLink]);
  };

  const removePlatform = (platform: string) => {
    if (confirm(`Remove ${platform}?`)) {
      setSocialLinks(socialLinks.filter(link => link.platform !== platform));
    }
  };

  const saveSocialData = async () => {
    await loadSocialLinks();
  };

  const availablePlatforms = SOCIAL_PLATFORMS.filter(
    platform => !socialLinks.find(link => link.platform === platform.name)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🌐</div>
          <p className="text-golden-glow">Loading social media settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PublishControls
        pageName="social"
        onSave={saveSocialData}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-premium-orange mb-2">
              Social Media Management
            </h1>
            <p className="text-foreground/70">
              Manage social media links and footer integration
            </p>
          </div>
          <Button variant="primary" size="lg" onClick={handleSave}>
            💾 Save All Changes
          </Button>
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

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Social Links Configuration */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl font-bold text-golden-glow mb-6">
                Social Media Links
              </h2>

              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <div
                    key={link.platform}
                    className="p-4 bg-pitch-black border border-charcoal rounded-lg"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="text-3xl p-2 rounded-lg"
                        style={{ backgroundColor: `${link.color}20` }}
                      >
                        {link.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground">{link.platform}</h3>
                      </div>
                      <button
                        onClick={() => updateLink(link.platform, { isActive: !link.isActive })}
                        className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                          link.isActive
                            ? 'bg-vegetarian-green/20 text-vegetarian-green'
                            : 'bg-warm-orange/20 text-warm-orange'
                        }`}
                      >
                        {link.isActive ? '✓ Active' : '✕ Inactive'}
                      </button>
                      <button
                        onClick={() => removePlatform(link.platform)}
                        className="px-3 py-1 bg-warm-orange/20 text-warm-orange rounded text-xs font-bold hover:bg-warm-orange hover:text-white transition-colors"
                      >
                        🗑️
                      </button>
                    </div>

                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateLink(link.platform, { url: e.target.value })}
                      className="w-full px-4 py-2 bg-deep-space border border-charcoal rounded-lg text-foreground text-sm focus:outline-none focus:border-golden-glow"
                      placeholder={`${link.platform} profile URL`}
                    />
                  </div>
                ))}

                {socialLinks.length === 0 && (
                  <div className="text-center py-8 text-foreground/60">
                    No social media links added yet
                  </div>
                )}
              </div>

              {availablePlatforms.length > 0 && (
                <div className="mt-6 pt-6 border-t border-charcoal">
                  <h3 className="text-sm font-bold text-foreground/80 mb-3">
                    Add Platform
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {availablePlatforms.map((platform) => (
                      <button
                        key={platform.name}
                        onClick={() => addPlatform(platform)}
                        className="p-3 bg-deep-space border border-charcoal rounded-lg hover:border-golden-glow transition-colors text-2xl"
                        title={platform.name}
                      >
                        {platform.icon}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Footer Integration Settings */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl font-bold text-golden-glow mb-6">
                Footer Integration
              </h2>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={showInFooter}
                    onChange={(e) => setShowInFooter(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <label className="text-sm font-semibold text-foreground/80">
                    Show social icons in footer
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-3">
                    Footer Position
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['left', 'center', 'right'] as const).map((position) => (
                      <button
                        key={position}
                        onClick={() => setFooterPosition(position)}
                        className={`px-4 py-3 rounded-lg font-bold transition-all ${
                          footerPosition === position
                            ? 'bg-premium-orange text-pitch-black'
                            : 'bg-deep-space border border-charcoal text-foreground hover:border-golden-glow'
                        }`}
                      >
                        {position.charAt(0).toUpperCase() + position.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="pt-6 border-t border-charcoal">
                  <h3 className="text-sm font-bold text-foreground/80 mb-3">
                    Footer Preview
                  </h3>
                  <div className="bg-pitch-black border border-charcoal rounded-lg p-6">
                    <div
                      className={`flex gap-4 ${
                        footerPosition === 'left'
                          ? 'justify-start'
                          : footerPosition === 'right'
                          ? 'justify-end'
                          : 'justify-center'
                      }`}
                    >
                      {socialLinks
                        .filter((link) => link.isActive)
                        .map((link) => (
                          <a
                            key={link.platform}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-3xl hover:scale-110 transition-transform"
                            style={{ color: link.color }}
                            title={link.platform}
                          >
                            {link.icon}
                          </a>
                        ))}
                    </div>
                    {socialLinks.filter((link) => link.isActive).length === 0 && (
                      <p className="text-center text-foreground/60 text-sm">
                        No active social links to display
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Tips Card */}
            <Card className="bg-deep-space/50">
              <h3 className="text-lg font-bold text-golden-glow mb-3">
                💡 Tips
              </h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>• Add your complete profile URLs (e.g., https://facebook.com/momomagic)</li>
                <li>• Use Active/Inactive toggle to control visibility without deleting</li>
                <li>• Icons will appear in footer with your brand colors</li>
                <li>• WhatsApp link format: https://wa.me/919955955191</li>
                <li>• Changes reflect immediately on the website</li>
              </ul>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
