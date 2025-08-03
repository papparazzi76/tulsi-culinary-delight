import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}

export interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
  available: boolean;
}

export const useCart = () => {
  const [sessionId] = useState(() => {
    let session = localStorage.getItem('cart_session_id');
    if (!session) {
      session = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('cart_session_id', session);
    }
    return session;
  });

  const getStoredCart = (): CartItem[] => {
    try {
      const savedCart = localStorage.getItem(`cart_${sessionId}`);
      if (!savedCart) return [];
      
      const parsed = JSON.parse(savedCart);
      // Ensure we always return an array
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  };

  const [cartItems, setCartItems] = useState<CartItem[]>(getStoredCart);
  const [isLoading, setIsLoading] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    console.log('🛒 Saving cart to localStorage:', cartItems);
    localStorage.setItem(`cart_${sessionId}`, JSON.stringify(cartItems));
  }, [cartItems, sessionId]);

  // Listen for storage changes and reload cart when needed
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `cart_${sessionId}`) {
        console.log('🛒 Storage changed, reloading cart');
        const newCart = getStoredCart();
        setCartItems(Array.isArray(newCart) ? newCart : []);
      }
    };

    const handleFocus = () => {
      console.log('🛒 Window focused, refreshing cart from storage');
      const newCart = getStoredCart();
      setCartItems(Array.isArray(newCart) ? newCart : []);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [sessionId]);

  // Force refresh cart from localStorage
  const refreshCart = () => {
    console.log('🛒 Force refreshing cart');
    const newCart = getStoredCart();
    setCartItems(Array.isArray(newCart) ? newCart : []);
  };

  const addToCart = (menuItem: MenuItemType, quantity: number = 1) => {
    console.log('🛒 Adding to cart:', menuItem.name, 'quantity:', quantity);
    console.log('🛒 Current cart before add:', cartItems);
    
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === menuItem.id);
      
      let newCart;
      if (existingItem) {
        newCart = prev.map(item =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...prev, {
          id: menuItem.id,
          name: menuItem.name,
          description: menuItem.description || '',
          price: menuItem.price,
          quantity,
          category: menuItem.category,
        }];
      }
      
      console.log('🛒 New cart after add:', newCart);
      return newCart;
    });
    
    toast.success(`${menuItem.name} añadido al carrito`);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    toast.success('Producto eliminado del carrito');
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    console.log('🛒 Clearing cart');
    setCartItems([]);
    localStorage.removeItem(`cart_${sessionId}`);
  };

  const getCartTotal = () => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotals = (deliveryType: 'pickup' | 'delivery') => {
    const subtotal = getCartTotal();
    const discountAmount = deliveryType === 'pickup' ? subtotal * 0.20 : 0;
    const taxAmount = (subtotal - discountAmount) * 0.21; // 21% IVA
    const total = subtotal - discountAmount + taxAmount;

    return {
      subtotal,
      discountAmount,
      taxAmount,
      total,
    };
  };

  return {
    cartItems,
    sessionId,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refreshCart,
    getCartTotal,
    getCartCount,
    calculateTotals,
  };
};