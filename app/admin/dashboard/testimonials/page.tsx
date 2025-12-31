'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ImageDropZone } from '@/components/cms/ImageDropZone';
import { ContentAnalytics } from '@/components/cms/ContentAnalytics';
import { ContentStateManager, ContentState } from '@/components/cms/ContentStateManager';
import { InlineEditor } from '@/components/cms/InlineEditor';
import { PublishControls } from '@/components/cms/PublishControls';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  image: string;
  date: string;
  featured: boolean;
  state?: ContentState;
  scheduledDate?: string;
}

export default function TestimonialsManagementPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const response = await fetch('/api/cms/testimonials');
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data.testimonials || []);
      }
    } catch (error) {
      console.error('Error loading testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (testimonial: Testimonial) => {
    try {
      const response = await fetch('/api/cms/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testimonial }),
      });

      if (response.ok) {
        setSaveMessage('✅ Testimonial saved successfully!');
        loadTestimonials();
        setIsModalOpen(false);
        setEditingTestimonial(null);
      } else {
        setSaveMessage('❌ Failed to save testimonial');
      }
    } catch (error) {
      setSaveMessage('❌ Error saving testimonial');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const response = await fetch(`/api/cms/testimonials?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSaveMessage('✅ Testimonial deleted successfully!');
        loadTestimonials();
      } else {
        setSaveMessage('❌ Failed to delete testimonial');
      }
    } catch (error) {
      setSaveMessage('❌ Error deleting testimonial');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const openAddModal = () => {
    setEditingTestimonial({
      id: Date.now().toString(),
      name: '',
      role: 'Customer',
      rating: 5,
      text: '',
      image: '',
      date: new Date().toISOString().split('T')[0],
      featured: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (testimonial: Testimonial) => {
    setEditingTestimonial({ ...testimonial });
    setIsModalOpen(true);
  };

  const saveTestimonialsData = async () => {
    await loadTestimonials();
  };

  if (isLoading) {
  return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">⭐</div>
          <p className="text-golden-glow">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PublishControls
        pageName="testimonials"
        onSave={saveTestimonialsData}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-premium-orange mb-2">
              Testimonials Management
            </h1>
            <p className="text-foreground/70">
              Manage customer reviews and testimonials
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={openAddModal}
          >
            ➕ Add New Testimonial
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden">
                {/* Featured Badge */}
                {testimonial.featured && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2 py-1 bg-golden-glow text-pitch-black text-xs font-bold rounded">
                      FEATURED
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="space-y-4">
                  {/* Customer Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-charcoal flex items-center justify-center overflow-hidden">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl">👤</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-premium-orange">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-foreground/60">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < testimonial.rating ? 'text-golden-glow' : 'text-charcoal'
                        }`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-foreground/80 line-clamp-4">
                    "{testimonial.text}"
                  </p>

                  {/* Date */}
                  <p className="text-xs text-foreground/50">
                    {new Date(testimonial.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t border-charcoal">
                    <button
                      onClick={() => openEditModal(testimonial)}
                      className="flex-1 px-4 py-2 bg-premium-orange text-pitch-black rounded-lg text-sm font-bold hover:-translate-y-0.5 transition-all duration-300"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
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

        {testimonials.length === 0 && (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold text-golden-glow mb-2">
              No Testimonials Yet
            </h3>
            <p className="text-foreground/70 mb-6">
              Start by adding your first customer testimonial
            </p>
            <Button variant="primary" size="lg" onClick={openAddModal}>
              ➕ Add First Testimonial
            </Button>
          </Card>
        )}
      </motion.div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && editingTestimonial && (
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
                {editingTestimonial.id === Date.now().toString() ? 'Add New Testimonial' : 'Edit Testimonial'}
              </h2>

              <div className="space-y-6">
                {/* Content State Management */}
                <ContentStateManager
                  currentState={editingTestimonial.state || 'draft'}
                  onStateChange={(newState) => setEditingTestimonial({ ...editingTestimonial, state: newState })}
                  scheduledDate={editingTestimonial.scheduledDate}
                  onScheduleDateChange={(date) => setEditingTestimonial({ ...editingTestimonial, scheduledDate: date })}
                />

                {/* Content Analytics */}
                {editingTestimonial.id !== Date.now().toString() && (
                  <ContentAnalytics
                    contentId={editingTestimonial.id}
                    contentType="testimonial"
                    analytics={{
                      views: Math.floor(Math.random() * 5000),
                      engagement: Math.floor(Math.random() * 100),
                      conversions: Math.floor(Math.random() * 200),
                      performance: {
                        loadTime: Math.random() * 2,
                        seoScore: Math.floor(Math.random() * 100),
                      },
                    }}
                  />
                )}

                {/* Customer Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Customer Name *
                  </label>
                  <InlineEditor
                    value={editingTestimonial.name}
                    onChange={(value) => setEditingTestimonial({ ...editingTestimonial, name: value })}
                    onSave={() => handleSave(editingTestimonial)}
                    placeholder="e.g., Rohan Kumar"
                    className="w-full"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Role/Title
                  </label>
                  <InlineEditor
                    value={editingTestimonial.role}
                    onChange={(value) => setEditingTestimonial({ ...editingTestimonial, role: value })}
                    onSave={() => handleSave(editingTestimonial)}
                    placeholder="e.g., Regular Customer, Food Blogger"
                    className="w-full"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Rating (1-5 stars) *
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setEditingTestimonial({ ...editingTestimonial, rating: star })}
                        className={`text-3xl transition-all ${
                          star <= editingTestimonial.rating
                            ? 'text-golden-glow scale-110'
                            : 'text-charcoal hover:text-golden-glow/50'
                        }`}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Review Text *
                  </label>
                  <InlineEditor
                    value={editingTestimonial.text}
                    onChange={(value) => setEditingTestimonial({ ...editingTestimonial, text: value })}
                    onSave={() => handleSave(editingTestimonial)}
                    multiline={true}
                    placeholder="Customer's review or testimonial..."
                    className="w-full"
                  />
                </div>

                {/* Customer Image */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Customer Photo (optional)
                  </label>
                  <ImageDropZone
                    currentImage={editingTestimonial.image}
                    onImageChange={(url) => setEditingTestimonial({ ...editingTestimonial, image: url })}
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
                    alt={editingTestimonial.name}
                    height="150px"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/80 mb-2">
                    Review Date
                  </label>
                  <input
                    type="date"
                    value={editingTestimonial.date}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, date: e.target.value })}
                    className="w-full px-4 py-3 bg-pitch-black border border-charcoal rounded-lg text-foreground focus:outline-none focus:border-golden-glow transition-colors"
                  />
                </div>

                {/* Featured */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingTestimonial.featured}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, featured: e.target.checked })}
                      className="w-5 h-5 rounded border-charcoal bg-pitch-black checked:bg-golden-glow"
                    />
                    <span className="text-sm text-foreground/80">
                      Mark as Featured (will be highlighted on homepage)
                    </span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-charcoal">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => handleSave(editingTestimonial)}
                    className="flex-1"
                  >
                    💾 Save Testimonial
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
