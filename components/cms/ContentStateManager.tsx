'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ContentState = 'draft' | 'published' | 'archived' | 'scheduled';

interface ContentStateManagerProps {
  currentState: ContentState;
  onStateChange: (newState: ContentState) => void;
  scheduledDate?: string;
  onScheduleDateChange?: (date: string) => void;
  showScheduling?: boolean;
}

export function ContentStateManager({
  currentState,
  onStateChange,
  scheduledDate,
  onScheduleDateChange,
  showScheduling = true,
}: ContentStateManagerProps) {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleDate, setScheduleDate] = useState(scheduledDate || '');
  const [scheduleTime, setScheduleTime] = useState('12:00');

  const states: { value: ContentState; label: string; icon: string; color: string }[] = [
    { value: 'draft', label: 'Draft', icon: '📝', color: 'bg-charcoal text-foreground' },
    { value: 'published', label: 'Published', icon: '✅', color: 'bg-vegetarian-green text-white' },
    { value: 'archived', label: 'Archived', icon: '📦', color: 'bg-warm-orange/20 text-warm-orange' },
  ];

  if (showScheduling) {
    states.push({ value: 'scheduled', label: 'Scheduled', icon: '⏰', color: 'bg-golden-glow text-pitch-black' });
  }

  const handleStateChange = (newState: ContentState) => {
    if (newState === 'scheduled') {
      setShowScheduleModal(true);
    } else {
      onStateChange(newState);
    }
  };

  const handleScheduleSubmit = () => {
    if (scheduleDate && scheduleTime) {
      const fullDateTime = `${scheduleDate}T${scheduleTime}`;
      if (onScheduleDateChange) {
        onScheduleDateChange(fullDateTime);
      }
      onStateChange('scheduled');
      setShowScheduleModal(false);
    }
  };

  const currentStateInfo = states.find(s => s.value === currentState);

  return (
    <div className="space-y-3">
      {/* Current State Display */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-foreground/60">Status:</span>
        <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${currentStateInfo?.color}`}>
          {currentStateInfo?.icon} {currentStateInfo?.label}
        </span>
        {currentState === 'scheduled' && scheduledDate && (
          <span className="text-xs text-foreground/60">
            → {new Date(scheduledDate).toLocaleString()}
          </span>
        )}
      </div>

      {/* State Change Buttons */}
      <div className="flex flex-wrap gap-2">
        {states.map((state) => (
          <button
            key={state.value}
            onClick={() => handleStateChange(state.value)}
            disabled={state.value === currentState}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              state.value === currentState
                ? `${state.color} opacity-50 cursor-not-allowed`
                : 'bg-pitch-black border border-charcoal text-foreground hover:border-golden-glow hover:-translate-y-0.5'
            }`}
          >
            {state.icon} {state.label}
          </button>
        ))}
      </div>

      {/* State Descriptions */}
      <div className="text-xs text-foreground/60 space-y-1">
        {currentState === 'draft' && (
          <p>📝 This content is in draft mode and not visible to visitors</p>
        )}
        {currentState === 'published' && (
          <p>✅ This content is live and visible to all visitors</p>
        )}
        {currentState === 'archived' && (
          <p>📦 This content is archived and not visible to visitors</p>
        )}
        {currentState === 'scheduled' && scheduledDate && (
          <p>⏰ This content will be published on {new Date(scheduledDate).toLocaleString()}</p>
        )}
      </div>

      {/* Schedule Modal */}
      <AnimatePresence>
        {showScheduleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-pitch-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowScheduleModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-deep-space border border-charcoal rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-premium-orange mb-4">
                ⏰ Schedule Publication
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Publication Date
                  </label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Publication Time
                  </label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow"
                  />
                </div>

                <div className="p-3 bg-pitch-black border border-charcoal rounded-lg">
                  <p className="text-xs text-foreground/70">
                    💡 <span className="font-semibold">Note:</span> Content will automatically be published at the scheduled time.
                    You can change or cancel the schedule anytime before publication.
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleScheduleSubmit}
                    disabled={!scheduleDate || !scheduleTime}
                    className="flex-1 px-4 py-3 bg-premium-orange text-pitch-black rounded-lg font-bold hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ✅ Schedule
                  </button>
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="px-4 py-3 bg-charcoal text-foreground rounded-lg font-bold hover:bg-charcoal/70 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
