// src/pages/staff/admin/ReportsDashboard.tsx
import { useEffect, useState } from 'react';
import { useAdmin } from '@/hooks/useAdmin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, TrendingUp, ShoppingCart, Euro } from 'lucide-react';

export interface ReportData {
  total_revenue: number;
  total_orders: number;
  average_order_value: number;
}

export default function ReportsDashboard() {
  const { reportData, loading, fetchSalesReport } = useAdmin();
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      fetchSalesReport(dateRange.from, dateRange.to);
    }
  }, [fetchSalesReport, dateRange]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-playfair text-accent">Reportes y Analíticas</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from && dateRange.to ? 
                `${format(dateRange.from, "LLL dd, y", { locale: es })} - ${format(dateRange.to, "LLL dd, y", { locale: es })}`
                : "Selecciona un rango"
              }
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  setDateRange({ from: range.from, to: range.to });
                }
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {loading ? (
        <p>Generando reporte...</p>
      ) : reportData ? (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€{reportData.total_revenue?.toFixed(2) || '0.00'}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comandas Completadas</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.total_orders || 0}</div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
                <Euro className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                 <div className="text-2xl font-bold">€{reportData.average_order_value?.toFixed(2) || '0.00'}</div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Platos Más Populares</CardTitle>
            </CardHeader>
            <CardContent>
                {reportData.total_orders > 0 ? (
                    <ul className="space-y-2">
                        <li className="flex justify-between">
                            <span>Datos de platos populares</span>
                            <span className="font-bold">Próximamente disponible</span>
                        </li>
                    </ul>
                ) : (
                    <p className="text-muted-foreground">No hay datos de ventas para este período.</p>
                )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <p>No se pudieron cargar los datos del reporte.</p>
      )}
    </div>
  );
}
