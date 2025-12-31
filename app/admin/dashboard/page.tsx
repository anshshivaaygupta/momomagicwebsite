'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';

const stats = [
  { label: 'Total Menu Items', value: '16', icon: '🥟', color: 'premium-orange' },
  { label: 'Gallery Images', value: '24', icon: '🖼️', color: 'golden-glow' },
  { label: 'Customer Reviews', value: '2000+', icon: '⭐', color: 'warm-orange' },
  { label: 'Active Combos', value: '8', icon: '🎁', color: 'vegetarian-green' },
];

const recentActivity = [
  { action: 'Menu item updated', item: 'Kurkure Veg Momos', time: '2 hours ago', icon: '✏️' },
  { action: 'New review added', item: 'Google Reviews', time: '5 hours ago', icon: '⭐' },
  { action: 'Gallery image uploaded', item: 'Stall Photos', time: '1 day ago', icon: '📸' },
  { action: 'Hero section updated', item: 'Homepage', time: '2 days ago', icon: '🎬' },
];

const quickActions = [
  { label: 'Add Menu Item', icon: '➕', href: '/admin/dashboard/menu' },
  { label: 'Upload Images', icon: '📤', href: '/admin/dashboard/gallery' },
  { label: 'Manage Reviews', icon: '⭐', href: '/admin/dashboard/testimonials' },
  { label: 'Update Hero', icon: '🎬', href: '/admin/dashboard/hero' },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-premium-orange mb-2">
          Dashboard
        </h1>
        <p className="text-foreground/70 mb-8">
          Welcome to Momos Magic CMS - Manage your website content
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="text-center">
                <div className="text-5xl mb-3">{stat.icon}</div>
                <div className={`text-3xl font-bold text-${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <p className="text-sm text-foreground/70">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="h-full">
              <h2 className="text-2xl font-bold text-golden-glow mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 pb-4 border-b border-charcoal last:border-0"
                  >
                    <span className="text-2xl">{activity.icon}</span>
                    <div className="flex-1">
                      <p className="text-foreground font-medium">{activity.action}</p>
                      <p className="text-sm text-foreground/60">{activity.item}</p>
                      <p className="text-xs text-foreground/40 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="h-full">
              <h2 className="text-2xl font-bold text-golden-glow mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <a
                    key={index}
                    href={action.href}
                    className="flex flex-col items-center justify-center p-6 bg-deep-space border border-charcoal rounded-lg hover:border-golden-glow transition-colors cursor-pointer"
                  >
                    <span className="text-4xl mb-2">{action.icon}</span>
                    <span className="text-sm text-foreground/80 text-center">
                      {action.label}
                    </span>
                  </a>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* System Status */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card>
            <h2 className="text-2xl font-bold text-golden-glow mb-6">
              System Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-vegetarian-green rounded-full"></div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Website Status</p>
                  <p className="text-xs text-foreground/60">Online & Running</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-vegetarian-green rounded-full"></div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Database</p>
                  <p className="text-xs text-foreground/60">Connected</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-vegetarian-green rounded-full"></div>
                <div>
                  <p className="text-sm font-semibold text-foreground">API Services</p>
                  <p className="text-xs text-foreground/60">All Services Active</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
