// src/services/orderService.ts
import { supabase } from '@/integrations/supabase/client';
import type { Order, MenuItem, OrderStatus } from '@/types/order';
import { generateOrderNumber } from '@/utils/orderUtils';

export const orderService = {
  async fetchActiveOrder(tableId: string): Promise<Order | null> {
    const { data: activeOrder, error } = await supabase
      .from('orders')
      .select(`
        id, status, table_id, waiter_id, total_amount,
        order_items ( id, quantity, menu_items ( id, name, price ) )
      `)
      .eq('table_id', tableId)
      .in('status', ['pending', 'in_progress'])
      .maybeSingle();

    if (error) throw error;
    return activeOrder as Order | null;
  },

  async createOrder(tableId: string, waiterId: string): Promise<{ id: string }> {
    const { data: newOrderData, error } = await supabase
      .from('orders')
      .insert({
        table_id: tableId,
        waiter_id: waiterId,
        status: 'pending',
        subtotal: 0,
        total_amount: 0,
        order_number: generateOrderNumber(),
        customer_name: 'Mesa',
        customer_email: 'mesa@tulsi.es',
        delivery_type: 'dine_in'
      })
      .select('id')
      .single();
    
    if (error) throw error;
    return newOrderData;
  },

  async updateTableStatus(tableId: string, status: string, orderId?: string | null) {
    const updateData: any = { status };
    if (orderId !== undefined) {
      updateData.current_order_id = orderId;
    }
    
    const { error } = await supabase
      .from('tables')
      .update(updateData)
      .eq('id', tableId);
    
    if (error) throw error;
  },

  async updateOrderTotal(orderId: string, total: number) {
    const { error } = await supabase
      .from('orders')
      .update({ total_amount: total, subtotal: total })
      .eq('id', orderId);
    
    if (error) throw error;
  },

  async addOrderItem(orderId: string, menuItem: MenuItem) {
    const { error } = await supabase
      .from('order_items')
      .insert({
        order_id: orderId,
        menu_item_id: menuItem.id,
        quantity: 1,
        unit_price: menuItem.price,
        total_price: menuItem.price
      });
    
    if (error) throw error;
  },

  async updateOrderItemQuantity(itemId: string, quantity: number, unitPrice: number) {
    const { error } = await supabase
      .from('order_items')
      .update({ 
        quantity,
        total_price: unitPrice * quantity 
      })
      .eq('id', itemId);
    
    if (error) throw error;
  },

  async removeOrderItem(itemId: string) {
    const { error } = await supabase
      .from('order_items')
      .delete()
      .eq('id', itemId);
    
    if (error) throw error;
  },

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);
    
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    if (!user) throw new Error("No authenticated user found.");
    return user;
  }
};