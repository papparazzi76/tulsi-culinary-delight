// src/pages/staff/OrdersPanel.tsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { jsPDF } from 'jspdf';
import { 
  Clock, 
  Phone, 
  User, 
  MapPin, 
  Package,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Settings,
  ChefHat,
  Bike,
  Store,
  MessageSquare,
  Printer,
  Volume2
} from 'lucide-react';

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
  status: 'pending' | 'preparing' | 'completed' | 'cancelled';
  payment_status: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  delivery_type: string;
  delivery_address: string | null;
  total_amount: number;
  order_items: OrderItem[];
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
};

const getTimeElapsed = (dateString: string) => {
  const now = new Date();
  const created = new Date(dateString);
  const diff = Math.floor((now.getTime() - created.getTime()) / 1000 / 60);
  if (diff < 60) return `${diff} min`;
  return `${Math.floor(diff / 60)}h ${diff % 60}m`;
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-orange-500 text-white">Pendiente</Badge>;
    case 'preparing':
      return <Badge className="bg-blue-500 text-white">Preparando</Badge>;
    case 'completed':
      return <Badge className="bg-green-500 text-white">Completado</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-500 text-white">Cancelado</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const getDeliveryIcon = (type: string) => {
  switch (type) {
    case 'delivery':
      return <Bike className="h-4 w-4" />;
    case 'pickup':
      return <Store className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

interface OrderCardProps {
  order: Order;
  onClick: () => void;
  onQuickAction: (orderId: string, newStatus: string) => void;
}

const OrderCard = ({ order, onClick, onQuickAction }: OrderCardProps) => {
  const [timeElapsed, setTimeElapsed] = useState(getTimeElapsed(order.created_at));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(getTimeElapsed(order.created_at));
    }, 60000);
    return () => clearInterval(interval);
  }, [order.created_at]);

  const borderColor = order.status === 'pending' 
    ? 'border-l-orange-500' 
    : order.status === 'preparing' 
    ? 'border-l-blue-500' 
    : 'border-l-green-500';

  return (
    <Card 
      className={`cursor-pointer hover:shadow-lg transition-shadow border-l-4 ${borderColor}`}
      onClick={onClick}
    >
      <CardHeader className="p-3 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">{order.order_number}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Clock className="h-3 w-3" />
              <span>{formatTime(order.created_at)}</span>
              <span className="text-xs">({timeElapsed})</span>
            </div>
          </div>
          <div className="text-right">
            {getStatusBadge(order.status)}
            <p className="text-lg font-bold mt-1">€{order.total_amount.toFixed(2)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="flex items-center gap-2 mb-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{order.customer_name}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          {getDeliveryIcon(order.delivery_type)}
          <span className="text-sm capitalize">
            {order.delivery_type === 'delivery' ? 'Entrega a domicilio' : 'Recoger en local'}
          </span>
        </div>
        <div className="text-sm text-muted-foreground mb-3">
          {order.order_items.length} producto(s)
        </div>
        
        {order.status === 'pending' && (
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <Button 
              size="sm" 
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={() => onQuickAction(order.id, 'preparing')}
            >
              <CheckCircle2 className="h-4 w-4 mr-1" /> Aceptar
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
              className="flex-1"
              onClick={() => onQuickAction(order.id, 'cancelled')}
            >
              <XCircle className="h-4 w-4 mr-1" /> Cancelar
            </Button>
          </div>
        )}
        {order.status === 'preparing' && (
          <Button 
            size="sm" 
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={(e) => {
              e.stopPropagation();
              onQuickAction(order.id, 'completed');
            }}
          >
            <CheckCircle2 className="h-4 w-4 mr-1" /> Listo para entregar
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

// Audio context for notification sounds
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

const playNotificationSound = () => {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    // Play 5 beeps of 1 second each, with 0.2 second gap between them
    const beepDuration = 1; // 1 second per beep
    const gapDuration = 0.2; // 0.2 second gap between beeps
    const totalBeepInterval = beepDuration + gapDuration;
    
    for (let i = 0; i < 5; i++) {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = 880; // A5 note
      oscillator.type = 'sine';
      
      const startTime = ctx.currentTime + i * totalBeepInterval;
      gainNode.gain.setValueAtTime(0.5, startTime);
      gainNode.gain.setValueAtTime(0.5, startTime + beepDuration - 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + beepDuration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + beepDuration);
    }
  } catch (error) {
    console.error('Error playing notification sound:', error);
  }
};

export default function OrdersPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(3000);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const previousOrdersRef = useRef<string[]>([]);
  const audioInitializedRef = useRef(false);

  // Initialize audio on first user interaction
  useEffect(() => {
    const initAudio = () => {
      if (!audioInitializedRef.current) {
        getAudioContext();
        audioInitializedRef.current = true;
      }
    };
    
    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('touchstart', initAudio, { once: true });
    
    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('touchstart', initAudio);
    };
  }, []);

  const testNotificationSound = () => {
    playNotificationSound();
    toast.success('Sonido de notificación reproducido');
  };

  const fetchOrders = useCallback(async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id, order_number, created_at, status, payment_status,
        customer_name, customer_email, customer_phone,
        delivery_type, delivery_address, total_amount,
        order_items ( id, quantity, unit_price, total_price, menu_items ( name ) )
      `)
      .in('delivery_type', ['pickup', 'delivery'])
      .in('status', ['pending', 'preparing', 'completed'])
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching orders:', error);
    } else {
      setOrders(data as unknown as Order[]);
      setLastUpdate(new Date());
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, pollingInterval);
    return () => clearInterval(interval);
  }, [fetchOrders, pollingInterval]);

  // Check for new orders and play sound
  useEffect(() => {
    const currentPendingIds = orders.filter(o => o.status === 'pending').map(o => o.id);
    const previousIds = previousOrdersRef.current;
    
    // Check if there are new pending orders (only after initial load)
    if (previousIds.length > 0 || !loading) {
      const newOrders = currentPendingIds.filter(id => !previousIds.includes(id));
      
      if (newOrders.length > 0 && previousIds.length >= 0) {
        // Only play sound if not the initial load
        if (previousOrdersRef.current.length > 0 || orders.length > 0) {
          const hasNewOrder = currentPendingIds.some(id => !previousIds.includes(id));
          if (hasNewOrder && previousIds.length > 0) {
            playNotificationSound();
            toast.info(`¡Nuevo pedido recibido!`, { duration: 5000 });
          }
        }
      }
    }
    
    previousOrdersRef.current = currentPendingIds;
  }, [orders, loading]);

  // Real-time subscription for instant updates
  useEffect(() => {
    const channel = supabase
      .channel('orders_panel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchOrders)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchOrders]);

  const sendOrderStatusEmail = async (order: Order, status: 'accepted' | 'cancelled' | 'preparing') => {
    try {
      const items = order.order_items.map(item => ({
        name: item.menu_items.name,
        quantity: item.quantity,
        price: item.unit_price
      }));

      const response = await supabase.functions.invoke('send-order-status-email', {
        body: {
          orderNumber: order.order_number,
          customerName: order.customer_name,
          customerEmail: order.customer_email,
          customerPhone: order.customer_phone,
          status,
          items,
          total: order.total_amount
        }
      });

      if (response.error) {
        console.error('Error sending email:', response.error);
        toast.error('Error al enviar email al cliente');
      } else {
        console.log('Email sent successfully:', response.data);
        toast.success(`Email de ${status === 'accepted' ? 'confirmación' : 'cancelación'} enviado`);
      }
    } catch (error) {
      console.error('Error sending order status email:', error);
      toast.error('Error al enviar email');
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    // Find the order to send email
    const orderToUpdate = orders.find(o => o.id === orderId);
    
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      toast.error('Error al actualizar el pedido');
      console.error(error);
    } else {
      const statusLabels: Record<string, string> = {
        'preparing': 'en preparación',
        'completed': 'completado',
        'cancelled': 'cancelado'
      };
      toast.success(`Pedido ${statusLabels[newStatus] || newStatus}`);
      
      // Send email and print when preparing, only email when cancelling
      if (orderToUpdate) {
        if (newStatus === 'preparing') {
          await sendOrderStatusEmail(orderToUpdate, 'preparing');
          // Auto-print when order is accepted
          handleBrowserPrint(orderToUpdate);
        } else if (newStatus === 'cancelled') {
          await sendOrderStatusEmail(orderToUpdate, 'cancelled');
        }
      }
      
      fetchOrders();
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null);
      }
    }
  };

  const handleBrowserPrint = (order: Order) => {
    const orderDate = new Date(order.created_at);
    const itemsHtml = order.order_items.map(item => `
      <tr>
        <td style="padding: 4px 0;">${item.quantity}x ${item.menu_items.name}</td>
        <td style="padding: 4px 0; text-align: right;">${item.total_price.toFixed(2)}€</td>
      </tr>
    `).join('');

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Pedido ${order.order_number}</title>
        <style>
          body { font-family: 'Courier New', monospace; font-size: 12px; width: 80mm; margin: 0 auto; padding: 10px; }
          h1 { font-size: 16px; text-align: center; margin: 0 0 5px 0; }
          .center { text-align: center; }
          .bold { font-weight: bold; }
          .separator { border-top: 1px dashed #000; margin: 10px 0; }
          table { width: 100%; border-collapse: collapse; }
          .total { font-size: 14px; font-weight: bold; margin-top: 10px; }
          @media print {
            body { width: 80mm; margin: 0; padding: 5px; }
          }
        </style>
      </head>
      <body>
        <h1>TULSI INDIAN</h1>
        <p class="center">C/ Santiago, 12 - Valladolid<br>Tel: +34 645 94 62 02</p>
        <div class="separator"></div>
        <p class="center bold">Pedido: ${order.order_number}</p>
        <p class="center">${orderDate.toLocaleDateString('es-ES')} - ${orderDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
        <div class="separator"></div>
        <p class="bold">CLIENTE:</p>
        <p>${order.customer_name}</p>
        ${order.customer_phone ? `<p>Tel: ${order.customer_phone}</p>` : ''}
        <p class="center bold">${order.delivery_type === 'delivery' ? 'ENTREGA A DOMICILIO' : 'RECOGER EN LOCAL'}</p>
        ${order.delivery_address ? `<p>${order.delivery_address}</p>` : ''}
        <div class="separator"></div>
        <p class="bold">PRODUCTOS:</p>
        <table>${itemsHtml}</table>
        <div class="separator"></div>
        <p class="total">TOTAL: ${order.total_amount.toFixed(2)}€</p>
        <div class="separator"></div>
        <p class="center">¡Gracias por su pedido!</p>
        <p class="center">www.tulsiindianvalladolid.com</p>
      </body>
      </html>
    `;

    // Use window.open for better compatibility
    const printWindow = window.open('', 'print-window', 'width=400,height=600');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      
      // Wait for content to load then print
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 500);
    } else {
      // Fallback: use iframe if popup is blocked
      const printFrame = document.createElement('iframe');
      printFrame.style.position = 'fixed';
      printFrame.style.right = '0';
      printFrame.style.bottom = '0';
      printFrame.style.width = '0';
      printFrame.style.height = '0';
      printFrame.style.border = 'none';
      document.body.appendChild(printFrame);

      const frameDoc = printFrame.contentWindow?.document;
      if (frameDoc) {
        frameDoc.open();
        frameDoc.write(printContent);
        frameDoc.close();

        setTimeout(() => {
          printFrame.contentWindow?.focus();
          printFrame.contentWindow?.print();
          setTimeout(() => {
            document.body.removeChild(printFrame);
          }, 1000);
        }, 500);
      }
    }
  };

  const handlePrintTicket = (order: Order) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [80, 200] // Ticket size 80mm width
    });

    const pageWidth = 80;
    let y = 10;

    // Header
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('TULSI INDIAN', pageWidth / 2, y, { align: 'center' });
    y += 6;
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('C/ Santiago, 12 - Valladolid', pageWidth / 2, y, { align: 'center' });
    y += 4;
    doc.text('Tel: 983 123 456', pageWidth / 2, y, { align: 'center' });
    y += 8;

    // Order number
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Pedido: ${order.order_number}`, pageWidth / 2, y, { align: 'center' });
    y += 6;

    // Date and time
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const orderDate = new Date(order.created_at);
    doc.text(orderDate.toLocaleDateString('es-ES') + ' - ' + orderDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }), pageWidth / 2, y, { align: 'center' });
    y += 6;

    // Separator
    doc.setLineWidth(0.5);
    doc.line(5, y, pageWidth - 5, y);
    y += 6;

    // Customer info
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('CLIENTE:', 5, y);
    y += 4;
    doc.setFont('helvetica', 'normal');
    doc.text(order.customer_name, 5, y);
    y += 4;
    
    if (order.customer_phone) {
      doc.text(`Tel: ${order.customer_phone}`, 5, y);
      y += 4;
    }

    // Delivery type
    y += 2;
    doc.setFont('helvetica', 'bold');
    const deliveryText = order.delivery_type === 'delivery' ? 'ENTREGA A DOMICILIO' : 'RECOGER EN LOCAL';
    doc.text(deliveryText, pageWidth / 2, y, { align: 'center' });
    y += 4;

    if (order.delivery_address) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      const addressLines = doc.splitTextToSize(order.delivery_address, pageWidth - 10);
      addressLines.forEach((line: string) => {
        doc.text(line, 5, y);
        y += 3.5;
      });
    }
    y += 4;

    // Separator
    doc.line(5, y, pageWidth - 5, y);
    y += 6;

    // Products header
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('PRODUCTOS', 5, y);
    y += 5;

    // Products list
    doc.setFont('helvetica', 'normal');
    order.order_items.forEach(item => {
      const itemText = `${item.quantity}x ${item.menu_items.name}`;
      const priceText = `${item.total_price.toFixed(2)}€`;
      
      // Split long product names
      const maxWidth = pageWidth - 25;
      const lines = doc.splitTextToSize(itemText, maxWidth);
      
      lines.forEach((line: string, index: number) => {
        doc.text(line, 5, y);
        if (index === 0) {
          doc.text(priceText, pageWidth - 5, y, { align: 'right' });
        }
        y += 4;
      });
    });
    y += 4;

    // Separator
    doc.line(5, y, pageWidth - 5, y);
    y += 6;

    // Total
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL:', 5, y);
    doc.text(`${order.total_amount.toFixed(2)}€`, pageWidth - 5, y, { align: 'right' });
    y += 8;

    // Footer
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('¡Gracias por su pedido!', pageWidth / 2, y, { align: 'center' });
    y += 4;
    doc.text('www.tulsiindianvalladolid.com', pageWidth / 2, y, { align: 'center' });

    // Adjust page height based on content
    const finalHeight = y + 10;
    
    // Save/Print
    doc.save(`ticket-${order.order_number}.pdf`);
    toast.success('Ticket generado correctamente');
  };

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const inProgressOrders = orders.filter(o => o.status === 'preparing');
  const completedOrders = orders.filter(o => o.status === 'completed').slice(0, 20);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Panel de Pedidos</h1>
          <p className="text-sm text-muted-foreground">
            Última actualización: {lastUpdate.toLocaleTimeString('es-ES')}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="outline" size="sm" onClick={testNotificationSound}>
            <Volume2 className="h-4 w-4 mr-1" /> Test Sonido
          </Button>
          <Button variant="outline" size="icon" onClick={fetchOrders}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setShowSettings(true)}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-orange-600">{pendingOrders.length}</p>
            <p className="text-sm text-orange-700">Pendientes</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">{inProgressOrders.length}</p>
            <p className="text-sm text-blue-700">Preparando</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-green-600">{completedOrders.length}</p>
            <p className="text-sm text-green-700">Completados</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Pending Column */}
        <div>
          <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
            <span className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></span>
            Pendientes ({pendingOrders.length})
          </h2>
          <div className="space-y-3">
            {pendingOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onClick={() => setSelectedOrder(order)}
                onQuickAction={handleUpdateStatus}
              />
            ))}
            {pendingOrders.length === 0 && (
              <Card className="p-8 text-center text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Sin pedidos pendientes</p>
              </Card>
            )}
          </div>
        </div>

        {/* In Progress Column */}
        <div>
          <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            En Preparación ({inProgressOrders.length})
          </h2>
          <div className="space-y-3">
            {inProgressOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onClick={() => setSelectedOrder(order)}
                onQuickAction={handleUpdateStatus}
              />
            ))}
            {inProgressOrders.length === 0 && (
              <Card className="p-8 text-center text-muted-foreground">
                <ChefHat className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Nada en preparación</p>
              </Card>
            )}
          </div>
        </div>

        {/* Completed Column */}
        <div>
          <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            Completados ({completedOrders.length})
          </h2>
          <div className="space-y-3">
            {completedOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onClick={() => setSelectedOrder(order)}
                onQuickAction={handleUpdateStatus}
              />
            ))}
            {completedOrders.length === 0 && (
              <Card className="p-8 text-center text-muted-foreground">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Sin pedidos completados</p>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex justify-between items-center">
                  <span>{selectedOrder.order_number}</span>
                  {getStatusBadge(selectedOrder.status)}
                </DialogTitle>
                <DialogDescription>
                  {formatTime(selectedOrder.created_at)} - {getTimeElapsed(selectedOrder.created_at)} ago
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Customer Info */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{selectedOrder.customer_name}</span>
                  </div>
                  {selectedOrder.customer_phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <a href={`tel:${selectedOrder.customer_phone}`} className="text-primary hover:underline">
                        {selectedOrder.customer_phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    {getDeliveryIcon(selectedOrder.delivery_type)}
                    <span className="capitalize">
                      {selectedOrder.delivery_type === 'delivery' ? 'Entrega a domicilio' : 'Recoger en local'}
                    </span>
                  </div>
                  {selectedOrder.delivery_address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-primary mt-0.5" />
                      <span className="text-sm">{selectedOrder.delivery_address}</span>
                    </div>
                  )}
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold mb-2">Productos</h3>
                  <div className="space-y-2">
                    {selectedOrder.order_items.map(item => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b">
                        <div>
                          <span className="font-medium">{item.quantity}x</span>
                          <span className="ml-2">{item.menu_items.name}</span>
                        </div>
                        <span className="font-semibold">€{item.total_price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 text-lg font-bold">
                    <span>Total</span>
                    <span>€{selectedOrder.total_amount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 flex-wrap">
                  {selectedOrder.status === 'pending' && (
                    <>
                      <Button 
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleUpdateStatus(selectedOrder.id, 'preparing')}
                      >
                        <ChefHat className="h-4 w-4 mr-2" /> Preparar
                      </Button>
                      <Button 
                        variant="destructive"
                        onClick={() => handleUpdateStatus(selectedOrder.id, 'cancelled')}
                      >
                        <XCircle className="h-4 w-4 mr-2" /> Cancelar
                      </Button>
                    </>
                  )}
                  {selectedOrder.status === 'preparing' && (
                    <Button 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'completed')}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" /> Completar
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    onClick={() => handlePrintTicket(selectedOrder)}
                  >
                    <Printer className="h-4 w-4 mr-2" /> PDF
                  </Button>
                  <Button 
                    variant="default"
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleBrowserPrint(selectedOrder)}
                  >
                    <Printer className="h-4 w-4 mr-2" /> Imprimir
                  </Button>
                  {selectedOrder.customer_phone && (
                    <Button 
                      variant="outline"
                      onClick={() => window.open(`https://wa.me/${selectedOrder.customer_phone?.replace(/\D/g, '')}`, '_blank')}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configuración</DialogTitle>
            <DialogDescription>Ajusta las opciones del panel de pedidos</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="polling">Intervalo de actualización (segundos)</Label>
              <Input
                id="polling"
                type="number"
                min={1}
                max={60}
                value={pollingInterval / 1000}
                onChange={(e) => setPollingInterval(Number(e.target.value) * 1000)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                El panel consultará nuevos pedidos cada {pollingInterval / 1000} segundos
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
