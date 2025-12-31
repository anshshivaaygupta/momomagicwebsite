'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Backup {
  id: string;
  name: string;
  date: string;
  size: string;
  type: 'manual' | 'auto';
}

export default function BackupPage() {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadBackups();
  }, []);

  const loadBackups = async () => {
    try {
      const response = await fetch('/api/cms/backup');
      if (response.ok) {
        const data = await response.json();
        setBackups(data.backups || []);
      }
    } catch (error) {
      console.error('Error loading backups:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createBackup = async () => {
    setIsCreating(true);
    setMessage('');

    try {
      const response = await fetch('/api/cms/backup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'manual' }),
      });

      if (response.ok) {
        setMessage('✅ Backup created successfully!');
        loadBackups();
      } else {
        setMessage('❌ Failed to create backup');
      }
    } catch (error) {
      setMessage('❌ Error creating backup');
    } finally {
      setIsCreating(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const restoreBackup = async (id: string) => {
    if (!confirm('Are you sure you want to restore this backup? This will overwrite current data.')) return;

    try {
      const response = await fetch(`/api/cms/backup/restore?id=${id}`, {
        method: 'POST',
      });

      if (response.ok) {
        setMessage('✅ Backup restored successfully!');
      } else {
        setMessage('❌ Failed to restore backup');
      }
    } catch (error) {
      setMessage('❌ Error restoring backup');
    } finally {
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const downloadBackup = async (id: string, name: string) => {
    try {
      const response = await fetch(`/api/cms/backup/download?id=${id}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setMessage('✅ Backup downloaded successfully!');
      } else {
        setMessage('❌ Failed to download backup');
      }
    } catch (error) {
      setMessage('❌ Error downloading backup');
    } finally {
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const deleteBackup = async (id: string) => {
    if (!confirm('Are you sure you want to delete this backup?')) return;

    try {
      const response = await fetch(`/api/cms/backup?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('✅ Backup deleted successfully!');
        loadBackups();
      } else {
        setMessage('❌ Failed to delete backup');
      }
    } catch (error) {
      setMessage('❌ Error deleting backup');
    } finally {
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">💾</div>
          <p className="text-golden-glow">Loading backups...</p>
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
              Backup & Recovery
            </h1>
            <p className="text-foreground/70">
              Create and manage website backups
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={createBackup}
            disabled={isCreating}
          >
            {isCreating ? '⏳ Creating...' : '💾 Create Backup'}
          </Button>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message.includes('✅')
                ? 'bg-vegetarian-green/20 border border-vegetarian-green'
                : 'bg-warm-orange/20 border border-warm-orange'
            }`}
          >
            <p className="text-foreground">{message}</p>
          </motion.div>
        )}

        {/* Info Card */}
        <Card className="mb-8 bg-deep-space/50">
          <div className="flex items-start gap-4">
            <span className="text-4xl">ℹ️</span>
            <div>
              <h3 className="text-lg font-bold text-golden-glow mb-2">
                About Backups
              </h3>
              <ul className="space-y-1 text-sm text-foreground/70">
                <li>• Backups include all CMS content (hero, menu, media, etc.)</li>
                <li>• Manual backups are created on-demand</li>
                <li>• Automatic backups are created daily at midnight</li>
                <li>• You can restore any backup to revert changes</li>
                <li>• Download backups for external storage</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Backups List */}
        <div className="space-y-4">
          {backups.map((backup, index) => (
            <motion.div
              key={backup.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">
                      {backup.type === 'manual' ? '📦' : '🤖'}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-premium-orange mb-1">
                        {backup.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-foreground/60">
                        <span>📅 {new Date(backup.date).toLocaleString()}</span>
                        <span>💾 {backup.size}</span>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          backup.type === 'manual'
                            ? 'bg-premium-orange/20 text-premium-orange'
                            : 'bg-golden-glow/20 text-golden-glow'
                        }`}>
                          {backup.type === 'manual' ? 'MANUAL' : 'AUTO'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => restoreBackup(backup.id)}
                      className="px-4 py-2 bg-vegetarian-green text-white rounded-lg text-sm font-bold hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(5,150,105,0.3)] transition-all duration-300"
                    >
                      ↻ Restore
                    </button>
                    <button
                      onClick={() => downloadBackup(backup.id, backup.name)}
                      className="px-4 py-2 bg-premium-orange text-pitch-black rounded-lg text-sm font-bold hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,194,65,0.3)] transition-all duration-300"
                    >
                      ⬇ Download
                    </button>
                    <button
                      onClick={() => deleteBackup(backup.id)}
                      className="px-4 py-2 bg-warm-orange/20 text-warm-orange rounded-lg text-sm font-bold hover:bg-warm-orange/30 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {backups.length === 0 && (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">💾</div>
            <h3 className="text-2xl font-bold text-golden-glow mb-2">
              No Backups Yet
            </h3>
            <p className="text-foreground/70 mb-6">
              Create your first backup to protect your content
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={createBackup}
              disabled={isCreating}
            >
              {isCreating ? '⏳ Creating...' : '💾 Create First Backup'}
            </Button>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
