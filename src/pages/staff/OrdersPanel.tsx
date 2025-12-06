// src/pages/staff/OrdersPanel.tsx
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
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
  MessageSquare
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
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
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
    case 'in_progress':
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
    : order.status === 'in_progress' 
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
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => onQuickAction(order.id, 'in_progress')}
            >
              <ChefHat className="h-4 w-4 mr-1" /> Preparar
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => onQuickAction(order.id, 'cancelled')}
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
        )}
        {order.status === 'in_progress' && (
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

export default function OrdersPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(3000);
  const [lastUpdate, setLastUpdate] = useState(new Date());

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
      .in('status', ['pending', 'in_progress', 'completed'])
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

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      toast.error('Error al actualizar el pedido');
      console.error(error);
    } else {
      const statusLabels: Record<string, string> = {
        'in_progress': 'en preparación',
        'completed': 'completado',
        'cancelled': 'cancelado'
      };
      toast.success(`Pedido ${statusLabels[newStatus] || newStatus}`);
      fetchOrders();
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null);
      }
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const inProgressOrders = orders.filter(o => o.status === 'in_progress');
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
        <div className="flex gap-2">
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
                <div className="flex gap-2 pt-4">
                  {selectedOrder.status === 'pending' && (
                    <>
                      <Button 
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleUpdateStatus(selectedOrder.id, 'in_progress')}
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
                  {selectedOrder.status === 'in_progress' && (
                    <Button 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'completed')}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" /> Completar
                    </Button>
                  )}
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
