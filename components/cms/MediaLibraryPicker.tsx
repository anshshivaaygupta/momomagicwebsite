'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  size: number;
  uploadedAt: string;
}

interface MediaLibraryPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  fileType?: 'image' | 'video' | 'all';
}

export function MediaLibraryPicker({ isOpen, onClose, onSelect, fileType = 'all' }: MediaLibraryPickerProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadFiles();
    }
  }, [isOpen]);

  const loadFiles = async () => {
    try {
      const response = await fetch('/api/cms/media');
      if (response.ok) {
        const data = await response.json();
        let loadedFiles = data.files || [];
        
        if (fileType !== 'all') {
          loadedFiles = loadedFiles.filter((file: MediaFile) => file.type === fileType);
        }
        
        setFiles(loadedFiles);
      }
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handleSelect = () => {
    if (selectedFile) {
      onSelect(selectedFile.url);
      onClose();
    }
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-pitch-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-charcoal">
              <div>
                <h2 className="text-2xl font-bold text-premium-orange">Choose from Media Library</h2>
                <p className="text-sm text-foreground/60 mt-1">
                  {fileType === 'all' ? 'Select any file' : `Select ${fileType}`}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-foreground/70 hover:text-warm-orange transition-colors text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Search */}
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Search files..."
                className="w-full px-4 py-3 bg-deep-space border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
              />
            </div>

            {/* Files Grid */}
            <div className="flex-1 overflow-y-auto mb-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📚</div>
                    <p className="text-golden-glow">Loading media library...</p>
                  </div>
                </div>
              ) : filteredFiles.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📁</div>
                    <p className="text-foreground/70">
                      {searchQuery ? 'No files match your search' : 'No files in library yet'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredFiles.map((file) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedFile?.id === file.id
                          ? 'border-golden-glow shadow-lg shadow-golden-glow/20'
                          : 'border-charcoal hover:border-premium-orange'
                      }`}
                      onClick={() => setSelectedFile(file)}
                    >
                      {/* Preview */}
                      <div className="h-32 bg-charcoal flex items-center justify-center overflow-hidden">
                        {file.type === 'image' ? (
                          <img
                            src={file.url}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <video
                            src={file.url}
                            className="w-full h-full object-cover"
                            muted
                          />
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-2 bg-deep-space">
                        <p className="text-xs font-semibold text-foreground truncate mb-1">
                          {file.name}
                        </p>
                        <div className="flex items-center justify-between text-xs text-foreground/60">
                          <span>{formatFileSize(file.size)}</span>
                          <span className="uppercase">{file.type}</span>
                        </div>
                      </div>

                      {/* Selected Indicator */}
                      {selectedFile?.id === file.id && (
                        <div className="absolute top-2 right-2 bg-golden-glow text-pitch-black rounded-full w-6 h-6 flex items-center justify-center font-bold">
                          ✓
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-charcoal">
              <div className="text-sm text-foreground/60">
                {selectedFile ? (
                  <span>Selected: <span className="text-golden-glow">{selectedFile.name}</span></span>
                ) : (
                  <span>Select a file to continue</span>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSelect}
                  disabled={!selectedFile}
                >
                  Insert Selected File
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
