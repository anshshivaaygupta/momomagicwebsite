'use client';

import React, { useState, useCallback } from 'react';
import { motion, Reorder } from 'framer-motion';
import { SectionLibrary } from './SectionLibrary';
import { ComponentBuilder } from './ComponentBuilder';
import { SectionTemplate } from '@/lib/sectionTemplates';

interface PageSection {
  id: string;
  template: SectionTemplate;
  content: Record<string, any>;
  order: number;
}

interface PageBuilderProps {
  initialSections?: PageSection[];
  onSave?: (sections: PageSection[]) => void;
}

type DeviceView = 'desktop' | 'tablet' | 'mobile';

export const PageBuilder: React.FC<PageBuilderProps> = ({
  initialSections = [],
  onSave,
}) => {
  const [sections, setSections] = useState<PageSection[]>(initialSections);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');
  const [showSectionLibrary, setShowSectionLibrary] = useState(false);
  const [showComponentBuilder, setShowComponentBuilder] = useState(false);
  const [history, setHistory] = useState<PageSection[][]>([initialSections]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleAddSection = useCallback((template: SectionTemplate) => {
    const newSection: PageSection = {
      id: `section-${Date.now()}`,
      template,
      content: template.defaultContent || {},
      order: sections.length,
    };
    
    const newSections = [...sections, newSection];
    setSections(newSections);
    addToHistory(newSections);
    setShowSectionLibrary(false);
  }, [sections]);

  const handleReorder = useCallback((newOrder: PageSection[]) => {
    const reorderedSections = newOrder.map((section, index) => ({
      ...section,
      order: index,
    }));
    setSections(reorderedSections);
    addToHistory(reorderedSections);
  }, []);

  const handleDeleteSection = useCallback((sectionId: string) => {
    const newSections = sections.filter(s => s.id !== sectionId);
    setSections(newSections);
    addToHistory(newSections);
    if (selectedSection === sectionId) {
      setSelectedSection(null);
    }
  }, [sections, selectedSection]);

  const handleDuplicateSection = useCallback((sectionId: string) => {
    const sectionToDuplicate = sections.find(s => s.id === sectionId);
    if (!sectionToDuplicate) return;

    const newSection: PageSection = {
      ...sectionToDuplicate,
      id: `section-${Date.now()}`,
      order: sections.length,
    };

    const newSections = [...sections, newSection];
    setSections(newSections);
    addToHistory(newSections);
  }, [sections]);

  const handleUpdateContent = useCallback((sectionId: string, content: Record<string, any>) => {
    const newSections = sections.map(s =>
      s.id === sectionId ? { ...s, content } : s
    );
    setSections(newSections);
    addToHistory(newSections);
  }, [sections]);

  const addToHistory = useCallback((newSections: PageSection[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newSections);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setSections(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setSections(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  const handleSave = useCallback(() => {
    if (onSave) {
      onSave(sections);
    }
  }, [sections, onSave]);

  const getDeviceWidth = () => {
    switch (deviceView) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '768px';
      default:
        return '100%';
    }
  };

  return (
    <div className="page-builder h-screen flex flex-col bg-pitch-black">
      {/* Top Bar */}
      <div className="bg-deep-space border-b border-premium-orange/20 p-4">
        <div className="flex items-center justify-between">
          {/* Left: Title */}
          <div>
            <h1 className="text-2xl font-bold text-premium-orange">🏗️ Page Builder</h1>
            <p className="text-gray-400 text-sm">Drag and drop to build your page</p>
          </div>

          {/* Center: Device Toggle */}
          <div className="flex gap-2 bg-pitch-black rounded-lg p-1">
            <button
              onClick={() => setDeviceView('desktop')}
              className={`px-4 py-2 rounded font-semibold transition-all ${
                deviceView === 'desktop'
                  ? 'bg-premium-orange text-pitch-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              💻 Desktop
            </button>
            <button
              onClick={() => setDeviceView('tablet')}
              className={`px-4 py-2 rounded font-semibold transition-all ${
                deviceView === 'tablet'
                  ? 'bg-premium-orange text-pitch-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📱 Tablet
            </button>
            <button
              onClick={() => setDeviceView('mobile')}
              className={`px-4 py-2 rounded font-semibold transition-all ${
                deviceView === 'mobile'
                  ? 'bg-premium-orange text-pitch-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📱 Mobile
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex gap-2">
            {/* Undo/Redo */}
            <button
              onClick={handleUndo}
              disabled={historyIndex === 0}
              className="px-4 py-2 rounded-lg border-2 border-premium-orange text-premium-orange hover:bg-premium-orange hover:text-pitch-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              title="Undo"
            >
              ↶
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex === history.length - 1}
              className="px-4 py-2 rounded-lg border-2 border-premium-orange text-premium-orange hover:bg-premium-orange hover:text-pitch-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              title="Redo"
            >
              ↷
            </button>

            {/* Save */}
            <button
              onClick={handleSave}
              className="bg-premium-orange text-pitch-black px-6 py-2 rounded-lg font-bold hover:bg-golden-glow transition-all"
            >
              💾 Save Page
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Tools */}
        <div className="w-64 bg-charcoal border-r border-premium-orange/20 overflow-y-auto">
          <div className="p-4 space-y-2">
            <button
              onClick={() => setShowSectionLibrary(true)}
              className="w-full bg-premium-orange text-pitch-black py-3 rounded-lg font-bold hover:bg-golden-glow transition-all flex items-center justify-center gap-2"
            >
              <span>📚</span>
              <span>Add Section</span>
            </button>

            <button
              onClick={() => setShowComponentBuilder(true)}
              className="w-full bg-charcoal border-2 border-premium-orange text-premium-orange py-3 rounded-lg font-bold hover:bg-premium-orange hover:text-pitch-black transition-all flex items-center justify-center gap-2"
            >
              <span>🎨</span>
              <span>Components</span>
            </button>

            <div className="pt-4 border-t border-premium-orange/20 mt-4">
              <h3 className="text-white font-bold mb-3">Page Sections ({sections.length})</h3>
              <div className="space-y-2">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedSection === section.id
                        ? 'bg-premium-orange text-pitch-black'
                        : 'bg-pitch-black text-gray-400 hover:text-white'
                    }`}
                  >
                    <div className="font-semibold text-sm">{section.template.name}</div>
                    <div className="text-xs opacity-70">{section.template.category}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center: Canvas */}
        <div className="flex-1 overflow-y-auto bg-deep-space p-8">
          <div className="mx-auto transition-all" style={{ width: getDeviceWidth() }}>
            {sections.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-2xl font-bold text-white mb-2">Empty Canvas</h3>
                <p className="text-gray-400 mb-6">Start building by adding sections from the library</p>
                <button
                  onClick={() => setShowSectionLibrary(true)}
                  className="bg-premium-orange text-pitch-black px-8 py-3 rounded-lg font-bold hover:bg-golden-glow transition-all"
                >
                  📚 Browse Section Library
                </button>
              </div>
            ) : (
              <Reorder.Group
                axis="y"
                values={sections}
                onReorder={handleReorder}
                className="space-y-4"
              >
                {sections.map((section) => (
                  <Reorder.Item
                    key={section.id}
                    value={section}
                    className={`relative group ${
                      selectedSection === section.id ? 'ring-2 ring-premium-orange' : ''
                    }`}
                  >
                    {/* Section Controls Overlay */}
                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button
                        onClick={() => setSelectedSection(section.id)}
                        className="bg-pitch-black/90 text-white p-2 rounded-lg hover:bg-premium-orange hover:text-pitch-black transition-all"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDuplicateSection(section.id)}
                        className="bg-pitch-black/90 text-white p-2 rounded-lg hover:bg-premium-orange hover:text-pitch-black transition-all"
                        title="Duplicate"
                      >
                        📋
                      </button>
                      <button
                        onClick={() => handleDeleteSection(section.id)}
                        className="bg-pitch-black/90 text-white p-2 rounded-lg hover:bg-red-500 transition-all"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>

                    {/* Drag Handle */}
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
                      <div className="bg-pitch-black/90 text-premium-orange p-2 rounded-lg">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
                        </svg>
                      </div>
                    </div>

                    {/* Section Content */}
                    <div
                      className="bg-charcoal rounded-lg overflow-hidden"
                      dangerouslySetInnerHTML={{
                        __html: section.template.html.replace(/\{\{(\w+)\}\}/g, (_, key) =>
                          section.content[key] || section.template.defaultContent?.[key] || `[${key}]`
                        ),
                      }}
                    />
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            )}
          </div>
        </div>

        {/* Right Sidebar: Properties */}
        {selectedSection && (
          <div className="w-80 bg-charcoal border-l border-premium-orange/20 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-white font-bold mb-4">Section Properties</h3>
              {(() => {
                const section = sections.find(s => s.id === selectedSection);
                if (!section) return null;

                return (
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Section Name</label>
                      <input
                        type="text"
                        value={section.template.name}
                        disabled
                        className="w-full bg-pitch-black border border-premium-orange/30 rounded-lg px-4 py-2 text-white"
                      />
                    </div>

                    {Object.keys(section.template.defaultContent || {}).map((key) => (
                      <div key={key}>
                        <label className="text-gray-400 text-sm mb-2 block capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <input
                          type="text"
                          value={section.content[key] || section.template.defaultContent?.[key] || ''}
                          onChange={(e) => {
                            handleUpdateContent(section.id, {
                              ...section.content,
                              [key]: e.target.value,
                            });
                          }}
                          className="w-full bg-pitch-black border border-premium-orange/30 rounded-lg px-4 py-2 text-white focus:border-premium-orange focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      {/* Section Library Modal */}
      <SectionLibrary
        isOpen={showSectionLibrary}
        onClose={() => setShowSectionLibrary(false)}
        onAddSection={handleAddSection}
      />

      {/* Component Builder Modal */}
      {showComponentBuilder && (
        <ComponentBuilder
          isOpen={showComponentBuilder}
          onClose={() => setShowComponentBuilder(false)}
        />
      )}
    </div>
  );
};
