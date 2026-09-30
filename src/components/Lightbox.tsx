import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '../types';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}) => {
  const currentImage = images[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery modal"
      className="fixed inset-0 z-50 bg-espresso-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
    >
      {/* Top bar with count & close */}
      <div className="flex items-center justify-between text-cream-200 z-10 w-full max-w-6xl mx-auto">
        <span className="text-xs sm:text-sm font-semibold text-amber-400">
          Photo {currentIndex + 1} of {images.length}
        </span>
        <button
          onClick={onClose}
          className="p-2 text-cream-200 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:ring-2 focus:ring-amber-400"
          aria-label="Close photo view"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-4 overflow-hidden">
        {/* Prev Button */}
        <button
          onClick={onPrev}
          className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-espresso-900/90 text-amber-400 hover:text-espresso-950 hover:bg-amber-400 transition-all border border-amber-500/30 shadow-luxury"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* The Image */}
        <img
          src={currentImage.url}
          alt={currentImage.title}
          className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-luxury transition-all duration-300 border border-amber-900/40"
        />

        {/* Next Button */}
        <button
          onClick={onNext}
          className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-espresso-900/90 text-amber-400 hover:text-espresso-950 hover:bg-amber-400 transition-all border border-amber-500/30 shadow-luxury"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Caption */}
      <div className="max-w-2xl mx-auto text-center text-cream-100 pb-2">
        <h3 className="text-base sm:text-lg font-serif font-medium text-cream-50">{currentImage.title}</h3>
        <p className="text-xs sm:text-sm text-espresso-300 mt-1 font-light">{currentImage.caption}</p>
      </div>
    </div>
  );
};
