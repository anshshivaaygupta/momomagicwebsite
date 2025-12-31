'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MediaLibraryPicker } from '@/components/cms/MediaLibraryPicker';
import { ImageDropZone } from '@/components/cms/ImageDropZone';
import { ContentAnalytics } from '@/components/cms/ContentAnalytics';
import { ContentStateManager, ContentState } from '@/components/cms/ContentStateManager';
import { InlineEditor } from '@/components/cms/InlineEditor';
import { VisualDesignPanel } from '@/components/cms/VisualDesignPanel';
import { PublishControls } from '@/components/cms/PublishControls';

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
  imageHalf?: string;  // Separate image for half plate
  imageFull?: string;  // Separate image for full plate
  isPopular: boolean;
  isNew: boolean;
  spiceLevel: string;
  state?: ContentState;
  scheduledDate?: string;
}

const IMAGE_SPECS = {
  menuItem: {
    width: 600,
    height: 400,
    format: 'JPG or PNG',
    description: 'High-quality food photography with good lighting'
  }
};

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
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [mediaLibraryOpen, setMediaLibraryOpen] = useState(false);
  const [mediaLibraryField, setMediaLibraryField] = useState<'image' | 'imageHalf' | 'imageFull'>('image');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState<string>('all');
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [bulkActionMode, setBulkActionMode] = useState(false);
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const imageHalfInputRef = useRef<HTMLInputElement>(null);
  const imageFullInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadMenuItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [menuItems, searchQuery, selectedCategory, selectedSpiceLevel, showPopularOnly, showNewOnly]);

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

  const filterItems = () => {
    let filtered = [...menuItems];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedSpiceLevel !== 'all') {
      filtered = filtered.filter(item => item.spiceLevel === selectedSpiceLevel);
    }

    if (showPopularOnly) {
      filtered = filtered.filter(item => item.isPopular);
    }

    if (showNewOnly) {
      filtered = filtered.filter(item => item.isNew);
    }

    setFilteredItems(filtered);
  };

  const toggleItemSelection = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const selectAllItems = () => {
    if (selectedItems.size === filteredItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredItems.map(item => item.id)));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedItems.size === 0) return;
    if (!confirm(`Delete ${selectedItems.size} selected items?`)) return;

    try {
      const deletePromises = Array.from(selectedItems).map(id =>
        fetch(`/api/cms/menu?id=${id}`, { method: 'DELETE' })
      );
      await Promise.all(deletePromises);
      setSaveMessage(`✅ ${selectedItems.size} items deleted successfully!`);
      setSelectedItems(new Set());
      setBulkActionMode(false);
      loadMenuItems();
    } catch (error) {
      setSaveMessage('❌ Error deleting items');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSpiceLevel('all');
    setShowPopularOnly(false);
    setShowNewOnly(false);
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

  const handleFileUpload = async (field: 'image' | 'imageHalf' | 'imageFull', file: File) => {
    if (!editingItem) return;
    
    setUploadingField(field);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('field', field);

    try {
      const response = await fetch('/api/cms/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setEditingItem({ ...editingItem, [field]: data.url });
        setSaveMessage(`✅ ${field} uploaded successfully!`);
      } else {
        setSaveMessage(`❌ Failed to upload ${field}`);
      }
    } catch (error) {
      setSaveMessage(`❌ Error uploading ${field}`);
    } finally {
      setUploadingField(null);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const openMediaLibrary = (field: 'image' | 'imageHalf' | 'imageFull') => {
    setMediaLibraryField(field);
    setMediaLibraryOpen(true);
  };

  const handleMediaSelect = (url: string) => {
    if (!editingItem) return;
    setEditingItem({ ...editingItem, [mediaLibraryField]: url });
    setSaveMessage(`✅ Image selected from library!`);
    setTimeout(() => setSaveMessage(''), 3000);
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

  const saveMenuData = async () => {
    await loadMenuItems();
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
      <PublishControls
        pageName="menu"
        onSave={saveMenuData}
      />
      
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

        {/* Search and Filters */}
        <Card className="mb-6 p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔍 Search menu items by name, description, or category..."
                  className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                />
              </div>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setBulkActionMode(!bulkActionMode)}
                className={bulkActionMode ? 'bg-premium-orange/20 border-premium-orange' : ''}
              >
                {bulkActionMode ? '✅ Bulk Mode' : '☑️ Bulk Select'}
              </Button>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-3">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-pitch-black border border-charcoal rounded-lg text-foreground text-sm focus:outline-none focus:border-golden-glow"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Spice Level Filter */}
              <select
                value={selectedSpiceLevel}
                onChange={(e) => setSelectedSpiceLevel(e.target.value)}
                className="px-4 py-2 bg-pitch-black border border-charcoal rounded-lg text-foreground text-sm focus:outline-none focus:border-golden-glow"
              >
                <option value="all">All Spice Levels</option>
                {spiceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>

              {/* Popular Filter */}
              <button
                onClick={() => setShowPopularOnly(!showPopularOnly)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  showPopularOnly
                    ? 'bg-golden-glow text-pitch-black'
                    : 'bg-pitch-black border border-charcoal text-foreground hover:border-golden-glow'
                }`}
              >
                ⭐ Popular Only
              </button>

              {/* New Filter */}
              <button
                onClick={() => setShowNewOnly(!showNewOnly)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  showNewOnly
                    ? 'bg-warm-orange text-white'
                    : 'bg-pitch-black border border-charcoal text-foreground hover:border-warm-orange'
                }`}
              >
                🆕 New Only
              </button>

              {/* Clear Filters */}
              {(searchQuery || selectedCategory !== 'all' || selectedSpiceLevel !== 'all' || showPopularOnly || showNewOnly) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-pitch-black border border-charcoal rounded-lg text-foreground text-sm hover:border-warm-orange transition-colors"
                >
                  ✕ Clear Filters
                </button>
              )}
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between text-sm">
              <p className="text-foreground/70">
                Showing {filteredItems.length} of {menuItems.length} items
                {selectedItems.size > 0 && ` • ${selectedItems.size} selected`}
              </p>
              
              {/* Bulk Actions */}
              {bulkActionMode && (
                <div className="flex gap-2">
                  <button
                    onClick={selectAllItems}
                    className="px-3 py-1 bg-pitch-black border border-charcoal rounded text-xs hover:border-golden-glow transition-colors"
                  >
                    {selectedItems.size === filteredItems.length ? 'Deselect All' : 'Select All'}
                  </button>
                  {selectedItems.size > 0 && (
                    <button
                      onClick={handleBulkDelete}
                      className="px-3 py-1 bg-warm-orange/20 border border-warm-orange text-warm-orange rounded text-xs hover:bg-warm-orange/30 transition-colors"
                    >
                      🗑️ Delete Selected ({selectedItems.size})
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => bulkActionMode && toggleItemSelection(item.id)}
              className={bulkActionMode ? 'cursor-pointer' : ''}
            >
              <Card className={`relative overflow-hidden ${selectedItems.has(item.id) ? 'ring-2 ring-premium-orange' : ''}`}>
                {/* Bulk Selection Checkbox */}
                {bulkActionMode && (
                  <div className="absolute top-3 left-3 z-10">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={() => toggleItemSelection(item.id)}
                      className="w-5 h-5 rounded border-2 border-golden-glow bg-pitch-black checked:bg-premium-orange cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}

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

        {filteredItems.length === 0 && menuItems.length > 0 && (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-golden-glow mb-2">
              No Items Match Your Filters
            </h3>
            <p className="text-foreground/70 mb-6">
              Try adjusting your search or filters
            </p>
            <Button variant="outline" size="lg" onClick={clearFilters}>
              ✕ Clear All Filters
            </Button>
          </Card>
        )}

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

        {/* Visual Design Controls */}
        <VisualDesignPanel pageName="menu" onSave={() => loadMenuItems()} />
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
                  <InlineEditor
                    value={editingItem.name}
                    onChange={(value) => setEditingItem({ ...editingItem, name: value })}
                    onSave={() => handleSave(editingItem)}
                    placeholder="e.g., Kurkure Veg Momos"
                    className="w-full"
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
                  <InlineEditor
                    value={editingItem.description}
                    onChange={(value) => setEditingItem({ ...editingItem, description: value })}
                    onSave={() => handleSave(editingItem)}
                    multiline={true}
                    placeholder="Brief description of the item"
                    className="w-full"
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

                {/* Content State Management */}
                <ContentStateManager
                  currentState={editingItem.state || 'draft'}
                  onStateChange={(newState) => setEditingItem({ ...editingItem, state: newState })}
                  scheduledDate={editingItem.scheduledDate}
                  onScheduleDateChange={(date) => setEditingItem({ ...editingItem, scheduledDate: date })}
                />

                {/* Content Analytics */}
                {editingItem.id !== Date.now().toString() && (
                  <ContentAnalytics
                    contentId={editingItem.id}
                    contentType="menu"
                    analytics={{
                      views: Math.floor(Math.random() * 10000),
                      engagement: Math.floor(Math.random() * 100),
                      conversions: Math.floor(Math.random() * 500),
                      performance: {
                        loadTime: Math.random() * 3,
                        seoScore: Math.floor(Math.random() * 100),
                      },
                    }}
                  />
                )}

                {/* Image Management Section */}
                <div className="space-y-6 p-6 bg-pitch-black border border-charcoal rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-golden-glow">📸 Image Management</h3>
                    <div className="text-xs text-foreground/60">
                      Recommended: {IMAGE_SPECS.menuItem.width}×{IMAGE_SPECS.menuItem.height}px ({IMAGE_SPECS.menuItem.format})
                    </div>
                  </div>

                  {/* Main Image */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Main Image (Default)
                    </label>
                    <ImageDropZone
                      currentImage={editingItem.image}
                      onImageChange={(url) => setEditingItem({ ...editingItem, image: url })}
                      onUpload={async (file) => {
                        const formData = new FormData();
                        formData.append('file', file);
                        const response = await fetch('/api/cms/media/upload', {
                          method: 'POST',
                          body: formData,
                        });
                        if (response.ok) {
                          const data = await response.json();
                          return data.url;
                        }
                        throw new Error('Upload failed');
                      }}
                      alt={editingItem.name}
                      height="200px"
                    />
                  </div>

                  {/* Portion-Specific Images */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-charcoal">
                    {/* Half Plate Image */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground/80 mb-2">
                        Half Plate Image (Optional)
                      </label>
                      <ImageDropZone
                        currentImage={editingItem.imageHalf}
                        onImageChange={(url) => setEditingItem({ ...editingItem, imageHalf: url })}
                        onUpload={async (file) => {
                          const formData = new FormData();
                          formData.append('file', file);
                          const response = await fetch('/api/cms/media/upload', {
                            method: 'POST',
                            body: formData,
                          });
                          if (response.ok) {
                            const data = await response.json();
                            return data.url;
                          }
                          throw new Error('Upload failed');
                        }}
                        alt={`${editingItem.name} - Half Plate`}
                        height="150px"
                      />
                    </div>

                    {/* Full Plate Image */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground/80 mb-2">
                        Full Plate Image (Optional)
                      </label>
                      <ImageDropZone
                        currentImage={editingItem.imageFull}
                        onImageChange={(url) => setEditingItem({ ...editingItem, imageFull: url })}
                        onUpload={async (file) => {
                          const formData = new FormData();
                          formData.append('file', file);
                          const response = await fetch('/api/cms/media/upload', {
                            method: 'POST',
                            body: formData,
                          });
                          if (response.ok) {
                            const data = await response.json();
                            return data.url;
                          }
                          throw new Error('Upload failed');
                        }}
                        alt={`${editingItem.name} - Full Plate`}
                        height="150px"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-foreground/50 pt-2 border-t border-charcoal">
                    💡 Tip: Upload separate images for half and full plates to show portion differences. If not provided, main image will be used.
                  </p>
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
                  <InlineEditor
                    value={newCategory}
                    onChange={(value) => setNewCategory(value)}
                    onSave={handleAddCategory}
                    placeholder="e.g., Dessert Momos"
                    className="flex-1"
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

      {/* Media Library Picker */}
      <MediaLibraryPicker
        isOpen={mediaLibraryOpen}
        onClose={() => setMediaLibraryOpen(false)}
        onSelect={handleMediaSelect}
        fileType="image"
      />
    </div>
  );
}
