'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

const ICON_OPTIONS = ['🥟', '🍜', '🍕', '🔥', '✨', '⭐', '🎯', '💎', '🌟', '🎨'];
const COLOR_OPTIONS = [
  { name: 'Premium Orange', value: '#ffc241' },
  { name: 'Golden Glow', value: '#ffd700' },
  { name: 'Warm Orange', value: '#EA580C' },
  { name: 'Vegetarian Green', value: '#059669' },
  { name: 'Deep Space', value: '#0a0a0a' },
  { name: 'Charcoal', value: '#111111' },
];

export default function CategoriesManagementPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/cms/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingCategory({
      id: Date.now().toString(),
      name: '',
      slug: '',
      description: '',
      icon: '🥟',
      color: '#ffc241',
      order: categories.length + 1,
      isActive: true,
      createdAt: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory({ ...category });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingCategory) return;

    if (!editingCategory.name.trim()) {
      setSaveMessage('❌ Category name is required');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    if (!editingCategory.slug.trim()) {
      editingCategory.slug = editingCategory.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    try {
      const response = await fetch('/api/cms/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCategory),
      });

      if (response.ok) {
        setSaveMessage('✅ Category saved successfully!');
        loadCategories();
        setIsModalOpen(false);
      } else {
        setSaveMessage('❌ Failed to save category');
      }
    } catch (error) {
      setSaveMessage('❌ Error saving category');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`/api/cms/categories?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSaveMessage('✅ Category deleted successfully!');
        loadCategories();
      } else {
        setSaveMessage('❌ Failed to delete category');
      }
    } catch (error) {
      setSaveMessage('❌ Error deleting category');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const toggleActive = async (category: Category) => {
    const updated = { ...category, isActive: !category.isActive };
    try {
      const response = await fetch('/api/cms/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      if (response.ok) {
        loadCategories();
      }
    } catch (error) {
      console.error('Error toggling category:', error);
    }
  };

  const moveCategory = async (index: number, direction: 'up' | 'down') => {
    const newCategories = [...categories];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newCategories.length) return;

    [newCategories[index], newCategories[targetIndex]] = [newCategories[targetIndex], newCategories[index]];

    newCategories.forEach((cat, idx) => {
      cat.order = idx + 1;
    });

    setCategories(newCategories);

    try {
      await fetch('/api/cms/categories/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories: newCategories }),
      });
    } catch (error) {
      console.error('Error reordering categories:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🗂️</div>
          <p className="text-golden-glow">Loading categories...</p>
        </div>
      </div>
    );
  }

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
              Categories Management
            </h1>
            <p className="text-foreground/70">
              Manage menu categories dynamically - add, edit, reorder, and organize
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={openAddModal}
          >
            ➕ Add Category
          </Button>
        </div>

        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-deep-space border border-charcoal rounded-lg text-center"
          >
            {saveMessage}
          </motion.div>
        )}

        {/* Categories List */}
        <div className="grid gap-4">
          {categories.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📂</div>
                <h3 className="text-xl font-bold text-foreground/80 mb-2">
                  No Categories Yet
                </h3>
                <p className="text-foreground/60 mb-6">
                  Create your first category to organize your menu items
                </p>
                <Button variant="primary" onClick={openAddModal}>
                  ➕ Create First Category
                </Button>
              </div>
            </Card>
          ) : (
            categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:border-golden-glow transition-colors">
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                      className="text-4xl p-3 rounded-lg"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      {category.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-foreground">
                          {category.name}
                        </h3>
                        <span
                          className="px-2 py-1 rounded text-xs font-bold"
                          style={{
                            backgroundColor: `${category.color}20`,
                            color: category.color,
                          }}
                        >
                          {category.slug}
                        </span>
                        {!category.isActive && (
                          <span className="px-2 py-1 bg-warm-orange/20 text-warm-orange rounded text-xs font-bold">
                            Inactive
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-foreground/60">
                        {category.description || 'No description'}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {/* Reorder */}
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => moveCategory(index, 'up')}
                          disabled={index === 0}
                          className="px-2 py-1 bg-deep-space border border-charcoal rounded text-xs hover:bg-golden-glow hover:text-pitch-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => moveCategory(index, 'down')}
                          disabled={index === categories.length - 1}
                          className="px-2 py-1 bg-deep-space border border-charcoal rounded text-xs hover:bg-golden-glow hover:text-pitch-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          ▼
                        </button>
                      </div>

                      {/* Toggle Active */}
                      <button
                        onClick={() => toggleActive(category)}
                        className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                          category.isActive
                            ? 'bg-vegetarian-green/20 text-vegetarian-green hover:bg-vegetarian-green hover:text-white'
                            : 'bg-warm-orange/20 text-warm-orange hover:bg-warm-orange hover:text-white'
                        }`}
                      >
                        {category.isActive ? '✓ Active' : '✕ Inactive'}
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => openEditModal(category)}
                        className="px-3 py-2 bg-premium-orange/20 text-premium-orange rounded-lg text-sm font-bold hover:bg-premium-orange hover:text-pitch-black transition-colors"
                      >
                        ✏️ Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="px-3 py-2 bg-warm-orange/20 text-warm-orange rounded-lg text-sm font-bold hover:bg-warm-orange hover:text-white transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && editingCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-pitch-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-deep-space border border-charcoal rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold text-premium-orange mb-6">
                {editingCategory.id && categories.find(c => c.id === editingCategory.id)
                  ? '✏️ Edit Category'
                  : '➕ Add New Category'}
              </h2>

              <div className="space-y-6">
                {/* Category Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    placeholder="e.g., Steamed Momos"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Slug (URL-friendly name)
                  </label>
                  <input
                    type="text"
                    value={editingCategory.slug}
                    onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    placeholder="Auto-generated if empty"
                  />
                  <p className="text-xs text-foreground/50 mt-1">
                    Leave empty to auto-generate from name
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingCategory.description}
                    onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors resize-none"
                    rows={3}
                    placeholder="Brief description of this category"
                  />
                </div>

                {/* Icon */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Icon
                  </label>
                  <div className="grid grid-cols-10 gap-2">
                    {ICON_OPTIONS.map((icon) => (
                      <button
                        key={icon}
                        onClick={() => setEditingCategory({ ...editingCategory, icon })}
                        className={`text-2xl p-2 rounded-lg border-2 transition-all ${
                          editingCategory.icon === icon
                            ? 'border-golden-glow bg-golden-glow/20'
                            : 'border-charcoal hover:border-golden-glow/50'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Color Theme
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {COLOR_OPTIONS.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setEditingCategory({ ...editingCategory, color: color.value })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          editingCategory.color === color.value
                            ? 'border-golden-glow'
                            : 'border-charcoal hover:border-golden-glow/50'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      >
                        {editingCategory.color === color.value && (
                          <span className="text-white">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Status */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={editingCategory.isActive}
                    onChange={(e) => setEditingCategory({ ...editingCategory, isActive: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <label className="text-sm font-semibold text-foreground/80">
                    Active (visible on website)
                  </label>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-charcoal">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleSave}
                    className="flex-1"
                  >
                    💾 Save Category
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
