import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Product, CartCustomization } from '../types';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';
import { DietaryBadge } from './DietaryBadge';

interface QuickCustomizeModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickCustomizeModal: React.FC<QuickCustomizeModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

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

  const toggleExtra = (extraName: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraName) ? prev.filter((e) => e !== extraName) : [...prev, extraName]
    );
  };

  // Calculate current unit price
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

  const handleAdd = () => {
    const customization: CartCustomization = {
      size: selectedSize || undefined,
      milk: selectedMilk || undefined,
      sweetness: selectedSweetness || undefined,
      extras: selectedExtras.length > 0 ? selectedExtras : undefined,
    };
    addToCart(product, quantity, customization);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-espresso-950/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div className="relative bg-espresso-900 w-full max-w-lg rounded-2xl shadow-luxury border border-amber-900/40 overflow-hidden animate-fade-in max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-espresso-800 bg-espresso-850">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <DietaryBadge
                vegetarian={product.vegetarian}
                eggless={product.eggless}
                spicy={product.spicy}
                size="sm"
              />
              <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400 font-bold">
                Customise Your Order
              </span>
            </div>
            <h3 id="modal-title" className="text-xl font-serif text-cream-50">
              {product.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-espresso-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-sm text-espresso-200">
          {/* Size Choice */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2.5">
                Choose Size
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    type="button"
                    onClick={() => setSelectedSize(size.name)}
                    className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                      selectedSize === size.name
                        ? 'border-amber-500 bg-amber-500/15 text-amber-300 font-semibold ring-1 ring-amber-500'
                        : 'border-espresso-750 bg-espresso-850 hover:border-espresso-600 text-espresso-200'
                    }`}
                  >
                    <span>{size.name}</span>
                    <span className="text-xs text-amber-400/80">
                      {size.priceDelta > 0 ? `+${formatCurrency(size.priceDelta)}` : 'Standard'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Milk Choice */}
          {product.milkOptions && product.milkOptions.length > 0 && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2.5">
                Milk Selection
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {product.milkOptions.map((milk) => (
                  <button
                    key={milk}
                    type="button"
                    onClick={() => setSelectedMilk(milk)}
                    className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
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

          {/* Sweetness Choice */}
          {product.sweetnessOptions && product.sweetnessOptions.length > 0 && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2.5">
                Sweetness Level
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {product.sweetnessOptions.map((sweetness) => (
                  <button
                    key={sweetness}
                    type="button"
                    onClick={() => setSelectedSweetness(sweetness)}
                    className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                      selectedSweetness === sweetness
                        ? 'border-amber-500 bg-amber-500/15 text-amber-300 font-semibold ring-1 ring-amber-500'
                        : 'border-espresso-750 bg-espresso-850 hover:border-espresso-600 text-espresso-200'
                    }`}
                  >
                    <span className="truncate pr-1">{sweetness}</span>
                    {selectedSweetness === sweetness && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extras */}
          {product.extras && product.extras.length > 0 && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2.5">
                Add-ons & Flavor Enhancers
              </label>
              <div className="space-y-2">
                {product.extras.map((extra) => {
                  const isChecked = selectedExtras.includes(extra.name);
                  return (
                    <label
                      key={extra.name}
                      onClick={() => toggleExtra(extra.name)}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer select-none transition-all ${
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
                          className="rounded border-espresso-700 text-amber-500 focus:ring-amber-500 bg-espresso-800 w-4 h-4"
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

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-espresso-800 bg-espresso-850 flex items-center justify-between gap-4">
          <div className="flex items-center border border-espresso-750 rounded-lg bg-espresso-900">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1.5 text-espresso-300 hover:text-white transition-colors font-medium"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-3 py-1.5 text-sm font-bold text-cream-50 min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1.5 text-espresso-300 hover:text-white transition-colors font-medium"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 font-bold rounded-lg hover:brightness-110 shadow-glow-sm transition-all"
          >
            <span>Add to Order</span>
            <span>·</span>
            <span>{formatCurrency(currentUnitPrice * quantity)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
