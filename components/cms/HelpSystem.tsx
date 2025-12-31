'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HelpArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  videoUrl?: string;
  tags: string[];
}

const helpArticles: HelpArticle[] = [
  {
    id: 'edit-content',
    title: 'How to Edit Content',
    category: 'Getting Started',
    content: 'Enable Edit Mode from the top right corner, then click on any text, image, or button to edit it directly. Your changes are saved automatically.',
    tags: ['edit', 'content', 'text', 'basics'],
  },
  {
    id: 'upload-images',
    title: 'Uploading and Managing Images',
    category: 'Media',
    content: 'Open the Media Manager to upload images. You can drag & drop files or click to browse. Images are automatically optimized for web performance.',
    tags: ['images', 'upload', 'media', 'photos'],
  },
  {
    id: 'change-colors',
    title: 'Changing Brand Colors',
    category: 'Design',
    content: 'Open the Design System panel and navigate to the Colors tab. Select any color to change it. All changes apply instantly across your entire website.',
    tags: ['colors', 'branding', 'design', 'theme'],
  },
  {
    id: 'add-sections',
    title: 'Adding New Sections',
    category: 'Page Builder',
    content: 'Use the Page Builder to add pre-built sections to your pages. Browse the Section Library, preview sections, and add them with one click.',
    tags: ['sections', 'page builder', 'layout', 'design'],
  },
  {
    id: 'responsive-design',
    title: 'Making Your Site Mobile-Friendly',
    category: 'Responsive',
    content: 'Use the device preview toggle to see how your site looks on different devices. Edit content separately for mobile and desktop views.',
    tags: ['mobile', 'responsive', 'tablet', 'devices'],
  },
  {
    id: 'version-history',
    title: 'Restoring Previous Versions',
    category: 'Advanced',
    content: 'Open Version History to see all saved versions of your content. Click on any version to preview it, then click Restore to bring it back.',
    tags: ['versions', 'history', 'restore', 'undo'],
  },
  {
    id: 'ab-testing',
    title: 'Creating A/B Tests',
    category: 'Advanced',
    content: 'Create A/B tests to compare different designs. Set traffic split, track conversions, and declare a winner when you have enough data.',
    tags: ['ab testing', 'testing', 'optimization', 'conversion'],
  },
  {
    id: 'seo-optimization',
    title: 'Improving SEO',
    category: 'SEO',
    content: 'Use the SEO Assistant to analyze your pages. Follow the suggestions to improve your title, meta description, keywords, and more.',
    tags: ['seo', 'search', 'google', 'optimization'],
  },
  {
    id: 'performance',
    title: 'Optimizing Performance',
    category: 'Performance',
    content: 'Check the Performance Optimizer to see your site speed. Use one-click optimization to compress images and improve load times.',
    tags: ['performance', 'speed', 'optimization', 'loading'],
  },
  {
    id: 'menu-management',
    title: 'Managing Menu Items',
    category: 'Content',
    content: 'Navigate to the Menu section in the CMS to add, edit, or remove menu items. Set prices, descriptions, and availability for each item.',
    tags: ['menu', 'products', 'items', 'food'],
  },
];

const categories = ['All', 'Getting Started', 'Media', 'Design', 'Page Builder', 'Responsive', 'Advanced', 'SEO', 'Performance', 'Content'];

interface HelpSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpSystem: React.FC<HelpSystemProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);
  const [filteredArticles, setFilteredArticles] = useState<HelpArticle[]>(helpArticles);

  useEffect(() => {
    filterArticles();
  }, [searchQuery, selectedCategory]);

  const filterArticles = () => {
    let filtered = helpArticles;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredArticles(filtered);
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-premium-orange/30 text-premium-orange">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-pitch-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          className="absolute bottom-0 left-0 right-0 h-[90vh] bg-charcoal shadow-2xl overflow-hidden flex flex-col rounded-t-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-deep-space border-b border-premium-orange/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-premium-orange flex items-center gap-2">
                🆘 Help Center
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help..."
                className="w-full bg-pitch-black border border-premium-orange/30 rounded-lg pl-12 pr-4 py-3 text-white focus:border-premium-orange focus:outline-none"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-premium-orange text-pitch-black'
                      : 'bg-pitch-black text-gray-400 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden flex">
            {/* Articles List */}
            <div className={`${selectedArticle ? 'w-1/3' : 'w-full'} overflow-y-auto p-6 border-r border-premium-orange/20 transition-all`}>
              {filteredArticles.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🔍</div>
                  <p className="text-white font-semibold mb-2">No articles found</p>
                  <p className="text-gray-400 text-sm">
                    Try different keywords or browse by category
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredArticles.map((article) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`bg-pitch-black rounded-lg p-4 cursor-pointer transition-all ${
                        selectedArticle?.id === article.id
                          ? 'border-2 border-premium-orange'
                          : 'border-2 border-transparent hover:border-premium-orange/30'
                      }`}
                      onClick={() => setSelectedArticle(article)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white font-semibold flex-1">
                          {highlightText(article.title, searchQuery)}
                        </h3>
                        <span className="text-xs bg-charcoal text-gray-400 px-2 py-1 rounded ml-2">
                          {article.category}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {highlightText(article.content, searchQuery)}
                      </p>
                      {article.videoUrl && (
                        <div className="mt-2 flex items-center gap-1 text-premium-orange text-xs">
                          <span>🎥</span>
                          <span>Video tutorial available</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Article Detail */}
            <AnimatePresence>
              {selectedArticle && (
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  className="w-2/3 overflow-y-auto p-6"
                >
                  <div className="max-w-2xl">
                    {/* Article Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-premium-orange/20 text-premium-orange px-3 py-1 rounded text-sm font-semibold">
                          {selectedArticle.category}
                        </span>
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-4">
                        {selectedArticle.title}
                      </h2>
                    </div>

                    {/* Video */}
                    {selectedArticle.videoUrl && (
                      <div className="mb-6 bg-pitch-black rounded-lg overflow-hidden">
                        <video
                          src={selectedArticle.videoUrl}
                          controls
                          className="w-full"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {selectedArticle.content}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="mt-6 pt-6 border-t border-premium-orange/20">
                      <div className="flex flex-wrap gap-2">
                        {selectedArticle.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-charcoal text-gray-400 px-3 py-1 rounded-full text-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Helpful */}
                    <div className="mt-8 p-4 bg-pitch-black rounded-lg">
                      <p className="text-white font-semibold mb-3">Was this helpful?</p>
                      <div className="flex gap-3">
                        <button className="flex-1 bg-green-500/20 text-green-400 py-2 rounded-lg font-semibold hover:bg-green-500/30 transition-all">
                          👍 Yes
                        </button>
                        <button className="flex-1 bg-red-500/20 text-red-400 py-2 rounded-lg font-semibold hover:bg-red-500/30 transition-all">
                          👎 No
                        </button>
                      </div>
                    </div>

                    {/* Related Articles */}
                    <div className="mt-8">
                      <h3 className="text-white font-bold mb-4">Related Articles</h3>
                      <div className="space-y-2">
                        {helpArticles
                          .filter(a => a.id !== selectedArticle.id && a.category === selectedArticle.category)
                          .slice(0, 3)
                          .map((article) => (
                            <button
                              key={article.id}
                              onClick={() => setSelectedArticle(article)}
                              className="w-full text-left bg-pitch-black rounded-lg p-3 hover:bg-charcoal transition-all"
                            >
                              <div className="text-white font-semibold mb-1">{article.title}</div>
                              <div className="text-gray-400 text-sm line-clamp-1">{article.content}</div>
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="bg-deep-space border-t border-premium-orange/20 p-4">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">
                Can't find what you're looking for?
              </p>
              <button className="bg-premium-orange text-pitch-black px-6 py-2 rounded-lg font-bold hover:bg-golden-glow transition-all">
                💬 Contact Support
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
