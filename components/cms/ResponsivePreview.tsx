'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type Breakpoint = 320 | 768 | 1024 | 1280;

interface ResponsivePreviewProps {
  children: React.ReactNode;
  onDeviceChange?: (device: DeviceType) => void;
  onBreakpointChange?: (breakpoint: Breakpoint) => void;
}

interface DeviceConfig {
  name: string;
  width: number;
  height: number;
  icon: string;
  type: DeviceType;
}

const devices: DeviceConfig[] = [
  { name: 'iPhone SE', width: 375, height: 667, icon: '📱', type: 'mobile' },
  { name: 'iPhone 12 Pro', width: 390, height: 844, icon: '📱', type: 'mobile' },
  { name: 'iPad Mini', width: 768, height: 1024, icon: '📱', type: 'tablet' },
  { name: 'iPad Pro', width: 1024, height: 1366, icon: '📱', type: 'tablet' },
  { name: 'Desktop', width: 1280, height: 800, icon: '💻', type: 'desktop' },
  { name: 'Desktop HD', width: 1920, height: 1080, icon: '💻', type: 'desktop' },
];

const breakpoints: { value: Breakpoint; label: string; description: string }[] = [
  { value: 320, label: 'Mobile S', description: 'Small phones' },
  { value: 768, label: 'Tablet', description: 'Tablets & large phones' },
  { value: 1024, label: 'Desktop', description: 'Small desktops' },
  { value: 1280, label: 'Desktop HD', description: 'Large desktops' },
];

export const ResponsivePreview: React.FC<ResponsivePreviewProps> = ({
  children,
  onDeviceChange,
  onBreakpointChange,
}) => {
  const [currentDevice, setCurrentDevice] = useState<DeviceConfig>(devices[4]); // Desktop default
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [showBreakpoints, setShowBreakpoints] = useState(false);
  const [customWidth, setCustomWidth] = useState<number>(1280);
  const [scale, setScale] = useState(1);
  const [showRuler, setShowRuler] = useState(false);

  useEffect(() => {
    if (onDeviceChange) {
      onDeviceChange(currentDevice.type);
    }
  }, [currentDevice, onDeviceChange]);

  const handleDeviceChange = (device: DeviceConfig) => {
    setCurrentDevice(device);
    setCustomWidth(device.width);
  };

  const handleOrientationToggle = () => {
    setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait');
  };

  const handleBreakpointSelect = (breakpoint: Breakpoint) => {
    setCustomWidth(breakpoint);
    setShowBreakpoints(false);
    if (onBreakpointChange) {
      onBreakpointChange(breakpoint);
    }
  };

  const getDeviceWidth = () => {
    if (orientation === 'landscape' && currentDevice.type !== 'desktop') {
      return currentDevice.height;
    }
    return customWidth;
  };

  const getDeviceHeight = () => {
    if (orientation === 'landscape' && currentDevice.type !== 'desktop') {
      return currentDevice.width;
    }
    return currentDevice.height;
  };

  const getCurrentBreakpoint = (): Breakpoint => {
    const width = getDeviceWidth();
    if (width < 768) return 320;
    if (width < 1024) return 768;
    if (width < 1280) return 1024;
    return 1280;
  };

  return (
    <div className="responsive-preview h-screen flex flex-col bg-pitch-black">
      {/* Top Control Bar */}
      <div className="bg-deep-space border-b border-premium-orange/20 p-4">
        <div className="flex items-center justify-between">
          {/* Left: Device Selector */}
          <div className="flex items-center gap-3">
            <h3 className="text-white font-bold">📱 Device Preview</h3>
            <div className="flex gap-2">
              {devices.map((device) => (
                <button
                  key={device.name}
                  onClick={() => handleDeviceChange(device)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentDevice.name === device.name
                      ? 'bg-premium-orange text-pitch-black'
                      : 'bg-charcoal text-gray-400 hover:text-white'
                  }`}
                  title={device.name}
                >
                  {device.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Center: Breakpoint Info */}
          <div className="flex items-center gap-4">
            <div className="bg-charcoal px-4 py-2 rounded-lg">
              <span className="text-gray-400 text-sm">Current Breakpoint:</span>
              <span className="text-premium-orange font-bold ml-2">
                {getCurrentBreakpoint()}px
              </span>
            </div>
            <button
              onClick={() => setShowBreakpoints(!showBreakpoints)}
              className="bg-charcoal text-premium-orange px-4 py-2 rounded-lg font-semibold hover:bg-premium-orange hover:text-pitch-black transition-all"
            >
              📐 Breakpoints
            </button>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-2">
            {/* Orientation Toggle */}
            {currentDevice.type !== 'desktop' && (
              <button
                onClick={handleOrientationToggle}
                className="bg-charcoal text-white px-4 py-2 rounded-lg hover:bg-premium-orange hover:text-pitch-black transition-all"
                title="Toggle Orientation"
              >
                {orientation === 'portrait' ? '📱' : '🔄'}
              </button>
            )}

            {/* Ruler Toggle */}
            <button
              onClick={() => setShowRuler(!showRuler)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                showRuler
                  ? 'bg-premium-orange text-pitch-black'
                  : 'bg-charcoal text-gray-400 hover:text-white'
              }`}
              title="Toggle Ruler"
            >
              📏
            </button>

            {/* Scale Control */}
            <div className="flex items-center gap-2 bg-charcoal px-4 py-2 rounded-lg">
              <button
                onClick={() => setScale(Math.max(0.25, scale - 0.25))}
                className="text-white hover:text-premium-orange"
              >
                -
              </button>
              <span className="text-white font-mono text-sm w-12 text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale(Math.min(2, scale + 0.25))}
                className="text-white hover:text-premium-orange"
              >
                +
              </button>
            </div>

            {/* Custom Width Input */}
            <div className="flex items-center gap-2 bg-charcoal px-4 py-2 rounded-lg">
              <input
                type="number"
                value={customWidth}
                onChange={(e) => setCustomWidth(parseInt(e.target.value) || 320)}
                className="w-20 bg-pitch-black text-white px-2 py-1 rounded border border-premium-orange/30 focus:border-premium-orange focus:outline-none"
                min="320"
                max="2560"
              />
              <span className="text-gray-400 text-sm">px</span>
            </div>
          </div>
        </div>

        {/* Breakpoint Manager Dropdown */}
        <AnimatePresence>
          {showBreakpoints && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 bg-charcoal rounded-lg p-4"
            >
              <h4 className="text-white font-bold mb-3">📐 Breakpoint Manager</h4>
              <div className="grid grid-cols-4 gap-3">
                {breakpoints.map((bp) => (
                  <button
                    key={bp.value}
                    onClick={() => handleBreakpointSelect(bp.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      getCurrentBreakpoint() === bp.value
                        ? 'border-premium-orange bg-premium-orange/10'
                        : 'border-premium-orange/30 hover:border-premium-orange'
                    }`}
                  >
                    <div className="text-premium-orange font-bold text-xl mb-1">
                      {bp.value}px
                    </div>
                    <div className="text-white font-semibold text-sm mb-1">
                      {bp.label}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {bp.description}
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-4 p-3 bg-pitch-black rounded-lg">
                <p className="text-gray-400 text-sm">
                  💡 <strong className="text-white">Tip:</strong> Design mobile-first, then enhance for larger screens. 
                  Each breakpoint can have unique layouts and content.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto bg-deep-space p-8 flex items-center justify-center">
        <div className="relative">
          {/* Ruler */}
          {showRuler && (
            <div className="absolute -top-8 left-0 right-0 h-6 bg-charcoal border border-premium-orange/30 rounded-t-lg flex items-center justify-between px-2">
              {Array.from({ length: Math.ceil(getDeviceWidth() / 100) }).map((_, i) => (
                <div key={i} className="text-xs text-gray-400 font-mono">
                  {i * 100}
                </div>
              ))}
            </div>
          )}

          {/* Device Frame */}
          <motion.div
            layout
            className="bg-charcoal rounded-lg shadow-2xl overflow-hidden relative"
            style={{
              width: getDeviceWidth() * scale,
              height: getDeviceHeight() * scale,
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
            }}
          >
            {/* Device Info Badge */}
            <div className="absolute top-2 left-2 z-50 bg-pitch-black/90 px-3 py-1 rounded-lg">
              <span className="text-premium-orange font-bold text-sm">
                {currentDevice.name} - {getDeviceWidth()}x{getDeviceHeight()}
              </span>
            </div>

            {/* Content */}
            <div
              className="w-full h-full overflow-auto"
              style={{
                width: getDeviceWidth(),
                height: getDeviceHeight(),
              }}
            >
              {children}
            </div>
          </motion.div>

          {/* Touch Target Overlay (for mobile devices) */}
          {currentDevice.type === 'mobile' && (
            <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11 h-11 border-2 border-premium-orange/30 rounded-full" />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="bg-deep-space border-t border-premium-orange/20 p-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-gray-400">
              Device: <span className="text-white font-semibold">{currentDevice.name}</span>
            </span>
            <span className="text-gray-400">
              Viewport: <span className="text-white font-semibold">{getDeviceWidth()}x{getDeviceHeight()}</span>
            </span>
            <span className="text-gray-400">
              Breakpoint: <span className="text-premium-orange font-semibold">{getCurrentBreakpoint()}px</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              currentDevice.type === 'mobile' ? 'bg-blue-500/20 text-blue-400' :
              currentDevice.type === 'tablet' ? 'bg-purple-500/20 text-purple-400' :
              'bg-green-500/20 text-green-400'
            }`}>
              {currentDevice.type.toUpperCase()}
            </span>
            {currentDevice.type !== 'desktop' && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-premium-orange/20 text-premium-orange">
                {orientation.toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
