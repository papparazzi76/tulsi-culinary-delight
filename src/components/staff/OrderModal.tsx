// src/components/staff/OrderModal.tsx
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useOrder, MenuItem } from '@/hooks/useOrder';
import { toast } from 'sonner';
import { Plus, Minus, Trash2, Send, Euro } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  table: { id: string; table_number: number } | null;
}

export default function OrderModal({ isOpen, onClose, table }: OrderModalProps) {
  const { order, loading, addMenuItem, updateItemQuantity, removeItem, sendToKitchen, closeOrder } = useOrder(table?.id || null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Fetch all available menu items to display
    const fetchMenuItems = async () => {
      const { data, error } = await supabase.from('menu_items').select('id, name, price').eq('available', true).order('name');
      if (error) {
        toast.error("No se pudieron cargar los platos del menú.");
      } else {
        setMenuItems(data);
      }
    };
    if (isOpen) {
      fetchMenuItems();
    }
  }, [isOpen]);

  const handleCloseOrder = async () => {
      const success = await closeOrder();
      if (success) {
          onClose();
      }
  }

  const filteredMenuItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen || !table) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-3xl font-playfair text-accent">
            Comanda - Mesa #{table.table_number}
          </DialogTitle>
          <DialogDescription>
            {order ? `Estado: ${order.status}` : 'Creando nueva comanda...'}
          </DialogDescription>
        </DialogHeader>

        {loading && !order ? (
          <div className="flex-1 flex items-center justify-center">Cargando comanda...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 flex-1 overflow-hidden">
            {/* Current Order */}
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">Platos en la Comanda</h3>
              <div className="flex-1 overflow-y-auto pr-4 space-y-2">
                {order?.order_items.length === 0 ? (
                  <p className="text-muted-foreground text-center pt-10">Aún no hay platos en esta comanda.</p>
                ) : (
                  order?.order_items.map(item => (
                    <div key={item.id} className="flex items-center bg-secondary p-3 rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold">{item.menu_items.name}</p>
                        <p className="text-sm text-muted-foreground">€{item.menu_items.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="ghost" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}><Minus className="h-4 w-4"/></Button>
                        <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                        <Button size="icon" variant="ghost" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}><Plus className="h-4 w-4"/></Button>
                      </div>
                      <Button size="icon" variant="ghost" className="text-destructive" onClick={() => removeItem(item.id)}><Trash2 className="h-4 w-4"/></Button>
                    </div>
                  ))
                )}
              </div>
               <div className="mt-4 pt-4 border-t font-bold text-2xl flex justify-between items-center text-accent">
                  <span>Total:</span>
                  <span>€{order?.total_amount?.toFixed(2) || '0.00'}</span>
              </div>
            </div>

            {/* Menu to Add Items */}
            <div className="flex flex-col">
                <h3 className="text-xl font-semibold mb-4 border-b pb-2">Añadir Plato</h3>
                <input
                    type="text"
                    placeholder="Buscar plato..."
                    className="w-full p-2 mb-4 bg-input rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex-1 overflow-y-auto pr-4 space-y-2">
                    {filteredMenuItems.map(item => (
                        <Button key={item.id} variant="outline" className="w-full justify-between" onClick={() => addMenuItem(item)}>
                            <span>{item.name}</span>
                            <span>€{item.price.toFixed(2)}</span>
                        </Button>
                    ))}
                </div>
            </div>
          </div>
        )}

        <DialogFooter className="mt-auto pt-4 border-t">
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
          <div className="flex-grow" />
          {order?.status === 'pending' && (
            <Button className="btn-tulsi bg-blue-600 hover:bg-blue-700" onClick={sendToKitchen} disabled={loading || order?.order_items.length === 0}>
                <Send className="mr-2 h-4 w-4"/>
                Enviar a Cocina
            </Button>
          )}
           <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="btn-tulsi bg-green-600 hover:bg-green-700" disabled={loading || order?.order_items.length === 0}>
                    <Euro className="mr-2 h-4 w-4"/>
                    Cerrar Cuenta
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción marcará la comanda como completada y liberará la mesa. El total de la cuenta es <strong>€{order?.total_amount?.toFixed(2)}</strong>.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCloseOrder}>Confirmar y Cerrar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
