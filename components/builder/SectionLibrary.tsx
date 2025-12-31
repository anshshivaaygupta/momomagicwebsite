'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sectionTemplates, sectionCategories, SectionTemplate } from '@/lib/sectionTemplates';

interface SectionLibraryProps {
  onAddSection: (template: SectionTemplate) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const SectionLibrary: React.FC<SectionLibraryProps> = ({
  onAddSection,
  isOpen,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<SectionTemplate | null>(null);

  const filteredTemplates = sectionTemplates.filter((template) => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddSection = (template: SectionTemplate) => {
    onAddSection(template);
    setPreviewTemplate(null);
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
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 25 }}
          className="absolute left-0 top-0 h-full w-full md:w-[800px] bg-charcoal shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-deep-space border-b border-premium-orange/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-premium-orange flex items-center gap-2">
                📚 Section Library
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

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-pitch-black border border-premium-orange/30 rounded-lg px-4 py-3 pl-10 text-white focus:border-premium-orange focus:outline-none"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Categories */}
            <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-premium-orange text-pitch-black'
                    : 'bg-pitch-black text-gray-400 hover:text-white'
                }`}
              >
                All
              </button>
              {sectionCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-premium-orange text-pitch-black'
                      : 'bg-pitch-black text-gray-400 hover:text-white'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid md:grid-cols-2 gap-4">
              {filteredTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-pitch-black rounded-lg overflow-hidden border border-premium-orange/20 hover:border-premium-orange transition-all group cursor-pointer"
                  onClick={() => setPreviewTemplate(template)}
                >
                  {/* Thumbnail */}
                  <div className="relative h-40 bg-deep-space flex items-center justify-center">
                    <div className="text-6xl">{template.elements[0]?.includes('video') ? '🎥' : '📄'}</div>
                    <div className="absolute inset-0 bg-premium-orange/0 group-hover:bg-premium-orange/10 transition-all"></div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-white font-bold mb-1">{template.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{template.description}</p>
                    
                    {/* Elements */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {template.elements.slice(0, 3).map((element, i) => (
                        <span key={i} className="text-xs bg-charcoal text-gray-400 px-2 py-1 rounded">
                          {element}
                        </span>
                      ))}
                      {template.elements.length > 3 && (
                        <span className="text-xs bg-charcoal text-gray-400 px-2 py-1 rounded">
                          +{template.elements.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddSection(template);
                        }}
                        className="flex-1 bg-premium-orange text-pitch-black py-2 rounded-lg font-bold hover:bg-golden-glow transition-all"
                      >
                        Add Section
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewTemplate(template);
                        }}
                        className="px-4 py-2 rounded-lg border-2 border-premium-orange text-premium-orange hover:bg-premium-orange hover:text-pitch-black transition-all"
                      >
                        👁️
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No templates found</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your search or category filter</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Preview Modal */}
        {previewTemplate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center p-4"
            onClick={() => setPreviewTemplate(null)}
          >
            <div
              className="bg-charcoal rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Preview Header */}
              <div className="bg-deep-space p-6 border-b border-premium-orange/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{previewTemplate.name}</h3>
                    <p className="text-gray-400">{previewTemplate.description}</p>
                  </div>
                  <button
                    onClick={() => setPreviewTemplate(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Preview Content */}
              <div className="p-6">
                <div className="bg-pitch-black rounded-lg p-8 mb-6">
                  <div className="text-gray-400 text-sm mb-4">Preview:</div>
                  <div 
                    className="preview-content"
                    dangerouslySetInnerHTML={{ 
                      __html: previewTemplate.html.replace(/\{\{(\w+)\}\}/g, (_, key) => 
                        previewTemplate.defaultContent?.[key] || `[${key}]`
                      )
                    }}
                  />
                </div>

                {/* Elements List */}
                <div className="mb-6">
                  <h4 className="text-white font-bold mb-3">Included Elements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {previewTemplate.elements.map((element, i) => (
                      <span key={i} className="bg-pitch-black text-gray-300 px-3 py-1 rounded-lg text-sm">
                        {element}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAddSection(previewTemplate)}
                    className="flex-1 bg-premium-orange text-pitch-black py-3 rounded-lg font-bold hover:bg-golden-glow transition-all"
                  >
                    Add This Section
                  </button>
                  <button
                    onClick={() => setPreviewTemplate(null)}
                    className="px-6 py-3 rounded-lg border-2 border-gray-600 text-gray-400 hover:border-gray-400 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
