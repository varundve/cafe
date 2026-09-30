import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, AlertCircle, Utensils, Bike, Coffee, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { generateCartWhatsAppUrl, CAFE_PHONE } from '../utils/whatsapp';
import { useToast } from '../context/ToastContext';

interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  orderType: 'dine-in' | 'takeaway' | 'delivery';
  address: string;
  landmark: string;
  tableNumber: string;
  orderNotes: string;
}

export const Cart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getCartSubtotal,
    getCartTax,
    getCartTotal,
  } = useCart();

  const { showToast } = useToast();

  const [form, setForm] = useState<CheckoutFormData>({
    fullName: '',
    phone: '',
    email: '',
    orderType: 'dine-in',
    address: '',
    landmark: '',
    tableNumber: '',
    orderNotes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    items: typeof cart;
    subtotal: number;
    tax: number;
    deliveryFee: number;
    total: number;
    form: CheckoutFormData;
  } | null>(null);

  const subtotal = getCartSubtotal();
  const tax = getCartTax();
  const deliveryFee = form.orderType === 'delivery' ? (subtotal >= 500 ? 0 : 40) : 0;
  const finalTotal = subtotal + tax + deliveryFee;

  const freeDeliveryThreshold = 500;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (!form.fullName.trim()) errs.fullName = 'Please enter your name.';
    if (!form.phone.trim()) {
      errs.phone = 'Please enter your phone number.';
    } else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit Indian phone number.';
    }

    if (form.orderType === 'delivery') {
      if (!form.address.trim()) errs.address = 'Please enter delivery address in Kanpur.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!validate()) {
      showToast('Incomplete Form', 'Please review the highlighted order details.', 'error');
      return;
    }

    const orderId = `BB-${Math.floor(2000 + Math.random() * 8000)}`;
    const snapshot = {
      orderId,
      items: [...cart],
      subtotal,
      tax,
      deliveryFee,
      total: finalTotal,
      form: { ...form },
    };

    setCompletedOrder(snapshot);
    clearCart();
    showToast('Order Received', `Order #${orderId} has been submitted.`, 'success');
  };

  const handleSendWhatsAppOrder = () => {
    if (!completedOrder) return;
    const { orderId, items, total, form } = completedOrder;

    let text = `Hi Brew & Bean! I placed an order request on your website:\n`;
    text += `• Order ID: ${orderId}\n`;
    text += `• Customer: ${form.fullName} (${form.phone})\n`;
    text += `• Type: ${form.orderType.toUpperCase()}`;
    if (form.orderType === 'dine-in' && form.tableNumber) {
      text += ` (Table #${form.tableNumber})`;
    }
    if (form.orderType === 'delivery') {
      text += `\n• Address: ${form.address} (Landmark: ${form.landmark || 'N/A'})`;
    }
    text += `\n\nItems:\n`;

    items.forEach((item) => {
      let custom = '';
      if (item.customization) {
        const parts: string[] = [];
        if (item.customization.size) parts.push(item.customization.size);
        if (item.customization.milk) parts.push(item.customization.milk);
        if (item.customization.sweetness) parts.push(item.customization.sweetness);
        if (item.customization.extras && item.customization.extras.length > 0) {
          parts.push(`+ ${item.customization.extras.join(', ')}`);
        }
        if (parts.length > 0) custom = ` (${parts.join(' · ')})`;
      }
      text += `• ${item.quantity} × ${item.product.name}${custom} — ${formatCurrency(item.itemTotal)}\n`;
    });

    if (form.orderNotes) {
      text += `\nNotes: "${form.orderNotes}"\n`;
    }

    text += `\nSubtotal: ${formatCurrency(completedOrder.subtotal)}`;
    text += `\nTax (5%): ${formatCurrency(completedOrder.tax)}`;
    if (completedOrder.deliveryFee > 0) {
      text += `\nDelivery: ${formatCurrency(completedOrder.deliveryFee)}`;
    }
    text += `\n*Total: ${formatCurrency(total)}*`;
    text += `\n\nPlease confirm preparation time and mode of payment (Cash/UPI upon arrival/delivery). Thank you!`;

    const url = `https://wa.me/${CAFE_PHONE}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Order Success View
  if (completedOrder) {
    return (
      <div className="py-12 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-espresso-900 border border-amber-900/40 rounded-2xl p-8 sm:p-14 shadow-luxury space-y-8 animate-fade-in text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-950/80 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-glow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              Order Confirmation
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-cream-50 font-normal">
              Order Request Received!
            </h1>
            <p className="text-sm text-espresso-200 font-light max-w-md mx-auto leading-relaxed">
              Thanks! Your order request <strong className="text-amber-400 font-bold">#{completedOrder.orderId}</strong> has been recorded. Our team will contact you shortly to confirm.
            </p>
            <p className="text-xs text-espresso-400 font-light pt-1">
              (You can instantly send your order breakdown directly to the café via WhatsApp below.)
            </p>
          </div>

          {/* Breakdown summary */}
          <div className="bg-espresso-950 border border-amber-900/30 rounded-xl p-6 text-left space-y-4 text-xs sm:text-sm shadow-subtle">
            <div className="flex justify-between border-b border-espresso-800 pb-2.5">
              <span className="text-espresso-400">Customer Name</span>
              <span className="font-semibold text-cream-100">{completedOrder.form.fullName}</span>
            </div>
            <div className="flex justify-between border-b border-espresso-800 pb-2.5">
              <span className="text-espresso-400">Contact Number</span>
              <span className="font-semibold text-cream-100">{completedOrder.form.phone}</span>
            </div>
            <div className="flex justify-between border-b border-espresso-800 pb-2.5">
              <span className="text-espresso-400">Order Method</span>
              <span className="font-semibold text-amber-400 uppercase">{completedOrder.form.orderType}</span>
            </div>
            {completedOrder.form.orderType === 'delivery' && (
              <div className="border-b border-espresso-800 pb-2.5">
                <span className="text-espresso-400 block">Address:</span>
                <p className="font-medium text-cream-100 mt-0.5">{completedOrder.form.address}</p>
                {completedOrder.form.landmark && (
                  <p className="text-xs text-amber-400/80 mt-0.5">Near: {completedOrder.form.landmark}</p>
                )}
              </div>
            )}

            <div className="pt-2 space-y-2">
              <span className="font-semibold text-amber-400 block text-xs uppercase tracking-wider">
                Ordered Items:
              </span>
              {completedOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between text-xs text-espresso-300">
                  <span>{item.quantity} × {item.product.name}</span>
                  <span className="font-medium text-cream-100">{formatCurrency(item.itemTotal)}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-espresso-800 space-y-2 text-xs text-espresso-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-cream-100">{formatCurrency(completedOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Restaurant GST (5%)</span>
                <span className="text-cream-100">{formatCurrency(completedOrder.tax)}</span>
              </div>
              {completedOrder.deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="text-cream-100">{formatCurrency(completedOrder.deliveryFee)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-serif font-bold text-cream-50 pt-2 border-t border-espresso-800">
                <span>Total Amount</span>
                <span className="text-amber-400">{formatCurrency(completedOrder.total)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleSendWhatsAppOrder}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-all shadow-glow-sm border border-emerald-600/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Order to WhatsApp</span>
            </button>

            <Link
              to="/menu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-espresso-750 text-cream-100 hover:bg-espresso-850 text-sm font-medium rounded-xl transition-colors"
            >
              <span>Back to Menu</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty Cart State
  if (cart.length === 0) {
    return (
      <div className="py-24 max-w-md mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-espresso-900 border border-amber-900/40 flex items-center justify-center mx-auto text-amber-400/60 shadow-subtle">
          <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
        </div>
        <div>
          <h2 className="text-3xl font-serif text-cream-50 font-normal">
            Your table is empty
          </h2>
          <p className="mt-2 text-sm text-espresso-300 font-light leading-relaxed">
            Looks like you haven't added anything yet. Discover our fresh specialty coffees, toasts, and handcrafted pastas.
          </p>
        </div>
        <div className="pt-2">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 text-sm font-bold rounded-xl hover:brightness-110 shadow-glow transition-all"
          >
            <span>Browse Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-espresso-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            Order Review
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-cream-50 font-normal mt-1">
            Your Order & Checkout
          </h1>
        </div>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-espresso-900 border border-amber-900/40 rounded-2xl p-6 sm:p-7 shadow-luxury space-y-6">
            <h2 className="text-base font-serif font-medium text-cream-50 pb-3.5 border-b border-espresso-800 flex items-center justify-between">
              <span>Items in Order ({cart.reduce((sum, i) => sum + i.quantity, 0)})</span>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-espresso-400 hover:text-rose-400 transition-colors font-sans"
              >
                Clear Cart
              </button>
            </h2>

            <div className="divide-y divide-espresso-800 space-y-4">
              {cart.map((item) => {
                const parts: string[] = [];
                if (item.customization?.size) parts.push(item.customization.size);
                if (item.customization?.milk) parts.push(item.customization.milk.split('(')[0].trim());
                if (item.customization?.sweetness) parts.push(item.customization.sweetness);
                if (item.customization?.extras && item.customization.extras.length > 0) {
                  parts.push(item.customization.extras.join(', '));
                }

                return (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-start">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover bg-espresso-950 shrink-0 border border-amber-900/30"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            to={`/menu/${item.product.id}`}
                            className="text-sm sm:text-base font-medium text-cream-100 hover:text-amber-400 transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          {parts.length > 0 && (
                            <p className="text-xs text-amber-400/80 mt-0.5 line-clamp-1">
                              {parts.join(' · ')}
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-espresso-400 hover:text-rose-400 transition-colors p-1"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center border border-espresso-750 rounded-lg bg-espresso-950">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.id)}
                            className="px-2.5 py-1 text-xs text-espresso-300 hover:text-white transition-colors font-medium"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-xs font-bold text-cream-100">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.id)}
                            className="px-2.5 py-1 text-xs text-espresso-300 hover:text-white transition-colors font-medium"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm sm:text-base font-serif font-bold text-amber-400">
                          {formatCurrency(item.itemTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Checkout & Details Form */}
        <div className="lg:col-span-5 space-y-6">
          <form
            onSubmit={handlePlaceOrder}
            className="bg-espresso-900 border border-amber-900/40 rounded-2xl p-6 sm:p-8 shadow-luxury space-y-6"
          >
            <h2 className="text-base font-serif font-medium text-cream-50 pb-3 border-b border-espresso-800">
              Customer & Dining Mode
            </h2>

            {/* Order Type Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2.5">
                Order Type
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'dine-in', label: 'Dine-In', icon: Coffee },
                  { id: 'takeaway', label: 'Takeaway', icon: Utensils },
                  { id: 'delivery', label: 'Delivery', icon: Bike },
                ].map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setForm({ ...form, orderType: type.id as any })}
                      className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border text-xs transition-all ${
                        form.orderType === type.id
                          ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold ring-1 ring-amber-500'
                          : 'border-espresso-750 bg-espresso-950 hover:border-espresso-600 text-espresso-300'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-amber-400" />
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="e.g. Ananya Verma"
                  className={`w-full p-3 bg-espresso-950 border rounded-xl text-xs sm:text-sm text-cream-100 placeholder:text-espresso-500 focus:bg-espresso-950 transition-colors ${
                    errors.fullName ? 'border-rose-500' : 'border-espresso-750 focus:border-amber-400'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1.5">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="10-digit mobile number"
                  className={`w-full p-3 bg-espresso-950 border rounded-xl text-xs sm:text-sm text-cream-100 placeholder:text-espresso-500 focus:bg-espresso-950 transition-colors ${
                    errors.phone ? 'border-rose-500' : 'border-espresso-750 focus:border-amber-400'
                  }`}
                />
                {errors.phone && (
                  <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="ananya@example.com"
                  className="w-full p-3 bg-espresso-950 border border-espresso-750 rounded-xl text-xs sm:text-sm text-cream-100 focus:border-amber-400"
                />
              </div>

              {/* Conditional: Dine-in Table Number */}
              {form.orderType === 'dine-in' && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1.5">
                    Table Number (If currently seated)
                  </label>
                  <input
                    type="text"
                    value={form.tableNumber}
                    onChange={(e) => setForm({ ...form, tableNumber: e.target.value })}
                    placeholder="e.g. Table 4 or Courtyard 2"
                    className="w-full p-3 bg-espresso-950 border border-espresso-750 rounded-xl text-xs sm:text-sm text-cream-100 focus:border-amber-400"
                  />
                </div>
              )}

              {/* Conditional: Delivery Address & Landmark */}
              {form.orderType === 'delivery' && (
                <div className="space-y-3.5 pt-1">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1.5">
                      Delivery Address in Kanpur *
                    </label>
                    <textarea
                      rows={2}
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="House / Flat no., Building, Street name..."
                      className={`w-full p-3 bg-espresso-950 border rounded-xl text-xs sm:text-sm text-cream-100 placeholder:text-espresso-500 focus:bg-espresso-950 transition-colors ${
                        errors.address ? 'border-rose-500' : 'border-espresso-750 focus:border-amber-400'
                      }`}
                    />
                    {errors.address && (
                      <p className="text-xs text-rose-400 mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1.5">
                      Nearby Landmark
                    </label>
                    <input
                      type="text"
                      value={form.landmark}
                      onChange={(e) => setForm({ ...form, landmark: e.target.value })}
                      placeholder="e.g. Near Phool Bagh / Green Park"
                      className="w-full p-3 bg-espresso-950 border border-espresso-750 rounded-xl text-xs sm:text-sm text-cream-100 focus:border-amber-400"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1.5">
                  Special Kitchen Notes
                </label>
                <input
                  type="text"
                  value={form.orderNotes}
                  onChange={(e) => setForm({ ...form, orderNotes: e.target.value })}
                  placeholder="e.g. Extra hot milk, separate sugar on side..."
                  className="w-full p-3 bg-espresso-950 border border-espresso-750 rounded-xl text-xs sm:text-sm text-cream-100 focus:border-amber-400"
                />
              </div>
            </div>

            {/* Bill Summary */}
            <div className="pt-3 border-t border-espresso-800 space-y-2 text-xs sm:text-sm text-espresso-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-cream-100">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-espresso-400">
                <span>Restaurant GST (5%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              {form.orderType === 'delivery' && (
                <div className="flex justify-between text-xs text-espresso-400">
                  <span>Delivery Charge</span>
                  <span className="text-cream-100">
                    {deliveryFee === 0 ? 'FREE (Unlocked above ₹500)' : formatCurrency(deliveryFee)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-lg sm:text-xl font-serif font-bold text-cream-50 pt-2 border-t border-espresso-800">
                <span>Total Due</span>
                <span className="text-amber-400">{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 text-sm font-bold rounded-xl hover:brightness-110 shadow-glow transition-all active:scale-98"
              >
                <span>Place Order Request</span>
                <span>·</span>
                <span>{formatCurrency(finalTotal)}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const url = generateCartWhatsAppUrl(cart, finalTotal, form.fullName || undefined);
                  window.open(url, '_blank', 'noopener,noreferrer');
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors border border-emerald-600/40"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order Instantly on WhatsApp</span>
              </button>
            </div>

            <p className="text-[11px] text-espresso-400 text-center font-light leading-relaxed">
              No online card payment required. Settle bill via UPI or Cash at table or on delivery.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
