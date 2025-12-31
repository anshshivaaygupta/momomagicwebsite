'use client';

import React from 'react';
import { PageSection } from './PageBuilder';
import { Card } from '@/components/ui/Card';

interface LayoutControlsProps {
  section: PageSection;
  onUpdate: (updates: Partial<PageSection>) => void;
}

export function LayoutControls({ section, onUpdate }: LayoutControlsProps) {
  const handleLayoutChange = (key: keyof PageSection['layout'], value: any) => {
    onUpdate({
      layout: {
        ...section.layout,
        [key]: value,
      },
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-golden-glow mb-6">📐 Layout Controls</h2>

      <div className="space-y-6">
        {/* Grid Columns */}
        <div>
          <label className="block text-sm font-semibold text-foreground/80 mb-3">
            Grid Columns
          </label>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((cols) => (
              <button
                key={cols}
                onClick={() => handleLayoutChange('columns', cols)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  section.layout.columns === cols
                    ? 'border-premium-orange bg-premium-orange/10'
                    : 'border-charcoal hover:border-golden-glow'
                }`}
              >
                <div className="text-2xl font-bold text-foreground mb-1">{cols}</div>
                <div className="text-xs text-foreground/60">
                  {cols === 1 ? 'Single' : `${cols} Cols`}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Container Width */}
        <div>
          <label className="block text-sm font-semibold text-foreground/80 mb-3">
            Container Width
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleLayoutChange('container', 'full')}
              className={`p-4 rounded-lg border-2 transition-all ${
                section.layout.container === 'full'
                  ? 'border-premium-orange bg-premium-orange/10'
                  : 'border-charcoal hover:border-golden-glow'
              }`}
            >
              <div className="text-lg font-bold text-foreground mb-1">Full Width</div>
              <div className="text-xs text-foreground/60">Edge to edge</div>
            </button>
            <button
              onClick={() => handleLayoutChange('container', 'boxed')}
              className={`p-4 rounded-lg border-2 transition-all ${
                section.layout.container === 'boxed'
                  ? 'border-premium-orange bg-premium-orange/10'
                  : 'border-charcoal hover:border-golden-glow'
              }`}
            >
              <div className="text-lg font-bold text-foreground mb-1">Boxed</div>
              <div className="text-xs text-foreground/60">Centered container</div>
            </button>
          </div>
        </div>

        {/* Section Spacing */}
        <div>
          <label className="block text-sm font-semibold text-foreground/80 mb-2">
            Section Spacing: {section.layout.spacing}px
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="4"
            value={section.layout.spacing}
            onChange={(e) => handleLayoutChange('spacing', Number(e.target.value))}
            className="w-full h-2 bg-charcoal rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-foreground/50 mt-1">
            <span>0px (No spacing)</span>
            <span>100px (Max spacing)</span>
          </div>
        </div>

        {/* Layout Preview */}
        <div className="pt-6 border-t border-charcoal">
          <h3 className="text-sm font-semibold text-foreground/80 mb-3">Layout Preview</h3>
          <div className="bg-pitch-black p-4 rounded-lg border border-charcoal">
            <div
              className={`grid gap-2 ${
                section.layout.container === 'full' ? 'w-full' : 'max-w-4xl mx-auto'
              }`}
              style={{
                gridTemplateColumns: `repeat(${section.layout.columns}, 1fr)`,
                gap: `${section.layout.spacing / 4}px`,
              }}
            >
              {Array.from({ length: section.layout.columns }).map((_, i) => (
                <div
                  key={i}
                  className="bg-charcoal rounded p-3 text-center text-xs text-foreground/60"
                >
                  Column {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="pt-6 border-t border-charcoal">
          <h3 className="text-sm font-semibold text-foreground/80 mb-3">Quick Presets</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() =>
                onUpdate({
                  layout: { columns: 1, spacing: 48, container: 'boxed' },
                })
              }
              className="p-3 rounded-lg border border-charcoal hover:border-golden-glow transition-all text-left"
            >
              <div className="text-sm font-bold text-foreground">Hero Section</div>
              <div className="text-xs text-foreground/60">1 col, boxed, 48px</div>
            </button>
            <button
              onClick={() =>
                onUpdate({
                  layout: { columns: 3, spacing: 24, container: 'boxed' },
                })
              }
              className="p-3 rounded-lg border border-charcoal hover:border-golden-glow transition-all text-left"
            >
              <div className="text-sm font-bold text-foreground">Card Grid</div>
              <div className="text-xs text-foreground/60">3 cols, boxed, 24px</div>
            </button>
            <button
              onClick={() =>
                onUpdate({
                  layout: { columns: 2, spacing: 32, container: 'full' },
                })
              }
              className="p-3 rounded-lg border border-charcoal hover:border-golden-glow transition-all text-left"
            >
              <div className="text-sm font-bold text-foreground">Split Layout</div>
              <div className="text-xs text-foreground/60">2 cols, full, 32px</div>
            </button>
            <button
              onClick={() =>
                onUpdate({
                  layout: { columns: 4, spacing: 16, container: 'boxed' },
                })
              }
              className="p-3 rounded-lg border border-charcoal hover:border-golden-glow transition-all text-left"
            >
              <div className="text-sm font-bold text-foreground">Gallery</div>
              <div className="text-xs text-foreground/60">4 cols, boxed, 16px</div>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
