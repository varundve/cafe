import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { DietaryBadge } from './DietaryBadge';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickCustomize?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickCustomize }) => {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.image);

  const hasCustomizations =
    (product.sizes && product.sizes.length > 1) ||
    (product.milkOptions && product.milkOptions.length > 0) ||
    (product.extras && product.extras.length > 0);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (hasCustomizations && onQuickCustomize) {
      onQuickCustomize(product);
      return;
    }

    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="group flex flex-col bg-espresso-850 border border-amber-900/30 hover:border-amber-500/50 rounded-xl transition-all duration-300 hover:shadow-card overflow-hidden hover:-translate-y-1">
      {/* Image Container */}
      <Link
        to={`/menu/${product.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-espresso-950 focus:outline-none"
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={imgSrc}
          alt={product.name}
          loading="lazy"
          onError={() =>
            setImgSrc('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80')
          }
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Ambient Dark Gradient on Image bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-transparent to-transparent opacity-60" />

        {/* Rating overlay badge */}
        <div className="absolute top-3 right-3 bg-espresso-950/85 backdrop-blur-xs text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-subtle">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span>{product.rating.toFixed(1)}</span>
        </div>

        {product.popular && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-700 text-espresso-950 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-glow-sm">
            House Favourite
          </div>
        )}
      </Link>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Dietary badge & prep time */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <DietaryBadge
              vegetarian={product.vegetarian}
              eggless={product.eggless}
              spicy={product.spicy}
              size="sm"
            />
            {product.preparationTime && (
              <span className="text-[11px] text-espresso-400 font-light">
                {product.preparationTime}
              </span>
            )}
          </div>

          {/* Product Name */}
          <Link
            to={`/menu/${product.id}`}
            className="block text-base sm:text-lg font-serif font-medium text-cream-50 group-hover:text-amber-400 transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Description */}
          <p className="mt-1.5 text-xs sm:text-sm text-espresso-300 line-clamp-2 leading-relaxed font-light">
            {product.description}
          </p>
        </div>

        {/* Footer: Price & CTA */}
        <div className="pt-3 border-t border-espresso-750 flex items-center justify-between gap-3">
          <div>
            <span className="text-base sm:text-lg font-serif font-bold text-amber-400">
              {formatCurrency(product.price)}
            </span>
            {hasCustomizations && (
              <span className="block text-[10px] text-espresso-400">Customizable</span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to order`}
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ${
              justAdded
                ? 'bg-emerald-600 text-white shadow-glow-sm'
                : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-espresso-950 border border-amber-500/40 active:scale-95'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>{hasCustomizations ? 'Customize' : 'Add'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
