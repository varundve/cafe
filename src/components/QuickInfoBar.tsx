import React from 'react';
import { Coffee, Croissant, Sparkles, Wifi, Clock, Award } from 'lucide-react';

export const QuickInfoBar: React.FC = () => {
  const highlights = [
    { icon: Coffee, title: 'Single-Origin Roasts', desc: '100% Arabica washed estates' },
    { icon: Croissant, title: 'Fresh Artisanal Bakes', desc: 'Hand-shaped daily at 7:30 AM' },
    { icon: Sparkles, title: 'Eggless Delicacies', desc: 'Pure vegetarian cakes & pastries' },
    { icon: Wifi, title: '100 Mbps Fibre Wi-Fi', desc: 'Work-ready quiet corners' },
    { icon: Clock, title: 'Open 7 Days a Week', desc: '8:00 AM – 10:30 PM' },
  ];

  return (
    <section className="bg-espresso-950 border-y border-amber-900/30 relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

      {/* Highlights Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-amber-950/60">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex items-center gap-3.5 pt-3 sm:pt-0 ${
                  idx !== 0 ? 'sm:pl-4 lg:pl-6' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-espresso-850 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 shadow-subtle">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-cream-100 truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-espresso-400 font-light truncate">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
