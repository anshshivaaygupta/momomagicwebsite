'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

interface AnalyticsData {
  pageViews: {
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  popularPages: Array<{
    page: string;
    views: number;
  }>;
  popularMenuItems: Array<{
    name: string;
    views: number;
  }>;
  deviceStats: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  realTimeVisitors: number;
  conversionRate: number;
  totalOrders: number;
  revenue: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    total: number;
  };
  topLocations: Array<{
    city: string;
    visitors: number;
  }>;
  bounceRate: number;
  avgSessionDuration: number;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('week');

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      const response = await fetch(`/api/cms/analytics?range=${timeRange}`);
      if (response.ok) {
        const analyticsData = await response.json();
        setData(analyticsData);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">📈</div>
          <p className="text-golden-glow">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-2xl font-bold text-golden-glow mb-2">
            No Analytics Data
          </h3>
          <p className="text-foreground/70">
            Analytics data will appear once your website receives traffic
          </p>
        </Card>
      </div>
    );
  }

  const totalDevices = data.deviceStats.mobile + data.deviceStats.desktop + data.deviceStats.tablet;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-premium-orange mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-foreground/70">
              Track your website performance and visitor insights
            </p>
          </div>

          {/* Time Range Selector */}
          <div className="flex gap-2 bg-deep-space p-1 rounded-lg">
            {(['today', 'week', 'month'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  timeRange === range
                    ? 'bg-premium-orange text-pitch-black'
                    : 'text-foreground/70 hover:text-premium-orange'
                }`}
              >
                {range === 'today' ? 'Today' : range === 'week' ? 'This Week' : 'This Month'}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-3">
                <span className="text-4xl">👁️</span>
                <span className="text-xs text-foreground/60 uppercase">Total Views</span>
              </div>
              <div className="text-3xl font-bold text-premium-orange mb-1">
                {data.pageViews.total.toLocaleString()}
              </div>
              <p className="text-sm text-foreground/60">All time page views</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-3">
                <span className="text-4xl">📅</span>
                <span className="text-xs text-foreground/60 uppercase">Today</span>
              </div>
              <div className="text-3xl font-bold text-golden-glow mb-1">
                {data.pageViews.today.toLocaleString()}
              </div>
              <p className="text-sm text-foreground/60">Views today</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-3">
                <span className="text-4xl">📊</span>
                <span className="text-xs text-foreground/60 uppercase">This Week</span>
              </div>
              <div className="text-3xl font-bold text-warm-orange mb-1">
                {data.pageViews.thisWeek.toLocaleString()}
              </div>
              <p className="text-sm text-foreground/60">Views this week</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-3">
                <span className="text-4xl">📈</span>
                <span className="text-xs text-foreground/60 uppercase">This Month</span>
              </div>
              <div className="text-3xl font-bold text-vegetarian-green mb-1">
                {data.pageViews.thisMonth.toLocaleString()}
              </div>
              <p className="text-sm text-foreground/60">Views this month</p>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Popular Pages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-golden-glow mb-6">
                📄 Popular Pages
              </h2>
              <div className="space-y-4">
                {data.popularPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-premium-orange">
                        #{index + 1}
                      </span>
                      <span className="text-foreground">{page.page}</span>
                    </div>
                    <span className="text-golden-glow font-bold">
                      {page.views.toLocaleString()} views
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Popular Menu Items */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-golden-glow mb-6">
                🥟 Popular Menu Items
              </h2>
              <div className="space-y-4">
                {data.popularMenuItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-premium-orange">
                        #{index + 1}
                      </span>
                      <span className="text-foreground">{item.name}</span>
                    </div>
                    <span className="text-golden-glow font-bold">
                      {item.views.toLocaleString()} views
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Device Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card>
            <h2 className="text-2xl font-bold text-golden-glow mb-6">
              📱 Device Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-5xl mb-3">📱</div>
                <div className="text-3xl font-bold text-premium-orange mb-2">
                  {((data.deviceStats.mobile / totalDevices) * 100).toFixed(1)}%
                </div>
                <p className="text-sm text-foreground/70">Mobile</p>
                <p className="text-xs text-foreground/60 mt-1">
                  {data.deviceStats.mobile.toLocaleString()} visits
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-3">💻</div>
                <div className="text-3xl font-bold text-golden-glow mb-2">
                  {((data.deviceStats.desktop / totalDevices) * 100).toFixed(1)}%
                </div>
                <p className="text-sm text-foreground/70">Desktop</p>
                <p className="text-xs text-foreground/60 mt-1">
                  {data.deviceStats.desktop.toLocaleString()} visits
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-3">📲</div>
                <div className="text-3xl font-bold text-warm-orange mb-2">
                  {((data.deviceStats.tablet / totalDevices) * 100).toFixed(1)}%
                </div>
                <p className="text-sm text-foreground/70">Tablet</p>
                <p className="text-xs text-foreground/60 mt-1">
                  {data.deviceStats.tablet.toLocaleString()} visits
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Real-Time & Conversion Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="bg-gradient-to-br from-vegetarian-green/20 to-deep-space">
              <div className="text-center">
                <div className="text-5xl mb-3">🔴</div>
                <div className="text-4xl font-bold text-vegetarian-green mb-2">
                  {data.realTimeVisitors || 0}
                </div>
                <p className="text-sm text-foreground/70">Active Visitors</p>
                <p className="text-xs text-foreground/60 mt-1">Right now on site</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-premium-orange/20 to-deep-space">
              <div className="text-center">
                <div className="text-5xl mb-3">🎯</div>
                <div className="text-4xl font-bold text-premium-orange mb-2">
                  {(data.conversionRate || 0).toFixed(1)}%
                </div>
                <p className="text-sm text-foreground/70">Conversion Rate</p>
                <p className="text-xs text-foreground/60 mt-1">Visitors to orders</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Card className="bg-gradient-to-br from-golden-glow/20 to-deep-space">
              <div className="text-center">
                <div className="text-5xl mb-3">🛒</div>
                <div className="text-4xl font-bold text-golden-glow mb-2">
                  {(data.totalOrders || 0).toLocaleString()}
                </div>
                <p className="text-sm text-foreground/70">Total Orders</p>
                <p className="text-xs text-foreground/60 mt-1">All time</p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Revenue Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8"
        >
          <Card>
            <h2 className="text-2xl font-bold text-golden-glow mb-6">
              💰 Revenue Tracking
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-deep-space rounded-lg">
                <div className="text-2xl font-bold text-premium-orange mb-1">
                  ₹{((data.revenue?.today || 0) / 1000).toFixed(1)}K
                </div>
                <p className="text-sm text-foreground/70">Today</p>
              </div>
              <div className="text-center p-4 bg-deep-space rounded-lg">
                <div className="text-2xl font-bold text-golden-glow mb-1">
                  ₹{((data.revenue?.thisWeek || 0) / 1000).toFixed(1)}K
                </div>
                <p className="text-sm text-foreground/70">This Week</p>
              </div>
              <div className="text-center p-4 bg-deep-space rounded-lg">
                <div className="text-2xl font-bold text-warm-orange mb-1">
                  ₹{((data.revenue?.thisMonth || 0) / 1000).toFixed(1)}K
                </div>
                <p className="text-sm text-foreground/70">This Month</p>
              </div>
              <div className="text-center p-4 bg-deep-space rounded-lg">
                <div className="text-2xl font-bold text-vegetarian-green mb-1">
                  ₹{((data.revenue?.total || 0) / 1000).toFixed(1)}K
                </div>
                <p className="text-sm text-foreground/70">All Time</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Top Locations & Engagement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-golden-glow mb-6">
                📍 Top Locations
              </h2>
              <div className="space-y-4">
                {(data.topLocations || []).map((location, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-premium-orange">
                        #{index + 1}
                      </span>
                      <span className="text-foreground">{location.city}</span>
                    </div>
                    <span className="text-golden-glow font-bold">
                      {location.visitors.toLocaleString()} visitors
                    </span>
                  </div>
                ))}
                {(!data.topLocations || data.topLocations.length === 0) && (
                  <p className="text-center text-foreground/60 py-4">
                    No location data available yet
                  </p>
                )}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-golden-glow mb-6">
                ⚡ Engagement Metrics
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground/80">Bounce Rate</span>
                    <span className="text-2xl font-bold text-premium-orange">
                      {(data.bounceRate || 0).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-charcoal rounded-full h-2">
                    <div
                      className="bg-premium-orange rounded-full h-2 transition-all duration-500"
                      style={{ width: `${data.bounceRate || 0}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground/80">Avg Session Duration</span>
                    <span className="text-2xl font-bold text-golden-glow">
                      {Math.floor((data.avgSessionDuration || 0) / 60)}m {(data.avgSessionDuration || 0) % 60}s
                    </span>
                  </div>
                  <p className="text-xs text-foreground/60">
                    Time visitors spend on your site
                  </p>
                </div>

                <div className="pt-4 border-t border-charcoal">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-vegetarian-green mb-1">
                      {data.realTimeVisitors > 0 ? '🟢 Live' : '⚪ Offline'}
                    </div>
                    <p className="text-sm text-foreground/70">
                      {data.realTimeVisitors > 0 ? 'Visitors are browsing now' : 'No active visitors'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
