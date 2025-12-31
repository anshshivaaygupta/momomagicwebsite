'use client';

import React from 'react';
import { PageSection } from './PageBuilder';
import { Card } from '@/components/ui/Card';

interface SectionControlsProps {
  section: PageSection;
  onUpdate: (updates: Partial<PageSection>) => void;
}

export function SectionControls({ section, onUpdate }: SectionControlsProps) {
  const handleStyleChange = (key: keyof PageSection['styles'], value: any) => {
    onUpdate({
      styles: {
        ...section.styles,
        [key]: value,
      },
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-golden-glow mb-6">🎨 Section Styles</h2>

      <div className="space-y-6">
        {/* Background Color */}
        <div>
          <label className="block text-sm font-semibold text-foreground/80 mb-2">
            Background Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={section.styles.background}
              onChange={(e) => handleStyleChange('background', e.target.value)}
              className="w-16 h-16 rounded-lg cursor-pointer border-2 border-charcoal"
            />
            <input
              type="text"
              value={section.styles.background}
              onChange={(e) => handleStyleChange('background', e.target.value)}
              className="flex-1 px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
              placeholder="#000000"
            />
          </div>
          <p className="text-xs text-foreground/50 mt-2">
            Click the color box to pick a color, or enter a hex code
          </p>
        </div>

        {/* Text Color */}
        <div>
          <label className="block text-sm font-semibold text-foreground/80 mb-2">
            Text Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={section.styles.textColor}
              onChange={(e) => handleStyleChange('textColor', e.target.value)}
              className="w-16 h-16 rounded-lg cursor-pointer border-2 border-charcoal"
            />
            <input
              type="text"
              value={section.styles.textColor}
              onChange={(e) => handleStyleChange('textColor', e.target.value)}
              className="flex-1 px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
              placeholder="#FFFFFF"
            />
          </div>
        </div>

        {/* Font Family */}
        <div>
          <label className="block text-sm font-semibold text-foreground/80 mb-2">
            Font Family
          </label>
          <select
            value={section.styles.fontFamily}
            onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
            className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
          >
            <option value="Inter">Inter (Default)</option>
            <option value="Poppins">Poppins</option>
            <option value="Roboto">Roboto</option>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
          </select>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-sm font-semibold text-foreground/80 mb-2">
            Font Size: {section.styles.fontSize}px
          </label>
          <input
            type="range"
            min="12"
            max="72"
            value={section.styles.fontSize}
            onChange={(e) => handleStyleChange('fontSize', Number(e.target.value))}
            className="w-full h-2 bg-charcoal rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-foreground/50 mt-1">
            <span>12px</span>
            <span>72px</span>
          </div>
        </div>

        {/* Preview */}
        <div className="pt-6 border-t border-charcoal">
          <h3 className="text-sm font-semibold text-foreground/80 mb-3">Preview</h3>
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: section.styles.background,
              color: section.styles.textColor,
              fontFamily: section.styles.fontFamily,
              fontSize: `${section.styles.fontSize}px`,
            }}
          >
            <p>This is how your text will look</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
