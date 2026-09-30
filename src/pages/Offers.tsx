import React from 'react';
import { Clock, Calendar, Check, ArrowRight, MessageCircle, Sparkles, Tag } from 'lucide-react';
import { offers } from '../data/offers';
import { formatCurrency } from '../utils/formatCurrency';
import { CAFE_PHONE } from '../utils/whatsapp';
import { useToast } from '../context/ToastContext';

export const Offers: React.FC = () => {
  const { showToast } = useToast();

  const handleOrderWhatsApp = (offerTitle: string, price: number) => {
    const text = `Hi Brew & Bean! I'd like to avail the special offer:
• ${offerTitle} — ${formatCurrency(price)}

Please confirm timing and availability for today!`;
    const url = `https://wa.me/${CAFE_PHONE}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleClaimNotice = (offerTitle: string) => {
    showToast(
      'Special Offer Selected',
      `Mention "${offerTitle}" to your barista or order directly on WhatsApp.`,
      'info'
    );
  };

  return (
    <div className="py-8 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
          Limited & Daily Perks
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif text-cream-50 font-normal mt-2">
          Café Combos & Specials
        </h1>
        <p className="mt-3 text-sm sm:text-base text-espresso-200 font-light leading-relaxed">
          Thoughtfully paired tasting sets designed around natural café rhythms. Available for dine-in, takeaway, and direct WhatsApp delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-espresso-900 border border-amber-900/40 rounded-2xl overflow-hidden shadow-luxury hover:border-amber-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Photo & Timing Badge */}
              <div className="relative aspect-[16/9] overflow-hidden bg-espresso-950">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-espresso-950/90 backdrop-blur-xs text-amber-300 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full shadow-glow-sm">
                  {offer.badge}
                </div>
              </div>

              {/* Offer Details */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-cream-50">
                      {offer.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-400 font-semibold mt-1">
                      {offer.tagline}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">
                      {formatCurrency(offer.price)}
                    </span>
                    {offer.originalPrice && (
                      <span className="block text-xs text-espresso-500 line-through">
                        {formatCurrency(offer.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-espresso-300 leading-relaxed font-light">
                  {offer.description}
                </p>

                {/* Validity & Time Info */}
                <div className="flex flex-wrap items-center gap-4 py-3.5 border-y border-espresso-800 text-xs text-espresso-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Days: <strong className="text-cream-100">{offer.validity}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Hours: <strong className="text-cream-100">{offer.timing}</strong></span>
                  </div>
                </div>

                {/* Included Items Checklist */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2.5">
                    What's Included:
                  </h4>
                  <ul className="space-y-2 text-xs text-espresso-200">
                    {offer.includedItems.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 sm:p-8 sm:pt-0 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => handleOrderWhatsApp(offer.title, offer.price)}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors border border-emerald-600/40"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => handleClaimNotice(offer.title)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-3 px-5 border border-espresso-750 text-cream-100 hover:bg-espresso-850 text-xs sm:text-sm font-medium rounded-xl transition-colors"
              >
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span>Claim at Counter</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Student & Remote Work Special Banner */}
      <div className="bg-espresso-900 border border-amber-900/40 rounded-2xl p-7 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-luxury">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-bold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Weekday Afternoon Work Routine</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-medium text-cream-50">
            Complimentary Coffee Size Upgrade
          </h3>
          <p className="text-xs sm:text-sm text-espresso-300 font-light max-w-xl">
            Working remotely from our café on weekdays between 2:00 PM and 6:00 PM? Order any regular coffee and enjoy a complimentary Large upgrade on the house.
          </p>
        </div>
        <div className="shrink-0 text-center">
          <span className="inline-block text-xs font-bold px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 shadow-glow-sm">
            Mon – Thu · 2 PM – 6 PM
          </span>
        </div>
      </div>
    </div>
  );
};
