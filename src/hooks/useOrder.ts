// src/hooks/useOrder.ts
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import type { Order, MenuItem } from '@/types/order';
import { orderService } from '@/services/orderService';
import { calculateTotal, formatOrderTotal } from '@/utils/orderUtils';

export const useOrder = (tableId: string | null) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = useCallback(async () => {
    if (!tableId) {
      setOrder(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const activeOrder = await orderService.fetchActiveOrder(tableId);
      
      if (activeOrder) {
        setOrder(activeOrder);
      } else {
        // Create a new order if none exists
        const user = await orderService.getCurrentUser();
        const newOrderData = await orderService.createOrder(tableId, user.id);
        
        // Update table status to 'occupied'
        await orderService.updateTableStatus(tableId, 'occupied', newOrderData.id);
        
        // Fetch the newly created order
        await fetchOrder();
      }
    } catch (error: any) {
      toast.error('Error al gestionar la comanda: ' + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [tableId]);

  useEffect(() => {
    if (tableId) {
      fetchOrder();
    }
  }, [tableId, fetchOrder]);

  const addMenuItem = async (menuItem: MenuItem) => {
    if (!order) return;
    setLoading(true);
    
    const existingItem = order.order_items.find(item => item.menu_items.id === menuItem.id);

    try {
      if (existingItem) {
        await updateItemQuantity(existingItem.id, existingItem.quantity + 1);
      } else {
        await orderService.addOrderItem(order.id, menuItem);
      }
      toast.success(`${menuItem.name} añadido.`);
      await fetchOrder();
    } catch (error: any) {
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
      const orderItem = order?.order_items.find(item => item.id === itemId);
      if (!orderItem) return;
      
      await orderService.updateOrderItemQuantity(itemId, newQuantity, orderItem.menu_items.price);
      await fetchOrder();
    } catch (error: any) {
      toast.error("Error al actualizar la cantidad.");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    setLoading(true);
    try {
      await orderService.removeOrderItem(itemId);
      toast.success("Plato eliminado de la comanda.");
      await fetchOrder();
    } catch (error: any) {
      toast.error("Error al eliminar el plato.");
    } finally {
      setLoading(false);
    }
  };
  
  const sendToKitchen = async () => {
    if (!order) return;
    setLoading(true);
    try {
      await orderService.updateOrderStatus(order.id, 'in_progress');
      toast.success("Comanda enviada a cocina.");
      await fetchOrder();
    } catch (error: any) {
      toast.error("Error al enviar a cocina.");
    } finally {
      setLoading(false);
    }
  };

  const closeOrder = async () => {
    if (!order || !tableId) return;
    setLoading(true);
    try {
      // Update order status to 'completed'
      await orderService.updateOrderStatus(order.id, 'completed');
      
      // Update table status to 'available'
      await orderService.updateTableStatus(tableId, 'available', null);

      toast.success(`Cuenta cerrada para la mesa. Total: ${formatOrderTotal(order.total_amount)}`);
      setOrder(null);
      return true;
    } catch (error: any) {
      toast.error("Error al cerrar la cuenta.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update order total whenever order items change
  useEffect(() => {
    if (order && order.order_items.length > 0) {
      const total = calculateTotal(order.order_items);
      orderService.updateOrderTotal(order.id, total);
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