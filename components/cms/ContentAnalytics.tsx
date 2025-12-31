'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

interface ContentAnalyticsProps {
  contentId: string;
  contentType: 'menu' | 'gallery' | 'testimonial' | 'page';
  analytics?: {
    views?: number;
    engagement?: number;
    conversions?: number;
    lastUpdated?: string;
    performance?: {
      loadTime?: number;
      seoScore?: number;
    };
  };
}

export function ContentAnalytics({
  contentId,
  contentType,
  analytics: providedAnalytics = {},
}: ContentAnalyticsProps) {
  const [analytics, setAnalytics] = useState(providedAnalytics);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/cms/content-analytics?contentId=${contentId}&contentType=${contentType}`
        );
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [contentId, contentType]);

  const {
    views = 0,
    engagement = 0,
    conversions = 0,
    lastUpdated = new Date().toISOString(),
    performance = {
      loadTime: 0,
      seoScore: 0,
    },
  } = analytics;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-vegetarian-green';
    if (score >= 70) return 'text-golden-glow';
    return 'text-warm-orange';
  };

  const getEngagementLevel = (engagement: number) => {
    if (engagement >= 80) return { label: 'Excellent', color: 'text-vegetarian-green' };
    if (engagement >= 60) return { label: 'Good', color: 'text-golden-glow' };
    if (engagement >= 40) return { label: 'Average', color: 'text-premium-orange' };
    return { label: 'Low', color: 'text-warm-orange' };
  };

  const engagementLevel = getEngagementLevel(engagement);

  return (
    <Card className="p-4 bg-deep-space border-charcoal">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-golden-glow">📊 Content Analytics</h3>
        <span className="text-xs text-foreground/60">
          Updated {formatDate(lastUpdated)}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Views */}
        <div className="text-center">
          <div className="text-2xl font-bold text-premium-orange mb-1">
            {views.toLocaleString()}
          </div>
          <div className="text-xs text-foreground/60">👁️ Views</div>
        </div>

        {/* Engagement */}
        <div className="text-center">
          <div className={`text-2xl font-bold mb-1 ${engagementLevel.color}`}>
            {engagement}%
          </div>
          <div className="text-xs text-foreground/60">
            💫 {engagementLevel.label}
          </div>
        </div>

        {/* Conversions */}
        <div className="text-center">
          <div className="text-2xl font-bold text-vegetarian-green mb-1">
            {conversions}
          </div>
          <div className="text-xs text-foreground/60">🎯 Conversions</div>
        </div>

        {/* SEO Score */}
        <div className="text-center">
          <div className={`text-2xl font-bold mb-1 ${getPerformanceColor(performance.seoScore || 0)}`}>
            {performance.seoScore}
          </div>
          <div className="text-xs text-foreground/60">🔍 SEO Score</div>
        </div>
      </div>

      {/* Performance Bar */}
      <div className="mt-4 pt-4 border-t border-charcoal">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-foreground/60">Performance</span>
          <span className={getPerformanceColor(performance.seoScore || 0)}>
            {performance.loadTime?.toFixed(2)}s load time
          </span>
        </div>
        <div className="w-full h-2 bg-charcoal rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${performance.seoScore}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full ${
              (performance.seoScore || 0) >= 90
                ? 'bg-vegetarian-green'
                : (performance.seoScore || 0) >= 70
                ? 'bg-golden-glow'
                : 'bg-warm-orange'
            }`}
          />
        </div>
      </div>

      {/* Quick Insights */}
      <div className="mt-4 pt-4 border-t border-charcoal space-y-2">
        <div className="text-xs text-foreground/70">
          💡 <span className="font-semibold">Quick Insights:</span>
        </div>
        {views > 500 && (
          <div className="text-xs text-vegetarian-green">
            ✓ High visibility - This content is performing well
          </div>
        )}
        {engagement < 40 && (
          <div className="text-xs text-warm-orange">
            ⚠ Consider updating content to improve engagement
          </div>
        )}
        {(performance.seoScore || 0) < 70 && (
          <div className="text-xs text-warm-orange">
            ⚠ SEO optimization recommended
          </div>
        )}
        {conversions > 30 && (
          <div className="text-xs text-vegetarian-green">
            ✓ Strong conversion rate
          </div>
        )}
      </div>
    </Card>
  );
}
