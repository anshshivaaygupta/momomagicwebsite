'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  title: string;
  category: string;
  seoTags: string[];
  uploadDate: string;
}

const imageCategories = ['Food', 'Stall', 'Awards', 'Events', 'Behind the Scenes'];

export default function GalleryManagementPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState('');

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const response = await fetch('/api/cms/gallery');
      if (response.ok) {
        const data = await response.json();
        setImages(data.images || []);
      }
    } catch (error) {
      console.error('Error loading gallery images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (image: GalleryImage) => {
    try {
      const response = await fetch('/api/cms/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      });

      if (response.ok) {
        setSaveMessage('✅ Image saved successfully!');
        loadImages();
        setIsModalOpen(false);
        setEditingImage(null);
      } else {
        setSaveMessage('❌ Failed to save image');
      }
    } catch (error) {
      setSaveMessage('❌ Error saving image');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`/api/cms/gallery?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSaveMessage('✅ Image deleted successfully!');
        loadImages();
      } else {
        setSaveMessage('❌ Failed to delete image');
      }
    } catch (error) {
      setSaveMessage('❌ Error deleting image');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedImages.size === 0) return;
    if (!confirm(`Delete ${selectedImages.size} selected images?`)) return;

    try {
      const response = await fetch('/api/cms/gallery/bulk', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: Array.from(selectedImages) }),
      });

      if (response.ok) {
        setSaveMessage(`✅ ${selectedImages.size} images deleted successfully!`);
        setSelectedImages(new Set());
        loadImages();
      } else {
        setSaveMessage('❌ Failed to delete images');
      }
    } catch (error) {
      setSaveMessage('❌ Error deleting images');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleBulkCategoryChange = async (newCategory: string) => {
    if (selectedImages.size === 0) return;

    try {
      const response = await fetch('/api/cms/gallery/bulk', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ids: Array.from(selectedImages),
          category: newCategory 
        }),
      });

      if (response.ok) {
        setSaveMessage(`✅ ${selectedImages.size} images updated successfully!`);
        setSelectedImages(new Set());
        loadImages();
      } else {
        setSaveMessage('❌ Failed to update images');
      }
    } catch (error) {
      setSaveMessage('❌ Error updating images');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const toggleImageSelection = (id: string) => {
    const newSelection = new Set(selectedImages);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedImages(newSelection);
  };

  const selectAll = () => {
    if (selectedImages.size === images.length) {
      setSelectedImages(new Set());
    } else {
      setSelectedImages(new Set(images.map(img => img.id)));
    }
  };

  const openAddModal = () => {
    setEditingImage({
      id: Date.now().toString(),
      url: '',
      alt: '',
      title: '',
      category: imageCategories[0],
      seoTags: [],
      uploadDate: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  const openEditModal = (image: GalleryImage) => {
    setEditingImage({ ...image });
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">📸</div>
          <p className="text-golden-glow">Loading gallery...</p>
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
              Gallery Management
            </h1>
            <p className="text-foreground/70">
              Manage your gallery images with SEO optimization
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={openAddModal}
          >
            ➕ Add New Image
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

        {/* Bulk Actions */}
        {selectedImages.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-deep-space border border-golden-glow rounded-lg"
          >
            <div className="flex items-center justify-between">
              <p className="text-golden-glow font-semibold">
                {selectedImages.size} image{selectedImages.size > 1 ? 's' : ''} selected
              </p>
              <div className="flex gap-3">
                <select
                  value={bulkAction}
                  onChange={(e) => {
                    const action = e.target.value;
                    setBulkAction(action);
                    if (action && action !== 'delete') {
                      handleBulkCategoryChange(action);
                      setBulkAction('');
                    }
                  }}
                  className="px-4 py-2 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow"
                >
                  <option value="">Change Category...</option>
                  {imageCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleBulkDelete}
                  className="border-warm-orange text-warm-orange hover:bg-warm-orange/20"
                >
                  🗑️ Delete Selected
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setSelectedImages(new Set())}
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Select All */}
        {images.length > 0 && (
          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={selectedImages.size === images.length}
                onChange={selectAll}
                className="w-5 h-5 rounded border-charcoal bg-pitch-black checked:bg-golden-glow"
              />
              <span className="text-sm text-foreground/80">
                Select All ({images.length} images)
              </span>
            </label>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <Card className={`relative overflow-hidden ${selectedImages.has(image.id) ? 'ring-2 ring-golden-glow' : ''}`}>
                {/* Selection Checkbox */}
                <div className="absolute top-3 left-3 z-10">
                  <input
                    type="checkbox"
                    checked={selectedImages.has(image.id)}
                    onChange={() => toggleImageSelection(image.id)}
                    className="w-6 h-6 rounded border-charcoal bg-pitch-black/80 checked:bg-golden-glow cursor-pointer"
                  />
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2 py-1 bg-premium-orange text-pitch-black text-xs font-bold rounded">
                    {image.category}
                  </span>
                </div>

                {/* Image */}
                <div className="h-48 bg-charcoal rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  {image.url ? (
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-6xl">📸</span>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-premium-orange mb-1 truncate">
                      {image.title || 'Untitled'}
                    </h3>
                    <p className="text-xs text-foreground/60 truncate">{image.alt}</p>
                  </div>

                  {/* SEO Tags */}
                  {image.seoTags && image.seoTags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {image.seoTags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-charcoal text-golden-glow text-xs rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                      {image.seoTags.length > 3 && (
                        <span className="text-xs text-foreground/60">
                          +{image.seoTags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t border-charcoal">
                    <button
                      onClick={() => openEditModal(image)}
                      className="flex-1 px-4 py-2 bg-premium-orange text-pitch-black rounded-lg text-sm font-bold hover:-translate-y-0.5 transition-all duration-300"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
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

        {images.length === 0 && (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-2xl font-bold text-golden-glow mb-2">
              No Images Yet
            </h3>
            <p className="text-foreground/70 mb-6">
              Start by adding your first gallery image
            </p>
            <Button variant="primary" size="lg" onClick={openAddModal}>
              ➕ Add First Image
            </Button>
          </Card>
        )}
      </motion.div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && editingImage && (
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
                {editingImage.id === Date.now().toString() ? 'Add New Image' : 'Edit Image'}
              </h2>

              <div className="space-y-6">
                {/* Image URL */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Image URL *
                  </label>
                  <input
                    type="text"
                    value={editingImage.url}
                    onChange={(e) => setEditingImage({ ...editingImage, url: e.target.value })}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    placeholder="/images/gallery/image.jpg"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={editingImage.title}
                    onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    placeholder="e.g., Kurkure Momos Close-up"
                  />
                </div>

                {/* Alt Text (SEO) */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Alt Text (SEO) *
                  </label>
                  <input
                    type="text"
                    value={editingImage.alt}
                    onChange={(e) => setEditingImage({ ...editingImage, alt: e.target.value })}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    placeholder="Descriptive text for accessibility and SEO"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Category *
                  </label>
                  <select
                    value={editingImage.category}
                    onChange={(e) => setEditingImage({ ...editingImage, category: e.target.value })}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                  >
                    {imageCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* SEO Tags */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    SEO Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={editingImage.seoTags.join(', ')}
                    onChange={(e) => setEditingImage({ 
                      ...editingImage, 
                      seoTags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) 
                    })}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    placeholder="momos, food, sherghati, kurkure"
                  />
                  <p className="text-xs text-foreground/50 mt-1">
                    Add keywords for better SEO and searchability
                  </p>
                </div>

                {/* Preview */}
                {editingImage.url && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Preview
                    </label>
                    <div className="h-48 bg-charcoal rounded-lg overflow-hidden">
                      <img
                        src={editingImage.url}
                        alt={editingImage.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-charcoal">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => handleSave(editingImage)}
                    className="flex-1"
                  >
                    💾 Save Image
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
