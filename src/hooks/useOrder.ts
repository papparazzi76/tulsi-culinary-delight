// src/hooks/useOrder.ts
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Define types based on your DB schema
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

export const useOrder = (tableId: string | null) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = useCallback(async () => {
    if (!tableId) {
        setOrder(null);
        setLoading(false);
        return;
    };

    setLoading(true);
    try {
      // Find an active order for the selected table
      let { data: activeOrder, error: fetchError } = await supabase
        .from('orders')
        .select(`
          id, status, table_id, waiter_id, total_amount,
          order_items ( id, quantity, menu_items ( id, name, price ) )
        `)
        .eq('table_id', tableId)
        .in('status', ['pending', 'in_progress'])
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (activeOrder) {
        setOrder(activeOrder as Order);
      } else {
        // If no active order, create a new one
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No authenticated user found.");

        const { data: newOrderData, error: createError } = await supabase
          .from('orders')
          .insert({
            table_id: tableId,
            waiter_id: user.id,
            status: 'pending',
            subtotal: 0,
            total_amount: 0,
            order_number: `TUL-${Date.now()}`,
            customer_name: 'Mesa',
            customer_email: 'mesa@tulsi.es',
            delivery_type: 'dine_in'
          })
          .select('id') // Select only the ID to start
          .single();
        
        if (createError) throw createError;

        // Also update table status to 'occupied'
        await supabase.from('tables').update({ status: 'occupied', current_order_id: newOrderData.id }).eq('id', tableId);
        
        // Fetch the newly created order with its relations
        await fetchOrder(); // Recurse to fetch the full new order
      }
    } catch (error: any) {
      toast.error('Error al gestionar la comanda: ' + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [tableId]);

  useEffect(() => {
    if(tableId) {
        fetchOrder();
    }
  }, [tableId, fetchOrder]);

  const calculateTotal = (items: OrderItem[]): number => {
      return items.reduce((acc, item) => acc + item.menu_items.price * item.quantity, 0);
  }

  const updateOrderTotal = async (orderId: string) => {
      if(!order) return;
      const total = calculateTotal(order.order_items);
      await supabase.from('orders').update({ total_amount: total, subtotal: total }).eq('id', orderId);
  }

  const addMenuItem = async (menuItem: MenuItem) => {
    if (!order) return;
    setLoading(true);
    const existingItem = order.order_items.find(item => item.menu_items.id === menuItem.id);

    try {
        if (existingItem) {
            await updateItemQuantity(existingItem.id, existingItem.quantity + 1);
        } else {
            const { error } = await supabase.from('order_items').insert({
                order_id: order.id,
                menu_item_id: menuItem.id,
                quantity: 1,
                unit_price: menuItem.price,
                total_price: menuItem.price
            });
            if (error) throw error;
        }
        toast.success(`${menuItem.name} añadido.`);
        await fetchOrder();
    } catch(error: any) {
        toast.error("Error al añadir el plato: " + error.message);
    } finally {
        setLoading(false);
    }
  };

  const updateItemQuantity = async (itemId: string, newQuantity: number) => {
      if (newQuantity <= 0) {
          await removeItem(itemId);
          return;
      }
      setLoading(true);
      try {
          const orderItem = order.order_items.find(item => item.id === itemId);
          if (!orderItem) return;
          
          const newTotalPrice = orderItem.menu_items.price * newQuantity;
          const { error } = await supabase
            .from('order_items')
            .update({ 
              quantity: newQuantity,
              total_price: newTotalPrice 
            })
            .eq('id', itemId);
          if (error) throw error;
          await fetchOrder();
      } catch(error: any) {
          toast.error("Error al actualizar la cantidad.");
      } finally {
          setLoading(false);
      }
  }

  const removeItem = async (itemId: string) => {
      setLoading(true);
      try {
          const { error } = await supabase.from('order_items').delete().eq('id', itemId);
          if (error) throw error;
          toast.success("Plato eliminado de la comanda.");
          await fetchOrder();
      } catch(error: any) {
          toast.error("Error al eliminar el plato.");
      } finally {
          setLoading(false);
      }
  }
  
  const sendToKitchen = async () => {
      if(!order) return;
      setLoading(true);
      try {
          // Here you could also send a notification, e.g. via a Supabase Function
          const { error } = await supabase.from('orders').update({ status: 'in_progress' }).eq('id', order.id);
          if(error) throw error;
          toast.success("Comanda enviada a cocina.");
          await fetchOrder();
      } catch(error: any) {
          toast.error("Error al enviar a cocina.");
      } finally {
          setLoading(false);
      }
  }

  const closeOrder = async () => {
      if(!order || !tableId) return;
      setLoading(true);
      try {
          // 1. Update order status to 'completed'
          const { error: orderError } = await supabase.from('orders').update({ status: 'completed' }).eq('id', order.id);
          if (orderError) throw orderError;

          // 2. Update table status to 'available' and remove current_order_id
          const { error: tableError } = await supabase.from('tables').update({ status: 'available', current_order_id: null }).eq('id', tableId);
          if (tableError) throw tableError;

          toast.success(`Cuenta cerrada para la mesa. Total: €${order.total_amount.toFixed(2)}`);
          setOrder(null); // Clear the order from state
          return true; // Indicate success
      } catch(error: any) {
          toast.error("Error al cerrar la cuenta.");
          return false; // Indicate failure
      } finally {
          setLoading(false);
      }
  }

  useEffect(() => {
      if(order) {
        updateOrderTotal(order.id);
      }
  }, [order?.order_items]);

  return { 
      order, 
      loading, 
      addMenuItem,
      updateItemQuantity,
      removeItem,
      sendToKitchen,
      closeOrder,
      refreshOrder: fetchOrder 
    };
};
