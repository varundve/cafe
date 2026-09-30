import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, MapPin, Phone, Mail, Clock, MessageCircle, Heart } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { CAFE_PHONE, generateGeneralWhatsAppUrl } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-espresso-950 text-cream-100 pt-16 pb-24 md:pb-14 border-t border-amber-900/30 relative overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-espresso-800">
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 text-cream-50 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 text-espresso-950 flex items-center justify-center font-bold shadow-glow-sm">
                <Coffee className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight block">
                  BREW & BEAN
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-amber-500 font-semibold block">
                  Roastery & Artisan Kitchen
                </span>
              </div>
            </Link>

            <p className="text-sm text-espresso-300 max-w-sm font-light leading-relaxed">
              "Good coffee. Good food. Good company." Single origin Indian beans, wild fermented sourdough, hand-rolled pasta, and eggless pastries crafted daily in Civil Lines, Kanpur.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={generateGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-espresso-850 hover:bg-emerald-700 text-cream-100 border border-amber-900/40 flex items-center justify-center transition-all duration-200 hover:scale-105"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-espresso-850 hover:bg-gradient-to-tr hover:from-amber-600 hover:to-pink-600 text-cream-100 border border-amber-900/40 flex items-center justify-center transition-all duration-200 hover:scale-105"
                aria-label="Instagram profile"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-espresso-300 font-light">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">Home Experience</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-amber-400 transition-colors">Café Menu (32 Items)</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">Our Roastery Story</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amber-400 transition-colors">Photo Showcase</Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-amber-400 transition-colors">Combos & Specials</Link>
              </li>
            </ul>
          </div>

          {/* Visit & Timings */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              Visit The Café
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-espresso-300 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>14/72, Mall Road, Civil Lines, Kanpur 208001</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-cream-100 font-medium">Mon – Fri: 8:00 AM – 10:30 PM</p>
                  <p className="text-cream-100 font-medium">Sat – Sun: 8:00 AM – 11:00 PM</p>
                  <span className="inline-block mt-1 text-[11px] text-emerald-400 font-medium">
                    ● Courtyard & AC Hall Open
                  </span>
                </div>
              </div>
              <div className="pt-1">
                <Link
                  to="/reservations"
                  className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-4 font-semibold"
                >
                  Reserve a Table Online →
                </Link>
              </div>
            </div>
          </div>

          {/* Connect & Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              Connect
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-espresso-300 font-light">
              <li>
                <a href={`tel:${CAFE_PHONE}`} className="flex items-center gap-2.5 hover:text-amber-400 transition-colors">
                  <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>+91 98390 12840</span>
                </a>
              </li>
              <li>
                <a href="mailto:hello@brewandbean.com" className="flex items-center gap-2.5 hover:text-amber-400 transition-colors">
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>hello@brewandbean.com</span>
                </a>
              </li>
              <li className="pt-1">
                <span className="inline-block text-[11px] bg-espresso-850 border border-amber-900/40 text-amber-300 px-3 py-1 rounded-full">
                  Free High-Speed Wi-Fi for Guests
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-espresso-400 font-light gap-4">
          <p>© 2026 Brew & Bean Café. All rights reserved.</p>
          <p className="flex items-center gap-2 text-espresso-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>for Kanpur's coffee community</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
