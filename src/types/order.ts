// src/types/order.ts
export interface Order {
  id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  table_id: string;
  waiter_id: string;
  order_items: OrderItem[];
  total_amount: number;
}

export interface OrderItem {
  id: string;
  quantity: number;
  menu_items: {
    id: string;
    name: string;
    price: number;
  }
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
}

export type OrderStatus = Order['status'];