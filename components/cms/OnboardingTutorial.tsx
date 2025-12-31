'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target?: string;
  action?: string;
  videoUrl?: string;
  image?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Momo Magic CMS! 🎉',
    description: 'This quick tutorial will show you how to manage your website with zero coding required. Let\'s get started!',
    image: '/tutorial/welcome.svg',
  },
  {
    id: 'edit-mode',
    title: 'Enable Edit Mode',
    description: 'Click the "Edit Mode" toggle in the top right to start editing any content on your website.',
    target: '#edit-mode-toggle',
    action: 'Click the toggle to enable edit mode',
  },
  {
    id: 'click-to-edit',
    title: 'Click to Edit Content',
    description: 'With edit mode enabled, simply click on any text, image, or button to edit it directly on the page.',
    target: '.editable-content',
    action: 'Try clicking on some text',
  },
  {
    id: 'media-manager',
    title: 'Upload Images',
    description: 'Use the Media Manager to upload and optimize images. Drag & drop or click to browse your files.',
    target: '#media-manager',
    action: 'Open Media Manager',
  },
  {
    id: 'design-system',
    title: 'Customize Colors & Fonts',
    description: 'Change your brand colors, typography, and spacing from the Design System panel. All changes apply instantly!',
    target: '#design-system',
    action: 'Open Design System',
  },
  {
    id: 'page-builder',
    title: 'Build Pages Visually',
    description: 'Use the Page Builder to create new pages by dragging and dropping pre-built sections. No coding needed!',
    target: '#page-builder',
    action: 'Open Page Builder',
  },
  {
    id: 'responsive',
    title: 'Preview on All Devices',
    description: 'Switch between desktop, tablet, and mobile views to ensure your site looks perfect everywhere.',
    target: '#device-preview',
    action: 'Try different device views',
  },
  {
    id: 'version-history',
    title: 'Never Lose Your Work',
    description: 'Every change is auto-saved. Use Version History to restore any previous version of your content.',
    target: '#version-history',
    action: 'View Version History',
  },
  {
    id: 'ab-testing',
    title: 'Test & Optimize',
    description: 'Create A/B tests to find out which design converts better. Track results in real-time.',
    target: '#ab-testing',
    action: 'Create A/B Test',
  },
  {
    id: 'seo',
    title: 'Optimize for Search Engines',
    description: 'Get SEO recommendations and track your keyword rankings. Improve your visibility on Google.',
    target: '#seo-assistant',
    action: 'Check SEO Score',
  },
  {
    id: 'performance',
    title: 'Monitor Performance',
    description: 'Track your website speed and get one-click optimization suggestions to keep your site fast.',
    target: '#performance-optimizer',
    action: 'View Performance',
  },
  {
    id: 'complete',
    title: 'You\'re All Set! 🚀',
    description: 'You now know the basics of managing your Momo Magic website. Explore more features as you go!',
    image: '/tutorial/complete.svg',
  },
];

interface OnboardingTutorialProps {
  onComplete?: () => void;
}

export const OnboardingTutorial: React.FC<OnboardingTutorialProps> = ({
  onComplete,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);

  useEffect(() => {
    const hasCompletedTutorial = localStorage.getItem('tutorial_completed');
    if (!hasCompletedTutorial) {
      setIsActive(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setShowSkipConfirm(true);
  };

  const confirmSkip = () => {
    localStorage.setItem('tutorial_completed', 'skipped');
    setIsActive(false);
    setShowSkipConfirm(false);
    if (onComplete) {
      onComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('tutorial_completed', 'true');
    setIsActive(false);
    if (onComplete) {
      onComplete();
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsActive(true);
  };

  const step = tutorialSteps[currentStep];
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

  if (!isActive) {
    return (
      <button
        onClick={handleRestart}
        className="fixed bottom-6 right-6 z-40 bg-premium-orange text-pitch-black p-4 rounded-full shadow-lg hover:bg-golden-glow transition-all"
        title="Restart Tutorial"
      >
        <span className="text-2xl">🎓</span>
      </button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-pitch-black/80 backdrop-blur-sm"
      >
        {/* Tutorial Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-charcoal rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Progress Bar */}
          <div className="h-2 bg-deep-space">
            <motion.div
              className="h-full bg-premium-orange"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Step Counter */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-400 text-sm">
                Step {currentStep + 1} of {tutorialSteps.length}
              </span>
              <button
                onClick={handleSkip}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Skip Tutorial
              </button>
            </div>

            {/* Step Content */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{step.title}</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{step.description}</p>

              {/* Image/Video */}
              {step.image && (
                <div className="mt-6 bg-pitch-black rounded-lg p-8 flex items-center justify-center">
                  <div className="text-6xl">{currentStep === 0 ? '🎉' : '🚀'}</div>
                </div>
              )}

              {step.videoUrl && (
                <div className="mt-6 bg-pitch-black rounded-lg overflow-hidden">
                  <video
                    src={step.videoUrl}
                    controls
                    className="w-full"
                    autoPlay
                    muted
                    loop
                  />
                </div>
              )}

              {/* Action Button */}
              {step.action && (
                <div className="mt-6 p-4 bg-premium-orange/10 border-2 border-premium-orange rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👉</span>
                    <div>
                      <div className="text-premium-orange font-semibold mb-1">Try it now:</div>
                      <div className="text-white">{step.action}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-charcoal text-white hover:bg-deep-space"
              >
                ← Previous
              </button>

              <div className="flex gap-2">
                {tutorialSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentStep
                        ? 'bg-premium-orange w-8'
                        : index < currentStep
                        ? 'bg-premium-orange/50'
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-lg font-bold bg-premium-orange text-pitch-black hover:bg-golden-glow transition-all"
              >
                {currentStep === tutorialSteps.length - 1 ? 'Get Started! 🚀' : 'Next →'}
              </button>
            </div>
          </div>

          {/* Keyboard Shortcuts Hint */}
          <div className="bg-deep-space px-8 py-4 border-t border-premium-orange/20">
            <p className="text-gray-400 text-sm text-center">
              💡 <strong className="text-white">Tip:</strong> Use arrow keys to navigate • Press ESC to skip
            </p>
          </div>
        </motion.div>

        {/* Skip Confirmation Modal */}
        <AnimatePresence>
          {showSkipConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-pitch-black/90 flex items-center justify-center"
              onClick={() => setShowSkipConfirm(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-charcoal rounded-lg p-8 max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-white mb-4">Skip Tutorial?</h3>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to skip the tutorial? You can always restart it later from the help menu.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSkipConfirm(false)}
                    className="flex-1 bg-charcoal text-white py-3 rounded-lg font-semibold hover:bg-deep-space transition-all"
                  >
                    Continue Tutorial
                  </button>
                  <button
                    onClick={confirmSkip}
                    className="flex-1 bg-premium-orange text-pitch-black py-3 rounded-lg font-bold hover:bg-golden-glow transition-all"
                  >
                    Skip
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keyboard Navigation */}
        <div
          className="fixed inset-0"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrevious();
            if (e.key === 'Escape') handleSkip();
          }}
          tabIndex={0}
        />
      </motion.div>
    </AnimatePresence>
  );
};
