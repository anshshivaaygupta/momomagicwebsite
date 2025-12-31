'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PageSection } from './PageBuilder';

interface SortableSectionProps {
  section: PageSection;
  isActive: boolean;
  onClick: () => void;
  onToggleVisibility: () => void;
}

export function SortableSection({ section, isActive, onClick, onToggleVisibility }: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-pitch-black border-2 rounded-lg p-3 cursor-pointer transition-all ${
        isDragging
          ? 'border-premium-orange shadow-lg opacity-50'
          : isActive
          ? 'border-premium-orange'
          : section.visible
          ? 'border-charcoal hover:border-golden-glow'
          : 'border-charcoal/50 opacity-50'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-foreground/40 hover:text-foreground transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <circle cx="7" cy="5" r="1.5" />
            <circle cx="13" cy="5" r="1.5" />
            <circle cx="7" cy="10" r="1.5" />
            <circle cx="13" cy="10" r="1.5" />
            <circle cx="7" cy="15" r="1.5" />
            <circle cx="13" cy="15" r="1.5" />
          </svg>
        </div>

        {/* Section Info */}
        <div className="flex-1" onClick={onClick}>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{section.name}</h3>
            {!section.visible && (
              <span className="text-xs bg-warm-orange/20 text-warm-orange px-2 py-0.5 rounded">
                Hidden
              </span>
            )}
          </div>
          <p className="text-xs text-foreground/60 mt-0.5">
            {section.layout.columns} columns • {section.layout.spacing}px spacing
          </p>
        </div>

        {/* Visibility Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility();
          }}
          className={`p-2 rounded-lg transition-all ${
            section.visible
              ? 'text-vegetarian-green hover:bg-vegetarian-green/10'
              : 'text-foreground/40 hover:bg-foreground/5'
          }`}
          title={section.visible ? 'Hide section' : 'Show section'}
        >
          {section.visible ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 7c1.66 0 3 1.34 3 3 0 .55-.15 1.06-.41 1.5l1.76 1.76C15.27 12.61 16.1 11.38 16 10c-.73-2.89-4-7-9-7-1.02 0-1.99.19-2.89.52l1.3 1.3C6.06 7.15 7.97 7 10 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 9.02 1 10c.73 2.89 4 7 9 7 1.55 0 3.03-.3 4.38-.84l.42.42L17.73 19 19 17.73 3.27 2 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
