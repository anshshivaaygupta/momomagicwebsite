'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { ButtonEditor, ButtonStyle } from './ButtonEditor';
import { BackgroundMediaControl, BackgroundMedia } from './BackgroundMediaControl';
import { motion, AnimatePresence } from 'framer-motion';

interface VisualDesignPanelProps {
  pageName: string;
  onSave?: () => void;
}

export function VisualDesignPanel({ pageName, onSave }: VisualDesignPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const [buttonStyle, setButtonStyle] = useState<ButtonStyle>({
    text: 'Order Now',
    backgroundColor: '#FF6B35',
    textColor: '#0A0A0A',
    borderWidth: 0,
    borderColor: '#FFD700',
    borderRadius: 8,
    hoverEffect: 'lift',
  });

  const [backgroundMedia, setBackgroundMedia] = useState<BackgroundMedia>({
    type: 'image',
    url: '/images/hero-bg.jpg',
    overlayColor: '#000000',
    overlayOpacity: 0.5,
    parallax: true,
  });

  const [sectionStyles, setSectionStyles] = useState({
    backgroundColor: '#0A0A0A',
    textColor: '#FFFFFF',
    fontFamily: 'Inter',
    fontSize: 16,
  });

  const [layoutSettings, setLayoutSettings] = useState({
    columns: 1 as 1 | 2 | 3 | 4,
    spacing: 48,
    container: 'boxed' as 'full' | 'boxed',
  });

  const handleSaveDesign = async () => {
    const designConfig = {
      pageName,
      buttonStyle,
      backgroundMedia,
      sectionStyles,
      layoutSettings,
    };

    try {
      const response = await fetch('/api/cms/page-builder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageName,
          sections: [designConfig],
        }),
      });

      if (response.ok) {
        alert('✅ Design settings saved successfully!');
        if (onSave) onSave();
      } else {
        alert('❌ Failed to save design settings');
      }
    } catch (error) {
      console.error('Error saving design:', error);
      alert('❌ Error saving design settings');
    }
  };

  return (
    <div className="mt-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 bg-deep-space border-2 border-charcoal rounded-lg text-left hover:border-golden-glow transition-all"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-golden-glow flex items-center gap-2">
              🎨 Visual Design Controls
              <span className="text-xs bg-premium-orange/20 text-premium-orange px-2 py-1 rounded">
                NEW
              </span>
            </h3>
            <p className="text-sm text-foreground/60 mt-1">
              Customize colors, fonts, buttons, backgrounds, and layout
            </p>
          </div>
          <div className="text-2xl text-golden-glow">
            {isExpanded ? '▼' : '▶'}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Button Style Editor */}
              <ButtonEditor
                buttonStyle={buttonStyle}
                onUpdate={setButtonStyle}
                label="Primary Button Style"
              />

              {/* Background Media Control */}
              <BackgroundMediaControl
                media={backgroundMedia}
                onUpdate={setBackgroundMedia}
                label="Section Background"
              />

              {/* Section Styles */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-golden-glow mb-6">🎨 Section Styles</h3>

                <div className="space-y-6">
                  {/* Background Color */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Background Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={sectionStyles.backgroundColor}
                        onChange={(e) =>
                          setSectionStyles({ ...sectionStyles, backgroundColor: e.target.value })
                        }
                        className="w-16 h-16 rounded-lg cursor-pointer border-2 border-charcoal"
                      />
                      <input
                        type="text"
                        value={sectionStyles.backgroundColor}
                        onChange={(e) =>
                          setSectionStyles({ ...sectionStyles, backgroundColor: e.target.value })
                        }
                        className="flex-1 px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                        placeholder="#0A0A0A"
                      />
                    </div>
                  </div>

                  {/* Text Color */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Text Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={sectionStyles.textColor}
                        onChange={(e) =>
                          setSectionStyles({ ...sectionStyles, textColor: e.target.value })
                        }
                        className="w-16 h-16 rounded-lg cursor-pointer border-2 border-charcoal"
                      />
                      <input
                        type="text"
                        value={sectionStyles.textColor}
                        onChange={(e) =>
                          setSectionStyles({ ...sectionStyles, textColor: e.target.value })
                        }
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
                      value={sectionStyles.fontFamily}
                      onChange={(e) =>
                        setSectionStyles({ ...sectionStyles, fontFamily: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    >
                      <option value="Inter">Inter (Default)</option>
                      <option value="Poppins">Poppins</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Arial">Arial</option>
                      <option value="Georgia">Georgia</option>
                    </select>
                  </div>

                  {/* Font Size */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Font Size: {sectionStyles.fontSize}px
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="72"
                      value={sectionStyles.fontSize}
                      onChange={(e) =>
                        setSectionStyles({ ...sectionStyles, fontSize: Number(e.target.value) })
                      }
                      className="w-full h-2 bg-charcoal rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </Card>

              {/* Layout Controls */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-golden-glow mb-6">📐 Layout Settings</h3>

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
                          onClick={() =>
                            setLayoutSettings({
                              ...layoutSettings,
                              columns: cols as 1 | 2 | 3 | 4,
                            })
                          }
                          className={`p-4 rounded-lg border-2 transition-all ${
                            layoutSettings.columns === cols
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
                        onClick={() => setLayoutSettings({ ...layoutSettings, container: 'full' })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          layoutSettings.container === 'full'
                            ? 'border-premium-orange bg-premium-orange/10'
                            : 'border-charcoal hover:border-golden-glow'
                        }`}
                      >
                        <div className="text-lg font-bold text-foreground mb-1">Full Width</div>
                        <div className="text-xs text-foreground/60">Edge to edge</div>
                      </button>
                      <button
                        onClick={() => setLayoutSettings({ ...layoutSettings, container: 'boxed' })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          layoutSettings.container === 'boxed'
                            ? 'border-premium-orange bg-premium-orange/10'
                            : 'border-charcoal hover:border-golden-glow'
                        }`}
                      >
                        <div className="text-lg font-bold text-foreground mb-1">Boxed</div>
                        <div className="text-xs text-foreground/60">Centered</div>
                      </button>
                    </div>
                  </div>

                  {/* Section Spacing */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Section Spacing: {layoutSettings.spacing}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="4"
                      value={layoutSettings.spacing}
                      onChange={(e) =>
                        setLayoutSettings({ ...layoutSettings, spacing: Number(e.target.value) })
                      }
                      className="w-full h-2 bg-charcoal rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSaveDesign}
                className="px-8 py-4 bg-vegetarian-green text-pitch-black rounded-lg font-bold hover:-translate-y-0.5 transition-all duration-300 text-lg"
              >
                💾 Save Design Settings
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
