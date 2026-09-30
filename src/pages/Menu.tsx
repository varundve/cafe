import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ProductCard } from '../components/ProductCard';
import { QuickCustomizeModal } from '../components/QuickCustomizeModal';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { Product } from '../types';

export const Menu: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterVegetarian, setFilterVegetarian] = useState<boolean>(false);
  const [filterEggless, setFilterEggless] = useState<boolean>(false);
  const [filterSpicy, setFilterSpicy] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);

  // Sync category with URL search param if present
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Search query filter (matches name, description, ingredients)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchIng = p.ingredients?.some((ing) => ing.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchIng) {
            return false;
          }
        }

        // Dietary filters
        if (filterVegetarian && !p.vegetarian) return false;
        if (filterEggless && !p.eggless) return false;
        if (filterSpicy && !p.spicy) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // default 'popular'
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      });
  }, [selectedCategory, searchQuery, filterVegetarian, filterEggless, filterSpicy, sortBy]);

  const activeFiltersCount =
    (filterVegetarian ? 1 : 0) + (filterEggless ? 1 : 0) + (filterSpicy ? 1 : 0);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setFilterVegetarian(false);
    setFilterEggless(false);
    setFilterSpicy(false);
    setSortBy('popular');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  return (
    <div className="py-8 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* 12. Top Title & Subtitle */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
          Fresh Roastery & Kitchen
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif text-cream-50 font-normal mt-2">
          The Café Menu
        </h1>
        <p className="mt-3 text-sm sm:text-base text-espresso-200 font-light leading-relaxed">
          From your first coffee of the morning to your last dessert of the evening. Every cup is extracted to order, every meal crafted with artisanal integrity.
        </p>
      </div>

      {/* 15. Search & Filter Bar */}
      <div className="bg-espresso-900 border border-amber-900/40 rounded-2xl p-5 sm:p-6 shadow-card space-y-5">
        {/* Row 1: Search Bar & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row gap-3.5 items-stretch sm:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by bean roast, pasta, toast, sourdough, ingredients..."
              className="w-full pl-11 pr-10 py-3 bg-espresso-950 border border-espresso-750 rounded-xl text-sm text-cream-100 placeholder:text-espresso-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-espresso-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
            <ArrowUpDown className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-espresso-300 font-medium hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-3 px-4 bg-espresso-950 border border-espresso-750 rounded-xl text-xs sm:text-sm text-cream-100 font-medium focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            >
              <option value="popular">Popular & Regulars’ Pick</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated (Stars)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Category Navigation (Horizontal scrollable pills) */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 pt-1 border-t border-espresso-800">
          <button
            type="button"
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 font-bold shadow-glow-sm'
                : 'bg-espresso-850 text-espresso-300 hover:text-white border border-espresso-750'
            }`}
          >
            All Items ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 font-bold shadow-glow-sm'
                  : 'bg-espresso-850 text-espresso-300 hover:text-white border border-espresso-750'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Row 3: Dietary Checkbox Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-espresso-800 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-5">
            <span className="text-amber-400 font-semibold flex items-center gap-1.5 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Dietary Preference:
            </span>

            {/* Vegetarian Filter */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filterVegetarian}
                onChange={(e) => setFilterVegetarian(e.target.checked)}
                className="rounded border-espresso-700 bg-espresso-800 text-emerald-500 focus:ring-emerald-400"
              />
              <span className="flex items-center gap-1.5 text-cream-100 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                Vegetarian
              </span>
            </label>

            {/* Eggless Filter */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filterEggless}
                onChange={(e) => setFilterEggless(e.target.checked)}
                className="rounded border-espresso-700 bg-espresso-800 text-amber-500 focus:ring-amber-400"
              />
              <span className="font-medium text-amber-300">100% Eggless</span>
            </label>

            {/* Spicy Filter */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filterSpicy}
                onChange={(e) => setFilterSpicy(e.target.checked)}
                className="rounded border-espresso-700 bg-espresso-800 text-rose-500 focus:ring-rose-400"
              />
              <span className="font-medium text-rose-300">Spicy</span>
            </label>
          </div>

          {/* Reset Filters CTA if active */}
          {(activeFiltersCount > 0 || searchQuery || selectedCategory !== 'all') && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-4"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Results Count Header */}
      <div className="flex items-center justify-between text-xs text-espresso-400">
        <span>
          Showing <strong className="text-amber-400 font-bold">{filteredProducts.length}</strong> items
          {selectedCategory !== 'all' && (
            <span> in <strong className="text-cream-100">{categories.find((c) => c.id === selectedCategory)?.name}</strong></span>
          )}
          {searchQuery && (
            <span> matching "<strong className="text-cream-100">{searchQuery}</strong>"</span>
          )}
        </span>
      </div>

      {/* 44. Empty State or Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-espresso-900 border border-amber-900/30 rounded-2xl p-14 text-center max-w-md mx-auto space-y-4 shadow-card">
          <div className="w-16 h-16 rounded-full bg-espresso-850 border border-amber-500/20 flex items-center justify-center mx-auto text-amber-400/60">
            <Search className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-xl font-medium text-cream-50">
            No menu items found
          </h3>
          <p className="text-xs sm:text-sm text-espresso-400 font-light leading-relaxed">
            We couldn't find any dishes matching your current search or dietary filters. Try broadening your criteria.
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 text-xs sm:text-sm font-bold rounded-lg hover:brightness-110 shadow-glow-sm transition-all"
          >
            Show All 32 Menu Items
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickCustomize={(p) => setCustomizingProduct(p)}
            />
          ))}
        </div>
      )}

      {/* Quick Customize Modal */}
      {customizingProduct && (
        <QuickCustomizeModal
          product={customizingProduct}
          onClose={() => setCustomizingProduct(null)}
        />
      )}
    </div>
  );
};
