'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface PageSEO {
  page: string;
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: 'summary' | 'summary_large_image';
  canonicalUrl: string;
  robots: string;
}

const PAGES = ['Home', 'Menu', 'About', 'Contact', 'Gallery'];

export default function SEOManagementPage() {
  const [seoData, setSeoData] = useState<PageSEO[]>([]);
  const [selectedPage, setSelectedPage] = useState('Home');
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');
  const [sitemapEnabled, setSitemapEnabled] = useState(true);

  useEffect(() => {
    loadSEOData();
  }, []);

  const loadSEOData = async () => {
    try {
      const response = await fetch('/api/cms/seo');
      if (response.ok) {
        const data = await response.json();
        setSeoData(data.pages || []);
        setSitemapEnabled(data.sitemapEnabled !== false);
      }
    } catch (error) {
      console.error('Error loading SEO data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentPageData = seoData.find(p => p.page === selectedPage) || {
    page: selectedPage,
    title: '',
    description: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterCard: 'summary_large_image' as const,
    canonicalUrl: '',
    robots: 'index, follow',
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/cms/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pages: seoData, sitemapEnabled }),
      });

      if (response.ok) {
        setSaveMessage('✅ SEO settings saved successfully!');
      } else {
        setSaveMessage('❌ Failed to save SEO settings');
      }
    } catch (error) {
      setSaveMessage('❌ Error saving SEO settings');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const updatePageSEO = (updates: Partial<PageSEO>) => {
    const updated = { ...currentPageData, ...updates };
    setSeoData(prev => {
      const existing = prev.findIndex(p => p.page === selectedPage);
      if (existing >= 0) {
        const newData = [...prev];
        newData[existing] = updated;
        return newData;
      }
      return [...prev, updated];
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-golden-glow">Loading SEO settings...</p>
        </div>
      </div>
    );
  }

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
              SEO Management
            </h1>
            <p className="text-foreground/70">
              Manage meta tags, Open Graph, and search engine optimization
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

        {/* Page Selector */}
        <div className="mb-6">
          <div className="flex gap-2 flex-wrap">
            {PAGES.map(page => (
              <button
                key={page}
                onClick={() => setSelectedPage(page)}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  selectedPage === page
                    ? 'bg-premium-orange text-pitch-black'
                    : 'bg-deep-space border border-charcoal text-foreground hover:border-golden-glow'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Basic Meta Tags */}
          <Card>
            <h2 className="text-2xl font-bold text-golden-glow mb-6">
              Basic Meta Tags
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">
                  Page Title *
                </label>
                <input
                  type="text"
                  value={currentPageData.title}
                  onChange={(e) => updatePageSEO({ title: e.target.value })}
                  className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow"
                  placeholder="Momos Magic - Best Momos in Sherghati"
                  maxLength={60}
                />
                <p className="text-xs text-foreground/50 mt-1">
                  {currentPageData.title.length}/60 characters (optimal: 50-60)
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">
                  Meta Description *
                </label>
                <textarea
                  value={currentPageData.description}
                  onChange={(e) => updatePageSEO({ description: e.target.value })}
                  className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow resize-none"
                  rows={3}
                  placeholder="Discover the magic of authentic momos in Sherghati..."
                  maxLength={160}
                />
                <p className="text-xs text-foreground/50 mt-1">
                  {currentPageData.description.length}/160 characters (optimal: 150-160)
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">
                  Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={currentPageData.keywords}
                  onChange={(e) => updatePageSEO({ keywords: e.target.value })}
                  className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow"
                  placeholder="momos, sherghati, kurkure momos, food"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">
                  Canonical URL
                </label>
                <input
                  type="url"
                  value={currentPageData.canonicalUrl}
                  onChange={(e) => updatePageSEO({ canonicalUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow"
                  placeholder="https://momomagic.com/menu"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">
                  Robots Meta Tag
                </label>
                <select
                  value={currentPageData.robots}
                  onChange={(e) => updatePageSEO({ robots: e.target.value })}
                  className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow"
                >
                  <option value="index, follow">Index, Follow (Default)</option>
                  <option value="noindex, follow">No Index, Follow</option>
                  <option value="index, nofollow">Index, No Follow</option>
                  <option value="noindex, nofollow">No Index, No Follow</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Open Graph & Twitter */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl font-bold text-golden-glow mb-6">
                Open Graph (Social Sharing)
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    OG Title
                  </label>
                  <input
                    type="text"
                    value={currentPageData.ogTitle}
                    onChange={(e) => updatePageSEO({ ogTitle: e.target.value })}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow"
                    placeholder="Leave empty to use page title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    OG Description
                  </label>
                  <textarea
                    value={currentPageData.ogDescription}
                    onChange={(e) => updatePageSEO({ ogDescription: e.target.value })}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow resize-none"
                    rows={2}
                    placeholder="Leave empty to use meta description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    OG Image URL
                  </label>
                  <input
                    type="url"
                    value={currentPageData.ogImage}
                    onChange={(e) => updatePageSEO({ ogImage: e.target.value })}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow"
                    placeholder="https://momomagic.com/og-image.jpg"
                  />
                  <p className="text-xs text-foreground/50 mt-1">
                    Recommended: 1200×630px
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Twitter Card Type
                  </label>
                  <select
                    value={currentPageData.twitterCard}
                    onChange={(e) => updatePageSEO({ twitterCard: e.target.value as any })}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow"
                  >
                    <option value="summary">Summary</option>
                    <option value="summary_large_image">Summary Large Image</option>
                  </select>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold text-golden-glow mb-6">
                XML Sitemap
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={sitemapEnabled}
                    onChange={(e) => setSitemapEnabled(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <label className="text-sm font-semibold text-foreground/80">
                    Enable XML Sitemap Generation
                  </label>
                </div>

                <div className="p-4 bg-pitch-black border border-charcoal rounded-lg">
                  <p className="text-sm text-foreground/70 mb-2">
                    Sitemap URL: <span className="text-golden-glow">/sitemap.xml</span>
                  </p>
                  <p className="text-xs text-foreground/50">
                    Automatically includes all active pages with proper priority and change frequency
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tips */}
        <Card className="mt-6 bg-deep-space/50">
          <h3 className="text-lg font-bold text-golden-glow mb-3">
            💡 SEO Best Practices
          </h3>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li>• Keep titles under 60 characters for optimal display in search results</li>
            <li>• Write compelling meta descriptions (150-160 characters) that encourage clicks</li>
            <li>• Use relevant keywords naturally - avoid keyword stuffing</li>
            <li>• OG images should be 1200×630px for best social media display</li>
            <li>• Canonical URLs prevent duplicate content issues</li>
            <li>• Use "noindex" for pages you don't want in search results (like thank you pages)</li>
          </ul>
        </Card>
      </motion.div>
    </div>
  );
}
