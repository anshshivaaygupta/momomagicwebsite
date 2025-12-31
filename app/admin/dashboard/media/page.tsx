'use client';

import React, { useState, useEffect, useRef } from 'react';
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

export default function MediaLibraryPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const response = await fetch('/api/cms/media');
      if (response.ok) {
        const data = await response.json();
        setFiles(data.files || []);
      }
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    await uploadFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      uploadFiles(selectedFiles);
    }
  };

  const uploadFiles = async (filesToUpload: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);

    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/cms/media/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          setMessage(`✅ ${file.name} uploaded successfully!`);
        } else {
          setMessage(`❌ Failed to upload ${file.name}`);
        }

        setUploadProgress(((i + 1) / filesToUpload.length) * 100);
      } catch (error) {
        setMessage(`❌ Error uploading ${file.name}`);
      }
    }

    setIsUploading(false);
    setUploadProgress(0);
    loadFiles();
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await fetch(`/api/cms/media?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('✅ File deleted successfully!');
        loadFiles();
      } else {
        setMessage('❌ Failed to delete file');
      }
    } catch (error) {
      setMessage('❌ Error deleting file');
    } finally {
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setMessage('✅ URL copied to clipboard!');
    setTimeout(() => setMessage(''), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-golden-glow">Loading media library...</p>
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
              Media Library
            </h1>
            <p className="text-foreground/70">
              Upload and manage images and videos
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => fileInputRef.current?.click()}
          >
            📤 Upload Files
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

        {/* Upload Progress */}
        {isUploading && (
          <Card className="mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-foreground/70 mb-2">Uploading...</p>
                <div className="w-full bg-charcoal rounded-full h-2">
                  <div
                    className="bg-premium-orange h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
              <span className="text-golden-glow font-bold">{Math.round(uploadProgress)}%</span>
            </div>
          </Card>
        )}

        {/* Drag & Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`mb-8 border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
            isDragging
              ? 'border-golden-glow bg-golden-glow/10'
              : 'border-charcoal hover:border-premium-orange'
          }`}
        >
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-xl font-bold text-premium-orange mb-2">
            Drag & Drop Files Here
          </h3>
          <p className="text-foreground/70 mb-4">
            or click the button above to browse
          </p>
          <p className="text-sm text-foreground/60">
            Supports: JPG, PNG, GIF, MP4, WebM (Max 10MB)
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {files.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="group relative overflow-hidden cursor-pointer hover:border-golden-glow transition-all duration-300">
                {/* Preview */}
                <div
                  className="h-48 bg-charcoal rounded-lg mb-3 flex items-center justify-center overflow-hidden"
                  onClick={() => setSelectedFile(file)}
                >
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
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-foreground truncate">
                    {file.name}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-foreground/60">
                    <span>{formatFileSize(file.size)}</span>
                    <span className="uppercase">{file.type}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-charcoal">
                    <button
                      onClick={() => copyToClipboard(file.url)}
                      className="flex-1 px-3 py-2 bg-premium-orange text-pitch-black rounded-lg text-xs font-bold hover:-translate-y-0.5 transition-all duration-300"
                    >
                      📋 Copy URL
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="px-3 py-2 bg-warm-orange/20 text-warm-orange rounded-lg text-xs font-bold hover:bg-warm-orange/30 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {files.length === 0 && !isUploading && (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-golden-glow mb-2">
              No Files Yet
            </h3>
            <p className="text-foreground/70 mb-6">
              Start by uploading your first image or video
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => fileInputRef.current?.click()}
            >
              📤 Upload First File
            </Button>
          </Card>
        )}
      </motion.div>

      {/* File Preview Modal */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-pitch-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedFile(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-premium-orange">
                    {selectedFile.name}
                  </h3>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-foreground/70 hover:text-warm-orange transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="bg-pitch-black rounded-lg p-4 mb-4">
                  {selectedFile.type === 'image' ? (
                    <img
                      src={selectedFile.url}
                      alt={selectedFile.name}
                      className="w-full h-auto max-h-[60vh] object-contain"
                    />
                  ) : (
                    <video
                      src={selectedFile.url}
                      controls
                      className="w-full h-auto max-h-[60vh]"
                    />
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Size:</span>
                    <span className="text-foreground">{formatFileSize(selectedFile.size)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Type:</span>
                    <span className="text-foreground uppercase">{selectedFile.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">URL:</span>
                    <button
                      onClick={() => copyToClipboard(selectedFile.url)}
                      className="text-premium-orange hover:text-golden-glow transition-colors"
                    >
                      {selectedFile.url} 📋
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
