'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { ImageDropZone } from './ImageDropZone';

export interface BackgroundMedia {
  type: 'image' | 'video' | 'none';
  url: string;
  overlayColor: string;
  overlayOpacity: number;
  parallax: boolean;
}

interface BackgroundMediaControlProps {
  media: BackgroundMedia;
  onUpdate: (media: BackgroundMedia) => void;
  label?: string;
}

export function BackgroundMediaControl({
  media,
  onUpdate,
  label = 'Background Media',
}: BackgroundMediaControlProps) {
  const handleChange = (key: keyof BackgroundMedia, value: any) => {
    onUpdate({
      ...media,
      [key]: value,
    });
  };

  const handleImageUpload = (url: string) => {
    onUpdate({
      ...media,
      type: 'image',
      url,
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-golden-glow mb-6">🖼️ {label}</h3>

      <div className="space-y-6">
        {/* Media Type */}
        <div>
          <label className="block text-sm font-semibold text-foreground/80 mb-3">
            Background Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'none', label: 'None', icon: '🚫' },
              { value: 'image', label: 'Image', icon: '🖼️' },
              { value: 'video', label: 'Video', icon: '🎥' },
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => handleChange('type', type.value)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  media.type === type.value
                    ? 'border-premium-orange bg-premium-orange/10'
                    : 'border-charcoal hover:border-golden-glow'
                }`}
              >
                <div className="text-3xl mb-2">{type.icon}</div>
                <div className="text-sm font-bold text-foreground">{type.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        {media.type === 'image' && (
          <div>
            <label className="block text-sm font-semibold text-foreground/80 mb-2">
              Upload Background Image
            </label>
            <ImageDropZone
              currentImage={media.url}
              onImageChange={handleImageUpload}
              height="200px"
            />
          </div>
        )}

        {/* Video URL */}
        {media.type === 'video' && (
          <div>
            <label className="block text-sm font-semibold text-foreground/80 mb-2">
              Video URL
            </label>
            <input
              type="text"
              value={media.url}
              onChange={(e) => handleChange('url', e.target.value)}
              className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
              placeholder="https://example.com/video.mp4"
            />
            <p className="text-xs text-foreground/50 mt-2">
              Enter a direct link to an MP4 video file
            </p>
          </div>
        )}

        {/* Overlay Color */}
        {media.type !== 'none' && (
          <>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">
                Overlay Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={media.overlayColor}
                  onChange={(e) => handleChange('overlayColor', e.target.value)}
                  className="w-16 h-16 rounded-lg cursor-pointer border-2 border-charcoal"
                />
                <input
                  type="text"
                  value={media.overlayColor}
                  onChange={(e) => handleChange('overlayColor', e.target.value)}
                  className="flex-1 px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                  placeholder="#000000"
                />
              </div>
              <p className="text-xs text-foreground/50 mt-2">
                Add a color overlay to improve text readability
              </p>
            </div>

            {/* Overlay Opacity */}
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">
                Overlay Opacity: {Math.round(media.overlayOpacity * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={media.overlayOpacity}
                onChange={(e) => handleChange('overlayOpacity', Number(e.target.value))}
                className="w-full h-2 bg-charcoal rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-foreground/50 mt-1">
                <span>0% (Transparent)</span>
                <span>100% (Opaque)</span>
              </div>
            </div>

            {/* Parallax Effect */}
            {media.type === 'image' && (
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={media.parallax}
                    onChange={(e) => handleChange('parallax', e.target.checked)}
                    className="w-5 h-5 rounded border-charcoal bg-pitch-black checked:bg-premium-orange focus:ring-2 focus:ring-premium-orange"
                  />
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      Enable Parallax Effect
                    </div>
                    <div className="text-xs text-foreground/60">
                      Background moves slower than content when scrolling
                    </div>
                  </div>
                </label>
              </div>
            )}
          </>
        )}

        {/* Preview */}
        {media.type !== 'none' && media.url && (
          <div className="pt-6 border-t border-charcoal">
            <h4 className="text-sm font-semibold text-foreground/80 mb-3">Preview</h4>
            <div className="relative h-48 rounded-lg overflow-hidden">
              {media.type === 'image' ? (
                <img
                  src={media.url}
                  alt="Background preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={media.url}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                />
              )}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: media.overlayColor,
                  opacity: media.overlayOpacity,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-xl font-bold drop-shadow-lg">
                  Sample Text
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
