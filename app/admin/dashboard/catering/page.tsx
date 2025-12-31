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

interface CateringPackage {
  id: string;
  name: string;
  category: 'wedding' | 'office' | 'birthday' | 'custom';
  badge: string;
  basePrice: number;
  priceNote: string;
  perGuestPrice: number;
  description: string;
  includes: string[];
  guestRange: {
    min: number;
    max: number;
  };
  serviceDuration: string;
  metaInfo: string[];
  isActive: boolean;
  isFeatured: boolean;
  image: string;
  displayOrder: number;
  state?: ContentState;
  scheduledDate?: string;
}

interface CateringBooking {
  id: string;
  clientName: string;
  phone: string;
  email?: string;
  eventType: string;
  guestCount: number;
  eventDate: string;
  eventLocation?: string;
  packageId: string;
  additionalRequirements?: string;
  estimatedCost: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export default function CateringManagementPage() {
  const [activeTab, setActiveTab] = useState<'packages' | 'bookings' | 'settings'>('packages');
  const [packages, setPackages] = useState<CateringPackage[]>([]);
  const [bookings, setBookings] = useState<CateringBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPackage, setEditingPackage] = useState<CateringPackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    loadCateringData();
  }, []);

  const loadCateringData = async () => {
    try {
      const response = await fetch('/api/cms/catering');
      if (response.ok) {
        const data = await response.json();
        setPackages(data.packages || []);
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error('Error loading catering data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePackage = async (packageData: CateringPackage) => {
    try {
      const response = await fetch('/api/cms/catering', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'package', data: packageData }),
      });

      if (response.ok) {
        setSaveMessage('✅ Package saved successfully!');
        loadCateringData();
        setIsModalOpen(false);
        setEditingPackage(null);
      } else {
        setSaveMessage('❌ Failed to save package');
      }
    } catch (error) {
      setSaveMessage('❌ Error saving package');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

    try {
      const response = await fetch(`/api/cms/catering?type=package&id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSaveMessage('✅ Package deleted successfully!');
        loadCateringData();
      } else {
        setSaveMessage('❌ Failed to delete package');
      }
    } catch (error) {
      setSaveMessage('❌ Error deleting package');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const openAddPackageModal = () => {
    setEditingPackage({
      id: Date.now().toString(),
      name: '',
      category: 'wedding',
      badge: '',
      basePrice: 0,
      priceNote: '',
      perGuestPrice: 0,
      description: '',
      includes: [''],
      guestRange: { min: 10, max: 100 },
      serviceDuration: '',
      metaInfo: [''],
      isActive: true,
      isFeatured: false,
      image: '',
      displayOrder: packages.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditPackageModal = (pkg: CateringPackage) => {
    setEditingPackage({ ...pkg });
    setIsModalOpen(true);
  };

  const updateBookingStatus = async (bookingId: string, status: CateringBooking['status']) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    try {
      const response = await fetch('/api/cms/catering', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          type: 'booking', 
          data: { ...booking, status } 
        }),
      });

      if (response.ok) {
        setSaveMessage('✅ Booking status updated!');
        loadCateringData();
      } else {
        setSaveMessage('❌ Failed to update booking');
      }
    } catch (error) {
      setSaveMessage('❌ Error updating booking');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🎊</div>
          <p className="text-golden-glow">Loading catering management...</p>
        </div>
      </div>
    );
  }

  const saveCateringData = async () => {
    await loadCateringData();
  };

  return (
    <div>
      <PublishControls
        pageName="catering"
        onSave={saveCateringData}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-premium-orange mb-2">
              Catering Services Management
            </h1>
            <p className="text-foreground/70">
              Manage catering packages, bookings, and service settings
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-4 mb-8">
          {[
            { id: 'packages', label: 'Packages', icon: '📦' },
            { id: 'bookings', label: 'Bookings', icon: '📅' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-premium-orange text-pitch-black'
                  : 'bg-deep-space text-foreground/70 hover:bg-charcoal'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
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

        {/* Packages Tab */}
        {activeTab === 'packages' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-golden-glow">Catering Packages</h2>
              <Button variant="primary" size="lg" onClick={openAddPackageModal}>
                ➕ Add New Package
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="relative overflow-hidden">
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3 flex gap-2 z-10">
                      {pkg.isActive ? (
                        <span className="px-2 py-1 bg-vegetarian-green text-white text-xs font-bold rounded">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-charcoal text-foreground/60 text-xs font-bold rounded">
                          INACTIVE
                        </span>
                      )}
                      {pkg.isFeatured && (
                        <span className="px-2 py-1 bg-golden-glow text-pitch-black text-xs font-bold rounded">
                          FEATURED
                        </span>
                      )}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 bg-premium-orange text-pitch-black text-sm font-bold rounded">
                        {pkg.badge}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="h-48 bg-charcoal rounded-lg mb-4 flex items-center justify-center overflow-hidden mt-8">
                      <span className="text-6xl">
                        {pkg.category === 'wedding' ? '💒' : 
                         pkg.category === 'office' ? '🏢' : 
                         pkg.category === 'birthday' ? '🎂' : '🎯'}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-xl font-bold text-premium-orange mb-1">
                          {pkg.name}
                        </h3>
                        <p className="text-sm text-foreground/70 line-clamp-2">
                          {pkg.description}
                        </p>
                      </div>

                      {/* Pricing */}
                      <div className="bg-pitch-black p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-foreground/60">Base Price:</span>
                          <span className="text-lg font-bold text-golden-glow">
                            ₹{(pkg.basePrice || 0).toLocaleString()}
                          </span>
                        </div>
                        {(pkg.perGuestPrice || 0) > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-foreground/60">Per Guest:</span>
                            <span className="text-sm font-bold text-golden-glow">
                              ₹{pkg.perGuestPrice || 0}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Guest Range */}
                      <div className="text-xs text-foreground/60">
                        Guests: {(pkg.guestRange?.min || 0)}-{(pkg.guestRange?.max || 0)} | Duration: {pkg.serviceDuration || 'N/A'}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-3 border-t border-charcoal">
                        <button
                          onClick={() => openEditPackageModal(pkg)}
                          className="flex-1 px-4 py-2 bg-premium-orange text-pitch-black rounded-lg text-sm font-bold hover:-translate-y-0.5 transition-all duration-300"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeletePackage(pkg.id)}
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

            {packages.length === 0 && (
              <Card className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-2xl font-bold text-golden-glow mb-2">
                  No Packages Yet
                </h3>
                <p className="text-foreground/70 mb-6">
                  Start by creating your first catering package
                </p>
                <Button variant="primary" size="lg" onClick={openAddPackageModal}>
                  ➕ Add First Package
                </Button>
              </Card>
            )}

            {/* Content Analytics */}
            {packages.length > 0 && (
              <div className="mt-8">
                <ContentAnalytics
                  contentId="catering-packages"
                  contentType="page"
                  analytics={{
                    views: 6200,
                    engagement: 72,
                    conversions: 180,
                    lastUpdated: new Date().toISOString(),
                    performance: {
                      loadTime: 1.1,
                      seoScore: 85,
                    },
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            <h2 className="text-2xl font-bold text-golden-glow mb-6">Catering Bookings</h2>
            
            <div className="space-y-4">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-premium-orange">
                          {booking.clientName}
                        </h3>
                        <p className="text-sm text-foreground/70">
                          {booking.eventType} • {booking.guestCount} guests
                        </p>
                        <p className="text-xs text-foreground/50">
                          {new Date(booking.eventDate).toLocaleDateString()} • {booking.phone}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-golden-glow">
                          ₹{booking.estimatedCost.toLocaleString()}
                        </span>
                        <select
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking.id, e.target.value as any)}
                          className={`px-3 py-1 rounded text-xs font-bold ${
                            booking.status === 'pending' ? 'bg-warm-orange text-white' :
                            booking.status === 'confirmed' ? 'bg-vegetarian-green text-white' :
                            booking.status === 'completed' ? 'bg-golden-glow text-pitch-black' :
                            'bg-charcoal text-foreground/60'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                    
                    {booking.additionalRequirements && (
                      <div className="bg-pitch-black p-3 rounded-lg">
                        <p className="text-xs text-foreground/60 mb-1">Additional Requirements:</p>
                        <p className="text-sm text-foreground/80">{booking.additionalRequirements}</p>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>

            {bookings.length === 0 && (
              <Card className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-2xl font-bold text-golden-glow mb-2">
                  No Bookings Yet
                </h3>
                <p className="text-foreground/70">
                  Catering bookings will appear here when customers submit requests
                </p>
              </Card>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold text-golden-glow mb-6">Catering Settings</h2>
            <Card className="p-6">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⚙️</div>
                <h3 className="text-2xl font-bold text-golden-glow mb-2">
                  Settings Coming Soon
                </h3>
                <p className="text-foreground/70">
                  Catering service settings will be available in the next update
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Visual Design Controls */}
        <VisualDesignPanel pageName="catering" onSave={() => loadCateringData()} />
      </motion.div>

      {/* Package Edit Modal */}
      <AnimatePresence>
        {isModalOpen && editingPackage && (
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
              className="bg-deep-space border border-charcoal rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold text-premium-orange mb-6">
                {editingPackage.id === Date.now().toString() ? 'Add New Package' : 'Edit Package'}
              </h2>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Package Name *
                    </label>
                    <InlineEditor
                      value={editingPackage.name}
                      onChange={(value) => setEditingPackage({ ...editingPackage, name: value })}
                      onSave={() => handleSavePackage(editingPackage)}
                      placeholder="e.g., Premium Wedding Package"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Category *
                    </label>
                    <select
                      value={editingPackage.category}
                      onChange={(e) => setEditingPackage({ ...editingPackage, category: e.target.value as any })}
                      className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                    >
                      <option value="wedding">Wedding</option>
                      <option value="office">Office</option>
                      <option value="birthday">Birthday</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Base Price (₹) *
                    </label>
                    <input
                      type="number"
                      value={editingPackage.basePrice}
                      onChange={(e) => setEditingPackage({ ...editingPackage, basePrice: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                      placeholder="5000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Per Guest Price (₹)
                    </label>
                    <input
                      type="number"
                      value={editingPackage.perGuestPrice}
                      onChange={(e) => setEditingPackage({ ...editingPackage, perGuestPrice: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                      placeholder="50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/80 mb-2">
                      Badge Text
                    </label>
                    <InlineEditor
                      value={editingPackage.badge}
                      onChange={(value) => setEditingPackage({ ...editingPackage, badge: value })}
                      onSave={() => handleSavePackage(editingPackage)}
                      placeholder="Most Popular"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Description
                  </label>
                  <InlineEditor
                    value={editingPackage.description}
                    onChange={(value) => setEditingPackage({ ...editingPackage, description: value })}
                    onSave={() => handleSavePackage(editingPackage)}
                    multiline={true}
                    placeholder="Brief description of the package"
                    className="w-full"
                  />
                </div>

                {/* Package Image */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Package Image
                  </label>
                  <ImageDropZone
                    currentImage={editingPackage.image}
                    onImageChange={(url) => setEditingPackage({ ...editingPackage, image: url })}
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
                    alt={editingPackage.name}
                    height="200px"
                  />
                </div>

                {/* Content State Manager */}
                <div>
                  <ContentStateManager
                    currentState={editingPackage.state || 'published'}
                    onStateChange={(state) => setEditingPackage({ ...editingPackage, state })}
                    scheduledDate={editingPackage.scheduledDate}
                    onScheduleDateChange={(scheduledDate) => setEditingPackage({ ...editingPackage, scheduledDate })}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-charcoal">
                  <Button
                    variant="primary"
                    onClick={() => handleSavePackage(editingPackage)}
                    className="flex-1"
                  >
                    Save Package
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1"
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
