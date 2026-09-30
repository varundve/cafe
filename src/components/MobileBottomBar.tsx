import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Utensils, ShoppingBag, Calendar } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const MobileBottomBar: React.FC = () => {
  const { getCartItemCount } = useCart();
  const cartCount = getCartItemCount();

  const items = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Menu', path: '/menu', icon: Utensils },
    { name: 'Cart', path: '/cart', icon: ShoppingBag, badge: cartCount },
    { name: 'Reserve', path: '/reservations', icon: Calendar },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-espresso-950/95 backdrop-blur-md border-t border-amber-900/30 shadow-luxury safe-bottom">
      <nav className="grid grid-cols-4 h-15" aria-label="Mobile Bottom Navigation">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center gap-1 transition-all ${
                  isActive ? 'text-amber-400 font-bold' : 'text-espresso-400 hover:text-cream-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2] text-amber-400' : 'stroke-[1.6]'}`} />
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute -top-1.5 -right-2 bg-gradient-to-br from-amber-400 to-amber-600 text-espresso-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-glow-sm">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] tracking-tight">{item.name}</span>
                  {isActive && (
                    <span className="absolute top-0 w-8 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full shadow-glow-sm" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
