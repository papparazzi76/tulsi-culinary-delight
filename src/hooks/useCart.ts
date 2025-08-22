import { create } from 'zustand';
import { MenuItem } from '../data/types';

interface CartItem extends MenuItem {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  calculateTotals: (deliveryType: 'pickup' | 'delivery') => {
    subtotal: number;
    discountAmount: number;
    taxAmount: number;
    total: number;
  };
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),
  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
    })),
  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  calculateTotals: (deliveryType: 'pickup' | 'delivery') => {
    const subtotal = get().getCartTotal();
    const discountAmount = deliveryType === 'pickup' ? subtotal * 0.20 : 0;
    const total = subtotal - discountAmount;

    return {
      subtotal,
      discountAmount,
      taxAmount: 0, // Forzamos el IVA a 0
      total,
    };
  },
}));
