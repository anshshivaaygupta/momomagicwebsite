'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InlineEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSave?: () => void;
  placeholder?: string;
  multiline?: boolean;
  className?: string;
  editClassName?: string;
  hoverClassName?: string;
}

export function InlineEditor({
  value,
  onChange,
  onSave,
  placeholder = 'Click to edit...',
  multiline = false,
  className = '',
  editClassName = '',
  hoverClassName = 'hover:bg-premium-orange/10 hover:border-premium-orange/50',
}: InlineEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing) {
      if (multiline && textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.select();
      } else if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [isEditing, multiline]);

  const handleSave = () => {
    onChange(localValue);
    if (onSave) {
      onSave();
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    } else if (e.key === 'Enter' && e.ctrlKey && multiline) {
      handleSave();
    }
  };

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        {multiline ? (
          <textarea
            ref={textareaRef}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            placeholder={placeholder}
            className={`w-full px-3 py-2 bg-pitch-black border-2 border-premium-orange rounded-lg text-foreground focus:outline-none resize-none ${editClassName}`}
            rows={4}
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            placeholder={placeholder}
            className={`w-full px-3 py-2 bg-pitch-black border-2 border-premium-orange rounded-lg text-foreground focus:outline-none ${editClassName}`}
          />
        )}
        <div className="absolute -bottom-6 left-0 text-xs text-foreground/60">
          {multiline ? 'Ctrl+Enter to save • Esc to cancel' : 'Enter to save • Esc to cancel'}
        </div>
      </motion.div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer border-2 border-transparent rounded-lg px-3 py-2 transition-all duration-200 ${hoverClassName} ${className}`}
      title="Click to edit"
    >
      {value || <span className="text-foreground/40 italic">{placeholder}</span>}
    </div>
  );
}
