'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { menuItems, categories } from '@/data/menu';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 250]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (selectedType !== 'all' && item.type !== selectedType) return false;
      if (selectedSpiceLevel !== 'all' && item.spiceLevel !== selectedSpiceLevel) return false;
      if (item.price < priceRange[0] || item.price > priceRange[1]) return false;
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !item.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (showPopularOnly && !item.popular) return false;
      if (showNewOnly && !item.new) return false;
      return true;
    });
  }, [selectedCategory, selectedType, selectedSpiceLevel, priceRange, searchQuery, showPopularOnly, showNewOnly]);

  const handleFilterChange = (callback: () => void) => {
    setIsLoading(true);
    callback();
    setTimeout(() => setIsLoading(false), 300);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedSpiceLevel('all');
    setPriceRange([0, 250]);
    setSearchQuery('');
    setShowPopularOnly(false);
    setShowNewOnly(false);
  };

  return (
    <div className="min-h-screen bg-pitch-black py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-premium-orange mb-4">
            Our Complete Menu
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Explore our full range of delicious momos - from traditional to innovative fusion
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-golden-glow">Filter Menu</h3>
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Reset All
              </Button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground/80 mb-3">Search</p>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-deep-space text-foreground rounded-xl border-2 border-charcoal focus:border-premium-orange focus:shadow-[0_0_20px_rgba(255,194,65,0.2)] focus:outline-none transition-all duration-300"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50">
                  🔍
                </span>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground/80 mb-3">Category</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleFilterChange(() => setSelectedCategory('all'))}
                  className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                    selectedCategory === 'all'
                      ? 'bg-premium-orange text-pitch-black shadow-[0_10px_25px_rgba(255,194,65,0.3)]'
                      : 'bg-transparent text-foreground/70 border-2 border-premium-orange/30 hover:border-premium-orange hover:-translate-y-0.5'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleFilterChange(() => setSelectedCategory(cat.id))}
                    className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                      selectedCategory === cat.id
                        ? 'bg-premium-orange text-pitch-black shadow-[0_10px_25px_rgba(255,194,65,0.3)]'
                        : 'bg-transparent text-foreground/70 border-2 border-premium-orange/30 hover:border-premium-orange hover:-translate-y-0.5'
                    }`}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Spice Level Filter */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground/80 mb-3">Spice Level</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleFilterChange(() => setSelectedSpiceLevel('all'))}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedSpiceLevel === 'all'
                      ? 'bg-vegetarian-green text-pitch-black'
                      : 'bg-deep-space text-foreground/70 hover:bg-charcoal'
                  }`}
                >
                  All Levels
                </button>
                <button
                  onClick={() => handleFilterChange(() => setSelectedSpiceLevel('mild'))}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedSpiceLevel === 'mild'
                      ? 'bg-vegetarian-green text-pitch-black'
                      : 'bg-deep-space text-foreground/70 hover:bg-charcoal'
                  }`}
                >
                  😊 Mild
                </button>
                <button
                  onClick={() => handleFilterChange(() => setSelectedSpiceLevel('medium'))}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedSpiceLevel === 'medium'
                      ? 'bg-vegetarian-green text-pitch-black'
                      : 'bg-deep-space text-foreground/70 hover:bg-charcoal'
                  }`}
                >
                  🌶️ Medium
                </button>
                <button
                  onClick={() => handleFilterChange(() => setSelectedSpiceLevel('hot'))}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedSpiceLevel === 'hot'
                      ? 'bg-vegetarian-green text-pitch-black'
                      : 'bg-deep-space text-foreground/70 hover:bg-charcoal'
                  }`}
                >
                  🔥 Hot
                </button>
                <button
                  onClick={() => handleFilterChange(() => setSelectedSpiceLevel('extra-magic'))}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedSpiceLevel === 'extra-magic'
                      ? 'bg-vegetarian-green text-pitch-black'
                      : 'bg-deep-space text-foreground/70 hover:bg-charcoal'
                  }`}
                >
                  ✨ Extra Magic
                </button>
              </div>
            </div>

            {/* Price Range Slider - Single Continuous Slider */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground/80 mb-3">
                Maximum Price: ₹{priceRange[1]}{priceRange[1] === 250 ? '+' : ''}
              </p>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="250"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full h-3 bg-deep-space rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-premium-orange [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,194,65,0.5)] [&::-webkit-slider-thumb]:hover:shadow-[0_0_15px_rgba(255,194,65,0.8)] [&::-webkit-slider-thumb]:transition-all [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-premium-orange [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #ffc241 0%, #ffc241 ${(priceRange[1] / 250) * 100}%, #0a0a0a ${(priceRange[1] / 250) * 100}%, #0a0a0a 100%)`
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-foreground/50 mt-2">
                <span>₹0</span>
                <span>₹50</span>
                <span>₹100</span>
                <span>₹150</span>
                <span>₹200</span>
                <span>₹250+</span>
              </div>
            </div>

            {/* Type Filter */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground/80 mb-3">Filling Type</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleFilterChange(() => setSelectedType('all'))}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedType === 'all'
                      ? 'bg-golden-glow text-pitch-black'
                      : 'bg-deep-space text-foreground/70 hover:bg-charcoal'
                  }`}
                >
                  All Types
                </button>
                <button
                  onClick={() => handleFilterChange(() => setSelectedType('veg'))}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedType === 'veg'
                      ? 'bg-golden-glow text-pitch-black'
                      : 'bg-deep-space text-foreground/70 hover:bg-charcoal'
                  }`}
                >
                  🌱 Veg
                </button>
                <button
                  onClick={() => handleFilterChange(() => setSelectedType('paneer'))}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedType === 'paneer'
                      ? 'bg-golden-glow text-pitch-black'
                      : 'bg-deep-space text-foreground/70 hover:bg-charcoal'
                  }`}
                >
                  🧀 Paneer
                </button>
                <button
                  onClick={() => handleFilterChange(() => setSelectedType('soya'))}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedType === 'soya'
                      ? 'bg-golden-glow text-pitch-black'
                      : 'bg-deep-space text-foreground/70 hover:bg-charcoal'
                  }`}
                >
                  💪 Soya
                </button>
                <button
                  onClick={() => handleFilterChange(() => setSelectedType('cheese-corn'))}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedType === 'cheese-corn'
                      ? 'bg-golden-glow text-pitch-black'
                      : 'bg-deep-space text-foreground/70 hover:bg-charcoal'
                  }`}
                >
                  🌽 Cheese Corn
                </button>
              </div>
            </div>

            {/* Special Filters */}
            <div>
              <p className="text-sm font-semibold text-foreground/80 mb-3">Special</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleFilterChange(() => {
                    setShowPopularOnly(!showPopularOnly);
                    setShowNewOnly(false);
                  })}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    showPopularOnly
                      ? 'bg-warm-orange text-pitch-black'
                      : 'bg-deep-space text-foreground/70 hover:bg-charcoal'
                  }`}
                >
                  ⭐ Popular Only
                </button>
                <button
                  onClick={() => handleFilterChange(() => {
                    setShowNewOnly(!showNewOnly);
                    setShowPopularOnly(false);
                  })}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    showNewOnly
                      ? 'bg-vegetarian-green text-pitch-black'
                      : 'bg-deep-space text-foreground/70 hover:bg-charcoal'
                  }`}
                >
                  ✨ New Items
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-charcoal flex items-center justify-between">
              <p className="text-sm text-foreground/60">
                Showing {filteredItems.length} of {menuItems.length} items
              </p>
              {isLoading && (
                <div className="flex items-center gap-2 text-sm text-premium-orange">
                  <div className="w-4 h-4 border-2 border-premium-orange border-t-transparent rounded-full animate-spin" />
                  Filtering...
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${selectedCategory}-${selectedType}-${selectedSpiceLevel}-${priceRange.join('-')}-${searchQuery}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full flex flex-col group cursor-pointer">
                  {/* Image Placeholder with Loading State */}
                  <div className="bg-charcoal rounded-lg mb-4 aspect-video flex items-center justify-center overflow-hidden relative">
                    <div className="text-6xl group-hover:scale-110 transition-transform duration-300">🥟</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-pitch-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Badges */}
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {item.popular && (
                      <motion.span 
                        className="px-2 py-1 bg-warm-orange/20 text-warm-orange text-xs font-semibold rounded"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.05 + 0.2 }}
                      >
                        ⭐ Popular
                      </motion.span>
                    )}
                    {item.new && (
                      <motion.span 
                        className="px-2 py-1 bg-vegetarian-green/20 text-vegetarian-green text-xs font-semibold rounded"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.05 + 0.25 }}
                      >
                        ✨ New
                      </motion.span>
                    )}
                    {item.spicy && item.spiceLevel && (
                      <motion.span 
                        className="px-2 py-1 bg-premium-orange/20 text-premium-orange text-xs font-semibold rounded"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.05 + 0.3 }}
                      >
                        🌶️ {item.spiceLevel === 'extra-magic' ? 'Extra Magic' : item.spiceLevel.charAt(0).toUpperCase() + item.spiceLevel.slice(1)}
                      </motion.span>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-golden-glow mb-2 group-hover:text-premium-orange transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-4 flex-grow">{item.description}</p>

                  {/* Price & Order */}
                  <div className="flex items-center justify-between pt-4 border-t border-charcoal">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <p className="text-xl font-bold text-golden-glow">₹{item.halfPrice}</p>
                        <span className="text-xs text-foreground/50">(5pc)</span>
                        <span className="text-foreground/30">|</span>
                        <p className="text-xl font-bold text-golden-glow">₹{item.price}</p>
                        <span className="text-xs text-foreground/50">(10pc)</span>
                      </div>
                      <p className="text-xs text-foreground/50 mt-1">Half | Full Plate</p>
                    </div>
                    <Button variant="primary" size="sm">
                      Order Now
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p 
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔍
            </motion.p>
            <h3 className="text-2xl font-bold text-golden-glow mb-2">No items found</h3>
            <p className="text-foreground/70 mb-6">Try adjusting your filters or search query</p>
            <Button
              variant="primary"
              onClick={resetFilters}
            >
              Reset All Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
