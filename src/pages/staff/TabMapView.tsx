// src/pages/staff/TableMapView.tsx
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import OrderModal from '@/components/staff/OrderModal'; // Import the modal

type TableStatus = 'available' | 'occupied' | 'reserved' | 'needs_cleaning';

interface Table {
  id: string;
  table_number: number;
  capacity: number;
  status: TableStatus;
}

const statusColors: Record<TableStatus, string> = {
  available: 'bg-green-500 hover:bg-green-600',
  occupied: 'bg-red-500 hover:bg-red-600',
  reserved: 'bg-blue-500 hover:bg-blue-600',
  needs_cleaning: 'bg-yellow-500 hover:bg-yellow-600',
};

const statusText: Record<TableStatus, string> = {
    available: 'Disponible',
    occupied: 'Ocupada',
    reserved: 'Reservada',
    needs_cleaning: 'Limpiar',
}

export default function TableMapView() {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTables = async () => {
    const { data, error } = await supabase.from('tables').select('*').order('table_number');
    if (error) {
      toast.error('Error al cargar las mesas.');
      console.error(error);
    } else {
      setTables(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTables();

    const channel = supabase
      .channel('tables_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tables' },
        (payload) => {
          fetchTables(); 
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTable(null);
    fetchTables(); // Refresh tables state when modal closes
  }

  if (loading) {
    return <div>Cargando mapa de mesas...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-playfair text-accent mb-6">Mapa de Mesas</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {tables.map((table) => (
          <Card
            key={table.id}
            onClick={() => handleTableClick(table)}
            className={cn(
              'cursor-pointer transition-transform hover:scale-105',
              statusColors[table.status]
            )}
          >
            <CardHeader className="p-4 text-center text-white">
              <CardTitle className="text-2xl">{table.table_number}</CardTitle>
            </CardHeader>
            <CardContent className="p-2 text-center text-white text-xs">
              <p>{table.capacity} personas</p>
              <p className="font-bold">{statusText[table.status]}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <OrderModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        table={selectedTable}
      />
    </div>
  );
}
