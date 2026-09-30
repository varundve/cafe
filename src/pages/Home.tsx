import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Coffee, Star, MapPin, Clock, Phone, Mail, ExternalLink, Sparkles, Check, Flame } from 'lucide-react';
import { QuickInfoBar } from '../components/QuickInfoBar';
import { SectionHeading } from '../components/SectionHeading';
import { ProductCard } from '../components/ProductCard';
import { QuickCustomizeModal } from '../components/QuickCustomizeModal';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { reviews } from '../data/reviews';
import { offers } from '../data/offers';
import { Product } from '../types';
import { CAFE_PHONE } from '../utils/whatsapp';
import { formatCurrency } from '../utils/formatCurrency';
import { InstagramIcon } from '../components/InstagramIcon';

export const Home: React.FC = () => {
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'coffee' | 'breakfast' | 'mains' | 'desserts'>('all');

  // Filter products for the interactive tabbed showcase
  const displayedFeaturedProducts = products.filter((p) => {
    if (activeTab === 'coffee') return p.category === 'coffee' || p.category === 'cold-coffee';
    if (activeTab === 'breakfast') return p.category === 'breakfast';
    if (activeTab === 'mains') return p.category === 'sandwiches' || p.category === 'pasta' || p.category === 'pizza';
    if (activeTab === 'desserts') return p.category === 'desserts';
    // default 'all'
    const featuredIds = [
      'cappuccino',
      'iced-spanish-latte',
      'chicken-pesto-sandwich',
      'classic-pancakes',
      'chocolate-hazelnut-cake',
      'loaded-fries',
    ];
    return featuredIds.includes(p.id);
  }).slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-28">
      {/* 8. LUXURY HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-12 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Text & CTAs */}
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-espresso-850 border border-amber-500/30 text-xs font-semibold text-amber-300 shadow-subtle">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>ESTD. 2021 · SPECIALTY COFFEE ROASTERY · CIVIL LINES</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-cream-50 font-normal leading-[1.12] tracking-tight">
              Coffee worth <br className="hidden sm:inline" />
              <span className="italic font-display text-amber-gradient font-medium text-4xl sm:text-6xl lg:text-7xl">
                slowing down
              </span>{' '}
              for.
            </h1>

            <p className="text-base sm:text-lg text-espresso-200 max-w-xl font-light leading-relaxed">
              Freshly brewed single-origin beans, sourdough bakes, and a tranquil space to make your day a little better. Hand-roasted weekly in Civil Lines, Kanpur.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 text-sm font-bold rounded-xl hover:brightness-110 shadow-glow transition-all active:scale-95"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/reservations"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-amber-500/40 text-cream-100 hover:bg-amber-500/10 hover:border-amber-400 text-sm font-semibold rounded-xl transition-all"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Reserve a Table</span>
              </Link>
            </div>

            {/* Quick stats and credentials bar */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-espresso-800 text-xs sm:text-sm">
              <div>
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9 / 5.0</span>
                </div>
                <p className="text-[11px] text-espresso-400 font-light mt-0.5">Over 1,200 reviews</p>
              </div>
              <div>
                <span className="text-cream-100 font-bold block">100% Arabica</span>
                <p className="text-[11px] text-espresso-400 font-light mt-0.5">Direct farm sourced</p>
              </div>
              <div>
                <span className="text-emerald-400 font-semibold block">Open Daily</span>
                <p className="text-[11px] text-espresso-400 font-light mt-0.5">8:00 AM – 10:30 PM</p>
              </div>
            </div>
          </div>

          {/* Right: Layered Editorial Café Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-luxury bg-espresso-900 group">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"
                alt="A warm cup of freshly brewed artisan cappuccino on a rustic wooden table with natural morning light"
                className="w-full h-[400px] sm:h-[500px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/20 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 text-cream-50">
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400 font-bold">
                  House Special Extraction
                </span>
                <h3 className="text-base sm:text-lg font-serif font-medium mt-0.5">
                  Chikmagalur Washed Arabica
                </h3>
                <p className="text-xs text-espresso-300 font-light mt-0.5">
                  Hazelnut crema, toasted cocoa & delicate citrus finish
                </p>
              </div>
            </div>

            {/* Floating Live Barista Recommendation Pill */}
            <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-espresso-900/95 backdrop-blur-md border border-amber-500/40 p-4 rounded-xl shadow-luxury max-w-xs flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-lg bg-espresso-800 overflow-hidden shrink-0 border border-amber-500/30">
                <img
                  src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=200&q=80"
                  alt="Iced Spanish Latte"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">
                  Today's Crowd Favourite
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-cream-100 truncate">
                  Iced Spanish Latte
                </h4>
                <p className="text-xs text-amber-300 font-serif font-bold">₹220</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AMBIENT MARQUEE TICKER */}
      <div className="bg-espresso-950 border-y border-amber-900/40 py-3 overflow-hidden select-none">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-amber-300/80">
              <span className="flex items-center gap-2">☕ Single-Origin Arabica Roasts</span>
              <span className="text-amber-500/40">✦</span>
              <span className="flex items-center gap-2">🥐 Fresh Laminated Pastries at 7:30 AM</span>
              <span className="text-amber-500/40">✦</span>
              <span className="flex items-center gap-2">🌿 Shaded Courtyard Seating</span>
              <span className="text-amber-500/40">✦</span>
              <span className="flex items-center gap-2">📶 100 Mbps High-Speed Wi-Fi</span>
              <span className="text-amber-500/40">✦</span>
              <span className="flex items-center gap-2">📍 Civil Lines, Kanpur</span>
              <span className="text-amber-500/40">✦</span>
              <span className="flex items-center gap-2">🛵 Free Delivery on Orders above ₹499</span>
              <span className="text-amber-500/40">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* 9. QUICK INFORMATION HIGHLIGHTS */}
      <QuickInfoBar />

      {/* 10. INTERACTIVE FEATURED MENU SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Signature Kitchen & Bar"
          title="A few favourites"
          subtitle="Discover what regulars keep coming back for — from single-origin espressos to hand-tossed artisan pizzas."
        />

        {/* Quick Filter Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto hide-scrollbar pb-3 mb-8">
          {[
            { id: 'all', label: 'All Regulars’ Picks' },
            { id: 'coffee', label: 'Specialty Coffee' },
            { id: 'breakfast', label: 'Breakfast' },
            { id: 'mains', label: 'Sandwiches & Pasta' },
            { id: 'desserts', label: 'Eggless Bakes' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 shadow-glow-sm'
                  : 'bg-espresso-850 text-espresso-300 hover:text-white border border-espresso-750 hover:border-amber-500/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayedFeaturedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickCustomize={(p) => setCustomizingProduct(p)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-espresso-950 text-sm font-bold rounded-xl transition-all duration-200 shadow-subtle"
          >
            <span>Explore All 32 Menu Items</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 22. EDITORIAL ROASTERY STORY & VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-espresso-900 border border-amber-900/30 rounded-2xl p-6 sm:p-12 lg:p-16 relative overflow-hidden shadow-luxury">
          {/* Ambient radial glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                Craft & Community
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-cream-50 font-normal leading-tight">
                Built around coffee <br />and unhurried moments.
              </h2>
              <p className="text-sm sm:text-base text-espresso-200 font-light leading-relaxed">
                Brew & Bean began with a quiet conviction: Kanpur deserved a place where you could savor world-class coffee without feeling rushed out the door.
              </p>
              <p className="text-sm sm:text-base text-espresso-200 font-light leading-relaxed">
                We roast ethically traded Indian Arabica beans, slowly ferment our country sourdough loaves, and hand-shape 100% eggless desserts every single morning in Civil Lines.
              </p>

              <div className="pt-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4"
                >
                  <span>Discover our roastery story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80"
                alt="Cozy sunlit wooden tables at Brew and Bean cafe"
                className="w-full h-52 sm:h-64 object-cover rounded-xl border border-amber-900/40 shadow-card"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80"
                alt="Barista calibrating specialty espresso machine"
                className="w-full h-52 sm:h-64 object-cover rounded-xl border border-amber-900/40 shadow-card mt-5"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 11. VISUAL MENU CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Explore Sections"
          title="From first morning roast to evening dessert"
          subtitle="Discover curated culinary selections prepared fresh for every craving."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/menu?category=${cat.id}`}
              className="group p-5 sm:p-6 bg-espresso-850 border border-amber-900/25 rounded-xl hover:border-amber-500/50 hover:shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-espresso-900 border border-amber-500/30 text-amber-400 group-hover:bg-amber-500 group-hover:text-espresso-950 flex items-center justify-center transition-all mb-4 shadow-subtle">
                <Coffee className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-medium text-cream-50 group-hover:text-amber-400 transition-colors">
                {cat.name}
              </h3>
              <p className="mt-1.5 text-xs text-espresso-400 line-clamp-1 font-light">
                {cat.tagline}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 21. TABLE RESERVATIONS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-espresso-900 border border-amber-900/40 shadow-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-8 sm:p-14 flex flex-col justify-center space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">
                Table Hospitality
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-cream-50 font-normal leading-tight">
                Your table is waiting.
              </h2>
              <p className="text-sm sm:text-base text-espresso-200 font-light max-w-lg leading-relaxed">
                Whether it's a quiet morning espresso, an afternoon remote work session, or dinner with loved ones, we'll save you a cozy seat. No cancellation fees.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <Link
                  to="/reservations"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 text-sm font-bold rounded-xl hover:brightness-110 shadow-glow transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve a Table</span>
                </Link>
                <a
                  href={`tel:${CAFE_PHONE}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-espresso-700 text-cream-100 hover:bg-espresso-800 text-sm font-medium rounded-xl transition-all"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call: +91 98390 12840</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[440px]">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                alt="Warm wooden interior with ambient lights at Brew and Bean café"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-espresso-900 via-transparent to-transparent hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* 26. SPECIAL OFFERS & COMBO TICKETS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              Café Combos
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-cream-50 mt-1">
              Curated Sets & Daily Perks
            </h2>
          </div>
          <Link
            to="/offers"
            className="mt-3 sm:mt-0 text-sm font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4 flex items-center gap-1.5"
          >
            <span>View all offers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.slice(0, 3).map((offer) => (
            <div
              key={offer.id}
              className="bg-espresso-850 border border-amber-900/30 rounded-xl overflow-hidden flex flex-col justify-between hover:border-amber-500/50 hover:shadow-card transition-all"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-espresso-950">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-espresso-950/90 backdrop-blur-xs text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {offer.timing}
                </span>
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-cream-50">
                    {offer.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-espresso-300 leading-relaxed font-light">
                    {offer.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-espresso-750 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-serif font-bold text-amber-400">
                      ₹{offer.price}
                    </span>
                    {offer.originalPrice && (
                      <span className="text-xs text-espresso-500 line-through ml-2">
                        ₹{offer.originalPrice}
                      </span>
                    )}
                  </div>
                  <Link
                    to="/offers"
                    className="text-xs font-bold text-amber-400 hover:text-amber-300"
                  >
                    View Perk →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 27. CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Regulars' Thoughts"
          title="From our Kanpur community"
          subtitle="Honest impressions from guests who make Brew & Bean feel like home."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="p-6 sm:p-7 bg-espresso-850 border border-amber-900/30 rounded-xl flex flex-col justify-between shadow-card hover:border-amber-500/40 transition-colors"
            >
              <div className="space-y-3.5">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-espresso-200 leading-relaxed font-light italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-espresso-750 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-cream-100">{rev.author}</p>
                  {rev.favoriteItem && (
                    <p className="text-[11px] text-amber-400/90 mt-0.5">
                      Favourite: {rev.favoriteItem}
                    </p>
                  )}
                </div>
                <span className="text-[11px] text-espresso-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 28. GOOGLE REVIEW PROMPT */}
        <div className="mt-10 p-6 sm:p-8 bg-espresso-850 border border-amber-900/40 rounded-xl text-center max-w-xl mx-auto space-y-3.5 shadow-subtle">
          <h3 className="font-serif text-lg sm:text-xl font-medium text-cream-50">
            Loved your visit?
          </h3>
          <p className="text-xs sm:text-sm text-espresso-300 font-light">
            Your review helps our neighborhood café thrive and fuels our passion for the craft.
          </p>
          <div className="pt-1">
            <a
              href="https://google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 text-xs sm:text-sm font-bold rounded-lg hover:brightness-110 shadow-glow-sm transition-all"
            >
              <span>Leave a Google Review</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 25. INSTAGRAM SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            Follow Our Roasts
          </span>
          <h2 className="text-xl sm:text-2xl font-serif text-cream-50 mt-1">
            @brewandbean on Instagram
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80', label: 'Morning pour' },
            { img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80', label: 'Avocado sourdough' },
            { img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80', label: 'Fresh croissants' },
            { img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80', label: 'Hazelnut cake' },
            { img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80', label: 'Latte art rosetta' },
            { img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80', label: 'Afternoon sun' },
          ].map((item, idx) => (
            <a
              key={idx}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl bg-espresso-900 border border-amber-900/30"
              aria-label={`View ${item.label} on Instagram`}
            >
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-espresso-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-amber-400">
                <InstagramIcon className="w-6 h-6" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300"
          >
            <span>View Instagram Feed</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 29. LOCATION & MAP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-espresso-900 border border-amber-900/40 rounded-2xl overflow-hidden shadow-luxury grid grid-cols-1 lg:grid-cols-12">
          {/* Details */}
          <div className="lg:col-span-6 p-7 sm:p-12 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                Neighborhood Address
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-cream-50 mt-1">
                Find us in Civil Lines
              </h2>
            </div>

            <div className="space-y-4 text-sm text-espresso-200 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-cream-100">Brew & Bean Roastery Café</p>
                  <p>14/72, Mall Road, Civil Lines</p>
                  <p>Kanpur, Uttar Pradesh 208001</p>
                  <p className="text-xs text-amber-400/80 mt-1">Opposite Green Park Stadium Gate 2</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-cream-100">Opening Hours</p>
                  <p>Monday – Friday: 8:00 AM – 10:30 PM</p>
                  <p>Saturday – Sunday: 8:00 AM – 11:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-cream-100">Contact & Bookings</p>
                  <p>+91 98390 12840 · hello@brewandbean.com</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 text-xs sm:text-sm font-bold rounded-xl hover:brightness-110 shadow-glow-sm transition-all"
              >
                <MapPin className="w-4 h-4 text-espresso-950" />
                <span>Get Directions</span>
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-espresso-700 text-cream-100 hover:bg-espresso-800 text-xs sm:text-sm font-medium rounded-xl transition-all"
              >
                <span>Full Contact Page</span>
              </Link>
            </div>
          </div>

          {/* Visual Map Canvas Placeholder */}
          <div className="lg:col-span-6 bg-espresso-950 relative min-h-[300px] flex items-center justify-center p-8 border-t lg:border-t-0 lg:border-l border-amber-900/30">
            <div className="text-center space-y-4 max-w-sm">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 text-espresso-950 flex items-center justify-center mx-auto shadow-glow">
                <MapPin className="w-7 h-7 stroke-[2.2]" />
              </div>
              <h3 className="font-serif text-xl font-medium text-cream-50">
                Civil Lines, Kanpur
              </h3>
              <p className="text-xs text-espresso-300 leading-relaxed font-light">
                Conveniently situated on leafy Mall Road. Dedicated valet and two-wheeler parking. Shaded courtyard and climate-controlled roastery hall.
              </p>
              <div className="pt-2">
                <span className="inline-block text-[11px] bg-espresso-850 border border-amber-500/30 text-amber-300 px-3.5 py-1.5 rounded-full font-medium shadow-subtle">
                  📍 Landmarks: 2 mins from Green Park · Phool Bagh
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

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
