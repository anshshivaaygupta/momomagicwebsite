'use client';

import React, { useState } from 'react';
import { GalleryHero } from '@/components/gallery/GalleryHero';
import { FilterTabs } from '@/components/gallery/FilterTabs';
import { MasonryGrid } from '@/components/gallery/MasonryGrid';
import { Lightbox } from '@/components/gallery/Lightbox';
import { SocialShare } from '@/components/gallery/SocialShare';
import { GalleryCTA } from '@/components/gallery/GalleryCTA';
import {
  galleryItems,
  galleryCategories,
  getGalleryItemsByCategory,
  updateCategoryItemCounts,
  GalleryItem,
} from '@/data/gallery';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [shareItem, setShareItem] = useState<GalleryItem | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const categories = updateCategoryItemCounts();
  const filteredItems = getGalleryItemsByCategory(activeCategory);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleViewItem = (item: GalleryItem) => {
    setLightboxItem(item);
    setIsLightboxOpen(true);
  };

  const handleShareItem = (item: GalleryItem) => {
    setShareItem(item);
    setIsShareOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleCloseShare = () => {
    setIsShareOpen(false);
  };

  const handlePreviousItem = () => {
    if (!lightboxItem) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === lightboxItem.id);
    if (currentIndex > 0) {
      setLightboxItem(filteredItems[currentIndex - 1]);
    }
  };

  const handleNextItem = () => {
    if (!lightboxItem) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === lightboxItem.id);
    if (currentIndex < filteredItems.length - 1) {
      setLightboxItem(filteredItems[currentIndex + 1]);
    }
  };

  const handleDownloadItem = (item: GalleryItem) => {
    alert(`Downloading: ${item.title}\nFile: ${item.fileUrl}`);
  };

  const currentIndex = lightboxItem
    ? filteredItems.findIndex((item) => item.id === lightboxItem.id)
    : 0;

  return (
    <div className="min-h-screen bg-pitch-black">
      {/* Hero Section */}
      <GalleryHero />

      {/* Filter Tabs */}
      <FilterTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Masonry Grid */}
      <MasonryGrid items={filteredItems} onView={handleViewItem} onShare={handleShareItem} />

      {/* Social Proof CTA */}
      <GalleryCTA />

      {/* Lightbox */}
      <Lightbox
        item={lightboxItem}
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
        onPrevious={handlePreviousItem}
        onNext={handleNextItem}
        currentIndex={currentIndex}
        totalItems={filteredItems.length}
        onShare={handleShareItem}
        onDownload={handleDownloadItem}
      />

      {/* Social Share Modal */}
      {shareItem && (
        <SocialShare item={shareItem} isOpen={isShareOpen} onClose={handleCloseShare} />
      )}
    </div>
  );
}
