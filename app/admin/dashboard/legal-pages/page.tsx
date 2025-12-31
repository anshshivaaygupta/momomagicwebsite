'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RichTextEditor } from '@/components/cms/RichTextEditor';
import { InlineEditor } from '@/components/cms/InlineEditor';
import { VisualDesignPanel } from '@/components/cms/VisualDesignPanel';

interface LegalPageContent {
  id: string;
  title: string;
  slug: string;
  lastUpdated: string;
  summary: string;
  content: string;
}

export default function LegalPagesCMSPage() {
  const [selectedPage, setSelectedPage] = useState<string>('privacy-policy');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const legalPages: LegalPageContent[] = [
    {
      id: '1',
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      lastUpdated: 'January 15, 2025',
      summary: 'Your privacy is our priority. Learn how we protect and use your information.',
      content: 'Privacy policy content...'
    },
    {
      id: '2',
      title: 'Terms & Conditions',
      slug: 'terms-conditions',
      lastUpdated: 'January 15, 2025',
      summary: 'Please read these terms carefully before using our services.',
      content: 'Terms and conditions content...'
    },
    {
      id: '3',
      title: 'Refund & Cancellation',
      slug: 'refund-cancellation',
      lastUpdated: 'January 15, 2025',
      summary: 'Clear guidelines for order cancellations and refund processing.',
      content: 'Refund policy content...'
    },
    {
      id: '4',
      title: 'Shipping & Delivery',
      slug: 'shipping-delivery',
      lastUpdated: 'January 15, 2025',
      summary: 'Information about our delivery areas, timing, and charges.',
      content: 'Shipping policy content...'
    },
    {
      id: '5',
      title: 'Online Ordering Policy',
      slug: 'online-ordering-policy',
      lastUpdated: 'January 15, 2025',
      summary: 'Guidelines for ordering through our website and mobile app.',
      content: 'Online ordering policy content...'
    }
  ];

  const [formData, setFormData] = useState({
    title: legalPages[0].title,
    summary: legalPages[0].summary,
    content: legalPages[0].content
  });

  const handlePageSelect = (slug: string) => {
    setSelectedPage(slug);
    const page = legalPages.find(p => p.slug === slug);
    if (page) {
      setFormData({
        title: page.title,
        summary: page.summary,
        content: page.content
      });
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-pitch-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-premium-orange mb-2">
            Legal Pages Management
          </h1>
          <p className="text-gray-400">
            Manage all legal pages and policy documents
          </p>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-vegetarian-green/20 border border-vegetarian-green rounded-lg p-4 mb-6"
          >
            <p className="text-vegetarian-green font-bold flex items-center gap-2">
              <span>✓</span> Changes saved successfully!
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Page List */}
          <div className="lg:col-span-1">
            <div className="bg-charcoal rounded-lg p-4 border border-premium-orange/20 sticky top-6">
              <h3 className="text-lg font-bold text-golden-glow mb-4">Legal Pages</h3>
              <div className="space-y-2">
                {legalPages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => handlePageSelect(page.slug)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      selectedPage === page.slug
                        ? 'bg-premium-orange text-pitch-black font-bold'
                        : 'bg-pitch-black text-gray-300 hover:bg-deep-space'
                    }`}
                  >
                    <div className="text-sm">{page.title}</div>
                    <div className="text-xs opacity-70">Updated: {page.lastUpdated}</div>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-premium-orange/20">
                <h4 className="text-sm font-bold text-golden-glow mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-2 rounded-lg bg-pitch-black text-gray-300 hover:bg-deep-space transition-all text-sm">
                    📋 View Version History
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-lg bg-pitch-black text-gray-300 hover:bg-deep-space transition-all text-sm">
                    📅 Schedule Update
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-lg bg-pitch-black text-gray-300 hover:bg-deep-space transition-all text-sm">
                    🗄️ View Archive
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Editor */}
          <div className="lg:col-span-3">
            <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/20">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-golden-glow mb-4">
                  Edit {legalPages.find(p => p.slug === selectedPage)?.title}
                </h2>
                
                {/* Title */}
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2 font-bold">Page Title</label>
                  <InlineEditor
                    value={formData.title}
                    onChange={(value) => setFormData({ ...formData, title: value })}
                    onSave={handleSave}
                    placeholder="Page title"
                    className="w-full"
                  />
                </div>

                {/* Summary */}
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2 font-bold">Summary</label>
                  <InlineEditor
                    value={formData.summary}
                    onChange={(value) => setFormData({ ...formData, summary: value })}
                    onSave={handleSave}
                    placeholder="Brief summary of the policy"
                    className="w-full"
                  />
                </div>

                {/* Content Editor */}
                <div className="mb-6">
                  <label className="block text-gray-300 mb-2 font-bold">Content</label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(value) => setFormData({ ...formData, content: value })}
                    placeholder="Enter policy content..."
                    label=""
                    height="500px"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    💡 Tip: Use the formatting toolbar for better structure
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 bg-premium-orange text-pitch-black px-6 py-3 rounded-lg font-bold hover:bg-golden-glow transition-all duration-300 disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button className="px-6 py-3 rounded-lg border-2 border-premium-orange text-premium-orange hover:bg-premium-orange hover:text-pitch-black transition-all duration-300 font-bold">
                    Preview
                  </button>
                  <button className="px-6 py-3 rounded-lg border-2 border-gray-600 text-gray-400 hover:border-gray-400 transition-all duration-300">
                    Cancel
                  </button>
                </div>
              </div>

              {/* Metadata */}
              <div className="mt-6 pt-6 border-t border-premium-orange/20">
                <h3 className="text-lg font-bold text-golden-glow mb-4">Page Metadata</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Last Updated</label>
                    <input
                      type="date"
                      className="w-full bg-pitch-black border border-premium-orange/20 rounded-lg px-4 py-2 text-white focus:border-premium-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Version</label>
                    <input
                      type="text"
                      defaultValue="1.0"
                      className="w-full bg-pitch-black border border-premium-orange/20 rounded-lg px-4 py-2 text-white focus:border-premium-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Status</label>
                    <select className="w-full bg-pitch-black border border-premium-orange/20 rounded-lg px-4 py-2 text-white focus:border-premium-orange focus:outline-none">
                      <option>Published</option>
                      <option>Draft</option>
                      <option>Scheduled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Language</label>
                    <select className="w-full bg-pitch-black border border-premium-orange/20 rounded-lg px-4 py-2 text-white focus:border-premium-orange focus:outline-none">
                      <option>English</option>
                      <option>Hindi</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-charcoal rounded-lg p-4 border border-premium-orange/20">
                <div className="text-2xl mb-2">👁️</div>
                <div className="text-2xl font-bold text-premium-orange">1,234</div>
                <div className="text-gray-400 text-sm">Page Views (30 days)</div>
              </div>
              <div className="bg-charcoal rounded-lg p-4 border border-premium-orange/20">
                <div className="text-2xl mb-2">📝</div>
                <div className="text-2xl font-bold text-premium-orange">5</div>
                <div className="text-gray-400 text-sm">Total Revisions</div>
              </div>
              <div className="bg-charcoal rounded-lg p-4 border border-premium-orange/20">
                <div className="text-2xl mb-2">🕒</div>
                <div className="text-2xl font-bold text-premium-orange">2 days ago</div>
                <div className="text-gray-400 text-sm">Last Modified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Design Controls */}
      <VisualDesignPanel pageName="legal-pages" onSave={handleSave} />
    </div>
  );
}
