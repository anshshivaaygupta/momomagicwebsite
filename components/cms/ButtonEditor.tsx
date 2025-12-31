'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';

export interface ButtonStyle {
  text: string;
  backgroundColor: string;
  textColor: string;
  borderWidth: number;
  borderColor: string;
  borderRadius: number;
  hoverEffect: 'lift' | 'glow' | 'colorChange' | 'none';
  hoverColor?: string;
}

interface ButtonEditorProps {
  buttonStyle: ButtonStyle;
  onUpdate: (style: ButtonStyle) => void;
  label?: string;
}

export function ButtonEditor({ buttonStyle, onUpdate, label = 'Button Style' }: ButtonEditorProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (key: keyof ButtonStyle, value: any) => {
    onUpdate({
      ...buttonStyle,
      [key]: value,
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-golden-glow mb-6">🔘 {label}</h3>

      <div className="space-y-6">
        {/* Button Text */}
        <div>
          <label className="block text-sm font-semibold text-foreground/80 mb-2">
            Button Text
          </label>
          <input
            type="text"
            value={buttonStyle.text}
            onChange={(e) => handleChange('text', e.target.value)}
            className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
            placeholder="Enter button text"
          />
        </div>

        {/* Background Color */}
        <div>
          <label className="block text-sm font-semibold text-foreground/80 mb-2">
            Background Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={buttonStyle.backgroundColor}
              onChange={(e) => handleChange('backgroundColor', e.target.value)}
              className="w-16 h-16 rounded-lg cursor-pointer border-2 border-charcoal"
            />
            <input
              type="text"
              value={buttonStyle.backgroundColor}
              onChange={(e) => handleChange('backgroundColor', e.target.value)}
              className="flex-1 px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
              placeholder="#FF6B35"
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
              value={buttonStyle.textColor}
              onChange={(e) => handleChange('textColor', e.target.value)}
              className="w-16 h-16 rounded-lg cursor-pointer border-2 border-charcoal"
            />
            <input
              type="text"
              value={buttonStyle.textColor}
              onChange={(e) => handleChange('textColor', e.target.value)}
              className="flex-1 px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
              placeholder="#000000"
            />
          </div>
        </div>

        {/* Border Width */}
        <div>
          <label className="block text-sm font-semibold text-foreground/80 mb-2">
            Border Width: {buttonStyle.borderWidth}px
          </label>
          <input
            type="range"
            min="0"
            max="8"
            value={buttonStyle.borderWidth}
            onChange={(e) => handleChange('borderWidth', Number(e.target.value))}
            className="w-full h-2 bg-charcoal rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-foreground/50 mt-1">
            <span>0px (No border)</span>
            <span>8px (Thick border)</span>
          </div>
        </div>

        {/* Border Color */}
        {buttonStyle.borderWidth > 0 && (
          <div>
            <label className="block text-sm font-semibold text-foreground/80 mb-2">
              Border Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={buttonStyle.borderColor}
                onChange={(e) => handleChange('borderColor', e.target.value)}
                className="w-16 h-16 rounded-lg cursor-pointer border-2 border-charcoal"
              />
              <input
                type="text"
                value={buttonStyle.borderColor}
                onChange={(e) => handleChange('borderColor', e.target.value)}
                className="flex-1 px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                placeholder="#FFD700"
              />
            </div>
          </div>
        )}

        {/* Border Radius */}
        <div>
          <label className="block text-sm font-semibold text-foreground/80 mb-2">
            Border Radius: {buttonStyle.borderRadius}px
          </label>
          <input
            type="range"
            min="0"
            max="50"
            value={buttonStyle.borderRadius}
            onChange={(e) => handleChange('borderRadius', Number(e.target.value))}
            className="w-full h-2 bg-charcoal rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-foreground/50 mt-1">
            <span>0px (Square)</span>
            <span>50px (Pill)</span>
          </div>
        </div>

        {/* Hover Effect */}
        <div>
          <label className="block text-sm font-semibold text-foreground/80 mb-3">
            Hover Effect
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'lift', label: 'Lift Up', icon: '⬆️' },
              { value: 'glow', label: 'Glow', icon: '✨' },
              { value: 'colorChange', label: 'Color Change', icon: '🎨' },
              { value: 'none', label: 'None', icon: '🚫' },
            ].map((effect) => (
              <button
                key={effect.value}
                onClick={() => handleChange('hoverEffect', effect.value)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  buttonStyle.hoverEffect === effect.value
                    ? 'border-premium-orange bg-premium-orange/10'
                    : 'border-charcoal hover:border-golden-glow'
                }`}
              >
                <div className="text-2xl mb-1">{effect.icon}</div>
                <div className="text-sm font-bold text-foreground">{effect.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Hover Color (for colorChange effect) */}
        {buttonStyle.hoverEffect === 'colorChange' && (
          <div>
            <label className="block text-sm font-semibold text-foreground/80 mb-2">
              Hover Background Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={buttonStyle.hoverColor || '#FFD700'}
                onChange={(e) => handleChange('hoverColor', e.target.value)}
                className="w-16 h-16 rounded-lg cursor-pointer border-2 border-charcoal"
              />
              <input
                type="text"
                value={buttonStyle.hoverColor || '#FFD700'}
                onChange={(e) => handleChange('hoverColor', e.target.value)}
                className="flex-1 px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                placeholder="#FFD700"
              />
            </div>
          </div>
        )}

        {/* Preview */}
        <div className="pt-6 border-t border-charcoal">
          <h4 className="text-sm font-semibold text-foreground/80 mb-3">Preview</h4>
          <div className="flex justify-center">
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                backgroundColor:
                  isHovered && buttonStyle.hoverEffect === 'colorChange'
                    ? buttonStyle.hoverColor
                    : buttonStyle.backgroundColor,
                color: buttonStyle.textColor,
                borderWidth: `${buttonStyle.borderWidth}px`,
                borderColor: buttonStyle.borderColor,
                borderRadius: `${buttonStyle.borderRadius}px`,
                borderStyle: 'solid',
                transform:
                  isHovered && buttonStyle.hoverEffect === 'lift'
                    ? 'translateY(-4px)'
                    : 'translateY(0)',
                boxShadow:
                  isHovered && buttonStyle.hoverEffect === 'glow'
                    ? `0 0 20px ${buttonStyle.backgroundColor}`
                    : 'none',
              }}
              className="px-8 py-4 font-bold transition-all duration-300"
            >
              {buttonStyle.text || 'Button Text'}
            </button>
          </div>
          <p className="text-xs text-center text-foreground/50 mt-3">
            Hover over the button to see the effect
          </p>
        </div>
      </div>
    </Card>
  );
}
