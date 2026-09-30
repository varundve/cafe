import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Clock, ArrowLeft, Check, ShieldAlert, Sparkles, MessageCircle, ShoppingBag, Plus } from 'lucide-react';
import { products } from '../data/products';
import { DietaryBadge } from '../components/DietaryBadge';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { CAFE_PHONE } from '../utils/whatsapp';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="py-24 max-w-xl mx-auto px-4 text-center space-y-5">
        <h2 className="text-3xl font-serif text-cream-50">Dish or Drink Not Found</h2>
        <p className="text-sm text-espresso-300 font-light">
          The menu item you are looking for is currently unavailable or may have changed.
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 text-sm font-bold rounded-xl hover:brightness-110 shadow-glow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Menu</span>
        </Link>
      </div>
    );
  }

  // Customization state
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0].name : ''
  );
  const [selectedMilk, setSelectedMilk] = useState<string>(
    product.milkOptions && product.milkOptions.length > 0 ? product.milkOptions[0] : ''
  );
  const [selectedSweetness, setSelectedSweetness] = useState<string>(
    product.sweetnessOptions && product.sweetnessOptions.length > 0 ? product.sweetnessOptions[0] : ''
  );
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const toggleExtra = (extraName: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraName) ? prev.filter((e) => e !== extraName) : [...prev, extraName]
    );
  };

  // Unit Price Calculation
  let currentUnitPrice = product.price;
  if (selectedSize && product.sizes) {
    const sizeObj = product.sizes.find((s) => s.name === selectedSize);
    if (sizeObj) currentUnitPrice += sizeObj.priceDelta;
  }
  if (selectedMilk) {
    if (selectedMilk.includes('+₹40')) currentUnitPrice += 40;
    else if (selectedMilk.includes('+₹45')) currentUnitPrice += 45;
  }
  if (selectedExtras.length > 0 && product.extras) {
    selectedExtras.forEach((extraName) => {
      const found = product.extras?.find((e) => e.name === extraName);
      if (found) currentUnitPrice += found.price;
    });
  }

  const handleAddToCart = () => {
    const customization = {
      size: selectedSize || undefined,
      milk: selectedMilk || undefined,
      sweetness: selectedSweetness || undefined,
      extras: selectedExtras.length > 0 ? selectedExtras : undefined,
    };
    addToCart(product, quantity, customization);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleDirectWhatsAppOrder = () => {
    const customSummary = [
      selectedSize,
      selectedMilk,
      selectedSweetness,
      selectedExtras.length > 0 ? `+ ${selectedExtras.join(', ')}` : '',
    ]
      .filter(Boolean)
      .join(' · ');

    const msg = `Hi Brew & Bean! I'd like to order:
${quantity} × ${product.name}${customSummary ? ` (${customSummary})` : ''}
Total: ${formatCurrency(currentUnitPrice * quantity)}

Please confirm preparation time.`;

    const url = `https://wa.me/${CAFE_PHONE}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="py-8 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-espresso-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </button>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left: Large Photo & Credentials */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden border border-amber-900/40 shadow-luxury bg-espresso-950">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80';
              }}
            />
            {product.popular && (
              <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-700 text-espresso-950 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-glow-sm">
                Regulars' Pick
              </span>
            )}
          </div>

          <div className="flex items-center gap-3.5 text-xs text-espresso-300 font-light p-4 bg-espresso-900 rounded-xl border border-amber-900/30 shadow-subtle">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              Roasted & prepared fresh to order in our Civil Lines kitchen with authentic culinary practices.
            </span>
          </div>
        </div>

        {/* Right: Information & Customization */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <DietaryBadge
                vegetarian={product.vegetarian}
                eggless={product.eggless}
                spicy={product.spicy}
                size="md"
              />
              <div className="flex items-center gap-1.5 text-xs text-amber-300 bg-espresso-850 px-3 py-1 rounded-full border border-amber-500/30">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold">{product.rating.toFixed(1)}</span>
                <span className="text-espresso-400">({product.reviewsCount || 85} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-cream-50 font-normal">
              {product.name}
            </h1>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-3xl font-serif font-bold text-amber-400">
                {formatCurrency(currentUnitPrice)}
              </span>
              {currentUnitPrice !== product.price && (
                <span className="text-xs text-espresso-400 font-light">
                  (Base: {formatCurrency(product.price)})
                </span>
              )}
            </div>

            <p className="mt-4 text-sm sm:text-base text-espresso-200 leading-relaxed font-light">
              {product.description}
            </p>
          </div>

          {/* Quick info row */}
          <div className="grid grid-cols-2 gap-3 py-3.5 border-y border-espresso-800 text-xs">
            {product.preparationTime && (
              <div className="flex items-center gap-2 text-espresso-300">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Prep Time: <strong className="text-cream-100">{product.preparationTime}</strong></span>
              </div>
            )}
            <div className="flex items-center gap-2 text-espresso-300">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>
                Allergens:{' '}
                <strong className="text-cream-100">
                  {product.allergens && product.allergens.length > 0
                    ? product.allergens.join(', ')
                    : 'None specified'}
                </strong>
              </span>
            </div>
          </div>

          {/* Ingredients list if present */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Key Ingredients:
              </span>
              <p className="text-xs text-espresso-300 font-light">
                {product.ingredients.join(' · ')}
              </p>
            </div>
          )}

          {/* Customization Options */}
          <div className="space-y-5 pt-1">
            {/* Size */}
            {product.sizes && product.sizes.length > 1 && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                  Select Size
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => setSelectedSize(s.name)}
                      className={`flex items-center justify-between p-3 rounded-lg border text-xs sm:text-sm text-left transition-all ${
                        selectedSize === s.name
                          ? 'border-amber-500 bg-amber-500/15 text-amber-300 font-semibold ring-1 ring-amber-500'
                          : 'border-espresso-750 bg-espresso-850 hover:border-espresso-600 text-espresso-200'
                      }`}
                    >
                      <span>{s.name}</span>
                      <span className="text-xs text-amber-400/80">
                        {s.priceDelta > 0 ? `+${formatCurrency(s.priceDelta)}` : 'Standard'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Milk Options */}
            {product.milkOptions && product.milkOptions.length > 0 && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                  Milk Preference
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {product.milkOptions.map((milk) => (
                    <button
                      key={milk}
                      type="button"
                      onClick={() => setSelectedMilk(milk)}
                      className={`flex items-center justify-between p-3 rounded-lg border text-xs sm:text-sm text-left transition-all ${
                        selectedMilk === milk
                          ? 'border-amber-500 bg-amber-500/15 text-amber-300 font-semibold ring-1 ring-amber-500'
                          : 'border-espresso-750 bg-espresso-850 hover:border-espresso-600 text-espresso-200'
                      }`}
                    >
                      <span className="truncate pr-1">{milk}</span>
                      {selectedMilk === milk && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sweetness */}
            {product.sweetnessOptions && product.sweetnessOptions.length > 0 && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                  Sweetness
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {product.sweetnessOptions.map((sw) => (
                    <button
                      key={sw}
                      type="button"
                      onClick={() => setSelectedSweetness(sw)}
                      className={`flex items-center justify-between p-3 rounded-lg border text-xs sm:text-sm text-left transition-all ${
                        selectedSweetness === sw
                          ? 'border-amber-500 bg-amber-500/15 text-amber-300 font-semibold ring-1 ring-amber-500'
                          : 'border-espresso-750 bg-espresso-850 hover:border-espresso-600 text-espresso-200'
                      }`}
                    >
                      <span className="truncate pr-1">{sw}</span>
                      {selectedSweetness === sw && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Extras */}
            {product.extras && product.extras.length > 0 && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                  Add-ons & Extras
                </label>
                <div className="space-y-2">
                  {product.extras.map((extra) => {
                    const isChecked = selectedExtras.includes(extra.name);
                    return (
                      <label
                        key={extra.name}
                        onClick={() => toggleExtra(extra.name)}
                        className={`flex items-center justify-between p-3 rounded-lg border text-xs sm:text-sm cursor-pointer select-none transition-all ${
                          isChecked
                            ? 'border-amber-500 bg-amber-500/15 text-amber-300 font-medium'
                            : 'border-espresso-750 bg-espresso-850 hover:border-espresso-600 text-espresso-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="rounded border-espresso-700 bg-espresso-800 text-amber-500 focus:ring-amber-500 w-4 h-4"
                          />
                          <span>{extra.name}</span>
                        </div>
                        <span className="text-xs font-semibold text-amber-400">
                          +{formatCurrency(extra.price)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Action Row: Quantity + Add to Cart + WhatsApp */}
          <div className="pt-4 space-y-3.5">
            <div className="flex items-center gap-4">
              {/* Quantity */}
              <div className="flex items-center border border-espresso-750 rounded-xl bg-espresso-900">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-espresso-300 hover:text-white transition-colors font-medium"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-3 text-sm font-bold text-cream-50 min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-3 text-espresso-300 hover:text-white transition-colors font-medium"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add To Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold rounded-xl transition-all shadow-glow-sm active:scale-98 ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 hover:brightness-110'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Order</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Order · {formatCurrency(currentUnitPrice * quantity)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct WhatsApp Order */}
            <button
              type="button"
              onClick={handleDirectWhatsAppOrder}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors border border-emerald-600/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order this directly on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-14 border-t border-espresso-800 space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              More From This Section
            </span>
            <h2 className="text-2xl font-serif text-cream-50 mt-1">
              You might also enjoy
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
