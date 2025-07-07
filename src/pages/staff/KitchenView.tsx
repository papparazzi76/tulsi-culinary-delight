// src/pages/staff/KitchenView.tsx
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Clock } from 'lucide-react';

// Define more specific types based on your DB schema
interface OrderItem {
  id: string;
  quantity: number;
  menu_items: {
    name: string;
  }
}
interface Order {
  id: string;
  created_at: string;
  status: 'pending' | 'in_progress' | 'completed';
  tables: {
      table_number: number;
  };
  order_items: OrderItem[];
}

const OrderCard = ({ order, onUpdateStatus }: { order: Order, onUpdateStatus: (orderId: string, newStatus: 'in_progress' | 'completed') => void }) => {
    const [timeElapsed, setTimeElapsed] = useState('');

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            const createdAt = new Date(order.created_at);
            const diff = Math.floor((now.getTime() - createdAt.getTime()) / 1000); // difference in seconds
            const minutes = Math.floor(diff / 60);
            const seconds = diff % 60;
            setTimeElapsed(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        };

        calculateTime();
        const interval = setInterval(calculateTime, 1000);

        return () => clearInterval(interval);
    }, [order.created_at]);

    return (
        <Card className={`mb-4 shadow-md ${order.status === 'in_progress' ? 'border-yellow-500' : 'border-red-500'}`}>
            <CardHeader className="p-4">
                <CardTitle className="flex justify-between items-center text-lg">
                    <span>Mesa #{order.tables.table_number}</span>
                    <span className="flex items-center text-sm font-mono">
                        <Clock className="mr-2 h-4 w-4" />
                        {timeElapsed}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <ul className="space-y-2 mb-4">
                    {order.order_items.map((item) => (
                        <li key={item.id} className="flex justify-between border-b pb-1">
                            <span className="font-semibold">{item.menu_items.name}</span>
                            <span className="font-bold">x{item.quantity}</span>
                        </li>
                    ))}
                </ul>
                {order.status === 'pending' && (
                    <Button onClick={() => onUpdateStatus(order.id, 'in_progress')} className="w-full btn-tulsi bg-blue-600 hover:bg-blue-700">
                        Empezar a Preparar
                    </Button>
                )}
                {order.status === 'in_progress' && (
                    <Button onClick={() => onUpdateStatus(order.id, 'completed')} className="w-full btn-tulsi bg-green-600 hover:bg-green-700">
                        Marcar como Listo
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};


export default function KitchenView() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActiveOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id, created_at, status,
        tables ( table_number ),
        order_items ( id, quantity, menu_items ( name ) )
      `)
      .in('status', ['pending', 'in_progress'])
      .order('created_at', { ascending: true });

    if (error) {
      toast.error('Error al cargar las comandas.');
      console.error(error);
    } else {
      setOrders(data as unknown as Order[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchActiveOrders();

    const channel = supabase
      .channel('orders_kitchen_view')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchActiveOrders)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'order_items' }, fetchActiveOrders)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: 'in_progress' | 'completed') => {
      const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
      if(error) {
          toast.error("Error al actualizar la comanda.");
      } else {
          toast.success(`Comanda marcada como ${newStatus === 'in_progress' ? 'en preparación' : 'lista'}.`);
      }
  }

  if (loading) {
    return <div>Cargando comandas activas...</div>;
  }

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const inProgressOrders = orders.filter(o => o.status === 'in_progress');

  return (
    <div>
      <h1 className="text-3xl font-playfair text-accent mb-6">Panel de Cocina</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
        {/* New Orders Column */}
        <div className="bg-background rounded-lg p-4 flex flex-col">
          <h2 className="text-xl font-bold text-center mb-4 pb-2 border-b-2 border-red-500">Nuevos Pedidos ({pendingOrders.length})</h2>
          <div className="flex-1 overflow-y-auto">
            {pendingOrders.length > 0 ? (
                pendingOrders.map((order) => <OrderCard key={order.id} order={order} onUpdateStatus={handleUpdateStatus} />)
            ) : (
                <p className="text-center text-muted-foreground pt-10">No hay nuevos pedidos.</p>
            )}
          </div>
        </div>

        {/* In Preparation Column */}
        <div className="bg-background rounded-lg p-4 flex flex-col">
          <h2 className="text-xl font-bold text-center mb-4 pb-2 border-b-2 border-yellow-500">En Preparación ({inProgressOrders.length})</h2>
          <div className="flex-1 overflow-y-auto">
             {inProgressOrders.length > 0 ? (
                inProgressOrders.map((order) => <OrderCard key={order.id} order={order} onUpdateStatus={handleUpdateStatus} />)
            ) : (
                <p className="text-center text-muted-foreground pt-10">Ninguna comanda en preparación.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
