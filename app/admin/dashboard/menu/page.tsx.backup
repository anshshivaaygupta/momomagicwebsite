'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: {
    half: number;
    full: number;
  };
  image: string;
  isPopular: boolean;
  isNew: boolean;
  spiceLevel: string;
}

interface MenuData {
  items: MenuItem[];
  categories: string[];
}

const defaultCategories = [
  'Steamed Perfection',
  'Crispy Fried Delights',
  'Magic Signatures',
  'Fusion Innovations'
];

const spiceLevels = ['Mild', 'Medium', 'Hot', 'Extra Magic'];

export default function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      const response = await fetch('/api/cms/menu');
      if (response.ok) {
        const data: MenuData = await response.json();
        setMenuItems(data.items || []);
        setCategories(data.categories || defaultCategories);
      }
    } catch (error) {
      console.error('Error loading menu items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (item: MenuItem) => {
    try {
      const response = await fetch('/api/cms/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item }),
      });

      if (response.ok) {
        setSaveMessage('✅ Menu item saved successfully!');
        loadMenuItems();
        setIsModalOpen(false);
        setEditingItem(null);
      } else {
        setSaveMessage('❌ Failed to save menu item');
      }
    } catch (error) {
      setSaveMessage('❌ Error saving menu item');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    try {
      const response = await fetch(`/api/cms/menu?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSaveMessage('✅ Menu item deleted successfully!');
        loadMenuItems();
      } else {
        setSaveMessage('❌ Failed to delete menu item');
      }
    } catch (error) {
      setSaveMessage('❌ Error deleting menu item');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const openAddModal = () => {
    setEditingItem({
      id: Date.now().toString(),
      name: '',
      category: categories[0],
      description: '',
      price: { half: 0, full: 0 },
      image: '/images/menu/placeholder.jpg',
      isPopular: false,
      isNew: false,
      spiceLevel: 'Medium'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    
    const updatedCategories = [...categories, newCategory.trim()];
    
    try {
      const response = await fetch('/api/cms/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categories: updatedCategories }),
      });

      if (response.ok) {
        setCategories(updatedCategories);
        setNewCategory('');
        setIsCategoryModalOpen(false);
        setSaveMessage('✅ Category added successfully!');
      } else {
        setSaveMessage('❌ Failed to add category');
      }
    } catch (error) {
      setSaveMessage('❌ Error adding category');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleDeleteCategory = async (categoryToDelete: string) => {
    if (!confirm(`Delete category "${categoryToDelete}"? Items in this category will need to be reassigned.`)) return;
    
    const updatedCategories = categories.filter(cat => cat !== categoryToDelete);
    
    try {
      const response = await fetch('/api/cms/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categories: updatedCategories }),
      });

      if (response.ok) {
        setCategories(updatedCategories);
        setSaveMessage('✅ Category deleted successfully!');
      } else {
        setSaveMessage('❌ Failed to delete category');
      }
    } catch (error) {
      setSaveMessage('❌ Error deleting category');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🥟</div>
          <p className="text-golden-glow">Loading menu items...</p>
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
              Menu Management
            </h1>
            <p className="text-foreground/70">
              Add, edit, and manage your menu items and categories
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsCategoryModalOpen(true)}
            >
              🏷️ Manage Categories
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={openAddModal}
            >
              ➕ Add New Item
            </Button>
          </div>
        </div>

        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              saveMessage.includes('✅')
                ? 'bg-vegetarian-green/20 border border-vegetarian-green'
                : 'bg-warm-orange/20 border border-warm-orange'
            }`}
          >
            <p className="text-foreground">{saveMessage}</p>
          </motion.div>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden">
                {/* Badges */}
                <div className="absolute top-3 right-3 flex gap-2 z-10">
                  {item.isPopular && (
                    <span className="px-2 py-1 bg-golden-glow text-pitch-black text-xs font-bold rounded">
                      POPULAR
                    </span>
                  )}
                  {item.isNew && (
                    <span className="px-2 py-1 bg-warm-orange text-white text-xs font-bold rounded">
                      NEW
                    </span>
                  )}
                </div>

                {/* Image */}
                <div className="h-48 bg-charcoal rounded-lg mb-4 flex items-center justify-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-6xl">🥟</span>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-premium-orange mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-foreground/60">{item.category}</p>
                  </div>

                  <p className="text-sm text-foreground/70 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground/60">Price</p>
                      <p className="text-lg font-bold text-golden-glow">
                        ₹{item.price.half} / ₹{item.price.full}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-foreground/60">Spice</p>
                      <p className="text-sm font-semibold text-warm-orange">
                        {item.spiceLevel}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t border-charcoal">
                    <button
                      onClick={() => openEditModal(item)}
                      className="flex-1 px-4 py-2 bg-premium-orange text-pitch-black rounded-lg text-sm font-bold hover:-translate-y-0.5 transition-all duration-300"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-4 py-2 bg-warm-orange/20 text-warm-orange rounded-lg text-sm font-bold hover:bg-warm-orange/30 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {menuItems.length === 0 && (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">🥟</div>
            <h3 className="text-2xl font-bold text-golden-glow mb-2">
              No Menu Items Yet
            </h3>
            <p className="text-foreground/70 mb-6">
              Start by adding your first menu item
            </p>
            <Button variant="primary" size="lg" onClick={openAddModal}>
              ➕ Add First Item
            </Button>
          </Card>
        )}
      </motion.div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && editingItem && (
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
                {editingItem.id === Date.now().toString() ? 'Add New Item' : 'Edit Menu Item'}
              </h2>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    placeholder="e.g., Kurkure Veg Momos"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Category *
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    rows={3}
                    placeholder="Brief description of the item"
                  />
                </div>

                {/* Prices */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Half Price (₹) *
                    </label>
                    <input
                      type="number"
                      value={editingItem.price.half}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        price: { ...editingItem.price, half: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                      placeholder="50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Full Price (₹) *
                    </label>
                    <input
                      type="number"
                      value={editingItem.price.full}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        price: { ...editingItem.price, full: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                      placeholder="100"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    placeholder="/images/menu/item.jpg"
                  />
                </div>

                {/* Spice Level */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Spice Level
                  </label>
                  <select
                    value={editingItem.spiceLevel}
                    onChange={(e) => setEditingItem({ ...editingItem, spiceLevel: e.target.value })}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                  >
                    {spiceLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                {/* Badges */}
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.isPopular}
                      onChange={(e) => setEditingItem({ ...editingItem, isPopular: e.target.checked })}
                      className="w-5 h-5 rounded border-charcoal bg-pitch-black checked:bg-golden-glow"
                    />
                    <span className="text-sm text-foreground/80">Mark as Popular</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.isNew}
                      onChange={(e) => setEditingItem({ ...editingItem, isNew: e.target.checked })}
                      className="w-5 h-5 rounded border-charcoal bg-pitch-black checked:bg-warm-orange"
                    />
                    <span className="text-sm text-foreground/80">Mark as New</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-charcoal">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => handleSave(editingItem)}
                    className="flex-1"
                  >
                    💾 Save Item
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

      {/* Category Management Modal */}
      <AnimatePresence>
        {isCategoryModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-pitch-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsCategoryModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-deep-space border border-charcoal rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold text-premium-orange mb-6">
                Manage Categories
              </h2>

              {/* Add New Category */}
              <div className="mb-8 p-6 bg-pitch-black border border-charcoal rounded-lg">
                <h3 className="text-xl font-bold text-golden-glow mb-4">
                  Add New Category
                </h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                    className="flex-1 px-4 py-3 bg-deep-space border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    placeholder="e.g., Dessert Momos"
                  />
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleAddCategory}
                  >
                    ➕ Add
                  </Button>
                </div>
              </div>

              {/* Existing Categories */}
              <div>
                <h3 className="text-xl font-bold text-golden-glow mb-4">
                  Existing Categories ({categories.length})
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className="flex items-center justify-between p-4 bg-pitch-black border border-charcoal rounded-lg hover:border-golden-glow/30 transition-colors"
                    >
                      <span className="text-foreground font-medium">{category}</span>
                      <button
                        onClick={() => handleDeleteCategory(category)}
                        className="px-4 py-2 bg-warm-orange/20 text-warm-orange rounded-lg text-sm font-bold hover:bg-warm-orange/30 transition-colors"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-8 pt-6 border-t border-charcoal">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
