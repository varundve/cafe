import React from 'react';
import { Flame, Sparkles } from 'lucide-react';

interface DietaryBadgeProps {
  vegetarian: boolean;
  eggless?: boolean;
  spicy?: boolean;
  size?: 'sm' | 'md';
}

export const DietaryBadge: React.FC<DietaryBadgeProps> = ({
  vegetarian,
  eggless,
  spicy,
  size = 'md',
}) => {
  const boxSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {/* Indian Veg / Non-Veg Indicator */}
      <span
        title={vegetarian ? '100% Pure Vegetarian' : 'Non-Vegetarian'}
        className={`border flex items-center justify-center rounded-[3px] ${boxSize} ${
          vegetarian ? 'border-emerald-500 bg-emerald-950/60' : 'border-amber-700 bg-amber-950/60'
        }`}
      >
        <span
          className={`rounded-full ${dotSize} ${
            vegetarian ? 'bg-emerald-400' : 'bg-amber-600'
          }`}
        />
      </span>

      {eggless && (
        <span
          title="100% Eggless Preparation"
          className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-amber-300 bg-amber-950/70 border border-amber-600/40 px-2 py-0.5 rounded-full"
        >
          <Sparkles className="w-2.5 h-2.5 text-amber-400" />
          Eggless
        </span>
      )}

      {spicy && (
        <span
          title="Chef's Spiced"
          className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-rose-300 bg-rose-950/70 border border-rose-600/40 px-2 py-0.5 rounded-full"
        >
          <Flame className="w-2.5 h-2.5 text-rose-400" />
          Spiced
        </span>
      )}
    </div>
  );
};
