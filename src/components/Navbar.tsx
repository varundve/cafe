import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Coffee, Calendar, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartItemCount, setIsCartDrawerOpen } = useCart();
  const location = useLocation();

  const cartCount = getCartItemCount();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Offers', path: '/offers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-espresso-950/95 backdrop-blur-md shadow-card border-b border-amber-900/30'
          : 'bg-espresso-950/80 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 text-cream-50 group focus:outline-none"
            aria-label="Brew & Bean Homepage"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 text-espresso-950 flex items-center justify-center font-bold shadow-glow-sm transition-transform duration-300 group-hover:scale-105">
              <Coffee className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-cream-50 group-hover:text-amber-400 transition-colors">
                BREW & BEAN
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-amber-500 font-semibold -mt-0.5">
                Specialty Roastery · Kanpur
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-200 hover:text-amber-400 relative py-1 ${
                    isActive ? 'text-amber-400 font-semibold' : 'text-espresso-200'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right Side CTA & Cart */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Live Status indicator */}
            <div className="hidden xl:flex items-center gap-2 text-xs text-espresso-300 border border-white/10 px-3 py-1.5 rounded-full bg-espresso-900/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Open Daily: 8:00 AM – 10:30 PM</span>
            </div>

            <Link
              to="/reservations"
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-amber-500/10 hover:bg-amber-500 hover:text-espresso-950 text-amber-400 border border-amber-500/40 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2.5 rounded-full bg-espresso-850 hover:bg-espresso-800 text-cream-100 hover:text-amber-400 border border-amber-900/40 transition-colors shadow-subtle"
              aria-label={`View cart, ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-amber-400 to-amber-600 text-espresso-950 text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-glow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Controls: Cart & Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2 text-cream-100"
              aria-label={`View cart, ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-espresso-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-cream-100 focus:outline-none"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-amber-900/30 bg-espresso-950 px-4 pt-3 pb-6 space-y-4 animate-fade-in shadow-luxury">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 text-base font-medium rounded transition-colors ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 font-semibold border-l-2 border-amber-400'
                      : 'text-espresso-200 hover:bg-espresso-900 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="pt-2 border-t border-espresso-800">
            <Link
              to="/reservations"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 text-sm font-bold rounded shadow-glow-sm transition-all"
            >
              <Calendar className="w-4 h-4 text-espresso-950" />
              <span>Reserve a Table</span>
            </Link>
          </div>

          <div className="pt-2 text-center text-xs text-espresso-400 flex items-center justify-center gap-2">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Open Daily · 8:00 AM – 10:30 PM · Civil Lines, Kanpur</span>
          </div>
        </div>
      )}
    </header>
  );
};
