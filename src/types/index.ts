export interface CustomizationOption {
  name: string;
  priceDelta: number;
}

export interface ExtraOption {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviewsCount?: number;
  vegetarian: boolean;
  eggless?: boolean;
  spicy?: boolean;
  popular?: boolean;
  isFeatured?: boolean;
  preparationTime?: string;
  ingredients?: string[];
  allergens?: string[];
  sizes?: CustomizationOption[];
  milkOptions?: string[];
  sweetnessOptions?: string[];
  extras?: ExtraOption[];
}

export interface CartCustomization {
  size?: string;
  milk?: string;
  sweetness?: string;
  extras?: string[];
}

export interface CartItem {
  id: string; // unique ID composed of productId + customizations
  productId: string;
  product: Product;
  quantity: number;
  customization?: CartCustomization;
  unitPrice: number;
  itemTotal: number;
}

export interface Category {
  id: string;
  name: string;
  tagline: string;
  iconName: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  favoriteItem?: string;
  visitType?: string;
}

export interface Offer {
  id: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  validity: string;
  timing: string;
  image: string;
  badge: string;
  includedItems: string[];
}

export interface GalleryImage {
  id: string;
  category: 'interior' | 'coffee' | 'food' | 'desserts' | 'people' | 'events';
  title: string;
  caption: string;
  url: string;
  aspect?: 'tall' | 'wide' | 'square';
}

export interface ReservationData {
  id?: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seating: 'indoor' | 'outdoor' | 'no-preference';
  specialRequest?: string;
  createdAt?: string;
  status?: 'confirmed' | 'pending';
}

export interface OrderData {
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  orderType: 'dine-in' | 'takeaway' | 'delivery';
  address?: string;
  landmark?: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
}

export interface ToastNotification {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'error';
}
