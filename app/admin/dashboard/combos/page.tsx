'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ImageDropZone } from '@/components/cms/ImageDropZone';
import { ContentAnalytics } from '@/components/cms/ContentAnalytics';
import { ContentStateManager, ContentState } from '@/components/cms/ContentStateManager';
import { InlineEditor } from '@/components/cms/InlineEditor';
import { VisualDesignPanel } from '@/components/cms/VisualDesignPanel';
import { PublishControls } from '@/components/cms/PublishControls';

interface ComboItem {
  itemName: string;
  quantity: number;
}

interface ComboDeal {
  id: string;
  name: string;
  description: string;
  items: ComboItem[];
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  image: string;
  isActive: boolean;
  validFrom: string;
  validUntil: string;
  state?: ContentState;
  scheduledDate?: string;
}

export default function ComboDealsManagementPage() {
  const [combos, setCombos] = useState<ComboDeal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCombo, setEditingCombo] = useState<ComboDeal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    loadCombos();
  }, []);

  const loadCombos = async () => {
    try {
      const response = await fetch('/api/cms/combos');
      if (response.ok) {
        const data = await response.json();
        setCombos(data.combos || []);
      }
    } catch (error) {
      console.error('Error loading combo deals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (combo: ComboDeal) => {
    try {
      const response = await fetch('/api/cms/combos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ combo }),
      });

      if (response.ok) {
        setSaveMessage('✅ Combo deal saved successfully!');
        loadCombos();
        setIsModalOpen(false);
        setEditingCombo(null);
      } else {
        setSaveMessage('❌ Failed to save combo deal');
      }
    } catch (error) {
      setSaveMessage('❌ Error saving combo deal');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this combo deal?')) return;

    try {
      const response = await fetch(`/api/cms/combos?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSaveMessage('✅ Combo deal deleted successfully!');
        loadCombos();
      } else {
        setSaveMessage('❌ Failed to delete combo deal');
      }
    } catch (error) {
      setSaveMessage('❌ Error deleting combo deal');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const openAddModal = () => {
    const today = new Date().toISOString().split('T')[0];
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const validUntil = nextMonth.toISOString().split('T')[0];

    setEditingCombo({
      id: Date.now().toString(),
      name: '',
      description: '',
      items: [{ itemName: '', quantity: 1 }],
      originalPrice: 0,
      discountedPrice: 0,
      discount: 0,
      image: '',
      isActive: true,
      validFrom: today,
      validUntil: validUntil,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (combo: ComboDeal) => {
    setEditingCombo({ ...combo });
    setIsModalOpen(true);
  };

  const addComboItem = () => {
    if (!editingCombo) return;
    setEditingCombo({
      ...editingCombo,
      items: [...editingCombo.items, { itemName: '', quantity: 1 }]
    });
  };

  const removeComboItem = (index: number) => {
    if (!editingCombo || editingCombo.items.length <= 1) return;
    const newItems = editingCombo.items.filter((_, i) => i !== index);
    setEditingCombo({ ...editingCombo, items: newItems });
  };

  const updateComboItem = (index: number, field: keyof ComboItem, value: string | number) => {
    if (!editingCombo) return;
    const newItems = [...editingCombo.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setEditingCombo({ ...editingCombo, items: newItems });
  };

  const calculateDiscount = (original: number, discounted: number) => {
    if (original <= 0) return 0;
    return Math.round(((original - discounted) / original) * 100);
  };

  const updatePrices = (field: 'originalPrice' | 'discountedPrice', value: number) => {
    if (!editingCombo) return;
    const updated = { ...editingCombo, [field]: value };
    if (field === 'originalPrice') {
      updated.discount = calculateDiscount(value, editingCombo.discountedPrice);
    } else {
      updated.discount = calculateDiscount(editingCombo.originalPrice, value);
    }
    setEditingCombo(updated);
  };

  const isExpired = (validUntil: string) => {
    return new Date(validUntil) < new Date();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🎁</div>
          <p className="text-golden-glow">Loading combo deals...</p>
        </div>
      </div>
    );
  }

  const saveComboData = async () => {
    await loadCombos();
  };

  return (
    <div>
      <PublishControls
        pageName="combos"
        onSave={saveComboData}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-premium-orange mb-2">
              Combo Deals Management
            </h1>
            <p className="text-foreground/70">
              Create and manage special combo deals with expiry dates
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={openAddModal}
          >
            ➕ Add New Combo
          </Button>
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

        {/* Combo Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {combos.map((combo, index) => (
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden">
                {/* Status Badges */}
                <div className="absolute top-3 right-3 flex gap-2 z-10">
                  {combo.isActive && !isExpired(combo.validUntil) && (
                    <span className="px-2 py-1 bg-vegetarian-green text-white text-xs font-bold rounded">
                      ACTIVE
                    </span>
                  )}
                  {isExpired(combo.validUntil) && (
                    <span className="px-2 py-1 bg-warm-orange text-white text-xs font-bold rounded">
                      EXPIRED
                    </span>
                  )}
                  {!combo.isActive && (
                    <span className="px-2 py-1 bg-charcoal text-foreground/60 text-xs font-bold rounded">
                      INACTIVE
                    </span>
                  )}
                </div>

                {/* Discount Badge */}
                {combo.discount > 0 && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 bg-golden-glow text-pitch-black text-sm font-bold rounded">
                      {combo.discount}% OFF
                    </span>
                  </div>
                )}

                {/* Image */}
                <div className="h-48 bg-charcoal rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  {combo.image ? (
                    <img
                      src={combo.image}
                      alt={combo.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-6xl">🎁</span>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-premium-orange mb-1">
                      {combo.name}
                    </h3>
                    <p className="text-sm text-foreground/70 line-clamp-2">
                      {combo.description}
                    </p>
                  </div>

                  {/* Items List */}
                  <div className="bg-pitch-black p-3 rounded-lg">
                    <p className="text-xs font-semibold text-golden-glow mb-2">Includes:</p>
                    <ul className="space-y-1">
                      {combo.items.map((item, idx) => (
                        <li key={idx} className="text-xs text-foreground/80">
                          • {item.quantity}x {item.itemName}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-foreground/60 line-through">₹{combo.originalPrice}</p>
                      <p className="text-2xl font-bold text-golden-glow">₹{combo.discountedPrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-foreground/60">Save</p>
                      <p className="text-lg font-bold text-vegetarian-green">
                        ₹{combo.originalPrice - combo.discountedPrice}
                      </p>
                    </div>
                  </div>

                  {/* Validity */}
                  <div className="text-xs text-foreground/60">
                    Valid: {new Date(combo.validFrom).toLocaleDateString()} - {new Date(combo.validUntil).toLocaleDateString()}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t border-charcoal">
                    <button
                      onClick={() => openEditModal(combo)}
                      className="flex-1 px-4 py-2 bg-premium-orange text-pitch-black rounded-lg text-sm font-bold hover:-translate-y-0.5 transition-all duration-300"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(combo.id)}
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

        {combos.length === 0 && (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">🎁</div>
            <h3 className="text-2xl font-bold text-golden-glow mb-2">
              No Combo Deals Yet
            </h3>
            <p className="text-foreground/70 mb-6">
              Start by creating your first combo deal
            </p>
            <Button variant="primary" size="lg" onClick={openAddModal}>
              ➕ Add First Combo
            </Button>
          </Card>
        )}

        {/* Visual Design Controls */}
        <VisualDesignPanel pageName="combos" onSave={() => loadCombos()} />
      </motion.div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && editingCombo && (
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
              className="bg-deep-space border border-charcoal rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold text-premium-orange mb-6">
                {editingCombo.id === Date.now().toString() ? 'Add New Combo Deal' : 'Edit Combo Deal'}
              </h2>

              <div className="space-y-6">
                {/* Combo Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Combo Name *
                  </label>
                  <InlineEditor
                    value={editingCombo.name}
                    onChange={(value) => setEditingCombo({ ...editingCombo, name: value })}
                    onSave={() => handleSave(editingCombo)}
                    placeholder="e.g., Family Feast Combo"
                    className="w-full"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Description
                  </label>
                  <InlineEditor
                    value={editingCombo.description}
                    onChange={(value) => setEditingCombo({ ...editingCombo, description: value })}
                    onSave={() => handleSave(editingCombo)}
                    multiline={true}
                    placeholder="Brief description of the combo deal"
                    className="w-full"
                  />
                </div>

                {/* Combo Items */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-foreground/80">
                      Combo Items *
                    </label>
                    <button
                      type="button"
                      onClick={addComboItem}
                      className="px-3 py-1 bg-vegetarian-green text-white rounded text-xs font-bold hover:bg-vegetarian-green/80 transition-colors"
                    >
                      ➕ Add Item
                    </button>
                  </div>
                  <div className="space-y-3">
                    {editingCombo.items.map((item, index) => (
                      <div key={index} className="flex gap-3 items-start p-3 bg-pitch-black rounded-lg border border-charcoal">
                        <div className="flex-1">
                          <InlineEditor
                            value={item.itemName}
                            onChange={(value) => updateComboItem(index, 'itemName', value)}
                            onSave={() => handleSave(editingCombo)}
                            placeholder="Item name"
                            className="w-full"
                          />
                        </div>
                        <div className="w-24">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateComboItem(index, 'quantity', parseInt(e.target.value) || 1)}
                            className="w-full px-3 py-2 bg-deep-space border border-charcoal rounded text-foreground text-sm focus:outline-none focus:border-golden-glow"
                            placeholder="Qty"
                            min="1"
                          />
                        </div>
                        {editingCombo.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeComboItem(index)}
                            className="px-3 py-2 bg-warm-orange/20 text-warm-orange rounded text-sm font-bold hover:bg-warm-orange/30 transition-colors"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Original Price (₹) *
                    </label>
                    <input
                      type="number"
                      value={editingCombo.originalPrice}
                      onChange={(e) => updatePrices('originalPrice', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                      placeholder="200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Discounted Price (₹) *
                    </label>
                    <input
                      type="number"
                      value={editingCombo.discountedPrice}
                      onChange={(e) => updatePrices('discountedPrice', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                      placeholder="150"
                    />
                  </div>
                </div>

                {/* Discount Display */}
                {editingCombo.discount > 0 && (
                  <div className="p-3 bg-golden-glow/10 border border-golden-glow rounded-lg">
                    <p className="text-golden-glow font-bold">
                      💰 Discount: {editingCombo.discount}% OFF (Save ₹{editingCombo.originalPrice - editingCombo.discountedPrice})
                    </p>
                  </div>
                )}

                {/* Validity Period */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Valid From *
                    </label>
                    <input
                      type="date"
                      value={editingCombo.validFrom}
                      onChange={(e) => setEditingCombo({ ...editingCombo, validFrom: e.target.value })}
                      className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Valid Until *
                    </label>
                    <input
                      type="date"
                      value={editingCombo.validUntil}
                      onChange={(e) => setEditingCombo({ ...editingCombo, validUntil: e.target.value })}
                      className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    />
                  </div>
                </div>

                {/* Combo Image */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Combo Image
                  </label>
                  <ImageDropZone
                    currentImage={editingCombo.image}
                    onImageChange={(url) => setEditingCombo({ ...editingCombo, image: url })}
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
                    alt={editingCombo.name}
                    height="200px"
                  />
                </div>

                {/* Active Status */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingCombo.isActive}
                      onChange={(e) => setEditingCombo({ ...editingCombo, isActive: e.target.checked })}
                      className="w-5 h-5 rounded border-charcoal bg-pitch-black checked:bg-vegetarian-green"
                    />
                    <span className="text-sm text-foreground/80">
                      Mark as Active (visible to customers)
                    </span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-charcoal">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => handleSave(editingCombo)}
                    className="flex-1"
                  >
                    💾 Save Combo Deal
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
