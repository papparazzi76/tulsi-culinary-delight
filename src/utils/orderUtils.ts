// src/utils/orderUtils.ts
import type { OrderItem } from '@/types/order';

export const calculateTotal = (items: OrderItem[]): number => {
  return items.reduce((acc, item) => acc + item.menu_items.price * item.quantity, 0);
};

export const generateOrderNumber = (): string => {
  return `TUL-${Date.now()}`;
};

export const formatOrderTotal = (amount: number): string => {
  return `€${amount.toFixed(2)}`;
};