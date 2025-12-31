'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface FilterSettings {
  priceRange: {
    min: number;
    max: number;
    step: number;
  };
  categories: Array<{ id: string; name: string; enabled: boolean }>;
  spiceLevels: Array<{ id: string; name: string; emoji: string; enabled: boolean }>;
  fillingTypes: Array<{ id: string; name: string; emoji: string; enabled: boolean }>;
}

export default function MenuFiltersPage() {
  const [filters, setFilters] = useState<FilterSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      const response = await fetch('/api/cms/menu-filters');
      const data = await response.json();
      setFilters(data);
    } catch (error) {
      console.error('Error fetching filters:', error);
      setMessage({ type: 'error', text: 'Failed to load filter settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch('/api/cms/menu-filters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters),
      });
      const data = await response.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Filter settings saved successfully!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to save settings' });
      }
    } catch (error) {
      console.error('Error saving filters:', error);
      setMessage({ type: 'error', text: 'Failed to save filter settings' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset all filter settings to default?')) return;
    
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch('/api/cms/menu-filters', {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Filter settings reset to default!' });
        await fetchFilters();
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to reset settings' });
      }
    } catch (error) {
      console.error('Error resetting filters:', error);
      setMessage({ type: 'error', text: 'Failed to reset filter settings' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-premium-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/70">Loading filter settings...</p>
        </div>
      </div>
    );
  }

  if (!filters) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-golden-glow mb-2">Menu Filter Settings</h1>
          <p className="text-foreground/70">Manage menu page filter options and price ranges</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleReset} disabled={saving}>
            🔄 Reset to Default
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? '💾 Saving...' : '💾 Save All Changes'}
          </Button>
        </div>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`p-4 rounded-lg border-2 ${
            message.type === 'success'
              ? 'bg-vegetarian-green/10 border-vegetarian-green text-vegetarian-green'
              : 'bg-warm-orange/10 border-warm-orange text-warm-orange'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Price Range Settings */}
      <Card>
        <h2 className="text-xl font-bold text-premium-orange mb-4">💰 Price Range Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground/80 mb-2">
              Minimum Price (₹)
            </label>
            <input
              type="number"
              value={filters.priceRange.min}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRange: { ...filters.priceRange, min: parseInt(e.target.value) || 0 },
                })
              }
              className="w-full px-4 py-2 bg-charcoal text-foreground rounded-lg border-2 border-transparent focus:border-premium-orange focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground/80 mb-2">
              Maximum Price (₹)
            </label>
            <input
              type="number"
              value={filters.priceRange.max}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRange: { ...filters.priceRange, max: parseInt(e.target.value) || 250 },
                })
              }
              className="w-full px-4 py-2 bg-charcoal text-foreground rounded-lg border-2 border-transparent focus:border-premium-orange focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground/80 mb-2">
              Slider Step (₹)
            </label>
            <input
              type="number"
              value={filters.priceRange.step}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRange: { ...filters.priceRange, step: parseInt(e.target.value) || 10 },
                })
              }
              className="w-full px-4 py-2 bg-charcoal text-foreground rounded-lg border-2 border-transparent focus:border-premium-orange focus:outline-none transition-all"
            />
          </div>
        </div>
      </Card>

      {/* Category Filters */}
      <Card>
        <h2 className="text-xl font-bold text-premium-orange mb-4">📁 Category Filters</h2>
        <div className="space-y-3">
          {filters.categories.map((category, index) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-3 bg-charcoal rounded-lg"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={category.enabled}
                  onChange={(e) => {
                    const newCategories = [...filters.categories];
                    newCategories[index].enabled = e.target.checked;
                    setFilters({ ...filters, categories: newCategories });
                  }}
                  className="w-5 h-5 accent-premium-orange cursor-pointer"
                />
                <span className="font-semibold text-foreground">{category.name}</span>
              </div>
              <span className="text-sm text-foreground/50">ID: {category.id}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Spice Level Filters */}
      <Card>
        <h2 className="text-xl font-bold text-premium-orange mb-4">🌶️ Spice Level Filters</h2>
        <div className="space-y-3">
          {filters.spiceLevels.map((level, index) => (
            <div
              key={level.id}
              className="flex items-center justify-between p-3 bg-charcoal rounded-lg"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={level.enabled}
                  onChange={(e) => {
                    const newLevels = [...filters.spiceLevels];
                    newLevels[index].enabled = e.target.checked;
                    setFilters({ ...filters, spiceLevels: newLevels });
                  }}
                  className="w-5 h-5 accent-premium-orange cursor-pointer"
                />
                <span className="text-2xl">{level.emoji}</span>
                <span className="font-semibold text-foreground">{level.name}</span>
              </div>
              <span className="text-sm text-foreground/50">ID: {level.id}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Filling Type Filters */}
      <Card>
        <h2 className="text-xl font-bold text-premium-orange mb-4">🥟 Filling Type Filters</h2>
        <div className="space-y-3">
          {filters.fillingTypes.map((type, index) => (
            <div
              key={type.id}
              className="flex items-center justify-between p-3 bg-charcoal rounded-lg"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={type.enabled}
                  onChange={(e) => {
                    const newTypes = [...filters.fillingTypes];
                    newTypes[index].enabled = e.target.checked;
                    setFilters({ ...filters, fillingTypes: newTypes });
                  }}
                  className="w-5 h-5 accent-premium-orange cursor-pointer"
                />
                <span className="text-2xl">{type.emoji}</span>
                <span className="font-semibold text-foreground">{type.name}</span>
              </div>
              <span className="text-sm text-foreground/50">ID: {type.id}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Tips Section */}
      <Card>
        <h3 className="text-lg font-bold text-golden-glow mb-3">💡 Filter Management Tips</h3>
        <ul className="space-y-2 text-sm text-foreground/70">
          <li>• Adjust price range to match your menu items</li>
          <li>• Disable filters that are not relevant to your menu</li>
          <li>• Slider step controls how smoothly users can adjust price filter</li>
          <li>• Changes will be reflected immediately on the menu page</li>
          <li>• Use "Reset to Default" to restore original settings</li>
        </ul>
      </Card>
    </div>
  );
}
