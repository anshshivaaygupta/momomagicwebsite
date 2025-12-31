'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Version {
  id: string;
  timestamp: Date;
  author: string;
  description: string;
  changes: VersionChange[];
  snapshot: any;
}

interface VersionChange {
  type: 'added' | 'modified' | 'deleted';
  field: string;
  oldValue?: any;
  newValue?: any;
}

interface VersionHistoryProps {
  contentId: string;
  onRestore?: (version: Version) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const VersionHistory: React.FC<VersionHistoryProps> = ({
  contentId,
  onRestore,
  isOpen,
  onClose,
}) => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareVersion, setCompareVersion] = useState<Version | null>(null);
  const [loading, setLoading] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [autoSaveInterval, setAutoSaveInterval] = useState(2); // minutes

  useEffect(() => {
    if (isOpen) {
      fetchVersionHistory();
    }
  }, [isOpen, contentId]);

  const fetchVersionHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/cms/versions?contentId=${contentId}`);
      const data = await response.json();
      setVersions(data.versions || []);
    } catch (error) {
      console.error('Error fetching version history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (version: Version) => {
    if (confirm(`Are you sure you want to restore to version from ${formatDate(version.timestamp)}?`)) {
      try {
        const response = await fetch('/api/cms/versions/restore', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contentId,
            versionId: version.id,
          }),
        });

        if (response.ok) {
          if (onRestore) {
            onRestore(version);
          }
          onClose();
        }
      } catch (error) {
        console.error('Error restoring version:', error);
      }
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeDifference = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'added': return '➕';
      case 'modified': return '✏️';
      case 'deleted': return '🗑️';
      default: return '📝';
    }
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'added': return 'text-green-400';
      case 'modified': return 'text-blue-400';
      case 'deleted': return 'text-red-400';
      default: return 'text-gray-400';
    }
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
          className="absolute right-0 top-0 bottom-0 w-full md:w-[600px] bg-charcoal shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-deep-space border-b border-premium-orange/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-premium-orange flex items-center gap-2">
                🕰️ Version History
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

            {/* Auto-save Settings */}
            <div className="bg-charcoal rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">Auto-save</span>
                  <button
                    onClick={() => setAutoSaveEnabled(!autoSaveEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      autoSaveEnabled ? 'bg-premium-orange' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        autoSaveEnabled ? 'transform translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Every</span>
                  <select
                    value={autoSaveInterval}
                    onChange={(e) => setAutoSaveInterval(parseInt(e.target.value))}
                    className="bg-pitch-black text-white px-3 py-1 rounded border border-premium-orange/30 focus:border-premium-orange focus:outline-none"
                    disabled={!autoSaveEnabled}
                  >
                    <option value="1">1 min</option>
                    <option value="2">2 min</option>
                    <option value="5">5 min</option>
                    <option value="10">10 min</option>
                  </select>
                </div>
              </div>
              <p className="text-gray-400 text-xs">
                {autoSaveEnabled 
                  ? `✅ Auto-saving every ${autoSaveInterval} minute${autoSaveInterval > 1 ? 's' : ''}`
                  : '⚠️ Auto-save is disabled. Changes will not be saved automatically.'}
              </p>
            </div>

            {/* Compare Mode Toggle */}
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                  compareMode
                    ? 'bg-premium-orange text-pitch-black'
                    : 'bg-pitch-black text-gray-400 hover:text-white'
                }`}
              >
                {compareMode ? '✅ Compare Mode' : '🔍 Enable Compare'}
              </button>
              <button
                onClick={fetchVersionHistory}
                className="px-4 py-2 rounded-lg bg-pitch-black text-premium-orange hover:bg-premium-orange hover:text-pitch-black transition-all"
                title="Refresh"
              >
                🔄
              </button>
            </div>
          </div>

          {/* Version List */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">⏳</div>
                <p className="text-gray-400">Loading version history...</p>
              </div>
            ) : versions.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📝</div>
                <p className="text-white font-semibold mb-2">No versions yet</p>
                <p className="text-gray-400 text-sm">
                  Versions will appear here as you make changes
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {versions.map((version, index) => (
                  <motion.div
                    key={version.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-pitch-black rounded-lg p-4 border-2 transition-all cursor-pointer ${
                      selectedVersion?.id === version.id
                        ? 'border-premium-orange'
                        : 'border-transparent hover:border-premium-orange/30'
                    }`}
                    onClick={() => setSelectedVersion(version)}
                  >
                    {/* Version Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {index === 0 && (
                            <span className="bg-premium-orange text-pitch-black px-2 py-0.5 rounded text-xs font-bold">
                              CURRENT
                            </span>
                          )}
                          <span className="text-white font-semibold">
                            {version.description || 'Untitled Version'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-gray-400">
                            {formatDate(version.timestamp)}
                          </span>
                          <span className="text-premium-orange">
                            {getTimeDifference(version.timestamp)}
                          </span>
                          <span className="text-gray-400">
                            by {version.author}
                          </span>
                        </div>
                      </div>
                      {compareMode && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCompareVersion(version);
                          }}
                          className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
                            compareVersion?.id === version.id
                              ? 'bg-premium-orange text-pitch-black'
                              : 'bg-charcoal text-gray-400 hover:text-white'
                          }`}
                        >
                          Compare
                        </button>
                      )}
                    </div>

                    {/* Changes Summary */}
                    {version.changes && version.changes.length > 0 && (
                      <div className="space-y-2 mb-3">
                        {version.changes.slice(0, 3).map((change, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <span className={getChangeColor(change.type)}>
                              {getChangeIcon(change.type)}
                            </span>
                            <span className="text-gray-400">{change.field}</span>
                            {change.type === 'modified' && (
                              <span className="text-gray-500 text-xs">
                                (updated)
                              </span>
                            )}
                          </div>
                        ))}
                        {version.changes.length > 3 && (
                          <div className="text-gray-500 text-xs">
                            +{version.changes.length - 3} more changes
                          </div>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    {index !== 0 && (
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRestore(version);
                          }}
                          className="flex-1 bg-premium-orange text-pitch-black py-2 rounded-lg font-semibold hover:bg-golden-glow transition-all"
                        >
                          ↶ Restore
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVersion(version);
                          }}
                          className="px-4 py-2 rounded-lg border-2 border-premium-orange text-premium-orange hover:bg-premium-orange hover:text-pitch-black transition-all"
                        >
                          👁️ View
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="bg-deep-space border-t border-premium-orange/20 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">
                {versions.length} version{versions.length !== 1 ? 's' : ''} saved
              </span>
              <span className="text-gray-400">
                30-day retention period
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
