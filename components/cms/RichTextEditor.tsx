'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  height?: string;
}

type TextFormat = 'bold' | 'italic' | 'underline' | 'strikethrough';
type TextAlign = 'left' | 'center' | 'right' | 'justify';
type HeadingLevel = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = 'Enter text...', 
  label,
  height = '300px'
}: RichTextEditorProps) {
  const [isRichText, setIsRichText] = useState(true);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ffc241');
  const [selectedBgColor, setSelectedBgColor] = useState('transparent');
  const editorRef = useRef<HTMLDivElement>(null);
  const plainTextRef = useRef<HTMLTextAreaElement>(null);

  const colors = [
    { name: 'Premium Orange', value: '#ffc241' },
    { name: 'Golden Glow', value: '#ffd700' },
    { name: 'Pitch Black', value: '#000000' },
    { name: 'White', value: '#ffffff' },
    { name: 'Warm Orange', value: '#EA580C' },
    { name: 'Vegetarian Green', value: '#059669' },
    { name: 'Deep Space', value: '#0a0a0a' },
    { name: 'Charcoal', value: '#111111' },
  ];

  const fonts = [
    { name: 'Default', value: 'Inter' },
    { name: 'Playfair Display', value: 'Playfair Display' },
    { name: 'Arial', value: 'Arial' },
    { name: 'Georgia', value: 'Georgia' },
    { name: 'Courier New', value: 'Courier New' },
    { name: 'Times New Roman', value: 'Times New Roman' },
  ];

  const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px'];

  useEffect(() => {
    if (editorRef.current && isRichText) {
      editorRef.current.innerHTML = value;
    }
  }, [isRichText]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateContent();
  };

  const updateContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const toggleFormat = (format: TextFormat) => {
    execCommand(format);
  };

  const setAlignment = (align: TextAlign) => {
    execCommand(`justify${align.charAt(0).toUpperCase() + align.slice(1)}`);
  };

  const setHeading = (level: HeadingLevel) => {
    execCommand('formatBlock', level);
  };

  const setFontFamily = (font: string) => {
    execCommand('fontName', font);
  };

  const setFontSize = (size: string) => {
    execCommand('fontSize', '7');
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.fontSize = size;
      range.surroundContents(span);
    }
  };

  const setTextColor = (color: string) => {
    execCommand('foreColor', color);
    setSelectedColor(color);
    setShowColorPicker(false);
  };

  const setBackgroundColor = (color: string) => {
    execCommand('backColor', color);
    setSelectedBgColor(color);
    setShowBgColorPicker(false);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const insertList = (ordered: boolean) => {
    execCommand(ordered ? 'insertOrderedList' : 'insertUnorderedList');
  };

  const clearFormatting = () => {
    execCommand('removeFormat');
  };

  const toggleMode = () => {
    if (isRichText) {
      if (editorRef.current) {
        const plainText = editorRef.current.innerText;
        onChange(plainText);
      }
    } else {
      if (plainTextRef.current) {
        onChange(plainTextRef.current.value);
      }
    }
    setIsRichText(!isRichText);
  };

  const handlePlainTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-3">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-foreground/80">
            {label}
          </label>
          <button
            onClick={toggleMode}
            className="text-xs px-3 py-1 rounded-lg bg-deep-space border border-charcoal text-foreground/70 hover:text-golden-glow hover:border-golden-glow transition-colors"
          >
            {isRichText ? '📝 Plain Text' : '🎨 Rich Text'}
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {isRichText ? (
          <motion.div
            key="rich"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="border border-charcoal rounded-lg overflow-hidden bg-pitch-black"
          >
            {/* Toolbar */}
            <div className="bg-deep-space border-b border-charcoal p-2 flex flex-wrap gap-1">
              {/* Heading Selector */}
              <select
                onChange={(e) => setHeading(e.target.value as HeadingLevel)}
                className="px-2 py-1 bg-pitch-black border border-charcoal rounded text-xs text-foreground focus:outline-none focus:border-golden-glow"
              >
                <option value="p">Paragraph</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="h4">Heading 4</option>
                <option value="h5">Heading 5</option>
                <option value="h6">Heading 6</option>
              </select>

              {/* Font Family Selector */}
              <select
                onChange={(e) => setFontFamily(e.target.value)}
                className="px-2 py-1 bg-pitch-black border border-charcoal rounded text-xs text-foreground focus:outline-none focus:border-golden-glow"
              >
                {fonts.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.name}
                  </option>
                ))}
              </select>

              {/* Font Size Selector */}
              <select
                onChange={(e) => setFontSize(e.target.value)}
                className="px-2 py-1 bg-pitch-black border border-charcoal rounded text-xs text-foreground focus:outline-none focus:border-golden-glow"
              >
                {fontSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              <div className="w-px h-6 bg-charcoal mx-1" />

              {/* Text Formatting */}
              <button
                onClick={() => toggleFormat('bold')}
                className="px-2 py-1 bg-pitch-black border border-charcoal rounded text-xs font-bold hover:bg-golden-glow hover:text-pitch-black transition-colors"
                title="Bold"
              >
                B
              </button>
              <button
                onClick={() => toggleFormat('italic')}
                className="px-2 py-1 bg-pitch-black border border-charcoal rounded text-xs italic hover:bg-golden-glow hover:text-pitch-black transition-colors"
                title="Italic"
              >
                I
              </button>
              <button
                onClick={() => toggleFormat('underline')}
                className="px-2 py-1 bg-pitch-black border border-charcoal rounded text-xs underline hover:bg-golden-glow hover:text-pitch-black transition-colors"
                title="Underline"
              >
                U
              </button>
              <button
                onClick={() => toggleFormat('strikethrough')}
                className="px-2 py-1 bg-pitch-black border border-charcoal rounded text-xs line-through hover:bg-golden-glow hover:text-pitch-black transition-colors"
                title="Strikethrough"
              >
                S
              </button>

              <div className="w-px h-6 bg-charcoal mx-1" />

              {/* Text Color */}
              <div className="relative">
                <button
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="px-2 py-1 bg-pitch-black border border-charcoal rounded text-xs hover:bg-golden-glow hover:text-pitch-black transition-colors flex items-center gap-1"
                  title="Text Color"
                >
                  A
                  <div
                    className="w-3 h-3 rounded border border-charcoal"
                    style={{ backgroundColor: selectedColor }}
                  />
                </button>
                {showColorPicker && (
                  <div className="absolute top-full left-0 mt-1 p-2 bg-deep-space border border-charcoal rounded-lg shadow-lg z-10 grid grid-cols-4 gap-1">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setTextColor(color.value)}
                        className="w-6 h-6 rounded border border-charcoal hover:scale-110 transition-transform"
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Background Color */}
              <div className="relative">
                <button
                  onClick={() => setShowBgColorPicker(!showBgColorPicker)}
                  className="px-2 py-1 bg-pitch-black border border-charcoal rounded text-xs hover:bg-golden-glow hover:text-pitch-black transition-colors flex items-center gap-1"
                  title="Background Color"
                >
                  🎨
                  <div
                    className="w-3 h-3 rounded border border-charcoal"
                    style={{ backgroundColor: selectedBgColor }}
                  />
                </button>
                {showBgColorPicker && (
                  <div className="absolute top-full left-0 mt-1 p-2 bg-deep-space border border-charcoal rounded-lg shadow-lg z-10 grid grid-cols-4 gap-1">
                    <button
                      onClick={() => setBackgroundColor('transparent')}
                      className="w-6 h-6 rounded border border-charcoal hover:scale-110 transition-transform bg-gradient-to-br from-red-500 to-transparent"
                      title="No Background"
                    />
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setBackgroundColor(color.value)}
                        className="w-6 h-6 rounded border border-charcoal hover:scale-110 transition-transform"
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="w-px h-6 bg-charcoal mx-1" />

              {/* Alignment */}
              <button
                onClick={() => setAlignment('left')}
                className="px-2 py-1 bg-pitch-black border border-charcoal rounded text-xs hover:bg-golden-glow hover:text-pitch-black transition-colors"
                title="Align Left"
              >
                ⬅
              </button>
              <button
                onClick={() => setAlignment('center')}
                className="px-2 py-1 bg-pitch-black border border-charcoal rounded text-xs hover:bg-golden-glow hover:text-pitch-black transition-colors"
                title="Align Center"
              >
                ↔
              </button>
              <button
                onClick={() => setAlignment('right')}
                className="px-2 py-1 bg-pitch-black border border-charcoal rounded text-xs hover:bg-golden-glow hover:text-pitch-black transition-colors"
                title="Align Right"
              >
                ➡
              </button>
              <button
                onClick={() => setAlignment('justify')}
                className="px-2 py-1 bg-pitch-black border border-charcoal rounded text-xs hover:bg-golden-glow hover:text-pitch-black transition-colors"
                title="Justify"
              >
                ⬌
              </button>

              <div className="w-px h-6 bg-charcoal mx-1" />

              {/* Lists */}
              <button
                onClick={() => insertList(false)}
                className="px-2 py-1 bg-pitch-black border border-charcoal rounded text-xs hover:bg-golden-glow hover:text-pitch-black transition-colors"
                title="Bullet List"
              >
                • List
              </button>
              <button
                onClick={() => insertList(true)}
                className="px-2 py-1 bg-pitch-black border border-charcoal rounded text-xs hover:bg-golden-glow hover:text-pitch-black transition-colors"
                title="Numbered List"
              >
                1. List
              </button>

              <div className="w-px h-6 bg-charcoal mx-1" />

              {/* Link */}
              <button
                onClick={insertLink}
                className="px-2 py-1 bg-pitch-black border border-charcoal rounded text-xs hover:bg-golden-glow hover:text-pitch-black transition-colors"
                title="Insert Link"
              >
                🔗
              </button>

              {/* Clear Formatting */}
              <button
                onClick={clearFormatting}
                className="px-2 py-1 bg-pitch-black border border-charcoal rounded text-xs hover:bg-warm-orange hover:text-white transition-colors"
                title="Clear Formatting"
              >
                ✕
              </button>
            </div>

            {/* Editor Area */}
            <div
              ref={editorRef}
              contentEditable
              onInput={updateContent}
              onBlur={updateContent}
              className="p-4 text-foreground focus:outline-none overflow-y-auto"
              style={{ minHeight: height }}
              data-placeholder={placeholder}
            />
          </motion.div>
        ) : (
          <motion.div
            key="plain"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <textarea
              ref={plainTextRef}
              value={value}
              onChange={handlePlainTextChange}
              placeholder={placeholder}
              className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors resize-none"
              style={{ minHeight: height }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Preview */}
      {isRichText && (
        <div className="p-4 bg-deep-space border border-charcoal rounded-lg">
          <div className="text-xs text-foreground/60 mb-2 font-semibold">Live Preview:</div>
          <div
            className="text-foreground prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </div>
      )}
    </div>
  );
}
