import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Coffee, ShieldCheck, Users, Clock, ArrowRight, Award, Sparkles } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';

export const About: React.FC = () => {
  const values = [
    {
      icon: ShieldCheck,
      title: 'Fresh Ingredients',
      description: 'We prepare our food with ingredients we would proudly serve at home. Real cultured butter, stone-milled flours, unadulterated farm dairy, and whole spices.',
    },
    {
      icon: Coffee,
      title: 'Good Coffee',
      description: 'Every cup begins with shade-grown Arabica beans from historic estates in Chikmagalur, roasted in small weekly batches and calibrated every morning.',
    },
    {
      icon: Clock,
      title: 'Slow Moments',
      description: 'No one should feel rushed over a cup of coffee. Whether you stay for twenty minutes or four hours with a book, our space is yours to breathe.',
    },
    {
      icon: Users,
      title: 'Local Community',
      description: 'A café is only as good as the neighborhood it belongs to. We are proud to be a living, breathing part of Civil Lines, Kanpur.',
    },
  ];

  return (
    <div className="py-8 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
      {/* 22. Authentic Café Story Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-espresso-850 border border-amber-500/30 text-xs font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>ORIGINS & PHILOSOPHY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-cream-50 font-normal leading-tight">
            Built around coffee <br />and honest conversation.
          </h1>

          <div className="space-y-4 text-base sm:text-lg text-espresso-200 font-light leading-relaxed">
            <p>
              Brew & Bean started with a simple idea — create a place where people could enjoy good coffee without feeling rushed.
            </p>
            <p>
              Growing up in Kanpur, we loved the comfort of old neighborhood tea stalls and the warmth of family tables, but we longed for a third space where specialty coffee could be paired with thoughtful, comforting food. A space that smelled of freshly ground Arabica beans in the morning and warm toasted sourdough by noon.
            </p>
            <p>
              In 2021, we opened our doors on Mall Road in Civil Lines. We set up our commercial Italian espresso machine, crafted tables from reclaimed teak wood, planted flowering bougainvillea in the courtyard, and began brewing.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="rounded-2xl overflow-hidden border border-amber-900/40 shadow-luxury">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
              alt="Communal wooden tables with warm sunlight in Brew and Bean café"
              className="w-full h-[460px] object-cover"
            />
          </div>
          <div className="mt-3 text-xs text-amber-400/80 font-light italic text-right">
            The courtyard communal table under morning sunlight.
          </div>
        </div>
      </section>

      {/* 23. CAFÉ VALUES */}
      <section>
        <SectionHeading
          eyebrow="Our Guiding Principles"
          title="What guides our little kitchen"
          subtitle="Four core promises that shape every bean we roast, every bread we bake, and every guest we welcome."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="p-6 sm:p-7 bg-espresso-850 border border-amber-900/30 rounded-xl hover:border-amber-500/40 transition-colors shadow-card space-y-3.5"
              >
                <div className="w-12 h-12 rounded-xl bg-espresso-900 border border-amber-500/25 text-amber-400 flex items-center justify-center shadow-subtle">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-medium text-cream-50">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-espresso-300 leading-relaxed font-light">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sourcing & Baking Craft */}
      <section className="bg-espresso-900 border border-amber-900/40 rounded-2xl p-7 sm:p-14 shadow-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              The Artisan Craft
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-cream-50 font-normal">
              Roasted with intention. Baked without shortcuts.
            </h2>
            <p className="text-sm sm:text-base text-espresso-200 font-light leading-relaxed">
              We source our beans directly from shade-grown, biodiverse family farms in the Western Ghats of Karnataka. Every batch is roasted to bring out chocolate and stone fruit tasting notes rather than bitter char.
            </p>
            <p className="text-sm sm:text-base text-espresso-200 font-light leading-relaxed">
              In our bakery, our sourdough starter is fed twice daily. We never use artificial emulsifiers or frozen pre-mixes. When you smell fresh bread at 8:00 AM, it was hand-shaped earlier that morning.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=500&q=80"
              alt="Freshly pulled espresso with hazelnut crema"
              className="w-full h-52 sm:h-60 object-cover rounded-xl border border-amber-900/40"
              loading="lazy"
            />
            <img
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80"
              alt="Crisp flaky artisan croissants fresh from the oven"
              className="w-full h-52 sm:h-60 object-cover rounded-xl border border-amber-900/40 mt-5"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Community Invitation */}
      <section className="text-center max-w-2xl mx-auto space-y-6">
        <div className="w-14 h-14 rounded-full bg-espresso-850 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-glow-sm">
          <Heart className="w-7 h-7 fill-amber-400 text-amber-400" />
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif text-cream-50 font-normal">
          Come by for a cup. We’d love to host you.
        </h2>
        <p className="text-sm sm:text-base text-espresso-200 font-light leading-relaxed">
          Civil Lines, Kanpur · Open every single day from 8:00 AM to 10:30 PM.
          Whether you need a quiet table for morning reading or a warm meal after a long day, there’s always a chair for you.
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-espresso-950 text-sm font-bold rounded-xl hover:brightness-110 shadow-glow transition-all"
          >
            <span>Explore the Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/reservations"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-amber-500/40 text-cream-100 hover:bg-amber-500/10 text-sm font-semibold rounded-xl transition-all"
          >
            <span>Reserve a Table</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
