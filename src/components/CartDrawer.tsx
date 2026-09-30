import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { generateCartWhatsAppUrl } from '../utils/whatsapp';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getCartSubtotal,
    getCartTax,
    getCartTotal,
  } = useCart();

  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const subtotal = getCartSubtotal();
  const tax = getCartTax();
  const total = getCartTotal();

  // Free delivery threshold: ₹500
  const freeDeliveryThreshold = 500;
  const progressPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    navigate('/cart');
  };

  const handleWhatsApp = () => {
    const url = generateCartWhatsAppUrl(cart, total);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="fixed inset-0 bg-espresso-950/80 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-espresso-950 border-l border-amber-900/40 shadow-luxury flex flex-col text-cream-100">
          {/* Header */}
          <div className="p-5 border-b border-espresso-800 flex items-center justify-between bg-espresso-900">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 id="cart-drawer-title" className="text-lg font-serif font-medium text-cream-50">
                Your Café Order
              </h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {cart.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-espresso-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Perk Bar */}
          {cart.length > 0 && (
            <div className="bg-espresso-900/90 border-b border-espresso-800 p-3.5 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  {remainingForFreeDelivery === 0 ? (
                    <span className="text-emerald-400 font-semibold">You unlocked FREE Delivery!</span>
                  ) : (
                    <span>Add {formatCurrency(remainingForFreeDelivery)} more for FREE Delivery</span>
                  )}
                </span>
                <span className="text-espresso-400">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-1.5 bg-espresso-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-5">
                <div className="w-16 h-16 rounded-full bg-espresso-900 border border-amber-900/40 flex items-center justify-center text-amber-400/60">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium text-cream-50">
                    Your table is empty
                  </h3>
                  <p className="text-xs sm:text-sm text-espresso-400 mt-1.5 max-w-xs leading-relaxed font-light">
                    Looks like you haven't added anything yet. Start with our freshly pulled espresso or artisan bakes.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/menu');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 text-xs sm:text-sm font-bold rounded-lg hover:brightness-110 shadow-glow-sm transition-all"
                >
                  <span>Browse Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="divide-y divide-espresso-800 space-y-4">
                {cart.map((item) => {
                  const customParts: string[] = [];
                  if (item.customization?.size) customParts.push(item.customization.size);
                  if (item.customization?.milk) customParts.push(item.customization.milk.split('(')[0].trim());
                  if (item.customization?.sweetness) customParts.push(item.customization.sweetness);
                  if (item.customization?.extras && item.customization.extras.length > 0) {
                    customParts.push(item.customization.extras.join(', '));
                  }

                  return (
                    <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5 items-start">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-cover bg-espresso-900 shrink-0 border border-amber-900/30"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/menu/${item.product.id}`}
                            onClick={() => setIsCartDrawerOpen(false)}
                            className="text-sm font-medium text-cream-100 hover:text-amber-400 transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-espresso-400 hover:text-rose-400 transition-colors p-0.5"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {customParts.length > 0 && (
                          <p className="text-[11px] text-amber-400/80 mt-0.5 line-clamp-1">
                            {customParts.join(' · ')}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-2.5">
                          <div className="flex items-center border border-espresso-750 rounded-lg bg-espresso-900">
                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item.id)}
                              className="px-2 py-0.5 text-xs text-espresso-300 hover:text-white transition-colors"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="px-2.5 py-0.5 text-xs font-bold text-cream-100">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.id)}
                              className="px-2 py-0.5 text-xs text-espresso-300 hover:text-white transition-colors"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs sm:text-sm font-serif font-bold text-amber-400">
                            {formatCurrency(item.itemTotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-espresso-800 bg-espresso-900 space-y-4">
              <div className="space-y-1.5 text-xs sm:text-sm text-espresso-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-cream-100">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-espresso-400">
                  <span>Restaurant GST (5%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-cream-50 pt-2 border-t border-espresso-800">
                  <span>Total Amount</span>
                  <span className="text-amber-400">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 text-sm font-bold rounded-lg hover:brightness-110 shadow-glow-sm transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors border border-emerald-600/40"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>

              <p className="text-[11px] text-espresso-400 text-center font-light">
                Freshly prepared upon confirmation · Pay with UPI/Cash
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
