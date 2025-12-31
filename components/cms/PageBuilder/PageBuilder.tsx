'use client';

import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableSection } from './SortableSection';
import { SectionControls } from './SectionControls';
import { LayoutControls } from './LayoutControls';
import { motion } from 'framer-motion';

export interface PageSection {
  id: string;
  name: string;
  visible: boolean;
  order: number;
  layout: {
    columns: 1 | 2 | 3 | 4;
    spacing: number;
    container: 'full' | 'boxed';
  };
  styles: {
    background: string;
    textColor: string;
    fontFamily: string;
    fontSize: number;
  };
}

interface PageBuilderProps {
  pageName: string;
  sections: PageSection[];
  onSectionsChange: (sections: PageSection[]) => void;
  onSave: () => void;
}

export function PageBuilder({ pageName, sections, onSectionsChange, onSave }: PageBuilderProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      
      const newSections = arrayMove(sections, oldIndex, newIndex).map((section, index) => ({
        ...section,
        order: index,
      }));
      
      onSectionsChange(newSections);
    }
  };

  const handleSectionUpdate = (sectionId: string, updates: Partial<PageSection>) => {
    const newSections = sections.map((section) =>
      section.id === sectionId ? { ...section, ...updates } : section
    );
    onSectionsChange(newSections);
  };

  const handleToggleVisibility = (sectionId: string) => {
    handleSectionUpdate(sectionId, {
      visible: !sections.find((s) => s.id === sectionId)?.visible,
    });
  };

  return (
    <div className="min-h-screen bg-pitch-black">
      {/* Header */}
      <div className="bg-deep-space border-b border-charcoal p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-premium-orange">Visual Page Builder</h1>
            <p className="text-sm text-foreground/60">Editing: {pageName}</p>
          </div>

          {/* Preview Mode Selector */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2 bg-pitch-black rounded-lg p-1">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  previewMode === 'desktop'
                    ? 'bg-premium-orange text-pitch-black'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                🖥️ Desktop
              </button>
              <button
                onClick={() => setPreviewMode('tablet')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  previewMode === 'tablet'
                    ? 'bg-premium-orange text-pitch-black'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                📱 Tablet
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  previewMode === 'mobile'
                    ? 'bg-premium-orange text-pitch-black'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                📱 Mobile
              </button>
            </div>

            <button
              onClick={onSave}
              className="px-6 py-2 bg-vegetarian-green text-pitch-black rounded-lg font-bold hover:-translate-y-0.5 transition-all duration-300"
            >
              💾 Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Section List */}
          <div className="lg:col-span-1">
            <div className="bg-deep-space border border-charcoal rounded-lg p-4 sticky top-24">
              <h2 className="text-xl font-bold text-golden-glow mb-4">📋 Page Sections</h2>
              <p className="text-sm text-foreground/60 mb-4">
                Drag sections to reorder. Click to edit styles.
              </p>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={sections.map((s) => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {sections.map((section) => (
                      <SortableSection
                        key={section.id}
                        section={section}
                        isActive={activeSection === section.id}
                        onClick={() => setActiveSection(section.id)}
                        onToggleVisibility={() => handleToggleVisibility(section.id)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          </div>

          {/* Right Panel - Section Controls */}
          <div className="lg:col-span-2">
            {activeSection ? (
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <SectionControls
                  section={sections.find((s) => s.id === activeSection)!}
                  onUpdate={(updates) => handleSectionUpdate(activeSection, updates)}
                />

                <LayoutControls
                  section={sections.find((s) => s.id === activeSection)!}
                  onUpdate={(updates) => handleSectionUpdate(activeSection, updates)}
                />
              </motion.div>
            ) : (
              <div className="bg-deep-space border border-charcoal rounded-lg p-12 text-center">
                <div className="text-6xl mb-4">👈</div>
                <h3 className="text-xl font-bold text-golden-glow mb-2">
                  Select a Section to Edit
                </h3>
                <p className="text-foreground/60">
                  Click on any section from the left panel to start editing its styles and layout.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
