'use client';

import React from 'react';
import { AppHero } from '@/components/app/AppHero';
import { AppFeatures } from '@/components/app/AppFeatures';
import { AppDemoVideo } from '@/components/app/AppDemoVideo';
import { AppScreenshots } from '@/components/app/AppScreenshots';
import { HowToUse } from '@/components/app/HowToUse';
import { DownloadSection } from '@/components/app/DownloadSection';
import { AppOffers } from '@/components/app/AppOffers';

export default function DownloadAppPage() {
  return (
    <div className="min-h-screen bg-pitch-black">
      {/* Hero Section */}
      <AppHero />

      {/* App Features */}
      <AppFeatures />

      {/* Demo Video */}
      <AppDemoVideo />

      {/* App Screenshots */}
      <AppScreenshots />

      {/* How To Use */}
      <HowToUse />

      {/* Download Section */}
      <DownloadSection />

      {/* App Offers */}
      <AppOffers />
    </div>
  );
}
