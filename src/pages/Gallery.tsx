import React, { useState, useMemo } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { Lightbox } from '../components/Lightbox';
import { galleryImages } from '../data/gallery';
import { GalleryImage } from '../types';
import { Eye } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'interior', label: 'Café Interior' },
    { id: 'coffee', label: 'Coffee Ritual' },
    { id: 'food', label: 'Fresh Kitchen' },
    { id: 'desserts', label: 'Daily Bakes' },
    { id: 'people', label: 'People' },
    { id: 'events', label: 'Events & Music' },
  ];

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'all') return galleryImages;
    return galleryImages.filter((img) => img.category === selectedCategory);
  }, [selectedCategory]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev === 0 ? filteredImages.length - 1 : (prev as number) - 1
      );
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev === filteredImages.length - 1 ? 0 : (prev as number) + 1
      );
    }
  };

  return (
    <div className="py-8 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
          Visual Atmosphere
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif text-cream-50 font-normal mt-2">
          Moments at Brew & Bean
        </h1>
        <p className="mt-3 text-sm sm:text-base text-espresso-200 font-light leading-relaxed">
          Glimpses of sun-drenched tables, freshly pulled crema, warm pastries, and quiet neighborhood gatherings.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-2.5 overflow-x-auto hide-scrollbar pb-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 shadow-glow-sm'
                : 'bg-espresso-850 text-espresso-300 hover:text-white border border-espresso-750'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            onClick={() => openLightbox(index)}
            className="group relative rounded-2xl overflow-hidden border border-amber-900/30 bg-espresso-900 cursor-pointer shadow-card hover:border-amber-500/50 hover:shadow-luxury transition-all duration-300"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
            </div>

            {/* Hover Caption Overlay */}
            <div className="absolute inset-0 bg-espresso-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-cream-50 backdrop-blur-2xs">
              <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400 font-bold mb-1">
                {image.category}
              </span>
              <h3 className="font-serif text-lg font-medium text-cream-50">
                {image.title}
              </h3>
              <p className="text-xs text-espresso-300 font-light line-clamp-2 mt-1">
                {image.caption}
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                <Eye className="w-4 h-4" />
                <span>Click to view full photo</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Component */}
      <Lightbox
        images={filteredImages}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};
