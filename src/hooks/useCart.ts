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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => {
    let session = localStorage.getItem('cart_session_id');
    if (!session) {
      session = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('cart_session_id', session);
    }
    return session;
  });

  // Load cart from localStorage on mount and whenever sessionId changes
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem(`cart_${sessionId}`);
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    };

    loadCart();

    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `cart_${sessionId}` && e.newValue !== null) {
        try {
          const parsedCart = JSON.parse(e.newValue);
          setCartItems(parsedCart);
        } catch (error) {
          console.error('Error parsing cart from storage event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [sessionId]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem(`cart_${sessionId}`, JSON.stringify(cartItems));
    } else {
      // Remove empty cart from localStorage
      localStorage.removeItem(`cart_${sessionId}`);
    }
  }, [cartItems, sessionId]);

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
    setCartItems([]);
    localStorage.removeItem(`cart_${sessionId}`);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
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
    getCartTotal,
    getCartCount,
    calculateTotals,
  };
};