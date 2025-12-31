'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ABTest {
  id: string;
  name: string;
  status: 'draft' | 'running' | 'paused' | 'completed';
  variants: ABTestVariant[];
  startDate: Date;
  endDate?: Date;
  winner?: string;
}

interface ABTestVariant {
  id: string;
  name: string;
  trafficPercentage: number;
  views: number;
  conversions: number;
  conversionRate: number;
  revenue?: number;
}

interface ABTestingDashboardProps {
  pageSlug: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ABTestingDashboard: React.FC<ABTestingDashboardProps> = ({
  pageSlug,
  isOpen,
  onClose,
}) => {
  const [tests, setTests] = useState<ABTest[]>([]);
  const [selectedTest, setSelectedTest] = useState<ABTest | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newTestName, setNewTestName] = useState('');
  const [variantAName, setVariantAName] = useState('Control');
  const [variantBName, setVariantBName] = useState('Variant B');
  const [trafficSplit, setTrafficSplit] = useState<'50/50' | '80/20' | '90/10'>('50/50');

  useEffect(() => {
    if (isOpen) {
      fetchTests();
    }
  }, [isOpen, pageSlug]);

  const fetchTests = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/builder/ab-tests?pageSlug=${pageSlug}`);
      const data = await response.json();
      setTests(data.tests || []);
    } catch (error) {
      console.error('Error fetching A/B tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTest = async () => {
    if (!newTestName.trim()) {
      alert('Please enter a test name');
      return;
    }

    const [percentA, percentB] = trafficSplit.split('/').map(Number);

    try {
      const response = await fetch('/api/builder/ab-tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTestName,
          pageSlug,
          variants: [
            { name: variantAName, trafficPercentage: percentA, sections: [] },
            { name: variantBName, trafficPercentage: percentB, sections: [] },
          ],
          trafficSplit: { [variantAName]: percentA, [variantBName]: percentB },
          status: 'draft',
        }),
      });

      if (response.ok) {
        setShowCreateModal(false);
        setNewTestName('');
        setVariantAName('Control');
        setVariantBName('Variant B');
        fetchTests();
      }
    } catch (error) {
      console.error('Error creating A/B test:', error);
    }
  };

  const handleStartTest = async (testId: string) => {
    try {
      const response = await fetch('/api/builder/ab-tests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testId, status: 'running' }),
      });

      if (response.ok) {
        fetchTests();
      }
    } catch (error) {
      console.error('Error starting test:', error);
    }
  };

  const handlePauseTest = async (testId: string) => {
    try {
      const response = await fetch('/api/builder/ab-tests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testId, status: 'paused' }),
      });

      if (response.ok) {
        fetchTests();
      }
    } catch (error) {
      console.error('Error pausing test:', error);
    }
  };

  const handleDeclareWinner = async (testId: string, variantId: string) => {
    if (confirm('Are you sure you want to declare this variant as the winner?')) {
      try {
        const response = await fetch('/api/builder/ab-tests', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ testId, status: 'completed', winnerId: variantId }),
        });

        if (response.ok) {
          fetchTests();
        }
      } catch (error) {
        console.error('Error declaring winner:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500/20 text-green-400';
      case 'paused': return 'bg-yellow-500/20 text-yellow-400';
      case 'completed': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getWinningVariant = (test: ABTest): ABTestVariant | null => {
    if (test.variants.length < 2) return null;
    return test.variants.reduce((prev, current) =>
      current.conversionRate > prev.conversionRate ? current : prev
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
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-premium-orange flex items-center gap-2">
                🧪 A/B Testing Dashboard
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-premium-orange text-pitch-black px-6 py-2 rounded-lg font-bold hover:bg-golden-glow transition-all"
                >
                  ➕ New Test
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
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">⏳</div>
                <p className="text-gray-400">Loading A/B tests...</p>
              </div>
            ) : tests.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🧪</div>
                <h3 className="text-2xl font-bold text-white mb-2">No A/B Tests Yet</h3>
                <p className="text-gray-400 mb-6">
                  Create your first A/B test to optimize your page performance
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-premium-orange text-pitch-black px-8 py-3 rounded-lg font-bold hover:bg-golden-glow transition-all"
                >
                  🧪 Create First Test
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {tests.map((test) => {
                  const winningVariant = getWinningVariant(test);
                  
                  return (
                    <motion.div
                      key={test.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-pitch-black rounded-lg p-6 border-2 border-premium-orange/20 hover:border-premium-orange/50 transition-all"
                    >
                      {/* Test Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{test.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(test.status)}`}>
                              {test.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>Started: {new Date(test.startDate).toLocaleDateString()}</span>
                            {test.endDate && (
                              <span>Ended: {new Date(test.endDate).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {test.status === 'draft' && (
                            <button
                              onClick={() => handleStartTest(test.id)}
                              className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all"
                            >
                              ▶️ Start
                            </button>
                          )}
                          {test.status === 'running' && (
                            <button
                              onClick={() => handlePauseTest(test.id)}
                              className="bg-yellow-500 text-pitch-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-all"
                            >
                              ⏸️ Pause
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Variants Comparison */}
                      <div className="grid md:grid-cols-2 gap-4">
                        {test.variants.map((variant) => {
                          const isWinning = winningVariant?.id === variant.id;
                          const isWinner = test.winner === variant.id;
                          
                          return (
                            <div
                              key={variant.id}
                              className={`bg-charcoal rounded-lg p-4 border-2 transition-all ${
                                isWinner
                                  ? 'border-premium-orange bg-premium-orange/10'
                                  : isWinning
                                  ? 'border-green-500/50'
                                  : 'border-transparent'
                              }`}
                            >
                              {/* Variant Header */}
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-white font-bold">{variant.name}</h4>
                                  {isWinner && (
                                    <span className="bg-premium-orange text-pitch-black px-2 py-0.5 rounded text-xs font-bold">
                                      🏆 WINNER
                                    </span>
                                  )}
                                  {isWinning && !isWinner && test.status === 'running' && (
                                    <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs font-bold">
                                      📈 LEADING
                                    </span>
                                  )}
                                </div>
                                <span className="text-gray-400 text-sm">
                                  {variant.trafficPercentage}% traffic
                                </span>
                              </div>

                              {/* Metrics */}
                              <div className="space-y-2 mb-4">
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-400 text-sm">Views</span>
                                  <span className="text-white font-semibold">{variant.views.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-400 text-sm">Conversions</span>
                                  <span className="text-white font-semibold">{variant.conversions.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-400 text-sm">Conversion Rate</span>
                                  <span className={`font-bold text-lg ${
                                    isWinning ? 'text-green-400' : 'text-premium-orange'
                                  }`}>
                                    {variant.conversionRate.toFixed(2)}%
                                  </span>
                                </div>
                                {variant.revenue && (
                                  <div className="flex items-center justify-between">
                                    <span className="text-gray-400 text-sm">Revenue</span>
                                    <span className="text-white font-semibold">
                                      ₹{variant.revenue.toLocaleString()}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Progress Bar */}
                              <div className="mb-3">
                                <div className="h-2 bg-deep-space rounded-full overflow-hidden">
                                  <div
                                    className={`h-full transition-all ${
                                      isWinning ? 'bg-green-500' : 'bg-premium-orange'
                                    }`}
                                    style={{ width: `${variant.conversionRate * 10}%` }}
                                  />
                                </div>
                              </div>

                              {/* Actions */}
                              {test.status === 'running' && !test.winner && (
                                <button
                                  onClick={() => handleDeclareWinner(test.id, variant.id)}
                                  className="w-full bg-premium-orange text-pitch-black py-2 rounded-lg font-semibold hover:bg-golden-glow transition-all"
                                >
                                  🏆 Declare Winner
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Statistical Significance */}
                      {test.status === 'running' && test.variants.length === 2 && (
                        <div className="mt-4 p-3 bg-charcoal rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Statistical Significance</span>
                            <span className="text-premium-orange font-semibold">
                              {Math.min(95, (test.variants[0].views + test.variants[1].views) / 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="mt-2 h-1 bg-deep-space rounded-full overflow-hidden">
                            <div
                              className="h-full bg-premium-orange transition-all"
                              style={{
                                width: `${Math.min(100, (test.variants[0].views + test.variants[1].views) / 10)}%`
                              }}
                            />
                          </div>
                          <p className="text-gray-500 text-xs mt-2">
                            {(test.variants[0].views + test.variants[1].views) < 1000
                              ? '⚠️ Need more data for reliable results (min 1000 views)'
                              : '✅ Sufficient data for reliable results'}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Create Test Modal */}
          <AnimatePresence>
            {showCreateModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-pitch-black/90 backdrop-blur-sm flex items-center justify-center p-6"
                onClick={() => setShowCreateModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-charcoal rounded-lg p-6 max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-xl font-bold text-premium-orange mb-4">🧪 Create New A/B Test</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Test Name</label>
                      <input
                        type="text"
                        value={newTestName}
                        onChange={(e) => setNewTestName(e.target.value)}
                        placeholder="e.g., Homepage Hero Test"
                        className="w-full bg-pitch-black border border-premium-orange/30 rounded-lg px-4 py-2 text-white focus:border-premium-orange focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">Variant A Name</label>
                        <input
                          type="text"
                          value={variantAName}
                          onChange={(e) => setVariantAName(e.target.value)}
                          className="w-full bg-pitch-black border border-premium-orange/30 rounded-lg px-4 py-2 text-white focus:border-premium-orange focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">Variant B Name</label>
                        <input
                          type="text"
                          value={variantBName}
                          onChange={(e) => setVariantBName(e.target.value)}
                          className="w-full bg-pitch-black border border-premium-orange/30 rounded-lg px-4 py-2 text-white focus:border-premium-orange focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Traffic Split</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['50/50', '80/20', '90/10'] as const).map((split) => (
                          <button
                            key={split}
                            onClick={() => setTrafficSplit(split)}
                            className={`py-2 rounded-lg font-semibold transition-all ${
                              trafficSplit === split
                                ? 'bg-premium-orange text-pitch-black'
                                : 'bg-pitch-black text-gray-400 hover:text-white'
                            }`}
                          >
                            {split}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setShowCreateModal(false)}
                        className="flex-1 bg-pitch-black text-gray-400 py-2 rounded-lg font-semibold hover:text-white transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreateTest}
                        className="flex-1 bg-premium-orange text-pitch-black py-2 rounded-lg font-bold hover:bg-golden-glow transition-all"
                      >
                        Create Test
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
