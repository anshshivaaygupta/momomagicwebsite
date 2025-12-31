'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  totalBlockingTime: number;
  speedIndex: number;
}

interface ImageOptimization {
  filename: string;
  originalSize: number;
  optimizedSize: number;
  savings: number;
  format: string;
  dimensions: string;
}

interface AssetOptimization {
  type: 'css' | 'js' | 'image';
  filename: string;
  size: number;
  gzippedSize: number;
  suggestions: string[];
}

interface PerformanceOptimizerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  isOpen,
  onClose,
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [images, setImages] = useState<ImageOptimization[]>([]);
  const [assets, setAssets] = useState<AssetOptimization[]>([]);
  const [loading, setLoading] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'images' | 'assets'>('overview');

  useEffect(() => {
    if (isOpen) {
      fetchPerformanceData();
    }
  }, [isOpen]);

  const fetchPerformanceData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/cms/performance');
      const data = await response.json();
      setMetrics(data.metrics);
      setImages(data.images || []);
      setAssets(data.assets || []);
    } catch (error) {
      console.error('Error fetching performance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOptimizeAll = async () => {
    if (confirm('This will optimize all images and assets. Continue?')) {
      setOptimizing(true);
      try {
        const response = await fetch('/api/cms/performance/optimize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ optimizeAll: true }),
        });

        if (response.ok) {
          await fetchPerformanceData();
          alert('✅ Optimization complete!');
        }
      } catch (error) {
        console.error('Error optimizing:', error);
        alert('❌ Optimization failed. Please try again.');
      } finally {
        setOptimizing(false);
      }
    }
  };

  const handleOptimizeImage = async (filename: string) => {
    setOptimizing(true);
    try {
      const response = await fetch('/api/cms/performance/optimize-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename }),
      });

      if (response.ok) {
        await fetchPerformanceData();
      }
    } catch (error) {
      console.error('Error optimizing image:', error);
    } finally {
      setOptimizing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-500/20';
    if (score >= 50) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  const calculatePerformanceScore = (): number => {
    if (!metrics) return 0;
    
    let score = 100;
    
    if (metrics.largestContentfulPaint > 4000) score -= 30;
    else if (metrics.largestContentfulPaint > 2500) score -= 15;
    
    if (metrics.firstInputDelay > 300) score -= 20;
    else if (metrics.firstInputDelay > 100) score -= 10;
    
    if (metrics.cumulativeLayoutShift > 0.25) score -= 25;
    else if (metrics.cumulativeLayoutShift > 0.1) score -= 12;
    
    if (metrics.firstContentfulPaint > 3000) score -= 15;
    else if (metrics.firstContentfulPaint > 1800) score -= 8;
    
    if (metrics.totalBlockingTime > 600) score -= 10;
    else if (metrics.totalBlockingTime > 200) score -= 5;
    
    return Math.max(0, score);
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const formatTime = (ms: number): string => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  if (!isOpen) return null;

  const performanceScore = calculatePerformanceScore();

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
                ⚡ Performance Optimizer
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleOptimizeAll}
                  disabled={optimizing}
                  className="bg-premium-orange text-pitch-black px-6 py-2 rounded-lg font-bold hover:bg-golden-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {optimizing ? '⏳ Optimizing...' : '⚡ Optimize All'}
                </button>
                <button
                  onClick={fetchPerformanceData}
                  className="px-4 py-2 rounded-lg bg-charcoal text-premium-orange hover:bg-premium-orange hover:text-pitch-black transition-all"
                  title="Refresh"
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
                onClick={() => setActiveTab('images')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'images'
                    ? 'bg-premium-orange text-pitch-black'
                    : 'bg-pitch-black text-gray-400 hover:text-white'
                }`}
              >
                🖼️ Images ({images.length})
              </button>
              <button
                onClick={() => setActiveTab('assets')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'assets'
                    ? 'bg-premium-orange text-pitch-black'
                    : 'bg-pitch-black text-gray-400 hover:text-white'
                }`}
              >
                📦 Assets ({assets.length})
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">⏳</div>
                <p className="text-gray-400">Analyzing performance...</p>
              </div>
            ) : (
              <>
                {/* Overview Tab */}
                {activeTab === 'overview' && metrics && (
                  <div className="space-y-6">
                    {/* Performance Score */}
                    <div className="bg-pitch-black rounded-lg p-6 text-center">
                      <div className={`text-6xl font-bold mb-2 ${getScoreColor(performanceScore)}`}>
                        {performanceScore}
                      </div>
                      <div className="text-gray-400 text-sm mb-4">Performance Score</div>
                      <div className={`inline-block px-4 py-2 rounded-full font-semibold ${getScoreBg(performanceScore)} ${getScoreColor(performanceScore)}`}>
                        {performanceScore >= 90 ? '✅ Excellent' : performanceScore >= 50 ? '⚠️ Needs Improvement' : '❌ Poor'}
                      </div>
                    </div>

                    {/* Core Web Vitals */}
                    <div>
                      <h3 className="text-white font-bold mb-4">🎯 Core Web Vitals</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {/* LCP */}
                        <div className="bg-pitch-black rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Largest Contentful Paint</span>
                            <span className={`font-bold ${
                              metrics.largestContentfulPaint <= 2500 ? 'text-green-400' :
                              metrics.largestContentfulPaint <= 4000 ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                              {formatTime(metrics.largestContentfulPaint)}
                            </span>
                          </div>
                          <div className="h-2 bg-deep-space rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                metrics.largestContentfulPaint <= 2500 ? 'bg-green-500' :
                                metrics.largestContentfulPaint <= 4000 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(100, (metrics.largestContentfulPaint / 4000) * 100)}%` }}
                            />
                          </div>
                          <p className="text-gray-500 text-xs mt-2">
                            Good: &lt;2.5s | Poor: &gt;4s
                          </p>
                        </div>

                        {/* FID */}
                        <div className="bg-pitch-black rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">First Input Delay</span>
                            <span className={`font-bold ${
                              metrics.firstInputDelay <= 100 ? 'text-green-400' :
                              metrics.firstInputDelay <= 300 ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                              {formatTime(metrics.firstInputDelay)}
                            </span>
                          </div>
                          <div className="h-2 bg-deep-space rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                metrics.firstInputDelay <= 100 ? 'bg-green-500' :
                                metrics.firstInputDelay <= 300 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(100, (metrics.firstInputDelay / 300) * 100)}%` }}
                            />
                          </div>
                          <p className="text-gray-500 text-xs mt-2">
                            Good: &lt;100ms | Poor: &gt;300ms
                          </p>
                        </div>

                        {/* CLS */}
                        <div className="bg-pitch-black rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Cumulative Layout Shift</span>
                            <span className={`font-bold ${
                              metrics.cumulativeLayoutShift <= 0.1 ? 'text-green-400' :
                              metrics.cumulativeLayoutShift <= 0.25 ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                              {metrics.cumulativeLayoutShift.toFixed(3)}
                            </span>
                          </div>
                          <div className="h-2 bg-deep-space rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                metrics.cumulativeLayoutShift <= 0.1 ? 'bg-green-500' :
                                metrics.cumulativeLayoutShift <= 0.25 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(100, (metrics.cumulativeLayoutShift / 0.25) * 100)}%` }}
                            />
                          </div>
                          <p className="text-gray-500 text-xs mt-2">
                            Good: &lt;0.1 | Poor: &gt;0.25
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Metrics */}
                    <div>
                      <h3 className="text-white font-bold mb-4">📈 Additional Metrics</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-pitch-black rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">First Contentful Paint</span>
                            <span className="text-white font-semibold">{formatTime(metrics.firstContentfulPaint)}</span>
                          </div>
                        </div>
                        <div className="bg-pitch-black rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Total Blocking Time</span>
                            <span className="text-white font-semibold">{formatTime(metrics.totalBlockingTime)}</span>
                          </div>
                        </div>
                        <div className="bg-pitch-black rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Speed Index</span>
                            <span className="text-white font-semibold">{formatTime(metrics.speedIndex)}</span>
                          </div>
                        </div>
                        <div className="bg-pitch-black rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Page Load Time</span>
                            <span className="text-white font-semibold">{formatTime(metrics.pageLoadTime)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Images Tab */}
                {activeTab === 'images' && (
                  <div className="space-y-4">
                    {images.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-4xl mb-4">🖼️</div>
                        <p className="text-gray-400">No images to optimize</p>
                      </div>
                    ) : (
                      <>
                        <div className="bg-pitch-black rounded-lg p-4 mb-4">
                          <div className="flex items-center justify-between">
                            <span className="text-white font-semibold">Total Savings Possible</span>
                            <span className="text-premium-orange font-bold text-xl">
                              {formatBytes(images.reduce((sum, img) => sum + img.savings, 0))}
                            </span>
                          </div>
                        </div>

                        {images.map((image, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-pitch-black rounded-lg p-4"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="text-white font-semibold mb-1">{image.filename}</h4>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                  <span>{image.dimensions}</span>
                                  <span>{image.format.toUpperCase()}</span>
                                </div>
                              </div>
                              <button
                                onClick={() => handleOptimizeImage(image.filename)}
                                disabled={optimizing}
                                className="bg-premium-orange text-pitch-black px-4 py-2 rounded-lg font-semibold hover:bg-golden-glow transition-all disabled:opacity-50"
                              >
                                ⚡ Optimize
                              </button>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-400 block">Original</span>
                                <span className="text-white font-semibold">{formatBytes(image.originalSize)}</span>
                              </div>
                              <div>
                                <span className="text-gray-400 block">Optimized</span>
                                <span className="text-green-400 font-semibold">{formatBytes(image.optimizedSize)}</span>
                              </div>
                              <div>
                                <span className="text-gray-400 block">Savings</span>
                                <span className="text-premium-orange font-semibold">
                                  {formatBytes(image.savings)} ({Math.round((image.savings / image.originalSize) * 100)}%)
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </>
                    )}
                  </div>
                )}

                {/* Assets Tab */}
                {activeTab === 'assets' && (
                  <div className="space-y-4">
                    {assets.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-4xl mb-4">📦</div>
                        <p className="text-gray-400">No assets to optimize</p>
                      </div>
                    ) : (
                      assets.map((asset, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-pitch-black rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                                  asset.type === 'css' ? 'bg-blue-500/20 text-blue-400' :
                                  asset.type === 'js' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-purple-500/20 text-purple-400'
                                }`}>
                                  {asset.type.toUpperCase()}
                                </span>
                                <h4 className="text-white font-semibold">{asset.filename}</h4>
                              </div>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-gray-400">
                                  Size: <span className="text-white">{formatBytes(asset.size)}</span>
                                </span>
                                <span className="text-gray-400">
                                  Gzipped: <span className="text-green-400">{formatBytes(asset.gzippedSize)}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          {asset.suggestions.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {asset.suggestions.map((suggestion, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm">
                                  <span className="text-premium-orange">💡</span>
                                  <span className="text-gray-400">{suggestion}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      ))
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
