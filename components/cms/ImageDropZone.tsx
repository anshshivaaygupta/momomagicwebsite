'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageDropZoneProps {
  currentImage?: string;
  onImageChange: (url: string) => void;
  onUpload?: (file: File) => Promise<string>;
  alt?: string;
  className?: string;
  height?: string;
  showControls?: boolean;
}

export function ImageDropZone({
  currentImage,
  onImageChange,
  onUpload,
  alt = 'Image',
  className = '',
  height = '200px',
  showControls = true,
}: ImageDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setIsUploading(true);
    try {
      if (onUpload) {
        const url = await onUpload(file);
        onImageChange(url);
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            onImageChange(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onImageChange(urlInput.trim());
      setUrlInput('');
      setShowUrlInput(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
          isDragging
            ? 'border-4 border-premium-orange border-dashed bg-premium-orange/10'
            : 'border-2 border-charcoal hover:border-golden-glow'
        }`}
        style={{ height }}
      >
        {currentImage ? (
          <div className="relative w-full h-full group">
            <img
              src={currentImage}
              alt={alt}
              className="w-full h-full object-cover"
            />
            {showControls && (
              <div className="absolute inset-0 bg-pitch-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-4 py-2 bg-premium-orange text-pitch-black rounded-lg font-bold hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
                  >
                    {isUploading ? '⏳ Uploading...' : '📁 Replace'}
                  </button>
                  <button
                    onClick={() => setShowUrlInput(true)}
                    className="px-4 py-2 bg-golden-glow text-pitch-black rounded-lg font-bold hover:-translate-y-0.5 transition-all duration-300"
                  >
                    🔗 URL
                  </button>
                  <button
                    onClick={() => onImageChange('')}
                    className="px-4 py-2 bg-warm-orange text-white rounded-lg font-bold hover:-translate-y-0.5 transition-all duration-300"
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-charcoal/50 text-foreground/60">
            {isUploading ? (
              <>
                <div className="text-4xl mb-2 animate-bounce">⏳</div>
                <p className="text-sm">Uploading...</p>
              </>
            ) : isDragging ? (
              <>
                <div className="text-4xl mb-2">📥</div>
                <p className="text-sm font-semibold">Drop image here</p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-2">📸</div>
                <p className="text-sm font-semibold mb-2">Drag & drop image here</p>
                <p className="text-xs mb-4">or</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-premium-orange text-pitch-black rounded-lg font-bold hover:-translate-y-0.5 transition-all duration-300"
                >
                  📁 Browse Files
                </button>
                <button
                  onClick={() => setShowUrlInput(true)}
                  className="mt-2 px-4 py-2 bg-golden-glow text-pitch-black rounded-lg font-bold hover:-translate-y-0.5 transition-all duration-300"
                >
                  🔗 Enter URL
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* URL Input Modal */}
      <AnimatePresence>
        {showUrlInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-pitch-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUrlInput(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-deep-space border border-charcoal rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-premium-orange mb-4">
                Enter Image URL
              </h3>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow mb-4"
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  onClick={handleUrlSubmit}
                  className="flex-1 px-4 py-2 bg-premium-orange text-pitch-black rounded-lg font-bold hover:-translate-y-0.5 transition-all duration-300"
                >
                  ✅ Apply
                </button>
                <button
                  onClick={() => {
                    setUrlInput('');
                    setShowUrlInput(false);
                  }}
                  className="px-4 py-2 bg-charcoal text-foreground rounded-lg font-bold hover:bg-charcoal/70 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isDragging && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 border-4 border-premium-orange border-dashed rounded-lg animate-pulse" />
        </div>
      )}
    </div>
  );
}
