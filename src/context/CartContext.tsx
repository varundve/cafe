import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, CartCustomization } from '../types';
import { useToast } from './ToastContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, customization?: CartCustomization) => void;
  removeFromCart: (cartItemId: string) => void;
  increaseQuantity: (cartItemId: string) => void;
  decreaseQuantity: (cartItemId: string) => void;
  clearCart: () => void;
  getCartSubtotal: () => number;
  getCartTax: () => number;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'brew_and_bean_cart_v1';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
    }
    return [];
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  const generateCartItemId = (productId: string, customization?: CartCustomization): string => {
    if (!customization) return productId;
    const parts = [
      productId,
      customization.size || 'default',
      customization.milk || 'default',
      customization.sweetness || 'default',
      (customization.extras || []).sort().join('-'),
    ];
    return parts.join('__');
  };

  const calculateItemUnitPrice = (product: Product, customization?: CartCustomization): number => {
    let price = product.price;

    // Size delta
    if (customization?.size && product.sizes) {
      const selectedSize = product.sizes.find((s) => s.name === customization.size);
      if (selectedSize) {
        price += selectedSize.priceDelta;
      }
    }

    // Milk upgrade delta
    if (customization?.milk) {
      if (customization.milk.includes('+₹40')) price += 40;
      else if (customization.milk.includes('+₹45')) price += 45;
    }

    // Extras
    if (customization?.extras && product.extras) {
      customization.extras.forEach((extraName) => {
        const found = product.extras?.find((e) => e.name === extraName);
        if (found) {
          price += found.price;
        }
      });
    }

    return price;
  };

  const addToCart = (product: Product, quantity = 1, customization?: CartCustomization) => {
    const itemId = generateCartItemId(product.id, customization);
    const unitPrice = calculateItemUnitPrice(product, customization);

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          itemTotal: newQty * unitPrice,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: itemId,
          productId: product.id,
          product,
          quantity,
          customization,
          unitPrice,
          itemTotal: quantity * unitPrice,
        };
        return [...prev, newItem];
      }
    });

    showToast(
      'Added to order',
      `${quantity} × ${product.name} added to your order`,
      'success'
    );
  };

  const removeFromCart = (cartItemId: string) => {
    const itemToRemove = cart.find((i) => i.id === cartItemId);
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    if (itemToRemove) {
      showToast(
        'Item removed',
        `${itemToRemove.product.name} removed from your order`,
        'info'
      );
    }
  };

  const increaseQuantity = (cartItemId: string) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const newQty = item.quantity + 1;
          return {
            ...item,
            quantity: newQty,
            itemTotal: newQty * item.unitPrice,
          };
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (cartItemId: string) => {
    setCart((prev) => {
      const target = prev.find((i) => i.id === cartItemId);
      if (!target) return prev;

      if (target.quantity <= 1) {
        return prev.filter((i) => i.id !== cartItemId);
      }

      return prev.map((item) => {
        if (item.id === cartItemId) {
          const newQty = item.quantity - 1;
          return {
            ...item,
            quantity: newQty,
            itemTotal: newQty * item.unitPrice,
          };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartSubtotal = (): number => {
    return cart.reduce((acc, item) => acc + item.itemTotal, 0);
  };

  const getCartTax = (): number => {
    // 5% standard café restaurant GST in India
    return Math.round(getCartSubtotal() * 0.05);
  };

  const getCartTotal = (): number => {
    return getCartSubtotal() + getCartTax();
  };

  const getCartItemCount = (): number => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getCartSubtotal,
        getCartTax,
        getCartTotal,
        getCartItemCount,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
