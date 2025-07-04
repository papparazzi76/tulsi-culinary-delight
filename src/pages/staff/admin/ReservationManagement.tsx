// src/pages/staff/admin/ReservationManagement.tsx
import { useEffect, useState } from 'react';
import { useAdmin, Reservation } from '@/hooks/useAdmin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Check, X } from 'lucide-react';

interface Table {
    id: string;
    table_number: number;
}

export default function ReservationManagement() {
  const { reservations, loading, fetchReservations, updateReservation } = useAdmin();
  const [availableTables, setAvailableTables] = useState<Table[]>([]);

  useEffect(() => {
    fetchReservations();
    
    const fetchTables = async () => {
        const { data } = await supabase.from('tables').select('id, table_number').eq('status', 'available');
        setAvailableTables(data || []);
    }
    fetchTables();
  }, [fetchReservations]);

  const handleConfirm = (reservationId: string) => {
      updateReservation(reservationId, { status: 'confirmed' });
  }

  const handleCancel = (reservationId: string) => {
      updateReservation(reservationId, { status: 'cancelled' });
  }
  
  const handleAssignTable = (reservationId: string, tableId: string) => {
      updateReservation(reservationId, { table_id: tableId, status: 'confirmed' });
      // We should also update the table's status to 'reserved'
      supabase.from('tables').update({ status: 'reserved' }).eq('id', tableId).then();
  }

  const pendingReservations = reservations.filter(r => r.status === 'pending');
  const confirmedReservations = reservations.filter(r => r.status === 'confirmed');

  return (
    <div>
      <h1 className="text-3xl font-playfair text-accent mb-6">Gestión de Reservas</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Pendientes de Confirmación ({pendingReservations.length})</h2>
          <div className="space-y-4">
            {loading && <p>Cargando...</p>}
            {pendingReservations.map(res => (
              <Card key={res.id}>
                <CardHeader>
                  <CardTitle>{res.customer_name}</CardTitle>
                  <CardDescription>{res.number_of_guests} personas - {format(new Date(res.reservation_time), "PPP 'a las' HH:mm", { locale: es })}</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleConfirm(res.id)}><Check className="mr-2 h-4 w-4"/>Confirmar</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleCancel(res.id)}><X className="mr-2 h-4 w-4"/>Cancelar</Button>
                </CardContent>
              </Card>
            ))}
             {pendingReservations.length === 0 && !loading && <p className="text-muted-foreground">No hay reservas pendientes.</p>}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Reservas Confirmadas ({confirmedReservations.length})</h2>
           <div className="space-y-4">
            {loading && <p>Cargando...</p>}
            {confirmedReservations.map(res => (
              <Card key={res.id} className="border-blue-500">
                <CardHeader>
                  <CardTitle>{res.customer_name}</CardTitle>
                  <CardDescription>{res.number_of_guests} personas - {format(new Date(res.reservation_time), "PPP 'a las' HH:mm", { locale: es })}</CardDescription>
                </CardHeader>
                <CardContent>
                    {res.table_id ? (
                        <p className="font-semibold">Mesa Asignada: #{availableTables.find(t => t.id === res.table_id)?.table_number}</p>
                    ) : (
                        <Select onValueChange={(tableId) => handleAssignTable(res.id, tableId)}>
                            <SelectTrigger><SelectValue placeholder="Asignar mesa..." /></SelectTrigger>
                            <SelectContent>
                                {availableTables.map(table => (
                                    <SelectItem key={table.id} value={table.id}>Mesa #{table.table_number}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </CardContent>
              </Card>
            ))}
            {confirmedReservations.length === 0 && !loading && <p className="text-muted-foreground">No hay reservas confirmadas.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
