'use client';

import React from 'react';
import { FranchiseHero } from '@/components/franchise/FranchiseHero';
import { BenefitsGrid } from '@/components/franchise/BenefitsGrid';
import { InvestmentCalculator } from '@/components/franchise/InvestmentCalculator';
import { ROICalculator } from '@/components/franchise/ROICalculator';
import { LocationMap } from '@/components/franchise/LocationMap';
import { ProcessTimeline } from '@/components/franchise/ProcessTimeline';
import { SuccessStories } from '@/components/franchise/SuccessStories';
import { FranchiseForm } from '@/components/franchise/FranchiseForm';
import { DocumentDownload } from '@/components/franchise/DocumentDownload';

export default function FranchisePage() {
  return (
    <div className="min-h-screen bg-pitch-black">
      {/* Hero Section */}
      <FranchiseHero />

      {/* Benefits Grid */}
      <BenefitsGrid />

      {/* Investment Calculator */}
      <InvestmentCalculator />

      {/* ROI Calculator */}
      <ROICalculator />

      {/* Location Map */}
      <LocationMap />

      {/* Process Timeline */}
      <ProcessTimeline />

      {/* Success Stories */}
      <SuccessStories />

      {/* Franchise Form */}
      <FranchiseForm />

      {/* Document Downloads */}
      <DocumentDownload />
    </div>
  );
}
