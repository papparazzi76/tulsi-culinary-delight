import { useEffect, useRef, useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// IP del Sunmi V2S en la red local del restaurante
const SUNMI_PRINTER_BASE_URL = 'http://192.168.1.100:8080';
const SUNMI_PRINTER_URL = `${SUNMI_PRINTER_BASE_URL}/pedido`;

interface OrderItem {
  id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  menu_items: {
    name: string;
  };
}

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  status: string;
  customer_name: string;
  customer_phone: string | null;
  delivery_type: string;
  delivery_address: string | null;
  total_amount: number;
  order_items: OrderItem[];
}

// Set to track already printed orders (persists during session)
const printedOrders = new Set<string>();

// Audio notification for new orders
const playNotificationSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create a pleasant notification sound (3 ascending beeps)
    const playBeep = (frequency: number, startTime: number, duration: number) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.5, startTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    const now = audioContext.currentTime;
    playBeep(523, now, 0.15);       // C5
    playBeep(659, now + 0.15, 0.15); // E5
    playBeep(784, now + 0.3, 0.25);  // G5
    
    console.log('🔔 Notificación sonora reproducida');
  } catch (error) {
    console.warn('No se pudo reproducir el sonido de notificación:', error);
  }
};

export function useSunmiPrinter() {
  const isInitialized = useRef(false);
  const [printerStatus, setPrinterStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  // Check printer connectivity
  const checkPrinterConnection = useCallback(async (): Promise<boolean> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(`${SUNMI_PRINTER_BASE_URL}/status`, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setPrinterStatus('connected');
        return true;
      }
      setPrinterStatus('disconnected');
      return false;
    } catch {
      setPrinterStatus('disconnected');
      return false;
    }
  }, []);

  // Check connection on mount and periodically
  useEffect(() => {
    checkPrinterConnection();
    const interval = setInterval(checkPrinterConnection, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [checkPrinterConnection]);
  const sendToPrinter = useCallback(async (order: Order): Promise<boolean> => {
    // Skip if already printed
    if (printedOrders.has(order.id)) {
      console.log(`Pedido ${order.order_number} ya fue impreso, omitiendo`);
      return false;
    }

    try {
      const printerPayload = {
        pedido_id: order.order_number,
        nombre: order.customer_name,
        telefono: order.customer_phone || "No proporcionado",
        direccion: order.delivery_type === 'delivery' 
          ? (order.delivery_address || "Sin dirección") 
          : "Recogida en local",
        items: order.order_items.map(item => ({
          producto: item.menu_items.name,
          cantidad: item.quantity
        })),
        importe: order.total_amount,
        metodo_pago: "Pago en local"
      };

      console.log('🖨️ Enviando a impresora Sunmi:', printerPayload);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

      const response = await fetch(SUNMI_PRINTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(printerPayload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const result = await response.json();
        if (result.status === 'ok') {
          printedOrders.add(order.id);
          console.log(`✅ Pedido ${order.order_number} impreso correctamente`);
          toast.success(`🖨️ Ticket impreso: ${order.order_number}`);
          return true;
        }
      }

      console.error('❌ Error en respuesta de impresora:', response.status);
      return false;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.warn('⚠️ Timeout conectando con impresora Sunmi');
      } else {
        console.error('❌ Error conectando con impresora Sunmi:', error);
      }
      return false;
    }
  }, []);

  const manualPrint = useCallback(async (order: Order) => {
    // Remove from printed set to allow re-print
    printedOrders.delete(order.id);
    const success = await sendToPrinter(order);
    if (!success) {
      toast.error('No se pudo conectar con la impresora Sunmi');
    }
    return success;
  }, [sendToPrinter]);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    console.log('🖨️ Iniciando escucha de pedidos para impresión automática...');

    // Subscribe to new orders in real-time
    const channel = supabase
      .channel('sunmi_printer')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'orders',
        },
        async (payload) => {
          console.log('📦 Nuevo pedido detectado:', payload);
          
          const newOrder = payload.new as { id: string; delivery_type: string };
          
          // Only process takeaway/delivery orders
          if (newOrder.delivery_type !== 'pickup' && newOrder.delivery_type !== 'delivery') {
            console.log('Pedido no es para llevar, omitiendo');
            return;
          }

          // Play notification sound for new order
          playNotificationSound();
          toast.info('🔔 ¡Nuevo pedido recibido!', { duration: 5000 });

          // Fetch full order with items
          const { data, error } = await supabase
            .from('orders')
            .select(`
              id, order_number, created_at, status,
              customer_name, customer_phone,
              delivery_type, delivery_address, total_amount,
              order_items ( id, quantity, unit_price, total_price, menu_items ( name ) )
            `)
            .eq('id', newOrder.id)
            .single();

          if (error) {
            console.error('Error fetching order for printing:', error);
            return;
          }

          if (data) {
            await sendToPrinter(data as Order);
          }
        }
      )
      .subscribe((status) => {
        console.log('🖨️ Estado de suscripción Sunmi:', status);
      });

    return () => {
      console.log('🖨️ Deteniendo escucha de impresión');
      supabase.removeChannel(channel);
    };
  }, [sendToPrinter]);

  return { sendToPrinter, manualPrint, printerStatus, checkPrinterConnection };
}
