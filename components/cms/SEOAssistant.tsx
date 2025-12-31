'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SEOAnalysis {
  score: number;
  title: SEOCheck;
  description: SEOCheck;
  keywords: SEOCheck;
  headings: SEOCheck;
  images: SEOCheck;
  links: SEOCheck;
  mobile: SEOCheck;
  speed: SEOCheck;
}

interface SEOCheck {
  status: 'pass' | 'warning' | 'fail';
  score: number;
  message: string;
  suggestions: string[];
}

interface Keyword {
  word: string;
  count: number;
  density: number;
}

interface SEOAssistantProps {
  pageSlug: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SEOAssistant: React.FC<SEOAssistantProps> = ({
  pageSlug,
  isOpen,
  onClose,
}) => {
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'keywords' | 'competitors'>('overview');
  const [targetKeyword, setTargetKeyword] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchSEOAnalysis();
    }
  }, [isOpen, pageSlug]);

  const fetchSEOAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/cms/seo/analyze?pageSlug=${pageSlug}`);
      const data = await response.json();
      setAnalysis(data.analysis);
      setKeywords(data.keywords || []);
    } catch (error) {
      console.error('Error fetching SEO analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return '✅';
      case 'warning': return '⚠️';
      case 'fail': return '❌';
      default: return '❓';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'fail': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/20';
    if (score >= 50) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
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
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          className="absolute right-0 top-0 bottom-0 w-full md:w-[700px] bg-charcoal shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-deep-space border-b border-premium-orange/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-premium-orange flex items-center gap-2">
                🔍 SEO Assistant
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchSEOAnalysis}
                  className="px-4 py-2 rounded-lg bg-charcoal text-premium-orange hover:bg-premium-orange hover:text-pitch-black transition-all"
                  title="Refresh Analysis"
                >
                  🔄
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'overview'
                    ? 'bg-premium-orange text-pitch-black'
                    : 'bg-pitch-black text-gray-400 hover:text-white'
                }`}
              >
                📊 Overview
              </button>
              <button
                onClick={() => setActiveTab('keywords')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'keywords'
                    ? 'bg-premium-orange text-pitch-black'
                    : 'bg-pitch-black text-gray-400 hover:text-white'
                }`}
              >
                🔑 Keywords
              </button>
              <button
                onClick={() => setActiveTab('competitors')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'competitors'
                    ? 'bg-premium-orange text-pitch-black'
                    : 'bg-pitch-black text-gray-400 hover:text-white'
                }`}
              >
                🎯 Competitors
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">⏳</div>
                <p className="text-gray-400">Analyzing SEO...</p>
              </div>
            ) : (
              <>
                {/* Overview Tab */}
                {activeTab === 'overview' && analysis && (
                  <div className="space-y-6">
                    {/* Overall Score */}
                    <div className="bg-pitch-black rounded-lg p-6 text-center">
                      <div className={`text-6xl font-bold mb-2 ${getScoreColor(analysis.score)}`}>
                        {analysis.score}
                      </div>
                      <div className="text-gray-400 text-sm mb-4">SEO Score</div>
                      <div className={`inline-block px-4 py-2 rounded-full font-semibold ${getScoreBg(analysis.score)} ${getScoreColor(analysis.score)}`}>
                        {analysis.score >= 80 ? '✅ Excellent' : analysis.score >= 50 ? '⚠️ Needs Improvement' : '❌ Poor'}
                      </div>
                    </div>

                    {/* SEO Checks */}
                    <div className="space-y-4">
                      {/* Title */}
                      <div className="bg-pitch-black rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className={`text-2xl ${getStatusColor(analysis.title.status)}`}>
                              {getStatusIcon(analysis.title.status)}
                            </span>
                            <div>
                              <h4 className="text-white font-semibold">Page Title</h4>
                              <p className="text-gray-400 text-sm">{analysis.title.message}</p>
                            </div>
                          </div>
                          <span className={`font-bold ${getScoreColor(analysis.title.score)}`}>
                            {analysis.title.score}/100
                          </span>
                        </div>
                        {analysis.title.suggestions.length > 0 && (
                          <div className="space-y-2 mt-3 pt-3 border-t border-premium-orange/20">
                            {analysis.title.suggestions.map((suggestion, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <span className="text-premium-orange">💡</span>
                                <span className="text-gray-400">{suggestion}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Meta Description */}
                      <div className="bg-pitch-black rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className={`text-2xl ${getStatusColor(analysis.description.status)}`}>
                              {getStatusIcon(analysis.description.status)}
                            </span>
                            <div>
                              <h4 className="text-white font-semibold">Meta Description</h4>
                              <p className="text-gray-400 text-sm">{analysis.description.message}</p>
                            </div>
                          </div>
                          <span className={`font-bold ${getScoreColor(analysis.description.score)}`}>
                            {analysis.description.score}/100
                          </span>
                        </div>
                        {analysis.description.suggestions.length > 0 && (
                          <div className="space-y-2 mt-3 pt-3 border-t border-premium-orange/20">
                            {analysis.description.suggestions.map((suggestion, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <span className="text-premium-orange">💡</span>
                                <span className="text-gray-400">{suggestion}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Headings */}
                      <div className="bg-pitch-black rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className={`text-2xl ${getStatusColor(analysis.headings.status)}`}>
                              {getStatusIcon(analysis.headings.status)}
                            </span>
                            <div>
                              <h4 className="text-white font-semibold">Heading Structure</h4>
                              <p className="text-gray-400 text-sm">{analysis.headings.message}</p>
                            </div>
                          </div>
                          <span className={`font-bold ${getScoreColor(analysis.headings.score)}`}>
                            {analysis.headings.score}/100
                          </span>
                        </div>
                        {analysis.headings.suggestions.length > 0 && (
                          <div className="space-y-2 mt-3 pt-3 border-t border-premium-orange/20">
                            {analysis.headings.suggestions.map((suggestion, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <span className="text-premium-orange">💡</span>
                                <span className="text-gray-400">{suggestion}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Images */}
                      <div className="bg-pitch-black rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className={`text-2xl ${getStatusColor(analysis.images.status)}`}>
                              {getStatusIcon(analysis.images.status)}
                            </span>
                            <div>
                              <h4 className="text-white font-semibold">Image Optimization</h4>
                              <p className="text-gray-400 text-sm">{analysis.images.message}</p>
                            </div>
                          </div>
                          <span className={`font-bold ${getScoreColor(analysis.images.score)}`}>
                            {analysis.images.score}/100
                          </span>
                        </div>
                        {analysis.images.suggestions.length > 0 && (
                          <div className="space-y-2 mt-3 pt-3 border-t border-premium-orange/20">
                            {analysis.images.suggestions.map((suggestion, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <span className="text-premium-orange">💡</span>
                                <span className="text-gray-400">{suggestion}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Links */}
                      <div className="bg-pitch-black rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className={`text-2xl ${getStatusColor(analysis.links.status)}`}>
                              {getStatusIcon(analysis.links.status)}
                            </span>
                            <div>
                              <h4 className="text-white font-semibold">Internal Linking</h4>
                              <p className="text-gray-400 text-sm">{analysis.links.message}</p>
                            </div>
                          </div>
                          <span className={`font-bold ${getScoreColor(analysis.links.score)}`}>
                            {analysis.links.score}/100
                          </span>
                        </div>
                        {analysis.links.suggestions.length > 0 && (
                          <div className="space-y-2 mt-3 pt-3 border-t border-premium-orange/20">
                            {analysis.links.suggestions.map((suggestion, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <span className="text-premium-orange">💡</span>
                                <span className="text-gray-400">{suggestion}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Mobile Friendliness */}
                      <div className="bg-pitch-black rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className={`text-2xl ${getStatusColor(analysis.mobile.status)}`}>
                              {getStatusIcon(analysis.mobile.status)}
                            </span>
                            <div>
                              <h4 className="text-white font-semibold">Mobile Friendliness</h4>
                              <p className="text-gray-400 text-sm">{analysis.mobile.message}</p>
                            </div>
                          </div>
                          <span className={`font-bold ${getScoreColor(analysis.mobile.score)}`}>
                            {analysis.mobile.score}/100
                          </span>
                        </div>
                        {analysis.mobile.suggestions.length > 0 && (
                          <div className="space-y-2 mt-3 pt-3 border-t border-premium-orange/20">
                            {analysis.mobile.suggestions.map((suggestion, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <span className="text-premium-orange">💡</span>
                                <span className="text-gray-400">{suggestion}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Page Speed */}
                      <div className="bg-pitch-black rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className={`text-2xl ${getStatusColor(analysis.speed.status)}`}>
                              {getStatusIcon(analysis.speed.status)}
                            </span>
                            <div>
                              <h4 className="text-white font-semibold">Page Speed</h4>
                              <p className="text-gray-400 text-sm">{analysis.speed.message}</p>
                            </div>
                          </div>
                          <span className={`font-bold ${getScoreColor(analysis.speed.score)}`}>
                            {analysis.speed.score}/100
                          </span>
                        </div>
                        {analysis.speed.suggestions.length > 0 && (
                          <div className="space-y-2 mt-3 pt-3 border-t border-premium-orange/20">
                            {analysis.speed.suggestions.map((suggestion, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <span className="text-premium-orange">💡</span>
                                <span className="text-gray-400">{suggestion}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Keywords Tab */}
                {activeTab === 'keywords' && (
                  <div className="space-y-6">
                    {/* Target Keyword Input */}
                    <div className="bg-pitch-black rounded-lg p-4">
                      <label className="text-gray-400 text-sm mb-2 block">Target Keyword</label>
                      <input
                        type="text"
                        value={targetKeyword}
                        onChange={(e) => setTargetKeyword(e.target.value)}
                        placeholder="e.g., momos delivery sherghati"
                        className="w-full bg-charcoal border border-premium-orange/30 rounded-lg px-4 py-2 text-white focus:border-premium-orange focus:outline-none"
                      />
                      <p className="text-gray-500 text-xs mt-2">
                        💡 Enter your main keyword to analyze its usage on this page
                      </p>
                    </div>

                    {/* Keyword Density */}
                    <div>
                      <h3 className="text-white font-bold mb-4">🔑 Keyword Density</h3>
                      <div className="space-y-3">
                        {keywords.slice(0, 10).map((keyword, index) => (
                          <div key={index} className="bg-pitch-black rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white font-semibold">{keyword.word}</span>
                              <div className="flex items-center gap-3">
                                <span className="text-gray-400 text-sm">{keyword.count} times</span>
                                <span className="text-premium-orange font-bold">{keyword.density.toFixed(2)}%</span>
                              </div>
                            </div>
                            <div className="h-2 bg-deep-space rounded-full overflow-hidden">
                              <div
                                className="h-full bg-premium-orange transition-all"
                                style={{ width: `${Math.min(100, keyword.density * 20)}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Keyword Recommendations */}
                    <div className="bg-pitch-black rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3">💡 Recommendations</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-sm">
                          <span className="text-premium-orange">•</span>
                          <span className="text-gray-400">Aim for 1-2% keyword density for your target keyword</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <span className="text-premium-orange">•</span>
                          <span className="text-gray-400">Use variations and related keywords naturally</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <span className="text-premium-orange">•</span>
                          <span className="text-gray-400">Include keywords in title, headings, and first paragraph</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <span className="text-premium-orange">•</span>
                          <span className="text-gray-400">Avoid keyword stuffing - focus on natural content</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Competitors Tab */}
                {activeTab === 'competitors' && (
                  <div className="space-y-6">
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">🎯</div>
                      <h3 className="text-xl font-bold text-white mb-2">Competitor Analysis</h3>
                      <p className="text-gray-400 mb-6">
                        Compare your SEO performance with competitors
                      </p>
                      <button className="bg-premium-orange text-pitch-black px-6 py-3 rounded-lg font-bold hover:bg-golden-glow transition-all">
                        🔍 Analyze Competitors
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="bg-deep-space border-t border-premium-orange/20 p-4">
            <p className="text-gray-400 text-sm text-center">
              💡 SEO analysis updates automatically when you save changes
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
