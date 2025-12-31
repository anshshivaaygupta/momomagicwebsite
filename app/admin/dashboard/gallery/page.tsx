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

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  title: string;
  category: string;
  seoTags: string[];
  uploadDate: string;
  state?: ContentState;
  scheduledDate?: string;
}

const imageCategories = ['Food', 'Stall', 'Awards', 'Events', 'Behind the Scenes'];

const IMAGE_SPECS = {
  gallery: {
    width: 1200,
    height: 800,
    format: 'JPG or PNG',
    description: 'High-resolution images for gallery display'
  }
};

export default function GalleryManagementPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState('');
  const [uploadingFile, setUploadingFile] = useState(false);
  const [bulkUploadCategory, setBulkUploadCategory] = useState(imageCategories[0]);
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false);
  const [mediaLibraryOpen, setMediaLibraryOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const bulkUploadInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    filterImages();
  }, [images, searchQuery, selectedCategory]);

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

  const filterImages = () => {
    let filtered = [...images];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(img =>
        img.title.toLowerCase().includes(query) ||
        img.alt.toLowerCase().includes(query) ||
        img.category.toLowerCase().includes(query) ||
        img.seoTags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(img => img.category === selectedCategory);
    }

    setFilteredImages(filtered);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
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
    if (selectedImages.size === filteredImages.length && filteredImages.length > 0) {
      setSelectedImages(new Set());
    } else {
      setSelectedImages(new Set(filteredImages.map(img => img.id)));
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
    setEditingImage({ ...image, seoTags: image.seoTags || [] });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (file: File) => {
    if (!editingImage) return;
    
    setUploadingFile(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/cms/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setEditingImage({ ...editingImage, url: data.url });
        setSaveMessage('✅ Image uploaded successfully!');
      } else {
        setSaveMessage('❌ Failed to upload image');
      }
    } catch (error) {
      setSaveMessage('❌ Error uploading image');
    } finally {
      setUploadingFile(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleMediaSelect = (url: string) => {
    if (!editingImage) return;
    setEditingImage({ ...editingImage, url });
    setSaveMessage('✅ Image selected from library!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleBulkUpload = async (files: FileList) => {
    setUploadingFile(true);
    const uploadedImages: GalleryImage[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/cms/media/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const newImage: GalleryImage = {
            id: Date.now().toString() + i,
            url: data.url,
            alt: file.name.replace(/\.[^/.]+$/, ''),
            title: file.name.replace(/\.[^/.]+$/, ''),
            category: bulkUploadCategory,
            seoTags: [],
            uploadDate: new Date().toISOString(),
          };
          uploadedImages.push(newImage);
        }
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
      }
    }

    if (uploadedImages.length > 0) {
      for (const image of uploadedImages) {
        await handleSave(image);
      }
      setSaveMessage(`✅ ${uploadedImages.length} images uploaded successfully!`);
      setIsBulkUploadModalOpen(false);
    } else {
      setSaveMessage('❌ Failed to upload images');
    }

    setUploadingFile(false);
    setTimeout(() => setSaveMessage(''), 3000);
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

  const saveGalleryData = async () => {
    await loadImages();
  };

  return (
    <div>
      <PublishControls
        pageName="gallery"
        onSave={saveGalleryData}
      />
      
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
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsBulkUploadModalOpen(true)}
            >
              📤 Bulk Upload
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={openAddModal}
            >
              ➕ Add New Image
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
                  placeholder="🔍 Search images by title, alt text, category, or tags..."
                  className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                />
              </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-pitch-black border border-charcoal rounded-lg text-foreground text-sm focus:outline-none focus:border-golden-glow"
              >
                <option value="all">All Categories</option>
                {imageCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Clear Filters */}
              {(searchQuery || selectedCategory !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-pitch-black border border-charcoal rounded-lg text-foreground text-sm hover:border-warm-orange transition-colors"
                >
                  ✕ Clear Filters
                </button>
              )}

              {/* Results Summary */}
              <div className="ml-auto text-sm text-foreground/70">
                Showing {filteredImages.length} of {images.length} images
                {selectedImages.size > 0 && ` • ${selectedImages.size} selected`}
              </div>
            </div>
          </div>
        </Card>

        {/* Select All */}
        {filteredImages.length > 0 && (
          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={selectedImages.size === filteredImages.length && filteredImages.length > 0}
                onChange={selectAll}
                className="w-5 h-5 rounded border-charcoal bg-pitch-black checked:bg-golden-glow"
              />
              <span className="text-sm text-foreground/80">
                Select All ({filteredImages.length} images)
              </span>
            </label>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
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

        {filteredImages.length === 0 && images.length > 0 && (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-golden-glow mb-2">
              No Images Match Your Filters
            </h3>
            <p className="text-foreground/70 mb-6">
              Try adjusting your search or filters
            </p>
            <Button variant="outline" size="lg" onClick={clearFilters}>
              ✕ Clear All Filters
            </Button>
          </Card>
        )}

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

        {/* Visual Design Controls */}
        <VisualDesignPanel pageName="gallery" onSave={() => loadImages()} />
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
                {/* Content State Management */}
                <ContentStateManager
                  currentState={editingImage.state || 'draft'}
                  onStateChange={(newState) => setEditingImage({ ...editingImage, state: newState })}
                  scheduledDate={editingImage.scheduledDate}
                  onScheduleDateChange={(date) => setEditingImage({ ...editingImage, scheduledDate: date })}
                />

                {/* Content Analytics */}
                {editingImage.id !== Date.now().toString() && (
                  <ContentAnalytics
                    contentId={editingImage.id}
                    contentType="gallery"
                    analytics={{
                      views: Math.floor(Math.random() * 50000),
                      engagement: Math.floor(Math.random() * 100),
                      conversions: Math.floor(Math.random() * 1000),
                      performance: {
                        loadTime: Math.random() * 2,
                        seoScore: Math.floor(Math.random() * 100),
                      },
                    }}
                  />
                )}

                {/* Image Upload Section */}
                <div className="p-6 bg-pitch-black border border-charcoal rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-golden-glow">📸 Image Upload</h3>
                    <div className="text-xs text-foreground/60">
                      Recommended: {IMAGE_SPECS.gallery.width}×{IMAGE_SPECS.gallery.height}px ({IMAGE_SPECS.gallery.format})
                    </div>
                  </div>
                  
                  <ImageDropZone
                    currentImage={editingImage.url}
                    onImageChange={(url) => setEditingImage({ ...editingImage, url })}
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
                    alt={editingImage.title}
                    height="250px"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Title *
                  </label>
                  <InlineEditor
                    value={editingImage.title}
                    onChange={(value) => setEditingImage({ ...editingImage, title: value })}
                    onSave={() => handleSave(editingImage)}
                    placeholder="e.g., Kurkure Momos Close-up"
                    className="w-full"
                  />
                </div>

                {/* Alt Text (SEO) */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Alt Text (SEO) *
                  </label>
                  <InlineEditor
                    value={editingImage.alt}
                    onChange={(value) => setEditingImage({ ...editingImage, alt: value })}
                    onSave={() => handleSave(editingImage)}
                    placeholder="Descriptive text for accessibility and SEO"
                    className="w-full"
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
                  <InlineEditor
                    value={(editingImage.seoTags || []).join(', ')}
                    onChange={(value) => setEditingImage({ 
                      ...editingImage, 
                      seoTags: value.split(',').map(tag => tag.trim()).filter(tag => tag) 
                    })}
                    onSave={() => handleSave(editingImage)}
                    placeholder="momos, food, sherghati, kurkure"
                    className="w-full"
                  />
                  <p className="text-xs text-foreground/50 mt-1">
                    Add keywords for better SEO and searchability
                  </p>
                </div>

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

      {/* Bulk Upload Modal */}
      <AnimatePresence>
        {isBulkUploadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-pitch-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsBulkUploadModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-deep-space border border-charcoal rounded-lg p-8 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold text-premium-orange mb-6">
                📤 Bulk Upload Images
              </h2>

              <div className="space-y-6">
                <div className="p-6 bg-pitch-black border border-charcoal rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-golden-glow">Image Specifications</h3>
                    <div className="text-xs text-foreground/60">
                      {IMAGE_SPECS.gallery.width}×{IMAGE_SPECS.gallery.height}px ({IMAGE_SPECS.gallery.format})
                    </div>
                  </div>
                  <p className="text-sm text-foreground/70">
                    Upload multiple images at once. All images will be added to the selected category.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Category for All Images *
                  </label>
                  <select
                    value={bulkUploadCategory}
                    onChange={(e) => setBulkUploadCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                  >
                    {imageCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <input
                    ref={bulkUploadInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) handleBulkUpload(files);
                    }}
                    className="hidden"
                  />
                  <button
                    onClick={() => bulkUploadInputRef.current?.click()}
                    disabled={uploadingFile}
                    className="w-full px-6 py-4 bg-premium-orange text-pitch-black rounded-lg font-bold text-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
                  >
                    {uploadingFile ? '⏳ Uploading Images...' : '📁 Select Images to Upload'}
                  </button>
                  <p className="text-xs text-foreground/50 mt-2 text-center">
                    You can select multiple images at once
                  </p>
                </div>

                <div className="flex gap-4 pt-6 border-t border-charcoal">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsBulkUploadModalOpen(false)}
                    className="w-full"
                  >
                    Close
                  </Button>
                </div>
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
