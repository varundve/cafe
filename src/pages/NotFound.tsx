import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="py-28 max-w-xl mx-auto px-4 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-espresso-900 border border-amber-900/40 text-amber-400 flex items-center justify-center mx-auto shadow-glow-sm">
        <Coffee className="w-8 h-8 stroke-[1.8]" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
          Error 404
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif text-cream-50 font-normal">
          Looks like you've taken a wrong turn.
        </h1>
        <p className="text-sm text-espresso-300 font-light max-w-md mx-auto leading-relaxed">
          The page you requested might have been moved, brewed away, or never existed in the first place.
        </p>
      </div>

      <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 text-sm font-bold rounded-xl hover:brightness-110 shadow-glow transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-6 py-3.5 border border-espresso-750 text-cream-100 hover:bg-espresso-850 text-sm font-medium rounded-xl transition-colors"
        >
          <span>Browse Menu</span>
        </Link>
      </div>
    </div>
  );
};
