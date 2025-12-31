'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ComponentBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

type ComponentType = 'button' | 'card' | 'form';

interface ButtonStyle {
  size: 'small' | 'medium' | 'large';
  variant: 'primary' | 'secondary' | 'outline';
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  rounded: number;
  shadow: boolean;
  icon?: string;
  iconPosition: 'left' | 'right';
}

interface CardStyle {
  layout: 'product' | 'team' | 'feature' | 'blog';
  backgroundColor: string;
  borderColor: string;
  rounded: number;
  shadow: boolean;
  imageAspect: '1:1' | '16:9' | '4:3';
}

export const ComponentBuilder: React.FC<ComponentBuilderProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<ComponentType>('button');
  
  const [buttonStyle, setButtonStyle] = useState<ButtonStyle>({
    size: 'medium',
    variant: 'primary',
    backgroundColor: '#ffc241',
    textColor: '#000000',
    borderColor: '#ffc241',
    rounded: 8,
    shadow: true,
    iconPosition: 'left',
  });
  const [buttonText, setButtonText] = useState('Click Me');

  const [cardStyle, setCardStyle] = useState<CardStyle>({
    layout: 'product',
    backgroundColor: '#111111',
    borderColor: '#ffc241',
    rounded: 8,
    shadow: true,
    imageAspect: '16:9',
  });

  if (!isOpen) return null;

  const getButtonClasses = () => {
    const sizeClasses = {
      small: 'px-4 py-2 text-sm',
      medium: 'px-6 py-3 text-base',
      large: 'px-8 py-4 text-lg',
    };

    return `${sizeClasses[buttonStyle.size]} font-bold transition-all ${
      buttonStyle.shadow ? 'shadow-lg' : ''
    }`;
  };

  const getButtonStyles = () => {
    return {
      backgroundColor: buttonStyle.variant === 'outline' ? 'transparent' : buttonStyle.backgroundColor,
      color: buttonStyle.textColor,
      borderRadius: `${buttonStyle.rounded}px`,
      border: buttonStyle.variant === 'outline' ? `2px solid ${buttonStyle.borderColor}` : 'none',
    };
  };

  const generateButtonCode = () => {
    return `<button 
  class="${getButtonClasses()}"
  style="${Object.entries(getButtonStyles()).map(([k, v]) => `${k}: ${v}`).join('; ')}"
>
  ${buttonStyle.icon && buttonStyle.iconPosition === 'left' ? `${buttonStyle.icon} ` : ''}${buttonText}${buttonStyle.icon && buttonStyle.iconPosition === 'right' ? ` ${buttonStyle.icon}` : ''}
</button>`;
  };

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
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          className="absolute bottom-0 left-0 right-0 h-[80vh] bg-charcoal shadow-2xl overflow-hidden flex flex-col rounded-t-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-deep-space border-b border-premium-orange/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-premium-orange flex items-center gap-2">
                🎨 Component Builder
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

            {/* Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('button')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'button'
                    ? 'bg-premium-orange text-pitch-black'
                    : 'bg-pitch-black text-gray-400 hover:text-white'
                }`}
              >
                <span>🔘</span>
                <span>Buttons</span>
              </button>
              <button
                onClick={() => setActiveTab('card')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'card'
                    ? 'bg-premium-orange text-pitch-black'
                    : 'bg-pitch-black text-gray-400 hover:text-white'
                }`}
              >
                <span>🃏</span>
                <span>Cards</span>
              </button>
              <button
                onClick={() => setActiveTab('form')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'form'
                    ? 'bg-premium-orange text-pitch-black'
                    : 'bg-pitch-black text-gray-400 hover:text-white'
                }`}
              >
                <span>📝</span>
                <span>Forms</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Left: Controls */}
              <div className="space-y-6">
                {activeTab === 'button' && (
                  <>
                    <div>
                      <h3 className="text-white font-bold mb-4">Button Designer</h3>
                      
                      {/* Button Text */}
                      <div className="mb-4">
                        <label className="text-gray-400 text-sm mb-2 block">Button Text</label>
                        <input
                          type="text"
                          value={buttonText}
                          onChange={(e) => setButtonText(e.target.value)}
                          className="w-full bg-pitch-black border border-premium-orange/30 rounded-lg px-4 py-2 text-white focus:border-premium-orange focus:outline-none"
                        />
                      </div>

                      {/* Size */}
                      <div className="mb-4">
                        <label className="text-gray-400 text-sm mb-2 block">Size</label>
                        <div className="grid grid-cols-3 gap-2">
                          {(['small', 'medium', 'large'] as const).map((size) => (
                            <button
                              key={size}
                              onClick={() => setButtonStyle({ ...buttonStyle, size })}
                              className={`py-2 rounded-lg font-semibold transition-all ${
                                buttonStyle.size === size
                                  ? 'bg-premium-orange text-pitch-black'
                                  : 'bg-pitch-black text-gray-400 hover:text-white'
                              }`}
                            >
                              {size.charAt(0).toUpperCase() + size.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Variant */}
                      <div className="mb-4">
                        <label className="text-gray-400 text-sm mb-2 block">Variant</label>
                        <div className="grid grid-cols-3 gap-2">
                          {(['primary', 'secondary', 'outline'] as const).map((variant) => (
                            <button
                              key={variant}
                              onClick={() => setButtonStyle({ ...buttonStyle, variant })}
                              className={`py-2 rounded-lg font-semibold transition-all ${
                                buttonStyle.variant === variant
                                  ? 'bg-premium-orange text-pitch-black'
                                  : 'bg-pitch-black text-gray-400 hover:text-white'
                              }`}
                            >
                              {variant.charAt(0).toUpperCase() + variant.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Colors */}
                      <div className="mb-4">
                        <label className="text-gray-400 text-sm mb-2 block">Background Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={buttonStyle.backgroundColor}
                            onChange={(e) => setButtonStyle({ ...buttonStyle, backgroundColor: e.target.value })}
                            className="w-16 h-10 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={buttonStyle.backgroundColor}
                            onChange={(e) => setButtonStyle({ ...buttonStyle, backgroundColor: e.target.value })}
                            className="flex-1 bg-pitch-black border border-premium-orange/30 rounded-lg px-4 py-2 text-white font-mono text-sm"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="text-gray-400 text-sm mb-2 block">Text Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={buttonStyle.textColor}
                            onChange={(e) => setButtonStyle({ ...buttonStyle, textColor: e.target.value })}
                            className="w-16 h-10 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={buttonStyle.textColor}
                            onChange={(e) => setButtonStyle({ ...buttonStyle, textColor: e.target.value })}
                            className="flex-1 bg-pitch-black border border-premium-orange/30 rounded-lg px-4 py-2 text-white font-mono text-sm"
                          />
                        </div>
                      </div>

                      {/* Rounded */}
                      <div className="mb-4">
                        <label className="text-gray-400 text-sm mb-2 block">
                          Border Radius: {buttonStyle.rounded}px
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="50"
                          value={buttonStyle.rounded}
                          onChange={(e) => setButtonStyle({ ...buttonStyle, rounded: parseInt(e.target.value) })}
                          className="w-full accent-premium-orange"
                        />
                      </div>

                      {/* Shadow */}
                      <div className="mb-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={buttonStyle.shadow}
                            onChange={(e) => setButtonStyle({ ...buttonStyle, shadow: e.target.checked })}
                            className="w-5 h-5 accent-premium-orange"
                          />
                          <span className="text-gray-400">Add Shadow</span>
                        </label>
                      </div>

                      {/* Icon */}
                      <div className="mb-4">
                        <label className="text-gray-400 text-sm mb-2 block">Icon (optional)</label>
                        <input
                          type="text"
                          value={buttonStyle.icon || ''}
                          onChange={(e) => setButtonStyle({ ...buttonStyle, icon: e.target.value })}
                          placeholder="e.g., 🚀 or →"
                          className="w-full bg-pitch-black border border-premium-orange/30 rounded-lg px-4 py-2 text-white focus:border-premium-orange focus:outline-none"
                        />
                      </div>

                      {buttonStyle.icon && (
                        <div className="mb-4">
                          <label className="text-gray-400 text-sm mb-2 block">Icon Position</label>
                          <div className="grid grid-cols-2 gap-2">
                            {(['left', 'right'] as const).map((position) => (
                              <button
                                key={position}
                                onClick={() => setButtonStyle({ ...buttonStyle, iconPosition: position })}
                                className={`py-2 rounded-lg font-semibold transition-all ${
                                  buttonStyle.iconPosition === position
                                    ? 'bg-premium-orange text-pitch-black'
                                    : 'bg-pitch-black text-gray-400 hover:text-white'
                                }`}
                              >
                                {position.charAt(0).toUpperCase() + position.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {activeTab === 'card' && (
                  <div>
                    <h3 className="text-white font-bold mb-4">Card Designer</h3>
                    <p className="text-gray-400">Card builder coming soon...</p>
                  </div>
                )}

                {activeTab === 'form' && (
                  <div>
                    <h3 className="text-white font-bold mb-4">Form Builder</h3>
                    <p className="text-gray-400">Form builder coming soon...</p>
                  </div>
                )}
              </div>

              {/* Right: Preview */}
              <div>
                <h3 className="text-white font-bold mb-4">Live Preview</h3>
                <div className="bg-pitch-black rounded-lg p-8 mb-6 flex items-center justify-center min-h-[200px]">
                  {activeTab === 'button' && (
                    <button
                      className={getButtonClasses()}
                      style={getButtonStyles()}
                    >
                      {buttonStyle.icon && buttonStyle.iconPosition === 'left' && (
                        <span className="mr-2">{buttonStyle.icon}</span>
                      )}
                      {buttonText}
                      {buttonStyle.icon && buttonStyle.iconPosition === 'right' && (
                        <span className="ml-2">{buttonStyle.icon}</span>
                      )}
                    </button>
                  )}
                </div>

                {/* Code Output */}
                <div>
                  <h4 className="text-white font-bold mb-2">Generated Code</h4>
                  <div className="bg-pitch-black rounded-lg p-4 overflow-x-auto">
                    <pre className="text-gray-300 text-sm font-mono">
                      {activeTab === 'button' && generateButtonCode()}
                    </pre>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <button className="flex-1 bg-premium-orange text-pitch-black py-3 rounded-lg font-bold hover:bg-golden-glow transition-all">
                    💾 Save Component
                  </button>
                  <button className="px-6 py-3 rounded-lg border-2 border-premium-orange text-premium-orange hover:bg-premium-orange hover:text-pitch-black transition-all">
                    📋 Copy Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
